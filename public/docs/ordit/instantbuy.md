---
title: Instant Buy
pageTitle: Ordit SDK - Instant Buy
description: Buy/Sell Inscriptions using Instant buy feature
---

Ordit SDK enables users to Buy/Sell their inscriptions in a trustless way where buyer usually covers the transaction fees. PSBT configuration is the core magic behind this feature. 

Essentially the process involves two PSBTs. In seller PSBT, Inscription UTXO is selected as Input and price with destination wallet address is added as output and `SIGHASH_SINGLE | SIGHASH_ANYONECANPAY` for input sighash. Buyer PSBT is more complicated one which is constructed on top of signed inputs and outputs of seller PSBT, creating proper mapping of inputs and outputs that are necessary to complete this transaction in a trustless way.

{% callout title="Important Note!" type="warning" %}
This instant buy process requires buyer to hold atleast two dummy UTXOs in their account with sats value of `<1000`. Please use `Ordit.instantBuy.generateDummyUtxos` method to generate some dummy UTXOs incase you dont have them already.
{% /callout %}

---

## Methods

List of methods in `Ordit.instantbuy` namespace.

---

### Create Seller PSBT

To sell an inscription you need to create Seller PSBT and sign it using wallet of your choice. Please see below implementation.

```ts
import { Ordit } from '@sadoprotocol/ordit-sdk';

const sellerPsbt = await Ordit.instantBuy.generateSellerPsbt(options);
```

{% data title="Parameters" %}
    {% data-item name="options" type="object" required=true  /%}
    {% data-item name="options.publicKey" type="string" required=true description="Your account public key."  /%}
    {% data-item name="options.receiveAddress" type="string" required=true description="Destination address to receive your ask price."  /%}
{% data-item name="options.pubKeyType" type="string" required=false default="legacy"  %}
    {% data-value name="legacy" description="Address derived using BIP44 path. Usually starts with 1." /%}
    {% data-value name="segwit" description="Address derived using BIP49 path. Usually starts with 3." /%}
    {% data-value name="bech32" description="Address derived using BIP84 path. Usually starts with bc1q." /%}
    {% data-value name="taproot" description="Address derived using BIP86 path. Usually starts with bc1p." /%}
  {% /data-item %}
    {% data-item name="options.price" type="number" required=true description="Price to sell the inscription."  /%}
    {% data-item name="options.inscriptionOutPoint" type="string" required=true description="Outpoint value of the inscription. `<txid>:<out>`"  /%}
     {% data-item name="options.network" type="string" required=false default="testnet" %}
    {% data-value name="mainnet" description="Initializes transaction with mainnet as network" /%}
    {% data-value name="testnet" description="Initializes transaction with testnet as network" /%}
    {% data-value name="regtest" description="Initializes transaction with regtest as network" /%}
  {% /data-item %}
{% /data %}

{% data title="Response" %}
    {% data-item name="PSBT" type="object"/%}
    
{% /data %}

---

### Create Buyer PSBT

To Buy an inscription you need to create Buyer PSBT and sign it using wallet of your choice. Be sure to finalize this transaction after signing it and then it is ready to be relayed to node. Please see below implementation.

```ts
import { Ordit } from '@sadoprotocol/ordit-sdk';

const buyerPsbt = await Ordit.instantBuy.generateBuyerPsbt(options);
```

{% data title="Parameters" %}
    {% data-item name="options" type="object" required=true  /%}
    {% data-item name="options.publicKey" type="string" required=true description="Your account public key."  /%}
{% data-item name="options.pubKeyType" type="string" required=false default="legacy"  %}
    {% data-value name="legacy" description="Address derived using BIP44 path. Usually starts with 1." /%}
    {% data-value name="segwit" description="Address derived using BIP49 path. Usually starts with 3." /%}
    {% data-value name="bech32" description="Address derived using BIP84 path. Usually starts with bc1q." /%}
    {% data-value name="taproot" description="Address derived using BIP86 path. Usually starts with bc1p." /%}
  {% /data-item %}
    {% data-item name="options.sellerPsbt" type="string" required=true description="Seller PSBT encoded as Hex."  /%}
    {% data-item name="options.inscriptionOutPoint" type="string" required=true description="Outpoint value of the inscription. `<txid>:<out>`"  /%}
     {% data-item name="options.feeRate" type="number" required=false description="Fee rate of the transaction in v/B." default="10 v/B"  /%}
     {% data-item name="options.network" type="string" required=false default="testnet" %}
    {% data-value name="mainnet" description="Initializes transaction with mainnet as network" /%}
    {% data-value name="testnet" description="Initializes transaction with testnet as network" /%}
    {% data-value name="regtest" description="Initializes transaction with regtest as network" /%}
  {% /data-item %}
{% /data %}

{% data title="Response" %}
    {% data-item name="PSBT" type="object"/%}
{% /data %}

---

### Create Dummy UTXOs

To construct buy PSBT, you need to have two dummy utxos in your account with sats `<1000`. This method helps you add those dummy utxos to your account by splitting a big utxo into configured range of UTXOs.

```ts
import { Ordit } from '@sadoprotocol/ordit-sdk';

const dummyUtxosPsbt = await Ordit.instantBuy.generateDummyUtxos(options);
```

{% data title="Parameters" %}
    {% data-item name="options" type="object" required=true  /%}
     {% data-item name="options.publicKey" type="string" required=true description="Your account public key."  /%}
{% data-item name="options.pubKeyType" type="string" required=false default="legacy"  %}
    {% data-value name="legacy" description="Address derived using BIP44 path. Usually starts with 1." /%}
    {% data-value name="segwit" description="Address derived using BIP49 path. Usually starts with 3." /%}
    {% data-value name="bech32" description="Address derived using BIP84 path. Usually starts with bc1q." /%}
    {% data-value name="taproot" description="Address derived using BIP86 path. Usually starts with bc1p." /%}
  {% /data-item %}
    {% data-item name="options.value" type="number" required=true description="Value in sats which should be used to create each dummy utxo."  /%}
    {% data-item name="options.count" type="number" required=true description="Number of dummy UTXOs to produce."  /%}
     {% data-item name="options.feeRate" type="number" required=false description="Fee rate of the transaction in v/B." default="10 v/B"  /%}
     {% data-item name="options.network" type="string" required=false default="testnet" %}
    {% data-value name="mainnet" description="Initializes transaction with mainnet as network" /%}
    {% data-value name="testnet" description="Initializes transaction with testnet as network" /%}
    {% data-value name="regtest" description="Initializes transaction with regtest as network" /%}
  {% /data-item %}
{% /data %}

{% data title="Response" %}
    {% data-item name="PSBT" type="object"/%}
{% /data %}
