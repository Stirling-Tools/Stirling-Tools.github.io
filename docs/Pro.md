---
sidebar_position: 5
id: Pro
title: Pro / Enterprise
description: Enterprise/Pro edition for stirling PDF
tags:
  - Enterprise
  - Pro
  - Premium

---
# Stirling PDF Pro / Enterprise

Stirling PDF offers Pro and Enterprise editions of its software. These are the same great software, but with added features, streamlined license management, and support options.

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
  - [External Database](/Advanced%20Configuration/External%20Database) support for optimized deployments and load-balancing
  - Google Drive integration
- **Perfect for**: Organizations with many users who want predictable, flat-rate pricing

### Enterprise Plan
- **Cost**: Base server price + per-seat licensing (check [stirling.com/pricing](https://stirling.com/pricing))
- **Available billing**: Monthly or Yearly (save with annual billing)
- **Users**: Per-seat licensing (flexible scaling)
- **Features**:
  - All Server Plan features, plus:
  - [Advanced SSO](/Advanced%20Configuration/Single%20Sign-On%20Configuration), OAuth2 and SAML with automated login handling
  - Custom automated metadata handling
  - Priority support tickets via support@stirlingpdf.com
  - 1:1 meetings with the Stirling-PDF team (from registered email domain)
  - Priority feature enhancements
  - Prometheus endpoint for advanced usage monitoring
  - Usage Monitoring UI
  - Audit logs
  - SLA guarantee
  - Custom integrations support
  - Dedicated account manager
- **Perfect for**: Large enterprises requiring priority support, SLA guarantees, and per-seat licensing

## Purchasing a License

### V2.0 - In-App Purchase (Recommended)

Stirling PDF V2.0 offers streamlined in-app purchasing and license activation:

1. **Navigate to Settings**: Log in as an admin and go to Settings → Admin Plan
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

### V2.0 - Automatic Activation

If you purchased in-app, your license is automatically activated. No further action needed!

### V2.0 - Manual Activation

If you purchased via the website and received a license key by email:

1. **Admin Settings**: Log in as an admin and navigate to Settings → Admin Plan
2. **Enter License Key**: Paste your license key in the provided field
3. **Activate**: Click "Activate License"
4. **Confirmation**: Your plan features will be enabled immediately

**No restart required** - license activation is dynamic in V2.0!

### Legacy - settings.yml Activation

For advanced users or air-gapped environments, you can still activate via `settings.yml`:

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
6. Restart Stirling-PDF

For 100% offline air-gapped environments (Enterprise only), you can request a certificate file:

```yaml
premium:
  key: file:config/cert.crt
  enabled: true
```

## Managing Your Subscription

### Billing Portal

V2.0 includes a convenient billing management interface:

1. Navigate to Settings → Admin Plan
2. Click "Manage Billing"
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
    SSOAutoLogin: false
    CustomMetadata:
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

1. Navigate to Settings → Admin Plan
2. Click "Upgrade Plan"
3. Select your new plan tier
4. Complete checkout
5. Your existing license will be automatically upgraded

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
- 1:1 meetings with Stirling-PDF team
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

1. Your existing license key will continue to work in V2
2. You can enter it manually via Settings → Admin Plan
3. Or, re-activate through the in-app purchase flow
4. Contact support@stirlingpdf.com if you encounter any issues

---

For pricing details, visit [stirling.com/pricing](https://stirling.com/pricing)

For technical support, email support@stirlingpdf.com

