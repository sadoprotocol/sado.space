---
title: Why worry about being ordinal-aware?
pageTitle: Sado Space - Defining What Ordinal-Aware Means
description: Introducing The Benefits of Sado Space
---

## Introductions

Ordinal Theory has been around since 1883. It is a form of mathematical notation used to describe infinite sets of numbers. However, it was only in 2023 that it was applied to Bitcoin as a way of tracking individual satoshis, the lowest denomination of Bitcoin. Ordinal Theory gives satoshis individual identities and allows them to be tracked by linking them to `inscription` data that is permanently stored on the blockchain within segregated-witness scripts.

Although inscription media content and type can be painstakingly extracted from raw blockchain data, tracking the onwership of those inscriptions or obtaining information such as the rarity of the underlying ordinals that those inscriptions are attached to can only be gathered by communicating with your own ORD server or by using an ordinal-aware API.

## UTXO APIs

When building bitcoin applications, developers are required to gather information regarding the available `unspents` on a specific address, which are used to construct valid transactions. Examples of popular APIs used by many within the Bitcoin ecosystem for traditional applications includes [BlockCypher](https://www.blockcypher.com/) and SoChain(https://sochain.com/). However, neither of these UTXO APIs are ordinal-aware. Using this services to build upon the ordinal and inscription ecosystem would be extremely dangerous and somewhat similar to picking your toenails with a samurai sword whilst blindfolded.
