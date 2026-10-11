---
title: Pipeline API
sidebar_label: Pipeline API
sidebar_position: 2
description: Run several Stirling PDF tools on one or more files in a single request with a JSON pipeline and POST /api/v1/pipeline/handleData.
---

# Pipeline API

Send files and a JSON pipeline to `POST /api/v1/pipeline/handleData` to run several tools in one request. The same JSON format is used by server [folder scanning](../Server/Storage/Folder-Scanning.md).

Authentication and base URLs are the same as for the [REST API](./API.md). Pipeline steps count as automation; see [Processing allowance](../Server/Licensing/Connect-to-Stirling-Cloud.md#processing-allowance).

## JSON format

```json
{
  "name": "Split then compress",
  "pipeline": [
    {
      "operation": "/api/v1/general/split-pages",
      "parameters": { "pageNumbers": "5" }
    },
    {
      "operation": "/api/v1/misc/compress-pdf",
      "parameters": { "optimizeLevel": 5 }
    }
  ]
}
```

- `operation` is the full endpoint path: `/api/v1/misc/compress-pdf`, not `compress-pdf`.
- `parameters` uses the endpoint's own field names. Leave out `fileInput`, as each file is passed in for you. Exported files contain `"fileInput": "automated"`, which is ignored.
- A list such as `"languages": ["eng", "deu"]` is sent as repeated form fields.
- Steps run in order, and the same operation can appear more than once with different parameters.
- Other top-level fields (`description`, `icon`, `_examples`) are ignored. `outputDir` and `outputFileName` only apply to folder scanning.

## Start from an Automate export

Build the workflow in [Automate](../Tools/Guides/Automate.md) and click **Export for Folder Scanning**, not **Export**. This downloads `<name>.folder-scan.json` with each step's endpoint path filled in. Before you use it, rename each step's parameters to the endpoint's field names, for example `compressionLevel` to `optimizeLevel` for Compress, as endpoints ignore names they don't know.

## Operations

A step can call any tool endpoint under `/api/v1/general/`, `/misc/`, `/security/`, `/convert/`, `/filter/`, `/integration/`, `/docparse/` or `/ai/tools/`. Find paths and parameters in the [API reference](./API.md#base-url-keys-and-reference).

- Operations that need a second file, such as an image watermark or an overlay PDF, can't be used in a pipeline. Call those endpoints directly.
- Multi-file operations such as `/api/v1/general/merge-pdfs` get every file in one call.
- A file of a type a step can't take is dropped from the run, and the server logs it.
- `/api/v1/integration/external-api-call` sends the file to a saved **Custom API** connection, passed by its ID as `connectionId`. Only self-hosted admins can create these ([Integrations](../Processor/Integrations.md)).
- AI steps (`/api/v1/ai/tools/...`) need [AI set up](../Server/AI/AI.md) on a self-hosted server.

## Filters

A filter step keeps a file only when its condition is true. Files that don't match leave the pipeline without an error.

| Operation | Keeps the file when |
|---|---|
| `/api/v1/filter/filter-contains-text` | it contains `text` (limit the check with `pageNumbers`) |
| `/api/v1/filter/filter-contains-image` | it contains an image (limit the check with `pageNumbers`) |
| `/api/v1/filter/filter-page-count` | the page count compares to `pageCount` |
| `/api/v1/filter/filter-page-size` | the first page compares to `standardPageSize` (A0 to A6, LETTER, LEGAL) |
| `/api/v1/filter/filter-file-size` | the file size in bytes compares to `fileSize` |
| `/api/v1/filter/filter-page-rotation` | the first page's rotation compares to `rotation` |

The last four take a `comparator` of `Greater`, `Equal` or `Less`.

This pipeline OCRs only PDFs that contain an image. `skip-text` leaves pages that already have text alone:

```json
{
  "name": "OCR PDFs containing images",
  "pipeline": [
    {"operation": "/api/v1/filter/filter-contains-image", "parameters": {"pageNumbers": "all"}},
    {"operation": "/api/v1/misc/ocr-pdf", "parameters": {"languages": ["eng"], "ocrType": "skip-text"}}
  ]
}
```

## Run a pipeline

`POST /api/v1/pipeline/handleData` with `multipart/form-data`:

| Field | Required | Value |
|---|---|---|
| `fileInput` | Yes | One or more files. Repeat the field for each file. |
| `json` | Yes | The pipeline JSON as a string. |

```bash
curl -X POST "$STIRLING_URL/api/v1/pipeline/handleData" \
  -H "X-API-KEY: $STIRLING_API_KEY" \
  -F "fileInput=@input.pdf" \
  -F 'json={
    "name": "Repair then compress",
    "pipeline": [
      {"operation": "/api/v1/misc/repair", "parameters": {}},
      {"operation": "/api/v1/misc/compress-pdf", "parameters": {"optimizeLevel": 2}}
    ]
  }' \
  -o result.pdf
```

- One output file comes back as the file itself. Several come back as `output.zip`.
- Add `?async=true` to get a job ID instead. Poll `GET /api/v1/general/job/{jobId}` and download from `GET /api/v1/general/job/{jobId}/result`.
