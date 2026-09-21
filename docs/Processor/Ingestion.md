---
sidebar_position: 5.5
title: Ingestion
description: Set up OCR and searchable document chunks with a knowledge base, connected RAG database, or corpus export.
---

# Ingestion

The Ingestion template prepares documents for knowledge search. Open **Processor → Pipelines**, find **Ingestion** under **Templates**, and select **Set up**.

The default processing chain runs OCR, then prepares searchable chunks. It keeps the text layer available for extraction rather than flattening pages into images.

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

For a server input, select an enabled output destination. For ordinary Editor processing, results can return to the editor workspace. **Keep originals and send to a destination** instead processes a copy in the background and leaves the editor files unchanged. A database delivery or chunk export requires its corresponding destination.

A RAG database source is an output destination, not a document input. Create or select it through the destination controls, then choose its saved connection and collection. See [Sources](./Sources.md) and [Integrations](./Integrations.md).

When customizing database delivery, keep RAG preparation as the final step and export only JSONL chunks, with the original PDF and Markdown excluded. The guided form sets these options when you choose a connected database. Chunk and Markdown exports cannot be returned directly to the editor; choose a file or database destination.

## Adjust chunk settings

Expand **Chunk settings** to adjust how extracted content is divided for retrieval:

| Setting | Default | Accepted values |
|---|---|---|
| Chunk size | `512` | Integer from `64` to `32768`. |
| Overlap | `64` | Integer from `0` to `4096`, smaller than chunk size. |
| Parsing mode | Automatic | Automatic or Basic. |

Start with the defaults, then check retrieval against your documents before changing them. Changing chunk settings does not by itself rebuild documents already stored in a knowledge base.

## Check readiness and originals

The form checks the input, schedule, destination, chunk settings, and AI capabilities before saving. **Open AI settings** takes you to the relevant configuration; **Check again** refreshes readiness after a change. Chunk preparation still needs the AI engine when indexing is disabled. To run without that engine, turn off **Prepare for knowledge search** and use OCR alone.

For folder, S3, and network inputs, review the source's processing mode. **Delete the file** removes originals after successful delivery; tracked mode retains originals and processes changed versions. Choose a separate output location when originals must remain unchanged.

Folder-processing setup uses the selected folder as its input. When delivering from a processing folder to a RAG database, originals are retained. See [Processing folders](./Processing-Folders.md).

Test a document, inspect the resulting PDF or export, and verify a search in the selected knowledge base before enabling ongoing ingestion. Use [Review](./Review.md) to investigate failures.
