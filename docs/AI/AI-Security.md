---
sidebar_position: 5
id: AI Security
title: AI Security
description: Security settings for the self-hosted AI engine and what data leaves your network
tags: [AI, Security, Self-host, Hardening]
---
# AI Security

The AI engine listens on all interfaces on port `5001` and has no login of its own, so keep the port off untrusted networks.

## Settings

| Key | Env | Default | Purpose |
|---|---|---|---|
| `STIRLING_ENGINE_SHARED_SECRET` | `STIRLING_ENGINE_SHARED_SECRET` | empty | Secret sent as `X-Engine-Auth`; set the same value on the engine and on Stirling PDF. Required, not optional, whenever the engine is not on the same host as Stirling PDF: without it, configuration pushes from another host or through a proxy are refused with `403` and admin AI settings never reach the engine. |
| `STIRLING_ENGINE_REQUIRE_AUTH` | `STIRLING_ENGINE_REQUIRE_AUTH` | `false` | Fail closed: when `true` and no secret is set, non-public requests are refused with `503` instead of being allowed through. |
| `STIRLING_REQUIRE_USER_ID` | `STIRLING_REQUIRE_USER_ID` | `false` | Reject any request with no `X-User-Id` header with `401`. Set `true` only where login is enabled; with login off no `X-User-Id` is sent and every AI request fails with `401`. |
| `STIRLING_ALLOW_CONFIG_PUSH` | `STIRLING_ALLOW_CONFIG_PUSH` | `true` | Accept configuration pushed from Stirling PDF. `false` refuses pushes with `403`. |
| `aiEngine.pushConfigToEngine` | `AIENGINE_PUSHCONFIGTOENGINE` | `true` | Push AI settings from Stirling PDF to the engine. The push carries provider API keys in cleartext, so the link to `aiEngine.url` (`AIENGINE_URL`, default `http://localhost:5001`) must be a private network or TLS. |
| `aiEngine.enabled` | `AIENGINE_ENABLED` | `false` | Master switch. When `false`, AI requests fail with `503`. |

All `STIRLING_*` keys above are environment variables only, with no settings file form, and are read at engine start. Restart the engine after changing them, and restart Stirling PDF too after changing the shared secret.

## What leaves your network

- Hosted model providers receive document-derived content used by the selected capability. Review the provider and operation rather than assuming self-hosting the Stirling server keeps all content local. External pipeline integrations can also receive document files.
- LLM: your message, the extracted page text of the files in scope, the conversation history, the file id and display name. Capped per request by `aiEngine.limits.maxPages` (`AIENGINE_LIMITS_MAXPAGES`, default `200`) and `aiEngine.limits.maxCharacters` (`AIENGINE_LIMITS_MAXCHARACTERS`, default `200000`).
- Embedding model: the same page text in chunks for every stored document, plus every search query. Destinations `aiEngine.models.baseUrl` and `aiEngine.rag.embeddingBaseUrl` are unvalidated outbound addresses, so restrict who can edit AI settings.

## Recommended configuration

The `STIRLING_*` values are set on the engine and have no `settings.yml` form. `STIRLING_ENGINE_SHARED_SECRET` goes on both containers.

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variable">
    ```bash
    STIRLING_ENGINE_SHARED_SECRET=<long random string, identical on both sides>
    STIRLING_ENGINE_REQUIRE_AUTH=true
    STIRLING_REQUIRE_USER_ID=true  # only where login is enabled
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          STIRLING_ENGINE_SHARED_SECRET: "<long random string>"
      stirling-pdf-engine:
        environment:
          STIRLING_ENGINE_SHARED_SECRET: "<same value>"
          STIRLING_ENGINE_REQUIRE_AUTH: "true"
          STIRLING_REQUIRE_USER_ID: "true"
    ```
  </TabItem>
</Tabs>

## Related Documentation

- **[Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md)** - running the engine, networking and health checks
- **[Model Providers](./Model-Providers.md)** - LLM and embedding providers, including fully self-hosted models
- **[AI Settings Reference](./AI-Settings-Reference.md)** - every AI setting and when a restart is needed
