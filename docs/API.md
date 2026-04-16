---
sidebar_position: 7
id: API
title: API
description: REST API documentation, authentication, and usage examples for Stirling PDF
tags:
  - API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Stirling PDF API

Stirling PDF provides a REST API for all PDF operations available in the web UI. The API uses multipart form data for file uploads and returns processed files directly in the response body.

---

## API Documentation

Every Stirling PDF instance hosts its own interactive API documentation that exactly matches the installed version.

### Local Swagger UI (Recommended)

Navigate to your instance's Swagger UI to browse, test, and experiment with all endpoints directly in your browser:

```
http://<your-server>/swagger-ui/index.html
```

The path `/swagger-ui.html` also works as a redirect. For example: `http://localhost:8080/swagger-ui/index.html`

The Swagger UI lets you fill in parameters and execute requests against your running instance, which is the fastest way to learn how each endpoint works. You can also reach it from the Settings menu (gear icon in the top-right corner).

### OpenAPI Specification (Machine-Readable)

The raw OpenAPI 3.0 JSON specification is available at:

```
http://<your-server>/v1/api-docs
```

You can import this into tools like Postman or Insomnia, or use it to generate client libraries in any language.

:::caution Always Use Your Local Swagger UI
Always reference the Swagger UI on your own instance rather than external API documentation links. The endpoints and parameters may differ between versions, and your local Swagger UI is always accurate for your installed version.
:::

---

## API Authentication

When security is enabled, all API requests require authentication via the `X-API-KEY` header.

### User-Specific API Keys

1. Log into Stirling PDF
2. Go to Account Settings (via the gear icon)
3. Find your API key in the account details

### Global API Key

You can set a custom global API key via environment variable:

```bash
SECURITY_CUSTOMGLOBALAPIKEY=your-custom-api-key
```

This allows you to set a single API key that works regardless of user authentication.

### Using the API Key

Include the API key in every request using the `X-API-KEY` header:

```bash
curl -H "X-API-KEY: your-api-key-here" ...
```

If login/security is not enabled, the API endpoints are accessible without authentication.

---

## Basic Request Pattern

All PDF processing endpoints follow the same pattern:

1. Send a `POST` request with `Content-Type: multipart/form-data`
2. Attach the PDF file as `fileInput`
3. Include operation-specific parameters as form fields
4. Receive the processed PDF (or other output format) in the response body

Successful responses return the processed file directly with appropriate content headers (`Content-Type: application/pdf` and `Content-Disposition`). Error responses return JSON with details about what went wrong.

---

## API Limitations

Not all Stirling PDF features are available through the API. Some operations (such as "view-pdf" or "visually sign") run exclusively on the front end and are only available through the Web UI. If you find that some API endpoints appear to be missing, this is likely the reason.

Stirling PDF also provides health and statistics endpoints for integration with monitoring and dashboard applications.

---

## Example API Requests

### Merge Multiple PDFs

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/general/merge-pdfs" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@file1.pdf" \
      -F "fileInput=@file2.pdf" \
      -F "sortType=orderProvided" \
      > merged_output.pdf
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/general/merge-pdfs" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@file1.pdf" ^
      -F "fileInput=@file2.pdf" ^
      -F "sortType=orderProvided" ^
      > merged_output.pdf
    ```
  </TabItem>
</Tabs>

### Split a PDF by Pages

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/general/split-pages" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@document.pdf" \
      -F "pageNumbers=1,3,5-10" \
      > split_output.pdf
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/general/split-pages" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@document.pdf" ^
      -F "pageNumbers=1,3,5-10" ^
      > split_output.pdf
    ```
  </TabItem>
</Tabs>

### Convert Office Document to PDF

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/convert/file/pdf" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@document.docx" \
      > converted.pdf
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/convert/file/pdf" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@document.docx" ^
      > converted.pdf
    ```
  </TabItem>
</Tabs>

### Add Watermark

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/security/add-watermark" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@document.pdf" \
      -F "watermarkType=text" \
      -F "watermarkText=CONFIDENTIAL" \
      -F "fontSize=30" \
      -F "rotation=45" \
      -F "opacity=0.5" \
      > watermarked.pdf
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/security/add-watermark" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@document.pdf" ^
      -F "watermarkType=text" ^
      -F "watermarkText=CONFIDENTIAL" ^
      -F "fontSize=30" ^
      -F "rotation=45" ^
      -F "opacity=0.5" ^
      > watermarked.pdf
    ```
  </TabItem>
</Tabs>

### OCR a Scanned PDF

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/misc/ocr-pdf" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@scanned_document.pdf" \
      -F "languages=eng" \
      -F "ocrType=force-ocr" \
      > searchable_document.pdf
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/misc/ocr-pdf" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@scanned_document.pdf" ^
      -F "languages=eng" ^
      -F "ocrType=force-ocr" ^
      > searchable_document.pdf
    ```
  </TabItem>
</Tabs>

### Compress a PDF

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/general/optimize-pdf" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@large_document.pdf" \
      -F "optimizeLevel=2" \
      > compressed_document.pdf
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/general/optimize-pdf" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@large_document.pdf" ^
      -F "optimizeLevel=2" ^
      > compressed_document.pdf
    ```
  </TabItem>
</Tabs>

---

## Password Protection & Permissions

The add-password endpoint uses **prevent** flags (not allow flags). To restrict specific actions, set the corresponding `prevent*` parameter to `true`.

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/security/add-password" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@document.pdf" \
      -F "ownerPassword=OwnerPass123" \
      -F "keyLength=256" \
      -F "preventPrinting=false" \
      -F "preventModify=true" \
      -F "preventAssembly=true" \
      -F "preventExtractContent=true" \
      -F "preventExtractForAccessibility=false" \
      -F "preventFillInForm=false" \
      -F "preventModifyAnnotations=true" \
      -F "preventPrintingFaithful=false" \
      > protected_file.pdf
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/security/add-password" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@document.pdf" ^
      -F "ownerPassword=OwnerPass123" ^
      -F "keyLength=256" ^
      -F "preventPrinting=false" ^
      -F "preventModify=true" ^
      -F "preventAssembly=true" ^
      -F "preventExtractContent=true" ^
      -F "preventExtractForAccessibility=false" ^
      -F "preventFillInForm=false" ^
      -F "preventModifyAnnotations=true" ^
      -F "preventPrintingFaithful=false" ^
      > protected_file.pdf
    ```
  </TabItem>
</Tabs>

### Permission Flags Reference

| Flag | What it prevents when `true` |
|---|---|
| `preventPrinting` | Standard quality printing |
| `preventPrintingFaithful` | High fidelity printing |
| `preventModify` | Modifying document content |
| `preventModifyAnnotations` | Modifying annotations and comments |
| `preventAssembly` | Assembling the document (merge, rearrange pages) |
| `preventExtractContent` | Copying text and graphics |
| `preventExtractForAccessibility` | Extracting content for accessibility (screen readers) |
| `preventFillInForm` | Filling in form fields |

Supported key lengths: `128` (AES-128) and `256` (AES-256).

### Remove Password

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/security/remove-password" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@protected_file.pdf" \
      -F "password=CurrentPassword123" \
      > unlocked_file.pdf
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    curl -X POST "http://localhost:8080/api/v1/security/remove-password" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@protected_file.pdf" ^
      -F "password=CurrentPassword123" ^
      > unlocked_file.pdf
    ```
  </TabItem>
</Tabs>

---

## PDF-to-CSV and PDF-to-XLSX Conversion

These endpoints extract tabular data from PDF files:

<Tabs groupId="operating-systems">
  <TabItem value="unix" label="Unix/Linux/MacOS">
    ```bash
    # PDF to CSV
    curl -X POST "http://localhost:8080/api/v1/convert/pdf/csv" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@table_document.pdf" \
      -F "pageNumbers=all" \
      > extracted_tables.csv

    # PDF to Excel
    curl -X POST "http://localhost:8080/api/v1/convert/pdf/xlsx" \
      -H "X-API-KEY: your-api-key" \
      -F "fileInput=@table_document.pdf" \
      > extracted_tables.xlsx
    ```
  </TabItem>
  <TabItem value="windows" label="Windows CMD">
    ```bash
    REM PDF to CSV
    curl -X POST "http://localhost:8080/api/v1/convert/pdf/csv" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@table_document.pdf" ^
      -F "pageNumbers=all" ^
      > extracted_tables.csv

    REM PDF to Excel
    curl -X POST "http://localhost:8080/api/v1/convert/pdf/xlsx" ^
      -H "X-API-KEY: your-api-key" ^
      -F "fileInput=@table_document.pdf" ^
      > extracted_tables.xlsx
    ```
  </TabItem>
</Tabs>

:::danger Empty or 0-byte Output?
These endpoints extract text-based tables from PDFs. The text in your PDF must be selectable (not scanned images). If you get empty or 0-byte output, the PDF likely contains image-based content. Run OCR on the document first using the `/api/v1/misc/ocr-pdf` endpoint to make the text extractable, then retry the conversion. See [OCR Configuration](./Configuration/OCR.md) for language pack setup.
:::

---

## Response Handling

Always check the HTTP status code before processing the response body:

```bash
response=$(curl -s -w "\n%{http_code}" -X POST "http://localhost:8080/api/v1/general/merge-pdfs" \
  -H "X-API-KEY: your-api-key" \
  -F "fileInput=@file1.pdf" \
  -F "fileInput=@file2.pdf")

http_code=$(echo "$response" | tail -1)
if [ "$http_code" -ne 200 ]; then
  echo "Error: HTTP $http_code"
  echo "$response" | head -n -1
fi
```

---

## Rate Limits and Timeouts

The default async request timeout is **20 minutes** (1,200,000 ms). For very large files or complex operations, this can be adjusted:

```bash
SYSTEM_CONNECTIONTIMEOUTMILLISECONDS=1800000  # 30 minutes
```

Process-specific timeouts (LibreOffice, Tesseract, etc.) are configured separately — see the [Process Limits](./Configuration/Process-Limits.md) documentation.

---

## Health and Monitoring Endpoints

| Endpoint | Purpose |
|---|---|
| `/api/v1/info/status` | Application status (used by Docker health checks) |
| `/api/v1/info/health` | Detailed health information |
| `/actuator/health` | Spring Boot Actuator health endpoint |
| `/actuator/prometheus` | Prometheus-compatible metrics export |

---

## Related

- [Process Limits](./Configuration/Process-Limits.md) — Configure timeouts and concurrency for external tools
- [Production Deployment Guide](./Server-Admin-Onboarding.md) — Sizing and scaling recommendations
- [Diagnostics](./Configuration/Diagnostics.md) — Troubleshooting and reporting issues
