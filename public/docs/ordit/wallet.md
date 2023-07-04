---
title: Ordit Wallet
pageTitle: Ordit SDK - Ordit, a wallet class
description: Class for creating a wallet instance.
---

Ordit, a wallet class, when provided with BIP39 mnemonic words | Private Key | WIF | Seed, creates a wallet instance that has methods to do various wallet based operations like signing a PSBT or relaying it to the Blockchain.

## Getting started

Once installed you can create a new Ordit wallet instance. Make sure to provide one of bip39 | seed | privateKey |  WIF , when you initilise a new Ordit wallet instance.

```ts
import { Ordit } from "@sadoprotocol/ordit-sdk";

const wallet = new Ordit({
    bip39: MNEMONIC_WORDS,
    network: "mainnet",
});
```

{% data title="Parameters" %}
  {% data-item name="bip39" type="string" required=false description="BIP39 12/24 Mnemonic words of your HD wallet to create wallet instance." /%}
  {% data-item name="seed" type="string" required=false description="Seed of your HD wallet to create wallet instance." /%}
  {% data-item name="privateKey" type="string" required=false description="Private Key of your account to create wallet instance. Make sure you use Taproot account Private Key if you're planning to use this wallet for inscriptions." /%}
  {% data-item name="WIF" type="string" required=false description="WIF of your account to create wallet instance. Make sure you use Taproot account WIF if you're planning to use this wallet for inscriptions." /%}
  {% data-item name="network" type="string" required=false default="testnet" %}
    {% data-value name="mainnet" description="Initializes wallet with mainnet as network" /%}
    {% data-value name="testnet" description="Initializes wallet with testnet as network" /%}
    {% data-value name="regtest" description="Initializes wallet with regtest as network" /%}
  {% /data-item %}
{% /data %}


---

## Methods

List of methods currently available on the Ordit class.

---

### Get all addresses 

Get all addresses dervied from BIP 44,49,84,86 paths as a list. 

```ts
const addresses = wallet.getAllAddresses();
```


 {% data title="Response" %}
    {% data-item name="addresses" type="Address[]" type-link="#address" description="List of address objects belonging to Legacy, Segwit, Bech32, Taproot." /%}
{% /data %}

---

### Get addresses by type

Get an address object when one of the types  Legacy, Segwit, Bech32, Taproot provided as input.

```ts
const address = wallet.getAddressByType("legacy");
```

{% data title="Parameters" %}
     {% data-item name="string" required=true  %}
    {% data-value name="legacy" description="Address derived using BIP44 path. Usually starts with 1." /%}
    {% data-value name="segwit" description="Address derived using BIP49 path. Usually starts with 3." /%}
    {% data-value name="bech32" description="Address derived using BIP84 path. Usually starts with bc1q." /%}
    {% data-value name="taproot" description="Address derived using BIP86 path. Usually starts with bc1p." /%}
  {% /data-item %}
{% /data %}
{% data title="Response" %}
    {% data-item name="address" type="Address" type-link="#offer" description="Object of type Address." /%}
{% /data %}

---

### Set default address

Set wallet instance default address when a type is provided 

```ts
wallet.setDefaultAddress("legacy");
```

{% data title="Parameters" %}
     {% data-item name="string" required=true  %}
    {% data-value name="legacy" description="Address derived using BIP44 path. Usually starts with 1." /%}
    {% data-value name="segwit" description="Address derived using BIP49 path. Usually starts with 3." /%}
    {% data-value name="bech32" description="Address derived using BIP84 path. Usually starts with bc1q." /%}
    {% data-value name="taproot" description="Address derived using BIP86 path. Usually starts with bc1p." /%}
  {% /data-item %}
{% /data %}

---

### Sign PSBT

Sign a Partially signed bitcoin transaction. You must provide PSBT in hex or base64 format as first arg or second arg. Both shouldn't be provided at once.

To sign a PSBT from PSBT hex, below is the implementation:

```ts
const signedPsbt = wallet.signPsbt(hex);
```
{% data title="Parameters" %}
    {% data-item name="string" description="PSBT hex" required=false  /%}
    {% data-item name="string" description="PSBT Base64" required=false  /%}
{% /data %}
{% data title="Response" %}
    {% data-item name="object"  /%}
    {% data-item name="object.hex" type="string" description="Signed PSBT hex" required=true  /%}
    {% data-item name="object.base64" type="string" description="Signed PSBT Base64" required=false  /%}
{% /data %}


To sign a PSBT from PSBT base64, below is the implementation:

```ts
const signedPsbt = wallet.signPsbt(null, base64);
```

{% data title="Parameters" %}
    {% data-item name="string" description="PSBT hex" required=false  /%}
    {% data-item name="string" description="PSBT Base64" required=false  /%}
{% /data %}
{% data title="Response" %}
    {% data-item name="object"  /%}
    {% data-item name="object.hex" type="string" description="Signed PSBT hex" /%}
    {% data-item name="object.base64" type="string" description="Signed PSBT Base64" required=false  /%}
{% /data %}

---

### Relay Transaction

To submit a signed and finalized raw transaction, below is the implementation:

```ts
const submittedTransaction = wallet.relayTx(hex, network);
```
{% data title="Parameters" %}
    {% data-item name="string" description="Raw Transaction hex" required=true  /%}
    {% data-item name="network" type="string" required=false default="testnet" %}
    {% data-value name="mainnet" description="Broadcast transaction with mainnet as network" /%}
    {% data-value name="testnet" description="Broadcast transaction with testnet as network" /%}
    {% data-value name="regtest" description="Broadcast transaction with regtest as network" /%}
  {% /data-item %}
{% /data %}
{% data title="Response" %}
    {% data-item name="object"  /%}
    {% data-item name="object.hex" type="string" description="Signed PSBT hex"  /%}
    {% data-item name="object.base64" type="string" description="Signed PSBT Base64" required=false  /%}
{% /data %}

---

### Get Inscriptions

To retrieve all the inscriptions attached to the selected address of wallet instance, see the implementation below:

```ts
const inscriptions = await wallet.getInscriptions();
```
{% data title="Response" %}
    {% data-item name="inscriptions" type="Inscription[]" type-link="#inscription"  /%}
{% /data %}

---

### Get Inscription details

To retrieve details of an inscription you need to have outpoint of that inscription, see the implementation below:

```ts
const OUTPOINT =
  "105758bb912665f5f803ec0f5268d2218b51978b16de05622c64c9faafd2d22e:0";

const inscription = await Ordit.inscription.getInscriptionDetails(
  OUTPOINT,
  network
);

```
{% data title="Parameters" %}
    {% data-item name="string" description="Outpoint value of inscription" required=true  /%}
    {% data-item name="network" type="string" required=false default="testnet" %}
    {% data-value name="mainnet" description="Read the inscription from mainnet network" /%}
    {% data-value name="testnet" description="Read the inscription from testnet network" /%}
    {% data-value name="regtest" description="Read the inscription from regtest network" /%}
  {% /data-item %}
{% /data %}
{% data title="Response" %}
    {% data-item name="inscription" type="object"  /%}
    {% data-item name="inscription.success" type="boolean"  /%}
    {% data-item name="inscription.message" type="string"  /%}
    {% data-item name="inscription.rdata" type="Inscription[]" type-link="#inscription"  /%}
{% /data %}


---

## Types

List of Request and Response data shape and their types.

---

### Address

Address is a shape and type of data Ordit stores in for its list of addresses.

{% preview-model %}
  {% preview-object-item name="address" type="string" description="Actual address of the wallet instance." /%}
  {% preview-object-item name="xkey" type="string" required=false description="XKey of taproot addresses." /%}
  {% preview-object-item name="format" type="string" description="Format of the address." /%}
  {% preview-object-item name="pub" type="string" description="Public key of the account." /%}
{% /preview-model %}

---

### Inscription

Inscription is a shape and type of data object Ordit works with for the list of inscriptions or to represent single inscription.

{% preview-model %}
  {% preview-object-item name="id" type="string" /%}
  {% preview-object-item name="outpoint" type="string" /%}
  {% preview-object-item name="owner" type="string" /%}
  {% preview-object-item name="fee" type="number" /%}
  {% preview-object-item name="height" type="number" /%}
  {% preview-object-item name="number" type="number" /%}
  {% preview-object-item name="sat" type="number" /%}
  {% preview-object-item name="timestamp" type="number" /%}
  {% preview-object-item name="media_type" type="string" /%}
  {% preview-object-item name="media_size" type="number" /%}
  {% preview-object-item name="media_content" type="string" /%}
  {% preview-object-item name="meta" type="object" /%}

{% /preview-model %}
