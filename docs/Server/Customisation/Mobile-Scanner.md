---
sidebar_position: 4
title: Mobile scanner settings
sidebar_label: Mobile scanner
description: Turn phone uploads by QR code on or off and choose how uploaded photos are converted to PDF on a self-hosted server.
---

# Mobile scanner settings

Control the [mobile scanner](../../Tools/Guides/Mobile-Scanner.md), which lets people scan a QR code and upload photos from their phone. It is on by default.

## Before you start

The QR code sends phones to your server's **Frontend URL** (`system.frontendUrl`), set under **Settings → Server → System → Branding & appearance**. Set it to an address phones can reach, such as `https://pdf.example.com`.

## Settings

Open **Settings → Server → Integrations → Mobile Phone Upload**, or edit `settings.yml`:

| Field in Settings | Setting | Default | Purpose |
|---|---|---|---|
| **Enable QR Code Upload** | `system.enableMobileScanner` | `true` | Turn phone uploads on or off. |
| **Convert Images to PDF** | `system.mobileScannerSettings.convertToPdf` | `true` | Turn uploaded photos into a PDF. Off keeps the images as they are. |
| **Image Resolution** | `system.mobileScannerSettings.imageResolution` | `full` | `full` keeps the original size; `reduced` scales to at most 1200 px on the longest side. |
| **Page Format** | `system.mobileScannerSettings.pageFormat` | `A4` | `keep` (original image size), `A4` or `letter`. |
| **Stretch to Fit** | `system.mobileScannerSettings.stretchToFit` | `false` | Stretch images to fill the page. Off centres them and keeps their proportions. |

The last three only apply when **Convert Images to PDF** is on.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      enableMobileScanner: true
      mobileScannerSettings:
        convertToPdf: true
        imageResolution: full
        pageFormat: A4
        stretchToFit: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_ENABLEMOBILESCANNER=true
    SYSTEM_MOBILESCANNERSETTINGS_CONVERTTOPDF=true
    SYSTEM_MOBILESCANNERSETTINGS_IMAGERESOLUTION=full
    SYSTEM_MOBILESCANNERSETTINGS_PAGEFORMAT=A4
    SYSTEM_MOBILESCANNERSETTINGS_STRETCHTOFIT=false
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          SYSTEM_ENABLEMOBILESCANNER: "true"
          SYSTEM_MOBILESCANNERSETTINGS_CONVERTTOPDF: "true"
          SYSTEM_MOBILESCANNERSETTINGS_IMAGERESOLUTION: full
          SYSTEM_MOBILESCANNERSETTINGS_PAGEFORMAT: A4
          SYSTEM_MOBILESCANNERSETTINGS_STRETCHTOFIT: "false"
    ```
  </TabItem>
</Tabs>

## Related settings

- `system.enableMobileSignature` (default `true`) lets people draw a signature on their phone from the Sign tool, using the same QR code flow. It also needs the frontend URL.
- **Hide Mobile Scanner** (`ui.hideDisabledTools.mobileQRScanner`, default `false`) hides the upload button when the scanner is off.

Uploaded files are held in temporary storage on the server and removed once downloaded or after 10 minutes of inactivity.
