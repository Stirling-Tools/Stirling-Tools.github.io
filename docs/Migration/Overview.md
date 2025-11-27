---
sidebar_position: 0
id: Overview
title: Migrating from V1 to V2
description: Complete guide for upgrading from Stirling-PDF V1 to V2
---

# Migrating from V1 to V2

Upgrading to Stirling-PDF V2 is straightforward for most users. This guide will walk you through the upgrade process.

:::warning Backup Your Configuration
Before upgrading, **back up your configuration folder** (usually mounted as `/configs`) to ensure you can restore your settings if needed:
```bash
# Docker volume backup
docker cp stirling-pdf:/configs ./configs-backup

# Or if using bind mount
cp -r ./configs ./configs-backup
```
:::

---

## Quick Upgrade Guide

### Docker Users (Most Common)

Update your image tag to `latest` (or specific V2 version):

```yaml
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest  # Change from 1.x to latest
    # Keep all your existing environment variables and volumes
```

Then pull and restart. See the [Docker Installation Guide - Updating Section](../Installation/Docker%20Install#updating-stirling-pdf) for complete update commands.

**That's it!** Your data and settings migrate automatically.

---

### Desktop Application Users

1. **Windows**: Download new installer from [GitHub Releases](https://github.com/Stirling-Tools/Stirling-PDF/releases), run it (automatically updates)
2. **Mac**: Download new DMG, drag to Applications (replaces old version)
3. **Linux**: Install new `.deb`/`.rpm`/`.AppImage`

Your settings carry over automatically.

---

### Manual Installation (JAR)

1. Download the latest V2 release from [GitHub Releases](https://github.com/Stirling-Tools/Stirling-PDF/releases)
2. Stop the current V1 instance
3. Replace the JAR file
4. Start with the same command

---

## Migration Guide Sections

This migration guide is organized into detailed sections:

### 📋 [Settings Changes](./Settings-Changes.md)
**Start here** if you have custom configuration. Covers:
- New settings added in V2
- Deprecated settings to remove
- Settings that were renamed
- Configuration examples and migration checklist

### ⚠️ [Breaking Changes](./Breaking-Changes.md)
**Important** - Review if you have customizations. Covers:
- Template customization system changes (most impactful)
- UI settings moved to in-app configuration
- Session management improvements
- Database notification changes
- API compatibility notes

### ✨ [New Features](./New-Features.md)
**Explore what's new** - Comprehensive list of V2 features:
- Browser file storage
- Undo/redo functionality
- Desktop applications
- Multi-Tool workbench
- PDF signature validation
- In-app settings management
- And much more...

---

## Should You Upgrade?

**Yes, if you want:**
- ✅ Faster workflows with file persistence
- ✅ Undo/redo functionality
- ✅ Better performance with large files
- ✅ Desktop applications
- ✅ Modern, responsive interface
- ✅ Future features and updates

**Consider staying on V1 if:**
- ⚠️ You heavily customized UI using `customFiles/templates` (requires code changes to migrate)
- ⚠️ You have specific compatibility requirements with very old browsers

---

## What Stays the Same

- ✅ All existing PDF tools
- ✅ Backend API compatibility
- ✅ Configuration files (settings.yml)
- ✅ Docker deployment process
- ✅ Security features (SSO, user management)
- ✅ Pipeline automation (renamed "Automate" in UI)
- ✅ Privacy commitment

---

## Your Data is Safe

V2 is **fully compatible** with V1 data:
- ✅ User accounts and permissions
- ✅ API keys
- ✅ Settings and configurations
- ✅ Database (internal or external)
- ✅ Custom OCR language files
- ✅ Custom fonts and certificates

**No manual migration needed** - database schema updates automatically on first startup.

---

## Post-Upgrade Checklist

After upgrading, verify everything works:

- [ ] Can log in with existing credentials
- [ ] All PDF tools work as expected
- [ ] Settings and preferences retained
- [ ] API integrations still function (if applicable)
- [ ] Custom branding appears correctly
- [ ] OCR languages available
- [ ] Pipelines continue working (now called "Automate" in UI)

---

## Troubleshooting

### Common Issues

**"Unknown configuration key" warnings**
- **Cause:** Old V1 settings in your `settings.yml`
- **Solution:** See [Settings Changes](./Settings-Changes.md) to remove deprecated settings

**Users logged out after upgrade**
- **Cause:** JWT token format changed (normal)
- **Solution:** Users just need to log in once

**Custom templates not loading**
- **Cause:** Template system replaced with React components
- **Solution:** See [Breaking Changes - Template Customization](./Breaking-Changes#-template-customization-system-removed)

**App name not showing**
- **Cause:** Setting moved to in-app configuration
- **Solution:** Log in as admin → Settings → UI

---

## Rolling Back (If Needed)

If you need to return to V1:

```bash
# Restore config backup
cp -r ./configs-backup ./configs

# Pull V1 image
docker pull stirlingtools/stirling-pdf:1.5.0

# Update docker-compose.yml to use 1.5.0 tag
docker-compose up -d
```

**Note:** Your data will work if you roll back (database is backward compatible).

---

## Getting Help

If you encounter issues:

1. **[Settings Changes](./Settings-Changes.md)** - Update your configuration
2. **[Breaking Changes](./Breaking-Changes.md)** - Review important changes
3. **[New Features](./New-Features.md)** - Learn what's new
4. **[FAQ](../FAQ.md)** - Common questions answered
5. **[GitHub Issues](https://github.com/Stirling-Tools/Stirling-PDF/issues)** - Report problems
6. **[Discord](https://discord.gg/Cn8pWhQRxZ)** - Community support

---

## Summary

**Upgrading is easy:**
1. Back up your `/configs` folder
2. Pull latest Docker image (or download desktop app)
3. Start with existing configuration
4. Review [Settings Changes](./Settings-Changes.md) for any needed updates
5. Check [Breaking Changes](./Breaking-Changes.md) if you have customizations

**Welcome to V2!** Enjoy the faster, more modern Stirling-PDF experience.
