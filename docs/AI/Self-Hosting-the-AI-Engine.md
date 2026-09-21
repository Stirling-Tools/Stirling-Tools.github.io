---
sidebar_position: 1
id: Self-Hosting the AI Engine
title: Self-Hosting the AI Engine
tags: [AI, Self-host, Docker, Compose, Engine]
---

# Self-Hosting the AI Engine

AI features require an AI engine container running alongside the self-hosted Stirling PDF server.

## Prerequisites

- A running Stirling PDF container ([Docker Install](../Installation/Docker%20Install.md)) and Docker with `docker compose`.
- Two API keys: your **LLM key**, and your **embedding key**, which indexes documents so they can be searched (`voyageai:voyage-4` by default). Without the embedding key, document uploads and document questions fail. See [Model Providers](./Model-Providers.md).
- A long random string for `STIRLING_ENGINE_SHARED_SECRET`, set identically on both containers. Without it, AI settings saved in the admin UI never reach the engine.

Run the engine on the same version tag as the server image, and upgrade both together.

:::warning Never publish port 5001
The engine listens on 5001 inside the container and that is not configurable. Keep it on an internal network with no published ports: `/docs`, `/redoc` and `/openapi.json` are reachable without the shared secret, and the container runs as root.
:::

## Step 1: Run both containers

<Tabs groupId="config-methods">
  <TabItem value="docker-compose" label="Docker Compose">
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
        image: docker.stirlingpdf.com/stirlingtools/stirling-engine:latest
        environment:
          STIRLING_ENGINE_SHARED_SECRET: 'replace-with-a-long-random-string'
          STIRLING_ENGINE_REQUIRE_AUTH: 'true'
          ANTHROPIC_API_KEY: 'your-anthropic-api-key'
          VOYAGE_API_KEY: 'your-voyageai-api-key'
        volumes: ['./stirling-engine-data:/app/engine/data']
    ```
  </TabItem>
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      enabled: true
      url: http://stirling-pdf-engine:5001
    ```
  </TabItem>
</Tabs>

- Replace both API keys, generate the shared secret below, then run `docker compose up -d`. `STIRLING_ENGINE_SHARED_SECRET` has no settings file form.
- Mount the directory `/app/engine/data` on a local volume, never a file inside it and never a network share. It holds the document store and the saved AI settings.
- Rotating the shared secret makes saved AI settings unreadable, with no error shown. Re-save them in the admin UI afterwards.

### Generate the shared secret

Run this from the directory holding `docker-compose.yml`. It replaces both copies of `replace-with-a-long-random-string` with one random 64-character value.

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    SECRET=$(openssl rand -hex 32)
    sed -i.bak "s/replace-with-a-long-random-string/$SECRET/g" docker-compose.yml
    ```
  </TabItem>
  <TabItem value="windows" label="Windows PowerShell">
    ```powershell
    $rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
    $bytes = [byte[]]::new(32)
    $rng.GetBytes($bytes)
    $secret = -join ($bytes | ForEach-Object { $_.ToString('x2') })
    (Get-Content docker-compose.yml -Raw) -replace 'replace-with-a-long-random-string', $secret | Set-Content docker-compose.yml -NoNewline
    ```
  </TabItem>
</Tabs>

The Unix command leaves a `docker-compose.yml.bak` holding the placeholder version. Delete it once the stack starts.

## Step 2: Verify

1. `docker compose exec stirling-pdf-engine curl -fsS http://localhost:5001/health` returns `{"status":"ok","smartModel":"...","fastModel":"..."}` with the models actually in use.
2. Ask the chat assistant a question about a PDF in the workbench. This is the only check that proves the embedding key works.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Connection refused, or **Test connection** fails | Point `AIENGINE_URL` at the engine's service name rather than `localhost`, put both containers on the same network, set `AIENGINE_ENABLED=true`, restart. |
| `401`, `403` or `503` from the engine, or admin AI settings having no effect (including a health check reporting models you did not choose) | The shared secret is missing or differs between the containers, or `aiEngine.pushConfigToEngine` is `false`. Set the same secret on both, restart both, then re-save the settings. |
| Chat requests fail, or chat works while uploads and document questions fail | Missing API key: set `ANTHROPIC_API_KEY` (LLM) or `VOYAGE_API_KEY` (embedding) on the engine, then restart. |

## Related Documentation

- **[Model Providers](./Model-Providers.md)** - provider options and where each API key goes
- **[AI Settings Reference](./AI-Settings-Reference.md)** - every `aiEngine` setting and its default
- **[AI Engine Security](./AI-Security.md)** - shared secret, engine authentication, network exposure
