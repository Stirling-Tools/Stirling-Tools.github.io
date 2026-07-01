---
sidebar_position: 5
id: Paid-Offerings
title: Paid Offerings
description: Server and Enterprise paid plans for Stirling PDF
tags:
  - Enterprise
  - Server
  - Paid
  - Pricing

---
# Stirling PDF Paid Offerings

Stirling PDF offers Server and Enterprise paid plans. These provide the same great software with added features, streamlined license management, and support options.

> This page covers **self-hosted** Server and Enterprise licensing (a flat-rate or per-seat license key, no credits). Stirling Cloud is a separate, credit-based offering - see [Modes](./Modes-and-Licensing.md) for how the deployment modes compare.

## License and Commercial Use

Stirling PDF's source is licensed under the [GNU AGPLv3](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/LICENSE). You can self-host and use it commercially, but the AGPL's terms apply - notably, if you modify Stirling PDF and offer it to others over a network, you must make your modified source available under the same license.

If you need commercial use without the AGPL obligations, or want the added features and support of the paid tiers, see the Server and Enterprise plans below.

## Plan Names at a Glance

There are two separate product lines, and it's easy to conflate their plan names:

- **Self-hosted** (this page): **Free** (small teams, up to 5 users), **Server** (flat-rate, unlimited users), and **Enterprise** (adds SAML SSO, audit logging, SLA/support).
- **Cloud** ([Stirling Cloud](./Modes-and-Licensing.md)): the hosted **Processor** plan, which is usage-based (billed per document).

**"Server" vs "Processor"**: Server is the self-hosted, flat-rate plan you run on your own infrastructure. Processor is the cloud-hosted, per-document plan. They are not the same thing.

> **Note on "Professional":** "Professional" and "Server" refer to the same tier. If you see a "Professional tier" referenced anywhere, it means the Server tier (or higher).

## Available Plans

### Free Plan
- **Cost**: Free forever
- **Users**: Up to 5 users
- **Features**:
  - Self-hosted deployment
  - All PDF operations
  - Community support
  - Regular updates
- **Perfect for**: Personal use, small teams, or evaluation

### Server Plan
- **Cost**: $99/month or $999/year (save $189 with annual billing)
- **Available billing**: Monthly or Yearly
- **Users**: Unlimited users (flat rate regardless of user count)
- **Value**: The more users you have, the better the value (e.g., 100 users = $1/user/month)
- **Features**:
  - Self-hosted deployment
  - All PDF operations
  - Unlimited users - no per-seat charges
  - Community support
  - Regular updates
  - Support tickets via support@stirlingpdf.com
  - [External Database](./Configuration/External%20Database.md) support for optimized deployments and load-balancing
  - Google Drive integration
  - [OAuth2 / OIDC SSO](./Configuration/OAuth%20SSO%20Configuration.md) (Google, GitHub, Keycloak, any OIDC provider)
- **Perfect for**: Organizations with many users who want predictable, flat-rate pricing

### Enterprise Plan
- **Cost**: Base server price + per-seat licensing (check [stirling.com/pricing](https://stirling.com/pricing))
- **Available billing**: Monthly or Yearly (save with annual billing)
- **Users**: Per-seat licensing (flexible scaling)
- **Features**:
  - All Server Plan features, plus:
  - [SAML2 SSO](./Configuration/SAML%20SSO%20Configuration/SAML%20SSO%20Configuration.md) (Okta, Azure AD, etc.) with automated login handling
  - Custom automated metadata handling
  - Priority support tickets via support@stirlingpdf.com
  - 1:1 meetings with the Stirling PDF team (from registered email domain)
  - Priority feature enhancements
  - Prometheus endpoint for advanced usage monitoring
  - Usage Monitoring UI
  - Audit logs
  - SLA guarantee
  - Custom integrations support
  - Dedicated account manager
- **Perfect for**: Large enterprises requiring priority support, SLA guarantees, and per-seat licensing

### SSO Tier Requirements

Single sign-on is gated by plan tier:

- **OAuth2 / OIDC SSO** requires the **Server** tier (or higher).
- **SAML SSO** requires the **Enterprise** tier.

## Purchasing a License

### In-App Purchase (Recommended)

Stirling PDF offers streamlined in-app purchasing and license activation:

1. **Navigate to Settings**: Log in as an admin and go to Settings → Plan
2. **Select Your Plan**: Choose between Server (unlimited users) or Enterprise (per-seat) plans
3. **Choose Billing Period**: Select monthly or yearly billing (yearly saves money)
4. **Complete Checkout**: You'll be redirected to Stripe's secure checkout
5. **Automatic Activation**: After payment, your license key is automatically retrieved and activated
6. **Confirmation**: You'll see your active plan status immediately in the Settings

**Benefits of In-App Purchase:**
- No manual license key entry required
- Instant activation after payment
- Manage billing directly from the app
- Automatic license key synchronization
- Easy plan upgrades

### Alternative - Contact Us

If you prefer to purchase outside the app or have questions:

1. Visit [stirling.com/contact](https://stirling.com/contact) or email support@stirlingpdf.com
2. Our team will assist you with your purchase
3. You'll receive your license key via email
4. Follow manual activation steps below

## Activating Your License

### Automatic Activation

If you purchased in-app, your license is automatically activated. No further action needed!

### Manual Activation

Stirling PDF accepts two manual activation inputs from the admin UI: a license **key** (string), or a license **certificate file** (`.lic` / `.cert`, used for offline / air-gapped Enterprise activation).

#### Option 1 - License Key

If you purchased via the website and received a license key by email:

1. **Admin Settings**: Log in as an admin and navigate to Settings → Plan
2. **Open License Input**: Expand the "Got a license key or certificate file?" section
3. **Select Input Type**: Make sure "License Key" is selected
4. **Enter License Key**: Paste your license key in the provided field
5. **Activate**: Save to apply the license
6. **Confirmation**: Your plan features will be enabled immediately

#### Option 2 - Certificate File (Air-Gapped / Offline)

If you received a `.lic` or `.cert` certificate file (typically issued for Enterprise customers who need to activate without outbound internet access):

1. **Admin Settings**: Log in as an admin and navigate to Settings → Plan
2. **Open License Input**: Expand the "Got a license key or certificate file?" section
3. **Select Input Type**: Switch to "Certificate File"
4. **Choose File**: Click "Choose License File" and select your `.lic` or `.cert` file (must start with `-----BEGIN LICENSE FILE-----`)
5. **Upload**: The file is uploaded, validated, saved to your `configs/` folder, and activated automatically. Any previous certificate is backed up to `configs/backup/`
6. **Confirmation**: Your plan features will be enabled immediately

Both flows activate dynamically and do not strictly require a restart.

> **Recommended**: Restart the Stirling PDF installation after activation. While the license is applied immediately, restarting ensures all components (security profile, premium feature gates, user/seat counters, scheduled validation jobs) pick up the new license state from a clean startup. This avoids edge cases where cached state from before activation lingers in a long-running process.

### Legacy - settings.yml Activation

For scripted deployments or fully automated provisioning, you can still activate via `settings.yml` directly:

1. Navigate to the Stirling PDF config folder
2. Open `settings.yml`
3. Find the premium section:

```yaml
premium:
  key: 00000000-0000-0000-0000-000000000000
  enabled: false # Enable license key checks for pro/enterprise features
```

4. Replace the key with your license key
5. Change `enabled` from `false` to `true`
6. Restart Stirling PDF

To reference a certificate file from `settings.yml` instead of uploading via the UI:

  1. Place your `.lic` or `.cert` certificate in the config folder (e.g., `configs/cert.lic`)
  2. Use the `file:` prefix to point at the certificate path:

  ```yaml
  premium:
    key: file:configs/cert.lic
    enabled: true
  ```


## Managing Your Subscription

### Billing Portal

Stirling PDF includes a convenient billing management interface:

1. Navigate to Settings → Plan
2. On your current plan, click "Manage"
3. You'll be redirected to Stripe's customer portal where you can:
   - Update payment methods
   - View invoices
   - Cancel or modify subscriptions
   - Update billing information

## Feature Configuration

Once activated, you can customize premium features in your `settings.yml`:

```yaml
premium:
  proFeatures:
    ssoAutoLogin: false
    customMetadata:
      autoUpdateMetadata: false
      author: username
      creator: Stirling-PDF
      producer: Stirling-PDF
    googleDrive:
      enabled: false
      clientId: ''
      apiKey: ''
      appId: ''
```

## License Model

Stirling PDF uses an **installation-based licensing model**:

- Each license is tied to a specific installation (identified by machine fingerprint)
- **Server Plan**: Flat-rate pricing with unlimited users for one installation
  - $99/month = unlimited users (great value for larger teams)
  - Example: 100 users = only $1 per user per month
  - Example: 500 users = only $0.20 per user per month
- **Enterprise Plan**: Base installation license + per-seat user licensing
- **Named User Model**: For Enterprise, seats represent unique users who can log in
  - Example: A company with 10 employees who use Stirling PDF needs 10 seats

## Upgrading Your Plan

You can upgrade from Free → Server or Server → Enterprise at any time:

1. Navigate to Settings → Plan
2. On the plan tier you want, click "Upgrade"
3. Complete checkout
4. Your existing license will be automatically upgraded

**Note**: When upgrading, your new plan starts immediately and you'll be credited for any unused time on your previous plan.

## Support

### Community Support (All Plans)
- GitHub Issues: [github.com/Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF)
- Discord: Join our community server

### Email Support (Server & Enterprise)
- Email: support@stirlingpdf.com
- Response time: 1-2 business days (Server), Priority response (Enterprise)

### Enterprise Support
- Priority email support
- 1:1 meetings with Stirling PDF team
- Dedicated account manager
- SLA guarantees

## Frequently Asked Questions

**Q: Can I try before I buy?**
A: Yes! The Free plan includes all features for up to 5 users. Test thoroughly before upgrading.

**Q: What happens if I cancel?**
A: Your license remains active until the end of your billing period, then reverts to Free plan limits.

**Q: Can I move my license to a different server?**
A: Contact support@stirlingpdf.com for license transfers. Enterprise customers have more flexibility.

**Q: Do I need an internet connection?**
A: License activation requires internet for initial verification. Enterprise customers can request offline certificate files.

**Q: What's the difference between monthly and yearly billing?**
A: Yearly billing offers significant savings. For Server plan: $999/year vs $1,188/year monthly (save $189 = almost 2 months free).

**Q: How do I get an invoice?**
A: Invoices are automatically sent via email and accessible through the Billing Portal.

## Migration from V1

If you're upgrading from Stirling PDF V1 with an existing license:

1. Your existing license key will continue to work
2. You can enter it manually via Settings → Plan
3. Or, re-activate through the in-app purchase flow
4. Contact support@stirlingpdf.com if you encounter any issues

---

For pricing details, visit [stirling.com/pricing](https://stirling.com/pricing)

For technical support, email support@stirlingpdf.com

