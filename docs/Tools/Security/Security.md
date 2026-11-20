---
sidebar_position: 0
description: Tools for signing PDFs, protecting them with passwords and permissions, and checking or removing signatures.
title: Signing and security tools
sidebar_label: Overview
---

# Signing and security tools

## Signing

- **[Sign](./Sign.md)** - draw, type or upload a signature and place it on the page.
- **[Request signatures](./Request-Signatures.md)** - collect signatures from several people on one document.
- **[Sign with Certificate](./Certificate-Signing.md)** - add a digital signature that proves who signed. Also covers **Timestamp PDF** and **Validate PDF Signature**.

## Document security

- **[Add Password](./Add-Password.md)** - require a password to open the PDF.
- **[Change Permissions](./Change-Permissions.md)** - allow or block printing, copying, editing and other actions.
- **[Add Watermark](./Watermark.md)** - repeat text or an image across every page.
- **[Add Stamp to PDF](../Editing/Add-Stamp.md)** - add a text or image stamp at a set position.
- **[Sanitize](./Sanitize.md)** - remove JavaScript, embedded files, links, metadata and fonts.
- **[Flatten](./Flatten.md)** - turn form fields and other interactive parts into plain page content.
- **[Unlock PDF Forms](./Unlock-Forms.md)** - make read-only form fields fillable again.

## Verification

- **[Get ALL Info on PDF](./Get-PDF-Info.md)** - a full report on a PDF's details, security, fonts and pages.
- **[Check PDF accessibility](./Accessibility-Check.md)** - check a PDF against PDF/UA without changing it.

## Removal

- **[Remove Password](./Remove-Password.md)** - unlock a protected PDF when you know its password.
- **[Remove Certificate Sign](./Remove-Certificate-Sign.md)** - strip digital signatures, for example so you can edit a signed file.

To black out text or areas for good, use [Redact](../Guides/Redact.md).

## Protected PDFs

When you add a password-protected PDF, enter its password to open it for this session. The file stays protected, and tools that support it keep its passwords and permissions in the result. To save an unprotected copy, choose **Create an unprotected copy**.

## Signed PDFs

If your admin turns on **Block changes to signed PDFs**, digitally signed PDFs show **Signed: edits blocked**. You can still view, print, convert and sign them again, but tools that would change them refuse.
