---
sidebar_position: 7
id: Modes and Licensing
title: Modes
description: The different ways to run Stirling PDF and where credits apply
tags:
  - Modes
  - Cloud
  - Self-host
  - Desktop
---

# Modes

Stirling PDF runs in several modes depending on how you deploy it. This page is just an overview of what each mode is - for pricing, feature matrix, and full license terms see [Paid Offerings](./Paid-Offerings.md).

---

## At a glance

| Mode | What it is | Where files are processed | Credits? |
|---|---|---|---|
| **Desktop - Local** | Native Windows/Mac/Linux app, no sign-in | Your device | No |
| **Desktop + Stirling.com Cloud** | Same desktop app, signed in to Stirling.com Cloud | Mix: local where the bundled backend serves the tool, cloud otherwise | Yes, on automation, AI, and API-key work |
| **Desktop + Self-hosted server** | Desktop app pointed at your own Stirling server | Your server; your device when the server is unreachable | No unless that server is linked |
| **Web - Self-hosted** | Docker / Kubernetes / JAR, accessed via browser | Your server | No by default |
| **Web - Self-hosted, linked** | Self-hosted server linked to a Stirling account | Your server | Yes, once metering is enabled - on automation, AI, and API-key work |
| **Stirling.com Cloud** | `stirling.com/app` web app | Stirling.com Cloud | Yes, on automation, AI, and API-key work |

Wherever credits apply, three classes of work consume them: automation (pipelines, workflows, and policy runs), AI tools, and traffic authenticated with an API key. Manual, interactive use of the non-AI PDF tools consumes nothing, in the cloud and on a linked self-hosted deployment alike.

---

## Desktop

### Local

The default for the Windows, Mac, and Linux desktop apps. No sign-in, no server, no credits. Basic PDF tools (merge, split, rotate, sign, watermark, page operations, etc.) run entirely on your device.

Tools that need server-side processing (OCR, document-format conversions, compression, repair) are not available in this mode - sign in to Stirling.com Cloud or connect to a self-hosted server to use them.

### With Stirling.com Cloud

The desktop app signed in to your Stirling.com Cloud account. Basic tools still run locally; tools the bundled backend does not serve route to Stirling.com Cloud. Credits are consumed by automation, AI tools, and API-key traffic, so a non-AI tool call you make by hand costs nothing even when it runs in the cloud. AI tools are billable whoever triggers them, including a person running one by hand.

### With a self-hosted server

The desktop app pointed at a Stirling PDF instance you run yourself. All tools route to your server and **no credits apply**. Whichever license tier your server runs (Free, Team, Enterprise) is what the desktop client gets.

---

## Web - Self-hosted

Stirling PDF running in Docker, Kubernetes, or as a bare-metal JAR, accessed via a browser. **No credits by default.** Account linking is controlled by `stirling.billing.account-link.enabled` (`STIRLING_BILLING_ACCOUNTLINK_ENABLED`), which defaults to `false`, and usage metering sits behind a second switch, `stirling.billing.account-link.metering.enabled` (`STIRLING_BILLING_ACCOUNTLINK_METERING_ENABLED`), which also defaults to `false`. Neither is set in the shipped configuration, so an ordinary self-hosted server meters nothing and consumes nothing from a Stirling account.

License tier determines your user capacity and which advanced features (SSO, SAML, audit logs, etc.) are unlocked - see [Paid Offerings](./Paid-Offerings.md).

A self-hosted deployment also runs the [Processor](./Processor/Processor.md) - sources, policies, pipelines, and integrations for unattended automation - and can run the [AI engine](./AI/AI-Overview.md) next to it. The engine does not ship a model, it calls a provider, and the shipped defaults are hosted (Anthropic for chat, VoyageAI for embeddings). Point both the chat provider and the embedding provider at a local model (Ollama or a custom OpenAI-compatible endpoint) to keep document content inside your infrastructure. For a deployment spread across several nodes, see [Clustering](./Configuration/Operations/Clustering.md).

---

## Web - Self-hosted, linked

An administrator can optionally link a self-hosted deployment to a Stirling account. Once both switches above are on and the instance is linked, automation, AI tool calls, and API-key traffic on that server are metered and reported against the linked account's balance and spend cap. Manual, interactive use of the non-AI tools stays free either way.

With linking enabled but the instance not yet linked, billable requests are refused with HTTP `402` rather than being allowed silently.

The linking flow, the states, exactly what is sent, spend caps, and unlinking are covered in [Stirling Account Link](./Stirling-Account-Link.md).

---

## Stirling.com Cloud

The hosted version at [stirling.com/app](https://stirling.com/app). All processing happens in Stirling's cloud. Credits are consumed by automation (pipelines, workflows, policy runs), AI tools, and API-key traffic; manual, interactive use of the non-AI tools does not consume credits. Free accounts include a one-time allowance of documents; paid plans are pay-for-what-you-use with an optional monthly spend cap. See [Paid Offerings](./Paid-Offerings.md) for current pricing.

---

## More than 5 users

The free tier covers up to 5 users. Once you have more than 5, you need a paid Team or Enterprise plan. Team includes 100 users and adds capacity in blocks of 100; Enterprise is sized to your organization under a custom agreement. A paid plan also adds:

- Official support (tickets, SLAs, priority responses)
- SSO, SAML, audit logging, and other paid-tier features

See [Paid Offerings](./Paid-Offerings.md) for the full feature comparison, [book a demo](https://www.stirling.com/book-a-demo) to see the paid features first-hand, or [contact us](https://www.stirling.com/contact-us) if you're not sure which plan fits.

---

## Related Documentation

- **[Stirling Account Link](./Stirling-Account-Link.md)** - linking a self-hosted deployment to a Stirling account, and exactly what is metered
- **[Paid Offerings](./Paid-Offerings.md)** - plans, pricing, and the full feature comparison
- **[Processor](./Processor/Processor.md)** - sources, policies, and pipelines, the automation work that is metered
- **[AI Overview](./AI/AI-Overview.md)** - the AI engine, including running it yourself next to a self-hosted server
- **[Clustering](./Configuration/Operations/Clustering.md)** - running a self-hosted deployment across several nodes
