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

**Learn more:** [Certificate Signing](../Functionality/Security/Certificate-Signing) | [Security Configuration](../Configuration/Security/System%20and%20Security.md#signature-validation)

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

**What it does:** Generates the certificate used by server signing when the feature is enabled and a Team or Enterprise licence is active. The default enabled flag alone does not grant access.

**Learn more:** [Certificate Signing](../Functionality/Security/Certificate-Signing) | [Certificate Configuration](../Configuration/Security/System%20and%20Security.md#server-certificates)

---

### Enhanced JWT Configuration

Configure JWT authentication with these settings:

```yaml
security:
  jwt:
    enableKeystore: true
    enableKeyCleanup: true
    tokenExpiryMinutes: 1440
    desktopTokenExpiryMinutes: 43200
```

`enableKeystore` controls persistent key storage. `enableKeyCleanup` enables cleanup of old keys. Key retention is calculated automatically from token lifetimes and refresh settings.

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

## UI Settings and Retained Configuration

### UI Configuration

The old `ui.appName` and `ui.homeDescription` fields are not supported. They have not moved to a replacement name-and-description editor. Use `ui.appNameNavbar` for the browser tab title and TOTP issuer label, and `ui.logoStyle` for the logo variant. Save changes and apply any restart requested by the admin UI.

**Learn more:** [UI Customisation](../Configuration/Customisation/UI%20Customisation.md)

---

### Google Drive Integration

For Google Drive integration, retain `premium.proFeatures.googleDrive` when using it:

```yaml
premium:
  proFeatures:
    googleDrive:
      enabled: false
      clientId: ""
      apiKey: ""
      appId: ""
```

See [Google Drive File Picker](../Configuration/Storage/Google%20Drive%20File%20Picker.md) for setup and licensing.

---

### Database Notifications

Keep `premium.enterpriseFeatures.databaseNotifications` if you use backup/import notifications. Its `backups` and `imports` sections still accept `successful` and `failed` flags. Audit logging does not replace this configuration.

---

### Calibre Custom Path

Keep `system.customPaths.operations.calibre` if you need a custom path to `ebook-convert`. The override is still read by the runtime configuration.

---

## Migration Checklist

Use this checklist when upgrading your `settings.yml`:

### Required Changes

- [ ] **JWT:** Use `security.jwt.enableKeystore` and `security.jwt.enableKeyCleanup`; review token lifetimes in minutes. Do not add `persistence`, `enableKeyRotation` or a writable `keyRetentionDays` setting.
- [ ] **Retained settings:** Preserve Google Drive, database notifications and custom Calibre paths where used.
- [ ] **UI:** Replace old naming assumptions with the current `ui.appNameNavbar` behaviour. There is no replacement homepage-description editor.

### Optional Additions

- [ ] **Add `ui.logoStyle: classic`** if you want to explicitly set logo
- [ ] **Configure `security.validation`** if you need custom signature validation
- [ ] **Set `system.serverCertificate`** options if needed
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

# JWT
SECURITY_JWT_ENABLEKEYSTORE=true
SECURITY_JWT_ENABLEKEYCLEANUP=true

# Email configuration
MAIL_FROM=noreply@example.com
MAIL_ENABLEINVITES=true

# Logo
UI_LOGOSTYLE=modern
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
    enableKeystore: true
    enableKeyCleanup: true
    tokenExpiryMinutes: 1440
    desktopTokenExpiryMinutes: 43200
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
  # appName and homeDescription are not supported
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

**Cause:** `ui.appName` is not a supported setting.

**Solution:** Set `ui.appNameNavbar` for the browser tab title. Use the current logo controls or static-file overrides for branding; there is no in-app homepage-description editor.

---

## Related Documentation

- **[New Features](./New-Features.md)** - What's new in V2
- **[Breaking Changes](./Breaking-Changes.md)** - Important changes
- **[Configuration Options](../Configuration/Customisation/Extra-Settings.md)** - All configuration variables
- **[System and Security](../Configuration/Security/System%20and%20Security.md)** - Advanced config
