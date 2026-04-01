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
