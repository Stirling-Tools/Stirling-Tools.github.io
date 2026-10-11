---
sidebar_position: 3
title: Model providers
description: 'Choose the language model and embedding providers your own AI engine uses, including local models.'
sidebar_label: Model providers
---

# Model providers

Choose the providers your own AI engine uses under **Models & Providers** and **Documents & RAG** in **Settings → Server → AI Engine**, or in `settings.yml`. Saved changes are sent to the engine straight away, without a restart, while `aiEngine.pushConfigToEngine` is `true` (the default).

Language models answer questions and plan edits. Embedding models make document text searchable. Each can use a different provider. Changing a provider keeps the old model names, so also enter model names from the new provider.

## Language models

| Provider (setting) | Base URL | API key |
|---|---|---|
| **Anthropic** (`anthropic`) | Not needed | **Anthropic API key**, or `ANTHROPIC_API_KEY` on the engine |
| **OpenAI** (`openai`) | Not needed | **OpenAI API key**, or `OPENAI_API_KEY` on the engine |
| **Ollama** (`ollama`) | Required, for example `http://ollama:11434/v1` | None |
| **Custom (OpenAI-compatible)** (`custom`) | Your endpoint | If the endpoint needs one |

The default is Anthropic with `claude-haiku-4-5` as both **Smart model** (complex reasoning) and **Fast model** (lightweight tasks). Both use the same provider. Enter model names without a provider prefix.

## Embeddings

| Provider (setting) | Model and credentials |
|---|---|
| **VoyageAI** (`voyageai`) | Default model `voyage-4`. **VoyageAI API key**, or `VOYAGE_API_KEY` on the engine. |
| **OpenAI** (`openai`) | An embedding model, such as `text-embedding-3-small`, and `OPENAI_API_KEY` on the engine. The **OpenAI API key** field isn't used for embeddings. |
| **Ollama** (`ollama`) | **Embedding base URL** and an embedding model, such as `nomic-embed-text`. |
| **Custom (OpenAI-compatible)** (`custom`) | **Embedding base URL**, model and any key the endpoint needs. |

Leave a key field blank to use the engine's own environment variable. After changing the embedding model, re-add existing documents so search uses the new model; see [Documents and retrieval](./Documents-and-RAG.md).

To set the keys in configuration:

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
  <TabItem value="env" label="Environment Variable">
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

## Use OpenAI for everything

Set the provider and all three model names on Stirling PDF:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      models:
        provider: openai
        smartModel: gpt-4o
        fastModel: gpt-4o-mini
      rag:
        embeddingProvider: openai
        embeddingModel: text-embedding-3-small
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    AIENGINE_MODELS_PROVIDER=openai
    AIENGINE_MODELS_SMARTMODEL=gpt-4o
    AIENGINE_MODELS_FASTMODEL=gpt-4o-mini
    AIENGINE_RAG_EMBEDDINGPROVIDER=openai
    AIENGINE_RAG_EMBEDDINGMODEL=text-embedding-3-small
    ```
  </TabItem>
</Tabs>

Set `OPENAI_API_KEY` on the engine container, or on the Stirling PDF container with the `latest-fat` image. It covers both the language models and embeddings.

## Local models

To keep all model traffic on your own network, point both the language model and embeddings at local endpoints, such as Ollama or another OpenAI-compatible server.

- The language model must support structured output (JSON schema).
- Base URLs must be reachable from the engine container; see [AI security](./AI-Security.md#where-document-content-goes).
- Leave key fields empty only when the endpoint needs no authentication.

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
      rag:
        embeddingProvider: custom
        embeddingModel: Qwen/Qwen3-Embedding-0.6B
        embeddingBaseUrl: http://qwen3-embed:8000/v1
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

Every key and its environment variable is listed in the [AI settings reference](./Settings-Reference.md).
