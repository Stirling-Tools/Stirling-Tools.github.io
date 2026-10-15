---
sidebar_position: 2
title: OAuth2 / OIDC single sign-on
sidebar_label: OAuth / OIDC SSO
description: Let users sign in to your server with Google, GitHub, Keycloak, Authentik or any OpenID Connect provider, and choose between OAuth and SAML.
---

# OAuth2 / OIDC single sign-on

<Badge>Login required</Badge>

OAuth2 / OIDC works on every plan. For SAML (Enterprise), see [SAML single sign-on](./SAML-SSO.md).

## Before you start

- If you use a reverse proxy, make it forward the `X-Forwarded-Proto`, `X-Forwarded-Host` and `X-Forwarded-Port` headers ([nginx example](../Production.md#example-nginx)). The callback URL is built from the address the browser used. If your proxy can't send these headers, set a [redirect base URL](#behind-a-proxy-that-hides-the-public-url).
- The callback (redirect) URL to register with your provider is `https://pdf.example.com/login/oauth2/code/<provider>`, where `<provider>` is `google`, `github`, `keycloak`, or your `security.oauth2.provider` value for any other provider. It must match exactly.

## Set up single sign-on

1. Register Stirling PDF as an application with your provider, using the callback URL above. Copy the client ID and client secret.
2. Add the provider in **Settings → Server → Sign-in & security**, under **Unlinked Services**, or in `settings.yml` (see [Provider settings](#provider-settings)).
3. Restart Stirling PDF.
4. In a private browser window, open the login page and select **Sign in with** your provider. With `autoCreateUser: true`, the first sign-in creates the account.
5. Sign in as an admin with your password, open **Settings → Workspace → Users** and set the new user's role to **Admin**.

:::warning
To turn off password sign-in, set `security.loginMethod: oauth2` and restart, but only after an SSO user has the Admin role. Otherwise nobody can reach the admin settings.
:::

## Provider settings

Every provider uses these shared settings:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      oauth2:
        enabled: true
        autoCreateUser: true      # create an account on first sign-in
        blockRegistration: false  # true = only users an admin has already added can sign in
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_OAUTH2_ENABLED=true
    SECURITY_OAUTH2_AUTOCREATEUSER=true
    SECURITY_OAUTH2_BLOCKREGISTRATION=false
    ```
  </TabItem>
</Tabs>

:::warning
With the defaults, anyone who can sign in to your provider gets an account and uses a seat. For GitHub, and Google with an **External** consent screen, that is anyone with an account. Limit sign-in at the provider, or set `blockRegistration: true` and add people first in **Settings → Workspace → Users → Invite people → Create account directly**, with **Sign-in method** set to **OAuth2 / SSO**.
:::

Add one or more of the providers below under `security.oauth2`. Each configured provider gets its own sign-in button.

### Google

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      oauth2:
        client:
          google:
            clientId: <client-id>
            clientSecret: <client-secret>
            scopes: email, profile
            useAsUsername: email   # email, name, given_name or family_name
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_OAUTH2_CLIENT_GOOGLE_CLIENTID=<client-id>
    SECURITY_OAUTH2_CLIENT_GOOGLE_CLIENTSECRET=<client-secret>
    SECURITY_OAUTH2_CLIENT_GOOGLE_SCOPES="email, profile"
    SECURITY_OAUTH2_CLIENT_GOOGLE_USEASUSERNAME=email
    ```
  </TabItem>
</Tabs>

In the [Google Cloud Console](https://console.cloud.google.com/), configure the OAuth consent screen, then create an **OAuth client ID** of type **Web application** with the redirect URI `https://pdf.example.com/login/oauth2/code/google`.

For Google Workspace, set the consent screen's **User type** to **Internal** so only accounts in your organisation can sign in.

### GitHub

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      oauth2:
        client:
          github:
            clientId: <client-id>
            clientSecret: <client-secret>
            scopes: read:user
            useAsUsername: login   # login, email or name
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_OAUTH2_CLIENT_GITHUB_CLIENTID=<client-id>
    SECURITY_OAUTH2_CLIENT_GITHUB_CLIENTSECRET=<client-secret>
    SECURITY_OAUTH2_CLIENT_GITHUB_SCOPES=read:user
    SECURITY_OAUTH2_CLIENT_GITHUB_USEASUSERNAME=login
    ```
  </TabItem>
</Tabs>

In [GitHub Developer Settings](https://github.com/settings/developers), create a new OAuth App with the authorization callback URL `https://pdf.example.com/login/oauth2/code/github`.

### Keycloak

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      oauth2:
        client:
          keycloak:
            issuer: https://keycloak.example.com/realms/<realm>
            clientId: <client-id>
            clientSecret: <client-secret>
            scopes: openid, profile, email
            useAsUsername: preferred_username   # email, name, given_name, family_name or preferred_username
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_OAUTH2_CLIENT_KEYCLOAK_ISSUER=https://keycloak.example.com/realms/<realm>
    SECURITY_OAUTH2_CLIENT_KEYCLOAK_CLIENTID=<client-id>
    SECURITY_OAUTH2_CLIENT_KEYCLOAK_CLIENTSECRET=<client-secret>
    SECURITY_OAUTH2_CLIENT_KEYCLOAK_SCOPES="openid, profile, email"
    SECURITY_OAUTH2_CLIENT_KEYCLOAK_USEASUSERNAME=preferred_username
    ```
  </TabItem>
</Tabs>

In the Keycloak admin console, create an OpenID Connect client in your realm, turn on **Client authentication**, and add `https://pdf.example.com/login/oauth2/code/keycloak` to the valid redirect URIs. The client secret is on the client's **Credentials** tab.

### Authentik and other OpenID Connect providers

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      oauth2:
        provider: authentik   # lowercase name, used in the callback URL
        issuer: https://authentik.example.com/application/o/stirling-pdf/
        clientId: <client-id>
        clientSecret: <client-secret>
        scopes: openid, profile, email
        useAsUsername: email
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_OAUTH2_PROVIDER=authentik
    SECURITY_OAUTH2_ISSUER=https://authentik.example.com/application/o/stirling-pdf/
    SECURITY_OAUTH2_CLIENTID=<client-id>
    SECURITY_OAUTH2_CLIENTSECRET=<client-secret>
    SECURITY_OAUTH2_SCOPES="openid, profile, email"
    SECURITY_OAUTH2_USEASUSERNAME=email
    ```
  </TabItem>
</Tabs>

`useAsUsername` must be one of `email`, `mail`, `name`, `username`, `preferred_username`, `uid`, `login`, `nickname`, `given_name`, `middle_name`, `family_name`, `preferred_name` or `profile`. Other claims, like `sub`, `upn` or `oid`, stop the server starting.

The issuer must serve `/.well-known/openid-configuration`. For this example the callback URL is `https://pdf.example.com/login/oauth2/code/authentik`. In Authentik, create an **OAuth2/OpenID Provider** with that redirect URI, then an **Application** that uses it.

## Send users straight to the provider

To skip the Stirling PDF login page, turn on **SSO Auto Login** in **Settings → Server → Sign-in & security**, or set `security.ssoAutoLogin: true`. It only redirects when:

- `security.loginMethod` is `oauth2` or `saml2`, and
- exactly one SSO provider is configured.

If an SSO attempt fails, or after a user signs out, the browser shows the login page instead for the rest of that session.

## Behind a proxy that hides the public URL

Some proxies, such as Microsoft Entra application proxy (Azure App Proxy), reach Stirling PDF over plain HTTP without `X-Forwarded-*` headers. The callback URL then starts with `http://` or the internal address, and the provider rejects it (Entra shows `AADSTS50011`).

Set `redirectBaseUrl` to the address users open, including any context path. Needs version 3.2.0 or later.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      oauth2:
        redirectBaseUrl: https://pdf.example.com
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_OAUTH2_REDIRECTBASEURL=https://pdf.example.com
    ```
  </TabItem>
</Tabs>

- Every provider's callback becomes `https://pdf.example.com/login/oauth2/code/<provider>`, whatever address the request arrives on.
- After signing in or out, users return to this address, or to `system.frontendUrl` if that is set.
- Leave it empty to build URLs from each request. A value that isn't a full `http://` or `https://` URL is ignored.

## Troubleshooting

| Problem | Fix |
|---|---|
| Redirect URI error from the provider, or `OAuth2 Authentication error` in the server log | The callback URL registered with the provider must match exactly, including the provider name at the end. If the provider shows an `http://` or internal address, see [Behind a proxy that hides the public URL](#behind-a-proxy-that-hides-the-public-url). |
| Issuer error in the server log at startup | Check that `<issuer>/.well-known/openid-configuration` returns JSON and that the server can reach it. |
| Signed in, but sent to the wrong address | Check the reverse proxy forwards the `X-Forwarded-*` headers, or set `redirectBaseUrl`. |
| No account created | Set `autoCreateUser: true`, or add the user first when `blockRegistration` is `true`. Check you haven't reached your user limit. |
| "Attribute value for 'email' cannot be null" | The provider doesn't send the claim named in `useAsUsername` (common with ADFS and Entra ID). See below. |

To see which claims your provider sends, set `security.oauth2.debugLogging: true` and sign in again; the claims appear in the server log. Pick one that is present for `useAsUsername`, then turn `debugLogging` off, because it logs personal data.

For more detail on the sign-in flow, add this to `configs/custom_settings.yml` and restart:

```yaml
logging:
  level:
    org.springframework.security.oauth2: DEBUG
```
