---
sidebar_position: 7
id: API
title: API
description: Overview of API offering in S-PDF
tags:
  - API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Stirling PDF API

Stirling PDF exposes a simple API for easy integration with external scripts. You can access the API documentation in two ways:

1. Local Swagger UI at `/swagger-ui/index.html` on your Stirling-PDF instance
2. Online [Swagger Documentation](https://app.swaggerhub.com/apis-docs/Frooodle/Stirling-PDF/)

You can also access the documentation through the settings menu (gear icon in the top-right corner).

## Accessing API Documentation

### Local Swagger UI
Your Stirling-PDF instance includes built-in API documentation:
1. Navigate to `http://your-instance:port/swagger-ui/index.html`
2. Or append `/swagger-ui/index.html` to your Stirling-PDF URL
3. This provides an interactive documentation interface where you can:
   - View all available endpoints
   - Test API calls directly
   - See request/response schemas
   - View authentication requirements

### Settings Menu Access
1. Click the gear icon (⚙️) in the top-right corner
2. Look for the "API Documentation" or "API" link
3. This will take you to the local Swagger UI

## API Authentication

When security is enabled, all API requests require authentication. There are two ways to handle API authentication:

### User-Specific API Keys
1. Obtain your API key:
   - Log into Stirling-PDF
   - Go to Account Settings (via the gear icon)
   - Find your API key in the account details

### Global API Key
You can set a custom global API key using the environment variable:
```bash
SECURITY_CUSTOMGLOBALAPIKEY=your-custom-api-key
```
This allows you to set a single API key that works regardless of user authentication.

2. Include the API key in all requests:
   ```http
   X-API-KEY: your-api-key-here
   ```

3. Example authenticated request:
   ```bash
   curl -X POST "http://localhost:8080/add-watermark" \
        -H "X-API-KEY: your-api-key-here" \
        -H "Content-Type: multipart/form-data" \
        ...
   ```

## API Limitations

Stirling-PDF's feature set is not entirely confined to the backend, hence not all functionalities are accessible via the API. Certain operations, such as the "view-pdf" or "visually sign", are executed exclusively on the front-end, and as such, they are only available through the Web-UI. If you encounter a situation where some API endpoints appear to be absent, it is likely attributable to these front-end exclusive features.

Stirling-PDF also has statistic and health endpoints to integrate with monitoring/dashboard applications.

## Example CURL Commands

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/add-watermark" \
         -H "Content-Type: multipart/form-data" \
         -F "fileInput=@/Users/username/Downloads/sample-1_cropped.pdf" \
         -F "watermarkType=text" \
         -F "watermarkText=YOUR_WATERMARK_TEXT" \
         -F "alphabet=roman" \
         -F "fontSize=30" \
         -F "rotation=0" \
         -F "opacity=0.5" \
         -F "widthSpacer=50" \
         -F "heightSpacer=50" \
         > "/Users/username/Downloads/output.pdf"
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    curl -X POST "http://localhost:8080/add-watermark" ^
         -H "Content-Type: multipart/form-data" ^
         -F "fileInput=@C:\Users\systo\Downloads\sample-1_cropped.pdf" ^
         -F "watermarkType=text" ^
         -F "watermarkText=YOUR_WATERMARK_TEXT" ^
         -F "alphabet=roman" ^
         -F "fontSize=30" ^
         -F "rotation=0" ^
         -F "opacity=0.5" ^
         -F "widthSpacer=50" ^
         -F "heightSpacer=50" ^
         > "C:\Users\systo\Downloads\output.pdf"
    ```
  </TabItem>
</Tabs>