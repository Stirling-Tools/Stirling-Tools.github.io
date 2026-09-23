---
sidebar_position: 7
id: Modes and Licensing
title: Modes
description: Choose where Stirling PDF runs and understand how server licensing and processing usage apply.
tags: [Modes, Cloud, Self-host, Desktop]
---

# Modes

Stirling PDF can run on your device, on your own server, or in Stirling Cloud.

| Mode | Where documents are processed | Features and usage |
|---|---|---|
| **Desktop — Local** | Your device | Tools included in the desktop app; no cloud connection required. |
| **Desktop + Stirling Cloud** | Locally or in Stirling Cloud, depending on the tool | Cloud processing uses your account's allowance. |
| **Desktop + self-hosted server** | Your connected server for server operations | Uses the server's features, permissions, and allowance. |
| **Web — Self-hosted** | Your server | Uses the server's license and processing allowance. |
| **Stirling Cloud** | Stirling's hosted service | Uses your account and team allowance. |

## Self-hosted deployments

Run Stirling PDF in Docker, Kubernetes, or as a JAR, then connect through a browser or the desktop app. Team and Enterprise licenses add features and user capacity; see [Paid Offerings](./Paid-Offerings.md).

Automation, AI document tools, and API processing use the applicable processing allowance. Manual, interactive non-AI tools do not consume processing units. [Account linking](./Stirling-Account-Link.md) explains the local allowance and how to connect your server.

## Automation and AI

Use [Processor](./Processor/Processor.md) in a web browser to connect sources and run document workflows. It is not currently accessible from the desktop app, although we will be adding it for desktop apps connected to supported environments. Start with [Setup and access](./Processor/Setup-and-Access.md).

Self-hosted servers can run AI on [their own AI engine](./AI/Self-Hosting-the-AI-Engine.md), with hosted providers or [local models](./AI/Model-Providers.md#local-models), or use [Stirling Cloud AI](./AI/Stirling-Cloud-AI.md) through a linked Stirling account. See [AI Overview](./AI/AI-Overview.md).

Open **Settings → Usage & Billing** to view your plan and usage.
