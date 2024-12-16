---
sidebar_position: 2
id: Windows Installation
title: Windows Guide
---
# Windows Installation Guide for Stirling PDF

Stirling PDF provides Windows compatibility through a downloadable .exe file, which can be obtained from [here](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest).
This is a streamlined version of the application, offering the same capabilities as the Stirling-PDF-Ultra-lite found in Docker, but in a compact 80MB executable!

## Prerequisites

### Required Dependencies
- JAVA 17 or 21 (21 preferred) - If not installed, the application will provide a download link
  - Download from [Oracle's official site](https://www.oracle.com/java/technologies/downloads/) or [Eclipse Temurin](https://adoptium.net/temurin/releases/)

### Optional Dependencies
These dependencies enable additional features in Stirling PDF. Install only the ones you need:

#### QPDF
- Download from [QPDF's official site](https://qpdf.sourceforge.io/)
- Enables PDF compression and other operations

#### LibreOffice
- Download and install from [LibreOffice's official site](https://www.libreoffice.org/download/download-libreoffice/)
- Enables PDF to DOCX conversion and other document format conversions

#### Tesseract OCR
1. Download the installer from [UB Mannheim's GitHub](https://github.com/UB-Mannheim/tesseract/wiki)
2. During installation, check additional languages you need
3. Add to settings.yml in your Stirling PDF installation directory:
   ```yaml
   system:
     tessdataDir: C:\\Program Files\\Tesseract-OCR\\tessdata
   ```
- Enables OCR functionality for PDFs

#### Weasyprint
1. Download from [Weasyprint's releases](https://github.com/Kozea/WeasyPrint/releases)
2. Create a directory (e.g., `c:\weasyprint\`) and place weasyprint.exe there
- Enables URL to PDF conversion
- Note: Some antivirus software may flag weasyprint.exe - you may need to whitelist it

#### PDFtoHTML
1. Download from [SourceForge](https://sourceforge.net/projects/pdftohtml/)
2. Create a directory (e.g., `c:\pdftohtml\`) and place pdftohtml.exe there
- Enables PDF to HTML conversion

## Adding Directories to System PATH

After installing dependencies, you'll need to add their directories to your system's PATH. Here's how:

1. Open Windows Search (Windows key + S)
2. Type "Environment Variables" and click "Edit the system environment variables"
3. Click "Environment Variables" button at the bottom
4. Under "System variables", find and select "Path"
5. Click "Edit"
6. Click "New" to add each required path:
   - For LibreOffice: `C:\Program Files\LibreOffice\program`
   - For Tesseract: `C:\Program Files\Tesseract-OCR`
   - For Weasyprint: `C:\weasyprint` (or your chosen directory)
   - For PDFtoHTML: `C:\pdftohtml` (or your chosen directory)
   - For QPDF: The installation directory (usually `C:\Program Files\qpdf\bin`)
7. Click "OK" on all windows to save changes

## Installation Steps

1. Download the latest Stirling PDF .exe from the [releases page](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest)
2. Install any desired optional dependencies following the instructions above
3. Launch the Stirling PDF executable
4. Access the web interface through your browser (the application will provide the URL)

## Notes
- The application hosts a web server that is accessible to anyone on your network
- If you install multiple Python-based dependencies, ensure they're using the same Python installation to avoid conflicts
- Make sure to restart Stirling PDF after installing new dependencies or modifying PATH variables
- Some features will be unavailable until their required dependencies are installed
- The web interface will indicate which features require additional dependencies

## Troubleshooting

1. Verifying PATH Settings:
   - Open Command Prompt (cmd)
   - Type `echo %PATH%` to see all directories in your PATH
   - For each dependency, try running its command (e.g., `tesseract --version`) to verify it's accessible

2. Common Issues:
   - If changes to PATH don't take effect, try:
     - Logging out and back in
     - Restarting your computer
     - Opening a new Command Prompt window
   - If a dependency isn't found, double-check the exact path in File Explorer
   - For Tesseract issues, verify the tessdata directory contains language files
   - For LibreOffice conversions, ensure no LibreOffice windows are open when converting

Need help? Visit the [Stirling PDF GitHub Issues](https://github.com/Stirling-Tools/Stirling-PDF/issues) page.
