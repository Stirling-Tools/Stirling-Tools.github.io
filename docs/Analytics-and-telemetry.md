---
sidebar_position: 9
title: Analytics and Telemetry
id: analytics-telemetry
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Analytics and Telemetry

> Please note all the following applies to version 1.5.0 onward due to be released 16th October


Stirling‑PDF uses analytics to understand usage patterns and improve the application. This page explains what data is collected, why we collect it, and how to disable analytics if desired.

> **User control**: All analytics are **opt‑in via a consent banner** (disabled until a user allows it). A self‑hosted administrator can also turn all analytics off system‑wide. If analytics are disabled system‑wide, no banner is shown.

## Overview

Stirling‑PDF uses two analytics services:

1. **[Scarf](https://scarf.sh)** - a privacy‑friendly tool designed for open‑source projects.
2. **[PostHog](https://posthog.com)** - an open‑source product analytics platform for detailed usage insights.

Both services are designed with privacy in mind and can be completely disabled.

---

## PostHog Analytics

### What is PostHog?

PostHog is an open‑source product analytics platform that provides detailed insights into how users interact with Stirling‑PDF. It's hosted on PostHog's European servers (`eu.i.posthog.com`) for GDPR alignment.

### Data collected by PostHog

PostHog collects comprehensive system and usage information **only when analytics are enabled and consented**:

#### System information
- Operating system name and version
- Java version and vendor
- CPU cores and memory allocation
- Deployment type (Docker, JAR, EXE)
- Docker/Kubernetes environment details (if applicable)
- Timezone and locale settings

#### Application configuration
- Security settings (login enabled, OAuth/SAML configuration status)
- UI customization settings
- Feature flags and enabled functionality
- Legal document URLs (terms, privacy policy, etc.)
- System limits and quotas

#### Usage data
- Aggregate counts (e.g., total number of user accounts created)
- Feature/tool usage (which tools/operations are used)
- Error tracking
- Browser and device information (for the web interface)

**Important privacy notes**:
- **No document content, PDF data, or file metadata is ever collected or transmitted.**
- PostHog is configured with:
  - `opt_out_capturing_by_default: true`
  - `mask_all_text: true`
  - `mask_all_element_attributes: true`
- Users must accept cookies before any data is captured.
- Data is stored on EU servers.
- Each instance has a unique UUID (not tied to individuals).

### Why we use PostHog

PostHog shows us which features get used, helps us catch bugs, and guides what to build next.

---


## Scarf

### What is Scarf?

[Scarf](https://scarf.sh) provides a simple tracking pixel (`pixel.stirling.com`) that collects basic, non‑personally identifiable information about Stirling‑PDF usage.

### Data collected by Scarf

The Scarf pixel collects the following information:

- **Machine Type**: Deployment type (Docker, JAR, or EXE)
- **App Version**: The version of Stirling‑PDF you're running
- **License Type**: Whether you're using Community or Enterprise edition
- **Login Enabled**: Whether authentication is enabled
- **Page Endpoint Loaded**: Which Stirling‑PDF page was loaded (e.g., `/split-pdf`)

**Important**: The Scarf pixel does **not** collect or store:
- Personal information (PII)
- IP addresses (IP addresses are not stored)
- User‑specific identifiers
- Document content or file metadata
- Fine‑grained user behavior beyond which page/endpoint was loaded

### Why we use Scarf

Scarf gives us a rough idea of how Stirling-PDF is deployed and which pages are reached, so we can prioritise work and keep it compatible across setups.

### How to disable Scarf

Scarf is opt‑in by default (via the cookie consent banner). To disable the Scarf tracking pixel **system‑wide** and suppress the banner for it:

**Environment variable**
```bash
SYSTEM_ENABLESCARF=false
```

**settings.yml**
```yaml
system:
  enableScarf: false
```

---



## Configuration and Control

Analytics are governed by a **global master toggle**, **component toggles**, and the **cookie consent banner**.

### 1) Global analytics toggle (master switch)

Controls **all** analytics and whether a consent banner appears.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      enableAnalytics: false  # true | false | null (unset)
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_ENABLEANALYTICS=false   # true | false | (unset = null)
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          SYSTEM_ENABLEANALYTICS: false
    ```
  </TabItem>
</Tabs>

**Behavior**
- `false`: Disables **all** analytics (no consent banner; PostHog & Scarf are off).
- `true`: Allows analytics (banner still required for user consent before any capture).
- `null`/unset: **First‑run admin choice** - on the first ever connection to a self‑hosted instance, the first visitor (assumed admin) is prompted to choose, and that choice sets the global behavior for all users (either disabling analytics or enabling the consent banner for others).

### 2) Component toggles

Use these to selectively enable/disable providers **in addition** to the global toggle.

**PostHog:**

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      enablePosthog: false   # true | false | null
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_ENABLEPOSTHOG=false
    ```
  </TabItem>
</Tabs>

**Scarf tracking pixel:**

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      enableScarf: false     # true | false | null
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_ENABLESCARF=false
    ```
  </TabItem>
</Tabs>

**Interaction**
- If `enableAnalytics` is `false`, everything is off regardless of component toggles.
- If `enableAnalytics` is `true`/`null`, the consent banner is shown (see below). After consent:
  - PostHog runs only if `enablePosthog` is `true`/`null` **and** the user consented.
  - Scarf runs only if `enableScarf` is `true`/`null` **and** the user consented.

### 3) Cookie consent banner

When analytics are allowed globally (`system.enableAnalytics: true` or resolved via the first‑run admin choice), users see a cookie consent banner on their first visit. Users can:

- **Accept all** → enables PostHog (if `enablePosthog` is `true`/`null`) and Scarf (if `enableScarf` is `true`/`null`)
- **Accept only necessary** → disables PostHog and Scarf
- **Customize** → granular selection where applicable

**User control details**
- Users can change preferences at any time.
- Consent choices are stored locally in the user's browser.
- PostHog and Scarf respect the consent decision immediately.
- No tracking occurs until explicit consent is given.

---

## Complete analytics disable (shortcut)

If you want to disable **all** analytics and telemetry (and suppress any consent prompts) at once:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      enableAnalytics: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_ENABLEANALYTICS=false
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          SYSTEM_ENABLEANALYTICS: false
    ```
  </TabItem>
</Tabs>

---

## Privacy and Data Security

### Data retention
- PostHog data is retained according to PostHog’s configured retention policies.
- Scarf pixel data is aggregated and anonymized.
- No personal documents or content are ever transmitted.

### GDPR alignment
- PostHog servers are located in the EU.
- Cookie consent is required before tracking.
- Users can opt out at any time.
- No cross‑site tracking or fingerprinting.
- Text and element masking helps prevent accidental PII collection.

### Transparency
- All analytics‑related code is open source and visible in the repository.
- Analytics can be completely disabled with simple configuration changes.
- Users have full control over their data via cookie preferences (when analytics are allowed globally).

---

## For Self‑Hosted Instances

If you're running Stirling‑PDF on your own infrastructure:

1. **Private networks**: Analytics from self‑hosted instances help us understand deployment patterns but don't expose your internal network.
2. **Air‑gapped environments**: Disable analytics; the application works perfectly without external connections.
3. **Corporate environments**: Disable analytics if your security policy requires it, or allow it to help improve the product.

---

## Support

If you have questions or concerns about analytics:

- Check our [Privacy Policy](https://www.stirling.com/privacy-policy)
- Review the [source code](https://github.com/Stirling-Tools/Stirling-PDF)
- Ask questions on [Discord](https://discord.gg/HYmhKj45pU)
- Open an issue on [GitHub](https://github.com/Stirling-Tools/Stirling-PDF/issues)
