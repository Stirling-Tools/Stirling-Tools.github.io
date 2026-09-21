---
sidebar_position: 5
tags: [server, management, feature, advanced feature]
---

# Google Drive File Picker
> **Tier**: Team

Stirling PDF allows users to select Files for processing through tools via google drive.

## Google Api Access
To enable this features for your users, you must first set up your Google environment. This includes creating a Google Cloud project. Follow the **Setting up your environment** section of [this guide](https://developers.google.com/workspace/drive/picker/guides/overview#setup) to do so.

## Stirling PDF configuration

```yaml
premium:
  # Other premium settings, such as the licence key, go here
  enabled: true # Enable license key checks for pro/enterprise features
  proFeatures:
    # Other proFeatures settings may be included here
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
    export PREMIUM_PROFEATURES_GOOGLEDRIVE_ENABLED=true
    export PREMIUM_PROFEATURES_GOOGLEDRIVE_CLIENTID="<YOUR_CLIENT_ID>"
    export PREMIUM_PROFEATURES_GOOGLEDRIVE_APIKEY="<YOUR_API_KEY>"
    export PREMIUM_PROFEATURES_GOOGLEDRIVE_APPID="<YOUR_APP_ID>"
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e PREMIUM_ENABLED=true \
    -e PREMIUM_PROFEATURES_GOOGLEDRIVE_ENABLED=true \
    -e PREMIUM_PROFEATURES_GOOGLEDRIVE_CLIENTID="<YOUR_CLIENT_ID>" \
    -e PREMIUM_PROFEATURES_GOOGLEDRIVE_APIKEY="<YOUR_API_KEY>" \
    -e PREMIUM_PROFEATURES_GOOGLEDRIVE_APPID="<YOUR_APP_ID>" \
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      PREMIUM_ENABLED: "true"
      PREMIUM_PROFEATURES_GOOGLEDRIVE_ENABLED: "true"
      PREMIUM_PROFEATURES_GOOGLEDRIVE_CLIENTID: <YOUR_CLIENT_ID>
      PREMIUM_PROFEATURES_GOOGLEDRIVE_APIKEY: <YOUR_API_KEY>
      PREMIUM_PROFEATURES_GOOGLEDRIVE_APPID: <YOUR_APP_ID>
    ```
  </TabItem>
</Tabs>
