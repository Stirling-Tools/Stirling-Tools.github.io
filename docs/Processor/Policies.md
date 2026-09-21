---
sidebar_position: 2
title: Policies
description: Standing rules that apply the same tools to every document, with triggers, destinations and team access
tags: [Processor, Policies, Automation, Security, Self-host]
---

# Policies

A policy applies the same ordered set of tools to every document, and is built at `/processor/policies`. Every policy belongs to one team and is invisible to every other team, admins included.

## Categories
- **Security**, runs on `export`. Redact and Sanitize start enabled, Watermark starts disabled. Redact and Watermark rasterise the page, so all selectable text is destroyed; redaction is seeded with the validated US Social Security number and card number patterns, with IBAN, US routing (ABA), labelled account number, email and phone offered unselected.
- **Classification**, runs on `upload`. Reads the first two and last two pages and writes a label from the built-in set into the `StirlingPDFClassification` Info key; unmatched documents pass through, and the step is always pinned last in the order. Needs `aiEngine.enabled` and `aiEngine.features.classify` on, see [AI Overview](../AI/AI-Overview.md); otherwise it runs in the browser instead.
- Every team except `Internal` starts with an enabled **Classification Policy** owned by `system`, and deleting it lasts only until the next restart. **Ingestion**, **Compliance**, **Routing** and **Retention** appear in the catalogue with no configuration or behaviour.

## Triggers
- **Folder watch** requires a `folder` source with a watchable directory. Events are collected for `policies.watchQuietPeriodMs` (default `500`) so one file copy starts one run, and a catch-up pass runs every `policies.watchReconcileSeconds`, the first at startup.
- **Schedule** puts no constraint on the source type. Kinds are `every` (a count plus `MINUTES`, `HOURS` or `DAYS`), `daily`, `weekly` and `monthly` (day 1-31); the zone defaults to UTC, months too short for the chosen day are skipped, and schedules are checked every `policies.scheduleSweepSeconds` (default `60`).
- **Webhook** requires a `webhook` source. A delivery larger than `policies.webhookMaxBytes` is rejected.

## Output and access
- Triggers are attached to the source binding in the [Pipelines](./Pipelines.md) builder; policies built from the Policies view have none, take one source and one destination at most, both owned by your team, and keep results in place until the retention window passes, after which download returns `404`. A destination delivers to a folder inside `policies.allowedFolderRoots` or to S3 instead, and an unreachable destination falls back to in place.
- **Output & run**, shown only for the Editor source: **Run on** `upload` or `export`, **Output as** `new_version` (replaces the input) or `new_file`, and **Filename rule** `prefix`, `suffix` or `auto-number`. Leave the name empty to keep the input filename.
- Nothing is retried. `POLICY_QUEUE_FULL` is the exception, retried by the editor up to 5 times from a 4-second backoff; a failed file is parked until it changes or you use **Clear processed history**; a failed or timed-out export run (about 2.5 minutes) exports the original file with a warning rather than blocking the export.
- Any team member can view a policy and run it over files they supply. Creating, editing, pausing, deleting, reordering, clearing history and sweeping sources need the management role: global admin on the self-hosted Stirling PDF server, team leader on Stirling Cloud, anybody when login is disabled.

## Settings
| Key | Env | Default | Purpose |
|---|---|---|---|
| `policies.allowedFolderRoots` | none | `[]` | Absolute directories folder sources and folder destinations may use. Fail-closed, so no folder automation works until it is set, and changes need a restart |
| `policies.watchReconcileSeconds` | `POLICIES_WATCHRECONCILESECONDS` | `300` | Catch-up pass interval for folder watch and webhook |
| `policies.webhookMaxBytes` | `POLICIES_WEBHOOKMAXBYTES` | `104857600` | Maximum size of an incoming webhook delivery |

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    policies:
      allowedFolderRoots:
        - /srv/stirling/invoices
      watchReconcileSeconds: 300
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    POLICIES_WATCHRECONCILESECONDS=300
    ```
  </TabItem>
</Tabs>

## Worked example: redact and watermark on export
1. At `/processor/policies`, click the **Security** row to open the setup wizard. An existing Security policy opens its detail panel instead, where **Edit settings** reaches the same wizard.
2. On **Actions**, switch **Apply a watermark** on and set its text. Redact and Sanitize are already on.
3. On **Settings**, keep the **Editor** source, set **Run on** to `export` and **Output as** to `new_version`, leave the filename name empty, then click **Enable policy**.

## Related Documentation
- **[Sources](./Sources.md)** - every source type, the webhook delivery endpoint and the full `allowedFolderRoots` treatment
- **[Pipelines](./Pipelines.md)** - the step builder, stored assets and where triggers are configured
- **[Stirling Processor](./Processor.md)** - the sources, policies and destinations model, and who can reach the Processor
