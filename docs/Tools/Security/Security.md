---
sidebar_position: 0
description: Tools for signing PDFs, protecting them with passwords and permissions, and checking or removing signatures.
title: Signing and security tools
sidebar_label: Overview
---
# Signing and security tools

In the tool picker, these tools sit under **Signing**, **Document Security**, **Verification** and **Removal**.

## Signing

- **Sign** - draw, type or upload a signature and place it on the page. See [Sign](./Sign.md).
- **Sign with Certificate** - add a digital signature that proves who signed and shows if the file is changed later. See [Certificate signing](./Certificate-Signing.md).
- **Timestamp PDF** - add a trusted RFC 3161 timestamp that proves the PDF existed at a point in time. See [Timestamping PDFs](./Certificate-Signing.md#timestamping-pdfs).

## Document security

- **Add Password** - set a **User Password** (needed to open the file) and an **Owner Password** (controls what people can do once it's open).
- **Change Permissions** - allow or block printing, copying, editing, form filling and other actions.
- **Add Watermark** - stamp text or an image across the pages.
- **Add Stamp to PDF** - add a text or image stamp at a set position. See [Content and editing](../Guides/Content-Editing.md).
- **Sanitize** - remove JavaScript, embedded files, links, metadata and fonts.
- **Flatten** - merge form fields and other interactive elements into the page so they can't be edited.
- **Unlock PDF Forms** - make read-only form fields editable again.

## Verification

- **Validate PDF Signature** - check who signed, whether their certificate is trusted and whether the file changed after signing. See [Validating signatures](./Certificate-Signing.md#validating-signatures).
- **Get ALL Info on PDF** - show the PDF version, fonts, page sizes, permissions, metadata and more, as tables or JSON.
- **Check PDF accessibility** - check a PDF against **PDF/UA-1** or **PDF/UA-2** without changing it. Each file gets **Pass**, **Partial** or **Fail**, and **Download accessibility report** saves the results as a PDF.

## Removal

- **Remove Password** - unlock a protected PDF. You need the current password. Permission restrictions are kept.
- **Remove Certificate Sign** - strip digital signatures, for example so you can edit a signed file.

To black out text or areas for good, use [Redact](../Guides/Redact.md).

## Protected PDFs

When you add a password-protected PDF, enter its password to open it for this session. The file stays protected, and tools that support it keep its passwords and permissions in the result. To save an unprotected copy, choose **Create an unprotected copy**.

## Signed PDFs

If your admin turns on **Block changes to signed PDFs**, digitally signed PDFs show **Signed: edits blocked**. You can still view, print, convert and sign them again, and tools that would change them refuse in the web and desktop apps. See [Sign-in and security](../../Server/Security/Sign-in-and-Security.md) for the scope of this setting, including API calls and pipelines.
