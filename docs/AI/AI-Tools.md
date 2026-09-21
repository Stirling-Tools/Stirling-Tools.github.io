---
sidebar_position: 6
id: AI Tools
title: AI Tools
description: What each AI capability does, where to find it, and how to switch individual ones off
tags: [AI, Self-host, Tools, Configuration]
---

# AI Tools

AI tools require a running [AI engine](./Self-Hosting-the-AI-Engine.md) and `aiEngine.enabled: true`.

## Capabilities

| Capability | Where to use it | Setting under `aiEngine.features` |
|---|---|---|
| Chat and document questions | Open the assistant in the workbench to ask about attached PDFs or request edits. | `chat`, `documentQuestions` |
| Maths auditing | Ask the assistant to check calculations and figures. | `mathAuditor` |
| Review comments | Ask the assistant to add comments to a PDF. | `pdfComment` |
| Document creation | Ask the assistant to create a PDF from a description. | `createPdf` |
| Classification | Label uploaded documents or use the Processor's Classification template. | `classify` |

Document creation requires WeasyPrint on the PDF server. If installed outside `/opt/venv/bin/weasyprint`, set `system.customPaths.operations.weasyprint` to its location.

## Disable a capability

All feature switches default to `true`. Set a switch to `false` and restart Stirling PDF to disable it. For example:

```yaml
aiEngine:
  features:
    createPdf: false
```

The environment equivalent is `AIENGINE_FEATURES_CREATEPDF=false`. To disable conversation entirely, set both `chat` and `documentQuestions` to `false`.

Server-side classification pipelines require `classify` to remain enabled. Use [property-based routing](../Processor/Routing.md) for workflows without AI classification.

See [AI Settings Reference](./AI-Settings-Reference.md) for the complete settings list and [MCP Server](../Configuration/Automation/MCP-Server.md#ai-capabilities) to control AI tools exposed over MCP.
