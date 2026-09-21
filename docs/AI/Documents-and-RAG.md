---
sidebar_position: 4
id: Documents and Retrieval
title: Documents and Retrieval
description: Where Stirling PDF keeps the searchable copy of your documents for AI answers, and how to configure it
tags: [AI, Documents, Retrieval, Embeddings, pgvector, Self-host]
---

# Documents and Retrieval

Stirling PDF keeps a searchable copy of each document the AI is asked about. Requires the AI engine running and login enabled; with login disabled documents are not stored and questions about them cannot be answered.

## Choosing a store

| Store | Backend value | Pick it when | Requires |
|---|---|---|---|
| Built-in file storage (default) | `sqlite` | One engine instance | Nothing |
| PostgreSQL | `pgvector` | Two or more engine instances must share one store, or you want managed, backed-up infrastructure | pgvector extension on the server, the database already created, a role allowed to run `CREATE EXTENSION IF NOT EXISTS vector`, and a DSN host reachable from the engine container |

- Choose before first start. Changing the store needs a restart and does not carry existing documents across; they are added back on demand.
- Mount a volume at `/app/engine/data` in both modes - saved AI settings live there - and allow 30 seconds for the engine to stop (`stop_grace_period: 30s`).

## Settings

| Variable | Default | Purpose |
|---|---|---|
| `STIRLING_DOCUMENTS_BACKEND` | `sqlite` | `sqlite` or `pgvector`; any other value stops the engine starting. The built-in store file is set by `STIRLING_DOCUMENTS_SQLITE_PATH`, default `data/rag.db`, resolving to `/app/engine/data/rag.db`. |
| `STIRLING_DOCUMENTS_PGVECTOR_DSN` | empty | `postgresql://user:password@host:5432/dbname`. Required when the backend is `pgvector`. |
| `STIRLING_RAG_EMBEDDING_MODEL` | `voyageai:voyage-4` | `provider:model` used to make text searchable. The provider's own key applies on the engine, for example `VOYAGE_API_KEY`. **No re-index path**: after changing it, delete the stored documents and let them be added again, or answers may be irrelevant or fail. |

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variable">
    ```bash
    STIRLING_DOCUMENTS_BACKEND=pgvector
    STIRLING_DOCUMENTS_PGVECTOR_DSN=postgresql://user:password@host:5432/stirling_docs
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      STIRLING_DOCUMENTS_BACKEND: "pgvector"
      STIRLING_DOCUMENTS_PGVECTOR_DSN: "postgresql://user:password@host:5432/stirling_docs"
    ```
  </TabItem>
</Tabs>

## Related Documentation

- **[Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md)** - running the engine container, networking and volumes
- **[Model Providers](./Model-Providers.md)** - choosing the embedding provider and its API key
