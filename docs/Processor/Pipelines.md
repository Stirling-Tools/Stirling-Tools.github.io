---
sidebar_position: 4
title: Pipelines
description: Create reusable document workflows with triggers, tool steps, destinations, and test runs.
id: Pipelines
---

# Pipelines

Open **Processor → Pipelines** (`/processor/pipelines`). This list includes custom pipelines and pipelines enforced as policies. Older `/processor/policies` links redirect here.

![Pipelines list and template gallery](/img/processor/pipelines.png)

## Create a workflow

Choose **New custom pipeline**, or select **Set up** on a [template](./Policies.md) for a guided setup. [Ingestion](./Ingestion.md) combines OCR and knowledge-search preparation with input and output selection. The full builder lets you select an input, add and configure operations in order, and choose the output.

![Pipeline builder with input, operation chain, and settings](/img/processor/pipeline-builder.png)

1. Enter a name that describes the result.
2. Select one input source. You can create a missing source from the builder.
3. Choose when it runs, using the controls appropriate to that source.
4. Add tools and configure each step. Steps can repeat, but each occurrence needs its own settings.
5. For a storage input, choose one default destination. Editor input returns its results to the workspace.
6. Test the steps, then use **Create pipeline** or **Create paused**.

Required fields and incompatible steps are called out before saving. A disabled save action means there is still a setup issue to resolve.

## Inputs and triggers

| Input | How it runs |
|---|---|
| **Editor** | **Every upload** or **Every export**. The editor participates in the run and receives the output. |
| **Folder** | Manual, a schedule, or folder watch. |
| **S3 / SFTP / FTP / SMB** | Manual or a schedule. |
| **Webhook** | Signed HTTP delivery using a webhook trigger; see [Sources](./Sources.md#webhooks). |

Schedules use an interval in minutes, hours, or days. Due schedules are checked periodically, so the interval is not a promise of execution to the exact second. Folder watch also reconciles missed filesystem events.

An Editor workflow needs the editor to upload/export the file. Use a server folder, scheduled remote source, or webhook for unattended work that must continue with no browser open.

## Choose and order steps

Tools must accept the file type produced by the previous step. Check conversion output before adding a PDF-only tool. Place a terminal report-producing tool last when it does not provide a file for the next operation.

The builder includes supported PDF tools and [integration operations](./Integrations.md). A saved connection supplies credentials, while the step specifies the action to perform. Classification-based routing needs a **Classify** step and available AI classification; property-based routing does not. See [Routing](./Routing.md).

## Supporting files

Some steps need another file, such as a stamp image or signing certificate. Set that file in the step configuration. It is uploaded as a stored asset when you save, so future runs can reuse it.

Stored assets are scoped to the team. Empty files and files above 50 MB are refused. A file still referenced by a pipeline cannot be deleted. Do not distribute a signing pipeline to people who should not use its certificate.

## Test and inspect output

**Test with a file** runs the unsaved steps against one uploaded file. Test outputs are returned for download instead of being written to the saved destination. Integration steps still make their configured external calls.

Check the result before enabling a live trigger. Testing one document does not prove that every format or layout in your source will work; include representative files in your checks.

## Save, pause, and edit

Open a row to edit its configuration. Template-compatible workflows can open in the simple setup form; **Customise** opens the full builder. Use **Save changes** for configuration changes.

Pausing stops future automatic runs; it is not a rollback of files already processed. In the full builder, the pause/enable control updates the saved pipeline immediately, independently of pending step edits. Check the saved status before leaving.

## Destinations and routing

Folder and S3 receive processed files and avoid overwriting an existing output by choosing a non-conflicting filename. A RAG database destination receives prepared chunks from an [Ingestion](./Ingestion.md) workflow. For ordinary Editor processing, results can return to the workspace; database delivery and chunk exports need their corresponding destination.

With routing enabled, the default destination becomes the fallback. The first matching routing rule chooses a destination for that document. Configure it under [Routing](./Routing.md).

## Pipeline, policy, or Automate?

| Choice | Use it for |
|---|---|
| **Processor pipeline** | A saved workflow with an input, steps, and processing configuration shared through the server. |
| **Enforce as policy** | Require an editor pipeline to participate in the configured upload/export flow. Enforcement is available to managers and does not change the underlying PDF operations. |
| **Automate tool** | A browser-saved sequence that a person runs against open editor files. See [Automate](../Configuration/Automation/Pipeline.md). |
| **Processing folder** | Attach processing to a selected file-library folder. See [Processing folders](./Processing-Folders.md). |
