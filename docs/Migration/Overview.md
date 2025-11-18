---
sidebar_position: 0
id: Overview
title: Migrating from V1 to V2
description: Complete guide for upgrading from Stirling-PDF V1 to V2
---

# Migrating from V1 to V2

Upgrading to Stirling-PDF V2 is straightforward for most users. This section helps you understand what changed and how to migrate smoothly.

---

## Quick Migration Guide

### For Docker Users (Most Common)

```bash
# Stop current container
docker stop stirling-pdf

# Pull V2
docker pull stirlingtools/stirling-pdf:latest

# Start with same configuration
docker start stirling-pdf
```

**That's it!** Your data and settings migrate automatically.

---

## Migration Topics

### [New Features in V2](./New-Features.md)
Everything new in V2:
- Browser file storage
- Undo/redo functionality
- Desktop applications
- Split deployment architecture
- PDF signature validation
- Server certificate management
- Enhanced JWT
- And much more...

### [Settings Changes](./Settings-Changes.md)
Configuration changes between V1 and V2:
- New settings added
- Deprecated settings removed
- Settings renamed or reorganized
- Migration examples

### [Breaking Changes](./Breaking-Changes.md)
Important changes that may affect you:
- Template customization system replaced
- UI settings moved to in-app configuration
- Removed features
- API compatibility notes

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

## Data Migration

### Your Data is Safe

V2 is **fully compatible** with V1 data:
- ✅ User accounts and permissions
- ✅ API keys
- ✅ Settings and configurations
- ✅ Database (internal or external)
- ✅ Custom OCR language files
- ✅ Custom fonts and certificates

**No manual migration needed** - just upgrade and your data continues working.

---

## Deployment Options

### Simple Upgrade

Same as V1, everything in one container:
```bash
docker run -d \
  -p 8080:8080 \
  -v ./data:/configs \
  stirlingtools/stirling-pdf:latest
```

### New: Split Deployment (Optional)

V2 allows separating frontend and backend:

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

See [Docker Installation](../Installation/Docker%20Install.md) for details.

---

## Post-Upgrade Checklist

After upgrading, verify:

- [ ] Can log in with existing credentials
- [ ] All PDF tools work as expected
- [ ] Settings and preferences retained
- [ ] API integrations still function (if applicable)
- [ ] Custom branding appears correctly
- [ ] OCR languages available
- [ ] Pipelines continue working (now called "Automate" in UI)

---

## Getting Help

If you encounter issues:

1. **[Settings Changes](./Settings-Changes.md)** - Check if your config needs updates
2. **[Breaking Changes](./Breaking-Changes.md)** - Review what changed
3. **[FAQ](../FAQ.md)** - Common questions answered
4. **[GitHub Issues](https://github.com/Stirling-Tools/Stirling-PDF/issues)** - Report problems
5. **[Discord](https://discord.gg/Cn8pWhQRxZ)** - Community support

---

## Rolling Back (If Needed)

If you need to return to V1:

```bash
docker pull stirlingtools/stirling-pdf:1.5.0
# Update docker-compose.yml to use 1.5.0 tag
docker-compose up -d
```

**Note:** Your data will still work if you roll back.

---

## Next Steps

- **[New Features](./New-Features.md)** - Explore what's new
- **[Settings Changes](./Settings-Changes.md)** - Update your configuration
- **[Getting Started](../Getting%20Started.md)** - Start using V2
