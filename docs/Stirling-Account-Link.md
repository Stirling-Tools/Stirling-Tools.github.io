---
sidebar_position: 8.5
id: Stirling Account Link
title: Stirling Account Link
description: Connect a self-hosted deployment to a Stirling account and understand local and cloud usage accounting.
tags: [Account Link, Billing, Self-host, Processor]
---

# Stirling Account Link

Account linking connects a self-hosted deployment to a Stirling account's processing entitlement. Open **Settings → Account link** (`/settings/account-link`) as an administrator and follow the connection flow using an account that leads the target team.

Linking is optional. Current builds also maintain a local monthly allowance while unlinked; leaving the server unlinked does not make automation unlimited.

## Which operations count

| Work | Current accounting behavior |
|---|---|
| Pipeline, workflow, and policy processing | Automation usage; grouped document runs avoid counting the same input as a separate document for every ordinary step. |
| AI document tools | AI usage. Assistant reasoning and health requests are not themselves charged document-tool operations; dispatched processing can count as automation. |
| API-key calls to PDF tool endpoints | API usage. Non-tool information, configuration, and download requests are excluded. |
| Manual, interactive non-AI PDF tools | Excluded from processing usage. |

Usage is measured in document units, taking the input's page count and size into account. Do not interpret one HTTP request as one unit. Successful operations with non-empty document inputs are recorded; failures are not accrued by the request meter.

A self-hosted Team license covers direct PDF tool API calls, while Processor automation and AI use their applicable processing entitlement. Enterprise processing stays in the local usage ledger and is not converted into cloud pay-as-you-go spend. See [Paid Offerings](./Paid-Offerings.md) for licensing and use **Usage & Billing** for your deployment's current entitlement.

## Configuration defaults

These settings belong to the `stirling.billing.account-link` block:

| Setting | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Enables combined usage accounting, including the local free allowance. |
| `freeTierUnits` | `1000` | Monthly document units while unlinked. A value of `0` requires another applicable entitlement for metered work. |
| `metering.enabled` | `false` | Enables the cloud usage ledger and synchronization. This does **not** turn off local free-tier accounting. |
| `metering.syncIntervalHours` | `24` | Cloud usage synchronization interval. |
| `metering.graceDays` | `3` | Offline grace period for cloud-backed entitlement. |

For a linked deployment using cloud metering:

```yaml
stirling:
  billing:
    account-link:
      enabled: true
      metering:
        enabled: true
```

The environment equivalents are `STIRLING_BILLING_ACCOUNTLINK_ENABLED` and `STIRLING_BILLING_ACCOUNTLINK_METERING_ENABLED`. Restart after changing server configuration. Setting the master `enabled` switch to `false` disables this combined gate and accounting, including its local allowance; it does not supply missing licensed features.

## When processing stops

Metered requests can return HTTP **402** with a reason such as `FREE_TIER_EXHAUSTED`, `OVER_LIMIT`, `REVOKED`, or `GRACE_EXPIRED`. Check the reason, connection state, remaining allowance, and any spend cap under Settings. Restore the cloud connection if the offline grace period has expired.

An unlinked instance can process within its local allowance. It is not blocked solely because it has not been linked. Manual non-AI tool use remains outside this processing gate.

## What is synchronized

Usage synchronization sends the billing period, a sequence number, and cumulative totals by category (`api`, `ai`, `automation`). This usage payload does not include document bytes, filenames, hashes, or individual operation records. The connection flow separately uses account authentication and deployment registration data.

This describes the account-link usage channel. AI providers and external integration steps have their own data flows; see [AI Security](./AI/AI-Security.md) and [Integrations](./Processor/Integrations.md).

## Related documentation

- [Processor](./Processor/Processor.md)
- [Modes](./Modes-and-Licensing.md)
- [API documentation](./API.md)
