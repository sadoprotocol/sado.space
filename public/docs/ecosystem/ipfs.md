---
title: InterPlanetary File System
pageTitle: SADO - Self-Authenticating Decentralized Orderbooks
description: A protocol for selling, buying and trading Ordinals on the bitcoin network.
---

A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by making the web upgradeable, resilient, and more open.

{% quick-links %}
{% quick-link title="IPFS" href="https://ipfs.tech/" description="A peer-to-peer hypermedia protocol." /%}
{% quick-link title="Docs" href="https://docs.ipfs.tech/" description="Get familiarized with IPFS by reading through their documentation." /%}
{% /quick-links %}

SADO Protocol uses IPFS to facilitate storage of files that are too large to store on the blockchain. With the **OP_RETURN** on transaction outputs being limited to **80 bytes** we need a storage system that can account for the additional storage requirement of orders and offers.

IPFS produces a deterministic CID *(Content Identifier)* which is the hash value of the order/offer object. The nature of this storage system allows us to confidently reduce a larger amount of data into a smaller hash identifier.

IPFS is also a decentralized file system which enhances storage limitations of the blockchain while retaining the ideals that makes it so powerful.
