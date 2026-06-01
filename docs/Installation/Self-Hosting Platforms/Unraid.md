---
sidebar_position: 4
id: Unraid Install
title: Unraid
description: Install Stirling PDF on Unraid using the Docker template
---

# Stirling PDF on Unraid

Unraid's Docker engine wraps the same upstream image - the difference is just the template format and which paths are conventional.

## Prerequisites

- Unraid 6.10+ (the version that ships modern Docker).
- Community Applications plugin (only if you want to install from a curated template).
- An array share to hold app data (typically `/mnt/user/appdata/`).

## Quick install via Community Applications

If a community-maintained `stirling-pdf` template appears in Community Applications, install that and skip to **Verify**. The community template is the same image as below, just with the fields pre-populated.

## Manual install

1. **Docker** tab → **Add Container**.
2. Fill in:

| Field | Value |
|---|---|
| Name | `stirling-pdf` |
| Repository | `docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest` |
| Network Type | `Bridge` |
| WebUI | `http://[IP]:[PORT:8080]` |
| Icon URL | `https://raw.githubusercontent.com/Stirling-Tools/Stirling-PDF/main/docs/stirling.png` (optional) |

3. **Add another Path, Port, Variable, Label or Device**:

### Ports

| Container Port | Host Port |
|---|---|
| `8080` | `8080` |

### Paths

| Container Path | Host Path |
|---|---|
| `/configs` | `/mnt/user/appdata/stirling-pdf/configs` |
| `/logs` | `/mnt/user/appdata/stirling-pdf/logs` |
| `/customFiles` | `/mnt/user/appdata/stirling-pdf/customFiles` |
| `/pipeline` | `/mnt/user/appdata/stirling-pdf/pipeline` |
| `/usr/share/tessdata` | `/mnt/user/appdata/stirling-pdf/tessdata` |

### Environment Variables

| Key | Value |
|---|---|
| `PUID` | `99` (Unraid's `nobody`) |
| `PGID` | `100` (Unraid's `users`) |
| `SECURITY_ENABLELOGIN` | `false` |
| `LANGS` | `en_GB` |

PUID 99 / PGID 100 is the standard Unraid pattern - it puts the container's writes under the `nobody:users` ownership that the rest of Unraid expects on `/mnt/user`.

4. **Apply**. Unraid pulls the image and starts the container.

## Verify

Click the container icon → **WebUI**, or browse to `http://<unraid-ip>:8080`. You should see the Stirling PDF home page.

You can also check the healthcheck from the Unraid terminal:

```bash
curl -fs http://localhost:8080/api/v1/info/status
```

## Auto-start

Unraid auto-starts containers in the order shown in the Docker tab. Drag `stirling-pdf` to where it makes sense in your boot order; leave Auto-start `ON`.

## Reverse proxy

If you use SWAG, Nginx Proxy Manager, or Traefik on Unraid:

- Internal URL: `http://stirling-pdf:8080` (if on the same docker network) or `http://<unraid-ip>:8080`.
- Set `SYSTEM_ROOTURIPATH=/your-subpath` if your proxy serves Stirling PDF from a sub-path.

A typical NPM config:
- Domain: `pdf.yourdomain.com`
- Scheme: `http`
- Forward Hostname/IP: `<unraid-ip>` (or `stirling-pdf` if on the proxy's docker network)
- Forward Port: `8080`
- Websockets Support: on
- HTTP/2: on

## Backups

Your data lives in `/mnt/user/appdata/stirling-pdf/configs`. Include it in your existing appdata backup schedule (Appdata Backup plugin, rsync, etc.). Other folders are optional.

## Uninstalling

1. Docker tab → click the `stirling-pdf` icon → **Remove** → check **Also delete container's image**.
2. Optionally delete `/mnt/user/appdata/stirling-pdf` (this removes user accounts and history, so back up first).

## Troubleshooting

- **Container won't start**: check Unraid container logs (click icon → **Log**). Permission errors usually mean PUID/PGID are wrong - 99/100 is the Unraid default.
- **Slow performance on Stirling PDF tools**: switch storage to a cache pool / SSD; `/mnt/user/appdata` on spinning disks adds latency to every operation that touches `/configs`.
- **Need OCR languages beyond English**: drop the relevant `.traineddata` file into `/mnt/user/appdata/stirling-pdf/tessdata` and restart the container. See [OCR Configuration](../../Configuration/OCR.md).
- **High RAM usage on a small server**: use `:latest-ultra-lite` instead of `:latest`. Removes LibreOffice/OCR/Calibre.
