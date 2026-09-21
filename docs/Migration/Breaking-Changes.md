---
sidebar_position: 3
id: Breaking-Changes
title: Breaking Changes in V2
description: Important changes that may affect your V2 upgrade
---

# Breaking Changes in V2

Most V1 deployments will upgrade smoothly to V2, but there are some important changes you should know about. This page documents breaking changes and how to handle them.

---

## ⚠️ Impact Summary

| Change | Impact | Action Required |
|--------|--------|-----------------|
| **Template Customization** | High | Rewrite customizations |
| **UI Settings Location** | Medium | `ui.appName` / `ui.homeDescription` not supported |

---

## 🎨 UI Customization Architecture Changed

**Impact:** HIGH for users who customized UI using `customFiles/templates/`

### What Changed

**V1 Architecture:**
```bash
customFiles/
  └── templates/
      ├── fragments/
      │   └── navbar.html       # Custom Thymeleaf template
      └── home.html             # Custom Thymeleaf template
```

V1 used **server-side rendering** with Thymeleaf templates. HTML was generated dynamically on the server for each request.

**V2 Architecture:**
V2 uses a **React frontend** with client-side rendering. The UI is built into **static files** (HTML, CSS, JavaScript) that are served to the browser.

**What this means:**
- ❌ Thymeleaf templates (`.html` with `th:*` attributes) no longer work because there's no server-side rendering
- ✅ Static file overrides **still work** via `customFiles/static/` - same concept, different paths
- The file paths are different because they're now built React files instead of Thymeleaf templates

### Migration Path

Your V1 Thymeleaf templates cannot be directly reused in V2, but you have three options:

#### Option 1: Use Built-In Customization (Recommended)

V2 provides in-app settings for most common customizations:

**Available controls:**
- `ui.appNameNavbar` sets the browser tab title and TOTP issuer label
- `ui.logoStyle` selects the classic or modern logo
- Custom logo assets use [static file overrides](../Configuration/Customisation/Other%20Customisations.md#static-file-overrides)

Administrators can change the available controls in Settings. There is no replacement in-app editor for the removed `ui.appName` or `ui.homeDescription` fields.

**Learn more:** [UI Customisation](../Configuration/Customisation/UI%20Customisation.md)

#### Option 2: Static File Overrides (Same Concept as V1, Different Paths)

**✅ Still supported in V2!** The static file override system works the same way conceptually - place files in `customFiles/static/` to override defaults.

**How it works:**
1. V2 checks `customFiles/static/` **first** for any requested file
2. If not found, falls back to the bundled static files
3. This lets you override logos, CSS, HTML, JavaScript, or any other static asset

**Example Docker compose:**
```yaml
volumes:
  - ./customFiles:/customFiles:rw
```

**Key difference from V1:**
- V1 paths: `customFiles/templates/fragments/navbar.html` (Thymeleaf)
- V2 paths: `customFiles/static/index.html` (React build output)

The file paths are different because V2 serves the **compiled React app** instead of Thymeleaf templates. See [Other Customisations - Static File Overrides](../Configuration/Customisation/Other%20Customisations.md#static-file-overrides) for:
- How to determine the correct file paths in V2
- Examples of common customizations
- Understanding the build output structure

**Use cases:**
- Custom favicon or logo
- Modified `index.html` for advanced branding
- Custom CSS to override styles
- Additional static assets

#### Option 3: Fork the Frontend (Advanced)

For complete UI customization:

**Steps:**
1. Fork Stirling PDF repository
2. Modify React components in `frontend/src/`
3. Build custom frontend
4. Deploy in split mode with custom frontend

**Trade-offs:**
- ✅ Complete control
- ❌ Must maintain your fork
- ❌ Manual merges for updates

### What No Longer Works

These V1 **Thymeleaf template features** no longer work because V2 uses React (client-side) instead of Thymeleaf (server-side):

```html
<!-- V1: Thymeleaf fragment injection (NO LONGER WORKS) -->
<div th:replace="fragments/navbar :: navbar"></div>

<!-- V1: Thymeleaf conditionals (NO LONGER WORKS) -->
<div th:if="${@propertyService.get('ui.showAdvanced')}">
  Custom content
</div>

<!-- V1: Thymeleaf variables (NO LONGER WORKS) -->
<span th:text="${appName}"></span>
```

**Why they don't work:** These are Thymeleaf-specific features that require server-side HTML generation. V2 uses React which compiles to static JavaScript that runs in the browser.

**Alternative:** You can still customize the **output** by overriding the built static files in `customFiles/static/`, but you'll be editing the compiled HTML/CSS/JS instead of Thymeleaf templates.

---

## ⚙️ UI Configuration

`ui.appName` and `ui.homeDescription` are not settings in this release, and there is no in-app editor replacing both fields. Use `ui.appNameNavbar` for the browser tab title and TOTP issuer label:

```yaml
ui:
  appNameNavbar: "My PDF Tool"
  logoStyle: classic
```

The environment equivalent is `UI_APPNAMENAVBAR="My PDF Tool"`. Despite the property name and the admin UI's label, it does not rename the main navbar. Save admin changes and follow the UI's restart prompt for pending server settings. For logos and static assets, see [UI Customisation](../Configuration/Customisation/UI%20Customisation.md).

---

## 🔐 Session Management Improvements

**Impact:** LOW - New session features with simple setting updates

### What Changed

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

Environment equivalents for the key-store controls:

```bash
SECURITY_JWT_ENABLEKEYSTORE=true
SECURITY_JWT_ENABLEKEYCLEANUP=true
```

### After Upgrade

**Expected behavior:** Users will be logged out once after upgrade.

**Why:** Session token format changed with new JWT implementation.

**Action:** Users just need to log in again. Normal behavior.

**Learn more:** [Settings Changes - JWT Configuration](./Settings-Changes#enhanced-jwt-configuration)

---

## 🔕 Database Notifications Remain Supported

Keep `premium.enterpriseFeatures.databaseNotifications` if you use database backup/import notifications:

```yaml
premium:
  enterpriseFeatures:
    databaseNotifications:
      backups:
        successful: false
        failed: false
      imports:
        successful: false
        failed: false
```

Audit logging is a separate feature, not a replacement for these settings. See [Audit Logging](../Configuration/Security/Audit%20Logging.md) for its configuration.

---

## 🔧 Calibre Custom Path Remains Supported

Set `system.customPaths.operations.calibre` if Calibre's `ebook-convert` executable is outside the normal runtime path:

```yaml
system:
  customPaths:
    operations:
      calibre: /path/to/ebook-convert
```

Check the executable path in the environment where Stirling PDF runs. For Docker, that means the container path, not a host-only path.

---

## 📦 Docker Image Changes

**Impact:** LOW - Most users unaffected

### Tag Changes

**V1 Tags:**
```bash
stirlingtools/s-pdf:latest        # OLD NAME
stirlingtools/s-pdf:0.xx.x
```

**V2 Tags:**
```bash
docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest  # NEW NAME
docker.stirlingpdf.com/stirlingtools/stirling-pdf:2.x.x
```

### Migration

Update your docker-compose.yml:

**V1:**
```yaml
services:
  stirling-pdf:
    image: stirlingtools/s-pdf:latest  # OLD
```

**V2:**
```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest  # NEW
```

### Backwards Compatibility

The old `s-pdf` image is deprecated but still receives updates for now. However, you should migrate to the new image name.

---

## 🌐 API Compatibility

**Impact:** LOW - Most endpoints unchanged

### What Stayed the Same

✅ All existing API endpoints work
✅ Request/response formats unchanged
✅ Authentication methods compatible
✅ API keys still valid

### What Changed

**New endpoints added:**
- `/api/v1/security/validate-signature` - PDF signature validation
- `/api/v1/security/remove-cert-sign` - Remove certificate signatures
- `/api/v1/general/booklet-imposition` - Booklet printing layout
- `/api/v1/misc/unlock-pdf-forms` - Unlock form fields
- `/api/v1/misc/replace-invert-pdf` - Color replacement
- `/api/v1/misc/add-attachments` - Add file attachments
- `/api/v1/general/edit-table-of-contents` - Edit table of contents

**Enhanced endpoints:**
- Better error messages
- Consistent error format
- Progress tracking for long operations

### Migration

**No action needed** for existing API integrations. New endpoints are additive.

**If using OpenAPI spec:**
1. Download updated spec from `/v3/api-docs`
2. Regenerate client code if needed

---

## 🗄️ Database Schema

**Impact:** NONE - Automatic migration

### What Changed

Database schema updated to support:
- Enhanced audit logging
- JWT key rotation
- User invitation system
- In-app settings storage

### Migration

**Automatic!** On first V2 startup:
1. V2 detects V1 schema
2. Runs migration scripts
3. Updates to V2 schema
4. All data preserved

**No manual action needed.**

### Rollback Considerations

Do not assume a database already migrated by V2 can be used by V1. For rollback, stop V2 and restore a verified pre-upgrade database backup together with its matching configuration and V1 version. Test restoration before depending on rollback.

**Recommendation:** Take database backup before upgrading.

---

## 📱 Browser Compatibility

**Impact:** LOW - Modern browsers required

### Browser Requirements

Use a current browser with IndexedDB, Web Workers and modern JavaScript/CSS support. Test the tools you use with your organisation's supported browsers.

---

## 🔒 Security Changes

**Impact:** LOW - Generally more secure

### HTTPS Enforcement

The remember-me cookie requires HTTPS. Configure HTTPS for production access.

**Migration:**
If running in production, ensure HTTPS is configured:
```yaml
server:
  ssl:
    enabled: true
    key-store: /path/to/keystore.p12
    key-store-password: ${SSL_PASSWORD}
```

### Session Management

JWT lifetimes are configurable in minutes. The defaults are 1440 minutes for web clients and 43200 minutes for desktop clients. To set the web token lifetime to four hours:

```yaml
security:
  jwt:
    tokenExpiryMinutes: 240
```

This controls JWT token lifetime, not the unrelated servlet session timeout.

---

## 🎯 Feature Flag Changes

**Impact:** LOW - Endpoint customization still works

### What Changed

Tool IDs updated for consistency:

| Old ID (V1) | New ID (V2) | Tool Name |
|-------------|-------------|-----------|
| `pdf-organizer` | `rearrange-pages` | Reorganize Pages |
| `sign-forms` | `sign` | Sign PDF |

### Migration

Update `settings.yml` endpoint customization:

**V1:**
```yaml
endpoints:
  toRemove: ['pdf-organizer']
```

**V2:**
```yaml
endpoints:
  toRemove: ['rearrange-pages']
```

**Complete tool ID list:** [Endpoint Customisation](../Configuration/Customisation/Endpoint%20or%20Feature%20Customisation.md)

---

## 📖 Documentation Structure

**Impact:** NONE - Just informational

### What Changed

Documentation reorganized for clarity:
- "V2 Guides" → "Guides" (current features)
- "Migration" section added (V1→V2 transition)
- Dedicated pages for super tools
- Comprehensive tool reference

### Old Links

Documentation has been reorganized:
- Guides section contains current features (File Storage, Undo/Redo, Desktop vs Web)
- Migration section contains V1→V2 transition information
- Individual pages moved to appropriate sections

---

## ✅ Pre-Upgrade Checklist

Before upgrading to V2, verify:

### 1. Customizations
- [ ] **Using custom templates?** → Plan rewrite or use built-in settings
- [ ] **Custom logo?** → Will work in V2

### 2. Configuration
- [ ] **Backup settings.yml** before modifying
- [ ] **Review UI settings** against `ui.appNameNavbar` and the current controls
- [ ] **Check JWT settings** against `security.jwt.enableKeystore`, `enableKeyCleanup` and the token-lifetime fields
- [ ] **Retain database notification settings** if used

### 3. Infrastructure
- [ ] **Backup database** before upgrade
- [ ] **Test in staging** environment first
- [ ] **Verify HTTPS** configured for production
- [ ] **Check browser versions** for users

### 4. Features
- [ ] **Using database notifications?** → Retain their settings; configure audit logging separately if needed
- [ ] **Custom Calibre path?** → Keep it and check that the executable exists in the runtime environment

### 5. API Integrations
- [ ] **Using deprecated tool IDs?** → Update to new IDs
- [ ] **Update OpenAPI spec** if using generated clients
- [ ] **Test API endpoints** in staging

---

## 🆘 Troubleshooting

### Configuration appears to be ignored

Check property names and nesting against the settings template for the installed version. `premium.proFeatures.googleDrive`, `premium.enterpriseFeatures.databaseNotifications` and `system.customPaths.operations.calibre` remain supported; retain them where used. See [Settings Changes](./Settings-Changes.md).

---

### Custom templates not loading

**Symptom:** Custom navbar/homepage not appearing.

**Solution:** Template system removed. Use static file overrides and the available UI settings instead.

---

### Users logged out after upgrade

**Symptom:** All users need to re-login after V2 upgrade.

**Solution:** Expected behavior due to JWT format change. Users just need to log in once.

---

### API returns 404 for tool

**Symptom:** API call fails with tool not found.

**Solution:** Update tool IDs. Example: `pdf-organizer` → `rearrange-pages`. See [Feature Flag Changes](#feature-flag-changes).

---

### App name not showing

**Symptom:** `ui.appName` in settings.yml not displaying.

**Solution:** Use `ui.appNameNavbar` for the browser tab title. There is no `homeDescription` editor in this release. See [UI Configuration](#ui-configuration).

---

## 🔄 Rollback Guide

If you need to return to V1:

### 1. Stop V2
```bash
docker stop stirling-pdf
```

### 2. Restore the pre-upgrade database

Restore the backup made before V2 first opened the database. For PostgreSQL, use your tested database restore procedure and the correct database/container/user names. For embedded H2, restore the matching pre-upgrade config/database files while Stirling PDF is stopped. Do not reuse the V2 database as a supposedly backward-compatible alternative.

### 3. Restore Settings
```bash
# Restore V1 settings.yml from backup
cp settings.yml.v1.backup configs/settings.yml
```

### 4. Start V1
```bash
# Update docker-compose.yml
image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:1.5.0

docker-compose up -d
```

### Data Preservation

Your data remains intact:
- ✅ User accounts
- ✅ API keys
- ✅ Configurations
- ✅ Custom files

---

## 📚 Related Documentation

- **[Migration Overview](./Overview.md)** - General upgrade guide
- **[New Features](./New-Features.md)** - What's new in V2
- **[Settings Changes](./Settings-Changes.md)** - Configuration updates
- **[FAQ](../FAQ.md)** - Common questions
