---
sidebar_position: 2
id: Docker Install
title: Installation Guide
---
# Docker Installation Guide for Stirling PDF

Stirling-PDF is hosted in [dockerhub](https://hub.docker.com/r/frooodle/s-pdf) at frooodle/s-pdf and [Github.io](https://TODO) also gh.io/froodle/s-pdf
 
Please note Stirling PDF has [three different versions](http://TODO) for those wanting to run it on lower end hardware.
For those that want the latest and greatest continue with latest tag as referenced below.


### Docker Run
```
docker run -d \
  -p 8080:8080 \
  -v /location/of/trainingData:/usr/share/tesseract-ocr/4.00/tessdata \
  -v /location/of/extraConfigs:/configs \
  -e DOCKER_ENABLE_SECURITY=false \
  --name stirling-pdf \
  frooodle/s-pdf:latest
  
  
  Can also add these for customization but are not required
  
  -v /location/of/customFiles:/customFiles \
```

### Docker Compose
```
version: '3.3'
services:
  stirling-pdf:
    image: frooodle/s-pdf:latest
    ports:
      - '8080:8080'
    volumes:
      - /location/of/trainingData:/usr/share/tesseract-ocr/4.00/tessdata #Required for extra OCR languages
      - /location/of/extraConfigs:/configs
#      - /location/of/customFiles:/customFiles/
    environment:
      - DOCKER_ENABLE_SECURITY=false

```

### Extras
For extra parameters and customization please check the [advanced configuration](http://todo) page!