---
sidebar_position: 0
description: List of all technologies Stirling-PDF uses!
---
# The Technologies Behind Stirling PDF
Stirling PDF harnesses several technologies throughout its implementation.

# Backend (Java)
- [Spring Boot](https://spring.io/projects/spring-boot) for the REST API framework
- [PDFBox](https://pdfbox.apache.org/) for majority of PDF manipulation
- [qpdf](https://qpdf.sourceforge.io/) for some PDF operations
- [LibreOffice](https://www.libreoffice.org/discover/libreoffice/) for advanced file conversions

We also show all licenses used within our Java application [here](https://stirlingpdf.io/licenses).

# Frontend (React SPA)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) for the web application
- [Vite](https://vitejs.dev/) for build tooling and development server
- [Mantine UI](https://mantine.dev/) component library for UI components
- [TailwindCSS](https://tailwindcss.com/) for styling
- [PDF.js](https://github.com/mozilla/pdf.js) for client-side PDF rendering
- [PDF-LIB.js](https://github.com/Hopding/pdf-lib) for client-side PDF manipulation
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for client-side file storage and caching
- [i18next](https://www.i18next.com/) for internationalization

# Desktop Application
- [Tauri](https://tauri.app/) for native desktop application framework (Windows, Mac, Linux)

# Infrastructure
- Docker for containerization
- Gradle for build management

For a comprehensive list of all technologies within the java application and their licenses, please visit our [licenses page](https://stirlingpdf.io/licenses).