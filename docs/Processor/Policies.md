---
sidebar_position: 5
title: Policy templates
description: Use guided templates for Security, Classification, Compliance, and Routing.
---

# Policy templates

Policies now live in **Processor → Pipelines**. Choose a template from **Templates**, or open a configured workflow in **All pipelines**. A policy is a pipeline with **Enforce as policy** enabled, rather than a separate kind of processing engine.

## Configure a template

1. Open **Pipelines** and choose a template that is available on your deployment.
2. Enable the operations you need and configure their fields.
3. Choose whether to **Enforce as policy**, if you have management permission.
4. Select **Create pipeline**. Use **Customise** when you need the full input, trigger, step, and output builder.

Once set up, the workflow appears in the list and its unused template card is no longer the entry point. Opening an existing row edits that workflow.

## Security

The Security template offers redaction, sanitization, and watermarking. Review the selected sensitive-data patterns and watermark text before applying it to a team.

The template's redaction and watermark defaults can rasterize pages. This makes the marks part of the rendered page but removes selectable text. Test search, copying, accessibility, and output size against your requirements.

Regex-based redaction only finds what the patterns match. Inspect representative documents rather than treating the preset as a guarantee that every sensitive value has been removed.

## Classification

Classification identifies document types for tagging and routing. The editor can use local heuristics; its server classification path requires AI classification. In a custom pipeline, adding **Classify** without an available classification service blocks saving until you enable the capability or remove the step.

Check classification results on your own document types before using them to control routing. For routing that must work without AI, use extension, exact filename, PDF title, or author instead.

## Compliance

The Compliance template can strip active content, convert to PDF/A, and validate the resulting file. Choose the archival profile required by your destination. The validation step runs after conversion so it checks the file that will be delivered.

![Compliance template with PDF/A conversion and validation settings](/img/processor/compliance-template.png)

PDF/A conversion changes the document and invalidates existing digital signatures. If conversion or validation fails, investigate the run in [Review](./Review.md). PDF/A validation establishes conformance to the selected document format; it does not certify an organization's legal or regulatory compliance.

## Routing

Routing chooses a destination using the document's properties or classification. Rules run in order, with a fallback destination for unmatched documents. Use [Routing](./Routing.md) for configuration and an example without AI.

## Unavailable templates

The catalogue also contains Ingestion and Retention entries. A disabled or upgrade-labelled card does not mean that all operations described by that card are implemented or enabled in your build. Use the available steps and controls; do not design a production workflow around a disabled template.

## What enforcement means

Enforcement controls participation in the editor workflow and who can switch it off. It is available for editor pipelines to managers; it does not add a new server source or trigger.

Do not treat an editor policy as an unconditional security boundary for every possible API or export path. Verify the required flow, failure behavior, and result with your deployment. Use server-side processing and destination controls where delivery must depend on successful validation.
