---
title: Making Sell Orders
pageTitle: Sado - Self-Authenticating Decentralized Orderbooks
description: A protocol for selling, buying and trading Ordinals on the bitcoin network.
---

## Order

Sell orders is represented in a JSON object that is submitted to IPFS which generates a CID ensuring underlying data is not changing. This enables identification of immutable updates when creating additional orders with different values for the same ordinal.

### Data

Required JSON In order to make a sell order:

Key       | Type   | Description
----------|--------|--------------
type      | "sell" | 
ts        | number | Timestamp to act as a nonce
location  | string | Location of the ordinal being sold (*txid:vout*) format
cardinals | number | Lowest denomination required to purchase the ordinal
maker     | string | Address of the maker correlating to the key used in signature

Optional JSON parameters for making sell orders:

Key       | Type   | Description
----------|--------|--------------
expiry    | number | Block height at which the offer should no longer be valid
satoshi   | number | Can be used to replace cardinals to indicate specific ordinal location required
meta      | string | JSON string containing additional meta pertaining to ordinal

Messages must then be signed and signature added to JSON as follows:

Key       | Type   | Description
----------|--------|--------------
signature | string | Signature of signing the JSON string with the sellers private key
desc      | string | Additional field required for BECH32 signature standard

### Example

An example SELL order can be seen below:

```ts
{
    type: "sell",
    ts: 1679737275283,
    location: "85a65e72fa42ef6937e1edcda2d4f28dacff1141a803416caae36c584ed4cc5f:0",
    cardinals: 1000001,
    maker: "bcrt1p4stjdtqpf8tx5zfhl3aerl7csvzxz8g6hqj0s3ywldtrdagnpcsqzmmjfw",
    signature: "H6Sw5AgnN7i/3R0JlTZ6jo2h8CGzgot/++rMwZeK4xmYGy+V/w82NHG4MKZe4MRxQVrdf++RteInvAQ9u1KGteY=",
    desc: "tr([f73a2091/86'/1'/0']tpubDCSmR8wkbXm1XLqJ3mtgoTCb7kGYWEj2Mz89XM4Qxo6aKTUpEZqE9RCJnJfTGRVVsarssCBocvRmY7opp9V9ayqoLcFb9k1ggt6xFk4tpSG/1/*)#u7lw3a02",
    meta: "{name: \"My Ordinal\", url: \"http://myurl.com\"}"
}
```

Messages are then added to IPFS in order to generate a CID, which is then added within the OP_RETURN of a transaction with outputs to the ordinal owner and any collation addresses used to publicly publish or moderate orderbooks.

The OP_RETURN must follow the following format:

```
sado=order:<CID_FROM_IPFS_ORDER>
```