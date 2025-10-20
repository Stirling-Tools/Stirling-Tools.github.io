---
sidebar_position: 0
description: List of all technologies Stirling-PDF uses!
---
# The Technologies Behind Stirling PDF
Stirling PDF harnesses several technologies throughout its implementation.

# Java
As part of the JAVA framework to host the WebUI itself we use Spring Boot and Thymeleaf.
Apache PDFBox is the core of the PDF functionality within Stirling-PDF.
They offer a variety of methods to edit PDFs which we have then built Stirling-PDF on.
We also show all licenses used within our Java application [here](https://stirlingpdf.io/licenses).

# JavaScript
- [PDF.js](https://github.com/mozilla/pdf.js)
- [PDF-LIB.js](https://github.com/Hopding/pdf-lib)

# Core Components
- [Spring Boot + Thymeleaf](https://spring.io/projects/spring-boot) for the web framework
- [PDFBox](https://pdfbox.apache.org/) for majority of PDF manipulation
- [qpdf](https://qpdf.sourceforge.io/) for some PDF operations
- [LibreOffice](https://www.libreoffice.org/discover/libreoffice/) for advanced file conversions

# Additional Technologies
- HTML, CSS, JavaScript for the frontend
- Docker for containerization
- jcefmaven (specifically for portable non-server version)

For a comprehensive list of all technologies within the java application and their licenses, please visit our [licenses page](https://stirlingpdf.io/licenses).