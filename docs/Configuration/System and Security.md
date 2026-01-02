---
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Login, System and Security

Stirling PDF allows customization of system and security settings. For security features to be enabled, you must use the security jar. For Docker users, this means setting `DISABLE_ADDITIONAL_FEATURES` to `false` via an environment variable.

## Basic Security Settings

- `enableLogin`: Enables or disables the login functionality (default: `true` as of V2.0+)
- `csrfDisabled`: Set to 'true' to disable CSRF protection (not recommended for production)
- `defaultLocale`: Set the default language (e.g. 'de-DE', 'fr-FR', etc)
- `googlevisibility`: 'true' to allow Google visibility (via robots.txt), 'false' to disallow

## Authentication Setup

**Note:** Authentication is **enabled by default**. If you want to run Stirling-PDF without authentication, see the [Disabling Login](#disabling-login) section below.

### Prerequisites
1. Ensure the `/configs` directory is mounted as a volume in Docker for persistence across updates
2. For Docker users: Set `DISABLE_ADDITIONAL_FEATURES=false` in environment variables

### Initial Login Credentials
- Default Username: `admin`
- Default Password: `stirling`
- Note: Users will be forced to change their password on first login
- Custom initial credentials can be set using:
  - `SECURITY_INITIALLOGIN_USERNAME`
  - `SECURITY_INITIALLOGIN_PASSWORD`

### Database Location
Upon successful setup, a new `stirling-pdf-DB-2.3.232.mv.db` file will be created in your configured storage location. This file contains user data and should be backed up regularly.

### Account Management
1. Access Account Settings:
   - Click the settings cog menu in the top right navbar
   - Select "Account Settings"
   - Here you can manage your profile and find your API key

2. Adding New Users:
   - Navigate to Account Settings
   - Scroll to bottom and click 'Admin Settings'
   - Use the user management interface to add new users

### Role-Based Access Control
Currently, roles are primarily used for rate limiting purposes. The role system is under active development and will be expanded with additional features in future updates.

### API Authentication
When using the API:
- Each user has a unique API key found in their Account Settings
- Include the API key in requests using the `X-API-KEY` header
- Example:
  ```
  X-API-KEY: your-api-key-here
  ```

## Disabling Login

If you want to run Stirling-PDF without authentication (open access mode), you can disable the login functionality.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_ENABLELOGIN=false
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    docker run -d \
      -p 8080:8080 \
      -e SECURITY_ENABLELOGIN=false \
      stirlingtools/stirling-pdf:latest
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: stirlingtools/stirling-pdf:latest
        environment:
          SECURITY_ENABLELOGIN: false
    ```
  </TabItem>
  <TabItem value="jar-property" label="JAR (Java Property)">
    ```bash
    java -jar Stirling-PDF.jar -DSECURITY_ENABLELOGIN=false
    ```
  </TabItem>
  <TabItem value="jar-env" label="JAR (Environment Variable)">
    ```bash
    export SECURITY_ENABLELOGIN=false
    java -jar Stirling-PDF.jar
    ```
  </TabItem>
</Tabs>

### When to Disable Login

**Consider disabling login if:**
- Running Stirling-PDF locally for personal use only
- Using it in a completely trusted network environment
- You don't need user management or access control

**Keep login enabled if:**
- Running on a server accessible from the internet
- Multiple users need access with different permissions
- You need audit trails or usage tracking
- Running in a shared or business environment

---

## Split Deployment Configuration

Stirling-PDF supports separating frontend and backend for better scalability and deployment flexibility.

### Deployment Modes

Configure deployment mode via the `MODE` environment variable:

| Mode | Description | Use Case |
|------|-------------|----------|
| `BOTH` | Frontend + Backend (default) | Single container deployment |
| `BACKEND` | Backend only | API service, split deployment |
| `FRONTEND` | Frontend only | Static frontend serving |

### Frontend URL Configuration

When using split deployment or load balancers, configure the frontend URL for generating links:

```yaml
system:
  frontendUrl: 'https://pdf.example.com'
```

**Environment Variable:**
```bash
SYSTEM_FRONTENDURL=https://pdf.example.com
```

**Use Cases:**
- Email invite links point to correct frontend
- Download links reference proper URL
- API responses include frontend URLs

### CORS Configuration

When frontend and backend are on different domains, enable CORS:

```yaml
system:
  corsAllowedOrigins:
    - 'https://pdf.example.com'
    - 'https://pdf-staging.example.com'
```

**Environment Variable:**
```bash
SYSTEM_CORSALLOWEDORIGINS=https://pdf.example.com,https://pdf-staging.example.com
```

**Security Best Practices:**
- Only specify trusted origins
- Never use wildcard (`*`) in production
- Always use HTTPS in production
- Keep list minimal

**Learn more:** [Security - CORS Configuration](../Functionality/Security#cors-configuration)

---

## Server Certificates

Stirling-PDF can auto-generate certificates for the "Sign with Stirling-PDF" feature.

### Configuration

```yaml
system:
  serverCertificate:
    enabled: true                    # Enable auto-generation
    organizationName: Stirling-PDF   # Certificate organization name
    validity: 365                    # Days until expiration
    regenerateOnStartup: false       # Keep same cert across restarts
```

**Environment Variables:**
```bash
SYSTEM_SERVERCERTIFICATE_ENABLED=true
SYSTEM_SERVERCERTIFICATE_ORGANIZATIONNAME="My Company"
SYSTEM_SERVERCERTIFICATE_VALIDITY=365
SYSTEM_SERVERCERTIFICATE_REGENERATEONSTARTUP=false
```

### How It Works

1. **First Startup:** Server generates self-signed certificate, stored in `/configs` directory
2. **Subsequent Startups:** Reuses existing certificate (unless `regenerateOnStartup: true`)
3. **User Signs:** PDFs signed using this certificate via "Sign with Stirling-PDF" option

### Custom Certificates

To use your own certificate instead:

1. Place certificate in `/configs/keystore.p12`
2. Set `serverCertificate.enabled: false`
3. Provide password via `KEYSTORE_PASSWORD` environment variable

**Learn more:** [Certificate Signing Guide](../Functionality/Security/Certificate-Signing.md)

---

## Signature Validation

Configure how PDF certificate signatures are validated.

### Trust Sources

```yaml
security:
  validation:
    trust:
      serverAsAnchor: true      # Trust server-generated certificates
      useSystemTrust: true       # Use OS certificate store
      useMozillaBundle: true     # Mozilla CA bundle
      useAATL: false             # Adobe Approved Trust List
      useEUTL: false             # EU Trusted List (eIDAS)
```

**Environment Variables:**
```bash
SECURITY_VALIDATION_TRUST_SERVERASANCHOR=true
SECURITY_VALIDATION_TRUST_USESYSTEMTRUST=true
SECURITY_VALIDATION_TRUST_USEMOZILLABUNDLE=true
SECURITY_VALIDATION_TRUST_USEAATL=false
SECURITY_VALIDATION_TRUST_USEEUTL=false
```

### Trust List URLs

Configure external trust list locations:

```yaml
security:
  validation:
    aatl:
      url: https://trustlist.adobe.com/tl.pdf
    eutl:
      lotlUrl: https://ec.europa.eu/tools/lotl/eu-lotl.xml
      acceptTransitional: false
```

### Revocation Checking

Verify certificates haven't been revoked:

```yaml
security:
  validation:
    revocation:
      mode: none          # Options: none, ocsp, crl, ocsp+crl
      hardFail: false     # Fail validation if revocation check fails
```

**Revocation Modes:**
- `none`: No revocation checking (not recommended for production)
- `ocsp`: Online Certificate Status Protocol (fast, requires network)
- `crl`: Certificate Revocation Lists (slower, works offline)
- `ocsp+crl`: Try OCSP first, fall back to CRL (recommended)

**Environment Variables:**
```bash
SECURITY_VALIDATION_REVOCATION_MODE=ocsp+crl
SECURITY_VALIDATION_REVOCATION_HARDFAIL=false
```

### Authority Information Access (AIA)

Allow automatic fetching of intermediate certificates:

```yaml
security:
  validation:
    allowAIA: false  # Set true to enable (requires network access)
```

**⚠️ Security Note:** Disabled by default. Only enable in controlled environments where outbound HTTPS is secure.

**Learn more:** [Certificate Signing - Validation](../Functionality/Security/Certificate-Signing#validating-signatures)

---

## JWT Authentication

Configure JSON Web Token authentication for sessions.

### JWT Settings

```yaml
security:
  jwt:
    persistence: true           # Store keys across restarts
    enableKeyRotation: true     # Rotate signing keys periodically
    enableKeyCleanup: true      # Auto-delete old keys
    keyRetentionDays: 7         # How long to keep old keys
```

**Environment Variables:**
```bash
SECURITY_JWT_PERSISTENCE=true
SECURITY_JWT_ENABLEKEYROTATION=true
SECURITY_JWT_ENABLEKEYCLEANUP=true
SECURITY_JWT_KEYRETENTIONDAYS=7
```

### What These Settings Do

- **`persistence`**: Store JWT signing keys in database, survive container restarts
- **`enableKeyRotation`**: Periodically generate new signing keys for security
- **`enableKeyCleanup`**: Automatically delete old keys after retention period
- **`keyRetentionDays`**: Grace period where old keys still work (prevents immediate logout)

### Migration from V1

If migrating from V1, note these setting name changes:
- `jwt.enabled` → `jwt.persistence`
- `jwt.keyCleanup` → `jwt.enableKeyCleanup`
- `jwt.secureCookie` → Removed (always secure in production)

**Learn more:** [Migration - JWT Changes](../Migration/Settings-Changes#enhanced-jwt-configuration)

---

## Email Configuration

Configure SMTP for sending email invitations and notifications. Enable `mail.enableInvites` to allow invitation links.

> 💡 **When is email configuration required?**
>
> Email configuration is **OPTIONAL** and only needed for:
> - **Email invitations**: Admins can send invite links to users via email
> - **Password reset emails**: Users can reset forgotten passwords (if implemented)
>
> Email is **NOT required** for:
> - Basic username/password login
> - SSO authentication (OAuth 2.0 or SAML 2.0)
> - Manual user creation by admins
> - Normal application operation
>
> You can run Stirling-PDF without any email configuration if you create users manually or use SSO.

### Email Invites

Enable email-based user invitations:

```yaml
mail:
  enabled: true
  from: noreply@example.com
  enableInvites: true
  smtp:
    host: smtp.example.com
    port: 587
    username: noreply@example.com
    password: ${MAIL_PASSWORD}
    tls:
      enabled: true
```

**Environment Variables:**
```bash
MAIL_ENABLED=true
MAIL_FROM=noreply@example.com
MAIL_ENABLEINVITES=true
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_TLS_ENABLED=true
```

**Requirements:**
- `mail.enabled: true`
- `mail.enableInvites: true` for invitation flows
- `security.enableLogin: true`
- Valid SMTP configuration
- `system.frontendUrl` configured (for invite links)

---

## UI Customization

### Logo Style

Choose between logo styles:

```yaml
ui:
  logoStyle: classic  # Options: 'classic' or 'modern'
```

**Environment Variable:**
```bash
UI_LOGOSTYLE=modern
```

**Styles:**
- `classic`: Traditional "S" icon logo
- `modern`: Minimalist design

### Custom Logo

You can also provide a custom logo file:

```bash
customFiles/
  └── static/
      └── logo.svg  # Your custom logo
```

**Learn more:** [UI Customisation](./UI%20Customisation.md)

---

# Configuration Examples

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true  # Login enabled by default; set to 'false' to disable
      csrfDisabled: true
      jwt:
        persistence: true
        enableKeyRotation: true
        enableKeyCleanup: true
        keyRetentionDays: 7
      validation:
        trust:
          serverAsAnchor: true
          useSystemTrust: true
          useMozillaBundle: true
        revocation:
          mode: ocsp
          hardFail: false

    system:
      defaultLocale: 'en-US' # Set the default language (e.g. 'de-DE', 'fr-FR', etc)
      googlevisibility: false # 'true' to allow Google visibility (via robots.txt), 'false' to disallow
      corsAllowedOrigins: []  # Add frontend URLs for split deployment
      frontendUrl: ''         # Set for split deployment
      serverCertificate:
        enabled: true
        organizationName: Stirling-PDF
        validity: 365

    mail:
      enabled: false
      enableInvites: false

    ui:
      logoStyle: classic
    ```
  </TabItem>
  <TabItem value="local" label="Local Configuration">
    You can configure these settings in two ways when running locally:

    **Option 1: Using Java Properties**
    ```bash
    java -jar Stirling-PDF.jar -DDISABLE_ADDITIONAL_FEATURES=false -DSECURITY_ENABLELOGIN=true
    ```

    **Option 2: Using Environment Variables**
    ```bash
    export DISABLE_ADDITIONAL_FEATURES=false
    export SECURITY_ENABLELOGIN=true
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e DISABLE_ADDITIONAL_FEATURES=false \
    -e SECURITY_ENABLELOGIN=true \
    -e SYSTEM_CORSALLOWEDORIGINS=https://pdf.example.com \
    -e SYSTEM_FRONTENDURL=https://pdf.example.com \
    -e SECURITY_JWT_PERSISTENCE=true \
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      DISABLE_ADDITIONAL_FEATURES: false
      SECURITY_ENABLELOGIN: true
      SYSTEM_CORSALLOWEDORIGINS: https://pdf.example.com
      SYSTEM_FRONTENDURL: https://pdf.example.com
      SECURITY_JWT_PERSISTENCE: true
      SYSTEM_SERVERCERTIFICATE_ENABLED: true
    ```
  </TabItem>
  <TabItem value="split-deployment" label="Split Deployment">
    **Backend Container:**
    ```yaml
    environment:
      MODE: BACKEND
      DISABLE_ADDITIONAL_FEATURES: false
      SECURITY_ENABLELOGIN: true
      SYSTEM_CORSALLOWEDORIGINS: https://pdf.example.com
      SYSTEM_FRONTENDURL: https://pdf.example.com
    ```

    **Frontend Container:**
    ```yaml
    environment:
      MODE: FRONTEND
      VITE_API_BASE_URL: http://backend:8080
    ```
  </TabItem>
</Tabs>

---

## Related Documentation

- **[Security Features](../Functionality/Security/Security.md)** - PDF security tools, CORS, signature validation
- **[Certificate Signing](../Functionality/Security/Certificate-Signing.md)** - Comprehensive signing and validation guide
- **[Single Sign-On](./Single%20Sign-On%20Configuration.md)** - Enterprise authentication
- **[UI Customisation](./UI%20Customisation.md)** - Branding and appearance
- **[Migration Guide](../Migration/Settings-Changes.md)** - Upgrading from V1
