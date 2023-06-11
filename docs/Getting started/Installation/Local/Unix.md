---
sidebar_position: 2
id: Unix Installation
title: Unix installation Guide
---
# Docker Installation Guide for Stirling PDF

You can get Stirling PDF up and running using Docker with the following command:

```bash
docker run -d \
  -p 8080:8080 \
  -v /location/of/trainingData:/usr/share/tesseract-ocr/4.00/tessdata \
  --name stirling-pdf \
  frooodle/s-pdf:latest
```