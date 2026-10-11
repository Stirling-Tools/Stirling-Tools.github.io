---
sidebar_position: 7
title: SSRF protection
sidebar_label: SSRF protection
description: Stop the server fetching internal addresses or cloud metadata when it loads URLs during conversions, and choose which domains are allowed.
---

# SSRF protection

SSRF protection stops users from making your server fetch addresses they shouldn't reach, such as `http://192.168.1.1/admin` or the cloud metadata service at `http://169.254.169.254/`. It applies when the server loads remote content referenced in files it converts, such as HTML, SVG and office documents. Setting `system.disableSanitize: true` turns these checks off. URL to PDF always blocks private and local addresses, but ignores these settings.

Configure SSRF protection in **Settings → Server → Sign-in & security → HTML URL Security**, or under `system.html.urlSecurity`.

:::warning
URL to PDF is off by default because of these risks (**Enable URL to PDF** in **Settings → Server → Advanced → Feature Flags**, or `system.enableUrlToPDF`). Only turn it on for internal use.
:::

## Settings

| Setting | Default | What it does |
|---|---|---|
| `enabled` | `true` | Turn SSRF protection on or off. |
| `level` | `MEDIUM` | `OFF`, `MEDIUM` or `MAX` (see below). |
| `allowedDomains` | `[]` | Domains to allow ([see below](#allow-and-block-lists)). |
| `blockedDomains` | `[]` | Extra domains to block in `MEDIUM` ([see below](#allow-and-block-lists)). |
| `internalTlds` | `.local`, `.internal`, `.corp`, `.home` | Domain endings treated as internal. |
| `blockPrivateNetworks` | `true` | Block private ranges (10.x, 172.16-31.x, 192.168.x). |
| `blockLocalhost` | `true` | Block 127.x and `::1`. |
| `blockLinkLocal` | `true` | Block 169.254.x and `fe80::`. |
| `blockCloudMetadata` | `true` | Block cloud provider metadata addresses. |

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      html:
        urlSecurity:
          enabled: true
          level: MEDIUM
          allowedDomains: []
          blockedDomains: []
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_HTML_URLSECURITY_ENABLED=true
    SYSTEM_HTML_URLSECURITY_LEVEL=MEDIUM
    SYSTEM_HTML_URLSECURITY_ALLOWEDDOMAINS=     # comma-separated
    SYSTEM_HTML_URLSECURITY_BLOCKEDDOMAINS=     # comma-separated
    ```
  </TabItem>
</Tabs>

## Protection levels

- **`MEDIUM`** (default) blocks private IPs, localhost, cloud metadata and internal domain endings, and allows the public internet.
- **`MAX`** only allows domains listed in `allowedDomains`.
- **`OFF`** does no checks. Use it only if your network blocks these requests elsewhere.

## Allow and block lists

- **`allowedDomains`**: in `MEDIUM`, a non-empty list restricts access to those domains and their subdomains, and the other `MEDIUM` checks still apply. It doesn't keep the rest of the internet open. In `MAX`, a host must match an entry exactly, so list each subdomain.
- **`blockedDomains`**: only used in `MEDIUM`, with exact matching. Blocking `example.com` doesn't block `sub.example.com`.
