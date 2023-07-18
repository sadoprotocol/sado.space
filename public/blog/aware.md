---
title: Why worry about being ordinal-aware?
pageTitle: Sado Space - Defining What Ordinal-Aware Means
description: Introducing The Benefits of Sado Space
---

## Introductions

Ordinal Theory has been around since 1883. It is a form of mathematical notation used to describe infinite sets of numbers. However, it was only in 2023 that it was applied to Bitcoin as a way of tracking individual satoshis, the lowest denomination of Bitcoin. Ordinal Theory gives satoshis individual identities and allows them to be tracked by linking them to `inscription` data that is permanently stored on the blockchain within segregated-witness scripts.

Although inscription media content and type can be painstakingly extracted from raw blockchain data, tracking the onwership of those inscriptions or obtaining information such as the rarity of the underlying ordinals that those inscriptions are attached to can only be gathered by communicating with your own [ORD](https://github.com/ordinals/ord) server or by using an ordinal-aware API such as [Hiro](https://docs.hiro.so/ordinals).

## UTXO APIs

When building bitcoin applications, developers are required to gather information regarding the available `unspents` on a specific address, which are used to construct valid transactions. Examples of popular APIs used by many within the Bitcoin ecosystem for traditional applications includes [BlockCypher](https://www.blockcypher.com/) and [SoChain](https://sochain.com/). However, neither of these UTXO APIs are ordinal-aware. Using these services to build upon the ordinal and inscription ecosystem would be extremely dangerous and somewhat similar to picking your toenails with a samurai sword whilst blindfolded. Loss of rare sats or accidentally sending inscriptions to miners are common problems when using tools and services that are not ordinal aware.

## Ordinal-Aware APIs

This is why we created our own UTXO [parser](https://github.com/sadoprotocol/utxo-parser) and [API](https://github.com/sadoprotocol/utxo-parser) for handling ordinals. Searching for `unspents` using this service would result in data such as:

```
{
  "success": true,
  "message": "Wallet balance attached to data",
  "data": {
    "counts": {
      "addresses": 4,
      "unspents": 5,
      "satoshis": 2013251,
      "cardinals": 2003251,
      "spendables": 4,
      "unspendables": 1,
      "ordinals": 5,
      "inscriptions": 1
    },
    "keys": [
      {
        "pub": "02e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab"
      }
    ],
    "addresses": [
      {
        "address": "muRQxntwDuMpf57yqTrpFVxgGceYdSUELJ",
        "format": "legacy",
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
        ],
        "counts": {
          "unspents": 2,
          "satoshis": 23143,
          "cardinals": 13143,
          "spendables": 1,
          "unspendables": 1
        }
      },
      {
        "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
        "format": "segwit",
        "unspents": [
          {
            "n": 0,
            "txHash": "718cefacb757ec23b4b9bcf8be9091c281196667f63277e2ae34607ce7fa0e7c",
            "blockHash": "00000000000014d79b36a024ed9fadf6d7a867ada034f9ffaefa42b4f08ecfc9",
            "blockN": 2436701,
            "sats": 10403,
            "scriptPubKey": {
              "asm": "OP_HASH160 4e7f566a98490694b347060ca1f283e0098f3f8c OP_EQUAL",
              "desc": "addr(2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx)#0sl6295x",
              "hex": "a9144e7f566a98490694b347060ca1f283e0098f3f8c87",
              "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
              "type": "scripthash"
            },
            "txid": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309",
            "value": 0.00010403,
            "ordinals": [
              {
                "number": 1443518417160379,
                "decimal": "367407.917160379",
                "degree": "0°157407′495″917160379‴",
                "name": "dpwqebpgzoo",
                "height": 367407,
                "cycle": 0,
                "epoch": 1,
                "period": 182,
                "offset": 917160379,
                "rarity": "common",
                "output": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309:0",
                "start": 1443518417160379,
                "size": 10403,
                "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
                "unspent": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309"
              }
            ],
            "inscriptions": [],
            "safeToSpend": true
          }
        ],
        "counts": {
          "unspents": 1,
          "satoshis": 10403,
          "cardinals": 10403,
          "spendables": 1,
          "unspendables": 0
        }
      },
      {
        "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
        "format": "bech32",
        "unspents": [
          {
            "n": 0,
            "txHash": "094fa2efbef994b89499490126e68df8cb0112e445c97be4de4ef8edce140148",
            "blockHash": "000000000000000a7beca55b94cfa0baca28b91e4a588cdf2ffe69b0a4cf28ba",
            "blockN": 2436702,
            "sats": 1971705,
            "scriptPubKey": {
              "asm": "0 988586c4efaa40e74e05c22adabc0c4c41d1c947",
              "desc": "addr(tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca)#e72wzf75",
              "hex": "0014988586c4efaa40e74e05c22adabc0c4c41d1c947",
              "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
              "type": "witness_v0_keyhash"
            },
            "txid": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c",
            "value": 0.01971705,
            "ordinals": [
              {
                "number": 1542447330099256,
                "decimal": "406978.2330099256",
                "degree": "0°196978′1762″2330099256‴",
                "name": "cxqxamkvhzt",
                "height": 406978,
                "cycle": 0,
                "epoch": 1,
                "period": 201,
                "offset": 2330099256,
                "rarity": "common",
                "output": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c:0",
                "start": 1542447330099256,
                "size": 1971705,
                "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
                "unspent": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c"
              }
            ],
            "inscriptions": [],
            "safeToSpend": true
          }
        ],
        "counts": {
          "unspents": 1,
          "satoshis": 1971705,
          "cardinals": 1971705,
          "spendables": 1,
          "unspendables": 0
        }
      },
      {
        "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
        "xkey": "e4b3865f15142e6553d87cfa0d44dd3058b83fabe3ef98c9204f26d5f2dc74ab",
        "format": "taproot",
        "unspents": [
          {
            "n": 0,
            "txHash": "62fca4964bc5615312b6b37ce509a85501be5890312b45de53664dcd43cd7158",
            "blockHash": "00000000000014d79b36a024ed9fadf6d7a867ada034f9ffaefa42b4f08ecfc9",
            "blockN": 2436701,
            "sats": 8000,
            "scriptPubKey": {
              "asm": "1 d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42",
              "desc": "rawtr(d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42)#hxsh0nqe",
              "hex": "5120d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42",
              "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
              "type": "witness_v1_taproot"
            },
            "txid": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b",
            "value": 0.00008,
            "ordinals": [
              {
                "number": 2010231744606749,
                "decimal": "972741.182106749",
                "degree": "0°132741′1029″182106749‴",
                "name": "pmvoidcito",
                "height": 972741,
                "cycle": 0,
                "epoch": 4,
                "period": 482,
                "offset": 182106749,
                "rarity": "common",
                "output": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b:0",
                "start": 2010231744606749,
                "size": 8000,
                "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
                "unspent": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b"
              }
            ],
            "inscriptions": [],
            "safeToSpend": true
          }
        ],
        "counts": {
          "unspents": 1,
          "satoshis": 8000,
          "cardinals": 8000,
          "spendables": 1,
          "unspendables": 0
        }
      }
    ],
    "spendables": [
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
        "txHash": "718cefacb757ec23b4b9bcf8be9091c281196667f63277e2ae34607ce7fa0e7c",
        "blockHash": "00000000000014d79b36a024ed9fadf6d7a867ada034f9ffaefa42b4f08ecfc9",
        "blockN": 2436701,
        "sats": 10403,
        "scriptPubKey": {
          "asm": "OP_HASH160 4e7f566a98490694b347060ca1f283e0098f3f8c OP_EQUAL",
          "desc": "addr(2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx)#0sl6295x",
          "hex": "a9144e7f566a98490694b347060ca1f283e0098f3f8c87",
          "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
          "type": "scripthash"
        },
        "txid": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309",
        "value": 0.00010403,
        "ordinals": [
          {
            "number": 1443518417160379,
            "decimal": "367407.917160379",
            "degree": "0°157407′495″917160379‴",
            "name": "dpwqebpgzoo",
            "height": 367407,
            "cycle": 0,
            "epoch": 1,
            "period": 182,
            "offset": 917160379,
            "rarity": "common",
            "output": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309:0",
            "start": 1443518417160379,
            "size": 10403,
            "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
            "unspent": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309"
          }
        ],
        "inscriptions": [],
        "safeToSpend": true
      },
      {
        "n": 0,
        "txHash": "094fa2efbef994b89499490126e68df8cb0112e445c97be4de4ef8edce140148",
        "blockHash": "000000000000000a7beca55b94cfa0baca28b91e4a588cdf2ffe69b0a4cf28ba",
        "blockN": 2436702,
        "sats": 1971705,
        "scriptPubKey": {
          "asm": "0 988586c4efaa40e74e05c22adabc0c4c41d1c947",
          "desc": "addr(tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca)#e72wzf75",
          "hex": "0014988586c4efaa40e74e05c22adabc0c4c41d1c947",
          "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
          "type": "witness_v0_keyhash"
        },
        "txid": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c",
        "value": 0.01971705,
        "ordinals": [
          {
            "number": 1542447330099256,
            "decimal": "406978.2330099256",
            "degree": "0°196978′1762″2330099256‴",
            "name": "cxqxamkvhzt",
            "height": 406978,
            "cycle": 0,
            "epoch": 1,
            "period": 201,
            "offset": 2330099256,
            "rarity": "common",
            "output": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c:0",
            "start": 1542447330099256,
            "size": 1971705,
            "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
            "unspent": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c"
          }
        ],
        "inscriptions": [],
        "safeToSpend": true
      },
      {
        "n": 0,
        "txHash": "62fca4964bc5615312b6b37ce509a85501be5890312b45de53664dcd43cd7158",
        "blockHash": "00000000000014d79b36a024ed9fadf6d7a867ada034f9ffaefa42b4f08ecfc9",
        "blockN": 2436701,
        "sats": 8000,
        "scriptPubKey": {
          "asm": "1 d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42",
          "desc": "rawtr(d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42)#hxsh0nqe",
          "hex": "5120d596bbc2fec2c635629feca7849460b3610a5af6843efaed7fc7e1b14b16af42",
          "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
          "type": "witness_v1_taproot"
        },
        "txid": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b",
        "value": 0.00008,
        "ordinals": [
          {
            "number": 2010231744606749,
            "decimal": "972741.182106749",
            "degree": "0°132741′1029″182106749‴",
            "name": "pmvoidcito",
            "height": 972741,
            "cycle": 0,
            "epoch": 4,
            "period": 482,
            "offset": 182106749,
            "rarity": "common",
            "output": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b:0",
            "start": 2010231744606749,
            "size": 8000,
            "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
            "unspent": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b"
          }
        ],
        "inscriptions": [],
        "safeToSpend": true
      }
    ],
    "unspendables": [
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
    ],
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
      },
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
      },
      {
        "number": 1443518417160379,
        "decimal": "367407.917160379",
        "degree": "0°157407′495″917160379‴",
        "name": "dpwqebpgzoo",
        "height": 367407,
        "cycle": 0,
        "epoch": 1,
        "period": 182,
        "offset": 917160379,
        "rarity": "common",
        "output": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309:0",
        "start": 1443518417160379,
        "size": 10403,
        "address": "2MzQHEpGYFkzZYgcr4NtqbDuGGnkkSTdHWx",
        "unspent": "a685c6274fff429e84a0471870561aa0a60d773292fef9c6a8288a4e76f7f309"
      },
      {
        "number": 1542447330099256,
        "decimal": "406978.2330099256",
        "degree": "0°196978′1762″2330099256‴",
        "name": "cxqxamkvhzt",
        "height": 406978,
        "cycle": 0,
        "epoch": 1,
        "period": 201,
        "offset": 2330099256,
        "rarity": "common",
        "output": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c:0",
        "start": 1542447330099256,
        "size": 1971705,
        "address": "tb1qnzzcd3804fqwwns9cg4d40qvf3qarj28ysncca",
        "unspent": "9dab7d1182bafa4f5edb17d67f3b96ec58a20726ccc0f92fea8a42a1d2b7498c"
      },
      {
        "number": 2010231744606749,
        "decimal": "972741.182106749",
        "degree": "0°132741′1029″182106749‴",
        "name": "pmvoidcito",
        "height": 972741,
        "cycle": 0,
        "epoch": 4,
        "period": 482,
        "offset": 182106749,
        "rarity": "common",
        "output": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b:0",
        "start": 2010231744606749,
        "size": 8000,
        "address": "tb1p6ktthsh7ctrr2c5lajncf9rqkdss5khkssl04mtlclsmzjck4apq29k7gj",
        "unspent": "a7b5b7d5f0c801616163b8c049f114c27863ecaf924389a8bc75f581c90ec26b"
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
    ]
  }
}
```
