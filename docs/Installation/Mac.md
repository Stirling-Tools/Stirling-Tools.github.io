---
sidebar_position: 2
id: Mac Installation
title: Mac Installation Guide
---
# MacOS Installation Guide for Stirling PDF

Stirling PDF for Mac is available as a **native desktop application** or can run as a **server** using the JAR file.

## Desktop Application (Recommended)

**V2.0 brings a native Mac desktop experience** with all PDF tools available offline!

### What You Get

- ✅ **Native macOS application** - Optimized for both Apple Silicon and Intel Macs
- ✅ **Open PDFs directly** - Double-click any PDF to open in Stirling-PDF
- ✅ **Works completely offline** - No internet required after installation
- ✅ **All features included** - Every PDF tool available
- ✅ **Better performance** - Native speed on M1/M2/M3 chips
- ✅ **No browser needed** - Standalone application
- ✅ **Menu bar integration** - Feels like a native Mac app

### Installation Steps

**1. Download the right version for your Mac:**

| Chip Type | Download Link |
|-----------|--------------|
| **Apple Silicon** (M1/M2/M3) | [Download for Apple Silicon](https://files.stirlingpdf.com/mac-installer.dmg) |
| **Intel** processors | [Download for Intel](https://files.stirlingpdf.com/mac-x86_64-installer.dmg) |

**Not sure which chip you have?**
- Click the Apple menu → "About This Mac"
- Look at "Chip" or "Processor"
- If it says "M1", "M2", or "M3" → Use Apple Silicon version
- If it says "Intel" → Use Intel version

**2. Install the application:**

1. Open the downloaded `.dmg` file
2. Drag Stirling-PDF to your Applications folder

![mac-installer.png](/img/mac-installer.png)

**3. First-time launch (Security):**

macOS will block the app on first launch because it's not from the App Store:

![mac-app-blocked.png](/img/mac-app-blocked.png)

**To allow Stirling-PDF:**
1. Open **System Settings** → **Privacy & Security**
2. Scroll down to the **Security** section
3. Click **"Open Anyway"** next to the Stirling-PDF message
4. Enter your password if prompted
5. Go back to Applications and launch Stirling-PDF again

![mac-security-allow.png](/img/mac-security-allow.png)

The app will now open normally every time!

### Using the Desktop App

**Opening PDFs:**
- **Double-click any PDF file** - Opens in Stirling-PDF
- **Right-click → Open With → Stirling-PDF**
- **Drag and drop** files into the application
- **File → Open** from the menu bar

**Making Stirling-PDF your default PDF viewer:**
1. Right-click (or Control+click) any PDF file
2. Select **"Get Info"**
3. Under **"Open with"**, choose **Stirling-PDF**
4. Click **"Change All"** to apply to all PDFs
5. Confirm when prompted

**Benefits of desktop app:**
- Files stay on your Mac (not in browser storage)
- Work without internet connection
- Native performance (especially on Apple Silicon)
- Unlimited file storage
- Menu bar integration
- macOS gestures and features work

## Server Version (For Hosting and Sharing)

Want to host Stirling-PDF on a Mac server for multiple users? Use the JAR file version.

### Prerequisites

Install Java 21 (required for server version):

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java 21
brew install openjdk@21

# Add to your PATH (add to ~/.zshrc to make permanent)
export PATH="/usr/local/opt/openjdk@21/bin:$PATH"
```

### Running the Server

1. **Download the JAR file**: [Stirling-PDF.jar](https://files.stirlingpdf.com/Stirling-PDF.jar)

2. **Open Terminal** and navigate to the download folder:
   ```bash
   cd ~/Downloads  # Or wherever you saved the JAR
   ```

3. **Run Stirling-PDF**:
   ```bash
   java -jar Stirling-PDF.jar
   ```

4. **Access via browser** at `http://localhost:8080`

5. **Share with others** on your network at `http://your-mac-ip:8080`

### Creating a Convenience Script

For easier launching, create a startup script:

1. **Create the script**:
   ```bash
   nano ~/run-stirling.sh
   ```

2. **Add these contents**:
   ```bash
   #!/bin/bash
   cd ~/Downloads  # Change to where your JAR is located
   java -jar Stirling-PDF.jar
   ```

3. **Save and exit** (Ctrl+X, then Y, then Enter)

4. **Make it executable**:
   ```bash
   chmod +x ~/run-stirling.sh
   ```

5. **Run anytime with**:
   ```bash
   ~/run-stirling.sh
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
 pip3 install unoserver           # File to PDF conversion
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

### Starting unoserver alongside Stirling PDF

To ensure that unoserver is running alongside Stirling PDF, you need to start it with the following command:

```bash
unoserver --port 2003 --interface 0.0.0.0
```

You can add this command to your startup script or systemd service file to ensure it starts automatically with Stirling PDF.

