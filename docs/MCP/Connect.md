---
title: Connect an AI assistant
sidebar_label: Connect a client
sidebar_position: 1
description: Add Stirling PDF to Claude, Codex, VS Code or any MCP client, on Stirling Cloud or a self-hosted server.
---

# Connect an AI assistant

Pick where your Stirling PDF runs, then add its endpoint to your client.

<Tabs groupId="product">
  <TabItem value="cloud" label="Stirling Cloud">

Endpoint: `https://api.stirling.com/mcp`

Open **Settings → Developer → MCP Server**. It shows **Your MCP endpoint** and, under **Connect your AI assistant**, a snippet for each client. Paste it into the file shown, then restart the client. On first use you sign in with your Stirling account and click **Allow access** on the **Authorize access** page. There is no key to copy.

Claude Code (`.mcp.json`). For VS Code, use the same in `.vscode/mcp.json` with `servers` in place of `mcpServers`:

```json
{"mcpServers": {"stirling-pdf": {"type": "http", "url": "https://api.stirling.com/mcp"}}}
```

Codex CLI (`~/.codex/config.toml`):

```toml
[mcp_servers.stirling-pdf]
url = "https://api.stirling.com/mcp"
```

Claude Desktop (`claude_desktop_config.json`) reaches remote servers through the `mcp-remote` bridge, which needs Node.js:

```json
{
  "mcpServers": {
    "stirling-pdf": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://api.stirling.com/mcp"]
    }
  }
}
```

Guests can't connect MCP clients. Every tool call counts towards your team's usage, like API calls ([Plans, credits and billing](../Cloud/Plans-and-Billing.md)).

  </TabItem>
  <TabItem value="self-hosted" label="Self-hosted">

Endpoint: `https://your-server/mcp`, on the same host and port as Stirling PDF.

MCP is off by default. An admin turns it on and picks how clients sign in ([MCP server settings](../Server/Automation/MCP-Server.md)). OAuth is the default, so ask your admin which mode is set before you use an API key.

- **API key mode:** create a key under **Settings → Preferences → API Keys** and send it as `X-API-KEY: <key>` or `Authorization: Bearer <key>`.
- **OAuth mode:** add the endpoint with no key. The client finds your identity provider at `/.well-known/oauth-protected-resource` and signs you in.

Claude Code in API key mode (`.mcp.json`):

```json
{
  "mcpServers": {
    "stirling-pdf": {
      "type": "http",
      "url": "https://your-server/mcp",
      "headers": { "X-API-KEY": "your-stirling-api-key" }
    }
  }
}
```

Claude Desktop through `mcp-remote` (needs Node.js). In OAuth mode, leave out the `--header` line and `mcp-remote` runs the sign-in:

```json
{
  "mcpServers": {
    "stirling-pdf": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote", "https://your-server/mcp",
        "--header", "X-API-KEY:your-stirling-api-key"
      ]
    }
  }
}
```

To test the connection, run `npx @modelcontextprotocol/inspector`, choose the streamable HTTP transport, enter your `/mcp` URL and add the same header.

PDF tool calls count as automation, so they use the server's allowance even with a Team licence ([Processing allowance](../Server/Licensing/Connect-to-Stirling-Cloud.md#processing-allowance)).

  </TabItem>
</Tabs>

