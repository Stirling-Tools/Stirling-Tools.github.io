---
sidebar_position: 0
slug: /
description: Stirling PDF is a self-hosted PDF platform with 60+ tools for editing, converting, signing and automating documents - your files never leave your infrastructure.
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Stirling PDF

**Stirling PDF is a free PDF platform with 60+ tools** - editing, converting, signing, OCR, redaction, compression and more. Run it on your own infrastructure and there are no per-document costs and nothing leaves your network: files are processed on your servers and deleted automatically once the job is done. If you would rather not run servers, the same tools are available hosted - see [Modes](./Modes-and-Licensing.md) for how each option compares.

It scales with you, from a native desktop app on a laptop, to Docker for a team, to a full server deployment with SSO, audit logging and Kubernetes. And it is not just for the files you open by hand: build [pipelines](./Configuration/Automation/Pipeline.md) that apply the same operations across thousands of documents, drive every tool through the [API](./API.md), or let AI assistants run them for you over [MCP](./Configuration/Automation/MCP-Server.md).

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
- **Automate the repetitive work** - batch processing, [folder scanning](./Configuration/Storage/FolderScanning.md) and [pipelines](./Configuration/Automation/Pipeline.md), plus a full [API](./API.md) for integrating into existing systems.
- **Works with your AI tooling** - the built-in [MCP server](./Configuration/Automation/MCP-Server.md) exposes Stirling's PDF operations to assistants and IDE agents, so they can run them on your behalf.
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
