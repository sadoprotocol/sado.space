---
title: Be aware of what is ordinal-aware
pageTitle: Sado Space - Defining What Ordinal-Aware Means
description: Introducing The Benefits of Sado Space
---

## Introductions

Ordinal Theory has been around since 1883. It is a form of mathematical notation used to describe infinite sets of numbers. However, it was only in 2023 that it was applied to Bitcoin as a way of tracking individual satoshis, the lowest denomination of Bitcoin. Ordinal Theory gives satoshis individual identities and allows them to be tracked by linking them to `inscription` data that is permanently stored on the blockchain within segregated-witness scripts.

Although inscription media content and type can be painstakingly extracted from raw blockchain data, tracking the onwership of those inscriptions or obtaining information such as the rarity of the underlying ordinals that those inscriptions are attached to can only be gathered by communicating with your own [ORD](https://github.com/ordinals/ord) server or by using an ordinal-aware API such as [Hiro](https://docs.hiro.so/ordinals).

## UTXO APIs

When building bitcoin applications, developers are required to gather information regarding the available `unspents` on a specific address, which are used to construct valid transactions. Examples of popular APIs used by many within the Bitcoin ecosystem for traditional applications includes [BlockCypher](https://www.blockcypher.com/) and [SoChain](https://sochain.com/). However, neither of these UTXO APIs are ordinal-aware. Using these services to build upon the ordinal and inscription ecosystem would be extremely dangerous and somewhat similar to picking your toenails with a samurai sword whilst blindfolded. Loss of rare sats or accidentally sending inscriptions to miners are common problems when using tools and services that are not ordinal aware.

## Ordit API

This is why we created our own UTXO [parser](https://github.com/sadoprotocol/utxo-parser) and [API](https://github.com/sadoprotocol/utxo-parser) for handling ordinals. Searching for `unspents` using this service would result in data such as:

```
{
    "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
    "format": "legacy",
    "counts": {
      "unspents": 2,
      "satoshis": 23143,
      "cardinals": 13143,
      "spendables": 1,
      "unspendables": 1
    },
    "unspents": [
      {
        "n": 0,
        "txHash": "1aeb94cf504b30f9bd2b9698363f76e82a4097fb88546eea831cebe5f534b03c",
        "blockHash": "000000000000000a7beca55b94cfa0baca28b91e4a588cdf2ffe69b0a4cf28ba",
        "blockN": 2436702,
        "sats": 13143,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 988586c4efaa40e74e05c22adabc0c4c41d1c947 OP_EQUALVERIFY OP_CHECKSIG",
          "desc": "addr(muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ)#93gcuafy",
          "hex": "76a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac",
          "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
          "type": "pubkeyhash"
        },
        "txid": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de",
        "value": 0.00013143,
        "ordinals": [
          {
            "number": 1449618359923000,
            "decimal": "369847.859923000",
            "degree": "0°159847′919″859923000‴",
            "name": "dotkrtwhdev",
            "height": 369847,
            "cycle": 0,
            "epoch": 1,
            "period": 183,
            "offset": 859923000,
            "rarity": "common",
            "output": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de:0",
            "start": 1449618359923000,
            "size": 13143,
            "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
            "unspent": "394cba262d8a665c491a7fc82478093e5fa3d9c4e335c7a6f3cb3808782ca0de"
          }
        ],
        "inscriptions": [],
        "safeToSpend": true
      },
      {
        "n": 0,
        "txHash": "dc9e180ecf9feb84d5288ee0eaa4e8a4c560087b7654b8752b6d5f58de41dd80",
        "blockHash": "00000000000000085efe08ad8bace9c1920def9245c1ee1c8d7f662bfcf22b3b",
        "blockN": 2436708,
        "sats": 10000,
        "scriptPubKey": {
          "asm": "OP_DUP OP_HASH160 988586c4efaa40e74e05c22adabc0c4c41d1c947 OP_EQUALVERIFY OP_CHECKSIG",
          "desc": "addr(muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ)#93gcuafy",
          "hex": "76a914988586c4efaa40e74e05c22adabc0c4c41d1c94788ac",
          "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
          "type": "pubkeyhash"
        },
        "txid": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a",
        "value": 0.0001,
        "ordinals": [
          {
            "number": 1355923107503935,
            "decimal": "332369.607503935",
            "degree": "0°122369′1745″607503935‴",
            "name": "egacfigbocg",
            "height": 332369,
            "cycle": 0,
            "epoch": 1,
            "period": 164,
            "offset": 607503935,
            "rarity": "common",
            "output": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0",
            "start": 1355923107503935,
            "size": 10000,
            "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
            "unspent": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a"
          }
        ],
        "inscriptions": [
          {
            "id": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655ai0",
            "outpoint": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0",
            "owner": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
            "fee": 3440,
            "height": 2436708,
            "number": 8623,
            "sat": 1355923107503935,
            "timestamp": 1686105703,
            "media_type": "image/jpeg",
            "media_size": 868,
            "media_content": "https://testnet.ordit.io/utxo/inscriptions/d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a:0/d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655ai0/media",
            "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
            "unspent": "d0587ea5327cacb279690d2e89a5aeb07d6ca40ab30a2fb711979520f8f1655a"
          }
        ],
        "safeToSpend": false
      }
    ]
}
```
## Support

We utilize &amp; support this ordinal-aware API through the following tools:

* [SADO](https://sado.space/docs/sdk-introduction) API and SDK - self-authenticating decentralized orderbooks
* [IPFS](https://sado.space/docs/ipfs-introduction) API and SDK - interplanetary file-system pinning service
* [ORDIT](https://sado.space/docs/ordit-introduction) API and SDK - ordinal aware UTXO builder
