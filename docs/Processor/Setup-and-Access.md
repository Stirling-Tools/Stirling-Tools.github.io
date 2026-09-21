---
sidebar_position: 1
title: Setup and access
description: Check build availability, permissions, folder access, and processing prerequisites.
---

# Setup and access

## Open Processor

Use the app switcher to select **Processor**, or open `/processor` on the same host as the editor. Include your installation's URL prefix if Stirling PDF is served beneath a subpath.

The frontend must include the Processor. In the application source, this is controlled by the Gradle property `buildWithPortal` and the embedded Docker build argument `BUILD_PORTAL`; the Dockerfiles default that argument to `false`. Setting an environment variable on an already-built container cannot add missing frontend routes. Check the build you deploy instead of assuming every image includes Processor.

See [Server Admin Onboarding](../Server-Admin-Onboarding.md) for the underlying server setup.

## Who can open and manage it

Processor access and permission to change automation are separate checks.

| Action | Permission |
|---|---|
| Open Processor | Administrator, an eligible team leader, or an explicitly granted user, according to the access policy below. |
| Create, edit, pause, delete, or sweep sources and pipelines | Administrator on self-hosted deployments; team leader on Stirling Cloud. |
| Run a permitted pipeline over supplied files | Subject to that pipeline's team and run permissions. This does not grant management access. |
| View Documents | Any user with Processor access. Self-hosted users see the server's processing feed; Cloud users see their team's feed. |
| Review failures | Members see their own failures; team leaders can review their team's failures. |

With login disabled, the local operator is trusted for source and pipeline management. Do not expose an unauthenticated deployment to people who should not control its automation.

The server access default is `security.portal.defaultAccess` (environment variable `SECURITY_PORTAL_DEFAULTACCESS`):

| Value | Effect |
|---|---|
| `ADMINS_AND_TEAM_LEADS` | Default. Administrators and eligible team leaders have access, alongside explicit grants. |
| `ORG_ALL` | Opens access across a self-hosted deployment. It does not remove Cloud tenant boundaries. |
| `EXPLICIT_ONLY` | Requires an explicit grant for non-administrators. |

Manage people and access under **Settings → Users** (`/settings/users`). Pipelines and sources remain scoped to their owning team; administrator access does not combine every team's pipelines into one list.

## Allow server folders

A **Folder** source uses a path on the server, or inside the container. It does not refer to the browser user's computer.

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

The configured list is empty by default. Stirling-managed storage and pipeline watched folders have implicit access, while the configuration directory stays protected. Folder access is unavailable on Stirling Cloud. Allowed roots also enable processing-folder access, so allow only the directories users are intended to process.

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

The configuration retains its `enterpriseFeatures` name even though document-processing events are recorded without an Enterprise license. Full audit administration remains an Enterprise feature. See [Documents](./Documents.md).
