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

### Recover

Once you send BTC to the commit address -- if the wrong amount is sent the inscription process fails and there's no easy way to recover. However, Taproot enables fund recovery and we have it enabled

```ts
const recover = transaction.recover();

```
---

### Fetch And Select Suitable Unspent

Gives the ability to select suitable UTXO for a commit address

```ts
const fetchAndSelectSuitableUnspent = transction.fetchAndSelectSuitableUnspent();
```
{% data title="Response" %}
    {% data-item name="UTXO" type="object"/%}
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
const build = transaction.build();
```
---

### To PSBT

Generates the PSBT that can be signed and relayed

```ts
const toPsbt = transaction.toPsbt();
```

{% data title="Response" %}
    {% data-item name="PSBT" type="object"/%}
{% /data %}


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

### Example

Full example of the inscription flow using `Ordit` class

```js
import { Ordit } from "@sadoprotocol/ordit-sdk"

const MNEMONIC = "<12-words-mnemonic>"

async function main() {
  // init wallet
  const wallet = new Ordit({
    bip39: MNEMONIC,
    network: "testnet"
  });

  wallet.setDefaultAddress('taproot')

  // new inscription tx
  const transaction = Ordit.inscription.new({
    network: "testnet",
    publicKey: wallet.publicKey,
    changeAddress: wallet.selectedAddress,
    destination: wallet.selectedAddress,
    mediaContent: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGElEQVR4nO2by04UQRSGvw34CjoGDAQ3XhDXRnTBAiG4ExMn8QlMmHh5ghE2OOMTsOPmgkSJuhiIuNCVvgFGRia6YFxoNPEGjClyOjlpZyKMU101dn1Jp5Pups7pw+mqv07VQCAQCARaTg9wDcgDc8AjYEXOc3I9C/TyH3EamAbKQO0Ah3n+HtBPmzIIlBq83DawAbwGXsp5Q67Xe74k7bUFR4CF2AvsAGtADjgLdDb42065n5Pnd2LtLAIZPOYSsKUc/grcB4412V43UAS+qDarwAgechPYVY4utPC/ZdqZV20bO7fwiLxy7jNw1ZKdcWk/sjWFB9xQDn0Azli2dwLYVDbv4Pib3xVH3ss4nwSmT6moz2EUR739lkr7UwnbP6k+h6qL0WFRpaFRby64EhsiE2Mw1tu7RI8OF5MyWlLjvGthclT8MP6sJqXta3IYkeIDReXTgG1j00reNqvwWk23ks0F28bKYshodZ94Jn69s2mkR6WambD4RE751mfLSFYZMbM2nxhQvl23rfm3gUP4RQfwU/y7a8vIrBh4i5+8Ef+MNrDCshgwFRwfeSX+PbYtgF7gJ8/FPzMiWGE57Rkwm/Y+IK9GgUaFTR9GgUlbRrJp1wG9baIEj9s0VE7zXCA+GzSzMB/oUrNBsw5hlX6VatannvukkGQ9wLeKUEZVhBL7LC+oiFsbc5uoCZ53VRUex31VeMlF6lXVuoCp0yeJWSH6JPY/AodxwIhaGaokWCPsUstjpvcfwyG3VRpWEsiE+NrgDB4wFVsdHrf4zUdpHx3fXa0N1ssEvT9gvsX7A+ZiO05m5OW9CsKo6hgjnVD8B8XYJSInGuejDm9M2fMuCBngQYM9QhOyf8BMXevRIfcnRNvH9wgt1entvQxCJJZWG+z6+gWsS2VpRc7rcr3e82t/ETneBgHR5gWZpdUOcGzKxGa/2t7rIET0SbFiUjrJJ5IBT6WTm5T7zc7n2yIIthkGvkkQfgCXSSHDIQiEIBhCJhCCsEfIBEIQ9giZwJ9iaYiUB+EhKWVIfqx1zrUjgUAggG/8BsfNc0SX+zvYAAAAAElFTkSuQmCC', // replace w/ base64 content of your file
    mediaType: "image/png",
    feeRate: 15,
    // Supports OIP-1: https://github.com/sadoprotocol/oips/blob/main/oip-01-inscription-metadata.md
    meta: { // Flexible object: Record<string, any>
      title: "Example title",
      desc: "Lorem ipsum",
      slug: "cool-digital-artifact",
      creator: {
        name: "Your Name",
        email: "artist@example.org",
        address: wallet.selectedAddress
      }
    },
    postage: 1500 // base value of the inscription in sats
  })

  // generate deposit address and fee for inscription
  const revealed = transaction.generateCommit();
  console.log(revealed) // deposit revealFee to address

  // confirm if deposit address has been funded
  const ready = await transaction.isReady();

  // this validation will pass only after deposit of revealFee to address has atleast 1 confirmation
  if (ready || transaction.ready) {
    // build transaction
    transaction.build();

    // sign transaction
    const signature = wallet.signPsbt(transaction.toHex(), { finalized: true });

    // Broadcast transaction
    const tx = await wallet.relayTx(signature, "testnet");
    console.log(tx);
  }
}

main();
```