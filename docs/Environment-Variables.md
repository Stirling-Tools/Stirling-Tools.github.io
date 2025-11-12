---
sidebar_position: 4
description: User-friendly guide to configuring Stirling-PDF with environment variables
---

# Environment Variables Guide

Configure Stirling-PDF easily with environment variables - no need to edit config files!

:::tip V2.0 - In-App Settings Available!
If you have login enabled and are an admin user, you can configure all settings through the **Settings** menu in the application. This is often easier than managing environment variables or config files.

**To use in-app settings:**
1. Set `SECURITY_ENABLELOGIN=true`
2. Log in as admin
3. Go to Settings in the app
4. Configure everything through the UI

Environment variables still work and can be used for initial deployment or when you prefer infrastructure-as-code.
:::

## About This Guide

This guide covers environment variables for configuring Stirling-PDF. You can also:
- **V2.0 Users**: Use in-app Settings menu (recommended if you have login enabled)
- **All Versions**: Edit `settings.yml` file directly

Environment variables are useful for Docker deployments and infrastructure-as-code setups.

## Quick Reference

### Most Common Settings

These are the settings you'll use most often:

| Variable | What It Does | Example | Default |
|----------|--------------|---------|---------|
| `SECURITY_ENABLELOGIN` | Require login to use Stirling-PDF | `true` or `false` | `false` |
| `LANGS` | Interface language(s) | `en_GB` or `en_GB,es_ES,fr_FR` | `en_GB` |
| `MODE` | Deployment type (V2 only) | `BOTH`, `FRONTEND`, or `BACKEND` | `BOTH` |
| `SYSTEM_DEFAULTLOCALE` | Default language when users first visit | `en-GB`, `es-ES`, `fr-FR`, etc. | `en-GB` |

### Quick Start Examples

**No login required (public access):**
```bash
docker run -d \
  -e SECURITY_ENABLELOGIN=false \
  stirlingtools/stirling-pdf:latest
```

**With login required:**
```bash
docker run -d \
  -e SECURITY_ENABLELOGIN=true \
  -e SECURITY_INITIALLOGIN_USERNAME=admin \
  -e SECURITY_INITIALLOGIN_PASSWORD=yourpassword \
  stirlingtools/stirling-pdf:latest
```

**Multiple languages:**
```bash
docker run -d \
  -e LANGS=en_GB,es_ES,fr_FR,de_DE \
  -e SYSTEM_DEFAULTLOCALE=en-GB \
  stirlingtools/stirling-pdf:latest
```

## Authentication & Security

### Enable Login

Require users to log in before using Stirling-PDF:

```yaml
environment:
  - SECURITY_ENABLELOGIN=true
  - SECURITY_INITIALLOGIN_USERNAME=admin
  - SECURITY_INITIALLOGIN_PASSWORD=changeme123
```

**First time setup:**
1. Set these variables
2. Start Stirling-PDF
3. Log in with the username/password you set
4. **Change the password immediately** after first login
5. Create additional user accounts from the admin panel

### Lockout Settings

Protect against brute-force attacks:

```yaml
environment:
  - SECURITY_LOGINATTEMPTCOUNT=5        # Lock after 5 failed attempts
  - SECURITY_LOGINRESETTIMEMINUTES=120  # Keep locked for 2 hours
```

**What this does:**
- User account locks after 5 wrong passwords
- Account unlocks automatically after 2 hours
- Prevents password guessing attacks

## Language & Localization

### Single Language

Set one language for the interface:

```yaml
environment:
  - LANGS=es_ES  # Spanish
```

**Available languages:**
- `en_GB` - English (UK)
- `en_US` - English (US)
- `es_ES` - Spanish
- `fr_FR` - French
- `de_DE` - German
- `it_IT` - Italian
- `pt_BR` - Portuguese (Brazil)
- `zh_CN` - Chinese (Simplified)
- `ja_JP` - Japanese
- `ar_AR` - Arabic
- And 20+ more!

### Multiple Languages

Let users choose their language:

```yaml
environment:
  - LANGS=en_GB,es_ES,fr_FR,de_DE,it_IT
  - SYSTEM_DEFAULTLOCALE=en-GB  # Default when first visiting
```

Users can change language from the language picker in the interface.

## V2 Deployment Modes

### Simple Mode (Default)

Everything in one container:

```yaml
environment:
  - MODE=BOTH  # Frontend + Backend together
```

**Use this if:** Running on a single server (most common).

### Split Mode (Advanced)

Separate frontend and backend:

**Backend container:**
```yaml
environment:
  - MODE=BACKEND
```

**Frontend container:**
```yaml
environment:
  - MODE=FRONTEND
  - VITE_API_BASE_URL=http://your-backend-server:8080
```

**Use this if:** Scaling independently or serving from CDN.

## Branding & Customization

### Application Name

Change "Stirling-PDF" to your own name:

```yaml
environment:
  - UI_APPNAME=My Company PDFs
  - UI_HOMEDESCRIPTION=Custom description text
```

### Homepage Customization

```yaml
environment:
  - UI_APPNAME=Acme Corp PDF Tools
  - UI_HOMEDESCRIPTION=PDF tools for Acme employees
```

## Performance & Resources

### Memory Settings

For large file processing:

```bash
docker run -d \
  -e JAVA_TOOL_OPTIONS="-Xms512m -Xmx4g" \
  stirlingtools/stirling-pdf:latest
```

**What this means:**
- `-Xms512m` - Start with 512MB RAM
- `-Xmx4g` - Maximum 4GB RAM

**Adjust based on your needs:**
- Small server: `-Xmx1g` (1GB max)
- Medium server: `-Xmx2g` (2GB max)
- Large server: `-Xmx4g` (4GB max)
- High-volume: `-Xmx8g` (8GB max)

### Disable Features for Lower Memory

Running on limited hardware?

```yaml
environment:
  - DOCKER_ENABLE_SECURITY=false  # Saves ~50MB RAM
  - DISABLE_ADDITIONAL_FEATURES=true  # Disables Pro features
```

## File Handling

### Maximum Upload Size

Allow larger file uploads:

```yaml
environment:
  - SERVER_SERVLET_SESSION_TIMEOUT=24h
  - SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE=1000MB
  - SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE=1000MB
```

**Recommendations:**
- Personal use: 100MB is usually enough
- Business use: 500MB for large documents
- Enterprise: 1000MB+ for very large files

### Temporary File Cleanup

```yaml
environment:
  - SYSTEM_DELETETMPDIRONFRESHSTART=true  # Clean temp files on startup
```

## OCR (Text Recognition)

### OCR Languages

Add languages for text recognition in PDFs:

```yaml
environment:
  - LANGS=en_GB
volumes:
  - ./tessdata:/usr/share/tessdata  # Place language files here
```

**To add OCR languages:**
1. Download language files from [Tesseract Languages](https://github.com/tesseract-ocr/tessdata)
2. Place `.traineddata` files in the `tessdata` volume
3. Restart Stirling-PDF

**Popular OCR languages:**
- `eng.traineddata` - English (usually included)
- `spa.traineddata` - Spanish
- `fra.traineddata` - French
- `deu.traineddata` - German
- `chi_sim.traineddata` - Chinese Simplified

## Logging

### Enable Detailed Logs

For troubleshooting:

```yaml
environment:
  - LOGGING_LEVEL_ROOT=DEBUG
volumes:
  - ./logs:/logs  # Save logs to this folder
```

**Log levels:**
- `ERROR` - Only errors (minimal logging)
- `WARN` - Warnings and errors
- `INFO` - Normal logging (default)
- `DEBUG` - Detailed logging (for troubleshooting)
- `TRACE` - Very detailed (for developers)

## Analytics & Telemetry

### Disable Analytics

Completely disable usage analytics:

```yaml
environment:
  - METRICS_ENABLED=false
```

**What this does:**
- No usage statistics collected
- No anonymous telemetry sent
- Complete privacy

## Advanced Settings

### Custom Backend Port (MODE=BOTH)

```yaml
environment:
  - MODE=BOTH
  - BACKEND_INTERNAL_PORT=8081  # Backend runs on internal port 8081
```

### API-Only Mode

Disable the web interface, only expose API:

```yaml
environment:
  - ENDPOINTS_TOREMOVE=login,account  # Remove web-only endpoints
```

### Custom Endpoints

Disable specific features:

```yaml
environment:
  - ENDPOINTS_TOREMOVE=compress-pdf,merge-pdfs
  - ENDPOINTS_GROUPSTOREMOVE=Conversion  # Remove entire category
```

## Complete Example

A typical production setup:

```yaml
version: '3.3'
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
    container_name: stirling-pdf
    ports:
      - '8080:8080'
    volumes:
      - ./stirling-data/tessdata:/usr/share/tessdata
      - ./stirling-data/configs:/configs
      - ./stirling-data/logs:/logs
      - ./stirling-data/pipeline:/pipeline
    environment:
      # Security
      - SECURITY_ENABLELOGIN=true
      - SECURITY_INITIALLOGIN_USERNAME=admin
      - SECURITY_INITIALLOGIN_PASSWORD=ChangeMe123!
      - SECURITY_LOGINATTEMPTCOUNT=5
      - SECURITY_LOGINRESETTIMEMINUTES=120

      # Language
      - LANGS=en_GB,es_ES,fr_FR,de_DE
      - SYSTEM_DEFAULTLOCALE=en-GB

      # Branding
      - UI_APPNAME=Company PDF Tools
      - UI_HOMEDESCRIPTION=PDF tools for employees

      # Performance
      - JAVA_TOOL_OPTIONS=-Xms512m -Xmx2g

      # Features
      - SYSTEM_DELETETMPDIRONFRESHSTART=true

      # Logging
      - LOGGING_LEVEL_ROOT=INFO

    restart: unless-stopped
```

## Environment Variable Format

Convert YAML settings to environment variables:

**YAML format:**
```yaml
security:
  enableLogin: true
  loginAttemptCount: 5
```

**Environment variable format:**
```bash
SECURITY_ENABLELOGIN=true
SECURITY_LOGINATTEMPTCOUNT=5
```

**Rules:**
1. Replace `.` with `_` (underscores)
2. Make everything UPPERCASE
3. Remove quotes around values
4. Separate nested levels with `_`

**Examples:**
- `security.enableLogin` → `SECURITY_ENABLELOGIN`
- `system.defaultLocale` → `SYSTEM_DEFAULTLOCALE`
- `ui.appName` → `UI_APPNAME`

## Troubleshooting

**Settings not applying?**
- Check spelling - variables are case-sensitive
- Restart container after changing variables
- Check logs for errors: `docker logs stirling-pdf`

**Where do I put environment variables?**
- Docker run: Use `-e VARIABLE=value`
- Docker Compose: Under `environment:` section
- Kubernetes: In ConfigMap or pod spec

**Can I use both settings.yml and environment variables?**
- Yes! Environment variables override settings.yml
- Useful for keeping secrets out of files

## Next Steps

- **More Configuration**: See [How to add configurations](/Advanced%20Configuration/How%20to%20add%20configurations) for complete YAML reference
- **Security Setup**: See [System and Security](/Advanced%20Configuration/System%20and%20Security) for authentication
- **SSO Configuration**: See [Single Sign-On](/Advanced%20Configuration/Single%20Sign-On%20Configuration) for OAuth/SAML
- **UI Customization**: See [UI Customisation](/Advanced%20Configuration/UI%20Customisation) for theming
