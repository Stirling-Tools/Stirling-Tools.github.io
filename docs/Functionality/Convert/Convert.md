---
sidebar_position: 2
description: Convert files to and from PDF format
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Convert

Convert between PDF and 50+ file formats including documents, images, web pages, and more.

---

## How to Use

1. **Select conversion type** - Choose what you're converting from and to
2. **Upload files** - Add one or multiple files
3. **Configure options** - Adjust quality, DPI, layout (optional)
4. **Convert** - Process and download

---

## Supported Conversions

### Convert TO PDF

| Category | Formats |
|----------|---------|
| **Office** | DOCX, DOC, ODT, XLSX, XLS, ODS, PPTX, PPT, ODP, TXT, RTF |
| **Images** | JPG, JPEG, PNG, GIF, BMP, TIFF, WEBP, SVG |
| **Web** | HTML (with CSS/images via ZIP), URL, Markdown |
| **Email** | EML, MSG (Outlook) |
| **eBook** | EPUB, MOBI, AZW3, FB2 |
| **Comics** | CBZ, CBR |

eBook and Outlook (MSG) inputs are converted to PDF on the self-hosted server (eBook conversion uses the bundled Calibre runtime; enable the Calibre group if your image excludes it). All conversions run locally with no credits or per-operation charges - see [Modes and Licensing](../../Modes-and-Licensing.md).

### Convert FROM PDF

| Category | Formats |
|----------|---------|
| **Office** | DOCX, ODT, PPTX, ODP, XLSX, TXT, RTF, Markdown |
| **Images** | PNG, JPG, GIF, TIFF, BMP, WEBP |
| **Data** | CSV, HTML, XML |
| **Archival / Print** | PDF/A, PDF/X |
| **eBook** | EPUB, AZW3 |
| **Comics** | CBZ, CBR |

PDF to Excel (`/api/v1/convert/pdf/xlsx`) extracts tabular data and writes one worksheet per detected table. PDF to eBook (EPUB/AZW3) uses the bundled Calibre runtime. PDF/X conversion (print-optimized) requires Ghostscript and is selected through the same endpoint as PDF/A.

---

## Conversion Options

### Image Settings (when converting to/from images)
- **DPI:** 72 (screen), 150 (standard), 300 (print)
- **Color Mode:** Color, Grayscale, Black & White
- **Layout:** Fit to page, maintain aspect ratio, fill page
- **Output:** Single PDF or separate files

### PDF to Word / Office
- Works best with digital PDFs (not scanned images)
- For scanned PDFs, run [OCR](../OCR.md) first
- Complex layouts may need manual adjustment after conversion

### PDF to CSV
- Works best with simple, well-structured tables in digital PDFs
- Not reliable for scanned documents

### PDF to Markdown
- Self-hosted, table-aware converter (`/api/v1/convert/pdf/markdown`)
- Detects headings from font size and emits Markdown heading levels
- Renders detected tables as Markdown tables, stitching tables that span a page break
- Works best with digital PDFs; run [OCR](../OCR.md) first for scanned input

### Vector / PostScript

These conversions are Ghostscript-backed and require the **Ghostscript** group to be enabled (it is in the standard Docker image). All processing runs locally with no credits - see [Modes and Licensing](../../Modes-and-Licensing.md).

- **PDF to vector** (`/api/v1/convert/pdf/vector`) - exports a PDF to a vector / page-description format: EPS, PS, PCL, or XPS (`outputFormat`, defaults to EPS).
- **PostScript to PDF** (`/api/v1/convert/vector/pdf`) - converts PostScript inputs (PS, EPS, EPSF) to PDF. Set `prepress=true` to use Ghostscript's `/prepress` profile for print-oriented output.

### PDF to Video Slideshow

A PDF to Video Slideshow conversion (`/api/v1/convert/pdf/video`) renders each page to a frame and stitches them into an MP4 or WEBM slideshow using `ffmpeg`. This is a heavyweight feature and `ffmpeg` is absent from the slim images.

:::note Currently disabled in the shipped build
The video endpoint is commented out in the current release (the bundled `ffmpeg` was disabled over CVE concerns), so it is not exposed as a live endpoint. The rendering code remains in the codebase for when it is re-enabled.
:::

---

## API Usage

<Tabs>
  <TabItem value="img-to-pdf" label="Image to PDF">
    ```bash
    curl -X POST http://stirling-pdf:8080/api/v1/convert/img/pdf \
      -F "fileInput=@image.jpg" \
      -F "colorType=color" \
      -F "fitOption=maintainAspectRatio" \
      -o output.pdf
    ```
  </TabItem>
  <TabItem value="pdf-to-word" label="PDF to Word">
    ```bash
    curl -X POST http://stirling-pdf:8080/api/v1/convert/pdf/word \
      -F "fileInput=@document.pdf" \
      -o output.docx
    ```
  </TabItem>
</Tabs>

See [API Documentation](../../API.md) for complete endpoint reference.

---

## Related Tools

- **[Compress](../Compress.md)** - Reduce file size after conversion
- **[OCR](../OCR.md)** - Make scanned PDFs searchable before converting
- **[Merge](../Page-Operations/Page-Operations.md)** - Combine multiple converted PDFs
