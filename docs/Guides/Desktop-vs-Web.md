---
sidebar_position: 3
id: Desktop-vs-Web
title: Desktop App vs Web Version
description: Choose the right Stirling-PDF deployment for your needs
---

# Desktop App vs Web Version

Stirling-PDF is available as both a **web application** and **native desktop apps**. Here's how to choose.

---

## Quick Comparison

| Feature | Web Version | Desktop App |
|---------|-------------|-------------|
| **Installation** | None needed | One-time install |
| **Access** | Any device with browser | Installed device only |
| **Storage** | ~1-10GB browser limit | Unlimited (your disk) |
| **Offline Mode** | No (needs server) | Yes (fully offline) |
| **Performance** | Good | Excellent (native) |
| **File Persistence** | Temporary (browser) | Permanent (file system) |
| **Updates** | Automatic | Manual or auto-update |
| **Privacy** | Good (self-host best) | Excellent (fully offline) |
| **Startup Speed** | Instant (in browser) | 0.3-2 seconds |
| **PDF Integration** | None | "Open with" integration |
| **Best For** | Occasional use, any device | Daily use, power users |

---

## Web Version

### When to Use Web Version

**Perfect For:**
- ✅ Occasional PDF tasks
- ✅ Quick access from any device
- ✅ Shared/public computers
- ✅ No installation allowed
- ✅ Testing before installing
- ✅ Multiple device access

### Advantages

**Convenience:**
- Access from anywhere
- Any device, any OS
- No installation/maintenance
- Always latest version

**Flexibility:**
- Use at work, home, library
- Switch devices easily
- No commitment needed

### Limitations

**Storage:**
- Browser limits (~1-10GB)
- Files may be auto-cleared
- Not for large projects

**Connectivity:**
- Requires internet/server access
- Can't work fully offline
- Dependent on server availability

**Performance:**
- Slower than native app
- Browser overhead
- Limited by browser capabilities

---

## Desktop Application

### When to Use Desktop App

**Perfect For:**
- ✅ Daily PDF work
- ✅ Large files (100MB+)
- ✅ Offline work required
- ✅ Maximum privacy/security
- ✅ Professional use
- ✅ Heavy PDF workflows

### Unique Features

**System Integration:**
- **"Open With" Menus** - Right-click PDFs → Open with Stirling-PDF
- **Default PDF Viewer** - Set as system default
- **File Association** - Double-click PDFs to open
- **Native Performance** - True native application speed

**Enhanced Capabilities:**
- **Lightning Startup** - 0.3-2 second launch
- **Unlimited Storage** - Only limited by disk space
- **Fully Offline** - No internet required
- **Better Performance** - Native code, no browser overhead
- **Persistent Files** - Files in your file system

### Available Platforms

**Windows:**
- Download: [Stirling-PDF-win-installer.exe](https://files.stirlingpdf.com/win-installer.exe)
- Installer or portable
- Windows 10/11 supported

**Mac:**
- Download: [Apple Silicon](https://files.stirlingpdf.com/mac-installer.dmg) | [Intel](https://files.stirlingpdf.com/mac-x86_64-installer.dmg)
- DMG installer
- macOS 11+ supported

**Linux:**
- AppImage, DEB, RPM available
- All major distributions supported

**[Installation Guides →](../Installation/Windows.md)**

---

## Decision Guide

### Use Web If You:

1. **Access from Multiple Devices**
   - Work computer, home computer, tablet
   - Need flexibility to switch devices

2. **Occasional PDF Work**
   - Process a few PDFs per week
   - Don't need advanced features daily

3. **Shared Computers**
   - Libraries, internet cafes, work stations
   - Don't want to install software

4. **Testing First**
   - Want to try before installing
   - Evaluating for organization

5. **Can't Install Software**
   - Restricted work environment
   - Don't have admin rights

### Use Desktop If You:

1. **Daily PDF Processing**
   - Regular professional use
   - Part of daily workflow

2. **Large Files**
   - PDFs over 100MB
   - Batch processing many files
   - Storage-intensive projects

3. **Offline Work**
   - No reliable internet
   - Air-gapped environment
   - Maximum privacy required

4. **Maximum Performance**
   - Need fastest processing
   - Handle complex operations
   - Professional requirements

5. **System Integration**
   - Want "Open With" functionality
   - Set as default PDF viewer
   - Seamless file handling

---

## Privacy Comparison

### Web Version Privacy

**Self-Hosted (Best):**
- ✅ Full control over server
- ✅ Data stays in your infrastructure
- ✅ No third-party involvement

**Public Instance:**
- ⚠️ Files processed on external server
- ⚠️ Trust required in host
- ✅ No permanent storage (immediately deleted)

### Desktop App Privacy

**Maximum Privacy:**
- ✅ Everything runs locally
- ✅ No internet connection needed
- ✅ No data ever leaves device
- ✅ Complete control

---

## Can You Use Both?

**Yes!** Many users do:

**Typical Setup:**
- **Desktop App** - Daily work at main computer
- **Web Version** - Quick tasks on other devices

**Files Don't Sync:**
- Web and desktop are separate
- No automatic file synchronization
- Manual file transfer if needed

---

## Migration Path

### Starting with Web

1. Try web version
2. Evaluate if it meets needs
3. Install desktop app if needed
4. Continue using both as needed

### Going Desktop-Only

1. Install desktop application
2. Set as default PDF viewer
3. Enjoy full offline capability
4. Keep web bookmarked for mobile access

---

## Storage Deep Dive

### Web Browser Storage

**How It Works:**
- IndexedDB in browser
- Per-domain storage
- Temporary workspace

**Limits:**
| Browser | Limit |
|---------|-------|
| Chrome/Edge | ~10GB |
| Firefox | ~10GB |
| Safari | ~1GB |
| Mobile | ~500MB |

**Best For:** Small to medium projects

### Desktop App Storage

**How It Works:**
- Files in your file system
- No artificial limits
- Standard file management

**Capacity:**
- Limited only by disk space
- 100GB+ projects possible
- Professional-grade capacity

**Best For:** Large projects, archives, professional use

---

## Performance Comparison

### Processing Speed

**Web Version:**
- Server does processing
- Network latency added
- Good for most operations

**Desktop App:**
- Local processing
- No network latency
- 20-50% faster for most operations

### UI Responsiveness

**Web Version:**
- Browser rendering
- Good responsiveness
- Some browser overhead

**Desktop App:**
- Native rendering
- Excellent responsiveness
- No browser overhead

---

## Recommendations by Use Case

### Home Users
**Light Use:** Web version
**Regular Use:** Desktop app

### Students
**Occasional Papers:** Web version
**Heavy Research:** Desktop app

### Professionals
**Recommended:** Desktop app
**Backup:** Web version

### Businesses
**Small Teams:** Web (self-hosted)
**Large Organizations:** Desktop + Web (self-hosted)
**Enterprise:** Split deployment with both

### IT/Admin
**Server Deployment:** Web version
**Personal Use:** Desktop app

---

## Summary

**Web Version Best For:**
- 🌐 Occasional use
- 📱 Multiple devices
- 🚀 No installation
- 🔄 Always updated

**Desktop App Best For:**
- 💼 Daily professional use
- 💾 Large files
- ✈️ Offline work
- 🔒 Maximum privacy

**Most Users:** Try web first, install desktop if you need more!

---

## Related Documentation

- **[Installation Guides](../Installation/Windows.md)** - Install desktop apps
- **[Docker Deployment](../Installation/Docker%20Install.md)** - Self-host web version
- **[File Storage](./File-Storage.md)** - Browser storage details
