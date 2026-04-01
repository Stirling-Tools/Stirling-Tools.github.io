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
| **Email** | EML |
| **Comics** | CBZ, CBR |

### Convert FROM PDF

| Category | Formats |
|----------|---------|
| **Office** | DOCX, ODT, PPTX, ODP, TXT, RTF, Markdown |
| **Images** | PNG, JPG, GIF, TIFF, BMP, WEBP |
| **Data** | CSV, HTML, XML |
| **Archival** | PDF/A |
| **Comics** | CBZ, CBR |

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
