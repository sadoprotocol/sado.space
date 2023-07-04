---
title: Inscription
pageTitle: Ordit SDK - Inscriptions
description: Inscriptions using Ordit SDK
---

Ordit SDK also provides two ways to work with Ordinals inscriptions. One way is to use Ordit class and access static method `Ordit.inscription.new(options)` and other way is by using `OrdTransaction` class to build Ordinals Transaction PSBT, which can then be signed by wallet instance or using your Browser wallets like Unisat, Xverse.

## Getting started
---

You can import either `Ordit` class or `OrdTransaction` class based on your choice. 

```ts
import { Ordit, OrdTransaction } from "@sadoprotocol/ordit-sdk";
```

---

## Inscription Builder

Explore two ways to create a new inscription transaction using Ordit SDK

---

### Ordit class static method

You can build an inscription transaction using Ordit class static method. See below for implementation:

```ts
const transaction = Ordit.inscription.new(options);
```

{% data title="Parameters" %}
    {% data-item name="options" type="object" required=true  /%}
    {% data-item name="options.publicKey" type="string" required=true description="Taproot public key"  /%}
    {% data-item name="options.destination" type="string" required=true description="Destination address to receive inscription. Can be Legacy address as well."  /%}
    {% data-item name="options.changeAddress" type="string" required=true description="Change address to receive leftovers. Can be Legacy address as well."  /%}
    {% data-item name="options.mediaType" type="string" required=false description="eg: `image/png`. Default value is `text/plain;charset=utf-8`"  /%}
    {% data-item name="options.mediaContent" type="string" required=true description="Base64 encoded string of media."  /%}
    {% data-item name="options.meta" type="object" required=false description="OIP-1 metadata support. You can pass arbitary metadata to be included in the inscription."  /%}
    {% data-item name="options.feeRate" type="number" required=false description="Fee rate of the transaction in v/B. Default value is 10 v/B."  /%}
    {% data-item name="options.postage" type="number" required=false description="Postage amount for the inscription."  /%}
     {% data-item name="options.network" type="string" default="testnet" required=false %}
    {% data-value name="mainnet" description="Initializes transaction with mainnet as network" /%}
    {% data-value name="testnet" description="Initializes transaction with testnet as network" /%}
    {% data-value name="regtest" description="Initializes transaction with regtest as network" /%}
  {% /data-item %}
{% /data %}

---

### OrdTransaction class

You can build an inscription transaction using OrdTransaction class. See below for implementation:

```ts
const transaction = new OrdTransaction(options)
```

{% data title="Parameters" %}
    {% data-item name="options" type="object" required=true  /%}
    {% data-item name="options.publicKey" type="string" required=true description="Taproot public key"  /%}
    {% data-item name="options.destination" type="string" required=true description="Destination address to receive inscription. Can be Legacy address as well."  /%}
    {% data-item name="options.changeAddress" type="string" required=true description="Change address to receive leftovers. Can be Legacy address as well."  /%}
    {% data-item name="options.mediaType" type="string" required=false description="eg: `image/png`. Default value is `text/plain;charset=utf-8`"  /%}
    {% data-item name="options.mediaContent" type="string" required=true description="Base64 encoded string of media."  /%}
    {% data-item name="options.meta" type="object" required=false description="OIP-1 metadata support. You can pass arbitary metadata to be included in the inscription."  /%}
    {% data-item name="options.feeRate" type="number" required=false description="Fee rate of the transaction in v/B. Default value is 10 v/B."  /%}
    {% data-item name="options.postage" type="number" required=false description="Postage amount for the inscription."  /%}
     {% data-item name="options.network" type="string" required=false default="testnet" %}
    {% data-value name="mainnet" description="Initializes transaction with mainnet as network" /%}
    {% data-value name="testnet" description="Initializes transaction with testnet as network" /%}
    {% data-value name="regtest" description="Initializes transaction with regtest as network" /%}
  {% /data-item %}
{% /data %}

---

## Methods

List of methods currently available on the OrdTransaction class.

---

### Generate Commit details

Once you've built the ordinals transaction instance, you can get the commit details by calling one of the methods on the instance. See below, for implementation:

```ts
const commitDetails = transaction.generateCommit();
```
{% data title="Response" %}
    {% data-item name="commitDetails" type="object"/%}
    {% data-item name="commitDetails.address" type="string" description="This is the deposit address you need to fund for revealing your inscription on blockchain." /%}
    {% data-item name="commitDetails.revealFee" type="number" description="This is the amount you need to fund the deposit address with for revealing your inscription on blockchain." /%}
{% /data %}

---

### Transaction Readiness

Once you've funded your deposit address you have access to another method from the same transaction instance to check if the deposit address has been funded. You can poll this method to check if the transaction is ready with funds it need.

```ts
const ready = await transaction.isReady();
```
{% data title="Response" %}
    {% data-item name="boolean"/%}
{% /data %}

---

### Build PSBT

Once your transaction is ready (`transaction.ready // true`), you can move forward with building the PSBT fully, ready to be signed by a wallet. See the implementation below:

```ts
const ready = transaction.build();
```

---

### Get Ordinals Transaction Hex

To get the hex encoded Ordinal transaction, simply call `toHex` method on transaction instance.

```ts
const hex = transaction.toHex();
```
{% data title="Response" %}
    {% data-item name="string" description="Hex encoded string of the transaction." /%}
{% /data %}

---

### Get Ordinals Transaction Base64

To get the base64 encoded Ordinal transaction, simply call `toBase64` method on transaction instance.

```ts
const base64 = transaction.toBase64();
```
{% data title="Response" %}
    {% data-item name="string" description="Base64 encoded string of the transaction." /%}
{% /data %}