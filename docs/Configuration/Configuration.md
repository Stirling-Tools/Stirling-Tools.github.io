---
sidebar_position: 0
slug: /Configuration
title: Configuration Guide
description: Configure Stirling PDF using environment variables, settings files, or in-app settings
---

# Configuration Guide

Stirling PDF can be configured in three ways, depending on your deployment and preferences.

## Configuration Methods

### 1. In-App Settings (Recommended)

With login enabled, administrators can configure the settings exposed in the application's Settings menu. Other server settings use the configuration file or environment variables.

**To use:**
1. Set `SECURITY_ENABLELOGIN=true`
2. Log in as admin
3. Go to Settings → configure through UI
4. Save changes and follow any restart prompt to apply pending server settings

**Best for:** Production deployments with admin users

---

### 2. Environment Variables

Configure via Docker environment variables or system environment variables.

**To use:**
```bash
docker run -d \
  -e SECURITY_ENABLELOGIN=true \
  -e SYSTEM_DEFAULTLOCALE=en-US \
  docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
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
  defaultLocale: en-US
```

**Best for:** Complex configurations, when you prefer file-based config

---

## Common Settings

### Authentication

**Note:** Authentication and additional features are included by default in:
- **Docker**: All images except ultra-lite (authentication is enabled by default)
- **JAR**: [Stirling-PDF-with-login.jar](https://files.stirlingpdf.com/Stirling-PDF-with-login.jar) **(Recommended)**

The plain [Stirling-PDF.jar](https://files.stirlingpdf.com/Stirling-PDF.jar) does not include authentication or additional features.

Configure user login:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true
      initialLogin:
        username: admin
        password: changeme123
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_ENABLELOGIN=true
    SECURITY_INITIALLOGIN_USERNAME=admin
    SECURITY_INITIALLOGIN_PASSWORD=changeme123
    ```
  </TabItem>
</Tabs>

Default credentials: `admin` / `stirling` (change immediately after first login)

For more details, see [System and Security Configuration](./Security/System%20and%20Security.md).

### Language & Localization

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    ui:
      languages: []        # Available languages (empty = all enabled), e.g. ["en_US", "de_DE"]
    system:
      defaultLocale: en-US # Default language for new users
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    UI_LANGUAGES=en_US,de_DE       # Restrict available languages (omit to enable all)
    SYSTEM_DEFAULTLOCALE=en-US     # Default language
    ```
  </TabItem>
</Tabs>

Leaving `defaultLocale` empty (the default) auto-detects the language from the browser and falls back to `en-US` if no preference is found.

**How language selection works:**

Stirling PDF determines the interface language using this priority order:

1. **User's manual selection** (highest priority)
   - When a user clicks the language globe icon and selects a language
   - Choice is stored in browser's localStorage (persists across sessions)
   - Storage key: `i18nextLng`

2. **System default locale**
   - Set via `SYSTEM_DEFAULTLOCALE` or `system.defaultLocale`
   - When configured, it overrides the browser's detected language for users who have not made a manual selection

3. **Browser's language preference**
   - Automatically detected from the browser's language setting
   - Example: Firefox set to Swedish (sv-SE) shows Swedish UI when no `defaultLocale` is configured

4. **Fallback** (lowest priority)
   - `en-US` is used when none of the above resolve to an available language

**Example:**
- Config: `SYSTEM_DEFAULTLOCALE=en-US`
- Browser: Swedish (sv-SE)
- Result: UI shows English (US) (the configured default overrides the browser preference)

If `defaultLocale` is left empty (the default), the browser-detected language is used instead. Users can always override either choice by manually selecting a language via the language globe icon.

> **Tip**: Set `SYSTEM_DEFAULTLOCALE` to your organization's primary language. Users can always override it using the language selector in the top-right corner.

### File Upload Limits

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      fileUploadLimit: "500MB"  # 0-999 followed by KB, MB or GB. Empty = no limit
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_FILEUPLOADLIMIT=500MB
    ```
  </TabItem>
</Tabs>

The limit applies to each file and to the whole request. If it is unset, the limit is 2000 MB.

### Memory Management

```bash
JAVA_TOOL_OPTIONS="-Xms512m -Xmx4g"  # Min 512MB, Max 4GB RAM
```

---

## Specialized Configuration Guides

For advanced features and specific use cases, see these detailed guides:

### Authentication & Security

**[Single Sign-On (SSO)](./Security/Single%20Sign-On%20Configuration.md)**
- OAuth2 (Google, GitHub, Keycloak, OIDC) - free on every plan
- SAML2 (Okta, Azure AD) - Enterprise tier
- Complete configuration examples

**[System and Security](./Security/System%20and%20Security.md)**
- Server certificates
- JWT configuration

**[Fail2Ban Integration](./Security/Fail2Ban.md)**
- Protect against brute-force attacks
- Auto-ban after failed login attempts

---

### Features & Customization

**[UI Customization](./Customisation/UI%20Customisation.md)**
- Branding and logos
- Theme customization
- Custom styling

**[Endpoint/Feature Control](./Customisation/Endpoint%20or%20Feature%20Customisation.md)**
- Enable/disable specific tools
- Control feature availability by user/role

**[Pipeline (Automation)](./Automation/Pipeline.md)**
- Automated workflows
- Folder scanning
- Batch processing
- Multi-step operations

**[Stirling Processor](../Processor/Processor.md)**
- Connect sources and automate document processing
- Setup: [Sources](../Processor/Sources.md), [Policies](../Processor/Policies/Policies.md), [Pipelines](../Processor/Pipelines.md), [Integrations](../Processor/Integrations.md)
- Processing activity: [Documents](../Processor/Documents.md)
- Folder permissions and network access: [Setup and access](../Processor/Setup-and-Access.md)

**[AI Overview](../AI/AI-Overview.md)**
- Available AI features and setup
- Running it: [Self-Hosting the AI Engine](../AI/Self-Hosting-the-AI-Engine.md), [Model Providers](../AI/Model-Providers.md), [Documents and Retrieval](../AI/Documents-and-RAG.md)
- Configuration options: [AI Settings Reference](../AI/AI-Settings-Reference.md)
- Securing and scoping it: [AI Security](../AI/AI-Security.md), [AI Tools](../AI/AI-Tools.md)

---

### Integration & Storage

**[External Database](./Storage/External%20Database.md)**
- PostgreSQL configuration (Server or Enterprise)
- Database migration
- Backup strategies

**[Google Drive File Picker](./Storage/Google%20Drive%20File%20Picker.md)**
- Direct Google Drive integration
- OAuth setup

**[MCP Server](./Automation/MCP-Server.md)**
- Expose Stirling PDF tools over the Model Context Protocol
- OAuth2 or API-key authentication
- Operation allow/deny lists

**[S3 / Object Storage](./Storage/File%20Sharing%20and%20Storage.md)**
- Store uploads and job artifacts in S3-compatible object storage
- Shared storage for multi-node deployments

**[Telegram Bot](./Automation/Telegram%20Bot.md)**
- Run a Telegram bot that processes PDFs sent in chat

**[OCR Configuration](./Operations/OCR.md)**
- Tesseract language packs
- OCR optimization

**[Usage Monitoring](./Automation/Usage%20Monitoring.md)**
- Prometheus metrics (Enterprise)
- Application monitoring
- Performance tracking

---

### Performance & Scaling

**[Performance Optimization & Sizing](./Operations/Performance-Optimization.md)**
- Resource sizing, JVM tuning, memory model, and scaling guidance

**[Clustering](./Operations/Clustering.md)**
- The `cluster` settings block and the Valkey backplane
- Several nodes behind a load balancer with a shared database and object store

**[Process Limits](./Operations/Process-Limits.md)**
- Session limits and timeouts for external tools

**[LibreOffice Parallel Processing](./Operations/LibreOffice-Parallel-Processing.md)**
- Configure multiple LibreOffice instances for faster document conversion
- Local UNO server pool and remote UNO server endpoints

---

### Diagnostics & Support

**[Diagnostics & Reporting Issues](./Operations/Diagnostics.md)**
- Built-in diagnostics tool for Docker containers
- How to report issues via GitHub, Discord, and email

---

### Other Configuration

**[Folder Scanning](./Storage/FolderScanning.md)**
- Watch folders for automatic processing

**[Custom Signature Files](./Security/Sign%20with%20custom%20files.md)**
- Pre-loaded signatures for quick signing

**[Account linking](../Stirling-Account-Link.md)**
- Link a self-hosted deployment to a Stirling account for metered work
- Processing allowances and synchronization

**[Extra Settings](./Customisation/Extra-Settings.md)**
- Logging configuration
- Server settings (port, SSL/TLS)
- Advanced Spring Boot settings
- `custom_settings.yml`, which overrides `settings.yml`

---

## Configuration Priority

When the same setting is defined in multiple places, this is the order of precedence (highest to lowest):

1. **Environment Variables**, with the exception of `SYSTEMFILEUPLOADLIMIT` and `SYSTEM_MAXFILESIZE`, which apply only when `system.fileUploadLimit` has resolved empty
2. **custom_settings.yml** (see [Extra Settings](./Customisation/Extra-Settings.md))
3. **settings.yml / In-App Settings**
4. **Default values**

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
- Drop camelCase boundaries and hyphens, so `pdfEditor.fallback-font` becomes `PDFEDITOR_FALLBACKFONT`

---

## Troubleshooting

### Settings Not Applied

1. Check configuration priority (env vars override `custom_settings.yml`, which overrides `settings.yml`), remembering that `SYSTEMFILEUPLOADLIMIT` and `SYSTEM_MAXFILESIZE` are the exception and lose to either file
2. Restart container after changing environment variables
3. Check logs: `docker logs stirling-pdf | grep ERROR`
4. Verify file permissions on `/configs` volume

### Database Issues

Default database location: `/configs/stirling-pdf-DB-<schema-version>.mv.db` (the schema version is part of the filename, e.g. `/configs/stirling-pdf-DB-2.3.232.mv.db`).

If missing:
- Ensure `/configs` volume is mounted
- Check write permissions
- Review startup logs

---

## Next Steps

- **Production Deployment:** See [Production Deployment Guide](../Server-Admin-Onboarding.md)
- **API Usage:** See [API Documentation](../API.md)
- **Tool Reference:** See [Functionality](../Functionality/Functionality.md)
- **Troubleshooting:** See [Diagnostics & Reporting Issues](./Operations/Diagnostics.md)
