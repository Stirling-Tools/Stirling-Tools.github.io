---
sidebar_position: 3
id: AI Settings Reference
title: AI Settings Reference
description: Every AI setting an administrator can change, its default, and whether it needs a restart
tags: [AI, Settings, Configuration, Admin, Self-host]
---

# AI Settings Reference

Configure AI under **Admin Settings → AI** or the `aiEngine` block in `settings.yml`. Environment variables use the `AIENGINE_` prefix.

## Engine connection and capabilities (restart required)

| Key | Env | Default | Purpose |
|---|---|---|---|
| `aiEngine.enabled` | `AIENGINE_ENABLED` | `false` | Enable AI features. |
| `aiEngine.url` | `AIENGINE_URL` | `http://localhost:5001` | Base URL of the AI engine. |
| `aiEngine.timeoutSeconds`, `aiEngine.longRunningTimeoutSeconds`, `aiEngine.streamTimeoutSeconds` | `AIENGINE_TIMEOUTSECONDS`, `AIENGINE_LONGRUNNINGTIMEOUTSECONDS`, `AIENGINE_STREAMTIMEOUTSECONDS` | `120`, `600`, `1800` | Timeouts for standard requests, heavy operations such as adding a large document, and long assistant runs. Use positive values. |
| `aiEngine.pushConfigToEngine` | `AIENGINE_PUSHCONFIGTOENGINE` | `true` | Send model, document and limit settings to the engine. Not editable in the admin UI. |
| `aiEngine.features.chat`, `aiEngine.features.documentQuestions` | `AIENGINE_FEATURES_CHAT`, `AIENGINE_FEATURES_DOCUMENTQUESTIONS` | `true` | Assistant chat and questions about a PDF. Set both to `false` to disable conversation. |
| `aiEngine.features.createPdf`, `aiEngine.features.classify` | `AIENGINE_FEATURES_CREATEPDF`, `AIENGINE_FEATURES_CLASSIFY` | `true` | Generating a PDF from a written description; automatic document classification and labelling. |
| `aiEngine.features.mathAuditor`, `aiEngine.features.pdfComment` | `AIENGINE_FEATURES_MATHAUDITOR`, `AIENGINE_FEATURES_PDFCOMMENT` | `true` | Maths auditing and PDF comments. |

## Models, documents and limits

Changes apply on save when AI and configuration push are enabled.

| Key | Env | Default | Purpose |
|---|---|---|---|
| `aiEngine.models.provider` | `AIENGINE_MODELS_PROVIDER` | `anthropic` | LLM provider: `anthropic`, `openai`, `ollama`, `custom` (OpenAI-compatible). |
| `aiEngine.models.smartModel`, `aiEngine.models.fastModel` | `AIENGINE_MODELS_SMARTMODEL`, `AIENGINE_MODELS_FASTMODEL` | `claude-haiku-4-5` | Smart and Fast model names, without a provider prefix. |
| `aiEngine.models.smartMaxTokens`, `aiEngine.models.fastMaxTokens` | `AIENGINE_MODELS_SMARTMAXTOKENS`, `AIENGINE_MODELS_FASTMAXTOKENS` | `8192`, `2048` | Maximum output tokens per tier. At least `1`. |
| `aiEngine.models.apiKey`, `aiEngine.models.baseUrl` | `AIENGINE_MODELS_APIKEY`, `AIENGINE_MODELS_BASEURL` | empty | Language model API key and endpoint for `ollama` or `custom`. A blank key uses the engine environment; leaving the key blank in the admin form preserves its saved value. |
| `aiEngine.rag.embeddingProvider`, `aiEngine.rag.embeddingModel` | `AIENGINE_RAG_EMBEDDINGPROVIDER`, `AIENGINE_RAG_EMBEDDINGMODEL` | `voyageai`, `voyage-4` | Embedding provider (`voyageai`, `openai`, `ollama`, `custom`) and model name, no prefix. Re-add documents after changing the model. |
| `aiEngine.rag.embeddingApiKey`, `aiEngine.rag.embeddingBaseUrl` | `AIENGINE_RAG_EMBEDDINGAPIKEY`, `AIENGINE_RAG_EMBEDDINGBASEURL` | empty | Embedding credentials and endpoint. See [Model Providers](./Model-Providers.md) for provider-specific setup. |
| `aiEngine.rag.topK`, `aiEngine.rag.maxSearches` | `AIENGINE_RAG_TOPK`, `AIENGINE_RAG_MAXSEARCHES` | `20`, `5` | Document chunks returned per search (at least `1`) and searches the assistant may run before answering (at least `0`; `0` disables document search). |
| `aiEngine.limits.maxPages`, `aiEngine.limits.maxCharacters`, `aiEngine.limits.modelMaxConcurrency` | `AIENGINE_LIMITS_MAXPAGES`, `AIENGINE_LIMITS_MAXCHARACTERS`, `AIENGINE_LIMITS_MODELMAXCONCURRENCY` | `200`, `200000`, `32` | Maximum pages, extracted characters, and simultaneous model calls. Each must be at least `1`. |

## Engine environment variables

| Variable | Default | Purpose |
|---|---|---|
| `STIRLING_ENGINE_SHARED_SECRET` | empty | Set the same shared secret on the engine and Stirling PDF. |
| `STIRLING_ENGINE_REQUIRE_AUTH` | `false` | When `true` and no shared secret is set, the engine refuses every non-public request. |
| `STIRLING_ALLOW_CONFIG_PUSH` | `true` | Accept settings saved in Stirling PDF. |
| `STIRLING_CONFIG_CACHE_POLL_INTERVAL_SECONDS` | `15` | How long a saved change can take to reach the whole engine. |

See [Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md) for a complete configuration, [AI Tools](./AI-Tools.md) for capability controls, and [AI Security](./AI-Security.md) for authentication settings.
