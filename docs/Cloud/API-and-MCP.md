---
title: API and MCP
sidebar_label: API & MCP
sidebar_position: 6
description: Call Stirling Cloud from your own code with an API key, or connect an AI assistant over MCP.
---

# API and MCP

Guests can't use the API or MCP, so [create an account](./Account.md) first.

## Get an API key

- **Team owners:** open **Settings → Preferences → API Keys** and select **Create key**. Copy the secret straight away, as it is shown only once. **Revoke key** stops a key working immediately.
- **Members:** open **Settings → Developer → API Keys** to copy your personal key. To replace it, select the refresh button and confirm with **Refresh Keys**.

To make requests with your key, see [REST API](../Developers/API.md).

API calls use team credits ([Plans, credits and billing](./Plans-and-Billing.md)).

## Connect an AI assistant (MCP)

1. Open **Settings → Developer → MCP Server** and copy **Your MCP endpoint**.
2. Under **Connect your AI assistant**, pick your client and paste the snippet into the file shown.
3. Restart the client. On first use, sign in to Stirling and select **Allow access**.

There is no key to copy. The assistant runs as your account and uses credits. See [Connect an AI assistant](../MCP/Connect.md).
