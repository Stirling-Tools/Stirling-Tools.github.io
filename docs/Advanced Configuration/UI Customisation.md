---
sidebar_position: 1
---
# UI Customisation

Stirling PDF allows straightforward customization of the application name to make Stirling-PDF your own 
These are
- ``appName`` This defines the visible application name showed in the window name and navbar if navbar is not defined separately 
- ``homeDescription`` The description to be displayed on the homepage under the navbar that first greets the user
- ``appNameNavbar`` The app name to be shown within to navbar for all pages


## Settings file
```yaml
ui:
  appName: exampleAppName # Application's visible name
  homeDescription: I am a description # Short description or tagline shown on homepage.
  appNameNavbar: navbarName # Name displayed on the navigation bar
```

## Local 
If running Java directly, you can also pass these as properties using `-D` arguments such as:
```
java -jar Stirling-PDF.jar -DAPP_HOME_NAME="New Application Name"
```

Alternatively you can set these via environment variables by running before starting the application
```bash
export UI_APP_NAME="Stirling PDF"
export UI_HOME_DESCRIPTION="Your locally hosted one-stop-shop for all your PDF needs."
export UI_APP_NAVBAR_NAME="Stirling PDF"
```

## Docker

### Docker run
```docker
-e UI_APP_NAME=Stirling PDF \
-e UI_HOME_DESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs. \
-e UI_APP_NAVBAR_NAME=Stirling PDF \
```

### Docker Compose
```yaml
environment:
  UI_APP_NAME: Stirling PDF
  UI_HOME_DESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.
  UI_APP_NAVBAR_NAME: Stirling PDF
```