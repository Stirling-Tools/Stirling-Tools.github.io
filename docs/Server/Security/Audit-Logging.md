---
sidebar_position: 5
title: Audit logging
sidebar_label: Audit logging
description: Record who ran which tool on which files, choose how much to log and how long to keep it, and review the log in Settings.
---

# Audit logging

Record every operation on your server: who ran it, which tool, which files and when. The full audit log needs an Enterprise licence.

Records are stored in the server's database. At high volume, use an [external database](../Storage/Database.md).

Without Enterprise, the server still records document processing for the Processor's [Documents](../../Processor/Documents.md) page and keeps those records for at most 30 days. Turning audit logging off also stops these records.

## Turn it on

Change the settings in **Settings → Server → Sign-in & security → Audit Logging**, or under `premium.enterpriseFeatures.audit`:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    premium:
      enterpriseFeatures:
        audit:
          enabled: true
          level: 2
          retentionDays: 90
          captureFileHash: false
          capturePdfAuthor: false
          captureOperationResults: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PREMIUM_ENTERPRISEFEATURES_AUDIT_ENABLED=true
    PREMIUM_ENTERPRISEFEATURES_AUDIT_LEVEL=2
    PREMIUM_ENTERPRISEFEATURES_AUDIT_RETENTIONDAYS=90
    PREMIUM_ENTERPRISEFEATURES_AUDIT_CAPTUREFILEHASH=false
    PREMIUM_ENTERPRISEFEATURES_AUDIT_CAPTUREPDFAUTHOR=false
    PREMIUM_ENTERPRISEFEATURES_AUDIT_CAPTUREOPERATIONRESULTS=false
    ```
  </TabItem>
</Tabs>

| Setting | In the app | Default | What it does |
|---|---|---|---|
| `enabled` | **Enable Audit Logging** | `true` | Turn audit logging on or off. |
| `level` | **Audit Level** | `2` | How much to record (see below). |
| `retentionDays` | **Audit Retention (days)** | `90` | Days to keep records. `0` or less keeps them forever. |
| `captureFileHash` | **Capture File Hash (SHA-256)** | `false` | Store a SHA-256 hash of each file. Adds 50-200 ms per file. |
| `capturePdfAuthor` | **Capture PDF Author Metadata** | `false` | Store the author field from each PDF. Slows processing. |
| `captureOperationResults` | **Capture Operation Results** | `false` | Store what each operation returned. Greatly increases log size, so use it only for debugging. |

## Audit levels

| Level | What's recorded |
|---|---|
| `0` OFF | Nothing |
| `1` BASIC | PDF operations (compress, split, merge and so on) and settings changes |
| `2` STANDARD | BASIC plus user actions such as sign-in, sign-out and account changes |
| `3` VERBOSE | Everything, including background polling requests |

## Review the log

Open **Settings → Monitoring → Audit log**. The **Dashboard**, **Audit Events**, **Export** and **Clear Data** tabs let you chart activity, search and filter events, export them as CSV or JSON, and permanently delete all audit data.
