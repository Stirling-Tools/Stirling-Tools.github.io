---
sidebar_position: 2
title: Certificate signing
description: Sign PDFs with a digital certificate, check existing signatures and add trusted timestamps.
sidebar_label: Certificate signing
---

# Certificate signing

A certificate signature proves who signed a PDF and shows if anyone changes it afterwards.

On a self-hosted server, an admin sets up the server certificate, which certificate authorities count as trusted, revocation checks and the allowed timestamp servers ([Signing certificates and trust](../../Server/Security/Signing.md)).

## Sign with a certificate

1. Open your PDF and pick **Sign with Certificate**.
2. In **Certificate source**, choose where the certificate comes from. This step only appears when there is more than one option.
   - **Upload** - your own certificate file.
   - **Server** - your organisation's certificate, held on the server.
   - **This device** - a certificate on your computer or a USB token. Desktop app only, see [On the desktop app](#on-the-desktop-app).
3. For **Upload**, pick the **Certificate Format**, then add your files under **Certificate Files** and enter the **Certificate Password** if there is one.

   | Format | Files |
   |---|---|
   | PKCS12 or PFX | One `.p12` or `.pfx` file |
   | PEM | A private key (`.pem`, `.der`, `.key`) and a certificate (`.pem`, `.der`, `.crt`, `.cer`) |
   | JKS | A Java keystore (`.jks`, `.keystore`) |

4. In **Signature Appearance**, choose **Invisible** or **Visible**. For a visible signature, set **Reason**, **Location**, **Name**, **Page Number** and **Logo** (**No Logo** or **Show Logo**).
5. Click **Sign PDF**.

- Expired or not-yet-valid certificates are refused.
- PDF viewers show self-signed certificates as unverified.
- For proof of when the file was signed, run [Timestamp PDF](#timestamping-pdfs) afterwards.

## On the desktop app

The desktop app can sign with a certificate in the Windows certificate store, or on a USB token or smart card (PKCS#11). This works in **Local Only** and **Stirling Cloud** mode.

1. In **Certificate source**, choose **This device**.
2. Choose the type:
   - **Windows certificate store** (Windows only) - pick a **Certificate** from the list. Windows asks for your PIN when you sign.
   - **USB Token** - pick the **PKCS#11 driver**, enter the **Token PIN**, set **Slot (optional)** if needed, then click **List certificates** and pick one.

:::warning
Tokens lock after a few wrong PINs. Check your PIN before you click **List certificates**.
:::

Common drivers (OpenSC, YubiKey, SoftHSM2) are found automatically. For any other driver, set the `STIRLING_PKCS11_LIBRARIES` environment variable to its full path (comma-separated for several) and restart the app.

## Validating signatures

1. Open the signed PDF and pick **Validate PDF Signature**.
2. Optional: under **Custom Certificate File X.509 (Optional)**, add a certificate (`.cer`, `.crt`, `.pem` or `.der`) to check the signatures against. It replaces the usual trusted certificate authorities for that check.
3. Click **Validate Signatures**.

Each signature gets a status:

- **Valid** - the signature is intact and the signer's certificate is trusted.
- **Valid, signer not verified** (**Unverified** in lists) - the signature is intact, but a trust check failed. The result lists why.
- **Invalid** - the cryptographic check failed.

You can download the results as a PDF report, CSV or JSON.

## Timestamping PDFs

**Timestamp PDF** adds a trusted RFC 3161 timestamp that proves the PDF existed at a point in time.

1. Open the PDF and pick **Timestamp PDF**.
2. In **Select a TSA server**, pick a Time Stamp Authority: DigiCert, Sectigo, SSL.com, FreeTSA, MeSign, or one your admin added. DigiCert is the default unless your admin changed it.
3. Click **Apply Timestamp**.

Only a hash of the document goes to the timestamp server. Existing signatures stay intact.
