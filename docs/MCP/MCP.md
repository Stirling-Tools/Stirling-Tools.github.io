---
title: MCP server
sidebar_label: Overview
sidebar_position: 0
description: Let Claude, Codex, VS Code or any MCP client run Stirling PDF tools for you over the Model Context Protocol.
---

# MCP server

Stirling PDF has a built-in [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server. Connect an AI assistant such as Claude, Codex or VS Code, and it can convert, edit, secure and process documents with your Stirling PDF tools. Every action runs as your account.

| Where Stirling PDF runs | MCP endpoint | Sign-in |
|---|---|---|
| Stirling Cloud | `https://api.stirling.com/mcp` | Your Stirling account. No key to copy. |
| Self-hosted server | `https://your-server/mcp` | OAuth or API key, set by your admin. Off by default. |

<Cards cols="3">
<Card title="Connect a client" icon="plug" accent="mcp" href="./Connect.md">
Snippets for Claude Code, Claude Desktop, Codex and VS Code.
</Card>
<Card title="Tools reference" icon="book" accent="mcp" href="./Tools.md">
The tools the server exposes, their arguments and results.
</Card>
<Card title="Server settings" icon="settings" accent="server" href="../Server/Automation/MCP-Server.md">
For admins: turn MCP on and choose how clients sign in.
</Card>
</Cards>

To call Stirling PDF from your own code instead, see the [REST API](../Developers/API.md).
