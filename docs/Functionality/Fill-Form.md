---
sidebar_position: 9
id: Fill-Form
title: Fill Form
description: Fill PDF AcroForm fields interactively in a visual viewer and download the filled PDF
tags:
  - forms
  - acroform
  - fill
---

# Fill Form

**Tool ID:** `formFill`

Fill Form lets you complete a PDF's interactive form fields (AcroForm fields) directly in a visual viewer and download the filled result. Open a PDF that already contains form fields - text boxes, checkboxes, radio buttons, dropdowns - type your answers into the fields shown on the page, and export the completed document.

The tool detects the existing fields in the uploaded PDF; it does not add new fields. To create or edit fields, use the Forms API endpoints instead.

---

## How to Use

1. **Open the tool** - Select Fill Form from the tools list. It opens in the viewer workbench.
2. **Load a PDF** - Upload a PDF that contains form fields. Stirling PDF reads the fields and overlays them on the page.
3. **Fill the fields** - Click each field and enter its value. Checkboxes, radio buttons, and dropdowns can be toggled or selected.
4. **Download** - Save to export the filled PDF.

---

## How It Differs from Other Form Tools

- **Fill Form** keeps the fields editable - it just populates their values, so the form can still be changed later.
- **Flatten** merges form fields into the page so they become part of the static document and can no longer be edited. Use it when you want to lock in answers before sending a final copy. See [Flatten](./Security/Security.md#permissions--access-control).
- **Unlock PDF Forms** removes read-only restrictions from fields so locked fields can be edited again. Use it when a form refuses input because its fields are marked read-only. See [Unlock PDF Forms](./Security/Security.md#permissions--access-control).

---

## Notes

- Runs in your self-hosted Stirling PDF instance with no external service or credits required. See [Modes and Licensing](../Modes-and-Licensing.md).
- The PDF must already contain AcroForm fields. PDFs with no fields, or scanned image-only forms, have nothing to fill.

---

## Related Tools

- **[Multi-Tool Workbench](./Multi-Tool.md)** - Visual page editing
- **[Complete Tool Reference](./Functionality.md)** - All available tools
