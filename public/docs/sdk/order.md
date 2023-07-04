---
title: Order Service
pageTitle: Sado SDK - Order Service
description: Service for creating new Sado protocol compliant orders
---

Order service provide a means of creating new Sado protocol compliant orders. It provides security agnostic tooling that can be used by third party applications to create orders that can be fulfilled by the Sado protocol.

If you are running in a `node` or `browser` environment you can use our JavaScript SDK to interact with the Sado API.

---

## Methods

List of methods currently available on the order service.

---

### Create Order

Once a order is verified and fully signed you can submit it via the create method. This will verify the order details and create a new IPFS order record and a PSBT can be finalized and relayed to the blockchain to register with decentralized orderbooks.

{% preview tabs=["API","SDK"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "CreateOrder",
      "params": {
        "network": "regtest",
        "order": {
          "type": "sell",
          "ts": 0,
          "location": "<txid:vout>",
          "cardinals": 0,
          "maker": "<address>",
          "orderbooks": [
            "<address>"
          ]
        },
        "signature": {
          "value": "<signature>",
          "format": "psbt"
        },
        "fees": {
          "network": 1000,
          "rate": 15
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}

      {% preview-object-item name="network" type="string" required=true description="Which network to create the order on" %}
        {% preview-object-value name="mainnet" description="Transactions on a mainnet are recorded on the blockchain permanently and are visible to the public. Transactions are irreversible so take all possble precautions when relaying your transactions." /%}
        {% preview-object-value name="testnet" description="Transactions on testnet are used for testing and development purposes and are not recorded on the blockchain permanently." /%}
        {% preview-object-value name="regtest" description="Transactions on regtest are used for testing and development purposes and are hosted independently of the two other networks. Regtest can be customized to behave more favorably for these purposes and transactions are not recorded on the blockchain permanently." /%}
      {% /preview-object-item %}

      {% preview-object-item name="order" type="object" required=true description="Order object which is stored and reference in IPFS." /%}
      {% preview-object-item name="order.type" type="string" required=true description="Type of order to create" %}
        {% preview-object-value name="sell" description="Create a sell order in which buyers can make offers for a ordinal" /%}
        {% preview-object-value name="buy" description="Create a buy order in which you wish to purchase a ordinal" /%}
      {% /preview-object-item %}
      {% preview-object-item name="order.ts" type="number" required=true description="Timestamp to act as a ipfs cid nonce" /%}
      {% preview-object-item name="order.location" type="string" required=true description="Location of the ordinal seeking to buy (txid:vout) format" /%}
      {% preview-object-item name="order.cardinals" type="number" required=true description="Lowest denomination required to purchase the ordinal" /%}
      {% preview-object-item name="order.maker" type="string" required=true description="Address of the maker correlating to the key used in signature" /%}
      {% preview-object-item name="order.expiry" type="number" required=false description="Block height at which the offer should expire" /%}
      {% preview-object-item name="order.satoshi" type="number" required=false description="Point to a specific ordinal location to use for trade requests" /%}
      {% preview-object-item name="order.meta" type="object" required=false description="JSON string containing additional meta pertaining to order" /%}
      {% preview-object-item name="order.orderbooks" type="string[]" required=false description="Orderbooks to list the order with" /%}

      {% preview-object-item name="signature" type="object" required=true description="Object containing the signature details of the order." /%}
      {% preview-object-item name="signature.value" type="string" required=true description="A signed message or psbt used to verify the validity of the order" /%}
      {% preview-object-item name="signature.format" type="string" required=false description="Describes the format of the signature" /%}
      {% preview-object-item name="signature.desc" type="string" required=false description="Signature description is required when signing with bech32 or bech32m addresses" /%}

      {% preview-object-item name="fees" type="object" required=true description="Adjustment settings for the fees to construct the order transaction with. Allows for tuning the mempool incentives to pick up and process the order." /%}
      {% preview-object-item name="fees.network" type="number" required=true description="Additional fee to add to the order to elevate mempool priority" /%}
      {% preview-object-item name="fees.rate" type="number" required=true description="The fee rate to use for the order to elevate mempool priority" /%}

    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="cid" description="Location where the order is stored on IPFS." /%}
      {% preview-object-item name="psbt" description="Order transaction ready to sign, finalize and relay to the blockchain." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```ts {% preview=true %}
    const order = new Order({ ... });
    // fill and sign order ...
    const { cid, psbt } = await sado.order.create(order);
    ```

    {% preview-object title="Parameters" show=true %}
      {% preview-object-item name="order" type="Order" required=true description="Fully prepared order instance to submit." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="cid" description="Location where the order is stored on IPFS." /%}
      {% preview-object-item name="psbt" description="Order transaction ready to sign, finalize and relay to the blockchain." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

### Create Signable PSBT

Generate a signable PSBT for given maker and location. This can be used to create a signature for wallets that does not support message signing.

{% preview tabs=["API","SDK"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "CreateSignablePsbt",
      "params": {
        "network": "regtest",
        "location": "<txid:vout>",
        "maker": "<maker>",
        "pubkey": "<pubkey>"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}

      {% preview-object-item name="network" type="string" required=true description="Which network to create the order on" %}
        {% preview-object-value name="mainnet" description="Transactions on a mainnet are recorded on the blockchain permanently and are visible to the public. Transactions are irreversible so take all possble precautions when relaying your transactions." /%}
        {% preview-object-value name="testnet" description="Transactions on testnet are used for testing and development purposes and are not recorded on the blockchain permanently." /%}
        {% preview-object-value name="regtest" description="Transactions on regtest are used for testing and development purposes and are hosted independently of the two other networks. Regtest can be customized to behave more favorably for these purposes and transactions are not recorded on the blockchain permanently." /%}
      {% /preview-object-item %}

      {% preview-object-item name="location" type="string" required=true description="Location of the ordinal being sold in the (txid:vout) format. When signing with a PSBT we do address verification and ownership check against the location provided." /%}
      {% preview-object-item name="maker" type="string" required=true description="Address of the order maker used to verify ownership of the location provided." /%}
      {% preview-object-item name="pubkey" type="string" required=false description="Public key of wallet used to sign the PSBT." /%}

    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="psbt" type="string" description="A partially signed bitcoin transaction (PSBT) in base64 format. This needs to be signed by makers wallet and applied to the order instance via the .sign method." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```ts {% preview=true %}
    const psbt = await sado.order.createSignablePsbt(
      "<txid:vout>", 
      "<maker>", 
      "<pubkey>"
    );
    ```

    {% preview-object title="Parameters" show=true %}
      {% preview-object-item name="location" type="string" required=true description="Location of the ordinal being sold in the (txid:vout) format. When signing with a PSBT we do address verification and ownership check against the location provided." /%}
      {% preview-object-item name="maker" type="string" required=true description="Address of the order maker used to verify ownership of the location provided." /%}
      {% preview-object-item name="pubkey" type="string" required=false description="Public key of wallet used to sign the PSBT." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="string" description="A partially signed bitcoin transaction (PSBT) in base64 format. This needs to be signed by makers wallet and applied to the order instance via the .sign method." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

### Get Order

Get order data as stored on IPFS.

{% preview tabs=["API","SDK","CLI"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "GetOrder",
      "params": {
        "cid": "<cid>"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="cid" type="string" required=true description="IPFS Content Identifier" /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```ts {% preview=true %}
    const order = await sado.order.get("<cid>");
    ```

    {% preview-object title="Parameters" show=true %}
      {% preview-object-item name="cid" type="string" required=true description="IPFS Content Identifier" /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```bash {% preview=true %}
    sado order get <cid>
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="cid" type="string" required=true description="IPFS Content Identifier" /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

## Order Builder

To create an order using our SDK we provide a builder which can assist in the process of getting your order constructed and delivered using the Sado protocol specifications.

---

### Create Order Instance

To get started import the `Order` class and instantiate a new instance.

```ts
import { Order } from "@sadoprotocol/sado-sdk";

const order = new Order({
  type: "sell",
  location: "<txid:vout>",
  cardinals: 100_000,
  maker: "<address>"
});
```

{% data title="Parameters" %}
  {% data-item name="type" type="string" required=true description="Type of order to create." %}
    {% data-value name="sell" description="Create a sell order in which buyers can make offers for a ordinal" /%}
    {% data-value name="buy" description="Create a buy order in which you wish to purchase a ordinal" /%}
  {% /data-item %}
  {% data-item name="location" type="string" required=true description="Transaction output that is listed for sale or is wanted buy the seller/buyer." /%}
  {% data-item name="cardinals" type="number" required=true description="Amount of cardinals wanted or being offered for the location." /%}
  {% data-item name="maker" type="string" required=true description="Address of the order maker." /%}
{% /data %}

---

### Add Orderbook

By default only the maker address will aware of the order, which means that the maker can manually inform potential buyers of the orders existence. In most cases though you probably want to make others aware of your order through one or many marketplaces. This can be done by registering outputs to addresses you wish to be aware of your new order.

If you did not already provide these addresses in the initialization of the order we provide a method for you to add these.

```ts
order.addOrderbook("<address>", 600);
```

{% data title="Parameters" %}
  {% data-item name="address" type="string" required=true description="Orderbook address you wish to list the order with." /%}
  {% data-item name="fee" type="number" required=false default=600 description="Amount in satoshis to pay for the listing fee." /%}
{% /data %}

---

### Add Expiry

If you want the order listed to only be made visible up until a specific block height you can add a optional expiry to the order.

```ts
order.addExpiry(800_000);
```

{% data title="Parameters" %}
  {% data-item name="blockHeight" type="number" required=true description="The blockheight value at which to delist the order." /%}
{% /data %}

{% callout type="warning" title="Note!" %}
Expiry is a Sado protocol specific check and does not prevent the location from being traded on the blockchain. It also does not prevent marketplaces to listing the location for sale.
{% /callout %}

---

### Add Meta

You can add meta data to your order which consumers can use to guide the presentation of the order to the client.

```ts
order.addMeta({ foo: "bar" });
```

{% data title="Parameters" %}
  {% data-item name="meta" type="object" required=true description="Meta data you wish to attach to the order." /%}
{% /data %}

---

### Add Signature

Once we have our order instance and filled it out we need to provide a signature.

To sign a order we use `message` signing. First we create a new signable message via the order builder.

```ts
const message = order.createSignableMessage();
```

If the wallet does not support message signing you can request a signable PSBT from the sado order service.

See [create signable psbt](#create-signable-psbt) for more details.

```ts
const psbt = await sado.order.createSignablePsbt(
  "<txid:vout>", 
  "<maker>", 
  "<pubkey>"
);
```

Once you have a signed `message` or `psbt` we can add it to our order instance.

```ts
order.addSignature("<signature>", {
  format: "psbt",
  pubkey: "<pubkey>"
});
```

{% data title="Parameters" %}
  {% data-item name="signature" type="string" required=true description="Signature to add to the order." /%}
  {% data-item name="options" type="object" required=true description="Signature options to attach to the signature." /%}
  {% data-item name="options.format" type="string" required=true description="Format used for the signature." %}
    {% data-value name="message" description="Defines the provided signature as a signed message." /%}
    {% data-value name="psbt" description="Defines the provided signature as signed PSBT." /%}
  {% /data-item %}
  {% data-item name="options.desc" type="string" required=false description="Required if the order is signed by a Bech32(m) address." /%}
  {% data-item name="options.pubkey" type="string" required=false description="Required if the PSBT was constructed with a pubkey." /%}
{% /data %}

{% callout title="You should know" %}
Make sure to fill out all the optional values before creating a `message` signature. A `message` signature consists of the content of the order, so if this changes during creation the order creation will fail.
{% /callout %}

---

### Add Fees

To incentivice miners to pick up our `order` we can adjust the network fee and fee rate used when creating the order transaction we want to relay to the blockchain. If it wasn't added as part of the order instantiation we provide two methods to adjust the fee.

If custom fees is not added the default values used is `1000` sats for the flat `network` fee and `10` for the fee rate.

```ts
order.addFees(1000, 10);
```

{% data title="Parameters" %}
  {% data-item name="networkFee" type="number" required=true description="Flat network fee to add to the order transaction." /%}
  {% data-item name="feeRate" type="number" required=true description="Mempool fee rate to boost miner incentive to pick up the order transaction." /%}
{% /data %}

---

### Create Order

Once we have our order built we can submit it to the sado api for processing. The order will now be validated before being submitted to IPFS creating a static reference before crafting a Sado protocol order PSBT. Once all steps are resolved successfully you will be provided with a `cid` and `psbt`.

See [create order](##create-order) for more details.

```ts
const { cid, psbt } = await sado.order.create(order);
```

You now have to verify, sign, finalize and relay the psbt to the blockchain.