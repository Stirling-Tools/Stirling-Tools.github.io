---
title: Where your tools run
sidebar_label: Where tools run
sidebar_position: 3
description: Which desktop app tools run on your computer, which go to Stirling Cloud or your server, and what the cloud badge means.
---

# Where your tools run

Whether your file leaves your computer depends on your [connection mode](./Connection-Modes.md).

## Local Only

- Every tool runs on your computer. Nothing is uploaded.
- Tools the built-in engine can't run show a cloud badge. Running one asks you to sign in to Stirling Cloud or connect to a server.

## Stirling Cloud

- Tools run on your computer whenever the built-in engine can run them. The rest are sent to Stirling Cloud and show a cloud badge.
- Running tools by hand doesn't use credits. AI, processing folders and pipelines always use Stirling Cloud and use credits ([Plans, credits and billing](../Cloud/Plans-and-Billing.md)).

See [What AI tools send](../Cloud/Files-and-Privacy.md#what-ai-tools-send) and [Storage and retention](../Cloud/Files-and-Privacy.md#storage-and-retention).

## Self-Hosted

- Every tool runs on your server, even ones your computer could run.
- If the server can't be reached, tools the built-in engine supports run on your computer until it's back.
- Tools your server has turned off appear dimmed.

## Tools that usually need Cloud or a server

These usually aren't available locally:

- OCR
- Converting Office documents, eBooks, HTML, web pages or email to PDF
- Converting PDF to Word, PowerPoint, RTF, HTML, Markdown, XML, PDF/A, EPUB or CBR
- **Repair**, **Detect & Split Scanned Photos** and **Replace & Invert Color**
- The **Convert images to line art** option in **Compress**

## Features that need Cloud or a server

- **AI assistant** - Stirling Cloud, or your server if its admin has set up AI ([AI assistant](../Tools/Guides/AI-Assistant.md)).
- **Classify** - Stirling Cloud only.
- **Processing folders and pipelines** - see [Processing folders](../Tools/Workspace/Processing-Folders.md).
- **Processor** - not in the desktop app. Use it in a web browser ([Processor](../Processor/Processor.md)).

## Signing with a USB token or smart card

The **USB Token** and **Windows certificate store** options in [Certificate signing](../Tools/Security/Certificate-Signing.md#on-the-desktop-app) exist only in the desktop app, in Local Only or Stirling Cloud mode. The key never leaves your device.
