---
sidebar_position: 2
id: New-Features
title: New Features in V2
description: All new features and capabilities added in V2
---

# New Features in V2

V2 brings powerful new features that fundamentally improve how you work with PDFs. This page documents everything new in V2.

---

## 📁 Browser File Storage

**The Game Changer:** Upload PDFs once, use them across multiple tools without re-uploading.

### What's New

- **Persistent Storage:** Files stored locally in your browser using IndexedDB
- **Cross-Tool Usage:** Access uploaded files from any tool
- **Smart Management:** Automatic cleanup, manual delete options
- **Large File Support:** Up to 10GB storage (browser-dependent)

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

| Browser | Storage Limit | Notes |
|---------|--------------|-------|
| Chrome/Edge | ~10GB | 60% of available disk space |
| Firefox | ~10GB | User-configurable |
| Safari | ~1GB | More restrictive |

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

## 🖥️ Desktop Applications (Tauri)

**NEW:** Native desktop apps for Windows, Mac, and Linux.

### What's New

- **Lightning Fast:** 0.3 second startup time
- **Native Integration:** "Open with Stirling-PDF" in file explorer
- **System Default:** Set as default PDF viewer
- **Offline Capable:** Full functionality without server
- **Resource Efficient:** Uses ~50MB RAM vs browser ~200MB

### Platform Support

| Platform | Format | Features |
|----------|--------|----------|
| **Windows** | `.exe` installer | Context menu integration |
| **macOS** | `.dmg` | Dock integration |
| **Linux** | `.AppImage`, `.deb` | Desktop file integration |

### Key Differences from Web

| Feature | Desktop | Web Browser |
|---------|---------|-------------|
| Startup Speed | 0.3s | 2-3s |
| File Association | ✅ Yes | ❌ No |
| Default Viewer | ✅ Yes | ❌ No |
| System Integration | ✅ Native | ⚠️ Limited |
| Storage | Unlimited | Browser limits |
| Updates | Manual | Automatic |

### Right-Click Integration

After installation:
1. Right-click any PDF in file explorer
2. Select "Open with Stirling-PDF"
3. PDF opens directly in app
4. Process immediately

**Learn More:**
- [Installation Guide](../Installation/Windows.md)

---

## 🔀 Split Deployment Architecture

**NEW:** Deploy frontend and backend separately for better scalability.

### What's New

Three deployment modes:

#### 1. Unified Mode (Default)
Single container with frontend + backend together.

```bash
docker run -d \
  -p 8080:8080 \
  stirlingtools/stirling-pdf:latest
```

#### 2. Split Mode
Frontend and backend in separate containers.

**Backend:**
```bash
docker run -d \
  -e MODE=BACKEND \
  -p 8081:8080 \
  stirlingtools/stirling-pdf:latest
```

**Frontend:**
```bash
docker run -d \
  -e MODE=FRONTEND \
  -e VITE_API_BASE_URL=http://backend:8080 \
  -p 8080:8080 \
  stirlingtools/stirling-pdf:latest
```

#### 3. Backend-Only Mode
Use as API-only service.

```bash
docker run -d \
  -e MODE=BACKEND \
  -p 8080:8080 \
  stirlingtools/stirling-pdf:latest
```

### Benefits

- **Independent Scaling:** Scale frontend and backend separately
- **CDN Integration:** Serve static frontend from CDN
- **Development:** Work on frontend without running backend
- **Security:** Separate concerns, different security zones

### CORS Configuration

New settings for split deployment:

```yaml
system:
  corsAllowedOrigins: ['https://pdf.example.com']
  frontendUrl: 'https://pdf.example.com'
```

**Learn More:** [Docker Installation - Split Mode](../Installation/Docker%20Install.md#split-deployment-advanced-users)

---

## ⌨️ Custom Keyboard Shortcuts

**NEW:** Configure your own keyboard shortcuts for quick tool access.

### What's New

- **Custom Hotkeys:** Assign keyboard shortcuts to any tool
- **Quick Access:** Default shortcuts for 7 most popular tools (Cmd/Ctrl+Alt+1-7)
- **Flexible Mapping:** Use any combination of Ctrl, Alt, Shift, Cmd keys
- **Visual Feedback:** See all shortcuts in settings
- **Conflict Detection:** Prevents duplicate shortcut assignments
- **Easy Reset:** Restore default shortcuts anytime

### Default Shortcuts

The 7 Recommended Tools come with pre-configured shortcuts:

| Tool | Windows/Linux | Mac |
|------|---------------|-----|
| Multi-Tool | Ctrl+Alt+1 | Cmd+Option+1 |
| Read & Annotate | Ctrl+Alt+2 | Cmd+Option+2 |
| Merge | Ctrl+Alt+3 | Cmd+Option+3 |
| Compare | Ctrl+Alt+4 | Cmd+Option+4 |
| Compress | Ctrl+Alt+5 | Cmd+Option+5 |
| OCR | Ctrl+Alt+6 | Cmd+Option+6 |
| Redact | Ctrl+Alt+7 | Cmd+Option+7 |

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
- App name and description
- Logo style (classic/modern)
- Navbar branding
- Homepage content

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
      useSystemTrust: true           # Use OS trust store
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

- **Auto-Generated Certs:** Server creates signing certificates on startup
- **Customizable:** Configure organization name, validity period
- **No Manual Setup:** Works out of the box
- **Renewable:** Regenerate certificates as needed
- **"Sign with Stirling-PDF" Feature:** Users can sign with server cert

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
   - Used for "Sign with Stirling-PDF" feature

2. **Subsequent Startups:**
   - Uses existing certificate (unless `regenerateOnStartup: true`)
   - Certificate persists across restarts

3. **User Signs PDF:**
   - Selects "Sign with Stirling-PDF"
   - Server signs using generated certificate
   - Signature embedded in PDF

### Custom Certificates

You can also provide your own certificates:

```bash
configs/
  ├── keystore.p12           # Your certificate
  └── settings.yml
```

Then disable auto-generation:
```yaml
system:
  serverCertificate:
    enabled: false  # Use custom cert instead
```

**Learn More:**
- [Certificate Signing Guide](../Functionality/Security/Certificate-Signing.md)
- [Configuration](../Configuration/System%20and%20Security.md#server-certificates)

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

### What's New in V2

| Feature | V1 | V2 |
|---------|----|----|
| Token Persistence | Optional | Configurable |
| Key Rotation | ❌ No | ✅ Yes |
| Key Cleanup | Manual | Automatic |
| Key Retention | N/A | Configurable days |
| Secure Cookie | Hardcoded | Removed (always secure) |

### New Settings

```yaml
security:
  jwt:
    persistence: true           # Store keys across restarts
    enableKeyRotation: true     # Rotate signing keys periodically
    enableKeyCleanup: true      # Auto-delete old keys
    keyRetentionDays: 7         # How long to keep old keys
```

### Benefits

**Key Rotation:**
- Improved security through regular key changes
- Seamless for users (old tokens still work during grace period)
- Configurable rotation schedule

**Automatic Cleanup:**
- No manual key management needed
- Prevents key accumulation
- Configurable retention period

**Persistence:**
- Keys survive container restarts
- No user re-login after restart
- Optional for stateless deployments

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
  enableInvites: true  # NEW in V2
  smtp:
    host: smtp.example.com
    port: 587
    username: noreply@example.com
    password: ${MAIL_PASSWORD}
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
2. Click link (valid for 48 hours)
3. Create account with password
4. Automatically logged in

### Environment Variables

```bash
MAIL_ENABLED=true
MAIL_ENABLEINVITES=true
MAIL_SMTP_HOST=smtp.gmail.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USERNAME=your-email@gmail.com
MAIL_SMTP_PASSWORD=your-app-password
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

```bash
customFiles/
  └── static/
      └── logo.svg  # Your custom logo
```

Then reference in settings:
```yaml
ui:
  appNameNavbar: 'My Company PDF'
  logoStyle: classic  # Or use custom logo
```

---

## Summary

**V2's Major Features:**

- 📁 **Browser File Storage** - Upload once, use across multiple tools
- ⏮️ **Undo/Redo & Version History** - Never lose work
- 🖥️ **Desktop Applications** - Native Windows, Mac, Linux apps
- 🎨 **Multi-Tool Workbench** - Chain unlimited operations
- 📖 **Read & Annotate** - Full PDF viewer with annotation support
- ⚙️ **In-App Settings** - Configure everything through UI
- 🔐 **Enhanced Security** - PDF signature validation, server certificates
- ✉️ **Email Invitations** - Streamlined user onboarding
- ⌨️ **Custom Keyboard Shortcuts** - Quick tool access
- 🔄 **Enhanced Session Management** - Better token management with rotation
- 🏗️ **Split Deployment** - Scale frontend and backend independently

---

## Learn More

- **[Migration Overview](./Overview.md)** - How to upgrade
- **[Settings Changes](./Settings-Changes.md)** - Configuration updates
- **[Breaking Changes](./Breaking-Changes.md)** - What changed
- **[Getting Started](../Getting%20Started.md)** - Start using V2
