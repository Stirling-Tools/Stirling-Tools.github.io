---
sidebar_position: 6
id: Advanced-Tools
title: Advanced Tools
description: Power user features for automation and complex PDF operations
---

# Advanced Tools

Advanced tools for automation workflows and complex PDF operations.

---

## Automation Tools

### Automate (Pipeline)

**Tool ID:** `automate`

Chain multiple operations into automated workflows. Save and reuse pipeline configurations, process files automatically with predefined steps, and set up folder watching for automatic processing.

**[Read the complete Pipeline Automation Guide →](../Configuration/Pipeline.md)**

---

### Auto Rename

**Tool ID:** `autoRename`

Automatically rename PDF files based on their content. Analyzes each PDF and suggests filenames using this priority:
1. PDF metadata title (if present)
2. Largest font text on first page
3. First heading or prominent text
4. First line of readable text

Works best with documents that have clear titles. Scanned documents may need [OCR](./OCR.md) first.

---

## Formatting Tools

### Adjust Contrast

**Tool ID:** `adjustContrast`

Adjust brightness, contrast, and saturation of PDF content. Useful for improving readability of faded scans or creating high-contrast versions.

---

### Repair

**Tool ID:** `repair`

Attempt to repair corrupted or damaged PDF files. Can fix broken cross-reference tables, corrupted object streams, missing headers, and encoding errors.

Cannot recover physically deleted data. Success depends on extent of corruption.

---

### Scanner Image Split

**Tool ID:** `scannerImageSplit`

Automatically detect and split individual scanned photos from multi-image PDF scans. Useful for batch-scanned photo collections.

---

### Overlay PDFs

**Tool ID:** `overlayPdfs`

Layer one PDF on top of another. Control position, opacity, and whether the overlay appears in the foreground or background. Apply to specific pages or all pages.

---

### Replace Color

**Tool ID:** `replaceColor`

Replace specific colors in a PDF or invert all colors. Options include full color inversion, targeted color replacement, and adjustable matching threshold.

---

### Add Image

**Tool ID:** `addImage`

Insert images into PDF pages with precise positioning and sizing. Supports common image formats.

---

### Scanner Effect

**Tool ID:** `scannerEffect`

Apply realistic scanner-like effects to digital PDFs  - slight rotation/skew and scan artifacts to make documents appear physically scanned.

---

## Developer Tools

### Show JavaScript

**Tool ID:** `showJS`

Display any embedded JavaScript code within a PDF document. Useful for security auditing and understanding PDF form logic.

---

### Quick Links

- **[API Documentation](../API.md)**
- **[Folder Scanning Setup](../Configuration/FolderScanning.md)**
- **[SSO Configuration](../Configuration/Single%20Sign-On%20Configuration.md)**
- **[General Configuration](../Configuration/Configuration.md)**
