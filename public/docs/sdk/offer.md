---
title: Offer Service
pageTitle: Sado SDK - Offer Service
description: Service for creating new Sado protocol compliant offers
---

Offer service provide a means of creating new Sado protocol compliant offers. It provides security agnostic tooling that can be used by third party applications to create offers that can be fulfilled by the Sado protocol.

If you are running in a `node` or `browser` environment you can use our JavaScript SDK to interact with the Sado API.

---

## Methods

List of methods currently available on the offer service.

---

### Create Offer PSBT

Creates a new offer PSBT _(Partially Signed Bitcoin Transaction)_ which consists of the output being traded as the first input, and the payment for the output being sold. The taker then signs the PSBT and creates a new Sado [Offer](#create-offer) Once the maker of the order that the offer is being made for accepts the offer, they will sign their half of the transaction and relay it to the network.

{% preview tabs=["API","SDK"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "CreateOfferPsbt",
      "params": {
        "network": "regtest",
        "origin": "<cid>",
        "taker": "<address>",
        "cardinals": 100000,
        "satsPerByte": 30
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

      {% preview-object-item name="cid" type="string" required=true description="IPFS content identifier containing the order that the offer is being made for." /%}
      {% preview-object-item name="taker" type="string" required=true description="Address where the output being sold should be transfered." /%}
      {% preview-object-item name="cardinals" type="number" required=true description="Amount of cardinals being offered to buy the output." /%}

      {% preview-object-item name="satsPerByte" type="number" required=true description="Set the amount of sats to pay per byte for the offer transaction." /%}

    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="psbt" type="string" description="Base64 encoded PSBT that should be signed and added to the subsequent offer creation." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```ts {% preview=true %}
    const cid = await sado.offers.getOfferPsbt({
      origin: "<cid>",
      taker: "<address>",
      cardinals: 1000,
      fees: {
        network: 1000,
        rate: 10
      }
    });
    ```

    {% preview-object title="Parameters" %}

      {% preview-object-item name="origin" type="string" required=true description="Origin cid pointing to the order that the offer is being made for." /%}
      {% preview-object-item name="taker" type="string" required=true description="Address where the output being sold should be transfered." /%}
      {% preview-object-item name="cardinals" type="number" required=true description="Amount of cardinals being offered to buy the output." /%}

      {% preview-object-item name="fees" type="object" required=true description="Adjustment settings for the fees to construct the order transaction with. Allows for tuning the mempool incentives to pick up and process the order." /%}
      {% preview-object-item name="fees.network" type="number" required=true description="Additional fee to add to the order to elevate mempool priority" /%}
      {% preview-object-item name="fees.rate" type="number" required=true description="The fee rate to use for the order to elevate mempool priority" /%}

    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="psbt" type="string" description="Base64 encoded PSBT that should be signed and added to the subsequent offer creation." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

### Create Offer

Once you have a signed offer PSBT we can create a new sado order that can be relayed to the network for consumption by sado compliant APIs.

{% preview tabs=["API","SDK"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "CreateOffer",
      "params": {
        "network": "regtest",
        "ts": 1687933550447,
        "origin": "<cid>",
        "offer": "<psbt>",
        "taker": "<address>",
        "orderbooks": [
          "<address>"
        ],
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

      {% preview-object-item name="ts" type="number" required=true description="Timestamp to attach to the offer stored on IPFS." /%}
      {% preview-object-item name="origin" type="string" required=true description="Origin cid pointing to the order that the offer is being made for." /%}
      {% preview-object-item name="offer" type="string" required=true description="Offer PSBT signed by the taker." /%}
      {% preview-object-item name="taker" type="string" required=true description="Address where the output being sold should be transferred." /%}
      {% preview-object-item name="orderbooks" type="string[]" required=false description="Addresses to list the offer with." /%}

      {% preview-object-item name="fees" type="object" required=true description="Adjustment settings for the fees to construct the order transaction with. Allows for tuning the mempool incentives to pick up and process the order." /%}
      {% preview-object-item name="fees.network" type="number" required=true description="Additional fee to add to the order to elevate mempool priority" /%}
      {% preview-object-item name="fees.rate" type="number" required=true description="The fee rate to use for the order to elevate mempool priority" /%}

    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="cid" type="string" description="Offer cid pointing to the path where the offer is stored on IPFS" /%}
      {% preview-object-item name="psbt" type="string" description="Base64 encoded PSBT that should be signed and relayed to the network." /%}
    {% /preview-object %}

  {% /preview-section %}

  {% preview-section %}

    {% endpoint type="POST" url="https://api.sado.space/rpc" /%}

    ```ts {% preview=true %}
    const cid = await sado.offers.create({
      origin: "<cid>",
      offer: "<psbt>",
      taker: "<address>",
      orderbooks: ["<address>", ...],
      fees: {
        network: 1000,
        rate: 15
      }
    });
    ```

    {% preview-object title="Parameters" %}

      {% preview-object-item name="origin" type="string" required=true description="Origin cid pointing to the order that the offer is being made for." /%}
      {% preview-object-item name="offer" type="string" required=true description="Offer PSBT signed by the taker." /%}
      {% preview-object-item name="taker" type="string" required=true description="Address where the output being sold should be transferred." /%}
      {% preview-object-item name="orderbooks" type="string[]" required=false description="Addresses to list the offer with." /%}

      {% preview-object-item name="fees" type="object" required=true description="Adjustment settings for the fees to construct the order transaction with. Allows for tuning the mempool incentives to pick up and process the order." /%}
      {% preview-object-item name="fees.network" type="number" required=true description="Additional fee to add to the order to elevate mempool priority" /%}
      {% preview-object-item name="fees.rate" type="number" required=true description="The fee rate to use for the order to elevate mempool priority" /%}

    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="cid" type="string" description="Offer cid pointing to the path where the offer is stored on IPFS" /%}
      {% preview-object-item name="psbt" type="string" description="Base64 encoded PSBT that should be signed and relayed to the network." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}