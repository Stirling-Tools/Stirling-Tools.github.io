---
sidebar_position: 4
id: Shared-Signing
title: Shared Signing
description: Collaborative multi-participant PDF signing workflows with digital certificates and wet signatures
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Shared Signing

:::warning[Alpha Feature]
Shared Signing is currently in **alpha**. Functionality may change, and some features are incomplete. Use in production at your own risk.
:::

Shared Signing lets a document owner send a PDF to multiple registered users for signing. Each participant reviews the document, applies their signature, and submits it back. The owner tracks progress and finalizes the document once all signatures are collected.

This is a **Pro/Enterprise** feature.

---

## What You Can Do

- **Invite multiple signers** -- add registered users as participants to a signing session
- **Flexible signing options** -- participants can use the server certificate, their personal certificate, or upload their own (P12, JKS, PEM)
- **Handwritten signatures** -- participants can draw, type, or upload a wet signature overlay and place it on any page
- **Track progress** -- see who has signed, viewed, or declined in real time
- **Summary page** -- optionally append a page to the final PDF listing all signers, timestamps, and details
- **Data cleanup** -- sensitive signature and certificate data is automatically cleared from the server after finalization

---

## Prerequisites

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true

    storage:
      enabled: true
      signing:
        enabled: true

    system:
      frontendUrl: https://your-stirling-instance.com
      serverCertificate:
        enabled: true
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    SECURITY_ENABLELOGIN=true
    STORAGE_ENABLED=true
    STORAGE_SIGNING_ENABLED=true
    SYSTEM_FRONTENDURL=https://your-stirling-instance.com
    SYSTEM_SERVERCERTIFICATE_ENABLED=true
    ```
  </TabItem>
</Tabs>

---

## How It Works

### Step 1: Create a Signing Session

1. Open a PDF in the viewer
2. Click the **Sign** button in the Quick Access Bar
3. Click the **+** button next to **Signature Requests**
4. Add participants by selecting registered users
5. Optionally set a due date and configure signature display preferences
6. Review and submit

**Session options:**

| Option | What it does |
|--------|-------------|
| **Signature visibility** | Choose whether the digital signature block is visible on the PDF or embedded invisibly |
| **Signature page number** | Which page to place the signature block on |
| **Reason** | A reason for signing (e.g., "Approved", "I agree to these terms") |
| **Location** | Where the signing is taking place (e.g., "New York") |
| **Show logo** | Includes the organization logo in the signature block |
| **Include summary page** | Appends a page at the end listing all signers and their details |

### Step 2: Participants Review and Sign

Participants see pending sign requests under the **Sign** button in the Quick Access Bar after logging in.

From there they can:
1. **Review** the document and session details (due date, signature preferences)
2. **Choose a certificate** to sign with:

| Certificate Option | Description | Requires Upload? |
|-------------------|-------------|-----------------|
| **Server Certificate** | Your organization's certificate | No |
| **Personal Certificate** | Auto-generated for the participant | No |
| **P12 / PKCS12 / PFX** | Participant's own certificate file | Yes (+ password) |
| **JKS** | Java KeyStore file | Yes (+ password) |
| **PEM** | PEM certificate + private key | Yes |

3. **Add wet signatures** (optional) -- draw, type, or upload a handwritten signature and position it on any page. Multiple signatures can be placed across different pages.
4. **Submit** their signature

Once submitted, the participant's status changes to **Signed** and they can no longer modify their submission.

Participants can also **decline** to sign, which marks their status as **Declined**.

### Step 3: Track Progress

The session owner can monitor progress from the Quick Access Bar or the session detail view:

- **Signature count** shown as "X/Y signatures" (e.g., "3/5 signatures")
- **Color-coded badges**: Blue (none signed), Yellow (some signed), Green (all signed -- ready to finalize)
- **Per-participant status**: Pending, Viewed, Signed, or Declined

The status auto-refreshes every 15 seconds.

### Step 4: Finalize

Once you've collected the signatures you need, click **Finalize** to produce the signed PDF.

:::warning
Finalization is a one-time operation. Participants who haven't signed will be skipped. Make sure you have all the signatures you need before finalizing.
:::

**What happens when you finalize:**

1. All wet signature images are applied to the PDF at the positions each participant chose
2. If enabled, a summary page is appended showing each participant's name, email, status, timestamp, reason, and certificate type
3. Each participant's digital certificate is applied to the document
4. The signed PDF is saved and available for download
5. Sensitive data (signature images, certificate files, passwords) is permanently cleared from the server

### Step 5: Download the Signed PDF

After finalization, download the completed PDF from the session detail view or the **Completed Sessions** panel. The PDF contains all digital certificate signatures and wet signature overlays embedded in the document.

---

## Security

- **One-time signing** -- after signing or declining, participants are automatically downgraded to read-only access and cannot re-sign
- **Certificate validation** -- uploaded certificates are validated at submission time. Trust chain validation is configurable (see [Certificate Signing](./Certificate-Signing.md))
- **Audit trail** -- all participant actions are recorded (viewed, signed, declined) with timestamps
- **Post-finalization cleanup** -- wet signature images, certificate files, and passwords are permanently removed from the database after finalization. Only the final signed PDF is retained

---

## Configuration Reference

### Signing Settings

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    storage:
      enabled: true
      signing:
        enabled: true              # Master switch for shared signing

    system:
      frontendUrl: https://your-instance.com
      serverCertificate:
        enabled: true
        organizationName: My Company
        validity: 365              # Certificate validity in days
        regenerateOnStartup: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    STORAGE_ENABLED=true
    STORAGE_SIGNING_ENABLED=true
    SYSTEM_FRONTENDURL=https://your-instance.com
    SYSTEM_SERVERCERTIFICATE_ENABLED=true
    SYSTEM_SERVERCERTIFICATE_ORGANIZATIONNAME="My Company"
    SYSTEM_SERVERCERTIFICATE_VALIDITY=365
    ```
  </TabItem>
</Tabs>

### Certificate Validation Settings

```yaml
security:
  validation:
    trust:
      serverAsAnchor: true       # Trust server-generated certificates
      useSystemTrust: true       # Trust OS certificate store
      useMozillaBundle: true     # Trust Mozilla CA bundle
    revocation:
      mode: none                 # Options: none, ocsp, crl, ocsp+crl
      hardFail: false            # Fail if revocation check is inconclusive
```

See [Certificate Signing - Configuration](./Certificate-Signing.md#configuration-examples) for detailed trust chain configuration.

---

## Known Limitations

- Participants must be registered users with accounts on your Stirling PDF instance
- Finalization can only be done once -- a session cannot be re-opened afterwards
- Each session covers a single document
- Digital certificates are applied in participant order during finalization
- The signature summary page is English-only

---

## Troubleshooting

### Signature not appearing on the finalized PDF
- Double-check the certificate type and password were entered correctly
- Check the Stirling PDF server logs for signing errors
- Make sure the source PDF is not corrupted or password-protected

### Progress count not updating
- The dashboard auto-refreshes every 15 seconds -- wait a moment and check again
- Check your browser's network tab for failed API requests

### Wet signatures missing after finalization
- Make sure the page numbers used are within the document's page range (pages start at 0)

### "Storage is disabled" when creating a session
- Verify `storage.enabled: true` and `security.enableLogin: true` in your configuration

---

## API Reference

For users who want to integrate with the signing workflow programmatically, the full API endpoints are listed below. See [API Documentation](../../API.md) for details.

### Owner Endpoints (Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/security/cert-sign/sessions` | Create signing session |
| GET | `/api/v1/security/cert-sign/sessions` | List your sessions |
| GET | `/api/v1/security/cert-sign/sessions/{id}` | Get session details |
| GET | `/api/v1/security/cert-sign/sessions/{id}/pdf` | Download original PDF |
| POST | `/api/v1/security/cert-sign/sessions/{id}/finalize` | Finalize and generate signed PDF |
| GET | `/api/v1/security/cert-sign/sessions/{id}/signed-pdf` | Download signed PDF |
| DELETE | `/api/v1/security/cert-sign/sessions/{id}` | Delete session |
| POST | `/api/v1/security/cert-sign/sessions/{id}/participants` | Add participants |
| DELETE | `/api/v1/security/cert-sign/sessions/{id}/participants/{pid}` | Remove participant |

### Participant Endpoints (Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/security/cert-sign/sign-requests` | List your sign requests |
| GET | `/api/v1/security/cert-sign/sign-requests/{id}` | Get sign request details |
| GET | `/api/v1/security/cert-sign/sign-requests/{id}/document` | Download document to review |
| POST | `/api/v1/security/cert-sign/sign-requests/{id}/sign` | Sign the document |
| POST | `/api/v1/security/cert-sign/sign-requests/{id}/decline` | Decline to sign |

---

## Related

- [File Sharing and Storage](../../Configuration/File%20Sharing%20and%20Storage.md) -- Configure storage, sharing, and quotas
- [Certificate Signing](./Certificate-Signing.md) -- Individual certificate signing and validation
- [Sign (Handwritten)](./Sign.md) -- Non-cryptographic visual signatures
- [System and Security Settings](../../Configuration/System%20and%20Security.md) -- Server certificates, JWT, sessions
