---
title: Making Buy Orders
pageTitle: Sado - Self-Authenticating Decentralized Orderbooks
description: A protocol for selling, buying and trading Ordinals on the bitcoin network.
---

## Order

Buy orders is represented in a JSON object that is submitted to IPFS which generates a CID ensuring underlying data is not changing. This enables identification of immutable updates when creating additional orders with different values for the same ordinal.

### Data

Required JSON In order to make a sell order:

| Key       | Type   | Description                                                   |
| --------- | ------ | ------------------------------------------------------------- |
| type      | "buy"  |
| ts        | number | Timestamp to act as a nonce                                   |
| location  | string | Location of the ordinal seeking to buy (_txid:vout_) format   |
| cardinals | number | Lowest denomination offered to purchase the ordinal           |
| maker     | string | Address of the maker correlating to the key used in signature |

Optional JSON parameters for making sell orders:

| Key        | Type     | Description                                                                     |
| ---------- | -------- | ------------------------------------------------------------------------------- |
| expiry     | number   | Block height at which the offer should no longer be valid                       |
| satoshi    | number   | Can be used to replace cardinals to indicate specific ordinal location required |
| meta       | string   | JSON string containing additional meta pertaining to buyer                      |
| orderbooks | string[] | Orderbooks to list the order with                                               |

Messages must then be signed and signature added to JSON as follows:

| Key       | Type   | Description                                                      |
| --------- | ------ | ---------------------------------------------------------------- |
| signature | string | Signature of signing the JSON string with the buyers private key |
| desc      | string | Additional field required for BECH32 signature standard          |

### Example

An example BUY order can be seen below:

```ts
{
    type: "buy",
    ts: 1679737275283,
    location: "85a65e72fa42ef6937e1edcda2d4f28dacff1141a803416caae36c584ed4cc5f:0",
    cardinals: 1000001,
    maker: "mkaU8N6B9A4SPEXobjPmodpkqLuurSsEvY",
    signature: "HyqXSeUWlwnGJryOZCKH0Zm5aS1xSlQ2j+yZ6JqR98/jbmqsKSYHQ9A0zaIuiREbIL06haZPdTdIQXbRXksxg6g="
}
```

Messages are then added to IPFS in order to generate a CID, which is then added within the OP_RETURN of a transaction with outputs to the ordinal owner and any collation addresses used to publicly publish or moderate orderbooks.

The OP_RETURN must follow the following format:

```
sado=order:<CID_FROM_IPFS_ORDER>
```
