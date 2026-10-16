---
sidebar_position: 6
title: Managed deployment
description: Manage desktop sign-in, Cloud-only accounts, local document processing, server connections and updates with Intune, Jamf, SCCM or Group Policy.
sidebar_label: Managed deployment
---

# Managed deployment

Use a provisioning file to require sign-in, restrict accounts to Stirling Cloud, keep document processing on the device, lock a self-hosted server connection, and control updates across your desktop installations.

For self-hosted connections, your server must have login turned on, with an account or single sign-on for each user ([Sign-in and security](../Server/Security/Sign-in-and-Security.md)).

## Where the file goes

At every launch the app looks for `stirling-provisioning.json`, first in the system folder and then in the user folder, and applies the first one it finds:

| OS | System folder | User folder |
|---|---|---|
| Windows | `%PROGRAMDATA%\Stirling-PDF\` | `%APPDATA%\Stirling-PDF\` |
| macOS | `/Library/Application Support/Stirling-PDF/` | `~/Library/Application Support/Stirling-PDF/` |
| Linux | `/etc/stirling-pdf/` | `~/.config/Stirling-PDF/` |

- **System file:** stays in place and is applied at every launch. Use this for managed fleets.
- **User file:** applied once, then deleted. It can't lock the update setting.

While a system file exists, the user file is ignored and is not consumed; it can apply if the system file is later removed. Allow only administrators or system accounts to write the system file, while keeping it readable by app users. Restart the app after policy changes.

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
| `serverUrl` | string | Your self-hosted server, including `http://` or `https://` and the port if needed. Sets Self-Hosted mode; use `cloudOnly` to require Stirling Cloud instead. |
| `lockConnectionMode` | boolean | `true` stops users connecting to a different server or to Stirling Cloud. Only applies when `serverUrl` is set. Users can still choose **Use local tools instead** unless `requireSignIn` is enabled. |
| `requireSignIn` | boolean | Requires a verified account session before users can access the workspace or background file processing. Hides guest access and returns to sign-in after logout or session expiry. Defaults to `false`. |
| `cloudOnly` | boolean | Restricts account connections to Stirling Cloud and removes self-hosted sign-in. On its own, it still permits guest use. Defaults to `false`. |
| `localProcessingOnly` | boolean | Keeps document operations on the device, hides tools and conversion formats unavailable locally, and disables server document storage and sharing. Account and billing requests remain available. Defaults to `false`. |
| `loginAgreementEnabled` | boolean | `true` turns on the login agreement dialog. Works without `serverUrl`. See the note below. |
| `updateMode` | string | `prompt` (default) asks before installing, `auto` installs updates at startup, `disabled` never checks. |

The three sign-in and privacy policies are independent. Omitted policy fields preserve their stored values; explicitly use `false` to clear a previously enabled policy.

### Require Stirling Cloud sign-in and local document processing

```json
{
  "requireSignIn": true,
  "cloudOnly": true,
  "localProcessingOnly": true
}
```

Use `requireSignIn` and `cloudOnly` together to require a Stirling Cloud account. Add `localProcessingOnly` when documents must stay on the device even while signed in. With `requireSignIn` alone, either Stirling Cloud or a self-hosted account is allowed.

### Require sign-in to a specific self-hosted server

```json
{
  "serverUrl": "https://pdf.example.com",
  "lockConnectionMode": true,
  "requireSignIn": true,
  "cloudOnly": false
}
```

The existing connection lock still allows local fallback unless `requireSignIn` is enabled. A JSON file combining `cloudOnly: true` with a nonempty `serverUrl` is invalid. Add `localProcessingOnly: true` to require local document processing while using the self-hosted account.

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
| `STIRLING_REQUIRE_SIGN_IN` | Require sign-in before using the app (`1` = enabled, `0` = disabled) | `1` |
| `STIRLING_CLOUD_ONLY` | Restrict accounts to Stirling Cloud (`1` = enabled, `0` = disabled) | `1` |
| `STIRLING_LOCAL_PROCESSING_ONLY` | Keep document operations on the device (`1` = enabled, `0` = disabled) | `1` |
| `STIRLING_LOGIN_AGREEMENT` | Turn on the login agreement dialog (`1`, `true`, `yes` or `y`) | `1` |
| `STIRLING_UPDATE_MODE` | `prompt`, `auto` or `disabled`. An invalid value makes the install fail. | `disabled` |
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

### Intune: require Cloud sign-in and keep documents local

In Intune, set **Install behavior** to **System** so the installer has permission to install for all users and write the settings that apply to the whole device. Use the following installation command:

```powershell
msiexec.exe /i "Stirling-PDF-windows-x86_64.msi" /qn ALLUSERS=1 STIRLING_REQUIRE_SIGN_IN=1 STIRLING_CLOUD_ONLY=1 STIRLING_LOCAL_PROCESSING_ONLY=1 STIRLING_UPDATE_MODE=disabled
```

This installs the app for all users, requires Stirling Cloud sign-in, and keeps document processing on the device. Updates are managed through Intune. For a manual installation with the same settings, run the command from PowerShell as an administrator.

For an existing installation, including one installed from the EXE, deploy the JSON example above to `%PROGRAMDATA%\Stirling-PDF\stirling-provisioning.json` as an administrator and restart the app. The MSI properties do not need to be passed to the EXE.

When the MSI enables Cloud-only sign-in, it removes any previous self-hosted URL and connection lock from its provisioning output. When editing JSON directly, remove the `serverUrl` field yourself.

### Reinstalls and changing account types

MSI properties update the existing provisioning file. A reinstall with only `STIRLING_REQUIRE_SIGN_IN=1` keeps any existing server URL and connection lock, as well as document privacy policies. Reinstalling does not reset omitted settings.

To switch a Cloud-only installation to a self-hosted server, explicitly remove the Cloud-only restriction in the same installation:

```powershell
msiexec.exe /i "Stirling-PDF-windows-x86_64.msi" /qn ALLUSERS=1 STIRLING_SERVER_URL="https://pdf.example.com" STIRLING_LOCK_CONNECTION=1 STIRLING_CLOUD_ONLY=0
```

Required sign-in and local-processing restrictions remain in effect unless you explicitly change them. Supplying a server URL while leaving an existing `cloudOnly: true` policy enabled is a conflict and stops installation.

The MSI reads and updates the provisioning file only when at least one of these properties has a nonempty value: `STIRLING_SERVER_URL`, `STIRLING_LOGIN_AGREEMENT`, `STIRLING_UPDATE_MODE`, `STIRLING_REQUIRE_SIGN_IN`, `STIRLING_CLOUD_ONLY`, or `STIRLING_LOCAL_PROCESSING_ONLY`. With none supplied, the installer leaves the file untouched; an invalid machine file is reported by the app at startup instead.

If that provisioning step runs and the existing file is corrupt, installation stops without replacing it: omitted policies cannot be recovered safely. As an administrator, back up the file and replace it with valid JSON containing the complete intended policy, then retry the installation. The error identifies the file. Use the provisioning examples above and explicitly specify the desired values of all three sign-in and privacy policies.

## macOS (Jamf, MDM)

Push the file to `/Library/Application Support/Stirling-PDF/stirling-provisioning.json`.

## Linux

Write the file to `/etc/stirling-pdf/stirling-provisioning.json`.

The same sign-in and document privacy policies apply on Windows, macOS and Linux.

## Document privacy

`localProcessingOnly` applies to both Stirling Cloud and self-hosted accounts. Signing in does not permit documents to be sent to either server. Local tools are shown while the app starts. Once the app has checked which tools can run on the device, unsupported tools and conversion formats are hidden, even if the user has chosen to show unavailable tools. Operations that cannot run locally are blocked.

The policy disables:

- Stirling library/server document storage, file sharing, and shared signing.
- Mobile document and signature transfer.
- AI chat and document classification.
- Server pipelines and processing folders.
- Timestamping, because it sends a document digest to a timestamp authority.

Local files, local signing, and mounted local folders remain available. Cached server files and folders are hidden without being deleted, and the library's local view is labelled **Local files**. Sign-in, account management, and billing remain available.

This policy applies to the desktop app. It does not control other programs or document processing in the browser version of Stirling Cloud. Existing server documents are not deleted.

## Sessions and offline use

When sign-in is required, users must sign in before opening the workspace or processing files, including files opened from Windows Explorer or another file manager. This also applies to users who previously used the app without an account. Signing out returns them to the sign-in screen.

With required sign-in enabled, each time the app starts it needs an internet or server connection to verify the user's account. After verification, users can continue using local tools offline in that app session until their sign-in expires. A successful session renewal extends access. Temporary connection problems or rate limiting during renewal do not end a verified session that is still valid. If the server rejects the sign-in, or the session expires and cannot be renewed, the user must sign in again.

These policies control access to the desktop application. They do not add password protection to the local processing service or restrict sign-in to a particular Stirling Cloud organisation or email domain.

## Verify a deployment

Before rolling out to all users, install your organisation's chosen desktop version on a pilot device and apply the intended settings. Restart the app, then check the behaviour below for each policy you have enabled. Use the same combination of policies that you plan to deploy.

| Enabled policy | What to check |
| --- | --- |
| `requireSignIn: true` | With no valid session, startup shows sign-in. Guest access is absent. After signing in and then signing out, both the workspace and sidebar disappear. |
| `cloudOnly: true` | Self-hosted sign-in and connection choices are absent. Stirling Cloud sign-in works. Guest use remains available unless `requireSignIn` is also enabled. |
| `localProcessingOnly: true` | While signed in, local tools remain available. Once the app has checked which tools can run on the device, unsupported tools and conversion formats are hidden; server library, sharing, and shared signing are unavailable. |

## Provisioning errors and recovery

If the system provisioning file is invalid, the app shows an error with recovery instructions and does not open. Dismissing the error closes the app. Correct the JSON or conflicting settings, then restart. The app also stops with an error if it cannot save the settings. If the sign-in screen cannot load policy settings, select **Retry** after resolving the problem; the workspace stays closed until the settings load.

An invalid user provisioning file is set aside as `stirling-provisioning.invalid-*.json` in the same folder. A warning identifies the saved file. Correct it and save it again as `stirling-provisioning.json` to apply the settings on the next launch. The app continues with its existing settings unless it cannot safely set aside the invalid file, in which case it stops with an error.

## Changing or removing managed settings

The app keeps provisioned values and locks after the file is gone, so don't rely on deleting the file.

- **Change the server or lock:** deploy an updated system file with `serverUrl` and the `lockConnectionMode` you want, then restart the app.
- **Reset a user completely:** quit the app and delete that user's `stirling.pdf.dev` folders ([Data and log locations](./Updates-and-Data.md#data-and-log-locations)). A system file is applied again at the next launch.

To remove sign-in or privacy requirements, deploy explicit `false` values for the corresponding JSON fields, or use MSI properties set to `0`, then restart. Omitted fields preserve existing values. Later MSI provisioning updates merge with the existing file so an update-only change preserves all three policies.
