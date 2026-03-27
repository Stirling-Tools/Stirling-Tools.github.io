---
sidebar_position: 20
title: Mobile Scanner Configuration
description: Enable and configure Mobile Scanner for document scanning via phone camera
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Mobile Scanner Configuration

Enable and configure the Mobile Scanner feature, which lets users scan documents with their phone camera and upload them directly to Stirling PDF via QR code.

## Settings

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
