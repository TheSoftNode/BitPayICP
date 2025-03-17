// src/BTC_PAYMENT_SYSTEM_backend/ckbtc_integration.mo

import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import ExperimentalCycles "mo:base/ExperimentalCycles";
import Types "./types";
import Payment "./payment";

module {
  public class CkBtcManager(paymentProcessor: Payment.PaymentProcessor) {
    // Configuration
    private let NETWORK : Types.Network = #testnet; // Use #mainnet for production

    // Cycles needed for API calls
    private let UPDATE_BALANCE_CYCLES : Nat = 10_000_000_000;
    
    // ckBTC minter canister
    // private let ckbtc_minter : Types.CkBtcMinterActor = actor("mqygn-kiaaa-aaaar-qaadq-cai"); // Testnet ckBTC minter

    // ckTESTBTC minter canister
    private let ckbtc_minter : Types.CkBtcMinterActor = actor("ml52i-qqaaa-aaaar-qaaba-cai"); // ckTESTBTC minter
    
    // Cache for minter information
    private var minterInfo : ?Types.MinterInfo = null;
    
    // Initialize by fetching minter info
    public func init() : async () {
      // Use a separate async function call
      let info = await ckbtc_minter.get_minter_info();
      minterInfo := ?info;
      Debug.print("Initialized ckBTC Manager with minter info: " # debug_show(minterInfo));
    };
    // Get number of confirmations required for minting
    public func getRequiredConfirmations() : Nat32 {
      switch (minterInfo) {
        case (null) { 6 }; // Default if not initialized
        case (?info) { info.min_confirmations };
      };
    };
    
    // Process a confirmed payment to mint ckBTC
    public func mintCkBtc(payment: Types.PaymentRequest) : async Result.Result<(), Text> {
      if (payment.status != #confirmed) {
        return #err("Payment is not confirmed yet");
      };
      
      try {
        Debug.print("Minting ckBTC for payment " # payment.id);
        
        // Update payment status to minting
        ignore paymentProcessor.updatePaymentStatus(
          payment.id,
          #minting,
          payment.txId,
          ?payment.confirmations
        );
        
        ExperimentalCycles.add(UPDATE_BALANCE_CYCLES);
        
        // Call ckBTC minter to update balance and mint tokens
        let result = await ckbtc_minter.update_balance({
          owner = ?payment.merchantId;
          subaccount = null;
        });
        
        switch (result) {
          case (#Ok(utxoStatuses)) {
            // Check if our payment was processed
            var processed = false;
            
            for (status in utxoStatuses.vals()) {
              switch (status) {
                case (#Minted(info)) {
                  processed := true;
                  // Log minting details
                  Debug.print("ckBTC minted: " # debug_show(info.minted_amount) # 
                             " at block " # debug_show(info.block_index));
                };
                case (#Checked(_)) {
                  processed := true;
                };
                // Other cases indicate the payment wasn't processed correctly
                case (#ValueTooSmall(utxo)) {
                  return #err("Value too small: " # debug_show(utxo.value));
                };
                case (#Tainted(utxo)) {
                  return #err("UTXO is tainted: " # debug_show(utxo.outpoint));
                };
              };
            };
            
            if (processed) {
              // Mark payment as completed
              ignore paymentProcessor.updatePaymentStatus(
                payment.id,
                #completed,
                payment.txId,
                ?payment.confirmations
              );
              
              return #ok();
            } else {
              return #err("Payment not processed by ckBTC minter");
            };
          };
          case (#Err(e)) {
            switch (e) {
              case (#NoNewUtxos(details)) {
                // This is actually expected if the payment was already processed
                // We should check if the payment was already minted in a real implementation
                ignore paymentProcessor.updatePaymentStatus(
                  payment.id,
                  #completed,
                  payment.txId,
                  ?payment.confirmations
                );
                return #ok();
              };
              case (#GenericError(details)) {
                return #err("Generic error: " # details.error_message);
              };
              case (#TemporarilyUnavailable(msg)) {
                return #err("Service temporarily unavailable: " # msg);
              };
              case (#AlreadyProcessing) {
                return #err("Already processing this update");
              };
            };
          };
        };
      } catch (error) {
        return #err("Exception when minting ckBTC: " # Error.message(error));
      };
    };
    
    // Process all confirmed payments
    public func processConfirmedPayments() : async () {
      // Get all payments with confirmed status
      let confirmedPayments = paymentProcessor.getPaymentsByStatus(#confirmed);
      
      for (payment in confirmedPayments.vals()) {
        ignore await mintCkBtc(payment);
      };
    };
  };
}