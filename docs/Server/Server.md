---
title: Self-hosted server
sidebar_label: Overview
sidebar_position: 0
description: Run Stirling PDF on your own server with Docker, Kubernetes or Java, then sign in and configure it.
---

# Self-hosted server

Run Stirling PDF on your own hardware or cloud account. Your team uses it in a browser or the desktop app.

## Pick a build

| Build | Login and admin settings | Use it when |
|---|---|---|
| Docker `latest` | Yes | You want the standard server. Start here. |
| Docker `latest-fat` | Yes | You also want the AI engine inside the same container. AI stays off until you turn it on. |
| Docker `latest-ultra-lite` | No | Hardware is limited and you only need the core tools. No OCR or Office conversions. |
| `Stirling-PDF-with-login.jar` | Yes | You can't use Docker and will install Java and the conversion tools yourself. |
| `Stirling-PDF.jar` | No | As above, for a single user who needs no login. |
| `Stirling-PDF-server.jar` | No | You only need the [REST API](../Developers/API.md). It has no web interface. |

Builds without login have no users, single sign-on or admin settings, so everything is set in files or environment variables.

## Quick start

Start the `latest` image with the compose file or `docker run` command in [Install with Docker](./Install/Docker.md#quick-start), then open `http://localhost:8080`.

## First login

Login is on by default. Sign in with:

```
Username: admin
Password: stirling
```

You are then asked to set a new password of at least 8 characters. The first admin is also asked whether to send anonymous usage data: see [Analytics and telemetry](./Analytics-and-Telemetry.md).

To create your own first admin instead, set `SECURITY_INITIALLOGIN_USERNAME` and `SECURITY_INITIALLOGIN_PASSWORD` before the first start. They are only used while the database has no users.

To run with no login at all, set `SECURITY_ENABLELOGIN=false`. Anyone who can reach the server can then use it.

The free plan covers up to 5 users. Team and Enterprise add seats and features: see [Plans and licences](./Licensing/Plans-and-Licences.md).

## Next steps

<Cards cols="3">
<Card title="Install with Docker" icon="download" href="./Install/Docker.md">Images, volumes and updates.</Card>
<Card title="Install on Kubernetes" icon="box" href="./Install/Kubernetes.md">Helm chart and persistence.</Card>
<Card title="Install with Java (JAR)" icon="terminal" href="./Install/JAR.md">Run the JAR without Docker.</Card>
<Card title="Production checklist" icon="shield" href="./Production.md">HTTPS, users, backups and monitoring.</Card>
<Card title="Configuration" icon="settings" href="./Configuration.md">Settings, files and environment variables.</Card>
<Card title="Sign-in and security" icon="key" href="./Security/Sign-in-and-Security.md">Login options, email and single sign-on.</Card>
<Card title="AI on your server" icon="sparkles" href="./AI/AI.md">Turn on the AI assistant and tools.</Card>
<Card title="Upgrading from V1" icon="upgrade" href="./Upgrading/Upgrading.md">What changes when you move from V1.</Card>
<Card title="Server FAQ" icon="help" href="./FAQ.md">Common admin questions and fixes.</Card>
</Cards>
