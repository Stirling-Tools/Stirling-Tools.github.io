---
sidebar_position: 8.5
id: Stirling Account Link
title: Stirling Account Link
description: Link a self-hosted Stirling PDF deployment to a Stirling account, and know exactly what is billed and what leaves your server
tags: [Account Link, Billing, Metering, Self-host, Processor]
---

# Stirling Account Link

Links one self-hosted deployment to a Stirling account, so billed work on your server draws on that account's plan and balance. Off by default, self-hosted only, and independent of Server and Enterprise license keys.

## What is billed

| Work | Billed |
|---|---|
| Automation: pipelines, workflows and policy steps | Yes |
| AI tools, however they are run, and any call authenticated with a Stirling API key, including read-only | Yes |
| Manual, interactive use of the non-AI PDF tools | No |

## Turn it on and link

- `stirling.billing.account-link.enabled`, default `false`. Master switch: allows linking, and refuses billed work when the deployment is not entitled.
- `stirling.billing.account-link.metering.enabled`, default `false`. Turns on usage counting, reporting and spend-cap enforcement.
- Link from the Processor portal at **Settings > Admin > Account link**. Needs the `ADMIN` role and a Stirling account that leads the target team.
- **Warning:** neither key ships in the settings file, so add both and restart. With the master switch on and metering off, automation, AI and API-key work is refused until the deployment is linked, but nothing is counted or reported.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    stirling:
      billing:
        account-link:
          enabled: true
          metering:
            enabled: true
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    STIRLING_BILLING_ACCOUNTLINK_ENABLED=true
    STIRLING_BILLING_ACCOUNTLINK_METERING_ENABLED=true
    ```
  </TabItem>
</Tabs>

## What is sent to Stirling

- Every 24 hours by default: a sequence number, the billing period start, and one cumulative total per category (`api`, `ai`, `automation`).
- At link time only: your short-lived account sign-in token and an optional deployment name. Never sent: document content, file names, hashes, endpoint paths, user identities or per-operation records.

## Related Documentation

- **[Paid Offerings](./Paid-Offerings.md)** - Server and Enterprise licensing, independent of linking
- **[API documentation](./API.md)** - API keys, whose traffic is billed
