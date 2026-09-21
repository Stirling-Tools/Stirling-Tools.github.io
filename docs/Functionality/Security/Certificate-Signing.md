---
sidebar_position: 2
id: Certificate-Signing
title: Certificate Signing
description: Sign PDFs with X.509 certificates and validate existing signatures
tags:
  - Security
  - Signing
  - Self-host
  - Desktop
---

# Certificate Signing

Digitally sign PDFs with X.509 certificates and validate existing signatures against trusted certificate chains.

---

## Signing PDFs

<Tabs>
  <TabItem value="server" label="Server Certificate" default>
    Uses an auto-generated server certificate, so users can sign without uploading their own. Requires a Server or Enterprise license **and** `system.serverCertificate.enabled` set to `true`.

    1. Go to **Sign with Certificate** tool
    2. Upload PDF
    3. In the **Certificate source** step, choose **Server** (shown only when the server certificate feature is enabled)
    4. Configure signature appearance (optional)
    5. Sign and download

    | Key | Env | Default | Purpose |
    |---|---|---|---|
    | `system.serverCertificate.enabled` | `SYSTEM_SERVERCERTIFICATE_ENABLED` | `true` | Enable the server certificate source (still needs a Server or Enterprise license) |
    | `system.serverCertificate.organizationName` | `SYSTEM_SERVERCERTIFICATE_ORGANIZATIONNAME` | `Stirling PDF Inc` | Organisation name written into a generated certificate |
    | `system.serverCertificate.validity` | `SYSTEM_SERVERCERTIFICATE_VALIDITY` | `365` | Lifetime of a generated certificate, in days |
    | `system.serverCertificate.regenerateOnStartup` | `SYSTEM_SERVERCERTIFICATE_REGENERATEONSTARTUP` | `false` | Generate a fresh self-signed certificate on every application start, replacing whatever keystore is already in place |

    The same four fields are editable under **Admin Settings → Features**, in the Server Certificate card. Changes saved there apply on the next application restart.

    :::warning `regenerateOnStartup` destroys an uploaded keystore
    With `regenerateOnStartup: true` an organisation certificate you uploaded is silently replaced by a fresh self-signed one on every start. Leave it `false` (the default) on any instance holding an uploaded keystore.
    :::
  </TabItem>
  <TabItem value="custom" label="Custom Certificate">
    Use your own X.509 certificate. This source is built in and always available.

    | Format | Files you upload | Accepted extensions |
    |---|---|---|
    | PKCS12 | `p12File` | `.p12`, `.pfx` |
    | PFX | `p12File` | `.p12`, `.pfx` |
    | PEM | private key + certificate | key `.pem`, `.der`, `.key`; certificate `.pem`, `.der`, `.crt`, `.cer` |
    | JKS | `jksFile` | `.jks`, `.keystore` |

    1. Go to **Sign with Certificate** tool
    2. Upload PDF
    3. In the **Certificate source** step, choose **Upload**, then pick your certificate format
    4. Upload your certificate file(s) and enter the password (if any)
    5. Configure signature appearance
    6. Sign and download

    To select a specific entry in a multi-entry keystore, call the API with an `alias` form field.

    ```bash
    # Generate a test certificate as PKCS#12
    openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
    openssl pkcs12 -export -out mycert.p12 -inkey key.pem -in cert.pem
    ```
  </TabItem>
  <TabItem value="org" label="Organization Certificate">
    Shared organisation certificate, installed through the admin server-certificate API. Requires a Server or Enterprise license and `ROLE_ADMIN`.

    ```bash
    # Replace the server certificate with your own keystore (.p12 or .pfx only)
    curl -X POST http://stirling-pdf:8080/api/v1/admin/server-certificate/upload \
      -H "X-API-KEY: <admin-api-key>" \
      -F "file=@org-signing.p12" \
      -F "password=keystore-password"
    ```

    | Method | Path | Purpose |
    |---|---|---|
    | `GET` | `/api/v1/admin/server-certificate/info` | Subject, issuer, validity window, and whether a certificate exists |
    | `GET` | `/api/v1/admin/server-certificate/enabled` | Whether the feature is effectively on (config flag **and** license) |
    | `POST` | `/api/v1/admin/server-certificate/upload` | Install a `.p12` or `.pfx` keystore with its password |
    | `POST` | `/api/v1/admin/server-certificate/generate` | Discard the current certificate and generate a fresh self-signed one |
    | `DELETE` | `/api/v1/admin/server-certificate` | Remove the current server certificate |
    | `GET` | `/api/v1/admin/server-certificate/certificate` | Download the public certificate as `server-cert.cer` (DER) |

    Distribute the downloaded `server-cert.cer` to anyone who needs to validate your signatures on a different system, so they can add it as a trust anchor. Once installed, users choose **Server** in the **Certificate source** step to sign with the shared certificate.

    Keep `system.serverCertificate.regenerateOnStartup` at `false`, or the certificate you uploaded is overwritten on every application start.

    Restart the application after uploading, regenerating or deleting the keystore, or validation on this instance will not reflect the change - see [Trust Sources](#trust-sources).
  </TabItem>
  <TabItem value="device" label="This Device (Desktop)">
    Sign with a certificate held on your own machine - a USB token or smart card (PKCS#11), or the Windows certificate store. The private key never leaves the device.

    1. Go to **Sign with Certificate** tool
    2. Upload PDF
    3. In the **Certificate source** step, choose **This device**
    4. Pick the hardware type:
       - **Windows certificate store** (Windows only) - certificates are listed as soon as the step opens, with no PIN. Windows prompts for the PIN when you sign; Stirling PDF never sees it.
       - **USB token** (PKCS#11, Windows/macOS/Linux) - choose the PKCS#11 driver, enter the token PIN, optionally set a slot index, then press **List certificates** and pick one.
    5. Configure signature appearance
    6. Sign and download

    - Expired and not-yet-valid certificates cannot be selected, and signing rejects them for every certificate source.
    - Hardware signing is available inside automations.

    **Requirements**

    - The desktop app. Elsewhere the request fails with *Hardware-backed signing is only available in the Stirling PDF desktop app*.
    - A request from the machine itself: loopback, any-local, or an address bound to one of the host's own network interfaces. A call from elsewhere on the network fails with *Hardware-backed signing can only be used from this device*.

    **PKCS#11 drivers**

    You can only sign with a PKCS#11 driver that Stirling PDF detects at a well-known install path, or one you have explicitly allowed.

    | Driver | Windows | macOS | Linux |
    |---|---|---|---|
    | OpenSC | Yes | Yes | Yes |
    | YubiKey (`ykcs11`) | Yes | Yes | Yes |
    | SoftHSM2 | Yes | Yes | Yes |
    | SafeNet eToken | Yes | No | No |
    | Thales/Gemalto IDPrime | Yes | No | No |

    Add further driver libraries with `STIRLING_PKCS11_LIBRARIES`.

    ```bash
    STIRLING_PKCS11_LIBRARIES=/usr/lib/opensc-pkcs11.so,/opt/vendor/lib/libvendor-pkcs11.so
    ```

    - Takes a list of absolute paths. Comma and semicolon always work as separators, as does the platform path separator.
    - The list is **additive**: configured paths are appended to what was auto-detected, they do not replace it.
    - A configured path that does not exist on disk is silently dropped.

    The **Custom driver path…** field in the picker only accepts a path that is already detected or configured. Any other path is rejected with *PKCS#11 driver is not in the allowed list. Add it via the STIRLING_PKCS11_LIBRARIES setting*, for listing certificates as well as for signing.

    :::warning PIN attempts
    Tokens lock permanently after a small number of failures, so check the PIN before pressing **List certificates**.
    :::

    :::note macOS and Linux
    The macOS Keychain is not a signing source. On macOS and Linux, reach a smart card or token through a PKCS#11 driver such as OpenSC.
    :::
  </TabItem>
</Tabs>

### Signature Appearance

| Mode | Result |
|---|---|
| Visible | Draws a signature box on the page you choose |
| Invisible | No page content, signature is still cryptographic |

- `pageNumber` is 1-indexed. Defaults: **Show signature** off, **Show logo** on, page 1.
- The **Location** value is not drawn in the box.
- **Show logo** overlays a fixed image that ships with the application; it is not a place to supply your own.
- Signing refuses an expired or not-yet-valid certificate, whichever source it came from.
- Signing does not embed an RFC 3161 timestamp. For proof of when the document was signed, run [Timestamp PDF](#timestamping-pdfs) on the signed file afterwards.
- To strip signatures from a PDF, use the **Remove Certificate Sign** tool (`POST /api/v1/security/remove-cert-sign`).

---

## Validating Signatures

The **Validate PDF Signature** tool validates signatures against the configured trust sources. Revocation is off by default (`none`).

The settings panel has a single optional input, **Custom Certificate File X.509 (Optional)**, which accepts `.cer`, `.crt`, `.pem` and `.der`. Results can be downloaded as a PDF report, a CSV, or the raw JSON.

:::warning A custom certificate replaces your trust anchors
Supplying a certificate on the validate request makes it the **only** trust anchor for that call. The configured trust sources are skipped entirely, so a signature that would otherwise validate against the system store will not.
:::

### Trust Sources

| Source | Config Key | What It Trusts |
|--------|-----------|----------------|
| Server certificates | `serverAsAnchor` | PDFs signed by your Stirling PDF instance |
| System trust store | `useSystemTrust` | CAs trusted by the Java runtime's default trust manager |
| Mozilla CA bundle | `useMozillaBundle` | Mozilla's curated CA list |
| Adobe AATL | `useAATL` | Adobe Approved Trust List |
| EU EUTL | `useEUTL` | EU Trusted List (eIDAS) |

### Revocation Checking

| Key | Env | Default | Purpose |
|---|---|---|---|
| `security.validation.revocation.mode` | `SECURITY_VALIDATION_REVOCATION_MODE` | `none` | Which revocation mechanism to use |
| `security.validation.revocation.hardFail` | `SECURITY_VALIDATION_REVOCATION_HARDFAIL` | `false` | Whether an unreachable responder fails validation |

| Mode | What it does |
|------|-------------|
| `none` | Skip revocation checks entirely |
| `ocsp` | Check in real time against the certificate authority's OCSP responder, with no fallback to CRLs |
| `crl` | Prefer certificate revocation lists, with no fallback to OCSP |
| `ocsp+crl` | Try OCSP first, fall back to a CRL |

**`hardFail`**

- `false` (default) - the check soft-fails and validation continues. The signature is reported with revocation status `soft-fail`, shown in the UI as *Valid, signer not verified*
- `true` - the signature is reported as untrusted. Use this where you would rather reject a signature than skip the check

The full configuration reference for these keys lives on the [System and Security](../../Configuration/Security/System%20and%20Security.md#signature-validation) page.

---

## Timestamping PDFs

Use the **Timestamp PDF** tool to add a trusted RFC 3161 timestamp that proves your PDF existed at a particular point in time. Existing signatures stay intact and the document never leaves your server.

### Trusted Time Stamp Authorities

Built-in presets:

| Provider | URL |
|----------|-----|
| DigiCert | `http://timestamp.digicert.com` |
| Sectigo | `http://timestamp.sectigo.com` |
| SSL.com | `http://ts.ssl.com` |
| FreeTSA | `https://freetsa.org/tsr` |
| MeSign | `http://tsa.mesign.com` |

| Key | Env | Default | Purpose |
|---|---|---|---|
| `security.timestamp.defaultTsaUrl` | `SECURITY_TIMESTAMP_DEFAULTTSAURL` | `http://timestamp.digicert.com` | TSA used when the request omits `tsaUrl`. Also added to the allowed set |
| `security.timestamp.customTsaUrls` | - | `[]` | Additional TSA URLs users are permitted to select |

- The allowed set is the five presets plus `defaultTsaUrl` plus `customTsaUrls`, compared case-insensitively.
- Any other URL is rejected with *TSA URL is not in the allowed list. Contact your administrator to add it via settings.yml (security.timestamp.customTsaUrls).*

```bash
# tsaUrl is optional; omit to use the server default
curl -X POST http://stirling-pdf:8080/api/v1/security/timestamp-pdf \
  -F "fileInput=@document.pdf" \
  -F "tsaUrl=http://timestamp.digicert.com" \
  -o timestamped.pdf
```

---

## Configuration Example

High-security validation, on top of the defaults:

```yaml
security:
  validation:
    trust:
      serverAsAnchor: false
      useSystemTrust: true
      useAATL: true
      useEUTL: true
    allowAIA: false
    revocation:
      mode: ocsp+crl
      hardFail: true
```

:::note
`system.serverCertificate.*` requires a Server or Enterprise license; without one the **Server** source stays hidden. `security.validation.*` and `security.timestamp.*` apply everywhere.
:::

---

## API Usage

<Tabs>
  <TabItem value="sign-server" label="Sign (Server Cert)">
    ```bash
    # certType must be one of PEM, PKCS12, PFX, JKS, SERVER, WINDOWS_STORE, PKCS11 (uppercase)
    # certType=SERVER requires a Server or Enterprise license
    curl -X POST http://stirling-pdf:8080/api/v1/security/cert-sign \
      -F "fileInput=@document.pdf" \
      -F "certType=SERVER" \
      -F "reason=Approved" -F "location=London" \
      -F "showSignature=true" -F "pageNumber=1" \
      -o signed.pdf
    ```
  </TabItem>
  <TabItem value="sign-custom" label="Sign (Custom Cert)">
    ```bash
    # PKCS12/PFX use p12File; JKS uses jksFile; PEM uses privateKeyFile + certFile
    curl -X POST http://stirling-pdf:8080/api/v1/security/cert-sign \
      -F "fileInput=@document.pdf" \
      -F "certType=PKCS12" \
      -F "p12File=@mycert.p12" -F "password=certpass" \
      -o signed.pdf
    ```
  </TabItem>
  <TabItem value="sign-device" label="Sign (Device)">
    ```bash
    # Desktop app only; the request must come from the local machine.
    # WINDOWS_STORE selects a cert by alias and takes no PIN; PKCS11 uses pkcs11LibraryPath
    # (+ optional pkcs11Slot), with password as the token PIN.
    curl -X POST http://localhost:8080/api/v1/security/cert-sign \
      -F "fileInput=@document.pdf" \
      -F "certType=PKCS11" \
      -F "pkcs11LibraryPath=/usr/lib/opensc-pkcs11.so" \
      -F "alias=my-signing-key" \
      -F "password=token-pin" \
      -o signed.pdf
    ```

    `alias` is optional for every source over the API. An omitted or unmatched alias falls back to the first entry in the keystore that yields a certificate chain.
  </TabItem>
  <TabItem value="hardware" label="Discover Hardware">
    ```bash
    # What this process can do. Not gated - returns desktop=false off the desktop app.
    curl http://localhost:8080/api/v1/security/cert-sign/hardware/capabilities

    # Windows certificate store (desktop app, local request only)
    curl http://localhost:8080/api/v1/security/cert-sign/hardware/windows-certificates

    # PKCS#11 token (desktop app, local request only). Omit slot for the first
    # slot holding a token.
    curl -X POST http://localhost:8080/api/v1/security/cert-sign/hardware/pkcs11-certificates \
      -H "Content-Type: application/json" \
      -d '{"libraryPath":"/usr/lib/opensc-pkcs11.so","pin":"token-pin"}'
    ```

    Certificates are returned with alias, source, subject, issuer, common names, hex serial number, key algorithm, validity window, and `expired` / `notYetValid` flags. No private key material is ever returned.
  </TabItem>
  <TabItem value="validate" label="Validate">
    ```bash
    # Returns a JSON array with one result per signature found
    curl -X POST http://stirling-pdf:8080/api/v1/security/validate-signature \
      -F "fileInput=@signed.pdf"

    # Optional certFile REPLACES the configured trust anchors for this request
    curl -X POST http://stirling-pdf:8080/api/v1/security/validate-signature \
      -F "fileInput=@signed.pdf" \
      -F "certFile=@issuer.cer"
    ```
  </TabItem>
</Tabs>

See [API Documentation](../../API.md) for complete endpoint reference.

`cert-sign`, `remove-cert-sign`, `timestamp-pdf` and `validate-signature` can be disabled individually or by group - see [Endpoint or Feature Customisation](../../Configuration/Customisation/Endpoint%20or%20Feature%20Customisation.md).

---

## Troubleshooting

### "Certificate not trusted"
Enable the appropriate trust source, or add your CA to the trust store used by the Java runtime. Updating OS CA files alone is not sufficient unless the container/runtime also synchronises them into Java's trust store. Trust sources are loaded during service initialisation; restart the application after changing them.

### Revocation check fails
Check that the container has HTTPS access to OCSP/CRL servers. Use `hardFail: false` or switch to `crl` mode for restricted networks.

### Server certificate not generated
Requires a Server or Enterprise license. Check logs with `docker logs stirling-pdf | grep -i certificate`.

### "This device" is missing from the Certificate source step
- Call `GET /api/v1/security/cert-sign/hardware/capabilities`.
- `desktop: false` means it is not the desktop app.

### "PKCS#11 driver is not in the allowed list"
The driver path you typed is neither auto-detected nor configured. Add its absolute path to `STIRLING_PKCS11_LIBRARIES` and confirm the file exists at exactly that path - a configured path that is missing on disk is dropped without a message.

### "Hardware-backed signing can only be used from this device"
The request reached the server from another host. Hardware signing accepts only loopback, any-local, and addresses bound to the machine's own interfaces.

### Signature shows "Valid, signer not verified"
The cryptography is sound but a trust caveat applies. Check the detail list on the result: an untrusted or self-signed certificate needs the issuer adding as a trust anchor, and a `soft-fail` revocation status means the responder could not be reached.

---

## Related Documentation

- **[System and Security Settings](../../Configuration/Security/System%20and%20Security.md#signature-validation)** - the full configuration reference for server certificates, trust sources, revocation and AIA
- **[Sign](./Sign.md)** - handwritten and visual signatures, and how they differ from a digital signature
- **[Shared Signing](./Shared-Signing.md)** - collecting certificate signatures from several participants on one document
- **[Endpoint or Feature Customisation](../../Configuration/Customisation/Endpoint%20or%20Feature%20Customisation.md)** - disabling `cert-sign`, `remove-cert-sign`, `timestamp-pdf` or `validate-signature`
- **[Modes and Licensing](../../Modes-and-Licensing.md)** - the license tiers and what each one includes
- **[Paid Offerings](../../Paid-Offerings.md)** - the full feature comparison across Free, Server and Enterprise
- **[API documentation](../../API.md)** - complete endpoint reference
