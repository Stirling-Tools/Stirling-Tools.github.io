---
sidebar_position: 4
title: Compliance
description: Strip hidden data, convert to PDF/A for archiving, and validate every document against the standard.
---

# Compliance

The Compliance policy prepares documents for long-term archiving. It strips hidden data, converts each document to PDF/A, and checks the result meets the standard before it is delivered. By default it runs when people export files from the editor.

![Compliance policy setup form with PDF/A conversion and validation settings](/img/processor/compliance-template.png)

## Set up Compliance

1. Open **Processor → Pipelines** and select **Set up** on **Compliance**.
2. Keep the actions you need:
   - **Strip active content** removes scripts, attachments, and document metadata. Fonts are kept, because PDF/A requires them.
   - **Convert to PDF/A for archiving** rewrites the document in the archival format. Choose the **Archival profile**: PDF/A-2b suits most archives, PDF/A-1b is the strictest and most widely accepted, and PDF/A-3b also allows attachments.
   - **Check the document meets the standard** validates the finished file and stops the run if it does not pass.
3. Choose the documents to process and where results go.
4. Select **Create pipeline**.

To stop files that fail the check from leaving the editor, turn on [Enforce as policy](../Pipelines.md#enforce-as-policy).

## Before you roll it out

PDF/A conversion invalidates existing digital signatures. Convert before signing, or keep signed originals separately.

Conversion and validation failures appear in [Review](../Review.md) with the reason, so you can fix the source document and try again.
