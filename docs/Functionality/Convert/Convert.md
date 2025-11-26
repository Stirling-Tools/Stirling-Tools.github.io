---
sidebar_position: 2
description: Convert files to and from PDF format
---

# Convert

Stirling-PDF's Convert tool provides powerful file format conversion with support for 50+ file types. Convert documents, images, web pages, and more to PDF, or export PDFs to other formats.

---

## How to Use Convert

1. **Select Source Format** - Choose what you're converting from (e.g., Word, Image, PDF)
2. **Select Target Format** - Choose what you're converting to (e.g., PDF, JPG, DOCX)
3. **Upload Files** - Add one or multiple files depending on the conversion
4. **Configure Options** - Adjust settings like image quality, color mode, layout
5. **Convert** - Process and download your converted files

---

## Supported Conversions

### Convert TO PDF

#### Office Documents
- **Word** - DOCX, DOC, ODT → PDF
- **Excel** - XLSX, XLS, ODS → PDF
- **PowerPoint** - PPTX, PPT, ODP → PDF
- **Text** - TXT, RTF → PDF

#### Images
- **Formats** - JPG, JPEG, PNG, GIF, BMP, TIFF, WEBP, SVG → PDF
- **Multiple Images** - Combine multiple images into one PDF
- **Options:**
  - Color mode (color, grayscale, black & white)
  - Fit to page or maintain aspect ratio
  - Single PDF or separate files

#### Web Content
- **HTML to PDF** - Convert HTML files (with CSS and images via ZIP)
- **URL to PDF** - Render and save web pages as PDF
- **Markdown to PDF** - Convert Markdown (.md) files to formatted PDF

#### Email
- **EML to PDF** - Convert email files (.eml format) into PDF
- Preserves email content, formatting, and metadata

#### Comic Book Archives
- **CBZ to PDF** - Convert Comic Book Zip files to PDF
- **CBR to PDF** - Convert Comic Book RAR files to PDF

---

### Convert FROM PDF

#### Office Formats
- **PDF to Word** - PDF → DOCX, ODT
  - Editable documents with preserved layout
  - Best for text-heavy PDFs
  - Works better with digital PDFs than scanned ones

- **PDF to PowerPoint** - PDF → PPTX, ODP
  - Each page becomes a slide
  - Useful for presentations

- **PDF to Text** - PDF → TXT, RTF, MD (Markdown)
  - Extract plain text
  - Remove formatting
  - Easy to edit and search

#### Images
- **PDF to Image** - PDF → PNG, JPG, GIF, TIFF, BMP, WEBP
- **Options:**
  - Image format and quality
  - DPI (resolution)
  - Color mode (color, grayscale, black & white)
  - Single image or one per page

#### Data Formats
- **PDF to CSV** - Extract tables from PDF to CSV
  - ⚠️ Works best with digital PDFs (not scanned)
  - Attempts to detect tables automatically
  - Work in progress feature due to complexity

- **PDF to HTML** - Convert PDF to web format
  - Preserves structure and formatting
  - Can be edited with HTML editors

- **PDF to XML** - Convert PDF to XML structure
  - For data processing and analysis

#### Archival Format
- **PDF to PDF/A** - Convert to long-term archival format
  - PDF/A is ISO standardized
  - Ensures long-term readability
  - Required for compliance in many industries

#### Comic Book Archives
- **PDF to CBZ** - Convert PDF to Comic Book Zip
- **PDF to CBR** - Convert PDF to Comic Book RAR

---

## Conversion Options

### Image Quality Settings

**When converting to images:**
- **DPI (Resolution)**
  - 72 DPI - Screen viewing, small file size
  - 150 DPI - Standard quality, balanced
  - 300 DPI - High quality, printing, large file size
  - Custom - Specify exact DPI

- **Color Mode**
  - **Color** - Full color, best quality
  - **Grayscale** - Black and white shades, smaller file
  - **Black & White** - 1-bit, smallest file, sharp text

### Layout Options

**When converting images to PDF:**
- **Fit to Page** - Resize image to fit PDF page
- **Maintain Aspect Ratio** - Keep original proportions
- **Fill Page** - Stretch to fill entire page

**Output Mode:**
- **Single PDF** - All files into one PDF
- **Separate PDFs** - One PDF per input file

---

## Batch Conversion

Convert multiple files at once:

1. Select conversion type (e.g., Images to PDF)
2. Upload multiple files
3. Choose "Single PDF" or "Separate PDFs"
4. Convert all at once
5. Download as single file or ZIP

**Supported for:**
- Multiple images to PDF
- Multiple Office documents to PDF
- PDF to multiple images (one per page)

---

## Tips & Best Practices

### For Best Results

**Office to PDF:**
- Use original source files (DOCX, not scanned)
- Check fonts are embedded
- Verify hyperlinks work
- Test on sample first for large documents

**PDF to Office:**
- Works best with digital PDFs (not scanned images)
- For scanned PDFs, use OCR first
- Complex layouts may need manual adjustment
- Check formatting after conversion

**Image Conversions:**
- Higher DPI = better quality but larger files
- Use PNG for screenshots (lossless)
- Use JPG for photos (smaller)
- Grayscale reduces file size significantly

**Web to PDF:**
- URLs must be publicly accessible
- For HTML files, include CSS/images in ZIP
- Test with simple pages first
- May timeout on very heavy pages

### Common Issues

**"Conversion failed"**
- Check file isn't corrupted
- Try smaller file first
- Ensure format is supported
- Check file isn't password-protected

**"Poor quality output"**
- Increase DPI for image exports
- Use color mode instead of black/white
- Check source file quality
- Try different output format

**"Tables not detected" (PDF to CSV)**
- Feature works best with simple tables
- Only works with digital PDFs, not scanned
- Consider extracting as text first
- Manual cleanup may be needed

---

## Technical Details

### Processing Engine

Stirling-PDF uses industry-standard tools for conversions:

- **Office Conversions** - LibreOffice (document fidelity)
- **Image Processing** - ImageMagick, OpenCV
- **PDF Operations** - Apache PDFBox
- **OCR** - Tesseract (when needed)

### Supported Formats

**Input Formats (Convert TO PDF):**
```
Documents: DOCX, DOC, ODT, XLSX, XLS, ODS, PPTX, PPT, ODP, TXT, RTF
Images:    JPG, JPEG, PNG, GIF, BMP, TIFF, WEBP, SVG
Web:       HTML, ZIP (HTML bundle), Markdown (MD), URL
Email:     EML
Archives:  CBZ, CBR
```

**Output Formats (Convert FROM PDF):**
```
Documents: DOCX, ODT, PPTX, ODP, TXT, RTF, MD
Images:    PNG, JPG, GIF, TIFF, BMP, WEBP
Data:      CSV, HTML, XML
Archive:   PDF/A, CBZ, CBR
```

### File Size Limits

- **Web Version** - Depends on browser storage (typically ~1-10GB)
- **Desktop App** - No practical limit (disk space)
- **Server Deployment** - Configurable in settings

**For large files:**
- Use Desktop app for unlimited storage
- Split large PDFs before converting
- Process in batches
- Consider compression after conversion

---

## Related Tools

- **[Compress](../Compress.md)** - Reduce file size after conversion
- **[OCR](../OCR.md)** - Make scanned PDFs searchable before converting to text
- **[Merge](../Page-Operations/Page-Operations.md)** - Combine multiple converted PDFs
- **[Multi-Tool](../Multi-Tool.md)** - Chain conversions with other operations

---

## API Usage

Convert files programmatically via API:

**Example: Image to PDF**
```bash
curl -X POST http://stirling-pdf:8080/api/v1/convert/img/pdf \
  -F "fileInput=@image.jpg" \
  -F "colorType=color" \
  -F "fitOption=maintainAspectRatio" \
  -o output.pdf
```

**Example: PDF to Word**
```bash
curl -X POST http://stirling-pdf:8080/api/v1/convert/pdf/word \
  -F "fileInput=@document.pdf" \
  -o output.docx
```

See [API Documentation](../../API.md) for complete endpoint reference.

---

## Summary

Stirling-PDF's Convert tool provides:

✅ **50+ file format conversions**
✅ **Batch processing** - Convert multiple files at once
✅ **Quality control** - Adjust DPI, color mode, layout
✅ **Professional results** - Industry-standard conversion engines
✅ **No size limits** - Desktop app handles any file size
✅ **API access** - Automate conversions

Perfect for document management, archiving, sharing, and workflow automation!
