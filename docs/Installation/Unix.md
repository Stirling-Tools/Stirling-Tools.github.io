---
sidebar_position: 2
id: Unix Installation
title: Unix Installation Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Unix Installation

Stirling PDF on Linux is available as a **native desktop application** or as a **server** using the JAR file.

## Desktop Application (Recommended for Personal Use)

Native Linux desktop app with all PDF tools available.

### What You Get

- ✅ **Native Linux application** - Integrated with your desktop environment
- ✅ **Open PDFs directly** - Double-click any PDF to open in Stirling-PDF
- ✅ **No login required** - Install and start using PDF tools right away
- ✅ **Processes files locally** - All your PDF processing stays on your device
- ✅ **Optional server connection** - Connect to Stirling Cloud or your own self-hosted server for advanced tools like OCR and document conversions
- ✅ **All local tools included** - Merge, split, rotate, sign, and more work without any server
- ✅ **Better performance** - Native Linux integration
- ✅ **No browser needed** - Standalone application

### Installation

**1. Download:**

[Stirling-PDF Desktop Installer (DEB)](https://files.stirlingpdf.com/linux-installer.deb)

**2. Install the application:**

```bash
sudo dpkg -i linux-installer.deb
```

**3. Launch Stirling-PDF:**
- Search for "Stirling-PDF" in your application menu, or
- Run `stirling-pdf` from the terminal

### Connecting to a server

The desktop app works fully offline for local PDF tools like merging, splitting, rotating, and signing. If you need advanced server-side features like OCR or document format conversions, you can connect to a server at any time:

**Stirling Cloud**
- Sign in with your Stirling Cloud account
- Gives access to advanced tools powered by server-side processing
- Your files are processed securely and never stored

**Self-hosted Server**
- Enter the URL of your own Stirling-PDF server instance (e.g., `http://192.168.1.53:8080`)
- Full control over your data and processing
- Useful for team deployments or when you want all features on your own infrastructure

---

## Server Version (For Hosting and Sharing)

To run the application without Docker/Podman, you will need to manually install all dependencies and build the necessary components.

Note that some dependencies might not be available in the standard repositories of all Linux distributions, and may require additional steps to install.

The following guide assumes you have a basic understanding of using a command line interface in your operating system.

It should work on most Linux distributions and MacOS. For Windows, you might need to use Windows Subsystem for Linux (WSL) for certain steps.
The amount of dependencies is to actually reduce overall size, ie installing LibreOffice sub components rather than full LibreOffice package.

You could theoretically use a Distrobox/Toolbox, if your Distribution has old or not all Packages. But you might just as well use the Docker Container then.

### Step 1: Prerequisites

Install the following software, if not already installed:

- Java 21 or later
- Gradle 7.0 or later (included within repo so not needed on server)
- Git
- Python 3.8 (with pip)
- Make
- GCC/G++
- Automake
- Autoconf
- libtool
- pkg-config
- zlib1g-dev
- libleptonica-dev

<Tabs groupId="unix-systems">
  <TabItem value="debian" label="Debian-based Systems">
    ```bash
    sudo apt-get update
    sudo apt-get install -y git automake autoconf libtool \
        libleptonica-dev pkg-config zlib1g-dev make g++ \
        openjdk-21-jdk python3 python3-pip
    ```
  </TabItem>
  <TabItem value="fedora" label="Fedora-based Systems">
    ```bash
    sudo dnf install -y git automake autoconf libtool \
        leptonica-devel pkg-config zlib-devel make gcc-c++ \
        java-21-openjdk python3 python3-pip
    ```
  </TabItem>
  <TabItem value="nix" label="Nix Package Manager">
    ```bash
    nix-channel --update
    nix-env -iA nixpkgs.jdk21 nixpkgs.git nixpkgs.python38 \
        nixpkgs.gnumake nixpkgs.libgcc nixpkgs.automake \
        nixpkgs.autoconf nixpkgs.libtool nixpkgs.pkg-config \
        nixpkgs.zlib nixpkgs.leptonica
    ```
  </TabItem>
</Tabs>

### Step 2: Clone and Build jbig2enc (Only required for certain OCR functionality)

<Tabs groupId="unix-systems">
  <TabItem value="debian" label="Debian">
    ```bash
    mkdir ~/.git
    cd ~/.git &&\
    git clone https://github.com/agl/jbig2enc.git &&\
    cd jbig2enc &&\
    ./autogen.sh &&\
    ./configure &&\
    make &&\
    sudo make install
    ```
  </TabItem>
  <TabItem value="fedora" label="Fedora">
    ```bash
    mkdir ~/.git
    cd ~/.git &&\
    git clone https://github.com/agl/jbig2enc.git &&\
    cd jbig2enc &&\
    ./autogen.sh &&\
    ./configure &&\
    make &&\
    sudo make install
    ```
  </TabItem>
  <TabItem value="nix" label="Nix Package Manager">
    ```bash
    nix-env -iA nixpkgs.jbig2enc
    ```
  </TabItem>
</Tabs>

### Step 3: Install Additional Software

Next we need to install LibreOffice for conversions, tesseract for OCR, and opencv for pattern recognition functionality.

Install the following software:

- libreoffice (libreoffice-core libreoffice-common libreoffice-writer libreoffice-calc libreoffice-impress)
- python3-uno
- unoserver
- pngquant
- tesseract
- opencv-python-headless

<Tabs groupId="unix-systems">
  <TabItem value="debian" label="Debian-based Systems">
    ```bash
    sudo apt-get install -y libreoffice-writer libreoffice-calc libreoffice-impress tesseract-ocr
    pip3 install uno opencv-python-headless unoserver pngquant WeasyPrint --break-system-packages
    ```
  </TabItem>
  <TabItem value="fedora" label="Fedora-based Systems">
    ```bash
    sudo dnf install -y libreoffice-writer libreoffice-calc libreoffice-impress tesseract
    pip3 install uno opencv-python-headless unoserver pngquant WeasyPrint
    ```
  </TabItem>
  <TabItem value="nix" label="Nix Package Manager">
    ```bash
    nix-env -iA nixpkgs.libreoffice nixpkgs.tesseract nixpkgs.poppler_utils
    pip3 install uno opencv-python-headless unoserver pngquant WeasyPrint
    ```
  </TabItem>
</Tabs>

### Step 4: Grab latest Stirling PDF Jar

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

Example download and setup:

```bash
sudo wget https://files.stirlingpdf.com/Stirling-PDF.jar
sudo chmod +x Stirling-PDF.jar
```

### Step 4b: Clone the Stirling-PDF Repository

You need the repository to get the `scripts` folder, which contains Python scripts used by OpenCV for certain PDF operations.

```bash
git clone https://github.com/Stirling-Tools/Stirling-PDF.git
```

### Step 5: Move JAR and Scripts to Desired Location

Move the downloaded JAR file and the `scripts` folder from the cloned repository to a desired location, for example, `/opt/Stirling-PDF/`.
The `scripts` folder is required for the Python scripts using OpenCV.

<Tabs groupId="user-type">
  <TabItem value="debian" label="Debian (Root)">
    ```bash
    sudo mkdir -p /opt/Stirling-PDF &&\
    sudo mv Stirling-PDF.jar /opt/Stirling-PDF/ &&\
    sudo cp -r Stirling-PDF/scripts /opt/Stirling-PDF/ &&\
    echo "JAR and scripts installed."
    ```
  </TabItem>
  <TabItem value="fedora" label="Fedora (Root)">
    ```bash
    sudo mkdir -p /opt/Stirling-PDF &&\
    sudo mv Stirling-PDF.jar /opt/Stirling-PDF/ &&\
    sudo cp -r Stirling-PDF/scripts /opt/Stirling-PDF/ &&\
    echo "JAR and scripts installed."
    ```
  </TabItem>
  <TabItem value="nix" label="Nix (Non-root)">
    ```bash
    mkdir -p ~/Stirling-PDF &&\
    mv Stirling-PDF.jar ~/Stirling-PDF/ &&\
    cp -r Stirling-PDF/scripts ~/Stirling-PDF/
    ```
  </TabItem>
</Tabs>

### Step 6: OCR Language Support

If you plan to use the OCR (Optical Character Recognition) functionality, you might need to install language packs for Tesseract if running non-english scanning.

<Tabs groupId="unix-systems">
  <TabItem value="debian" label="Debian-based Systems">
    ```bash
    sudo apt update &&\
    # All languages
    # sudo apt install -y 'tesseract-ocr-*'

    # Find languages:
    apt search tesseract-ocr-
    
    # View installed languages:
    dpkg-query -W tesseract-ocr- | sed 's/tesseract-ocr-//g'
    ```
  </TabItem>
  <TabItem value="fedora" label="Fedora-based Systems">
    ```bash
    # All languages
    # sudo dnf install -y tesseract-langpack-*

    # Find languages:
    dnf search -C tesseract-langpack-
    
    # View installed languages:
    rpm -qa | grep tesseract-langpack | sed 's/tesseract-langpack-//g'
    ```
  </TabItem>
  <TabItem value="nix" label="Nix Package Manager">
    ```bash
    nix-env -iA nixpkgs.tesseract
    ```
    Note: Nix Package Manager pre-installs almost all the language packs when tesseract is installed.
  </TabItem>
  <TabItem value="manual" label="Manual Installation">
    1. Download the desired language pack(s) by selecting the `.traineddata` file(s) for the language(s) you need.
    2. Place the `.traineddata` files in the Tesseract tessdata directory: `/usr/share/tessdata`
    3. Please view [tesseract install guide](https://tesseract.readthedocs.io/en/latest/installation.html) for more info.

    **IMPORTANT:** DO NOT REMOVE EXISTING `eng.traineddata`, IT'S REQUIRED.

  </TabItem>
</Tabs>

### Step 7: Run Stirling PDF

<Tabs groupId="unix-systems">
  <TabItem value="debian" label="Debian-based Systems">
    ```bash
    java -jar /opt/Stirling-PDF/Stirling-PDF-*.jar
    ```
  </TabItem>
  <TabItem value="fedora" label="Fedora-based Systems">
    ```bash
    java -jar /opt/Stirling-PDF/Stirling-PDF-*.jar
    ```
  </TabItem>
  <TabItem value="nix" label="Nix Package Manager">
    ```bash
    java -jar /opt/Stirling-PDF/Stirling-PDF-*.jar
    ```
  Since libreoffice, soffice, and conversion tools have their dbus_tmp_dir set as `dbus_tmp_dir="/run/user/$(id -u)/libreoffice-dbus"`, you get the following error:
  `[Thread-7] INFO  s.s.SPDF.utils.ProcessExecutor - mkdir: cannot create directory '/run/user/1501': Permission denied`
  To resolve this, use:
  `bash
      mkdir temp
      export DBUS_SESSION_BUS_ADDRESS="unix:path=./temp"
    `
  </TabItem>
</Tabs>

### Step 8: Adding a Desktop Icon

This will add a modified Appstarter to your Appmenu.

```bash
location=$(pwd)/gradlew
image=$(pwd)/docs/stirling-transparent.svg

cat > ~/.local/share/applications/Stirling-PDF.desktop <<EOF
[Desktop Entry]
Name=Stirling PDF;
GenericName=Launch StirlingPDF and open its WebGUI;
Category=Office;
Exec=xdg-open http://localhost:8080 && nohup $location java -jar /opt/Stirling-PDF/Stirling-PDF-*.jar &;
Icon=$image;
Keywords=pdf;
Type=Application;
NoDisplay=false;
Terminal=true;
EOF
```

Note: Currently the app will run in the background until manually closed.

### Optional: Changing the Host and Port

To override the default configuration, you can add the following to `/.git/Stirling-PDF/configs/custom_settings.yml` file:

```yaml
server:
  host: 0.0.0.0
  port: 3000
```

For systemd add in the .env file (see run as service for setting environment variables):

```bash
SERVER_HOST="0.0.0.0"
SERVER_PORT="3000"
```

**Note:** The file `custom_settings.yml` is created after the first application launch. To have it before that, you can create the directory and add the file yourself.

### Optional: Run Stirling PDF as a service (requires root).

First create a .env file, where you can store environment variables:

```
touch /opt/Stirling-PDF/.env
```

In this file you can add all variables, one variable per line, as stated in the main readme (for example SYSTEM_DEFAULTLOCALE="de-DE").

Create a new file where we store our service settings and open it with nano editor:

```
nano /etc/systemd/system/stirlingpdf.service
```

Paste this content, make sure to update the filename of the jar-file. Press Ctrl+S and Ctrl+X to save and exit the nano editor:

```
[Unit]
Description=Stirling-PDF service
After=syslog.target network.target

[Service]
SuccessExitStatus=143

User=root
Group=root

Type=simple

EnvironmentFile=/opt/Stirling-PDF/.env
WorkingDirectory=/opt/Stirling-PDF
ExecStart=/usr/bin/java -jar Stirling-PDF-0.17.2.jar
ExecStop=/bin/kill -15 $MAINPID

[Install]
WantedBy=multi-user.target
```

Notify systemd that it has to rebuild its internal service database (you have to run this command every time you make a change in the service file):

```
sudo systemctl daemon-reload
```

Enable the service to tell the service to start it automatically:

```
sudo systemctl enable stirlingpdf.service
```

See the status of the service:

```
sudo systemctl status stirlingpdf.service
```

Manually start/stop/restart the service:

```
sudo systemctl start stirlingpdf.service
sudo systemctl stop stirlingpdf.service
sudo systemctl restart stirlingpdf.service
```

### Starting unoserver alongside Stirling PDF

To ensure that unoserver is running alongside Stirling PDF, you need to start it with the following command:

```bash
unoserver --port 2003 --interface 0.0.0.0
```

You can add this command to your startup script or systemd service file to ensure it starts automatically with Stirling PDF.

### Customizing Paths in settings.yml

If the install path is different, it can be customized in `settings.yml`:

```yaml
system:
  customPaths:
    pipeline:
      watchedFoldersDir: "" #Defaults to /pipeline/watchedFolders
      finishedFoldersDir: "" #Defaults to /pipeline/finishedFolders
    operations:
      weasyprint: "" #Defaults to /opt/venv/bin/weasyprint
      unoconvert: "" #Defaults to /opt/venv/bin/unoconvert
```
