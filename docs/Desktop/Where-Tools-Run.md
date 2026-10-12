---
title: Where your tools run
sidebar_label: Where tools run
sidebar_position: 3
description: Which desktop app tools run on your computer, which go to Stirling Cloud or your server, and what the cloud badge means.
---

# Where your tools run

Whether your file leaves your computer depends on your [connection mode](./Connection-Modes.md).

If your administrator enables [local document processing](./Managed-Deployment.md#document-privacy), documents stay on the device in every mode. Tools and conversion formats unavailable locally are hidden once capabilities load, and cloud fallback, server storage and shared signing are unavailable. Account and billing requests remain available. The defaults below apply when this policy is not enabled.

## Local Only

- Every tool runs on your computer. Nothing is uploaded.
- Tools the built-in engine can't run show a cloud badge. Running one asks you to sign in to Stirling Cloud or connect to a server.

## Stirling Cloud

- Tools run on your computer whenever the built-in engine can run them. The rest show a cloud badge and are sent to Stirling Cloud ([Files and privacy](../Cloud/Files-and-Privacy.md)).
- Running tools by hand doesn't use credits. AI, processing folders and pipelines always use Stirling Cloud and use credits ([Plans, credits and billing](../Cloud/Plans-and-Billing.md)).

## Self-Hosted

- Every tool runs on your server, even ones your computer could run.
- If the server can't be reached, a **Your Stirling-PDF server is unreachable** banner appears and tools the built-in engine supports run on your computer until it's back.
- Tools your server has turned off appear dimmed.

## Tools that usually need Cloud or a server

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
