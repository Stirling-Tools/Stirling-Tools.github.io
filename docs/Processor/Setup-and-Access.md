---
sidebar_position: 1
title: Setup and access
description: Configure Processor access, folder permissions, and required services.
---

# Setup and access

## Open Processor

Use the app switcher to select **Processor**, or open `/processor` on the same host as the editor. Include your installation's URL prefix if Stirling PDF is served beneath a subpath.

If Processor is missing, ask your administrator to check that your installation includes it and your account has access.

See [Server Admin Onboarding](../Server-Admin-Onboarding.md) for the underlying server setup.

## Who can open and manage it

| Action | Permission |
|---|---|
| Open Processor | Administrator, team leader, or a user granted access under the policy below. |
| Create, edit, pause, delete, or sweep sources and pipelines | Administrator on self-hosted deployments; team leader on Stirling Cloud. |
| Run a permitted pipeline over supplied files | Subject to that pipeline's team and run permissions. |
| View Documents | Any user with Processor access. Self-hosted users see the server's processing feed; Cloud users see their team's feed. |
| Review failures | Members see their own failures; team leaders can review their team's failures. |

With login disabled, the local operator is trusted for source and pipeline management. Enable login for shared deployments.

The server access default is `security.portal.defaultAccess` (environment variable `SECURITY_PORTAL_DEFAULTACCESS`):

| Value | Effect |
|---|---|
| `ADMINS_AND_TEAM_LEADS` | Default. Administrators and eligible team leaders have access, alongside explicit grants. |
| `ORG_ALL` | Opens access across a self-hosted deployment. |
| `EXPLICIT_ONLY` | Requires an explicit grant for non-administrators. |

Manage people and access under **Settings → Users** (`/settings/users`). Pipelines and sources belong to their owning team.

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

## Check the processing record

The Documents page is available without an Enterprise license, but its feed needs processing events to be recorded. On self-hosted deployments, enable audit recording at a level that includes processing:

```yaml
premium:
  enterpriseFeatures:
    audit:
      enabled: true
      level: 2
```

See [Documents](./Documents.md) for viewing activity and [Audit Logging](../Configuration/Security/Audit%20Logging.md) for Enterprise audit administration.
