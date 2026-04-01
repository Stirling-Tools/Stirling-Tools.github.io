---
sidebar_position: 5
id: OCR
title: OCR (Optical Character Recognition)
description: Make scanned PDFs searchable and editable with OCR
---

# OCR (Optical Character Recognition)

**Tool ID:** `ocr-pdf`

Make scanned PDFs searchable and selectable by recognizing text in images. Uses the Tesseract OCR engine.

---

## When You Need OCR

- Scanned paper documents (no text layer)
- Photos of documents or whiteboards
- Image-only PDFs where you can't select or search text

---

## How to Use

1. **Upload Your PDF** - Select a scanned or image-based PDF
2. **Select Language(s)** - Choose the language(s) in your document
3. **Configure Options** - Adjust OCR mode and preprocessing (optional)
4. **Process** - Run OCR
5. **Download** - Get your searchable PDF

---

## Options

| Option | Values | Description |
|--------|--------|-------------|
| **Languages** | Select from installed packs | Must match the languages in your document. Select multiple if needed |
| **OCR Mode** | Auto (default), Force, Strict | Auto skips pages that already have text. Force re-OCRs everything. Strict aborts if any text is found |
| **Compatibility Mode** | On/Off | Uses sandwich PDF format for better compatibility with older software (larger files) |

### Advanced Options

| Option | Description |
|--------|-------------|
| **Deskew** | Automatically straighten tilted/skewed pages |
| **Clean Input** | Preprocess by removing noise and enhancing contrast for better recognition |
| **Clean Output** | Post-process the final PDF to remove OCR artifacts |
| **Create Text File** | Generate a separate .txt file with the extracted text (output as ZIP) |

Advanced options require OCRmyPDF. With Tesseract only, they are ignored.

---

## Language Packs

Available languages depend on which Tesseract language packs are installed. The default Docker image includes English, German, French, Portuguese, and Chinese Simplified. To add more languages, see the **[OCR Configuration Guide](../Configuration/OCR.md)**.

---

## Limitations

- Handwritten text has limited accuracy
- Stylized/decorative fonts and very small text (< 8pt) are challenging
- For best results, use 300 DPI or higher scans with good contrast

---

## API Usage

```bash
curl -X POST http://stirling-pdf:8080/api/v1/misc/ocr-pdf \
  -F "fileInput=@scanned.pdf" \
  -F "languages=eng" \
  -F "languages=spa" \
  -F "ocrType=skip-text" \
  -F "ocrRenderType=hocr" \
  -F "deskew=true" \
  -F "clean=true" \
  -F "cleanFinal=true" \
  -F "sidecar=false" \
  -o searchable.pdf
```

See [API Documentation](../API.md) for complete endpoint reference.

---

## Related Tools

- **[Convert](./Convert/Convert.md)** - Convert OCR'd PDFs to Word, text, or other formats
- **[Compress](./Compress.md)** - Reduce file size after OCR
- **[Auto-Rename](./Advanced-Tools#auto-rename)** - Rename files based on OCR'd content
