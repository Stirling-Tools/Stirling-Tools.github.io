---
sidebar_position: 5
title: Policy templates
description: Use guided templates for Ingestion, Security, Classification, Compliance, and Routing.
---

# Policy templates

Open **Processor → Pipelines** and select **Set up** on a template. Configured workflows appear in **All pipelines**.

## Configure a template

1. Enable the operations you need and complete their settings.
2. Choose the input, trigger, and destination.
3. For editor input, choose whether to **Enforce as policy**.
4. Select **Create pipeline**. Use **Customise** to open the full builder.

## Ingestion

Run OCR and prepare searchable chunks for the Stirling knowledge base, a connected RAG database, or a file export. See [Ingestion](./Ingestion.md) for setup and output options.

## Security

Choose redaction, sanitization, and watermarking. Review the sensitive-data patterns and watermark text before saving.

The template's redaction and watermark defaults rasterize pages, removing selectable text. Check the resulting document, including search and copying, before applying it to a team.

## Classification

Label documents by type for tagging and routing. Server classification requires AI classification to be enabled. For routing without AI, use filename, extension, PDF title, or author.

## Compliance

Strip active content, convert to PDF/A, and validate the result. Choose the archival profile required by your destination.

![Compliance template with PDF/A conversion and validation settings](/img/processor/compliance-template.png)

PDF/A conversion invalidates existing digital signatures. Conversion or validation failures appear in [Review](./Review.md).

## Routing

Send documents to destinations based on their properties or classification. Rules run in order, with a fallback for unmatched files. See [Routing](./Routing.md).

## Enforce as policy

Managers can enforce an editor pipeline for uploads or exports. For unattended processing, configure a server source and trigger in [Pipelines](./Pipelines.md).
