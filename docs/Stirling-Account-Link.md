---
sidebar_position: 8.5
id: Stirling Account Link
title: Account linking
description: Connect a self-hosted server to Stirling Cloud, share your team's allowance, and understand what is synchronized.
tags: [Account Link, Billing, Self-host, Processor]
---

# Account linking

Account linking connects your self-hosted Stirling PDF server to a team in Stirling Cloud. It keeps the team's user allowance, processing credits, and usage up to date across connected servers.

[![Account linking exchanges user counts, usage totals, and instance details for plan, Team allowance, and processing credits every 24 hours. PDFs, filenames, and local user lists are not included.](/img/account-linking-explained.png)](/img/account-linking-explained.png)

## Who needs to link

Link your server to use a cloud-backed Team allowance or paid processing. Enterprise does not require account linking.

An unlinked server has a default monthly allowance of **1,000 document units**. Each file uses one unit per 25 pages or 5 MB, whichever is more. Manual, interactive non-AI PDF tools do not use this allowance.

## Connect your server

1. Enable login and sign in to your self-hosted server as its **organization owner**, with administrator access.
2. Open **Settings → Workspace → Account connection** and select **Connect your Stirling account**.
3. Follow the sign-in flow to Stirling Cloud. Use an account that leads the team you want to connect.
4. Approve the connection and return to your server.
5. Check the connection status and open **Usage & Billing** to review the team's allowance and processing credits.

The server synchronizes when linking completes, then every **24 hours** by default. Plan checks can also happen between daily syncs.

## What is synchronized

| Your server sends | Stirling Cloud returns |
|---|---|
| User count | Team user allowance |
| Metered usage totals | Available processing credits and usage limits |
| Instance ID and synchronization details | Current plan and connection status |

**No PDFs, filenames, or local user lists are sent in this sync.** Documents remain on your server. AI providers and external integrations receive content only through their own configured workflows; see [AI Security](./AI/AI-Security.md) and [Integrations](./Processor/Integrations.md).

## Processing usage

| Work | Usage category |
|---|---|
| Pipelines, workflows, and policies | Automation |
| AI document tools | AI |
| Direct PDF tool calls using an API key | API |
| Manual, interactive non-AI PDF tools | No processing units |

Document units depend on the input's page count and size. Information, configuration, and download requests do not consume units.

A self-hosted Team license covers direct PDF tool API calls. Processor automation and AI use their applicable processing allowance. See [Paid Offerings](./Paid-Offerings.md) for licensing.

## Manage the connection

Return to **Account connection** to view this server and other connected instances. Use **Manage on stirling.com** to manage them in Stirling Cloud.

If your Stirling Cloud sign-in expires, sign in again to view billing and manage connections. The server stays linked when your browser session expires.

Select **Disconnect this instance** to stop using the team's cloud allowance. Local files remain on the server. Follow the connection steps again to reconnect.

## Connection and allowance problems

- **Cannot connect:** check that you are the server's organization owner and a leader of the selected Cloud team, and that the server can reach Stirling Cloud.
- **Allowance exhausted:** check the remaining credits and spend cap under **Usage & Billing**.
- **Connection revoked:** reconnect the server with the appropriate Cloud team.
