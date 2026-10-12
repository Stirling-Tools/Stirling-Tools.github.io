---
sidebar_position: 1
title: Sign-in and security
sidebar_label: Sign-in & security
description: Turn login on or off, set the first admin, add users, set lockout and session length, and configure email, the login agreement and legal links.
---

# Sign-in and security

Most settings on this page are in **Settings → Server → Sign-in & security**.

Login is on by default. Some builds, such as `latest-ultra-lite`, have no login at all ([Pick a build](../Server.md#pick-a-build)).

API keys are covered in [REST API](../../Developers/API.md#authentication), and the server signing certificate and signature trust in [Signing certificates and trust](./Signing.md).

## First admin account

When the server starts with an empty user database, it creates the account `admin` with password `stirling`. The first sign-in asks for a new password of at least 8 characters.

To choose the first admin yourself, set these before the first start:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      initialLogin:
        username: admin
        password: a-strong-password
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_INITIALLOGIN_USERNAME=admin
    SECURITY_INITIALLOGIN_PASSWORD=a-strong-password
    ```
  </TabItem>
</Tabs>

This account isn't asked to change its password. Both settings are ignored once the database has users.

## Add users

1. Open **Settings → Workspace → Users** and select **Invite people**.
2. Choose how to add them:
   - **Invite by email** creates the account and emails a sign-in link with a temporary password. It needs [email](#email-configuration) set up.
   - **Create account directly** lets you set the username, **Sign-in method** (**Password**, **OAuth2 / SSO** or **SAML 2.0**), role and team. For password accounts, **Require a password change on first login** is ticked by default.

The Free plan allows 5 users ([Plans and licences](../Licensing/Plans-and-Licences.md)).

## Login settings

| Setting | In the app | Default | What it does |
|---|---|---|---|
| `security.enableLogin` | **Enable Login** | `true` | Require sign-in. |
| `security.loginMethod` | **Login Method** | `all` | `all`, `normal` (username and password only), `oauth2` or `saml2`. |
| `security.loginAttemptCount` | **Login Attempt Limit** | `5` | Failed attempts before an account is locked. `-1` turns lockout off, for example when [Fail2Ban](./Fail2Ban.md) handles it. |
| `security.loginResetTimeMinutes` | **Login Reset Time (minutes)** | `120` | How long a locked account stays locked. |
| `security.xFrameOptions` | **X-Frame-Options** | `DENY` | `DENY` blocks embedding in iframes, `SAMEORIGIN` allows it from your own domain, `DISABLED` sends no header. Set to `DISABLED` automatically when login is off. |

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true
      loginMethod: all
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_ENABLELOGIN=true
    SECURITY_LOGINMETHOD=all
    ```
  </TabItem>
</Tabs>

To run without login, set `SECURITY_ENABLELOGIN=false`. Anyone who can reach the server can then use it, and features that need accounts, such as server file storage, turn off. To also hide the **Settings** button from everyone, set `system.showSettingsWhenNoLogin: false`. The desktop app can only connect to a server that has login on.

## Session length

The app renews its sign-in token while it is open. Change the lifetimes under **JWT Configuration**:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      jwt:
        tokenExpiryMinutes: 1440          # web browsers, 24 hours
        desktopTokenExpiryMinutes: 43200  # desktop app, 30 days
        refreshGraceMinutes: 15           # an expired token can still be refreshed for this long
        allowedClockSkewSeconds: 60       # tolerance for clock drift between client and server
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_JWT_TOKENEXPIRYMINUTES=1440
    SECURITY_JWT_DESKTOPTOKENEXPIRYMINUTES=43200
    SECURITY_JWT_REFRESHGRACEMINUTES=15
    SECURITY_JWT_ALLOWEDCLOCKSKEWSECONDS=60
    ```
  </TabItem>
</Tabs>

## Single sign-on

See [OAuth2 / OIDC single sign-on](./OAuth-SSO.md) (every plan) and [SAML single sign-on](./SAML-SSO.md) (Enterprise).

## Email configuration

The server sends email for:

- **Invite by email** in **Settings → Workspace → Users**
- the **Email the user about the reset** option when an admin resets a password
- share notifications, when [email sharing](../Storage/File-Storage.md) is on
- database backup and import notifications (Enterprise, see [Database](../Storage/Database.md))

Set it up in **Settings → Server → Integrations → SMTP Mail**, or in `settings.yml`:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    mail:
      enabled: true
      enableInvites: true        # allow Invite by email (needs login on)
      host: smtp.example.com
      port: 587
      username: noreply@example.com
      password: your-smtp-password
      from: noreply@example.com
      startTlsEnable: true       # upgrade to TLS after connecting (port 587)

    system:
      frontendUrl: https://pdf.example.com   # used to build links in emails
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    MAIL_ENABLED=true
    MAIL_ENABLEINVITES=true
    MAIL_HOST=smtp.example.com
    MAIL_PORT=587
    MAIL_USERNAME=noreply@example.com
    MAIL_PASSWORD=your-smtp-password
    MAIL_FROM=noreply@example.com
    MAIL_STARTTLSENABLE=true
    SYSTEM_FRONTENDURL=https://pdf.example.com
    ```
  </TabItem>
</Tabs>

For implicit TLS on port 465, set `sslEnable: true` instead. Other options: `startTlsRequired` (fail if the server can't upgrade, default `false`), `sslCheckServerIdentity` (verify the certificate's hostname, default `false`) and `sslTrust` (hosts to trust; empty trusts all).
If `system.frontendUrl` is empty, the sign-in link in invite emails uses the address the admin used to reach the server.

## Login agreement

Show a disclaimer that users must accept after signing in, or on launch when login is off. Turn it on in **Settings → Server → Legal & privacy → Login Agreement**, where you can also edit the text for each language.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    legal:
      loginAgreement:
        enabled: true               # turn the agreement on
        showInAnonymousMode: true   # set false to hide it when login is off
        fallbackText: ""            # Markdown used when no language file matches
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    LEGAL_LOGINAGREEMENT_ENABLED=true
    LEGAL_LOGINAGREEMENT_SHOWINANONYMOUSMODE=true
    LEGAL_LOGINAGREEMENT_FALLBACKTEXT=""
    ```
  </TabItem>
</Tabs>

- The text is Markdown in `customFiles/disclaimer/<locale>.md`, such as `en-US.md`. The in-app editor writes the same files.
- Each user sees their own language, then the default locale's file, then `fallbackText`. With no text, no dialog appears.
- Text changes apply at the next sign-in. Turning the agreement on or off needs a restart.

To show the agreement in the desktop app, see [Managed deployment](../../Desktop/Managed-Deployment.md).

## Legal links

Links to your legal pages appear in **Settings → About**. Edit them in **Settings → Server → Legal & privacy → Legal documents**, or:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    legal:
      termsAndConditions: https://www.stirling.com/legal/terms-of-service
      privacyPolicy: https://www.stirling.com/legal/privacy-policy
      accessibilityStatement: ""
      cookiePolicy: ""
      impressum: ""
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    LEGAL_TERMSANDCONDITIONS=https://www.stirling.com/legal/terms-of-service
    LEGAL_PRIVACYPOLICY=https://www.stirling.com/legal/privacy-policy
    LEGAL_ACCESSIBILITYSTATEMENT=""
    LEGAL_COOKIEPOLICY=""
    LEGAL_IMPRESSUM=""
    ```
  </TabItem>
</Tabs>

Each value is a URL. `accessibilityStatement`, `cookiePolicy` and `impressum` are hidden when empty. `termsAndConditions` and `privacyPolicy` link to Stirling's own pages by default, and fall back to them when empty.
