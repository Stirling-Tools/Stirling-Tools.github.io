---
sidebar_position: 0
slug: /
id: Getting Started
title: Welcome to Stirling PDF
sidebar_label: Getting Started
description: What Stirling PDF is, how to install it, and where to go next in the documentation
tags:
  - Getting Started
  - Installation
  - Overview
  - Self-host
---

# Welcome to Stirling PDF

Stirling PDF provides tools for signing, converting, merging, editing, OCR and redaction, with self-hosted and desktop deployment options.

---

## Benefits of Stirling PDF

- **Extensive PDF Functionality:** 55+ tools covering signing, converting, merging, editing, OCR, and redaction.
- **Stateful Workspace:** Upload once and chain tools together, with full undo and redo history.
- **Runs Anywhere:** Docker, bare metal, Kubernetes, or native desktop apps for Windows, macOS, and Linux.
- **Processing location:** Self-hosted tools process files on your instance. Desktop tools use the local backend where supported; tools routed to Stirling Cloud or a connected server send their inputs there.
- **Configure In-App:** Change settings from the UI, or drive everything with environment variables and `settings.yml`.
- **Automation & Integration:** REST API and an MCP server for AI assistants.
- **Stirling Processor:** Saved sources, policies, and pipelines that process documents without anyone opening the editor.
- **AI Engine:** An optional companion service that adds AI capabilities to the app once you run it and enable it.
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

**[Migration Guide](./Migration/Overview.md)**
The upgrade path from Stirling PDF V1 to V2, and what to check before you upgrade

---

### For Organizations & IT Teams

**[Production Deployment Guide](./Server-Admin-Onboarding.md)**
Complete walkthrough: installation - configuration - security - monitoring

**[Stirling Processor](./Processor/Processor.md)**
Sources, policies, and pipelines that run document work on a schedule, on a folder drop, or on demand

**[AI Overview](./AI/AI-Overview.md)**
The AI engine that runs alongside the server, what it adds, and how to turn it on

**[Paid Offerings (Team & Enterprise)](./Paid-Offerings.md)**
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

## Related Documentation

- **[FAQ](./FAQ.md)** - answers to the questions that come up most often
- **[Tool Reference](./Functionality/Functionality.md)** - every PDF tool, with descriptions
- **[Production Deployment Guide](./Server-Admin-Onboarding.md)** - installation, configuration, security, and monitoring end to end
- **[GitHub Issues](https://github.com/Stirling-Tools/Stirling-PDF/issues)** - report a bug or request a feature
- **[Discord](https://discord.gg/Cn8pWhQRxZ)** - community support and discussion
