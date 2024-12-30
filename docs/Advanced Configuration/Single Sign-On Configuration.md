---
sidebar_position: 1
---
# Single Sign-On (SSO) Configuration

Stirling PDF allows login via Single Sign-On (SSO) using OAUTH2 OpenID Connect (OIDC)
These are
- ``oauth2.enabled`` Set this to 'true' to enable login (Note: ``enableLogin`` must also be 'true' for this to work)
- ``oauth2.issuer`` Set this to any provider that supports OpenID Connect Discovery ``/.well-known/openid-configuration`` end-point
- ``oauth2.clientId`` Client ID from your provider
- ``oauth2.clientSecret`` Client Secret from your provider
- ``oauth2.autoCreateUser`` Set this to 'true' to allow auto-creation of non-existing users

The Callback URL (Redirect URL) for entering in your IdP is:  ``https://<striling-pdf.yourdomain>/login/oauth2/code/<oidc-provider>`` eg ``https://<striling-pdf.yourdomain>/login/oauth2/code/keycloak``

It is highly recommended to use a SSL-enabled reverse-proxy, if the application is going to be exposed to the internet.

After the OAUTH2 login is enabled, a new button shows up on the login page as per the screenshot below:

![image](https://github.com/Stirling-Tools/Stirling-PDF/assets/812110/6ec3b233-2eb7-4838-bcc9-f93ca0c21cec)


## Settings file
```
security:
  enableLogin: true # set to 'true' to enable login
  ...
  ...
  oauth2:
    enabled: false # set to 'true' to enable SSO login (Note: enableLogin must also be 'true' for this to work)
    issuer: "" # set to any provider that supports OpenID Connect Discovery (/.well-known/openid-configuration) end-point
    clientId: "" # Client ID from your provider
    clientSecret: "" # Client Secret from your provider
    autoCreateUser: false # set to 'true' to allow auto-creation of non-existing users
```

## Local 
If running Java directly, you can set these via environment variables by running before starting the application
```
export DOCKER_ENABLE_SECURITY=true
export SECURITY_ENABLELOGIN=true
export SECURITY_OAUTH2_ENABLED=true
export SECURITY_OAUTH2_AUTOCREATEUSER=false
export SECURITY_OAUTH2_ISSUER="<issuer-url>"
export SECURITY_OAUTH2_CLIENTID="<client-id>"
export SECURITY_OAUTH2_CLIENTSECRET="<client-secret>"
```

## Docker

### Docker run
```
-e  DOCKER_ENABLE_SECURITY=true \
-e  SECURITY_ENABLELOGIN=true \
-e  SECURITY_OAUTH2_ENABLED=true \
-e  SECURITY_OAUTH2_AUTOCREATEUSER=false \
-e  SECURITY_OAUTH2_ISSUER="<issuer-url>" \
-e  SECURITY_OAUTH2_CLIENTID="<client-id>" \
-e  SECURITY_OAUTH2_CLIENTSECRET="<client-secret>" \
```

### Docker Compose
```
environment:
  DOCKER_ENABLE_SECURITY: true
  SECURITY_ENABLELOGIN: true
  SECURITY_OAUTH2_ENABLED: true
  SECURITY_OAUTH2_AUTOCREATEUSER: false
  SECURITY_OAUTH2_ISSUER: "<issuer-url>"
  SECURITY_OAUTH2_CLIENTID: "<client-id>"
  SECURITY_OAUTH2_CLIENTSECRET: "<client-secret>"
```

# Disable Form Login

Once you successfully enabled Single Sign-on (with OAuth2 or SAML), you might want to disable the form login.
This can be done by changing the ``loginMethod`` setting accordingly to your needs, like so:

## Settings file
```
security:
  ...
  loginMethod: oauth2 # Accepts values like 'all' and 'normal'(only Login with Username/Password), 'oauth2'(only Login with OAuth2) or 'saml2'(only Login with SAML2)
```

## Docker

### Docker run
```
-e  SECURITY_LOGINMETHOD="oauth2" # to enable oauth2 only
```

### Docker Compose
```
environment:
  ...
  SECURITY_LOGINMETHOD: "oauth2" # to enable oauth2 only
```
