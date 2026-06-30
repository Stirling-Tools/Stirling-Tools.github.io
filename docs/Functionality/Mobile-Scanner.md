---
sidebar_position: 11
title: Mobile Scanner
description: Scan documents from your mobile phone and upload them directly to your desktop or server
---

# Mobile Scanner (Phone Upload)

The Mobile Scanner lets you scan documents with your phone camera and upload them straight to your Stirling PDF instance. Show a QR code on your desktop, scan it with your phone, and your photos transfer automatically - no cables, no cloud services, no manual file handling.

Depending on your [server settings](../Configuration/Mobile-Scanner.md), uploaded images can be automatically converted to PDF with configurable page format, resolution, and scaling options.

## How It Works

1. Desktop generates a QR code with a unique session ID
2. Mobile device scans the QR code
3. Mobile uploads photos or images
4. Desktop retrieves files
5. Files auto-delete after 10 minutes of inactivity or upon download

## Using Mobile Scanner in the desktop app

Mobile Scanner also works in the Stirling PDF desktop app. A couple of things are worth knowing:

- Your phone and the desktop must be on the **same local network (Wi-Fi)**.
- The QR code points to your desktop's address on that network, so your phone connects straight to it. Nothing leaves your local network.
- The desktop upload page is a simple capture-and-send page. It does **not** do the automatic page edge detection and auto-cropping that the browser-based Mobile Scanner offers, so line up and crop your photos before uploading.

## Privacy & Security

- Files stored temporarily in system temp directory only
- No permanent storage on server
- Auto-deleted after 10 minutes
- Works on local network or HTTPS tunnel
- No cloud storage involved

## Configuration

See [Mobile Scanner Configuration](../Configuration/Mobile-Scanner.md) for enable/disable and PDF conversion settings.
