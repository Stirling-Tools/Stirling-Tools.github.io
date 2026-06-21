---
sidebar_position: 3
description: Security features for PDFs and deployment configurations
---
# Features - Security

These are the tools you'll find under **Security** in the Stirling PDF app. Open a PDF, pick a tool, set your options, and download the result.

## Password and access

- **Add Password** - lock a PDF with a password. You can set a user password (needed to open the file) and an owner password (controls what people can do once it's open).

- **Remove Password** - unlock a protected PDF. You'll need the current password.

- **Change Permissions** - control what others can do with your PDF: printing, copying, editing, form filling, and more.

- **Flatten** - merge form fields and interactive elements into the page so they can no longer be edited or filled in. Use this to lock down a completed form.

- **Unlock PDF Forms** - reverse the lock on form fields so they can be edited and filled in again.

## Signatures

- **Sign** - add a handwritten, typed, or image signature. Draw with your mouse or touchscreen, type your name, or upload a signature image. For a cryptographic digital signature, use Certificate Sign.

  **Learn more:** [Sign PDF (Handwritten Signatures)](./Sign.md)

- **Certificate Sign** - digitally sign a PDF with an X.509 certificate to prove who signed it and that the document hasn't been changed. Choose **Manual** to upload your own certificate (PEM, PKCS12, or JKS), or **Auto (server)** to sign with the server's certificate (the server certificate requires a Pro or Enterprise license).

  **Learn more:** [Certificate Signing Guide](./Certificate-Signing.md)

- **Shared Signing** *(Pro/Enterprise, Alpha)* - send a PDF to several people to sign. The owner invites registered users, each signs with their own certificate and an optional handwritten signature, and the owner tracks progress and finalizes the document.

  **Learn more:** [Shared Signing Guide](./Shared-Signing.md)

- **Validate PDF Signature** - check the digital signatures in a PDF: confirm who signed it, whether the certificate is trusted, and whether the document was changed after signing.

  **Learn more:** [Certificate Signing - Validation](./Certificate-Signing#validating-signatures)

- **Remove Certificate Sign** - strip digital certificate signatures from a PDF. Handy when you need to edit a document that was already signed.

- **Timestamp PDF** - add a trusted RFC 3161 timestamp that proves your PDF existed at a particular point in time. Stirling PDF contacts a trusted Time Stamp Authority (TSA) and embeds the timestamp. Only a SHA-256 hash of the document is sent to the TSA, so the PDF itself never leaves your server.

  **Learn more:** [Certificate Signing - Timestamping](./Certificate-Signing#timestamping-pdfs)

## Content security

- **Add Watermark** - stamp a text or image watermark across your PDF, with control over spacing, opacity, and rotation.

- **Sanitize** - strip potentially dangerous content such as JavaScript, embedded files, external links, fonts, and metadata. A good first step before sharing untrusted PDFs.

- **Redact** - permanently remove sensitive information. Search for text (or match a pattern) to find and black it out automatically, or draw redaction boxes by hand. The underlying text is removed, not just covered.

## Information

- **Get ALL Info on PDF** - see everything about a PDF: version, fonts, page dimensions, permissions, metadata, and more. View it as tables in the app or export it as JSON.

---

## How signature validation chooses what to trust

When you run **Validate PDF Signature**, your administrator decides which certificate authorities count as trusted and whether to check that certificates haven't been revoked. The trust sources available are the operating system trust store, the Mozilla CA bundle, the Adobe Approved Trust List (AATL), the EU Trusted List (EUTL, for eIDAS), and your own server-generated certificates. Revocation can be checked in real time (OCSP), against a downloaded list (CRL), or both.

For the full list of settings and example configurations, see [Certificate Signing - Configuration](./Certificate-Signing#configuration-examples).

---

## Related Configuration

For advanced security configuration, see:

- **[System and Security Settings](../../Configuration/System%20and%20Security.md)** - JWT, session management, server certificates
- **[Certificate Signing](./Certificate-Signing.md)** - Comprehensive signing and validation guide
- **[Single Sign-On](../../Configuration/Single%20Sign-On%20Configuration.md)** - Enterprise authentication
