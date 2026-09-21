---
sidebar_position: 7
id: Modes and Licensing
title: Modes
description: Choose where Stirling PDF runs and understand how server licensing and processing usage apply.
tags: [Modes, Cloud, Self-host, Desktop]
---

# Modes

Stirling PDF can run on your device, on a server you operate, or in Stirling Cloud. The selected backend determines which tools are available and which processing entitlement applies.

| Mode | Where processing runs | Configuration and entitlement |
|---|---|---|
| **Desktop — Local** | Your device | Uses the tools included in the desktop build. No cloud connection is needed for available local operations. |
| **Desktop + Stirling Cloud** | Available local operations and the connected cloud backend | Cloud processing uses the signed-in account's entitlement. |
| **Desktop + self-hosted server** | The configured Stirling PDF server for server operations | Uses that server's features, permissions, and processing allowance. |
| **Web — Self-hosted** | Your server | Server license and usage configuration apply, including the local allowance on current unlinked builds. |
| **Stirling Cloud** | Stirling's hosted service | Uses the signed-in account and team entitlement. |

## Self-hosted deployments

Run Stirling PDF in Docker, Kubernetes, or as a JAR and access it through a browser or connected desktop client. A Team or Enterprise license controls licensed server features and user capacity. Processing usage is a separate consideration: automation, AI document tools, and direct PDF tool API calls follow the applicable license and processing entitlement.

Current self-hosted builds enable combined usage accounting by default. Unlinked instances have a local monthly allowance; optional account linking connects the deployment to a Stirling account. Cloud metering has its own switch and does not disable the local allowance when off. See [Stirling Account Link](./Stirling-Account-Link.md) for defaults and license exemptions.

Manual, interactive non-AI PDF tools do not consume processing units. Calling a non-tool information or download endpoint with an API key is also excluded from the tool-request meter.

## Automation and AI

The [Processor](./Processor/Processor.md) provides sources, pipelines, policy templates, and integrations in builds that include it. Start with [Setup and access](./Processor/Setup-and-Access.md) before enabling unattended processing.

The [AI engine](./AI/AI-Overview.md) runs alongside a self-hosted server. It calls the configured model providers; it does not bundle a model. The defaults use hosted providers. Configure both language models and embeddings locally if document content must stay within your infrastructure, and review external integrations separately.

For deployments spread across nodes, see [Clustering](./Configuration/Operations/Clustering.md).

## Plans and usage

Open **Settings → Usage & Billing** for the active entitlement, allowance, and usage. See [Paid Offerings](./Paid-Offerings.md) for Team and Enterprise server licensing and [Stirling pricing](https://www.stirling.com/pricing) for the available offerings.
