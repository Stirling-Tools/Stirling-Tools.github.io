---
sidebar_position: 1
title: Redaction
parent: Page operations
---

# Redaction Tool User Guide

## Overview
The Redaction tool permanently removes sensitive information from PDFs. It offers two modes:

- **Automatic** - Type the words or regex patterns to remove and let the tool find and redact every match across the document.
- **Manual** - Open the PDF in the viewer and mark specific text or areas for redaction.

Unlike a simple black box drawn on top of the page, automatic redaction deletes the matching text from the file so the underlying text is genuinely removed - not merely hidden. You can also flatten the result to an image to guarantee nothing recoverable is left behind.

## Choosing a mode
At the top of the Redact panel, the **Redaction Method** selector switches between **Automatic** and **Manual**. Selecting **Manual** opens the document in the viewer, where the drawing controls described below appear.

---

## Automatic redaction
Automatic redaction searches the document for the text you specify and removes every match.

**How to use:**
1. Choose **Automatic** as the redaction method.
2. Under **Redaction Settings**, add each **word or pattern** to redact. Add as many as you need - the tool scans for all of them in a single pass, and matches are found across multiple columns and text lines.
3. (Optional) Open **Advanced Settings** to adjust:
   - **Use Regex** - Treat each entry as a regular expression rather than a literal word.
   - **Whole Word Search** - Match only complete words, not substrings.
   - **Box Colour** and **Custom Extra Padding** - Style the redaction boxes.
   - **Convert PDF to PDF-Image** - Flatten the redacted PDF to an image so no text remains behind the boxes (enabled by default).
4. Click **Redact**.

### Redacting PII with patterns
With **Use Regex** enabled you can target common personally identifiable information (PII) by entering the matching pattern. For example:

| Type | Example pattern |
| --- | --- |
| Social Security number (SSN) | `\d{3}-\d{2}-\d{4}` |
| Credit / debit card | `\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}` |
| IBAN | `[A-Z]{2}\d{2}[A-Z0-9]{1,30}` |
| US routing number (ABA) | `\b\d{9}\b` |
| Account number (labelled) | `[Aa]ccount\s*#?\s*\d{6,}` |
| Email address | `[\w.-]+@[\w.-]+\.\w+` |
| Phone number | `\(\d{3}\)\s*\d{3}-\d{4}` |

Add one pattern per entry; refine them to suit your documents to keep false positives down.

### How text is removed
Automatic redaction deletes the matching text from the file rather than just covering it. For maximum safety, keep **Convert PDF to PDF-Image** enabled so no recoverable text can remain under the boxes.

---

## Manual redaction

Manual mode lets you select text or draw areas in the PDF viewer to mark content for redaction. The tool activates when you enter this mode.

1. Choose **Manual** in the Redaction Method selector.
2. Set **Redaction Colour** in the panel.
3. Select text or draw an area on the page to create a pending mark. Review each mark before applying it.
4. To remove a pending mark, select it and use **Remove this mark**.
5. Use **Apply (permanent)** in the selection menu to apply a redaction, or **Save Changes** in the panel to apply pending marks and save the file.

Applied redactions permanently delete the underlying content. Removal and colour changes to pending marks must happen before permanent application; the tool does not offer recolouring or removal of already-applied redactions. Keep the original file if you need to start again.
