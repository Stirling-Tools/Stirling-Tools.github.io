---
sidebar_position: 4
title: Processing folders
description: Turn a folder in the File library into a processing folder that runs a preset on every file you add.
sidebar_label: Processing folders
---

# Processing folders

<Badge>Login required</Badge>

A processing folder runs the same processing on every file you put in it, for example classifying documents ([My files and sharing](./Files-and-Sharing.md)).

Processing folders are personal: only you can see them. Presets marked **Requires AI engine** only work when AI is available. On Stirling Cloud, processing uses your team's credits ([Plans, credits and billing](../../Cloud/Plans-and-Billing.md)).

## Set up a folder

1. Start from either place:
   - Click **Process a folder** in the left rail.
   - In the **File library**, open a folder's menu and choose **Process files in this folder...**. This skips step 2.
2. Choose the folder. Pick one under **Server storage**, or create a new one, then click **Choose processing**.
3. Pick a preset and adjust its settings. The presets are the same policy types the Processor uses ([Policies](../../Processor/Policies/Policies.md)).
4. Click **Enable processing**.

Files already in the folder and any you add later are processed on the server. The folder shows how many files are **Ready**, **Processing**, **Failed** or **Queued**.

## Manage a folder

Open the folder's menu in the File library:

- **Edit processing...** - change the preset or its settings, then click **Save changes**. Saving replaces the folder's current processing.
- **Pause processing** / **Resume processing** - stop and restart processing new files.
- **Retry failed files** - run failed files again.
- **Restore all originals** - put back the original of every processed file. Processing is paused until you resume it. To restore one file, use **Restore original** on that file.
- **Remove processing** - turn the folder back into a normal folder.

## In the desktop app

Sign in to Stirling Cloud or connect a self-hosted server first ([Connection modes](../../Desktop/Connection-Modes.md)). Until you do, the app shows **Sign in to Stirling Cloud or connect a self-hosted server to process folders.**

- The setup also offers **On this computer**: click it and choose any folder on your computer. The app watches that folder while it's running and signed in, and sends new or changed PDFs to Stirling Cloud or your server for processing.
- **Try processing your downloads folder** classifies the PDFs already in your Downloads folder and opens the results in the app. The files in Downloads aren't changed.

## For server admins

On a self-hosted server, processing folders store files in the server's file storage, which an admin turns on ([File storage and sharing](../../Server/Storage/File-Storage.md)). AI presets need AI set up ([AI on your server](../../Server/AI/AI.md)).
