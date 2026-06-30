---
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Login, System and Security

Stirling PDF allows customization of system and security settings. For security features to be enabled, you must use the security jar. For Docker users, this means setting `DISABLE_ADDITIONAL_FEATURES` to `false` via an environment variable.

## Basic Security Settings

- `enableLogin`: Enables or disables the login functionality (only available in Stirling-PDF-with-login.jar or when `DISABLE_ADDITIONAL_FEATURES=false`)
- `defaultLocale`: Set the default language (e.g. 'de-DE', 'fr-FR', etc)
- `googlevisibility`: 'true' to allow Google visibility (via robots.txt), 'false' to disallow
- `xFrameOptions`: Controls whether your instance can be embedded in an iframe. Set to `DENY` to prevent clickjacking. Use `SAMEORIGIN` only if you embed the UI in your own application.
- `loginAttemptCount`: Number of failed login attempts before an account is locked (e.g. `5`)
- `loginResetTimeMinutes`: Minutes before a locked account is automatically unlocked (e.g. `10`)

## Authentication Setup

**Important:** Authentication and additional features are included by default in:
- **Docker**: All images except ultra-lite (authentication is **enabled by default**)
- **JAR files**: Use [Stirling-PDF-with-login.jar](https://files.stirlingpdf.com/Stirling-PDF-with-login.jar) **(Recommended)**

**Not included in:**
- **Docker ultra-lite**: Minimal build without authentication (set `DISABLE_ADDITIONAL_FEATURES=false` to enable)
- **Plain JAR**: [Stirling-PDF.jar](https://files.stirlingpdf.com/Stirling-PDF.jar) - Basic build without authentication or additional features

### Prerequisites
1. Ensure the `/configs` directory is mounted as a volume in Docker for persistence across updates
2. Use the appropriate build:
   - **JAR**: Download Stirling-PDF-with-login.jar
   - **Docker**: Set `DISABLE_ADDITIONAL_FEATURES=false` in environment variables

### Initial Login Credentials
- Default Username: `admin`
- Default Password: `stirling`
- Note: Users will be forced to change their password on first login
- Custom initial credentials can be set using:
  - `SECURITY_INITIALLOGIN_USERNAME`
  - `SECURITY_INITIALLOGIN_PASSWORD`

### Database Location
Upon successful setup, a new `stirling-pdf-DB-<version>.mv.db` file (the version number is part of the filename, e.g. `stirling-pdf-DB-2.3.232.mv.db`) will be created in your configured storage location. This file contains user data and should be backed up regularly.

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

## Running Without Authentication

If you need to run without authentication (note: this also disables additional features), you have two options:

### Option 1: Disable Login in With-Login Version (Recommended)

Disable authentication while keeping additional features:

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
      -e DISABLE_ADDITIONAL_FEATURES=false \
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
          DISABLE_ADDITIONAL_FEATURES: false
    ```
  </TabItem>
  <TabItem value="jar-property" label="JAR (Java Property)">
    ```bash
    java -jar Stirling-PDF-with-login.jar -DSECURITY_ENABLELOGIN=false
    ```
  </TabItem>
  <TabItem value="jar-env" label="JAR (Environment Variable)">
    ```bash
    export SECURITY_ENABLELOGIN=false
    java -jar Stirling-PDF-with-login.jar
    ```
  </TabItem>
</Tabs>

### Option 2: Use Open Source JAR

Use [Stirling-PDF.jar](https://files.stirlingpdf.com/Stirling-PDF.jar) which has no authentication (note: also excludes additional features):

```bash
java -jar Stirling-PDF.jar
```

### Recommendation

**We recommend Stirling-PDF-with-login.jar for all deployments** because it includes additional features beyond just authentication. You can always disable authentication if needed while keeping the extra functionality.

---

## Login Agreement / Disclaimer

Show a disclaimer that users must accept before they can use the app. It appears as a blocking dialog after a successful login (or on launch when login is disabled), and works on every edition.

```yaml
legal:
  loginAgreement:
    enabled: false              # Master on/off switch
    showInAnonymousMode: true   # When login is disabled, set false to hide the dialog
    fallbackText: ""            # Markdown shown when no per-language file is found
```

**Environment Variables:**
```bash
LEGAL_LOGINAGREEMENT_ENABLED=true
LEGAL_LOGINAGREEMENT_SHOWINANONYMOUSMODE=true
LEGAL_LOGINAGREEMENT_FALLBACKTEXT="By signing in you agree to the terms..."
```

The disclaimer is written in **Markdown**. Provide per-language versions as files at `customFiles/disclaimer/<locale>.md` (for example `en-US.md` or `de-DE.md`); the text shown follows each user's interface language and falls back to `fallbackText` when no matching file exists. For a single-language or headless install, set `fallbackText` (env `LEGAL_LOGINAGREEMENT_FALLBACKTEXT`) and skip the per-language files. Editing the text takes effect on the next login with no restart; turning `enabled` on or off requires a restart.

Admins can also edit the text in-app from **Admin Settings → Legal**, which writes the same per-language files.

In the desktop app, the dialog can be enabled per machine through MDM - see [Managed Desktop Deployment](../Installation/Managed%20Deployment.md).

---

## Server Certificates

Stirling PDF can auto-generate certificates for the "Sign with Stirling PDF" feature.

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

1. **First Startup:** Server generates a self-signed certificate, stored as `/configs/server-certificate.p12`
2. **Subsequent Startups:** Reuses existing certificate (unless `regenerateOnStartup: true`)
3. **User Signs:** PDFs signed using this certificate via "Sign with Stirling-PDF" option

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

Logins use JSON Web Tokens. The main thing to configure is how long a session lasts before a user has to sign in again.

```yaml
security:
  jwt:
    tokenExpiryMinutes: 1440          # Web login lifetime (default 24 hours)
    desktopTokenExpiryMinutes: 43200  # Desktop login lifetime (default 30 days)
```

Environment variables: `SECURITY_JWT_TOKENEXPIRYMINUTES` and `SECURITY_JWT_DESKTOPTOKENEXPIRYMINUTES`.

Lower these for tighter security (users sign in more often) or raise them for convenience.

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
> You can run Stirling PDF without any email configuration if you create users manually or use SSO.

### Email Invites

Enable email-based user invitations:

```yaml
mail:
  enabled: true
  enableInvites: true
  host: smtp.example.com
  port: 587
  username: noreply@example.com
  password: ${MAIL_PASSWORD}
  from: noreply@example.com
  startTlsEnable: true
```

**Environment Variables:**
```bash
MAIL_ENABLED=true
MAIL_ENABLEINVITES=true
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=noreply@example.com
MAIL_STARTTLSENABLE=true
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

You can also override the bundled logo by dropping your own files into the matching style subdirectory:

```bash
customFiles/
  └── static/
      ├── classic-logo/
      │   └── logo.svg  # Overrides the classic logo
      └── modern-logo/
          └── logo.svg  # Overrides the modern logo
```

**Learn more:** [UI Customisation](./UI%20Customisation.md)

---

# Configuration Examples

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true  # Only works with Stirling-PDF-with-login.jar or DISABLE_ADDITIONAL_FEATURES=false
      jwt:
        tokenExpiryMinutes: 1440
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
    -e SECURITY_JWT_ENABLEKEYSTORE=true \
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      DISABLE_ADDITIONAL_FEATURES: false
      SECURITY_ENABLELOGIN: true
      SECURITY_JWT_ENABLEKEYSTORE: true
      SYSTEM_SERVERCERTIFICATE_ENABLED: true
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
