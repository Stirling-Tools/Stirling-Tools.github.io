---
sidebar_position: 2
id: Docker Install
title: Installation Guide
---
# Docker Installation Guide for Stirling PDF

Stirling-PDF is hosted in [dockerhub](https://hub.docker.com/r/frooodle/s-pdf) at frooodle/s-pdf and [Github.io](https://TODO) also gh.io/froodle/s-pdf
 
Please note Stirling PDF has [three different versions](http://TODO) for those wanting to run it on lower end hardware.
For those that want the latest and greatest continue with latest tag as refereced below.


###Docker Run
```
docker run -d \
  -p 8080:8080 \
  -v /location/of/trainingData:/usr/share/tesseract-ocr/4.00/tessdata \
  --name stirling-pdf \
  frooodle/s-pdf:latest
  
  
  Can also add these for customisation but are not required
  -e APP_HOME_NAME="Stirling PDF" \
  -e APP_HOME_DESCRIPTION="Your locally hosted one-stop-shop for all your PDF needs." \
  -e APP_NAVBAR_NAME="Stirling PDF" \
  -e ALLOW_GOOGLE_VISIBILITY="true" \
  -e APP_ROOT_PATH="/" \
  -e APP_LOCALE="en_GB" \
```

###Docker Compose
```
version: '3.3'
services:
  stirling-pdf:
    image: frooodle/s-pdf:latest
    ports:
      - '8080:8080'
    volumes:
      - /location/of/trainingData:/usr/share/tesseract-ocr/4.00/tessdata #Required for extra OCR languages
#      - /location/of/extraConfigs:/configs
#    environment:
#      APP_LOCALE: en_GB
#      APP_HOME_NAME: Stirling PDF
#      APP_HOME_DESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.
#      APP_NAVBAR_NAME: Stirling PDF
#      APP_ROOT_PATH: /
#      ALLOW_GOOGLE_VISIBILITY: true

```
