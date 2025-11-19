---
sidebar_position: 2
id: Docker Install
title: Docker Guide
---

# Docker Installation for Stirling-PDF

Run Stirling-PDF in Docker for easy self-hosting, automatic updates, and flexible deployment.

## Quick Start (Most Users)

The simplest way to run Stirling-PDF:

```bash
docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v ./stirling-data:/configs \
  stirlingtools/stirling-pdf:latest
```

Then open `http://localhost:8080` in your browser!

## Choosing Your Version

Stirling-PDF offers three versions depending on your needs:

| Version | Tag | What's Included | Best For |
|---------|-----|-----------------|----------|
| **Standard** | `latest` | All PDF features | Most users, balanced features & size |
| **Fat** | `latest-fat` | Everything + extra tools | Maximum features, larger container |
| **Ultra-Lite** | `latest-ultra-lite` | Core features only | Limited resources, minimal size |

**Most users should use `latest`** - it has everything you need.

### When to use each version:

**Standard (`latest`)** - Use this if:
- ✅ You want all PDF features
- ✅ You have normal server/computer specs
- ✅ You're not sure which to pick

**Fat (`latest-fat`)** - Use this if:
- 📦 You need every possible conversion format
- 📦 You want all optional tools included
- 📦 Disk space isn't a concern

**Ultra-Lite (`latest-ultra-lite`)** - Use this if:
- 💾 Running on very limited hardware (Raspberry Pi, low-end VPS)
- 💾 Want fastest startup time
- 💾 Only need basic PDF operations

To use a different version, just change the tag:
```bash
docker run -d stirlingtools/stirling-pdf:latest-ultra-lite
```

## Deployment Options (V2.0+)

V2.0 lets you run Stirling-PDF in different ways depending on your needs:

### Simple Deployment (Recommended)

**MODE=BOTH (Default)** - Everything in one container

- ✅ **Easiest setup** - One container does it all
- ✅ **Perfect for most users** - Single server hosting
- ✅ **No extra configuration** - Works out of the box

```bash
docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -e MODE=BOTH \
  stirlingtools/stirling-pdf:latest
```

**Use this if:** You're running on a single server and want the simplest setup.

### Advanced Deployment (Split Frontend/Backend)

For advanced users who need to scale components independently:

**MODE=BACKEND** - Backend API only
- Runs the PDF processing API server
- Multiple frontends can connect to one backend
- Scale processing power independently

**MODE=FRONTEND** - Frontend only
- Serves the React web interface
- Can be deployed to CDN for global distribution
- Multiple instances for load balancing

**Use split mode if:**
- Scaling frontend and backend independently
- CDN deployment for global frontend distribution
- Running multiple frontend instances with shared backend
- Microservices/containerized architecture

### V2.0 Configuration Variables

| Variable | What It Does | When You Need It | Example |
|----------|--------------|------------------|---------|
| `MODE` | Deployment type | Always (defaults to BOTH) | `MODE=BOTH` |
| `BACKEND_INTERNAL_PORT` | Internal backend port | Only for MODE=BOTH customization | `BACKEND_INTERNAL_PORT=8081` |
| `VITE_API_BASE_URL` | Where the backend is located | Required for MODE=FRONTEND | `VITE_API_BASE_URL=http://backend:8080` |

**Most users don't need to set these** - the defaults work great!

## Docker Run Examples

### Basic Command (Minimal Setup)

The simplest way to run Stirling-PDF with just the essentials:

```bash
docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v ./stirling-data:/configs \
  stirlingtools/stirling-pdf:latest
```

Open `http://localhost:8080` and you're ready!

### Full Command (With All Features)

Want OCR, custom settings, and logging? Add more volumes:

```bash
docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v ./stirling-data/tessdata:/usr/share/tessdata \
  -v ./stirling-data/configs:/configs \
  -v ./stirling-data/logs:/logs \
  -v ./stirling-data/pipeline:/pipeline \
  -e LANGS=en_GB \
  stirlingtools/stirling-pdf:latest
```

**What each volume does:**
- `/configs` - Your settings and database
- `/usr/share/tessdata` - OCR language files
- `/logs` - Application logs
- `/pipeline` - Automation configurations

## Docker Compose (Recommended for Production)

Docker Compose makes management easier and is great for production use.

### Simple Setup (MODE=BOTH)

Create a file named `docker-compose.yml`:

```yaml
version: '3.3'
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

**What this does:**
- Runs Stirling-PDF on port 8080
- Stores data in `./stirling-data` folder
- Automatically restarts if it crashes
- Everything in one container (MODE=BOTH is default)

### Split Deployment (Advanced Users)

Want to scale frontend and backend independently? Use this:

Create `docker-compose.yml`:

```yaml
version: '3.3'
services:
  # Backend - PDF processing engine
  stirling-backend:
    image: stirlingtools/stirling-pdf:latest
    container_name: stirling-backend
    ports:
      - '8081:8080'
    volumes:
      - ./stirling-data/tessdata:/usr/share/tessdata
      - ./stirling-data/configs:/configs
      - ./stirling-data/logs:/logs
      - ./stirling-data/pipeline:/pipeline
    environment:
      - MODE=BACKEND                    # Backend only
    restart: unless-stopped

  # Frontend - Web interface
  stirling-frontend:
    image: stirlingtools/stirling-pdf:latest
    container_name: stirling-frontend
    ports:
      - '8080:8080'
    environment:
      - MODE=FRONTEND                               # Frontend only
      - VITE_API_BASE_URL=http://stirling-backend:8080  # Where backend is located
    depends_on:
      - stirling-backend
    restart: unless-stopped
```

**Benefits of split deployment:**
- Scale frontend and backend independently
- Run multiple frontends with one backend
- Deploy frontend globally via CDN
- Better resource allocation

**When to use split:**
- High traffic websites
- Global user base
- Microservices architecture
- Need independent scaling

## Updating Stirling-PDF

### Docker Run
```bash
docker stop stirling-pdf
docker rm stirling-pdf
docker pull stirlingtools/stirling-pdf:latest
# Then run your original docker run command
```

### Docker Compose
```bash
docker-compose down
docker-compose pull
docker-compose up -d
```

Your data is safe in the volumes and will persist across updates!

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

### Multiple Languages
```yaml
environment:
  - LANGS=en_GB,es_ES,fr_FR  # Comma-separated
```

### Custom Port
```yaml
ports:
  - '9000:8080'  # Access at http://localhost:9000
```

## Next Steps

- **Add OCR Languages**: See [OCR Configuration](/Configuration/OCR)
- **Enable Authentication**: See [Security Settings](/Configuration/System%20and%20Security)
- **Setup Automation**: See [Pipeline Configuration](/Configuration/Pipeline)
- **More Settings**: See [Configuration](/Configuration/How%20to%20add%20configurations)

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

**Features not working?**
- Some features need dependencies
- Check logs for missing requirements
- Consider using `latest-fat` for all features
