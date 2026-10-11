---
title: FAQ
sidebar_label: FAQ
sidebar_position: 1
description: Answers for every Stirling PDF product - reporting bugs, getting help, tracking and privacy, where files are processed, and common tool questions.
---

# FAQ

For running a server, see the [Server FAQ](../Server/FAQ.md).

## Get help

- **Questions and setup help:** the [Discord community](https://discord.gg/Cn8pWhQRxZ).
- **Enterprise customers and licensing:** support@stirlingpdf.com.
- **Security vulnerabilities:** security@stirlingpdf.com, or [report a vulnerability on GitHub](https://github.com/Stirling-Tools/Stirling-PDF/security). Don't post them in a public issue.

## How do I report a bug or ask for a feature?

Open an issue on [GitHub](https://github.com/Stirling-Tools/Stirling-PDF/issues) and choose **Bug Report** or **Feature Request**. For a bug, include the steps, which product and version you use, and:

- for a self-hosted server, a diagnostics bundle ([Diagnostics](../Server/Operations/Diagnostics.md))
- for the desktop app, your connection mode and the log files from [Data and log locations](../Desktop/Updates-and-Data.md#data-and-log-locations)

## Does Stirling PDF track me?

Usage analytics are opt-in, and Stirling PDF never tracks the content of your documents. When the **How we use Cookies** banner appears, click **No Thanks** to allow only essential cookies.

To change your choice later, click **Manage** next to **Cookie Preferences**:

- **Stirling Cloud:** in **Settings → Legal**.
- **Desktop app and self-hosted servers:** in **Settings → About**.

On a self-hosted server, your admin decides whether analytics are on at all. If they're off, you won't see the banner ([Analytics and telemetry](../Server/Analytics-and-Telemetry.md)).

## Where are my files processed?

Files in your workspace are kept in your browser, or on your computer in the desktop app. They're only stored on a server if you save them there ([My files and sharing](./Workspace/Files-and-Sharing.md)).

- **Stirling Cloud:** viewing, rearranging pages and managing files happen in your browser. Tools such as compress, OCR and convert send the file to Stirling's servers and return the result. See [Files and privacy](../Cloud/Files-and-Privacy.md).
- **Desktop app:** it depends on the connection mode. In **Local Only** mode, nothing leaves your computer, and a tool that can't run locally is blocked, not uploaded. In **Stirling Cloud** mode, tools with a cloud badge, AI and processing folders use Stirling Cloud. In **Self-Hosted** mode, tools run on your organisation's server. See [Where your tools run](../Desktop/Where-Tools-Run.md).
- **Self-hosted server:** tools run on your organisation's server.

## Can I remove an existing watermark?

No. Stirling PDF can add watermarks with **Add Watermark**, but has no tool to remove one that's already in a PDF.

## How do I add a line break in a stamp or watermark?

Type `\n` where you want the break in the text of **Add Stamp to PDF** or **Add Watermark**.
