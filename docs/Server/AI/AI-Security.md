---
sidebar_position: 6
title: AI security
description: 'Secure the connection to your own AI engine and control what document content leaves your network.'
sidebar_label: AI security
---

# AI security

## Keep the engine private

Don't publish port **5001** or route it through your public reverse proxy. Only Stirling PDF needs to reach the engine. The bundled engine in the `latest-fat` image listens only inside its container.

## Authenticate the connection

Set `STIRLING_ENGINE_SHARED_SECRET` to the same long, random value on Stirling PDF and on the engine. Stirling PDF reads it only from its environment, not from `settings.yml`.

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variable">
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

With `STIRLING_ENGINE_REQUIRE_AUTH=true`, the engine refuses every request while no secret is set. The engine image turns this on by default; keep it on. Only the engine's health check and API docs work without the secret.

The connection carries AI settings, including provider keys, so keep it on a private network or put TLS in front of it.

To rotate the secret, change it on both services and restart both. In **Settings → Server → AI Engine**, **Status** shows **Shared secret** as **Accepted** when the values match, and **Engine is up, but refusing this server** when they don't.

## Engine settings

Set these on the engine and restart it after changing them. Defaults are in the [AI settings reference](./Settings-Reference.md#ai-engine-environment-variables).

- `STIRLING_REQUIRE_USER_ID=true` rejects requests that don't come from a signed-in user. Use it only with login enabled, and leave it `false` if MCP clients use AI tools; see [MCP server settings](../Automation/MCP-Server.md).
- `STIRLING_ALLOW_CONFIG_PUSH=false` stops the engine accepting settings saved in Stirling PDF, so its own environment is the only source of configuration.

## Where document content goes

- Language model providers receive prompts, relevant document content, conversation history and file names.
- Embedding providers receive document text and search queries.
- With Stirling Cloud AI, Stirling Cloud receives this content instead. It stores indexed text only when **Let Stirling Cloud keep indexed documents** is on; see [Document questions](./Use-Stirling-Cloud-AI.md#document-questions).

To keep all of this on your network, run your own engine with [local models](./Model-Providers.md#local-models) for both language models and embeddings. Use only provider base URLs you trust, because the engine sends requests to them from inside your network.
