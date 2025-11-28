---
sidebar_position: 5
tags: [server, management, feature, advanced feature]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Google Drive File Picker
> **Tier**: Server

Stirling-PDF allows users to select Files for processing through tools via google drive.

## Google Api Access
To enable this features for your users, you must first set up your Google environment. This includes creating a Google Cloud project. Follow the **Setting up your environment** section of [this guide](https://developers.google.com/workspace/drive/picker/guides/overview#setup) to do so.

## Stirling PDF configuration

```yaml
premium:
  ...
  enabled: true # Enable license key checks for pro/enterprise features
  proFeatures:
    ...
    googleDrive:
      enabled: true
      clientId: <YOUR_CLIENT_ID>
      apiKey: <YOUR_API_KEY>
      appId: <YOUR_APP_ID>
```
- `premium.enabled`: Set to `true` to enable premium features. 
- `googleDrive.enabled`: Set to `true` to enable google drive file picker features. 
- `googleDrive.clientId`: Your Google web app's client ID. [Go to Credentials](https://console.cloud.google.com/apis/credentials) and Click **Create credentials > OAuth client ID**.
- `googleDrive.apiKey`: API key for google api access. [Go to Credentials](https://console.cloud.google.com/apis/credentials) and Click **Create credentials > API key**.
- `googleDrive.appId`: Google drive app ID also known as your Project Number Found in your [IAM&Admin Project Settings](https://console.cloud.google.com/iam-admin/settings)


 > #### ⚠️ Note
> _You must set the Authorized Javascript origins for your OAuth client ID to include your Stirling PDF host domain or IP address._

## Configurations Examples
Below are examples of the full configuration for enabling the google Drive Picker:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    premium:
      enabled: true # Enable license key checks for pro/enterprise features
      proFeatures:
        googleDrive:
          enabled: true
          clientId: <YOUR_CLIENT_ID>
          apiKey: <YOUR_API_KEY>
          appId: <YOUR_APP_ID>
    ```
  </TabItem>
  <TabItem value="local" label="Local Environment">
    ```bash
    export PREMIUM_ENABLED=true
    export PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_ENABLED=true
    export PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_CLIENT_ID="<YOUR_CLIENT_ID>"
    export PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_API_KEY="<YOUR_API_KEY>"
    export PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_APP_ID="<YOUR_APP_ID>"
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e PREMIUM_ENABLED=true \
    -e PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_ENABLED=true \
    -e PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_CLIENT_ID="<YOUR_CLIENT_ID>" \
    -e PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_API_KEY="<YOUR_API_KEY>" \
    -e PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_APP_ID="<YOUR_APP_ID>" \
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      PREMIUM_ENABLED: true
      PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_ENABLED: true
      PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_CLIENT_ID: <YOUR_CLIENT_ID>
      PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_API_KEY: <YOUR_API_KEY>
      PREMIUM_PRO_FEATURES_GOOGLE_DRIVE_APP_ID: <YOUR_APP_ID>
    ```
  </TabItem>
</Tabs>
