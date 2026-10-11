---
sidebar_position: 4
title: OCR languages
sidebar_label: OCR languages
description: Add Tesseract language packs to a self-hosted Stirling PDF server so the OCR tool can read more languages.
---

# OCR languages

The [OCR tool](../../Tools/Guides/OCR.md) can only offer languages whose Tesseract language pack is installed on the server. The standard Docker images include English, German, French, Portuguese and Simplified Chinese. The ultra-lite image has no OCR.

Stirling PDF uses OCRmyPDF when it is installed, as it is in the standard and fat images, and falls back to Tesseract alone otherwise. The OCR tool's **Processing Options** only work with OCRmyPDF.

## Download languages in the app

1. Open **Settings → Server → Advanced**. The **Processing** card shows the **Tessdata Directory** and its installed languages.
2. Under **Download additional tessdata languages**, pick the languages, then select **Download selected languages**.

The server downloads them from the [tesseract-ocr/tessdata](https://github.com/tesseract-ocr/tessdata) repository, so it needs internet access. If the folder is not writable, the app gives you download links instead; save the files into the tessdata folder yourself.

In Docker, the tessdata folder is inside the container, so languages downloaded this way are lost when the container is recreated. Use a volume, below, for languages you want to keep.

## Add languages with a Docker volume

1. Download the `.traineddata` files you need from [tessdata](https://github.com/tesseract-ocr/tessdata) (more accurate, larger) or [tessdata_fast](https://github.com/tesseract-ocr/tessdata_fast) (faster, smaller).
2. Put them in a host folder and mount it at `/usr/share/tessdata`:

   ```yaml
   services:
     stirling-pdf:
       volumes:
         - ./tessdata:/usr/share/tessdata
   ```

3. Restart the container.

At startup, files in `/usr/share/tessdata` are copied into Tesseract's own folder, `/usr/share/tesseract-ocr/5/tessdata`. Files already there are not replaced.

## Add languages without Docker

<Tabs groupId="os">
  <TabItem value="debian" label="Debian / Ubuntu">
    ```bash
    sudo apt install tesseract-ocr-spa      # one language (Spanish)
    apt search tesseract-ocr-               # list available languages
    ```
  </TabItem>
  <TabItem value="fedora" label="Fedora">
    ```bash
    sudo dnf install tesseract-langpack-spa # one language (Spanish)
    dnf search tesseract-langpack-          # list available languages
    ```
  </TabItem>
  <TabItem value="windows" label="Windows">
    1. Download the `.traineddata` files from [tessdata](https://github.com/tesseract-ocr/tessdata) or [tessdata_fast](https://github.com/tesseract-ocr/tessdata_fast).
    2. Put them in the `tessdata` folder of your Tesseract install, such as `C:\Program Files\Tesseract-OCR\tessdata`, and check with `tesseract --list-langs`.
    3. Point Stirling PDF at that folder in `settings.yml`, then restart:

       ```yaml
       system:
         tessdataDir: C:/Program Files/Tesseract-OCR/tessdata
       ```
  </TabItem>
</Tabs>

Keep `eng.traineddata` in the folder: English is always needed.

The tessdata folder is chosen in this order: `system.tessdataDir`, then the `TESSDATA_PREFIX` environment variable, then `/usr/share/tesseract-ocr/5/tessdata`.
