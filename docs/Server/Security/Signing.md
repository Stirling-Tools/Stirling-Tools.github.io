---
sidebar_position: 4
title: Signing certificates and trust
sidebar_label: Signing & certificates
description: Server-side signing settings - shared signature images, the server and organisation certificate, signature validation trust, revocation and timestamp servers.
---

# Signing certificates and trust

How people use the tools is in the user guide: [Sign](../../Tools/Security/Sign.md) and [Certificate signing](../../Tools/Security/Certificate-Signing.md).

## Signature images

Signed-in users can keep signatures from the **Sign** tool on the server. They are stored under `customFiles/signatures/`:

| Folder | Filled by | Visible to |
|---|---|---|
| `ALL_USERS/` | Admins with **Save Shared**, or files you copy in | Everyone, including when login is off |
| `<username>/` | That user with **Save Personal**, or files you copy in | That user only |

- Files you copy in must be PNG or JPEG (`.png`, `.jpg`, `.jpeg`).
- Each signature can be up to 2 MB. Each user can save up to 20 personal signatures, 20 MB in total. Shared signatures have no count or total limit.
- In Docker, mount the folder so the files survive updates:

```yaml
volumes:
  - ./customFiles:/customFiles
```

## Server certificate

The server certificate lets users choose **Server** as the certificate source in **Sign with Certificate**, so they can sign without a certificate of their own. It needs a build with login and is on by default. To turn it off, set `system.serverCertificate.enabled: false`.

On first start the server creates a self-signed certificate and keeps it in `configs/server-certificate.p12`. Change it in **Settings → Server → System → Certificate Signing**, or in `settings.yml`. Changes apply after a restart.

| Setting | In the app | Default |
|---|---|---|
| `system.serverCertificate.enabled` | **Enable Certificate Signing** | `true` |
| `system.serverCertificate.organizationName` | **Organization Name** | `Stirling PDF Inc` |
| `system.serverCertificate.validity` | **Certificate Validity (days)** | `365` |
| `system.serverCertificate.regenerateOnStartup` | **Regenerate on Startup** | `false` |

:::warning
With `regenerateOnStartup: true`, the server replaces its certificate on every start, including one you uploaded.
:::

### Use your organisation's certificate

To sign with a certificate from your own certificate authority, replace the generated one with a PKCS#12 keystore (`.p12` or `.pfx`). There is no screen for this, so use the admin API with an admin's API key:

```bash
curl -X POST https://pdf.example.com/api/v1/admin/server-certificate/upload \
  -H "X-API-KEY: <admin-api-key>" \
  -F "file=@org-signing.p12" \
  -F "password=<keystore-password>"
```

| Request | What it does |
|---|---|
| `GET /api/v1/admin/server-certificate/info` | Subject, issuer and validity of the current certificate |
| `GET /api/v1/admin/server-certificate/enabled` | Whether the feature is turned on |
| `POST /api/v1/admin/server-certificate/generate` | Replace the current certificate with a new self-signed one |
| `DELETE /api/v1/admin/server-certificate` | Remove the current certificate |
| `GET /api/v1/admin/server-certificate/certificate` | Download the public certificate as `server-cert.cer` |

Restart after changing the certificate. Give `server-cert.cer` to anyone who needs to trust your signatures in other software.

## Signature validation trust

**Validate PDF Signature** checks each signer's certificate against these trust sources:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      validation:
        trust:
          serverAsAnchor: true    # certificates from this server
          useSystemTrust: true    # the Java runtime's trust store
          useMozillaBundle: true  # the bundled Mozilla CA list
          useAATL: false          # Adobe Approved Trust List, downloaded at startup
          useEUTL: false          # EU Trusted List (eIDAS), downloaded at startup
        aatl:
          url: https://trustlist.adobe.com/tl.pdf
        eutl:
          lotlUrl: https://ec.europa.eu/tools/lotl/eu-lotl.xml
          acceptTransitional: false  # also trust certificates in the 'supervisionincessation' state
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_VALIDATION_TRUST_SERVERASANCHOR=true
    SECURITY_VALIDATION_TRUST_USESYSTEMTRUST=true
    SECURITY_VALIDATION_TRUST_USEMOZILLABUNDLE=true
    SECURITY_VALIDATION_TRUST_USEAATL=false
    SECURITY_VALIDATION_TRUST_USEEUTL=false
    SECURITY_VALIDATION_AATL_URL=https://trustlist.adobe.com/tl.pdf
    SECURITY_VALIDATION_EUTL_LOTLURL=https://ec.europa.eu/tools/lotl/eu-lotl.xml
    SECURITY_VALIDATION_EUTL_ACCEPTTRANSITIONAL=false
    ```
  </TabItem>
</Tabs>

- Trust sources load at startup, so restart after changing them.
- To trust your own certificate authority, add it to the Java runtime's trust store.
- A certificate a user uploads in the tool replaces all of these for that one check.

### Revocation checking

Revocation checks are off by default.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      validation:
        revocation:
          mode: none      # none, ocsp, crl or ocsp+crl
          hardFail: false
        allowAIA: false   # let the server fetch issuer certificates and revocation data from the network
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_VALIDATION_REVOCATION_MODE=none
    SECURITY_VALIDATION_REVOCATION_HARDFAIL=false
    SECURITY_VALIDATION_ALLOWAIA=false
    ```
  </TabItem>
</Tabs>

| `mode` | What it does |
|---|---|
| `none` | No revocation check |
| `ocsp` | Ask the certificate authority's OCSP responder, with no CRL fallback |
| `crl` | Use certificate revocation lists, with no OCSP fallback |
| `ocsp+crl` | Try OCSP first, then a CRL |

If the revocation status can't be found, `hardFail: false` lets validation continue and `hardFail: true` fails it. Checks need outbound access to the OCSP and CRL servers. Only turn on `allowAIA` where outbound requests from the server are acceptable.

## Timestamp servers

**Timestamp PDF** only sends a SHA-256 hash of the document to a time stamp authority (TSA). Users can pick DigiCert, Sectigo, SSL.com, FreeTSA, MeSign, or a server you allow:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      timestamp:
        defaultTsaUrl: http://timestamp.digicert.com   # used when the user doesn't pick one
        customTsaUrls:
          - https://tsa.example.com/timestamp
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_TIMESTAMP_DEFAULTTSAURL=http://timestamp.digicert.com
    SECURITY_TIMESTAMP_CUSTOMTSAURLS=https://tsa.example.com/timestamp   # comma-separated
    ```
  </TabItem>
</Tabs>

Any other URL is rejected with "TSA URL is not in the allowed list".

To turn off individual signing tools, see [Turn features on or off](../Customisation/Features-and-Endpoints.md).
