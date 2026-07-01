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

:::info Login is ON by default
The default is `security.enableLogin: true`, so a fresh container starts with login **enabled** and creates a default admin account:

```
Username: admin
Password: stirling
```

Change this password immediately after first login. If you want the no-login experience instead (no authentication, no admin account), you must opt out explicitly by setting `SECURITY_ENABLELOGIN=false`. See [Modes](../Modes-and-Licensing.md) for how the deploy modes differ.
:::

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
  -e SYSTEM_DEFAULTLOCALE=en-GB \
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
      - SECURITY_ENABLELOGIN=false      # Opt out of login (default is true / enabled)
      - SYSTEM_DEFAULTLOCALE=en-GB      # Default interface language
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

Several platforms have one-click installs or community packages that wrap the Docker setup. Use these when available - they're maintained by their respective communities and handle the platform-native bits (permissions, networking, backups) for you.

<Tabs groupId="docker-platform">
<TabItem value="truenas" label="TrueNAS SCALE" default>

Available in the **TrueNAS Apps catalog** (Community train).

1. **Apps → Discover Apps**, search for "Stirling PDF".
2. Click **Install**, accept defaults (or customise port / persistence).
3. Open from **Apps → Installed**.

See the catalog listing at [apps.truenas.com/catalog/stirling-pdf/](https://apps.truenas.com/catalog/stirling-pdf/).

</TabItem>
<TabItem value="unraid" label="Unraid">

Available in **Community Applications**. Stirling PDF was the [Unraid App of the Month for February 2026](https://newsletter.unraid.net/p/unraid-february-digest-0617).

1. Install the [Community Applications](https://forums.unraid.net/topic/38582-plug-in-community-applications/) plugin if you don't already have it.
2. **Apps** tab → search "Stirling PDF" → click the result → **Install**.
3. Review the default paths / variables on the template, then **Apply**.

The template populates volumes, ports, and the standard Unraid `PUID=99 PGID=100` env vars for you.

</TabItem>
<TabItem value="proxmox" label="Proxmox LXC">

The **Community Scripts** project provides a one-line LXC installer. From the Proxmox VE shell:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/stirling-pdf.sh)"
```

This creates an LXC, installs Java, LibreOffice, Tesseract, OCRmyPDF, and Stirling PDF as a systemd service. Once finished, browse to `http://<container-ip>:8080`.

Script reference: [community-scripts/ProxmoxVE - stirling-pdf](https://community-scripts.github.io/ProxmoxVE/scripts?id=stirling-pdf).

Prefer Docker-in-LXC instead? Create a Debian/Ubuntu LXC, enable nesting (`pct set <ctid> -features nesting=1,keyctl=1`), install Docker, and use the standard compose at the top of this page.

</TabItem>
<TabItem value="synology" label="Synology DSM">

See the [Marius Hosting Synology guide](https://mariushosting.com/how-to-install-stirling-pdf-on-your-synology-nas/).

</TabItem>
<TabItem value="ugreen" label="UGREEN NAS">

See the [Marius Hosting UGREEN guide](https://mariushosting.com/how-to-install-stirling-pdf-on-your-ugreen-nas/).

</TabItem>
<TabItem value="asustor" label="Asustor NAS">

See the [Marius Hosting Asustor guide](https://mariushosting.com/how-to-install-stirling-pdf-on-your-asustor-nas/).

</TabItem>
<TabItem value="casaos" label="CasaOS / Portainer">

No official store entry, but the standard Docker Compose works fine in any compose-based UI:

- **Portainer**: Stacks → Add stack → paste the compose from the [Full Setup](#full-setup-with-all-features) section.
- **CasaOS**: Use the "Install a customized app" flow with the Docker image `docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest`, port `8080`, and bind mounts for `/configs`, `/logs`, `/customFiles`, `/pipeline`, `/usr/share/tessdata`.

</TabItem>
<TabItem value="coolify" label="Coolify">

Coolify deploys via standard Docker Compose - no special changes needed.

1. **+ New → Resource → Docker Compose**.
2. Paste the same compose from the [Full Setup](#full-setup-with-all-features) section.
3. Deploy.

Coolify handles the reverse proxy and TLS for you.

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
</Tabs>

:::note Community-maintained
The TrueNAS, Unraid, and Proxmox integrations above are community-maintained, not built or operated by Stirling Tools. Report issues with the integration itself to the respective project (TrueNAS Apps, Unraid Community Apps, community-scripts/ProxmoxVE). For Stirling PDF behaviour, use the [Stirling PDF issue tracker](https://github.com/Stirling-Tools/Stirling-PDF/issues).
:::

## Common Configurations

### User Authentication
Login is enabled by default (default admin `admin` / `stirling`). To turn it off and run without authentication, set:
```yaml
environment:
  - SECURITY_ENABLELOGIN=false
```

### Change Interface Language
Set the default UI language (locale codes use a hyphen). Empty/unset auto-detects from the browser and falls back to `en-US`.
```yaml
environment:
  - SYSTEM_DEFAULTLOCALE=es-ES  # Spanish, or en-GB, fr-FR, de-DE, etc.
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
