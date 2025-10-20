---
sidebar_position: 1
id: Versions
title: Versions
---
# Versions of Stirling PDF

Stirling PDF is available in several formats, each catering to different needs and use cases:

## Docker Versions
For server deployments, we offer three pre-configured Docker images:
- ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/stirlingtools/stirling-pdf/latest-fat?label=Stirling-PDF%20Fat)
- ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/stirlingtools/stirling-pdf/latest?label=Stirling-PDF%20Full)
- ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/stirlingtools/stirling-pdf/latest-ultra-lite?label=Stirling-PDF%20Ultra-Lite)

- **Fat**: Includes all Full features plus additional fonts and pre-bundled jar security version
- **Full**: All features pre-configured and ready to use
- **Ultra-Lite**: Minimal installation with core features only


## Desktop Versions (Windows & Unix)
The desktop versions of Stirling PDF use a dynamic feature system. They start with Ultra-Lite features as the base and automatically enable additional functionality based on installed dependencies:

Base Features (Ultra-Lite):
- Core PDF operations (merge, split, rotate, etc.)
- Basic conversions
- Password protection
- All features marked with ✔️ in the Ultra-Lite column below

Additional features become available automatically when you install:
- LibreOffice: Enables document format conversions (PDF to Word, Excel, etc.)
- Tesseract: Enables OCR functionality
- QPDF: Enables compression and repair features
- Other dependencies: Enable their respective features


## Feature Comparison

Here are the different technologies each version uses:

| Technology     | Ultra-Lite | Full |
|----------------|:----------:|:----:|
| Java           |     ✔️      |  ✔️  |
| JavaScript     |     ✔️      |  ✔️  |
| Libre          |            |  ✔️  |
| Python         |            |  ✔️  |
| OpenCV         |            |  ✔️  |
| Tesseract       |            |  ✔️  |

And here you see what functions are offered as part of each.

Operation                | Ultra-Lite | Full
-------------------------|------------|-----
add-page-numbers         |     ✔️      |  ✔️
add-password             |     ✔️      |  ✔️
add-image                |     ✔️      |  ✔️
add-watermark            |     ✔️      |  ✔️
adjust-contrast          |     ✔️      |  ✔️
auto-split-pdf           |     ✔️      |  ✔️
auto-redact              |     ✔️      |  ✔️
auto-rename              |     ✔️      |  ✔️
cert-sign                |     ✔️      |  ✔️
crop                     |     ✔️      |  ✔️
change-metadata          |     ✔️      |  ✔️
change-permissions       |     ✔️      |  ✔️
compare                  |     ✔️      |  ✔️
extract-page             |     ✔️      |  ✔️
extract-images           |     ✔️      |  ✔️
flatten                  |     ✔️      |  ✔️
get-info-on-pdf          |     ✔️      |  ✔️
img-to-pdf               |     ✔️      |  ✔️
markdown-to-pdf          |     ✔️      |  ✔️
merge-pdfs               |     ✔️      |  ✔️
multi-page-layout        |     ✔️      |  ✔️
overlay-pdf              |     ✔️      |  ✔️
pdf-organizer            |     ✔️      |  ✔️
pdf-to-csv               |     ✔️      |  ✔️
pdf-to-img               |     ✔️      |  ✔️
pdf-to-single-page       |     ✔️      |  ✔️
remove-blanks            |     ✔️      |  ✔️
remove-pages             |     ✔️      |  ✔️
remove-password          |     ✔️      |  ✔️
rotate-pdf               |     ✔️      |  ✔️
sanitize-pdf             |     ✔️      |  ✔️
scale-pages              |     ✔️      |  ✔️
sign                     |     ✔️      |  ✔️
show-javascript          |     ✔️      |  ✔️
split-by-size-or-count   |     ✔️      |  ✔️
split-pdf-by-sections    |     ✔️      |  ✔️
split-pdfs               |     ✔️      |  ✔️
compress-pdf             |            |  ✔️
extract-image-scans      |            |  ✔️
ocr-pdf                  |            |  ✔️
pdf-to-pdfa              |            |  ✔️
pdf-to-text             |     ✔️      |  ✔️
pdf-to-html             |            |  ✔️
pdf-to-word             |            |  ✔️
pdf-to-presentation     |            |  ✔️
pdf-to-xml              |            |  ✔️
remove-annotations      |     ✔️      |  ✔️
remove-cert-sign        |     ✔️      |  ✔️
remove-image-pdf        |     ✔️      |  ✔️
file-to-pdf             |            |  ✔️
xlsx-to-pdf             |            |  ✔️
html-to-pdf             |            |  ✔️
url-to-pdf              |            |  ✔️
repair                  |            |  ✔️
