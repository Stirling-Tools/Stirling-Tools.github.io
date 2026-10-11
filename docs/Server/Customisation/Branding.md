---
sidebar_position: 1
title: UI and branding
sidebar_label: UI & branding
description: Rename the app, replace its icons and logos, and add your own CSS on a self-hosted Stirling PDF server.
---

# UI and branding

## Branding settings

Open **Settings → Server → System → Branding & appearance**, or set the keys in `settings.yml`:

| Field in Settings | Setting | Default | Purpose |
|---|---|---|---|
| **Navbar Brand** | `ui.appNameNavbar` | empty (`Stirling PDF`) | The browser tab title and the issuer name shown in authenticator apps for two-factor login. Despite the name, it is not shown in the navigation bar, which shows the logo. |
| **Show Update Notifications** | `system.showUpdate` | `true` | Show a notice when a new version is available. |
| **Show Updates to Admins Only** | `system.showUpdateOnlyAdmin` | `true` | Show that notice to admins only. |
| **Hide Google Drive** | `ui.hideDisabledTools.googleDrive` | `false` | Hide the Google Drive button when Google Drive is off. |
| **Hide Mobile Scanner** | `ui.hideDisabledTools.mobileQRScanner` | `false` | Hide the mobile upload button when the mobile scanner is off. |

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    ui:
      appNameNavbar: "Acme PDF"
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    UI_APPNAMENAVBAR="Acme PDF"
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          UI_APPNAMENAVBAR: Acme PDF
    ```
  </TabItem>
</Tabs>

The same card also holds the language, upload limit and **Frontend URL** (`system.frontendUrl`) settings described in [Common settings](../Configuration.md#common-settings).

## Replace icons and logos

A file in `customFiles/static/` replaces the file the app serves at the same path. In Docker, mount the folder:

```yaml
services:
  stirling-pdf:
    volumes:
      - ./customFiles:/customFiles
```

Brand images are served from `/modern-logo/`, so put your versions in `customFiles/static/modern-logo/` with these exact filenames:

| File | Used for |
|---|---|
| `favicon.ico` | Browser tab icon |
| `logo192.png`, `logo512.png` | App and home screen icons |
| `StirlingPDFLogoNoTextLight.svg`, `StirlingPDFLogoNoTextDark.svg` | Logo mark without text, for light and dark themes |
| `StirlingPDFLogoBlackText.svg`, `StirlingPDFLogoWhiteText.svg`, `StirlingPDFLogoGreyText.svg` | Logo with text, for light, dark and muted backgrounds |
| `logo-tooltip.svg` | Small logo in tooltips |

Other files at the app root, such as `manifest.json`, can be replaced the same way. Restart Stirling PDF after adding a file, then hard-reload the browser.

:::note
Some Stirling logos are built into the app and cannot be replaced.
:::

## Add custom CSS

The app does not load a stylesheet from `customFiles` on its own. To add one, serve your own copy of `index.html` that links to it.

1. Put your stylesheet at `customFiles/static/custom.css`. It is served at `/custom.css`, under your [root path](./Extra-Settings.md#serve-under-a-sub-path) if you set one.
2. Save the app's current page as your own `index.html`, using your server's URL:

   ```bash
   curl --fail --location http://localhost:8080/ --output ./customFiles/static/index.html
   ```

3. In `customFiles/static/index.html`, add this line just before `</head>`:

   ```html
   <link rel="stylesheet" href="/custom.css">
   ```

4. Restart Stirling PDF. The log shows `Using custom index.html from: /customFiles/static/index.html`.

:::warning Repeat after every upgrade
`index.html` refers to asset filenames that change with each release, so an old copy breaks the app after an upgrade. Save a fresh copy and add your `<link>` line again every time you upgrade.
:::

For changes CSS cannot make, such as new layouts or components, build your own frontend: see [Set up and run](../../Developers/Contributing.md#set-up-and-run) and [Build](../../Developers/Contributing.md#build) in Contributing.
