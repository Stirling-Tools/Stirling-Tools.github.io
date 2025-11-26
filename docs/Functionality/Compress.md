---
sidebar_position: 4
id: Compress
title: Compress PDF
description: Reduce PDF file size while maintaining quality
---

# Compress PDF

**Tool ID:** `compress-pdf`

Reduce PDF file size while maintaining acceptable quality for your needs. Stirling-PDF's compression tool optimizes images, removes unnecessary data, and applies various compression techniques to significantly reduce file sizes.

---

## What is PDF Compression?

PDF compression reduces file size by:
- Compressing embedded images
- Removing duplicate resources
- Optimizing fonts and content streams
- Removing unused or redundant data
- Downsampling high-resolution images

**Important:** Compression is permanent. Always keep a backup of the original if you might need maximum quality later.

---

## How to Use Compress

1. **Upload Your PDF** - Select one or more PDFs to compress
2. **Choose Compression Level** - Select quality vs. size balance
3. **Configure Options** - Adjust advanced settings (optional)
4. **Compress** - Process the files
5. **Download** - Get your compressed PDFs

---

## Compression Levels

### Low Compression
- **Size Reduction:** ~10-30%
- **Quality:** Excellent - minimal quality loss
- **Best For:**
  - Documents with important images
  - Professional presentations
  - Photos that need high quality
  - Documents for printing

**Use When:** You need smaller files but can't compromise on quality.

### Medium Compression (Recommended)
- **Size Reduction:** ~30-60%
- **Quality:** Good - balanced quality/size tradeoff
- **Best For:**
  - General documents
  - Email attachments
  - Web publishing
  - Most use cases

**Use When:** You want good file size reduction with acceptable quality.

### High Compression
- **Size Reduction:** ~60-90%
- **Quality:** Fair - noticeable quality reduction
- **Best For:**
  - Text-heavy documents
  - Documents with simple graphics
  - Archival storage where quality is secondary
  - Very large documents that must be smaller

**Use When:** File size is critical and quality is less important.

### Custom Compression
- **Manual Control:** Set exact compression parameters
- **Advanced Users:** Fine-tune image DPI, quality, color depth
- **Testing:** Experiment to find optimal settings

---

## Compression Options

### Image Quality

**Image DPI (Resolution):**
- **300 DPI** - High quality, suitable for printing
- **150 DPI** - Standard quality, good for screen viewing
- **72 DPI** - Low quality, very small files

**Image Quality Percentage:**
- **90-100%** - Minimal compression, excellent quality
- **70-90%** - Balanced compression (recommended)
- **50-70%** - Aggressive compression, visible artifacts

### Color Depth

**Options:**
- **Full Color (24-bit)** - All colors preserved
- **Grayscale (8-bit)** - Convert to black/white shades
- **Monochrome (1-bit)** - Pure black and white only

**Tip:** Convert color documents to grayscale if color isn't needed - can reduce size by 50%+.

### Advanced Options

**Optimize Images:**
- Compress and optimize all embedded images
- Downsample high-resolution images
- Remove image metadata

**Remove Duplicate Resources:**
- Detect and remove duplicate images/fonts
- Significant savings for documents with repeated elements

**Compress Content Streams:**
- Apply advanced compression to PDF content
- Optimize internal PDF structure

**Remove Unused Objects:**
- Clean up leftover objects from editing
- Remove orphaned resources

---

## What Gets Compressed?

### Images
- JPEG images re-compressed at lower quality
- PNG images optimized and potentially converted
- High-resolution images downsampled
- Duplicate images removed

### Fonts
- Subset fonts (include only used characters)
- Remove unused font data
- Optimize font embedding

### Content
- Compress content streams with ZLIB/DEFLATE
- Optimize PDF structure
- Remove redundant data

### Metadata
- Optionally remove or reduce metadata
- Remove thumbnail previews
- Strip editing history

---

## Tips & Best Practices

### Before Compressing

1. **Keep a backup** - Compression is permanent
2. **Test on a copy** - Try different settings first
3. **Check file size** - Already compressed? May not reduce much
4. **Identify content type** - Text vs. images requires different approaches

### Choosing Compression Level

**For Text-Heavy Documents:**
- ✅ High compression works well
- ✅ Text quality remains excellent
- ✅ 70-90% size reduction common

**For Image-Heavy Documents:**
- ⚠️ Start with medium compression
- ⚠️ Test before applying to batch
- ⚠️ 30-60% size reduction typical

**For Mixed Content:**
- ✅ Medium compression (recommended)
- ✅ Test on sample pages
- ✅ 40-70% size reduction expected

### After Compressing

1. **Verify quality** - Open and review compressed PDF
2. **Check images** - Zoom in on important images
3. **Test printing** - If document will be printed
4. **Compare file sizes** - Ensure compression worked

---

## Common Issues

### "File not compressing much"

**Possible Causes:**
- PDF already compressed
- Mostly text with few images
- Images already optimized

**Solutions:**
- Try higher compression level
- Check if file is already compressed
- Some PDFs have minimal compression potential

### "Quality too poor after compression"

**Possible Causes:**
- Compression level too high
- Source images low quality
- DPI set too low

**Solutions:**
- Reduce compression level
- Increase image DPI setting
- Use "Medium" or "Low" compression
- Keep original for high-quality needs

### "Compression failed"

**Possible Causes:**
- Corrupted PDF
- Encrypted/password-protected PDF
- Unusual PDF structure

**Solutions:**
- Try repairing PDF first
- Remove password protection
- Try different compression settings

---

## Batch Compression

Compress multiple PDFs at once with consistent settings:

1. **Upload Multiple Files** - Select multiple PDFs
2. **Choose Settings** - Apply same settings to all
3. **Process Batch** - Compress all files
4. **Download ZIP** - Get all compressed PDFs in one archive

**Tip:** Test settings on one file first, then apply to batch.

---

## Compression vs. File Size

### Expected Results

| Original Size | Compression Level | Expected Result | Typical Output |
|--------------|-------------------|-----------------|----------------|
| 50 MB        | Low               | ~10-30%         | 35-45 MB       |
| 50 MB        | Medium            | ~30-60%         | 20-35 MB       |
| 50 MB        | High              | ~60-90%         | 5-20 MB        |

**Note:** Actual results vary based on content type (text vs. images) and whether file is already compressed.

### Document Type Comparison

**Scanned Documents (Image-heavy):**
- Excellent compression potential
- 60-90% reduction common with high compression
- Most benefit from compression

**Digital PDFs (Text-heavy):**
- Moderate compression potential
- 20-40% reduction typical
- Already relatively small

**Mixed Content:**
- Good compression potential
- 40-70% reduction expected
- Varies by image/text ratio

---

## Technical Details

### Compression Methods

Stirling-PDF uses multiple compression techniques:

**Image Compression:**
- JPEG compression for photos
- FLATE compression for graphics
- Downsampling for high-resolution images

**Content Stream Compression:**
- ZLIB/DEFLATE algorithms
- Object stream compression
- Cross-reference stream compression

**Structure Optimization:**
- Remove unused objects
- Deduplicate resources
- Optimize PDF structure

### Processing Engine

Uses **Apache PDFBox** and **ImageMagick** for compression:
- Industry-standard tools
- Proven reliability
- Wide format support

---

## Use with Other Tools

### Common Workflows

**Scan → OCR → Compress**
1. Scan documents to PDF
2. [OCR](./OCR.md) to make searchable
3. Compress to reduce file size

**Merge → Compress**
1. [Merge](./Page-Operations/Page-Operations.md) multiple PDFs
2. Compress combined document
3. Share smaller file

**Convert → Compress**
1. [Convert](./Convert/Convert.md) images to PDF
2. Compress to optimize size
3. Email or upload

**Edit → Compress → Archive**
1. Edit and modify PDFs
2. Compress for storage
3. Archive with smaller footprint

---

## API Usage

Compress PDFs programmatically via API:

```bash
curl -X POST http://stirling-pdf:8080/api/v1/compress/pdf \
  -F "fileInput=@document.pdf" \
  -F "optimizeLevel=2" \
  -F "imageQuality=70" \
  -F "imageDpi=150" \
  -o compressed.pdf
```

**Parameters:**
- `optimizeLevel` - 0 (low), 1 (medium), 2 (high)
- `imageQuality` - 1-100 (percentage)
- `imageDpi` - Target DPI for images
- `fastWebView` - Optimize for web streaming

See [API Documentation](../API.md) for complete endpoint reference.

---

## Related Tools

- **[OCR](./OCR.md)** - Make searchable before compressing
- **[Convert](./Convert/Convert.md)** - Convert formats before compressing
- **[Multi-Tool](./Multi-Tool.md)** - Chain compression with other operations
- **[Merge](./Page-Operations/Page-Operations.md)** - Combine then compress

---

## Summary

Stirling-PDF's Compress tool provides:

✅ **Significant size reduction** - 10-90% smaller files
✅ **Quality control** - Choose your size/quality balance
✅ **Batch processing** - Compress multiple files at once
✅ **Smart optimization** - Multiple compression techniques
✅ **Flexible options** - Fine-tune for your needs
✅ **API access** - Automate compression workflows

Perfect for reducing email attachment sizes, optimizing storage, and speeding up file transfers!
