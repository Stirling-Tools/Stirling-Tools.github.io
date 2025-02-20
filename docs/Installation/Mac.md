---
sidebar_position: 2
id: Mac Installation
title: Mac installation Guide
---
 # MacOS Installation Guide for Stirling PDF

Stirling PDF can be run on macOS via the dedicated app found 
[here](https://github.com/Stirling-Tools/Stirling-PDF/releases/download/v0.42.0/Stirling-PDF-mac-installer.dmg), 
or the JAR file which can be found [here](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/Stirling-PDF.jar).

## Prerequisites:
 - Java 17 or 21 (_21 preferred_)
   - Install via Homebrew: `brew install openjdk@21`

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
1. Create a file named run-stirling.sh and add the following contents:
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


### Optional Dependencies
Install these via [Homebrew](https://brew.sh/) to enable additional features like advanced document conversion or PDF compression:

 ```bash
 # Install Homebrew if needed
 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

 # Install dependencies as needed
 brew install openjdk@21          # Required
 brew install qpdf                # PDF compression
 brew install --cask libreoffice  # Document conversion
 brew install tesseract           # OCR functionality
 brew install tesseract-lang      # Additional OCR languages
 brew install poppler             # PDF to HTML conversion
 pip3 install weasyprint          # URL to PDF conversion
 ```

For Tesseract OCR, add to `config/settings.yml` (generated once you first run the jar):

```yaml
system:
  tessdataDir: /usr/local/share/tessdata
```

 ## Quick Troubleshooting
 - Java not found? Add to `~/.zshrc`:
   ```bash
   export PATH="/usr/local/opt/openjdk@21/bin:$PATH"
   ```
 - Verify installations with: `[command] --version` (e.g., `java --version`)
 - LibreOffice issues? Ensure no LibreOffice processes are running
 - Need help? Visit [GitHub Issues](https://github.com/Stirling-Tools/Stirling-PDF/issues)