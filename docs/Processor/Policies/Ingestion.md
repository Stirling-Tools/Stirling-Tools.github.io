---
sidebar_position: 1
title: Ingestion
description: Set up OCR and searchable document chunks with a knowledge base, connected RAG database, or corpus export.
---

# Ingestion

The Ingestion policy prepares documents for knowledge search. Open **Processor → Pipelines**, find **Ingestion** under **Templates**, and select **Set up**.

The default processing chain runs OCR, then prepares searchable chunks. Preparing chunks needs [your own AI engine](../../AI/Self-Hosting-the-AI-Engine.md); it is not available with Stirling Cloud AI.

## Configure processing

1. Review **Make text searchable**. The preset uses English OCR; use **Customise** to change the OCR step's languages when needed.
2. Leave **Prepare for knowledge search** enabled to prepare chunks. Turn it off if you only need OCR.
3. Under **Documents to process**, choose **Files opened in the editor** or a saved input source. Use **Connect input source** if the location is not yet configured.
4. Choose when the input runs. Editor input runs on upload or export; server inputs offer the triggers supported by their source type.
5. Choose the output type and destination described below.
6. Resolve any readiness messages, then select **Create pipeline**. Use **Customise** when you need the full pipeline builder.

![Ingestion setup with processing and input settings](/img/processor/ingestion-setup.png)

## Choose the output

![Ingestion output menu with knowledge base, connected database, and export choices](/img/processor/ingestion-output.png)

| Output type | Result | Requirements |
|---|---|---|
| **Stirling knowledge base** | Indexes searchable chunks in Stirling and returns the processed PDF to the selected destination. | Reachable AI engine and a configured embedding provider. |
| **Connected RAG database** | Sends chunks to the selected database, which generates embeddings; returns an indexing receipt. | Reachable AI engine and an enabled RAG database destination with its connection and collection configured. |
| **Export chunks without a database** | Saves the processed PDF and JSONL chunks to the selected destination. | Reachable AI engine; no database or embedding provider required. |

Select an enabled destination for server inputs and exports. For Editor input, choose **Return results to editor** or **Keep originals and send to a destination**.

For a RAG database, choose its saved connection and collection through the destination controls. See [Integrations](../Integrations.md).

If you customize database delivery, keep RAG preparation last and export only JSONL chunks. The guided form sets this automatically.

## Adjust chunk settings

Expand **Chunk settings** to adjust how extracted content is divided for retrieval:

| Setting | Default | Accepted values |
|---|---|---|
| Chunk size | `512` | Integer from `64` to `32768`. |
| Overlap | `64` | Integer from `0` to `4096`, smaller than chunk size. |
| Parsing mode | Automatic | Automatic or Basic. |

Start with the defaults, then check retrieval against your documents before changing them. Changing chunk settings does not by itself rebuild documents already stored in a knowledge base.

## Check readiness and originals

Follow any setup messages before saving. Use **Open AI settings** to configure the engine and **Check again** to refresh its status. To run OCR without the engine, turn off **Prepare for knowledge search**.

Choose what happens to originals under [Sources → After processing](../Sources.md#decide-what-happens-to-originals).

Folder-processing setup uses the selected folder as its input. When delivering from a processing folder to a RAG database, originals are retained. See [Processing folders](../Processing-Folders.md).

Test a document, inspect the resulting PDF or export, and verify a search in the selected knowledge base before enabling ongoing ingestion. Use [Review](../Review.md) to investigate failures.
