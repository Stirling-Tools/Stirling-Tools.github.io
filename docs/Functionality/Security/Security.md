---
sidebar_position: 3
description: Security features for PDFs and deployment configurations
---
# Features - Security

## PDF Security Tools

### Password Protection

- **`add-password`**: Secure your PDFs by adding password protection. Supports user passwords (opens PDF) and owner passwords (controls permissions).

- **`remove-password`**: Remove password protection from secured PDFs (requires the original password).

### Permissions & Access Control

- **`change-permissions`**: Control how others can view and edit your PDFs. Set restrictions on printing, copying, editing, form filling, and more.

- **`flatten`**: Flatten PDF form fields by merging them into the document, making them non-editable. Prevents further modifications to form data and interactive elements.

- **`unlock-pdf-forms`**: Unlock form fields in a PDF document, allowing users to edit previously locked form fields and interactive elements.

### Signatures

- **`sign`**: Add handwritten, text, or image signatures to PDFs. Draw signatures with mouse/touchscreen, type your name, or upload signature images. For cryptographic digital signatures, use `cert-sign` instead.

  **Learn more:** [Sign PDF (Handwritten Signatures)](./Sign.md)

- **`cert-sign`**: Digitally sign PDFs using X.509 certificates. Cryptographic signatures that prove identity and document integrity. Supports server-generated certificates, custom certificates, and organization certificates.

  **Learn more:** [Certificate Signing Guide](./Certificate-Signing.md)

- **`validate-signature`**: Verify digital signatures and certificates in PDF documents. Check against trusted certificate chains including system trust, Adobe AATL, EU EUTL, and Mozilla CA bundle.

  **Learn more:** [Certificate Signing - Validation](./Certificate-Signing.md#validating-signatures)

- **`remove-cert-sign`**: Remove digital certificate signatures from PDFs. Useful when you need to edit a signed document.

### Content Security

- **`add-watermark`**: Add custom watermarks to PDFs. Supports text and image watermarks with configurable position, opacity, and rotation.

- **`sanitize-pdf`**: Remove potentially dangerous elements from PDFs including JavaScript, embedded files, external links, fonts, and metadata. Essential for security-conscious workflows.

- **`auto-redact`**: Redact (black out) sensitive information from PDFs. Supports text search and regex patterns to find and permanently remove sensitive content.

### Information & Metadata

- **`get-info-on-pdf`**: Extract comprehensive PDF information including version, fonts, dimensions, permissions, metadata, and more. Output as JSON or visual tables.

---

## Certificate Signature Validation

Stirling-PDF provides enterprise-grade PDF signature validation with configurable trust chains.

### Trust Sources

Configure which certificate authorities to trust:

- **System Trust Store** - Operating system's trusted CAs
- **Mozilla CA Bundle** - Mozilla's curated CA list
- **Adobe AATL** - Adobe Approved Trust List
- **EU EUTL** - EU Trusted List (eIDAS compliance)
- **Server Certificates** - Trust server-generated certificates

### Revocation Checking

Verify certificates haven't been revoked:

- **OCSP** - Online Certificate Status Protocol (fast, real-time)
- **CRL** - Certificate Revocation Lists (works offline)
- **Dual Mode** - Try OCSP first, fall back to CRL

### Configuration

```yaml
security:
  validation:
    trust:
      serverAsAnchor: true      # Trust server-generated certificates
      useSystemTrust: true       # Use OS trust store
      useMozillaBundle: true     # Mozilla CA bundle
      useAATL: false             # Adobe Approved Trust List
      useEUTL: false             # EU Trusted List
    allowAIA: false              # Fetch intermediate certificates
    revocation:
      mode: none                 # Options: none, ocsp, crl, ocsp+crl
      hardFail: false            # Fail if revocation check fails
```

**Learn more:** [Certificate Signing - Configuration](./Certificate-Signing.md#configuration-examples)

---

## CORS Configuration

For split deployments where frontend and backend are on different domains, configure Cross-Origin Resource Sharing (CORS).

### What is CORS?

CORS allows your frontend (e.g., `https://pdf.example.com`) to communicate with a backend on a different domain (e.g., `https://api.example.com`).

### Configuration

```yaml
system:
  corsAllowedOrigins:
    - 'https://pdf.example.com'
    - 'https://pdf.internal.company.com'
```

**Environment Variable:**
```bash
SYSTEM_CORSALLOWEDORIGINS=https://pdf.example.com,https://pdf.internal.company.com
```

### Use Cases

- **Split Deployment** - Separate frontend and backend containers
- **CDN Distribution** - Serve frontend from CDN, backend from server
- **Multiple Frontends** - One backend serving multiple frontend instances
- **Development** - Frontend dev server communicating with backend

### Security Considerations

**✅ Best Practices:**
- Only allow specific, trusted origins
- Never use wildcard (`*`) in production
- Use HTTPS for all origins
- Verify origin headers server-side

**⚠️ Common Mistakes:**
```yaml
# DON'T: Allow all origins (insecure)
corsAllowedOrigins: ['*']

# DO: Specify exact origins
corsAllowedOrigins: ['https://pdf.example.com']
```

**Learn more:**
- [Split Deployment Configuration](../../Advanced%20Configuration/System%20and%20Security.md#cors-configuration)
- [Docker Split Mode](../../Installation/Docker%20Install.md#split-deployment-advanced-users)

---

## Related Configuration

For advanced security configuration, see:

- **[System and Security Settings](../../Advanced%20Configuration/System%20and%20Security.md)** - JWT, session management, server certificates
- **[Certificate Signing](./Certificate-Signing.md)** - Comprehensive signing and validation guide
- **[Single Sign-On](../../Advanced%20Configuration/Single%20Sign-On%20Configuration.md)** - Enterprise authentication
