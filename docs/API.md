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

1. Local Swagger UI at `/swagger-ui.html` on your Stirling PDF instance
2. Online [Swagger Documentation](https://app.swaggerhub.com/apis-docs/Frooodle/Stirling-PDF/)

You can also access the documentation through the settings menu (gear icon in the top-right corner).

## Accessing API Documentation

### Local Swagger UI
Your Stirling PDF instance includes built-in API documentation:
1. Navigate to `http://your-instance:port/swagger-ui.html`
2. Or append `/swagger-ui.html` to your Stirling PDF URL
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
   - Log into Stirling PDF
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
   curl -X POST "http://localhost:8080/api/v1/security/add-watermark" \
        -H "X-API-KEY: your-api-key-here" \
        -H "Content-Type: multipart/form-data" \
        ...
   ```

## Endpoint Paths

:::info
Every operation lives under `/api/v1/<category>/<operation>` - the category (`security`, `general`, `misc`, `convert`, etc.) comes from the controller, so "Add Watermark" is at `/api/v1/security/add-watermark`. The exact path for any operation is shown in the [Swagger UI](#local-swagger-ui).
:::

### AI assistants / MCP

To drive these endpoints from an AI assistant (Claude Desktop, Cursor, etc.) over the Model Context Protocol, see [MCP Server](./Advanced%20Configuration/MCP-Server.md).

## API Limitations

Stirling PDF's feature set is not entirely confined to the backend, hence not all functionalities are accessible via the API. Certain operations, such as the "view-pdf" or "visually sign", are executed exclusively on the front-end, and as such, they are only available through the Web-UI. If you encounter a situation where some API endpoints appear to be absent, it is likely attributable to these front-end exclusive features.

Stirling PDF also has statistic and health endpoints to integrate with monitoring/dashboard applications.

## Example CURL Commands

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/security/add-watermark" \
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
    curl -X POST "http://localhost:8080/api/v1/security/add-watermark" ^
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

## Integrations (n8n, Zapier, Make, Power Automate, etc.)

Stirling PDF does not ship dedicated plugins or nodes for any specific automation platform. Integration is **via the REST API** documented above, which works with any tool that can make an authenticated HTTP request.

### What this looks like in practice

- **n8n**: use the built-in [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) pointed at your Stirling PDF instance. Set method `POST`, content type `multipart/form-data`, attach the binary as `fileInput`, add the `X-API-KEY` header, and connect the binary output to a `Read/Write Binary File` node or onward to your storage.
- **Zapier / Make / Power Automate**: use the generic HTTP / Webhooks action with the same multipart pattern.
- **Home Assistant**: a `rest_command` definition pointing at the appropriate Stirling endpoint.
- **Bash / Python / JavaScript**: any HTTP client (`curl`, `requests`, `fetch`) - the curl examples on this page translate directly.

### Common automation recipe: chain multiple operations in one call

Rather than wiring 5 separate HTTP nodes for "OCR then compress then watermark then sign...", you could use the **pipeline endpoint** to chain everything in one request:

- Endpoint: `POST /api/v1/pipeline/handleData`
- Request: multipart with one or more `fileInput` parts plus a `json` field containing the full pipeline configuration
- Response: a single processed file, or a ZIP if the pipeline produced multiple outputs

Full schema, operation list, parameter reference, and curl examples: see **[Pipeline Automation](./Configuration/Pipeline.md#rest-api-post-apiv1pipelinehandledata)**.

### Building the pipeline JSON

The fastest path is:
1. Build the workflow visually in the **Automate** tool inside Stirling PDF.
2. Click **Export for Folder Scanning** in the save panel - this produces the JSON in the format the API expects.
3. Drop that JSON into your automation tool's HTTP request as the `json` form field.

Re-import the same file later via the Automate UI's import dialog to round-trip workflows between machines.

### Authentication for automation tools

When security is enabled, set a global API key once via `SECURITY_CUSTOMGLOBALAPIKEY=<key>` and reference it from your automation tool as the `X-API-KEY` header. This avoids needing per-user logins from headless scripts.
