---
sidebar_position: 7
title: Processing folders
description: Attach document processing to a folder from the file library.
---

# Processing folders

A processing folder applies a saved processing setup to files placed in a chosen folder. It is configured from the file library and complements the source-and-pipeline workflow in Processor.

## Set up a folder

1. Open the folder-processing setup action in the file library.
2. Choose an existing folder, create a folder in server storage, or select **On this computer** where the desktop app offers local folders.
3. Select **Choose processing**, choose an available preset, and adjust its operations.
4. Review the folder and processing choices, then select **Enable processing**.

Opening setup from an existing folder skips the folder-selection stage. Merely selecting or creating a folder does not enable processing; the final action saves the setup.

Choose **Ingestion** to run OCR and prepare the folder's documents for knowledge search. The setup offers the Stirling knowledge base, a connected RAG database, or chunk export. It checks the required AI capabilities and destination before saving. Database delivery retains the folder's originals; see [Ingestion](./Ingestion.md) for output choices and chunk settings.

## Change existing processing

Open the folder's processing settings and review the saved operations before using **Save changes**. The form warns when a folder already has processing, because saving replaces its processing settings.

Some advanced pipelines cannot be represented by the simple wizard, such as unknown operations or repeated tool instances. In that case the UI preserves the saved steps and reports that the wizard cannot edit them. Use the appropriate full pipeline editor rather than assuming a new preset has replaced them.

## Server and local folders

- **Server storage** is managed by the connected deployment. Placement can trigger processing; the server also has a periodic catch-up sweep.
- **On this computer** uses a desktop folder integration. Keep the desktop app running and connected when processing depends on that client.
- A **Folder source** in Processor is a server filesystem path. It is not the same as selecting a local folder in a browser.

Availability depends on the app edition, connection mode, and storage configuration. For a workflow that must run unattended on the server, use the [first pipeline walkthrough](./Getting-Started.md).

## Verify the result

Start with a replaceable file. Check the saved processing chain, resulting document, and any routing destination. A visible folder or saved preset does not confirm that its tools are enabled or that the server can reach an external service.

Use [Review](./Review.md) for reported failures and [Troubleshooting](./Troubleshooting.md) for folder permissions and repeated processing.
