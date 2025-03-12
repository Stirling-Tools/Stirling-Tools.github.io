---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UI Customisation

Stirling PDF allows straightforward customization of the application name and appearance to make Stirling-PDF your own.

## Application Name Settings
These settings control the visible application name:
- `appName` - Defines the visible application name shown in the window name and navbar if navbar is not defined separately
- `homeDescription` - The description displayed on the homepage under the navbar that first greets the user
- `appNameNavbar` - The app name shown within the navbar for all pages

## Show update notifications
These settings (in Settings.yml) control system behavior and customization capabilities:
- `showUpdate` - Controls whether update notifications are displayed
- `showUpdateOnlyAdmin` - When true, restricts update notifications to admin users only (requires `showUpdate: true`)


## System Configuration
``customHTMLFiles`` In Settings.yml Enables custom HTML file overrides (called fragments) when set to true

## Custom Files
When `customHTMLFiles` is enabled, you can override the default templatesby placing your custom files in specific directories. The system uses a resource override mechanism where files in these custom directories take precedence over the default files.

### Directory Structure
```
customFiles/
├── static/          # Static assets (CSS, JS, images, etc.)
└── templates/       # HTML template files
```

### File Locations
The root path for custom files varies by installation type:
- **Default/Docker Installation**: `./customFiles/`
- **Windows Desktop**: `%APPDATA%\Stirling-PDF\customFiles\`
- **MacOS Desktop**: `~/Library/Application Support/Stirling-PDF/customFiles/`
- **Linux Desktop**: `~/.config/Stirling-PDF/customFiles/`

### Override Examples
To override existing files, maintain the same directory structure as the original. Here are some examples with links to the original files you would be overriding:

To override a file:
1. Navigate to the original file in the GitHub repository
2. Copy its contents
3. Create the same file path under your `customFiles` directory following the same directory structure
4. Paste and modify the contents as needed

Note: When overriding templates, first copy the existing template from the [source repository](https://github.com/Stirling-Tools/Stirling-PDF/tree/main/src/main/resources/templates) to maintain the base structure.

1. To replace the favicon:
   ```
   customFiles/static/favicon.svg
   ```
   Original file: [src/main/resources/static/favicon.svg](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/src/main/resources/static/favicon.svg)

2. To override a Bootstrap icon font:
   ```
   customFiles/static/css/fonts/bootstrap-icons.woff
   ```
   Original file: [src/main/resources/static/css/fonts/bootstrap-icons.woff](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/src/main/resources/static/css/fonts/bootstrap-icons.woff)

3. To modify a template:
   ```
   customFiles/templates/fragments/common.html
   ```
   Original file: [src/main/resources/templates/fragments/common.html](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/src/main/resources/templates/fragments/common.html)

The original files can be found in the GitHub repository under:
- Static files: [src/main/resources/static/](https://github.com/Stirling-Tools/Stirling-PDF/tree/main/src/main/resources/static)
- Templates (HTML files): [src/main/resources/templates/](https://github.com/Stirling-Tools/Stirling-PDF/tree/main/src/main/resources/templates)




## Configuration Examples

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    ui:
      appName: exampleAppName # Application's visible name
      homeDescription: I am a description # Short description or tagline shown on homepage
      appNameNavbar: navbarName # Name displayed on the navigation bar

    system:
      showUpdate: false # Control update notification visibility
      showUpdateOnlyAdmin: false # Restrict update notifications to admins
      customHTMLFiles: false # Enable custom HTML/CSS overrides
    ```
  </TabItem>
  <TabItem value="local" label="Local Environment">
    You can configure the UI and system settings in two ways when running locally:

    **Option 1: Using Java Properties**
    ```bash
    java -jar Stirling-PDF.jar \
      -DAPP_HOME_NAME="New Application Name" \
      -DSHOW_UPDATE=false \
      -DSHOW_UPDATE_ONLY_ADMIN=false \
      -DCUSTOM_HTML_FILES=true
    ```

    **Option 2: Using Environment Variables**
    ```bash
    export UI_APPNAME="Stirling PDF"
    export UI_HOMEDESCRIPTION="Your locally hosted one-stop-shop for all your PDF needs."
    export UI_APPNAVBARNAME="Stirling PDF"
    export SYSTEM_SHOWUPDATE=false
    export SYSTEM_SHOWUPDATEONLYADMIN=false
    export SYSTEM_CUSTOMHTMLFILES=true
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e UI_APPNAME=Stirling PDF \
    -e UI_HOMEDESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs. \
    -e UI_APPNAVBARNAME=Stirling PDF \
    -e SYSTEM_SHOWUPDATE=false \
    -e SYSTEM_SHOWUPDATEONLYADMIN=false \
    -e SYSTEM_CUSTOMHTMLFILES=true
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      UI_APPNAME: Stirling PDF
      UI_HOMEDESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.
      UI_APPNAVBARNAME: Stirling PDF
      SYSTEM_SHOWUPDATE: "false"
      SYSTEM_SHOWUPDATEONLYADMIN: "false"
      SYSTEM_CUSTOMHTMLFILES: "true"
    volumes:
      - ./customFiles:/app/customFiles # Mount custom files directory
    ```
  </TabItem>
</Tabs>
