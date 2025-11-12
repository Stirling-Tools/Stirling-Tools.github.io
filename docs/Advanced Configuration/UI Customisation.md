---
sidebar_position: 4
tags: [UI, customisation, feature, advanced feature]
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

## V2.0 UI Customization Notes

### In-App Settings Management (V2.0+)

**New in V2.0**: If you have login enabled and are logged in as an admin, you can now configure all settings directly in the application through the **Settings** menu. No need to edit `settings.yml` manually!

**How to access:**
1. Enable login: `SECURITY_ENABLELOGIN=true`
2. Log in as an admin user
3. Navigate to **Settings** in the application
4. Configure all options through the UI
5. Changes apply immediately

This is the recommended way to manage settings in V2.0 for production deployments.

### Template Customization Changes

**Important**: The V1 `customFiles/` folder system for overriding templates has been replaced with a new customization approach due to the UI framework change in V2.0.

For advanced UI customization in V2.0:
1. Clone or download the repository
2. Modify the React components in the `frontend/src` directory
3. Build the frontend: `cd frontend && npm install && npm run build`
4. Volume mount the `frontend/dist` folder into your Docker container to replace the built-in frontend files

Example docker-compose with custom frontend:
```yaml
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
    ports:
      - '8080:8080'
    volumes:
      - ./frontend/dist:/app/frontend/dist  # Mount your custom frontend
    environment:
      - MODE=BOTH
```

The following customizations work without rebuilding:
- Application name and branding (via environment variables or in-app settings)
- Update notification settings (via in-app settings if admin)
- Language settings (via in-app settings)
- Theme preferences (via in-app settings)

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
    ```
  </TabItem>
  <TabItem value="local" label="Local Environment">
    You can configure the UI and system settings in two ways when running locally:

    **Option 1: Using Java Properties**
    ```bash
    java -jar Stirling-PDF.jar \
      -DAPP_HOME_NAME="New Application Name" \
      -DSHOW_UPDATE=false \
      -DSHOW_UPDATE_ONLY_ADMIN=false
    ```

    **Option 2: Using Environment Variables**
    ```bash
    export UI_APPNAME="Stirling PDF"
    export UI_HOMEDESCRIPTION="Your locally hosted one-stop-shop for all your PDF needs."
    export UI_APPNAVBARNAME="Stirling PDF"
    export SYSTEM_SHOWUPDATE=false
    export SYSTEM_SHOWUPDATEONLYADMIN=false
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e UI_APPNAME=Stirling PDF \
    -e UI_HOMEDESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs. \
    -e UI_APPNAVBARNAME=Stirling PDF \
    -e SYSTEM_SHOWUPDATE=false \
    -e SYSTEM_SHOWUPDATEONLYADMIN=false
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
    ```
  </TabItem>
</Tabs>
