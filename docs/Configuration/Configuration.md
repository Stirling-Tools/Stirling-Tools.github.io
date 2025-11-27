---
sidebar_position: 0
slug: /Configuration
title: Configuration Guide
description: Configure Stirling-PDF using environment variables, settings files, or in-app settings
---

# Configuration Guide

Stirling-PDF can be configured in three ways, depending on your deployment and preferences.

## Configuration Methods

### 1. In-App Settings (Recommended)

If you have login enabled, admins can configure everything through the Settings menu in the application.

**To use:**
1. Set `SECURITY_ENABLELOGIN=true`
2. Log in as admin
3. Go to Settings → configure through UI
4. Changes apply immediately, no restart needed

**Best for:** Production deployments with admin users

---

### 2. Environment Variables

Configure via Docker environment variables or system environment variables.

**To use:**
```bash
docker run -d \
  -e SECURITY_ENABLELOGIN=true \
  -e LANGS=en_GB \
  stirlingtools/stirling-pdf:latest
```

**Best for:** Docker deployments, infrastructure-as-code, initial setup

---

### 3. Settings File (settings.yml)

Edit `/configs/settings.yml` directly for advanced configuration.

**To use:**
```yaml
security:
  enableLogin: true
system:
  defaultLocale: en-GB
```

**Best for:** Complex configurations, when you prefer file-based config

---

## Common Settings

### Authentication

Enable user login:
```bash
SECURITY_ENABLELOGIN=true
SECURITY_INITIALLOGIN_USERNAME=admin
SECURITY_INITIALLOGIN_PASSWORD=changeme123
```

Default credentials: `admin` / `stirling` (change immediately after first login)

### Language & Localization

```bash
LANGS=en_GB                    # Available languages
SYSTEM_DEFAULTLOCALE=en-GB     # Default language
```

### Deployment Mode

```bash
MODE=BOTH      # Options: BOTH, FRONTEND, BACKEND
```

### File Upload Limits

```bash
SYSTEM_MAXFILESIZE=2000        # MB
SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE=2000MB
SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE=2000MB
```

### Memory Management

```bash
JAVA_TOOL_OPTIONS="-Xms512m -Xmx4g"  # Min 512MB, Max 4GB RAM
```

---

## Specialized Configuration Guides

For advanced features and specific use cases, see these detailed guides:

### Authentication & Security

**[Single Sign-On (SSO)](./Single%20Sign-On%20Configuration.md)**
- OAuth2 (Google, GitHub, Keycloak, OIDC) - Enterprise only
- SAML2 (Okta, Azure AD) - Enterprise only
- Complete configuration examples

**[System and Security](./System%20and%20Security.md)**
- Split deployment (frontend/backend separation)
- CORS configuration
- Server certificates
- JWT configuration

**[Fail2Ban Integration](./Fail2Ban.md)**
- Protect against brute-force attacks
- Auto-ban after failed login attempts

---

### Features & Customization

**[UI Customization](./UI%20Customisation.md)**
- Branding and logos
- Theme customization
- Custom styling

**[Endpoint/Feature Control](./Endpoint%20or%20Feature%20Customisation.md)**
- Enable/disable specific tools
- Control feature availability by user/role

**[Pipeline (Automation)](./Pipeline.md)**
- Automated workflows
- Folder scanning
- Batch processing
- Multi-step operations

---

### Integration & Storage

**[External Database](./External%20Database.md)**
- PostgreSQL configuration (Pro/Enterprise)
- Database migration
- Backup strategies

**[Google Drive File Picker](./Google%20Drive%20File%20Picker.md)**
- Direct Google Drive integration
- OAuth setup

**[OCR Configuration](./OCR.md)**
- Tesseract language packs
- OCR optimization

**[Usage Monitoring](./Usage%20Monitoring.md)**
- Prometheus metrics (Pro/Enterprise)
- Application monitoring
- Performance tracking

---

### Other Configuration

**[Folder Scanning](./FolderScanning.md)**
- Watch folders for automatic processing

**[Custom Signature Files](./Sign%20with%20custom%20files.md)**
- Pre-loaded signatures for quick signing

**[Extra Settings](./Extra-Settings.md)**
- Logging configuration
- Server settings (port, SSL/TLS)
- Advanced Spring Boot settings

---

## Configuration Priority

When the same setting is defined in multiple places, this is the order of precedence (highest to lowest):

1. **Environment Variables**
2. **settings.yml / In-App Settings**
3. **Default values**

---

## Environment Variable Format

Convert YAML paths to environment variables:

```yaml
# settings.yml
security:
  enableLogin: true
```

Becomes:
```bash
SECURITY_ENABLELOGIN=true
```

**Rules:**
- Uppercase everything
- Replace `.` with `_`
- Nested properties become `PARENT_CHILD`

---

## Troubleshooting

### Settings Not Applied

1. Check configuration priority (env vars override settings.yml)
2. Restart container after changing environment variables
3. Check logs: `docker logs stirling-pdf | grep ERROR`
4. Verify file permissions on `/configs` volume

### Database Issues

Default database location: `/configs/stirling-pdf-DB.mv.db`

If missing:
- Ensure `/configs` volume is mounted
- Check write permissions
- Review startup logs

---

## Next Steps

- **Production Deployment:** See [Production Deployment Guide](../Server-Admin-Onboarding.md)
- **API Usage:** See [API Documentation](../API.md)
- **Tool Reference:** See [Functionality](../Functionality/Functionality.md)
