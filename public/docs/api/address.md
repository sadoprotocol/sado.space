---
title: Address
pageTitle: Trinity API - Address
description: List of API methods for retrieving network data related to an address.
---

This section provides an overview of the methods that can executed against the API to retrieve blockchain related information for addresses.

---

## Methods

List of JSON-RPC 2.0 methods made available for retrieving network data related to an address.

---

### Get Balance

Get the total balance of available for an address.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://mainnet.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Address.GetBalance",
      "params": {
        "address": "<string>"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address you wish to retrieve balance for." /%}
    {% /preview-object %}

    {% jsonrpc-response %}
      {% preview-object-item name="result" type="number" description="Total available balance for the provided address." /%}
    {% /jsonrpc-response %}

  {% /preview-section %}

{% /preview %}

---

### GetUnspents

Get a list of all unspent utxos under the given address.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://mainnet.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Address.GetUnspents",
      "params": {
        "address": "<address>",
        "options": {
          "safetospend": true,
          "allowedrarity": ["common"]
        },
        "sort": {
          "value": "<direction>"
        },
        "pagination": {
          "limit": 10,
          "next": "<cursor>",
          "next": "<cursor>"
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to list unspent utxos for." /%}
      {% preview-object-item name="options" type="object" required=false description="List of options to modify the api result." /%}
      {% preview-object-item name="options.safetospend" type="boolean" required=false default="false" description="Only return safe to spend utxos." /%}
      {% preview-object-item name="options.allowedrarity" type="boolean" required=false default="[\"common\", \"uncommon\"]" description="List of rarities that defines safe to spend treshold." /%}
    {% /preview-object %}

    {% jsonrpc-response %}
      {% preview-object-item name="result" type="string" description="Transaction id the utxo belongs to." /%}  
      {% preview-object-item name="result.unspents" type="Unspent[]" description="Transaction id the utxo belongs to." /%}
      {% preview-object-item name="result.unspents.txid" type="string" description="Transaction id the utxo belongs to." /%}
      {% preview-object-item name="result.unspents.n" type="number" description="Index position of the utxo in the parent transaction." /%}
      {% preview-object-item name="result.unspents.blockHash" type="string" description="Hash of the block the utxo belongs to." /%}
      {% preview-object-item name="result.unspents.blockN" type="number" description="Height of the block the utxo belongs to." /%}
      {% preview-object-item name="result.unspents.scriptPubKey" type="ScriptPubKey" description="Script pub key of the utxo." /%}
      {% preview-object-item name="result.unspents.value" type="number" description="Utxo value in BTC" /%}
      {% preview-object-item name="result.unspents.sats" type="BigNumber" description="Utxo value in SATS" /%}
      {% preview-object-item name="result.unspents.safeToSpend" type="boolean" description="Is the utxo safe to spend in a new transaction?" /%}
      {% preview-object-item name="result.unspents.confirmations" type="number" description="Number of blocks created after the utxo was added to the network." /%}
      {% partial file="pagination-response" %}
    {% /jsonrpc-response %}

  {% /preview-section %}

{% /preview %}