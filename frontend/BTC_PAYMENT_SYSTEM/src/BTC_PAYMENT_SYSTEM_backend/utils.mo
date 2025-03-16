// src/BTC_PAYMENT_SYSTEM_backend/utils.mo

import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Nat32 "mo:base/Nat32";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Hash "mo:base/Hash";

module {
  // Simple UUID generator
  public func generateUUID() : Text {
    let now = Time.now();
    // Convert time to text for simplicity
    let timeText = Int.toText(now);
    let prefix = "id-";
    
    // Use the timestamp as a simple pseudo-random string
    return prefix # timeText;
  };
}