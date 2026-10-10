---
sidebar_position: 3
title: Folder scanning
sidebar_label: Folder scanning
description: Process files automatically by dropping them into a watched folder on the server alongside a pipeline JSON file exported from Automate.
---

# Folder scanning

Folder scanning runs a saved workflow on every file dropped into a watched folder on the server. Each job folder holds one pipeline JSON file, and the server processes new files in it once a minute. No one needs to be signed in.

Folder scanning runs on self-hosted servers only. It isn't part of the desktop app. For a saved, monitored workflow with a folder trigger, see the Processor's [Sources](../../Processor/Sources.md) and [Pipelines](../../Processor/Pipelines.md).

:::danger Input files are deleted
After a successful run, the input files are deleted from the job folder. Keep a copy of any originals you need.
:::

## 1. Export the pipeline

Build the workflow with the **Automate** tool ([Automate](../../Tools/Guides/Automate.md)) and select **Export for Folder Scanning**. This downloads `<name>.folder-scan.json`. The plain **Export** button produces a different format that only works for importing back into Automate.

You can also write the file by hand. Each step names an API `operation` and its `parameters`. `outputDir` and `outputFileName` control where results go, and folder scanning needs both. A minimal file:

```json
{
  "name": "Compress invoices",
  "pipeline": [
    { "operation": "/api/v1/misc/compress-pdf", "parameters": { "optimizeLevel": 5 } }
  ],
  "outputDir": "{outputFolder}",
  "outputFileName": "{filename}-{date}"
}
```

The format and operations are described in [Pipeline API](../../Developers/Pipeline-API.md#json-format), including [filters](../../Developers/Pipeline-API.md#filters) that skip files which don't match.

## 2. Create a job folder

Make a subfolder in the watched folder for each workflow, put its JSON file in it, then drop files next to the JSON:

```text
pipeline/
├── watchedFolders/
│   └── invoices/
│       ├── compress-invoices.folder-scan.json
│       ├── invoice-001.pdf
│       └── invoice-002.pdf
└── finishedFolders/
```

- The watched folder is `/pipeline/watchedFolders` in Docker, or `pipeline/watchedFolders` next to a JAR. Mount `/pipeline` as a volume to reach it from the host.
- Only subfolders are job folders. Files dropped straight into `watchedFolders` are never processed.
- The server uses the first `.json` file it finds in a job folder, so keep one per folder. A folder with no `.json` file is skipped.

## How files are processed

- Every 60 seconds the server checks each job folder and processes the files in it.
- Files still being copied in are skipped and picked up on a later check.
- Files whose type the workflow can't accept are skipped and left in place.
- While a file is being processed it sits in a `processing` subfolder of the job folder.

## Results and file names

Results go to `outputDir`. Exported files set it to `{outputFolder}`, the finished folder (`/pipeline/finishedFolders` in Docker), and `outputFileName` to `{filename}`.

- `outputDir` accepts `{outputFolder}` (the finished folder) and `{folderName}` (the job folder).
- `outputFileName` accepts `{filename}`, `{pipelineName}`, `{date}` (`yyyyMMdd`) and `{time}` (`HHmmss`).

With the exported defaults, every result lands in the same folder and a later file with the same name overwrites an earlier one. Add `{date}` and `{time}` to `outputFileName`, or `{folderName}` to `outputDir`, to keep them apart.

## Errors

- If the workflow reports an error, the files move to an `error` subfolder of the job folder. Fix the cause, then move them back to retry.
- If processing stops unexpectedly, the files stay in the `processing` subfolder. Move them back to the job folder to retry.
- If nothing happens, wait at least a minute, check the server can read and write the folders, and look for errors in the server log (for example `docker logs stirling-pdf`).

## Folder settings

Change the folders in **Settings → Server → System → Custom Paths**, under **Pipeline Directories**. Enter one path per line, or separate them with commas, in **Watched Folders Directories**. Changes apply after a restart.

| Setting | Default | What it does |
|---|---|---|
| `system.customPaths.pipeline.pipelineDir` | `pipeline` | Base folder for the watched and finished folders. |
| `system.customPaths.pipeline.watchedFoldersDirs` | `[]` | List of watched folders. Every entry is scanned. |
| `system.customPaths.pipeline.watchedFoldersDir` | `<pipelineDir>/watchedFolders` | A single watched folder. |
| `system.customPaths.pipeline.finishedFoldersDir` | `<pipelineDir>/finishedFolders` | Where results go. |
| `autoPipeline.fileReadiness.enabled` | `true` | Wait until a file has finished being written before processing it. |
| `autoPipeline.fileReadiness.settleTimeMillis` | `5000` | How long a file must be unchanged before it counts as complete. |
| `autoPipeline.fileReadiness.sizeCheckDelayMillis` | `500` | Pause between two size checks when detecting a file still being written. |
| `autoPipeline.fileReadiness.allowedExtensions` | `[]` | Only process these extensions, without the dot, such as `["pdf", "tiff"]`. Empty accepts all. |

:::warning Check the startup log
A watched folder that is the same as the finished folder, or inside it, logs a `CRITICAL` processing-loop error. Nested watched folders, or a finished folder inside a watched folder, log warnings.
:::
