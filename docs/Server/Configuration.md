---
sidebar_position: 3
title: Configuration
sidebar_label: Configuration
description: Where Stirling PDF server settings live, in-app Settings, settings.yml and environment variables, which one wins, and where the server keeps its files.
---

# Configuration

| Method | Use it for | Notes |
|---|---|---|
| **Settings** in the app | Day-to-day changes | Admins only, on builds with login. Changes are saved to `settings.yml`. |
| `settings.yml` | Any setting in the shipped file, including ones the app doesn't show | Created in `configs/` on first start. |
| `custom_settings.yml` | Server options such as port and HTTPS, settings the shipped file leaves out, or keeping your own overrides separate | Also in `configs/`, created empty on first start. |
| Environment variables | Docker, Kubernetes and scripted deployments | Override both files. |

## Which setting wins

When the same setting is set in more than one place, the highest one in this list wins:

1. Environment variables (and Java options such as `-Dsecurity.enableLogin=false`)
2. `custom_settings.yml`
3. `settings.yml`, including changes made in the app
4. Built-in defaults

So if an environment variable sets a value, changing it in the app has no effect. Remove the variable first.

## Settings in the app

Open **Settings** from your account avatar at the bottom of the left bar. **Preferences** holds each user's own options and API keys. Admins also see these groups:

| Page | What you can change | Details |
|---|---|---|
| **Workspace → Usage & Billing** | Licence key, plan and seats | [Plans and licences](./Licensing/Plans-and-Licences.md) |
| **Workspace → Users** | Invite people, roles, teams, ownership | [Sign-in and security](./Security/Sign-in-and-Security.md) |
| **Server → System** | Branding & appearance, User Preference Defaults, Endpoint Management, File Storage & Sharing, Folder Access, Custom Paths, Custom Metadata, Certificate Signing, AI Form Detection | [Turn features on or off](./Customisation/Features-and-Endpoints.md), [UI and branding](./Customisation/Branding.md) |
| **Server → Sign-in & security** | Login on or off, login method, lockout, single sign-on, audit logging | [Sign-in and security](./Security/Sign-in-and-Security.md) |
| **Server → Integrations** | Mail, Telegram, Google Drive, mobile upload, MCP server | [Telegram bot](./Automation/Telegram-Bot.md), [MCP server settings](./Automation/MCP-Server.md) |
| **Server → AI Engine** | Where AI runs, models, limits | [AI on your server](./AI/AI.md) |
| **Server → Database** | Connection, backups and restore | [Database](./Storage/Database.md) |
| **Server → Advanced** | Feature flags, processing, temp files, process limits | [Process limits](./Operations/Process-Limits.md) |
| **Server → Legal & privacy** | Legal links, login agreement, analytics, search engine visibility | [Analytics and telemetry](./Analytics-and-Telemetry.md) |
| **Monitoring** | **Usage Analytics** and **Audit log** | [Usage monitoring](./Operations/Usage-Monitoring.md), [Audit logging](./Security/Audit-Logging.md) |

Select **Save Changes**. If a change needs a restart, choose **Restart Now** or **Restart Later**.

With login turned off, the admin pages are read-only (set `system.showSettingsWhenNoLogin: false` to hide them). Builds without login have no admin pages, so use the file or environment variables.

## settings.yml

Stirling PDF writes `settings.yml` with the standard options and their defaults on first start. Edit it and restart to apply changes.

On every start the file is rebuilt from the shipped template, keeping your values:

- A commented-out entry comes back with its default value. To turn something off, change its value instead.
- Keys that aren't in the shipped file are removed. Put them in `custom_settings.yml` or set them as environment variables, like the settings marked * in [Processor server settings](./Automation/Processor-Settings.md).

## Environment variables

Turn a `settings.yml` path into a variable name: join the levels with underscores, write it in capitals, and drop hyphens.

| settings.yml | Environment variable |
|---|---|
| `security.enableLogin` | `SECURITY_ENABLELOGIN` |
| `security.initialLogin.username` | `SECURITY_INITIALLOGIN_USERNAME` |
| `system.customPaths.operations.soffice` | `SYSTEM_CUSTOMPATHS_OPERATIONS_SOFFICE` |
| `endpoints.toRemove` (a list) | `ENDPOINTS_TOREMOVE=img-to-pdf,remove-pages` |

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true
    system:
      defaultLocale: de-DE
    endpoints:
      toRemove: [img-to-pdf, remove-pages]
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_ENABLELOGIN=true
    SYSTEM_DEFAULTLOCALE=de-DE
    ENDPOINTS_TOREMOVE=img-to-pdf,remove-pages
    ```
  </TabItem>
</Tabs>

Restart the container or service after changing a variable.

## Common settings

| Setting | Default | What it does |
|---|---|---|
| `security.enableLogin` | `true` | Require sign-in. |
| `security.initialLogin.username`, `.password` | empty | First admin account. Only used while the database has no users. |
| `system.defaultLocale` | empty | Language for users who haven't picked one, such as `de-DE`. Empty uses the browser language, then `en-US`. |
| `ui.languages` | `[]` (all) | Languages users can choose, such as `["de_DE", "fr_FR"]`. |
| `system.fileUploadLimit` | empty (2000 MB) | Largest upload per request: a number from 0 to 999 plus `KB`, `MB` or `GB`, such as `2GB`. |
| `system.backendUrl`, `system.frontendUrl` | empty | Public addresses of the server and the web app. `backendUrl` is required for single sign-on callbacks. `frontendUrl` is used in invite emails, share links and mobile QR codes, and falls back to `backendUrl`. |
| `system.googlevisibility` | `false` | Let search engines index the server. |
| `system.showUpdate`, `system.showUpdateOnlyAdmin` | `true`, `true` | Show new-version notices, to admins only. |

`SYSTEM_ROOTURIPATH` (environment variable only) serves Stirling PDF under a sub-path such as `/pdf`.

For server options such as port, HTTPS and logging, see [Extra settings](./Customisation/Extra-Settings.md).

## File locations

In Docker these folders are at the root of the container (`/configs`, `/logs` and so on), ready to mount as volumes. A JAR creates them in the folder you start it from. To keep them somewhere else, set `STIRLING_BASE_PATH`.

| Folder | Contents |
|---|---|
| `configs/` | `settings.yml`, `custom_settings.yml`, the built-in database (`stirling-pdf-DB-*.mv.db`), automatic database backups in `backup/db/`, and generated keys |
| `logs/` | `info.log`, and `invalid-auths.log` for failed sign-ins (used by [Fail2Ban](./Security/Fail2Ban.md)) |
| `customFiles/` | `static/` for [branding](./Customisation/Branding.md) overrides, `signatures/` for [shared signature files](./Security/Signing.md) |
| `pipeline/` | `watchedFolders/` and `finishedFolders/` for [folder scanning](./Storage/Folder-Scanning.md) |
| `storage/` | Files users save on the server, when [file storage](./Storage/File-Storage.md) is on |

Back up `configs/` to keep your users, settings and keys. See the [Production checklist](./Production.md).
