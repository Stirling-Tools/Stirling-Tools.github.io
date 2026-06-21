---
sidebar_position: 1
title: Redaction
parent: Page operations
---

# Redaction Tool User Guide

## Overview
The Redaction tool permanently removes sensitive information from PDFs. It offers two modes:

- **Automatic** - Type the words or regex patterns to remove and let the tool find and redact every match across the document.
- **Manual** - Open the PDF in the viewer and draw redactions over specific text, areas, or whole pages.

Unlike a simple black box drawn on top of the page, automatic redaction rewrites the page content so the underlying text is genuinely removed - not merely hidden. You can also flatten the result to an image to guarantee nothing recoverable is left behind.

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
Manual redaction lets you mark sensitive content visually in the viewer using three methods: text selection, area drawing, or entire page redaction.

### 1. Text Selection Redaction
Perfect for redacting specific words, sentences, or paragraphs.

**How to use:**
1. Click the text selection icon in the toolbar

   ![image](https://github.com/user-attachments/assets/e66dbfc1-0b06-4f65-8f60-7277b8acca91)

2. Select the text you want to redact
3. Apply the redaction by either:
   - Pressing `Ctrl + S`
   - Clicking the save icon in the toolbar
     
      ![image](https://github.com/user-attachments/assets/73d4b1f0-a454-452b-ab60-028b9728004b)

### 2. Area Drawing Redaction
Ideal for redacting images, tables, or irregular content blocks.

**How to use:**
1. Click the drawing tool icon in the toolbar

   ![image](https://github.com/user-attachments/assets/8597abed-0992-48d3-baf4-0e7673fb500c)

2. Click and hold at your starting point
3. Drag to create a rectangle over the area
4. Click again to confirm and apply the redaction
   - A red border means unsaved

      ![image](https://github.com/user-attachments/assets/42809be3-34e6-4725-920b-b4d51eb72e4f)

   - A green border means saved and active
   
      ![image](https://github.com/user-attachments/assets/0711ff11-da1a-41c3-9d57-82067ee0f8b8)

### 3. Page Redaction
Used when you need to redact entire pages.

**How to use:**
1. Open the page redaction dialog
   
   ![image](https://github.com/user-attachments/assets/fae58a19-1f54-463e-bc81-027bd4f403bf)

   ![image](https://github.com/user-attachments/assets/66c1b1aa-7da1-4262-a476-0551924ed509)

3. Enter page numbers or ranges (e.g., "1,3-5,7")
4. Select your preferred color
5. Click "Apply" to save changes

## Customizing Redactions

### Changing Colors

**For new redactions:**
1. Click the color palette icon in the toolbar
   
   ![image](https://github.com/user-attachments/assets/788fd325-489e-4404-8377-07ec500a77dd)

2. Select your preferred color
3. Any new redactions will use this color

**For existing redactions:**
1. Click the redacted area
2. Click the color palette icon that appears
3. Choose your new color
  
![redaction_color](https://github.com/user-attachments/assets/0bc05461-6427-4a62-8cd4-745c3104c04f)

### Removing Redactions
1. Click the redacted area you want to remove
2. Either:
   - Click the trash icon that appears
   - Press the `Delete` key

![redaction_removal](https://github.com/user-attachments/assets/9bd3be2a-d2ec-4468-a229-bf81efb36bcc)

### Converting PDF to PDF-image (Used in removing text behind the box)
To enable PDF to PDF-image option:
   1. Click on the image icon
   
         ![image](https://github.com/user-attachments/assets/8c480923-05e1-46d3-8f59-5f78db6d87f8)

To disable PDF to PDF-image option:
   1. Click on the image icon
   
         ![image](https://github.com/user-attachments/assets/e2e07e31-8eb0-41ac-80ab-ffd8520f5795)

- If the image icon is green, then the option is enabled, if it is red then it is disabled.

## Keyboard Shortcuts
- `Ctrl + S`: Save/apply redaction
- `Delete`: Remove selected redaction
- `Escape`: Cancel unsaved area drawing

## Tips
- If you're in drawing mode and need to delete a redaction, temporarily disable drawing mode first
- You can combine different redaction methods in the same document
- Always review your redactions before finalizing the document
- Redaction colors can be changed at any time, even after applying
