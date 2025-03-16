// src/BTC_PAYMENT_SYSTEM_backend/bitcoin_tracker.mo

import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import ExperimentalCycles "mo:base/ExperimentalCycles";
import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Error "mo:base/Error";
import Int "mo:base/Int";
import Char "mo:base/Char";
import Iter "mo:base/Iter"; // Add this import
import Types "./types";
import PaymentModule "./payment";

module {
  public class BitcoinTracker(paymentProcessor: PaymentModule.PaymentProcessor) {
    // Configuration
    private let REQUIRED_CONFIRMATIONS : Nat = 2; // For testnet (use 6 for mainnet)
    private let NETWORK : Types.Network = #testnet; // Use #mainnet for production
    private let KEY_NAME : Text = "test_key_1"; // Use appropriate key for environment
    
    // Cycles needed for API calls
    private let GET_UTXOS_COST_CYCLES : Nat = 10_000_000_000;
    private let ECDSA_PUBLIC_KEY_COST_CYCLES : Nat = 100_000_000;
    
    // Canister actors
    private let management_canister : Types.ManagementCanisterActor = actor("aaaaa-aa");
    // private let ckbtc_minter : Types.CkBtcMinterActor = actor("mqygn-kiaaa-aaaar-qaadq-cai"); // Testnet ckBTC minter
    private let ckbtc_minter : Types.CkBtcMinterActor = actor("ml52i-qqaaa-aaaar-qaaba-cai"); // ckTESTBTC minter
    
    // Generate a unique subaccount for a payment
    private func generateSubaccount(paymentId: Text) : Blob {
      // A simple way to create a unique subaccount from payment ID
      // In production, you might want a more sophisticated approach
      let paymentIdBytes = Blob.toArray(Text.encodeUtf8(paymentId));
      
      // Ensure it's exactly 32 bytes (standard subaccount size)
      let subaccountBytes = Array.init<Nat8>(32, 0);
      
      // Copy payment ID bytes into the subaccount buffer (up to 32 bytes)
      let len = Nat.min(paymentIdBytes.size(), 32);
      for (i in Iter.range(0, len - 1)) {
        subaccountBytes[i] := paymentIdBytes[i];
      };
      
      Blob.fromArray(Array.freeze(subaccountBytes))
    };
    

    


    // Generate a Bitcoin address for a payment using ckBTC minter
    public func generateBitcoinAddress(paymentId: Text) : async Result.Result<Types.BitcoinAddress, Text> {
      try {
        // Create a unique subaccount from the payment ID
        let subaccount = generateSubaccount(paymentId);
        
        // Get a Bitcoin address from the ckBTC minter
        let btcAddress = await ckbtc_minter.get_btc_address({
          owner = null; // Uses the caller's principal ID
          subaccount = ?subaccount; // Unique subaccount for this payment
        });
        
        #ok(btcAddress)
      } catch (error) {
        #err("Error generating Bitcoin address: " # Error.message(error))
      }
    };
    
    // Check for payment at the given Bitcoin address
    public func checkPayment(btcAddress: Types.BitcoinAddress) : async Result.Result<Types.PaymentStatus, Text> {
      // Get the payment associated with this address
      switch (paymentProcessor.getPaymentByAddress(btcAddress)) {
        case (null) {
          return #err("No payment request found for this address");
        };
        case (?payment) {
          if (payment.status == #completed) {
            return #ok(#completed);
          };
          
          try {
            ExperimentalCycles.add(GET_UTXOS_COST_CYCLES);
            
            // Call the Bitcoin API to get UTXOs
            let utxosResponse = await management_canister.bitcoin_get_utxos({
              address = btcAddress;
              network = NETWORK;
              filter = ?{
                min_confirmations = null;
                page = null;
              };
            });
            
            // Check if we have received a payment to this address
            var totalReceived : Nat64 = 0;
            var lowestConfirmations : Nat = 999;
            var latestTxid : ?Blob = null;
            
            // Process all UTXOs
            for (utxo in utxosResponse.utxos.vals()) {
              totalReceived += utxo.value;
              
              // Calculate confirmations
              let txHeight = utxo.height;
              let currentHeight = utxosResponse.tip_height;
              
              let confirmations = if (txHeight == 0) {
                0; // Unconfirmed
              } else if (currentHeight >= txHeight) {
                Nat32.toNat(currentHeight - txHeight + 1);
              } else {
                0;
              };
              
              // Update lowest confirmations
              if (confirmations < lowestConfirmations) {
                lowestConfirmations := confirmations;
              };
              
              // Track the latest transaction ID
              latestTxid := ?utxo.outpoint.txid;
            };
            
            // Check if we've received enough
            if (totalReceived >= payment.amount) {
              // Determine the new status
              let newStatus = if (lowestConfirmations == 0) {
                #detected;
              } else if (lowestConfirmations < REQUIRED_CONFIRMATIONS) {
                #confirming;
              } else {
                #confirmed;
              };
              
              // Update the payment status
              ignore paymentProcessor.updatePaymentStatus(
                payment.id,
                newStatus,
                latestTxid,
                ?lowestConfirmations
              );
              
              return #ok(newStatus);
            };
            
            // Not enough funds received
            return #ok(payment.status);
          } catch (error) {
            return #err("Error checking Bitcoin payment: " # Error.message(error));
          };
        };
      };
    };
    
    // Create a payment request with a generated Bitcoin address
    public func createPaymentWithAddress(caller: Principal, amount: Nat64, description: Text) : async Result.Result<Types.PaymentRequest, Text> {
      try {
        // Generate a unique payment ID
        let paymentId = Int.toText(Time.now());
        
        // Generate Bitcoin address for this payment
        let addressResult = await generateBitcoinAddress(paymentId);
        
        switch (addressResult) {
          case (#err(e)) {
            return #err(e);
          };
          case (#ok(btcAddress)) {
            // Create payment request with the generated address
            return paymentProcessor.createPaymentRequest(caller, amount, description, btcAddress);
          };
        };
      } catch (error) {
        #err("Error creating payment: " # Error.message(error))
      }
    };
// Process all pending payments
public func processPayments() : async () {
  let pendingPayments = paymentProcessor.getPaymentsByStatus(#pending);
  let detectedPayments = paymentProcessor.getPaymentsByStatus(#detected);
  let confirmingPayments = paymentProcessor.getPaymentsByStatus(#confirming);
  
  // Combine all payment statuses that need checking
  let paymentsToCheck = Array.append(pendingPayments, Array.append(detectedPayments, confirmingPayments));
  
  for (payment in paymentsToCheck.vals()) {
    ignore await checkPayment(payment.btcAddress);
  };
};

  }; 
} 