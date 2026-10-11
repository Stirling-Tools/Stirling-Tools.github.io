---
sidebar_position: 1
title: REST API
sidebar_label: REST API
description: Call Stirling PDF tools over HTTP on Stirling Cloud or a self-hosted server, with API keys, examples and usage limits.
---

# REST API

Every server-side tool in Stirling PDF has a REST endpoint. Send the file as `multipart/form-data` and the response is the processed file.

## Base URL, keys and reference

<Tabs groupId="product">
  <TabItem value="cloud" label="Stirling Cloud">

- **Base URL:** `https://api.stirling.com`
- **API key:** see [API and MCP](../Cloud/API-and-MCP.md#get-an-api-key).
- **Reference:** [Stirling PDF Processing API](https://registry.scalar.com/@stirlingpdf/apis/stirling-pdf-processing-api/). To try calls in the browser, use `https://api.stirling.com/swagger-ui/index.html`.

  </TabItem>
  <TabItem value="self-hosted" label="Self-hosted">

- **Base URL:** your server's address, plus its sub-path if the admin set one ([Extra settings](../Server/Customisation/Extra-Settings.md)), for example `http://localhost:8080` or `https://example.com/pdf`.
- **API key:** <Badge>Login required</Badge> sign in and open **Settings → Preferences → API Keys**. With login off, the API needs no key.
- **Reference:** `/swagger-ui/index.html` on your server lists every endpoint your build has and lets you try calls. The OpenAPI spec is at `/v1/api-docs`.

  </TabItem>
</Tabs>

## Authentication

Send the key on every request:

```http
X-API-KEY: your-api-key
```

The request runs as the key's owner. A missing or invalid key returns `401`.

### Global API key (self-hosted only)

An admin can set one server-wide key for scripts and automation platforms that have no user account. It is not in the shipped `settings.yml`, so set it in `custom_settings.yml` ([Extra settings](../Server/Customisation/Extra-Settings.md)) or as an environment variable:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="custom_settings.yml">
    ```yaml
    security:
      customGlobalAPIKey: your-custom-api-key
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_CUSTOMGLOBALAPIKEY=your-custom-api-key
    ```
  </TabItem>
</Tabs>

Requests with this key run as a built-in API user. It only matters when login is enabled ([Sign-in and security](../Server/Security/Sign-in-and-Security.md)); without login the API is open.

## Endpoints

Operations live at `/api/v1/<category>/<operation>`, for example `/api/v1/misc/compress-pdf` or `/api/v1/security/add-watermark`. Look up the exact path and parameters in the reference.

- A few tools, such as the viewer and drawing a signature, run only in the browser and have no endpoint.
- Some operations exist only in the API: PDF to PostScript, EPS, PCL or XPS (`/api/v1/convert/pdf/vector`, with `outputFormat` set to `ps`, `eps`, `pcl` or `xps`), PostScript or EPS to PDF (`/api/v1/convert/vector/pdf`), decompressing a PDF's streams (`/api/v1/misc/decompress-pdf`) and the `normalize` option of `/api/v1/misc/compress-pdf`.
- File storage and sharing (`/api/v1/storage/...`) is in Swagger UI and `/v1/api-docs`, but not in the Processing API reference. On a self-hosted server it needs [File storage and sharing](../Server/Storage/File-Storage.md) turned on.
- `GET /api/v1/info/status` is a health check that needs no key. On a self-hosted server, the uptime and request-count endpoints are listed in [Usage monitoring](../Server/Operations/Usage-Monitoring.md).
- Add `?async=true` to a tool call to get a job ID back instead of the file. Poll `GET /api/v1/general/job/{jobId}`, then download the output from `GET /api/v1/general/job/{jobId}/result`.
- To run several tools in one request, use the [Pipeline API](./Pipeline-API.md). To let an AI assistant call the tools, use the [MCP server](../MCP/MCP.md).

## Examples

Set `STIRLING_URL` to your base URL and `STIRLING_API_KEY` to your key. The examples use bash syntax. In Windows CMD, write the variables as `%STIRLING_URL%` and `%STIRLING_API_KEY%` and end continued lines with `^` instead of `\`.

Compress a PDF:

```bash
curl -X POST "$STIRLING_URL/api/v1/misc/compress-pdf" \
  -H "X-API-KEY: $STIRLING_API_KEY" \
  -F "fileInput=@document.pdf" \
  -F "optimizeLevel=5" \
  -o compressed.pdf
```

OCR a scan in English and German. List parameters are sent as repeated fields:

```bash
curl -X POST "$STIRLING_URL/api/v1/misc/ocr-pdf" \
  -H "X-API-KEY: $STIRLING_API_KEY" \
  -F "fileInput=@scanned.pdf" \
  -F "languages=eng" \
  -F "languages=deu" \
  -F "ocrType=skip-text" \
  -F "ocrRenderType=hocr" \
  -o searchable.pdf
```

Convert a PDF to Word:

```bash
curl -X POST "$STIRLING_URL/api/v1/convert/pdf/word" \
  -H "X-API-KEY: $STIRLING_API_KEY" \
  -F "fileInput=@document.pdf" \
  -F "outputFormat=docx" \
  -o document.docx
```

## Automation platforms

There are no dedicated plugins for n8n, Zapier, Make or Power Automate. Use the platform's generic HTTP request action: method `POST`, body `multipart/form-data`, the file in `fileInput`, and the key in an `X-API-KEY` header. To chain steps in one call, send a pipeline to the [Pipeline API](./Pipeline-API.md).

## Usage allowance

Running regular tools yourself in the app doesn't count. Tool calls made with an API key do:

- **Stirling Cloud:** every API-key call uses your team's credits. When the free credits or your spend cap run out, calls return `402` with `PAYG_LIMIT_REACHED`. See [Plans, credits and billing](../Cloud/Plans-and-Billing.md).
- **Self-hosted:** calls use the server's processing allowance, and return `402` with `ACCOUNT_LINK_REQUIRED` when it runs out. See [Processing allowance](../Server/Licensing/Connect-to-Stirling-Cloud.md#processing-allowance).
