---
sidebar_position: 3
id: AI Settings Reference
title: AI Settings Reference
description: Every AI setting an administrator can change, its default, and whether it needs a restart
tags: [AI, Settings, Configuration, Admin, Self-host]
---

# AI Settings Reference

Every AI setting lives in the top-level `aiEngine` block of `settings.yml`, or under **Admin Settings → AI** (needs the `ADMIN` role). The environment prefix is `AIENGINE_`, never `SYSTEM_AIENGINE_`.

## Engine connection and capabilities (restart required)

| Key | Env | Default | Purpose |
|---|---|---|---|
| `aiEngine.enabled` | `AIENGINE_ENABLED` | `false` | Master switch. While off, AI requests fail with `503 AI engine is not enabled`. |
| `aiEngine.url` | `AIENGINE_URL` | `http://localhost:5001` | Base URL of the AI engine. |
| `aiEngine.timeoutSeconds`, `aiEngine.longRunningTimeoutSeconds`, `aiEngine.streamTimeoutSeconds` | `AIENGINE_TIMEOUTSECONDS`, `AIENGINE_LONGRUNNINGTIMEOUTSECONDS`, `AIENGINE_STREAMTIMEOUTSECONDS` | `120`, `600`, `1800` | Timeouts for standard requests, heavy operations such as adding a large document, and long assistant runs. Never set one to `0`. |
| `aiEngine.pushConfigToEngine` | `AIENGINE_PUSHCONFIGTOENGINE` | `true` | Send model, document and limit settings to the engine. Not editable in the admin UI. |
| `aiEngine.features.chat`, `aiEngine.features.documentQuestions` | `AIENGINE_FEATURES_CHAT`, `AIENGINE_FEATURES_DOCUMENTQUESTIONS` | `true` | Assistant chat and questions about a PDF. Conversation is refused only when both are off. |
| `aiEngine.features.createPdf`, `aiEngine.features.classify` | `AIENGINE_FEATURES_CREATEPDF`, `AIENGINE_FEATURES_CLASSIFY` | `true` | Generating a PDF from a written description; automatic document classification and labelling. |
| `aiEngine.features.mathAuditor`, `aiEngine.features.pdfComment` | `AIENGINE_FEATURES_MATHAUDITOR`, `AIENGINE_FEATURES_PDFCOMMENT` | `true` | Formula contradiction auditing and AI-authored PDF comments. Neither has a tool in the app. |

## Models, documents and limits (apply on save, once AI is enabled and restarted into)

| Key | Env | Default | Purpose |
|---|---|---|---|
| `aiEngine.models.provider` | `AIENGINE_MODELS_PROVIDER` | `anthropic` | LLM provider: `anthropic`, `openai`, `ollama`, `custom` (OpenAI-compatible). |
| `aiEngine.models.smartModel`, `aiEngine.models.fastModel` | `AIENGINE_MODELS_SMARTMODEL`, `AIENGINE_MODELS_FASTMODEL` | `claude-haiku-4-5` | Model name for the high-quality tier and for the cheap/fast tier. No provider prefix. |
| `aiEngine.models.smartMaxTokens`, `aiEngine.models.fastMaxTokens` | `AIENGINE_MODELS_SMARTMAXTOKENS`, `AIENGINE_MODELS_FASTMAXTOKENS` | `8192`, `2048` | Maximum output tokens per tier. At least `1`. |
| `aiEngine.models.apiKey`, `aiEngine.models.baseUrl` | `AIENGINE_MODELS_APIKEY`, `AIENGINE_MODELS_BASEURL` | empty | LLM key (blank uses the engine's own, such as `ANTHROPIC_API_KEY`; blank on save keeps the stored key, switching provider clears it) and OpenAI-compatible base URL for `ollama` and `custom`. A base URL receives your document content and is not covered by SSRF protection, so name only a host you operate. |
| `aiEngine.rag.embeddingProvider`, `aiEngine.rag.embeddingModel` | `AIENGINE_RAG_EMBEDDINGPROVIDER`, `AIENGINE_RAG_EMBEDDINGMODEL` | `voyageai`, `voyage-4` | Embedding provider (`voyageai`, `openai`, `ollama`, `custom`) and model name, no prefix. Changing the model means adding existing documents again; there is no re-index command. |
| `aiEngine.rag.embeddingApiKey`, `aiEngine.rag.embeddingBaseUrl` | `AIENGINE_RAG_EMBEDDINGAPIKEY`, `AIENGINE_RAG_EMBEDDINGBASEURL` | empty | Embedding key (blank uses the engine's own, such as `VOYAGE_API_KEY`) and OpenAI-compatible base URL for `ollama` and `custom`. Same base URL warning as above. |
| `aiEngine.rag.topK`, `aiEngine.rag.maxSearches` | `AIENGINE_RAG_TOPK`, `AIENGINE_RAG_MAXSEARCHES` | `20`, `5` | Document chunks returned per search (at least `1`) and searches the assistant may run before answering (at least `0`; `0` disables document search). |
| `aiEngine.limits.maxPages`, `aiEngine.limits.maxCharacters`, `aiEngine.limits.modelMaxConcurrency` | `AIENGINE_LIMITS_MAXPAGES`, `AIENGINE_LIMITS_MAXCHARACTERS`, `AIENGINE_LIMITS_MODELMAXCONCURRENCY` | `200`, `200000`, `32` | Most PDF pages, most characters of extracted text, and model calls running at once. Each at least `1`; concurrency `0` hangs every model call. Out-of-range values are rejected on save. |

## Engine container variables (no `settings.yml` form)

| Variable | Default | Purpose |
|---|---|---|
| `STIRLING_ENGINE_SHARED_SECRET` | empty | Required on every non-public engine request. Set the same value on the engine and the Stirling PDF server. |
| `STIRLING_ENGINE_REQUIRE_AUTH` | `false` | When `true` and no shared secret is set, the engine refuses every non-public request. |
| `STIRLING_ALLOW_CONFIG_PUSH` | `true` | Whether the engine accepts settings sent from Stirling PDF. `false` makes its own environment the only source of truth. |
| `STIRLING_CONFIG_CACHE_POLL_INTERVAL_SECONDS` | `15` | How long a saved change can take to reach the whole engine. |

## Recommended configuration

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      enabled: true
      url: http://ai-engine:5001
      models:
        apiKey: <YOUR_API_KEY>
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    AIENGINE_ENABLED=true
    AIENGINE_URL=http://ai-engine:5001
    AIENGINE_MODELS_APIKEY=<YOUR_API_KEY>
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      AIENGINE_ENABLED: "true"
      AIENGINE_URL: "http://ai-engine:5001"
      STIRLING_ENGINE_SHARED_SECRET: "<YOUR_SHARED_SECRET>"
    ```
  </TabItem>
</Tabs>

## Related Documentation

- **[AI Overview](./AI-Overview.md)** - what the AI engine is and how to turn it on
- **[Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md)** - running the engine container
- **[Model Providers](./Model-Providers.md)** - choosing an LLM and embedding provider
- **[Documents and Retrieval](./Documents-and-RAG.md)** - the document store, `topK` and `maxSearches`
- **[AI Security](./AI-Security.md)** - shared secret, config push lockdown, network exposure
- **[AI Tools](./AI-Tools.md)** - the capabilities the `aiEngine.features.*` switches control
