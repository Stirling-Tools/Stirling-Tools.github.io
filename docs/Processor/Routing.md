---
sidebar_position: 6
title: Routing
description: Send each processed document to the first matching destination, with a fallback for unmatched files.
---

# Routing

Routing chooses where each processed document is delivered. Configure it in the Routing template or the pipeline builder's output settings.

## Matching options

| Match by | Values |
|---|---|
| **File extension** | `pdf`, `docx`, `png`, and other extensions |
| **Exact filename** | Complete filename |
| **PDF title** | Title metadata |
| **PDF author** | Author metadata |
| **Document type (AI classification)** | Labels produced by a Classify step |

Enter exact property values separated by commas. Wildcards and regular expressions are not supported. Only classification-based rules require AI.

## Add rules

1. Create writable [sources](./Sources.md) for your destinations.
2. Enable routing in the pipeline's output settings.
3. For each rule, select **Match by**, enter values, and choose a destination.
4. Order the rules: the first match wins.
5. Choose a fallback destination for unmatched files.

For classification-based routing, include a **Classify** step before delivery.

## Example without AI

| Order | Condition | Destination |
|---|---|---|
| 1 | File extension is `pdf` | PDF archive |
| 2 | File extension is `png, jpg, jpeg` | Image archive |
| Fallback | No rule matches | Unsorted |

Test both matching and unmatched files. If an earlier step converts the document, check that your rules match the output format.
