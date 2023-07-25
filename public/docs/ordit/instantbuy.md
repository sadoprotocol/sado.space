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

## Example

Full example of the instant-buy flow.

### Code

```js
import { OrditApi, Ordit } from '@sadoprotocol/ordit-sdk'

const BUYER_MNEMONIC = `<12-WORDS-PHRASE>`
const SELLER_MNEMONIC = `<12-WORDS-PHRASE>`

// Initialise seller wallet
const sellerWallet = new Ordit({
    bip39: SELLER_MNEMONIC,
    network: 'testnet'
})
sellerWallet.setDefaultAddress('taproot') // Switch to address that owns inscription

// Initialise buyer wallet
const buyerWallet = new Ordit({
    bip39: BUYER_MNEMONIC,
    network: 'testnet'
})

// Switch to address that has enough BTC to cover the sell price + network fees
buyerWallet.setDefaultAddress('taproot') 

async function createSellOrder() {
    // replace w/ inscription outputpoint you'd like to sell, price, and address to receive sell proceeds
    const sellerPSBT = await Ordit.instantBuy.generateSellerPsbt({
        inscriptionOutPoint: '8d4a576aecb33b809c208d672a43fd6b175478d9454df4455ed0a2dc7eb7cbf6:0', 
        price: 4000, // Total sale proceeds will be price + inscription output value (4000 + 2000 = 6000 sats)
        receiveAddress: sellerWallet.selectedAddress,
        pubKeyType: sellerWallet.selectedAddressType,
        publicKey: sellerWallet.publicKey,
        network: 'testnet'
    })

    const signedSellerPSBT = sellerWallet.signPsbt(sellerPSBT.toHex(), { finalize: false, extractTx: false })

    return signedSellerPSBT // hex
}

async function createBuyOrder({ sellerPSBT }) {    
    await checkForExistingRefundableUTXOs(buyerWallet.selectedAddress)

    const buyerPSBT = await Ordit.instantBuy.generateBuyerPsbt({
        sellerPsbt: sellerPSBT,
        publicKey: buyerWallet.publicKey,
        pubKeyType: buyerWallet.selectedAddressType,
        feeRate: 10, // set correct rate to prevent tx from getting stuck in mempool
        network: 'testnet',
        inscriptionOutPoint: '0f3891f61b944c31fb48b0d9e770dc9e66a4b49097027be53b078be67aca72d4:0'
    })
    
    const signature = buyerWallet.signPsbt(buyerPSBT.toHex(), { finalized: true, extractTx: true })
    const tx = await buyerWallet.relayTx(signature, 'testnet')

    return tx
}

async function checkForExistingRefundableUTXOs(address) {
    const response = await OrditApi.fetch('/utxo/unspents', {
        data: {
            address: address,
            options: {
                txhex: true,
                notsafetospend: false,
                allowedrarity: ["common"]
            }
        },
        network: 'testnet'
    })

    const utxos = response.rdata
    const filteredUTXOs = utxos
        .filter(utxo => utxo.safeToSpend && !utxo.inscriptions.length && utxo.sats > 600 && utxo.sats <= 1000)
        .sort((a, b) => a.sats - b.sats) // Sort by lowest value utxo to highest such that we spend only the ones that are lowest

    if(filteredUTXOs.length < 2) {
        throw new Error("Not enough UTXOs in 600-1000 sats range. Use Ordit.instantBuy.generateDummyUtxos() to generate dummy utxos.")
    }
}

async function main() {
    const signedSellerPSBT = await createSellOrder()
    const tx = await createBuyOrder({ sellerPSBT: signedSellerPSBT })

    console.log(tx) // 6dc768015dda40c3752bfc011077ae9b1445d0c9cb5b385fda6ee26dab6cb267
}

;(async() => {
    await main()
})()
```