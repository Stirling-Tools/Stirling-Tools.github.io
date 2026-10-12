---
sidebar_position: 5
title: Routing
description: >-
  Send each processed document to the first matching destination, with a
  fallback for unmatched files.
---

# Routing

Routing sends each processed document to the destination that matches it, with a fallback for anything else. Set it up with the Routing policy, or in any pipeline's destination settings.

## Set up the Routing policy

1. Open **Processor → Pipelines** and select **Set up** on **Routing**.
2. Under **Watch**, choose the folder, bucket or webhook the policy watches, or connect a new [source](../Sources.md).
3. Select **Add a route** for each group of documents, choose what to match and choose its destination.
4. Under **Everything else goes to**, choose the fallback destination.
5. Select **Create pipeline**.

A watched folder runs as files arrive and a webhook as deliveries come in; other sources are checked every hour. Routes that match on document type add a Classify step, which needs AI classification ([Classification](./Classification.md)). Routes on file properties work without AI.

## Matching options

| Match by | Values |
|---|---|
| **File extension** | `pdf`, `docx`, `png`, and other extensions |
| **Exact filename** | Complete filename |
| **PDF title** | Title metadata |
| **PDF author** | Author metadata |
| **Document type (AI classification)** | Labels produced by a Classify step |

Enter exact property values separated by commas. Wildcards and regular expressions are not supported.

## Add rules in the pipeline builder

1. Create writable [sources](../Sources.md) for your destinations.
2. In the pipeline's destination settings, turn on **Send document types to different places**.
3. For each rule, select **Add a route**, choose **Match by**, enter the values and choose a destination.
4. Rules are checked in the order you add them, and the first match wins.
5. Under **Everything else goes to**, choose a fallback destination for unmatched files.

For classification-based routing, include a **Classify** step before delivery.

## Example without AI

| Order | Condition | Destination |
|---|---|---|
| 1 | File extension is `pdf` | PDF archive |
| 2 | File extension is `png, jpg, jpeg` | Image archive |
| Fallback | No rule matches | Unsorted |

Test both matching and unmatched files. If an earlier step converts the document, check that your rules match the output format.
