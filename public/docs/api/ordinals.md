---
title: Ordinals
pageTitle: Ordit API - Ordinals
description: List of API methods for retrieving ordinal related data.
---

## Methods

List of JSON-RPC 2.0 methods made available for retrieving ordinal related data.

### GetInscriptions

Get a list of inscriptions with a variety of optional filters and pagination.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://trinity.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Ordinals.GetInscriptions",
      "params": {
        "owner": "<address>",
        "type": "image",
        "subtype": "png",
        "outpoint": "<txid:vout>",
        "sort": {
          "number": "asc"
        },
        "pagination": {
          "limit": 10
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="owner" type="string" required=false description="Retrieve all inscriptions currently owned by the given address." /%}
      {% preview-object-item name="type" type="string" required=false description="Retrieve all inscriptions with the specific mime type such as text|image|video|application." /%}
      {% preview-object-item name="subtype" type="string" required=false description="Retrieve all inscriptions with the specific mime subtype such as plain|webp|mp4|json." /%}
      {% preview-object-item name="outpoint" type="string" required=false description="Retrieve all inscriptions residing at specific outpoint on the blockchain in the format of txid:vout." /%}
      {% preview-object-item name="sort" type="object" required=false description="Assign the sort direction of the inscriptions returned." /%}
      {% preview-object-item name="sort.number" type="asc | desc" default="desc" required=false description="Sort by the inscription number." /%}
      {% preview-object-item name="pagination" type="object" required=false description="Limit the inscriptions returned and retrieve inscriptions from provided offset." note="If both prev and next keys are provided, only the next cursor will be recognized by the api." /%}
      {% preview-object-item name="pagination.limit" type="number" default="10" required=false description="Number of inscriptions to retrieve." /%}
      {% preview-object-item name="pagination.prev" type="string" required=false description="Value to start at when retrieving previous records from the cursor point." /%}
      {% preview-object-item name="pagination.next" type="string" required=false description="Value to start at when retrieving next records from the cursor point." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="inscriptions" type="Inscription[]" description="Array of inscriptions" /%}
      {% preview-object-item name="pagination" type="object" description="Pagination results containing information for how to load prev and next results" /%}
      {% preview-object-item name="pagination.limit" type="number" description="Number of inscriptions set for the current request result." /%}
      {% preview-object-item name="pagination.prev" type="string" description="Value to provide to the pagination object in the next request." /%}
      {% preview-object-item name="pagination.next" type="string" description="Value to provide to the pagination object in the next request." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}