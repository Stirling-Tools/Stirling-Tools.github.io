---
sidebar_position: 2
---

# The Technologies Behind Stirling PDF

Stirling PDF harnesses several technologies throughout.

# Java
As part of the JAVA framework to host the WebUI itself we use
Spring Boot, Thymeleaf, PDFBox and IText7.
PDFBox and IText7 are the core of the PDF functionality within Stirling-PDF.
They offer a vaierty of methods to edit PDFs which we have then build Stirling-PDF on.

# JavaScript
- PDF.js
- PDF-LIB.js


# Others
We also use other open source applications along side ours to offer additional functionality.
- LibreOffice Is used for conversions
- [OcrMyPdf](https://github.com/ocrmypdf/OCRmyPDF) used for OCR (Optical CHaracter recognition) To change PDF images into text
- GhostScript, Bundled with OCRmyPDF, this is used to compress PDF documents.

