---
sidebar_position: 1
id: Self-Hosting Platforms Overview
title: Self-Hosting Platforms Overview
description: Platform-specific install notes for TrueNAS, Synology, Unraid, Podman, Proxmox, and more
---

# Self-Hosting Platforms

Stirling PDF ships as Docker images, so any platform that can run Docker (or OCI-compatible) containers can run Stirling PDF. The pages in this section give platform-specific shortcuts for the most commonly requested NAS, hypervisor, and container-runtime setups.

If you just want the generic Docker setup, see the [Docker Install Guide](../Docker%20Install.md) - all the platform pages here build on it.

## What every platform needs

These facts are the same regardless of platform; each platform guide just translates them into platform-native settings.

| Need | Value |
|---|---|
| **Image** | `docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest` (mirror: `stirlingtools/stirling-pdf` on Docker Hub) |
| **Port** | `8080/tcp` |
| **User in container** | UID/GID 1000 on `latest` and `latest-fat`; Alpine system UID on `latest-ultra-lite`. Always remappable at runtime via `PUID` / `PGID` env vars (set these to match host ownership when bind-mounting). |
| **Healthcheck** | `GET /api/v1/info/status` looking for body `UP` |
| **Required persistent volume** | `/configs` (settings, database) |
| **Recommended volumes** | `/logs`, `/customFiles`, `/pipeline`, `/usr/share/tessdata` |
| **Min memory** | 1-2 GB (`latest`), 1 GB (`latest-ultra-lite`), 4-6 GB (`latest-fat`) |
| **CPU** | 1 vCPU minimum, 2+ recommended |

## Choosing the right image tag

| Tag | When to use it |
|---|---|
| `latest` | Most users. Includes LibreOffice, Tesseract, OCRmyPDF, Calibre, Ghostscript, qpdf. |
| `latest-fat` | Air-gapped or maximum-quality conversions. Includes everything plus extra fonts and tools. 4-6 GB RAM recommended. |
| `latest-ultra-lite` | Constrained hardware (Raspberry Pi, small NAS). Alpine base, no LibreOffice / OCR / Calibre. ~1 GB RAM. Note: this image uses Alpine system UIDs rather than 1000, so set `PUID`/`PGID` explicitly if you bind-mount data. |

## Platform-specific guides

- [TrueNAS SCALE](./TrueNAS.md)
- [Synology DSM](./Synology.md)
- [Unraid](./Unraid.md)
- [Podman & Quadlets](./Podman.md)
- [Proxmox LXC](./Proxmox.md)

Don't see your platform? The [generic Docker guide](../Docker%20Install.md) covers any host with Docker installed, and the [Kubernetes guide](../Kubernetes.md) covers any cluster.

## OCR languages and the `/usr/share/tessdata` mount

The `latest` and `latest-fat` images ship with English, German, French, Portuguese, and Simplified Chinese OCR language packs baked in. If you bind-mount an empty directory to `/usr/share/tessdata`, **you'll hide the bundled languages**.

Two safe patterns:

1. **Don't mount it at all** if you only need the bundled languages.
2. **Mount it, then copy the bundled languages in before the first container boot**:
   ```bash
   docker create --name spdf-tmp stirlingtools/stirling-pdf:latest
   docker cp spdf-tmp:/usr/share/tessdata/. ./stirling-data/tessdata/
   docker rm spdf-tmp
   ```
   Then drop any additional `.traineddata` files in alongside.
