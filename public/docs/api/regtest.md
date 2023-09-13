---
title: Regtest
pageTitle: Trinity API - Regtest
description: List of API functionality for regtest specific functionality.
---

This section provides an overview of the methods that can executed against the API to interact with tooling designed specifically for regtest environments.

---

## Methods

List of JSON-RPC 2.0 methods made available for interacting with blockchain related data.

---

### Send to Address

Fund the given address with value amount in satoshis.

Once the method is executed the provided address is funded and a block is mined to commit the transaction immediately.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://trinity-regtest.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Faucet.SendToAddress",
      "params": {
        "address": "<string>",
        "value": 1000
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to fund." /%}
      {% preview-object-item name="value" type="number" required=true description="Amount of satoshis to send to address." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="jsonrpc" type="string" description="JSON-RPC protocol version." /%}
      {% preview-object-item name="id" type="string" description="Id provided with the request." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

{% callout title="Did you know?" type="note" %}
When submitting transactions with the [Transaction.Relay](/docs/api-transactions#relay) method on regtest the transaction is instantly mined and made available on the API without any downtime. This makes it ideal for environments when you want reponsive feedback for development work.
{% /callout %}