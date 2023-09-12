---
title: Ordinals
pageTitle: Trinity API - Ordinals
description: List of API methods for retrieving ordinal related data.
---

This section provides an overview of the methods that can executed against the API to retrieve ordinal related information such as inscriptions and satoshis.

Inscriptions are indexed by looking for ord envelopes in blockchain witness scripts and added to a mongodb collection providing consumer ability for various filtering and sorting capabilities.

Satoshis are currently being indexed by [ord](https://github.com/ordinals/ord) and consumed internally by the API to related individual satoshis and ordinal information to the consumer and our own indexes.

---

## Methods

List of JSON-RPC 2.0 methods made available for retrieving ordinal related data.

---

### Get Ordinals

Retrieve list of ordinals for the given location.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://trinity.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Ordinals.GetOrdinals",
      "params": {
        "location": "<txid:vout>"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="location" type="string" required=true description="Location you wish to retrieve ordinals for." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="jsonrpc" type="string" description="JSON-RPC protocol version." /%}
      {% preview-object-item name="result" type="Ordinal[]" description="List of ordinals." /%}
      {% preview-object-item name="id" type="string" description="Id provided with the request." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

### Get Inscription

Get an inscription by inscription id.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://trinity.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Ordinals.GetInscription",
      "params": {
        "id": "<string>"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="id" type="string" required=true description="Inscription id to retrieve from the API." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="jsonrpc" type="string" description="JSON-RPC protocol version." /%}
      {% preview-object-item name="result" type="Inscription" description="Inscription for the id requested." /%}
      {% preview-object-item name="id" type="string" description="Id provided with the request." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

---

### Get Inscriptions

Get a list of indexed inscriptions.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://trinity.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Ordinals.GetInscriptions",
      "params": {
        "filter": {
          "creator": "<address>",
          "owner": "<address>",
          "mimeType": "<string>",
          "mimeSubtype": "<string>",
          "outpoint": "<txid:vout>"
        },
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
      {% preview-object-item name="filter" type="object" required=false description="List of categories that can be filter the results." /%}
      {% preview-object-item name="filter.creator" type="string" required=false description="Retrieve all inscriptions currently owned by the given address." /%}
      {% preview-object-item name="filter.owner" type="string" required=false description="Retrieve all inscriptions currently owned by the given address." /%}
      {% preview-object-item name="filter.mimeType" type="string" required=false description="Retrieve all inscriptions with the specific mime type such as text|image|video|application." /%}
      {% preview-object-item name="filter.mimeSubtype" type="string" required=false description="Retrieve all inscriptions with the specific mime subtype such as plain|webp|mp4|json." /%}
      {% preview-object-item name="filter.outpoint" type="string" required=false description="Retrieve all inscriptions residing at specific outpoint on the blockchain in the format of txid:vout." /%}

      {% preview-object-item name="sort" type="object" required=false description="Assign the sort direction of the inscriptions returned." /%}
      {% preview-object-item name="sort.number" type="asc | desc" default="desc" required=false description="Sort by the inscription number." /%}

      {% preview-object-item name="pagination" type="object" required=false description="Limit the inscriptions returned and retrieve inscriptions from provided offset." note="If both prev and next keys are provided, only the next cursor will be recognized by the api." /%}
      {% preview-object-item name="pagination.limit" type="number" default="10" required=false description="Number of inscriptions to retrieve." /%}
      {% preview-object-item name="pagination.prev" type="string" required=false description="Value to start at when retrieving previous records from the cursor point." /%}
      {% preview-object-item name="pagination.next" type="string" required=false description="Value to start at when retrieving next records from the cursor point." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="jsonrpc" type="string" description="JSON-RPC protocol version." /%}
      {% preview-object-item name="result" type="Inscription" description="Inscriptions and pagination information returned by the request." /%}
      {% preview-object-item name="result.inscriptions" type="Inscription[]" description="Array of inscriptions." /%}
      {% preview-object-item name="result.pagination" type="object" description="Pagination results containing information for how to load prev and next results." /%}
      {% preview-object-item name="result.pagination.limit" type="number" description="Number of inscriptions set for the current request result." /%}
      {% preview-object-item name="result.pagination.prev" type="string" description="Value to provide to the pagination object in the next request." /%}
      {% preview-object-item name="result.pagination.next" type="string" description="Value to provide to the pagination object in the next request." /%}
      {% preview-object-item name="id" type="string" description="Id provided with the request." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}
