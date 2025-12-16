---
sidebar_position: 5
tags: [enterprise, saml, authentik, example]
---

# Authentik SAML Setup Example

Complete walkthrough for configuring SAML 2.0 authentication between Stirling-PDF and Authentik.

> **Prerequisites:** Stirling-PDF with Enterprise license, Authentik instance running

---

## Step 1: Create SAML Provider in Authentik

### Navigate to Provider Creation

Go to: **Applications** → **Providers** → **Create**

Select: **SAML Provider**

### Configure Basic Settings

**Name:** `Stirling-PDF`

**Authorization flow:** `default-provider-authorization-implicit-consent`

**ACS URL:**
```
http://your-domain:8080/login/saml2/sso/stirling
```
For localhost testing: `http://localhost:8080/login/saml2/sso/stirling`

**Issuer:**
```
http://your-domain:8080/saml2/service-provider-metadata/stirling
```
For localhost testing: `http://localhost:8080/saml2/service-provider-metadata/stirling`

**Service Provider Binding:** `Post`

---

## Step 2: Configure Advanced Settings

### Flow Settings

**Authentication flow:**
```
default-authentication-flow
```
Flow used when a user accesses Stirling-PDF and is not authenticated.

**Invalidation flow:**
```
default-provider-invalidation-flow
```
Flow used when logging out of Stirling-PDF.

### Certificate Settings

**Signing Certificate:** (REQUIRED)
```
Select your certificate (e.g., "authentik Self-signed Certificate")
```
Certificate used to sign SAML responses sent to Stirling-PDF.

**Verification Certificate:**
```
Leave empty / default
```
Leave empty to allow unsigned requests from Stirling-PDF. For production, upload Stirling-PDF's public certificate here.

**Encryption Certificate:**
```
Leave empty
```
Leave empty unless you need encrypted SAML assertions.

### Property Mappings

**Selected User Property Mappings:**

Keep all default mappings selected:
- ✅ authentik default SAML Mapping: Email
- ✅ authentik default SAML Mapping: Groups
- ✅ authentik default SAML Mapping: Name
- ✅ authentik default SAML Mapping: UPN
- ✅ authentik default SAML Mapping: User ID
- ✅ authentik default SAML Mapping: Username
- ✅ authentik default SAML Mapping: WindowsAccountname

**NameID Property Mapping:**
```
authentik default SAML Mapping: Email
```
(or Username - this becomes the user identifier in Stirling-PDF)

**Save** the provider.

---

## Step 3: Create Application

### Navigate to Application Creation

Go to: **Applications** → **Applications** → **Create**

### Configure Application

**Name:** `Stirling-PDF`

**Slug:** `stirling-pdf` (auto-generated)

**Provider:** Select the SAML provider you just created

**Launch URL:** (Optional)
```
http://localhost:8080
```

**Save** the application.

---

## Step 4: Configure Access Bindings

### Add User/Group Bindings

In your application settings, go to: **Bindings** tab

Click **Create Binding**

**For testing:** Bind your user account or admin group

**Binding options:**
- **User:** Select your admin user
- **Group:** Select `authentik Admins` or create a group
- **Enabled:** ✅ Checked
- **Order:** `0`

**Save** the binding.

---

## Step 5: Download Authentik Certificate

### Option A: From Certificates Page

1. Go to: **System** → **Certificates**
2. Find your signing certificate (e.g., "authentik Self-signed Certificate")
3. Click **Download** → **Certificate**
4. Save as `authentik-cert.pem`

### Option B: From Provider Settings

1. Go to your SAML Provider settings
2. Note the **Signing Certificate** selected
3. Go to **System** → **Certificates** → Find that certificate → Download

---

## Step 6: Get Authentik URLs

### From Your SAML Provider

Go to: **Applications** → **Providers** → **Your SAML Provider**

Note these URLs (shown after creation):

**Metadata URL:**
```
http://localhost:9000/application/saml/stirling-pdf/metadata/
```

**SSO URL (Post):**
```
http://localhost:9000/application/saml/stirling-pdf/sso/binding/post/
```

**SLO URL (Post):**
```
http://localhost:9000/application/saml/stirling-pdf/slo/binding/post/
```

**Entity ID / Issuer:**

Get this from Authentik after creating the provider. In Authentik's SAML Configuration section, look for **EntityID/Issuer** field. Common values:
- `stirling` (default for Authentik)
- `http://localhost:9000` (some configurations)
- Or a custom value you set

---

## Step 7: Configure Stirling-PDF

### Update settings.yml

Edit `/configs/settings.yml`:

```yaml
security:
  enableLogin: true
  loginMethod: all  # Keep 'all' during testing

  saml2:
    enabled: true
    provider: authentik
    autoCreateUser: true
    blockRegistration: false
    registrationId: stirling

    # From Authentik Provider URLs
    idpMetadataUri: http://localhost:9000/application/saml/stirling-pdf/metadata/
    idpSingleLoginUrl: http://localhost:9000/application/saml/stirling-pdf/sso/binding/post/
    idpSingleLogoutUrl: http://localhost:9000/application/saml/stirling-pdf/slo/binding/post/
    idpIssuer: stirling  # EntityID/Issuer from Authentik (NOT the base URL)

    # Certificate paths (use absolute paths for Docker)
    idpCert: /configs/authentik-cert.pem
    privateKey: /configs/saml-private-key.key
    spCert: /configs/saml-public-cert.crt

premium:
  enabled: true  # Required for SAML
```

---

## Step 8: Certificate Setup

You need **3 certificate files**:

### Certificate Overview

| File | Source | Purpose |
|------|--------|---------|
| `authentik-cert.pem` | **Download from Authentik** | Authentik's signing cert (IdP) - used by Stirling-PDF to verify SAML responses |
| `saml-private-key.key` | **You generate** | Stirling-PDF's private key (SP) - used to sign requests |
| `saml-public-cert.crt` | **You generate** | Stirling-PDF's public cert (SP) - upload to Authentik for verification |

### Step 8.1: Download Authentik Certificate (IdP Cert)

1. Go to: **System** → **Certificates**
2. Find "authentik Self-signed Certificate" (or your chosen signing cert)
3. Click **Download** → **Certificate**
4. Save as `authentik-cert.pem`

### Step 8.2: Generate Stirling-PDF Certificates (SP Keypair)

Generate your own SP certificates:

```bash
openssl req -newkey rsa:2048 -nodes \
  -keyout saml-private-key.key \
  -x509 -days 365 \
  -out saml-public-cert.crt \
  -subj "/C=US/ST=State/L=City/O=Stirling-PDF/CN=localhost"
```

This creates:
- `saml-private-key.key` - Keep private, never share
- `saml-public-cert.crt` - Upload to Authentik (next step)

### Step 8.3: Upload SP Certificate to Authentik

**⚠️ REQUIRED:** Upload your SP public certificate to Authentik:

1. Go to: **Applications** → **Providers** → **Your SAML Provider**
2. Scroll to **Advanced protocol settings**
3. **Verification Certificate** → Click dropdown → **Create New** (or select existing)
4. If creating new:
   - **Name:** `Stirling-PDF SP Certificate`
   - **Certificate Data:** Paste contents of `saml-public-cert.crt`
   - **Save**
5. Select the certificate from **Verification Certificate** dropdown
6. **Update** the provider

This allows Authentik to verify signed requests from Stirling-PDF.

### Step 8.4: Place Certificates in Stirling-PDF

Put all 3 files in your `/configs` directory:

```
./configs/
  ├── settings.yml
  ├── authentik-cert.pem       ✅ Downloaded from Authentik (IdP cert)
  ├── saml-private-key.key     ✅ Generated by you (SP private key)
  └── saml-public-cert.crt     ✅ Generated by you (SP public cert - also uploaded to Authentik)
```

### Step 8.5: Mount in Docker

Ensure your docker-compose.yml has:

```yaml
volumes:
  - ./configs:/configs:ro
```

> ⚠️ **Critical**: Certificate paths in `settings.yml` MUST use absolute paths like `/configs/filename.pem` (no `file:` or `classpath:` prefix)

---

## Step 9: Start Stirling-PDF

Restart Stirling-PDF to load the new SAML configuration:

```bash
docker compose restart
```

Check logs for SAML initialization:
```bash
docker compose logs -f stirling-pdf
```

---

## Step 10: Test SAML Login

### Access Stirling-PDF

Go to: `http://localhost:8080`

### Login Options

You should see:
- **Username/Password** login form (if `loginMethod: all`)
- **Sign in with authentik** button (SAML SSO)

### Test SSO Login

1. Click **Sign in with authentik**
2. You'll be redirected to Authentik login
3. Enter your Authentik credentials
4. You'll be redirected back to Stirling-PDF
5. New user account created automatically (if `autoCreateUser: true`)

---

## Step 11: Promote SSO User to Admin

### Login as Initial Admin

Use the username/password login with your `initialLogin` credentials from settings.yml

### Promote SSO User

1. Go to **Settings** → **User Management**
2. Find the SAML user (created during SSO test)
3. Change **Role** to **Admin**
4. **Save**

---

## Step 12: (Optional) Switch to SSO-Only

Once you have an SSO user with admin privileges:

```yaml
security:
  loginMethod: saml2  # Disables username/password login
```

Restart Stirling-PDF.

---

## Troubleshooting

### "SAML Response validation failed"

**Check:**
- `idpCert` path is correct and file exists
- Certificate is in PEM format
- `idpIssuer` matches Authentik's Entity ID

### "User not authorized"

**Check:**
- User/Group bindings configured in Authentik application
- User is member of bound group
- Binding is **Enabled**

### "Certificate not found"

**Check:**
- Certificate files are in `/configs` directory
- Docker volume is mounted correctly
- File permissions allow reading (`:ro` mount)

### Can't find "Sign in with authentik" button

**Check:**
- `security.saml2.enabled: true`
- `premium.enabled: true`
- `security.loginMethod: all` or `saml2`
- Restart Stirling-PDF after config changes

### Authentik shows "Invalid ACS URL"

**Check:**
- ACS URL in Authentik matches: `http://your-domain/login/saml2/sso/stirling`
- `registrationId` in settings.yml matches URL (`stirling`)
- Service Provider Binding is set to `Post`

---

## Security Notes

### Production Recommendations

- Use **HTTPS** for both Stirling-PDF and Authentik
- Generate your own SP keypair (don't use Authentik-generated)
- Enable **Verification Certificate** in Authentik (upload SP public cert)
- Set `loginMethod: saml2` after testing (disable username/password)
- Use proper certificate management (not self-signed)
- Set `blockRegistration: true` to require admin approval for new SSO users

### Certificate Management

- Rotate certificates before expiration
- Keep private keys secure and never commit to git
- Use read-only mounts (`:ro`) for certificate directories
- Monitor certificate expiration dates

---

## Related Documentation

- [SAML SSO Configuration](./SAML%20SSO%20Configuration.md) - General SAML setup guide
- [OAuth SSO Configuration](./OAuth%20SSO%20Configuration.md) - OAuth 2.0 alternative
- [System and Security](./System%20and%20Security.md) - Security settings
