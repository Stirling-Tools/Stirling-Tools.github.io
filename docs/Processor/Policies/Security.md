---
sidebar_position: 2
title: Security
description: Redact personal data, remove JavaScript, and watermark documents with a guided setup.
---

# Security

The Security policy protects documents before they are shared. It redacts personal data, removes JavaScript, and can add a watermark. By default it runs when people export files from the editor.

## Set up Security

1. Open **Processor → Pipelines** and select **Set up** on **Security**.
2. Keep the actions you need:
   - **Redact sensitive information** finds US Social Security numbers and payment card numbers by default. Expand it to change what it looks for.
   - **Strip active content** removes JavaScript so nothing runs when the document is opened.
   - **Apply a watermark** starts switched off. Turn it on and enter the text, such as **Confidential**.
3. Choose the documents to process. For editor files, Security runs on **Every export** by default, so files are protected as they leave the editor.
4. Select **Create pipeline**.

To make sure no file leaves the editor unprotected, turn on [Enforce as policy](../Pipelines.md#enforce-as-policy). An export is then cancelled if the policy cannot be applied.

## Check the results

Redaction and the watermark turn pages into images by default, so redacted text cannot be recovered and the watermark cannot be removed. The processed file no longer has selectable or searchable text.

Test with a sample document and check the output, including searching and copying text, before rolling the policy out to your team.
