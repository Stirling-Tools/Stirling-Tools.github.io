---
sidebar_position: 0
title: Stirling Processor
description: Set up document sources, build reusable pipelines, and monitor automated processing.
id: Stirling Processor
---

# Stirling Processor

Stirling Processor is the automation area of Stirling PDF. Connect a source, choose the PDF operations to run, and decide where the results should go. Server workflows can run on a schedule, when a folder changes, or when another system sends a document. Editor workflows run when someone uploads or exports a file.

Open **Processor** from the app switcher, or go to `/processor` on your Stirling PDF instance. The Processor shares the editor's server and sign-in. If it is missing, start with [Setup and access](./Setup-and-Access.md).

## Start here

- **[Create your first pipeline](./Getting-Started.md):** connect two folders, process a test PDF, then enable unattended processing.
- **[Sources](./Sources.md):** folders, S3, network shares, webhooks, and the built-in Editor source.
- **[Pipelines](./Pipelines.md):** build, test, pause, and update a sequence of operations.
- **[Policy templates](./Policies.md):** configure Ingestion, Security, Classification, Compliance, and Routing from guided templates.
- **[Ingestion](./Ingestion.md):** prepare searchable document chunks for a knowledge base or export.
- **[Routing](./Routing.md):** send documents to different destinations using document properties or classification.

![Pipelines list and available templates](/img/processor/pipelines.png)

## Find your way around

| Page | What you do there |
|---|---|
| **Home** | Start setup and see the overview available to your deployment and account. |
| **Sources** | Connect inputs, inspect their status, and see which pipelines use them. |
| **Pipelines** | Manage both custom pipelines and pipelines enforced as policies. |
| **Documents** | Inspect the recent processing record and export it as CSV. |
| **Review** | Investigate recorded failures and take the actions offered for each issue. |
| **Integrations** | Save connections to external storage and services. |

Users, API keys, audit administration, account connection, and billing are on the shared **Settings** page. The documentation browser is at `/docs`. See [Administration](./API-Keys-and-Audit.md) for their locations.

## How the pieces fit

**Source → trigger → pipeline steps → destination**

A source is a reusable location, such as an invoice inbox. A connection stores credentials for that location. A pipeline says what to do with each document. A policy is a pipeline enforced for editor use; it appears in the same Pipelines list.

For example, watch an invoice folder, compress incoming PDFs, and send the results to an archive folder. Later, add [routing](./Routing.md) to separate different document types.

For **Editor** input, results return to the workspace instead of a storage destination. [Processing folders](./Processing-Folders.md) provide another entry point from the file library for applying processing to a chosen folder.

## Before enabling automation

Test with documents you can replace, check the output, and choose what happens to the originals. A source's default **Delete the file** mode removes an original after successful delivery. Choose **Keep it** when originals should remain.

Processing availability and usage allowances depend on the deployment and account. Review **Settings → Usage & Billing** and [Stirling Account Link](../Stirling-Account-Link.md) before enabling ongoing work.
