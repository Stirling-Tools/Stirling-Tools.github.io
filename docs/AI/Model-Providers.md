---
sidebar_position: 2
id: Model Providers
title: Model Providers
---

# Model Providers

Configure providers under **Admin Settings → AI**, or in the `aiEngine.models` and `aiEngine.rag` sections of `settings.yml`.

Language models handle questions and editing instructions. Embedding models make document text searchable. You can use a different provider for each.

## Language models

| Provider | Base URL | API key |
|---|---|---|
| `anthropic` | Default service | Set in AI settings or `ANTHROPIC_API_KEY` on the engine. |
| `openai` | Default service | Set in AI settings or `OPENAI_API_KEY` on the engine. |
| `ollama` | Required, for example `http://ollama:11434/v1` | Not required. |
| `custom` | Your OpenAI-compatible endpoint | Set if required by the endpoint. |

The default is Anthropic with `claude-haiku-4-5` for both **Smart model** and **Fast model**. Both models use the same provider. Enter model names without a provider prefix.

## Embeddings

| Provider | Model and credentials |
|---|---|
| `voyageai` | Default model: `voyage-4`. Set `aiEngine.rag.embeddingApiKey` or `VOYAGE_API_KEY` on the engine. |
| `openai` | Set `OPENAI_API_KEY` on the engine. |
| `ollama` | Set the endpoint and embedding model, such as `nomic-embed-text`. |
| `custom` | Set the endpoint, embedding model, and any required key in AI settings. |

Re-add stored documents after changing the embedding model. See [Documents and Retrieval](./Documents-and-RAG.md).

## Local models

Set the local provider and model names in AI settings, with `aiEngine.pushConfigToEngine` enabled. The language model must support structured output (JSON schema).

For example, with language and embedding models served at separate OpenAI-compatible endpoints:

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

Use addresses reachable from the engine container. Leave key fields empty only when the endpoint needs no authentication. Configure both providers locally to keep model requests within your infrastructure.

See [AI Settings Reference](./AI-Settings-Reference.md) for environment variables and [Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md) for container setup.
