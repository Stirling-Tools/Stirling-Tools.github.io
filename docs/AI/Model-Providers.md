---
sidebar_position: 2
id: Model Providers
title: Model Providers
---

# Model Providers

## LLM providers

| Provider | Base URL | API key | Notes |
|---|---|---|---|
| `anthropic` | Not used | Yes | Default, `claude-haiku-4-5`. An empty key falls back to `ANTHROPIC_API_KEY` on the engine container. |
| `openai` | Not used | Yes | An empty key falls back to `OPENAI_API_KEY` on the engine container. |
| `ollama` | Required | Not used | Self-run [Ollama](https://ollama.com) server, for example `llama3.1`. The base URL must resolve from the engine container. |
| `custom` | Required | Optional | Any other OpenAI-compatible endpoint. A blank base URL sends requests to OpenAI. |

## Embedding providers

| Provider | Base URL | API key | Notes |
|---|---|---|---|
| `voyageai` | Optional override | Admin UI / `aiEngine.rag.embeddingApiKey`, or `VOYAGE_API_KEY` on the engine | Default, `voyage-4`. An explicit configured key takes precedence. |
| `openai` | Not used | `OPENAI_API_KEY` on the engine container | The admin UI key field is ignored. |
| `ollama` | Required | Not used | For example `nomic-embed-text`. |
| `custom` | Required | Optional | Any other OpenAI-compatible endpoint; uses the admin UI key. |

## Recommended configuration

- Keep the shipped defaults: LLM `anthropic` on `claude-haiku-4-5`, embeddings `voyageai` on `voyage-4`. Change them at **Admin Settings → AI**, or under `aiEngine.models` and `aiEngine.rag`.
- Configure the LLM and VoyageAI embedding keys in Admin Settings, under `aiEngine.models.apiKey` and `aiEngine.rag.embeddingApiKey`, or use the engine environment variables below. OpenAI embeddings currently use `OPENAI_API_KEY` on the engine. Changing the embedding provider or model means re-ingesting every [stored document](./Documents-and-RAG.md), and there is no re-index command.

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variable">
    ```bash
    ANTHROPIC_API_KEY=your-anthropic-api-key
    VOYAGE_API_KEY=your-voyageai-api-key
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      ANTHROPIC_API_KEY: "your-anthropic-api-key"
      VOYAGE_API_KEY: "your-voyageai-api-key"
    ```
  </TabItem>
</Tabs>

## Local models

- Evaluate the chosen local model on your document search, classification, and editing workflows. Structured tool use and output quality vary by model and serving configuration.
- Set local models at **Admin Settings → AI**, or under `aiEngine.models` with `aiEngine.pushConfigToEngine` left at `true`. Setting them only in the engine container's own environment skips the handling that makes local models work.
- Serve the model with structured output (JSON schema) enabled. A model that does not advertise it is refused.

### Example: self-hosted Qwen3

Qwen3 served on an OpenAI-compatible endpoint such as vLLM or SGLang, with embeddings on the same host. Use `ollama` instead of `custom` if you serve it through [Ollama](https://ollama.com), with a base URL of `http://ollama:11434/v1` and a tag such as `qwen3:8b`.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      models:
        provider: custom
        smartModel: Qwen/Qwen3-8B
        fastModel: Qwen/Qwen3-8B
        baseUrl: http://qwen3:8000/v1
        apiKey: ''
      rag:
        embeddingProvider: custom
        embeddingModel: Qwen/Qwen3-Embedding-0.6B
        embeddingBaseUrl: http://qwen3-embed:8000/v1
        embeddingApiKey: ''
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    AIENGINE_MODELS_PROVIDER=custom
    AIENGINE_MODELS_SMARTMODEL=Qwen/Qwen3-8B
    AIENGINE_MODELS_FASTMODEL=Qwen/Qwen3-8B
    AIENGINE_MODELS_BASEURL=http://qwen3:8000/v1
    AIENGINE_RAG_EMBEDDINGPROVIDER=custom
    AIENGINE_RAG_EMBEDDINGMODEL=Qwen/Qwen3-Embedding-0.6B
    AIENGINE_RAG_EMBEDDINGBASEURL=http://qwen3-embed:8000/v1
    ```
  </TabItem>
</Tabs>

- Both base URLs must resolve from the engine container, so use service names rather than `localhost`.
- Both tiers must stay on one provider. Point `fastModel` at a smaller Qwen3 build to cut cost on the high-frequency calls.
- Leave the key fields empty when the endpoint needs no key. A base URL receives your document content and is not covered by SSRF protection, so name only a host you operate.

## Related Documentation

- **[Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md)** - running the engine container
- **[AI Settings Reference](./AI-Settings-Reference.md)** - every AI setting and its environment variable form
