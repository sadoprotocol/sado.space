---
title: Ordit
pageTitle: SADO - Self-Authenticating Decentralized Orderbooks
description: A protocol for selling, buying and trading Ordinals on the bitcoin network.
---

## Bitcoin Ordinal Web Wallet & Inscription

The Bitcoin Ordinal Web Wallet & Inscription component of Ordit is a serverless web application designed to communicate with your own private Ord server. Currently, it is intended for local, private use and lacks security measures. However, future versions of Ordit will focus on supporting secure online self-hosted web environments. Originally developed to support the SADO protocol, Ordit realized the need for an open-source, browser-based ordinal web wallet.

The Ordit JavaScript SDK provides convenient wrapper functions for the following APIs:

- **Bitcoin RPC** - Enables HTTP communication between the browser and a Bitcoin core node using the RPC protocol.
- **Ord CLI** - Facilitates HTTP communication between the browser and the Ord server using the RPC protocol.
- **IPFS** - Utilized by the SADO protocol for ordinal orderbooks.

{% callout title="You should know!" %}
To utilize the wallet and inscription functionality, the Ord server must contain the file you wish to inscribe. Ordit initiates the file upload function, transferring the file via Ord CLI to the Ord server where it becomes ready for use during the inscription process.
{% /callout %}

## Bitcoin UTXO Ordinal Aware Explorer

The Bitcoin UTXO Ordinal Aware Explorer component of Ordit serves as an indexed full-node provider for various network types, including mainnet, testnet3, and regtest. Its core responsibility is to manage the inputs and outputs of the Blockchain ledger. With the addition of an Ord server running alongside it, this component allows for the exploration of all satoshi ordinals and their rarity, as well as the inscriptions linked to the outputs of address transactions.

The following Web API endpoints serve as gateways for the Ordinal Web Wallet to inscribe digital artifacts into transactions and for SADO to monitor the activities of its orderbooks:

- **Balance** - Retrieves the balance of a specific address.
- **Tranasction** - Provides extensive information about a transaction hash.
- **Transactions** - Lists all transactions associated with a given address.
- **Unspents** - Returns outputs that can be used for transactions, along with ordinals and inscription information linked to them.
- **Relay** - Broadcasts built transactions to the node's mempool.
- **Fees** - Provides a historical summary of block fees.
- **Inscription** - Returns information and media related to an outpoint's inscription.
