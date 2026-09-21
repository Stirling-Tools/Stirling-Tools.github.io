---
sidebar_position: 0
id: Overview
title: Migrating from V1 to V2
description: Complete guide for upgrading from Stirling PDF V1 to V2
---

# Migrating from V1 to V2

Upgrading to Stirling PDF V2 is straightforward for most users. This guide will walk you through the upgrade process.

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
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest  # Change from 1.x to latest
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
- ⚠️ You heavily customized UI using Thymeleaf templates in `customFiles/templates/` (requires rewriting for React in V2)
  - **Note:** Static file overrides via `customFiles/static/` still work in V2 - only Thymeleaf templates don't work
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

## Preserve Data Before Upgrading

Back up the database, configuration, OCR language files, fonts and certificates before the first V2 startup. Test the upgrade with a copy of that data and check user access, API integrations and customised settings before replacing the production deployment.

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
- **Cause:** Thymeleaf template system no longer used (V2 uses React)
- **Solution:** Use static file overrides instead via `customFiles/static/` - See [Breaking Changes - UI Customization](./Breaking-Changes#ui-customization-architecture-changed)

**App name not showing**
- **Cause:** `ui.appName` is not supported.
- **Solution:** Use `ui.appNameNavbar` for the browser tab title; see [UI Customisation](../Configuration/Customisation/UI%20Customisation.md).

---

## Rolling Back (If Needed)

Use the exact V1 image and pre-upgrade database/configuration backup recorded before migration. Stop V2 before restoring files; do not assume that a V2-migrated database can be opened by V1.

For a stopped instance with an existing `configs` directory, preserve the current directory before restoring the backup:

```bash
mv ./configs "./configs-before-rollback-$(date +%Y%m%d-%H%M%S)"
cp -a ./configs-backup ./configs
```

This copies the backup as the configuration directory rather than nesting it inside an existing `configs` directory. Restore an external database separately using its tested restore procedure, then start the matching V1 deployment.

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

**Welcome to V2!** Enjoy the faster, more modern Stirling PDF experience.
