---
sidebar_position: 0
slug: /
---

## Welcome to Stirling PDF

Stirling PDF is a locally hosted web application that allows you to perform various operations on PDF files. With 55+ tools, flexible deployment options, and enterprise features, it's the comprehensive PDF solution for individuals and organizations.

## Benefits of Stirling PDF
- **Extensive PDF Functionality:** 55+ tools covering signing, converting, merging, editing, OCR, and redaction.
- **Stateful Workspace:** Upload once and chain tools together, with full undo and redo history.
- **Runs Anywhere:** Docker, bare metal, Kubernetes, or native desktop apps for Windows, macOS, and Linux.
- **Data Security:** Files are processed by your own instance, never a third-party service.
- **Configure In-App:** Change settings from the UI, or drive everything with environment variables and `settings.yml`.
- **Automation & Integration:** REST API, pipelines, folder scanning, and an MCP server for AI assistants.
- **Enterprise Features:** SSO (OAuth2 and SAML), user management, permission controls, and audit logging.
- **Self-Hosted:** Community-driven with frequent updates and GitHub support.
- **Multi-Language Support:** Available in 40+ languages with active translations.

---

## Installation

Choose how you want to run Stirling PDF based on your needs:

### Desktop Applications

Native apps with system integration:

| Platform | Download | Guide |
|----------|----------|-------|
| **Windows** | [Installer](https://files.stirlingpdf.com/win-installer.exe) | [Windows Guide](./Installation/Windows.md) |
| **Mac** (Universal) | [DMG](https://files.stirlingpdf.com/mac-installer.dmg) | [Mac Guide](./Installation/Mac.md) |
| **Linux** | [DEB](https://files.stirlingpdf.com/linux-installer.deb) | [Unix Guide](./Installation/Unix.md) |

**Features:** Fast startup, "Open with" integration, no login required, optional server connection for advanced tools

---

### Docker Deployment

Recommended for server deployments and organizations:

**Quick Start:**
```bash
docker run -d \
  -p 8080:8080 \
  -v ./stirling-data:/configs \
  docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
```

**Available versions:**
- `latest` - Standard version (recommended)
- `latest-fat` - Extra fonts and tools for highest quality conversions and full format support
- `latest-ultra-lite` - Minimal size for resource-constrained environments

**Full guide:** [Docker Installation Guide](./Installation/Docker%20Install.md)

---

### Manual Server Setup

For bare metal installations or environments without Docker:

1. Download `Stirling-PDF.jar`
2. Install Java 25+
3. Install dependencies (LibreOffice, Tesseract for OCR)
4. Run the JAR file

**Full guide:** [Unix Installation Guide](./Installation/Unix.md)

---

## Documentation Guide

### For Individual Users

**[Tool Reference](./Functionality/Functionality.md)**
Browse all 55+ PDF tools with descriptions

**[Migration Guide](./Migration/Overview)**
Upgrading from V1? What's new in V2 and how to upgrade smoothly

---

### For Organizations & IT Teams

**[Production Deployment Guide](./Server-Admin-Onboarding.md)**
Complete walkthrough: installation - configuration - security - monitoring

**[Paid Offerings (Server & Enterprise)](./Paid-Offerings)**
External databases, Google Drive integration, SSO, advanced monitoring, and priority support

**[Configuration Options](./Configuration/Customisation/Extra-Settings.md)**
All configuration options for Docker and server deployments

---

### For Developers & Integration

**[API Documentation](./API.md)**
Integrate Stirling PDF into your applications and workflows

**[Configuration](./Configuration/Security/System%20and%20Security.md)**
SSO, certificates, security settings, and more

**[Contribute Guide](./Contribute.md)**
Help improve Stirling PDF - development setup and guidelines

---

## Quick Links

- **Questions?** Check our **[FAQ](./FAQ.md)**
- **Issues?** Report on **[GitHub](https://github.com/Stirling-Tools/Stirling-PDF/issues)**
- **Community?** Join our **[Discord](https://discord.gg/Cn8pWhQRxZ)**
