---
sidebar_position: 1
title: Performance
sidebar_label: Performance
description: Size CPU, memory and disk for a self-hosted Stirling PDF server and tune its memory use.
---

# Performance

Size your server for the heaviest tools your users run. PDF processing is memory-hungry: a single large PDF can take many times its file size in memory while it is processed.

## Sizing

Allow at least 4 GB of memory. For larger teams, use 16 GB or more.

| Users | CPU | Memory | Disk |
|---|---|---|---|
| 1-10 | 2-4 cores | 4 GB | 10 GB |
| 10-50 | 4-8 cores | 8-16 GB | 50 GB, SSD recommended |
| 50+ | 8+ cores | 16 GB or more | 100 GB+, SSD |

Plan about 2 GB for each large PDF to image job and 1 GB for each large merge running at once. OCR and Office conversions queue (see [process limits](./Process-Limits.md)), so they add time rather than memory.

When a server runs out of memory the container stops and every running job fails, so keep `restart: unless-stopped` set.

Set a memory limit on the container so Stirling PDF can size itself (see below):

```yaml
services:
  stirling-pdf:
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '4.0'
```

The ultra-lite image needs about 2 GB and the fat image about 6 GB. If you turn on the fat image's built-in AI engine, give it more.

Some tools cost far more than others:

| Tool | CPU | Memory |
|---|---|---|
| Merge, split | Low | Grows with total file size |
| OCR | Very high | High |
| Office conversions (LibreOffice) | High, one core per conversion | High |
| PDF to image | Moderate | Very high |
| PDF/A conversion, compression | Moderate | High |

If your users mostly OCR or convert office files, size up and raise the matching [process limits](./Process-Limits.md). To run several office conversions at once, see [LibreOffice parallel processing](./LibreOffice.md).

## Java memory

The Docker image sets the Java heap automatically from the container's memory limit, up to 70% of it, leaving the rest for LibreOffice, Tesseract and other tools. Without a limit it sizes from the host's total RAM, so always set one.

If the container stops under heavy load, give the other tools more room by lowering the heap to 50%:

```yaml
services:
  stirling-pdf:
    environment:
      JAVA_CUSTOM_OPTS: "-XX:MaxRAMPercentage=50"
```

To set the heap yourself in Docker, use `JAVA_CUSTOM_OPTS`, not `JAVA_TOOL_OPTIONS`, which the image overwrites:

```yaml
services:
  stirling-pdf:
    environment:
      JAVA_CUSTOM_OPTS: "-Xmx2g"
```

When running the JAR, pass `-Xmx2g` to `java` directly. Either way, leave at least a third of the machine's or container's memory outside the heap for the other tools.

## More than one server

For more capacity or failover, run several nodes behind a load balancer; see [Clustering](./Clustering.md). An external database needs a Team or Enterprise licence; see [Database](../Storage/Database.md).
