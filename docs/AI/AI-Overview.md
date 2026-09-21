---
sidebar_position: 0
id: AI Overview
title: AI Overview
description: What the Stirling AI engine adds to Stirling PDF, and how an administrator turns it on
tags: [AI, Self-host, Getting Started]
---

# AI Overview

AI features come from the Stirling AI engine, a separate service you run alongside the self-hosted Stirling PDF server. AI is off by default.

## What AI adds

- **Chat assistant** - answers questions about attached PDFs, and plans and runs edits and conversions. A plan can only use the operations your deployment has enabled.
- **Maths and figure auditing** - checks arithmetic, table totals and cross-page figures, then reports discrepancies.
- **Review comments** - returns your PDF with sticky-note comments applied.
- **Document creation** - produces a new PDF from a description, with no input file.
- **Document classification** - labels uploaded files automatically, up to 5 labels each. The Classification policy in the Processor uses this.

Each capability has its own switch. See [AI Tools](./AI-Tools.md).

## Turning AI on

- Run the `stirling-engine` container on port **5001**, reachable from the Stirling PDF server. Use the same version tag as the server image.
- Give the engine two API keys: your **LLM key** (Anthropic by default), and your **embedding key**, which indexes documents so they can be searched (VoyageAI by default). Without the embedding key, document uploads and document questions fail.
- Set `STIRLING_ENGINE_SHARED_SECRET` to the same long random value on the engine and the Stirling PDF server, then restart the server after changing `aiEngine.enabled` (`AIENGINE_ENABLED`) or `aiEngine.url` (`AIENGINE_URL`). Login mode (`security.enableLogin`, on by default) and an admin account are required for the AI admin pages.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      enabled: true
      url: http://stirling-pdf-engine:5001
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    AIENGINE_ENABLED=true
    AIENGINE_URL=http://stirling-pdf-engine:5001
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          AIENGINE_ENABLED: "true"
          AIENGINE_URL: "http://stirling-pdf-engine:5001"
    ```
  </TabItem>
</Tabs>

## Related Documentation

- **[Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md)** - running the engine next to Stirling PDF
- **[Model Providers](./Model-Providers.md)** - LLM and embedding provider options
- **[AI Settings Reference](./AI-Settings-Reference.md)** - every AI setting and its default
- **[AI Engine Security](./AI-Security.md)** - shared secret and network exposure
- **[AI Tools](./AI-Tools.md)** - the user-facing capabilities and their switches
