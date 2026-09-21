---
sidebar_position: 6
title: Routing
description: Send each processed document to the first matching destination, with a fallback for unmatched files.
---

# Routing

Routing sends different documents from one pipeline to different saved destinations. Configure it in the Routing template or the full pipeline builder.

## Choose a matching property

| Match by | Input needed |
|---|---|
| **File extension** | File type such as `pdf`, `docx`, or `png`; no AI required. |
| **Exact filename** | The complete filename; no AI required. |
| **PDF title** | The document's title metadata; no AI required. |
| **PDF author** | The document's author metadata; no AI required. |
| **Document type (AI classification)** | A classification result from an available Classify step. |

Enter exact values separated by commas for document properties. Do not enter a wildcard or regex expecting it to behave as a filename pattern. Metadata can be missing or supplied by the file's author, so it should not establish a person's identity or permission.

## Add rules

1. Add writable [sources](./Sources.md) for each destination.
2. Open the pipeline's output settings and enable routing.
3. For each rule, select **Match by**, enter the matching values, and select a destination.
4. Put more specific rules before broader rules. The first match wins.
5. Choose a fallback destination for documents that match no rule.
6. Test matching and unmatched files before enabling the workflow.

Every rule needs a condition and a destination. When routing by classification in a custom pipeline, retain the **Classify** step; removing it leaves no verdict for the rules to use and prevents saving.

## Example without AI

Create three writable destinations: **PDF archive**, **Image archive**, and **Unsorted**.

| Order | Condition | Destination |
|---|---|---|
| 1 | File extension is `pdf` | PDF archive |
| 2 | File extension is `png, jpg, jpeg` | Image archive |
| Fallback | No rule matches | Unsorted |

Choose steps that accept the source formats. If an earlier conversion changes the file type or metadata, verify which result your routing rule sees with a test run.

Use [Review](./Review.md) to investigate a missing or inaccessible destination. A matching rule alone does not prove delivery succeeded.
