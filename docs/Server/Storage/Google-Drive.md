---
sidebar_position: 4
title: Google Drive file picker
sidebar_label: Google Drive
description: Let users open files from Google Drive in Stirling PDF by connecting a Google Cloud project to your server.
---

# Google Drive file picker

Let users pick files from their Google Drive when opening files in Stirling PDF. It works on every plan.

## 1. Set up Google Cloud

1. Create or choose a Google Cloud project, following **Setting up your environment** in Google's [Picker API guide](https://developers.google.com/workspace/drive/picker/guides/overview#setup).
2. In [Credentials](https://console.cloud.google.com/apis/credentials), select **Create credentials → OAuth client ID**. Add your Stirling PDF address (for example `https://pdf.example.com`) to the client's **Authorized JavaScript origins**.
3. In the same place, select **Create credentials → API key**.
4. Note your project number from [IAM & Admin settings](https://console.cloud.google.com/iam-admin/settings). This is the app ID.

## 2. Configure Stirling PDF

Enter the values in **Settings → Server → Integrations → Google Drive**, or in `settings.yml`:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    premium:
      proFeatures:
        googleDrive:
          enabled: true
          clientId: <client-id>   # the OAuth client ID
          apiKey: <api-key>       # the API key
          appId: <app-id>         # the project number
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PREMIUM_PROFEATURES_GOOGLEDRIVE_ENABLED=true
    PREMIUM_PROFEATURES_GOOGLEDRIVE_CLIENTID=<client-id>
    PREMIUM_PROFEATURES_GOOGLEDRIVE_APIKEY=<api-key>
    PREMIUM_PROFEATURES_GOOGLEDRIVE_APPID=<app-id>
    ```
  </TabItem>
</Tabs>
