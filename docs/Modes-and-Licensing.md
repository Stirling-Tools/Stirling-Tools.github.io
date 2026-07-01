---
sidebar_position: 6
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
| **Desktop + Stirling.com Cloud** | Same desktop app, signed in to Stirling.com Cloud | Mix: local for basic tools, cloud for advanced | Yes, on cloud-routed ops |
| **Desktop + Self-hosted server** | Desktop app pointed at your own Stirling server | Your server | No |
| **Web - Self-hosted** | Docker / Kubernetes / JAR, accessed via browser | Your server | No |
| **Stirling.com Cloud** | `stirling.com/app` web app | Stirling.com Cloud | Yes |

---

## Desktop

### Local

The default for the Windows, Mac, and Linux desktop apps. No sign-in, no server, no credits. Basic PDF tools (merge, split, rotate, sign, watermark, page operations, etc.) run entirely on your device.

Tools that need server-side processing (OCR, document-format conversions, compression, repair) are not available in this mode - sign in to Stirling.com Cloud or connect to a self-hosted server to use them.

### With Stirling.com Cloud

The desktop app signed in to your Stirling.com Cloud account. Basic tools still run locally for free; advanced tools route to Stirling.com Cloud and consume credits.

### With a self-hosted server

The desktop app pointed at a Stirling PDF instance you run yourself. All tools route to your server and **no credits apply**. Whichever license tier your server runs (Free, Server, Enterprise) is what the desktop client gets.

---

## Web - Self-hosted

Stirling PDF running in Docker, Kubernetes, or as a bare-metal JAR, accessed via a browser. **No credits ever.** License tier determines which advanced features (unlimited users, SSO, SAML, audit logs, etc.) are unlocked - see [Paid Offerings](./Paid-Offerings.md).

---

## Stirling.com Cloud

The hosted version at [stirling.com/app](https://stirling.com/app). All processing happens in Stirling's cloud, and every operation costs credits. Free accounts include a monthly allowance; the cloud **Processor** plan is usage-based, billed per document. See [Paid Offerings](./Paid-Offerings.md) for current pricing.

---

## Plan names: Server vs Processor

The self-hosted and cloud product lines use separate plan names, which are easy to conflate:

- **Server** is the **self-hosted**, flat-rate plan (unlimited users) that you run on your own infrastructure.
- **Processor** is the **cloud-hosted**, usage-based plan (billed per document) on Stirling.com Cloud.

They are distinct offerings - a "Server" plan is not a "Processor" plan.

> **"Professional" is not a current plan name.** It is a legacy internal term that maps to the **Server** tier. If you see a "Professional tier" referenced anywhere, treat it as the Server tier.

For the full self-hosted plan breakdown (Free, Server, Enterprise) and license terms, see [Paid Offerings](./Paid-Offerings.md).

---

## More than 5 users

The free tier covers up to 5 users. Once you have more than 5, you need a paid Server or Enterprise plan. A paid plan also adds:

- Official support (tickets, SLA, priority responses)
- SSO, SAML, audit logging, and other paid-tier features

SSO is gated by tier: **OAuth2 / OIDC SSO** requires the **Server** tier (or higher), and **SAML SSO** requires the **Enterprise** tier.

See [Paid Offerings](./Paid-Offerings.md) for the full feature comparison or [contact us](https://www.stirling.com/book-a-demo) if you're not sure which plan fits.
