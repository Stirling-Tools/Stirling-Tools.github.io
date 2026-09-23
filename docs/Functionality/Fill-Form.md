---
sidebar_position: 9
id: Fill-Form
title: Fill Form
description: Fill in a PDF's form fields right in the viewer and download the completed PDF
tags:
  - forms
  - acroform
  - fill
---

# Fill Form

Fill Form lets you complete a PDF's interactive form fields directly in the viewer and download the filled result. Open a PDF that already contains form fields - text boxes, checkboxes, radio buttons, dropdowns - type your answers into the fields shown on the page, and save the completed document.

Fill Form works with fields that are already in the PDF; it does not add new fields. If a form has no fillable fields, there is nothing to type into.

---

## How to Use

1. **Open the tool** - Select Fill Form from the tools list. It opens in the viewer workbench.
2. **Load a PDF** - Upload a PDF that contains form fields. Stirling PDF reads the fields and overlays them on the page.
3. **Fill the fields** - Click each field and enter its value. Checkboxes, radio buttons, and dropdowns can be toggled or selected.
4. **Download** - Save to export the filled PDF.

---

## How It Differs from Other Form Tools

- **Fill Form** keeps the fields editable - it just populates their values, so the form can still be changed later.
- **Flatten** merges form fields into the page so they become part of the static document and can no longer be edited. Use it when you want to lock in answers before sending a final copy. See [Flatten](./Security/Security.md#password-and-access).
- **Unlock PDF Forms** removes read-only restrictions from fields so locked fields can be edited again. Use it when a form refuses input because its fields are marked read-only. See [Unlock PDF Forms](./Security/Security.md#password-and-access).

---

## Hybrid XFA Forms (Adobe LiveCycle)

Many government and corporate forms are made with Adobe LiveCycle Designer. They carry every field twice: as regular PDF form fields, which Stirling PDF and most viewers show, and as an XFA copy, which Adobe Acrobat and Reader show instead. Filling only the regular fields would leave Acrobat showing the old data.

When you open such a form, Stirling PDF shows a **Hybrid XFA form** notice and lets you choose what saving does:

| Mode | What happens | Use it when |
|---|---|---|
| **Sync XFA** (default) | Your values are copied into the XFA data, so Acrobat shows the same as every other viewer. The form keeps its LiveCycle behaviour. | Almost always |
| **Remove XFA** | The XFA copy is deleted, so every viewer, Acrobat included, shows the regular fields. LiveCycle scripts, calculations and validation stop working. | Syncing fails, or you want one set of fields for good |
| **Leave untouched** | The XFA copy is kept as it was. Acrobat keeps showing the old data. | You need the XFA exactly as it was |

With **Sync XFA** or **Remove XFA**, Stirling PDF also removes the form's *Reader extended features* signature: any save invalidates it, and leaving it in place makes Reader warn that the document has changed since it was created.

Adding, changing or deleting fields (the Create and Modify modes) cannot be carried into the XFA copy, so with **Sync XFA** those saves remove it, as **Remove XFA** does. Flattening a form removes it too.

**Dynamic XFA forms** are built entirely in XFA and have no regular fields; other viewers show only a "Please wait..." page. Stirling PDF says so when you open one: only Adobe Acrobat or Reader can fill them.

### What a sync covers

- Text fields, including rich-text fields, whose formatting is kept.
- Checkboxes, stored with the on and off values the form defines (often `1` and `0`).
- Radio button groups, stored with the value of the chosen option.
- Dropdowns and lists, stored with the value the form saves rather than the text it displays.
- Fields that share one value, such as an ID repeated on every page: the one you edited wins, and the others are updated to match.

Not synced: fields the form never stores (Acrobat shows them empty or with their default), image and signature fields, and numeric or date fields you did not edit, whose stored value is kept as it was.

### Repairing a form that is already out of step

`POST /api/v1/form/xfa-sync` takes a hybrid PDF whose XFA data no longer matches its fields, brings it in line, and returns a JSON report listing every field with its XFA value before and after, plus the updated PDF as base64:

```bash
curl -s -F "file=@form.pdf" http://localhost:8080/api/v1/form/xfa-sync -o report.json
jq -r .pdf report.json | base64 -d > form-synced.pdf
jq '.fields[] | select(.status == "updated")' report.json
```

Add `-F "includePdf=false"` to get the report alone, or `-F "mode=strip"` to remove the XFA instead. The other form endpoints (`/fill`, `/add-fields`, `/edit-fields`, `/modify-fields`, `/delete-fields`) take the same choice as `xfaMode`: `sync` (the default), `strip` or `none`.

---

## Notes

- Runs in your self-hosted Stirling PDF instance with no external service or credits required. See [Modes](../Modes-and-Licensing.md).
- The PDF must already contain fillable form fields. PDFs with no fields, or scanned image-only forms, have nothing to fill.
- Automating form filling? You can do the same thing in a pipeline or script. See the [API reference](../API.md) for details.

---

## Related Tools

- **[Multi-Tool Workbench](./Multi-Tool.md)** - Visual page editing
- **[Complete Tool Reference](./Functionality.md)** - All available tools
