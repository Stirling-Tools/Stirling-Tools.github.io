---
sidebar_position: 4
title: Pipelines
description: Create reusable document workflows with triggers, tool steps, destinations, and test runs.
id: Pipelines
---

# Pipelines

Open **Processor → Pipelines** to manage custom workflows and policies.

![Pipelines list and template gallery](/img/processor/pipelines.png)

## Create a workflow

Choose **New custom pipeline**, or select **Set up** on a [template](./Policies.md).

![Pipeline builder with input, operation chain, and settings](/img/processor/pipeline-builder.png)

1. Name the pipeline and select an input source.
2. Choose when it runs.
3. Add tools in the order they should run and configure each step.
4. Choose a destination, or return Editor results to the workspace.
5. Test the steps, then select **Create pipeline** or **Create paused**.

For a complete walkthrough, see [Create your first pipeline](./Getting-Started.md).

## Inputs and triggers

| Input | Triggers |
|---|---|
| **Editor** | Every upload or Every export |
| **Folder** | Manual, schedule, or folder watch |
| **S3 / SFTP / FTP / SMB** | Manual or schedule |
| **Webhook** | Signed HTTP delivery; see [Sources](./Sources.md#webhooks) |

Schedules use intervals in minutes, hours, or days. Folder watchers also check periodically for missed changes. Server triggers continue without a browser open; Editor workflows run during uploads or exports.

## Steps and supporting files

Each tool must accept the previous step's output format. A tool can appear more than once, with separate settings for each step.

Use [Integrations](./Integrations.md) for external service calls, [Ingestion](./Ingestion.md) for knowledge search, and [Routing](./Routing.md) to select destinations by document properties or classification.

Upload supporting files, such as stamp images or signing certificates, in the step settings. They are saved for future runs and shared within the team. Files must be non-empty and no larger than **50 MB**. Referenced files cannot be deleted until removed from the pipeline.

## Test and inspect output

**Test with a file** runs the current steps, including unsaved edits, and returns outputs for download. It does not write to the configured storage destination. External integration calls still run.

After checking the output, run one controlled live input to confirm delivery to storage.

## Save, pause, and edit

Open a pipeline to edit it, then select **Save changes**. **Customise** opens the full builder from a template's setup form.

Pausing stops future automatic runs. The pause/enable control takes effect immediately, independently of unsaved step changes.

## Destinations

Folder and S3 destinations save processed files, using a new filename when one already exists. RAG database destinations receive prepared chunks from an [Ingestion](./Ingestion.md) workflow.

Editor workflows can return results to the workspace. Database delivery and chunk exports need a separate destination. With [routing](./Routing.md), the default destination receives unmatched files.

## Other ways to run a workflow

- **Enforce as policy:** require an editor pipeline during uploads or exports.
- **[Automate](../Configuration/Automation/Pipeline.md):** save a sequence in the browser and run it against open files.
- **[Processing folder](./Processing-Folders.md):** attach a workflow to a folder in the file library.
