# Analytics and Telemetry

Stirling-PDF uses analytics to understand usage patterns and improve the application. This page explains what data is collected, why we collect it, and how to disable analytics if desired.

> **User Control**: All analytics are **opt-in via a consent banner** that users see on their first visit. Self-hosted administrators can disable analytics system-wide using configuration flags, which additionally prevents the consent banner from appearing at all.

## Overview

Stirling-PDF uses two analytics services:

1. **[Scarf](https://scarf.sh)** - A privacy-friendly tool designed specifically for open-source projects
2. **[PostHog](https://posthog.com)** - An open-source product analytics platform for detailed usage insights

Both services are designed with privacy in mind and can be completely disabled.

## Scarf

### What is Scarf?

[Scarf](https://scarf.sh) is an analytics platform designed specifically for open-source maintainers. It provides a simple tracking pixel (`pixel.stirlingpdf.com`) that collects basic, non-personally identifiable information about Stirling-PDF usage.

### Data Collected by Scarf

The Scarf pixel collects the following information:

- **Machine Type**: Deployment type (Docker, JAR, or EXE)
- **App Version**: The version of Stirling-PDF you're running
- **License Type**: Whether you're using Community or Enterprise edition
- **Login Enabled**: Whether authentication is enabled

**Important**: The Scarf pixel does **NOT** collect:
- Personal information (PII)
- IP addresses
- User-specific data
- Document content or metadata
- User behavior or actions

### Why We Use Scarf

Scarf helps us understand:
- Which deployment types are most common
- Version adoption rates
- Feature usage across different configurations

This data helps prioritize development efforts and ensure compatibility across different deployment scenarios.

### How to Disable Scarf

**Note**: Scarf is already opt-in by default via the cookie consent banner. These settings are for administrators who want to disable Scarf system-wide and prevent the consent banner from appearing.

To disable the Scarf tracking pixel system-wide, set the following environment variable:

```bash
SYSTEM_DISABLEPIXEL=true
```

Or in your `settings.yml`:

```yaml
system:
  disablePixel: true
```

## PostHog Analytics

### What is PostHog?

PostHog is an open-source product analytics platform that provides detailed insights into how users interact with Stirling-PDF. It's hosted on PostHog's European servers (`eu.i.posthog.com`) for GDPR compliance.

### Data Collected by PostHog

PostHog collects comprehensive system and usage information when analytics are enabled:

#### System Information
- Operating system name and version
- Java version and vendor
- CPU cores and memory allocation
- Deployment type (Docker, JAR, EXE)
- Docker/Kubernetes environment details (if applicable)
- Timezone and locale settings

#### Application Configuration
- Security settings (login enabled, OAuth/SAML configuration status)
- UI customization settings
- Feature flags and enabled functionality
- Legal document URLs (terms, privacy policy, etc.)
- System limits and quotas

#### Usage Data
- Total number of user accounts created
- Feature usage (which tools/operations are used)
- Error tracking
- Browser and device information (for web interface)

**Important Privacy Notes**:
- **NO document content, PDF data, or file metadata is ever collected or transmitted**
- PostHog is configured with `opt_out_capturing_by_default: true`
- Text masking is enabled (`mask_all_text: true`)
- Element attributes are masked (`mask_all_element_attributes: true`)
- Users must accept cookies before any data is captured
- Data is stored on EU servers for GDPR compliance
- Each instance has a unique UUID (not tied to individuals)

### Why We Use PostHog

PostHog analytics help us:
- Understand which features are most valuable
- Identify and fix bugs proactively
- Improve user experience based on actual usage patterns
- Prioritize feature development
- Ensure compatibility across different environments
- Monitor application health and performance

### How PostHog is Controlled

PostHog is controlled by two mechanisms:

1. **Global Analytics Setting**: The master switch for all analytics
2. **Cookie Consent Banner**: User-level consent for data collection

#### Global Analytics Setting

**Note**: PostHog is already opt-in by default via the cookie consent banner. The `enableAnalytics` setting allows administrators to disable PostHog system-wide and prevent the consent banner from appearing.

**To disable analytics system-wide**, set:

```bash
SYSTEM_ENABLEPOSTHOG=false
```

Or in your `settings.yml`:

```yaml
system:
  enablePosthog false  # Default: null (prompts for consent)
```

**Setting Options**:
- `true`: Enable analytics (still requires cookie consent)
- `false`: Completely disable analytics
- `null` or unset: Show cookie consent banner (default behavior)

#### Cookie Consent Banner

When analytics are enabled globally (`enableAnalytics: true` or `null`), users see a cookie consent banner on their first visit. Users can:

- Accept all cookies (enables PostHog and Scarf)
- Accept only necessary cookies (disables PostHog tracking)
- Customize preferences

**User Control**:
- Users can change their preferences at any time
- Consent choices are stored locally in the user's browser
- PostHog respects the consent decision immediately
- No tracking occurs until explicit consent is given

## Complete Analytics Disable

To completely disable all analytics and telemetry and consent prompts:

### Environment Variables

```bash
SYSTEM_ENABLEANALYTICS=false
SYSTEM_DISABLEPIXEL=true
```

### Settings File (settings.yml)

```yaml
system:
  enableAnalytics: false  # Disables PostHog
  disablePixel: true      # Disables Scarf pixel
```

### Docker Compose Example

```yaml
version: '3.8'
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
    environment:
      - SYSTEM_ENABLEANALYTICS=false
      - SYSTEM_DISABLEPIXEL=true
    # ... other configuration
```

## Privacy and Data Security

### Data Retention

- PostHog data is retained according to their standard retention policies
- Scarf pixel data is aggregated and anonymized
- No personal documents or content are ever transmitted

### GDPR Compliance

- PostHog servers are located in the EU
- Cookie consent is required before tracking
- Users can opt out at any time
- No cross-site tracking or fingerprinting
- Text and element masking prevents accidental PII collection

### Transparency

- All analytics code is open source and visible in the repository
- Analytics can be completely disabled with simple configuration changes
- Users have full control over their data via cookie preferences

## For Self-Hosted Instances

If you're running Stirling-PDF on your own infrastructure:

1. **Private Networks**: Analytics from self-hosted instances help us understand deployment patterns but don't expose your internal network
2. **Air-Gapped Environments**: Simply disable analytics - the application works perfectly without any external connections
3. **Corporate Environments**: Disable analytics if your security policy requires it, or allow it to help improve the product

## Support

If you have questions or concerns about analytics:

- Check our [Privacy Policy](https://www.stirlingpdf.com/privacy-policy)
- Review the [source code](https://github.com/Stirling-Tools/Stirling-PDF)
- Ask questions on [Discord](https://discord.gg/HYmhKj45pU)
- Open an issue on [GitHub](https://github.com/Stirling-Tools/Stirling-PDF/issues)
