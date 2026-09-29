---
sidebar_position: 1
title: Setup and access
description: Configure Processor access, folder permissions, and required services.
---

# Setup and access

## Open Processor

Open Stirling PDF in a web browser and select **Processor** in the quick access bar on the left. It is not currently accessible from the desktop app, although we will be adding it for desktop apps connected to supported environments.

Administrators and team leaders have access by default. Default users or environments without login will not be able to access Processor.

See the [Production Deployment Guide](../Server-Admin-Onboarding.md) for the underlying server setup.

## Who can open and manage it

| Action | Who can do it |
|---|---|
| Open Processor | Administrators and team leaders by default. Other users need to be given access. |
| Create, edit, pause, or delete [sources](./Sources.md) and [pipelines](./Pipelines.md), or start a pipeline with **Run now** | Administrators on self-hosted deployments. Team leaders on Stirling Cloud. |
| Run a [pipeline](./Pipelines.md) on your own files in the editor | Every member of the pipeline's team. |
| Check processing in [Documents](./Documents.md) | Anyone who can open Processor, to confirm pipelines ran and troubleshoot problems. It shows processing records, never the documents themselves. |
| [View pipeline failures](./Review.md) | Everyone sees failures from their own runs, so they can fix them. Administrators on self-hosted deployments, and team leaders on Stirling Cloud, also handle failures from the team's pipelines, including scheduled and folder-watch runs. |

Pipelines and sources belong to their owning team.

## Account linking

To use your team's cloud processing allowance on a self-hosted server, follow [Account linking](../Stirling-Account-Link.md). The guide explains how to connect, what is synchronized, and how to manage the connection. Enterprise does not require linking.

## Allow server folders

A **Folder** source uses a path on the server, or inside the container.

1. Mount or create separate input and output directories.
2. Give the Stirling PDF process permission to read the input and write the output. **Delete the file** mode also needs permission to remove originals.
3. Add their parent directory in the **Folder Access** section of **Settings → Server → System**, or set `policies.allowedFolderRoots` with one of the methods below.
4. Restart Stirling PDF after changing the allowed folders.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    policies:
      allowedFolderRoots:
        - /data/processor
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    POLICIES_ALLOWEDFOLDERROOTS=/data/processor
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          POLICIES_ALLOWEDFOLDERROOTS: /data/processor
        volumes:
          - ./processor:/data/processor
    ```
  </TabItem>
</Tabs>

Separate several directories with commas in an environment variable, for example `/data/processor,/mnt/scans`. An environment variable replaces the list in the settings file.

For a container, mount your host's directory at `/data/processor` and enter paths such as `/data/processor/inbox` and `/data/processor/processed` in the UI.

The list is empty by default; Stirling PDF's own storage and watched folders are always allowed. Every signed-in user can set up [processing folders](./Processing-Folders.md) under these directories, so allow only directories all your users may use. Processing folders keep the original of every file they replace. Folder access is unavailable on Stirling Cloud.
