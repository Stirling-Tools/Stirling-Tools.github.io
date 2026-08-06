---
sidebar_position: 0
slug: /
description: Stirling PDF is a self-hosted PDF platform with 60+ tools for editing, converting, signing and automating documents - your files never leave your infrastructure.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Stirling PDF

**Stirling PDF is a self-hosted platform for working with PDFs.** It gives you 60+ tools - editing, converting, signing, OCR, redaction, compression and more - behind a single interface you run yourself, so documents are processed on your own infrastructure and deleted automatically when the job is done.

Run it as a desktop app on your laptop, as a Docker container for your whole team, or as a scaled server deployment with SSO and audit logging. Everything the interface can do is also available over the API.

<Tabs groupId="quick-start">
<TabItem value="docker" label="Docker" default>

```bash
docker run -d \
  -p 8080:8080 \
  -v ./stirling-data:/configs \
  stirlingtools/stirling-pdf:latest
```

Open `http://localhost:8080` and you're running. See the [Docker guide](./Installation/Docker%20Install.md) for volumes, versions and compose files.

</TabItem>
<TabItem value="desktop" label="Desktop app">

Native apps with fast startup and "Open with" integration - no login required.

| Platform | Download | Guide |
|----------|----------|-------|
| **Windows** | [Installer](https://files.stirlingpdf.com/win-installer.exe) | [Windows guide](./Installation/Windows.md) |
| **Mac** (Universal) | [DMG](https://files.stirlingpdf.com/mac-installer.dmg) | [Mac guide](./Installation/Mac.md) |
| **Linux** | [DEB](https://files.stirlingpdf.com/linux-installer.deb) | [Unix guide](./Installation/Unix.md) |

</TabItem>
<TabItem value="server" label="Server (JAR)">

For bare metal or environments without Docker:

1. Download `Stirling-PDF.jar`
2. Install Java 25+
3. Install dependencies (LibreOffice, Tesseract for OCR)
4. Run the JAR

See the [Unix installation guide](./Installation/Unix.md) for the full walkthrough.

</TabItem>
</Tabs>

---

## What you can do

- **[Page operations](./Functionality/Page-Operations/Page-Operations.md)** - Merge, split, rotate, reorder, crop and scale, plus a visual multi-tool workbench for editing whole documents at once.
- **[Convert](./Functionality/Convert/Convert.md)** - PDF to and from Word, Excel, PowerPoint, images, HTML and Markdown.
- **[Security](./Functionality/Security/Security.md)** - Add or remove passwords and permissions, digitally sign with certificates, sanitise, and permanently redact content.
- **[Content & editing](./Functionality/Content-Editing/Content-Editing.md)** - Edit text, add stamps and watermarks, fill forms, annotate and compare documents.
- **[Advanced tools](./Functionality/Advanced-Tools.md)** - OCR searchable text, compression, and automated pipelines for repetitive work.

Browse the full [tool reference](./Functionality/Functionality.md) for all 60+ tools.

## Why teams self-host it

- **Your files stay yours** - documents are processed locally and removed automatically after each task, so nothing is retained by a third party.
- **Built for organisations** - SSO, user management and permission controls, with audit logging for compliance.
- **Automate the repetitive work** - batch processing, folder scanning and pipelines, plus a full [API](./API.md) for integrating into existing systems.
- **Scales with you** - from a single desktop install to Docker and Kubernetes deployments.
- **Deeply customisable** - themes, environment variables, and the ability to enable or disable individual tools.
- **Speaks your language** - available in 40+ languages with active community translations.

---

## Where to go next

**Setting it up for yourself**
Pick an install path above, then see [Configuration](./Configuration/Configuration.md) for settings and customisation.

**Deploying it for an organisation**
Follow the [Production Deployment Guide](./Server-Admin-Onboarding.md) for installation, security, monitoring and scaling. [Paid offerings](./Paid-Offerings.md) cover SSO, external databases and priority support.

**Integrating it into your systems**
Start with the [API documentation](./API.md), then [System and Security](./Configuration/Security/System%20and%20Security.md) for authentication and certificates.

**Contributing**
The [contribute guide](./Contribute.md) covers development setup and guidelines.

:::tip Coming from V1?
See the [Migration Guide](./Migration/Overview.md) for what changed and how to upgrade smoothly, or [New Features in V2](./Migration/New-Features.md) for what's been added.
:::

## Get help

- **Questions?** Check the [FAQ](./FAQ.md)
- **Something broken?** Report it on [GitHub](https://github.com/Stirling-Tools/Stirling-PDF/issues)
- **Want to chat?** Join the [Discord](https://discord.gg/Cn8pWhQRxZ)
