---
sidebar_position: 1
---
# How to add Configurations

Stirling PDF allows easy customization of the app.
Includes things like
- Custom application name
- Custom slogans, icons, images, and even custom HTML (via file overrides)


For customisation via variables there are two options for this, either using the settings file ``settings.yml``
This file is located in the ``/configs`` directory and follows standard YAML formatting or directly via environment variables.

Environment variables override their  settings file equivalents 
For example in the settings.yml you have
```
system:
  defaultLocale: 'en-US'
```

To have this via an environment variable you would add each sub section together to form the paramter.
In this case adding ``system`` to ``defaultLocale`` with all caps creating the variable ``SYSTEM_DEFAULTLOCALE`` or ``SYSTEM_DEFAULT_LOCALE``

The Current list of settings is
```
security:
  enableLogin: false # set to 'true' to enable login
  csrfDisabled: true

system:
  defaultLocale: 'en-US' # Set the default language (e.g. 'de-DE', 'fr-FR', etc)
  googlevisibility: false # 'true' to allow Google visibility (via robots.txt), 'false' to disallow

#ui:
#  appName: exampleAppName # Application's visible name
#  homeDescription: I am a description # Short description or tagline shown on homepage.
#  appNameNavbar: navbarName # Name displayed on the navigation bar

endpoints:
  toRemove: [] # List endpoints to disable (e.g. ['img-to-pdf', 'remove-pages'])
  groupsToRemove: [] # List groups to disable (e.g. ['LibreOffice'])

metrics:
  enabled: true # 'true' to enable Info APIs endpoints (view http://localhost:8080/swagger-ui/index.html#/API to learn more), 'false' to disable
```

For more info on the individual entries please see their seperate pages

### Environment only parameters
- ``SYSTEM_ROOT_URI_PATH`` changes the websites root path, ie if set to ``pdf-app`` to application will be viewable at address ``localhost:8080/pdf-app`` instead of ``localhost:8080/``
- ``SYSTEM_CONNECTIONTIMEOUTMINUTES`` to set custom connection timeout values
- ``DOCKER_ENABLE_SECURITY`` to tell docker to download security jar (required as true for authentication and login functionality)

### Local 
If running Java directly outside of docker, you can set these environment variables before starting the app

#### Unix
```
export UI_APP_NAME="Stirling PDF"
```

#### Windows (CMD)
```
export UI_APP_NAME="Stirling PDF"
```

#### Windows (PowerShell)
```
export UI_APP_NAME="Stirling PDF"
```

### Docker
If in docker you can do it via docker run or compose whichever you are using are part of installation.
Simply add these to the end of your script/file

#### Docker run
```
-e UI_APP_NAME=Stirling PDF \
-e UI_HOME_DESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs. \
-e UI_APP_NAVBAR_NAME=Stirling PDF \
```
#### Docker Compose
```
environment:
  UI_APP_NAME: Stirling PDF
  UI_HOME_DESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.
  UI_APP_NAVBAR_NAME: Stirling PDF
```
