// src/BTC_PAYMENT_SYSTEM_backend/payment.mo

import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Types "./types";
import Merchant "./merchant";
import Utils "./utils"; // Import utils for UUID generation

module {
  public class PaymentProcessor(merchantManager: Merchant.MerchantManager) {
    // Storage for payment requests
    private let payments = HashMap.HashMap<Types.PaymentId, Types.PaymentRequest>(100, Text.equal, Text.hash);
    // Map Bitcoin addresses to payment IDs for quick lookup
    private let addressToPaymentId = HashMap.HashMap<Types.BitcoinAddress, Types.PaymentId>(100, Text.equal, Text.hash);
    
    // Create a new payment request
    public func createPaymentRequest(
      caller: Principal,
      amount: Nat64,
      description: Text,
      btcAddress: Types.BitcoinAddress
    ) : Result.Result<Types.PaymentRequest, Text> {
      // Check if merchant is registered
      if (not merchantManager.isMerchantRegistered(caller)) {
        return #err("Merchant not registered");
      };
      
      // Generate unique payment ID
      let paymentId = Utils.generateUUID();
      let now = Time.now();
      
      // Create payment request
      let payment : Types.PaymentRequest = {
        id = paymentId;
        merchantId = caller;
        amount = amount;
        btcAddress = btcAddress;
        description = description;
        status = #pending;
        txId = null;
        confirmations = 0;
        createdAt = now;
        updatedAt = now;
      };
      
      // Store payment request
      payments.put(paymentId, payment);
      addressToPaymentId.put(btcAddress, paymentId);
      
      #ok(payment);
    };
    
    // Get payment by ID
    public func getPaymentRequest(paymentId: Types.PaymentId) : ?Types.PaymentRequest {
      payments.get(paymentId);
    };
    
    // Get payment by Bitcoin address
    public func getPaymentByAddress(btcAddress: Types.BitcoinAddress) : ?Types.PaymentRequest {
      switch (addressToPaymentId.get(btcAddress)) {
        case (null) { null };
        case (?paymentId) { payments.get(paymentId) };
      };
    };
    
    // Get all payments for a merchant
    public func getMerchantPayments(merchantId: Principal) : [Types.PaymentRequest] {
      let paymentBuffer = Buffer.Buffer<Types.PaymentRequest>(10);
      
      for ((_, payment) in payments.entries()) {
        if (Principal.equal(payment.merchantId, merchantId)) {
          paymentBuffer.add(payment);
        };
      };
      
      Buffer.toArray(paymentBuffer);
    };
    
    // Get payments by status
    public func getPaymentsByStatus(status: Types.PaymentStatus) : [Types.PaymentRequest] {
      let paymentBuffer = Buffer.Buffer<Types.PaymentRequest>(10);
      
      for ((_, payment) in payments.entries()) {
        switch (payment.status, status) {
          case (#pending, #pending) { paymentBuffer.add(payment) };
          case (#detected, #detected) { paymentBuffer.add(payment) };
          case (#confirming, #confirming) { paymentBuffer.add(payment) };
          case (#confirmed, #confirmed) { paymentBuffer.add(payment) };
          case (#minting, #minting) { paymentBuffer.add(payment) };
          case (#completed, #completed) { paymentBuffer.add(payment) };
          case (#failed, #failed) { paymentBuffer.add(payment) };
          case (_, _) { /* Status doesn't match, skip */ };
        };
      };
      
      Buffer.toArray(paymentBuffer);
    };
    
    // Update payment status
    public func updatePaymentStatus(
      paymentId: Types.PaymentId,
      status: Types.PaymentStatus,
      txId: ?Blob,
      confirmations: ?Nat
    ) : Result.Result<Types.PaymentRequest, Text> {
      switch (payments.get(paymentId)) {
        case (null) {
          return #err("Payment not found");
        };
        case (?payment) {
          // Create updated payment with new status
          let updatedPayment : Types.PaymentRequest = {
            id = payment.id;
            merchantId = payment.merchantId;
            amount = payment.amount;
            btcAddress = payment.btcAddress;
            description = payment.description;
            status = status;
            txId = switch (txId) {
              case (?id) { ?id };
              case (null) { payment.txId };
            };
            confirmations = switch (confirmations) {
              case (?conf) { conf };
              case (null) { payment.confirmations };
            };
            createdAt = payment.createdAt;
            updatedAt = Time.now();
          };
          
          // Update payment in storage
          payments.put(paymentId, updatedPayment);
          return #ok(updatedPayment);
        };
      };
    };
  };
}