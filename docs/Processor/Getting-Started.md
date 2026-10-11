---
sidebar_position: 2
title: Create your first pipeline
description: >-
  Build and test a pipeline that compresses PDFs, then switch on automatic
  processing.
---

# Create your first pipeline

You need [management access](./Setup-and-Access.md#who-can-open-and-manage-it).

The folder walkthrough needs a self-hosted server. On Stirling Cloud, use an [Amazon S3 source](./Sources.md#s3) instead.

## Compress editor downloads

1. Open **Processor → Pipelines → New custom pipeline** and name it **Compress downloads**.
2. Choose **Editor** as the input and set **Runs on** to **Every export**.
3. Select **Add a tool**, add **Compress** and choose the settings. Leave the destination as **Editor**.
4. Select **Test with a file** and check the result.
5. Select **Create pipeline**.
6. Open a PDF in the editor and download it. The download is the compressed file.

An editor pipeline runs for everyone in your team, and each run uses credits ([Credits](./Setup-and-Access.md#credits)).

## Compress files from a server folder

An administrator must first allow the folders you use ([Processor server settings](../Server/Automation/Processor-Settings.md#allow-server-folders)).

### 1. Connect an inbox

1. Open **Processor → Sources → Connect source**.
2. Choose **Folder**.
3. Name it **Invoice inbox** and under **Folder** enter a path on the server, such as `/data/processor/inbox`.
4. Leave **Folder depth** at **Top level only**.
5. Expand **Advanced**. Under **After processing**, choose **Keep it, and only process it again if it changes** so testing does not delete originals.
6. Select **Create source**.

![Folder source configuration with advanced processing controls](/img/processor/folder-source.png)

Originals stay in place, and an unchanged file is not processed again.

### 2. Connect an output folder

Create another Folder source named **Processed invoices**, with a path such as `/data/processor/processed`. Keep it outside the inbox so the pipeline does not process its own output.

### 3. Build the pipeline

1. Open **Pipelines → New custom pipeline**.
2. Name it **Compress incoming invoices**.
3. Choose **Invoice inbox** as the input and leave the trigger at **Manual only**.
4. Select **Add a tool**, add **Compress** and choose the compression settings.
5. Select **Processed invoices** as the destination.
6. Complete any settings the builder highlights.

![Compress incoming invoices pipeline: Invoice inbox, Compress, and Processed invoices](/img/processor/first-pipeline.png)

### 4. Test one document

Select **Test with a file** and choose a sample PDF. The results come back as a download and are not delivered to the destination. Check the content, page count and file size.

![Test with a file button above the pipeline steps](/img/processor/test-with-a-file.png)

### 5. Save, then turn it on

Save with **Create paused** while you finish checking. When you are ready, open the pipeline, change its trigger to **Folder watch**, select **Save changes**, then select **Activate**.

Place a new PDF in the inbox and confirm the result reaches the output folder.

### 6. Check it runs

Open [Documents](./Documents.md) for the processing record and [Review](./Review.md) if a run fails. Before switching the inbox to **Delete the file**, confirm deliveries work: originals are removed once delivered ([Decide what happens to originals](./Sources.md#decide-what-happens-to-originals)).
