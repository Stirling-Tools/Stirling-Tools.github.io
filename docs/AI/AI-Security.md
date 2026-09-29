---
sidebar_position: 5
id: AI Security
title: AI Security
description: Security settings for the self-hosted AI engine and what data leaves your network
tags: [AI, Security, Self-host, Hardening]
---

# AI Security

These settings apply when you [run your own engine](./Self-Hosting-the-AI-Engine.md). With [Stirling Cloud AI](./Stirling-Cloud-AI.md) there is no engine to secure; see [Document content and providers](#document-content-and-providers) for what is sent.

Keep the AI engine on a private network. Do not publish port **5001** or expose it through your public reverse proxy.

## Authenticate the connection

Set `STIRLING_ENGINE_SHARED_SECRET` to the same long, random value on Stirling PDF and the engine. On the engine, also set `STIRLING_ENGINE_REQUIRE_AUTH=true`.

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variables">
    ```bash
    # Stirling PDF
    STIRLING_ENGINE_SHARED_SECRET=replace-with-a-long-random-string

    # AI engine
    STIRLING_ENGINE_SHARED_SECRET=replace-with-a-long-random-string
    STIRLING_ENGINE_REQUIRE_AUTH=true
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          STIRLING_ENGINE_SHARED_SECRET: replace-with-a-long-random-string
      stirling-pdf-engine:
        environment:
          STIRLING_ENGINE_SHARED_SECRET: replace-with-a-long-random-string
          STIRLING_ENGINE_REQUIRE_AUTH: "true"
    ```
  </TabItem>
</Tabs>

Use a private network or TLS between the services: the connection carries AI configuration, including provider credentials. Restart both services after changing the shared secret, then re-save the AI settings.

## Engine settings

Set these environment variables on the engine; the shared secret also belongs on Stirling PDF.

| Variable | Default | Purpose |
|---|---|---|
| `STIRLING_ENGINE_SHARED_SECRET` | empty | Shared authentication secret. |
| `STIRLING_ENGINE_REQUIRE_AUTH` | `false` | Refuse unauthenticated requests if the shared secret is missing. |
| `STIRLING_REQUIRE_USER_ID` | `false` | Require an identified user. Use only with login enabled; see [MCP Server](../Configuration/Automation/MCP-Server.md#ai-capabilities) for MCP compatibility. |
| `STIRLING_ALLOW_CONFIG_PUSH` | `true` | Accept AI settings saved in Stirling PDF. |

Restart the engine after changing these variables. Stirling PDF's `aiEngine.pushConfigToEngine` setting must remain enabled to send settings saved in **Settings → Server → AI Engine**.

## Document content and providers

Language model providers receive prompts, relevant document content, conversation history, and file names. Embedding providers receive document text and search queries.

With [Stirling Cloud AI](./Stirling-Cloud-AI.md), Stirling Cloud processes this content instead of a provider you choose. It keeps indexed document text only when **Let Stirling Cloud keep indexed documents** is on, and deletes it after 24 hours by default.

To keep this content within your infrastructure, run your own engine and configure both language models and embeddings with [local providers](./Model-Providers.md#local-models). Restrict access to AI settings and use only trusted provider URLs. [External integrations](../Processor/Integrations.md) have their own document delivery settings.
