---
sidebar_position: 1
title: MCP server settings
sidebar_label: MCP server
description: Turn on the built-in MCP server on a self-hosted Stirling PDF server and control authentication, exposed tools and request limits.
---

# MCP server settings

Turn on the built-in [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server so AI clients can run Stirling PDF tools, and control who can use it. MCP is off by default. To connect a client once it is on, see [Connect an AI assistant](../../MCP/Connect.md).

## Enable the server

1. Open **Settings → Server → Integrations → MCP Server** and turn on **Enable MCP Server**.
2. Pick the **Authentication mode** and fill in its fields, as described below.
3. Select **Save Changes**, then **Restart Now**.

The same settings live under `mcp` in `settings.yml`:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    mcp:
      enabled: true
      auth:
        mode: apikey
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    MCP_ENABLED=true
    MCP_AUTH_MODE=apikey
    ```
  </TabItem>
</Tabs>

Every key on this page has an environment variable in the same pattern, for example `MCP_AUTH_ISSUERURI`.

Clients connect to `/mcp` on the same host and port as the app, for example `https://pdf.example.com/mcp`.

## Authentication

**Authentication mode** (`mcp.auth.mode`) is either **API key (Stirling per-user key)** (`apikey`) or **OAuth 2.1 (external IdP)** (`oauth`, the default).

### API key

Clients send a Stirling API key in the `X-API-KEY` header, or as `Authorization: Bearer <key>`. No identity provider is needed, so this is the simplest option for most servers.

Each user creates their own key under **Settings → Preferences → API Keys**. The key must belong to an enabled account, and every call is audited as that user. A missing or invalid key returns HTTP 401.

### OAuth

Stirling PDF accepts access tokens issued by your identity provider (IdP).

| Setting | Field in Settings | Default | Purpose |
|---|---|---|---|
| `mcp.auth.issuerUri` | **OAuth Issuer URL** | empty | Required. Your IdP, which must publish `/.well-known/openid-configuration`. |
| `mcp.auth.jwksUri` | **JWKS URL (optional)** | empty | Leave blank to discover it from the issuer. |
| `mcp.auth.resourceId` | **Resource ID** | empty | This server's public MCP URL, ending in `/mcp`. Tokens must list it as an audience. |
| `mcp.auth.acceptedAudiences` | **Additional accepted audiences (optional)** | empty | Extra audiences to accept, for IdPs that cannot issue resource audiences. Supabase, for example, always issues `authenticated`. |
| `mcp.auth.usernameClaim` | **Username claim** | `sub` | Token claim matched against a Stirling username, such as `email` or `preferred_username`. |
| `mcp.auth.requireExistingAccount` | **Require an existing Stirling account** | `true` | Reject tokens that do not map to an enabled Stirling user. |

Set the issuer and at least one audience (the resource ID or an accepted audience), and register the resource ID as an allowed audience in your IdP.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    mcp:
      enabled: true
      auth:
        mode: oauth
        issuerUri: https://idp.example.com
        resourceId: https://pdf.example.com/mcp
        usernameClaim: email
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    MCP_ENABLED=true
    MCP_AUTH_MODE=oauth
    MCP_AUTH_ISSUERURI=https://idp.example.com
    MCP_AUTH_RESOURCEID=https://pdf.example.com/mcp
    MCP_AUTH_USERNAMECLAIM=email
    ```
  </TabItem>
</Tabs>

In OAuth mode, clients discover your IdP from `/.well-known/oauth-protected-resource`, which is served without authentication.

### Scopes

With `mcp.scopesEnabled` (**Enforce OAuth scopes**, default `true`), tokens need the right scope for each call:

- PDF operations and uploads need `mcp.tools.write`.
- Downloads need `mcp.tools.read`.
- AI capabilities need `mcp.tools.read`, except `pdf-edit-plan`, which needs `mcp.tools.write`.

Scopes apply only in OAuth mode.

## Restrict which tools are exposed

Both lists use the tool IDs from [Turn features on or off](../Customisation/Features-and-Endpoints.md), such as `compress-pdf`, and apply to PDF tools and AI capabilities alike.

| Setting | Field in Settings | Default | Behaviour |
|---|---|---|---|
| `mcp.allowedOperations` | **Allowed tools** | empty | When set, only these IDs are exposed. Empty exposes everything. |
| `mcp.blockedOperations` | **Blocked tools** | empty | Always hidden, even if also on the allowed list. |

In Settings, separate IDs with commas or spaces. In the settings file or environment:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    mcp:
      blockedOperations:
        - add-password
        - remove-password
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    MCP_BLOCKEDOPERATIONS=add-password,remove-password
    ```
  </TabItem>
</Tabs>

Tools you turn off for the whole server are also unavailable over MCP.

### AI tools

AI capabilities need AI turned on for the server, with your own engine or Stirling Cloud AI (see [AI on your server](../AI/AI.md)). The capability switches under **Settings → Server → AI Engine** only affect the app, so use the allowed and blocked lists to control AI access over MCP.

## Limits

These are set in `settings.yml` or environment variables only.

| Setting | Default | Purpose |
|---|---|---|
| `mcp.maxRequestBytes` | `10485760` (10 MB) | Largest request body, which caps files sent inline. `0` or less falls back to 256 KB. |
| `mcp.maxInlineResponseBytes` | `10485760` (10 MB) | Largest result returned inline. Bigger results return only a file ID. |
| `mcp.engineCapabilityRefreshMinutes` | `5` | How often the list of AI capabilities is refreshed from the engine. Minimum 1. |

## Troubleshooting

- **HTTP 401 with `invalid_token`**: the `error_description` names the mismatch (audience, issuer or expiry). Check the issuer URL, resource ID and accepted audiences.
- **HTTP 403 `insufficient_account`**: the username claim does not match an enabled Stirling user. Change **Username claim** or create the user.
- **HTTP 413 `payload_too_large`**: the request is bigger than `mcp.maxRequestBytes`. Raise it, or have clients upload large files first (see [Calling a tool](../../MCP/Tools.md#calling-a-tool)).
- **Clients cannot discover the IdP behind a reverse proxy**: forward `X-Forwarded-Proto`, `X-Forwarded-Host` and `X-Forwarded-Port` so the metadata points at your public URL.
