---
sidebar_position: 0
title: Stirling Processor
description: Set up document sources, build reusable pipelines, and monitor automated processing.
id: Stirling Processor
---

# Stirling Processor

Stirling Processor automates document workflows. Connect an input, choose the PDF operations to run, and select a destination. Run workflows on a schedule, when a folder changes, on webhook delivery, or when someone uploads or exports a file in the editor.

Open **Processor** from the app switcher. For permissions and server configuration, see [Setup and access](./Setup-and-Access.md).

## Start here

Follow [Create your first pipeline](./Getting-Started.md) to connect two folders, test PDF compression, and enable automatic processing.

![Pipelines list and available templates](/img/processor/pipelines.png)

## Find your way around

| Page | Use it to |
|---|---|
| [Sources](./Sources.md) | Connect folders, storage services, and webhooks. |
| [Pipelines](./Pipelines.md) | Build, test, pause, and edit workflows. |
| [Policy templates](./Policies.md) | Set up Ingestion, Security, Classification, Compliance, and Routing. |
| [Ingestion](./Ingestion.md) | Prepare searchable chunks for a knowledge base or export. |
| [Routing](./Routing.md) | Choose destinations using document properties or classification. |
| [Documents](./Documents.md) | View recent processing activity and export it as CSV. |
| [Review](./Review.md) | Investigate and resolve failed runs. |
| [Integrations](./Integrations.md) | Save connections to external services. |

[Processing folders](./Processing-Folders.md) let you attach a workflow directly to a folder in the file library. Users, API keys, audit logs, and billing are under [Settings](./API-Keys-and-Audit.md).

## How a workflow runs

**Source → trigger → processing steps → destination**

A source identifies where documents come from. A pipeline defines the operations and delivery destination. A policy enforces a pipeline during editor uploads or exports.

For example, a pipeline can watch an invoice folder, compress each new PDF, and save it to an archive. Editor workflows can return results to the workspace instead.
