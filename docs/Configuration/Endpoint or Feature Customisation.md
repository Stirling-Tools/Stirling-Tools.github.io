---
sidebar_position: 6
---
# Endpoints Customisation

You can selectively disable and remove endpoints and functionalities from Stirling PDF as per your requirements.
There are many use-cases for this such as
- Avoid confusion for users for functionality you/your business don't use.
- Running a reduced version of Stirling-PDF that doesn't have the necessary server power to support the more advanced features.
- Cleanup interface for features you don't use


You have two ways to disable endpoints:

1. **Environment Variables** (`ENDPOINTS_TOREMOVE` and `ENDPOINTS_GROUPSTOREMOVE`):
   - Example: `ENDPOINTS_TOREMOVE=merge-pdfs,remove-pages` disables merge and remove page tools
   - Example: `ENDPOINTS_GROUPSTOREMOVE=LibreOffice` disables all LibreOffice-dependent tools

2. **Settings File** (`settings.yml` under `endpoints.toRemove` and `endpoints.groupsToRemove`):
   - Example: `toRemove: [merge-pdfs, remove-pages]`
   - Example: `groupsToRemove: [LibreOffice]`

## Available Endpoint Groups

You can disable entire groups of related endpoints using `ENDPOINTS_GROUPSTOREMOVE`:

| Group Name | What It Disables | Example |
|------------|------------------|---------|
| `LibreOffice` | All office document conversions (DOCX, XLSX, PPTX to/from PDF) | `ENDPOINTS_GROUPSTOREMOVE=LibreOffice` |
| `Python` | Python-based image processing features | `ENDPOINTS_GROUPSTOREMOVE=Python` |
| `OpenCV` | Advanced image processing operations | `ENDPOINTS_GROUPSTOREMOVE=OpenCV` |
| `OCRmyPDF` | OCR (Optical Character Recognition) features | `ENDPOINTS_GROUPSTOREMOVE=OCRmyPDF` |
| `Weasyprint` | HTML to PDF conversion | `ENDPOINTS_GROUPSTOREMOVE=Weasyprint` |
| `Calibre` | E-book format conversions | `ENDPOINTS_GROUPSTOREMOVE=Calibre` |
| `QPDF` | Various PDF operations powered by QPDF | `ENDPOINTS_GROUPSTOREMOVE=QPDF` |
| `Ghostscript` | PDF/A conversion and compression operations | `ENDPOINTS_GROUPSTOREMOVE=Ghostscript` |

**Example - Disable multiple groups:**
```bash
ENDPOINTS_GROUPSTOREMOVE=LibreOffice,Calibre,Weasyprint
```


## Usage Examples

### Environment Variables

**Disable specific tools:**
```bash
# Docker Run
docker run -e ENDPOINTS_TOREMOVE=sign,add-watermark,add-stamp stirlingtools/stirling-pdf:latest

# Docker Compose
environment:
  - ENDPOINTS_TOREMOVE=sign,add-watermark,add-stamp
```

**Disable entire groups:**
```bash
# Disable all office conversions and OCR
ENDPOINTS_GROUPSTOREMOVE=LibreOffice,OCRmyPDF
```

**Combine both methods:**
```bash
# Disable groups AND specific tools
ENDPOINTS_GROUPSTOREMOVE=LibreOffice,Calibre
ENDPOINTS_TOREMOVE=sign,compare,multi-tool
```

### Settings File (settings.yml)

If you're editing `settings.yml` directly, use the kebab-case endpoint IDs:

**Disable specific tools:**
```yaml
endpoints:
  toRemove:
    - sign
    - add-watermark
    - add-stamp
    - compare
    - merge-pdfs
```

**Disable entire groups:**
```yaml
endpoints:
  groupsToRemove:
    - LibreOffice
    - OCRmyPDF
```

**Combine both methods:**
```yaml
endpoints:
  toRemove:
    - sign
    - compare
    - multi-tool
    - merge-pdfs
  groupsToRemove:
    - LibreOffice
    - Calibre
```

## Complete Endpoint Reference for settings.yml

Use these exact kebab-case IDs with `endpoints.toRemove` in settings.yml.

### Page Operations
- `merge-pdfs` - Merge PDFs
- `split-pages` - Split PDFs
- `extract-pages` - Extract Pages
- `remove-pages` - Remove Pages
- `rearrange-pages` - Rearrange Pages
- `rotate-pdf` - Rotate PDFs
- `crop` - Crop Pages
- `scale-pages` - Scale Pages
- `add-page-numbers` - Add Page Numbers
- `pdf-to-single-page` - PDF to Single Page
- `multi-page-layout` - Multi-Page Layout
- `booklet-imposition` - Booklet Imposition
- `overlay-pdf` - Overlay PDFs
- `split-pdf-by-sections` - Split by Sections
- `split-pdf-by-chapters` - Split by Chapters
- `auto-split-pdf` - Auto Split PDF
- `split-by-size-or-count` - Split by Size/Count
- `add-attachments` - Add Attachments

### Conversion
- `pdf-to-img` - PDF to Image
- `img-to-pdf` - Image to PDF
- `file-to-pdf` - File to PDF
- `pdf-to-word` - PDF to Word
- `pdf-to-presentation` - PDF to Presentation
- `pdf-to-text` - PDF to Text
- `pdf-to-html` - PDF to HTML
- `pdf-to-xml` - PDF to XML
- `pdf-to-markdown` - PDF to Markdown
- `pdf-to-csv` - PDF to CSV
- `pdf-to-epub` - PDF to EPUB
- `pdf-to-vector` - PDF to Vector
- `pdf-to-video` - PDF to Video
- `pdf-to-json` - PDF to JSON
- `pdf-to-rtf` - PDF to RTF
- `pdf-to-cbz` - PDF to CBZ
- `pdf-to-cbr` - PDF to CBR
- `pdf-to-pdfa` - PDF to PDF/A
- `html-to-pdf` - HTML to PDF
- `url-to-pdf` - URL to PDF
- `markdown-to-pdf` - Markdown to PDF
- `eml-to-pdf` - Email to PDF
- `cbz-to-pdf` - CBZ to PDF
- `json-to-pdf` - JSON to PDF
- `vector-to-pdf` - Vector to PDF

### Security & Signing
- `add-password` - Add Password Protection
- `remove-password` - Remove Password
- `change-permissions` - Change Permissions
- `add-watermark` - Add Watermark
- `add-stamp` - Add Stamp
- `sanitize-pdf` - Sanitize PDF
- `flatten` - Flatten Form Fields
- `unlock-pdf-forms` - Unlock PDF Forms
- `cert-sign` - Certificate Sign
- `sign` - Draw/Text/Image Signature
- `remove-cert-sign` - Remove Certificate Signature
- `validate-signature` - Validate Signature
- `verify-pdf` - Verify PDF
- `redact` - Redact Information
- `auto-redact` - Auto Redact

### Content Extraction & Removal
- `extract-images` - Extract Images
- `extract-image-scans` - Extract Image Scans
- `remove-image-pdf` - Remove Images
- `remove-annotations` - Remove Annotations
- `remove-blanks` - Remove Blank Pages
- `ocr-pdf` - OCR

### Document Editing & Analysis
- `text-editor-pdf` - Text Editor
- `edit-table-of-contents` - Edit Table of Contents
- `update-metadata` - Change Metadata
- `get-info-on-pdf` - Get PDF Info
- `compare` - Compare PDFs
- `adjust-contrast` - Adjust Contrast
- `replace-invert-pdf` - Replace/Invert Colors
- `scanner-effect` - Scanner Effect
- `repair` - Repair PDF
- `add-image` - Add Image to PDF

### Form Fields
- `fields` - Form Fields
- `fill` - Fill Form Fields
- `modify-fields` - Modify Form Fields
- `delete-fields` - Delete Form Fields

### Multi-Tool & Automation
- `multi-tool` - Multi-Tool Workbench
- `compare` - Compare PDFs
- `compress-pdf` - Compress PDFs
- `automate` - Automation/Pipeline
- `pipeline` - Pipeline
- `auto-rename` - Auto Rename

### Viewing & Display
- `view-pdf` - PDF Viewer
- `show-javascript` - Show JavaScript in PDF

### Developer Tools
- `dev-api-docs` - API Documentation
- `dev-folder-scanning-docs` - Folder Scanning Guide
- `dev-sso-guide-docs` - SSO Guide
- `dev-airgapped-docs` - Air-gapped Setup Guide

### Internal
- `handleData` - Handle Data

## Notes

- Tool IDs are case-sensitive (use exact names from the reference above)
- Disabling a tool removes it completely from the UI and API
- Some tools may depend on others - test your configuration
- Changes require container restart to take effect
