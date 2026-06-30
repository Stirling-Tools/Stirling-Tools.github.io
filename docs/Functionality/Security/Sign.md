---
sidebar_position: 3
id: Sign
title: Sign PDF (Handwritten Signatures)
description: Add handwritten, text, or image signatures to PDFs
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign PDF (Handwritten Signatures)

Add handwritten signatures, text signatures, or image-based signatures to PDF documents. This tool is for visual/handwritten signatures - for certificate-based digital signatures, see [Certificate Signing](./Certificate-Signing.md).

---

## Signature Methods

<Tabs>
  <TabItem value="draw" label="Draw" default>
    1. Upload PDF and navigate to the signing location
    2. Select the "Draw" tab to open the signature canvas
    3. Draw using mouse or touchscreen
    4. Position and resize the signature on the page
    5. Apply and download

    A touchscreen or stylus gives the best results.
  </TabItem>
  <TabItem value="type" label="Type">
    1. Upload PDF
    2. Select the "Type" tab
    3. Type your name and choose a font (Helvetica, Times, Courier, Arial, or Georgia)
    4. Position and apply
  </TabItem>
  <TabItem value="image" label="Upload Image">
    1. Upload PDF
    2. Select the "Upload" tab
    3. Select a PNG/JPG of your signature
    4. Position, resize, and apply

    Use a PNG with transparent background for best results.
  </TabItem>
</Tabs>

---

## Pre-stored Signatures

Configure Stirling PDF to load pre-stored signature files for quick, consistent signing across documents.

**Configuration:** [Sign with Custom Files](../../Configuration/Sign%20with%20custom%20files.md)

---

## Signature Options

- **Transparency** - Remove the white background of an uploaded signature image to make it transparent
- **Color** - Pick any ink color from the color picker (with quick black, blue, red, orange, green, and purple swatches) for drawn and typed signatures
- **Size** - Adjust the pen thickness and resize the placed signature to fit the signature line
- **Pages** - Sign on a single page, or place signatures on multiple pages

---

## Visual vs. Digital Signatures

| | Visual Signature (This Tool) | Digital Signature ([Certificate](./Certificate-Signing.md)) |
|---|---|---|
| **Security** | Visual only, can be copied | Cryptographically secure |
| **Authentication** | No verification | Proves signer identity |
| **Tamper Detection** | None | Detects changes after signing |
| **Setup** | None required | Requires certificate |

Visual signatures do **not** provide authentication, tamper protection, or guaranteed legal standing. For legally binding signatures requiring verification, use [Certificate Signing](./Certificate-Signing.md).

---

## Related Tools

- **[Certificate Signing](./Certificate-Signing.md)** - Digital signatures with certificates
- **[Add Stamp](../Content-Editing/Content-Editing.md#stamps--annotations)** - Add official stamps
- **[Add Password](./Security.md#password-and-access)** - Protect signed documents
