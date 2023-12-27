---
sidebar_position: 2
id: Docker Install
title: Installation Guide
---

# Docker Images for Stirling-PDF

The docker image for Stirling-PDF is available on Docker Hub at [frooodle/s-pdf](https://hub.docker.com/r/frooodle/s-pdf) or on Github at [s-pdf](https://github.com/frooodle/Stirling-PDF/pkgs/container/s-pdf).

Please note that Stirling PDF offers three distinct versions tailored for various hardware configurations. Users seeking optimal performance on lower-end hardware can choose from the specific versions provided. For those who prefer the most recent features and updates, it is recommended to continue using the latest tag.

| Version    | Latest Tag          |
| ---------- | ------------------- |
| Standard   | `latest`            |
| Lite       | `latest-lite`       |
| Ultra Lite | `latest-ultra-lite` |

### Run docker container with `docker run`

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

### Run docker container with `docker compose`

- `docker-compose.yml`
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
