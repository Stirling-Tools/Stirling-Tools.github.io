---
sidebar_position: 7
id: OCR
title: OCR (Optical Character Recognition)
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OCR Language Packs and Setup
This document provides instructions on how to add additional language packs for the OCR tab in Stirling-PDF, both inside and outside of Docker.

## How does the OCR Work
Stirling-PDF uses Tesseract for its text recognition. All credit goes to them for this awesome work!

## Language Packs

Tesseract OCR supports a variety of languages. You can find additional language packs in the Tesseract GitHub repositories:

- [tessdata_fast](https://github.com/tesseract-ocr/tessdata_fast): These language packs are smaller and faster to load but may provide lower recognition accuracy.
- [tessdata](https://github.com/tesseract-ocr/tessdata): These language packs are larger and provide better recognition accuracy, but may take longer to load.

Depending on your requirements, you can choose the appropriate language pack for your use case. By default, Stirling-PDF uses `tessdata_fast` for English, but this can be replaced.

### Installing Language Packs manually

1. Download the desired language pack(s) by selecting the `.traineddata` file(s) for the language(s) you need.
2. Place the `.traineddata` files in the Tesseract tessdata directory: `/usr/share/tessdata` (or equivalent)

**DO NOT REMOVE EXISTING `eng.traineddata`, IT'S REQUIRED.**

### Docker Setup

If you are using Docker, you need to expose the Tesseract tessdata directory as a volume in order to use the additional language packs.

<Tabs groupId="docker-config">
  <TabItem value="docker-compose" label="Docker Compose">
    Modify your `docker-compose.yml` file to include the following volume configuration:

    ```yaml
    services:
      your_service_name:
        image: your_docker_image_name
        volumes:
          - /location/of/trainingData:/usr/share/tessdata
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    Add the following to your existing Docker run command:

    ```bash
    -v /location/of/trainingData:/usr/share/tessdata
    ```
  </TabItem>
</Tabs>

### Non-Docker Setup

<Tabs groupId="operating-systems">
  <TabItem value="debian" label="Debian-based Systems">
    For Debian-based systems, use the following commands to manage Tesseract languages:

    ```bash
    sudo apt update &&\
    # All languages
    # sudo apt install -y 'tesseract-ocr-*'
    
    # Find available languages:
    apt search tesseract-ocr-
    
    # View installed languages:
    dpkg-query -W tesseract-ocr- | sed 's/tesseract-ocr-//g'
    ```
  </TabItem>
  <TabItem value="fedora" label="Fedora">
    For Fedora systems, use the following commands:

    ```bash
    # All languages
    # sudo dnf install -y tesseract-langpack-*
    
    # Find available languages:
    dnf search -C tesseract-langpack-
    
    # View installed languages:
    rpm -qa | grep tesseract-langpack | sed 's/tesseract-langpack-//g'
    ```
  </TabItem>
  <TabItem value="windows" label="Windows">
    Follow these steps to set up Tesseract languages on Windows:

    1. Download desired `.traineddata` files from [tessdata](https://github.com/tesseract-ocr/tessdata) or [tessdata_fast](https://github.com/tesseract-ocr/tessdata_fast)
    
    2. Place them in the tessdata folder within your Tesseract installation directory:
       ```
       C:\Program Files\Tesseract-OCR\tessdata
       ```
    
    3. Verify the installation by running:
       ```powershell
       tesseract --list-langs
       ```
    
    4. Edit your `/configs/settings.yml` and update the `system.tessdataDir`:
       ```yaml
       system:
         tessdataDir: C:/Program Files/Tesseract-OCR/tessdata # path to Tessdata files
       ```
  </TabItem>
</Tabs>