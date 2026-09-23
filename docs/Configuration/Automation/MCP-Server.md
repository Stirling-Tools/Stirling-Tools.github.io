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

Connect AI assistants to Stirling PDF through its built-in [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server. MCP is disabled by default.

:::info Self-hosted capability
Applies to the self-hosted Stirling PDF server. The Stirling Cloud MCP tab is separate; see [Modes](../../Modes-and-Licensing.md).
:::

---

## Enable the server

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.enabled` | `MCP_ENABLED` | `false` | Enable the MCP server. |

Enable MCP in the **MCP Server** section of **Settings → Server → Integrations**, or with one of the methods below. Configure [authentication](#authentication), then restart the server. Without login enabled, use the settings file or environment variables.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
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
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    MCP_ENABLED=true
    MCP_SCOPESENABLED=true
    MCP_AUTH_MODE=oauth
    MCP_AUTH_ISSUERURI=https://idp.example.com
    MCP_AUTH_RESOURCEID=https://pdf.example.com/mcp
    MCP_AUTH_ACCEPTEDAUDIENCES=authenticated
    MCP_AUTH_USERNAMECLAIM=email
    MCP_AUTH_REQUIREEXISTINGACCOUNT=true
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          MCP_ENABLED: "true"
          MCP_SCOPESENABLED: "true"
          MCP_AUTH_MODE: oauth
          MCP_AUTH_ISSUERURI: https://idp.example.com
          MCP_AUTH_RESOURCEID: https://pdf.example.com/mcp
          MCP_AUTH_ACCEPTEDAUDIENCES: authenticated
          MCP_AUTH_USERNAMECLAIM: email
          MCP_AUTH_REQUIREEXISTINGACCOUNT: "true"
    ```
  </TabItem>
</Tabs>

The [limit settings](#limits) are available through the settings file or environment variables.

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
| `stirling_download` | Fetch a stored result by `fileId`, returned inline as base64. |
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

Use `stirling_describe_operation` to find the required parameters and scope before calling an operation.

- A JSON response from the operation is returned as text.
- File results up to `mcp.maxInlineResponseBytes` return inline as base64 (`stirling://file/{fileId}`) with their `fileId`.
- Larger results return only a `fileId`. Pass it to another operation, or raise `mcp.maxInlineResponseBytes` to fetch it with `stirling_download`.

```json
{"name": "stirling_download", "arguments": {"fileId": "abc123"}}
```

---

## AI capabilities

Set up the [AI engine](../../AI/Self-Hosting-the-AI-Engine.md) to use `stirling_ai`. The engine must be enabled and reachable from Stirling PDF.

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

Supply `operation` and a `parameters` object matching the capability's schema, including its document reference.

Use `mcp.allowedOperations` and `mcp.blockedOperations` to control AI access over MCP. The **Capabilities** switches in **Settings → Server → AI Engine** apply to the app's tools.

For MCP compatibility, leave `STIRLING_REQUIRE_USER_ID` set to `false` on the engine.

---

## Authentication

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.auth.mode` | `MCP_AUTH_MODE` | `oauth` | `oauth` for OAuth2 or `apikey` for per-user API keys. |
| `mcp.scopesEnabled` | `MCP_SCOPESENABLED` | `true` | Enforce the `mcp.tools.read` / `mcp.tools.write` scopes carried on the token. |

### Scopes

PDF operations and uploads require `mcp.tools.write`; downloads require `mcp.tools.read`. AI scopes are listed above. Set `mcp.scopesEnabled: false` to disable scope checks. Scopes apply only in OAuth mode.

### OAuth2 resource server (`oauth`, default)

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.auth.issuerUri` | `MCP_AUTH_ISSUERURI` | empty | Required OAuth2 issuer URI, for example `https://idp.example.com`. |
| `mcp.auth.jwksUri` | `MCP_AUTH_JWKSURI` | empty | JWKS URI. Blank derives it from the issuer's `/.well-known/openid-configuration`. |
| `mcp.auth.resourceId` | `MCP_AUTH_RESOURCEID` | empty | Public MCP URL ending in `/mcp`, accepted as a token audience. |
| `mcp.auth.acceptedAudiences` | `MCP_AUTH_ACCEPTEDAUDIENCES` | `[]` | Additional accepted token audiences, such as `authenticated` for Supabase. |
| `mcp.auth.usernameClaim` | `MCP_AUTH_USERNAMECLAIM` | `sub` | JWT claim matched against a Stirling username. Set to `email` or `preferred_username` if your IdP maps users differently. |
| `mcp.auth.requireExistingAccount` | `MCP_AUTH_REQUIREEXISTINGACCOUNT` | `true` | Require an enabled Stirling account matching the username claim. |

Configure `issuerUri` and at least one audience through `resourceId` or `acceptedAudiences`.

RFC 9728 protected-resource metadata is published at `/.well-known/oauth-protected-resource` in OAuth mode only. `GET` on that path is unauthenticated so clients can discover the authorization server.

### API key (`apikey`)

Set `mcp.auth.mode: apikey` (env `MCP_AUTH_MODE=apikey`) and clients authenticate with an existing per-user Stirling API key. No external IdP, OAuth, or JWKS configuration is needed.

Send the key as either header:

```text
X-API-KEY: <your-stirling-api-key>
Authorization: Bearer <your-stirling-api-key>
```

Generate a key under **Settings → Preferences → API Keys** while signed in. The key must belong to an enabled account; missing or invalid keys return HTTP `401`. See [API documentation](../../API.md).

---

## Restrict which operations are exposed

Both lists use the same kebab-case operation ids as [Endpoint or Feature Customisation](../Customisation/Endpoint%20or%20Feature%20Customisation.md).

| Key | Env | Default | Behaviour |
|---|---|---|---|
| `mcp.allowedOperations` | `MCP_ALLOWEDOPERATIONS` | `[]` | When **non-empty**, a strict allow-list: only these ids are exposed. Empty means allow all. |
| `mcp.blockedOperations` | `MCP_BLOCKEDOPERATIONS` | `[]` | A deny-list, evaluated **before** the allow-list, so a blocked id is hidden even if it also appears in `mcp.allowedOperations`. |

Both lists apply to PDF operations and to AI capabilities. In the admin UI the fields accept ids separated by commas, spaces, or newlines.

PDF operations disabled through [Endpoint Customisation](../Customisation/Endpoint%20or%20Feature%20Customisation.md) are also unavailable over MCP.

---

## Limits

| Key | Env | Default | Purpose |
|---|---|---|---|
| `mcp.maxRequestBytes` | `MCP_MAXREQUESTBYTES` | `10485760` (10 MB) | Maximum MCP request body size, which caps inline file uploads. A value of `0` or less falls back to 256 KB. |
| `mcp.maxInlineResponseBytes` | `MCP_MAXINLINERESPONSEBYTES` | `10485760` (10 MB) | Largest result returned inline, by an operation or by `stirling_download`. Larger results return only a `fileId`. |
| `mcp.engineCapabilityRefreshMinutes` | `MCP_ENGINECAPABILITYREFRESHMINUTES` | `5` | AI capability refresh interval, with a minimum of one minute. |

---

## Troubleshooting

- **Client cannot connect**: check the endpoint, authentication settings, and server startup log.
- **`401` with `error="invalid_token"`**: the `error_description` names the cause (audience, issuer, or expiry mismatch).
- Behind a reverse proxy, set `X-Forwarded-Proto`, `X-Forwarded-Host` and `X-Forwarded-Port` correctly so the `resource_metadata` pointer is right.
- **`403 insufficient_account`**: check that the configured username claim matches an enabled Stirling user.
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

- [API documentation](../../API.md)
- [Endpoint Customisation](../Customisation/Endpoint%20or%20Feature%20Customisation.md)
- [AI Security](../../AI/AI-Security.md)
