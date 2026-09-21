---
sidebar_position: 11
title: Administration
description: Find shared settings for users, API keys, audit logs, account connection, and billing.
id: API Keys and Audit
---

# Administration

Server administration lives on the shared **Settings** page. It is no longer a collection of Processor sidebar tabs.

| Task | Current location |
|---|---|
| Manage users and teams | `/settings/users` |
| Create or revoke an API key | `/settings/api-keys` |
| Review plan and usage | `/settings/billing` |
| Connect a self-hosted instance to a Stirling account | `/settings/account-link` |
| Read documentation | `/docs` |

Older `/processor/users`, `/processor/infrastructure`, `/processor/usage`, and `/processor/docs` links redirect to the shared pages. Open the appropriate Settings section directly when looking for audit administration rather than relying on an old Infrastructure tab link.

## API keys

Open **Settings → API Keys**, create a named key, and copy its secret when shown. The secret cannot be recovered later. Keys are personal and use their owner's permissions; keep separate named keys for integrations you may need to revoke independently.

Send a key as `X-API-KEY: <key>` when calling the REST API. MCP authentication has additional modes described in [MCP Server](../Configuration/Automation/MCP-Server.md).

The key list includes creation and last-use information and usage counters where available. Revocation takes effect immediately. Replace the key in dependent services before revoking it if they need uninterrupted access.

Creating an API key does not automatically grant a pipeline access to another team's sources or files. Usage may be metered according to the deployment's plan and account-link configuration.

## Audit logs

Full audit administration is an Enterprise feature and requires the appropriate administrator access. Configure recording, retention, and exports in the audit section of Settings. See [Audit Logging](../Configuration/Security/Audit%20Logging.md).

The [Documents](./Documents.md) processing feed is available without Enterprise and shows a limited window of file operations. It does not provide all the filtering, retention, or export capabilities of full audit administration.

## Account and billing

Use **Usage & Billing** to inspect the entitlement and usage applying to your deployment. Self-hosted Team/Enterprise licensing and Processor usage are related settings but are not interchangeable.

Current builds can meter an unlinked instance against its local free allowance. Do not assume that self-hosting or leaving an instance unlinked makes every automation operation unmetered. See [Stirling Account Link](../Stirling-Account-Link.md) for the code's defaults and connection behavior.

## Access and team scope

Use [Setup and access](./Setup-and-Access.md) for Processor access defaults and management roles. Grant access deliberately: self-hosted Processor users can see the server-wide Documents feed, while pipeline ownership and Review visibility use their own scopes.
