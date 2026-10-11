---
sidebar_position: 19
title: Redact
description: Permanently remove sensitive text and areas from a PDF, automatically or by hand.
sidebar_label: Redact
---

# Redact

Redact permanently deletes sensitive text and areas from a PDF, not just hides them. Keep a copy of the original.

## Automatic redaction

1. Under **Redaction Method**, choose **Automatic**.
2. Under **Words to Redact**, type a word or phrase and click **Add**. Repeat for each one.
3. (Optional) Under **Advanced**, set:
   - **Use Regex** - treat each entry as a regular expression.
   - **Whole Word Search** - match whole words only, so "John" doesn't match "Johnson".
   - **Box Color** and **Custom Extra Padding** - the look of the redaction boxes.
   - **Convert PDF to PDF-Image** - turns the redacted pages into images so no text at all remains behind the boxes. The text is then no longer selectable or searchable.
4. Click **Redact**.

Automatic mode can redact several files at once: select them in the file manager first.

### Patterns for personal data

With **Use Regex** on, try these patterns:

| Type | Example pattern |
| --- | --- |
| US Social Security number | `\d{3}-\d{2}-\d{4}` |
| Credit or debit card | `\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}` |
| IBAN | `[A-Z]{2}\d{2}[A-Z0-9]{1,30}` |
| US routing number (ABA) | `\b\d{9}\b` |
| Labelled account number | `[Aa]ccount\s*#?\s*\d{6,}` |
| Email address | `[\w.-]+@[\w.-]+\.\w+` |
| US phone number | `\(\d{3}\)\s*\d{3}-\d{4}` |
| Date (YYYY-MM-DD) | `\d{4}-\d{2}-\d{2}` |

## Manual redaction

1. Under **Redaction Method**, choose **Manual**. The document opens in the viewer.
2. Set the **Redaction Color**.
3. Select text, or draw an area over images, signatures or anything else, to mark it. Marks stay pending until you apply them.
4. To drop a pending mark, select it and click **Remove this mark**.
5. Apply a mark with **Apply** in its selection menu, or all pending marks with **Apply Redactions** in the panel. **Save Changes** applies any pending marks and saves the file.
