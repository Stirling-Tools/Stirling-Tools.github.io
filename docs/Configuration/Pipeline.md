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
- ✅ Backend pipeline processing - **No changes**
- ✅ JSON pipeline configurations - **Still work exactly the same**
- ✅ Folder scanning with pipelines - **Still works the same**
- 🆕 Frontend interface - **Now called "Automate" with better UX**

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
1. Upload PDF to Split tool → Download split files
2. Upload each split file to Watermark tool → Download watermarked files
3. Upload each watermarked file to Compress tool → Download final files
4. Repeat for every batch of documents 😫

### With Pipelines:
1. Create "Split-Watermark-Compress" pipeline once
2. Upload PDFs → Automatic processing → Download results
3. Reuse same pipeline for all future batches 🎉

**Time saved:** Minutes per file, hours per day!

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
   - To use the configuration for [folder scanning](/Configuration/Folder%20Scanning) (or save it for future use and re-upload it), download a JSON file in this menu. You can also pre-load it for future use by placing it in `/pipeline/defaultWebUIConfigs/`. It will then appear in the dropdown menu for all users to use.

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

## Configuration

### JSON Pipeline Format

Basic structure of a pipeline configuration:

```json
{
  "name": "My Pipeline",
  "pipeline": [
    {
      "operation": "split-pages",
      "parameters": {
        "splitType": "EVERY_N_PAGES",
        "numberOfPagesPerSplit": 2
      }
    },
    {
      "operation": "compress-pdf",
      "parameters": {
        "compressionLevel": "MEDIUM"
      }
    }
  ]
}
```

### Operation Names
Use these exact operation names in JSON:
- `split-pages`, `merge-pdfs`, `rotate-pdf`
- `compress-pdf`, `add-watermark`, `add-stamp`
- `ocr-pdf`, `add-password`, `remove-password`
- `crop`, `scale-pages`, `add-page-numbers`
- See [Endpoint Customisation](./Endpoint%20or%20Feature%20Customisation.md) for complete list

### Parameter Configuration
Each operation has specific parameters:

**Split Pages:**
```json
{
  "splitType": "EVERY_N_PAGES",  // or "SPLIT_BY_SIZE", "BY_SECTIONS"
  "numberOfPagesPerSplit": 5
}
```

**Add Watermark:**
```json
{
  "watermarkText": "CONFIDENTIAL",
  "fontSize": 36,
  "opacity": 0.5,
  "rotation": 45,
  "position": "CENTER"
}
```

**Compress:**
```json
{
  "compressionLevel": "MEDIUM",  // "LOW", "MEDIUM", "HIGH"
  "optimizeImages": true
}
```

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
  │   │   ├── input/          # Drop files here
  │   │   ├── output/         # Results appear here
  │   │   └── config.json     # Pipeline configuration
  │   └── report-prep/
  │       ├── input/
  │       ├── output/
  │       └── config.json
  └── defaultWebUIConfigs/    # Pre-loaded pipelines for UI
      ├── invoice.json
      └── reports.json
```

### Configuration File

Create `config.json` in each watched folder:

```json
{
  "name": "Invoice Processing",
  "pipeline": [...],  // Your pipeline operations
  "watchSchedule": "*/5 * * * *",  // Every 5 minutes (cron format)
  "deleteOriginal": false,  // Keep original files
  "archiveFolder": "./processed/"  // Move originals here
}
```

### Cron Schedule Format

```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Day of week (0-7, 0 and 7 = Sunday)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

**Examples:**
- `*/5 * * * *` - Every 5 minutes
- `0 * * * *` - Every hour
- `0 9 * * *` - Daily at 9 AM
- `0 9 * * 1` - Every Monday at 9 AM

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

### Folder Scanning Not Working

**Symptoms:** Files not processed automatically

**Possible Issues:**
- Folder permissions incorrect
- Cron schedule not configured
- Pipeline configuration invalid
- Folder scanning not enabled

**Solutions:**
1. Check folder permissions (read/write access)
2. Verify cron schedule format
3. Test pipeline manually first
4. Check `docker logs` for errors
5. Ensure folder scanning feature enabled

---

### Operation Parameters Not Applying

**Symptoms:** Pipeline runs but doesn't use specified settings

**Causes:**
- Incorrect parameter names
- Wrong parameter data types
- Parameters not supported in operation

**Solutions:**
1. Check parameter names match documentation
2. Verify parameter value types (string, number, boolean)
3. Review operation's available parameters
4. Test parameters manually first

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
✅ Same workflow repeated frequently
✅ Predictable, consistent operations
✅ Automated folder processing needed
✅ No manual intervention required
✅ Standardizing team processes
✅ Large batch processing
✅ Scheduled/unattended processing

### Use Multi-Tool When:
✅ Workflow varies per file
✅ Need visual feedback at each step
✅ Experimenting with different settings
✅ Manual decision points in workflow
✅ One-time complex tasks

### Use Individual Tools When:
✅ Single, simple operation
✅ Quick one-off task
✅ Learning how operations work
✅ No need for automation

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

Pipeline automation (Automate tool) transforms Stirling-PDF into a workflow engine:

- 🔗 **Chain operations** - Combine multiple PDF tools sequentially
- 💾 **Save workflows** - Reusable pipeline configurations
- 📁 **Folder scanning** - Automated unattended processing
- 🎯 **Standardization** - Consistent processing across teams
- ⚡ **Efficiency** - Minutes saved per file, hours per day

**Perfect for:** Repetitive workflows, batch processing, automated document preparation, and standardized procedures.

Ready to automate? Create your first pipeline and transform how you process PDFs!
