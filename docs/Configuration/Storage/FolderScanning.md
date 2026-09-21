---
sidebar_position: 4
id: Folder Scanning
title: Folder Scanning
description: Process files automatically by dropping them into a watched folder alongside a pipeline JSON configuration
tags:
  - Automation
  - Storage
  - Self-host
---

# Folder Scanning

Folder scanning processes files automatically: drop them into a job folder that also holds a pipeline JSON file, and the server runs that pipeline against them on its next sweep. No sign-in required.

The JSON is produced by the **Automate** tool, so read the [Pipeline Guide](../Automation/Pipeline.md) first.

:::info Also available in the Processor
A folder [source](../../Processor/Sources.md) on a folder-watch [policy](../../Processor/Policies.md) does the same job with saved records.
:::

:::danger Input files are consumed
On a successful run the input files are deleted from the job folder. Only the output written to the finished folder survives, so never point a watched folder at the only copy of your documents.
:::

## Setting Up Watched Folders

- Default watched root: `./pipeline/watchedFolders/`; in the Docker images, `/pipeline/watchedFolders`.
- The same paths are in **Admin Settings -> General -> Custom Paths -> Pipeline** as "Watched Folders Directories", one path per line or comma-separated. A saved value is marked pending until the server restarts.
- Only subdirectories are treated as job folders; files dropped directly into the watched-folders root are never processed.

## Configuring Processing with JSON Files

- Each job folder needs exactly one `.json` file. A directory with no `.json` file is skipped.
- Build the workflow in the **Automate** tool and click **Export for Folder Scanning** to download it. The neighbouring **Export** button emits a different format, meant for re-importing into Automate.

## Automatic Scanning and Processing

- The system checks every watched root once a minute, and processes the files in each subdirectory that holds a valid JSON configuration file.
- Files that are still being written are skipped and retried on a later scan.
- A file whose extension is not an accepted input for the operation is skipped and left in the job folder.

## Results and Output

- `outputDir` accepts the placeholders `{outputFolder}` and `{folderName}`; `outputFileName` accepts `{filename}`, `{pipelineName}`, `{date}` (`yyyyMMdd`) and `{time}` (`HHmmss`).
- The Automate export defaults to `outputDir: {outputFolder}` and `outputFileName: {filename}`, so results land flat in the finished folder and a later run silently overwrites an earlier file of the same name. Add `{date}`/`{time}`, or `{folderName}` in `outputDir`, to keep runs apart.

## Error Handling

- If the pipeline reports errors, the files are moved into an `error` subdirectory of the job folder. Nothing is retried automatically - fix the cause, then move the files back up a level yourself.
- If processing fails unexpectedly, files are left in the job folder's `processing` subdirectory. They are not retried - move them back up to the job folder root yourself to reprocess.

## Configuration Reference

| Key | Env | Default | Purpose |
|---|---|---|---|
| `system.customPaths.pipeline.pipelineDir` | `SYSTEM_CUSTOMPATHS_PIPELINE_PIPELINEDIR` | `""` | Base directory the watched and finished folders sit under. Defaults to `./pipeline`. |
| `system.customPaths.pipeline.watchedFoldersDirs` | `SYSTEM_CUSTOMPATHS_PIPELINE_WATCHEDFOLDERSDIRS` | `[]` | List of watched-folder roots. Every entry is scanned. |
| `system.customPaths.pipeline.watchedFoldersDir` | `SYSTEM_CUSTOMPATHS_PIPELINE_WATCHEDFOLDERSDIR` | `""` | Single watched-folder root. Defaults to `<pipelineDir>/watchedFolders`. |
| `system.customPaths.pipeline.finishedFoldersDir` | `SYSTEM_CUSTOMPATHS_PIPELINE_FINISHEDFOLDERSDIR` | `""` | Where results land. Defaults to `<pipelineDir>/finishedFolders`. |
| `autoPipeline.fileReadiness.enabled` | `AUTOPIPELINE_FILEREADINESS_ENABLED` | `true` | Whether to wait for a file to finish being written before processing it. |
| `autoPipeline.fileReadiness.settleTimeMillis` | `AUTOPIPELINE_FILEREADINESS_SETTLETIMEMILLIS` | `5000` | How long a file must be unmodified before it counts as complete. |
| `autoPipeline.fileReadiness.sizeCheckDelayMillis` | `AUTOPIPELINE_FILEREADINESS_SIZECHECKDELAYMILLIS` | `500` | Delay used when checking whether a file is still being written. |
| `autoPipeline.fileReadiness.allowedExtensions` | `AUTOPIPELINE_FILEREADINESS_ALLOWEDEXTENSIONS` | `[]` | Optional extension allow-list, without the leading dot. Empty accepts all. |

:::warning Check the startup log
A watched folder that equals the finished folder, or sits inside it, logs a `CRITICAL` processing-loop error. Nested watched roots and a finished folder nested inside a watched folder log warnings.
:::

## Related Documentation

- **[Pipeline Automation (Automate)](../Automation/Pipeline.md)** - building the workflow and exporting the JSON this page consumes
- **[Sources](../../Processor/Sources.md)** - the Processor's saved folder source
- **[Policies](../../Processor/Policies.md)** - the folder-watch trigger that sweeps a Processor folder source
