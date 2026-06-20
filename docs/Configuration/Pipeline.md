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

## Operation and parameter reference

Pipeline operations use the **full endpoint paths** of Stirling PDF's REST API, with the same field names. So once you know the underlying endpoint, you know the pipeline operation - no separate vocabulary to learn.

For the canonical list of operations and the full parameter schema for each, see:

- **Local Swagger UI** at `/swagger-ui.html` on your instance - includes every endpoint, parameter types, and lets you try requests live
- **Online API reference** - the [Stirling PDF API documentation](https://app.swaggerhub.com/apis-docs/Frooodle/Stirling-PDF/) and the [Scalar API registry](https://registry.scalar.com/@stirlingpdf/apis/stirling-pdf-processing-api/)

See [API Documentation](../API.md) for authentication and general API usage.

Pipelines can only call endpoints under `/api/v1/general/...`, `/api/v1/misc/...`, `/api/v1/security/...`, `/api/v1/convert/...`, `/api/v1/filter/...`, and `/api/v1/ai/tools/...`. Anything outside those namespaces is rejected by the pipeline processor with a `SecurityException` - this includes `/api/v1/info/...`, `/api/v1/auth/...`, `/api/v1/admin/...`, and `/api/v1/pipeline/handleData` itself (pipelines cannot recursively call themselves).

The `/api/v1/ai/tools/...` namespace currently exposes proprietary AI features (e.g. `math-auditor-agent`, `pdf-comment-agent`) and is only available with the corresponding paid license.

:::tip Build it in the UI, export it as JSON
The fastest way to get a correct pipeline JSON for any combination of operations is to build it visually in the **Automate** tool and click **Export for Folder Scanning**. The exported file uses exactly the format the API expects, with the right operation paths and parameters already filled in for you.
:::

---

## Filter / conditional operations

Filter operations (under `/api/v1/filter/`) let you branch a pipeline: each checks a property of the file and either **passes the file through** (the file continues to later steps) or **drops it** (the file is removed from the working set, so subsequent steps never see it). They are how you express "only process files that match X" inside a pipeline.

| Operation | Checks |
|---|---|
| `/api/v1/filter/filter-contains-text` | Whether the PDF contains a given text string (optionally on specific pages) |
| `/api/v1/filter/filter-contains-image` | Whether the PDF contains an image (optionally on specific pages) |
| `/api/v1/filter/filter-page-count` | Page count `Greater` / `Equal` / `Less` than a value |
| `/api/v1/filter/filter-page-size` | First page's size against a standard page size |
| `/api/v1/filter/filter-file-size` | File size in bytes against a value |
| `/api/v1/filter/filter-page-rotation` | First page's rotation against a value |

The comparison operations (`filter-page-count`, `filter-page-size`, `filter-file-size`, `filter-page-rotation`) take a `comparator` of `Greater`, `Equal`, or `Less`. A file that does not pass a filter is silently dropped from the rest of the pipeline, not treated as an error.

**Example - only OCR files that have no text yet:** put `filter-contains-text` (looking for some always-present marker) or pair an image check with OCR. A common pattern is to detect image-only scans with `filter-contains-image`, then route them through `/api/v1/misc/ocr-pdf`.

```json
{
  "name": "OCR only image-only scans",
  "pipeline": [
    {"operation": "/api/v1/filter/filter-contains-image", "parameters": {"pageNumbers": "all"}},
    {"operation": "/api/v1/misc/ocr-pdf", "parameters": {"languages": ["eng"], "ocrType": "skip-text"}}
  ]
}
```

Because `filter` is one of the allowed pipeline namespaces, these operations work both in the REST API and in folder scanning.

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
    "name": "Repair-then-compress",
    "pipeline": [
      {"operation": "/api/v1/misc/repair", "parameters": {}},
      {"operation": "/api/v1/misc/compress-pdf", "parameters": {"optimizeLevel": 2}}
    ]
  }' \
  --output result.pdf
```

For multiple files use repeated `-F "fileInput=@..."` flags; the response will be `output.zip`. For the full parameter list for each operation, see the API docs linked above.

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
- A required parameter was omitted (check the schema for the underlying endpoint in the [Swagger UI / API reference](#operation-and-parameter-reference))
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
1. Check parameter names against the endpoint's schema in the [Swagger UI / API reference](#operation-and-parameter-reference)
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
