---
sidebar_position: 0
id: AI Overview
title: AI Overview
description: What the Stirling AI engine adds to Stirling PDF, and how an administrator turns it on
tags: [AI, Self-host, Getting Started]
---

# AI Overview

The Stirling AI engine adds document questions, editing assistance, and classification to Stirling PDF. Self-hosted installations run it as a separate service alongside the PDF server. AI is disabled by default.

## Capabilities

- **Chat:** ask questions about attached PDFs and request edits or conversions.
- **Maths auditing:** check arithmetic, table totals, and figures across pages.
- **Review comments:** add comments to a PDF from written instructions.
- **Document creation:** generate a PDF from a description.
- **Classification:** label documents for tagging and [routing](../Processor/Routing.md).

Administrators can enable individual capabilities under [AI Tools](./AI-Tools.md).

## Set up AI

1. [Run the AI engine](./Self-Hosting-the-AI-Engine.md) and connect it to Stirling PDF.
2. Choose a language model and an embedding provider in [Model Providers](./Model-Providers.md). Embeddings make documents searchable.
3. Set the same shared secret on both services and enable `aiEngine.enabled`.
4. Restart Stirling PDF, then open **Admin Settings → AI** to check the connection.

The default providers are Anthropic for language models and VoyageAI for embeddings. You can also use local providers. See [AI Security](./AI-Security.md) for where document content is sent and [AI Settings Reference](./AI-Settings-Reference.md) for configuration options.
