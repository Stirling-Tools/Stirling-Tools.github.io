---
sidebar_position: 1
id: Settings-Changes
title: Settings Changes from V1 to V2
description: Configuration changes between V1 and V2
---

# Settings Changes from V1 to V2

This page documents all `settings.yml` changes between V1 and V2.

---

## New Settings in V2

### PDF Signature Validation

**Entire new section added:**

```yaml
security:
  validation: # NEW in V2
    trust:
      serverAsAnchor: true
      useSystemTrust: true
      useMozillaBundle: true
      useAATL: false # Adobe Approved Trust List
      useEUTL: false # EU Trusted List
    allowAIA: false
    aatl:
      url: https://trustlist.adobe.com/tl.pdf
    eutl:
      lotlUrl: https://ec.europa.eu/tools/lotl/eu-lotl.xml
      acceptTransitional: false
    revocation:
      mode: none # Options: none, ocsp, crl, ocsp+crl
      hardFail: false
```

**What it does:** Comprehensive PDF signature validation with configurable trust chains.

**Migration:** No action needed, defaults are safe for most users.

**Learn more:** [Certificate Signing](../Functionality/Security/Certificate-Signing.md) | [Security Configuration](../Configuration/System%20and%20Security.md#signature-validation)

---

### Server Certificate Management

**New section added:**

```yaml
system:
  serverCertificate: # NEW in V2
    enabled: true
    organizationName: Stirling-PDF
    validity: 365 # days
    regenerateOnStartup: false
```

**What it does:** Auto-generates signing certificates for "Sign with Stirling-PDF" feature.

**Migration:** Works automatically with defaults.

**Learn more:** [Certificate Signing](../Functionality/Security/Certificate-Signing.md) | [Certificate Configuration](../Configuration/System%20and%20Security.md#server-certificates)

---

### Split Deployment Support

**New settings added:**

```yaml
system:
  corsAllowedOrigins: [] # NEW in V2
  frontendUrl: '' # NEW in V2
```

**What it does:**
- `corsAllowedOrigins`: Allow frontend from different origin
- `frontendUrl`: Base URL for generating invite links

**Migration:** Leave empty for unified deployment (default).

**Example split deployment:**
```yaml
system:
  corsAllowedOrigins: ['https://pdf.example.com']
  frontendUrl: 'https://pdf.example.com'
```

**Learn more:** [Docker Installation - Split Mode](../Installation/Docker%20Install.md#split-deployment-advanced-users)

---

### Enhanced JWT Configuration

**Changed settings:**

```yaml
# V1 (OLD)
security:
  jwt:
    enabled: false
    keyCleanup: false
    secureCookie: true # REMOVED

# V2 (NEW)
security:
  jwt:
    persistence: true # replaces 'enabled'
    enableKeyRotation: true # NEW
    enableKeyCleanup: true # replaces 'keyCleanup'
    keyRetentionDays: 7
```

**Migration:**
- Replace `jwt.enabled` with `jwt.persistence`
- Replace `jwt.keyCleanup` with `jwt.enableKeyCleanup`
- Add `jwt.enableKeyRotation: true`
- Remove `jwt.secureCookie` (no longer used)

---

### Email Invites

**New setting added:**

```yaml
mail:
  enableInvites: false # NEW in V2
```

**What it does:** Enable email invitations for user registration.

**Requirements:**
- `mail.enabled: true`
- `security.enableLogin: true`

**Migration:** Set to `true` if you want invite functionality.

---

### UI Logo Customization

**New setting added:**

```yaml
ui:
  logoStyle: classic # NEW in V2 - Options: 'classic' or 'modern'
```

**What it does:** Choose between classic S icon or modern minimalist logo.

**Migration:** Leave as `classic` (default) or set to `modern` for new look.

---

## Removed Settings in V2

### UI Settings Moved to In-App Configuration

**V1 settings (REMOVED):**

```yaml
ui:
  appName: '' # REMOVED
  homeDescription: '' # REMOVED
```

**Migration:**
1. Enable login: `SECURITY_ENABLELOGIN=true`
2. Log in as admin
3. Go to Settings in UI
4. Configure app name and description there

**Why:** In-app settings are more user-friendly and apply immediately.

**Learn more:** [UI Customisation](../Configuration/UI%20Customisation.md)

---

### Google Drive Integration

**V1 settings (REMOVED):**

```yaml
premium:
  proFeatures:
    googleDrive: # REMOVED in V2
      enabled: false
      clientId: ''
      apiKey: ''
      appId: ''
```

**Migration:** Remove this section from your `settings.yml`.

**Why:** Feature discontinued in V2.

---

### Database Notifications

**V1 settings (REMOVED):**

```yaml
premium:
  enterpriseFeatures:
    databaseNotifications: # REMOVED in V2
      backups:
        successful: false
        failed: false
      imports:
        successful: false
        failed: false
```

**Migration:** Remove this section from your `settings.yml`.

**Why:** Replaced with more comprehensive audit logging.

---

### Calibre Custom Path

**V1 setting (REMOVED):**

```yaml
system:
  customPaths:
    operations:
      calibre: '' # REMOVED in V2
```

**Migration:** Remove this line.

**Why:** Path detection improved, no longer needs custom configuration.

---

## Migration Checklist

Use this checklist when upgrading your `settings.yml`:

### Required Changes

- [ ] **JWT Settings:**
  - [ ] Replace `jwt.enabled` with `jwt.persistence`
  - [ ] Replace `jwt.keyCleanup` with `jwt.enableKeyCleanup`
  - [ ] Add `jwt.enableKeyRotation: true`
  - [ ] Remove `jwt.secureCookie` line

- [ ] **Remove Deprecated Sections:**
  - [ ] Remove `premium.proFeatures.googleDrive` section
  - [ ] Remove `premium.enterpriseFeatures.databaseNotifications` section
  - [ ] Remove `system.customPaths.operations.calibre` line

- [ ] **UI Settings:**
  - [ ] Remove `ui.appName` (use in-app settings)
  - [ ] Remove `ui.homeDescription` (use in-app settings)

### Optional Additions

- [ ] **Add `ui.logoStyle: classic`** if you want to explicitly set logo
- [ ] **Configure `security.validation`** if you need custom signature validation
- [ ] **Set `system.serverCertificate`** options if needed
- [ ] **Add `system.corsAllowedOrigins`** if using split deployment
- [ ] **Set `system.frontendUrl`** if using split deployment
- [ ] **Enable `mail.enableInvites`** if you want email invitations

---

## Environment Variable Changes

### New Environment Variables in V2

```bash
# Signature validation
SECURITY_VALIDATION_TRUST_SERVERASANCHOR=true
SECURITY_VALIDATION_TRUST_USESYSTEMTRUST=true
SECURITY_VALIDATION_TRUST_USEMOZILLABUNDLE=true
SECURITY_VALIDATION_TRUST_USEAATL=false
SECURITY_VALIDATION_TRUST_USEEUTL=false
SECURITY_VALIDATION_REVOCATION_MODE=none

# Server certificates
SYSTEM_SERVERCERTIFICATE_ENABLED=true
SYSTEM_SERVERCERTIFICATE_ORGANIZATIONNAME="My Company"
SYSTEM_SERVERCERTIFICATE_VALIDITY=365

# Split deployment
SYSTEM_CORSALLOWEDORIGINS=https://pdf.example.com
SYSTEM_FRONTENDURL=https://pdf.example.com

# JWT
SECURITY_JWT_PERSISTENCE=true
SECURITY_JWT_ENABLEKEYROTATION=true
SECURITY_JWT_ENABLEKEYCLEANUP=true

# Email invites
MAIL_ENABLEINVITES=true

# Logo
UI_LOGOSTYLE=modern
```

### Deprecated Environment Variables

```bash
# These no longer work in V2
SECURITY_JWT_ENABLED  # Use SECURITY_JWT_PERSISTENCE
SECURITY_JWT_KEYCLEANUP  # Use SECURITY_JWT_ENABLEKEYCLEANUP
SECURITY_JWT_SECURECOOKIE  # Removed
UI_APPNAME  # Use in-app settings
UI_HOMEDESCRIPTION  # Use in-app settings
```

---

## Configuration Examples

### Minimal V2 Configuration (Works Out of Box)

```yaml
security:
  enableLogin: false

system:
  defaultLocale: en-US

ui:
  appNameNavbar: ''
```

All new V2 features use sensible defaults.

---

### V1 to V2 Configuration Diff

**V1 Configuration:**
```yaml
security:
  jwt:
    enabled: false
    keyCleanup: false
    secureCookie: true

ui:
  appName: 'My PDF Tool'
  homeDescription: 'Welcome!'
  appNameNavbar: 'PDF Tool'

premium:
  proFeatures:
    googleDrive:
      enabled: false
```

**V2 Configuration:**
```yaml
security:
  jwt:
    persistence: true  # Changed
    enableKeyRotation: true  # NEW
    enableKeyCleanup: true  # Changed
    keyRetentionDays: 7
  validation:  # NEW section
    trust:
      serverAsAnchor: true
      useSystemTrust: true

system:
  serverCertificate:  # NEW section
    enabled: true
    organizationName: Stirling-PDF

ui:
  appNameNavbar: 'PDF Tool'
  logoStyle: classic  # NEW
  # appName and homeDescription removed - use in-app settings
```

---

## Troubleshooting

### "Unknown configuration key" warnings

**Symptom:** Warnings about unrecognized settings on startup.

**Cause:** Old V1 settings still in your `settings.yml`.

**Solution:** Remove deprecated settings listed in this guide.

---

### JWT tokens invalid after upgrade

**Symptom:** Users logged out, need to re-login.

**Cause:** JWT key format changed.

**Solution:** Expected behavior, users just need to log in again once.

---

### Custom app name not showing

**Symptom:** App name doesn't appear after setting `ui.appName`.

**Cause:** Setting moved to in-app configuration.

**Solution:**
1. Log in as admin
2. Go to Settings → UI
3. Configure there

---

## Related Documentation

- **[New Features](./New-Features.md)** - What's new in V2
- **[Breaking Changes](./Breaking-Changes.md)** - Important changes
- **[Environment Variables](../Environment-Variables.md)** - All variables
- **[System and Security](../Configuration/System%20and%20Security.md)** - Advanced config

---

## Summary

**Key Takeaways:**
- ✅ Most settings remain the same
- 🔄 JWT settings have new names
- ➕ Many new optional features
- ➖ Google Drive and database notifications removed
- 🎨 UI settings moved to in-app configuration

**Action Required:**
- Update JWT setting names
- Remove deprecated sections
- Optionally configure new features

Your existing configuration will work in V2 with minimal changes!
