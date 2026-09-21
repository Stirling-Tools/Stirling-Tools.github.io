---
sidebar_position: 11
title: Administration
description: Find shared settings for users, API keys, audit logs, account connection, and billing.
id: API Keys and Audit
---

# Administration

Open **Settings** for users, API keys, audit logs, and billing.

| Task | Location |
|---|---|
| Manage users and teams | `/settings/users` |
| Create or revoke API keys | `/settings/api-keys` |
| Review plan and usage | `/settings/billing` |
| Link a self-hosted instance to a Stirling account | `/settings/account-link` |

## API keys

Create a named key under **Settings → API Keys** and copy its secret when shown. Keys use their owner's permissions, and the secret cannot be recovered later.

Use a separate key for each integration so you can revoke it independently. Send the key as `X-API-KEY: <key>` in REST requests. See [API documentation](../API.md) or [MCP Server](../Configuration/Automation/MCP-Server.md) for connection details.

## Audit logs

Enterprise administrators can configure audit recording, retention, and exports in Settings. See [Audit Logging](../Configuration/Security/Audit%20Logging.md).

The [Documents](./Documents.md) page provides a recent processing history without requiring Enterprise.

## Account and billing

Use **Usage & Billing** to check your plan and remaining processing allowance. Self-hosted instances have a local allowance while unlinked; linking connects the server to a Stirling account's entitlement. See [Stirling Account Link](../Stirling-Account-Link.md).

For Processor permissions and team access, see [Setup and access](./Setup-and-Access.md).
