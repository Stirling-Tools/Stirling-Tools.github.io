---
sidebar_position: 6
title: Managed deployment
description: Pre-configure and lock the Stirling PDF desktop app on many machines with Intune, Jamf, SCCM, Group Policy or any other deployment tool.
sidebar_label: Managed deployment
---

# Managed deployment

Use a provisioning file to roll out the desktop app pre-configured: point every machine at your self-hosted server, stop users changing it, and control updates.

Your server must have login turned on, with an account or single sign-on for each user ([Sign-in and security](../Server/Security/Sign-in-and-Security.md)).

## Where the file goes

At every launch the app looks for `stirling-provisioning.json`, first in the user folder and then in the system folder, and applies the first one it finds:

| OS | System folder | User folder |
|---|---|---|
| Windows | `%PROGRAMDATA%\Stirling-PDF\` | `%APPDATA%\Stirling-PDF\` |
| macOS | `/Library/Application Support/Stirling-PDF/` | `~/Library/Application Support/Stirling-PDF/` |
| Linux | `/etc/stirling-pdf/` | `~/.config/Stirling-PDF/` |

- **System file:** stays in place and is applied at every launch. Use this for managed fleets.
- **User file:** applied once, then deleted. It can't lock the update setting.

## The provisioning file

Every field is optional:

```json
{
  "serverUrl": "https://pdf.example.com",
  "lockConnectionMode": true,
  "updateMode": "disabled"
}
```

| Field | Type | What it does |
|---|---|---|
| `serverUrl` | string | Your self-hosted server, including `http://` or `https://` and the port if needed. Sets Self-Hosted mode. Stirling Cloud mode can't be provisioned. |
| `lockConnectionMode` | boolean | `true` stops users connecting to a different server or to Stirling Cloud. Only applies when `serverUrl` is set. Users can still choose **Use local tools instead**. |
| `loginAgreementEnabled` | boolean | `true` turns on the login agreement dialog. Works without `serverUrl`. See the note below. |
| `updateMode` | string | `prompt` (default) asks before installing, `auto` installs updates at startup, `disabled` never checks. |

:::note Login agreement text
`loginAgreementEnabled` only switches the dialog on. With no text, nothing is shown. When connected to a server, the server supplies the text ([Sign-in and security](../Server/Security/Sign-in-and-Security.md)). For Local Only use, save the text as Markdown in `customFiles/disclaimer/` inside the user folder above, for example `customFiles/disclaimer/en.md`.
:::

On all-users Windows installs the app can't update itself, so use `updateMode: "disabled"` and push new versions with your deployment tool.

## Windows (Intune, SCCM, Group Policy)

The x64 MSI accepts these properties and writes the provisioning file for you:

| Property | Description | Example |
|---|---|---|
| `STIRLING_SERVER_URL` | Server URL | `https://pdf.example.com` |
| `STIRLING_LOCK_CONNECTION` | Lock the connection (`1`, `true`, `yes` or `y`) | `1` |
| `STIRLING_LOGIN_AGREEMENT` | Turn on the login agreement dialog (`1`, `true`, `yes` or `y`) | `1` |
| `STIRLING_UPDATE_MODE` | `prompt`, `auto` or `disabled`. Any other value makes the install fail. | `disabled` |
| `INSTALLDIR` | Custom install folder | `C:\CustomPath\Stirling PDF` |
| `ALLUSERS` | Install for all users | `1` |

```batch
msiexec /i "Stirling-PDF-windows-x86_64.msi" /qn ^
  STIRLING_SERVER_URL="https://pdf.example.com" ^
  STIRLING_LOCK_CONNECTION=1 ^
  STIRLING_UPDATE_MODE=disabled ^
  ALLUSERS=1
```

With winget:

```powershell
winget install StirlingTools.StirlingPDF `
  --custom "STIRLING_SERVER_URL=https://pdf.example.com STIRLING_LOCK_CONNECTION=1 STIRLING_UPDATE_MODE=disabled"
```

The MSI is [Stirling-PDF-windows-x86_64.msi](https://files.stirlingpdf.com/win-installer.exe). An all-users install writes the system file. The Windows on ARM installer accepts none of these properties, so deploy the JSON file to `%PROGRAMDATA%\Stirling-PDF\` instead.

## macOS (Jamf, MDM)

Push the file to `/Library/Application Support/Stirling-PDF/stirling-provisioning.json`.

## Linux

Write the file to `/etc/stirling-pdf/stirling-provisioning.json`.

## Changing or removing managed settings

The app keeps provisioned values and locks after the file is gone, so don't rely on deleting the file.

- **Change the server or lock:** deploy an updated system file with `serverUrl` and the `lockConnectionMode` you want, then restart the app.
- **Reset a user completely:** quit the app and delete that user's `stirling.pdf.dev` folders ([Data and log locations](./Updates-and-Data.md#data-and-log-locations)). A system file is applied again at the next launch.
