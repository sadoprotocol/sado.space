---
title: Address
pageTitle: Trinity API - Address
description: List of API methods for retrieving network data related to an address.
---

## Methods

List of JSON-RPC 2.0 methods made available for retrieving network data related to an address.

### GetUnspents

Get a list of all unspent utxos under the given address.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://proto.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "GetUnspents",
      "params": {
        "address": "<address>",
        "options": {
          "ord": true,
          "safetospend": true,
          "allowedrarity": ["common"]
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to list unspent utxos for." /%}
      {% preview-object-item name="options" type="object" required=false description="List of options to modify the api result." /%}
      {% preview-object-item name="options.ord" type="boolean" required=false default="true" description="Resolve ordinals and inscriptions." /%}
      {% preview-object-item name="options.safetospend" type="boolean" required=false default="false" description="Only return safe to spend utxos." /%}
      {% preview-object-item name="options.allowedrarity" type="boolean" required=false default="[\"common\", \"uncommon\"]" description="List of rarities that defines safe to spend treshold." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="txid" type="string" description="Transaction id the utxo belongs to." /%}
      {% preview-object-item name="n" type="number" description="Index position of the utxo in the parent transaction." /%}
      {% preview-object-item name="blockHash" type="string" description="Hash of the block the utxo belongs to." /%}
      {% preview-object-item name="blockN" type="number" description="Height of the block the utxo belongs to." /%}
      {% preview-object-item name="scriptPubKey" type="ScriptPubKey" description="Script pub key of the utxo." /%}
      {% preview-object-item name="value" type="number" description="Utxo value in BTC" /%}
      {% preview-object-item name="sats" type="BigNumber" description="Utxo value in SATS" /%}
      {% preview-object-item name="ordinals" type="Ordinal[]" description="List of ordinals residing with the utxo." /%}
      {% preview-object-item name="inscriptions" type="Inscription[]" description="List of inscriptions residing with the utxo." /%}
      {% preview-object-item name="safeToSpend" type="boolean" description="Is the utxo safe to spend in a new transaction?" note="Safety is determined by the APIs ability to communicate with the ordinals service. If the API could not retrieve valid data from the ordinals service the utxo is considered 'unsafe' to spend. If any of the ordinals is of a rarity higher than the provided treshold the utxo is considered 'unsafe' to spend." /%}
      {% preview-object-item name="confirmations" type="number" description="Number of blocks created after the utxo was added to the network." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}