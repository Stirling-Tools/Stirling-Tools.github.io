---
sidebar_position: 0
id: AI Overview
title: AI Overview
description: What AI adds to Stirling PDF, and the three ways an administrator can run it
tags: [AI, Self-host, Getting Started]
---

# AI Overview

AI adds document questions, editing assistance, and classification to Stirling PDF. AI is off by default.

## Capabilities

- **Chat:** ask questions about attached PDFs and request edits or conversions.
- **Maths auditing:** check arithmetic, table totals, and figures across pages.
- **Review comments:** add comments to a PDF from written instructions.
- **Document creation:** generate a PDF from a description.
- **Classification:** label documents for tagging and [routing](../Processor/Policies/Routing.md).

Administrators can turn individual capabilities on or off under [AI Tools](./AI-Tools.md).

## Choose where AI runs

Open **Settings → Server → AI Engine** as an administrator and choose one of three options under **Connection**:

![AI connection settings with Off, Run your own engine, and Use Stirling Cloud AI](/img/ai/connection-modes.png)

| Option | What it means | Set it up |
|---|---|---|
| **Off** | No AI tools anywhere in the app, and nothing leaves this server. | Default |
| **Run your own engine** | A container you host, pointed at a model provider you choose. Your key, your bill, your data path. | [Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md) |
| **Use Stirling Cloud AI** | No container, provider key, or model choice. The work runs on Stirling Cloud and is billed to the account this server is linked to. | [Stirling Cloud AI](./Stirling-Cloud-AI.md) |

Changes to the connection apply after a restart.

With your own engine, the default providers are Anthropic for language models and VoyageAI for embeddings, and you can use local providers instead; see [Model Providers](./Model-Providers.md). See [AI Security](./AI-Security.md) for where document content is sent and the [AI Settings Reference](./AI-Settings-Reference.md) for every setting.
