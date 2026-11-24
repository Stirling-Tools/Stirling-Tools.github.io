---
sidebar_position: 5
title: OneDrive and SharePoint
sidebar_label: OneDrive and SharePoint
description: Let users open and save files in OneDrive and SharePoint, and use them in Processor pipelines.
---

# OneDrive and SharePoint

Let users open files from OneDrive and SharePoint in the editor, save them back, and use OneDrive and SharePoint folders as [Processor sources and destinations](../../Processor/Sources.md#onedrive-sharepoint-and-google-drive). Available from version 3.4.

| Feature | Needs |
|---|---|
| Opening files in the editor | `enabled`, `clientId` and the **Single-page application** redirect URI |
| Connected accounts and saving back to OneDrive | Also `clientSecret`, the **Web** redirect URI and login turned on |
| Organisation connections for pipelines | An app registration with application permissions ([Organisation connections](#organisation-connections)) |

## Before you start

- Serve Stirling PDF over HTTPS at a stable address. Behind a reverse proxy, set `system.frontendUrl` to the public address so the redirect URIs match.
- Allow outbound HTTPS from the server to `login.microsoftonline.com`, `graph.microsoft.com` and `*.sharepoint.com`.
- Microsoft sign-in opens in a pop-up, so users' browsers need pop-ups allowed for Stirling PDF.

## 1. Register an Entra app

In the Microsoft Entra admin center, open **App registrations → New registration**. Choose the supported account types and set Stirling's `tenant` to match:

| Supported account types | `tenant` |
|---|---|
| Accounts in this organizational directory only | Your tenant ID or domain |
| Accounts in any organizational directory | `organizations` |
| Accounts in any organizational directory and personal Microsoft accounts | `common` |

Then, on the new app:

1. Under **Authentication**, add both redirect URIs. Stirling shows the exact values on its settings card, including any base path.

   | Platform | Redirect URI |
   |---|---|
   | **Web** | `https://<server>/api/v1/connected-accounts/callback/microsoft` |
   | **Single-page application** | `https://<server>/msal-redirect.html` |

2. Under **Certificates & secrets**, create a client secret and copy its **Value**, which is shown once. Note the expiry date and replace the secret before it expires.
3. Under **API permissions**, add these delegated permissions, then select **Grant admin consent**:

   | API | Permission | Used for |
   |---|---|---|
   | Microsoft Graph | `Files.ReadWrite.All` | Saving back and pipelines |
   | Microsoft Graph | `Files.Read.All` | The file picker |
   | Microsoft Graph | `User.Read`, `openid`, `profile`, `email`, `offline_access` | Identifying the account and keeping it connected |
   | SharePoint | `MyFiles.Read` | OneDrive in the file picker |
   | SharePoint | `AllSites.Read` | SharePoint libraries in the file picker |

Registering the app needs the Application Administrator or Cloud Application Administrator role.

## 2. Configure Stirling PDF

Enter the values in **Settings → Server → Integrations → Microsoft 365 (OneDrive & SharePoint)**, or in `settings.yml`, then restart:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    premium:
      proFeatures:
        microsoft:
          enabled: true
          clientId: <client-id>         # Application (client) ID
          tenant: <tenant-id>           # or organizations / common
          clientSecret: <client-secret> # the secret's Value
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PREMIUM_PROFEATURES_MICROSOFT_ENABLED=true
    PREMIUM_PROFEATURES_MICROSOFT_CLIENTID=<client-id>
    PREMIUM_PROFEATURES_MICROSOFT_TENANT=<tenant-id>
    PREMIUM_PROFEATURES_MICROSOFT_CLIENTSECRET=<client-secret>
    ```
  </TabItem>
</Tabs>

| Setting | Default | Purpose |
|---|---|---|
| `enabled` | `false` | Turns OneDrive and SharePoint on. |
| `clientId` | empty | The app's Application (client) ID. |
| `clientSecret` | empty | Needed for connected accounts and saving back. |
| `tenant` | `common` | `common` (work, school and personal accounts), `organizations` (work and school only), or a tenant ID to admit one organisation. |
| `allowAccountConnections` | `true` | `false` stops users connecting their own account, leaving organisation connections. |
| `allowEditorSaves` | `true` | `false` stops the editor saving back to OneDrive: files opened from OneDrive download instead, and the server refuses OneDrive saves. |

After the restart, **Open from OneDrive** appears in the editor's **+** menu, and users can connect their account under **Settings → Connected accounts** ([OneDrive and SharePoint](../../Tools/Workspace/Files-and-Sharing.md#onedrive-and-sharepoint)).

## Organisation connections

An organisation connection reaches one OneDrive or one SharePoint document library through an app registration, so pipelines keep working when people leave. Save it under [Processor → Integrations](../../Processor/Integrations.md#storage-connection-settings).

The app registration needs Microsoft Graph application permissions, with admin consent from a Privileged Role Administrator or Global Administrator:

| Connection | Application permission |
|---|---|
| **OneDrive** | `Files.ReadWrite.All` |
| **SharePoint** | `Sites.ReadWrite.All`, or `Sites.Selected` with the `write` role granted on each site |

:::tip
Use a separate app registration for organisation connections, so these tenant-wide permissions stay apart from the app people sign in with.
:::

## Security

- Users sign in with the OAuth 2.0 authorization code flow and PKCE.
- Refresh tokens for connected accounts and organisation connection secrets are encrypted at rest with AES-256-GCM ([Processor server settings](../Automation/Processor-Settings.md)).
- The file picker downloads straight from Microsoft 365 to the browser. Saves and pipelines go through the server and Microsoft Graph.
- Connected accounts reach only what the person can open. To limit who can connect, turn on **Assignment required** for the app under **Enterprise applications** in Entra.

## Troubleshooting

| Symptom | Fix |
|---|---|
| **Open from OneDrive** is missing | Set `enabled` and `clientId`, then restart. |
| **Connected accounts** says your administrator hasn't turned them on | Set `clientSecret`, check `allowAccountConnections`, and turn login on. |
| `AADSTS50011` (redirect URI mismatch) | Add both redirect URIs exactly as the settings card shows them. Behind a proxy, set `system.frontendUrl`. |
| `AADSTS65001` or **Need admin approval** | Grant admin consent on the app's **API permissions** page. |
| `AADSTS700016` (application not found) | Match `tenant` to the app's supported account types. |
| `AADSTS7000215` (invalid client secret) | Enter the secret's **Value**, or create a new secret if it expired. |
| The file picker stays blank | If a proxy sets a Content-Security-Policy, allow `frame-src https://*.sharepoint.com https://onedrive.live.com`. |
| A connected account shows **Sign in again** and its pipelines pause | The user selects **Sign in again**. After a secret expires, update `clientSecret` first. |
| An organisation connection rejects the tenant | Use a tenant ID or domain such as `contoso.onmicrosoft.com`. |
