---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UI Customisation

Stirling PDF allows straightforward customization of the application name to make Stirling-PDF your own 
These are
- ``appName`` This defines the visible application name showed in the window name and navbar if navbar is not defined separately 
- ``homeDescription`` The description to be displayed on the homepage under the navbar that first greets the user
- ``appNameNavbar`` The app name to be shown within to navbar for all pages


## Configurations Examples

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    ui:
      appName: exampleAppName # Application's visible name
      homeDescription: I am a description # Short description or tagline shown on homepage.
      appNameNavbar: navbarName # Name displayed on the navigation bar
    ```
  </TabItem>
  <TabItem value="local" label="Local Environment">
    You can configure the UI elements in two ways when running locally:

    **Option 1: Using Java Properties**
    ```bash
    java -jar Stirling-PDF.jar -DAPP_HOME_NAME="New Application Name"
    ```

    **Option 2: Using Environment Variables**
    ```bash
    export UI_APP_NAME="Stirling PDF"
    export UI_HOME_DESCRIPTION="Your locally hosted one-stop-shop for all your PDF needs."
    export UI_APP_NAVBAR_NAME="Stirling PDF"
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e UI_APP_NAME=Stirling PDF \
    -e UI_HOME_DESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs. \
    -e UI_APP_NAVBAR_NAME=Stirling PDF \
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      UI_APP_NAME: Stirling PDF
      UI_HOME_DESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.
      UI_APP_NAVBAR_NAME: Stirling PDF
    ```
  </TabItem>
</Tabs>