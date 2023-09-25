---
title: BRC 20
pageTitle: Trinity API - BRC 20
description: List of API methods for retrieving BRC 20 token information.
---

This section provides an overview of the methods that can executed against the API to retrieve BRC-20 related information.

---

## Methods

List of JSON-RPC 2.0 methods made available for retrieving BRC-20 token information.

---

### Get Token

Get information about a BRC-20 token.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://trinity.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Brc20.GetToken",
      "params": {
        "tick": "<string>"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="tick" type="string" required=true description="Address you wish to retrieve balance for." /%}
    {% /preview-object %}

    {% jsonrpc-response %}
      {% preview-object-item name="result" type="object" description="BRC-20 token information." /%}
      {% preview-object-item name="result.inscription" type="string" description="Inscription id the token was inscribed under." /%}
      {% preview-object-item name="result.tick" type="string" description="Token tick." /%}
      {% preview-object-item name="result.slug" type="string" description="Lower cased token tick." /%}
      {% preview-object-item name="result.max" type="number" description="Max supply." /%}
      {% preview-object-item name="result.amount" type="number" description="Amount of minted tokens." /%}
      {% preview-object-item name="result.limit" type="number" description="How many tokens can be minted in a single inscription." /%}
      {% preview-object-item name="result.decimal" type="number" description="Decimal places." /%}
      {% preview-object-item name="result.creator" type="string" description="Address that inscribed the token." /%}
      {% preview-object-item name="result.timestamp" type="number" description="Timestamp of the block the token was inscribed in." /%}
    {% /jsonrpc-response %}

  {% /preview-section %}

{% /preview %}