---
sidebar_position: 0
description: Tools for signing PDFs, protecting them with passwords and permissions, and checking or removing signatures.
title: Signing and security tools
sidebar_label: Overview
---
# Signing and security tools

Use these tools to sign PDFs, control who can open or change them, and check signatures. In the tool picker they sit under **Signing**, **Document Security**, **Verification** and **Removal**.

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

## Removal

- **Remove Password** - unlock a protected PDF. You need the current password.
- **Remove Certificate Sign** - strip digital signatures, for example so you can edit a signed file.

To black out text or areas for good, use [Redact](../Guides/Redact.md).
