---
sidebar_position: 1
id: Docker Versions
title: Docker Versions
---
# Docker Versions of Stirling PDF

Stirling PDF is avaiable in three distinct docker images:
- ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/frooodle/s-pdf/latest?label=Stirling-PDF%20Full)
- ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/frooodle/s-pdf/latest-lite?label=Stirling-PDF%20Lite)
- ![Docker Image Size (tag)](https://img.shields.io/docker/image-size/frooodle/s-pdf/latest-ultra-lite?label=Stirling-PDF%20Ultra-Lite)

Each version caters to different needs based on the specific features required and the storage space available. 

For an in-depth comparison of what each version offers, please refer to the graph below.
If storage optimization is not a concern, we recommend using the latest tag for the most complete set of features.

Here are the different technologies each version uses.

|Technology      | Ultra-Lite | Lite | Full |
|----------------|:----------:|:----:|:----:|
| Java           |     ✔️      |  ✔️  |  ✔️  |
| JavaScript     |     ✔️      |  ✔️  |  ✔️  |
| Libre          |             |  ✔️  |  ✔️  |
| Python         |             |      |  ✔️  |
| OpenCV         |             |      |  ✔️  |
| OCRmyPDF       |             |      |  ✔️  |

And here you see what functions are offered as part of each.

Operation           | Ultra-Lite | Lite | Full
--------------------|------------|------|-----
add-password        |     ✔️      |  ✔️   |  ✔️
add-watermark       |     ✔️      |  ✔️   |  ✔️
cert-sign           |     ✔️      |  ✔️   |  ✔️
change-metadata     |     ✔️      |  ✔️   |  ✔️
change-permissions  |     ✔️      |  ✔️   |  ✔️
compare             |     ✔️      |  ✔️   |  ✔️
extract-images      |     ✔️      |  ✔️   |  ✔️
flatten             |     ✔️      |  ✔️   |  ✔️
img-to-pdf          |     ✔️      |  ✔️   |  ✔️
merge-pdfs          |     ✔️      |  ✔️   |  ✔️
multi-page-layout   |     ✔️      |  ✔️   |  ✔️
pdf-organizer       |     ✔️      |  ✔️   |  ✔️
pdf-to-img          |     ✔️      |  ✔️   |  ✔️
remove-pages        |     ✔️      |  ✔️   |  ✔️
remove-password     |     ✔️      |  ✔️   |  ✔️
rotate-pdf          |     ✔️      |  ✔️   |  ✔️
scale-pages         |     ✔️      |  ✔️   |  ✔️
sign                |     ✔️      |  ✔️   |  ✔️
split-pdfs          |     ✔️      |  ✔️   |  ✔️
add-image           |     ✔️      |  ✔️   |  ✔️
file-to-pdf         |             |  ✔️   |  ✔️
pdf-to-html         |             |  ✔️   |  ✔️
pdf-to-presentation |             |  ✔️   |  ✔️
pdf-to-text         |             |  ✔️   |  ✔️
pdf-to-word         |             |  ✔️   |  ✔️
pdf-to-xml          |             |  ✔️   |  ✔️
repair              |             |  ✔️   |  ✔️
xlsx-to-pdf         |             |  ✔️   |  ✔️
compress-pdf        |             |       |  ✔️
extract-image-scans |             |       |  ✔️
ocr-pdf             |             |       |  ✔️
pdf-to-pdfa         |             |       |  ✔️
remove-blanks       |             |       |  ✔️

