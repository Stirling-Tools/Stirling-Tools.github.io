---
sidebar_position: 1
---
# UI Customisation

Stirling PDF allows custommization of system and security settings
For security please note this section is only enabled if you are using the security jar, for docker that means setting ``DOCKER_ENABLE_SECURITY`` to ``true``  via a environment variable
- ``enableLogin`` This enables or disables the login functionality with
- ``csrfDisabled`` The description to be displayed on the homepage under the navbar that first greets the user
and
- ``defaultLocale`` The app name to be shown within to navbar for all pages
- ``googlevisibility`` The app name to be shown within to navbar for all pages


## Settings file
```
security:
  enableLogin: false # set to 'true' to enable login
  csrfDisabled: true

system:
  defaultLocale: 'en-US' # Set the default language (e.g. 'de-DE', 'fr-FR', etc)
  googlevisibility: false # 'true' to allow Google visibility (via robots.txt), 'false' to disallow
```

## Local 
If running Java directly, you can also pass these as properties using `-D` arguments such as:
```
java -jar Stirling-PDF.jar -DAPP_HOME_NAME="New Application Name"
```

Alternatively you can set these via environment variables by running before starting the application
```
export UI_APP_NAME="Stirling PDF"
export UI_HOME_DESCRIPTION="Your locally hosted one-stop-shop for all your PDF needs."
export UI_APP_NAVBAR_NAME="Stirling PDF"
```

## Docker

### Docker run
```
-e UI_APP_NAME=Stirling PDF \
-e UI_HOME_DESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs. \
-e UI_APP_NAVBAR_NAME=Stirling PDF \
```

### Docker Compose
```
environment:
  UI_APP_NAME: Stirling PDF
  UI_HOME_DESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.
  UI_APP_NAVBAR_NAME: Stirling PDF
```