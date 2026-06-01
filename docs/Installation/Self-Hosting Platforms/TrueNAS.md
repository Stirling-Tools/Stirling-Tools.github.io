---
sidebar_position: 2
id: TrueNAS Install
title: TrueNAS SCALE
description: Install Stirling PDF on TrueNAS SCALE via the custom-app installer
---

# Stirling PDF on TrueNAS SCALE

TrueNAS SCALE (24.10 / Electric Eel and later) uses Docker under the hood and can run Stirling PDF as a **Custom App**. There's no curated TrueChart at the time of writing, so the steps below use the built-in custom-app installer.

## Prerequisites

- TrueNAS SCALE 24.10 (Electric Eel) or newer.
- A pool / dataset where you'll store Stirling PDF's persistent data.
- Apps service enabled (Apps → Configuration).

## 1. Create the dataset

Apps need a dataset. Create one for Stirling PDF:

1. **Datasets** → select your apps pool → **Add Dataset**.
2. Name: `stirling-pdf`.
3. Preset: **Apps**.
4. Save.

Inside it, create five child datasets (each will become a bind mount):

- `configs`
- `logs`
- `customFiles`
- `pipeline`
- `tessdata`

You can do this via **Add Dataset** repeatedly under `stirling-pdf`, or from a shell:

```bash
zfs create -o casesensitivity=sensitive <pool>/ix-apps/stirling-pdf/configs
zfs create -o casesensitivity=sensitive <pool>/ix-apps/stirling-pdf/logs
zfs create -o casesensitivity=sensitive <pool>/ix-apps/stirling-pdf/customFiles
zfs create -o casesensitivity=sensitive <pool>/ix-apps/stirling-pdf/pipeline
zfs create -o casesensitivity=sensitive <pool>/ix-apps/stirling-pdf/tessdata
```

## 2. Set ownership

Stirling PDF runs as UID/GID 1000 inside the container. TrueNAS' default Apps user is UID 568 / GID 568. Either:

**Option A (recommended): set `PUID`/`PGID` to 568 at runtime** (handled in step 3).

**Option B: chown the datasets to 1000**

```bash
chown -R 1000:1000 /mnt/<pool>/ix-apps/stirling-pdf
```

Pick one. Option A is cleaner because you don't fight TrueNAS' own permission model.

## 3. Install as a Custom App

1. **Apps** → **Discover Apps** → click the menu next to "Install Now" and choose **Custom App**.
2. **Application Name**: `stirling-pdf`.
3. **Image Repository**: `docker.stirlingpdf.com/stirlingtools/stirling-pdf`.
4. **Image Tag**: `latest` (or `latest-fat` / `latest-ultra-lite`).

### Networking

- **Port Forward**:
  - Container Port: `8080`
  - Node Port: `30080` (or any unused port between 9000 and 65535)
  - Protocol: TCP

### Environment Variables

Add:

```
PUID=568
PGID=568
SECURITY_ENABLELOGIN=false
LANGS=en_GB
```

Switch `SECURITY_ENABLELOGIN=true` once you have credentials sorted.

### Storage

Add five **Host Path** volumes:

| Host Path | Mount Path |
|---|---|
| `/mnt/<pool>/ix-apps/stirling-pdf/configs` | `/configs` |
| `/mnt/<pool>/ix-apps/stirling-pdf/logs` | `/logs` |
| `/mnt/<pool>/ix-apps/stirling-pdf/customFiles` | `/customFiles` |
| `/mnt/<pool>/ix-apps/stirling-pdf/pipeline` | `/pipeline` |
| `/mnt/<pool>/ix-apps/stirling-pdf/tessdata` | `/usr/share/tessdata` |

### Resource Limits (recommended)

- CPU: 2000m (2 cores)
- Memory: 2Gi (4Gi for `latest-fat`)

### Save

Click **Install**. Wait for the app to reach **Running** state.

## 4. Verify

From a shell or browser on the TrueNAS network:

```bash
curl http://<truenas-ip>:30080/api/v1/info/status
# expected response body contains: UP
```

Open `http://<truenas-ip>:30080` in a browser. You should see the Stirling PDF home page.

## 5. Backups

The `configs` dataset is what matters - it contains `settings.yml` and the H2 database (user accounts, audit logs). Snapshot it on your usual schedule.

## Reverse proxy (optional)

TrueNAS SCALE bundles Traefik in newer releases, or you can point any external reverse proxy at `http://<truenas-ip>:30080`. If your proxy adds a sub-path (e.g. `/pdf`), set the env var:

```
SYSTEM_ROOTURIPATH=/pdf
```

…and have the proxy strip nothing - Stirling PDF will serve from `/pdf` and the bundled healthcheck respects this prefix.

## Uninstalling

1. **Apps** → select `stirling-pdf` → **Delete**.
2. Optionally remove the datasets at `<pool>/ix-apps/stirling-pdf` once you've copied off any data.

## Troubleshooting

- **App stuck "Deploying"**: usually a permission problem. Either chown the host datasets to `1000:1000`, or set `PUID=568 PGID=568` env vars so the container drops to TrueNAS' apps user.
- **Container restarts**: check the container logs via the Apps UI. Common causes: out of memory (raise the limit), or `/configs` not writable.
- **Slow first boot**: the JVM precompiles the AOT cache on first run (~30-60s extra). Subsequent boots are faster.
