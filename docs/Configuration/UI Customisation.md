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

## UI Customization Options

### In-App Settings Management (Recommended)

If you have login enabled and are logged in as an admin, you can configure all settings directly in the application through the **Settings** menu. No need to edit `settings.yml` manually!

**How to access:**
1. Enable login: `SECURITY_ENABLELOGIN=true`
2. Log in as an admin user
3. Navigate to **Settings** in the application
4. Configure all options through the UI
5. Changes apply immediately

**Available customizations:**
- Application name and branding
- Update notification settings
- Language settings
- Theme preferences
- Logo style (classic/modern)
- Custom logo upload

### Static File Overrides (Advanced)

For customization beyond the built-in settings, you can override static files like logos, favicons, and images:

```yaml
services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
    ports:
      - '8080:8080'
    volumes:
      - ./customFiles:/customFiles:rw
```

Then place your custom files in `customFiles/static/` matching the path structure. Common examples:
- `customFiles/static/favicon.svg` - Custom favicon
- `customFiles/static/classic-logo/logo.svg` - Custom logo
- `customFiles/static/modern-logo/logo.svg` - Custom modern logo

**Learn more:** [Other Customisations - Static File Overrides](./Other%20Customisations.md#static-file-overrides)

### Fork the Frontend (Developers)

For complete UI customization:
1. Clone the Stirling-PDF repository
2. Modify the React components in `frontend/src/`
3. Build the frontend: `cd frontend && npm install && npm run build`
4. Use static file overrides or build your own Docker image

This approach requires maintaining your fork and manually merging updates.

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
