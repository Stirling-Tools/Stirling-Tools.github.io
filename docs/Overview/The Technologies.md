---
sidebar_position: 2
---

# The Technologies Behind Stirling PDF

Stirling PDF harnesses several technologies throughout.

# Java
As part of the JAVA framework to host the WebUI itself we use
Spring Boot, Thymeleaf and PDFBox.
Apache PDFBox is the core of the PDF functionality within Stirling-PDF.
They offer a vaierty of methods to edit PDFs which we have then build Stirling-PDF on.

# JavaScript
- PDF.js
- PDF-LIB.js


# Others
We also use other open source applications along side ours to offer additional functionality.
- LibreOffice Is used for conversions
- [OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF) is used for OCR (Optical CHaracter recognition) to change PDF images into text.
- GhostScript, Bundled with OCRmyPDF, this is used to compress PDF documents.

