---
sidebar_position: 7
title: Processing folders
description: Attach document processing to a folder from the file library.
---

# Processing folders

Attach a processing workflow to a folder from the file library.

## Set up a folder

1. Open the folder's processing settings.
2. Choose or create a folder in server storage, or select **On this computer** in the desktop app.
3. Select **Choose processing**, choose a preset, and adjust its operations.
4. Review the settings and select **Enable processing**.

If you open setup from an existing folder, folder selection is skipped.

Choose **Ingestion** for OCR and knowledge search. It can index into Stirling, deliver to a RAG database, or export chunks. Database delivery retains the folder's originals. See [Ingestion](./Ingestion.md).

## Edit processing

Open the folder's processing settings and select **Save changes** after editing. Saving replaces the folder's existing setup.

If the saved workflow cannot be edited in the simple form, use the full pipeline builder.

## Server and local folders

Server folders are processed by the connected deployment. Local folders depend on the desktop app, so keep it running and connected.

For a workflow that runs unattended on the server, follow [Create your first pipeline](./Getting-Started.md). Use [Review](./Review.md) to investigate failures.
