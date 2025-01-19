---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Single Sign-On (SSO) Configuration

Stirling PDF allows login via Single Sign-On (SSO) using OAUTH2 OpenID Connect (OIDC)
These are
- ``oauth2.enabled`` Set this to 'true' to enable login (Note: ``enableLogin`` must also be 'true' for this to work)
- ``oauth2.issuer`` Set this to any provider that supports OpenID Connect Discovery ``/.well-known/openid-configuration`` end-point
- ``oauth2.clientId`` Client ID from your provider
- ``oauth2.clientSecret`` Client Secret from your provider
- ``oauth2.autoCreateUser`` Set this to 'true' to allow auto-creation of non-existing users

Stirling PDF also displays an authentication provider on the button for your end users to press when attempting to login such as Google, Keycloak, or Github. You can also modify the button if you are not using one of those three to a Custom provider by using the below:
- ``oauth2.provider`` Set this to the String value you desire to see on the login screen.

The Callback URL (Redirect URL) for entering in your IdP is:  ``https://<striling-pdf.yourdomain>/login/oauth2/code/<oidc-provider>`` eg ``https://<striling-pdf.yourdomain>/login/oauth2/code/keycloak``
If using a provider such as Authentik, you should replace the ``<oidc-provider>`` with ``oidc`` and not Authentik where it would appear as: ``https://<striling-pdf.yourdomain>/login/oauth2/code/oidc``

For more information on modifying Scopes, if required, see: https://github.com/Stirling-Tools/Stirling-PDF/blob/316b4e42afbac31696dc188bb2de1ab783d47a03/src/main/resources/settings.yml.template#L13-L21

It is highly recommended to use a SSL-enabled reverse-proxy, if the application is going to be exposed to the internet.

After the OAUTH2 login is enabled, a new button shows up on the login page as per the screenshot below:

![image](https://github.com/Stirling-Tools/Stirling-PDF/assets/812110/6ec3b233-2eb7-4838-bcc9-f93ca0c21cec)

## Configurations Examples

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true # set to 'true' to enable login
      oauth2:
        enabled: false # set to 'true' to enable SSO login
        issuer: "" # OpenID Connect Discovery endpoint
        clientId: "" # Client ID from your provider
        clientSecret: "" # Client Secret from your provider
        autoCreateUser: false # auto-creation of users
        provider: name-you-want
    ```
  </TabItem>
  <TabItem value="local" label="Local Environment">
    ```bash
    export DOCKER_ENABLE_SECURITY=true
    export SECURITY_ENABLELOGIN=true
    export SECURITY_OAUTH2_ENABLED=true
    export SECURITY_OAUTH2_AUTOCREATEUSER=false
    export SECURITY_OAUTH2_ISSUER="<issuer-url>"
    export SECURITY_OAUTH2_CLIENTID="<client-id>"
    export SECURITY_OAUTH2_CLIENTSECRET="<client-secret>"
    export SECURITY_OAUTH2_PROVIDER="<name-you-want>"
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e DOCKER_ENABLE_SECURITY=true \
    -e SECURITY_ENABLELOGIN=true \
    -e SECURITY_OAUTH2_ENABLED=true \
    -e SECURITY_OAUTH2_AUTOCREATEUSER=false \
    -e SECURITY_OAUTH2_ISSUER="<issuer-url>" \
    -e SECURITY_OAUTH2_CLIENTID="<client-id>" \
    -e SECURITY_OAUTH2_CLIENTSECRET="<client-secret>" \
    -e SECURITY_OAUTH2_PROVIDER="<name-you-want>" \
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      DOCKER_ENABLE_SECURITY: true
      SECURITY_ENABLELOGIN: true
      SECURITY_OAUTH2_ENABLED: true
      SECURITY_OAUTH2_AUTOCREATEUSER: false
      SECURITY_OAUTH2_ISSUER: "<issuer-url>"
      SECURITY_OAUTH2_CLIENTID: "<client-id>"
      SECURITY_OAUTH2_CLIENTSECRET: "<client-secret>"
      SECURITY_OAUTH2_PROVIDER: "<name-you-want>"
    ```
  </TabItem>
</Tabs>

# Disable Form Login

Once you successfully enabled Single Sign-on (with OAuth2 or SAML), you might want to disable the form login.
This can be done by changing the ``loginMethod`` setting accordingly to your needs, like so:
## Configurations Examples
<Tabs>
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      ...
      loginMethod: oauth2 # Accepts values like 'all' and 'normal'(only Login with Username/Password), 'oauth2'(only
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e SECURITY_LOGINMETHOD="oauth2" # to enable oauth2 only
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      ...
      SECURITY_LOGINMETHOD: "oauth2" # to enable oauth2 only
    ```
  </TabItem>
</Tabs>
