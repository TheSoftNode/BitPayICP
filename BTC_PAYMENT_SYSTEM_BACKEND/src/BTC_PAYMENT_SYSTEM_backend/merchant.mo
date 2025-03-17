// src/BTC_PAYMENT_SYSTEM_backend/merchant.mo

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Types "./types";

module {
  public class MerchantManager() {
    // Storage for merchant data
    private let merchants = HashMap.HashMap<Types.MerchantId, Types.Merchant>(10, Principal.equal, Principal.hash);
    
    // Register a new merchant
    public func registerMerchant(
      caller: Principal,
      name: Text,
      ckbtcAddress: Text
    ) : Result.Result<Types.Merchant, Text> {
      // Prevent anonymous principal from registering
      if (Principal.isAnonymous(caller)) {
        return #err("Cannot register with anonymous principal");
      };
      
      // Check if merchant already exists
      switch (merchants.get(caller)) {
        case (?_) {
          return #err("Merchant already registered");
        };
        case (null) {
          // Create new merchant record
          let newMerchant : Types.Merchant = {
            id = caller;
            name = name;
            ckbtcAddress = ckbtcAddress;
            autoConvert = false;
            preferredStablecoin = null;
            createdAt = Time.now();
          };
          
          // Store the merchant record
          merchants.put(caller, newMerchant);
          return #ok(newMerchant);
        };
      };
    };
    
    // Update merchant settings
    public func updateMerchantSettings(
      caller: Principal,
      autoConvert: Bool,
      preferredStablecoin: ?Text
    ) : Result.Result<Types.Merchant, Text> {
      switch (merchants.get(caller)) {
        case (null) {
          return #err("Merchant not found");
        };
        case (?merchant) {
          // Create updated merchant record with new settings
          let updatedMerchant : Types.Merchant = {
            id = merchant.id;
            name = merchant.name;
            ckbtcAddress = merchant.ckbtcAddress;
            autoConvert = autoConvert;
            preferredStablecoin = preferredStablecoin;
            createdAt = merchant.createdAt;
          };
          
          // Update merchant record in storage
          merchants.put(caller, updatedMerchant);
          return #ok(updatedMerchant);
        };
      };
    };
    
    // Get merchant by ID (Principal)
    public func getMerchant(id: Principal) : ?Types.Merchant {
      merchants.get(id);
    };
    
    // Check if merchant is registered
    public func isMerchantRegistered(id: Principal) : Bool {
      switch (merchants.get(id)) {
        case (null) { false };
        case (?_) { true };
      };
    };
    
    // Get all registered merchants
    public func getAllMerchants() : [Types.Merchant] {
      var allMerchants : [Types.Merchant] = [];
      for ((_, merchant) in merchants.entries()) {
        allMerchants := Array.append(allMerchants, [merchant]);
      };
      allMerchants;
    };
  };
}