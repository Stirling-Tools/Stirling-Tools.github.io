---
sidebar_position: 2
id: Model Providers
title: Model Providers
---

# Model Providers

Configure providers in the **Models & Providers** section of **Settings → Server → AI Engine**, or with the settings below. They apply when you [run your own engine](./Self-Hosting-the-AI-Engine.md). With [Stirling Cloud AI](./Stirling-Cloud-AI.md), Stirling Cloud manages models and provider keys.

Language models handle questions and editing instructions. Embedding models make document text searchable. You can use a different provider for each.

## Language models

| Provider | Base URL | API key |
|---|---|---|
| `anthropic` (Claude) | Default service | Set in AI settings or `ANTHROPIC_API_KEY` on the engine. |
| `openai` (GPT) | Default service | Set in AI settings or `OPENAI_API_KEY` on the engine. |
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

For example, to set both provider keys in Stirling PDF:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      models:
        provider: anthropic
        apiKey: your-anthropic-api-key
      rag:
        embeddingProvider: voyageai
        embeddingApiKey: your-voyageai-api-key
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    AIENGINE_MODELS_PROVIDER=anthropic
    AIENGINE_MODELS_APIKEY=your-anthropic-api-key
    AIENGINE_RAG_EMBEDDINGPROVIDER=voyageai
    AIENGINE_RAG_EMBEDDINGAPIKEY=your-voyageai-api-key
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          AIENGINE_MODELS_PROVIDER: anthropic
          AIENGINE_MODELS_APIKEY: your-anthropic-api-key
          AIENGINE_RAG_EMBEDDINGPROVIDER: voyageai
          AIENGINE_RAG_EMBEDDINGAPIKEY: your-voyageai-api-key
    ```
  </TabItem>
</Tabs>

You can instead set `ANTHROPIC_API_KEY` and `VOYAGE_API_KEY` on the engine and leave these keys empty.

Re-add stored documents after changing the embedding model. See [Documents and Retrieval](./Documents-and-RAG.md).

## Local models

Set the local provider and model names in AI settings, with `aiEngine.pushConfigToEngine` enabled. The language model must support structured output (JSON schema).

For example, with language and embedding models served at separate OpenAI-compatible endpoints:

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
  <TabItem value="env" label="Environment Variables">
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
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          AIENGINE_MODELS_PROVIDER: custom
          AIENGINE_MODELS_SMARTMODEL: Qwen/Qwen3-8B
          AIENGINE_MODELS_FASTMODEL: Qwen/Qwen3-8B
          AIENGINE_MODELS_BASEURL: http://qwen3:8000/v1
          AIENGINE_RAG_EMBEDDINGPROVIDER: custom
          AIENGINE_RAG_EMBEDDINGMODEL: Qwen/Qwen3-Embedding-0.6B
          AIENGINE_RAG_EMBEDDINGBASEURL: http://qwen3-embed:8000/v1
    ```
  </TabItem>
</Tabs>

Use addresses reachable from the engine container. Leave key fields empty only when the endpoint needs no authentication. Configure both providers locally to keep model requests within your infrastructure.

See [AI Settings Reference](./AI-Settings-Reference.md) for environment variables and [Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md) for container setup.
