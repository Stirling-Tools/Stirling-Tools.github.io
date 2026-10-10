---
sidebar_position: 17
title: OCR
description: Make scanned PDFs searchable and selectable, and clean up scans, with OCR.
sidebar_label: OCR
---

# OCR

OCR (optical character recognition) finds the text in scanned or photographed pages and adds it to the PDF, so you can search, select and copy it.

## Run OCR

1. Select one or more PDFs and open **OCR / Cleanup scans**.
2. Under **Languages**, choose every language that appears in the document. At least one is required.
3. Pick an **OCR Mode** and any **Processing Options** (below).
4. Click **Process OCR and Review**, check the result, and download it.

## Options

**OCR Mode**

- **Auto (skip text layers)** - the default. Skips pages that already have text.
- **Force (re-OCR all, replace text)** - OCRs every page and replaces any existing text.
- **Strict (abort if text found)** - stops if any page already has selectable text.

**Processing Options**

| Option | What it does |
|--------|--------------|
| **Compatibility Mode** | Uses "sandwich PDF" output. Files are larger, but work better with some languages and older PDF software. |
| **Create a text file** | Also saves the recognised text as a separate .txt file. |
| **Deskew pages** | Straightens tilted pages before recognition. |
| **Clean input file** | Removes noise and boosts contrast before recognition. |
| **Clean final output** | Tidies the text layer in the finished PDF. |

In the desktop app, OCR usually needs Stirling Cloud or a server ([Where your tools run](../../Desktop/Where-Tools-Run.md)). On a self-hosted server, if a language is missing, ask your admin ([OCR languages](../../Server/Operations/OCR-Languages.md)).
