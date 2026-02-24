---
sidebar_position: 1
tags: [enterprise, management, feature, advanced feature, saml]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SAML 2.0 Single Sign-On Configuration
> **Tier**: Enterprise

Stirling-PDF supports SAML 2.0 Single Sign-On for enterprise deployments. This allows integration with Identity Providers (IdP) like Okta, Azure AD, Google Workspace, OneLogin, Authentik, and others.

> **Looking for OAuth 2.0 SSO?** See [OAuth SSO Configuration](../OAuth%20SSO%20Configuration.md) (Server tier).

## Prerequisites

Before starting, ensure you have:

- [ ] **Enterprise license active** - SAML requires Enterprise tier
- [ ] **Configs directory mounted** - Docker volume mounted (e.g., `./configs:/configs:ro`)
- [ ] **Public backend URL configured** - Set `system.backendUrl` to your public backend API URL (often same as frontend, verify `https://your-domain.com/api/v1/info/status` is accessible)
- [ ] **Reverse proxy configured** - Nginx/Traefik/Caddy with X-Forwarded-* headers forwarding
- [ ] **Login enabled** - `security.enableLogin: true` in settings
- [ ] **Admin account ready** - Either existing admin or plan to use `security.initialLogin` credentials
- [ ] **IdP admin access** - Access to your SAML Identity Provider (Okta, Azure AD, etc.)

> ⚠️ **License Requirement**: SAML 2.0 authentication requires an **ENTERPRISE** license. Existing users created before SAML was license-gated are grandfathered and can continue using SAML with any license tier.

> 💡 **Tip**: Start with `loginMethod: all` during initial setup to allow both username/password and SAML login. This ensures you can always access the admin account if SAML configuration needs adjustment.

## Setup Guide

Follow these steps in order to configure SAML SSO:

### Step 1: Setup Certificates

SAML requires 3 certificate files for mutual trust:

| Certificate | Purpose | Action |
|-------------|---------|--------|
| **SP Private Key** | Sign SAML requests to IdP | Generate with OpenSSL |
| **SP Certificate** | Prove identity to IdP | Generate with OpenSSL, upload to IdP |
| **IdP Certificate** | Verify SAML responses from IdP | Download from your IdP |

#### 1a. Generate Service Provider (SP) Keypair

Stirling-PDF needs a keypair to sign SAML requests and verify responses.

> ℹ️ **If you don't have a keypair**, generate one using OpenSSL:
>
> ```bash
> openssl req -newkey rsa:2048 -nodes \
>   -keyout private_key.key \
>   -x509 -days 365 \
>   -out certificate.crt \
>   -subj "/C=US/ST=State/L=City/O=Stirling-PDF/CN=your-domain.com"
> ```
>
> **Command explanation:**
> - `rsa:2048`: Generates 2048-bit RSA key (secure standard)
> - `-nodes`: No passphrase (required for automated systems)
> - `-days 365`: Certificate valid for 1 year
> - Creates two files: `private_key.key` (private) and `certificate.crt` (public)

If you already have a keypair, ensure you have both the private key and certificate files ready.

#### 1b. Download IdP Certificate

1. Go to your IdP admin panel
2. Find SAML app/provider settings
3. Download signing certificate (PEM format)
4. Save as `idp-certificate.pem`

#### 1c. Place Certificates in Mounted Directory

Place all 3 certificates inside your mounted configs directory:

```
./configs/
  ├── private_key.key        ← SP private key (keep secure!)
  ├── certificate.crt        ← SP certificate (will upload to IdP)
  └── idp-certificate.pem    ← IdP certificate (downloaded)
```

> ⚠️ **Critical**: Use absolute paths in configuration: `/configs/filename.pem` (no `file:` or `classpath:` prefix for Docker)

### Step 2: Configure Stirling-PDF

Configure SAML authentication by providing:
- **IdP URLs and certificate** - Get these from your Identity Provider (obtained from IdP admin panel)
- **SP certificates** - Point to the certificate files created in Step 1
- **Backend URL** - Your public backend API URL for SAML callbacks (often same as frontend, e.g., `https://stirling.example.com`)
- **Login settings** - Enable login and set method to `all` (allows both username/password and SAML during setup)

**Key configuration options:**
- `autoCreateUser: true` - Automatically create user accounts on first SAML login
- `blockRegistration: false` - Allow new SAML users (set to `true` to require admin pre-approval)
- `registrationId: stirling` - Identifier used in SAML URLs (must match across all URLs)

<Tabs groupId="config-methods">
  <TabItem value="settings" label="settings.yml">
    Edit `/configs/settings.yml`:

    ```yaml
    security:
      enableLogin: true
      loginMethod: all  # Keep 'all' during initial setup

      saml2:
        enabled: true
        autoCreateUser: true
        blockRegistration: false
        registrationId: stirling

        # Identity Provider (IdP) URLs (get from your IdP)
        idpSingleLoginUrl: https://idp.example.com/saml/login
        idpSingleLogoutUrl: https://idp.example.com/saml/logout
        idpIssuer: https://idp.example.com/entityid
        idpCert: /configs/idp-certificate.pem

        # Service Provider (SP) Certificates
        privateKey: /configs/private_key.key
        spCert: /configs/certificate.crt

    # Required for SAML callback URLs
    system:
      backendUrl: https://stirling.example.com
    ```
  </TabItem>
  <TabItem value="environment" label="Environment Variables">
    Add to your `docker-compose.yml` or Docker run command:

    ```yaml
    environment:
      SYSTEM_BACKENDURL: https://stirling.example.com
      SECURITY_ENABLELOGIN: true
      SECURITY_LOGINMETHOD: all
      SECURITY_SAML2_ENABLED: true
      SECURITY_SAML2_AUTOCREATEUSER: true
      SECURITY_SAML2_BLOCKREGISTRATION: false
      SECURITY_SAML2_REGISTRATIONID: stirling
      SECURITY_SAML2_IDPSINGLELOGINURL: https://idp.example.com/saml/login
      SECURITY_SAML2_IDPSINGLELOGOUTURL: https://idp.example.com/saml/logout
      SECURITY_SAML2_IDPISSUER: https://idp.example.com/entityid
      SECURITY_SAML2_IDPCERT: /configs/idp-certificate.pem
      SECURITY_SAML2_PRIVATEKEY: /configs/private_key.key
      SECURITY_SAML2_SPCERT: /configs/certificate.crt
    ```
  </TabItem>
</Tabs>

> 💡 **Tip**: Replace the example URLs (`idp.example.com`) with actual values from your Identity Provider.

#### Additional Configuration: baseUrl for SAML SLO

For Single Logout (SLO) to work correctly in production, you must also set the `baseUrl` property:

<Tabs groupId="config-methods">
  <TabItem value="custom-settings" label="custom_settings.yml">
    Add to `/configs/custom_settings.yml`:

    ```yaml
    baseUrl: "https://your-domain.com"
    ```
  </TabItem>
  <TabItem value="environment" label="Environment Variables">
    Add to your Docker Compose environment variables:

    ```yaml
    environment:
      baseUrl: "https://your-domain.com"
    ```
  </TabItem>
</Tabs>

> ⚠️ **Important**: Both `system.backendUrl` and `baseUrl` should be set to your public-facing URL for SAML to work correctly in production.

### Step 3: Configure Your Identity Provider

Provide your IdP with these Service Provider details:

**Entity ID / SP Metadata URL:**
```
https://your-domain.com/saml2/service-provider-metadata/stirling
```

**Assertion Consumer Service (ACS) URL:**
```
https://your-domain.com/login/saml2/sso/stirling
```

**Single Logout (SLO) URL:**
```
https://your-domain.com/logout
```

> 📌 **Important**: Replace `stirling` with your `registrationId` value if you changed it. The registration ID must match in all URLs.

**Upload SP Certificate to IdP** (Critical Step):
1. Open `certificate.crt` (your SP public certificate)
2. In your IdP's SAML app configuration, find "Verification Certificate" or "SP Certificate" field
3. Upload or paste `certificate.crt` contents
4. Save IdP configuration

> Without uploading the SP certificate, your IdP cannot verify requests from Stirling-PDF.

**Configure NameID and Attributes:**
- NameID format: `email` or `unspecified`
- Ensure at least one username attribute is sent: `username`, `emailaddress`, `name`, `upn`, or `uid`

### Step 4: Test SAML Login

1. Open an incognito/private browser window
2. Navigate to `https://your-domain.com`
3. Click "Login via Single Sign-On" button
4. You'll be redirected to your IdP login page
5. Enter your IdP credentials
6. You'll be redirected back to Stirling-PDF
7. A new user account is automatically created (if `autoCreateUser: true`)

> ⚠️ **If login fails**, check application logs for SAML errors. See [Troubleshooting](#troubleshooting) section.

### Step 5: Promote SAML User to Admin

1. Log in with your initial admin account (username/password)
2. Go to **Settings** → **User Management**
3. Find the SAML user account (created during test login)
4. Change **Role** to **Admin**
5. **Save**

> ⚠️ **Important**: Keep at least one SAML user with admin privileges before switching to SSO-only mode.

### Step 6 (Optional): Switch to SSO-Only Mode

Once you've verified SAML works and have a SAML admin user:

```yaml
security:
  loginMethod: saml2  # Disables username/password login
```

Restart Stirling-PDF.

## Configuration Reference

### Required Properties

| Property | Description | Example |
|----------|-------------|---------|
| `security.saml2.enabled` | Enable SAML 2 authentication | `true` |
| `security.saml2.idpSingleLoginUrl` | IdP's Single Sign-On URL | `https://idp.example.com/sso` |
| `security.saml2.idpSingleLogoutUrl` | IdP's Single Logout URL | `https://idp.example.com/slo` |
| `security.saml2.idpIssuer` | IdP's Entity ID / Issuer | `https://idp.example.com` |
| `security.saml2.idpCert` | IdP's signing certificate (PEM format) | `/configs/idp-cert.pem` |
| `security.saml2.privateKey` | Your SP private key | `/configs/private_key.key` |
| `security.saml2.spCert` | Your SP certificate | `/configs/certificate.crt` |
| `system.backendUrl` | Public HTTPS URL for callbacks | `https://stirling.example.com` |

### Optional Properties

| Property | Default | Description |
|----------|---------|-------------|
| `security.saml2.autoCreateUser` | `false` | Auto-create users on first SAML login |
| `security.saml2.blockRegistration` | `false` | Block new users (only allow pre-registered) |
| `security.saml2.registrationId` | `stirling` | Registration ID (must match ACS URL path) |
| `security.saml2.provider` | `null` | Optional provider name for logging |
| `security.loginMethod` | `all` | Login method: `all`, `normal`, `oauth2`, `saml2` |

## Advanced Configuration

### SAML Attribute Mapping

Stirling-PDF attempts to determine the username in the following priority order:

1. **`username`** attribute
2. **`emailaddress`** attribute (or full URI: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`)
3. **`name`** attribute (or full URI: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`)
4. **`upn`** attribute (User Principal Name - often used in Active Directory)
5. **`uid`** attribute (Unix user ID)
6. **NameID** from SAML Subject (fallback if no attributes provided)

**Minimum requirement:** NameID in the SAML Subject (used as fallback identifier)

**Recommended:** At least one username attribute from the priority list above

#### Attribute Debugging

Enable debug logging to see what attributes your IdP is sending:

<Tabs groupId="config-methods">
  <TabItem value="custom-settings" label="custom_settings.yml">
    Add to `/configs/custom_settings.yml`:

    ```yaml
    logging:
      level:
        stirling.software.proprietary.security.saml2: DEBUG
    ```
  </TabItem>
  <TabItem value="environment" label="Environment Variables">
    ```bash
    LOGGING_LEVEL_STIRLING_SOFTWARE_PROPRIETARY_SECURITY_SAML2=DEBUG
    ```
  </TabItem>
</Tabs>

Check logs for:
```
Extracted SAML Attributes: {username=[john.doe], emailaddress=[john.doe@example.com], ...}
```

> 💡 **Note**: Currently, Stirling-PDF only uses attributes for username identification. Other attributes (first name, last name, groups, roles) are extracted but not used.

### Understanding Registration ID

The `registrationId` is a critical configuration value that becomes part of your SAML URLs:

```yaml
security:
  saml2:
    registrationId: stirling  # Default value
```

With `registrationId: stirling`, your URLs are:
- Metadata: `https://your-domain.com/saml2/service-provider-metadata/stirling`
- ACS: `https://your-domain.com/login/saml2/sso/stirling`

**If you change the registration ID:**
```yaml
security:
  saml2:
    registrationId: mycompany  # Custom value
```

Your URLs become:
- Metadata: `https://your-domain.com/saml2/service-provider-metadata/mycompany`
- ACS: `https://your-domain.com/login/saml2/sso/mycompany`

> ⚠️ **Critical**: If you change `registrationId` after configuring your IdP, you must update ALL URLs in your IdP configuration. The registration ID must match exactly in all places, or SAML login will fail.

> 💡 **Recommendation**: Keep the default `stirling` value unless you have a specific reason to change it (e.g., running multiple Stirling-PDF instances with the same IdP).

### Auto-Login Feature
> **Tier**: Enterprise

Automatically redirect users to SAML login, bypassing the Stirling-PDF login screen:

```yaml
premium:
  proFeatures:
    SSOAutoLogin: true
```

**Auto-login Activation Requirements:**

Auto-login only triggers when **ALL** of the following conditions are met:

1. `ssoAutoLogin` is enabled (as configured above)
2. `loginMethod` is NOT `'all'` and NOT `'normal'` (i.e., SSO-only mode required)
3. Exactly one SAML provider is configured

**Behavior:**
- When all conditions are met: Users are automatically redirected to IdP
- When conditions are not met: Standard login page is displayed
- After 5 failed login attempts (configurable via `security.loginAttemptCount`), auto-redirect is disabled
- Users can still manually access `/login` for form login if `loginMethod: all`

## Troubleshooting

### "SAML requires Enterprise license"
**Cause**: SAML authentication requires Enterprise tier license.

**Solution**:
- Verify valid Enterprise license is configured
- Check `premium.enabled=true` in settings
- Existing users created before license enforcement are grandfathered

### "Invalid SAML response signature"
**Cause**: IdP certificate mismatch or incorrect format.

**Solution**:
- Verify `idpCert` file matches certificate from IdP
- Ensure certificate is in PEM format (starts with `-----BEGIN CERTIFICATE-----`)
- Re-download certificate from IdP
- Check certificate hasn't expired

### "ACS URL mismatch"
**Cause**: Redirect URL doesn't match IdP configuration.

**Solution**:
- Verify `SYSTEM_BACKENDURL` is set to public HTTPS URL
- Check reverse proxy sends X-Forwarded-Proto, X-Forwarded-Host, X-Forwarded-Port headers
- Ensure `registrationId` matches in both URL and configuration
- Update ACS URL in IdP to match: `https://your-domain.com/login/saml2/sso/stirling`

### "File not found: idp-certificate.pem"
**Cause**: Certificate file path is incorrect.

**Solution**:
- Verify file exists at specified path
- For Docker: ensure volume is mounted correctly
- Use absolute paths like `/configs/filename.pem` (no `file:` prefix)
- Check file permissions (must be readable by application)

### "Cannot auto-create user"
**Cause**: User doesn't exist and auto-creation is disabled.

**Solution**:
- Set `autoCreateUser: true` to allow new users
- Or pre-create user accounts as admin
- Check license allows additional users

### "Redirect loop after SAML login"
**Cause**: Session or cookie issues.

**Solution**:
- Clear browser cookies
- Check `SYSTEM_BACKENDURL` matches actual access URL
- Verify cookies are allowed for domain
- Ensure SameSite cookie settings are compatible

### "Invalid username" error
**Cause**: No valid username found in assertion.

**Solution**:
1. Enable debug logging to see what attributes are received
2. Ensure IdP sends at least one of: `username`, `emailaddress`, `name`, `upn`, `uid`
3. Verify NameID is present in SAML Subject as fallback
4. Check attribute name format (short name vs full URI)

### Debug Logging

Enable SAML debug logging to see detailed authentication flow:

<Tabs groupId="config-methods">
  <TabItem value="custom-settings" label="custom_settings.yml">
    Add to `/configs/custom_settings.yml`:

    ```yaml
    logging:
      level:
        org.springframework.security.saml2: DEBUG
        org.opensaml: DEBUG
        stirling.software.proprietary.security: DEBUG
    ```
  </TabItem>
  <TabItem value="environment" label="Environment Variables">
    ```bash
    LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_SECURITY_SAML2=DEBUG
    LOGGING_LEVEL_ORG_OPENSAML=DEBUG
    LOGGING_LEVEL_STIRLING_SOFTWARE_PROPRIETARY_SECURITY=DEBUG
    ```
  </TabItem>
</Tabs>

Check logs for SAML attribute information:
```
Extracted SAML Attributes: {username=[john.doe], emailaddress=[john.doe@example.com], ...}
```

### Inspect SAML Assertions

Use browser developer tools:
1. Open Network tab
2. Clear network log
3. Attempt SAML login
4. Look for POST to `/login/saml2/sso/stirling`
5. Decode SAMLResponse parameter (Base64 + inflate)

**Tools:**
- [SAML-tracer](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/) (Firefox/Chrome extension)
- [SAML Decoder](https://www.samltool.com/decode.php) (online tool)

## Known Limitations

### idpMetadataUri Not Auto-Populating

The `idpMetadataUri` configuration field exists but is **not currently used** to auto-populate IdP settings. You must manually configure:
- `idpSingleLoginUrl`
- `idpSingleLogoutUrl`
- `idpIssuer`
- `idpCert`

**Workaround**: Manually extract values from IdP metadata XML.

> 💡 **Note**: Auto-populating IdP settings from metadata URI is a planned enhancement coming soon.

## See Also

- [OAuth SSO Configuration](../OAuth%20SSO%20Configuration.md) - OAuth 2.0 / OIDC setup
- [System and Security](../System%20and%20Security.md) - Additional security settings
- [External Database](../External%20Database.md) - User storage configuration
- [Paid Offerings](../../Paid-Offerings.md) - Enterprise tier and licensing information
