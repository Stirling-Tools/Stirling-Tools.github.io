---
sidebar_position: 3
id: Compare
title: Compare PDFs
description: Compare two PDF documents and highlight differences
---

# Compare PDFs

**Tool ID:** `compare`

Compare two PDF documents and visually highlight word-level differences. Runs entirely in your browser  - no files are sent to the server.

---

## How to Use

1. **Upload Original PDF** - Select the original/older version
2. **Upload Modified PDF** - Select the new/revised version
3. **Compare** - Process the documents
4. **Review Differences** - View highlighted changes

---

## Features

- **Side-by-side or stacked layout** - Toggle between horizontal and vertical views
- **Word-level diff** - Removed words highlighted in red, added words highlighted in green
- **Change navigation** - Dropdown selectors to jump between deletions and additions
- **Synchronized scrolling** - Optional linked scrolling between the two panes
- **Zoom and pan** - Scroll-wheel zoom, pinch-to-zoom, and drag to pan

---

## Limitations

- Works best with digital PDFs (not scanned). For scanned documents, run [OCR](./OCR.md) first
- Compares extracted text only  - layout-only or image-only changes are not detected
- Very large or highly dissimilar documents may be stopped early with a warning

---

## Related Tools

- **[OCR](./OCR.md)** - Make scanned PDFs searchable before comparing
