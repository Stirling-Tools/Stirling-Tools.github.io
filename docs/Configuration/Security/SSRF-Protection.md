---
sidebar_position: 6
---

# SSRF Protection

## What is SSRF and why does it matter?

SSRF (Server-Side Request Forgery) is when someone tricks your server into making HTTP requests on their behalf - to your internal network, cloud metadata endpoints, or other places they shouldn't be able to reach.

In Stirling PDF, the risk is tools like **URL to PDF**: a user could supply `http://192.168.1.1/admin` or `http://169.254.169.254/` and your server would fetch it. For self-hosted deployments on a private network, that's a real concern.

SSRF protection is **enabled by default** at `MEDIUM` level. For most deployments, you don't need to touch it.

:::warning
The URL to PDF feature is **disabled by default** (`system.enableUrlToPDF: false`) due to the SSRF risks described above. It is intended for internal use only and should not be exposed externally. If you enable it, make sure SSRF protection is properly configured.
:::

---

## Settings

All settings are under `system.html.urlSecurity` in `settings.yml`.

| Setting | Default | Description |
|---|---|---|
| `enabled` | `true` | Master on/off switch |
| `level` | `MEDIUM` | `OFF`, `MEDIUM`, or `MAX` - see below |
| `allowedDomains` | `[]` | Restricts permitted domains when non-empty in MEDIUM; the exclusive domain list in MAX |
| `blockedDomains` | `[]` | Exact domains denied in MEDIUM; not consulted in OFF or MAX |
| `internalTlds` | `.local`, `.internal`, `.corp`, `.home` | TLD suffixes treated as internal |
| `blockPrivateNetworks` | `true` | Block RFC1918 private IP ranges |
| `blockLocalhost` | `true` | Block 127.x / ::1 |
| `blockLinkLocal` | `true` | Block 169.254.x.x / fe80:: |
| `blockCloudMetadata` | `true` | Block AWS/GCP/Azure/Oracle/IBM metadata IPs |

### Protection levels

**`MEDIUM`** (default) - Blocks private IPs, localhost, cloud metadata, and internal TLDs. Public internet URLs are allowed by default.

**`MAX`** - Only URLs explicitly listed in `allowedDomains` are allowed. Everything else is blocked. Unlike MEDIUM, subdomain matching is not supported in MAX mode - each domain and subdomain must be listed individually. Use this if you know exactly which external domains your users need.

**`OFF`** - No SSRF checking at all. Only appropriate if you have network-level controls elsewhere.

### Domain allow and block lists

The lists have different effects at each protection level:

- **`allowedDomains`**: In MEDIUM, a non-empty list restricts access to those domains and their subdomains, subject to the other MEDIUM checks. It does not preserve unrestricted public-internet access. In MAX, hosts must match an entry exactly.
- **`blockedDomains`**: Consulted in MEDIUM only, using exact host matching. Blocking `example.com` does not block `sub.example.com`. OFF bypasses these checks; MAX uses the allowlist.
