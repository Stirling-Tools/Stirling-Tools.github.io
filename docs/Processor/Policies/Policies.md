---
sidebar_position: 5
title: Policies
description: Ready-made pipelines with a simple setup form, for people new to building flowcharts.
---

# Policies

Policies are ready-made pipelines with a simple setup form. Instead of building a flowchart step by step, you switch on the actions you want, choose where documents come from and where results go, and save. They are designed for people who are new to pipeline builders.

Every policy you set up is saved as an ordinary [pipeline](../Pipelines.md). It appears under **All pipelines** and runs the same way. Opening it again brings back the setup form, as long as it still fits the policy.

## Set up a policy

1. Open **Processor → Pipelines**.
2. Under **Templates**, select **Set up** on the policy you want.
3. Turn on the actions you need. Expand an action to change its settings.
4. Choose the documents to process, when to run, and where results go.
5. Select **Create pipeline**.

![Compliance policy setup form with PDF/A conversion and validation](/img/processor/compliance-template.png)

:::tip Want more control? Select Customise
**Customise** opens the same pipeline in the full [pipeline builder](../Pipelines.md), carrying over everything you have set so far. Use it to add or reorder steps, pick from every tool, call [integrations](../Integrations.md), or set up your own [routing rules](./Routing.md). If you change the pipeline beyond what the setup form supports, it opens in the builder from then on.
:::

## Enforce as policy

When the documents come from the editor, you can turn on **Enforce as policy**. A file that fails an enforced policy is blocked, instead of being let through with a warning. See [Enforce as policy](../Pipelines.md#enforce-as-policy) for exactly what happens on upload and export.

## Available policies

### Ingestion

Make scanned documents searchable and prepare them for a knowledge base, your own RAG database, or an export. See [Ingestion](./Ingestion.md).

### Security

Redact personal data, remove JavaScript, and watermark documents before they are shared. See [Security](./Security.md).

### Classification

Identify each document's type with AI and tag it for filing and search. See [Classification](./Classification.md).

### Compliance

Strip hidden data, convert to PDF/A for archiving, and check the result meets the standard. See [Compliance](./Compliance.md).

### Routing

Classify documents and deliver each type to its own destination, with a fallback for everything else. See [Routing](./Routing.md).
