---
sidebar_position: 2
id: Mac Installation
title: Mac Installation Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# MacOS Installation Guide for Stirling PDF

Stirling PDF for Mac is available as a **native desktop application** or can run as a **server** using the JAR file.

## Desktop Application (Recommended)

Native Mac desktop app with all PDF tools available.

### What You Get

- ✅ **Native macOS application** - Optimized for both Apple Silicon and Intel Macs
- ✅ **No login required** - Install and start using PDF tools right away
- ✅ **Processes files locally** - All your PDF processing stays on your Mac
- ✅ **Optional server connection** - Connect to Stirling Cloud or your own self-hosted server for advanced tools like OCR and document conversions
- ✅ **All local tools included** - Merge, split, rotate, sign, and more work without any server
- ✅ **Better performance** - Native speed on M1/M2/M3 chips
- ✅ **No external browser needed** - Uses the built-in window
- ✅ **Menu bar integration** - Feels like a native Mac app

### Installation

Pick whichever method you prefer. Both install the same desktop app.

<Tabs groupId="mac-install" queryString>
  <TabItem value="dmg" label="DMG Installer" default>
    **1. Download the installer:** [Download Stirling PDF for Mac](https://files.stirlingpdf.com/mac-installer.dmg)

    The DMG is a universal binary that runs natively on both Apple Silicon (M1/M2/M3/etc.) and Intel Macs - no need to pick a build for your chip.

    **2. Install:** open the `.dmg` and drag Stirling PDF to your Applications folder.

    ![mac-installer.png](/img/mac-installer.png)

    **3. First-time launch (Gatekeeper):** macOS blocks the app on first launch because it's not from the App Store.

    ![mac-app-blocked.png](/img/mac-app-blocked.png)

    Open **System Settings → Privacy & Security**, scroll to the **Security** section, click **"Open Anyway"** next to the Stirling PDF message, then launch again.

    ![mac-security-allow.png](/img/mac-security-allow.png)
  </TabItem>
  <TabItem value="brew" label="Homebrew">
    ```bash
    brew tap Stirling-Tools/stirling-pdf
    brew install --cask stirling-pdf
    ```

    Updates come through `brew upgrade`:

    ```bash
    brew upgrade --cask stirling-pdf
    ```
  </TabItem>
</Tabs>

### Using the Desktop App

1. Launch Stirling PDF
2. Start using local PDF tools right away - no login needed
3. Upload or drag-and-drop files into the window
4. Optionally connect to Stirling Cloud or a self-hosted server for advanced tools like OCR and document conversions

**Making Stirling PDF your default PDF viewer:**
1. Right-click (or Control+click) any PDF file
2. Select **"Get Info"**
3. Under **"Open with"**, choose **Stirling PDF**
4. Click **"Change All"** to apply to all PDFs
5. Confirm when prompted

**Benefits of desktop app:**
- Files stay on your Mac (not in browser storage)
- Work without internet connection
- Native performance (especially on Apple Silicon)
- Unlimited file storage
- Menu bar integration
- macOS gestures and features work

**Multiple windows:**
- Press **Cmd+N** to open an empty new window
- Use **Open in new window** from the My Files page to open files in a separate window

### Connection modes

You can pick one of three connection modes. See [Modes](../Modes-and-Licensing.md) for how each mode is licensed (self-hosted modes never use credits).

- **Bundled local backend (default):** the app runs its own Stirling PDF backend on your Mac, no setup or login, fully offline.
- **Stirling Cloud:** sign in for advanced server-side tools. Files are processed transiently and are not stored after the request completes. Opt-in cloud storage is a separate Stirling Cloud feature you would enable explicitly.
- **Self-hosted Server:** enter the URL of your own Stirling PDF instance (e.g., `http://192.168.1.53:8080`) for full control over your data.

### Managed deployment (Jamf / MDM)

To pre-configure and lock the app across managed Macs - server URL, connection lock, and update behaviour - see [Managed Desktop Deployment](./Managed%20Deployment.md).

## Server Version (For Hosting and Sharing)

Want to host Stirling PDF on a Mac server for multiple users? Use the JAR file version.

### Prerequisites

Install Java 25 (required for server version):

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java 25
brew install openjdk@25

# Add to your PATH (add to ~/.zshrc to make permanent)
# Using `brew --prefix` keeps this correct on both Apple Silicon (/opt/homebrew) and Intel (/usr/local)
export PATH="$(brew --prefix openjdk@25)/bin:$PATH"
```

### JAR Downloads

Stirling PDF comes in three different JAR files:

**Stirling-PDF-with-login.jar** (Recommended - Full Features):
- Download: [Stirling-PDF-with-login.jar](https://files.stirlingpdf.com/Stirling-PDF-with-login.jar)
- Bundles frontend UI + backend server in one file
- **Includes authentication and additional features** - requires user login (default credentials: `admin` / `stirling`)
- **Recommended for all users** - personal, shared, or enterprise deployments

**Stirling-PDF.jar** (Plain JAR - Basic Features):
- Download: [Stirling-PDF.jar](https://files.stirlingpdf.com/Stirling-PDF.jar)
- Bundles frontend UI + backend server in one file
- **Basic version** - no authentication, core features only
- Only use if you require no login at all and don't mind missing certain features

**Stirling-PDF-server.jar** (Backend Only - **Advanced**):
- Download: [Stirling-PDF-server.jar](https://files.stirlingpdf.com/Stirling-PDF-server.jar)
- Backend server only (no bundled UI)
- **No authentication** - API access only
- For desktop app backend, custom frontend, or API integrations

### Running the Server

1. **Download your preferred JAR file** (see above)

2. **Open Terminal** and navigate to the download folder:
   ```bash
   cd ~/Downloads  # Or wherever you saved the JAR
   ```

3. **Run Stirling PDF**:
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
 brew install openjdk@25          # Required
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
 - Java not found? Add to `~/.zshrc` (works on both Apple Silicon and Intel):
   ```bash
   export PATH="$(brew --prefix openjdk@25)/bin:$PATH"
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

