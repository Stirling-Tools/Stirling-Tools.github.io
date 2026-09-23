---
sidebar_position: 3
title: Classification
description: Identify each document's type with AI and tag it for filing, search, and routing.
---

# Classification

The Classification policy uses AI to work out what each document is, such as an invoice, contract, or resume, and tags its metadata with the matching types. Tagged documents are easier to file and search, and [Routing](./Routing.md) can send each type to its own destination.

Classification needs the [AI engine](../../AI/AI-Overview.md) with classification turned on. Until then, classification is unavailable.

## Set up Classification

1. Open **Processor → Pipelines** and select **Set up** on **Classification**.
2. Review the **Classification labels**. They are a built-in set of document types, shared across your whole team.
3. Choose the documents to process. For editor files, Classification runs on **Every upload** by default.
4. Select **Create pipeline**.

A document can receive several labels when more than one type fits.

## Classify inside other pipelines

Add a **Classify** step to any pipeline in the [pipeline builder](../Pipelines.md). Put it before delivery when you want to route documents by type. To route without AI, match on file properties instead; see [Routing](./Routing.md#matching-options).
