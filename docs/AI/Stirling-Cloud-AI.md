---
sidebar_position: 1.5
id: Stirling Cloud AI
title: Stirling Cloud AI
description: Run Stirling PDF's AI features on Stirling Cloud, with no engine to host and no provider keys
tags: [AI, Cloud, Self-host, Account linking]
---

# Stirling Cloud AI

Stirling Cloud AI runs the AI features of your self-hosted Stirling PDF on Stirling Cloud. There is no engine container to run, no model provider key to hold, and no models to choose. Usage is billed to the Stirling account the server is linked to.

![AI connection settings with Off, Run your own engine, and Use Stirling Cloud AI](/img/ai/connection-modes.png)

## Before you start

- Link the server to a Stirling account; see [Account linking](../Stirling-Account-Link.md). Only the organization owner can link a server.
- Sign in to Stirling PDF as an administrator.

## Turn it on

1. Open **Settings → AI → AI Engine**.
2. Under **Connection**, select **Use Stirling Cloud AI**. It stays unavailable until the server is linked.
3. Choose whether to **Let Stirling Cloud keep indexed documents**; see [Document questions](#document-questions).
4. Save, then restart Stirling PDF.

Once connected, **Status** at the top of the page shows **Running on Stirling Cloud**.

You can also set it in configuration:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      enabled: true
      mode: CLOUD
      cloudDocumentIndexing: true
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    AIENGINE_ENABLED=true
    AIENGINE_MODE=CLOUD
    AIENGINE_CLOUDDOCUMENTINDEXING=true
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          AIENGINE_ENABLED: "true"
          AIENGINE_MODE: CLOUD
          AIENGINE_CLOUDDOCUMENTINDEXING: "true"
    ```
  </TabItem>
</Tabs>

## Document questions

Every AI tool sends Stirling Cloud the page text it needs to answer. **Let Stirling Cloud keep indexed documents** decides whether Stirling Cloud may also keep that text, indexed, so later questions can search across a document.

When it is off, document questions are unavailable. Text is still sent to answer other requests; it is just not stored.

## What changes in this mode

- **Models & Providers** and **Documents & RAG** settings are managed by Stirling Cloud, so they do not apply.
- **Capabilities** and **Limits & Performance** still apply; see [AI Tools](./AI-Tools.md) and the [AI Settings Reference](./AI-Settings-Reference.md).
- Whatever the AI reads is processed by Stirling Cloud rather than on your own hardware. To keep documents in-house, [run your own engine](./Self-Hosting-the-AI-Engine.md) with [local models](./Model-Providers.md#local-models) instead.

To stop using Stirling Cloud AI, choose **Off** or **Run your own engine**, then restart Stirling PDF.
