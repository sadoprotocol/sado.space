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

    {% endpoint type="POST" url="https://mainnet.ordit.io/rpc" /%}

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
      {% preview-object-item name="result" type="object" description="JSON-RPC 2.0 Result." /%}
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

---

### Get Tokens

Get a list of paginated BRC-20 tokens.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://mainnet.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Brc20.GetTokens",
      "params": {
        "pagination": {
          "limit": 10,
          "prev": "<cursor>",
          "next": "<cursor>"
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% partial file="pagination-request" /%}
    {% /preview-object %}

    {% jsonrpc-response %}
      {% preview-object-item name="result" type="object" description="JSON-RPC 2.0 Result." /%}
      {% preview-object-item name="result.tokens" type="object[]" description="List of BRC-20 tokens." /%}
      {% preview-object-item name="result.tokens.inscription" type="string" description="Inscription id the token was inscribed under." /%}
      {% preview-object-item name="result.tokens.tick" type="string" description="Token tick." /%}
      {% preview-object-item name="result.tokens.slug" type="string" description="Lower cased token tick." /%}
      {% preview-object-item name="result.tokens.max" type="number" description="Max supply." /%}
      {% preview-object-item name="result.tokens.amount" type="number" description="Amount of minted tokens." /%}
      {% preview-object-item name="result.tokens.limit" type="number" description="How many tokens can be minted in a single inscription." /%}
      {% preview-object-item name="result.tokens.decimal" type="number" description="Decimal places." /%}
      {% preview-object-item name="result.tokens.creator" type="string" description="Address that inscribed the token." /%}
      {% preview-object-item name="result.tokens.timestamp" type="number" description="Timestamp of the block the token was inscribed in." /%}
      {% partial file="pagination-response" /%}
    {% /jsonrpc-response %}

  {% /preview-section %}

{% /preview %}

---

### Get Transfers

Get a list of paginated token transfers.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://mainnet.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Brc20.GetTransfers",
      "params": {
        "filter": {
          "inscription": "<string>",
          "tick": "<string>",
          "from": "<string>",
          "to": "<string>"
        },
        "pagination": {
          "limit": 10,
          "prev": "<cursor>",
          "next": "<cursor>"
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="filter" type="object" required=false description="List of filter settings that can be applied to the request." /%}
      {% preview-object-item name="filter.inscription" type="string" required=false description="List transfers for a specific inscription." /%}
      {% preview-object-item name="filter.tick" type="string" required=false description="List transfers for a specific tick." /%}
      {% preview-object-item name="filter.from" type="string" required=false description="List transfers sent from a specific address." /%}
      {% preview-object-item name="filter.to" type="string" required=false description="List transfers sent to a specific address." /%}
      {% partial file="pagination-request" /%}
    {% /preview-object %}

    {% jsonrpc-response %}
      {% preview-object-item name="result" type="object" description="JSON-RPC 2.0 Result." /%}
      {% preview-object-item name="result.transfers" type="object[]" description="List of transfers." /%}
      {% preview-object-item name="result.transfers.inscription" type="string" description="Originating inscription for the transfer." /%}
      {% preview-object-item name="result.transfers.tick" type="string" description="Tick the transfer belongs to." /%}
      {% preview-object-item name="result.transfers.slug" type="string" description="Lowercased tick value." /%}
      {% preview-object-item name="result.transfers.amount" type="number" description="Value of the transfer." /%}
      {% preview-object-item name="result.transfers.from" type="object" description="Information about the transfer origin." /%}
      {% preview-object-item name="result.transfers.from.address" type="string" description="Address that created the transfer inscription." /%}
      {% preview-object-item name="result.transfers.from.block" type="number" description="Block number the transfer was created." /%}
      {% preview-object-item name="result.transfers.from.timestamp" type="number" description="Block timestamp the transfer was created." /%}
      {% preview-object-item name="result.transfers.to" type="object" description="Information about the transfer recipient." /%}
      {% preview-object-item name="result.transfers.to.address" type="string" description="Address that received the transfer." /%}
      {% preview-object-item name="result.transfers.to.block" type="number" description="Block number the transfer was transfered." /%}
      {% preview-object-item name="result.transfers.to.timestamp" type="number" description="Block timestamp the transfer was transfered." /%}
      {% partial file="pagination-response" /%}
    {% /jsonrpc-response %}

  {% /preview-section %}

{% /preview %}

---

### Get Token Holders

Get a list of token holders for a given tick.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://mainnet.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Brc20.GetTokenHolders",
      "params": {
        "tick": "<string>",
        "pagination": {
          "limit": 10,
          "prev": "<cursor>",
          "next": "<cursor>"
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="tick" type="string" required=true description="Tick to retrieve list of holders for." /%}
      {% partial file="pagination-request" /%}
    {% /preview-object %}

    {% jsonrpc-response %}
      {% preview-object-item name="result" type="object" description="JSON-RPC 2.0 Result." /%}
      {% preview-object-item name="result.holders" type="object[]" description="List of token holders." /%}
      {% preview-object-item name="result.holders.address" type="string" description="Address of the token holder." /%}
      {% preview-object-item name="result.holders.tick" type="string" description="Tick of the token." /%}
      {% preview-object-item name="result.holders.slug" type="string" description="Lowercase tick value." /%}
      {% preview-object-item name="result.holders.total" type="number" description="Total amount of tokens held." /%}
      {% preview-object-item name="result.holders.available" type="number" description="Total amount of available tokens that can be transfered." /%}
      {% preview-object-item name="result.holders.transferable" type="number" description="Total amount of transferable tokens." /%}
      {% partial file="pagination-response" /%}
    {% /jsonrpc-response %}

  {% /preview-section %}

{% /preview %}

---

### Get Address Tokens

Get list of tokens for given address.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://mainnet.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "Brc20.Address.GetTokens",
      "params": {
        "address": "<string>"
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="address" type="string" required=true description="Address to get list of tokens for." /%}
    {% /preview-object %}

    {% jsonrpc-response %}
      {% preview-object-item name="result" type="object[]" description="List of tokens held by the given address." /%}
      {% preview-object-item name="result.address" type="string" description="Address of the token holder." /%}
      {% preview-object-item name="result.tick" type="string" description="Tick of the token." /%}
      {% preview-object-item name="result.slug" type="string" description="Lowercase tick value." /%}
      {% preview-object-item name="result.total" type="number" description="Total amount of tokens held." /%}
      {% preview-object-item name="result.available" type="number" description="Total amount of available tokens that can be transfered." /%}
      {% preview-object-item name="result.transferable" type="number" description="Total amount of transferable tokens." /%}
    {% /jsonrpc-response %}

  {% /preview-section %}

{% /preview %}