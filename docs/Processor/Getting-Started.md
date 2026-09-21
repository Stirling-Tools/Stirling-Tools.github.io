---
sidebar_position: 2
title: Create your first pipeline
description: Build and verify a watched-folder workflow before turning on unattended processing.
---

# Create your first pipeline

This walkthrough compresses PDFs from a server folder and delivers them to a second folder. You need management access and the folder permissions from [Setup and access](./Setup-and-Access.md).

## 1. Connect an inbox

1. Open **Processor → Sources → Connect source**.
2. Choose **Folder**.
3. Name it **Invoice inbox** and enter `/data/processor/inbox` as the folder path.
4. Leave **Folder depth** at **Top level only** for this first workflow.
5. Expand **Advanced**. Under **After processing**, choose **Keep it, and only process it again if it changes** so testing does not remove originals.
6. Select **Create source**.

![Folder source configuration with advanced processing controls](/img/processor/folder-source.png)

This uses tracked mode: originals stay in place, and an unchanged file is not continually processed again.

## 2. Connect an output folder

Create another Folder source named **Processed invoices**, using `/data/processor/processed`. A writable source can also be selected as a destination. Keep the destination outside the watched input tree to avoid processing your own output again.

## 3. Build the pipeline

1. Open **Pipelines → New custom pipeline**.
2. Give it a descriptive name, such as **Compress incoming invoices**.
3. Choose **Invoice inbox** as the input and start with **Manual only**.
4. Add **Compress** and configure the compression settings.
5. Select **Processed invoices** as the destination.
6. Complete any settings highlighted by the builder.

## 4. Test one document

Use **Test with a file** and select a PDF you can replace. The test runs the current steps and offers the resulting files for download; it does not deliver them to the configured destination.

Open the output and check the content, page count, and file size.

## 5. Save, then enable the trigger

Save with **Create paused** while you finish checking the setup. Once ready, edit the pipeline, change its trigger to **Folder watch**, save the changes, and enable it.

Place one new PDF in the inbox. Confirm that the result reaches the output folder. With **Keep it**, the original remains and its unchanged version should not be processed again. Folder changes may take a few minutes to appear.

## 6. Check operation

- Open [Documents](./Documents.md) for the recent processing record.
- Open [Review](./Review.md) if a run fails.
- If you later choose **Delete the file**, confirm that the destination is correct and originals can safely be removed after successful delivery.

See [Pipelines](./Pipelines.md) for Editor input, schedules, supporting files, and editing existing workflows.
