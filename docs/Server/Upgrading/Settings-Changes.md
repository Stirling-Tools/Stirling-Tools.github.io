---
sidebar_position: 2
title: Settings changes
description: How settings.yml is migrated from V1, which settings were removed or renamed, and which new ones to review.
sidebar_label: Settings changes
---

# Settings changes

You don't need to edit `settings.yml` by hand to upgrade. On every start, the server rewrites it to match the current settings template:

- Your values are kept for every setting that still exists.
- New settings are added with their defaults.
- Settings that no longer exist are removed. Commented-out entries come back with their default value.
- A file with fewer than 31 lines is treated as invalid: it is saved as `settings.yml.<timestamp>.bak` and replaced with the defaults. Put short overrides in `custom_settings.yml` or environment variables instead.

Environment variables still override the file, using the same naming, for example `UI_APPNAMENAVBAR` for `ui.appNameNavbar`. A variable for a removed setting does nothing.

## Removed and renamed settings

| V1 setting | Now |
|---|---|
| `enterpriseEdition.*` | `premium.*`, moved automatically |
| `premium.proFeatures.CustomMetadata.*` | `premium.proFeatures.customMetadata.*`, moved automatically |
| `premium.proFeatures.SSOAutoLogin` | `security.ssoAutoLogin`, moved automatically |
| `ui.appName`, `ui.homeDescription` | Removed. `ui.appNameNavbar` sets the browser tab title and the issuer name in authenticator apps. The home description has no replacement. |
| `security.jwt.enabled`, `keyCleanup`, `keyRetentionDays`, `secureCookie` | Removed. Key cleanup is now `security.jwt.enableKeyCleanup` (default `true`). Sign-in lifetimes are `security.jwt.tokenExpiryMinutes` (default `1440`) and `desktopTokenExpiryMinutes` (default `43200`, for the desktop app). |
| `security.csrfDisabled` | Removed |
| `pdf-organizer` in `endpoints.toRemove` | `rearrange-pages`. Change it yourself, or the page reordering tools come back. |

## Changed defaults

These only affect a new settings file. An upgraded file keeps your values.

- `security.enableLogin` is now `true`.
- `system.showUpdate` and `system.showUpdateOnlyAdmin` are now `true`.
- `system.defaultLocale` is now empty, which uses the browser language. It was `en-US`.

## New settings to review

| Setting | Why it matters |
|---|---|
| `system.backendUrl`, `system.frontendUrl` | `backendUrl` is required for SSO callbacks. `frontendUrl` is used in invite and share links and when connecting to Stirling Cloud. See [OAuth2 / OIDC single sign-on](../Security/OAuth-SSO.md). |
| `system.corsAllowedOrigins` | Left empty, it allows every origin. List your own origins to restrict it. |
| `security.xFrameOptions` | With login on, the default `DENY` stops other sites embedding Stirling PDF. |
| `mail.enableInvites` | Invite users by email. Needs `mail.enabled` and login. See [Sign-in and security](../Security/Sign-in-and-Security.md). |
| `security.validation`, `security.timestamp`, `system.serverCertificate` | Signature checking, timestamp servers and the server signing certificate. See [Signing certificates and trust](../Security/Signing.md). |

`storage` ([File storage and sharing](../Storage/File-Storage.md)) is new and on by default when login is on.

These new sections are off by default:

- `aiEngine`: [AI on your server](../AI/AI.md)
- `mcp`: [MCP server settings](../Automation/MCP-Server.md)
- `cluster`: [Clustering](../Operations/Clustering.md)
- `telegram`: [Telegram bot](../Automation/Telegram-Bot.md)
