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

This guide is for IT administrators rolling out the Stirling PDF **desktop app** to many machines. You can configure a self-hosted server, require sign-in, restrict accounts to Stirling Cloud, keep document processing on the device, and control updates. It works with deployment and MDM tools such as Microsoft Intune, Jamf, SCCM, Group Policy, and Munki.

For a normal single-machine install, use the [Windows](./Windows.md), [Mac](./Mac.md), or [Linux](./Unix.md) guides instead.

---

## How it works

When the desktop app starts, it reads **`stirling-provisioning.json`** and applies its connection, sign-in, document privacy, and update settings. Machine provisioning is retained and reapplied on every launch, including for existing user profiles.

Provisioning locks depend on the setting:

- **Connection mode:** `lockConnectionMode: true` locks the connection when `serverUrl` is supplied, including when the file is in a per-user directory.
- **Update mode:** The update policy is locked when supplied by a system-directory provisioning file. A per-user update policy does not lock that control.

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
| `serverUrl` | string | URL of a self-hosted server, including `http://` or `https://`. Provisioning this field selects self-hosted mode; it does not select Stirling Cloud mode. |
| `lockConnectionMode` | boolean | `true` stops users changing the server or connection mode in Settings. Only takes effect when `serverUrl` is also set. |
| `requireSignIn` | boolean | Requires a verified account session before users can access the workspace or background file processing. Hides guest access and returns to sign-in after logout or session expiry. Defaults to `false`. |
| `saasOnly` | boolean | Restricts account connections to Stirling Cloud and removes self-hosted sign-in. On its own, it still permits guest use. Defaults to `false`. |
| `localProcessingOnly` | boolean | Keeps document operations on the device, hides tools and conversion formats unavailable locally, and disables server document storage and sharing. Account and billing requests remain available. Defaults to `false`. |
| `loginAgreementEnabled` | boolean | `true` enables the login agreement/disclaimer dialog. It only turns the feature on - the text is supplied separately (see note below), and with no text nothing is shown. Can be set on its own (no `serverUrl` needed), so it also applies to local, no-login desktop installs. |
| `updateMode` | string | How the built-in updater behaves: `prompt` (default - ask the user), `auto` (download and install silently on startup), or `disabled` (never check or show update UI). |

A file with none of these fields is ignored.

The three sign-in and privacy policies are independent. Omitted policy fields preserve their stored values; explicitly use `false` to clear a previously enabled policy.

### Require Stirling Cloud sign-in and local document processing

```json
{
  "requireSignIn": true,
  "saasOnly": true,
  "localProcessingOnly": true
}
```

Use `requireSignIn` and `saasOnly` together to require a Stirling Cloud account. Add `localProcessingOnly` when documents must stay on the device even while signed in. With `requireSignIn` alone, either Stirling Cloud or a self-hosted account is allowed.

### Require sign-in to a specific self-hosted server

```json
{
  "serverUrl": "https://pdf.example.com",
  "lockConnectionMode": true,
  "requireSignIn": true,
  "saasOnly": false
}
```

The existing connection lock still allows local fallback unless `requireSignIn` is enabled. A JSON file combining `saasOnly: true` with a nonempty `serverUrl` is invalid. Add `localProcessingOnly: true` to require local document processing while using the self-hosted account.

:::note The login agreement flag only enables it
`loginAgreementEnabled` / `STIRLING_LOGIN_AGREEMENT` switches the feature on; it does not carry the disclaimer text. The dialog stays hidden until text is available - from the server the desktop connects to, or for a local bundled backend from a `customFiles/disclaimer/<locale>.md` file or the `LEGAL_LOGINAGREEMENT_FALLBACKTEXT` setting. With no text configured, nothing is shown. See [Login Agreement](../Configuration/Security/System%20and%20Security.md).

Passing the disclaimer text directly as an install parameter is planned for a future update.
:::

---

## File locations

The app checks the system location first. While a machine provisioning file exists, the per-user file is ignored and is not consumed. That pending per-user file can apply if the machine file is later removed. System placement also controls locking of the update policy; the connection lock is controlled separately by `lockConnectionMode`.

| OS | System directory | Per-user directory |
|----|--------------------------------------|-----------------------------------|
| **Windows** | `%PROGRAMDATA%\Stirling-PDF\stirling-provisioning.json` | `%APPDATA%\Stirling-PDF\stirling-provisioning.json` |
| **macOS** | `/Library/Application Support/Stirling-PDF/stirling-provisioning.json` | `~/Library/Application Support/Stirling-PDF/stirling-provisioning.json` |
| **Linux** | `/etc/stirling-pdf/stirling-provisioning.json` | `~/.config/Stirling-PDF/stirling-provisioning.json` |

For managed fleets, use the system location and allow only administrators or system accounts to write the file, while keeping it readable by app users. Restart the app after policy changes. Per-user provisioning is consumed after successful application and is intended for initial configuration, not durable machine policy.

---

## Windows (Intune / SCCM / Group Policy)

On Windows you do not have to write the JSON by hand. The MSI installer (and `winget --custom`) accept parameters and write the system provisioning file for you during a silent install.

| Parameter | Description | Example |
|-----------|-------------|---------|
| `STIRLING_SERVER_URL` | Server URL the app connects to | `http://192.168.1.53:8080` |
| `STIRLING_LOCK_CONNECTION` | Lock the connection so users cannot change it (`1` = locked) | `1` |
| `STIRLING_REQUIRE_SIGN_IN` | Require sign-in before using the app (`1` = enabled, `0` = disabled) | `1` |
| `STIRLING_SAAS_ONLY` | Restrict accounts to Stirling Cloud (`1` = enabled, `0` = disabled) | `1` |
| `STIRLING_LOCAL_PROCESSING_ONLY` | Keep document operations on the device (`1` = enabled, `0` = disabled) | `1` |
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

`/qn` runs the MSI silently with no UI. The MSI is available in the [GitHub releases](https://github.com/Stirling-Tools/Stirling-PDF/releases/latest). With `ALLUSERS=1`, these parameters write `%PROGRAMDATA%\Stirling-PDF\stirling-provisioning.json` and apply to every user on the machine. Without an all-users installation, provisioning is written to the installing user's profile.

### Intune: require Cloud sign-in and keep documents local

Run the MSI in **system context** for a device installation. For example, from PowerShell:

```powershell
msiexec.exe /i "Stirling-PDF-windows-x86_64.msi" /qn ALLUSERS=1 STIRLING_REQUIRE_SIGN_IN=1 STIRLING_SAAS_ONLY=1 STIRLING_LOCAL_PROCESSING_ONLY=1
```

For an existing installation, including one installed from the EXE, deploy the JSON example above to `%PROGRAMDATA%\Stirling-PDF\stirling-provisioning.json` as an administrator and restart the app. The MSI properties do not need to be passed to the EXE.

When the MSI enables SaaS-only sign-in, it removes any previous self-hosted URL and connection lock from its provisioning output. When editing JSON directly, remove the `serverUrl` field yourself.

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

A per-user copy in `~/.config/Stirling-PDF/` is read only when no system provisioning file exists. Its `lockConnectionMode` setting can lock the connection, but its update policy is not locked. The same sign-in and document privacy fields work on Windows, macOS, and Linux.

---

## Document privacy

`localProcessingOnly` applies to both Stirling Cloud and self-hosted accounts. Signing in does not permit documents to be sent to either server. Local tools are shown immediately while the bundled backend starts; once its capabilities are known, unsupported tools and conversion formats are removed regardless of the user's visibility preferences. Unavailable local operations have no cloud fallback.

The policy disables:

- Stirling library/server document storage, file sharing, and shared signing.
- Mobile document and signature transfer.
- AI chat and document classification.
- Server pipelines and processing folders.
- Timestamping, because it sends a document digest to a timestamp authority.

Local files, local signing, and mounted local folders remain available. Cached server files and folders are hidden without being deleted, and the library's local view is labelled **Local files**. Sign-in, account management, and billing remain available.

The desktop request layer also blocks remote document destinations, redirects, and stale actions that could send document data off the device. This is an application policy: it does not prevent other programs from accessing or transmitting files, or prevent someone from opening the SaaS website outside the desktop app. Existing server documents are not deleted.

## Sessions and offline use

Required sign-in is checked before the workspace, navigation sidebar, and background file handlers become available. Previously completed onboarding and saved guest preferences cannot bypass it. Logout and session expiry return to sign-in.

A new app session must verify its account with the selected authentication server. A verified, unexpired session can continue using local tools while offline. Successful authenticated refreshes retain verification; temporary refresh failures, including rate limiting, retain access until token expiry. Authentication rejection revokes access. Tokens from another server, anonymous Cloud accounts, and expired tokens that cannot refresh do not grant access.

These policies control access to the desktop application. They do not add authentication to its bundled local backend or restrict which Stirling Cloud organisation a user can join.

## Verify a deployment

Use a desktop build that includes the managed-policy implementation from [Stirling-PDF #8392](https://github.com/Stirling-Tools/Stirling-PDF/pull/8392). Test the settings on a pilot device before applying them to the fleet. Restart the app between policy changes, and explicitly set other policies to `false` when testing a flag on its own.

| Policy to test | Expected result |
| --- | --- |
| `requireSignIn: true` | With no valid session, startup shows sign-in. Guest access is absent. After signing in and then signing out, both the workspace and sidebar disappear. |
| `saasOnly: true` | Self-hosted sign-in and connection choices are absent. Stirling Cloud sign-in works. Guest use remains available unless `requireSignIn` is also enabled. |
| `localProcessingOnly: true` | While signed in, local tools remain available. Once local capabilities load, unsupported tools and conversion formats are hidden; server library, sharing, and shared signing are unavailable. |

## Provisioning errors and recovery

An invalid machine provisioning file prevents startup. Correct its JSON or conflicting settings and restart; the app does not fall back to guest access. Settings-store failures also prevent startup. If the sign-in screen cannot load policy settings, it offers **Retry** without opening the workspace.

Invalid per-user provisioning is backed up beside the original as `stirling-provisioning.invalid-*.json` before any settings change. A warning gives the recovery path and explains how to correct it and save it again as `stirling-provisioning.json`. The app continues with existing settings. If the backup or quarantine fails, startup remains blocked.

---

## Changing or removing managed settings

Provisioning values and lock state are persisted by the app. Removing the provisioning file does not clear previously stored locks. To change a provisioned connection, deploy an updated file with `serverUrl` and the intended `lockConnectionMode` value, then restart the app. Do not rely on deleting the file to unlock managed controls.

To remove sign-in or privacy requirements, deploy explicit `false` values for the corresponding JSON fields, or use MSI properties set to `0`, then restart. Omitted fields preserve existing values. Later MSI provisioning updates merge with the existing file so an update-only change preserves all three policies.
