---
sidebar_position: 3
title: SAML single sign-on
sidebar_label: SAML SSO
description: Connect your server to a SAML 2.0 identity provider such as Okta, Entra ID or OneLogin, with the certificates, URLs and settings it needs.
---

# SAML single sign-on

<Badge>Login required</Badge>

Let users sign in through a SAML 2.0 identity provider (IdP) such as Okta, Microsoft Entra ID (Azure AD), Google Workspace, OneLogin or Authentik. SAML needs an Enterprise licence.

## Before you start

- `/configs` mounted as a volume.
- An active Enterprise licence ([Plans and licences](../Licensing/Plans-and-Licences.md)).
- `system.backendUrl` set to your public URL, such as `https://pdf.example.com`. SAML uses it to build every URL it sends to the IdP. Check that `https://pdf.example.com/api/v1/info/status` loads.
- A reverse proxy, if any, that forwards the `X-Forwarded-Proto`, `X-Forwarded-Host` and `X-Forwarded-Port` headers ([nginx example](../Production.md#example-nginx)).

## 1. Create the certificates

SAML uses three files:

| File | Purpose | Where it comes from |
|---|---|---|
| SP private key | Signs requests Stirling PDF sends to the IdP | You generate it |
| SP certificate | Lets the IdP check those requests | You generate it and upload it to the IdP |
| IdP certificate | Lets Stirling PDF check the IdP's responses | Download it from your IdP, in PEM format |

Generate the key pair if you don't have one:

```bash
openssl req -newkey rsa:2048 -nodes \
  -keyout private_key.key \
  -x509 -days 365 \
  -out certificate.crt \
  -subj "/CN=pdf.example.com"
```

Put all three files in your mounted `configs` folder:

```text
configs/
├── private_key.key        # SP private key, keep it secret
├── certificate.crt        # SP certificate
└── idp-certificate.pem    # IdP certificate, PEM, downloaded from your IdP
```

## 2. Configure Stirling PDF

Set the IdP values from your IdP's SAML app, then restart. You can also enter them in **Settings → Server → Sign-in & security**, under **Unlinked Services → SAML2**.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true
      loginMethod: all
      saml2:
        enabled: true
        provider: Okta                 # shown on the sign-in button as "Okta (SAML 2)"
        registrationId: stirling       # part of every SAML URL below
        autoCreateUser: true           # create an account on first sign-in
        blockRegistration: false       # true = only users an admin has already added can sign in
        idpSingleLoginUrl: https://idp.example.com/saml/login
        idpSingleLogoutUrl: https://idp.example.com/saml/logout
        idpIssuer: https://idp.example.com/entityid
        idpCert: /configs/idp-certificate.pem
        privateKey: /configs/private_key.key
        spCert: /configs/certificate.crt

    system:
      backendUrl: https://pdf.example.com
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_ENABLELOGIN=true
    SECURITY_LOGINMETHOD=all
    SECURITY_SAML2_ENABLED=true
    SECURITY_SAML2_PROVIDER=Okta
    SECURITY_SAML2_REGISTRATIONID=stirling
    SECURITY_SAML2_AUTOCREATEUSER=true
    SECURITY_SAML2_BLOCKREGISTRATION=false
    SECURITY_SAML2_IDPSINGLELOGINURL=https://idp.example.com/saml/login
    SECURITY_SAML2_IDPSINGLELOGOUTURL=https://idp.example.com/saml/logout
    SECURITY_SAML2_IDPISSUER=https://idp.example.com/entityid
    SECURITY_SAML2_IDPCERT=/configs/idp-certificate.pem
    SECURITY_SAML2_PRIVATEKEY=/configs/private_key.key
    SECURITY_SAML2_SPCERT=/configs/certificate.crt
    SYSTEM_BACKENDURL=https://pdf.example.com
    ```
  </TabItem>
</Tabs>

- Use plain file paths such as `/configs/idp-certificate.pem`, without a `file:` prefix.
- `idpMetadataUri` is not used. Copy the login URL, logout URL, issuer and certificate from your IdP's metadata by hand.

## 3. Configure your identity provider

Give your IdP these values (replace `stirling` if you changed `registrationId`):

| IdP field | Value |
|---|---|
| Entity ID / audience | `https://pdf.example.com/saml2/service-provider-metadata/stirling` |
| Assertion Consumer Service (ACS) URL | `https://pdf.example.com/login/saml2/sso/stirling` |
| Signing or verification certificate | the contents of `certificate.crt` |

Many IdPs can import the metadata file instead: download it from `https://pdf.example.com/saml2/service-provider-metadata/stirling`. For single logout, Stirling PDF sends logout requests to `idpSingleLogoutUrl` and expects the response at `https://pdf.example.com/login`.

Set the NameID format to `email` or `unspecified`. The username is taken from the first attribute found in this order: `username`, `emailaddress`, `name`, `upn`, `uid`, then the NameID. Full claim URIs such as `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` also work. Other attributes, such as groups or roles, are not used.

## 4. Test and promote an admin

1. In a private browser window, open Stirling PDF and select **Sign in with** your provider.
2. Sign in at the IdP. You return to Stirling PDF with a new account (if `autoCreateUser` is `true`).
3. Sign in as an admin with your password, open **Settings → Workspace → Users** and set the SAML user's role to **Admin**.
4. Optional: once a SAML user has the Admin role, set `security.loginMethod: saml2` and restart to turn off password sign-in. Doing it earlier leaves nobody able to reach the admin settings.

With `blockRegistration: true`, add people first in **Settings → Workspace → Users → Invite people → Create account directly**, with **Sign-in method** set to **SAML 2.0**.

To send users straight to the IdP without the login page, see [Send users straight to the provider](./OAuth-SSO.md#send-users-straight-to-the-provider).

## Troubleshooting

| Problem | Fix |
|---|---|
| SAML sign-in is refused for licence reasons | Check the Enterprise licence is active ([Plans and licences](../Licensing/Plans-and-Licences.md)). |
| Response signature error in the server log | `idpCert` doesn't match the IdP's signing certificate, is expired, or isn't PEM (it must start with `-----BEGIN CERTIFICATE-----`). Download it again. |
| ACS URL mismatch | Set `system.backendUrl` to the public HTTPS URL, check the proxy forwards the `X-Forwarded-*` headers, and make sure `registrationId` matches the URLs in the IdP. |
| Certificate file not found | Check the file exists at that path inside the container, the `configs` volume is mounted, and the file is readable. |
| No account created | Set `autoCreateUser: true`, or add the user first when `blockRegistration` is `true`. Check you haven't reached your user limit. |
| Redirect loop after sign-in | Clear cookies and check `system.backendUrl` matches the address users open. |
| Back on the login page straight after signing in at the IdP | The username from the assertion isn't valid. Check the IdP sends one of the attributes listed above, or a NameID, containing a plain username or email address. |

To see the attributes your IdP sends and the full SAML flow, add this to `configs/custom_settings.yml` and restart:

```yaml
logging:
  level:
    org.springframework.security.saml2: DEBUG
    org.opensaml: DEBUG
    stirling.software.proprietary.security: DEBUG
```

The log then shows a line starting `Extracted SAML Attributes:` for each sign-in.
