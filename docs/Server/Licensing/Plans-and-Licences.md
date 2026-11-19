---
sidebar_position: 1
title: Plans and licences
description: What the Free, Team and Enterprise plans unlock on a self-hosted server, how to get the Team plan, and how to activate an Enterprise licence.
sidebar_label: Plans & licences
---

# Plans and licences

A self-hosted server runs on the Free plan until you add the Team or Enterprise plan. Prices are on [stirling.com/pricing](https://stirling.com/pricing). For Stirling Cloud plans, see [Plans, credits and billing](../../Cloud/Plans-and-Billing.md).

## What each plan unlocks

| Feature | Free | Team | Enterprise |
|---|---|---|---|
| Users | 5 | 100, more in blocks of 100 | Set by your contract |
| All PDF tools, [OAuth2 / OIDC single sign-on](../Security/OAuth-SSO.md), server certificate [signing](../Security/Signing.md) | Yes | Yes | Yes |
| Monthly [processing allowance](./Connect-to-Stirling-Cloud.md#processing-allowance) (automation, AI and API calls) | 1,000 units | 2,500 units | Unlimited |
| [External database](../Storage/Database.md) and [clustering](../Operations/Clustering.md) | - | Yes | Yes |
| S3 or database [file storage](../Storage/File-Storage.md) | - | Yes | Yes |
| [Encryption at rest](../Storage/File-Storage.md#encryption-at-rest) for stored files | - | Yes | Yes |
| Prometheus metrics ([usage monitoring](../Operations/Usage-Monitoring.md)) | - | Yes | Yes |
| Custom PDF metadata | - | Yes | Yes |
| [SAML2 single sign-on](../Security/SAML-SSO.md) | - | - | Yes |
| [SCIM user provisioning](../Security/Sign-in-and-Security.md#scim-user-provisioning) | - | - | Yes |
| [Audit logging](../Security/Audit-Logging.md) and **Usage Analytics** | - | - | Yes |
| Database backup and import email notifications | - | - | Yes |
| Offline activation with a certificate file | - | - | Yes |

The Team and Enterprise plans need a login-capable build (`latest`, `latest-fat` or `Stirling-PDF-with-login.jar`). The `latest-ultra-lite` image and the other JARs have no plans or admin settings.

## User limits

- **Free plan:** 5 users. A server upgraded from V1 keeps its existing user count as the limit if that is higher.
- **Team plan:** the users you bought on stirling.com.
- **Enterprise plan:** the licence sets the limit.

When the server reaches its limit, no more users can be added and admins see a notice such as **Team plan needed** or **Your server has more users than your plan covers**. To add users on the Team plan, buy another block of 100 on stirling.com. See [Upgrade to Team or add users](../../Cloud/Plans-and-Billing.md#upgrade-to-team-or-add-users).

## Get the Team or Enterprise plan

Only the organization owner can link the server or activate a licence, and login must be on.

**Team plan:** link the server to your account on stirling.com, then sign up for the Team plan there. See [Connect to Stirling Cloud](./Connect-to-Stirling-Cloud.md) and [Upgrade to Team or add users](../../Cloud/Plans-and-Billing.md#upgrade-to-team-or-add-users).

**Enterprise plan:** [book a demo](https://stirling.com/book-a-demo) or email support@stirlingpdf.com. You get a licence key, or a certificate file for servers without internet access.

## Activating your Enterprise license

1. <a id="activating-your-license"></a>Sign in as the organization owner and open **Settings → Workspace → Usage & Billing**.
2. Select **Got a license key or certificate file?**
3. Choose **License Key** and paste your key, or choose **Certificate File**, select **Choose License File** and pick your `.lic` or `.cert` file.
4. Select **Save Changes**.

The plan applies straight away, with no restart. Replacing an existing key can't be undone, so keep a copy of it.

A licence key is checked online. A certificate file works offline: it must start with `-----BEGIN LICENSE FILE-----`, and the server saves it in `configs/`, keeping a copy of any file it replaces in `configs/backup/`.

### Set the licence in settings.yml

For scripted deployments, set the key and restart:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    premium:
      enabled: true
      key: your-licence-key
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PREMIUM_ENABLED=true
    PREMIUM_KEY=your-licence-key
    ```
  </TabItem>
</Tabs>

For a certificate file, put it in the config folder and point to it with the `file:` prefix, for example `key: file:configs/licence.lic`.

## Billing and the organization owner

- **Team plan:** manage the plan, users, invoices and cancelling on stirling.com. See [Plans, credits and billing](../../Cloud/Plans-and-Billing.md).
- **A licence bought in the app:** on **Settings → Workspace → Usage & Billing**, select **Manage** on your current plan to open the Stripe billing portal. Stripe may email you a sign-in link first.

Only the organization owner can manage **Usage & Billing** and the link to Stirling Cloud. The owner is the first admin account. To hand it over, open **Settings → Workspace → Users**, set another user's role to **Org Owner** and confirm **Transfer ownership**. The new owner becomes an admin.
