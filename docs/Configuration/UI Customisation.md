---
sidebar_position: 4
tags: [UI, customisation, feature, advanced feature]
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UI Customisation

Stirling PDF allows straightforward customization of the application name and appearance to make Stirling PDF your own.

## Application Name Settings
These settings control the visible application name:
- `appName` - The visible application name for your instance
- `homeDescription` - The description displayed on the homepage that first greets the user
- `appNameNavbar` - Used as the browser tab title and as the issuer name shown in authenticator apps for two-factor (TOTP) login. Despite its name it is not shown in the navigation bar (which displays the logo), so do not leave it blank if you use TOTP. Empty falls back to "Stirling PDF".

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

To replace the bundled logo with your own, see [Static File Overrides](./Other%20Customisations.md#static-file-overrides) - you drop your logo files into `customFiles/static/<style>-logo/` and they replace the built-in ones.

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

### Injecting Custom CSS

Stirling PDF does not have a "drop a CSS file here" setting - the bundled `index.html` doesn't reference an extension stylesheet, so a `customFiles/static/custom.css` on its own won't load. To inject CSS you need to provide your own copy of `index.html` that links to your stylesheet.

This is the right approach for things like:

- Tweaking colors or fonts beyond what theme settings cover
- Overriding component z-index values (e.g. lifting the Google Drive Picker above modal overlays)
- Hiding specific UI elements
- Embedding tracking / analytics snippets in `<head>`

#### Recipe

**1. Drop your CSS file into `customFiles/static/`**

```
customFiles/
  └── static/
      └── custom.css
```

It will be served at `/custom.css` (or under your configured root path if you've set `SYSTEM_ROOTURIPATH`).

**2. Get a copy of the current bundled `index.html`**

The easiest way is to copy it out of a running container:

```bash
docker cp stirling-pdf:/app/BOOT-INF/classes/static/index.html ./customFiles/static/index.html
```

If that path doesn't exist on a future release (e.g. a layered JAR layout), try `/app/app.jar` instead and extract `BOOT-INF/classes/static/index.html` from it with `unzip`. The endpoint location is what matters - any equivalent copy of the served `index.html` works.

**3. Add your stylesheet link**

Open `customFiles/static/index.html` and insert a `<link>` immediately before `</head>`:

```html
    <link rel="stylesheet" href="/custom.css">
  </head>
```

**4. Restart Stirling PDF**

On the next boot, the log will show:

```
Using custom index.html from: /customFiles/static/index.html
```

Your stylesheet now loads on every page.

:::warning Re-export `index.html` after every Stirling PDF upgrade
The bundled `index.html` references hashed JS/CSS asset filenames (e.g. `index-fSaGHxPC.js`) that change on every release. Your override will reference stale filenames after an upgrade and break the UI. Repeat step 2 (copy the new `index.html` and re-add your `<link>`) after each upgrade, or automate it with a small script in your deployment pipeline.
:::

#### Worked example - lift the Google Drive Picker above modal overlays

The file manager modal sits at `z-index: 1200`. The Google Drive picker, rendered by Google's own scripts, doesn't always respect this. Force its iframe overlay higher:

```css
/* customFiles/static/custom.css */
.picker-dialog,
.picker-dialog-bg {
  z-index: 9999 !important;
}
```

After completing the recipe above, restart and the picker now floats over the file manager.

### Fork the Frontend (Developers)

For deeper customization than CSS can express (changing layouts, replacing components, adding new tools):

1. Clone the Stirling PDF repository
2. Modify the React components in `frontend/editor/src/`
3. Build from the repo root: `cd frontend && npm ci`, then `task frontend:build:proprietary` (or pass `-PbuildWithFrontend=true` to the gradle build)
4. Output appears in `frontend/editor/dist/`
5. Copy the built artifacts into `customFiles/static/` and restart, or build your own Docker image

This approach requires maintaining your fork and manually merging updates.

## Configuration Examples

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    ui:
      appName: exampleAppName # Application's visible name
      homeDescription: I am a description # Short description or tagline shown on homepage
      appNameNavbar: navbarName # Browser tab title and TOTP issuer label (not the navbar)

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
