---
sidebar_position: 11
title: Mobile Scanner
description: Scan documents from your mobile phone and upload them directly to your desktop or server
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mobile Scanner (Phone Upload)

The Mobile Scanner feature allows you to quickly scan documents using your phone camera and upload them directly to your Stirling-PDF instance via QR code.

## Overview

- Generate a QR code on desktop
- Scan it with your phone
- Upload photos or existing images
- Files are automatically transferred to your desktop
- Files auto-delete after 10 minutes or upon retrieval

## Configuration

Enable and configure Mobile Scanner:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      enableMobileScanner: true
      mobileScannerSettings:
        convertToPdf: true                    # Convert images to PDF (true/false)
        imageResolution: full                 # 'full' (original size) or 'reduced' (max 1200px)
        pageFormat: A4                        # 'keep' (original dimensions), 'A4', or 'letter'
        stretchToFit: false                   # Stretch images to fill page (may distort)
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    SYSTEM_ENABLEMOBILESCANNER=true
    SYSTEM_MOBILESCANNERSETTINGS_CONVERTTOPDF=true
    SYSTEM_MOBILESCANNERSETTINGS_IMAGERESOLUTION=full
    SYSTEM_MOBILESCANNERSETTINGS_PAGEFORMAT=A4
    SYSTEM_MOBILESCANNERSETTINGS_STRETCHTOFIT=false
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    docker run -d \
      -p 8080:8080 \
      -e SYSTEM_ENABLEMOBILESCANNER=true \
      -e SYSTEM_MOBILESCANNERSETTINGS_CONVERTTOPDF=true \
      -e SYSTEM_MOBILESCANNERSETTINGS_IMAGERESOLUTION=full \
      -e SYSTEM_MOBILESCANNERSETTINGS_PAGEFORMAT=A4 \
      -e SYSTEM_MOBILESCANNERSETTINGS_STRETCHTOFIT=false \
      stirlingtools/stirling-pdf:latest
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      SYSTEM_ENABLEMOBILESCANNER: true
      SYSTEM_MOBILESCANNERSETTINGS_CONVERTTOPDF: true
      SYSTEM_MOBILESCANNERSETTINGS_IMAGERESOLUTION: full
      SYSTEM_MOBILESCANNERSETTINGS_PAGEFORMAT: A4
      SYSTEM_MOBILESCANNERSETTINGS_STRETCHTOFIT: false
    ```
  </TabItem>
</Tabs>

## Configuration Options

| Setting | Values | Description |
|---------|--------|-------------|
| `enableMobileScanner` | `true` / `false` | Enable/disable Mobile Scanner feature |
| `convertToPdf` | `true` / `false` | Automatically convert uploaded images to PDF. If false, images are kept as-is. |
| `imageResolution` | `full` / `reduced` | Image resolution for PDF conversion: `full` = original size, `reduced` = max 1200px on longest side. Only applies when `convertToPdf` is true. |
| `pageFormat` | `keep` / `A4` / `letter` | Page format for converted PDFs: `keep` = original image dimensions, `A4` = A4 page size, `letter` = US Letter page size. Only applies when `convertToPdf` is true. |
| `stretchToFit` | `true` / `false` | Stretch images to fill entire page (may distort aspect ratio). If false, images are centered with preserved aspect ratio. Only applies when `convertToPdf` is true. |

## How It Works

1. Desktop generates a QR code with a unique session ID
2. Mobile device scans the QR code
3. Mobile uploads photos or images
4. Desktop retrieves files
5. Files auto-delete after 10 minutes of inactivity or upon download

**Session Timeout:** 10 minutes
**Storage:** Temporary server storage, automatically deleted
**Files Transferred:** All image and document files supported

## Privacy & Security

- Files stored temporarily in system temp directory only
- No permanent storage on server
- Auto-deleted after 10 minutes
- Works on local network or HTTPS tunnel
- No cloud storage involved
