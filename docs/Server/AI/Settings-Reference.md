---
sidebar_position: 5
title: AI settings reference
description: 'Every AI setting and AI engine environment variable, with defaults and when changes apply.'
sidebar_label: Settings reference
---

# AI settings reference

AI settings live in the `aiEngine` section of `settings.yml` and on **Settings → Server → AI Engine**. Each key also works as an environment variable: uppercase, with dots replaced by underscores, so `aiEngine.limits.maxPages` becomes `AIENGINE_LIMITS_MAXPAGES`. Environment variables override the file and the settings page; see [Configuration](../Configuration.md).

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      enabled: true
      mode: SELF_HOSTED
      url: http://stirling-pdf-engine:5001
      limits:
        maxPages: 500
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    AIENGINE_ENABLED=true
    AIENGINE_MODE=SELF_HOSTED
    AIENGINE_URL=http://stirling-pdf-engine:5001
    AIENGINE_LIMITS_MAXPAGES=500
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          AIENGINE_ENABLED: "true"
          AIENGINE_MODE: SELF_HOSTED
          AIENGINE_URL: http://stirling-pdf-engine:5001
          AIENGINE_LIMITS_MAXPAGES: "500"
    ```
  </TabItem>
</Tabs>

## Connection and capabilities

Changes to these apply after a restart.

| Key | Default | Purpose |
|---|---|---|
| `aiEngine.enabled` | `false` | Turn AI on. |
| `aiEngine.mode` | `SELF_HOSTED` | Where AI runs: `SELF_HOSTED` for [your own engine](./Run-the-AI-Engine.md), `CLOUD` for [Stirling Cloud AI](./Use-Stirling-Cloud-AI.md). |
| `aiEngine.url` | `http://localhost:5001` | Address of your own engine. |
| `aiEngine.cloudDocumentIndexing` | `false` | Stirling Cloud AI only. Let Stirling Cloud store indexed document text so document questions work. |
| `aiEngine.timeoutSeconds` | `120` | Timeout for standard AI requests. |
| `aiEngine.longRunningTimeoutSeconds` | `600` | Timeout for heavier operations, such as document generation or adding a large document. |
| `aiEngine.streamTimeoutSeconds` | `1800` | Timeout for streamed chat responses. |
| `aiEngine.features.chat`, `.documentQuestions`, `.createPdf`, `.mathAuditor`, `.pdfComment`, `.classify` | `true` | Individual capabilities; see [Turn capabilities on or off](./AI.md#turn-capabilities-on-or-off). |
| `aiEngine.pushConfigToEngine` | `true` | Send the model, document and limit settings below to your engine on startup and on save. Set `false` to configure the engine only from its own environment. Not on the settings page. |

Timeouts must be at least `1`.

## Models, documents and limits

These are sent to your engine when you save, with no restart. They are not used with Stirling Cloud AI.

| Key | Default | Purpose |
|---|---|---|
| `aiEngine.models.provider` | `anthropic` | Language model provider: `anthropic`, `openai`, `ollama` or `custom` (OpenAI-compatible). |
| `aiEngine.models.smartModel`, `aiEngine.models.fastModel` | `claude-haiku-4-5` | Smart and Fast model names, without a provider prefix. |
| `aiEngine.models.smartMaxTokens`, `aiEngine.models.fastMaxTokens` | `8192`, `2048` | Maximum output tokens for each model. At least `1`. |
| `aiEngine.models.apiKey` | empty | Provider API key. Empty uses the engine's environment variable. A blank field on the settings page keeps the saved key. |
| `aiEngine.models.baseUrl` | empty | Endpoint for `ollama` or `custom`. |
| `aiEngine.rag.embeddingProvider` | `voyageai` | Embedding provider: `voyageai`, `openai`, `ollama` or `custom`. |
| `aiEngine.rag.embeddingModel` | `voyage-4` | Embedding model name, without a prefix. Re-add documents after changing it. |
| `aiEngine.rag.embeddingApiKey`, `aiEngine.rag.embeddingBaseUrl` | empty | Embedding key and endpoint; see [Model providers](./Model-Providers.md). |
| `aiEngine.rag.topK` | `20` | Document chunks returned per search. At least `1`. |
| `aiEngine.rag.maxSearches` | `5` | Searches the assistant may run before answering. `0` turns document search off. |
| `aiEngine.limits.maxPages` | `200` | Maximum PDF pages per AI request. At least `1`. |
| `aiEngine.limits.maxCharacters` | `200000` | Maximum extracted characters per AI request. At least `1`. |
| `aiEngine.limits.modelMaxConcurrency` | `32` | Maximum simultaneous model calls across the engine. At least `1`. |

## AI engine environment variables

Set these on the engine container, or on the Stirling PDF container when you use the `latest-fat` image. `STIRLING_ENGINE_SHARED_SECRET` also goes on Stirling PDF; see [AI security](./AI-Security.md#authenticate-the-connection).

| Variable | Default | Purpose |
|---|---|---|
| `STIRLING_ENGINE_SHARED_SECRET` | empty | Shared secret. Must match the value on Stirling PDF. |
| `STIRLING_ENGINE_REQUIRE_AUTH` | `true` in the engine image, otherwise `false` | Refuse every request while no shared secret is set. |
| `STIRLING_REQUIRE_USER_ID` | `false` | Reject requests without a signed-in user. |
| `STIRLING_ALLOW_CONFIG_PUSH` | `true` | Accept settings saved in Stirling PDF. |
| `STIRLING_ENGINE_WORKERS` | `4` in the engine image, `2` in the fat image | Number of engine worker processes. |
| `STIRLING_SMART_MODEL`, `STIRLING_FAST_MODEL` | `anthropic:claude-haiku-4-5` | Models in `provider:model` form, used when Stirling PDF does not push settings. |
| `STIRLING_RAG_EMBEDDING_MODEL` | `voyageai:voyage-4` | Embedding model in `provider:model` form, used when Stirling PDF does not push settings. |
| `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `VOYAGE_API_KEY` | empty | Provider keys, used when the matching key in AI settings is empty. |

Document store variables are in [Documents and retrieval](./Documents-and-RAG.md).
