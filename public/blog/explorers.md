---
title: Introducing the Sado Mono Explorers
pageTitle: Sado Space - Ordinal Aware UTXO Explorers
description: Introducing the Sado Orderbook and Inscription Explorers
---

## Introductions

There are plenty of Bitcoin explorers out there to help users track the relevant inputs and outputs associated with UTXO based blockchains - from the simplicity of [SoChain](https://chain.so/) to the bleeding edge of [Mempool.Space](https://mempool.space/). Blockchain explorers play a critical role for developers regardless of what they have been tasked with building. Nonetheless, when it comes to building within the ordinal ecosystem, these traditional UTXO explorers are not enough.

Since what is currently the only client implementation of the ordinal protocol comes fully equipped with its own rust-based HTML explorer, there are countless inscription and ordinal explorers out there that are easily accessible by all. From the classic [Ordinals.com](https://ordinals.com/) to the super slick filterable [Ord.io](https://www.ord.io/) - without these, developers working with the ordinal protocol would be lost. However, very few support the testnet needed by developers when debugging prototypes.

When we first started working in the space, we found ourselves switching between the two kinds of explorers, as there was no one explorer that provided UTXO blockchain data that was also ordinal aware, which was the primary reason for starting to work on our own. We wanted to build a tool that could be used to produce multiple explorers from a since repo, not to mention support both public and testnet environments, as well as our own private network, which features generous faucets and instant blocks when transacting via our APIs.


## Current Implementation

You can see the mono-explorer in action by visiting either the [Ordzaar Explorer](https://explorer.ordzaar.com/) or [Sado Explorer](https://explorer.sado.space/), both of which are powered from the same source and if you take a closer look at this [example](https://testnet.explorer.sado.space/address/tb1pudqjep9ae6zv7u8puw3zha3hvj5srndcgd8vr980ejqvm88lnarshcv32x) wallet address, you will see that we provide four different tabs:

* __Inscriptions__ - with support for HTML, video, audio and images
* __Ordinals__ - allowing you to validate names, numbers and rarity
* __Orders__ - detailed information regarding sado [orderbook](https://marketplace.sado.space/) updates
* __Inputs & Outputs__ - the regular data found at traditional UTXO explorers


## Conclusions

You will notice that like everything across our stack that is ordinal aware, we not only display the total balance (Satoshis) for an address, but also show the Safe to Spend (Cardinals) too. Our [mono-explorer](https://github.com/sadoprotocol/mono-explorer) also acts as a good example of what is possible using our newly released [Trinity](https://github.com/sadoprotocol/ordit) API stack, which not only acts as a full UTXO parser, but also features native inscription indexing that does not rely upon ord for anything other than current sat positions.

{% callout title="Need Help with the Sado Stack?" type="note" %}
Please reach out to us on Twitter @[sadoprotocol](https://twitter.com/sadoprotocol) any time!
{% /callout %}
