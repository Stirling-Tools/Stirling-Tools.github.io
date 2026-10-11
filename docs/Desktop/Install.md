---
title: Install the desktop app
sidebar_label: Install
sidebar_position: 1
description: Download and install Stirling PDF Desktop on Windows, macOS or Linux, including winget, Homebrew and AUR, and what happens on first launch.
---

# Install the desktop app

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

Requires Windows 10 or 11.

**Installer (x64)**

1. Download [Stirling-PDF-windows-x86_64.msi](https://files.stirlingpdf.com/win-installer.exe).
2. Run it and approve the administrator prompt. It installs for all users.
3. Open **Stirling PDF** from the Start menu.

**winget (x64)**

```powershell
winget install StirlingTools.StirlingPDF
```

**Windows on ARM**

Download [Stirling-PDF-windows-arm64-setup.exe](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/Stirling-PDF-windows-arm64-setup.exe) and run it. The ARM build isn't on winget.

If the app runs but no window appears, install the [Microsoft Edge WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) and start it again.

</TabItem>
<TabItem value="macos" label="macOS">

Requires macOS 10.15 or later, on Apple silicon or Intel.

**DMG**

1. Download [Stirling PDF for Mac](https://files.stirlingpdf.com/mac-installer.dmg).
2. Open the DMG and drag **Stirling PDF** into **Applications**.
3. Open **Stirling PDF** from Applications.

If macOS blocks the app, open **System Settings → Privacy & Security**, select **Open Anyway** next to the Stirling PDF message, then open it again.

**Homebrew**

```bash
brew tap stirling-tools/stirling-pdf
brew install --cask stirling-pdf
```

</TabItem>
<TabItem value="linux" label="Linux">

Requires a 64-bit x86 (x86_64) system.

**Debian and Ubuntu (.deb)**

```bash
wget https://files.stirlingpdf.com/linux-installer.deb
sudo apt install ./linux-installer.deb
```

**Fedora and RHEL (.rpm)**

```bash
wget https://files.stirlingpdf.com/linux-installer.rpm
sudo dnf install ./linux-installer.rpm
```

**AppImage** (no install needed)

```bash
wget https://files.stirlingpdf.com/linux-installer.AppImage
chmod +x linux-installer.AppImage
./linux-installer.AppImage
```

**Arch Linux (AUR)**

```bash
paru -S stirling-pdf-desktop
```

</TabItem>
</Tabs>

## First launch

On first launch, **Sign in to Stirling** gives three choices:

- Sign in to use [Stirling Cloud](./Connection-Modes.md#sign-in-to-stirling-cloud).
- Select **or connect to a self-hosted account** to use [your organisation's server](./Connection-Modes.md#connect-to-a-self-hosted-server).
- Select **Continue without signing in** to work in Local Only mode.

You can change this later in **Settings → Connection Mode**. If a tool says **Backend starting up...**, wait a few seconds.

<a id="automated-installation-msi-installer"></a>To install silently or pre-configure many machines, see [Managed deployment](./Managed-Deployment.md#windows-intune-sccm-group-policy).
