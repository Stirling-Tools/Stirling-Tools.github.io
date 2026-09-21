---
sidebar_position: 1
id: Self-Hosting the AI Engine
title: Self-Hosting the AI Engine
tags: [AI, Self-host, Docker, Compose, Engine]
---

# Self-Hosting the AI Engine

Run the AI engine alongside your Stirling PDF server. You need Docker Compose, a language model provider, an embedding provider, and a shared secret for the connection.

This setup uses the default hosted providers. For local models, see [Model Providers](./Model-Providers.md).

## Step 1: Configure the containers

Add the engine service and AI settings to your Compose file. Keep any existing server volumes and configuration.

```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    ports: ['8080:8080']
    environment:
      AIENGINE_ENABLED: 'true'
      AIENGINE_URL: 'http://stirling-pdf-engine:5001'
      STIRLING_ENGINE_SHARED_SECRET: 'replace-with-a-long-random-string'
  stirling-pdf-engine:
    image: ghcr.io/stirling-tools/stirling-engine:latest
    environment:
      STIRLING_ENGINE_SHARED_SECRET: 'replace-with-a-long-random-string'
      STIRLING_ENGINE_REQUIRE_AUTH: 'true'
      ANTHROPIC_API_KEY: 'your-anthropic-api-key'
      VOYAGE_API_KEY: 'your-voyageai-api-key'
    volumes: ['./stirling-engine-data:/app/engine/data']
    stop_grace_period: 30s
```

Replace the provider keys and set the same long, random shared secret on both services. Keep engine port **5001** private; no published port is needed. Pin matching release versions for production and upgrade both services together.

The engine volume stores document data and saved AI settings. Use a local directory or Docker volume.

## Step 2: Start and verify

1. Run `docker compose up -d`.
2. Check the engine with `docker compose exec stirling-pdf-engine curl -fsS http://localhost:5001/health`.
3. Sign in as an administrator and open **Admin Settings → AI** to check the connection and provider settings.
4. Attach a PDF to the assistant and ask a question about it to verify document search.

Restart Stirling PDF after changing the engine URL or enabling AI. After rotating the shared secret, restart both services and re-save the AI settings.

## Troubleshooting

| Problem | Check |
|---|---|
| Connection refused | Use the engine's service name in `AIENGINE_URL`, keep both containers on the same network, and confirm the engine is running. |
| Authentication error or settings not applied | Check that the shared secrets match and `aiEngine.pushConfigToEngine` is enabled. Restart after changing environment variables. |
| Chat fails | Check the language model name, provider credentials, and engine logs. |
| Chat works but document questions fail | Check the embedding provider and its credentials. |

See [AI Settings Reference](./AI-Settings-Reference.md) for all settings and [AI Security](./AI-Security.md) for network and provider access.
