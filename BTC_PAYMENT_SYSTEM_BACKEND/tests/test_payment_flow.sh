#!/bin/bash
# tests/test_payment_flow.sh

# Deploy the canister if not already deployed
dfx deploy

# Initialize the system
dfx canister call BTC_PAYMENT_SYSTEM_backend initialize

echo "=== Creating test merchant ==="
# Register a merchant
dfx identity new test-merchant || true
dfx identity use test-merchant
dfx canister call BTC_PAYMENT_SYSTEM_backend registerMerchant '("Test Store", "test-ckbtc-address")'

echo "=== Creating payment request ==="
# Create a payment request
PAYMENT_RESULT=$(dfx canister call BTC_PAYMENT_SYSTEM_backend createPaymentRequest '(100000 : nat64, "Test Order #123")')
echo $PAYMENT_RESULT

# Extract Bitcoin address from the result (this is a simplified version)
BTC_ADDRESS=$(echo $PAYMENT_RESULT | grep -o 'btcAddress = "[^"]*' | cut -d'"' -f2)
echo "Bitcoin Address: $BTC_ADDRESS"

echo "=== Checking payment (before sending Bitcoin) ==="
# Check the payment status (should be pending)
dfx canister call BTC_PAYMENT_SYSTEM_backend checkPayment "\"$BTC_ADDRESS\""

echo "=== Getting merchant payments ==="
# Get all payments for the merchant
dfx canister call BTC_PAYMENT_SYSTEM_backend getMerchantPayments

echo "=== Test complete ==="
# Return to default identity
dfx identity use default