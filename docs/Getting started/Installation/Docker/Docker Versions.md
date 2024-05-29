---
sidebar_position: 1
id: Docker Versions
title: Docker Versions
---
# Docker Versions of Stirling PDF

Stirling PDF is avaiable in two distinct docker images:
- ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/frooodle/s-pdf/latest?label=Stirling-PDF%20Full)
- ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/frooodle/s-pdf/latest-ultra-lite?label=Stirling-PDF%20Ultra-Lite)

Each version caters to different needs based on the specific features required and the storage space available. 

For an in-depth comparison of what each version offers, please refer to the graph below.
If storage optimization is not a concern, we recommend using the latest tag for the most complete set of features.

Here are the different technologies each version uses.

| Technology     | Ultra-Lite | Full |
|----------------|:----------:|:----:|
| Java           |     ✔️      |  ✔️  |
| JavaScript     |     ✔️      |  ✔️  |
| Libre          |            |  ✔️  |
| Python         |            |  ✔️  |
| OpenCV         |            |  ✔️  |
| OCRmyPDF       |            |  ✔️  |

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
