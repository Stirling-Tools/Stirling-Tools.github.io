---
title: My files and sharing
sidebar_label: Files & sharing
sidebar_position: 3
description: Keep files on the server with the File library, organise them in folders, and share them with other users or by link.
---

# My files and sharing

<Badge>Login required</Badge>

The **File library** keeps your files on the server and lets you share them with other users.

On Stirling Cloud, guests can't store or share files. In the desktop app, sign in to Stirling Cloud or connect to a self-hosted server. On a self-hosted server, file storage is on by default, but an admin has to turn on sharing ([File storage and sharing](../../Server/Storage/File-Storage.md)).

## Open the File library

Click **File library** in the left rail, or **Browse all files & folders** next to **PDF Library** in the file sidebar.

Use **Filter by source** to see where each file lives:

- **Cloud** - stored on the Stirling server
- **Local** - only stored in this browser
- **Shared** - shared with you by someone else

## Keep a file on the server

- From the workspace: open the file's **More actions** menu in the file sidebar and choose **Upload to server**. After you change the file, choose **Update on server** to save the new version.
- In the File library: select files and choose **Add to Stirling library…**. Files you upload or drop while a server folder is open go straight into that folder.

## OneDrive and SharePoint

When an admin has set up [OneDrive and SharePoint](../../Server/Storage/OneDrive.md), select **+** in the file sidebar, then **Open from OneDrive**. The Microsoft file picker shows **My files**, **Recent** and, for work and school accounts, SharePoint **Shared libraries**.

To save edits back, connect your account once: go to **Settings → Connected accounts**, select **Connect** next to **Microsoft (OneDrive & SharePoint)** and sign in. Saving back needs a work or school account. Files opened from OneDrive show **From OneDrive**, and their **More actions** menu adds:

| Action | Result |
|---|---|
| **Update in OneDrive** | Replaces the original. OneDrive keeps the earlier version in its version history. |
| **Save a copy in OneDrive** | Saves `name (edited).pdf` next to the original. |
| **Upload to OneDrive...** | Saves to a folder you choose. Available for any file. |
| **Open in OneDrive** | Opens the original in OneDrive. |

Stirling replaces a file only while it is unchanged in OneDrive since you opened or last saved it. If someone else changed, moved or deleted it, save your version as a copy.

Your connected account also lets your [Processor pipelines](../../Processor/Sources.md#onedrive-sharepoint-and-google-drive) read from and save to OneDrive and SharePoint. If the account shows **Sign in again**, Stirling can no longer reach it and pipelines that use it pause until you sign in.

## Organise files

- Click **New folder**, then **New folder on the server**. Server folders are private to you.
- Open a folder's menu to **Rename** it, add a **New subfolder**, change its color and icon with **Appearance...**, or **Delete folder**.
- Drag files onto a folder in the tree on the left, or select them and choose **Move to…**.
- Open a file's **Version journey** to see earlier versions, open one in the workspace, or remove it.
- When you delete a file that's both on this device and on the server, choose **This device only**, **Cloud only** or **Everywhere**.

## Share a file

Select the file in the File library and choose **Manage sharing**, or click **Share** in the toolbar above an open file. If the file isn't on the server yet, click **Save to server & share** first.

Each person or link gets a role: **Editor** (the default), **Commenter** or **Viewer**. **Commenter** and **Viewer** can open and download the file. Only the owner can replace the file, delete it or change who has access.

### Share with a person

Under **Shared users**, enter their **Username or email** and click **Add**.

They need an account on the server you're using (on Stirling Cloud, a Stirling Cloud account). Remove access at any time with **Remove**.

### Share with a link

Pick a **Role**, click **Generate Link**, then **Copy**.

Anyone with the link must sign in before they can open it. They can then click **Open in Stirling PDF** or **Download**. Links expire after a set number of days (on a self-hosted server an admin sets this, 3 by default). To stop a link working, click **Remove link**.

To see who used a link, click **View activity**. It lists each person, whether they **Viewed** or **Downloaded** the file, and when.
