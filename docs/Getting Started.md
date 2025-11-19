---
sidebar_position: 0
slug: /
---

## Benefits of Stirling-PDF
- **Extensive PDF Functionality:** Access 60+ tools, including signing, converting, merging, and more.
- **Advanced Customization:** Deep customization, themes, and environment variables.
- **Enterprise Features:** SSO, user management, and permission controls.
- **Data Security:** Local file processing with automatic deletion post-task.
- **Scalability & Automation:** Batch processing with Docker and Kubernetes support.
- **API Integration:** Use APIs for automation and external integrations.
- **Open-Source:** Community-driven with frequent updates and GitHub support.
- **Multi-Language Support:** Available in 38+ languages with active translations.

## Welcome to Stirling-PDF

:::tip Upgrading from V1?
See the **[Migration Guide](./Migration/Overview)** for what's new and how to upgrade smoothly.
:::

Stirling-PDF is a locally hosted web application that allows you to perform various operations on PDF files. With 60+ tools, flexible deployment options, and enterprise features, it's the comprehensive PDF solution for individuals and organizations.

---

## What's New in V2

V2 brings major improvements to performance, workflow, and deployment flexibility:

- **📁 Stateful Processing** - Upload once, use across multiple tools without re-uploading
- **⏮️ Undo & Redo** - Made a mistake? Just undo it! Full version history included
- **🖥️ Native Desktop Apps** - Lightning-fast startup, "Open with" integration, offline capable
- **🔀 Split Deployment** - Scale frontend and backend independently for enterprise use
- **⚙️ In-App Settings** - Configure everything through the UI, no file editing needed

---

## Documentation Guide

### 👤 For Individual Users

**[Tool Reference](./Functionality/Functionality.md)**
Browse all 60+ PDF tools with descriptions and use cases

---

### 🏢 For Organizations & IT Teams

**[Production Deployment Guide](./Server-Admin-Onboarding.md)**
Complete walkthrough: installation → configuration → security → monitoring

**[Pro & Enterprise Features](./Pro.md)**
SSO, advanced monitoring, external databases, and priority support

**[Configuration Options](./Configuration/Extra-Settings.md)**
All configuration options for Docker and server deployments

---

### 🔧 For Developers & Integration

**[API Documentation](./API.md)**
Integrate Stirling-PDF into your applications and workflows

**[Configuration](./Configuration/System%20and%20Security.md)**
SSO, split deployment, certificates, security settings, and more

**[Contribute Guide](./Contribute.md)**
Help improve Stirling-PDF - development setup and guidelines

---

## Installation

Choose how you want to run Stirling-PDF based on your needs:

### 🖥️ Desktop Applications

Native apps with offline support and system integration:

| Platform | Download | Guide |
|----------|----------|-------|
| **Windows** | [Installer](https://files.stirlingpdf.com/win-installer.exe) | [Windows Guide](./Installation/Windows.md) |
| **Mac (Apple Silicon)** | [DMG](https://files.stirlingpdf.com/mac-installer.dmg) | [Mac Guide](./Installation/Mac.md) |
| **Mac (Intel)** | [DMG](https://files.stirlingpdf.com/mac-x86_64-installer.dmg) | [Mac Guide](./Installation/Mac.md) |
| **Linux** | AppImage/DEB/RPM | [Unix Guide](./Installation/Unix.md) |

**Features:** Lightning-fast startup, "Open with" integration, works completely offline

---

### 🐳 Docker Deployment

Recommended for server deployments and organizations:

**Quick Start:**
```bash
docker run -d \
  -p 8080:8080 \
  -v ./stirling-data:/configs \
  stirlingtools/stirling-pdf:latest
```

**Available versions:**
- `latest` - Standard version (recommended)
- `latest-fat` - Includes extra fonts and security features
- `latest-ultra-lite` - Minimal size for resource-constrained environments

**Full guide:** [Docker Installation Guide](./Installation/Docker%20Install.md)

---

### ⚙️ Manual Server Setup

For bare metal installations or environments without Docker:

1. Download `Stirling-PDF.jar`
2. Install Java 21+
3. Install dependencies (LibreOffice, Tesseract for OCR)
4. Run the JAR file

**Full guide:** [Unix Installation Guide](./Installation/Unix.md)

---

## Quick Links

- **Questions?** Check our **[FAQ](./FAQ.md)**
- **Issues?** Report on **[GitHub](https://github.com/Stirling-Tools/Stirling-PDF/issues)**
- **Community?** Join our **[Discord](https://discord.gg/Cn8pWhQRxZ)**
