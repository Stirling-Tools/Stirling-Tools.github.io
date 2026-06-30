---
sidebar_position: 7
id: Managed Deployment
title: Managed Desktop Deployment
description: Pre-configure and lock the Stirling PDF desktop app across many machines with MDM (Intune, Jamf, SCCM, Group Policy)
tags:
  - Desktop
  - MDM
  - Deployment
---

# Managed Desktop Deployment

This guide is for IT administrators rolling out the Stirling PDF **desktop app** to many machines and pre-configuring it - for example pointing everyone at a self-hosted server, stopping users changing that, or controlling how updates are applied. It works with any deployment or MDM tool (Microsoft Intune, Jamf, SCCM, Group Policy, Munki, and so on).

For a normal single-machine install, use the [Windows](./Windows.md), [Mac](./Mac.md), or [Linux](./Unix.md) guides instead.

---

## How it works

When the desktop app starts, it looks for a small JSON file called **`stirling-provisioning.json`**. Whatever that file contains is applied to the app: the server it connects to, whether the user can change that, and how updates behave.

Where you put the file decides whether the user can override it:

- **System directory (needs admin rights to write)** - the settings are applied **and locked**. The affected controls are greyed out with a "Managed by administrator" label and users cannot change them. This is what you want for a managed fleet.
- **Per-user directory** - the settings are applied but **not locked**, so the user can still change them. Useful for setting a default without forcing it.

You can write this file yourself (it is only a few lines), or on Windows let the installer write it for you from install parameters (see the Windows section below).

---

## The provisioning file

`stirling-provisioning.json` is plain JSON. Every field is optional - include only the ones you want to set:

```json
{
  "serverUrl": "http://192.168.1.53:8080",
  "lockConnectionMode": true,
  "updateMode": "disabled"
}
```

| Field | Type | What it does |
|-------|------|--------------|
| `serverUrl` | string | The server the app connects to on launch (your self-hosted instance, or a Stirling Cloud URL). Include the protocol (`http://` or `https://`); a trailing slash is optional. |
| `lockConnectionMode` | boolean | `true` stops users changing the server or connection mode in Settings. Only takes effect when `serverUrl` is also set. |
| `loginAgreementEnabled` | boolean | `true` enables the login agreement/disclaimer dialog. It only turns the feature on - the text is supplied separately (see note below), and with no text nothing is shown. Can be set on its own (no `serverUrl` needed), so it also applies to local, no-login desktop installs. |
| `updateMode` | string | How the built-in updater behaves: `prompt` (default - ask the user), `auto` (download and install silently on startup), or `disabled` (never check or show update UI). |

A file with none of these fields is ignored.

:::note The login agreement flag only enables it
`loginAgreementEnabled` / `STIRLING_LOGIN_AGREEMENT` switches the feature on; it does not carry the disclaimer text. The dialog stays hidden until text is available - from the server the desktop connects to, or for a local bundled backend from a `customFiles/disclaimer/<locale>.md` file or the `LEGAL_LOGINAGREEMENT_FALLBACKTEXT` setting. With no text configured, nothing is shown. See [Login Agreement](../Configuration/System%20and%20Security.md).

Passing the disclaimer text directly as an install parameter is planned for a future update.
:::

---

## File locations

Put the file in the **system** directory to apply and lock settings for everyone on the machine. The app also reads a **per-user** copy, which is applied but not locked.

| OS | System directory (applies and locks) | Per-user directory (applies only) |
|----|--------------------------------------|-----------------------------------|
| **Windows** | `%PROGRAMDATA%\Stirling-PDF\stirling-provisioning.json` | `%APPDATA%\Stirling-PDF\stirling-provisioning.json` |
| **macOS** | `/Library/Application Support/Stirling-PDF/stirling-provisioning.json` | `~/Library/Application Support/Stirling-PDF/stirling-provisioning.json` |
| **Linux** | `/etc/stirling-pdf/stirling-provisioning.json` | `~/.config/Stirling-PDF/stirling-provisioning.json` |

---

## Windows (Intune / SCCM / Group Policy)

On Windows you do not have to write the JSON by hand. The MSI installer (and `winget --custom`) accept parameters and write the system provisioning file for you during a silent install.

| Parameter | Description | Example |
|-----------|-------------|---------|
| `STIRLING_SERVER_URL` | Server URL the app connects to | `http://192.168.1.53:8080` |
| `STIRLING_LOCK_CONNECTION` | Lock the connection so users cannot change it (`1` = locked) | `1` |
| `STIRLING_LOGIN_AGREEMENT` | Enable the login agreement/disclaimer dialog (`1` = enabled). The text is supplied separately; the flag alone shows nothing. | `1` |
| `STIRLING_UPDATE_MODE` | Set and lock the update mode (`prompt`, `auto`, or `disabled`) | `disabled` |
| `INSTALLDIR` | Custom install directory (MSI only) | `C:\CustomPath\Stirling-PDF` |
| `ALLUSERS` | Install for all users (requires admin; `1`) | `1` |

**MSI (msiexec):**
```batch
msiexec /i "Stirling-PDF-windows-x86_64.msi" /qn ^
  STIRLING_SERVER_URL="http://192.168.1.53:8080" ^
  STIRLING_LOCK_CONNECTION=1 ^
  STIRLING_UPDATE_MODE=disabled ^
  ALLUSERS=1
```

**winget:**
```powershell
winget install StirlingTools.StirlingPDF `
  --custom "STIRLING_SERVER_URL=http://192.168.1.53:8080 STIRLING_LOCK_CONNECTION=1"
```

`/qn` runs the MSI silently with no UI. The MSI is available in the [GitHub releases](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest). These parameters write `%PROGRAMDATA%\Stirling-PDF\stirling-provisioning.json`, so the settings are applied and locked for every user on the machine.

---

## macOS (Jamf / MDM)

Write `stirling-provisioning.json` to the system directory and push it with your MDM (Jamf, Munki, and so on):

```
/Library/Application Support/Stirling-PDF/stirling-provisioning.json
```

For example, to point every Mac at a self-hosted server, lock that choice, and turn updates off:

```json
{ "serverUrl": "https://pdf.example.com", "lockConnectionMode": true, "updateMode": "disabled" }
```

---

## Linux (managed desktops)

Write the same file to the system directory:

```
/etc/stirling-pdf/stirling-provisioning.json
```

A per-user copy in `~/.config/Stirling-PDF/` is also read, but it is not locked.

---

## Changing or removing managed settings

Locked settings can only be changed through the provisioning file. To update them, push a new `stirling-provisioning.json` (or remove it) with the same tool you used to deploy it, then have users restart the app. Removing the system file unlocks the controls again.
