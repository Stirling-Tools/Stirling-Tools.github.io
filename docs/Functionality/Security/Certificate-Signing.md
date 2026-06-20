---
sidebar_position: 2
id: Certificate-Signing
title: Certificate Signing
description: Sign and validate PDF certificates
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Certificate Signing

Digitally sign PDFs with X.509 certificates and validate existing signatures against trusted certificate chains.

---

## Signing PDFs

<Tabs>
  <TabItem value="server" label="Server Certificate" default>
    Easiest option  - uses an auto-generated server certificate. No setup needed for users.

    1. Go to **Certificate Sign** tool
    2. Upload PDF
    3. Select "Sign with Stirling PDF"
    4. Configure signature appearance (optional)
    5. Sign and download

    **Configuration:**

    <Tabs groupId="config-methods">
      <TabItem value="settings" label="Settings File">
        ```yaml
        system:
          serverCertificate:
            enabled: true
            organizationName: Stirling-PDF
            validity: 365
            regenerateOnStartup: false
        ```
      </TabItem>
      <TabItem value="env" label="Environment Variable">
        ```bash
        SYSTEM_SERVERCERTIFICATE_ENABLED=true
        SYSTEM_SERVERCERTIFICATE_ORGANIZATIONNAME="My Company"
        SYSTEM_SERVERCERTIFICATE_VALIDITY=365
        ```
      </TabItem>
    </Tabs>
  </TabItem>
  <TabItem value="custom" label="Custom Certificate">
    Use your own X.509 certificate (PKCS#12 `.p12`/`.pfx` or PEM format).

    1. Go to **Certificate Sign** tool
    2. Upload PDF
    3. Select "Upload Certificate"
    4. Upload certificate file and enter password
    5. Configure signature appearance
    6. Sign and download

    ```bash
    # Generate a test certificate
    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

    # Convert to PKCS#12
    openssl pkcs12 -export -out mycert.p12 -inkey key.pem -in cert.pem
    ```
  </TabItem>
  <TabItem value="org" label="Organization Certificate">
    Place your organization certificate in the configs directory so all users can sign without uploading their own:

    ```bash
    configs/
      └── keystore.p12
    ```

    ```yaml
    system:
      serverCertificate:
        enabled: false  # Disable auto-generation
    ```

    ```bash
    KEYSTORE_PASSWORD=your-password
    ```

    Users will see a "Sign with [Organization Name]" option.
  </TabItem>
</Tabs>

---

### Signature Appearance

**Visible:** Appears as a box on the PDF page with configurable position, size, page, and displayed text (name, date, reason).

**Invisible:** Embedded in PDF metadata only, not visible on the page.

---

## Validating Signatures

Verify that a PDF was signed by the claimed certificate, the certificate is trusted, the PDF hasn't been modified, and the certificate hasn't been revoked.

### Trust Sources

| Source | Config Key | What It Trusts |
|--------|-----------|----------------|
| Server certificates | `serverAsAnchor` | PDFs signed by your Stirling PDF instance |
| System trust store | `useSystemTrust` | OS-trusted CAs |
| Mozilla CA bundle | `useMozillaBundle` | Mozilla's curated CA list |
| Adobe AATL | `useAATL` | Adobe Approved Trust List |
| EU EUTL | `useEUTL` | EU Trusted List (eIDAS) |

### Revocation Checking

Certificates can be revoked (invalidated) after they're issued  - for example if a private key is compromised. Revocation checking lets Stirling PDF verify that a certificate is still valid at the time of use.

```yaml
security:
  validation:
    revocation:
      mode: none       # Options: none, ocsp, crl, ocsp+crl
      hardFail: false
```

| Mode | What it does |
|------|-------------|
| `none` | Skip revocation checks entirely |
| `ocsp` | Check in real-time against the certificate authority's server (requires internet) |
| `crl` | Download a list of revoked certificates (can work offline with cached lists) |
| `ocsp+crl` | Try real-time check first, fall back to the list if that fails |

**`hardFail`** controls what happens when the revocation check itself fails (e.g. server unreachable):
- `false` (default)  - validation passes with a warning
- `true`  - validation fails entirely. Use this in high-security environments where you'd rather reject a signature than skip the check.

---

## Timestamping PDFs

A trusted timestamp (RFC 3161) proves a PDF existed at a particular point in time. Stirling PDF contacts a trusted Time Stamp Authority (TSA) server and embeds a document timestamp into the PDF. Only a SHA-256 hash of the document is sent to the TSA - the PDF itself never leaves the server.

Use the **Timestamp PDF** tool (`timestamp-pdf` endpoint), pick a TSA, and download the timestamped file. The timestamp is added as an incremental update, so existing signatures stay intact.

### Trusted Time Stamp Authorities

The `tsaUrl` must be one of the built-in presets or an admin-configured URL. Built-in presets:

| Provider | URL |
|----------|-----|
| DigiCert | `http://timestamp.digicert.com` |
| Sectigo | `http://timestamp.sectigo.com` |
| SSL.com | `http://ts.ssl.com` |
| FreeTSA | `https://freetsa.org/tsr` |
| MeSign | `http://tsa.mesign.com` |

If `tsaUrl` is omitted, the server default is used (DigiCert by default). Administrators can allow additional TSA servers and set the default in `settings.yml`:

```yaml
security:
  timestamp:
    defaultTsaUrl: http://timestamp.digicert.com
    customTsaUrls:
      - https://tsa.example.com/timestamp
```

### API Usage

```bash
# tsaUrl is optional; omit to use the server default
curl -X POST http://stirling-pdf:8080/api/v1/security/timestamp-pdf \
  -F "fileInput=@document.pdf" \
  -F "tsaUrl=http://timestamp.digicert.com" \
  -o timestamped.pdf
```

---

## Configuration Examples

<Tabs>
  <TabItem value="minimal" label="Minimal (Default)">
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
  </TabItem>
  <TabItem value="enterprise" label="Enterprise">
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
  </TabItem>
  <TabItem value="high-security" label="High-Security">
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
  </TabItem>
  <TabItem value="eidas" label="EU eIDAS">
    ```yaml
    security:
      validation:
        trust:
          serverAsAnchor: false
          useSystemTrust: false
          useMozillaBundle: false
          useAATL: false
          useEUTL: true
        eutl:
          lotlUrl: https://ec.europa.eu/tools/lotl/eu-lotl.xml
          acceptTransitional: true
        allowAIA: false
        revocation:
          mode: ocsp+crl
          hardFail: true
    ```
  </TabItem>
</Tabs>

---

## API Usage

<Tabs>
  <TabItem value="sign-server" label="Sign (Server Cert)">
    ```bash
    # certType must be one of PEM, PKCS12, PFX, JKS, SERVER (uppercase)
    curl -X POST http://stirling-pdf:8080/api/v1/security/cert-sign \
      -F "fileInput=@document.pdf" \
      -F "certType=SERVER" \
      -F "reason=Approved" \
      -F "location=London" \
      -F "showSignature=true" \
      -F "pageNumber=1" \
      -o signed.pdf
    ```
  </TabItem>
  <TabItem value="sign-custom" label="Sign (Custom Cert)">
    ```bash
    # PKCS12/PFX use p12File; JKS uses jksFile; PEM uses privateKeyFile + certFile
    curl -X POST http://stirling-pdf:8080/api/v1/security/cert-sign \
      -F "fileInput=@document.pdf" \
      -F "certType=PKCS12" \
      -F "p12File=@mycert.p12" \
      -F "password=certpass" \
      -o signed.pdf
    ```
  </TabItem>
  <TabItem value="validate" label="Validate">
    ```bash
    curl -X POST http://stirling-pdf:8080/api/v1/security/validate-signature \
      -F "fileInput=@signed.pdf"
    ```
  </TabItem>
</Tabs>

See [API Documentation](../../API.md) for complete endpoint reference.

---

## Troubleshooting

### "Certificate not trusted"
Enable the appropriate trust source in config, or add your CA certificate to the system trust store:
```bash
docker cp ca-cert.crt stirling-pdf:/usr/local/share/ca-certificates/
docker exec stirling-pdf update-ca-certificates
```

### Revocation check fails
Check that the container has HTTPS access to OCSP/CRL servers. Use `hardFail: false` or switch to `crl` mode for restricted networks.

### Server certificate not generated
Ensure `SYSTEM_SERVERCERTIFICATE_ENABLED=true` is set. Check logs with `docker logs stirling-pdf | grep -i certificate`.

---

## Related

- [System and Security Settings](../../Configuration/System%20and%20Security.md#signature-validation)
- [Sign (Handwritten)](./Sign.md)
- [Settings Changes](../../Migration/Settings-Changes.md#pdf-signature-validation)
