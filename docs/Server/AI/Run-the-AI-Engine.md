---
sidebar_position: 1
title: Run the AI engine
description: 'Host the Stirling AI engine yourself, bundled in the fat image or as its own container next to Stirling PDF.'
sidebar_label: Run the AI engine
---

# Run the AI engine

By default the engine uses Anthropic (Claude) for language models and VoyageAI for embeddings, so you need an API key for each. For GPT, other services or local models, see [Model providers](./Model-Providers.md). To use AI without hosting anything, see [Use Stirling Cloud AI from your server](./Use-Stirling-Cloud-AI.md).

## Use the fat image

The `latest-fat` image bundles the engine and starts it only when AI is on. Turn AI on, add your provider keys and keep your existing volumes:

```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest-fat
    ports: ['8080:8080']
    environment:
      AIENGINE_ENABLED: 'true'
      ANTHROPIC_API_KEY: your-anthropic-api-key
      VOYAGE_API_KEY: your-voyageai-api-key
    volumes: ['./stirling-engine-data:/opt/stirling-engine/data']
```

- The engine volume holds the document store and saved AI settings. Without it, indexed documents are lost when the container is recreated.
- You can instead enter the keys under **Models & Providers** in **Settings → Server → AI Engine**.
- If you turn AI on from the settings page, restart the container (`docker compose restart`). **Restart Now** restarts only Stirling PDF, not the bundled engine.
- The bundled engine listens only inside the container, so a shared secret is optional.

## Run the engine as a separate container

Add the engine service to your Compose file. Keep your existing Stirling PDF volumes and settings.

```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    ports: ['8080:8080']
    environment:
      AIENGINE_ENABLED: 'true'
      AIENGINE_URL: http://stirling-pdf-engine:5001
      STIRLING_ENGINE_SHARED_SECRET: replace-with-a-long-random-string
  stirling-pdf-engine:
    image: ghcr.io/stirling-tools/stirling-engine:latest
    environment:
      STIRLING_ENGINE_SHARED_SECRET: replace-with-a-long-random-string
      ANTHROPIC_API_KEY: your-anthropic-api-key
      VOYAGE_API_KEY: your-voyageai-api-key
    volumes: ['stirling-engine-data:/app/engine/data']
    stop_grace_period: 30s
volumes:
  stirling-engine-data:
```

- Set the same long, random shared secret on both services. The engine refuses requests without it; see [AI security](./AI-Security.md#authenticate-the-connection).
- Don't publish port **5001**. Only Stirling PDF needs to reach it.
- In production, pin both images to the same release version instead of `latest` and upgrade them together.

If Stirling PDF runs outside this Compose file (a JAR install, Kubernetes or another host), set **AI engine URL** (`aiEngine.url`) to an address it can reach, and keep that address on a private network. Set `STIRLING_ENGINE_SHARED_SECRET` as an environment variable on the Stirling PDF server; it can't go in `settings.yml`.

## Start and check

1. Run `docker compose up -d`.
2. Check the engine answers from inside the Stirling PDF container:
   - Separate container: `docker compose exec stirling-pdf curl -fsS http://stirling-pdf-engine:5001/health`
   - Fat image: `docker compose exec stirling-pdf curl -fsS http://localhost:5001/health`
3. Sign in as an administrator and open **Settings → Server → AI Engine**. **Run your own engine** is selected and **Status** shows **Engine running**.
4. Open the AI assistant, attach a PDF and ask a question about it to check document questions.

## Troubleshooting

| Problem | Fix |
|---|---|
| **Engine unreachable** | Check the engine URL uses the engine's service name, both containers share a network, and you restarted after turning AI on. |
| **Engine is up, but refusing this server** | Set the same shared secret on both services and restart both. |
| Chat fails | Check the model names, provider key and engine logs. |
| Document questions fail | Check the embedding provider, its key, and that login is enabled. |
