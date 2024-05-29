---
sidebar_position: 2
id: Docker Install
title: Installation Guide
---

# Docker Images for Stirling-PDF

The docker image for Stirling-PDF is available on Docker Hub at [frooodle/s-pdf](https://hub.docker.com/r/frooodle/s-pdf) or on Github at [s-pdf](https://github.com/Stirling-Tools/Stirling-PDF/pkgs/container/s-pdf).

Please note that Stirling PDF offers three distinct versions tailored for various hardware configurations. Users seeking optimal performance on lower-end hardware can choose from the specific versions provided. For those who prefer the most recent features and updates, it is recommended to continue using the latest tag.

| Version    | Latest Tag          |
| ---------- | ------------------- |
| Standard   | `latest`            |
| Ultra Lite | `latest-ultra-lite` |

### Run docker container with `docker run`

```
docker run -d \
  -p 8080:8080 \
  -v /location/of/trainingData:/usr/share/tessdata \
  -v /location/of/extraConfigs:/configs \
  -v /location/of/logs:/logs \
  -e DOCKER_ENABLE_SECURITY=false \
  -e INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false \
  -e LANGS=en_GB \
  --name stirling-pdf \
  frooodle/s-pdf:latest

  Can also add these for customisation but are not required
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
      - /location/of/trainingData:/usr/share/tessdata #Required for extra OCR languages
      - /location/of/extraConfigs:/configs
#      - /location/of/customFiles:/customFiles/
#      - /location/of/logs:/logs/
    environment:
      - DOCKER_ENABLE_SECURITY=false
      - INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false
      - LANGS=en_GB
```

### Extras

For extra parameters and customization please check the [advanced configuration](https://stirlingtools.com/docs/Advanced%20Configuration/How%20to%20add%20configurations) page!
