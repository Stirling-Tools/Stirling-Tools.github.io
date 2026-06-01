---
sidebar_position: 3
id: Synology Install
title: Synology DSM
description: Install Stirling PDF on Synology DSM via Container Manager (Docker)
---

# Stirling PDF on Synology DSM

Synology DSM 7+ uses **Container Manager** (formerly Docker) to run containers. The setup below works on any DSM 7.x model that has Container Manager installed.

## Prerequisites

- DSM 7.0+ with **Container Manager** installed from Package Center.
- At least 2 GB free RAM (1 GB for `latest-ultra-lite`).
- A shared folder for Stirling PDF data.

## 1. Create the shared folder layout

In **File Station** (or via SSH), create the following under your `docker` shared folder:

```
/docker/stirling-pdf/
├── configs/
├── logs/
├── customFiles/
├── pipeline/
└── tessdata/
```

## 2. Set ownership

Stirling PDF runs as UID/GID 1000. Synology's default user lookup usually maps that to a Synology user, but to be safe, set the folder permissions either via DSM (everyone read+write) or via SSH:

```bash
chown -R 1000:1000 /volume1/docker/stirling-pdf
```

If you prefer to keep DSM-native permissions, set `PUID` and `PGID` to your DSM user's UID and GID instead (find these in **Control Panel → User & Group**).

## 3. Pull the image

1. Open **Container Manager**.
2. **Registry** tab → search `stirlingtools/stirling-pdf`.
3. Double-click to download. Choose tag:
   - `latest` (recommended)
   - `latest-fat` (full features, ~6 GB RAM)
   - `latest-ultra-lite` (minimal, small NAS)

## 4. Create the container

Easiest path is via Container Manager's **Project** feature (which uses Docker Compose) - cleaner than the per-field GUI.

### Project method (recommended)

1. **Container Manager → Project → Create**.
2. Project name: `stirling-pdf`.
3. Path: `/docker/stirling-pdf`.
4. Source: **Create docker-compose.yml**.
5. Paste:

```yaml
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
    container_name: stirling-pdf
    ports:
      - "8080:8080"
    volumes:
      - /volume1/docker/stirling-pdf/configs:/configs
      - /volume1/docker/stirling-pdf/logs:/logs
      - /volume1/docker/stirling-pdf/customFiles:/customFiles
      - /volume1/docker/stirling-pdf/pipeline:/pipeline
      - /volume1/docker/stirling-pdf/tessdata:/usr/share/tessdata
    environment:
      PUID: "1000"
      PGID: "1000"
      SECURITY_ENABLELOGIN: "false"
      LANGS: "en_GB"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-fs", "http://localhost:8080/api/v1/info/status"]
      interval: 30s
      timeout: 15s
      start_period: 120s
      retries: 5
```

6. **Next** → **Build**.

Adjust the port `8080:8080` if you have another service using 8080 on the NAS (DSM default web ports are 5000/5001, so 8080 is usually free).

## 5. Verify

From a browser on the same network:

```
http://<synology-ip>:8080
```

The Stirling PDF home page should load.

## 6. Make it auto-start

Container Manager keeps the project running after reboot by default thanks to `restart: unless-stopped`. Confirm via **Container Manager → Project → stirling-pdf → ...** that auto-start is on.

## Reverse proxy via DSM

DSM has a built-in reverse proxy:

1. **Control Panel → Login Portal → Advanced → Reverse Proxy**.
2. **Create** with:
   - Source: `pdf.yourdomain.com` (HTTPS / 443).
   - Destination: `localhost:8080`.
3. Set up the SSL cert via **Security → Certificate** (Let's Encrypt is built in).

Open the **Custom Headers** tab and add the standard WebSocket headers if you'll use OAuth flows.

## Backups

DSM Hyper Backup the `/docker/stirling-pdf/configs` folder on your usual backup schedule. That folder contains the settings and embedded database. Other folders (`logs`, `customFiles`, `pipeline`, `tessdata`) are optional.

## Uninstalling

1. **Container Manager → Project → stirling-pdf → Stop → Clean**.
2. Optionally delete the `/docker/stirling-pdf` shared folder.

## Troubleshooting

- **Container won't start, exits immediately**: check **Container Manager → Container → stirling-pdf → Log**. Usually a permission issue - run `chown -R 1000:1000 /volume1/docker/stirling-pdf` over SSH.
- **OCR languages other than English needed**: drop the `.traineddata` file into `/docker/stirling-pdf/tessdata` and restart. See [OCR Configuration](../../Configuration/OCR.md).
- **High RAM usage**: switch to `stirlingtools/stirling-pdf:latest-ultra-lite` if your NAS is RAM-constrained. You lose LibreOffice-backed conversions and OCR but keep all core PDF operations.
- **Slow file uploads**: DSM has a default reverse-proxy body-size limit. Raise it in the reverse proxy entry's "Custom Header" section.
