---
title: Content
pageTitle: Sado IPFS Content
description: Content details covering media types and size restrictions.
---

Sado IPFS supports a wide array of media types that can be uploaded and stored through our provided APIs.

---

## Size

The maximum size for any content type is 380 kilobytes or 389120 bytes.

---

## Media Types

The following media types are allowed to be stored on the Sado IPFS node:

{% preview-section %}

  ```json {% preview=false %}

  // Images

  image/avif
  image/bmp
  image/gif
  image/jpeg
  image/png
  image/svg+xml
  image/tiff
  image/webp
  
  // Audio

  audio/midi
  audio/mpeg
  audio/ogg
  audio/wav
  audio/webm
  audio/x-midi

  // Video

  video/mp4
  video/mpeg
  video/ogg
  video/webm
  video/x-msvideo

  // Text

  text/csv
  text/plain

  // Misc.

  application/json
  application/pdf
  ```

{% /preview-section %}