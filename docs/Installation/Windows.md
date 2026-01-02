---
sidebar_position: 2
id: Windows Installation
title: Windows Guide
---
# Windows Installation Guide for Stirling PDF

Stirling PDF for Windows comes in two versions: a **Desktop Application** for personal use and a **Server Version** for hosting and sharing with others.

## Desktop Application (Recommended for Personal Use)

**V2.0 brings a native Windows desktop experience** with all PDF tools available offline!

### What You Get

- ✅ **Native Windows application** - Feels like a built-in Windows program
- ✅ **Open PDFs directly** - Double-click any PDF to open in Stirling-PDF
- ✅ **Works completely offline** - No internet required after installation
- ✅ **All features included** - Every PDF tool available
- ✅ **Automatic updates** - Stay current with latest features
- ✅ **Better performance** - Optimized for Windows
- ✅ **No browser needed** - Standalone application

### Quick Installation

1. **Download**: [Stirling-PDF Desktop Installer](https://files.stirlingpdf.com/win-installer.exe)
2. **Run the installer** - Follow the prompts (installs to `C:\Program Files\Stirling-PDF`)
3. **Launch from Start Menu** - Search for "Stirling-PDF"
4. **Start working with PDFs!**

### Using the Desktop App

**Opening PDFs:**
- **Double-click any PDF file** - Opens in Stirling-PDF
- **Right-click → Open with → Stirling-PDF**
- **Drag and drop** files into the application
- **File → Open** from the menu

**Making Stirling-PDF your default PDF viewer:**
1. Right-click any PDF file
2. Select "Open with" → "Choose another app"
3. Select "Stirling-PDF"
4. Check "Always use this app to open .pdf files"
5. Click OK

**Benefits of desktop app:**
- Files stay on your computer (not in browser storage)
- Work without internet connection
- Faster performance
- Unlimited file storage (not limited by browser)
- System tray icon for quick access

## Server Version (For Hosting and Sharing)

Want to host Stirling-PDF on a Windows server for multiple users? Use the server version.

### Server Downloads

Stirling-PDF comes in two different JAR files:

**Stirling-PDF.jar** (Full Package - Recommended):
- Download: [Stirling-PDF.jar](https://files.stirlingpdf.com/Stirling-PDF.jar)
- Bundles frontend UI + backend server in one file
- Complete standalone application - download and run

**Stirling-PDF-server.jar** (Backend Only - **Advanced**):
- Download: [Stirling-PDF-server.jar](https://files.stirlingpdf.com/Stirling-PDF-server.jar)
- Backend server only (no bundled UI)
- For API access, desktop app, or when hosting the frontend separately

**Required:** [Java JDK 21](https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.exe) - Server versions need Java installed

**Note:** Login/authentication is enabled by default in both versions. You can disable it by setting `SECURITY_ENABLELOGIN=false` as an environment variable. See [FAQ Q11](../FAQ.md#q11-how-do-i-disable-loginauthentication) for details.

### Server Installation Steps

1. **Install Java JDK 21** from the link above
2. **Download** your preferred JAR file
3. **Run the JAR file:**
   ```bash
   java -jar Stirling-PDF.jar
   ```
4. **Access** via browser at `http://localhost:8080`
5. **Share the URL** with users on your network (e.g., `http://your-server-ip:8080`)

### Optional Dependencies
These dependencies enable additional features in Stirling PDF. Install only the ones you need:

#### Python and Related Tools
Python and its related tools enable various features in Stirling PDF:
- OpenCV: Enables image scan extraction features
- Unoserver: Enables file to PDF conversion features
- Python: Required base for OpenCV and other Python-based features

1. Python Installation:
   - Download Python from [Python's official site](https://www.python.org/downloads/)
   - During installation, **IMPORTANT**: Check "Add Python to PATH"
   - Verify installation by opening Command Prompt and running:
     ```bash
     python --version
     ```

2. OpenCV Installation:
   - After Python is installed, open Command Prompt as administrator
   - Install OpenCV by running:
     ```bash
     pip install opencv-python
     ```
   - Verify installation:
     ```bash
     python -c "import cv2"
     ```
   - Enables Extract Image Scans operation
     
4. Unoserver Installation:
   - First install LibreOffice (see LibreOffice section below)
   - Open Command Prompt as administrator
   - Install unoserver:
     ```bash
     pip install unoserver
     ```
   - Verify installation:
     ```bash
     unoserver --version
     ```
   - Enables File To PDF operation
   Note: Unoserver requires both Python and LibreOffice to function properly

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
   - For Python: Should be added automatically during installation if "Add Python to PATH" was checked
   - For LibreOffice: `C:\Program Files\LibreOffice\program`
   - For Tesseract: `C:\Program Files\Tesseract-OCR`
   - For Weasyprint: `C:\weasyprint` (or your chosen directory)
   - For PDFtoHTML: `C:\pdftohtml` (or your chosen directory)
   - For QPDF: The installation directory (usually `C:\Program Files\qpdf\bin`)
7. Click "OK" on all windows to save changes

## Server Installation Steps

1. Download the latest Stirling PDF-server.exe or jar from the [releases page](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest)
2. Install any desired optional dependencies following the instructions above
3. Launch the Stirling PDF executable
4. Access the web interface through your browser (the application will provide the URL) in the console logs normally http://localhost:8080

## Notes
- The application hosts a web server that is accessible to anyone on your network
- If you install multiple Python-based dependencies, ensure they're using the same Python installation to avoid conflicts
- Make sure to restart Stirling PDF after installing new dependencies or modifying PATH variables
- Some features will be unavailable until their required dependencies are installed

## Troubleshooting

1. Verifying PATH Settings:
   - Open Command Prompt (cmd)
   - Type `echo %PATH%` to see all directories in your PATH
   - For each dependency, try running its command to verify it's accessible:
     ```bash
     python --version
     unoserver --version
     python -c "import cv2"
     tesseract --version
     ```

2. Common Issues:
   - If changes to PATH don't take effect, try:
     - Logging out and back in
     - Restarting your computer
     - Opening a new Command Prompt window
   - If a dependency isn't found, double-check the exact path in File Explorer
   - For Tesseract issues, verify the tessdata directory contains language files
   - For LibreOffice conversions, ensure no LibreOffice windows are open when converting
   - For Python/OpenCV issues:
     - Make sure pip is up to date: `python -m pip install --upgrade pip`
     - Try installing with administrator privileges
     - Check if Python is properly added to PATH
   - For unoserver issues:
     - Verify both Python and LibreOffice are properly installed
     - Make sure LibreOffice is in PATH
     - Try running LibreOffice once before using unoserver

## Starting unoserver alongside Stirling PDF

To ensure that unoserver is running alongside Stirling PDF, you need to start it with the following command:

```bash
unoserver --port 2003 --interface 0.0.0.0
```

You can add this command to your startup script or systemd service file to ensure it starts automatically with Stirling PDF.


Need help? Visit the [Stirling PDF GitHub Issues](https://github.com/Stirling-Tools/Stirling-PDF/issues) page.
