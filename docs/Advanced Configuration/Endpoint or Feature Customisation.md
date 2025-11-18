---
sidebar_position: 6
---
# Endpoints Customisation

You can selectively disable and remove endpoints and functionalities from Stirling PDF as per your requirements.
There are many use-cases for this such as
- Avoid confusion for users for functionality you/your business don't use.
- Running a reduced version of Stirling-PDF that doesn't have the necessary server power to support the more advanced features.
- Cleanup interface for features you don't use


To do this `ENDPOINTS_TOREMOVE` and `ENDPOINTS_GROUPSTOREMOVE` have been set up.
They can include comma-separated lists of endpoints and groups to disable. For example, `ENDPOINTS_TOREMOVE=merge,removePages` would disable both the "merge PDFs" and "remove pages" functionalities.
`ENDPOINTS_GROUPSTOREMOVE=LibreOffice` Would disable a group of endpoints, in this case all endpoints which use LibreOffice in the backend.

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

## Complete Tool ID Reference

Use these exact tool IDs with `ENDPOINTS_TOREMOVE` to disable specific features:

### Recommended Tools
- `multiTool` - Multi-tool workbench
- `merge` - Merge PDFs
- `compare` - Compare PDFs
- `compress` - Compress PDFs
- `convert` - Convert to/from PDF
- `ocr` - OCR processing
- `redact` - Redact information

### Signing
- `certSign` - Certificate-based signing
- `sign` - Draw/text/image signature

### Document Security
- `addPassword` - Add password protection
- `removePassword` - Remove password
- `watermark` - Add watermark
- `addStamp` - Add stamp
- `sanitize` - Remove harmful elements
- `flatten` - Flatten form fields
- `unlockPDFForms` - Unlock PDF forms
- `changePermissions` - Change document permissions

### Verification
- `getPdfInfo` - Get PDF information
- `validateSignature` - Validate digital signature

### Document Review
- `read` - PDF viewer and annotation
- `changeMetadata` - Change metadata
- `editTableOfContents` - Edit table of contents

### Page Formatting
- `crop` - Crop pages
- `rotate` - Rotate pages
- `split` - Split PDFs
- `reorganizePages` - Reorganize pages
- `scalePages` - Scale pages
- `addPageNumbers` - Add page numbers
- `pageLayout` - Multi-page layout
- `bookletImposition` - Booklet imposition
- `pdfToSinglePage` - PDF to single page
- `addAttachments` - Add file attachments

### Extraction
- `extractPages` - Extract pages
- `extractImages` - Extract images

### Removal
- `removePages` - Remove pages
- `removeBlanks` - Remove blank pages
- `removeAnnotations` - Remove annotations
- `removeImage` - Remove images
- `removeCertSign` - Remove certificate signature

### Automation
- `automate` - Automation workflows (Pipeline)
- `autoRename` - Auto-rename PDFs

### Advanced Formatting
- `adjustContrast` - Adjust colors/contrast
- `repair` - Repair corrupted PDFs
- `scannerImageSplit` - Detect & split scanned photos
- `overlayPdfs` - Overlay PDFs
- `replaceColor` - Replace & invert colors
- `addImage` - Add image to PDF
- `scannerEffect` - Apply scanner effect

### Developer Tools
- `showJS` - Show JavaScript in PDF
- `devApi` - API documentation link
- `devFolderScanning` - Folder scanning guide link
- `devSsoGuide` - SSO guide link
- `devAirgapped` - Air-gapped setup guide link

## Usage Examples

**Disable specific tools:**
```bash
# Docker Run
docker run -e ENDPOINTS_TOREMOVE=sign,watermark,addStamp stirlingtools/stirling-pdf:latest

# Docker Compose
environment:
  - ENDPOINTS_TOREMOVE=sign,watermark,addStamp
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
ENDPOINTS_TOREMOVE=sign,compare,multiTool
```

## Notes

- Tool IDs are case-sensitive (use exact names from the reference above)
- Disabling a tool removes it completely from the UI and API
- Some tools may depend on others - test your configuration
- Changes require container restart to take effect
