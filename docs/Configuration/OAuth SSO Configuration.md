---
sidebar_position: 3
tags: [enterprise, management, feature, advanced feature]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# OAuth 2.0 Single Sign-On Configuration
> **Tier**: Professional

Stirling-PDF supports Single Sign-On (SSO) using OAuth 2.0 OpenID Connect (OIDC). This allows users to log in using accounts from external providers such as Google, GitHub, Keycloak, Authentik, and others.

> **Looking for SAML 2.0 SSO?** See [SAML SSO Configuration](./SAML%20SSO%20Configuration.md) (Enterprise tier).

## Prerequisites

- Stirling-PDF with login enabled (`security.enableLogin: true`)
- Valid license for Professional tier or higher
- An OAuth 2.0 provider account (Google, GitHub, Keycloak, etc.)
- Registered OAuth application with your provider

### Pre-Configuration Checklist

Before configuring OAuth 2.0 SSO, ensure you have:

- [ ] **Public HTTPS URL configured**: Set `system.backendUrl` to your public URL (e.g., `https://stirling.example.com`)
- [ ] **Reverse proxy configured**: If using Nginx/Traefik/Caddy, ensure X-Forwarded-* headers are forwarded
- [ ] **Login enabled**: `security.enableLogin: true` in settings
- [ ] **Admin account ready**: Either create an initial admin account OR plan to use `security.initialLogin` credentials
- [ ] **OAuth app registered**: Client ID and Client Secret from your provider
- [ ] **Callback URL added to provider**: `https://your-domain.com/login/oauth2/code/<provider>`

> 💡 **Tip**: Start with `loginMethod: all` during initial setup to allow both username/password and OAuth login. This ensures you can always access the admin account if SSO configuration needs adjustment.

## Basic Configuration

Begin by enabling login and setting the login method in your `/configs/settings.yml`:

```yaml
security:
  enableLogin: true
  loginMethod: all  # or 'oauth2' to disable username/password login
```

### Login Method Options

- `all`: Enables all login methods (username/password + OAuth 2)
- `normal`: Username/password only
- `oauth2`: OAuth 2 SSO only (disables username/password login)
- `saml2`: SAML 2 SSO only (Enterprise tier)

## First-Time Setup Workflow

When setting up OAuth SSO for the first time, follow this workflow to avoid getting locked out:

### Step 1: Keep Mixed Login Enabled

Start with `loginMethod: all` to allow both username/password and OAuth login:

```yaml
security:
  enableLogin: true
  loginMethod: all  # Keep this during initial setup
  oauth2:
    enabled: true
    # ... other OAuth settings
```

### Step 2: Create Initial Admin Account

Choose one of these methods:

**Option A: Use initialLogin credentials** (recommended for first setup)
```yaml
security:
  initialLogin:
    username: 'admin'
    password: 'yourSecurePassword123'
```

**Option B: Create admin manually**
1. Access Stirling-PDF with OAuth disabled
2. Create an admin user through the UI
3. Then enable OAuth

### Step 3: Configure and Test OAuth

1. Enable OAuth with your provider configuration
2. Restart Stirling-PDF
3. Test OAuth login in an incognito/private browser window
4. Verify you can log in with your OAuth provider

### Step 4: Promote OAuth User to Admin

1. Log in with your initial admin account (username/password)
2. Go to **Settings** → **User Management**
3. Find the OAuth user account (created during test login)
4. Change role to **Admin**

### Step 5: (Optional) Switch to SSO-Only Mode

Once you've verified OAuth works and promoted an OAuth user to admin:

```yaml
security:
  loginMethod: oauth2  # Now safe to disable username/password login
```

> ⚠️ **Important**: If you set `loginMethod: oauth2` before creating an OAuth admin user, you will only be able to log in via OAuth, and all new OAuth users will have regular user permissions. Keep `loginMethod: all` until you have at least one OAuth user with admin privileges.

## Provider Configuration

Set `security.oauth2.enabled` to `true` and configure your chosen provider. Stirling-PDF supports multiple providers out of the box:

<Tabs groupId="provider-configs">
  <TabItem value="google" label="Google">
    ```yaml
    security:
      enableLogin: true
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

    **Setup Instructions:**
    1. Go to [Google Cloud Console](https://console.cloud.google.com/)
    2. Create a new project or select existing
    3. Enable Google+ API
    4. Create OAuth 2.0 credentials (Web application)
    5. Add authorized redirect URI: `https://your-domain.com/login/oauth2/code/google`
    6. Copy Client ID and Client Secret

    **Available scopes:** See [Google OAuth Scopes](https://developers.google.com/identity/protocols/oauth2/scopes)
  </TabItem>
  <TabItem value="github" label="GitHub">
    ```yaml
    security:
      enableLogin: true
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

    **Setup Instructions:**
    1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
    2. Create new OAuth App
    3. Set Authorization callback URL: `https://your-domain.com/login/oauth2/code/github`
    4. Copy Client ID and generate Client Secret

    **Available scopes:** See [GitHub OAuth Scopes](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps)
  </TabItem>
  <TabItem value="keycloak" label="Keycloak">
    ```yaml
    security:
      enableLogin: true
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

    **Setup Instructions:**
    1. Access your Keycloak admin console
    2. Select your realm
    3. Create new client (OpenID Connect)
    4. Set Valid Redirect URIs: `https://your-domain.com/login/oauth2/code/keycloak`
    5. Enable "Client authentication" for confidential access
    6. Copy Client ID and Client Secret from Credentials tab
  </TabItem>
  <TabItem value="authentik" label="Authentik">
    ```yaml
    security:
      enableLogin: true
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

    **Setup Instructions:**
    1. Create new Provider (OAuth2/OpenID)
    2. Create new Application
    3. Set Redirect URIs: `https://your-domain.com/login/oauth2/code/authentik`
    4. Copy Client ID and Client Secret
  </TabItem>
  <TabItem value="other" label="Generic OIDC">
    ```yaml
    security:
      enableLogin: true
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

    **Requirements:**
    - Provider must support OpenID Connect Discovery
    - Must expose `/.well-known/openid-configuration` endpoint
  </TabItem>
</Tabs>

## Configuration Properties

### Required Properties

- `security.oauth2.enabled`: Set to `true` to enable OAuth 2 login
- `security.oauth2.clientId`: Client ID from your OAuth provider
- `security.oauth2.clientSecret`: Client Secret from your OAuth provider
- `security.oauth2.provider`: Provider name (google, github, keycloak, authentik, etc.)

### Provider-Specific vs Generic Configuration

**Named providers** (Google, GitHub, Keycloak):
```yaml
oauth2:
  client:
    google:  # or github, keycloak
      clientId: ...
      clientSecret: ...
```

**Generic providers** (Authentik, etc.):
```yaml
oauth2:
  issuer: <ISSUER_URI>  # Must support OIDC discovery
  clientId: ...
  clientSecret: ...
```

### Optional Properties

- `security.oauth2.issuer`: OIDC issuer URL (required for generic providers). Must support `/.well-known/openid-configuration` endpoint
- `security.oauth2.autoCreateUser`: Auto-create users on first login (default: `false`)
- `security.oauth2.blockRegistration`: Block new user registration, only allow pre-registered users (default: `false`)
- `security.oauth2.useAsUsername`: Claim to use as username. Options depend on provider:
  - Google: `email`, `name`, `given_name`, `family_name`
  - GitHub: `login`, `email`, `name`
  - Keycloak/Generic: `email`, `preferred_username`, `nickname`, `name`
- `security.oauth2.scopes`: Space or comma-separated list of OAuth scopes to request

## Callback URL Configuration

When registering your application with the OAuth provider, use this callback URL format:

```
https://<your-domain>/login/oauth2/code/<provider>
```

Examples:
- Google: `https://stirling.example.com/login/oauth2/code/google`
- GitHub: `https://stirling.example.com/login/oauth2/code/github`
- Keycloak: `https://stirling.example.com/login/oauth2/code/keycloak`
- Authentik: `https://stirling.example.com/login/oauth2/code/authentik`

### Understanding the Provider Slug

The `<provider>` portion of the callback URL is determined by your `security.oauth2.provider` configuration value:

```yaml
security:
  oauth2:
    provider: authentik  # This becomes part of the callback URL
```

With the above configuration, your callback URL becomes:
```
https://your-domain.com/login/oauth2/code/authentik
```

**Custom provider example:**
```yaml
security:
  oauth2:
    provider: pas  # Custom provider name
    issuer: https://iam.hedemora.se/hda_t1
```

Callback URL for this configuration:
```
https://your-domain.com/login/oauth2/code/pas
```

> ⚠️ **Important**: The `<provider>` slug in the callback URL must **exactly match** your `security.oauth2.provider` value. If they don't match, OAuth login will fail with redirect errors.

> 💡 **Tip**: If you're using a generic OIDC provider (not Google/GitHub/Keycloak), you can set `provider` to any lowercase alphanumeric value that makes sense for your organization (e.g., `mycompany`, `corporatesso`, `idp`).

## Reverse Proxy Configuration

When running behind a reverse proxy (Nginx, Traefik, Caddy), ensure the proxy forwards these headers:

```nginx
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Port $server_port;
```

Stirling-PDF automatically handles these headers to construct correct redirect URLs.

### Nginx Example

```nginx
server {
    listen 443 ssl;
    server_name stirling.example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://stirling-pdf:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # File upload size limits
        client_max_body_size 100M;
    }
}
```

## Environment Variable Configuration

<Tabs groupId="config-methods">
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: stirlingtools/stirling-pdf:latest
        environment:
          SECURITY_ENABLELOGIN: true
          SECURITY_LOGINMETHOD: all

          # OAuth 2 Configuration
          SECURITY_OAUTH2_ENABLED: true
          SECURITY_OAUTH2_AUTOCREATEUSER: true
          SECURITY_OAUTH2_ISSUER: "https://keycloak.example.com/realms/myrealm"
          SECURITY_OAUTH2_CLIENTID: "stirling-pdf"
          SECURITY_OAUTH2_CLIENTSECRET: "your-client-secret"
          SECURITY_OAUTH2_BLOCKREGISTRATION: false
          SECURITY_OAUTH2_SCOPES: "openid, profile, email"
          SECURITY_OAUTH2_USEASUSERNAME: email
          SECURITY_OAUTH2_PROVIDER: "keycloak"
        volumes:
          - ./configs:/configs
        ports:
          - "8080:8080"
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    docker run -d \
      -p 8080:8080 \
      -v ./configs:/configs \
      -e SECURITY_ENABLELOGIN=true \
      -e SECURITY_LOGINMETHOD=all \
      -e SECURITY_OAUTH2_ENABLED=true \
      -e SECURITY_OAUTH2_AUTOCREATEUSER=true \
      -e SECURITY_OAUTH2_ISSUER="https://keycloak.example.com/realms/myrealm" \
      -e SECURITY_OAUTH2_CLIENTID="stirling-pdf" \
      -e SECURITY_OAUTH2_CLIENTSECRET="your-client-secret" \
      -e SECURITY_OAUTH2_BLOCKREGISTRATION=false \
      -e SECURITY_OAUTH2_SCOPES="openid, profile, email" \
      -e SECURITY_OAUTH2_USEASUSERNAME=email \
      -e SECURITY_OAUTH2_PROVIDER="keycloak" \
      stirlingtools/stirling-pdf:latest
    ```
  </TabItem>
  <TabItem value="local" label="Local Development">
    ```bash
    export SECURITY_ENABLELOGIN=true
    export SECURITY_LOGINMETHOD=all
    export SECURITY_OAUTH2_ENABLED=true
    export SECURITY_OAUTH2_AUTOCREATEUSER=true
    export SECURITY_OAUTH2_ISSUER="https://keycloak.example.com/realms/myrealm"
    export SECURITY_OAUTH2_CLIENTID="stirling-pdf"
    export SECURITY_OAUTH2_CLIENTSECRET="your-client-secret"
    export SECURITY_OAUTH2_BLOCKREGISTRATION=false
    export SECURITY_OAUTH2_SCOPES="openid, profile, email"
    export SECURITY_OAUTH2_USEASUSERNAME=email
    export SECURITY_OAUTH2_PROVIDER="keycloak"
    ```
  </TabItem>
</Tabs>

## Auto-Login Feature
> **Tier**: Enterprise

Automatically redirect users to OAuth login page, bypassing the Stirling-PDF login screen. Enable with:

```yaml
premium:
  proFeatures:
    SSOAutoLogin: true
```

**Behavior:**
- Users are automatically redirected to OAuth provider login
- After 5 failed login attempts (configurable via `security.loginAttemptCount`), auto-redirect is disabled
- Users can still access manual login by navigating directly to `/login`

## User Interface

Once OAuth is configured, users will see the SSO login button:

| ![login-page.png](/img/login-page.png) | ![sso-login-option.png](/img/sso-login-option.png) |
|----------------------------------------|---------------------------------------------------|

## Troubleshooting

### Common Issues

**"OAuth2 authentication error"**
- Verify callback URL matches exactly (including provider slug)
- Check client ID and secret are correct
- Ensure provider allows the configured redirect URI

**"Invalid issuer"**
- Confirm issuer URL is correct
- Test `https://your-issuer/.well-known/openid-configuration` returns valid JSON
- Check network connectivity from Stirling-PDF container to provider

**"User not created"**
- Set `autoCreateUser: true`
- Check `blockRegistration` is `false` or user is pre-registered
- Verify license allows user count

**Users redirected to wrong URL**
- Ensure reverse proxy sends X-Forwarded-* headers
- Verify `server.forward-headers-strategy=NATIVE` in application.properties (default)
- Check provider's registered redirect URIs match your domain

### Debug Logging

Enable OAuth debug logging by setting in your environment:

```bash
LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_SECURITY_OAUTH2=DEBUG
```

## Security Best Practices

1. **Always use HTTPS** for production deployments
2. **Keep client secrets secure** - never commit to version control
3. **Use environment variables** for sensitive configuration
4. **Enable `blockRegistration`** if you want admin-only user creation
5. **Regularly rotate** OAuth client secrets
6. **Monitor login attempts** with `security.loginAttemptCount` (default: 5)
7. **Use least-privilege scopes** - only request necessary permissions

## See Also

- [SAML SSO Configuration](./SAML%20SSO%20Configuration.md) - Enterprise SAML 2.0 setup
- [System and Security](./System%20and%20Security.md) - Additional security settings
- [External Database](./External%20Database.md) - User storage configuration
