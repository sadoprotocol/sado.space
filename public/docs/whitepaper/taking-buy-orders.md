---
title: Taking Buy Orders
pageTitle: Sado - Self-Authenticating Decentralized Orderbooks
description: A protocol for selling, buying and trading Ordinals on the bitcoin network.
---

## Offer

Offer is represented in a JSON object that is submitted to IPFS which generates a CID ensuring underlying data is not changing. This enables identification of immutable updates when creating additional offers with different values for the same ordinal.

In order to SELL an ordinal, the taker must:

 1. Construct a partially signed bitcoin transaction (PSBT) as specified by order
 2. Sign the PSBT and construct an offer object 
 3. Add the offer object to IPFS in order to obtain an offer CID 
 4. Relay the offer CID to the order maker

### Data

The offer should be constructed as follows:

Key    | Type   | Description
-------|--------|--------------
ts     | number | Timestamp to act as a nonce
origin | string | CID of the original order
offer  | string | Signed PSBT (*Partially Signed Bitcoin Transaction*)
taker  | string | Address of the taker correlating to the key used in signature

### Example

An example order can be seen below:

```ts
{
  ts: 1680523358381,
  origin: "QmTFhPVSexToGQKP3Do8ur8UTLZ9LizZY65Mr4o1da4sv8",
  offer: "02000000029a238a7e5cb960cc2f434e731f18c5037d0f9...",
  taker: "n4N8JkE71jxqZcyVVaNJHWppr9Nb4n6eGh"
}
```

Offers are then added to IPFS in order to generate a CID, which is then added within the OP_RETURN of a transaction with outputs to the maker and any collation addresses used to publicly publish or moderate ordinalbooks.

The OP_RETURN must follow the following format:

```
sado=offer:<CID_FROM_IPFS_ORDER>
```

## Accepting

In order to accept the SELL offer, the maker must:

* Decrypt, authenticate, sign and relay PSBT