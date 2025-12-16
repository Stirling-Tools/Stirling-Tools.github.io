---
sidebar_position: 4
tags: [enterprise, management, feature, advanced feature, saml]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SAML 2.0 Single Sign-On Configuration
> **Tier**: Enterprise

Stirling-PDF supports SAML 2.0 Single Sign-On for enterprise deployments. This allows integration with Identity Providers (IdP) like Okta, Azure AD, Google Workspace, OneLogin, Authentik, and others.

> **Looking for OAuth 2.0 SSO?** See [OAuth SSO Configuration](./OAuth%20SSO%20Configuration.md) (Professional tier).

> 📚 **IdP-Specific Guides:** [Authentik SAML Setup](./Authentik%20SAML%20Setup.md) - Complete walkthrough

## Prerequisites

- Stirling-PDF with **Enterprise license** (SAML requires Enterprise tier)
- Login enabled (`security.enableLogin: true`)
- Access to SAML 2.0 Identity Provider (IdP)
- SSL/TLS certificate for production (HTTPS required for SAML)

> ⚠️ **License Requirement**: SAML 2.0 authentication requires an **ENTERPRISE** license. Existing users created before SAML was license-gated are grandfathered and can continue using SAML with any license tier.

### Pre-Configuration Checklist

Before configuring SAML 2.0 SSO, ensure you have:

- [ ] **Enterprise license active**: SAML requires Enterprise tier
- [ ] **Public HTTPS URL configured**: Set `system.backendUrl` to your public URL (e.g., `https://stirling.example.com`)
- [ ] **Reverse proxy configured**: If using Nginx/Traefik/Caddy, ensure X-Forwarded-* headers are forwarded
- [ ] **Login enabled**: `security.enableLogin: true` in settings
- [ ] **Admin account ready**: Either create an initial admin account OR plan to use `security.initialLogin` credentials
- [ ] **IdP access**: Admin access to your SAML Identity Provider (Okta, Azure AD, etc.)
- [ ] **IdP certificate downloaded**: PEM format certificate from your IdP
- [ ] **SP keypair generated**: Run the OpenSSL command below to generate `private_key.key` and `certificate.crt`

> 💡 **Tip**: Start with `loginMethod: all` during initial setup to allow both username/password and SAML login. This ensures you can always access the admin account if SAML configuration needs adjustment.

## Quick Start

### 1. Generate Service Provider (SP) Keypair

Stirling-PDF needs a keypair to sign SAML requests and verify responses. Generate one using OpenSSL:

```bash
openssl req -newkey rsa:2048 -nodes -keyout private_key.key -x509 -days 365 -out certificate.crt
```

**Command explanation:**
- `rsa:2048`: Generates 2048-bit RSA key (secure standard)
- `-nodes`: No passphrase (required for automated systems)
- `-days 365`: Certificate valid for 1 year
- Creates two files: `private_key.key` (private) and `certificate.crt` (public)

### 2. Basic Configuration

Enable SAML in your `/configs/settings.yml`:

```yaml
security:
  enableLogin: true
  loginMethod: all  # or 'saml2' to disable username/password login

  saml2:
    enabled: true
    autoCreateUser: true
    blockRegistration: false
    registrationId: stirling

    # Identity Provider (IdP) Configuration
    idpSingleLoginUrl: https://idp.example.com/saml/login
    idpSingleLogoutUrl: https://idp.example.com/saml/logout
    idpIssuer: https://idp.example.com/entityid
    idpCert: /configs/idp-certificate.pem

    # Service Provider (SP) Certificates
    privateKey: /configs/private_key.key
    spCert: /configs/certificate.crt
```

### 3. Configure Your Identity Provider

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

## First-Time Setup Workflow

When setting up SAML SSO for the first time, follow this workflow to avoid getting locked out:

### Step 1: Keep Mixed Login Enabled

Start with `loginMethod: all` to allow both username/password and SAML login:

```yaml
security:
  enableLogin: true
  loginMethod: all  # Keep this during initial setup
  saml2:
    enabled: true
    # ... other SAML settings
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
1. Access Stirling-PDF with SAML disabled
2. Create an admin user through the UI
3. Then enable SAML

### Step 3: Generate and Mount Certificates

Generate SP keypair:
```bash
openssl req -newkey rsa:2048 -nodes -keyout private_key.key -x509 -days 365 -out certificate.crt
```

Download IdP certificate from your provider and mount all certificates in Docker:
```yaml
volumes:
  - ./saml-certs:/configs:ro
```

Place certificates in `./saml-certs/` directory:
- `private_key.key` (your SP private key)
- `certificate.crt` (your SP certificate)
- `idp-certificate.pem` (IdP's public certificate)

### Step 4: Configure and Test SAML

1. Configure SAML with your IdP details in settings.yml
2. Configure your IdP with Stirling-PDF URLs (Metadata, ACS, SLO)
3. Restart Stirling-PDF
4. Test SAML login in an incognito/private browser window
5. Verify you can log in with your SAML provider

### Step 5: Promote SAML User to Admin

1. Log in with your initial admin account (username/password)
2. Go to **Settings** → **User Management**
3. Find the SAML user account (created during test login)
4. Change role to **Admin**

### Step 6: (Optional) Switch to SSO-Only Mode

Once you've verified SAML works and promoted a SAML user to admin:

```yaml
security:
  loginMethod: saml2  # Now safe to disable username/password login
```

> ⚠️ **Important**: If you set `loginMethod: saml2` before creating a SAML admin user, you will only be able to log in via SAML, and all new SAML users will have regular user permissions. Keep `loginMethod: all` until you have at least one SAML user with admin privileges.

## Detailed Configuration

### Configuration Properties

#### Required Properties

| Property | Description | Example |
|----------|-------------|---------|
| `security.saml2.enabled` | Enable SAML 2 authentication | `true` |
| `security.saml2.idpSingleLoginUrl` | IdP's Single Sign-On URL | `https://idp.example.com/sso` |
| `security.saml2.idpSingleLogoutUrl` | IdP's Single Logout URL | `https://idp.example.com/slo` |
| `security.saml2.idpIssuer` | IdP's Entity ID / Issuer | `https://idp.example.com` |
| `security.saml2.idpCert` | IdP's signing certificate (PEM format) | `/configs/idp-cert.pem` |
| `security.saml2.privateKey` | Your SP private key | `/configs/private_key.key` |
| `security.saml2.spCert` | Your SP certificate | `/configs/certificate.crt` |

#### Optional Properties

| Property | Default | Description |
|----------|---------|-------------|
| `security.saml2.autoCreateUser` | `false` | Auto-create users on first SAML login |
| `security.saml2.blockRegistration` | `false` | Block new users (only allow pre-registered) |
| `security.saml2.registrationId` | `stirling` | Registration ID (must match ACS URL path) |
| `security.saml2.provider` | `null` | Optional provider name for logging |

## Certificate Setup

SAML requires **3 certificate files** for mutual trust between Stirling-PDF (Service Provider) and your IdP (Identity Provider).

### Certificate Overview

| Certificate | File | Source | Purpose | Action Required |
|-------------|------|--------|---------|-----------------|
| **IdP Certificate** | `idpCert` | Download from your IdP | Verify SAML responses from IdP | Download from IdP admin panel |
| **SP Private Key** | `privateKey` | Generate yourself | Sign SAML requests to IdP | Generate with OpenSSL |
| **SP Certificate** | `spCert` | Generate yourself | Prove identity to IdP | Generate with OpenSSL, then **upload to IdP** |

### Certificate Workflow

1. **Generate SP Keypair** (Stirling-PDF's certificates)
   ```bash
   openssl req -newkey rsa:2048 -nodes \
     -keyout private_key.key \
     -x509 -days 365 \
     -out certificate.crt \
     -subj "/C=US/ST=State/L=City/O=Stirling-PDF/CN=your-domain.com"
   ```

2. **Download IdP Certificate**
   - Go to your IdP admin panel
   - Find SAML app/provider settings
   - Download signing certificate (PEM format)
   - Save as `idp-certificate.pem`

3. **Upload SP Certificate to IdP** ⚠️ **CRITICAL STEP**
   - Open `certificate.crt` (your SP public certificate)
   - Go to your IdP's SAML app configuration
   - Find "Verification Certificate" or "SP Certificate" field
   - Upload or paste `certificate.crt` contents
   - Save IdP configuration

   > Without this step, your IdP cannot verify requests from Stirling-PDF.

4. **Place All Certificates**
   ```
   ./configs/
     ├── idp-certificate.pem    ← Downloaded from IdP
     ├── private_key.key        ← Generated (keep private!)
     └── certificate.crt        ← Generated (also uploaded to IdP)
   ```

### Certificate File Paths

**For Docker deployments**, use absolute paths without prefix:

```yaml
security:
  saml2:
    idpCert: /configs/idp-certificate.pem
    privateKey: /configs/private_key.key
    spCert: /configs/certificate.crt
```

> ⚠️ **Critical**: Use absolute paths (starting with `/`) for Docker. Do not use `file:` or `classpath:` prefixes.

### Docker Volume Mounting

Mount your certificates into the container:

```yaml
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
    volumes:
      - ./configs:/configs
      - ./saml-certs:/saml-certs:ro  # Read-only for security
```

Then reference them:
```yaml
security:
  saml2:
    idpCert: /saml-certs/idp-certificate.pem
    privateKey: /saml-certs/private_key.key
    spCert: /saml-certs/certificate.crt
```

## SAML Attribute Mapping

Stirling-PDF extracts user information from SAML assertions sent by your Identity Provider. Understanding attribute mapping is crucial for proper user identification.

### Username/Identifier Resolution

Stirling-PDF attempts to determine the username in the following priority order:

1. **`username`** attribute
2. **`emailaddress`** attribute (or full URI: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`)
3. **`name`** attribute (or full URI: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`)
4. **`upn`** attribute (User Principal Name - often used in Active Directory)
5. **`uid`** attribute (Unix user ID)
6. **NameID** from SAML Subject (fallback if no attributes provided)

> **Source**: `CustomSaml2ResponseAuthenticationConverter.java:72-84`

### Required Assertions

**Minimum requirement:**
- **NameID** in the SAML Subject (used as fallback identifier)

**Recommended:**
- At least one username attribute from the priority list above

### Attribute Format Support

Stirling-PDF accepts attributes in **both** formats:
- **Full URI format**: `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`
- **Short name format**: `emailaddress`

The application automatically maps both formats, so your IdP can use either.

### Common Identity Provider Mappings

<Tabs groupId="idp-attributes">
  <TabItem value="okta" label="Okta">
    **Default Okta Attributes:**

    | Okta Attribute | SAML Attribute Name | Stirling-PDF Usage |
    |----------------|---------------------|-------------------|
    | Email | `user.email` → `emailaddress` | ✅ Used for username |
    | Login | `user.login` → `username` | ✅ Preferred (highest priority) |
    | Display Name | `user.displayName` → `name` | ✅ Used if email missing |

    **Recommended Okta Configuration:**
    ```
    Name: username
    Name format: Unspecified
    Value: user.login
    ```

    Or use email:
    ```
    Name: emailaddress
    Name format: Unspecified
    Value: user.email
    ```

    **NameID Settings:**
    - Format: EmailAddress
    - Application username: Email
  </TabItem>
  <TabItem value="azure" label="Azure AD (Entra ID)">
    **Default Azure AD Claims:**

    | Azure Claim | SAML Attribute | Stirling-PDF Usage |
    |-------------|---------------|-------------------|
    | User Principal Name | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` | ✅ Used as `name` |
    | Email Address | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` | ✅ Used for username |
    | Display Name | `http://schemas.microsoft.com/identity/claims/displayname` | ❌ Not mapped |

    **Recommended Azure Configuration:**

    Add custom claim:
    ```
    Claim name: username
    Source: Attribute
    Source attribute: user.userprincipalname
    ```

    **NameID Settings:**
    - NameID format: Email address
    - NameID value: user.mail or user.userprincipalname
  </TabItem>
  <TabItem value="google" label="Google Workspace">
    **Google Workspace Attributes:**

    | Google Attribute | SAML Attribute | Stirling-PDF Usage |
    |-----------------|---------------|-------------------|
    | Primary Email | `email` → `emailaddress` | ✅ Used for username |
    | First Name | `first_name` | ❌ Not used |
    | Last Name | `last_name` | ❌ Not used |

    **Recommended Google Configuration:**

    Add attribute mapping:
    ```
    App attribute: username
    Category: Basic Information
    User field: Primary Email
    ```

    **NameID Settings:**
    - NameID format: EMAIL
    - NameID: Basic Information > Primary Email
  </TabItem>
  <TabItem value="generic" label="Generic IdP">
    **Minimum Configuration:**

    Send one of these attributes:
    ```xml
    <saml:Attribute Name="username">
      <saml:AttributeValue>john.doe</saml:AttributeValue>
    </saml:Attribute>
    ```

    Or:
    ```xml
    <saml:Attribute Name="emailaddress">
      <saml:AttributeValue>john.doe@example.com</saml:AttributeValue>
    </saml:Attribute>
    ```

    **NameID (Fallback):**
    ```xml
    <saml:Subject>
      <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">
        john.doe@example.com
      </saml:NameID>
    </saml:Subject>
    ```
  </TabItem>
</Tabs>

### Attribute Debugging

To see what attributes your IdP is sending, enable debug logging:

```yaml
logging:
  level:
    stirling.software.proprietary.security.saml2: DEBUG
```

Or via environment:
```bash
LOGGING_LEVEL_STIRLING_SOFTWARE_PROPRIETARY_SECURITY_SAML2=DEBUG
```

Check logs for:
```
Extracted SAML Attributes: {username=[john.doe], emailaddress=[john.doe@example.com], ...}
```

### Additional Attributes

Currently, Stirling-PDF **only uses attributes for username identification**. Other attributes like:
- First name / Last name
- Display name
- Groups / Roles
- Department
- Phone number

...are **extracted but not used** by the application. User roles are managed internally via Stirling-PDF's admin interface.

### Troubleshooting Attribute Issues

#### "Invalid username" error
**Cause**: No valid username found in assertion.

**Solution**:
1. Enable debug logging to see what attributes are received
2. Ensure IdP sends at least one of: `username`, `emailaddress`, `name`, `upn`, `uid`
3. Verify NameID is present in SAML Subject as fallback
4. Check attribute name format (short name vs full URI)

#### User created with wrong username
**Cause**: Unexpected attribute used for username.

**Solution**:
1. Check attribute priority order (username > emailaddress > name > upn > uid > NameID)
2. Remove unwanted attributes or send preferred attribute
3. Example: If IdP sends both `username` and `emailaddress`, `username` takes precedence

#### Usernames not matching between logins
**Cause**: Inconsistent attribute values from IdP.

**Solution**:
1. Ensure IdP always sends the same attribute
2. Use stable identifier (email, UPN) rather than display name
3. Stirling-PDF links users via `ssoProviderId` (NameID) for consistency

## Reverse Proxy Configuration

SAML requires properly configured reverse proxy headers for callback URLs to work correctly.

### Required Configuration

1. **Set BACKENDURL environment variable** to your public HTTPS URL:
   ```yaml
   SYSTEM_BACKENDURL: https://stirling.example.com
   ```

2. **Configure proxy to forward headers:**

<Tabs groupId="proxy">
  <TabItem value="nginx" label="Nginx">
    ```nginx
    server {
        listen 443 ssl http2;
        server_name stirling.example.com;

        ssl_certificate /path/to/fullchain.pem;
        ssl_certificate_key /path/to/privkey.pem;

        # File upload size for PDFs
        client_max_body_size 100M;

        location / {
            proxy_pass http://stirling-pdf:8080;

            # Required proxy headers for SAML
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-Host $host;
            proxy_set_header X-Forwarded-Port $server_port;

            # Additional settings
            proxy_set_header Connection '';
            proxy_http_version 1.1;
            proxy_buffering off;

            # Timeouts for large files
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }
    }
    ```
  </TabItem>
  <TabItem value="traefik" label="Traefik">
    ```yaml
    # docker-compose.yml
    services:
      traefik:
        image: traefik:v2.10
        command:
          - "--providers.docker=true"
          - "--entrypoints.websecure.address=:443"
          - "--certificatesresolvers.letsencrypt.acme.tlschallenge=true"
        ports:
          - "443:443"
        volumes:
          - /var/run/docker.sock:/var/run/docker.sock:ro
          - ./acme.json:/acme.json

      stirling-pdf:
        image: stirlingtools/stirling-pdf:latest
        environment:
          SYSTEM_BACKENDURL: https://stirling.example.com
        labels:
          - "traefik.enable=true"
          - "traefik.http.routers.stirling.rule=Host(`stirling.example.com`)"
          - "traefik.http.routers.stirling.entrypoints=websecure"
          - "traefik.http.routers.stirling.tls.certresolver=letsencrypt"
          - "traefik.http.services.stirling.loadbalancer.server.port=8080"
          # Large file uploads
          - "traefik.http.middlewares.limit.buffering.maxRequestBodyBytes=104857600"
    ```
  </TabItem>
  <TabItem value="caddy" label="Caddy">
    ```
    stirling.example.com {
        reverse_proxy stirling-pdf:8080 {
            header_up X-Forwarded-Proto {scheme}
            header_up X-Forwarded-Host {host}
            header_up X-Forwarded-Port {port}
        }

        # Automatic HTTPS with Let's Encrypt
        tls your@email.com

        # Large file uploads
        request_body {
            max_size 100MB
        }
    }
    ```
  </TabItem>
</Tabs>

> ⚠️ **Critical**: SAML callback URLs are constructed using `SYSTEM_BACKENDURL` + X-Forwarded headers. If these are misconfigured, SAML login will fail with redirect errors.

### No Built-in ACME Support

Stirling-PDF does not include built-in ACME/Let's Encrypt support. SSL/TLS termination must be handled by your reverse proxy (Nginx, Traefik, Caddy) or load balancer.

## Identity Provider Configuration Examples

### Okta

1. **Create SAML App Integration:**
   - Single sign-on URL: `https://your-domain.com/login/saml2/sso/stirling`
   - Audience URI (SP Entity ID): `https://your-domain.com/saml2/service-provider-metadata/stirling`
   - Name ID format: `EmailAddress`
   - Application username: `Email`

2. **Download Okta Certificate:**
   - Go to "Sign On" tab → "View SAML setup instructions"
   - Download "IDP metadata" or certificate
   - Save as `idp-certificate.pem`

3. **Get Okta URLs:**
   - Identity Provider Single Sign-On URL: `https://{your-okta-domain}/app/{app-id}/sso/saml`
   - Identity Provider Issuer: `http://www.okta.com/{app-id}`

### Azure AD (Entra ID)

1. **Create Enterprise Application:**
   - Azure Portal → Enterprise Applications → New application → Create your own
   - Choose "Integrate any other application you don't find in the gallery (Non-gallery)"

2. **Configure SAML:**
   - Single Sign-On → SAML
   - Identifier (Entity ID): `https://your-domain.com/saml2/service-provider-metadata/stirling`
   - Reply URL (ACS): `https://your-domain.com/login/saml2/sso/stirling`
   - Sign on URL: `https://your-domain.com`

3. **Download Certificate:**
   - Section 3 → Download "Certificate (Base64)"
   - Convert to PEM if needed

4. **Get Azure URLs:**
   - Section 4 → Copy "Login URL" (idpSingleLoginUrl)
   - Copy "Azure AD Identifier" (idpIssuer)
   - Copy "Logout URL" (idpSingleLogoutUrl)

### Google Workspace

1. **Create Custom SAML App:**
   - Admin Console → Apps → Web and mobile apps → Add custom SAML app
   - ACS URL: `https://your-domain.com/login/saml2/sso/stirling`
   - Entity ID: `https://your-domain.com/saml2/service-provider-metadata/stirling`
   - Start URL: `https://your-domain.com`
   - Name ID: Email
   - Name ID format: EMAIL

2. **Download Certificate:**
   - Download IDP metadata or certificate
   - Save as `idp-certificate.pem`

3. **Get Google URLs:**
   - SSO URL: Provided during setup
   - Entity ID: `https://accounts.google.com/o/saml2?idpid={IDP_ID}`

## Complete Configuration Examples

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File (YAML)">
    ```yaml
    security:
      enableLogin: true
      loginMethod: all  # all | normal | oauth2 | saml2

      # Login attempt limits
      loginAttemptCount: 5  # Lock after 5 failed attempts (-1 to disable)
      loginResetTimeMinutes: 120  # Lock duration in minutes

      saml2:
        enabled: true
        provider: okta  # Optional, for logging
        autoCreateUser: true
        blockRegistration: false
        registrationId: stirling

        # IdP Configuration
        idpSingleLoginUrl: https://dev-12345.okta.com/app/dev-12345_stirling_1/exk.../sso/saml
        idpSingleLogoutUrl: https://dev-12345.okta.com/app/dev-12345_stirling_1/exk.../slo/saml
        idpIssuer: http://www.okta.com/exk...
        idpCert: /configs/okta-certificate.pem

        # SP Certificates
        privateKey: /configs/private_key.key
        spCert: /configs/certificate.crt

        # Note: idpMetadataUri can be set but is NOT currently used to auto-populate settings
        # You must manually configure all IdP fields above
        idpMetadataUri: https://dev-12345.okta.com/app/exk.../sso/saml/metadata

    # Optional: Auto-login (Enterprise feature)
    premium:
      proFeatures:
        SSOAutoLogin: true

    # Required for proper SAML callback URLs
    system:
      backendUrl: https://stirling.example.com
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: stirlingtools/stirling-pdf:latest
        container_name: stirling-pdf
        volumes:
          - ./configs:/configs
          - ./saml-certs:/saml-certs:ro
        ports:
          - "8080:8080"
        environment:
          # System Configuration
          SYSTEM_BACKENDURL: https://stirling.example.com

          # Security & Login
          SECURITY_ENABLELOGIN: true
          SECURITY_LOGINMETHOD: all
          SECURITY_LOGINATTEMPTCOUNT: 5
          SECURITY_LOGINRESETTIMEMINUTES: 120

          # SAML 2 Configuration
          SECURITY_SAML2_ENABLED: true
          SECURITY_SAML2_PROVIDER: okta
          SECURITY_SAML2_AUTOCREATEUSER: true
          SECURITY_SAML2_BLOCKREGISTRATION: false
          SECURITY_SAML2_REGISTRATIONID: stirling

          # IdP Settings
          SECURITY_SAML2_IDPSINGLELOGINURL: https://dev-12345.okta.com/app/.../sso/saml
          SECURITY_SAML2_IDPSINGLELOGOUTURL: https://dev-12345.okta.com/app/.../slo/saml
          SECURITY_SAML2_IDPISSUER: http://www.okta.com/exk...
          SECURITY_SAML2_IDPCERT: /saml-certs/okta-certificate.pem

          # SP Certificates
          SECURITY_SAML2_PRIVATEKEY: /saml-certs/private_key.key
          SECURITY_SAML2_SPCERT: /saml-certs/certificate.crt

          # Optional: Auto-login (Enterprise)
          PREMIUM_PROFEATURES_SSOLOGIN: true
        restart: unless-stopped
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    docker run -d \
      --name stirling-pdf \
      -p 8080:8080 \
      -v ./configs:/configs \
      -v ./saml-certs:/saml-certs:ro \
      -e SYSTEM_BACKENDURL=https://stirling.example.com \
      -e SECURITY_ENABLELOGIN=true \
      -e SECURITY_LOGINMETHOD=all \
      -e SECURITY_SAML2_ENABLED=true \
      -e SECURITY_SAML2_AUTOCREATEUSER=true \
      -e SECURITY_SAML2_BLOCKREGISTRATION=false \
      -e SECURITY_SAML2_REGISTRATIONID=stirling \
      -e SECURITY_SAML2_IDPSINGLELOGINURL=https://idp.example.com/sso \
      -e SECURITY_SAML2_IDPSINGLELOGOUTURL=https://idp.example.com/slo \
      -e SECURITY_SAML2_IDPISSUER=https://idp.example.com \
      -e SECURITY_SAML2_IDPCERT=/saml-certs/idp-certificate.pem \
      -e SECURITY_SAML2_PRIVATEKEY=/saml-certs/private_key.key \
      -e SECURITY_SAML2_SPCERT=/saml-certs/certificate.crt \
      stirlingtools/stirling-pdf:latest
    ```
  </TabItem>
  <TabItem value="local" label="Local Development">
    ```bash
    export SYSTEM_BACKENDURL=https://stirling.example.com
    export SECURITY_ENABLELOGIN=true
    export SECURITY_LOGINMETHOD=all
    export SECURITY_SAML2_ENABLED=true
    export SECURITY_SAML2_AUTOCREATEUSER=true
    export SECURITY_SAML2_BLOCKREGISTRATION=false
    export SECURITY_SAML2_REGISTRATIONID=stirling
    export SECURITY_SAML2_IDPSINGLELOGINURL=https://idp.example.com/sso
    export SECURITY_SAML2_IDPSINGLELOGOUTURL=https://idp.example.com/slo
    export SECURITY_SAML2_IDPISSUER=https://idp.example.com
    export SECURITY_SAML2_IDPCERT=file:./configs/idp-certificate.pem
    export SECURITY_SAML2_PRIVATEKEY=file:./configs/private_key.key
    export SECURITY_SAML2_SPCERT=file:./configs/certificate.crt

    # Run application
    ./gradlew bootRun
    ```
  </TabItem>
</Tabs>

## Validation Checklist

After configuring SAML, verify your setup:

### 1. Check Service Provider Metadata

Access your SP metadata URL:
```
https://your-domain.com/saml2/service-provider-metadata/stirling
```

Verify the XML contains:
- ✅ `EntityDescriptor` with correct entityID
- ✅ `AssertionConsumerService` URL matches your ACS configuration
- ✅ `KeyDescriptor` contains your SP certificate
- ✅ No certificate expiration warnings

### 2. Verify IdP Configuration

In your Identity Provider:
- ✅ ACS URL exactly matches: `https://your-domain.com/login/saml2/sso/stirling`
- ✅ Entity ID matches: `https://your-domain.com/saml2/service-provider-metadata/stirling`
- ✅ SP certificate uploaded (if required by IdP)
- ✅ NameID format set to `email` or `unspecified`
- ✅ User attributes mapped (email, name, etc.)

### 3. Test Certificate

Verify IdP certificate format:
```bash
openssl x509 -in idp-certificate.pem -text -noout
```

Should show:
- ✅ Valid certificate structure
- ✅ Not expired
- ✅ Matches certificate provided by IdP

### 4. Test Login Flow

1. Navigate to `https://your-domain.com`
2. Click "Login via Single Sign-On"
3. Should redirect to IdP login page
4. After IdP authentication, should redirect back to Stirling-PDF
5. Check application logs for SAML errors

## Troubleshooting

### Common Issues

#### "SAML requires Enterprise license"
**Cause**: SAML authentication requires Enterprise tier license.
**Solution**:
- Verify valid Enterprise license is configured
- Check `premium.enabled=true` in settings
- Existing users created before license enforcement are grandfathered

#### "Invalid SAML response signature"
**Cause**: IdP certificate mismatch or incorrect format.
**Solution**:
- Verify `idpCert` file matches certificate from IdP
- Ensure certificate is in PEM format (starts with `-----BEGIN CERTIFICATE-----`)
- Re-download certificate from IdP
- Check certificate hasn't expired

#### "ACS URL mismatch"
**Cause**: Redirect URL doesn't match IdP configuration.
**Solution**:
- Verify `SYSTEM_BACKENDURL` is set to public HTTPS URL
- Check reverse proxy sends X-Forwarded-Proto, X-Forwarded-Host, X-Forwarded-Port headers
- Ensure `registrationId` matches in both URL and configuration
- Update ACS URL in IdP to match: `https://your-domain.com/login/saml2/sso/stirling`

#### "File not found: idp-certificate.pem"
**Cause**: Certificate file path is incorrect.
**Solution**:
- Verify file exists at specified path
- For Docker: ensure volume is mounted correctly
- Use absolute paths like `/configs/filename.pem` (no prefix)
- Check file permissions (must be readable by application)

#### "Cannot auto-create user"
**Cause**: User doesn't exist and auto-creation is disabled.
**Solution**:
- Set `autoCreateUser: true` to allow new users
- Or pre-create user accounts as admin
- Check license allows additional users

#### "Redirect loop after SAML login"
**Cause**: Session or cookie issues.
**Solution**:
- Clear browser cookies
- Check `SYSTEM_BACKENDURL` matches actual access URL
- Verify cookies are allowed for domain
- Ensure SameSite cookie settings are compatible

### Debug Logging

Enable SAML debug logging:

```yaml
# In settings.yml or via environment
logging:
  level:
    org.springframework.security.saml2: DEBUG
    org.opensaml: DEBUG
    stirling.software.proprietary.security: DEBUG
```

Or via environment variables:
```bash
LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_SECURITY_SAML2=DEBUG
LOGGING_LEVEL_ORG_OPENSAML=DEBUG
LOGGING_LEVEL_STIRLING_SOFTWARE_PROPRIETARY_SECURITY=DEBUG
```

### Inspect SAML Assertions

Use browser developer tools:
1. Open Network tab
2. Clear network log
3. Attempt SAML login
4. Look for POST to `/login/saml2/sso/stirling`
5. Decode SAMLResponse parameter (Base64 + inflate)
6. Check for errors in XML

Tools:
- [SAML-tracer](https://addons.mozilla.org/en-US/firefox/addon/saml-tracer/) (Firefox/Chrome extension)
- [SAML Decoder](https://www.samltool.com/decode.php) (online tool)

## Security Best Practices

1. **Always use HTTPS** - SAML requires secure transport
2. **Rotate certificates regularly** - Update SP keypair annually
3. **Secure private keys** - Never commit to version control
4. **Use strong key sizes** - Minimum 2048-bit RSA
5. **Validate IdP certificates** - Verify authenticity before trusting
6. **Enable blockRegistration** - Require admin pre-approval for new users
7. **Monitor login attempts** - Configure `loginAttemptCount` (default: 5)
8. **Use dedicated volumes** - Mount certificates read-only in Docker
9. **Review SAML logs** - Monitor for suspicious authentication attempts
10. **Keep Stirling-PDF updated** - Security patches and SAML improvements

## Known Limitations

### idpMetadataUri Not Auto-Populating

The `idpMetadataUri` configuration field exists but is **not currently used** to auto-populate IdP settings. You must manually configure:
- `idpSingleLoginUrl`
- `idpSingleLogoutUrl`
- `idpIssuer`
- `idpCert`

**Workaround**: Manually extract values from IdP metadata XML.

### Hardcoded Localhost SLO URLs

Single Logout (SLO) response URLs have hardcoded `localhost` references in the codebase. This may cause issues with SLO in production environments. Logout functionality redirects to `/logout` but SLO responses may not work as expected.

**Status**: Known issue, workaround is to use standard logout instead of IdP-initiated SLO.

## Auto-Login Feature
> **Tier**: Enterprise

Automatically redirect users to SAML login, bypassing the Stirling-PDF login screen:

```yaml
premium:
  proFeatures:
    SSOAutoLogin: true
```

**Behavior:**
- Users accessing Stirling-PDF are immediately redirected to IdP
- After 5 failed attempts (configurable via `security.loginAttemptCount`), auto-redirect is disabled
- Users can still manually access `/login` for form login if `loginMethod: all`
- Requires IdP to be reachable at the public URL

## User Interface

SAML login button appears on the login screen:

| ![sso-login-dark-mode.png](/img/sso-login-dark-mode.png) | ![sso-saml-login.png](/img/sso-saml-login.png) |
|-----------------------------------------------------------|-------------------------------------------------|

## See Also

- [OAuth SSO Configuration](./OAuth%20SSO%20Configuration.md) - OAuth 2.0 / OIDC setup
- [System and Security](./System%20and%20Security.md) - Additional security settings
- [External Database](./External%20Database.md) - User storage configuration
- [Paid Offerings](../Paid-Offerings.md) - Enterprise tier and licensing information
