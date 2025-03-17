# BITPAY - Bitcoin Payment System with Internet Computer

## Overview
BITPAY is a **Bitcoin payment system** designed to provide **fast, low-cost transactions** using **ckBTC** on the **Internet Computer (ICP)**. It leverages ICP's **Bitcoin Integration API** and UTXO tracking to facilitate **trustless, non-custodial payments**. The system is optimized for **merchants** and businesses that need a **secure and efficient way** to accept Bitcoin transactions.

![alt text](<Screenshot 2025-03-17 at 3.31.55 PM.png>)


## Features
- **ckBTC Transactions**: Utilizes **wrapped Bitcoin (ckBTC)** for **low-cost, fast transactions**.
- **Bitcoin Integration API**: Direct interaction with the **Bitcoin blockchain** for transaction tracking.
- **Trustless & Non-Custodial**: Ensures security by **eliminating third-party control** over funds.
- **UTXO-Based Payments**: Tracks unspent transaction outputs (UTXOs) to **confirm transactions**.
- **Merchant Support**: Allows businesses to create **payment requests** and track transactions.
- **Threshold ECDSA Signing**: Uses **threshold cryptography** for secure Bitcoin transactions.
- **Automated Transaction Confirmation**: Monitors payments in multiple stages (**pending, detected, confirmed**).
- **Multi-Account Management**: Enables merchants to manage **subaccounts and receive payments separately**.

## Architecture
BITPAY is built using **ICP smart contracts (canisters)** and follows a modular architecture:

1. **Bitcoin API Canister**: Interfaces with ICP's **Bitcoin Integration API** to query the blockchain.
2. **ckBTC Ledger Canister**: Maintains records of wrapped Bitcoin balances and transactions.
3. **Transaction Processor Canister**: Handles payment requests, UTXO tracking, and confirmation.
4. **Merchant Management Module**: Supports **multiple merchant accounts** and tracks payments.
5. **User Authentication**: Integrated with **Internet Identity** for secure login.




## Installation & Setup
### Prerequisites
- Install **dfx (Dfinity SDK)**
- Install **Node.js** and **npm**
- Setup **Internet Identity** (for authentication)

### Installation Steps
```sh
# Clone the repository
git clone https://github.com/your-repo/bitpay.git
cd bitpay

# Install dependencies
npm install

# Start the local DFX environment
dfx start --background

# Deploy the canisters
dfx deploy
```

## Usage
### 1. Create a Payment Request
- Merchants can create a **Bitcoin payment request** using the canister API.

### 2. Monitor Transaction Status
- The system tracks transaction states (**pending, detected, confirmed**).

### 3. Receive Payments
- Funds are credited to **merchant accounts** upon successful confirmation.

## API Reference
### Create Payment Request
```json
POST /create-payment
{
  "merchant_id": "abc123",
  "amount": 0.01,
  "currency": "BTC"
}
```

### Get Payment Status
```json
GET /payment-status/{transaction_id}
```

## Security
- Uses **Threshold ECDSA signatures** for transaction signing.
- Non-custodial architecture ensures **merchants have full control over their funds**.
- Secure **Internet Identity authentication** for user login.

## Future Enhancements
- **Mainnet support** for Bitcoin transactions.
- **Multi-signature wallets** for enhanced security.
- **Real-time transaction notifications**.
- **Integration with Lightning Network** for faster payments.

## License
This project is licensed under the **MIT License**.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes and push to your fork.
4. Submit a Pull Request.


**BITPAY - Fast, Secure, and Low-Cost Bitcoin Payments on Internet Computer** 🚀

