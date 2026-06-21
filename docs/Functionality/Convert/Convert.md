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

eBook and Outlook (MSG) inputs are converted to PDF on the self-hosted server (eBook conversion uses the bundled Calibre runtime; enable the Calibre group if your image excludes it). All conversions run locally with no credits or per-operation charges - see [Modes](../../Modes-and-Licensing.md).

### Convert FROM PDF

| Category | Formats |
|----------|---------|
| **Office** | DOCX, ODT, PPTX, ODP, XLSX, TXT, RTF, Markdown |
| **Images** | PNG, JPG, GIF, TIFF, BMP, WEBP |
| **Data** | CSV, HTML, XML |
| **Archival / Print** | PDF/A, PDF/X |
| **eBook** | EPUB, AZW3 |
| **Comics** | CBZ, CBR |

PDF to Excel extracts tabular data and writes one worksheet per detected table. PDF to eBook (EPUB/AZW3) uses the bundled Calibre runtime. PDF/X is the print-optimized variant of PDF/A and is chosen from the same Archive / Print option (it needs Ghostscript, which is in the standard Docker image).

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
- Table-aware converter that runs locally on your server
- Turns larger text into Markdown headings based on font size
- Rebuilds detected tables as Markdown tables, joining tables that split across a page break
- Works best with digital PDFs; run [OCR](../OCR.md) first for scanned input

---

## Automation and API conversions

A few conversions have no button in the Convert tool. They run only through the [API](../../API.md) and the [Automate / pipeline](../../Configuration/Pipeline.md) workflow. Like every other conversion they run locally on your server with no credits or per-operation charges.

- **PDF to vector / page-description formats** - export a PDF as EPS, PS, PCL, or XPS for print and publishing workflows.
- **PostScript to PDF** - turn PostScript files (PS, EPS, EPSF) into PDF, with an optional print-oriented (prepress) profile.
- **PDF to Video Slideshow** - render each page to a frame and stitch them into an MP4 or WEBM slideshow.

The vector and PostScript conversions need the **Ghostscript** group, which is included in the standard Docker image.

:::note PDF to Video is currently unavailable
The PDF to Video conversion is turned off and cannot be used.
:::

See the [API reference](../../API.md) for the exact parameters of these conversions.

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
