---
sidebar_position: 4
id: Documents and Retrieval
title: Documents and Retrieval
description: Where Stirling PDF keeps the searchable copy of your documents for AI answers, and how to configure it
tags: [AI, Documents, Retrieval, Embeddings, pgvector, Self-host]
---

# Documents and Retrieval

The AI engine stores searchable document content so the assistant can answer questions about your PDFs. Enable login and configure an [embedding provider](./Model-Providers.md) before using document questions.

## Choosing a store

| Store | Setting | Use for |
|---|---|---|
| Built-in storage | `sqlite` (default) | One engine instance |
| PostgreSQL with pgvector | `pgvector` | Multiple engine instances sharing a document store |

For PostgreSQL, create a database with the pgvector extension and give the engine account permission to use it. The database host must be reachable from the engine.

## Settings

Set these environment variables on the engine:

| Variable | Default | Purpose |
|---|---|---|
| `STIRLING_DOCUMENTS_BACKEND` | `sqlite` | Select `sqlite` or `pgvector`. |
| `STIRLING_DOCUMENTS_SQLITE_PATH` | `data/rag.db` | Built-in database path; `/app/engine/data/rag.db` in the container. |
| `STIRLING_DOCUMENTS_PGVECTOR_DSN` | empty | PostgreSQL connection string, required for `pgvector`. |
| `STIRLING_RAG_EMBEDDING_MODEL` | `voyageai:voyage-4` | Embedding model in `provider:model` format when configured through the engine environment. |

For example:

```yaml
environment:
  STIRLING_DOCUMENTS_BACKEND: pgvector
  STIRLING_DOCUMENTS_PGVECTOR_DSN: postgresql://user:password@postgres:5432/stirling_docs
```

Mount a persistent volume at `/app/engine/data` in either mode; this also holds saved AI settings. Set `stop_grace_period: 30s` so the engine can shut down cleanly.

## Changing storage or embeddings

Restart the engine after changing its storage settings. Switching stores does not migrate existing documents. Re-add documents after changing the embedding model so their stored embeddings match the new model.

Use [Ingestion](../Processor/Ingestion.md) to prepare documents automatically for a knowledge base, connected RAG database, or chunk export.
