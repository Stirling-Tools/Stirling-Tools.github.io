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
| **UI Settings Location** | Medium | Use in-app settings |
| **Session Management** | Low | Update setting names |
| **Database Notifications** | Low | Use audit logs instead |

---

## 🎨 Template Customization System Removed

**Impact:** HIGH for users who customized UI using `customFiles/templates/`

### What Changed

**V1 Approach:**
```bash
customFiles/
  └── templates/
      ├── fragments/
      │   └── navbar.html       # Custom navbar
      └── home.html             # Custom homepage
```

V1 used server-side template injection with Thymeleaf templates.

**V2 Approach:**
V2 uses React frontend - server-side template injection no longer possible.

### Migration Path

If you customized templates in V1, you have two options:

#### Option 1: Use Built-In Customization (Recommended)

V2 provides in-app settings for most common customizations:

**Available Customizations:**
- App name and description
- Navbar branding
- Logo style (classic/modern)
- Custom logo upload
- Homepage description

**How to use:**
1. Enable login: `SECURITY_ENABLELOGIN=true`
2. Log in as admin
3. Go to Settings → UI
4. Configure branding there

**Learn more:** [UI Customisation](../Configuration/UI%20Customisation.md)

#### Option 2: Edit Static Files in Docker

For customizations beyond built-in settings, you can mount and edit static files:

**Steps:**
1. Mount the `/customFiles/static/` directory in Docker
2. Add your custom static files (images, favicons, etc.)
3. Reference them in your HTML/settings
4. Restart container to apply changes

**Example Docker compose:**
```yaml
volumes:
  - ./customFiles:/customFiles:rw
```

**Use cases:**
- Custom favicon
- Custom images/logos
- Static assets

#### Option 3: Fork the Frontend (Advanced)

For complete UI customization:

**Steps:**
1. Fork Stirling-PDF repository
2. Modify React components in `frontend/src/`
3. Build custom frontend
4. Deploy in split mode with custom frontend

**Trade-offs:**
- ✅ Complete control
- ❌ Must maintain your fork
- ❌ Manual merges for updates

### What No Longer Works

These V1 customization patterns are **no longer supported:**

```html
<!-- V1: Inject custom navbar (NO LONGER WORKS) -->
<div th:replace="fragments/navbar :: navbar"></div>

<!-- V1: Conditional content (NO LONGER WORKS) -->
<div th:if="${@propertyService.get('ui.showAdvanced')}">
  Custom content
</div>

<!-- V1: Server-side variables (NO LONGER WORKS) -->
<span th:text="${appName}"></span>
```

---

## ⚙️ UI Settings Moved to In-App Configuration

**Impact:** MEDIUM - Settings moved, but easy to reconfigure

### What Changed

**V1 Configuration:**
```yaml
ui:
  appName: 'My PDF Tool'
  homeDescription: 'Welcome to our PDF service!'
```

**V2 Configuration:**
```yaml
ui:
  appNameNavbar: 'My PDF Tool'  # Still in YAML
  # appName and homeDescription REMOVED
  # Configure these in-app instead
```

### Why the Change

**Benefits:**
- ✅ No container restart needed
- ✅ Visual interface with preview
- ✅ Validation prevents errors
- ✅ Changes apply immediately
- ✅ Role-based access control

### Migration Steps

1. **Note your current settings:**
   ```yaml
   # From V1 settings.yml
   ui:
     appName: 'CompanyName PDF'
     homeDescription: 'Internal document processing'
   ```

2. **Remove from settings.yml:**
   ```yaml
   ui:
     appNameNavbar: 'CompanyName PDF'
     # appName - REMOVE THIS LINE
     # homeDescription - REMOVE THIS LINE
   ```

3. **Configure in UI:**
   - Enable login: `SECURITY_ENABLELOGIN=true`
   - Start V2
   - Log in as admin
   - Go to Settings → UI
   - Enter app name and description
   - Save

### Environment Variables

These environment variables **no longer work**:

```bash
# V1 (NO LONGER WORKS)
UI_APPNAME="My PDF Tool"
UI_HOMEDESCRIPTION="Welcome!"

# V2 (USE IN-APP SETTINGS INSTEAD)
# Set through UI after logging in
```

`UI_APPNAMENAVBAR` still works for navbar branding.

---

## 🔐 Session Management Improvements

**Impact:** LOW - New session features with simple setting updates

### What Changed

Session management enhanced with new JWT-based features and improved settings:

| V1 Setting | V2 Setting | Change |
|------------|------------|--------|
| `jwt.enabled` | `jwt.persistence` | Renamed |
| `jwt.keyCleanup` | `jwt.enableKeyCleanup` | Renamed |
| `jwt.secureCookie` | _(removed)_ | Always secure now |
| _(new)_ | `jwt.enableKeyRotation` | New feature |
| _(new)_ | `jwt.keyRetentionDays` | New feature |

### Migration

**V1 Configuration:**
```yaml
security:
  jwt:
    enabled: false
    keyCleanup: false
    secureCookie: true
```

**V2 Configuration:**
```yaml
security:
  jwt:
    persistence: true           # was 'enabled'
    enableKeyCleanup: true      # was 'keyCleanup'
    enableKeyRotation: true     # NEW
    keyRetentionDays: 7         # NEW
    # secureCookie REMOVED
```

### Environment Variables

**V1 (NO LONGER WORKS):**
```bash
SECURITY_JWT_ENABLED=false
SECURITY_JWT_KEYCLEANUP=false
SECURITY_JWT_SECURECOOKIE=true
```

**V2 (USE THESE):**
```bash
SECURITY_JWT_PERSISTENCE=true
SECURITY_JWT_ENABLEKEYCLEANUP=true
SECURITY_JWT_ENABLEKEYROTATION=true
SECURITY_JWT_KEYRETENTIONDAYS=7
```

### After Upgrade

**Expected behavior:** Users will be logged out once after upgrade.

**Why:** Session token format changed with new JWT implementation.

**Action:** Users just need to log in again. Normal behavior.

**Learn more:** [Settings Changes - JWT Configuration](./Settings-Changes#enhanced-jwt-configuration)

---

## 🔕 Database Notifications Removed

**Impact:** LOW - Replaced with better alternative

### What Changed

Database backup/import notifications removed.

**V1 Configuration (NO LONGER WORKS):**
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

### Why Removed

Replaced with comprehensive audit logging system that provides:
- More detailed information
- Searchable history
- Export capabilities
- Better retention policies

### Migration to Audit Logs

**V2 Alternative:**

1. **Enable audit logging:**
   ```yaml
   system:
     logging:
       level: INFO
   ```

2. **Monitor logs:**
   ```bash
   docker logs stirling-pdf | grep "Database backup"
   docker logs stirling-pdf | grep "Database import"
   ```

3. **Or use audit log UI:**
   - Log in as admin
   - Go to Settings → Audit Logs
   - Filter by operation type
   - Export as needed

### What You Get Instead

**Audit logs provide:**
- ✅ Database operations (backup, import, export)
- ✅ User actions (login, logout, operations)
- ✅ Admin actions (settings changes, user management)
- ✅ Failed operations with error details
- ✅ Search and filter capabilities
- ✅ Export to CSV/JSON

**Example audit log entry:**
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "user": "admin",
  "action": "database.backup",
  "status": "success",
  "details": {
    "size": "1.2 GB",
    "duration": "45s",
    "location": "/backups/db-2025-01-15.sql"
  }
}
```

---

## 🔧 Calibre Custom Path Removed

**Impact:** LOW - Auto-detection improved

### What Changed

Custom Calibre path no longer needed.

**V1 Configuration (NO LONGER WORKS):**
```yaml
system:
  customPaths:
    operations:
      calibre: '/usr/bin/calibre'
```

### Why Removed

V2 has improved path detection:
- Automatically finds Calibre in standard locations
- Checks multiple common paths
- Better error messages if not found

### Migration

1. **Remove from settings.yml:**
   ```yaml
   system:
     customPaths:
       operations:
         # calibre: ''  # DELETE THIS LINE
   ```

2. **Verify Calibre is installed:**
   ```bash
   docker exec stirling-pdf which ebook-convert
   ```

3. **If not found, install in container:**
   ```dockerfile
   # In your Dockerfile
   RUN apt-get update && apt-get install -y calibre
   ```

### Standard Detection Paths

V2 automatically checks:
- `/usr/bin/ebook-convert`
- `/usr/local/bin/ebook-convert`
- `ebook-convert` (in PATH)

If Calibre is in any standard location, it will be found automatically.

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
stirlingtools/stirling-pdf:latest  # NEW NAME
stirlingtools/stirling-pdf:2.x.x
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
    image: stirlingtools/stirling-pdf:latest  # NEW
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
- `/api/v1/misc/remove-cert-sign` - Remove certificate signatures
- `/api/v1/misc/booklet-imposition` - Booklet printing layout
- `/api/v1/misc/unlock-pdf-forms` - Unlock form fields
- `/api/v1/misc/replace-color` - Color replacement
- `/api/v1/misc/add-attachments` - Add file attachments
- `/api/v1/misc/edit-toc` - Edit table of contents

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

Database is **forward-compatible only**:
- ✅ V1 → V2 upgrade: Automatic
- ⚠️ V2 → V1 rollback: Database needs manual downgrade

**If you need to rollback:**
1. Restore database backup from before V2 upgrade
2. Or use V1-compatible database dump

**Recommendation:** Take database backup before upgrading.

---

## 📱 Browser Compatibility

**Impact:** LOW - Modern browsers required

### Minimum Browser Versions

**V2 Requirements:**

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| **Chrome** | 90+ | Recommended |
| **Firefox** | 88+ | Recommended |
| **Safari** | 14+ | Some limitations |
| **Edge** | 90+ | Chromium-based |

**V1 vs V2:**
- V1 supported older browsers (IE11, old Safari)
- V2 requires modern browsers for IndexedDB, modern JavaScript

### Why the Change

V2 features require modern browser APIs:
- IndexedDB for file storage
- ES2020+ JavaScript
- Modern CSS features
- Web Workers for performance

### If Users Have Old Browsers

**Options:**
1. **Update browser** (recommended)
2. **Use desktop app** (supports older systems)
3. **Stay on V1** (still receives security updates)

---

## 🔒 Security Changes

**Impact:** LOW - Generally more secure

### HTTPS Enforcement

**V2 Change:** Secure cookies always enabled for production.

**V1:**
```yaml
security:
  jwt:
    secureCookie: true  # Configurable
```

**V2:**
```yaml
# secureCookie removed - always secure in production
```

**Impact:**
- ✅ More secure by default
- ⚠️ Requires HTTPS in production
- Development mode (localhost) still works over HTTP

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

**V2 Changes:**
- Shorter default session timeout (4 hours → 2 hours)
- Better session invalidation
- Stricter CORS policies

**To increase timeout:**
```yaml
security:
  sessionTimeout: 14400  # 4 hours in seconds
```

---

## 🎯 Feature Flag Changes

**Impact:** LOW - Endpoint customization still works

### What Changed

Tool IDs updated for consistency:

| Old ID (V1) | New ID (V2) | Tool Name |
|-------------|-------------|-----------|
| `pdf-organizer` | `reorganize-pages` | Reorganize Pages |
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
  toRemove: ['reorganize-pages']
```

**Complete tool ID list:** [Endpoint Customisation](../Configuration/Endpoint%20or%20Feature%20Customisation.md)

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
- [ ] **Note UI settings** (appName, homeDescription)
- [ ] **Update JWT settings** (enabled → persistence)
- [ ] **Remove deprecated sections** (database notifications)

### 3. Infrastructure
- [ ] **Backup database** before upgrade
- [ ] **Test in staging** environment first
- [ ] **Verify HTTPS** configured for production
- [ ] **Check browser versions** for users

### 4. Features
- [ ] **Using database notifications?** → Switch to audit logs
- [ ] **Custom Calibre path?** → Remove, auto-detection works

### 5. API Integrations
- [ ] **Using deprecated tool IDs?** → Update to new IDs
- [ ] **Update OpenAPI spec** if using generated clients
- [ ] **Test API endpoints** in staging

---

## 🆘 Troubleshooting

### "Unknown configuration key" warnings

**Symptom:**
```
WARN: Unknown configuration key: premium.proFeatures.googleDrive
```

**Solution:** Remove deprecated settings from settings.yml. See [Settings Changes](./Settings-Changes.md).

---

### Custom templates not loading

**Symptom:** Custom navbar/homepage not appearing.

**Solution:** Template system removed. Use in-app settings or custom CSS instead. See [Template Customization](#-template-customization-system-removed).

---

### Users logged out after upgrade

**Symptom:** All users need to re-login after V2 upgrade.

**Solution:** Expected behavior due to JWT format change. Users just need to log in once.

---

### API returns 404 for tool

**Symptom:** API call fails with tool not found.

**Solution:** Update tool IDs. Example: `pdf-organizer` → `reorganize-pages`. See [Feature Flag Changes](#-feature-flag-changes).

---

### App name not showing

**Symptom:** `ui.appName` in settings.yml not displaying.

**Solution:** Setting moved to in-app configuration. Log in as admin, go to Settings → UI. See [UI Settings](#%EF%B8%8F-ui-settings-moved-to-in-app-configuration).

---

## 🔄 Rollback Guide

If you need to return to V1:

### 1. Stop V2
```bash
docker stop stirling-pdf
```

### 2. Restore Database
```bash
# Option A: Restore from backup
docker exec -i postgres psql -U stirling < backup-before-v2.sql

# Option B: Use existing (database is backward compatible for rollback)
```

### 3. Restore Settings
```bash
# Restore V1 settings.yml from backup
cp settings.yml.v1.backup configs/settings.yml
```

### 4. Start V1
```bash
# Update docker-compose.yml
image: stirlingtools/stirling-pdf:1.5.0

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

---

## Summary

**Breaking changes are minimal:**

✅ Most configurations work unchanged
✅ All data migrates automatically
✅ API compatibility maintained
⚠️ Template customizations need rewrite
⚠️ UI settings moved to in-app config
⚠️ JWT settings renamed

**Action required:**
1. Update JWT setting names
2. Remove deprecated configurations
3. Reconfigure UI settings in-app
4. Rewrite template customizations (if any)

**Most users can upgrade with minimal changes!**
