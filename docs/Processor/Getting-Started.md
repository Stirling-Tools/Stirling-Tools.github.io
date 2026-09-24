---
sidebar_position: 2
title: Create your first pipeline
description: Build and verify a watched-folder workflow before turning on unattended processing.
---

# Create your first pipeline

This walkthrough compresses PDFs from a server folder and delivers them to a second folder. You need [management access](./Setup-and-Access.md#who-can-open-and-manage-it) and an [allowed server folder](./Setup-and-Access.md#allow-server-folders).

## 1. Connect an inbox

1. Open **Processor → Sources → Connect source**.
2. Choose **Folder**.
3. Name it **Invoice inbox** and enter a path on your server, such as `/data/processor/inbox`.
4. Leave **Folder depth** at **Top level only** for this first workflow.
5. Expand **Advanced**. Under **After processing**, choose **Keep it, and only process it again if it changes** so testing does not remove originals.
6. Select **Create source**.

![Folder source configuration with advanced processing controls](/img/processor/folder-source.png)

Originals stay in place, and an unchanged file is not processed again. See [Sources](./Sources.md) for other source types and options.

## 2. Connect an output folder

Create another Folder source named **Processed invoices**, with a path such as `/data/processor/processed`. Keep it outside the inbox so the pipeline does not process its own output. See [Sources → Folder](./Sources.md#folder) for folder settings.

## 3. Build the pipeline

1. Open **Pipelines → New custom pipeline**.
2. Name it **Compress incoming invoices**.
3. Choose **Invoice inbox** as the input and start with **Manual only**.
4. Add **Compress** and choose the compression settings.
5. Select **Processed invoices** as the destination.
6. Complete any settings highlighted by the builder.

![Compress incoming invoices pipeline: Invoice inbox, Compress, and Processed invoices](/img/processor/first-pipeline.png)

See [Pipelines](./Pipelines.md) for triggers, steps, supporting files, and destinations.

## 4. Test one document

Select **Test with a file** and choose a PDF you can replace. The test runs the current steps and offers the results for download; it does not deliver them to the destination.

![Test with a file button above the pipeline steps](/img/processor/test-with-a-file.png)

Open the output and check the content, page count, and file size. See [Test and inspect output](./Pipelines.md#test-and-inspect-output).

## 5. Save, then turn it on

Save with **Create paused** while you finish checking the setup. When you are ready, open the pipeline, change its trigger to **Folder watch**, save the changes, and select **Activate**. See [Save, pause, and edit](./Pipelines.md#save-pause-and-edit).

Place one new PDF in the inbox and confirm that the result reaches the output folder. The original stays in the inbox and is not processed again unless it changes. Folder changes can take a few minutes to appear.

## 6. Check operation

- Open [Documents](./Documents.md) for the processing record.
- Open [Review](./Review.md) if a run fails.
- If you later switch to **Delete the file**, check the destination first: originals are removed once they are delivered. See [Decide what happens to originals](./Sources.md#decide-what-happens-to-originals).
