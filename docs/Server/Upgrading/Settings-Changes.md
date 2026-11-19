---
sidebar_position: 2
title: Settings changes
description: How settings.yml is migrated from V1, which settings were removed or renamed, and which new ones to review.
sidebar_label: Settings changes
---

# Settings changes

You don't need to edit `settings.yml` by hand to upgrade. The server updates it on every start, keeps your values and adds new settings with their defaults. If the file has fewer than 31 lines, the server saves it as a `.bak` and starts from the defaults, so put short overrides in `custom_settings.yml` or environment variables instead. See [settings.yml](../Configuration.md#settingsyml).

Environment variables still override the file. A variable for a removed setting does nothing.

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
| `storage.signing.userListScope` | Removed in 3.x |

## Changed defaults

These only affect a new settings file. An upgraded file keeps your values.

- `security.enableLogin` is now `true`.
- `system.showUpdate` and `system.showUpdateOnlyAdmin` are now `true`.
- `system.defaultLocale` is now empty, which uses the browser language. It was `en-US`.
- `storage.sharing.enabled` is now `true`.

## New settings to review

| Setting | Why it matters |
|---|---|
| `system.backendUrl`, `system.frontendUrl` | `backendUrl` is required for SSO callbacks. `frontendUrl` is used in invite and share links and when connecting to Stirling Cloud. See [OAuth2 / OIDC single sign-on](../Security/OAuth-SSO.md). |
| `system.corsAllowedOrigins` | Left empty, it allows every origin. List your own origins to restrict it. |
| `security.xFrameOptions` | With login on, the default `DENY` stops other sites embedding Stirling PDF. |
| `mail.enableInvites` | Invite users by email. Needs `mail.enabled` and login. See [Sign-in and security](../Security/Sign-in-and-Security.md). |
| `security.validation`, `security.timestamp`, `system.serverCertificate` | Signature checking, timestamp servers and the server signing certificate. See [Signing certificates and trust](../Security/Signing.md). |
| `security.honorOwnerPasswords`, `security.blockSignedPdfEdits` | PDF permissions and signed PDFs. See [PDF permissions](../Security/Sign-in-and-Security.md#pdf-permissions). |
| `security.scimToken`, `security.scimDeleteRemovesUser` | SCIM user provisioning. See [SCIM](../Security/Sign-in-and-Security.md#scim-user-provisioning). |
| `security.oauth2.redirectBaseUrl`, `security.saml2.redirectBaseUrl` | Public URL for SSO callbacks behind a proxy. |
| `system.setupCompleted` | First-run setup wizard. Added as `true` on upgrade, so upgraded servers skip it. |
| `system.maxImageMegapixels`, `system.maxPdfaConversionPages` | See [Processing limits](../Operations/Performance.md#processing-limits). |
| `system.enableFeedback` | Feedback button. |
| `ui.defaultToolPanelMode`, `ui.defaultStartupView` | Default tool picker mode and startup view for users. |
| `premium.proFeatures.microsoft` | OneDrive and SharePoint. See [OneDrive and SharePoint](../Storage/OneDrive.md). |

`storage` ([File storage and sharing](../Storage/File-Storage.md)) is new and on by default when login is on.

`toolRecommendations` is new and on by default. With login on, it records which tools each user runs, in your own database.
