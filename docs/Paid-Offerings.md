---
sidebar_position: 8
id: Paid-Offerings
title: Paid Offerings
description: Team and Enterprise paid plans for Stirling PDF
tags:
  - Enterprise
  - Team
  - Paid
  - Pricing

---
# Stirling PDF Paid Offerings

Stirling PDF offers Team and Enterprise paid plans. These provide the same great software with added features, streamlined license management, and support options.

> This page covers **self-hosted** Team and Enterprise licensing. See [Account linking](./Stirling-Account-Link.md) for processing allowances and [pricing](https://www.stirling.com/pricing) for all plans.

## Available Plans

### Free Plan
- **Cost**: Free forever
- **Users**: Up to 5 users
- **Features**:
  - Self-hosted deployment
  - All PDF operations
  - [OAuth2 SSO](./Configuration/Security/OAuth%20SSO%20Configuration.md) (Google, GitHub, Keycloak, any OIDC provider)
  - Community support
  - Regular updates
- **Perfect for**: Personal use, small teams, or evaluation

### Team Plan
- **Cost**: $99/month or $999/year (save $189 with annual billing)
- **Available billing**: Monthly or Yearly
- **Users**: 100 users included. Add capacity in blocks of 100 users as your team grows
- **Value**: One bill for the whole team instead of per-seat licenses (100 users works out under $1 per user per month)
- **Features**:
  - Self-hosted deployment
  - All PDF operations
  - 100 users included, with capacity added in blocks of 100
  - One bill instead of per-seat licenses
  - Community support
  - Regular updates
  - Support tickets via support@stirlingpdf.com
  - [External Database](./Configuration/Storage/External%20Database.md) support for optimized deployments and load-balancing
  - Google Drive integration
  - [OAuth2 SSO](./Configuration/Security/OAuth%20SSO%20Configuration.md) (Google, GitHub, Keycloak, any OIDC provider)
- **Perfect for**: Teams and organizations that want predictable, block-based pricing without tracking individual seats

### Enterprise Plan
- **Cost**: Custom pricing - [contact sales](https://www.stirling.com/contact-us) for a quote
- **Available billing**: Agreed as part of your contract
- **Users**: Sized to your organization, with volume discounts as you scale
- **Features**:
  - All Team Plan features, plus:
  - Air-gapped / offline deployment, activated with a [certificate file](#option-2-certificate-file-air-gapped-offline) instead of an online key check
  - Uptime SLAs
  - Custom procurement, security review, and contract terms
  - Volume discounts
  - [SAML2 SSO](./Configuration/Security/SAML%20SSO%20Configuration.md) (Okta, Azure AD, etc.) with automated login handling
  - Custom automated metadata handling
  - Priority support tickets via support@stirlingpdf.com
  - 1:1 meetings with the Stirling PDF team (from registered email domain)
  - Priority feature enhancements
  - Prometheus endpoint for advanced usage monitoring
  - Usage Monitoring UI
  - Audit logs
  - Custom integrations support
  - Dedicated account manager
- **Perfect for**: Regulated environments and large organizations that need air-gapped deployment, uptime SLAs, and an agreement to match
- **Evaluating?** [Book a demo](https://www.stirling.com/book-a-demo) to see the Enterprise features in action

## Purchasing a License

### In-App Purchase (Recommended)

Stirling PDF offers streamlined in-app purchasing and license activation. This covers the Team plan; Enterprise is quoted and issued by sales rather than bought in-app.

1. **Navigate to Settings**: Sign in as the organization owner and go to **Settings → Workspace → Usage & Billing**
2. **Select Your Plan**: Choose the Team plan (100 users included, capacity added in blocks of 100)
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

1. Visit [stirling.com/contact-us](https://www.stirling.com/contact-us) or email support@stirlingpdf.com
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

1. **Open Usage & Billing**: Sign in as the organization owner and go to **Settings → Workspace → Usage & Billing**
2. **Open License Input**: Next to **License key**, select **Add**, or **Update** if a license is already installed
3. **Select Input Type**: Make sure "License Key" is selected
4. **Enter License Key**: Paste your license key in the provided field
5. **Activate**: Save to apply the license
6. **Confirmation**: Your plan features will be enabled immediately

#### Option 2 - Certificate File (Air-Gapped / Offline)

If you received a `.lic` or `.cert` certificate file (typically issued for Enterprise customers who need to activate without outbound internet access):

1. **Open Usage & Billing**: Sign in as the organization owner and go to **Settings → Workspace → Usage & Billing**
2. **Open License Input**: Next to **License key**, select **Add**, or **Update** if a license is already installed
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

1. Sign in as the organization owner and go to **Settings → Workspace → Usage & Billing**
2. Select **Manage Billing**
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
- **Team Plan**: $99/month covers one installation with 100 users included
  - Capacity is added in blocks of 100 users, so you get one bill instead of per-seat licenses
  - Example: 100 users = under $1 per user per month
- **Enterprise Plan**: Capacity and terms are set in your contract, with volume discounts as you scale
  - [Contact sales](https://www.stirling.com/contact-us) for a quote covering your user count, deployment model, and SLA

## Upgrading Your Plan

You can upgrade from Free → Team at any time:

1. Sign in as the organization owner and go to **Settings → Workspace → Usage & Billing**
2. On the plan tier you want, click "Upgrade"
3. Complete checkout
4. Your existing license will be automatically upgraded

Moving Team → Enterprise goes through sales - [contact sales](https://www.stirling.com/contact-us).

Adding more user capacity to an existing Team plan is coming soon as an in-app feature. Until it lands, email support@stirlingpdf.com and we'll add the block for you.

**Note**: When upgrading, your new plan starts immediately and you'll be credited for any unused time on your previous plan.

## Support

### Community Support (All Plans)
- GitHub Issues: [github.com/Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF)
- Discord: Join our community server

### Email Support (Team & Enterprise)
- Email: support@stirlingpdf.com
- Response time: 1-2 business days (Team), Priority response (Enterprise)

### Enterprise Support
- Priority email support
- 1:1 meetings with Stirling PDF team
- Dedicated account manager
- Uptime SLAs agreed in your contract

## Frequently Asked Questions

**Q: Can I try before I buy?**
A: The Free plan supports up to 5 users and includes the free PDF tools. Premium features require the corresponding paid plan. If you'd rather be walked through the paid features first, [book a demo](https://www.stirling.com/book-a-demo).

**Q: What happens if I cancel?**
A: Your license remains active until the end of your billing period, then reverts to Free plan limits.

**Q: What happens when we pass 100 users?**
A: The Team plan includes 100 users. When you need more, capacity is added in blocks of 100 - you stay on one bill rather than buying individual seats. Adding a block from inside the app is coming soon; in the meantime, email support@stirlingpdf.com.

**Q: How is Enterprise priced?**
A: Custom, based on your user count, deployment model, and the terms you need. It is not sold in-app - [contact sales](https://www.stirling.com/contact-us) for a quote. Volume discounts apply as you scale. If you want to see it working first, [book a demo](https://www.stirling.com/book-a-demo).

**Q: Can I move my license to a different server?**
A: Contact support@stirlingpdf.com for license transfers. Enterprise customers have more flexibility.

**Q: Do I need an internet connection?**
A: License activation requires internet for initial verification. Enterprise customers running air-gapped can request offline certificate files instead.

**Q: What's the difference between monthly and yearly billing?**
A: Yearly billing offers significant savings. For Team plan: $999/year vs $1,188/year monthly (save $189 = almost 2 months free).

**Q: How do I get an invoice?**
A: Invoices are automatically sent via email and accessible through the Billing Portal.

## Migration from V1

If you're upgrading from Stirling PDF V1 with an existing license:

1. Your existing license key will continue to work
2. You can enter it manually in **Settings → Workspace → Usage & Billing**
3. Or, re-activate through the in-app purchase flow
4. Contact support@stirlingpdf.com if you encounter any issues

---

For pricing details, visit [stirling.com/pricing](https://stirling.com/pricing)

For technical support, email support@stirlingpdf.com
