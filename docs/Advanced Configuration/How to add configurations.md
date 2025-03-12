---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# How to add Configurations

Stirling PDF allows easy customization of the app.
Includes things like

- Custom application name
- Custom slogans, icons, HTML, images CSS etc (via file overrides)

There are two options for this, either using the generated settings file ``settings.yml``
This file is located in the ``/configs`` directory and follows standard YAML formatting

Environment variables are also supported and would override the settings file
For example in the settings.yml you have

```
security:
  enableLogin: 'true'
```

To have this via an environment variable you would have ``SECURITY_ENABLELOGIN``

The Current list of settings is

```yaml
security:
  enableLogin: false # set to 'true' to enable login
  csrfDisabled: true # Set to 'true' to disable CSRF protection (not recommended for production)
  loginAttemptCount: 5 # lock user account after 5 tries
  loginResetTimeMinutes: 120 # lock account for 2 hours after x attempts
#  initialLogin:
#    username: "admin" # Initial username for the first login
#    password: "stirling" # Initial password for the first login
#  oauth2:
#    enabled: false # set to 'true' to enable login (Note: enableLogin must also be 'true' for this to work)
#    issuer: "" # set to any provider that supports OpenID Connect Discovery (/.well-known/openid-configuration) end-point
#    clientId: "" # Client ID from your provider
#    clientSecret: "" # Client Secret from your provider
#    autoCreateUser: false # set to 'true' to allow auto-creation of non-existing users
#    useAsUsername: "email" # Default is 'email'; custom fields can be used as the username
#    scopes: "openid, profile, email" # Specify the scopes for which the application will request permissions
#    provider: "google" # Set this to your OAuth provider's name, e.g., 'google' or 'keycloak'
#    client:
#      google:
#        clientId: "" # Client ID for Google OAuth2
#        clientSecret: "" # Client Secret for Google OAuth2
#        scopes: "https://www.googleapis.com/auth/userinfo.email, https://www.googleapis.com/auth/userinfo.profile" # Scopes for Google OAuth2
#        useAsUsername: "email" # Field to use as the username for Google OAuth2
#      github:
#        clientId: "" # Client ID for GitHub OAuth2
#        clientSecret: "" # Client Secret for GitHub OAuth2
#        scopes: "read:user" # Scope for GitHub OAuth2
#        useAsUsername: "login" # Field to use as the username for GitHub OAuth2
#      keycloak:
#        issuer: "http://192.168.0.123:8888/realms/stirling-pdf" # URL of the Keycloak realm's OpenID Connect Discovery endpoint
#        clientId: "stirling-pdf" # Client ID for Keycloak OAuth2
#        clientSecret: "" # Client Secret for Keycloak OAuth2
#        scopes: "openid, profile, email" # Scopes for Keycloak OAuth2
#        useAsUsername: "email" # Field to use as the username for Keycloak OAuth2

system:
  defaultLocale: 'en-US' # Set the default language (e.g. 'de-DE', 'fr-FR', etc)
  googlevisibility: false # 'true' to allow Google visibility (via robots.txt), 'false' to disallow
  enableAlphaFunctionality: false # Set to enable functionality which might need more testing before it fully goes live (This feature might make no changes)
  showUpdate: true # see when a new update is available
  showUpdateOnlyAdmin: false # Only admins can see when a new update is available, depending on showUpdate it must be set to 'true'
  customHTMLFiles: false # enable to have files placed in /customFiles/templates override the existing template html files

ui:
  appName: null # Application's visible name
  homeDescription: null # Short description or tagline shown on homepage.
  appNameNavbar: null # Name displayed on the navigation bar

endpoints:
  toRemove: [] # List endpoints to disable (e.g. ['img-to-pdf', 'remove-pages'])
  groupsToRemove: [] # List groups to disable (e.g. ['LibreOffice'])

metrics:
  enabled: true # 'true' to enable Info APIs (`/api/*`) endpoints, 'false' to disable
```

There is an additional config file ``/configs/custom_settings.yml`` were users familiar with java and spring application.properties can input their own settings on-top of Stirling-PDFs existing ones


#### Extra notes
- Endpoints. Currently, the endpoints ENDPOINTS_TOREMOVE and ENDPOINTS_GROUPSTOREMOVE can include comma separate lists of endpoints and groups to disable as example ENDPOINTS_TOREMOVE=img-to-pdf,remove-pages would disable both image-to-pdf and remove pages, ENDPOINTS_GROUPSTOREMOVE=LibreOffice Would disable all things that use LibreOffice. You can see a list of all endpoints and groups [here](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/Endpoint-groups.md)
- customStaticFilePath. Customise static files such as the app logo by placing files in the /customFiles/static/ directory. An example of customising app logo is placing a /customFiles/static/favicon.svg to override current SVG. This can be used to change any images/icons/css/fonts/js etc in Stirling-PDF

### Environment only parameters

- ``SYSTEM_ROOTURIPATH`` ie set to ``/pdf-app`` to Set the application's root URI to ``localhost:8080/pdf-app``
- ``SYSTEM_CONNECTIONTIMEOUTMINUTES`` to set custom connection timeout values
- ``DOCKER_ENABLE_SECURITY`` to tell docker to download security jar (required as true for auth login)
- ``LANGS`` to define custom font libraries to install for use for document conversions

### Local
If running Java directly outside of docker, you can set these environment variables before starting the app:

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix">
    ```bash
    export UI_APPNAME="Stirling PDF"
    ```
  </TabItem>
  <TabItem value="cmd" label="Windows (CMD)">
    ```batch
    set UI_APPNAME=Stirling PDF
    ```
  </TabItem>
  <TabItem value="powershell" label="Windows (PowerShell)">
    ```powershell
    $env:UI_APPNAME = "Stirling PDF"
    ```
  </TabItem>
</Tabs>

## Docker Configuration

If using Docker, you can set environment variables via either Docker run or Docker Compose as part of your installation.
Simply add these to the end of your script/file:

<Tabs groupId="docker-config">
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e "UI_APPNAME=Stirling PDF" \
    -e "UI_HOMEDESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs." \
    -e "UI_APPNAVBARNAME=Stirling PDF" \
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      UI_APPNAME: Stirling PDF
      UI_HOMEDESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.
      UI_APPNAVBARNAME: Stirling PDF
    ```
  </TabItem>
</Tabs>
