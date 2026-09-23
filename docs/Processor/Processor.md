---
sidebar_position: 0
title: Stirling Processor
description: Set up document sources, build reusable pipelines, and monitor automated processing.
id: Stirling Processor
---

# Stirling Processor

Stirling Processor automates document workflows. Connect an input, choose the PDF operations to run, and select a destination. Run workflows on a schedule, when a folder changes, on webhook delivery, or when someone uploads or exports a file in the editor.

![Supplier document intake pipeline: an SFTP input, six processing steps, and routes to accounts payable, procurement, and treasury](/img/processor/pipeline-flow.png)

This pipeline checks a supplier SFTP drop every 15 minutes. Each document is repaired, made searchable with OCR, classified, stripped of active content, stamped **RECEIVED**, and compressed. Invoices and credit notes go to accounts payable, purchase orders to the procurement archive, and remittance advice and statements to treasury. Anything else lands in a review folder.

Open **Processor** from the quick access bar on the left of Stirling PDF in your web browser. It is not currently accessible from the desktop app, although we will be adding it for desktop apps connected to supported environments. Administrators and team leaders have access by default. Default users or environments without login will not be able to access Processor. See [Setup and access](./Setup-and-Access.md).

## What you can automate

- **Accounts payable:** collect supplier documents from SFTP, make them searchable, and route each document type to the right team.
- **Scanned paperwork:** pick up scans from a server folder or network drive, run OCR, and save compressed, searchable PDFs.
- **Archiving:** convert contracts to PDF/A and store them in S3 with Object Lock retention.
- **Safe sharing:** redact and sanitize documents before they leave your organization.
- **Partner uploads:** accept documents from another system through a signed webhook and process them as they arrive.
- **Knowledge search:** prepare documents for a knowledge base or your own RAG database with [Ingestion](./Policies/Ingestion.md).
- **Editor policies:** run a pipeline, such as watermarking or PDF/A conversion, whenever someone uploads or exports a file in the editor.

## Start here

Follow [Create your first pipeline](./Getting-Started.md) to connect two folders, test PDF compression, and enable automatic processing.

![Pipelines list and available templates](/img/processor/pipelines.png)

## Find your way around

| Page | Use it to |
|---|---|
| [Sources](./Sources.md) | Connect folders, storage services, and webhooks. |
| [Pipelines](./Pipelines.md) | Build, test, pause, and edit workflows. |
| [Policies](./Policies/Policies.md) | Set up ready-made pipelines: Ingestion, Security, Classification, Compliance, and Routing. |
| [Documents](./Documents.md) | View recent processing activity and export it as CSV. |
| [Review](./Review.md) | Investigate and resolve failed runs. |
| [Integrations](./Integrations.md) | Save connections to external services. |

[Processing folders](./Processing-Folders.md) let you attach a workflow directly to a folder in the file library.

## How a workflow runs

**Source → trigger → processing steps → destination**

A source identifies where documents come from. A pipeline defines the operations and delivery destination. A policy enforces a pipeline during editor uploads or exports.

For example, a pipeline can watch an invoice folder, compress each new PDF, and save it to an archive. Editor workflows can return the modified document to the editor instead.
