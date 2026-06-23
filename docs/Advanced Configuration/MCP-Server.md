---
sidebar_position: 14
id: MCP Server
title: MCP Server
description: Expose Stirling PDF's tools to MCP clients over a built-in Model Context Protocol server
tags:
  - MCP
  - Model Context Protocol
  - Self-host
  - Automation
---

# MCP Server

Stirling PDF ships a built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server. MCP is the open standard MCP clients (Claude Desktop, the MCP Inspector, IDE agents, and custom tools) use to discover and call tools on a remote server. When enabled, Stirling PDF exposes its PDF operations as MCP tools so an MCP-capable assistant can run them on your behalf.

The MCP server is built into the Stirling PDF self-hosted server and the desktop app in Local / Self-hosted modes. It is **off by default** and must be enabled and configured per deployment.

:::info Self-hosted capability
This page documents the MCP server you run on your own Stirling PDF instance. The per-user MCP tab in Stirling Cloud is a separate, cloud-only surface and is not covered here. For where each deployment mode applies, see [Modes](../Modes-and-Licensing.md).
:::

---

## Enable the server

The MCP server runs only when `mcp.enabled` is `true`. While off, there is no `/mcp` endpoint and no MCP metadata.

Turn it on either way:

- **Settings file / environment variable**: set `mcp.enabled: true` in `settings.yml`, or the environment variable `MCP_ENABLED=true`. A restart applies file edits.
- **Admin UI**: open **Admin Settings → MCP Server**. This page is shown to admins, and on instances where login is disabled. Saving prompts for a restart.

Enabling alone is not enough - you also need to choose and configure an [authentication mode](#authentication) before clients can call tools.

---

## Transport and protocol

- **Endpoint**: `POST /mcp` on the same host and port as the rest of Stirling PDF.
- **Protocol**: JSON-RPC 2.0 over streamable-HTTP.
- **Supported MCP protocol versions**: `2025-06-18` (preferred), `2025-03-26`, and `2024-11-05`. The server echoes the client's requested version when it is supported, otherwise it advertises the preferred version.

---

## Tools exposed

The server presents a small set of category tools rather than one tool per operation. An MCP client lists them, then drills into a specific PDF operation using `stirling_describe_operation`.

| Tool | Purpose |
|---|---|
| `stirling_describe_operation` | Look up the parameters and JSON schema for a specific operation id. |
| `stirling_pages` | Page-level operations (merge, split, rotate, reorder, add blank pages, and similar). |
| `stirling_convert` | Conversions to and from PDF (images, office formats, and similar). |
| `stirling_misc` | Miscellaneous utilities (compress, flatten, repair, and similar). |
| `stirling_security` | Security operations (encrypt, decrypt, permissions, and similar). |
| `stirling_upload` | Store a file server-side and get back a `fileId` for large inputs. |
| `stirling_download` | Fetch a result that was returned by reference rather than inline. |
| `stirling_ai` | AI-engine capabilities. **Not usable in self-hosted - see the caveat below.** |

:::warning `stirling_ai` requires a Stirling Cloud AI engine
`stirling_ai` only has capabilities when a Stirling AI engine is configured. The AI engine is a Stirling Cloud feature and is **not available in self-hosted** today, so on a self-hosted server `stirling_ai` exposes nothing and only the PDF tools above are usable over MCP.
:::

---

## Authentication

Pick one of two modes with `mcp.auth.mode`.

### OAuth2 resource server (`oauth`, default)

In OAuth mode the `/mcp` endpoint runs as an OAuth2 resource server: it validates incoming JWTs (signature, issuer, expiry, and audience) and binds each token to an existing Stirling account. It publishes RFC 9728 protected-resource metadata at `/.well-known/oauth-protected-resource` so MCP clients can discover the authorization server.

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.auth.issuerUri` | `MCP_AUTH_ISSUERURI` | empty | OAuth2 issuer URI (e.g. `http://localhost:9000`). **Required** in OAuth mode; every token is rejected until it is set. |
| `mcp.auth.jwksUri` | `MCP_AUTH_JWKSURI` | empty | JWKS URI. Blank means it is derived from the issuer's `/.well-known/openid-configuration`. |
| `mcp.auth.resourceId` | `MCP_AUTH_RESOURCEID` | empty | RFC 8707 resource identifier of this server. Must equal the public `/mcp` URL clients call and **end in `/mcp`** (e.g. `http://localhost:8080/mcp`). Tokens that do not list it in `aud` are rejected. |
| `mcp.auth.acceptedAudiences` | `MCP_AUTH_ACCEPTEDAUDIENCES` | `[]` | Extra `aud` values accepted on top of `resourceId`. Empty keeps strict RFC 8707 binding. Use this for IdPs that cannot mint a resource-specific audience (e.g. Supabase always issues `aud=authenticated`). |
| `mcp.auth.usernameClaim` | `MCP_AUTH_USERNAMECLAIM` | `sub` | JWT claim matched against a Stirling username. Set to `email` or `preferred_username` if your IdP maps users differently. |
| `mcp.auth.requireExistingAccount` | `MCP_AUTH_REQUIREEXISTINGACCOUNT` | `true` | Reject tokens whose subject has no enabled Stirling account. Keep `true` unless you intend open access for any IdP-valid token. |
| `mcp.scopesEnabled` | `MCP_SCOPESENABLED` | `true` | Enforce the `mcp.tools.read` / `mcp.tools.write` scopes. Read-style tools require `mcp.tools.read`; mutating operations require `mcp.tools.write`. Set `false` only if your IdP can issue a single coarse token. |

Each validated token is bound to the matching Stirling account so that audit and attribution are correct.

### API key (`apikey`)

API-key mode is the low-friction option for self-hosters with no external identity provider. Set `mcp.auth.mode: apikey` (env `MCP_AUTH_MODE=apikey`) and clients authenticate with an existing per-user Stirling API key.

Send the key as either header:

```text
X-API-KEY: <your-stirling-api-key>
```

or

```text
Authorization: Bearer <your-stirling-api-key>
```

The key must belong to an existing, enabled account (generate one under **Account → API Keys** - see [API documentation](../API.md)). No external IdP, OAuth, or JWKS configuration is needed.

---

## Restrict which operations are exposed

Two MCP-level lists control which operations clients can see and call. They use the same kebab-case operation ids as the [Endpoint or Feature Customisation](../Configuration/Endpoint%20or%20Feature%20Customisation.md) page (e.g. `compress-pdf`).

| Key | Env | Default | Behaviour |
|---|---|---|---|
| `mcp.allowedOperations` | `MCP_ALLOWEDOPERATIONS` | `[]` | When **non-empty**, acts as a strict allow-list - only these operations are exposed over MCP; everything else is hidden, undescribable, and uninvocable. Empty means allow all. |
| `mcp.blockedOperations` | `MCP_BLOCKEDOPERATIONS` | `[]` | A deny-list. Anything listed is always removed, applied **after** the allow-list, so a blocked id wins even if it is also allowed. |

These lists layer **on top of** the global [`endpoints.toRemove` / `endpoints.groupsToRemove`](../Configuration/Endpoint%20or%20Feature%20Customisation.md) configuration. An operation disabled globally is never exposed over MCP regardless of these lists.

---

## Limits

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.maxRequestBytes` | `MCP_MAXREQUESTBYTES` | 10 MB | Maximum MCP request body size. Inline file uploads ride in the JSON-RPC body, so this caps how large an inline input can be. |
| `mcp.maxInlineResponseBytes` | `MCP_MAXINLINERESPONSEBYTES` | 10 MB | Results up to this size return inline as base64; larger results return a `fileId` instead, which the client fetches with `stirling_download`. |
| `mcp.engineCapabilityRefreshMinutes` | `MCP_ENGINECAPABILITYREFRESHMINUTES` | `5` | How often the AI capabilities manifest is refreshed from the engine (only relevant when an AI engine is available). |

---

## Troubleshooting and operability

- **Startup config validation**: when MCP is enabled, the server validates the resolved config at boot and logs findings. Misconfiguration (missing issuer, a `resourceId` that does not end in `/mcp`, a `username-claim` of `sub` with `require-existing-account=true`, and similar) is logged as a warning so it surfaces in the logs instead of as a later rejected-token `401`.
- **Meaningful `401` responses**: a rejected OAuth token returns a `WWW-Authenticate` header carrying a real `error_description` (audience, issuer, or expiry mismatch), plus a `resource_metadata` pointer for discovery. A tokenless `401` is the normal discovery handshake, not an error.
- **Audit logging**: MCP calls are attributed to the bound Stirling account, and no secret is written to the audit log.

---

## Connect a client

Point any MCP client at `http://your-host:8080/mcp` (use your real host, port, and scheme).

**MCP Inspector** (quick manual testing):

```bash
npx @modelcontextprotocol/inspector
```

Then set the transport to streamable-HTTP and the URL to your `/mcp` endpoint, adding the appropriate auth header (`X-API-KEY` in API-key mode, or a Bearer token in OAuth mode).

**Claude Desktop** via the `mcp-remote` bridge - add to your Claude Desktop config:

```json
{
  "mcpServers": {
    "stirling-pdf": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://your-host:8080/mcp",
        "--header",
        "X-API-KEY:your-stirling-api-key"
      ]
    }
  }
}
```

In OAuth mode, drop the `X-API-KEY` header and let `mcp-remote` complete the OAuth flow against your configured issuer.

---

## Related Documentation

- **[API documentation](../API.md)** - generate the per-user API key used in API-key mode
- **[Endpoint or Feature Customisation](../Configuration/Endpoint%20or%20Feature%20Customisation.md)** - the operation ids and global enable/disable config the MCP lists build on
- **[Modes](../Modes-and-Licensing.md)** - where each deployment mode and feature applies
