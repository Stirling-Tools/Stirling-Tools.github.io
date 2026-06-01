---
sidebar_position: 2
id: Docker Install
title: Docker Guide
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Docker Installation for Stirling PDF

Run Stirling PDF in Docker for easy self-hosting, automatic updates, and flexible deployment.

## Quick Start

<Tabs groupId="docker-method">
<TabItem value="docker-run" label="docker run" default>

```bash
docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v ./stirling-data:/configs \
  stirlingtools/stirling-pdf:latest
```

</TabItem>
<TabItem value="docker-compose" label="docker-compose">

Create `docker-compose.yml`:

```yaml
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
    container_name: stirling-pdf
    ports:
      - '8080:8080'
    volumes:
      - ./stirling-data:/configs
    restart: unless-stopped
```

Then run:
```bash
docker-compose up -d
```

</TabItem>
</Tabs>

Then open `http://localhost:8080` in your browser!

## Choosing Your Version

| Version | Tag | What's Included | Best For |
|---------|-----|-----------------|----------|
| **Standard** | `latest` | All PDF features | Most users, balanced features & size |
| **Fat** | `latest-fat` | Everything + extra fonts & tools | Highest quality conversions, full format support |
| **Ultra-Lite** | `latest-ultra-lite` | Core features only | Limited resources, minimal size |

**Most users should use `latest`** - it has everything you need.

### When to use each version:

**Standard (`latest`)** - You want all PDF features, have normal server specs, or you're not sure which to pick.

**Fat (`latest-fat`)** - You need the highest quality conversions with full font support, every conversion format, and all optional tools. Disk space isn't a concern.

**Ultra-Lite (`latest-ultra-lite`)** - Running on very limited hardware (Raspberry Pi, low-end VPS), want fastest startup, or only need basic PDF operations.

To use a different version, just change the tag:
```bash
docker run -d stirlingtools/stirling-pdf:latest-ultra-lite
```

## Full Setup (With All Features)

Want OCR, custom settings, and logging? Add more volumes:

<Tabs groupId="docker-method">
<TabItem value="docker-run" label="docker run" default>

```bash
docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v ./stirling-data/tessdata:/usr/share/tessdata \
  -v ./stirling-data/configs:/configs \
  -v ./stirling-data/logs:/logs \
  -v ./stirling-data/pipeline:/pipeline \
  -e SECURITY_ENABLELOGIN=false \
  -e LANGS=en_GB \
  stirlingtools/stirling-pdf:latest
```

</TabItem>
<TabItem value="docker-compose" label="docker-compose">

Create `docker-compose.yml`:

```yaml
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
    container_name: stirling-pdf
    ports:
      - '8080:8080'
    volumes:
      - ./stirling-data/tessdata:/usr/share/tessdata  # OCR language files
      - ./stirling-data/configs:/configs               # Settings & database
      - ./stirling-data/logs:/logs                     # Application logs
      - ./stirling-data/pipeline:/pipeline             # Automation configs
    environment:
      - SECURITY_ENABLELOGIN=false    # Set true to enable user authentication
      - LANGS=en_GB                   # Interface language
    restart: unless-stopped
```

Then run:
```bash
docker-compose up -d
```

</TabItem>
</Tabs>

**What each volume does:**
- `/configs` - Your settings and database
- `/usr/share/tessdata` - OCR language files
- `/logs` - Application logs
- `/pipeline` - Automation configurations

## Updating Stirling PDF

<Tabs groupId="docker-method">
<TabItem value="docker-run" label="docker run" default>

```bash
docker stop stirling-pdf
docker rm stirling-pdf
docker pull stirlingtools/stirling-pdf:latest
# Then run your original docker run command
```

</TabItem>
<TabItem value="docker-compose" label="docker-compose">

```bash
docker-compose down
docker-compose pull
docker-compose up -d
```

</TabItem>
</Tabs>

Your data is safe in the volumes and will persist across updates.

## Platform-specific quick starts

Any Docker-capable host runs the same image - the only differences are the platform's UI for setting up containers, and a few platform-native gotchas (UIDs, SELinux labels, nesting flags). Pick your platform:

<Tabs groupId="docker-platform">
<TabItem value="truenas" label="TrueNAS SCALE" default>

TrueNAS SCALE 24.10+ runs the image as a **Custom App**.

1. Create a dataset for app data (e.g. `pool/ix-apps/stirling-pdf/`) with child datasets `configs`, `logs`, `customFiles`, `pipeline`, `tessdata`.
2. **Apps → Discover Apps → Custom App**:
   - Image: `docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest`
   - Port forward: container `8080` → host `30080`
   - Env vars: `PUID=568`, `PGID=568` (TrueNAS apps user)
   - Bind-mount each dataset to its container path (`/configs`, `/logs`, etc.)
3. Install.

The container starts as root, then re-execs as `PUID:PGID`, so 568/568 lets TrueNAS' own permission model continue to work without manual `chown`.

</TabItem>
<TabItem value="synology" label="Synology DSM">

Synology DSM 7+ uses **Container Manager**.

1. Create the folder layout under `/volume1/docker/stirling-pdf/{configs,logs,customFiles,pipeline,tessdata}`.
2. **Container Manager → Project → Create**, paste a compose file using the image and the bind mounts above, with `PUID: "1000" PGID: "1000"`.
3. Build.

DSM's reverse proxy (Control Panel → Login Portal → Reverse Proxy) handles TLS and sub-paths.

</TabItem>
<TabItem value="unraid" label="Unraid">

Unraid uses the standard Docker template.

1. **Docker → Add Container**:
   - Repository: `docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest`
   - Port: container `8080` → host `8080`
   - Paths: `/configs`, `/logs`, `/customFiles`, `/pipeline`, `/usr/share/tessdata` → `/mnt/user/appdata/stirling-pdf/...`
   - Env vars: `PUID=99 PGID=100` (Unraid's `nobody:users`)
2. Apply.

</TabItem>
<TabItem value="podman" label="Podman (Quadlet)">

For rootless Podman with systemd, drop a Quadlet file at `~/.config/containers/systemd/stirling-pdf.container`:

```ini
[Unit]
Description=Stirling PDF

[Container]
Image=docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
PublishPort=8080:8080
Volume=%h/stirling-pdf/configs:/configs:Z
Volume=%h/stirling-pdf/logs:/logs:Z
Volume=%h/stirling-pdf/customFiles:/customFiles:Z
Volume=%h/stirling-pdf/pipeline:/pipeline:Z
Volume=%h/stirling-pdf/tessdata:/usr/share/tessdata:Z
UserNS=keep-id:uid=1000,gid=1000
AutoUpdate=registry

[Install]
WantedBy=default.target
```

Then `systemctl --user daemon-reload && systemctl --user start stirling-pdf`.

The `:Z` label is required on SELinux distros (Fedora/RHEL). `--userns=keep-id` sidesteps the `PUID`/`PGID` remap, which is skipped under rootless Podman.

</TabItem>
<TabItem value="proxmox" label="Proxmox LXC">

Run Docker inside an LXC for the smallest footprint:

1. Create an unprivileged LXC (Debian 12 or Ubuntu 24.04, 2 GB RAM, 16 GB disk).
2. Enable nesting from the Proxmox shell:
   ```bash
   pct set <ctid> -features nesting=1,keyctl=1
   ```
3. Inside the LXC, install Docker the usual way, then run the [Quick Start](#quick-start) or [Full Setup](#full-setup-with-all-features) compose at the top of this page.

Proxmox's built-in CT backups capture both the container and the Docker volumes in one snapshot.

</TabItem>
</Tabs>

## Common Configurations

### Enable User Authentication
```yaml
environment:
  - SECURITY_ENABLELOGIN=true
```

### Change Interface Language
```yaml
environment:
  - LANGS=es_ES  # Spanish, or en_GB, fr_FR, de_DE, etc.
```

### Custom Port
```yaml
ports:
  - '9000:8080'  # Access at http://localhost:9000
```

## Next Steps

- **Add OCR Languages**: See [OCR Configuration](../Configuration/OCR.md)
- **Enable Authentication**: See [Security Settings](../Configuration/System%20and%20Security.md)
- **Setup Automation**: See [Pipeline Configuration](../Configuration/Pipeline.md)
- **More Settings**: See [Configuration](../Configuration/Configuration.md)

## Troubleshooting

**Can't access at localhost:8080?**
- Check if port 8080 is already in use
- Try a different port: `-p 9000:8080`
- Check firewall settings

**Permission errors with volumes?**
- Make sure the directories exist
- Check folder permissions: `chmod -R 755 ./stirling-data`

**Container keeps restarting?**
- Check logs: `docker logs stirling-pdf`
- Check system resources (RAM, disk space)
- Try ultra-lite version for limited hardware
