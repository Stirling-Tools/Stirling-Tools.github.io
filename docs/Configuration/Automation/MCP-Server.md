---
sidebar_position: 2
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

Built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server exposing Stirling PDF operations as MCP tools. Off by default.

:::info Self-hosted capability
Applies to the self-hosted Stirling PDF server. The Stirling Cloud MCP tab is separate; see [Modes](../../Modes-and-Licensing.md).
:::

---

## Enable the server

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.enabled` | `MCP_ENABLED` | `false` | Master switch for everything else on this page. |

- File edits need a restart.
- **Admin UI**: **Settings → Configuration → MCP Server**. Saving writes into `settings.yml` and prompts for a restart.
- Keys under [Limits](#limits) are file and environment only.
- Choose and configure an [authentication mode](#authentication) as well; enabling alone does not let clients call tools.

```yaml
mcp:
  enabled: true
  scopesEnabled: true
  auth:
    mode: oauth
    issuerUri: 'https://idp.example.com'
    resourceId: 'https://pdf.example.com/mcp'
    acceptedAudiences: ['authenticated']
    usernameClaim: email
    requireExistingAccount: true
```

:::warning The admin page needs login enabled
When login is disabled the MCP Server item only appears if `system.showSettingsWhenNoLogin` allows it, and it is rendered disabled with the tooltip "Enable login mode first". Enable login mode, or configure `mcp.*` in `settings.yml` instead.
:::

---

## Endpoint

- **Endpoint**: `POST /mcp`, same host and port as the rest of Stirling PDF. Consumes and produces `application/json`.
- **Transport**: JSON-RPC 2.0 over streamable-HTTP only.
- **Supported MCP protocol versions**: `2025-06-18` (preferred), `2025-03-26`, `2024-11-05`.
- Desktop clients in Self-hosted mode use the `/mcp` endpoint of the server they point at.

---

## Tools exposed

| Tool | Purpose |
|---|---|
| `stirling_describe_operation` | Look up the parameters and JSON schema for a specific operation id. |
| `stirling_pages` | Page-level operations (merge, split, rotate, reorder, add blank pages, and similar). |
| `stirling_convert` | Conversions to and from PDF (images, office formats, and similar). |
| `stirling_misc` | Miscellaneous utilities (compress, flatten, repair, and similar). |
| `stirling_security` | Security operations (encrypt, decrypt, permissions, and similar). |
| `stirling_upload` | Store a file server-side and get back a `fileId` for large inputs. |
| `stirling_download` | Fetch a result returned by reference, inline as base64, whole or in byte ranges. |
| `stirling_ai` | Capabilities published by the Stirling AI engine. |

Operation ids are the same kebab-case ids used elsewhere in Stirling PDF (for example `compress-pdf`); `/api/v1/filter/*` and `/api/v1/pipeline` are not exposed over MCP.

---

## Calling a tool

Arguments for `stirling_pages`, `stirling_convert`, `stirling_misc`, `stirling_security` (`stirling_ai` differs, see [AI capabilities](#ai-capabilities)):

| Argument | Required | Purpose |
|---|---|---|
| `operation` | Yes | The operation id to run, for example `compress-pdf`. |
| `parameters` | No | An object of operation parameters, as returned by `stirling_describe_operation`. |
| `fileName` | No | File name to attach to the inline content. |
| `file` | No | The input document as inline base64. Recommended path. |
| `fileId` | No | A file already stored by `stirling_upload`, instead of `file`. Use for large inputs. |

Calling one of those four tools with a missing or unknown `operation` returns an error listing the operation ids available in that category. `stirling_describe_operation` returns `operation`, `category`, `summary`, `endpoint`, `requiredScope` and `parametersSchema`.

- A JSON response from the operation is returned as text.
- File results return a `fileId`, plus inline base64 (`stirling://file/{fileId}`) at or below `mcp.maxInlineResponseBytes`.
- `stirling_download` is bounded by its own `mcp.maxDownloadBytes`, not by the inline limit, so a result returned by reference is always retrievable. A file larger than one response can carry is served in ranges rather than refused: each reply is prefixed `PARTIAL:`, states the byte range it holds, carries that range in its resource URI as `stirling://file/{fileId}#bytes={start}-{end}/{total}`, and names the `offset` to request next. Concatenating the ranges in order reproduces the file.

```json
{"name": "stirling_download", "arguments": {"fileId": "abc123", "offset": 10485760}}
```

---

## AI capabilities

`stirling_ai` exposes the capabilities published by the Stirling AI engine. Set `aiEngine.enabled` to `true` and point `aiEngine.url` at a reachable engine to populate it.

| Key | Env | Default | Purpose |
|---|---|---|---|
| `aiEngine.enabled` | `AIENGINE_ENABLED` | `false` | Gate on the `stirling_ai` capability set. |
| `aiEngine.url` | `AIENGINE_URL` | `http://localhost:5001` | Base URL of the AI engine. |
| (environment only) | `STIRLING_ENGINE_SHARED_SECRET` | unset | Sent as the `X-Engine-Auth` header to the engine. Required when the engine enforces the shared secret. No `settings.yml` equivalent. |

| Capability | Required scope |
|---|---|
| `pdf-question-answer` | `mcp.tools.read` |
| `pdf-edit-plan` | `mcp.tools.write` |
| `agent-draft` | `mcp.tools.read` |
| `agent-revise` | `mcp.tools.read` |
| `math-audit-examine` | `mcp.tools.read` |
| `math-audit-deliberate` | `mcp.tools.read` |
| `pdf-comment-generate` | `mcp.tools.read` |
| `agent-next-action` | `mcp.tools.read` |

### Calling `stirling_ai`

- Arguments are `operation` (required), `parameters` and `fileId`. There is no `file` or `fileName`, so inline base64 is a schema-invalid call.
- Put the document reference inside `parameters` per the capability's `parametersSchema`; the top-level `fileId` is ignored.

:::warning Two behaviours to plan for
The per-capability admin switches under `aiEngine.features.*` do not filter what `stirling_ai` exposes or executes. Use `mcp.allowedOperations` / `mcp.blockedOperations` to restrict AI capabilities over MCP.

Do not set `STIRLING_REQUIRE_USER_ID=true` on the engine; `stirling_ai` then exposes no capabilities.
:::

---

## Authentication

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.auth.mode` | `MCP_AUTH_MODE` | `oauth` | `apikey` selects API-key authentication. Any other value selects OAuth2. |
| `mcp.scopesEnabled` | `MCP_SCOPESENABLED` | `true` | Enforce the `mcp.tools.read` / `mcp.tools.write` scopes carried on the token. |

:::warning `apikey` is an exact match
Only the exact value `apikey` (case-insensitive) selects API-key mode. Any other value, including `api-key`, selects OAuth mode instead.
:::

### Scopes

- Every PDF operation carries `mcp.tools.write`, whatever the operation actually does.
- `stirling_download` requires `mcp.tools.read`; `stirling_upload` requires `mcp.tools.write`; `stirling_describe_operation` performs no scope check.
- AI capabilities carry the scope declared in the engine manifest.
- `mcp.scopesEnabled: false` disables scope checks. No effect in API-key mode.

### OAuth2 resource server (`oauth`, default)

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.auth.issuerUri` | `MCP_AUTH_ISSUERURI` | empty | OAuth2 issuer URI (e.g. `http://localhost:9000`). **Required**; every token is rejected until it is set. |
| `mcp.auth.jwksUri` | `MCP_AUTH_JWKSURI` | empty | JWKS URI. Blank derives it from the issuer's `/.well-known/openid-configuration`. |
| `mcp.auth.resourceId` | `MCP_AUTH_RESOURCEID` | empty | RFC 8707 resource identifier. Must equal the public `/mcp` URL clients call and **end in `/mcp`** (e.g. `http://localhost:8080/mcp`). Tokens that do not list it in `aud` are rejected. |
| `mcp.auth.acceptedAudiences` | `MCP_AUTH_ACCEPTEDAUDIENCES` | `[]` | Extra `aud` values accepted on top of `resourceId`. Use for IdPs that cannot mint a resource-specific audience (e.g. Supabase always issues `aud=authenticated`). |
| `mcp.auth.usernameClaim` | `MCP_AUTH_USERNAMECLAIM` | `sub` | JWT claim matched against a Stirling username. Set to `email` or `preferred_username` if your IdP maps users differently. |
| `mcp.auth.requireExistingAccount` | `MCP_AUTH_REQUIREEXISTINGACCOUNT` | `true` | Reject tokens whose subject has no enabled Stirling account. Keep `true` unless you intend open access for any IdP-valid token. |

- While `mcp.auth.issuerUri` is blank, every token is rejected with `mcp.auth.issuer-uri is not configured`.
- If **both** `mcp.auth.resourceId` and `mcp.auth.acceptedAudiences` are empty, every token is rejected. Setting `acceptedAudiences` on its own satisfies it.

RFC 9728 protected-resource metadata is published at `/.well-known/oauth-protected-resource` in OAuth mode only. `GET` on that path is unauthenticated so clients can discover the authorization server.

### API key (`apikey`)

Set `mcp.auth.mode: apikey` (env `MCP_AUTH_MODE=apikey`) and clients authenticate with an existing per-user Stirling API key. No external IdP, OAuth, or JWKS configuration is needed.

Send the key as either header:

```text
X-API-KEY: <your-stirling-api-key>
Authorization: Bearer <your-stirling-api-key>
```

- Key must belong to an existing, enabled account.
- Generate under **Settings → Developer → API Keys** (requires login mode). See [API documentation](../../API.md).
- A missing or unrecognised key returns HTTP `401` with `WWW-Authenticate: Bearer realm="Stirling MCP (API key)"`.
- The protected-resource metadata document is not served in this mode.

---

## Restrict which operations are exposed

Both lists use the same kebab-case operation ids as [Endpoint or Feature Customisation](../Customisation/Endpoint%20or%20Feature%20Customisation.md).

| Key | Env | Default | Behaviour |
|---|---|---|---|
| `mcp.allowedOperations` | `MCP_ALLOWEDOPERATIONS` | `[]` | When **non-empty**, a strict allow-list: only these ids are exposed. Empty means allow all. |
| `mcp.blockedOperations` | `MCP_BLOCKEDOPERATIONS` | `[]` | A deny-list, evaluated **before** the allow-list, so a blocked id is hidden even if it also appears in `mcp.allowedOperations`. |

Both lists apply to PDF operations and to AI capabilities. In the admin UI the fields accept ids separated by commas, spaces, or newlines.

A PDF operation disabled by [`endpoints.toRemove` / `endpoints.groupsToRemove`](../Customisation/Endpoint%20or%20Feature%20Customisation.md) is never exposed over MCP regardless of these lists. AI capabilities are not covered by that configuration, so these two lists are the only way to restrict them.

---

## Limits

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.maxRequestBytes` | `MCP_MAXREQUESTBYTES` | `10485760` (10 MB) | Maximum MCP request body size, which caps inline file uploads. A value of `0` or less falls back to 256 KB. |
| `mcp.maxInlineResponseBytes` | `MCP_MAXINLINERESPONSEBYTES` | `262144` (256 KB) | Results up to this size return inline as base64; larger results return a `fileId` only. It does not constrain `stirling_download`. The default is deliberately small: an inline result is spent as client context, and 256 KB of base64 is already around 85,000 tokens. |
| `mcp.maxDownloadBytes` | `MCP_MAXDOWNLOADBYTES` | `10485760` (10 MB) | Maximum bytes `stirling_download` returns per call. A larger file is not refused; it is served in `offset`/`length` ranges of at most this size. A value of `0` or less falls back to `mcp.maxInlineResponseBytes`. |
| `mcp.engineCapabilityRefreshMinutes` | `MCP_ENGINECAPABILITYREFRESHMINUTES` | `5` | Interval of the AI capability refresh. Values below `1` are clamped to one minute. |

`stirling_download` takes `fileId` (required) plus optional `offset` and `length` (`additionalProperties: false`). It refuses an unknown or inaccessible `fileId`, an `offset` past the end of the file, and a non-integer or negative `offset` or `length`. It does not refuse a file for being large; anything over `mcp.maxDownloadBytes` comes back as ranges.

The lower `mcp.maxInlineResponseBytes` default affects new installations only. An existing `settings.yml` keeps whatever value it already holds, because the settings merge takes your file's values over the template's; change it by hand if you want the smaller default.

---

## Troubleshooting

- **Client cannot connect**: check the MCP configuration findings logged at startup.
- **`401` with `error="invalid_token"`**: the `error_description` names the cause (audience, issuer, or expiry mismatch).
- Behind a reverse proxy, set `X-Forwarded-Proto`, `X-Forwarded-Host` and `X-Forwarded-Port` correctly so the `resource_metadata` pointer is right.
- A tokenless `401` is the normal discovery handshake.
- **`403 insufficient_account`**: the token was valid but did not bind to a Stirling account. Either the `mcp.auth.usernameClaim` claim is absent from the token, or `mcp.auth.requireExistingAccount` is `true` and the claim value does not match an existing enabled user.
- **`413 payload_too_large`**: the request body exceeded `mcp.maxRequestBytes`. Switch large inputs from inline `file` to `stirling_upload` plus `fileId`.

---

## Connect a client

Point any MCP client at `http://your-host:8080/mcp` (use your real host, port, and scheme).

**MCP Inspector**:

```bash
npx @modelcontextprotocol/inspector
```

Set the transport to streamable-HTTP and the URL to your `/mcp` endpoint, adding the auth header (`X-API-KEY` in API-key mode, or a Bearer token in OAuth mode).

**Claude Desktop** via the `mcp-remote` bridge:

```json
{
  "mcpServers": {
    "stirling-pdf": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://your-host/mcp",
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

- **[API documentation](../../API.md)** - generate the per-user API key used in API-key mode
- **[Endpoint or Feature Customisation](../Customisation/Endpoint%20or%20Feature%20Customisation.md)** - the operation ids and global enable/disable config the MCP lists build on
- **[AI Overview](../../AI/AI-Overview.md)** - what the AI engine is and what enabling it adds to Stirling PDF
- **[Self-Hosting the AI Engine](../../AI/Self-Hosting-the-AI-Engine.md)** - running the engine next to Stirling PDF so `stirling_ai` has capabilities
- **[AI Security](../../AI/AI-Security.md)** - the engine shared secret and how the engine is exposed on your network
- **[Modes](../../Modes-and-Licensing.md)** - where each deployment mode and feature applies
