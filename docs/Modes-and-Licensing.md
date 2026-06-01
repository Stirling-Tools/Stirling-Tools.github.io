---
sidebar_position: 6
id: Modes and Licensing
title: Modes & Licensing
description: The different ways to run Stirling PDF and where credits / licensing apply
tags:
  - Licensing
  - Modes
  - Cloud
  - Self-host
  - Desktop
---

# Modes and Licensing

Stirling PDF runs in several modes depending on how you deploy it. This page is just an overview of what each mode is - for pricing, feature matrix, and full license terms see [Paid Offerings](./Paid-Offerings.md).

---

## At a glance

| Mode | What it is | Where files are processed | Credits? | License gate |
|---|---|---|---|---|
| **Desktop - Local** | Native Windows/Mac/Linux app, no sign-in | Your device | No | Free |
| **Desktop + Stirling Cloud** | Same desktop app, signed in to Stirling Cloud | Mix: local for basic tools, cloud for advanced | Yes, on cloud-routed ops | Cloud account |
| **Desktop + Self-hosted server** | Desktop app pointed at your own Stirling server | Your server | No | Whatever your server has |
| **Web - Self-hosted** | Docker / Kubernetes / JAR, accessed via browser | Your server | No | Free / Server / Enterprise |
| **Stirling Cloud SaaS** | `stirlingpdf.com` web app | Stirling Cloud | Yes | Cloud account / subscription |

---

## Desktop - Local

The default for the Windows, Mac, and Linux desktop apps. No sign-in, no server, no credits. Basic PDF tools (merge, split, rotate, sign, watermark, page operations, etc.) run entirely on your device.

Tools that need server-side processing (OCR, document-format conversions, compression, repair) are not available in this mode - sign in to Stirling Cloud or connect to a self-hosted server to use them.

---

## Desktop + Stirling Cloud

The desktop app signed in to your Stirling Cloud account. Basic tools still run locally for free; advanced tools route to Stirling Cloud and consume credits.

---

## Desktop + Self-hosted server

The desktop app pointed at a Stirling PDF instance you run yourself. All tools route to your server and **no credits apply**. Whichever license tier your server runs (Free, Server, Enterprise) is what the desktop client gets.

---

## Web - Self-hosted

Stirling PDF running in Docker, Kubernetes, or as a bare-metal JAR, accessed via a browser. **No credits ever.** License tier determines which advanced features (unlimited users, SSO, SAML, audit logs, etc.) are unlocked - see [Paid Offerings](./Paid-Offerings.md).

---

## Stirling Cloud SaaS

The hosted version at `stirlingpdf.com`. All processing happens in Stirling's cloud, and every operation costs credits. Free accounts include a monthly allowance; paid plans include more credits. See [Paid Offerings](./Paid-Offerings.md) for current pricing.

---

## Commercial use

The free tier of Stirling PDF (across all the above modes) is intended for personal, internal trial, or minimal use. Production and customer-facing commercial use requires a paid Server or Enterprise license. See [Paid Offerings](./Paid-Offerings.md) for details or [contact us](https://www.stirling.com/book-a-demo) if you're not sure where your use case falls.
