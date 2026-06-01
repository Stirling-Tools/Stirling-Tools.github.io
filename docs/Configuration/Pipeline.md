---
sidebar_position: 11
id: Pipeline
title: Pipeline Automation (Automate)
description: Create automated multi-step PDF workflows with the Automate tool
---

# Pipeline Automation (Automate)

**Tool ID:** `automate`

Create powerful automated workflows that combine multiple PDF operations into sequential processes. The Automate tool (formerly called "Pipeline") lets you build, save, and reuse complex PDF processing workflows.

:::info V2.0 Update - New "Automate" Feature
In V2.0, the pipeline frontend interface has been redesigned as the **"Automate"** feature with an improved user experience for creating and managing automation workflows. The backend pipeline system (JSON configuration and folder scanning) continues to work the same way.

**What changed:**
- Backend pipeline processing - **No changes**
- JSON pipeline configurations - **Still work exactly the same**
- Folder scanning with pipelines - **Still works the same**
- Frontend interface - **Now called "Automate" with better UX**

If you have existing pipeline JSON files, they continue to work in V2.0's Automate feature.
:::

---

## What is Pipeline Automation?

Pipeline automation allows you to:
- **Chain operations** - Combine multiple PDF tools in sequence
- **Save workflows** - Reuse common operation sequences
- **Automate processing** - Process files automatically with folder scanning
- **Standardize procedures** - Ensure consistent processing across teams
- **Batch process** - Apply same workflow to multiple files

Think of it as **"macros for PDFs"** - record your steps once, replay them unlimited times.

---

## Why Use Pipelines?

### Without Pipelines:
1. Upload PDF to Split tool, download split files
2. Upload each split file to Watermark tool, download watermarked files
3. Upload each watermarked file to Compress tool, download final files
4. Repeat for every batch of documents

### With Pipelines:
1. Create "Split-Watermark-Compress" pipeline once
2. Upload PDFs, automatic processing, download results
3. Reuse same pipeline for all future batches

**Time saved:** Minutes per file, hours per day.

---

## Key Concepts

### Operations
Individual PDF tools that perform specific tasks:
- Split, Merge, Compress, Watermark, etc.
- Each operation has configurable parameters
- Operations execute in the order you define

### Pipeline
A sequence of operations with saved configurations:
- Named workflow (e.g., "Invoice Processing")
- Ordered list of operations
- Pre-configured settings for each operation
- Reusable across multiple files

### Pipeline Configuration (JSON)
Text file that defines your pipeline:
- Lists operations in order
- Specifies parameters for each operation
- Can be shared, versioned, and backed up
- Human-readable and editable

### Folder Scanning
Automated processing mode:
- Watch a folder for new files
- Automatically apply pipeline to new files
- Move processed files to output folder
- Unattended batch processing

---

## Getting Started with Automate

### Accessing the Automate Tool

1. **From Home Page**
   - Click "Automate" in Advanced Tools section
   - Or search for "automate" or "pipeline"

2. **Open Configuration Builder**
   - Click "Configure Pipeline" button
   - Pipeline builder interface opens

---

## Building Your First Pipeline

## Steps to Configure and Use Your Pipeline

1. **Access Configuration**
   - Upon entering the screen, click on the **Configure** button.

2. **Enter Pipeline Name**
   - Provide a name for your pipeline in the designated field.

3. **Select Operations**
   - Choose the operations for your pipeline (e.g., **Split Pages**), then click **Add Operation**.

4. **Configure Operation Settings**
   - Input the necessary settings for each added operation. Settings are highlighted in yellow if customization is needed.

5. **Add More Operations**
   - You can add and adjust the order of multiple operations. Ensure each operation's settings are customized.

6. **Save Settings**
   - Click **Save Operation Settings** after customizing settings for each operation.

7. **Validate Pipeline**
   - Use the **Validation** button to check your pipeline. A green indicator signifies correct setup; a pop-out error indicates issues.

8. **Download Pipeline Configuration**
   - The Automate UI offers two download buttons:
     - **Export** - downloads `<name>.automate.json` in the **native Automate format** with frontend tool IDs. Use this for re-importing into another Stirling PDF instance via the UI.
     - **Export for Folder Scanning** - downloads `<name>.folder-scan.json` in the **backend format** with full endpoint paths. Use this for the REST API and for folder scanning.
   - To pre-load a pipeline for all users, place a folder-scanning-format JSON file in `/pipeline/defaultWebUIConfigs/` - it will appear in the dropdown.

9. **Submit Files for Processing**
   - If your pipeline is correctly set up, close the configure menu, input the files, and hit **Submit**.

10. **Note on Web UI Limitations**
    - The current web UI version does not support operations that require multiple different types of inputs, such as adding a separate image to a PDF.

### Current Limitations

- Cannot have more than one of the same operation.
- Cannot input additional files via UI.
- All files and operations run in serial mode.

---

## Example Pipelines

### Example 1: Invoice Processing
**Goal:** Process scanned invoices for archival

**Pipeline Steps:**
1. **OCR** - Make invoices searchable
   - Language: English
   - Preserve formatting: Yes
2. **Crop** - Remove scanner edges
   - Margins: 0.5 inches all sides
3. **Add Watermark** - Mark as processed
   - Text: "PROCESSED [DATE]"
   - Position: Bottom right
   - Opacity: 50%
4. **Compress** - Reduce file size
   - Level: Medium
5. **Add Password** - Secure documents
   - Password: [configured per run]

**Use Case:** Accounting department processing hundreds of invoices monthly

---

### Example 2: Report Distribution
**Goal:** Prepare reports for external sharing

**Pipeline Steps:**
1. **Remove Pages** - Remove internal pages
   - Pages: 2,3 (remove cover sheets)
2. **Add Page Numbers** - Number all pages
   - Position: Bottom center
   - Format: "Page X of Y"
3. **Add Stamp** - Add "CONFIDENTIAL" stamp
   - Position: Top right
   - Color: Red
4. **Change Permissions** - Restrict editing
   - Allow printing: Yes
   - Allow editing: No
5. **Compress** - Optimize for email
   - Level: High

**Use Case:** Monthly reports sent to clients

---

### Example 3: Document Standardization
**Goal:** Standardize format of received documents

**Pipeline Steps:**
1. **Rotate** - Fix orientation
   - Mode: Auto-detect
2. **Scale Pages** - Standardize to Letter size
   - Target: 8.5 x 11 inches
3. **Add Metadata** - Tag documents
   - Title: [Auto-extracted]
   - Author: "Company Name"
   - Keywords: "Standardized, Processed"
4. **Remove Annotations** - Clean markup
5. **Flatten** - Remove form fields

**Use Case:** HR department standardizing employee submissions

---

### Example 4: Batch Conversion
**Goal:** Convert and optimize image scans

**Pipeline Steps:**
1. **Convert** - Images to PDF
   - Source: JPG, PNG
2. **OCR** - Add text layer
   - Language: Multiple
3. **Remove Blanks** - Delete empty pages
   - Threshold: 95%
4. **Compress** - Optimize size
   - Level: Medium
5. **PDF/A** - Convert for archival
   - Version: PDF/A-2b

**Use Case:** Digitization project for paper archives

---

## Common Pipeline Patterns

### Quality Enhancement Pipeline
**Pattern:** Improve scanned document quality
```
OCR → Remove Blanks → Adjust Contrast → Compress → Add Metadata
```

### Security Pipeline
**Pattern:** Secure documents for distribution
```
Remove Metadata → Add Watermark → Add Password → Change Permissions
```

### Compression Pipeline
**Pattern:** Reduce file sizes for storage/email
```
Remove Annotations → Remove Images (optional) → Compress → Validate
```

### Branding Pipeline
**Pattern:** Add company branding to documents
```
Add Watermark → Add Stamp → Add Page Numbers → Add Metadata
```

### Preparation Pipeline
**Pattern:** Prepare documents for printing
```
Rotate → Scale Pages → Booklet Imposition → Remove Annotations
```

---

## JSON Configuration

### Basic Structure

A pipeline JSON file has a `name` and a `pipeline` array. Each entry has an `operation` (the full API endpoint path) and a `parameters` object:

```json
{
  "name": "My Pipeline",
  "pipeline": [
    {
      "operation": "/api/v1/general/split-pages",
      "parameters": {
        "pageNumbers": "5"
      }
    },
    {
      "operation": "/api/v1/misc/compress-pdf",
      "parameters": {
        "optimizeLevel": 5,
        "expectedOutputSize": ""
      }
    }
  ]
}
```

:::note Operation names are full endpoint paths
Pipeline operation names use the **full REST API path**, not short names. For example, use `/api/v1/general/split-pages` (not just `split-pages`). The Folder-Scanning export from the Automate UI produces these paths automatically.

If you have older pipeline JSONs that used short names, regenerate them from the Automate UI using **Export for Folder Scanning**.
:::

### Optional fields

For folder scanning (not used by the REST API):

```json
{
  "name": "...",
  "pipeline": [ ... ],
  "outputDir": "{outputFolder}/{folderName}",
  "outputFileName": "{filename}-{pipelineName}-{date}-{time}"
}
```

`outputDir` and `outputFileName` accept the placeholders `{outputFolder}`, `{folderName}`, `{filename}`, `{pipelineName}`, `{date}`, `{time}`.

---

## Operation Reference

Every operation in a pipeline JSON uses the full API path. The complete list, grouped by API namespace:

### General (`/api/v1/general/...`)

| Operation | Purpose |
|---|---|
| `/api/v1/general/merge-pdfs` | Combine multiple PDFs |
| `/api/v1/general/split-pages` | Split by page numbers / ranges |
| `/api/v1/general/split-by-size-or-count` | Split by file size or page count |
| `/api/v1/general/split-pdf-by-sections` | Split into N x M grid sections |
| `/api/v1/general/split-pdf-by-chapters` | Split at chapter bookmarks |
| `/api/v1/general/rotate-pdf` | Rotate all pages |
| `/api/v1/general/rearrange-pages` | Reorder pages |
| `/api/v1/general/remove-pages` | Remove specific pages |
| `/api/v1/general/remove-image-pdf` | Strip embedded images |
| `/api/v1/general/crop` | Crop pages |
| `/api/v1/general/scale-pages` | Resize page dimensions |
| `/api/v1/general/multi-page-layout` | N-up layout |
| `/api/v1/general/overlay-pdfs` | Overlay one PDF on another |
| `/api/v1/general/split-for-poster-print` | Tile pages for poster printing |
| `/api/v1/general/edit-text` | Edit text content |
| `/api/v1/general/edit-table-of-contents` | Edit bookmarks/TOC |
| `/api/v1/general/extract-bookmarks` | Export bookmarks |
| `/api/v1/general/pdf-to-single-page` | Combine all pages into one tall page |
| `/api/v1/general/booklet-imposition` | Reorder pages for booklet printing |

### Miscellaneous (`/api/v1/misc/...`)

| Operation | Purpose |
|---|---|
| `/api/v1/misc/compress-pdf` | Reduce file size |
| `/api/v1/misc/decompress-pdf` | Remove compression |
| `/api/v1/misc/repair` | Fix corrupt PDFs |
| `/api/v1/misc/ocr-pdf` | OCR scanned PDFs |
| `/api/v1/misc/flatten` | Flatten form fields / annotations |
| `/api/v1/misc/update-metadata` | Set or clear PDF metadata |
| `/api/v1/misc/remove-blanks` | Drop blank pages |
| `/api/v1/misc/auto-rename` | Auto-rename based on content |
| `/api/v1/misc/auto-split-pdf` | Auto-split on detected boundaries |
| `/api/v1/misc/add-page-numbers` | Add page numbers |
| `/api/v1/misc/add-stamp` | Add stamp/watermark text or image |
| `/api/v1/misc/add-image` | Overlay image |
| `/api/v1/misc/add-comments` | Add PDF comments |
| `/api/v1/misc/add-attachments` | Attach files to PDF |
| `/api/v1/misc/extract-attachments` | Extract attached files |
| `/api/v1/misc/list-attachments` | List attached files |
| `/api/v1/misc/rename-attachment` | Rename an attachment |
| `/api/v1/misc/delete-attachment` | Remove an attachment |
| `/api/v1/misc/extract-images` | Extract embedded images |
| `/api/v1/misc/extract-image-scans` | Detect and extract scanned images |
| `/api/v1/misc/replace-invert-pdf` | Invert / replace colors |
| `/api/v1/misc/scanner-effect` | Apply scanner-like effect |
| `/api/v1/misc/unlock-pdf-forms` | Unlock readonly form fields |
| `/api/v1/misc/show-javascript` | Show embedded JavaScript |

### Security (`/api/v1/security/...`)

| Operation | Purpose |
|---|---|
| `/api/v1/security/sanitize-pdf` | Strip JavaScript, embedded files, links, etc. |
| `/api/v1/security/add-password` | Encrypt with a password |
| `/api/v1/security/remove-password` | Decrypt a password-protected PDF |
| `/api/v1/security/add-watermark` | Add text or image watermark |
| `/api/v1/security/redact` | Manual redaction |
| `/api/v1/security/auto-redact` | Pattern-based auto redaction |
| `/api/v1/security/cert-sign` | Sign with a certificate |
| `/api/v1/security/remove-cert-sign` | Remove certificate signatures |
| `/api/v1/security/timestamp-pdf` | Add trusted timestamp |
| `/api/v1/security/validate-signature` | Validate existing signatures |
| `/api/v1/security/verify-pdf` | Verify signatures (returns JSON, not usable as a downstream pipeline step) |
| `/api/v1/security/get-info-on-pdf` | Read PDF metadata/info |

### Convert (`/api/v1/convert/...`)

PDF in/out conversions. Includes `pdf/word`, `pdf/presentation`, `pdf/text`, `pdf/xml`, `pdf/xlsx`, `pdf/html`, `pdf/epub`, `pdf/pdfa`, `pdf/csv`, `pdf/img`, `pdf/cbz`, `pdf/cbr`, `pdf/video`, `pdf/vector`, `pdf/text-editor`, and the reverse conversions (`img/pdf`, `html/pdf`, `markdown/pdf`, `svg/pdf`, `url/pdf`, `file/pdf`, `ebook/pdf`, `eml/pdf`, `cbz/pdf`, `cbr/pdf`, `vector/pdf`, `text-editor/pdf`).

### Filter (`/api/v1/filter/...`)

Filters do not modify files - they pass matching files through and drop non-matching files from later steps in the same pipeline.

| Operation | Purpose |
|---|---|
| `/api/v1/filter/filter-contains-text` | Keep files containing specific text |
| `/api/v1/filter/filter-contains-image` | Keep files containing images |
| `/api/v1/filter/filter-page-count` | Keep files with N pages |
| `/api/v1/filter/filter-page-size` | Keep files of a specific page size |
| `/api/v1/filter/filter-file-size` | Keep files under/over a size threshold |
| `/api/v1/filter/filter-page-rotation` | Keep files with a specific page rotation |

### Disallowed in Pipelines

Pipelines can only call endpoints under `/api/v1/general/...`, `/api/v1/misc/...`, `/api/v1/security/...`, `/api/v1/convert/...`, `/api/v1/filter/...`, and `/api/v1/ai/tools/...`. Endpoints outside those namespaces (e.g. `/api/v1/info/...`, `/api/v1/auth/...`, `/api/v1/admin/...`, and `/api/v1/pipeline/handleData` itself) cannot be used as pipeline steps - the underlying `InternalApiClient` URL validator rejects them with a `SecurityException`.

The `/api/v1/ai/tools/...` namespace currently exposes proprietary AI features (e.g. `math-auditor-agent`, `pdf-comment-agent`) and is only available with the corresponding paid license.

---

## Parameter Reference

Below are the parameter schemas for the most common pipeline operations. Required fields are marked. For full schemas of every endpoint, see the local Swagger UI at `/swagger-ui.html`.

### Compress - `/api/v1/misc/compress-pdf`

```json
{
  "operation": "/api/v1/misc/compress-pdf",
  "parameters": {
    "optimizeLevel": 5,
    "expectedOutputSize": "",
    "linearize": false,
    "normalize": false,
    "grayscale": false
  }
}
```

| Field | Type | Default | Notes |
|---|---|---|---|
| `optimizeLevel` (required) | integer | 5 | 1-9. Higher = smaller / more lossy. |
| `expectedOutputSize` (required) | string | `"25KB"` | E.g. `"100MB"`, `"25KB"`. Pass `""` for no size target. |
| `linearize` (required) | boolean | false | Web-view optimization. |
| `normalize` (required) | boolean | false | Normalize content streams. |
| `grayscale` (required) | boolean | false | Convert to grayscale. |
| `lineArt` | boolean | false | Convert images to line art (needs ImageMagick). |
| `lineArtThreshold` | double | 55 | 0-100. |
| `lineArtEdgeLevel` | integer | 1 | 1, 2, or 3. |

### OCR - `/api/v1/misc/ocr-pdf`

```json
{
  "operation": "/api/v1/misc/ocr-pdf",
  "parameters": {
    "languages": ["eng"],
    "ocrType": "skip-text",
    "ocrRenderType": "hocr",
    "deskew": true,
    "clean": true,
    "cleanFinal": false,
    "sidecar": false,
    "removeImagesAfter": false
  }
}
```

| Field | Type | Default | Notes |
|---|---|---|---|
| `languages` (required) | array of string | `["eng"]` | Any Tesseract language code. Multiple supported. |
| `ocrType` (required) | string | - | `skip-text`, `force-ocr`, or `Normal`. |
| `ocrRenderType` (required) | string | `hocr` | `hocr` or `sandwich`. |
| `deskew` | boolean | false | Auto-correct skewed pages (needs OCRmyPDF). |
| `clean` | boolean | false | Pre-OCR cleanup. |
| `cleanFinal` | boolean | false | Post-OCR cleanup. |
| `sidecar` | boolean | false | Also output a `.txt` sidecar. |
| `removeImagesAfter` | boolean | false | Strip images after OCR. |

### Update Metadata - `/api/v1/misc/update-metadata`

The canonical endpoint for **setting OR clearing** metadata. To wipe everything, pass `deleteAll: true`:

```json
{
  "operation": "/api/v1/misc/update-metadata",
  "parameters": {
    "deleteAll": true
  }
}
```

To set specific fields:

```json
{
  "operation": "/api/v1/misc/update-metadata",
  "parameters": {
    "deleteAll": false,
    "title": "Annual Report 2026",
    "author": "Stirling Tools",
    "subject": "Finance",
    "keywords": "annual, report, 2026",
    "creator": "Stirling PDF",
    "producer": "Stirling PDF",
    "creationDate": "2026/06/01 09:00:00",
    "modificationDate": "2026/06/01 09:00:00",
    "trapped": "False"
  }
}
```

| Field | Type | Notes |
|---|---|---|
| `deleteAll` (required) | boolean | If true, clears all metadata regardless of other fields. |
| `title`, `author`, `subject`, `keywords`, `creator`, `producer` | string | Standard PDF info dictionary fields. |
| `creationDate`, `modificationDate` | string | Format `yyyy/MM/dd HH:mm:ss`. |
| `trapped` | string | `True`, `False`, or `Unknown`. |

For custom XMP keys, the endpoint also accepts `customKey1`, `customValue1`, `customKey2`, `customValue2`, ... pairs in the form body. These are best set by calling the endpoint directly rather than through pipeline JSON, since nested maps may not round-trip cleanly through the pipeline processor.

### Flatten - `/api/v1/misc/flatten`

```json
{
  "operation": "/api/v1/misc/flatten",
  "parameters": {
    "flattenOnlyForms": false,
    "renderDpi": 150
  }
}
```

| Field | Type | Default | Notes |
|---|---|---|---|
| `flattenOnlyForms` (required) | boolean | false | true = only flatten form fields; false = full page-to-image flatten. |
| `renderDpi` | integer | (unset; required when `flattenOnlyForms=false`) | DPI when flattening pages. Minimum 72. |

### Split Pages - `/api/v1/general/split-pages`

```json
{
  "operation": "/api/v1/general/split-pages",
  "parameters": {
    "pageNumbers": "1,3,5-9"
  }
}
```

| Field | Type | Default | Notes |
|---|---|---|---|
| `pageNumbers` (required) | string | `"all"` | Page selection. Examples: `"2"`, `"2,5"`, `"1,3,5-9"`, `"all"`, `"2n+1"` (every odd page), `"3n"` (every third page). |

### Merge - `/api/v1/general/merge-pdfs`

Pipelines batch all matching files into one merge call.

```json
{
  "operation": "/api/v1/general/merge-pdfs",
  "parameters": {
    "sortType": "orderProvided",
    "removeCertSign": true,
    "generateToc": false
  }
}
```

| Field | Type | Default | Notes |
|---|---|---|---|
| `sortType` (required) | string | `"orderProvided"` | `orderProvided`, `byFileName`, `byDateModified`, `byDateCreated`, `byPDFTitle`. |
| `removeCertSign` (required) | boolean | true | Strip signatures (signatures break across merged docs). |
| `generateToc` | boolean | false | Build a TOC from input filenames. |

### Rotate - `/api/v1/general/rotate-pdf`

```json
{
  "operation": "/api/v1/general/rotate-pdf",
  "parameters": {
    "angle": 90
  }
}
```

| Field | Type | Default | Notes |
|---|---|---|---|
| `angle` (required) | integer | 90 | Must be `0`, `90`, `180`, or `270`. |

### Add Watermark - `/api/v1/security/add-watermark`

Only **text** watermarks are practical via pipeline JSON. Image watermarks require an additional file upload, which is not supported through the `parameters` block.

```json
{
  "operation": "/api/v1/security/add-watermark",
  "parameters": {
    "watermarkType": "text",
    "watermarkText": "CONFIDENTIAL",
    "alphabet": "roman",
    "fontSize": 30,
    "rotation": 45,
    "opacity": 0.5,
    "widthSpacer": 50,
    "heightSpacer": 50,
    "customColor": "#d3d3d3",
    "convertPDFToImage": false
  }
}
```

### Add Password - `/api/v1/security/add-password`

```json
{
  "operation": "/api/v1/security/add-password",
  "parameters": {
    "password": "user-password",
    "ownerPassword": "owner-password",
    "keyLength": 256,
    "preventPrinting": false,
    "preventModify": false,
    "preventExtractContent": false
  }
}
```

| Field | Type | Default | Notes |
|---|---|---|---|
| `keyLength` (required) | integer | 256 | `40`, `128`, or `256`. |
| `password` / `ownerPassword` | string | - | At least one is required to actually encrypt. |
| `preventPrinting`, `preventModify`, `preventExtractContent`, `preventModifyAnnotations`, `preventFillInForm`, `preventExtractForAccessibility`, `preventAssembly`, `preventPrintingFaithful` | boolean | false | Permission flags. |

### Sanitize - `/api/v1/security/sanitize-pdf`

```json
{
  "operation": "/api/v1/security/sanitize-pdf",
  "parameters": {
    "removeJavaScript": true,
    "removeEmbeddedFiles": true,
    "removeXMPMetadata": false,
    "removeMetadata": false,
    "removeLinks": false,
    "removeFonts": false
  }
}
```

All six fields are required booleans - if you omit any, the request fails validation. Some bundled example configs predate this requirement and may be missing `removeXMPMetadata`; add it explicitly.

---

## REST API: `POST /api/v1/pipeline/handleData`

Trigger a pipeline programmatically via the REST API. Use this from scripts, automation platforms (n8n, Zapier, Make, Power Automate), or your own integrations.

### Request

- **Method**: `POST`
- **URL**: `/api/v1/pipeline/handleData`
- **Content-Type**: `multipart/form-data`
- **Authentication**: When security is enabled, set the `X-API-KEY` header. See [API Documentation](../API.md) for details.

### Multipart fields

| Field | Type | Required | Purpose |
|---|---|---|---|
| `fileInput` | file | yes | One or more PDF files. Repeat the field for multiple files. |
| `json` | string | yes | The pipeline configuration JSON. |

You don't need to include `fileInput` inside the `parameters` object - the pipeline processor injects each uploaded file automatically. The Automate UI's "Export for Folder Scanning" includes `"fileInput": "automated"` as a marker in every step, which the backend ignores; you can leave it in or strip it out, both work.

### Optional query parameters

- `?async=true` - run the pipeline asynchronously and return a job ID instead of the file. Poll `GET /api/v1/general/job/{id}` for progress.

### Response

- **Single output file**: returned directly as `application/octet-stream` with `Content-Disposition: attachment; filename=...`.
- **Multiple output files**: returned as `output.zip`.
- **Async mode**: returns a JSON body with the job ID.

### Working curl example

```bash
curl -X POST "http://localhost:8080/api/v1/pipeline/handleData" \
  -H "X-API-KEY: $STIRLING_API_KEY" \
  -F "fileInput=@/path/to/input.pdf" \
  -F 'json={
    "name": "Prepare-for-email",
    "pipeline": [
      {"operation": "/api/v1/misc/repair", "parameters": {}},
      {"operation": "/api/v1/security/sanitize-pdf", "parameters": {
         "removeJavaScript": true, "removeEmbeddedFiles": false,
         "removeXMPMetadata": false, "removeMetadata": false,
         "removeLinks": false, "removeFonts": false}},
      {"operation": "/api/v1/misc/compress-pdf", "parameters": {
         "optimizeLevel": 2, "expectedOutputSize": "",
         "linearize": false, "normalize": false, "grayscale": false}}
    ]
  }' \
  --output result.pdf
```

For multiple files use repeated `-F "fileInput=@..."` flags; the response will be `output.zip`.

### End-to-end pipeline examples

**Flatten + remove metadata + OCR + compress** (the common archival workflow):

```json
{
  "name": "Archive-flatten-ocr-compress",
  "pipeline": [
    {
      "operation": "/api/v1/misc/flatten",
      "parameters": {"flattenOnlyForms": true}
    },
    {
      "operation": "/api/v1/misc/update-metadata",
      "parameters": {"deleteAll": true}
    },
    {
      "operation": "/api/v1/misc/ocr-pdf",
      "parameters": {
        "languages": ["eng"],
        "ocrType": "skip-text",
        "ocrRenderType": "hocr",
        "deskew": true,
        "clean": true,
        "cleanFinal": false,
        "sidecar": false,
        "removeImagesAfter": false
      }
    },
    {
      "operation": "/api/v1/misc/compress-pdf",
      "parameters": {
        "optimizeLevel": 1,
        "expectedOutputSize": "",
        "linearize": true,
        "normalize": false,
        "grayscale": false
      }
    }
  ]
}
```

**Convert image scans to optimized archival PDF/A:**

```json
{
  "name": "Image-scan-to-pdfa",
  "pipeline": [
    {"operation": "/api/v1/convert/img/pdf", "parameters": {}},
    {"operation": "/api/v1/misc/ocr-pdf", "parameters": {
       "languages": ["eng"], "ocrType": "force-ocr", "ocrRenderType": "hocr",
       "deskew": true, "clean": true, "cleanFinal": false,
       "sidecar": false, "removeImagesAfter": false}},
    {"operation": "/api/v1/misc/remove-blanks", "parameters": {}},
    {"operation": "/api/v1/misc/compress-pdf", "parameters": {
       "optimizeLevel": 3, "expectedOutputSize": "",
       "linearize": false, "normalize": false, "grayscale": false}},
    {"operation": "/api/v1/convert/pdf/pdfa", "parameters": {}}
  ]
}
```

### Error responses

| Situation | HTTP status | Body |
|---|---|---|
| Auth required and no key supplied | 401 | `{"error":"Unauthorized","message":"Authentication required...","status":401}` |
| Multipart parsing failed (missing field, bad JSON) | 400 | Spring's standard error JSON |
| Invalid operation name, disallowed endpoint, or missing required parameter | 200 with empty body | The server logs an `IllegalArgumentException` but returns an empty response. |
| Downstream endpoint returned non-2xx | 200 with partial/empty body | The error is logged but does not surface in the HTTP response. |

:::warning Validate response bodies
Errors that occur after multipart parsing currently collapse to `HTTP 200` with an empty body. Always check that the response is a non-empty PDF (starts with `%PDF-`) or a ZIP (starts with `PK\x03\x04`) before treating the call as successful.
:::

### Tips

- **Build in the UI, export the JSON.** The fastest way to get a correct JSON is to build the pipeline in the Automate UI, then click **Export for Folder Scanning**. The exported file works directly with `handleData`. The other button, **Export**, produces a different "native Automate" format (uses an `operations` key with frontend tool IDs like `"merge"`) that is only for re-importing into another Automate UI, not for the API.
- **No image / file parameters.** Operations that take an additional file input (image watermarks, separate overlay PDFs, attaching files) cannot be expressed in pipeline JSON via the REST API. Call those endpoints directly instead.
- **List parameters become repeated form fields.** Internally the processor expands `["eng","deu"]` into two `languages=eng` and `languages=deu` form parts, which is what the underlying endpoints expect.
- **Filters drop files.** A filter step that doesn't match keeps the file out of later steps. Useful for "process only PDFs that contain X".
- **Multi-input operations batch.** Operations marked multi-input (e.g. `merge-pdfs`) receive every matching file in a single call. If no files in the working set match the operation's expected extension, the step logs `No files with extension X found for operation Y...` and continues with the other files.
- **Unknown JSON fields are ignored.** The pipeline parser silently drops fields it doesn't recognise, so you can add `description`, `icon`, or other metadata at the top level without breaking anything.

---

## Folder Scanning Setup

Automate processing of files placed in watched folders.

### How Folder Scanning Works

1. **Watch Input Folder** - Monitor for new files
2. **Detect New Files** - Identify PDFs added to folder
3. **Apply Pipeline** - Process with configured pipeline
4. **Output Results** - Save to output folder
5. **Archive Originals** - Move processed files (optional)

### Directory Structure

```
/pipeline/
  ├── watchedFolders/
  │   ├── invoice-processing/
  │   │   ├── my-pipeline.json   # any *.json file in the folder is the pipeline config
  │   │   ├── invoice-001.pdf    # drop PDFs directly into the folder root
  │   │   ├── invoice-002.pdf
  │   │   └── processing/        # auto-created by the scanner while a file is in flight
  │   └── report-prep/
  │       └── ...
  ├── finishedFolders/           # outputs appear here by default (per `outputDir` placeholder)
  └── defaultWebUIConfigs/       # pre-loaded pipelines exposed in the Automate UI dropdown
      ├── invoice.json
      └── reports.json
```

### Configuration File

Drop a `.json` file (any name) into each watched folder. The first `.json` the scanner finds is used as the pipeline:

```json
{
  "name": "Invoice Processing",
  "pipeline": [
    {"operation": "/api/v1/misc/ocr-pdf", "parameters": {
       "languages": ["eng"], "ocrType": "skip-text",
       "ocrRenderType": "hocr", "deskew": true, "clean": false,
       "cleanFinal": false, "sidecar": false, "removeImagesAfter": false}}
  ],
  "outputDir": "{outputFolder}/{folderName}",
  "outputFileName": "{filename}-processed-{date}"
}
```

PDFs go directly in the watched folder root (NOT in an `input/` subdirectory). The scanner auto-creates a `processing/` subfolder while a file is being worked on, and writes outputs to wherever `outputDir` resolves to (typically `/pipeline/finishedFolders/...` via the `{outputFolder}` placeholder).

The watched-folder scanner runs every 60 seconds.

**Learn more:** [Folder Scanning Guide](./FolderScanning.md)

---

## Best Practices

### Pipeline Design

1. **Test Incrementally**
   - Build pipeline one operation at a time
   - Test each step before adding the next
   - Verify output at each stage

2. **Order Operations Logically**
   - Do OCR before text-based operations
   - Remove pages before processing remaining pages
   - Compress last to optimize final output

3. **Use Descriptive Names**
   - Name pipelines clearly: "Invoice-OCR-Watermark-Archive"
   - Add descriptions in comments
   - Version your pipeline files

4. **Handle Errors Gracefully**
   - Test with various file types
   - Consider edge cases (empty PDFs, locked files)
   - Monitor logs for errors

### Performance Optimization

1. **Minimize Operations**
   - Combine similar operations when possible
   - Remove unnecessary steps
   - Don't duplicate efforts

2. **Optimize Compression**
   - Compress once at the end, not multiple times
   - Choose appropriate compression level
   - Balance quality vs. file size

3. **Batch Intelligently**
   - Group similar files together
   - Process during off-peak hours
   - Monitor system resources

### Maintenance

1. **Version Control**
   - Keep pipeline JSONs in git repository
   - Track changes over time
   - Document modifications

2. **Regular Review**
   - Audit pipelines quarterly
   - Remove unused pipelines
   - Update for new requirements

3. **Monitor Performance**
   - Check processing times
   - Review error logs
   - Optimize slow operations

---

## Troubleshooting

### Pipeline Fails to Execute

**Symptoms:** Pipeline starts but doesn't complete

**Common Causes:**
- Invalid parameter values
- Unsupported file format
- Missing dependencies (OCR languages, fonts)
- File permissions issues

**Solutions:**
1. Validate JSON configuration
2. Test each operation individually
3. Check server logs for errors
4. Verify required dependencies installed

---

### `handleData` Returns Empty Response

**Symptoms:** REST API call returns HTTP 200 with an empty body.

**Cause:** Errors after multipart parsing (invalid operation name, missing required parameter, downstream endpoint failure) currently collapse to `200 OK` with no body. Check the server logs for the actual error.

**Common reasons:**
- Operation name used short form (e.g. `compress-pdf`) instead of full path (`/api/v1/misc/compress-pdf`)
- Operation references an endpoint outside the allowed namespaces (only `general`, `misc`, `security`, `convert`, `filter`, `ai/tools` are permitted)
- A required parameter was omitted (each schema in [Parameter Reference](#parameter-reference) marks the required fields)
- The pipeline tries to call `/api/v1/pipeline/handleData` recursively

---

### Folder Scanning Not Working

**Symptoms:** Files not processed automatically

**Possible Issues:**
- Folder permissions incorrect
- Pipeline configuration invalid
- Folder scanning not enabled

**Solutions:**
1. Check folder permissions (read/write access)
2. Test pipeline manually first
3. Check `docker logs` for errors
4. Ensure folder scanning feature enabled
5. The scanner runs once every 60 seconds - allow that long after dropping a file

---

### Operation Parameters Not Applying

**Symptoms:** Pipeline runs but doesn't use specified settings

**Causes:**
- Incorrect parameter names
- Wrong parameter data types
- Parameters not supported in operation

**Solutions:**
1. Check parameter names match the schemas in [Parameter Reference](#parameter-reference)
2. Verify parameter value types (string, number, boolean)
3. Test the same parameters by calling the endpoint directly first

---

### Results Not as Expected

**Symptoms:** Pipeline completes but output incorrect

**Debugging Steps:**
1. Test each operation individually
2. Check intermediate outputs
3. Verify operation order makes sense
4. Review parameter values
5. Test with simpler input files

---

## Pipeline vs. Multi-Tool vs. Manual

### Use Pipeline/Automate When:
- Same workflow repeated frequently
- Predictable, consistent operations
- Automated folder processing needed
- No manual intervention required
- Standardizing team processes
- Large batch processing
- Scheduled/unattended processing

### Use Multi-Tool When:
- Workflow varies per file
- Need visual feedback at each step
- Experimenting with different settings
- Manual decision points in workflow
- One-time complex tasks

### Use Individual Tools When:
- Single, simple operation
- Quick one-off task
- Learning how operations work
- No need for automation

---

## Security Considerations

### Pipeline Files
- **Protect JSON configs** - May contain passwords or sensitive settings
- **Restrict folder access** - Limit who can create/modify pipelines
- **Review before deploying** - Audit pipelines for security issues

### Folder Scanning
- **Isolate watched folders** - Don't expose to untrusted users
- **Monitor activity** - Log all processing for audit trail
- **Secure output folders** - Protect processed documents appropriately

### Automated Processing
- **Validate inputs** - Ensure only expected files processed
- **Error handling** - Don't expose sensitive error messages
- **Resource limits** - Prevent resource exhaustion attacks

---

## Related Documentation

- **[Folder Scanning Setup](./FolderScanning.md)** - Detailed folder scanning guide
- **[Multi-Tool](../Functionality/Multi-Tool.md)** - Interactive multi-operation tool
- **[Endpoint Customisation](./Endpoint%20or%20Feature%20Customisation.md)** - Operation names and IDs
- **[API Documentation](../API.md)** - Programmatic pipeline execution
- **[Advanced Tools](../Functionality/Advanced-Tools.md)** - Other automation features

---

## Summary

Pipeline automation (Automate tool) transforms Stirling PDF into a workflow engine:

- **Chain operations** - Combine multiple PDF tools sequentially
- **Save workflows** - Reusable pipeline configurations
- **Folder scanning** - Automated unattended processing
- **REST API** - Trigger pipelines from any external system
- **Standardization** - Consistent processing across teams
- **Efficiency** - Minutes saved per file, hours per day

**Perfect for:** Repetitive workflows, batch processing, automated document preparation, and standardized procedures.

Ready to automate? Create your first pipeline and transform how you process PDFs.
