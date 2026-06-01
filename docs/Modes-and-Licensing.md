---
sidebar_position: 6
id: Modes and Licensing
title: Modes & Licensing
description: How Desktop, Self-hosted, and Stirling Cloud modes differ - features, credits, and licensing
tags:
  - Licensing
  - Pricing
  - Modes
  - Cloud
  - Self-host
  - Desktop
---

# Modes and Licensing

Stirling PDF runs in several different modes depending on how you deploy it. This page explains what each mode does, which features are available, where credits apply, and what the license terms cover.

If you've ever asked "do credits apply if I download the Windows app?" or "can I use this commercially on the free plan?", this is the page for you.

---

## The five modes at a glance

| Mode | What it is | Where files are processed | Credits? | License gate |
|---|---|---|---|---|
| **Desktop - Local** | Native Windows/Mac/Linux app, no sign-in | Your device (bundled local backend) | No | Free |
| **Desktop + Stirling Cloud** | Same desktop app, signed in to Stirling Cloud | Mix: local for basic tools, cloud for advanced | Yes, on cloud-routed ops | Cloud account |
| **Desktop + Self-hosted server** | Desktop app pointed at your own Stirling server | Your server | No | Whatever your server has (Free/Server/Enterprise) |
| **Web - Self-hosted** | Docker / Kubernetes / JAR, accessed via browser | Your server | No | Free / Server / Enterprise |
| **Stirling Cloud SaaS** | `stirlingpdf.com` web app | Stirling Cloud | Yes | Cloud account / subscription |

---

## Desktop - Local Mode

The default for the Windows, Mac, and Linux desktop apps. No sign-in, no server, no credits.

### What works locally

Tools that run inside the bundled local backend, with no external dependencies:

- Merge, split, rotate, rearrange, remove pages, crop, scale
- Add password, remove password, change permissions, sign (handwritten or certificate)
- Add watermark, stamp, page numbers
- Multi-tool, compare, read, annotate
- Edit table of contents, extract bookmarks
- Most operations that don't need LibreOffice, Tesseract, qpdf, Ghostscript, ImageMagick, or Calibre

### What does not work locally

Tools that need server-side binaries (LibreOffice, Tesseract, OCRmyPDF, Ghostscript, qpdf, ImageMagick, Calibre, Weasyprint) are **not bundled with the desktop app**. Attempting to use them shows:

> *"This tool requires an account. Sign in to Stirling Cloud or connect to a self-hosted server to use it."*

These tools include:

- OCR (PDF → searchable PDF)
- Conversions: PDF ↔ Word / Excel / PowerPoint / HTML / XML / EPUB / PDF/A
- HTML / URL / Markdown / EML → PDF
- Compression and repair (qpdf/Ghostscript)
- Image scan extraction (OpenCV)
- Replace/invert colors, scanner effect, vector export (Ghostscript)

To use those, either **sign in to Stirling Cloud** or **connect to a self-hosted server** that has the dependencies installed.

### Switching to local from another mode

In the desktop app: open settings, choose "Local". The app stores a `stirling-local-mode=true` flag and routes every operation to the bundled backend.

---

## Desktop + Stirling Cloud

The desktop app, signed in to your Stirling Cloud account.

### How it routes

- **Auth and team endpoints** always go to Stirling Cloud.
- **Tool endpoints** first try the bundled local backend. If the local backend supports the tool, it runs locally (no credits). If not, the request is routed to the Stirling Cloud backend, **which is when credits are consumed**.
- This means simple tools (merge, split, rotate) run locally even when signed in to Cloud; advanced tools (OCR, conversions) run on Cloud.

### When credits apply

Credits **only** apply when a tool is routed to the Stirling Cloud backend. Examples:

- Compress / Convert / OCR / Cert-sign / Timestamp → routed to Cloud (LibreOffice/Tesseract needed) → credits used
- Merge / Split / Rotate / Sign / Watermark → handled by the bundled local backend → no credits

This is why local-only operations stay free even on a paid Stirling Cloud account.

### JWT and storage differences

- Auth tokens live in the OS-native secret store (Windows Credential Manager, macOS Keychain, Linux Secret Service / GNOME Keyring / KWallet on most distributions, via the Rust `keyring` crate), not browser storage.
- Token lifetime is 30 days by default when the request comes from a desktop client (Tauri/Electron/`stirlingpdf-desktop` User-Agent), vs 24 hours from a browser. This is triggered by User-Agent inspection, so the long token applies regardless of which server the desktop app is pointed at. Both defaults are configurable via the JWT properties.
- Self-signed certificates are accepted automatically by the desktop HTTP client (the browser equivalent would prompt).

---

## Desktop + Self-hosted server

Point the desktop app at a Stirling PDF server you run (Docker, Kubernetes, or JAR).

### How it routes

- **All tool requests** go to the configured remote server.
- If the remote server is unreachable, supported tools fall back to the bundled local backend (so basic ops keep working during outages).
- **No credits** - credits do not apply in self-hosted mode regardless of who initiated the request.

### Why this mode exists

Best of both worlds: keep the native app experience and the OS-level credential storage, while having full feature access (OCR, conversions, etc.) backed by your own infrastructure.

Common pattern: run Stirling PDF in Docker on a NAS or VM, distribute the desktop app to colleagues, and point everyone at the shared server.

### Locking the server URL

For IT-managed deployments, the MSI installer (Windows) can lock the connection mode so end users can't change the server. See [Automated Installation](./Installation/Windows.md#automated-installation).

---

## Web - Self-hosted

Stirling PDF running in Docker, Kubernetes, or as a bare-metal JAR, accessed via web browser.

### Credits

**Never applicable.** The credit system is part of the SaaS code path only. Self-hosted deployments don't have credits, don't track them, and don't enforce them.

### License tiers

The web self-hosted build has feature gates based on your license:

- **Free** (no license key): All PDF operations, secure login, up to 5 users, community support.
- **Server license** ($99/month or $999/year): Adds unlimited users, SSO/OAuth2 (Google, GitHub, Keycloak, any OIDC), Google Drive integration, external database (PostgreSQL), and editing text in PDFs.
- **Enterprise license** (custom pricing): Adds SAML SSO, audit logging, usage tracking, Prometheus monitoring (marketed as Enterprise-only), custom PDF metadata, and per-seat licensing.

Attempting to use a paid feature without the corresponding license returns HTTP 403 (`Forbidden`). The `/actuator/*` endpoints (Prometheus scrape target, Spring metrics) return 404 unless you have a Server or Enterprise license - the public-plan marketing positions Prometheus monitoring as Enterprise-only, while the underlying filter currently allows Server too.

See [Paid Offerings](./Paid-Offerings.md) for the full feature matrix and current pricing.

### The 5-user limit (Free plan)

Free deployments are capped at **5 user accounts in the database**. This is checked when creating a new user, not on login. Attempting to create the 6th user returns:

> `Maximum number of users reached. Allowed: 5, Available slots: 0`

The limit applies to the total number of users in the database, not concurrent sessions. The limit is HMAC-signed against the installation's keys and verified on every settings read - manual database edits to raise it are detected and rolled back. To raise the limit, install a Server license (unlimited users) or an Enterprise license (seat-capped). Paid licenses **replace** the limit rather than adding to grandfathering.

### V1 → V2 grandfathering

If you upgraded from Stirling PDF V1 to V2 with existing users:

- Your user-count limit is set to `max(5, currentUserCount)` and **permanently locked**. Existing V1 installs with 50 users keep working without a paid license.
- Existing OAuth/SAML users are flagged as grandfathered and keep SSO access without a paid license. New OAuth/SAML users on the same install still require a paid license.

Fresh V2 installs don't get grandfathering - the 5-user limit applies and OAuth/SAML require a paid license.

---

## Stirling Cloud SaaS

The hosted version at `stirlingpdf.com`. All processing happens in Stirling's cloud.

### Credits

Yes - every operation costs credits. Free accounts include a monthly allowance; paid plans include more (or unlimited) credits. Different operations cost different amounts depending on their compute requirements.

### Credit costs at a glance

| Tier | Credits | Example operations |
|---|---|---|
| **Free / Dev** | 0 | API sandbox, folder scanning preview, "developer" UI screens |
| **Small** | 1 | Rotate, remove pages, add text, add password, remove password, crop, flatten, repair, sign, add page numbers, extract pages, rearrange, scale, edit table of contents, multi-tool, compare, add attachments, validate signature, read |
| **Medium** | 3 | Split, merge, watermark, sanitize, add stamp, extract images, redact, change metadata, page layout, annotate, fill form, scanner effect, get PDF info, replace color, remove blanks, auto-rename, booklet imposition, PDF to single page |
| **Large** | 5 | Compress, convert (any format), OCR, cert-sign, timestamp-pdf |
| **Extra Large** | 10 | Automate (pipeline run) |

Unmapped operations default to the **Medium** tier.

Credits reset monthly. Upgrade to a paid plan for more credits (or remove the limit entirely on higher tiers).

### Why credits exist in SaaS but not self-hosted

In SaaS, you're using Stirling's compute. Credits meter that usage. In self-hosted, you're using your own compute - there's nothing for Stirling to meter.

This is also why the same desktop app does and doesn't consume credits depending on which mode you're in: signed in to Cloud, advanced tools route to Stirling's servers → credits; signed in to your own server or running fully local, no credits.

---

## License terms - what's free for commercial use

Stirling PDF's source is split:

- **Most of the codebase is MIT-licensed.** Use it however you like, including commercially, with attribution.
- **The proprietary modules** - the paid backend features, the SaaS frontend, and the desktop client - are covered by the **Stirling PDF User License**, which is not MIT.

### What the Stirling PDF User License says

The user license explicitly limits the free tier to:

> *"internal trial, evaluation, or minimal use"*

…and rules out:

> *"client-facing or commercial contexts"*

…without a paid subscription.

### Practical translation

| Use case | License needed |
|---|---|
| Personal use on your laptop | Free |
| Internal team evaluation / proof of concept | Free |
| Open-source community / hobby projects | Free (MIT for the core code) |
| Production deployment inside a business | Paid (Server or Enterprise) |
| Customer-facing service | Paid |
| Bundling into a commercial product | Paid (contact us about OEM terms) |
| Forking the MIT subset for your own non-commercial project | Free |

If you're not sure where your use case falls, [contact us](https://www.stirling.com/book-a-demo) or email `support@stirlingpdf.com` for a definitive answer.

---

## Quick decision tree

```
Are you running it on your own infrastructure (Docker, K8s, JAR)?
├─ Yes → No credits ever. License is Free for trial/personal, paid for
│         commercial/production. SSO is Server+, SAML is Enterprise+.
└─ No → Are you using the desktop app?
        ├─ Yes → Are you signed in to Stirling Cloud?
        │       ├─ No (local mode) → No credits. Local-only tools only.
        │       │   Advanced tools require sign-in or self-host.
        │       └─ Yes → Basic tools run locally (free), advanced tools
        │                 run on Stirling Cloud (uses credits).
        └─ No (using stirlingpdf.com web app) → Every operation uses
                credits according to the tier.
```

---

## Related documentation

- **[Paid Offerings](./Paid-Offerings.md)** - Feature matrix, pricing, what each license unlocks
- **[Installation - Docker](./Installation/Docker%20Install.md)** - Self-hosting via Docker
- **[Installation - Kubernetes](./Installation/Kubernetes.md)** - Self-hosting via Helm
- **[OAuth SSO Configuration](./Configuration/OAuth%20SSO%20Configuration.md)** - Setting up SSO (Server license)
- **[SAML SSO Configuration](./Configuration/SAML%20SSO%20Configuration/SAML%20SSO%20Configuration.md)** - Setting up SAML (Enterprise license)
- **[FAQ](./FAQ.md)** - Other common questions
