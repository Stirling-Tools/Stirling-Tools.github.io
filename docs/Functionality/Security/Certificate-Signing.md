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
    Uses an auto-generated server certificate, so users can sign without uploading their own. This is a Pro/Enterprise feature and must be enabled by an administrator; it is not available on the free self-hosted edition.

    1. Go to **Certificate Sign** tool
    2. Upload PDF
    3. In the **Sign Mode** step, choose **Auto (server)** (shown only when the server certificate feature is enabled)
    4. Configure signature appearance (optional)
    5. Sign and download

    **Configuration (Pro/Enterprise):**

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
    Use your own X.509 certificate. Supported formats: PKCS#12 (`.p12`/`.pfx`), PEM (separate private key + certificate), and JKS. This option is available on every edition, including free self-hosted.

    1. Go to **Certificate Sign** tool
    2. Upload PDF
    3. In the **Sign Mode** step, choose **Manual**, then pick your certificate format
    4. Upload your certificate file(s) and enter the password (if any)
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
    Use a shared organization certificate so all users can sign without uploading their own. This is a Pro/Enterprise feature managed by an administrator; it is not available on the free self-hosted edition.

    An administrator uploads your own `.p12`/`.pfx` keystore (with its password) through the admin server-certificate settings, replacing the auto-generated certificate. The server certificate feature must be enabled:

    ```yaml
    system:
      serverCertificate:
        enabled: true
        organizationName: Acme Corp
    ```

    Once configured, users can choose **Auto (server)** in the **Sign Mode** step to sign with the shared certificate.
  </TabItem>
</Tabs>

---

### Signature Appearance

**Visible:** Appears as a box on a chosen page showing the signer name, signing date, and reason, with an optional logo.

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

Certificates can be revoked (invalidated) after they're issued - for example if a private key is compromised. Revocation checking lets Stirling PDF verify that a certificate is still valid at the time of use.

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
- `false` (default) - validation passes with a warning
- `true` - validation fails entirely. Use this in high-security environments where you'd rather reject a signature than skip the check.

---

## Timestamping PDFs

Use the **Timestamp PDF** tool to add a trusted RFC 3161 timestamp that proves your PDF existed at a particular point in time. Pick a Time Stamp Authority (TSA), then download the timestamped file. The timestamp is added without altering the rest of the file, so any existing signatures stay intact. For a plain-language overview of the tool, see [Security tools - Timestamp PDF](./Security.md#signatures).

### Trusted Time Stamp Authorities

You can pick from the built-in TSA presets below, or your administrator can add more. Built-in presets:

| Provider | URL |
|----------|-----|
| DigiCert | `http://timestamp.digicert.com` |
| Sectigo | `http://timestamp.sectigo.com` |
| SSL.com | `http://ts.ssl.com` |
| FreeTSA | `https://freetsa.org/tsr` |
| MeSign | `http://tsa.mesign.com` |

If you don't choose one, the server default is used (DigiCert by default). Administrators can allow additional TSA servers and change the default in `settings.yml`:

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

:::note
The `system.serverCertificate.*` keys are honoured only on Pro/Enterprise editions. On the free self-hosted edition, setting `enabled: true` has no effect and the **Auto (server)** sign mode stays hidden; use a custom certificate (Manual mode) instead. All `security.validation.*` and `security.timestamp.*` settings apply to every edition.
:::

---

## API Usage

<Tabs>
  <TabItem value="sign-server" label="Sign (Server Cert)">
    ```bash
    # certType must be one of PEM, PKCS12, PFX, JKS, SERVER (uppercase)
    # certType=SERVER requires the Pro/Enterprise server certificate feature to be enabled
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
The server certificate feature requires a Pro/Enterprise license; on the free self-hosted edition it stays disabled regardless of configuration. With a license, ensure `SYSTEM_SERVERCERTIFICATE_ENABLED=true` is set. Check logs with `docker logs stirling-pdf | grep -i certificate`.

---

## Related

- [System and Security Settings](../../Configuration/System%20and%20Security.md#signature-validation)
- [Sign (Handwritten)](./Sign.md)
- [Settings Changes](../../Migration/Settings-Changes.md#pdf-signature-validation)
