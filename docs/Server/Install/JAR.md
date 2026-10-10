---
title: Install with Java (JAR)
sidebar_label: Java (JAR)
sidebar_position: 3
description: Run the Stirling PDF server as a Java application on Windows, macOS or Linux, with the conversion tools installed yourself.
---

# Install with Java (JAR)

Run the server as a plain Java application when Docker isn't an option. You install Java and the conversion tools yourself. If you can use Docker, the image has everything built in: see [Install with Docker](./Docker.md).

## Choose a JAR

| File | Web interface | Login and admin settings | Use it for |
|---|---|---|---|
| [Stirling-PDF-with-login.jar](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/Stirling-PDF-with-login.jar) | Yes | Yes | Most servers. Recommended. |
| [Stirling-PDF.jar](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/Stirling-PDF.jar) | Yes | No | One user who needs no login. |
| [Stirling-PDF-server.jar](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/Stirling-PDF-server.jar) | No | No | API-only use or a custom frontend. |

All three are attached to every [GitHub release](https://github.com/Stirling-Tools/Stirling-PDF/releases). The examples below use the with-login JAR.

## 1. Install Java 25

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

Install [Eclipse Temurin 25](https://adoptium.net/temurin/releases/?version=25&os=windows) and let the installer add Java to your PATH.

</TabItem>
<TabItem value="mac" label="macOS">

```bash
brew install openjdk@25
echo 'export PATH="$(brew --prefix openjdk@25)/bin:$PATH"' >> ~/.zshrc
```

Open a new terminal afterwards.

</TabItem>
<TabItem value="linux" label="Linux">

```bash
# Debian / Ubuntu
sudo apt-get install -y openjdk-25-jdk
# Fedora
sudo dnf install -y java-25-openjdk
```

If your distribution has no Java 25 package, use [Eclipse Temurin 25](https://adoptium.net/temurin/releases/?version=25).

</TabItem>
</Tabs>

Check it with `java -version`.

## 2. Download and start the server

Put the JAR in its own folder, open a terminal there and run:

```bash
java -jar Stirling-PDF-with-login.jar
```

Open `http://localhost:8080` and sign in as `admin` / `stirling`. You are asked to set a new password straight away. Other people on your network use `http://<server-ip>:8080`.

Stirling PDF keeps its settings, database and logs in folders such as `configs/` and `logs/` inside the folder you start it from, so always start it from the same place. See [Configuration](../Configuration.md#file-locations).

### Or use a package manager

These install the with-login JAR and a `stirling-pdf-server` command that starts it.

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

```powershell
scoop bucket add java
scoop install https://raw.githubusercontent.com/Stirling-Tools/homebrew-stirling-pdf/main/scoop/stirling-pdf-server.json
```

Update with `scoop update stirling-pdf-server`.

</TabItem>
<TabItem value="mac" label="macOS">

```bash
brew tap Stirling-Tools/stirling-pdf
brew install stirling-pdf-server
```

Update with `brew upgrade stirling-pdf-server`.

</TabItem>
<TabItem value="linux" label="Linux">

With [Homebrew on Linux](https://brew.sh/):

```bash
brew tap Stirling-Tools/stirling-pdf
brew install stirling-pdf-server
```

</TabItem>
</Tabs>

## 3. Install the conversion tools

At startup, Stirling PDF looks for these programs and turns off any tool whose program is missing. The startup log lists what was turned off. Install only what you need, then restart Stirling PDF.

| Program | Enables |
|---|---|
| LibreOffice | Office documents to and from PDF, PDF/A |
| Tesseract or OCRmyPDF | OCR |
| Ghostscript | PDF/X, PostScript to and from PDF, PDF to PCL and XPS, **Replace & Invert Color**, scanner effect, repair and stronger compression |
| QPDF | Repair and compression |
| ImageMagick | The **Convert images to line art** option in **Compress** |
| Python 3 with OpenCV | Detect and split scanned photos |
| WeasyPrint | HTML, Markdown, email and URL to PDF |
| unoserver | Faster Office conversions (optional) |
| pdftohtml (Poppler) | PDF to HTML and Markdown |
| Calibre | eBooks to and from PDF |
| rar | PDF to CBR |

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

1. Install the programs you need:
   - [LibreOffice](https://www.libreoffice.org/download/download-libreoffice/)
   - [Tesseract](https://github.com/UB-Mannheim/tesseract/wiki), choosing extra languages during setup
   - [QPDF](https://qpdf.sourceforge.io/)
   - [Python](https://www.python.org/downloads/), ticking **Add Python to PATH**, then `pip install opencv-python unoserver`
   - [WeasyPrint](https://github.com/Kozea/WeasyPrint/releases): put `weasyprint.exe` in a folder such as `C:\weasyprint`. Some antivirus tools flag it, so you may need to allow it.
   - [pdftohtml](https://sourceforge.net/projects/pdftohtml/): put `pdftohtml.exe` in a folder such as `C:\pdftohtml`
2. Add each program's folder to the system PATH: search Windows for **Edit the system environment variables**, select **Environment Variables**, edit **Path** under **System variables** and add, for example:
   - `C:\Program Files\LibreOffice\program`
   - `C:\Program Files\Tesseract-OCR`
   - `C:\Program Files\qpdf\bin`
   - `C:\weasyprint` and `C:\pdftohtml`
3. Point Stirling PDF at the Tesseract language files in `configs/settings.yml` (or set `SYSTEM_TESSDATADIR`):

   ```yaml
   system:
     tessdataDir: 'C:\Program Files\Tesseract-OCR\tessdata'
   ```

4. Open a new terminal and check each program, for example `tesseract --version` and `python -c "import cv2"`.

</TabItem>
<TabItem value="mac" label="macOS">

```bash
brew install qpdf tesseract tesseract-lang ghostscript imagemagick poppler
brew install --cask libreoffice
pip3 install weasyprint unoserver opencv-python-headless
```

Point Stirling PDF at the Homebrew Tesseract files in `configs/settings.yml` (or set `SYSTEM_TESSDATADIR`). Use the output of `brew --prefix` followed by `/share/tessdata`, for example on Apple Silicon:

```yaml
system:
  tessdataDir: /opt/homebrew/share/tessdata
```

</TabItem>
<TabItem value="linux" label="Linux">

Debian / Ubuntu:

```bash
sudo apt-get install -y libreoffice-writer libreoffice-calc libreoffice-impress python3-uno \
  tesseract-ocr ocrmypdf ghostscript qpdf imagemagick poppler-utils python3-pip
pip3 install unoserver weasyprint opencv-python-headless --break-system-packages
```

Fedora:

```bash
sudo dnf install -y libreoffice-writer libreoffice-calc libreoffice-impress libreoffice-pyuno \
  tesseract ocrmypdf ghostscript qpdf ImageMagick poppler-utils python3-pip
pip3 install unoserver weasyprint opencv-python-headless
```

Stirling PDF needs QPDF 12 or newer and ImageMagick 7 (the `magick` command). The packages in Ubuntu 24.04 and Debian 12 are older, so the tools that use them stay turned off. Check the startup log, and install newer builds (for example with Homebrew) if you need them.

Stirling PDF reads Tesseract languages from `/usr/share/tesseract-ocr/5/tessdata`. If your distribution puts them elsewhere, set `system.tessdataDir` in `configs/settings.yml` or the `TESSDATA_PREFIX` environment variable. To add languages, see [OCR languages](../Operations/OCR-Languages.md).

</TabItem>
</Tabs>

Office conversions work with LibreOffice alone. For faster conversions, also run unoserver next to Stirling PDF, which looks for it on `127.0.0.1:2003`:

```bash
unoserver --port 2003 --interface 127.0.0.1
```

If a program is installed but not on the PATH, set its full path under `system.customPaths.operations` (`soffice`, `unoconvert`, `weasyprint`, `ocrmypdf`, `calibre`) in `settings.yml`.

## Run as a service on Linux

1. Create a user and move the JAR into place:

   ```bash
   sudo useradd --system --home-dir /opt/Stirling-PDF --shell /usr/sbin/nologin stirlingpdf
   sudo mkdir -p /opt/Stirling-PDF
   sudo mv Stirling-PDF-with-login.jar /opt/Stirling-PDF/
   sudo touch /opt/Stirling-PDF/.env
   sudo chown -R stirlingpdf:stirlingpdf /opt/Stirling-PDF
   ```

2. Put any environment variables in `/opt/Stirling-PDF/.env`, one per line, for example `SYSTEM_DEFAULTLOCALE=de-DE`.
3. Create `/etc/systemd/system/stirlingpdf.service`:

   ```ini
   [Unit]
   Description=Stirling PDF
   After=network.target

   [Service]
   User=stirlingpdf
   Group=stirlingpdf
   EnvironmentFile=/opt/Stirling-PDF/.env
   WorkingDirectory=/opt/Stirling-PDF
   ExecStart=/usr/bin/java -jar /opt/Stirling-PDF/Stirling-PDF-with-login.jar
   SuccessExitStatus=143

   [Install]
   WantedBy=multi-user.target
   ```

4. Start it and enable it at boot:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now stirlingpdf.service
   sudo systemctl status stirlingpdf.service
   ```

## Change the port or address

Set it in `configs/custom_settings.yml` (create the file if it doesn't exist), or as environment variables, for example in the `.env` file above:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    server:
      address: 0.0.0.0
      port: 3000
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SERVER_ADDRESS=0.0.0.0
    SERVER_PORT=3000
    ```
  </TabItem>
</Tabs>

## Update

Stop Stirling PDF, replace the JAR with the new release, and start it again. Everything in `configs/` is kept. Back it up first: see the [Production checklist](../Production.md).
