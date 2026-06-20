---
sidebar_position: 11
title: Mobile Scanner
description: Scan documents from your mobile phone and upload them directly to your desktop or server
---

# Mobile Scanner (Phone Upload)

The Mobile Scanner lets you scan documents using your phone camera and upload them directly to your Stirling PDF instance. Generate a QR code on your desktop, scan it with your phone, and your photos are transferred automatically  - no cables, no cloud services, no manual file handling. 

Depending on your [server settings](../Configuration/Mobile-Scanner.md), uploaded images can be automatically converted to PDF with configurable page format, resolution, and scaling options.

## How It Works

1. Desktop generates a QR code with a unique session ID
2. Mobile device scans the QR code
3. Mobile uploads photos or images
4. Desktop retrieves files
5. Files auto-delete after 10 minutes of inactivity or upon download

## Using Mobile Scanner in the desktop app

Mobile Scanner also works in the Stirling PDF desktop app with the bundled local backend. A few things differ from the web/server setup:

- Your phone and the desktop must be on the **same local network (LAN)**.
- The QR code encodes the **desktop's LAN IP address** so the phone can reach it directly.
- The desktop serves its own self-contained upload page (enabled by `STIRLING_PDF_TAURI_MODE`) instead of the normal web `/mobile-scanner` route, since a phone can't load the app's bundled webview UI.

## Privacy & Security

- Files stored temporarily in system temp directory only
- No permanent storage on server
- Auto-deleted after 10 minutes
- Works on local network or HTTPS tunnel
- No cloud storage involved

## Configuration

See [Mobile Scanner Configuration](../Configuration/Mobile-Scanner.md) for enable/disable and PDF conversion settings.
