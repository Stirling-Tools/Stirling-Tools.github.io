---
sidebar_position: 4
title: Documents and retrieval
description: 'Where your own AI engine stores the searchable copy of documents, how long it keeps them, and how to configure retrieval.'
sidebar_label: Documents & RAG
---

# Documents and retrieval

Document questions search an indexed copy of each document. When you [run your own engine](./Run-the-AI-Engine.md), the engine stores that copy, and this page covers where and for how long. With [Stirling Cloud AI](./Use-Stirling-Cloud-AI.md#document-questions), Stirling Cloud stores it instead and these settings don't apply.

Document questions need login enabled and an [embedding provider](./Model-Providers.md#embeddings).

## Retrieval settings

These are under **Documents & RAG** in **Settings → Server → AI Engine**:

- **Embedding provider** and **Embedding model**: see [Model providers](./Model-Providers.md#embeddings).
- **Top K**: document chunks returned per search. Default `20`.
- **Max searches**: searches the assistant may run before it answers. Default `5`; `0` turns document search off.

## Choose a store

| Store | `STIRLING_DOCUMENTS_BACKEND` | Use for |
|---|---|---|
| Built-in SQLite | `sqlite` (default) | One engine instance |
| PostgreSQL with pgvector | `pgvector` | Several engine instances sharing one store |

Set these environment variables on the engine:

| Variable | Default | Purpose |
|---|---|---|
| `STIRLING_DOCUMENTS_BACKEND` | `sqlite` | `sqlite` or `pgvector`. |
| `STIRLING_DOCUMENTS_SQLITE_PATH` | `data/rag.db` | Built-in database file, relative to the engine folder: `/app/engine/data/rag.db` in the engine image, `/opt/stirling-engine/data/rag.db` in the `latest-fat` image. |
| `STIRLING_DOCUMENTS_PGVECTOR_DSN` | empty | PostgreSQL connection string. Required for `pgvector`. |
| `STIRLING_DOCUMENTS_PGVECTOR_POOL_MIN_SIZE`, `STIRLING_DOCUMENTS_PGVECTOR_POOL_MAX_SIZE` | `1`, `10` | Database connection pool size. |

For PostgreSQL, create a database with the pgvector extension, give the engine's database user access to it, and make sure the engine can reach the host:

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variable">
    ```bash
    STIRLING_DOCUMENTS_BACKEND=pgvector
    STIRLING_DOCUMENTS_PGVECTOR_DSN=postgresql://user:password@postgres:5432/stirling_docs
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf-engine:
        environment:
          STIRLING_DOCUMENTS_BACKEND: pgvector
          STIRLING_DOCUMENTS_PGVECTOR_DSN: postgresql://user:password@postgres:5432/stirling_docs
    ```
  </TabItem>
</Tabs>

With either store, mount a persistent volume at `/app/engine/data`, or at `/opt/stirling-engine/data` in the `latest-fat` image, which the standard volumes don't cover. It also holds saved AI settings. Without it, indexed documents are lost when the container is recreated. Set `stop_grace_period: 30s` so the engine can shut down cleanly. Restart the engine after changing these variables.

## How long documents are kept

- Documents a user adds through the assistant are deleted when they sign out, or after the web sign-in lifetime (`security.jwt.tokenExpiryMinutes`, 24 hours by default).
- Documents that Processor [Ingestion](../../Processor/Policies/Ingestion.md) adds to the Stirling knowledge base stay until they are deleted.

## Changing the store or embedding model

Switching stores does not move existing documents. After changing the embedding model, re-add existing documents so their stored embeddings match the new model.
