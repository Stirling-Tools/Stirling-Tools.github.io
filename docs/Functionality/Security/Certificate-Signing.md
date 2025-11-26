---
sidebar_position: 2
id: Certificate-Signing
title: Certificate Signing
description: Sign and validate PDF certificates
---

# Certificate Signing

Stirling-PDF provides comprehensive PDF certificate signing and validation capabilities. Digitally sign PDFs with X.509 certificates and validate existing signatures against trusted certificate chains.

---

## Overview

**Two main features:**

1. **Sign PDFs** - Apply digital signatures using certificates
2. **Validate Signatures** - Verify certificate-signed PDFs against trust chains

**Use Cases:**
- Legal document signing
- Contract verification
- Invoice authentication
- Compliance requirements (eIDAS, etc.)
- Enterprise document workflows

---

## Signing PDFs

### Methods

#### 1. Sign with Stirling-PDF (Server Certificate)

**Easiest option** - Use auto-generated server certificate.

**How it works:**
- Server generates self-signed certificate on first startup
- Certificate persists across restarts
- Users sign PDFs with one click
- No certificate management needed

**Use cases:**
- Internal documents
- Non-legal signatures
- Quick signing workflows
- Testing and development

**Steps:**
1. Go to **Certificate Sign** tool
2. Upload PDF
3. Select "Sign with Stirling-PDF"
4. Configure signature appearance (optional):
   - Position on page
   - Size
   - Visible or invisible
   - Text to display
5. Click Sign
6. Download signed PDF

**Configuration:**
```yaml
system:
  serverCertificate:
    enabled: true                    # Enable auto-generation
    organizationName: Stirling-PDF   # Certificate org name
    validity: 365                    # Days until expiration
    regenerateOnStartup: false       # Keep same cert across restarts
```

**Environment Variables:**
```bash
SYSTEM_SERVERCERTIFICATE_ENABLED=true
SYSTEM_SERVERCERTIFICATE_ORGANIZATIONNAME="My Company"
SYSTEM_SERVERCERTIFICATE_VALIDITY=365
```

---

#### 2. Sign with Custom Certificate

**For legal/official documents** - Use your own certificate.

**Requirements:**
- X.509 certificate in PKCS#12 (.p12) or PEM format
- Private key
- Optional: Certificate chain

**Steps:**
1. Go to **Certificate Sign** tool
2. Upload PDF
3. Select "Upload Certificate"
4. Upload your certificate file (.p12, .pfx, or .pem)
5. Enter certificate password
6. Configure signature appearance
7. Click Sign
8. Download signed PDF

**Supported formats:**
- `.p12` / `.pfx` - PKCS#12 (most common)
- `.pem` - PEM-encoded certificate + key
- `.crt` + `.key` - Separate cert and key files

**Example with openssl:**
```bash
# Generate your own certificate (for testing)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

# Convert to PKCS#12 for Stirling-PDF
openssl pkcs12 -export -out mycert.p12 -inkey key.pem -in cert.pem
```

---

#### 3. Server-Managed Custom Certificates

**For admins** - Provide organization certificate for all users.

**How to set up:**
1. Place certificate in configs directory:
   ```bash
   configs/
     └── keystore.p12
   ```

2. Configure in settings.yml:
   ```yaml
   system:
     serverCertificate:
       enabled: false  # Disable auto-generation
   ```

3. Set certificate password via environment variable:
   ```bash
   KEYSTORE_PASSWORD=your-password
   ```

**Users see:**
- "Sign with [Organization Name]" option
- No need to upload certificate
- Consistent signing across organization

---

### Signature Appearance

Configure how signature appears on PDF:

#### Visible Signature

Signature appears as box on PDF page.

**Options:**
- **Position:** X/Y coordinates or page location (top-left, center, etc.)
- **Size:** Width and height in points
- **Page:** Which page(s) to sign
- **Text:** Name, date, reason displayed
- **Image:** Optional signature image

**Example configuration:**
```yaml
Signature:
  Position: Bottom-Right
  Page: Last
  Size: 200x100 points
  Display:
    - Signer Name
    - Sign Date
    - Reason: "Approved"
```

#### Invisible Signature

Signature embedded in PDF metadata, not visible.

**Use cases:**
- Digital timestamping
- Authentication without visual mark
- Multiple signatures on same document

---

### Signing Multiple PDFs

**Batch signing** - Sign multiple PDFs with same certificate.

**Methods:**

1. **Multi-Tool:**
   - Upload multiple PDFs
   - Apply certificate sign operation
   - All PDFs signed with same cert
   - Download as zip

2. **Pipeline (Automation):**
   ```json
   {
     "name": "Sign Documents",
     "pipeline": [
       {
         "operation": "cert-sign",
         "parameters": {
           "certType": "server",
           "reason": "Approved",
           "location": "bottom-right"
         }
       }
     ]
   }
   ```

---

## Validating Signatures

### What is Signature Validation?

Verify that:
- ✅ PDF was signed by claimed certificate
- ✅ Certificate is trusted (in trust chain)
- ✅ Certificate was valid at signing time
- ✅ PDF has not been modified since signing
- ✅ Certificate has not been revoked

### Trust Chains

Stirling-PDF checks multiple trust sources:

#### 1. Server-Generated Certificates
```yaml
security:
  validation:
    trust:
      serverAsAnchor: true  # Trust server-generated certs
```

**Use case:** Trust PDFs signed by your Stirling-PDF instance.

---

#### 2. System Trust Store
```yaml
security:
  validation:
    trust:
      useSystemTrust: true  # Use OS certificate store
```

**What it includes:**
- Operating system's trusted CA certificates
- Certificates added by system administrator
- Standard public CAs (Let's Encrypt, DigiCert, etc.)

**Use case:** Trust certificates from public certificate authorities.

---

#### 3. Mozilla CA Bundle
```yaml
security:
  validation:
    trust:
      useMozillaBundle: true  # Mozilla's curated CA list
```

**What it includes:**
- Mozilla's trusted CA certificate bundle
- Regularly updated list of trusted CAs
- Well-maintained, widely trusted

**Use case:** Standard web trust model for PDFs.

---

#### 4. Adobe Approved Trust List (AATL)
```yaml
security:
  validation:
    trust:
      useAATL: true  # Adobe's approved CAs
    aatl:
      url: https://trustlist.adobe.com/tl.pdf
```

**What it includes:**
- Certificate authorities approved by Adobe
- Widely recognized for PDF signing
- Automatically updated from Adobe

**Use case:** Enterprise PDF workflows, Adobe-signed documents.

---

#### 5. EU Trusted List (EUTL)
```yaml
security:
  validation:
    trust:
      useEUTL: true  # EU eIDAS trust list
    eutl:
      lotlUrl: https://ec.europa.eu/tools/lotl/eu-lotl.xml
      acceptTransitional: false  # Accept transitional CAs
```

**What it includes:**
- EU member state trusted service providers
- eIDAS-compliant certificates
- European government and business CAs

**Use case:** EU legal documents, eIDAS compliance, government workflows.

---

### Revocation Checking

Verify certificate has not been revoked:

```yaml
security:
  validation:
    revocation:
      mode: ocsp+crl  # Options: none, ocsp, crl, ocsp+crl
      hardFail: false  # Fail validation if revocation check fails
```

#### Revocation Methods

| Method | Description | Speed | Reliability |
|--------|-------------|-------|-------------|
| **none** | No revocation check | Instant | ⚠️ Not recommended |
| **ocsp** | Online Certificate Status Protocol | Fast | ✅ Real-time |
| **crl** | Certificate Revocation List | Slower | ✅ Works offline |
| **ocsp+crl** | Try OCSP, fall back to CRL | Medium | ✅ Best balance |

#### Hard Fail vs Soft Fail

**Soft Fail (hardFail: false):**
- ✅ Validation succeeds if revocation check unavailable
- ⚠️ Warning shown: "Could not verify revocation status"
- Use when network reliability uncertain

**Hard Fail (hardFail: true):**
- ❌ Validation fails if revocation check unavailable
- ✅ Stricter security
- Use for high-security environments

---

### Authority Information Access (AIA)

Automatically fetch missing intermediate certificates:

```yaml
security:
  validation:
    allowAIA: false  # Enable AIA certificate fetching
```

**What it does:**
- Downloads intermediate certificates from URLs in certificate
- Completes certificate chain automatically
- Makes validation more likely to succeed

**Security consideration:**
- Disabled by default (security best practice)
- Enable only in controlled environments
- Requires outbound HTTPS access

---

## Configuration Examples

### Minimal Configuration (Default)

Works out-of-box for basic signing:

```yaml
system:
  serverCertificate:
    enabled: true

security:
  validation:
    trust:
      serverAsAnchor: true
      useSystemTrust: true
```

**Capabilities:**
- ✅ Sign with server certificate
- ✅ Validate system-trusted signatures
- ✅ No external dependencies

---

### Standard Enterprise Setup

Balanced security and usability:

```yaml
system:
  serverCertificate:
    enabled: true
    organizationName: Acme Corp
    validity: 365

security:
  validation:
    trust:
      serverAsAnchor: true
      useSystemTrust: true
      useMozillaBundle: true
      useAATL: false
    allowAIA: false
    revocation:
      mode: ocsp
      hardFail: false
```

**Capabilities:**
- ✅ Sign with company certificate
- ✅ Validate against multiple trust sources
- ✅ OCSP revocation checking (soft fail)
- ✅ Works in most environments

---

### High-Security Configuration

Strict validation for regulated industries:

```yaml
security:
  validation:
    trust:
      serverAsAnchor: false
      useSystemTrust: true
      useMozillaBundle: true
      useAATL: true
      useEUTL: true
    allowAIA: false
    revocation:
      mode: ocsp+crl
      hardFail: true
```

**Capabilities:**
- ✅ Only trust external CAs (not server-generated)
- ✅ Multiple trust sources (AATL + EUTL)
- ✅ Dual revocation checking
- ✅ Hard fail on revocation check failure
- Use for: Finance, legal, government

---

### EU eIDAS Compliance

For European legal documents:

```yaml
security:
  validation:
    trust:
      serverAsAnchor: false
      useSystemTrust: false
      useMozillaBundle: false
      useAATL: false
      useEUTL: true  # Only EU trusted list
    eutl:
      lotlUrl: https://ec.europa.eu/tools/lotl/eu-lotl.xml
      acceptTransitional: true
    allowAIA: false
    revocation:
      mode: ocsp+crl
      hardFail: true
```

**Capabilities:**
- ✅ eIDAS-compliant validation
- ✅ Only EU member state CAs trusted
- ✅ Strict revocation checking
- Use for: EU contracts, government, regulated industries

---

## Using the Tools

### Certificate Sign Tool

**Location:** Security → Certificate Sign

**Features:**
- Upload PDF(s) to sign
- Choose certificate source
- Configure signature appearance
- Batch signing support
- Preview signature location

**Workflow:**
1. Upload PDF(s)
2. Select certificate:
   - Server certificate
   - Upload custom certificate
   - Use organization certificate (if configured)
3. Configure appearance:
   - Visible or invisible
   - Position and size
   - Text and image
   - Page selection
4. Add metadata:
   - Reason for signing
   - Location
   - Contact info
5. Sign and download

---

### Validate Signature Tool

**Location:** Security → Validate Signature (planned)

**Features:**
- Upload signed PDF
- Check signature validity
- View certificate details
- Check trust chain
- Verify revocation status

**Output:**
```
✅ Signature Valid

Signer: CN=John Doe, O=Acme Corp
Signed: 2025-01-15 10:30:00 UTC
Certificate: RSA 2048-bit

Trust Chain:
  ✅ Acme Corp Root CA
  ✅ Acme Corp Intermediate CA
  ✅ John Doe

Revocation: ✅ Not revoked (OCSP)
Document: ✅ Not modified
```

---

## API Usage

### Sign PDF via API

**Endpoint:** `POST /api/v1/security/cert-sign`

**Example with server certificate:**
```bash
curl -X POST http://stirling-pdf:8080/api/v1/security/cert-sign \
  -F "fileInput=@document.pdf" \
  -F "certType=server" \
  -F "reason=Approved" \
  -F "location=bottom-right" \
  -F "showSignature=true" \
  -o signed.pdf
```

**Example with custom certificate:**
```bash
curl -X POST http://stirling-pdf:8080/api/v1/security/cert-sign \
  -F "fileInput=@document.pdf" \
  -F "certType=custom" \
  -F "certificateFile=@mycert.p12" \
  -F "password=certpass" \
  -F "reason=Contract Approval" \
  -o signed.pdf
```

---

### Validate Signature via API

**Endpoint:** `POST /api/v1/security/validate-signature`

**Example:**
```bash
curl -X POST http://stirling-pdf:8080/api/v1/security/validate-signature \
  -F "fileInput=@signed.pdf" \
  | jq .
```

**Response:**
```json
{
  "valid": true,
  "signer": "CN=John Doe, O=Acme Corp",
  "signDate": "2025-01-15T10:30:00Z",
  "trustChain": [
    "CN=Acme Corp Root CA",
    "CN=Acme Corp Intermediate CA",
    "CN=John Doe"
  ],
  "revocationStatus": "not_revoked",
  "documentModified": false,
  "errors": []
}
```

---

## Troubleshooting

### Signature validation fails

**Symptom:** "Certificate not trusted" error.

**Solutions:**
1. Enable appropriate trust source:
   ```yaml
   security:
     validation:
       trust:
         useSystemTrust: true  # Or useMozillaBundle, useAATL, etc.
   ```

2. Add certificate to system trust store:
   ```bash
   # Copy CA certificate to container
   docker cp ca-cert.crt stirling-pdf:/usr/local/share/ca-certificates/

   # Update trust store
   docker exec stirling-pdf update-ca-certificates
   ```

3. Check certificate chain complete:
   - Ensure intermediate certificates included
   - Or enable AIA fetching (if secure environment)

---

### Revocation check fails

**Symptom:** "Unable to check revocation status" warning.

**Solutions:**
1. Check network access:
   - Container needs HTTPS access to OCSP/CRL servers
   - Check firewall rules
   - Verify DNS resolution

2. Use soft fail:
   ```yaml
   security:
     validation:
       revocation:
         hardFail: false  # Validation succeeds despite revocation check failure
   ```

3. Use CRL instead of OCSP:
   ```yaml
   security:
     validation:
       revocation:
         mode: crl  # CRL more reliable in restricted networks
   ```

---

### Server certificate not generated

**Symptom:** "Sign with Stirling-PDF" option not available.

**Solutions:**
1. Check configuration:
   ```yaml
   system:
     serverCertificate:
       enabled: true  # Must be enabled
   ```

2. Check logs for errors:
   ```bash
   docker logs stirling-pdf | grep -i certificate
   ```

3. Verify write permissions:
   ```bash
   # Ensure configs directory writable
   docker exec stirling-pdf ls -la /configs/
   ```

4. Manually regenerate:
   ```yaml
   system:
     serverCertificate:
       regenerateOnStartup: true  # Force regeneration
   ```
   Restart container, then set back to `false`.

---

### EUTL/AATL not loading

**Symptom:** Validation fails for EUTL/AATL certificates.

**Solutions:**
1. Check network access:
   ```bash
   # Test from container
   docker exec stirling-pdf curl -I https://ec.europa.eu/tools/lotl/eu-lotl.xml
   docker exec stirling-pdf curl -I https://trustlist.adobe.com/tl.pdf
   ```

2. Check configuration URLs:
   ```yaml
   security:
     validation:
       aatl:
         url: https://trustlist.adobe.com/tl.pdf  # Verify correct URL
       eutl:
         lotlUrl: https://ec.europa.eu/tools/lotl/eu-lotl.xml
   ```

3. Check for proxy requirements:
   ```yaml
   # If behind corporate proxy
   system:
     proxy:
       host: proxy.company.com
       port: 8080
   ```

---

## Security Best Practices

### For Signing

1. **Use appropriate certificates:**
   - Server certificates: Internal/testing only
   - Custom certificates: Legal/official documents
   - Organization certificates: Centralized management

2. **Protect private keys:**
   - Use strong passwords for PKCS#12 files
   - Store keys securely (not in Docker image)
   - Rotate certificates regularly

3. **Configure appearance:**
   - Visible signatures for accountability
   - Include signer name, date, reason
   - Position consistently across documents

### For Validation

1. **Enable appropriate trust sources:**
   - System trust: General validation
   - AATL: Adobe ecosystem
   - EUTL: EU legal documents
   - Don't enable all unless needed

2. **Revocation checking:**
   - Always enable for production (at least OCSP)
   - Use hard fail for high-security
   - Use soft fail for reliability

3. **AIA fetching:**
   - Disable by default (security)
   - Only enable in controlled environments
   - Monitor network traffic

4. **Trust chain verification:**
   - Verify full chain to root CA
   - Don't trust self-signed (except server certs for internal use)
   - Check expiration dates

---

## Legal Considerations

**Disclaimer:** Stirling-PDF provides tools for PDF signing and validation. Legal validity depends on jurisdiction and use case.

### When Certificates Are Legally Binding

**Generally accepted:**
- ✅ Certificates from trusted CAs (AATL, EUTL)
- ✅ eIDAS-qualified certificates (EU)
- ✅ Certificates with proof of identity verification
- ✅ Proper timestamping

**May not be legally binding:**
- ⚠️ Self-signed certificates (server-generated)
- ⚠️ Certificates without identity verification
- ⚠️ Expired certificates at signing time

### Compliance

**EU eIDAS:**
- Use EUTL trust list
- eIDAS-qualified certificates
- Qualified timestamping
- Long-term validation (LTV)

**US ESIGN Act:**
- Consent to electronic signatures
- Record retention requirements
- Identity verification

**Consult legal counsel** for your specific requirements.

---

## Learn More

**Configuration:**
- [System and Security Settings](../../Configuration/System%20and%20Security.md#signature-validation) - Technical configuration details
- [Extra Settings](../../Configuration/Extra-Settings.md) - All certificate-related configuration options

**Migration:**
- [Settings Changes](../../Migration/Settings-Changes.md#pdf-signature-validation) - V2 new settings
- [New Features](../../Migration/New-Features.md#-pdf-signature-validation) - Feature overview

**Related Tools:**
- [Sign](./Security.md) - Handwritten/image signatures
- [Add Password](./Security.md) - PDF encryption
- [Permissions](./Security.md) - Access control

---

## Summary

**Stirling-PDF certificate signing provides:**

✅ **Easy signing** - Server certificates work out-of-box
✅ **Custom certificates** - Use your own for legal documents
✅ **Organization certificates** - Centralized cert management
✅ **Comprehensive validation** - Multiple trust sources
✅ **Revocation checking** - OCSP and CRL support
✅ **EU compliance** - eIDAS/EUTL support
✅ **Flexible configuration** - From basic to enterprise
✅ **API access** - Automate workflows

**Perfect for:**
- Internal document workflows
- Legal document signing
- Contract management
- Invoice verification
- Compliance requirements
- Enterprise automation
