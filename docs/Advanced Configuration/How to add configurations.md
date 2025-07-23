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
  csrfDisabled: false # set to 'true' to disable CSRF protection (not recommended for production)
  loginAttemptCount: 5 # lock user account after 5 tries; when using e.g. Fail2Ban you can deactivate the function with -1
  loginResetTimeMinutes: 120 # lock account for 2 hours after x attempts
  loginMethod: all # Accepts values like 'all' and 'normal'(only Login with Username/Password), 'oauth2'(only Login with OAuth2) or 'saml2'(only Login with SAML2)
  initialLogin:
    username: '' # initial username for the first login
    password: '' # initial password for the first login
  oauth2:
    enabled: false # set to 'true' to enable login (Note: enableLogin must also be 'true' for this to work)
    client:
      keycloak:
        issuer: '' # URL of the Keycloak realm's OpenID Connect Discovery endpoint
        clientId: '' # client ID for Keycloak OAuth2
        clientSecret: '' # client secret for Keycloak OAuth2
        scopes: openid, profile, email # scopes for Keycloak OAuth2
        useAsUsername: preferred_username # field to use as the username for Keycloak OAuth2. Available options are: [email | name | given_name | family_name | preferred_name]
      google:
        clientId: '' # client ID for Google OAuth2
        clientSecret: '' # client secret for Google OAuth2
        scopes: email, profile # scopes for Google OAuth2
        useAsUsername: email # field to use as the username for Google OAuth2. Available options are: [email | name | given_name | family_name]
      github:
        clientId: '' # client ID for GitHub OAuth2
        clientSecret: '' # client secret for GitHub OAuth2
        scopes: read:user # scope for GitHub OAuth2
        useAsUsername: login # field to use as the username for GitHub OAuth2. Available options are: [email | login | name]
    issuer: '' # set to any Provider that supports OpenID Connect Discovery (/.well-known/openid-configuration) endpoint
    clientId: '' # client ID from your Provider
    clientSecret: '' # client secret from your Provider
    autoCreateUser: true # set to 'true' to allow auto-creation of non-existing users
    blockRegistration: false # set to 'true' to deny login with SSO without prior registration by an admin
    useAsUsername: email # default is 'email'; custom fields can be used as the username
    scopes: openid, profile, email # specify the scopes for which the application will request permissions
    provider: google # set this to your OAuth Provider's name, e.g., 'google' or 'keycloak'
  saml2:
    enabled: false # Only enabled for paid enterprise clients (enterpriseEdition.enabled must be true)
    provider: '' # The name of your Provider
    autoCreateUser: true # set to 'true' to allow auto-creation of non-existing users
    blockRegistration: false # set to 'true' to deny login with SSO without prior registration by an admin
    registrationId: stirling # The name of your Service Provider (SP) app name. Should match the name in the path for your SSO & SLO URLs
    idpMetadataUri: https://dev-XXXXXXXX.okta.com/app/externalKey/sso/saml/metadata # The uri for your Provider's metadata
    idpSingleLoginUrl: https://dev-XXXXXXXX.okta.com/app/dev-XXXXXXXX_stirlingpdf_1/externalKey/sso/saml # The URL for initiating SSO. Provided by your Provider
    idpSingleLogoutUrl: https://dev-XXXXXXXX.okta.com/app/dev-XXXXXXXX_stirlingpdf_1/externalKey/slo/saml # The URL for initiating SLO. Provided by your Provider
    idpIssuer: '' # The ID of your Provider
    idpCert: classpath:okta.cert # The certificate your Provider will use to authenticate your app's SAML authentication requests. Provided by your Provider
    privateKey: classpath:saml-private-key.key # Your private key. Generated from your keypair
    spCert: classpath:saml-public-cert.crt # Your signing certificate. Generated from your keypair

premium:
  key: 00000000-0000-0000-0000-000000000000
  enabled: false # Enable license key checks for pro/enterprise features
  proFeatures:
    SSOAutoLogin: false
    CustomMetadata:
      autoUpdateMetadata: false
      author: username
      creator: Stirling-PDF
      producer: Stirling-PDF
    googleDrive:
      enabled: false
      clientId: ''
      apiKey: ''
      appId: ''

legal:
  termsAndConditions: https://www.stirlingpdf.com/terms-and-conditions # URL to the terms and conditions of your application (e.g. https://example.com/terms). Empty string to disable or filename to load from local file in static folder
  privacyPolicy: https://www.stirlingpdf.com/privacy-policy # URL to the privacy policy of your application (e.g. https://example.com/privacy). Empty string to disable or filename to load from local file in static folder
  accessibilityStatement: '' # URL to the accessibility statement of your application (e.g. https://example.com/accessibility). Empty string to disable or filename to load from local file in static folder
  cookiePolicy: '' # URL to the cookie policy of your application (e.g. https://example.com/cookie). Empty string to disable or filename to load from local file in static folder
  impressum: '' # URL to the impressum of your application (e.g. https://example.com/impressum). Empty string to disable or filename to load from local file in static folder

system:
  defaultLocale: en-US # set the default language (e.g. 'de-DE', 'fr-FR', etc)
  googlevisibility: false # 'true' to allow Google visibility (via robots.txt), 'false' to disallow
  enableAlphaFunctionality: false # set to enable functionality which might need more testing before it fully goes live (this feature might make no changes)
  showUpdate: false # see when a new update is available
  showUpdateOnlyAdmin: false # only admins can see when a new update is available, depending on showUpdate it must be set to 'true'
  customHTMLFiles: false # enable to have files placed in /customFiles/templates override the existing template HTML files
  tessdataDir: /usr/share/tessdata # path to the directory containing the Tessdata files. This setting is relevant for Windows systems. For Windows users, this path should be adjusted to point to the appropriate directory where the Tessdata files are stored.
  enableAnalytics: null # set to 'true' to enable analytics, set to 'false' to disable analytics; for enterprise users, this is set to true
  enableUrlToPDF: false # Set to 'true' to enable URL to PDF, INTERNAL ONLY, known security issues, should not be used externally
  disableSanitize: false # set to true to disable Sanitize HTML; (can lead to injections in HTML)
  datasource:
    enableCustomDatabase: false # Enterprise users ONLY, set this property to 'true' if you would like to use your own custom database configuration
    customDatabaseUrl: '' # eg jdbc:postgresql://localhost:5432/postgres, set the url for your own custom database connection. If provided, the type, hostName, port and name are not necessary and will not be used
    username: postgres # set the database username
    password: postgres # set the database password
    type: postgresql # the type of the database to set (e.g. 'h2', 'postgresql')
    hostName: localhost # the host name to use for the database url. Set to 'localhost' when running the app locally. Set to match the name of the container name of your database container when running the app on a server (Docker configuration)
    port: 5432 # set the port number of the database. Ensure this matches the port the database is listening to
    name: postgres # set the name of your database. Should match the name of the database you create
  customPaths:
    pipeline:
      watchedFoldersDir: '' #Defaults to /pipeline/watchedFolders
      finishedFoldersDir: '' #Defaults to /pipeline/finishedFolders
    operations:
      weasyprint: '' #Defaults to /opt/venv/bin/weasyprint
      unoconvert: '' #Defaults to /opt/venv/bin/unoconvert
  fileUploadLimit: '' # Defaults to "". No limit when string is empty. Set a number, between 0 and 999, followed by one of the following strings to set a limit. "KB", "MB", "GB".

ui:
  appName: '' # application's visible name
  homeDescription: '' # short description or tagline shown on the homepage
  appNameNavbar: '' # name displayed on the navigation bar
  languages: [] # If empty, all languages are enabled. To display only German and Polish ["de_DE", "pl_PL"]. British English is always enabled.

endpoints:
  toRemove: [] # list endpoints to disable (e.g. ['img-to-pdf', 'remove-pages'])
  groupsToRemove: [] # list groups to disable (e.g. ['LibreOffice'])

metrics:
  enabled: true # 'true' to enable Info APIs (`/api/*`) endpoints, 'false' to disable

processExecutor:
  sessionLimit: # Process executor instances limits
    libreOfficeSessionLimit: 1
    pdfToHtmlSessionLimit: 1
    qpdfSessionLimit: 4
    tesseractSessionLimit: 1
    pythonOpenCvSessionLimit: 8
    weasyPrintSessionLimit: 16
    installAppSessionLimit: 1
    calibreSessionLimit: 1
  timeoutMinutes: # Process executor timeout in minutes
    libreOfficetimeoutMinutes: 30
    pdfToHtmltimeoutMinutes: 20
    pythonOpenCvtimeoutMinutes: 30
    weasyPrinttimeoutMinutes: 30
    installApptimeoutMinutes: 60
    calibretimeoutMinutes: 30
    tesseractTimeoutMinutes: 30
```

There is an additional config file ``/configs/custom_settings.yml`` where users familiar with java and spring application.properties can input their own settings on-top of Stirling-PDFs existing ones. For more info on any custom settings such as SSL or DEBUG mode please check [here](Extra-Settings)


#### Extra notes
- Endpoints. Currently, the endpoints ENDPOINTS_TOREMOVE and ENDPOINTS_GROUPSTOREMOVE can include comma separate lists of endpoints and groups to disable as example ENDPOINTS_TOREMOVE=img-to-pdf,remove-pages would disable both image-to-pdf and remove pages, ENDPOINTS_GROUPSTOREMOVE=LibreOffice Would disable all things that use LibreOffice. You can see a list of all endpoints and groups [here](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/Endpoint-groups.md)
- customStaticFilePath. Customise static files such as the app logo by placing files in the /customFiles/static/ directory. An example of customising app logo is placing a /customFiles/static/favicon.svg to override current SVG. This can be used to change any images/icons/css/fonts/js etc in Stirling-PDF

### Environment only parameters

- ``SYSTEM_ROOTURIPATH`` ie set to ``/pdf-app`` to Set the application's root URI to ``localhost:8080/pdf-app``
- ``SYSTEM_CONNECTIONTIMEOUTMINUTES`` to set custom connection timeout values
- ``DISABLE_ADDITIONAL_FEATURES`` to tell docker to download security jar (required as false for auth login and pro features)
- ``DISABLE_PIXEL`` ``true`` or ``false`` to disable pixel
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
