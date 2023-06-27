---
title: IPFS API
pageTitle: Sado IPFS
description: Decentralized file system for SADO content.
---

Coming soon ...

---

## Methods

Here is a list of IPFS methods.

---

### .upload

{% preview tabs=["API"] %}

  {% preview-section %}

    ```json {% preview=true %}
    POST /upload
    {
      "content": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA….",
      "pin": false
    }
    ```

    {% preview-object title="Parameters" %}
      {% preview-object-item name="content" type="string" required=true description="Base64 formatted string along with type meta data." /%}
      {% preview-object-item name="pin" type="boolean" required=false description="Prevents the uploaded content being garbage collected." /%}
    {% /preview-object %}

    {% preview-object title="Response" %}
      {% preview-object-item name="cid" type="string" description="CID path of the stored content." /%}
      {% preview-object-item name="url" type="string" description="Gateway url to access the content." /%}
    {% /preview-object %}

  {% /preview-section %}

{% /preview %}

