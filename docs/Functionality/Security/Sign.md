---
sidebar_position: 3
id: Sign
title: Sign PDF (Handwritten Signatures)
description: Add handwritten, text, or image signatures to PDFs
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Sign PDF (Handwritten Signatures)

**Tool ID:** `sign`

Add handwritten signatures, text signatures, or image-based signatures to PDF documents. This tool is for visual/handwritten signatures - for certificate-based digital signatures, see [Certificate Signing](./Certificate-Signing).

---

## Signature Methods

<Tabs>
  <TabItem value="draw" label="Draw" default>
    1. Upload PDF and navigate to the signing location
    2. Click "Draw Signature" to open the signature pad
    3. Draw using mouse or touchscreen
    4. Position and resize the signature on the page
    5. Apply and download

    A touchscreen or stylus gives the best results.
  </TabItem>
  <TabItem value="type" label="Type">
    1. Upload PDF
    2. Click "Text Signature"
    3. Type your name and choose a cursive/script font
    4. Position and apply
  </TabItem>
  <TabItem value="image" label="Upload Image">
    1. Upload PDF
    2. Click "Upload Signature"
    3. Select a PNG/JPG of your signature
    4. Position, resize, and apply

    Use a PNG with transparent background for best results.
  </TabItem>
</Tabs>

---

## Pre-stored Signatures

Configure Stirling PDF to load pre-stored signature files for quick, consistent signing across documents.

**Configuration:** [Sign with Custom Files](../../Configuration/Sign%20with%20custom%20files)

---

## Signature Options

- **Transparency** - Make signature background transparent
- **Color** - Blue, black, or custom ink color
- **Size** - Adjust to fit signature line
- **Rotation** - Adjust angle if needed
- **Pages** - Sign on single page, multiple pages, or different signatures per page

---

## Visual vs. Digital Signatures

| | Visual Signature (This Tool) | Digital Signature ([Certificate](./Certificate-Signing)) |
|---|---|---|
| **Security** | Visual only, can be copied | Cryptographically secure |
| **Authentication** | No verification | Proves signer identity |
| **Tamper Detection** | None | Detects changes after signing |
| **Setup** | None required | Requires certificate |

Visual signatures do **not** provide authentication, tamper protection, or guaranteed legal standing. For legally binding signatures requiring verification, use [Certificate Signing](./Certificate-Signing).

---

## Related Tools

- **[Certificate Signing](./Certificate-Signing)** - Digital signatures with certificates
- **[Add Stamp](../Content-Editing#stamps--annotations)** - Add official stamps
- **[Add Password](../Security#password-protection)** - Protect signed documents
