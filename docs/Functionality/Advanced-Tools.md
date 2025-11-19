---
sidebar_position: 6
id: Advanced-Tools
title: Advanced Tools
description: Power user features for automation and complex PDF operations
---

# Advanced Tools

Advanced tools for power users, automation workflows, and complex PDF operations. These tools provide enhanced capabilities beyond standard PDF manipulation.

---

## Automation Tools

### Automate (Pipeline)

**Tool ID:** `automate`

Create sophisticated multi-step workflows that combine multiple PDF operations into automated sequences.

#### What it does
- Chain multiple operations into automated workflows
- Save and reuse pipeline configurations
- Process files automatically with predefined steps
- Support for folder watching and automatic processing
- JSON-based configuration for advanced users

#### Perfect for
- Repetitive multi-step PDF processing
- Automated document workflows
- Batch processing with consistent steps
- Integration with folder scanning
- Team workflow standardization

#### Example Workflows
- **Document Processing:** Split → Add watermark → Compress → Archive
- **Invoice Processing:** OCR → Extract pages → Add metadata → Save
- **Report Generation:** Merge → Add page numbers → Add stamp → Export
- **Bulk Conversion:** Convert → Compress → Add password → Organize

**📖 [Read the complete Pipeline Automation Guide →](../Configuration/Pipeline.md)** for detailed examples, JSON configuration, folder scanning setup, and best practices.

---

### Auto Rename

**Tool ID:** `autoRename`

Automatically rename PDF files based on their content analysis.

#### What it does
- Analyze PDF content to determine appropriate filename
- Extract title, header, or prominent text
- Use largest font text as filename
- Batch rename multiple PDFs at once
- Configurable naming rules

#### Perfect for
- Organizing scanned documents
- Renaming downloaded PDFs with generic names
- Batch organizing document libraries
- Creating descriptive filenames automatically

#### How it works
1. Upload one or more PDFs
2. Algorithm analyzes each PDF for:
   - Document title in metadata
   - Largest font text (likely the header/title)
   - First prominent text on page 1
3. Suggests filename based on findings
4. Option to review and modify suggestions
5. Batch rename and download

#### Naming Strategy
The tool uses this priority order:
1. **PDF Metadata Title** (if present and meaningful)
2. **Largest Font Text** on first page
3. **First Heading** or prominent text
4. **First Line** of readable text

#### Tips
- Works best with documents that have clear titles
- Scanned documents may need OCR first for better results
- Review suggestions before batch renaming
- Combine with OCR for scanned documents

---

## Advanced Formatting Tools

### Adjust Contrast

**Tool ID:** `adjustContrast`

Fine-tune brightness, contrast, and saturation of PDF content.

#### What it does
- Adjust brightness levels
- Modify contrast for better readability
- Change saturation (color intensity)
- Apply adjustments to all pages or specific ranges
- Preview changes before applying

#### Perfect for
- Improving readability of faded scans
- Enhancing poor quality scanned documents
- Adjusting over/under-exposed photos in PDFs
- Creating high-contrast versions for accessibility
- Fixing washed-out images

---

### Repair

**Tool ID:** `repair`

Attempt to repair corrupted or damaged PDF files.

#### What it does
- Fix structural PDF errors
- Recover content from damaged files
- Repair broken PDF streams
- Reconstruct missing elements
- Salvage readable content from corrupted PDFs

#### Perfect for
- Opening PDFs that won't load
- Recovering important documents
- Fixing corrupted downloads
- Repairing files from failing storage
- Salvaging partially damaged files

#### What it can fix
- Broken cross-reference tables
- Corrupted object streams
- Missing or damaged headers
- Truncated files
- Encoding errors

#### Limitations
- Cannot recover physically deleted data
- May not work with heavily encrypted files
- Success depends on extent of corruption
- Some formatting may be lost in recovery

---

### Scanner Image Split

**Tool ID:** `scannerImageSplit`

Automatically detect and split individual scanned photos from multi-image PDF scans.

#### What it does
- Detect individual images/photos on pages
- Automatically separate them into individual files
- Useful for batch-scanned photo collections
- Crop and extract each image separately
- Support for various scan layouts

#### Perfect for
- Separating batch-scanned photos
- Extracting individual images from collection scans
- Processing multi-photo scanner output
- Organizing photo digitization projects

---

### Overlay PDFs

**Tool ID:** `overlayPdfs`

Merge multiple PDFs by layering them on top of each other.

#### What it does
- Layer one PDF on top of another
- Position overlay precisely
- Control opacity/transparency
- Place content on foreground or background
- Apply to specific pages or all pages

#### Perfect for
- Adding letterheads to documents
- Applying template backgrounds
- Watermarking with complex designs
- Creating layered composite documents
- Merging forms with filled data

#### Overlay Options
- **Position:** Top, bottom, centered, custom coordinates
- **Mode:** Foreground or background
- **Opacity:** Full or partial transparency
- **Pages:** All pages, specific ranges, or alternating

---

### Replace Color

**Tool ID:** `replaceColor`

Replace specific colors in a PDF or invert all colors.

#### What it does
- Replace one color with another
- Invert all colors (create negative)
- Adjust color schemes
- Make PDFs printer-friendly
- Create dark mode versions

#### Perfect for
- Creating negative images
- Changing color schemes for printing
- Making dark backgrounds light (and vice versa)
- Correcting color issues
- Accessibility improvements

#### Options
- **Invert All:** Complete color negative
- **Replace Color:** Specify source and target colors
- **Threshold:** Control color matching sensitivity

---

### Add Image

**Tool ID:** `addImage`

Add or overlay images onto PDF pages.

#### What it does
- Insert images into PDFs
- Position images precisely
- Resize and scale images
- Add images to specific pages
- Support for various image formats

#### Perfect for
- Adding logos to documents
- Inserting photos into reports
- Creating visual composites
- Adding signatures or stamps as images
- Enhancing documents with graphics

---

### Scanner Effect

**Tool ID:** `scannerEffect`

Apply realistic scanner-like effects to PDFs to make them appear scanned.

#### What it does
- Add authentic scan appearance
- Slight rotation/skew effects
- Simulate scanner artifacts
- Adjust for realistic paper texture
- Make digital documents look scanned

#### Perfect for
- Making digital documents appear scanned
- Adding authenticity to digital forms
- Creating realistic-looking scans from digital content

---

## Developer Tools

These tools provide access to technical documentation and setup guides.

### Show JavaScript

**Tool ID:** `showJS`

Display any embedded JavaScript code within a PDF document.

#### What it does
- Extract and display all JavaScript from PDF
- Security analysis of PDF scripts
- Identify potentially harmful code
- Review PDF automation scripts
- Debug PDF form behaviors

#### Perfect for
- Security auditing of PDFs
- Identifying malicious scripts
- Understanding PDF form logic
- Debugging interactive PDFs
- Compliance review

---

### API Documentation

**Tool ID:** `devApi`

Quick link to complete API documentation for integrating Stirling-PDF into your applications.

**Access:** [API Documentation](../API.md)

---

### Folder Scanning Guide

**Tool ID:** `devFolderScanning`

Link to comprehensive guide for setting up automated folder scanning with pipelines.

**Access:** [Folder Scanning Setup](../Configuration/FolderScanning.md)

---

### SSO Configuration

**Tool ID:** `devSsoGuide`

Link to Single Sign-On (SSO) configuration guide for enterprise deployments.

**Access:** [SSO Guide](../Configuration/Single%20Sign-On%20Configuration.md)

---

### Air-gapped Setup

**Tool ID:** `devAirgapped`

Link to guide for deploying Stirling-PDF in offline/air-gapped environments.

**Access:** [Configuration](../Configuration/How%20to%20add%20configurations.md)

---

## When to Use Advanced Tools

Use advanced tools when you need to:
- ✅ Automate repetitive multi-step PDF operations
- ✅ Fix corrupted or damaged PDF files
- ✅ Perform complex color or image manipulations
- ✅ Organize large document collections automatically
- ✅ Integrate PDF operations into existing workflows
- ✅ Audit PDFs for security concerns
- ✅ Create sophisticated document processing pipelines

---

## Automation Best Practices

### For Automate/Pipeline:
1. **Start simple** - Test with one operation, then add more
2. **Use test files** - Verify pipelines work before production use
3. **Save configurations** - Reuse successful workflows
4. **Document workflows** - Add descriptions to saved pipelines
5. **Monitor folder scanning** - Check logs for errors

### For Auto Rename:
1. **Test first** - Run on small batches to verify naming
2. **Use OCR first** - For scanned documents without text layer
3. **Review suggestions** - Check names before batch applying
4. **Backup originals** - Keep copies with original names

### For Advanced Formatting:
1. **Preview changes** - Always preview before applying
2. **Test on copies** - Work with duplicates of important files
3. **Incremental adjustments** - Make small changes and iterate
4. **Document settings** - Note successful parameters for reuse

---

## Related Documentation

- **[Recommended Tools](./Recommended-Tools.md)** - Most common operations
- **[Complete Tool Reference](./Functionality.md)** - All 60+ tools
- **[Pipeline Configuration](./Features%20Pipeline.md)** - Automation workflows
- **[API Documentation](../API.md)** - Programmatic access
- **[Configuration](../Configuration/How%20to%20add%20configurations.md)** - System setup

---

## Tips for Power Users

1. **Combine tools strategically** - Use Automate to chain operations
2. **Leverage folder scanning** - Set up watch folders for automatic processing
3. **Use API for integration** - Integrate with your existing systems
4. **Save pipeline configs** - Reuse proven workflows
5. **Monitor and optimize** - Review performance and adjust settings
6. **Share configurations** - Pre-load pipelines for team use
