---
sidebar_position: 1
id: Recommended-Tools
title: Recommended Tools
description: The most commonly used PDF tools in Stirling PDF
---

# Recommended Tools

The most frequently used PDF operations, prominently featured on the home page for quick access.

---

## Multi-Tool

**Tool ID:** `multiTool`

Page editor workspace  - upload PDFs once and chain multiple page operations (rotate, reorder, delete, split) without re-uploading.

**[Multi-Tool Guide →](./Multi-Tool.md)**

---

## Merge PDFs

**Tool ID:** `merge`

Combine multiple PDF documents into a single file. Drag and drop to reorder before merging.

---

## Compare

**Tool ID:** `compare`

Compare two PDF documents side-by-side with visual difference highlighting.

**[Compare Guide →](./Compare.md)**

---

## Compress

**Tool ID:** `compress-pdf`

Reduce PDF file size (10-90% reduction) with configurable quality levels.

**[Compress Guide →](./Compress.md)**

---

## Convert

**Tool ID:** `convert`

Convert between PDF and 50+ file formats including images, Office documents, HTML, and more. Batch conversion supported.

**[Convert Guide →](./Convert/Convert.md)**

---

## OCR

**Tool ID:** `ocr-pdf`

Make scanned PDFs searchable by recognizing text in images. Supports 100+ languages via Tesseract OCR.

**[OCR Guide →](./OCR.md)**

---

## Redact

**Tool ID:** `redact`

Permanently remove sensitive information from PDFs. Supports manual redaction (draw boxes) and automatic redaction (text/regex patterns).

**Common patterns:**
- SSN: `\d{3}-\d{2}-\d{4}`
- Phone: `\(\d{3}\) \d{3}-\d{4}`
- Email: `[\w\.-]+@[\w\.-]+\.\w+`

Redaction is permanent  - original content cannot be recovered.

**[Redaction Guide →](./Page-Operations/redact.md)**

---

## More Tools

- **[All Tools](./Functionality.md)** - Complete tool reference
- **[Advanced Tools](./Advanced-Tools.md)** - Automation, repair, overlay, and more
- **[API Documentation](../API.md)** - Programmatic access
