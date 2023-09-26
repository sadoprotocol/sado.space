---
title: Transactions
pageTitle: Trinity API - Transcation
description: List of API methods for dealing with transactions on the blockchain.
---

This section provides an overview of the methods that can executed against the API to retrieve blockchain related information for transactions. We also provide a entry point for submitting transaction to the blockchain.

---

## Methods

List of JSON-RPC 2.0 methods made available for retrieving blockchain related data.

---

### Get Transaction

Get a transaction from the blockchain with optional projection and ordinal details.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://mainnet.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Transactions.GetTransaction",
      "params": {
        "txid": "<string>",
        "options": {
          "ord": true,
          "hex": true,
          "witness": true
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="txid" type="string" required=true description="Transaction id to retrieve from the blockchain." /%}
      {% preview-object-item name="options" type="object" required=false description="List of options to modify the result provided." /%}
      {% preview-object-item name="options.ord" type="boolean" required=false default="false" description="Should ordinal and inscription information be made available on the transaction outputs?" /%}
      {% preview-object-item name="options.hex" type="boolean" required=false default="false" description="Should the transcation hex be included?" /%}
      {% preview-object-item name="options.witness" type="boolean" required=false default="false" description="Should the witness data be included?" /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="jsonrpc" type="string" description="JSON-RPC protocol version." /%}
      {% preview-object-item name="result" type="Transaction" description="Transaction for the given id." /%}
      {% preview-object-item name="id" type="string" description="Id provided with the request." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

### Relay

Submit a raw transaction (serialized, hex-encoded) to local node and network.

Note that the transaction will be sent unconditionally to all peers, so using this for manual rebroadcast may degrade privacy by leaking the transaction’s origin, as nodes will normally not rebroadcast non-wallet transactions already in their mempool.

See [sendrawtransaction](https://developer.bitcoin.org/reference/rpc/sendrawtransaction.html) for more information on the behavior of this method.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://mainnet.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Transactions.Relay",
      "params": {
        "hex": "<transaction>",
        "maxFeeRate": 0.10,
        "validate": true
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="hex" type="string" required=true description="Raw transaction as hex string used to submit the transaction to the blockchain." /%}
      {% preview-object-item name="maxFeeRate" type="number" required=false default="0.10" description="Reject transactions whose fee rate is higher than the specified value, expressed in BTC/kB. Set to 0 to accept any fee rate." /%}
      {% preview-object-item name="validate" type="boolean" required=false default="false" description="Perform some basic validation against our local utxo data to verify that the transaction has valid inputs using our own internal tracking of unconfirmed spent states." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="jsonrpc" type="string" description="JSON-RPC protocol version." /%}
      {% preview-object-item name="result" type="string" description="Transaction id provided by the blockchain submission result." /%}
      {% preview-object-item name="id" type="string" description="Id provided with the request." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}
