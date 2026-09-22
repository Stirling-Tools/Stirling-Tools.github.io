---
sidebar_position: 1
title: Setup and access
description: Configure Processor access, folder permissions, and required services.
---

# Setup and access

## Open Processor

Open Stirling PDF in a web browser and select **Processor** from the app switcher. Processor is not currently accessible from the desktop app.

Enable login on self-hosted installations and sign in before using Processor. Administrators and team leaders have access by default.

You can also open `/processor` on the same host as the editor. Include your installation's URL prefix if Stirling PDF is served beneath a subpath.

If Processor is missing, ask your administrator to check that your installation includes it and your account has access.

See [Server Admin Onboarding](../Server-Admin-Onboarding.md) for the underlying server setup.

## Who can open and manage it

| Action | Permission |
|---|---|
| Open Processor | Administrators and team leaders by default; other users need an access grant. |
| Create, edit, pause, delete, or sweep sources and pipelines | Administrator on self-hosted deployments; team leader on Stirling Cloud. |
| Run a permitted pipeline over supplied files | Subject to that pipeline's team and run permissions. |
| View Documents | Any user with Processor access. Self-hosted users see the server's processing feed; Cloud users see their team's feed. |
| Review failures | Members see their own failures; team leaders can review their team's failures. |

Pipelines and sources belong to their owning team.

## Account linking

To use your team's cloud processing allowance on a self-hosted server, follow [Account linking](../Stirling-Account-Link.md). The guide explains how to connect, what is synchronized, and how to manage the connection. Enterprise does not require linking.

## Allow server folders

A **Folder** source uses a path on the server, or inside the container.

1. Mount or create separate input and output directories.
2. Give the Stirling PDF process permission to read the input and write the output. Consume mode also needs permission to remove originals.
3. Add their parent directory under **Settings → Folder Access**, or configure `policies.allowedFolderRoots` in `settings.yml`.
4. Restart the application after changing allowed roots.

```yaml
policies:
  allowedFolderRoots:
    - /data/processor
```

For a container, mount your host's directory at `/data/processor` and enter paths such as `/data/processor/inbox` and `/data/processor/processed` in the UI.

The list is empty by default; managed storage and watched folders are already accessible. Allow only the additional directories your users need. Folder access is unavailable on Stirling Cloud.

## External services and AI

Create credentials under [Integrations](./Integrations.md) before selecting an S3 or network source. Private network addresses require the corresponding administrator setting described on [Sources](./Sources.md).

Most PDF tools and property-based routing do not require AI. A server **Classify** step requires AI classification to be available. See [AI Overview](../AI/AI-Overview.md) before using classification-based workflows.

[Ingestion](./Ingestion.md) uses the AI engine to prepare chunks. The Stirling knowledge base also needs an embedding provider; exporting chunks does not. A connected RAG database supplies its own embeddings. The guided form checks these requirements and links to AI settings when configuration is missing.
