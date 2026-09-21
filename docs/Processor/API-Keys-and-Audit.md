---
sidebar_position: 6
id: API Keys and Audit
title: API Keys and Audit
description: Create and revoke personal API keys and review recent activity from the Processor's Infrastructure area
tags: [Processor, API Keys, Audit, Security, Self-host]
---

# API Keys and Audit

The Processor's **Infrastructure** area (`/processor/infrastructure`) has two working tabs, **API Keys** and **Audit Logs**. Add `?tab=api-keys` or `?tab=audit` to open one directly.

## API keys

- Create from **Infrastructure → API Keys → Create key**; the name is required and must be 100 characters or fewer. Copy the secret before closing the dialog.
- The secret is `sk_` plus 40 hexadecimal characters, shown **once** and never recoverable. The list keeps only a prefix such as `sk_a1b2c3d4`.
- Limit **50 active keys** per user; revoke one before creating another. Keys need logins enabled and are personal - one owner, that owner's permissions, and you see only your own.
- Send as the header `X-API-KEY: <key>`; MCP also accepts `Authorization: Bearer <key>`, in API-key mode only. Rate limits are per user and shared by every key you own.
- Per key the list shows created, last used, usage today, and usage over a trailing 30-day window, all UTC. Keys generated in the editor (listed as **Default key**) record no usage.
- **Revoke** is immediate and irreversible; the row stays with status `revoked`. Revoking **Default key** also clears the per-user key on your account.

## Audit logs

- Admin-only, and needs an Enterprise license - without one nothing is recorded and the tab shows an access-denied message.
- Shows up to **40** recent events: timestamp, event, actor, resource, status, latency, all UTC. There is no auto-refresh, so reload the page and allow up to 30 seconds for a new event.
- Categories are `auth`, `config`, `security`, `processing`, and `policy`. The pills filter only the events on screen; there is no search, date range, or paging.
- **Export** writes CSV or JSON of the whole log, not just the 40 shown. Columns are Date, Username, IP address, Tool, Document name, Outcome; IP address is off by default and the column choice applies to CSV only.
- Date ranges, username filters, charts, paging, and clear-down: **Settings → Licensing & Analytics → Audit** in the editor.

## Related Documentation

- **[API documentation](../API.md)** - authenticating and calling the REST API with a key
- **[Audit Logging](../Configuration/Security/Audit%20Logging.md)** - audit settings, verbosity levels, and retention
- **[MCP Server](../Configuration/Automation/MCP-Server.md)** - enabling MCP and choosing its authentication mode
- **[Stirling Processor](./Processor.md)** - who can reach the Processor and how to widen access
