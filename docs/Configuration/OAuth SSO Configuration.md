---
sidebar_position: 3
tags: [enterprise, management, feature, advanced feature]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OAuth 2.0 Single Sign-On Configuration
> **Tier**: Server

Stirling-PDF supports Single Sign-On (SSO) using OAuth 2.0 OpenID Connect (OIDC). This allows users to log in using accounts from external providers such as Google, GitHub, Keycloak, Authentik, and others.

> **Looking for SAML 2.0 SSO?** See [SAML SSO Configuration](./SAML%20SSO%20Configuration/SAML%20SSO%20Configuration.md) (Enterprise tier).

## Prerequisites

Before configuring OAuth 2.0 SSO, ensure you have:

- [ ] Stirling-PDF with login enabled (`security.enableLogin: true`)
- [ ] Valid license for Professional tier or higher
- [ ] An OAuth 2.0 provider account (Google, GitHub, Keycloak, etc.)
- [ ] Registered OAuth application with your provider
- [ ] OAuth Client ID and Client Secret from your provider
- [ ] Public HTTPS URL configured with `system.backendUrl` set to your public backend API URL (often same as frontend, verify `https://your-domain.com/api/v1/info/status` is accessible)
- [ ] Callback URL added to provider: `https://your-domain.com/login/oauth2/code/<provider>`

> **Tip**: Start with `loginMethod: all` during initial setup to allow both username/password and OAuth login. This ensures you can always access the admin account if SSO configuration needs adjustment.

## Setup Guide

### Step 1: Configure Login Settings

Enable login and set the login method to allow both standard and OAuth authentication during initial setup.

<Tabs groupId="config-method">
  <TabItem value="settings" label="settings.yml" default>
    ```yaml
    security:
      enableLogin: true
      loginMethod: all  # Allows both username/password and OAuth login
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    SECURITY_ENABLELOGIN=true
    SECURITY_LOGINMETHOD=all
    ```
  </TabItem>
</Tabs>

**Login Method Options:**
- `all`: Enables all login methods (username/password + OAuth 2)
- `normal`: Username/password only
- `oauth2`: OAuth 2 SSO only (disables username/password login)
- `saml2`: SAML 2 SSO only (Enterprise tier)

### Step 2: Create Initial Admin Account

Before enabling OAuth, create an initial admin account using one of these methods:

**Option A: Use initialLogin credentials** (recommended for first setup)

<Tabs groupId="config-method">
  <TabItem value="settings" label="settings.yml" default>
    ```yaml
    security:
      initialLogin:
        username: 'admin'
        password: 'yourSecurePassword123'
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    SECURITY_INITIALLOGIN_USERNAME=admin
    SECURITY_INITIALLOGIN_PASSWORD=yourSecurePassword123
    ```
  </TabItem>
</Tabs>

**Option B: Create admin manually**
1. Access Stirling-PDF with OAuth disabled
2. Create an admin user through the UI
3. Then enable OAuth

### Step 3: Configure OAuth Provider

Set `security.oauth2.enabled` to `true` and configure your chosen provider.

<Tabs groupId="provider-configs">
  <TabItem value="google" label="Google" default>
    <Tabs groupId="config-method">
      <TabItem value="settings" label="settings.yml" default>
        ```yaml
        security:
          oauth2:
            enabled: true
            client:
              google:
                clientId: <YOUR_CLIENT_ID>
                clientSecret: <YOUR_CLIENT_SECRET>
                scopes: email, profile
                useAsUsername: email
            provider: google
            autoCreateUser: true
            blockRegistration: false
        ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
        ```bash
        SECURITY_OAUTH2_ENABLED=true
        SECURITY_OAUTH2_CLIENT_GOOGLE_CLIENTID=<YOUR_CLIENT_ID>
        SECURITY_OAUTH2_CLIENT_GOOGLE_CLIENTSECRET=<YOUR_CLIENT_SECRET>
        SECURITY_OAUTH2_CLIENT_GOOGLE_SCOPES=email, profile
        SECURITY_OAUTH2_CLIENT_GOOGLE_USEASUSERNAME=email
        SECURITY_OAUTH2_PROVIDER=google
        SECURITY_OAUTH2_AUTOCREATEUSER=true
        SECURITY_OAUTH2_BLOCKREGISTRATION=false
        ```
      </TabItem>
    </Tabs>

    **Provider Setup:**
    1. Go to [Google Cloud Console](https://console.cloud.google.com/)
    2. Create a new project or select existing
    3. Enable Google+ API
    4. Create OAuth 2.0 credentials (Web application)
    5. Add authorized redirect URI: `https://your-domain.com/login/oauth2/code/google`
    6. Copy Client ID and Client Secret
  </TabItem>
  <TabItem value="github" label="GitHub">
    <Tabs groupId="config-method">
      <TabItem value="settings" label="settings.yml" default>
        ```yaml
        security:
          oauth2:
            enabled: true
            client:
              github:
                clientId: <YOUR_CLIENT_ID>
                clientSecret: <YOUR_CLIENT_SECRET>
                scopes: read:user
                useAsUsername: login
            provider: github
            autoCreateUser: true
            blockRegistration: false
        ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
        ```bash
        SECURITY_OAUTH2_ENABLED=true
        SECURITY_OAUTH2_CLIENT_GITHUB_CLIENTID=<YOUR_CLIENT_ID>
        SECURITY_OAUTH2_CLIENT_GITHUB_CLIENTSECRET=<YOUR_CLIENT_SECRET>
        SECURITY_OAUTH2_CLIENT_GITHUB_SCOPES=read:user
        SECURITY_OAUTH2_CLIENT_GITHUB_USEASUSERNAME=login
        SECURITY_OAUTH2_PROVIDER=github
        SECURITY_OAUTH2_AUTOCREATEUSER=true
        SECURITY_OAUTH2_BLOCKREGISTRATION=false
        ```
      </TabItem>
    </Tabs>

    **Provider Setup:**
    1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
    2. Create new OAuth App
    3. Set Authorization callback URL: `https://your-domain.com/login/oauth2/code/github`
    4. Copy Client ID and generate Client Secret
  </TabItem>
  <TabItem value="keycloak" label="Keycloak">
    <Tabs groupId="config-method">
      <TabItem value="settings" label="settings.yml" default>
        ```yaml
        security:
          oauth2:
            enabled: true
            issuer: https://your-keycloak.com/realms/your-realm
            clientId: <YOUR_CLIENT_ID>
            clientSecret: <YOUR_CLIENT_SECRET>
            scopes: openid, profile, email
            useAsUsername: preferred_username
            provider: keycloak
            autoCreateUser: true
            blockRegistration: false
        ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
        ```bash
        SECURITY_OAUTH2_ENABLED=true
        SECURITY_OAUTH2_ISSUER=https://your-keycloak.com/realms/your-realm
        SECURITY_OAUTH2_CLIENTID=<YOUR_CLIENT_ID>
        SECURITY_OAUTH2_CLIENTSECRET=<YOUR_CLIENT_SECRET>
        SECURITY_OAUTH2_SCOPES=openid, profile, email
        SECURITY_OAUTH2_USEASUSERNAME=preferred_username
        SECURITY_OAUTH2_PROVIDER=keycloak
        SECURITY_OAUTH2_AUTOCREATEUSER=true
        SECURITY_OAUTH2_BLOCKREGISTRATION=false
        ```
      </TabItem>
    </Tabs>

    **Provider Setup:**
    1. Access your Keycloak admin console
    2. Select your realm
    3. Create new client (OpenID Connect)
    4. Set Valid Redirect URIs: `https://your-domain.com/login/oauth2/code/keycloak`
    5. Enable "Client authentication" for confidential access
    6. Copy Client ID and Client Secret from Credentials tab
  </TabItem>
  <TabItem value="authentik" label="Authentik">
    <Tabs groupId="config-method">
      <TabItem value="settings" label="settings.yml" default>
        ```yaml
        security:
          oauth2:
            enabled: true
            issuer: https://your-authentik.com/application/o/stirling-pdf/
            clientId: <YOUR_CLIENT_ID>
            clientSecret: <YOUR_CLIENT_SECRET>
            scopes: openid, profile, email
            useAsUsername: preferred_username
            provider: authentik
            autoCreateUser: true
            blockRegistration: false
        ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
        ```bash
        SECURITY_OAUTH2_ENABLED=true
        SECURITY_OAUTH2_ISSUER=https://your-authentik.com/application/o/stirling-pdf/
        SECURITY_OAUTH2_CLIENTID=<YOUR_CLIENT_ID>
        SECURITY_OAUTH2_CLIENTSECRET=<YOUR_CLIENT_SECRET>
        SECURITY_OAUTH2_SCOPES=openid, profile, email
        SECURITY_OAUTH2_USEASUSERNAME=preferred_username
        SECURITY_OAUTH2_PROVIDER=authentik
        SECURITY_OAUTH2_AUTOCREATEUSER=true
        SECURITY_OAUTH2_BLOCKREGISTRATION=false
        ```
      </TabItem>
    </Tabs>

    **Provider Setup:**
    1. Create new Provider (OAuth2/OpenID)
    2. Create new Application
    3. Set Redirect URIs: `https://your-domain.com/login/oauth2/code/authentik`
    4. Copy Client ID and Client Secret
  </TabItem>
  <TabItem value="other" label="Generic OIDC">
    <Tabs groupId="config-method">
      <TabItem value="settings" label="settings.yml" default>
        ```yaml
        security:
          oauth2:
            enabled: true
            issuer: <YOUR_ISSUER_URI>
            clientId: <YOUR_CLIENT_ID>
            clientSecret: <YOUR_CLIENT_SECRET>
            scopes: openid, profile, email
            useAsUsername: email
            provider: <PROVIDER_NAME>
            autoCreateUser: true
            blockRegistration: false
        ```
      </TabItem>
      <TabItem value="env" label="Environment Variables">
        ```bash
        SECURITY_OAUTH2_ENABLED=true
        SECURITY_OAUTH2_ISSUER=<YOUR_ISSUER_URI>
        SECURITY_OAUTH2_CLIENTID=<YOUR_CLIENT_ID>
        SECURITY_OAUTH2_CLIENTSECRET=<YOUR_CLIENT_SECRET>
        SECURITY_OAUTH2_SCOPES=openid, profile, email
        SECURITY_OAUTH2_USEASUSERNAME=email
        SECURITY_OAUTH2_PROVIDER=<PROVIDER_NAME>
        SECURITY_OAUTH2_AUTOCREATEUSER=true
        SECURITY_OAUTH2_BLOCKREGISTRATION=false
        ```
      </TabItem>
    </Tabs>

    **Requirements:**
    - Provider must support OpenID Connect Discovery
    - Must expose `/.well-known/openid-configuration` endpoint
  </TabItem>
</Tabs>

### Step 4: Configure Callback URL

When registering your application with the OAuth provider, use this callback URL format:

```
https://<your-domain>/login/oauth2/code/<provider>
```

**Understanding the Provider Slug:**

The `<provider>` portion of the callback URL must exactly match your `security.oauth2.provider` configuration value:

```yaml
security:
  oauth2:
    provider: authentik  # This becomes part of the callback URL
```

With the above configuration, your callback URL becomes:
```
https://your-domain.com/login/oauth2/code/authentik
```

**Examples:**
- Google: `https://stirling.example.com/login/oauth2/code/google`
- GitHub: `https://stirling.example.com/login/oauth2/code/github`
- Keycloak: `https://stirling.example.com/login/oauth2/code/keycloak`
- Custom provider: `https://stirling.example.com/login/oauth2/code/mycompany`

> **Important**: If the provider slug in the callback URL doesn't match your `security.oauth2.provider` value, OAuth login will fail with redirect errors.

> **Tip**: For generic OIDC providers (not Google/GitHub/Keycloak), you can set `provider` to any lowercase alphanumeric value that makes sense for your organization.

### Step 5: Test OAuth Login and Promote User

1. Restart Stirling-PDF
2. Test OAuth login in an incognito/private browser window
3. Verify you can log in with your OAuth provider
4. Log in with your initial admin account (username/password)
5. Go to **Settings** → **User Management**
6. Find the OAuth user account (created during test login)
7. Change role to **Admin**

### Step 6: (Optional) Switch to SSO-Only Mode

Once you've verified OAuth works and promoted an OAuth user to admin, you can disable username/password login:

<Tabs groupId="config-method">
  <TabItem value="settings" label="settings.yml" default>
    ```yaml
    security:
      loginMethod: oauth2  # Disables username/password login
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    SECURITY_LOGINMETHOD=oauth2
    ```
  </TabItem>
</Tabs>

> **Important**: If you set `loginMethod: oauth2` before creating an OAuth admin user, you will only be able to log in via OAuth, and all new OAuth users will have regular user permissions. Keep `loginMethod: all` until you have at least one OAuth user with admin privileges.

## Configuration Reference

### Required Properties

| Property | Description | Example |
|----------|-------------|---------|
| `security.oauth2.enabled` | Enable OAuth 2 login | `true` |
| `security.oauth2.clientId` | Client ID from your OAuth provider | `stirling-pdf-client` |
| `security.oauth2.clientSecret` | Client Secret from your OAuth provider | `your-secret-key` |
| `security.oauth2.provider` | Provider name | `google`, `github`, `keycloak`, `authentik` |

### Optional Properties

| Property | Description | Default | Example |
|----------|-------------|---------|---------|
| `security.oauth2.issuer` | OIDC issuer URL (required for generic providers, must support `/.well-known/openid-configuration`) | - | `https://keycloak.example.com/realms/myrealm` |
| `security.oauth2.autoCreateUser` | Auto-create users on first login | `false` | `true` |
| `security.oauth2.blockRegistration` | Block new user registration, only allow pre-registered users | `false` | `true` |
| `security.oauth2.scopes` | Space or comma-separated list of OAuth scopes | Provider-specific | `openid, profile, email` |
| `security.oauth2.useAsUsername` | Claim to use as username (options depend on provider) | Provider-specific | `email`, `preferred_username`, `login` |

### Provider-Specific Configuration

**Named providers** (Google, GitHub, Keycloak):
```yaml
oauth2:
  client:
    google:  # or github, keycloak
      clientId: ...
      clientSecret: ...
```

**Generic providers** (Authentik, custom OIDC):
```yaml
oauth2:
  issuer: <ISSUER_URI>  # Must support OIDC discovery
  clientId: ...
  clientSecret: ...
```

### Username Claim Options

**Google:**
- `email`, `name`, `given_name`, `family_name`
- See [Google OAuth Scopes](https://developers.google.com/identity/protocols/oauth2/scopes)

**GitHub:**
- `login`, `email`, `name`
- See [GitHub OAuth Scopes](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps)

**Keycloak/Generic OIDC:**
- `email`, `preferred_username`, `nickname`, `name`

## Advanced Configuration

### Backend URL Configuration

If your Stirling-PDF backend is accessible at a different URL than the frontend, configure the backend URL:

<Tabs groupId="config-method">
  <TabItem value="settings" label="settings.yml" default>
    ```yaml
    system:
      backendUrl: https://stirling-api.example.com
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    SYSTEM_BACKENDURL=https://stirling-api.example.com
    ```
  </TabItem>
</Tabs>

Verify the backend URL is correct by checking that `https://your-domain.com/api/v1/info/status` is accessible.

### Auto-Login Feature
> **Tier**: Enterprise

Automatically redirect users to OAuth login page, bypassing the Stirling-PDF login screen.

<Tabs groupId="config-method">
  <TabItem value="settings" label="settings.yml" default>
    ```yaml
    premium:
      proFeatures:
        SSOAutoLogin: true
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    PREMIUM_PROFEATURES_SSOAUTOLOGIN=true
    ```
  </TabItem>
</Tabs>

**Auto-login Activation Requirements:**

Auto-login only triggers when **ALL** of the following conditions are met:

1. `ssoAutoLogin` is enabled (as configured above)
2. `loginMethod` is NOT `'all'` and NOT `'normal'` (i.e., SSO-only mode required)
3. Exactly one OAuth provider is configured

**Behavior:**
- When all conditions are met: Users are automatically redirected to OAuth provider login
- When conditions are not met: Standard login page is displayed
- After 5 failed login attempts (configurable via `security.loginAttemptCount`), auto-redirect is disabled
- Users can still access manual login by navigating directly to `/login`

### User Interface

Once OAuth is configured, users will see the SSO login button:

| ![login-page.png](/img/login-page.png) | ![sso-login-option.png](/img/sso-login-option.png) |
|----------------------------------------|---------------------------------------------------|

## Troubleshooting

### Common Issues

**"OAuth2 authentication error"**
- Verify callback URL matches exactly (including provider slug)
- Check client ID and secret are correct
- Ensure provider allows the configured redirect URI
- Confirm `security.oauth2.provider` matches the provider slug in callback URL

**"Invalid issuer"**
- Confirm issuer URL is correct
- Test `https://your-issuer/.well-known/openid-configuration` returns valid JSON
- Check network connectivity from Stirling-PDF container to provider

**"User not created"**
- Set `autoCreateUser: true`
- Check `blockRegistration` is `false` or user is pre-registered
- Verify license allows user count

**Users redirected to wrong URL**
- Verify `system.backendUrl` is configured correctly
- Test that `https://your-domain.com/api/v1/info/status` is accessible
- Check provider's registered redirect URIs match your domain

### Debug Logging

Enable OAuth debug logging to troubleshoot authentication issues.

<Tabs groupId="config-method">
  <TabItem value="custom" label="custom_settings.yml" default>
    ```yaml
    logging:
      level:
        org.springframework.security.oauth2: DEBUG
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_SECURITY_OAUTH2=DEBUG
    ```
  </TabItem>
</Tabs>

## Known Limitations

- OAuth users must be manually promoted to admin role after first login
- Provider discovery requires `/.well-known/openid-configuration` endpoint support
- Auto-login feature requires Enterprise tier

## See Also

- [SAML SSO Configuration](./SAML%20SSO%20Configuration/SAML%20SSO%20Configuration.md) - Enterprise SAML 2.0 setup
- [System and Security](./System%20and%20Security.md) - Additional security settings
- [External Database](./External%20Database.md) - User storage configuration
