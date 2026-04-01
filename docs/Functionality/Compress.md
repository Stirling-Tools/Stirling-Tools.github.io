---
sidebar_position: 4
id: Compress
title: Compress PDF
description: Reduce PDF file size while maintaining quality
---

# Compress PDF

**Tool ID:** `compress-pdf`

Reduce PDF file size by compressing images, optimizing structure, and removing unnecessary data.

**Important:** Compression is permanent. Always keep a backup of the original if you might need maximum quality later.

---

## How to Use

1. **Upload Your PDF** - Select one or more PDFs
2. **Choose Compression Level** - Select quality vs. size balance
3. **Configure Options** - Enable grayscale, line art, etc. (optional)
4. **Compress** - Process the files
5. **Download** - Get your compressed PDFs

---

## Options

| Option | Description |
|--------|-------------|
| **Optimize Level** (1-9) | Controls compression aggressiveness. Higher = smaller file, lower quality. Levels 1-3 are light, 4-5 are moderate, 6+ trigger additional compression passes |
| **Expected Output Size** | Set a target file size (e.g. `25MB`) and the tool will automatically adjust the optimize level to hit it |
| **Grayscale** | Convert all images to grayscale. Can significantly reduce size for color documents where color isn't needed |
| **Linearize** | Optimize PDF for fast web viewing  - reorders the file so the first page loads before the entire file is downloaded |
| **Normalize** | Normalize internal PDF structure for better compatibility |
| **Line Art** | Convert images to high-contrast line art. Useful for documents with diagrams, sketches, or black-and-white illustrations |
| **Line Art Threshold** (0-100) | Controls sensitivity of line art conversion. Default: 55. Only used when Line Art is enabled |
| **Line Art Edge Level** (1-3) | Edge detection strength for line art. 1 = light, 3 = strong. Only used when Line Art is enabled |

---

## What Happens at Each Level

- **Levels 1-3**  - Basic optimization, preserves quality
- **Levels 4-5**  - Image recompression enabled, moderate quality reduction
- **Levels 6+**  - Aggressive compression with additional processing passes
- **Levels 8+**  - Uses Zopfli compression on supported systems for maximum reduction

---

## API Usage

```bash
curl -X POST http://stirling-pdf:8080/api/v1/misc/compress-pdf \
  -F "fileInput=@document.pdf" \
  -F "optimizeLevel=5" \
  -F "grayscale=false" \
  -F "linearize=false" \
  -F "lineArt=false" \
  -o compressed.pdf
```

With target size:
```bash
curl -X POST http://stirling-pdf:8080/api/v1/misc/compress-pdf \
  -F "fileInput=@document.pdf" \
  -F "expectedOutputSize=10MB" \
  -o compressed.pdf
```

See [API Documentation](../API.md) for complete endpoint reference.

---

## Related Tools

- **[OCR](./OCR.md)** - Make searchable before compressing
- **[Convert](./Convert/Convert.md)** - Convert formats before compressing
- **[Merge](./Page-Operations/Page-Operations.md)** - Combine then compress
