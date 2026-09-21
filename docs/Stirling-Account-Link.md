---
sidebar_position: 8.5
id: Stirling Account Link
title: Stirling Account Link
description: Link your deployment to a Stirling account and manage processing allowances.
tags: [Account Link, Billing, Self-host, Processor]
---

# Stirling Account Link

Connect a self-hosted deployment to a Stirling account to use its processing allowance. Open **Settings → Account link** as an administrator and sign in with an account that leads the target team.

Without linking, your server has a monthly allowance of 1,000 document units. Check **Settings → Usage & Billing** for your allowance, usage, and spend cap.

## What counts toward usage

| Work | Usage category |
|---|---|
| Pipelines, workflows, and policies | Automation |
| AI document tools | AI |
| Direct PDF tool calls using an API key | API |
| Manual, interactive non-AI PDF tools | No processing units |

Document units depend on the input's page count and size. Information, configuration, and download requests do not consume units.

A self-hosted Team license covers direct PDF tool API calls. Processor automation and AI use their applicable processing allowance. Enterprise usage is recorded locally without cloud pay-as-you-go charges. See [Paid Offerings](./Paid-Offerings.md) for licensing.

## Configuration

Add these settings under `stirling.billing.account-link` in `settings.yml`:

| Setting | Default | Purpose |
|---|---|---|
| `enabled` | `true` | Enable usage accounting and allowance limits. |
| `freeTierUnits` | `1000` | Monthly document units while unlinked. |
| `metering.enabled` | `false` | Synchronize cloud usage. Local usage is still recorded when this is off. |
| `metering.syncIntervalHours` | `24` | Cloud synchronization interval. |
| `metering.graceDays` | `3` | Offline grace period for cloud-backed allowance. |

To enable cloud metering for a linked deployment:

```yaml
stirling:
  billing:
    account-link:
      enabled: true
      metering:
        enabled: true
```

The environment equivalents are `STIRLING_BILLING_ACCOUNTLINK_ENABLED` and `STIRLING_BILLING_ACCOUNTLINK_METERING_ENABLED`. Restart after changing server configuration.

## When processing stops

HTTP **402** indicates an exhausted allowance, a spend limit, a revoked connection, or an expired offline grace period. Check **Usage & Billing** and your account connection. Restore connectivity if the grace period has expired.

## Usage data

Cloud synchronization sends billing-period totals by category. It excludes document content, filenames, and individual operation records. For document data sent to other services, see [AI Security](./AI/AI-Security.md) and [Integrations](./Processor/Integrations.md).
