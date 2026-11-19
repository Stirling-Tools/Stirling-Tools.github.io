---
sidebar_position: 5
title: OneDrive and SharePoint
sidebar_label: OneDrive and SharePoint
description: Let users open and save files in OneDrive and SharePoint, and use them in Processor pipelines.
---

# OneDrive and SharePoint

Let users open files from OneDrive and SharePoint in the editor, save them back, and use them as [Processor sources](../../Processor/Sources.md). Connecting accounts needs login turned on.

## 1. Register an Entra app

1. Register an app in the Microsoft Entra admin center. Allow personal Microsoft accounts if people use personal OneDrive.
2. Add the redirect URIs `https://<server>/api/v1/connected-accounts/callback/microsoft` as **Web** and `https://<server>/msal-redirect.html` as **Single-page application**.
3. Add the Microsoft Graph delegated permissions `Files.ReadWrite.All` and `Files.Read.All`, and the SharePoint delegated permissions `MyFiles.Read` and `AllSites.Read`.
4. Create a client secret.

## 2. Configure Stirling PDF

Enter the values in **Settings → Server → Integrations → Microsoft 365 (OneDrive & SharePoint)**, or in `settings.yml` under `premium.proFeatures.microsoft`, then restart.

| Setting | Default | Purpose |
|---|---|---|
| `enabled` | `false` | Turns OneDrive and SharePoint on. |
| `clientId` | empty | The app's Application (client) ID. |
| `clientSecret` | empty | Needed for connected accounts. |
| `tenant` | `common` | `common` (work, school and personal accounts), `organizations` (work and school only), or a tenant ID to admit one organisation. |
| `allowAccountConnections` | `true` | `false` stops users connecting their own account. |
| `allowEditorSaves` | `true` | `false` stops the editor saving back to OneDrive. |

Environment variables use the `PREMIUM_PROFEATURES_MICROSOFT_` prefix, for example `PREMIUM_PROFEATURES_MICROSOFT_CLIENTID`.
