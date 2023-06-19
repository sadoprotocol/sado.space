---
title: Order Service
pageTitle: Sado SDK - Order Service
description: Service for creating new Sado protocol compliant orders
---

Order service provide a means of creating new Sado protocol compliant orders. It provides security agnostic tooling that can be used by third party applications to create orders that can be fulfilled by the Sado protocol.

If you are running in a `node` or `browser` environment you can use our JavaScript SDK to interact with the Sado API.

---

## Create

Create a new order instance which can be validated, signed and submitted.

{% preview tabs=["JavaScript", "CLI"] %}

  {% preview-section %}

    ```ts {% preview=true %}
    const order = await sado.order.create({
      type: "sell",
      ts: Date.now(),
      location: "txid:vout",
      cardinals: 100_000,
      maker: "address"
    });
    ```

    {% preview-object title="Parameters" %}

      {% preview-object-item name="type" type="string" required=true description="Type of order to create" %}
        {% preview-object-value name="sell" description="Create a sell order in which buyers can make offers for a ordinal" /%}
        {% preview-object-value name="buy" description="Create a buy order in which you wish to purchase a ordinal" /%}
      {% /preview-object-item %}

      {% preview-object-item name="ts" type="number" required=true description="Timestamp to act as a ipfs cid nonce" /%}
      {% preview-object-item name="location" type="string" required=true description="Location of the ordinal seeking to buy (txid:vout) format" /%}
      {% preview-object-item name="cardinals" type="number" required=true description="Lowest denomination required to purchase the ordinal" /%}
      {% preview-object-item name="maker" type="string" required=true description="Address of the maker correlating to the key used in signature" /%}
      {% preview-object-item name="expiry" type="number" required=false description="Block height at which the offer should expire" /%}
      {% preview-object-item name="satoshi" type="number" required=false description="Point to a specific ordinal location to use for trade requests" /%}
      {% preview-object-item name="meta" type="object" required=false description="JSON string containing additional meta pertaining to order" /%}
      {% preview-object-item name="orderbooks" type="string[]" required=false description="Orderbooks to list the order with" /%}

    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="order" type="Order" type-link="https://github.com/sadoprotocol/sado-js/blob/main/packages/sado-sdk/src/Models/Order.ts" description="Order model instance" /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```bash {% preview=true %}
    sado order create [order]
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="order" type="string" required=true description="Base64 encoded order object" /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

## Load

Load a new order instance from a payload and signature. This is useful for generating an order instance from a payload and signature that has been constructed outside of the SDK.

{% preview tabs=["JavaScript"] %}

  {% preview-section %}

    ```ts {% preview=true %}
    const order = await sado.order.load({
      type: "sell",
      ts: Date.now(),
      location: "txid:vout",
      cardinals: 100_000,
      maker: "address",
      signature: "signed-message"
    });
    ```

    {% preview-object title="Parameters" %}

      {% preview-object-item name="type" type="string" required=true description="Type of order to create" %}
        {% preview-object-value name="sell" description="Create a sell order in which buyers can make offers for a ordinal" /%}
        {% preview-object-value name="buy" description="Create a buy order in which you wish to purchase a ordinal" /%}
      {% /preview-object-item %}

      {% preview-object-item name="ts" type="number" required=true description="Timestamp to act as a ipfs cid nonce" /%}
      {% preview-object-item name="location" type="string" required=true description="Location of the ordinal seeking to buy (txid:vout) format" /%}
      {% preview-object-item name="cardinals" type="number" required=true description="Lowest denomination required to purchase the ordinal" /%}
      {% preview-object-item name="maker" type="string" required=true description="Address of the maker correlating to the key used in signature" /%}
      {% preview-object-item name="expiry" type="number" required=false description="Block height at which the offer should expire" /%}
      {% preview-object-item name="satoshi" type="number" required=false description="Point to a specific ordinal location to use for trade requests" /%}
      {% preview-object-item name="meta" type="object" required=false description="JSON string containing additional meta pertaining to order" /%}
      {% preview-object-item name="orderbooks" type="string[]" required=false description="Orderbooks to list the order with" /%}
      {% preview-object-item name="signature" type="string" required=true description="Signature of the order payload" /%}
      {% preview-object-item name="signature_format" type="string" required=false description="Format of the signature, can be `psbt` or `message`" /%}
      {% preview-object-item name="desc" type="string" required=false description="Signature descriptor when signing with bech32" /%}

    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="order" type="Order" type-link="https://github.com/sadoprotocol/sado-js/blob/main/packages/sado-sdk/src/Models/Order.ts" description="Order model instance" /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

## Get

Retrieve an order by its CID _(Content Identifier)_.

{% preview tabs=["JavaScript", "CLI", "API"] %}

  {% preview-section %}

    ```ts {% preview=true %}
    const order = await sado.order.get("ipfs-content-identifier");
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="cid" type="string" required=true description="IPFS Content Identifier" /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```bash {% preview=true %}
    sado order get [cid]
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="cid" type="string" required=true description="IPFS Content Identifier" /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```json {% preview=true %}
    POST https://api.sado.space/rpc
    {
      "jsonrpc": "2.0",
      "method": "order.getOrder",
      "params": {
        "cid": "ipfs-content-identifier"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="cid" type="string" required=true description="IPFS Content Identifier" /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

## PSBT Signing

Generate a signable PSBT for given maker and location. This can be used to create a signature for wallets that does not support message signing.

{% preview tabs=["JavaScript", "API"] %}

  {% preview-section %}

    ```ts {% preview=true %}
    const psbt = await sado.order.psbt("txid:vout", "address");
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="location" type="string" required=true description="Location of the ordinal being sold in the (txid:vout) format. When signing with a PSBT we do address verification and ownership check against the location provided." /%}
      {% preview-object-item name="maker" type="string" required=true description="Address of the order maker used to verify ownership of the location provided." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="string" description="A partially signed bitcoin transaction (PSBT) in base64 format. This needs to be signed by makers wallet and applied to the order instance via the .sign method." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```json {% preview=true %}
    POST https://api.sado.space/rpc
    {
      "jsonrpc": "2.0",
      "method": "order.getPsbtSignature",
      "params": {
        "network": "regtest",
        "location": "txid:vout",
        "maker": "address"
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

    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="psbt" type="string" description="A partially signed bitcoin transaction (PSBT) in base64 format. This needs to be signed by makers wallet and applied to the order instance via the .sign method." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

## Submit

Submit a order to the API to generate a CID _(Content Identifier)_ and Order.

{% preview tabs=["JavaScript", "API"] %}

  {% preview-section %}

    ```ts {% preview=true %}
    const cid = await sado.order.submit(order, 1000, 15);
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="order" type="" required=true description="Fully prepared order instance to submit" /%}
      {% preview-object-item name="networkFee" type="number" required=true description="Additional fee to add to the order to elevate mempool priority" /%}
      {% preview-object-item name="feeRate" type="number" required=true description="The fee rate to use for the order to elevate mempool priority" /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    ```json {% preview=true %}
    POST https://api.sado.space/rpc
    {
      "jsonrpc": "2.0",
      "method": "order.createOrder",
      "params": {
        "network": "mainnet" | "testnet" | "regtest",
        "order": {
          "type": "sell",
          "ts": 0,
          "location": "txid:vout",
          "cardinals": 0,
          "maker": "address",
          "orderbooks": [
            "address"
          ]
        },
        "signature": {
          "value": "signed-psbt" | "signed-message",
          "format": "psbt" | "message"
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

  {% /preview-section %}

{% /preview %}
