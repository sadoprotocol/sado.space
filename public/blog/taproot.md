---
title: Tapping into the magic of taproot!
pageTitle: Sado Space - Exploring Taprot with OIP-03
description: Introducing OIP-03 and the Sado Space Tech Lead - Mark Smalley
---

## Introductions

My name’s [Mark](http://smalley.my/) and I’ve been building blockchain applications for just over ten years now. I’m currently the tech-lead at Sado Space, where we provide open-source tools that are used by marketplaces such as [Ordzaar](https://ordzaar.com). 

Having been in this industry for such a long time, I had no choice but to start my journey in the land of [UTXOs](https://en.wikipedia.org/wiki/Unspent_transaction_output) (unspent transaction outputs). Like many developers, I was eventually lured away by Vitalik’s shiny new toy and the exciting things that could be done within the [EVM](https://en.wikipedia.org/wiki/Ethereum#Virtual_machine) (ethereum virtual machine) using smart contracts. 

When I left the world of UTXOs behind there was really only one type of address format available and anything exciting was constrained to an `OP_RETURN`. That original address format is now known as the legacy address format and makes those gray hairs of mine really start to stand out. I spent five years working with smart contracts, but am now back again where I started and when I got here, I found myself both lost, surprised and excited all at once …

Six months ago, back before I had gray hair, I was introduced to [Bitcoin Ordinals](https://docs.ordinals.com/), which provide a way of inscribing up-to 380KB of arbitrary data into a single transaction, which was previously limited to just 80 bytes only. In order to bypass the 80 byte limit of using the `OP_RETURN` method, ordinals attach data to taproot witness scripts, which can technically take-up an entire block (4MB), but are often capped at 400KB by most miners and transaction relaying services.

Bitcoin Ordinal Inscriptions are created using taproot addresses. Not a standard taproot address, but rather a segregated witness (script) based taproot address. Unlike the traditional legacy based addresses, which can only be spent with the corresponding “private” key, SegWit addresses allow you to create non-key based accounts that can be unlocked using scripts. Both native and nested SegWit accounts in both legacy and Bech32 formats can only be linked to a single script.

However, the most exciting thing about taproot addresses is that they utilize a ScriptTree, which enables you to have multiple TapLeafs! 

__Each leaf can be linked to a different script, enabling for an array of redemption methods to be applied to a single address.__ 

Unfortunately, despite utilizing ScriptTrees, the original implementation of bitcoin inscriptions only uses a single TapLeaf, with a single method of redemption.

## Current Implementation

The simplified example below uses `BitcoinJS` to demonstrate how things work behind the scenes when generating addresses for inscriptions:

```js
var witness_script = bitcoin.script.compile([
	tweaked_public_key,
	bitcoin.opcodes.OP_CHECKSIG,
	bitcoin.opcodes.OP_FALSE, // referred to as an ENVELOPE
	bitcoin.opcodes.OP_IF, // adding false enables prunable content
	OP_PUSH("ord"), // specifies its an ordinal inscription
	OP_PUSH("text/plain;charset=utf-8"), // defines media type
	OP_PUSH("Hello World"), // media content
	bitcoin.opcodes.OP_ENDIF // end of ENVELOPE
]);

var script_tree = [{output: witness_script}];
var redeem_script = {output: witness_script, redeemVersion: 192};

var inscription = bitcoin.payments.p2tr({
	internalPubkey: sliced_public_key,
	scriptTree: script_tree,
	redeem: redeem_script,
	network: network
});

var commit_and_reveal_address = inscription.address;
```

Inscriptions are created by spending from what is known as the `commit` address, but the total fees required to `reveal` the witness script, which ultimately contains up-to 380KB of media content; must be  covered by a single UTXO.

__Any other funds sent to that address__ that are less than the required amount can rarely be recovered and __are often lost forever__.

## OIP-03 Proposal

As such - we would like to propose [OIP-03](https://www.oips.io/oip-03-recoverable-commits) for recoverable commits.

By introducing a second TapLeaf with a simplified `recover` script that does not include the content that is trying to be inscribed, the fees can - when needed; be reduced and have the potential to then enable unsuitable UTXOs to be recovered. Since redeem scripts do not affect the address - when it comes to spending from the address at the reveal phase, it is possible to use either of the redeem scripts that match those found in the initial commit ScriptTree - as seen below:

```
var inscribe_script = bitcoin.script.compile([
	tweaked_public_key,
	bitcoin.opcodes.OP_CHECKSIG,
	bitcoin.opcodes.OP_FALSE, // referred to as an ENVELOPE
	bitcoin.opcodes.OP_IF, // adding false first enables prunable content
	OP_PUSH(“ord”), // specifies its an ordinal inscription
	OP_PUSH(“text/plain;charset=utf-8”), // defines media type
	OP_PUSH(“Hello Blockchain Developers of Malaysia”), // media content
	bitcoin.opcodes.OP_ENDIF // end of ENVELOPE
]);

var recover_script = bitcoin.script.compile([
	tweaked_public_key,
	bitcoin.opcodes.OP_CHECKSIG
]);

var script_tree = [{output: inscribe_script}, {output: recover_script}];
var inscribe = {output: inscribe_script, redeemVersion: 192};
var recover = {output: recover_script, redeemVersion: 192};

var inscription = bitcoin.payments.p2tr({
	internalPubkey: slicedPubKey,
	scriptTree: script_tree,
	redeem: inscribe, // this can be inscribe or recover
	network: network
});

var recoverable_commit_and_reveal_address = inscription.address;
```

## Conclusions

In my opinion, this provides an excellent example of the power taproot ScriptTrees bring. Combining multiple redemption methods allows for a whole host of exciting use-cases - speaking of which, We are working on several open-source tools at Sado Space to help support decentralized marketplaces such as [Ordzaar](https://ordzaar.com).

These tools include:

* [SADO](https://sado.space/docs/sdk-introduction) API and SDK - self-authenticating decentralized orderbooks
* [IPFS](https://sado.space/docs/ipfs-introduction) API and SDK - interplanetary file-system pinning service
* [ORDIT](https://sado.space/docs/ordit-introduction) API and SDK - ordinal aware UTXO builder

Other engineers from our team will introduce themselves and these projects over the coming weeks, so stay tuned and definitely reach out if you have any questions about this or any of the work we are doing in the bitcoin ordinal and inscription space.

{% callout title="Need Help or Have an Idea for Improvements?" type="note" %}
Please reach out to us on Twitter @[sadoprotocol](https://twitter.com/sadoprotocol) any time!
{% /callout %}

This feature is already supported by the [ORDIT SDK](https://sado.space/docs/ordit-introduction) - but do reach out if you know of any other tools or services that implement this standard whilst we wait for changes to ORD itself. Alternatively, you could use JavaScript to create your inscriptions instead and you might then be able to avoid sprouting gray hairs as I did 🙂

