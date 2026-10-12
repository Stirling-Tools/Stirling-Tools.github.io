---
sidebar_position: 1
title: Setup and access
description: >-
  Open Processor, see who can use and manage it, and how pipeline runs are
  counted on Stirling Cloud and self-hosted servers.
---

# Setup and access

<Badge>Login required</Badge>

## Open Processor

Open Stirling PDF in a web browser and select **Processor** in the left bar. On Stirling Cloud you can also go straight to [stirling.com/app/processor](https://stirling.com/app/processor). Processor is not part of the desktop app.

On a self-hosted server, Processor is only in builds that include it. If there is no **Processor** in the left bar, your build doesn't have it. [Folder scanning](../Server/Storage/Folder-Scanning.md) watches server folders without it.

If the button is greyed out with **Ask an admin for processor access**, your account does not have access yet.

## Who can open and manage it

| Action | Stirling Cloud | Self-hosted server |
|---|---|---|
| Open Processor | The team owner. Invited members cannot be given access. | Administrators and team leaders by default. An administrator can [give other users access](../Server/Automation/Processor-Settings.md#who-can-open-processor). |
| Create, edit, pause or delete [sources](./Sources.md) and [pipelines](./Pipelines.md), or start a pipeline with **Run now** | The team owner | Administrators |
| Run a [pipeline](./Pipelines.md) on your own files in the editor | Every team member | Every member of the pipeline's team |

Pipelines and sources belong to their owning team. For the other differences on Stirling Cloud, see [Processor and AI on Cloud](../Cloud/Processor-and-AI.md).

## Credits

Pipeline runs use credits. Manual tools in the editor never do.

- **Stirling Cloud:** runs draw on your team's monthly free credits. For more, the team owner turns on the Processor plan. See [Plans, credits and billing](../Cloud/Plans-and-Billing.md).
- **Self-hosted:** runs use the server's monthly free credits. An administrator can connect the server to a Stirling Cloud team to share that team's allowance; see [Connect to Stirling Cloud](../Server/Licensing/Connect-to-Stirling-Cloud.md). An Enterprise licence includes processing on the server, so connecting is optional.
