---
sidebar_position: 0
description: What makes Stirling-PDF powerful - technologies and capabilities!
---
# What Makes Stirling-PDF Powerful

Stirling-PDF combines server-side processing power with modern browser capabilities to give you the best PDF experience possible.

## Key Features

### Work Offline with Browser Storage
- **Your files stay in your browser** - No need to re-upload files when switching between tools
- **Faster workflows** - Skip the upload wait time when working with the same files
- **Preview thumbnails** - See what your files look like before processing
- **Privacy first** - Files are stored locally in your browser, not on our servers between operations

### Undo and Redo Your Work
- **Made a mistake?** Go back to previous versions of your file
- **Try different options** - Experiment with settings and revert if needed
- **Work confidently** - Know you can always undo changes

### File History Tracking
- **See what you've done** - Track all the operations you've performed
- **Jump back in time** - Restore earlier versions of your files
- **Clear when needed** - Remove local files and history whenever you want

### Desktop Applications
- **Windows, Mac, and Linux** native applications available
- **Open PDFs directly** - Double-click PDF files to open them in Stirling-PDF
- **No browser needed** - Standalone application with all features
- **Automatic updates** - Stay up to date with the latest features

### Modern, Responsive Interface
- **Fast and smooth** - Modern web technology for a better experience
- **Works on any device** - Responsive design for desktop, tablet, and mobile
- **Real-time previews** - See changes as you make them
- **Dark mode** - Easy on your eyes

### Flexible Deployment Options
- **All-in-one container** - Simple Docker deployment with everything included
- **Split frontend and backend** - Scale and deploy components separately
- **Serve frontend from CDN** - Ultra-fast page loads worldwide
- **Run anywhere** - Cloud, self-hosted, or on your desktop

## The Technology Behind It

### Processing Power (Server-Side)
Stirling-PDF uses powerful open-source tools to handle complex PDF operations:

- **[PDFBox](https://pdfbox.apache.org/)** - Core PDF manipulation for most operations
- **[LibreOffice](https://www.libreoffice.org/)** - Advanced file conversions (Office documents, images, etc.)
- **[qpdf](https://qpdf.sourceforge.io/)** - Specialized PDF operations
- **[Tesseract OCR](https://github.com/tesseract-ocr/tesseract)** - Extract text from images in PDFs
- **[OpenCV](https://opencv.org/)** - Image processing and computer vision operations

### Modern Web Experience (Browser-Side)
A fast, modern interface built with powerful frontend technologies:

**Core Framework:**
- **[React](https://react.dev/)** - Modern UI framework for responsive interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool

**PDF Rendering & Interaction:**
- **[EmbedPDF](https://www.embedpdf.com/)** - Open-source PDF viewer with annotation support
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - Mozilla's PDF rendering engine
- **[pdf-lib](https://pdf-lib.js.org/)** - Client-side PDF manipulation

**UI & Components:**
- **[Mantine](https://mantine.dev/)** - Modern React component library
- **[Material UI](https://mui.com/)** - Additional UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Iconify](https://iconify.design/)** - Unified icon framework

**Enhanced Features:**
- **[i18next](https://www.i18next.com/)** - Internationalization (30+ languages)
- **[signature_pad](https://github.com/szimek/signature_pad)** - Canvas-based signatures
- **[JSZip](https://stuk.github.io/jszip/)** - Client-side ZIP handling
- **[Axios](https://axios-http.com/)** - HTTP client for API communication

### Desktop Applications
Native applications built with modern desktop technology:

- **[Tauri](https://tauri.app/)** - Rust-based native app framework
  - **Automatic PDF file association** - Open PDFs directly in Stirling-PDF
  - **Bundled processing tools** - Everything you need included
  - **System integration** - Feels like a native application
  - **One-click installers** - Easy installation on all platforms
  - **Small footprint** - Efficient resource usage

## Open Source and Transparent

All the technologies we use are open source and well-documented:

- View all Java application licenses on our [licenses page](https://stirlingpdf.io/licenses)
- Review our source code on [GitHub](https://github.com/Stirling-Tools/Stirling-PDF)
- No vendor lock-in - Deploy and customize as needed
- Community-driven development

## Privacy and Security

Designed with privacy in mind:

- **Browser storage stays local** - Files cached in your browser never leave your device
- **Open source** - Audit the code yourself
- **No tracking required** - Disable analytics completely if desired
- **Your data, your control** - Self-host on your own infrastructure
