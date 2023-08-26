---
title: Blockchain
pageTitle: Ordit API - Blockchain
description: List of API methods for retrieving blockchain information.
---

## Methods

List of JSON-RPC 2.0 methods made available for retrieving blockchain related data.

### GetBlock

Get block by height, or hash as presented in the network.

{% preview tabs=["API"] %}

  {% preview-section %}

    {% endpoint type="POST" url="https://proto.ordit.io/rpc" /%}

    ```json {% preview=true %}
    {
      "jsonrpc": "2.0",
      "method": "GetBlock",
      "params": {
        "height": 1,
        "verbosity": 1,
        "options": {
          "nohex": true,
          "nowitness": true
        }
      },
      "id": 0
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="height" type="number" required=false description="Height of the block to retrieve." note="Must be defined if hash is absent" /%}
      {% preview-object-item name="hash" type="string" required=false description="Hash of the block to retrieve." note="Must be defined if height is absent" /%}
      {% preview-object-item name="verbosity" type="1 | 2" required=false default="1" description="Verbosity 1 returns tx as a list of txids. Verbosity 2 returns tx as an array of resolved transactions." /%}
      {% preview-object-item name="options" type="object" required=false description="List of options that can be provided with the request to modify the result." /%}
      {% preview-object-item name="options.nohex" type="boolean" required=false default="false" description="Do not include the hex values." /%}
      {% preview-object-item name="options.nowitness" type="boolean" required=false default="false" description="Do not include the witness values." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="hash" type="hex" description="The block hash (same if provided)." /%}
      {% preview-object-item name="confirmations" type="number" description="The number of confirmations, or -1 if the block is not on the main chain." /%}
      {% preview-object-item name="size" type="number" description="The block size." /%}
      {% preview-object-item name="strippedsize" type="number" description="The block size excluding witness data." /%}
      {% preview-object-item name="weight" type="number" description="The block weight as defined in BIP 141." /%}
      {% preview-object-item name="height" type="number" description="The block height or index." /%}
      {% preview-object-item name="version" type="number" description="The block version." /%}
      {% preview-object-item name="versionHex" type="hex" description="The block version formatted in hexadecimal." /%}
      {% preview-object-item name="merkleroot" type="hex" description="The merkle root." /%}
      {% preview-object-item name="tx" type="string | RawTransaction" description="List of transaction ids with verbosity 1, or list of raw transactions with verbosity 2." /%}
      {% preview-object-item name="time" type="number" description="The block time expressed in UNIX epoch time." /%}
      {% preview-object-item name="mediantime" type="number" description="The median block time expressed in UNIX epoch time." /%}
      {% preview-object-item name="nonce" type="number" description="The nonce." /%}
      {% preview-object-item name="bits" type="hex" description="The bits." /%}
      {% preview-object-item name="difficulty" type="number" description="The difficulty." /%}
      {% preview-object-item name="chainwork" type="hex" description="Expected number of hashes required to produce the chain up to this block (in hex)." /%}
      {% preview-object-item name="nTx" type="number" description="The number of transactions in the block." /%}
      {% preview-object-item name="previousblockhash" type="hex" description="The hash of the previous block." /%}
      {% preview-object-item name="nextblockhash" type="hex" description="The hash of the next block." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}