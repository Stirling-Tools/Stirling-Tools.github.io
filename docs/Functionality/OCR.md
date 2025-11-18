---
sidebar_position: 5
id: OCR
title: OCR (Optical Character Recognition)
description: Make scanned PDFs searchable and editable with OCR
---

# OCR (Optical Character Recognition)

**Tool ID:** `ocr-pdf`

Make scanned PDFs searchable and editable by recognizing text in images. Stirling-PDF's OCR tool uses Tesseract OCR engine to extract text from image-based PDFs and convert them into searchable, selectable documents.

---

## What is OCR?

OCR (Optical Character Recognition) is technology that recognizes text within images and converts it into actual, selectable text. This makes scanned documents searchable, editable, and accessible.

### When You Need OCR

- Scanned paper documents (no text layer)
- Photos of documents or whiteboards
- Screenshots of text
- Image-only PDFs
- PDFs where you can't select or search text

---

## How to Use OCR

1. **Upload Your PDF** - Select a scanned or image-based PDF
2. **Select Language(s)** - Choose the language(s) in your document
3. **Configure Options** - Adjust OCR settings (optional)
4. **Process** - Run OCR on the document
5. **Download** - Get your searchable PDF

---

## Language Support

Stirling-PDF supports OCR in **100+ languages** including:

### Common Languages
- **English** - eng
- **Spanish** - spa
- **French** - fra
- **German** - deu
- **Italian** - ita
- **Portuguese** - por
- **Russian** - rus
- **Chinese (Simplified)** - chi_sim
- **Chinese (Traditional)** - chi_tra
- **Japanese** - jpn
- **Korean** - kor
- **Arabic** - ara
- **Hindi** - hin
- **Dutch** - nld
- **Polish** - pol
- **Turkish** - tur
- **Vietnamese** - vie
- **Thai** - tha

### Multiple Languages

If your document contains multiple languages, you can select multiple language packs for better accuracy.

**Example:** A document with English and Spanish text should have both `eng` and `spa` selected.

---

## OCR Options

### Layout Preservation

**Options:**
- **Preserve Original Layout** - Maintains original page structure, formatting, and layout
- **Simple Text Layer** - Adds searchable text without preserving complex formatting
- **Clean Text Only** - Extracts text without any layout preservation

**Recommendation:** Use "Preserve Original Layout" for documents where visual structure matters (forms, tables, multi-column layouts).

### OCR Quality Settings

**Options:**
- **Fast** - Quick processing, good for clean scans
- **Balanced** - Good quality with reasonable speed (recommended)
- **Best** - Maximum accuracy, slower processing

### Preprocessing Options

Improve OCR accuracy by preprocessing images:

- **Auto-rotate** - Automatically detect and correct page orientation
- **Deskew** - Fix slightly tilted/skewed scans
- **Despeckle** - Remove noise and artifacts from scans
- **Remove Background** - Clean up paper texture and shadows
- **Enhance Contrast** - Improve readability of faded text

**Tip:** For poor quality scans, enable multiple preprocessing options.

---

## Best Practices

### For Best OCR Results

1. **Use high-quality scans**
   - 300 DPI or higher recommended
   - Higher resolution = better accuracy
   - Minimum 150 DPI for acceptable results

2. **Clean, clear images**
   - High contrast between text and background
   - Minimal shadows or stains
   - Sharp focus, not blurry

3. **Correct orientation**
   - Text should be right-side up
   - Use auto-rotate if unsure

4. **Select correct language**
   - Choose all languages present in document
   - Wrong language = poor accuracy

5. **Preprocess poor scans**
   - Enable deskew for tilted pages
   - Use despeckle for noisy scans
   - Enhance contrast for faded text

### Document Types

**Works Best With:**
- ✅ Scanned documents (text documents, contracts, letters)
- ✅ Photos of documents taken with good lighting
- ✅ Clean screenshots of text
- ✅ Printed text (books, magazines, reports)

**Challenging Cases:**
- ⚠️ Handwritten text (limited accuracy)
- ⚠️ Stylized or decorative fonts
- ⚠️ Very small text (< 8pt font)
- ⚠️ Low resolution images
- ⚠️ Heavily compressed or artifacted images

---

## Common Issues

### "No text recognized"

**Possible Causes:**
- Wrong language selected
- Image quality too poor
- Text too small or blurry
- Extreme skew/rotation

**Solutions:**
- Verify correct language pack selected
- Use higher quality scan
- Enable preprocessing options
- Check document orientation

### "Poor accuracy / Garbled text"

**Possible Causes:**
- Low quality scan
- Wrong language selected
- Unusual font or formatting
- Background interference

**Solutions:**
- Increase scan resolution
- Select multiple language packs
- Enable despeckle and contrast enhancement
- Clean up document before scanning

### "Processing takes too long"

**Possible Causes:**
- Large document (many pages)
- High resolution images
- "Best" quality setting
- Multiple preprocessing options

**Solutions:**
- Process in smaller batches
- Use "Balanced" quality setting
- Reduce resolution if very high
- Disable unnecessary preprocessing

---

## Technical Details

### OCR Engine

Stirling-PDF uses **Tesseract OCR**, an industry-standard open-source OCR engine originally developed by HP and now maintained by Google.

**Key Features:**
- Over 100 languages supported
- Multiple output formats
- Layout analysis and preservation
- Character and word confidence scores

### Processing Steps

1. **Image Analysis** - Detect page layout and text regions
2. **Preprocessing** - Apply selected image enhancements
3. **Text Recognition** - Recognize characters using language models
4. **Layout Reconstruction** - Preserve original formatting
5. **PDF Generation** - Create searchable PDF with text layer

### Output Format

OCR produces a **PDF with embedded text layer**:
- Original image preserved (visual appearance unchanged)
- Invisible text layer added on top
- Text is searchable and selectable
- Layout matches original document

---

## Configuration

### Installing Language Packs

By default, Stirling-PDF includes common language packs. To add additional languages:

**Docker:**
```dockerfile
# Install additional language packs
RUN apt-get update && apt-get install -y \
    tesseract-ocr-ara \
    tesseract-ocr-chi-sim \
    tesseract-ocr-jpn
```

**See:** [OCR Configuration Guide](../Advanced%20Configuration/OCR.md) for detailed setup instructions.

### Environment Variables

```yaml
# OCR Settings
system:
  ocr:
    enabled: true
    languages: "eng,spa,fra,deu"  # Default languages
    pageSegmentationMode: auto
```

---

## Use with Other Tools

### Common Workflows

**OCR → Convert to Word**
1. Run OCR to make document searchable
2. Use [Convert](./Convert/Convert.md) to export to DOCX
3. Edit document in Word

**OCR → Search & Redact**
1. Run OCR to add text layer
2. Use search to find sensitive information
3. Use [Redact](./Page-Operations/redact.md) to remove it

**OCR → Extract Data**
1. Run OCR on scanned forms/invoices
2. Use [PDF to CSV](./Convert/Convert.md) to extract tables
3. Import data into spreadsheet

**Scan → OCR → Compress**
1. Scan documents to PDF
2. Run OCR to make searchable
3. Use [Compress](./Compress.md) to reduce file size

---

## API Usage

Perform OCR programmatically via API:

```bash
curl -X POST http://stirling-pdf:8080/api/v1/ocr/pdf \
  -F "fileInput=@scanned.pdf" \
  -F "languages=eng+spa" \
  -F "sidecar=false" \
  -F "deskew=true" \
  -F "clean=true" \
  -F "cleanFinal=true" \
  -F "ocrType=force" \
  -F "ocrRenderType=hocr" \
  -o searchable.pdf
```

**Parameters:**
- `languages` - Language codes (+ separated)
- `sidecar` - Generate separate text file
- `deskew` - Fix tilted pages
- `clean` - Remove noise
- `cleanFinal` - Final cleanup
- `ocrType` - `skip`, `force`, or `auto`
- `ocrRenderType` - Output format

See [API Documentation](../API.md) for complete endpoint reference.

---

## Related Tools

- **[Convert](./Convert/Convert.md)** - Convert OCR'd PDFs to Word, text, or other formats
- **[Compress](./Compress.md)** - Reduce file size after OCR
- **[Multi-Tool](./Multi-Tool.md)** - Chain OCR with other operations
- **[Auto-Rename](./Advanced-Tools.md#auto-rename)** - Rename files based on OCR'd content

---

## Summary

Stirling-PDF's OCR tool provides:

✅ **100+ language support** - Recognize text in any language
✅ **Layout preservation** - Maintain original document formatting
✅ **Batch processing** - OCR multiple files at once
✅ **Preprocessing options** - Enhance poor quality scans
✅ **Industry-standard engine** - Tesseract OCR with proven accuracy
✅ **API access** - Automate OCR workflows

Perfect for digitizing scanned documents, making PDFs searchable, and extracting text from images!
