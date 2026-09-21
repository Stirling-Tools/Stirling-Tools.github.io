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

**[Read the complete Pipeline Automation Guide →](../Configuration/Automation/Pipeline.md)**

---

### Auto Rename

**Tool ID:** `autoRename`

Automatically rename PDF files using prominent text near the start of the document. The tool selects text with the largest font size.

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

Layer overlay PDFs over a base PDF. Choose the overlay mode, repetition counts where applicable, and whether the overlay is placed in the foreground or background.

---

### Replace Color

**Tool ID:** `replaceColor`

Invert PDF colours, replace text and background colours using the available colour settings, or convert to CMYK.

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
- **[Folder Scanning Setup](../Configuration/Storage/FolderScanning.md)**
- **[SSO Configuration](../Configuration/Security/Single%20Sign-On%20Configuration.md)**
- **[General Configuration](../Configuration/Configuration.md)**
