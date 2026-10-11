---
sidebar_position: 12
title: Compress
description: Make PDFs smaller by choosing a compression level or a target file size.
sidebar_label: Compress
---

# Compress

## Compress a PDF

1. Select one or more PDFs and open **Compress**.
2. Under **Compression Method**, choose:
   - **Quality** - drag the **Quality Adjustment** slider from 1 to 9 (default 5). Higher levels give smaller files but can blur images.
   - **File Size** - enter a **Desired File Size** in KB or MB. Stirling PDF gets as close as it can.
3. Set any options below, then click **Compress**.

## Options

| Option | What it does |
|--------|--------------|
| **Apply Grayscale for Compression** | Converts images to shades of grey. |
| **Linearize PDF for fast web viewing** | Reorders the file so the first page shows before the whole file has downloaded. |
| **Convert images to line art** | Reduces pages to high-contrast black and white for the biggest saving. Not for photos. |

When line art is on, two more settings appear:

- **Detail level** (1-5, default 3) - how much of the page turns black.
- **Edge emphasis** - **Gentle**, **Balanced** or **Strong** (default) edge detection.

If **Convert images to line art** is greyed out, it isn't available where the tool runs.

If a scan needs to be searchable, run [OCR](./OCR.md) before you compress it.
