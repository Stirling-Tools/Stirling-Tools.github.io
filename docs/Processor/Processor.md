---
sidebar_position: 0
id: Stirling Processor
title: Stirling Processor
description: Collect documents automatically, run PDF tools over them, and deliver the results without anyone opening the editor
tags: [Processor, Automation, Policies, Pipelines, Self-host]
---

# Stirling Processor

Runs PDF tools over documents automatically: a source supplies files, ordered steps process them, a destination receives the results. It sits at `/processor`, on the same host, port and login as the editor.

:::warning Needs a build that includes the Processor. The standard published Docker image does not - see [Server Admin Onboarding](../Server-Admin-Onboarding.md).
:::

## What an automation needs

| Part | Facts |
|---|---|
| **Source** | A server folder, S3, SFTP, FTP, SMB, a webhook, or the document open in the editor. S3, SFTP, FTP and SMB need a stored connection under [Integrations](./Integrations.md) first. Folder paths must sit under `policies.allowedFolderRoots`, which ships empty |
| **Trigger** | Folder watch (folder sources only), schedule (any source, every N minutes, hours or days), webhook (webhook sources only), or none. Any automation can also be run by hand |
| **Steps** | Stirling PDF tools in order, each with its settings. Supporting files such as a stamp image are uploaded once as stored assets |
| **Destination** | Exactly one, required before saving. Only folder and S3 sources can be written to; SFTP, FTP, SMB and webhook are input only |

Example: supplier invoices land in a watched folder, a single **Compress** step runs, and the results are delivered to the S3 bucket the finance system reads.

## Tour

| View | What it is |
|---|---|
| **[Sources](./Sources.md)** | The saved storage locations documents are read from and written to |
| **[Policies](./Policies.md)** | Category presets that build an automation you apply from the editor. Security and Classification are the categories available |
| **[Pipelines](./Pipelines.md)** | Input source, trigger, ordered steps, destination and stored assets |
| **[Documents](./Documents.md)** | The processing record. Needs an Enterprise [licence](../Modes-and-Licensing.md) and, self-hosted, the admin role |
| **Users** | Grants Processor access per user or per team. `security.portal.defaultAccess` / `SECURITY_PORTAL_DEFAULTACCESS` decides who else gets in: `ORG_ALL`, `ADMINS_AND_TEAM_LEADS` (default), `EXPLICIT_ONLY` |

## Related Documentation

- **[API Keys and Audit](./API-Keys-and-Audit.md)** - the two working Infrastructure tabs
- **[Pipeline Automation (Automate)](../Configuration/Automation/Pipeline.md)** - the in-editor automation tool, separate from the Processor
