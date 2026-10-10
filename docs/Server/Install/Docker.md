---
sidebar_position: 1
title: Install with Docker
sidebar_label: Docker
description: Run Stirling PDF in Docker, choose an image, keep your data in volumes and update safely.
---

# Install with Docker

Docker is the recommended way to run a Stirling PDF server. The standard image includes nearly every conversion tool, so there is nothing else to install.

## Quick start

<Tabs groupId="docker-method">
<TabItem value="docker-compose" label="Docker Compose" default>

Create `docker-compose.yml`:

```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    container_name: stirling-pdf
    ports:
      - '8080:8080'
    volumes:
      - ./stirling-data/configs:/configs
      - ./stirling-data/logs:/logs
      - ./stirling-data/customFiles:/customFiles
      - ./stirling-data/pipeline:/pipeline
      - ./stirling-data/tessdata:/usr/share/tessdata
    mem_limit: 8g
    restart: unless-stopped
```

Then start it:

```bash
docker compose up -d
```

</TabItem>
<TabItem value="docker-run" label="docker run">

```bash
docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v ./stirling-data/configs:/configs \
  -v ./stirling-data/logs:/logs \
  -v ./stirling-data/customFiles:/customFiles \
  -v ./stirling-data/pipeline:/pipeline \
  -v ./stirling-data/tessdata:/usr/share/tessdata \
  --memory 8g \
  --restart unless-stopped \
  docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
```

</TabItem>
</Tabs>

Open `http://localhost:8080` and sign in as `admin` / `stirling`. You are asked to set a new password straight away. See [First login](../Server.md#first-login) for other options.

## Choose an image

| Tag | Login and admin settings | Includes | Suggested memory |
|---|---|---|---|
| `latest` | Yes | Every tool except PDF to CBR (needs rar), with LibreOffice, Tesseract, OCRmyPDF, WeasyPrint, Calibre, Ghostscript, QPDF and ImageMagick | 8 GB (4 GB minimum) |
| `latest-fat` | Yes | Everything in `latest`, plus the bundled AI engine | As `latest`, more with AI turned on |
| `latest-ultra-lite` | No | Core PDF tools only. No OCR, Office, HTML or ebook conversions | 2 GB |

Start with `latest`. Switch images by changing the tag and recreating the container. Your volumes carry over.

- **`latest-fat`**: AI is off by default. Set `AIENGINE_ENABLED=true` (or turn AI on in **Settings** and restart the container) to start the engine, then add your model provider keys. See [Run the AI engine](../AI/Run-the-AI-Engine.md#use-the-fat-image).
- **`latest-ultra-lite`** is built without login, so it has no users, single sign-on or admin settings. Configure it with environment variables or `settings.yml`.

All images are built for `amd64` and `arm64`.

### Pin a version

`latest` moves with every release. To control when you upgrade, use a version tag instead: `<version>`, `<version>-fat` or `<version>-ultra-lite`. Version numbers are listed on the [releases page](https://github.com/Stirling-Tools/Stirling-PDF/releases).

### Other registries

The images are also published to Docker Hub and GitHub. Use them if `docker.stirlingpdf.com` is unreachable:

```bash
docker pull stirlingtools/stirling-pdf:latest
docker pull ghcr.io/stirling-tools/stirling-pdf:latest
```

## Volumes

| Container path | What it holds |
|---|---|
| `/configs` | `settings.yml`, `custom_settings.yml`, the built-in database and its backups, and generated keys. Always mount this. |
| `/logs` | Log files. |
| `/customFiles` | Branding overrides and signature files. See [UI and branding](../Customisation/Branding.md). |
| `/pipeline` | Watched and finished folders for [folder scanning](../Storage/Folder-Scanning.md). |
| `/storage` | Files users save on the server, when [file storage](../Storage/File-Storage.md) is on. |
| `/usr/share/tessdata` | Extra OCR language files. See [OCR languages](../Operations/OCR-Languages.md). |

The container runs as UID and GID `1000`. If your host folders belong to another user, set `PUID` and `PGID` to that user's IDs. `UMASK` (default `022`) sets permissions on new files.

## Memory and Java options

The container sizes the Java heap from its memory limit, so set a limit (`mem_limit` or `--memory`) rather than tuning the heap by hand. Add extra JVM flags with `JAVA_CUSTOM_OPTS`. [Performance](../Operations/Performance.md) covers sizing in detail.

## Common settings

Put settings in `/configs/settings.yml`, or pass them as environment variables. Any `settings.yml` key works either way: see [Configuration](../Configuration.md).

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      defaultLocale: de-DE    # default language for new users
    security:
      enableLogin: false      # run without login
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_DEFAULTLOCALE=de-DE
    SECURITY_ENABLELOGIN=false
    ```
  </TabItem>
</Tabs>

To serve on another port, change the host side of the mapping, for example `'9000:8080'`.

## Updating Stirling PDF

<Tabs groupId="docker-method">
<TabItem value="docker-compose" label="Docker Compose" default>

```bash
docker compose pull
docker compose up -d
```

</TabItem>
<TabItem value="docker-run" label="docker run">

```bash
docker pull docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
docker stop stirling-pdf
docker rm stirling-pdf
# then run your original docker run command again
```

</TabItem>
</Tabs>

Your data stays in the volumes. Back up `/configs` before a major upgrade, and read [Upgrading from V1](../Upgrading/Upgrading.md) if you are coming from V1.

## Platform quick starts

These platforms have community-maintained packages that wrap the Docker image. Report problems with the package to its own project, and Stirling PDF problems to the [issue tracker](https://github.com/Stirling-Tools/Stirling-PDF/issues).

<Tabs groupId="docker-platform">
<TabItem value="truenas" label="TrueNAS SCALE" default>

1. Go to **Apps → Discover Apps** and search for "Stirling PDF".
2. Select **Install**, and change the port or storage if needed.
3. Open it from **Apps → Installed**.

Catalog listing: [apps.truenas.com/catalog/stirling-pdf/](https://apps.truenas.com/catalog/stirling-pdf/).

</TabItem>
<TabItem value="unraid" label="Unraid">

1. Install the [Community Applications](https://forums.unraid.net/topic/38582-plug-in-community-applications/) plugin if you don't have it.
2. On the **Apps** tab, search for "Stirling PDF" and select **Install**.
3. Check the paths and variables in the template, then select **Apply**.

The template sets `PUID=99` and `PGID=100` for you.

</TabItem>
<TabItem value="proxmox" label="Proxmox LXC">

The Community Scripts project has a one-line LXC installer. Run it from the Proxmox VE shell:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/ct/stirling-pdf.sh)"
```

When it finishes, open `http://<container-ip>:8080`. Script details: [community-scripts/ProxmoxVE](https://community-scripts.github.io/ProxmoxVE/scripts?id=stirling-pdf).

To run Docker inside an LXC instead, enable nesting (`pct set <ctid> -features nesting=1,keyctl=1`), install Docker and use the compose file above.

</TabItem>
<TabItem value="nas" label="Synology, UGREEN, Asustor">

Marius Hosting has step-by-step guides for [Synology](https://mariushosting.com/how-to-install-stirling-pdf-on-your-synology-nas/), [UGREEN](https://mariushosting.com/how-to-install-stirling-pdf-on-your-ugreen-nas/) and [Asustor](https://mariushosting.com/how-to-install-stirling-pdf-on-your-asustor-nas/).

</TabItem>
<TabItem value="casaos" label="CasaOS / Portainer">

- **Portainer:** go to **Stacks → Add stack** and paste the compose file above.
- **CasaOS:** use **Install a customized app** with the image `docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest`, port `8080`, and bind mounts for the [volumes](#volumes).

</TabItem>
<TabItem value="podman" label="Podman (Quadlet)">

For rootless Podman with systemd, save this as `~/.config/containers/systemd/stirling-pdf.container`:

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

Then run `systemctl --user daemon-reload && systemctl --user start stirling-pdf`.

The `:Z` label is needed on SELinux distributions such as Fedora and RHEL. `UserNS=keep-id` maps your user to the container user, so you don't need `PUID` and `PGID`.

</TabItem>
</Tabs>

If the container won't start or the page won't load, see the [Server FAQ](../FAQ.md).
