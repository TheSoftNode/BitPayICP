// src/BTC_PAYMENT_SYSTEM_backend/types.mo

import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Blob "mo:base/Blob";
import Text "mo:base/Text";

module {
  // Merchant Types
  public type MerchantId = Principal;
  
  public type Merchant = {
    id: MerchantId;
    name: Text;
    ckbtcAddress: Text;
    autoConvert: Bool;
    preferredStablecoin: ?Text;
    createdAt: Int;
  };

  // Payment Types
  public type PaymentId = Text;
  public type BitcoinAddress = Text;
  
  public type PaymentStatus = {
    #pending;     // Payment request created
    #detected;    // Bitcoin transaction detected but not confirmed
    #confirming;  // Bitcoin transaction has some confirmations
    #confirmed;   // Bitcoin transaction has required confirmations
    #minting;     // ckBTC minting in progress
    #completed;   // ckBTC transferred to merchant
    #failed;      // Something went wrong
  };
  
  public type PaymentRequest = {
    id: PaymentId;
    merchantId: MerchantId;
    amount: Nat64;  // Satoshis
    btcAddress: BitcoinAddress;
    description: Text;
    status: PaymentStatus;
    txId: ?Blob;    // Bitcoin transaction ID when detected
    confirmations: Nat;
    createdAt: Int;
    updatedAt: Int;
  };

  // Bitcoin Transaction Types
  public type Network = { #mainnet; #testnet; #regtest };
  
  public type OutPoint = {
    txid: Blob;
    vout: Nat32;
  };
  
  public type Utxo = {
    outpoint: OutPoint;
    value: Nat64;  // Satoshis
    height: Nat32;
  };
  
  // ckBTC Types
  public type Account = { owner: Principal; subaccount: ?Blob };
  
  public type CkBtcTransfer = {
    paymentId: PaymentId;
    amount: Nat64;
    from: Principal;
    to: Principal;
    timestamp: Int;
    status: {
      #pending;
      #completed;
      #failed;
    };
  };

  // API Request/Response Types
  public type GetUtxosRequest = {
    address: BitcoinAddress;
    network: Network;
    filter: ?{
      min_confirmations: ?Nat32;
      page: ?Blob;
    };
  };
  
  public type GetUtxosResponse = {
    utxos: [Utxo];
    tip_block_hash: Blob;
    tip_height: Nat32;
    next_page: ?Blob;
  };
  
  // Management Canister Types for ECDSA operations
  public type ECDSAPublicKey = {
    canister_id: ?Principal;
    derivation_path: [[Nat8]];
    key_id: { curve: { #secp256k1 }; name: Text };
  };
  
  public type ECDSAPublicKeyReply = {
    public_key: Blob;
    chain_code: Blob;
  };
  
  // Management Canister Actor (for Bitcoin & ECDSA operations)
  public type ManagementCanisterActor = actor {
    bitcoin_get_balance: { address: BitcoinAddress; network: Network; min_confirmations: ?Nat32 } -> async Nat64;
    bitcoin_get_utxos: GetUtxosRequest -> async GetUtxosResponse;
    bitcoin_get_current_fee_percentiles: { network: Network } -> async [Nat64];
    bitcoin_send_transaction: { network: Network; transaction: [Nat8] } -> async ();
    ecdsa_public_key: ECDSAPublicKey -> async ECDSAPublicKeyReply;
  };
  
  // ckBTC Minter Types
  public type MinterInfo = {
    retrieve_btc_min_amount: Nat64;
    min_confirmations: Nat32;
    kyt_fee: Nat64;
  };
  
  public type UtxoStatus = {
    #ValueTooSmall: Utxo;
    #Tainted: Utxo;
    #Minted: { minted_amount: Nat64; block_index: Nat64; utxo: Utxo };
    #Checked: Utxo;
  };
  
  public type UpdateBalanceError = {
    #GenericError: { error_message: Text; error_code: Nat64 };
    #TemporarilyUnavailable: Text;
    #AlreadyProcessing;
    #NoNewUtxos: {
      suspended_utxos: ?[SuspendedUtxo];
      required_confirmations: Nat32;
      pending_utxos: ?[PendingUtxo];
      current_confirmations: ?Nat32;
    };
  };
  
  public type SuspendedUtxo = {
    utxo: Utxo;
    earliest_retry: Nat64;
    reason: { #ValueTooSmall; #Quarantined };
  };
  
  public type PendingUtxo = {
    confirmations: Nat32;
    value: Nat64;
    outpoint: OutPoint;
  };
  
  // ckBTC Minter Actor
  public type CkBtcMinterActor = actor {
    get_btc_address: { owner: ?Principal; subaccount: ?Blob } -> async Text;
    update_balance: { owner: ?Principal; subaccount: ?Blob } -> async { #Ok: [UtxoStatus]; #Err: UpdateBalanceError };
    get_minter_info: query () -> async MinterInfo;
  };
}