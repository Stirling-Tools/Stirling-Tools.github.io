---
sidebar_position: 2
id: Docker Install
title: Docker Guide
---

# Docker Images for Stirling-PDF

The docker image for Stirling-PDF is available on Docker Hub at [stirlingtools/stirling-pdf](https://hub.docker.com/r/stirlingtools/stirling-pdf) or on Github at [stirling-pdf](https://github.com/Stirling-Tools/Stirling-PDF/pkgs/container/stirling-pdf).

Please note that Stirling PDF offers three distinct versions tailored for various hardware configurations. Users seeking optimal performance on lower-end hardware can choose from the specific versions provided. For those who prefer the most recent features and updates, it is recommended to continue using the latest tag.

| Version    | Latest Tag          |
| ---------- | ------------------- |
| Fat        | `latest-fat`            |
| Standard   | `latest`            |
| Ultra Lite | `latest-ultra-lite` |

### Run docker container with `docker run`

```bash
docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v "./StirlingPDF/trainingData:/usr/share/tessdata" \
  -v "./StirlingPDF/extraConfigs:/configs" \
  -v "./StirlingPDF/customFiles:/customFiles/" \
  -v "./StirlingPDF/logs:/logs/" \
  -v "./StirlingPDF/pipeline:/pipeline/" \
  -e DISABLE_ADDITIONAL_FEATURES=true \
  -e LANGS=en_GB \
  docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
```

### Run docker container with `docker compose`

- `docker-compose.yml`
```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    ports:
      - '8080:8080'
    volumes:
      - ./StirlingPDF/trainingData:/usr/share/tessdata # Required for extra OCR languages
      - ./StirlingPDF/extraConfigs:/configs
      - ./StirlingPDF/customFiles:/customFiles/
      - ./StirlingPDF/logs:/logs/
      - ./StirlingPDF/pipeline:/pipeline/
    environment:
      - DISABLE_ADDITIONAL_FEATURES=false
      - LANGS=en_GB
```

### Extras

For extra parameters and customization please check the [advanced configuration](https://docs.stirlingpdf.com/Advanced%20Configuration/How%20to%20add%20configurations) page!
