---
sidebar_position: 3
description: Guide for upgrading from V1 to V2
---

# Migrating from V1 to V2

:::info Complete Migration Guide
This page provides a quick overview. For comprehensive migration documentation, see the **[Migration Guide](./Migration/Overview)** with detailed sections on:
- [New Features](./Migration/New-Features) - Everything new in V2
- [Settings Changes](./Migration/Settings-Changes) - Complete configuration updates
- [Breaking Changes](./Migration/Breaking-Changes) - Important changes and migration paths
:::

Upgrading to Stirling-PDF V2 is straightforward for most users. This guide helps you understand what's changed and how to make the transition smoothly.

## Should You Upgrade?

**Yes, if you want:**
- ✅ Faster workflows with file persistence
- ✅ Undo/redo functionality
- ✅ Better performance with large files
- ✅ Desktop applications
- ✅ Modern, responsive interface
- ✅ Future features and updates

**Consider staying on V1 if:**
- ⚠️ You heavily customized the UI using `customFiles/templates` (requires code changes to migrate)
- ⚠️ You have specific compatibility requirements with very old browsers

## What's Changed for Users

### New Features You'll Love

1. **Upload Once, Use Everywhere**
   - Files stay in your browser between operations
   - No more re-uploading for each tool
   - Faster multi-step workflows

2. **Undo and Redo**
   - Made a mistake? Just undo it
   - Try different settings and compare results
   - Track, revert, and download any previous version
   - All file history stored locally on your device

3. **Desktop Applications**
   - Native Windows, Mac, and Linux apps
   - Lightning-fast startup (as quick as 0.3 seconds)
   - "Open with Stirling-PDF" from any PDF file
   - Set as your default PDF viewer
   - Work completely offline

4. **Better Performance**
   - Improved handling of large files
   - Better memory management
   - Smoother interface
   - Faster page loads

5. **In-App Settings Management**
   - Configure all settings through the Settings menu (admin only)
   - No need to edit config files or restart
   - Visual interface with validation
   - Changes apply immediately

### What Works the Same

- ✅ All PDF operations and tools
- ✅ API endpoints (integrations continue to work)
- ✅ Authentication and user management
- ✅ Security features
- ✅ Pipeline and automation (now called "Automate" in the frontend with improved UX)
- ✅ Multi-language support
- ✅ Custom settings and configurations
- ✅ Privacy commitment - Your data stays yours, with full control over analytics (see [Analytics and Telemetry](./analytics-telemetry))

## Upgrading Your Installation

### Docker Users (Recommended Method)

Simply update your image tag:

```bash
# Stop current container
docker stop stirling-pdf

# Pull V2.0
docker pull stirlingtools/stirling-pdf:latest

# Start with same configuration
docker start stirling-pdf
```

Or update your docker-compose.yml:

```yaml
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest  # Change from 1.x to latest
    # Keep all your existing environment variables and volumes
    ports:
      - 8080:8080
    volumes:
      - ./data:/configs
      - ./customFiles:/customFiles  # V2 ignores templates, but other files work
    environment:
      # All your existing environment variables still work
      - SECURITY_ENABLELOGIN=true
      - LANGS=en-GB,es-ES,fr-FR
```

Then:
```bash
docker-compose down
docker-compose pull
docker-compose up -d
```

### Desktop Application Users

1. **Windows**: Download new installer, run it (automatically updates)
2. **Mac**: Download new DMG, drag to Applications (replaces old version)
3. **Linux**: Install new .deb/.rpm/.AppImage

Your settings should carry over automatically.

### Manual Installation Users

If you're running Stirling-PDF from the JAR file:

1. Download the latest V2.0 release from [GitHub Releases](https://github.com/Stirling-Tools/Stirling-PDF/releases)
2. Stop the current V1 instance
3. Replace the JAR file
4. Start with the same command

## Data Migration

### Your Data is Safe

V2.0 is **fully compatible** with V1 data:

- ✅ User accounts and permissions
- ✅ API keys
- ✅ Settings and configurations
- ✅ Database (if using external database)
- ✅ Custom OCR language files
- ✅ Custom fonts and certificates

**No manual migration needed** - just upgrade and your data continues working.

### Volume Mounts That Still Work

These volumes work exactly the same in V2:

```yaml
volumes:
  - ./configs:/configs          # Settings and database
  - ./logs:/logs                # Log files
  - ./customFiles/static:/customFiles/static  # Custom images/logos
  - ./tessdata:/usr/share/tessdata  # OCR languages
```

### What Doesn't Work Anymore

❌ **Template customization** - `customFiles/templates/` folder has been replaced

The V1 template override system has been replaced with a new customization approach due to the UI framework change. V2 uses React components instead of HTML templates.

**If you customized templates**, you'll need to:
1. Modify React components in the source code
2. Build the frontend
3. Deploy custom build

See [UI Customisation](./Configuration/UI%20Customisation.md) for alternatives.

## Breaking Changes

### Template Customization System Changed

**V1 Method (replaced in V2):**
```
customFiles/templates/
  ├── home.html         ❌ Replaced with React components
  ├── merge.html        ❌ Replaced with React components
  └── settings.html     ❌ Replaced with React components
```

**V2 Alternatives:**
- Use environment variables for branding
- Use settings panel for theme customization
- For extensive changes, modify React components in source

### Environment Variables (New in V2)

New optional variables you might want to use:

```bash
# Deployment mode (default: BOTH)
MODE=BOTH  # or FRONTEND or BACKEND

# Internal backend port (when MODE=BOTH)
BACKEND_INTERNAL_PORT=8081

# Backend URL (when MODE=FRONTEND)
VITE_API_BASE_URL=http://your-backend:8080
```

**All V1 environment variables still work** - these are additions, not replacements.

## Post-Upgrade Checklist

After upgrading, verify:

- [ ] Can log in with existing credentials
- [ ] All PDF tools work as expected
- [ ] Settings and preferences are retained
- [ ] API integrations still function (if applicable)
- [ ] Custom branding appears correctly
- [ ] OCR languages are available
- [ ] Pipelines and automation continue working

## New Features to Try

After upgrading, explore these V2 features:

1. **Upload a PDF** and try using multiple tools without re-uploading
2. **Use Undo/Redo** - make a change and undo it
3. **Check File Manager** - see all files stored in your browser
4. **Try the Desktop App** - download it for offline work
5. **Explore new interface** - faster and more responsive

## Troubleshooting

### "Files disappeared after refresh"

This is normal V2 behavior. Files are temporarily stored in your browser:
- **Solution**: Download finished files before refreshing
- **Alternative**: Use desktop app for persistent storage

### "My custom template changes are gone"

V2 no longer uses HTML templates:
- **Solution**: Use environment variables for basic customization
- **Alternative**: Modify React source code for extensive changes
- **See**: [UI Customisation](./Configuration/UI%20Customisation.md)

### "Interface looks different"

V2 has a completely new React-based interface:
- **This is expected** - new modern design
- **All features are still there** - just in new locations
- **Tip**: Explore the new interface, it's more intuitive

### "High memory usage"

V2 actually uses less memory than V1 in most cases:
- **Check**: Are you using the right variant? (Standard vs Ultra-Lite)
- **Try**: Disable login if not needed (`SECURITY_ENABLELOGIN=false`)
- **See**: [FAQ - Memory Optimization](./FAQ.md#q6-my-stirling-pdf-using-high-ram-at-idle-how-can-i-optimize-memory-usage)

### "API integration broken"

V2's API is backward compatible:
- **Check**: Endpoint URLs haven't changed
- **Verify**: API keys are still valid
- **Test**: Use the Swagger UI at `/swagger-ui.html`

## Rolling Back (If Needed)

If you need to return to V1:

### Docker
```bash
docker pull stirlingtools/stirling-pdf:1.5.0  # or your previous version
# Update your docker-compose.yml to use 1.5.0 tag
docker-compose up -d
```

### Desktop App
Uninstall V2 and reinstall V1 from [releases](https://github.com/Stirling-Tools/Stirling-PDF/releases/tag/v1.5.0)

### Manual Installation
Replace the JAR file with your previous V1 version.

**Note**: Your data will still work if you roll back - no data migration is needed in either direction.

## Getting Help

If you encounter issues:

1. **Migration Guide**: [Complete Migration Documentation](./Migration/Overview) - Comprehensive upgrade guide
2. **Settings Changes**: [Configuration Updates](./Migration/Settings-Changes) - All setting changes
3. **Breaking Changes**: [What Changed](./Migration/Breaking-Changes) - Important changes
4. **FAQ**: [Frequently Asked Questions](./FAQ) - Common questions answered
5. **Report Issues**: [GitHub Issues](https://github.com/Stirling-Tools/Stirling-PDF/issues)
6. **Join Discord**: Get community help and support

## Deployment Mode Options (Advanced)

V2 allows splitting frontend and backend for advanced deployments:

### Simple Deployment (Default)
```bash
# Everything in one container
docker run -e MODE=BOTH stirlingtools/stirling-pdf:latest
```

### Split Deployment
```bash
# Backend server
docker run -e MODE=BACKEND -p 8080:8080 stirlingtools/stirling-pdf:latest

# Frontend (can run multiple instances)
docker run -e MODE=FRONTEND -e VITE_API_BASE_URL=http://backend:8080 -p 80:80 stirlingtools/stirling-pdf:latest
```

**Use split deployment if:**
- You want to scale frontend and backend independently
- Serving frontend from a CDN
- Running multiple frontends with one backend

**Stick with MODE=BOTH if:**
- Simple single-server deployment
- Don't need independent scaling
- Want easiest setup

See [Docker Installation](./Installation/Docker%20Install.md) for detailed examples.

## Summary

**Upgrading to V2 is easy:**
1. Pull latest Docker image (or download desktop app)
2. Start with your existing configuration
3. Everything continues working
4. Explore new features!

**Key takeaways:**
- ✅ Data is fully compatible
- ✅ API remains unchanged
- ✅ Most customizations still work
- ❌ Template overrides need different approach
- 🎉 Many new features to enjoy

**Welcome to V2!** Enjoy the faster, more modern Stirling-PDF experience.
