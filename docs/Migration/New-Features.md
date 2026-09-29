---
sidebar_position: 2
id: New-Features
title: New Features in V2
description: All new features and capabilities added in V2
---

# New Features in V2

This page describes the V2 workspace, desktop application and administration features.

---

## 📁 Browser File Storage

Upload PDFs once and reuse them across tools in the workspace.

### What's New

- **Persistent Storage:** Files stored locally in your browser using IndexedDB
- **Cross-Tool Usage:** Access uploaded files from any tool
- **Smart Management:** Automatic cleanup, manual delete options
- **Storage capacity:** Subject to the browser's storage quota and available disk space

### How It Works

```
Upload PDF → Stored in Browser → Use in Any Tool → Delete When Done
```

**Example Workflow:**
1. Upload `report.pdf` in Multi-Tool
2. Compress it
3. Switch to Add Page Numbers (file still there!)
4. Add watermark (still no re-upload!)
5. Download final result

### Storage Limits

Storage quotas vary by browser, device, available disk space and browsing mode.

---

## ⏮️ Undo, Redo & Version History

**Made a mistake?** Just undo it! V2 introduces comprehensive version control.

### What's New

- **Undo/Redo:** Undo and redo buttons in toolbar
- **Version History:** See all previous versions with timestamps
- **Jump to Version:** Restore any previous state
- **Visual Indicators:** See current version in timeline
- **All Local:** History stored in your browser, fully private

### How It Works

Every operation creates a new version:

```
Original.pdf → [Compress] → v1 → [Add Pages] → v2 → [Watermark] → v3
                ↑           ↑                 ↑                   ↑
                Can restore to any point in history
```

### Accessing Features

- **Undo Button:** Click undo in toolbar
- **Redo Button:** Click redo in toolbar
- **History Panel:** Click history icon in Multi-Tool

### Example Use Case

**Scenario:** You compressed a PDF too aggressively and text is blurry.

**Solution:**
1. Click undo button to undo compression
2. Open Version History panel
3. See: Original → Compress (MEDIUM) ← You are here
4. Click "Restore" on Original
5. Re-compress with LIGHT setting instead


---

## 🖥️ Desktop Applications

**NEW:** Native desktop apps for Windows, Mac, and Linux.

### What's New

- **Native Integration:** "Open with Stirling PDF" in file explorer
- **System Default:** Set as default PDF viewer
- **Sign in with Stirling Cloud or self-hosted server** - Choose your connection on launch
- Startup time and memory use depend on the machine, backend readiness and files being processed.

### Platform Support

| Platform | Format | Features |
|----------|--------|----------|
| **Windows** | `.exe` installer | Context menu integration |
| **macOS** | `.dmg` | Dock integration |
| **Linux** | `.deb` | Desktop file integration |

### Key Differences from Web

| Feature | Desktop | Web Browser |
|---------|---------|-------------|
| Startup Speed | Depends on the machine and backend startup | Depends on browser, network and server |
| File Association | ✅ Yes | ❌ No |
| Default Viewer | ✅ Yes | ❌ No |
| System Integration | ✅ Native | ⚠️ Limited |
| Storage | Local IndexedDB, subject to webview quota and disk space | IndexedDB, subject to browser quota and disk space |
| Updates | Prompt, automatic or disabled policy | Server updates depend on deployment management |

### Right-Click Integration

After installation:
1. Right-click any PDF in file explorer
2. Select "Open with Stirling PDF"
3. PDF opens directly in app
4. Sign in (if needed)
5. Process immediately

**Learn More:**
- [Windows Installation](../Installation/Windows.md)
- [Mac Installation](../Installation/Mac.md)
- [Linux Installation](../Installation/Unix.md)

---

---

## ⌨️ Custom Keyboard Shortcuts

**NEW:** Configure your own keyboard shortcuts for quick tool access.

### What's New

- **Custom Hotkeys:** Assign keyboard shortcuts to any tool
- **Quick Access:** Positional shortcuts for up to nine Quick Access tools (Cmd/Ctrl+Alt+1-9)
- **Flexible Mapping:** Use any combination of Ctrl, Alt, Shift, Cmd keys
- **Visual Feedback:** See all shortcuts in settings
- **Conflict Detection:** Prevents duplicate shortcut assignments
- **Easy Reset:** Restore default shortcuts anytime

### Default Shortcuts

Default shortcuts follow the current Quick Access tool order: Ctrl+Alt+1 through Ctrl+Alt+9 on Windows/Linux, or Cmd+Option+1 through Cmd+Option+9 on macOS. The mapping depends on the tools available in your build; view it in Settings. See [Keyboard Shortcuts](../Configuration/Customisation/Keyboard-Shortcuts.md).

### Customizing Shortcuts

**To configure:**
1. Open Settings (gear icon)
2. Navigate to "Keyboard Shortcuts" section
3. Find the tool you want to assign
4. Click "Set Shortcut"
5. Press your desired key combination
6. Save changes

**Example:**
- Want to open Convert with Ctrl+Alt+C?
- Navigate to Convert tool in shortcuts list
- Click "Set Shortcut"
- Press Ctrl+Alt+C

### Tips

- **Don't override browser shortcuts:** Avoid Ctrl+T, Ctrl+W, etc.
- **Use Alt/Option combos:** Less likely to conflict with system shortcuts
- **Keep it memorable:** Use letters that relate to tool names
- **Test after setting:** Make sure shortcuts work in practice

---

## ⚙️ In-App Settings Management

**NEW:** Configure everything through the UI (admin only).

### What's New

- **Visual Configuration:** No more editing YAML files
- **Instant Validation:** See errors before saving
- **Live Preview:** Some settings apply immediately
- **Organized Sections:** Settings grouped logically
- **Search Settings:** Find what you need quickly
- **Import/Export:** Backup and restore configurations

### Settings You Can Configure

**System:**
- Default locale and timezone
- Resource limits
- Logging levels
- CORS origins

**Security:**
- Login requirements
- User registration
- Session timeout
- Password policies

**UI Customization:**
- Browser tab title and TOTP issuer label (`ui.appNameNavbar`)
- Logo style (classic/modern)
- Static asset overrides for custom branding

There is no in-app editor for `ui.homeDescription`.

**Features:**
- Enable/disable tools
- Endpoint customization
- OCR languages
- Conversion settings

### How to Access

1. Enable login: `SECURITY_ENABLELOGIN=true`
2. Log in as admin
3. Click Settings icon in navbar
4. Configure through UI
5. Save changes

**Benefits Over File Configuration:**
- No container restart needed (for most settings)
- Validation prevents errors
- Changes tracked in audit log
- Role-based access control

---

## 🔐 PDF Signature Validation

**NEW:** Comprehensive certificate chain validation for signed PDFs.

### What's New

Full trust chain validation system:

- **Multiple Trust Sources:**
  - System trust store
  - Mozilla CA bundle
  - Adobe Approved Trust List (AATL)
  - EU Trusted List (EUTL)
  - Server-generated anchor certificates

- **Revocation Checking:**
  - OCSP (Online Certificate Status Protocol)
  - CRL (Certificate Revocation Lists)
  - Configurable hard/soft fail

- **AIA (Authority Information Access):**
  - Automatic intermediate cert fetching
  - Chain building support

### Configuration

```yaml
security:
  validation:
    trust:
      serverAsAnchor: true          # Trust server-generated certs
      useSystemTrust: true           # Use Java runtime trust store
      useMozillaBundle: true         # Mozilla CA certificates
      useAATL: false                 # Adobe trust list
      useEUTL: false                 # EU trust list
    allowAIA: false                  # Fetch intermediate certs
    revocation:
      mode: none                     # none, ocsp, crl, ocsp+crl
      hardFail: false                # Fail if revocation check fails
```

### Use Cases

**Enterprise:**
- Validate invoices signed by partners
- Verify contract signatures
- Compliance with legal requirements

**Government:**
- Validate officially signed documents
- EU eIDAS compliance
- EUTL integration

**General:**
- Verify PDF authenticity
- Check if signature still valid
- Detect tampered documents

**Learn More:** [Certificate Signing](../Functionality/Security/Certificate-Signing.md)

---

## 🔑 Server Certificate Management

**NEW:** Automatic certificate generation for signing PDFs.

### What's New

- **Certificate generation:** Runs at startup when enabled and a Team or Enterprise licence is active
- **Configuration:** Organisation name, validity period and regeneration behaviour
- **Renewable:** Regenerate certificates as needed
- **"Sign with Stirling PDF" Feature:** Users can sign with server cert

### Configuration

```yaml
system:
  serverCertificate:
    enabled: true
    organizationName: Stirling-PDF
    validity: 365  # days
    regenerateOnStartup: false
```

### How It Works

1. **First Startup:**
   - Server generates self-signed certificate
   - Stored in `configs/` directory
   - Used for "Sign with Stirling PDF" feature

2. **Subsequent Startups:**
   - Uses existing certificate (unless `regenerateOnStartup: true`)
   - Certificate persists across restarts

3. **User Signs PDF:**
   - Selects "Sign with Stirling PDF"
   - Server signs using generated certificate
   - Signature embedded in PDF

### Custom Certificates

To use your organisation's certificate for server signing, upload a PKCS12 (`.p12` or `.pfx`) file containing the private key through the administrator endpoint `POST /api/v1/admin/server-certificate/upload`, with multipart fields `file` and `password`.

Keep `system.serverCertificate.enabled: true` and `system.serverCertificate.regenerateOnStartup: false` to use the uploaded certificate and retain it across restarts.

**Learn More:**
- [Certificate Signing Guide](../Functionality/Security/Certificate-Signing)
- [Configuration](../Configuration/Security/System%20and%20Security.md#server-certificates)

---

## 🎯 Multi-Tool Workbench

**NEW:** Dedicated workspace for chaining unlimited operations.

### What's New

- **Visual Workbench:** See all loaded files and their history
- **Unlimited Operations:** Chain as many tools as needed
- **Operation History:** See what you've done to each file
- **Undo/Redo:** Per-file version control
- **Batch Processing:** Process multiple files simultaneously
- **Result Management:** Keep, download, or discard results

### Example Workflow

```
Multi-Tool Workbench
├── invoice.pdf
│   ├── [Original]
│   ├── [OCR - English]
│   ├── [Compress - MEDIUM]
│   └── [Add Page Numbers] ← Current
├── report.pdf
│   ├── [Original]
│   └── [Add Watermark] ← Current
└── contract.pdf
    └── [Original] ← No operations yet
```

### Key Features

1. **Smart Tool Switching:**
   - Switch tools without losing files
   - Context preserved between operations
   - No re-uploading needed

2. **Operation Queue:**
   - See pending operations
   - Reorder before processing
   - Cancel if needed

3. **Result Preview:**
   - Preview before downloading
   - Compare before/after
   - Verify operations succeeded

**Learn More:** [Multi-Tool Workbench Guide](../Functionality/Multi-Tool.md)

---

## 📖 Read & Annotate Tool

**NEW:** Full-featured PDF viewer with annotation capabilities.

### What's New

- **PDF Viewer:** Read PDFs directly in browser
- **Annotation Tools:**
  - Highlight text
  - Add comments
  - Draw shapes
  - Insert text boxes
  - Sticky notes
- **Navigation:**
  - Thumbnail sidebar
  - Table of contents
  - Page search
  - Zoom controls
- **Collaboration:**
  - Export annotations
  - Share annotated PDFs
  - Comment threads

### Use Cases

**Review:**
- Mark up documents for approval
- Add review comments
- Highlight important sections

**Collaboration:**
- Annotate contracts before signing
- Review proposals with team
- Provide feedback on drafts

**Study:**
- Highlight key passages
- Add study notes
- Mark important pages

### Annotation Types

| Tool | Use Case | Example |
|------|----------|---------|
| **Highlight** | Mark important text | Legal clauses |
| **Comment** | Add feedback | "Needs revision" |
| **Text Box** | Add missing text | Corrections |
| **Shape** | Circle/underline | Draw attention |
| **Sticky Note** | Quick notes | "Follow up" |

**Learn More:** [Read & Annotate Guide](../Functionality/Read-and-Annotate.md)

---

## 🔄 Enhanced Session Management

**Improved:** Better session and token management with rotation and cleanup.

### JWT Settings

```yaml
security:
  jwt:
    enableKeystore: true
    enableKeyCleanup: true
    tokenExpiryMinutes: 1440
    desktopTokenExpiryMinutes: 43200
```

`enableKeystore` controls persistent key storage. `enableKeyCleanup` enables cleanup of old keys. Key retention is calculated automatically from token lifetimes and refresh settings.

Persist the configuration directory when persistent keys are enabled. Token validity also depends on expiration, key availability and the configured refresh policy.

---

## ✉️ Email Invitation System

**NEW:** Invite users via email instead of manual registration.

### What's New

- **Email Invites:** Send registration links via email
- **Token-Based:** Secure one-time registration tokens
- **Expiration:** Invites expire after configurable period
- **Role Assignment:** Set user role in invite
- **Bulk Invites:** Invite multiple users at once

### Configuration

```yaml
mail:
  enabled: true
  from: noreply@example.com
  host: smtp.example.com
  port: 587
  username: noreply@example.com
  password: ${MAIL_PASSWORD}
  startTlsEnable: true
```

### Requirements

- `mail.enabled: true`
- `security.enableLogin: true`
- Valid SMTP configuration

### How It Works

**Admin perspective:**
1. Go to User Management
2. Click "Invite User"
3. Enter email and select role
4. Send invite

**User perspective:**
1. Receive email with invite link
2. Click the link before expiry (72 hours by default, configurable with `mail.inviteLinkExpiryHours`)
3. Create account with password
4. Automatically logged in

### Environment Variables

```bash
MAIL_ENABLED=true
MAIL_FROM=noreply@example.com
MAIL_ENABLEINVITES=true
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_STARTTLSENABLE=true
```

---

## 🎨 Logo Customization

**NEW:** Choose between logo styles and customize branding.

### What's New

```yaml
ui:
  logoStyle: classic  # Options: 'classic' or 'modern'
```

### Logo Styles

| Style | Description | Best For |
|-------|-------------|----------|
| **Classic** | Traditional "S" icon | Established brands |
| **Modern** | Minimalist design | Clean, modern look |

### Custom Logo

You can still provide custom logo files:

```text
customFiles/static/modern-logo/StirlingPDFLogoNoTextDark.svg
customFiles/static/modern-logo/StirlingPDFLogoNoTextLight.svg
```

Select `ui.logoStyle: modern` for these paths, or use the corresponding `classic-logo/` paths for the classic style. Preserve the exact requested asset filenames; a root `logo.svg` is not automatically substituted.


## Learn More

- **[Migration Overview](./Overview.md)** - How to upgrade
- **[Settings Changes](./Settings-Changes.md)** - Configuration updates
- **[Breaking Changes](./Breaking-Changes.md)** - What changed
- **[Getting Started](../Getting%20Started.md)** - Start using V2
