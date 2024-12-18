---
sidebar_position: 2
id: Mac Installation
title: Mac installation Guide
---
 # MacOS Installation Guide for Stirling PDF

Stirling PDF can be run on macOS through the provided JAR file, which can be downloaded here [Stirling-PDF-server.jar](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/Stirling-PDF.jar).
We are working on a dedicated mac installer and expect its release in coming weeks.
There are additional Prerequisites:
 - JAVA 17 or 21 (21 preferred)
   - Install via Homebrew: `brew install openjdk@21`

 ### Optional Dependencies
 Install these via Homebrew to enable additional features like advanced document conversion or PDF compression:

 ```bash
 # Install Homebrew if needed
 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

 # Install dependencies as needed
 brew install openjdk@21          # Required
 brew install qpdf               # PDF compression
 brew install --cask libreoffice # Document conversion
 brew install tesseract          # OCR functionality
 brew install tesseract-lang     # Additional OCR languages
 brew install poppler            # PDF to HTML conversion
 pip3 install weasyprint        # URL to PDF conversion
 ```

 For Tesseract OCR, add to config/settings.yml (generated once you first run the jar):
 ```yaml
 system:
   tessdataDir: /usr/local/share/tessdata
 ```

## Running Stirling PDF
1. Open Terminal
2. Navigate to the folder containing the JAR:
   ```bash
   cd /path/to/folder/containing/jar
   ```
3. Run the JAR file:
   ```bash
   java -jar Stirling-PDF.jar
   ```

For convenience, you can create a simple script:
1. Create a file named run-stirling.sh:
   ```bash    
   #!/bin/bash    
   cd /path/to/folder/containing/jar
   java -jar Stirling-PDF.jar
   ```
2. Make it executable:
   ```bash
   chmod +x run-stirling.sh
   ```
3. Run it with:
   ```bash
   ./run-stirling.sh
   ```

 ## Quick Troubleshooting
 - Java not found? Add to ~/.zshrc:
   ```bash
   export PATH="/usr/local/opt/openjdk@21/bin:$PATH"
   ```
 - Verify installations with: `[command] --version` (e.g., `java --version`)
 - LibreOffice issues? Ensure no LibreOffice processes are running
 - Need help? Visit [GitHub Issues](https://github.com/Stirling-Tools/Stirling-PDF/issues)