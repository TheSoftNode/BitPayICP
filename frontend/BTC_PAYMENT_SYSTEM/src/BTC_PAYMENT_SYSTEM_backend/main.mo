// src/BTC_PAYMENT_SYSTEM_backend/main.mo

import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Error "mo:base/Error";

import Merchant "./merchant";
import Payment "./payment";
import BitcoinTracker "./bitcoin_tracker";
import CkBtcIntegration "./ckbtc_integration";
import Types "./types";

actor BtcPaymentSystem {
  // Initialize our modules
  let merchantManager = Merchant.MerchantManager();
  let paymentProcessor = Payment.PaymentProcessor(merchantManager);
  let bitcoinTracker = BitcoinTracker.BitcoinTracker(paymentProcessor);
  let ckbtcManager = CkBtcIntegration.CkBtcManager(paymentProcessor);
  
  // System initialization
  public func initialize() : async () {
    try {
      // Initialize the ckBTC Manager
      await ckbtcManager.init();
      Debug.print("BTC Payment System initialized");
    } catch (error) {
      Debug.print("Error initializing system: " # Error.message(error));
    };
  };
  
  // ===== Merchant Management =====
  
  public shared(msg) func registerMerchant(
    name: Text,
    ckbtcAddress: Text
  ) : async Result.Result<Types.Merchant, Text> {
    merchantManager.registerMerchant(msg.caller, name, ckbtcAddress);
  };
  
  public shared(msg) func updateMerchantSettings(
    autoConvert: Bool,
    preferredStablecoin: ?Text
  ) : async Result.Result<Types.Merchant, Text> {
    merchantManager.updateMerchantSettings(msg.caller, autoConvert, preferredStablecoin);
  };
  
  public query(msg) func getMerchantProfile() : async Result.Result<Types.Merchant, Text> {
    switch (merchantManager.getMerchant(msg.caller)) {
      case (null) { #err("Merchant not found") };
      case (?merchant) { #ok(merchant) };
    };
  };
  
  // ===== Payment Processing =====
  
  public shared(msg) func createPaymentRequest(
    amount: Nat64,
    description: Text
  ) : async Result.Result<Types.PaymentRequest, Text> {
    await bitcoinTracker.createPaymentWithAddress(msg.caller, amount, description);
  };
  
  public query func getPaymentRequest(
    paymentId: Types.PaymentId
  ) : async ?Types.PaymentRequest {
    paymentProcessor.getPaymentRequest(paymentId);
  };
  
  public query(msg) func getMerchantPayments() : async [Types.PaymentRequest] {
    paymentProcessor.getMerchantPayments(msg.caller);
  };
  
  // ===== Bitcoin Integration =====
  
  public func checkPayment(
    btcAddress: Types.BitcoinAddress
  ) : async Result.Result<Types.PaymentStatus, Text> {
    await bitcoinTracker.checkPayment(btcAddress);
  };
  
  public func processPayments() : async () {
    await bitcoinTracker.processPayments();
  };
  
  // ===== ckBTC Integration =====
  
  public func processConfirmedPayments() : async () {
    await ckbtcManager.processConfirmedPayments();
  };
  
  // ===== System Management =====
  
  public func getSystemInfo() : async Text {
    "Bitcoin Payment System on Internet Computer\n" #
    "Version: 1.0.0\n" #
    "Features:\n" #
    "- Bitcoin payments via ckBTC\n" #
    "- Instant merchant settlements\n" #
    "- Automatic payment processing\n";
  };
  
  // Timer-based automated processing (optional, requires timer functionality)
  // This could be implemented with a heartbeat in a real deployment
  public func automatedProcessing() : async () {
    // Check for new payments
    await processPayments();
    
    // Process confirmed payments to mint ckBTC
    await processConfirmedPayments();
    
    Debug.print("Automated processing completed");
  };
}