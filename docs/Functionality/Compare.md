---
sidebar_position: 3
id: Compare
title: Compare PDFs
description: Compare two PDF documents and highlight differences
---

# Compare PDFs

**Tool ID:** `compare`

Compare two PDF documents side-by-side and visually highlight the differences between them. Perfect for reviewing document revisions, finding changes in contracts, and quality assurance workflows.

---

## What is PDF Comparison?

PDF comparison analyzes two versions of a document and highlights:
- **Added content** - New text or elements in the newer version
- **Removed content** - Text or elements deleted from the original
- **Modified content** - Changes to existing text or formatting
- **Visual differences** - Layout or structural changes

This is essential for document review, version control, and change tracking.

---

## How to Use Compare

1. **Upload Original PDF** - Select the original/older version
2. **Upload Modified PDF** - Select the new/revised version
3. **Configure Comparison** - Adjust comparison settings (optional)
4. **Compare** - Process the documents
5. **Review Differences** - View highlighted changes side-by-side
6. **Navigate Changes** - Jump between differences
7. **Export Results** - Download comparison report (optional)

---

## Comparison Features

### Side-by-Side View

View both documents simultaneously:
- **Original on left** - The base document
- **Modified on right** - The revised document
- **Synchronized scrolling** - Both pages move together
- **Aligned pages** - Easy comparison of corresponding pages

### Difference Highlighting

Visual indicators for changes:
- **Green highlighting** - Added content
- **Red highlighting** - Removed content
- **Yellow highlighting** - Modified content
- **Color-coded markers** - Quick identification of change types

### Navigation Tools

Efficiently review changes:
- **Next/Previous buttons** - Jump between differences
- **Change counter** - See total number of changes
- **Page navigation** - Move through document pages
- **Zoom controls** - Examine details closely

---

## Comparison Settings

### Comparison Mode

**Text Comparison:**
- Compare text content only
- Ignore formatting changes
- Focus on wording differences
- Fast and efficient

**Visual Comparison:**
- Compare entire page appearance
- Detect layout changes
- Include images and graphics
- More comprehensive

**Hybrid Mode:**
- Combine text and visual comparison
- Best of both approaches
- Recommended for most use cases

### Sensitivity Settings

**Strict Mode:**
- Highlight every small change
- Include whitespace differences
- Detect minor formatting
- Most detailed comparison

**Normal Mode:**
- Ignore minor formatting
- Focus on content changes
- Skip insignificant whitespace
- Balanced approach (recommended)

**Lenient Mode:**
- Only major differences
- Ignore styling changes
- Focus on substantial edits
- Quick overview

### Ignore Options

Customize what to ignore:
- **Whitespace** - Spaces, tabs, line breaks
- **Case sensitivity** - Uppercase vs lowercase
- **Formatting** - Font, size, color
- **Metadata** - Author, dates, properties

---

## Use Cases

### Contract Review

**Before signing:**
1. Compare original contract with revised version
2. Verify all requested changes were made
3. Check for unexpected modifications
4. Document all differences

**Best Practices:**
- Always compare final version before signing
- Save comparison report for records
- Review every highlighted change
- Consult legal counsel on significant changes

### Document Versioning

**Version control:**
1. Compare current version with previous
2. Track changes over time
3. Identify who changed what
4. Maintain change history

**Workflow:**
- Version 1 → Version 2 comparison
- Document all revisions
- Create audit trail
- Archive comparison results

### Quality Assurance

**Proofreading workflow:**
1. Compare draft with edited version
2. Verify all edits were applied
3. Check for unintended changes
4. Ensure consistency

**Use For:**
- Editorial review
- Translation verification
- Compliance checking
- Final approval process

### Compliance & Legal

**Regulatory requirements:**
1. Compare submitted documents
2. Verify no unauthorized changes
3. Create audit trail
4. Meet compliance standards

**Legal Discovery:**
- Document tampering detection
- Change authentication
- Evidence preservation
- Forensic analysis

---

## Comparison Report

### Report Contents

Generated comparison report includes:
- **Summary statistics** - Total changes, added, removed, modified
- **Change list** - Detailed list of all differences
- **Location references** - Page and position of each change
- **Timestamp** - When comparison was performed
- **Document metadata** - File names, versions, dates

### Export Options

**PDF Report:**
- Highlighted differences embedded
- Side-by-side or overlay view
- Annotations for each change
- Shareable document

**JSON Export:**
- Machine-readable format
- Automation-friendly
- Complete difference data
- Integration with other tools

**Text Summary:**
- Human-readable list
- Quick overview
- Copy/paste friendly
- Email-ready format

---

## Best Practices

### Before Comparing

1. **Verify file names** - Ensure you have the correct versions
2. **Check file dates** - Confirm which is newer
3. **Review context** - Understand what changes to expect
4. **Choose settings** - Select appropriate comparison mode

### During Comparison

1. **Review systematically** - Check every highlighted change
2. **Take notes** - Document important differences
3. **Verify intent** - Ensure changes match expectations
4. **Check thoroughly** - Don't miss subtle changes

### After Comparison

1. **Save report** - Keep record of differences
2. **Document findings** - Note any concerns
3. **Take action** - Address unexpected changes
4. **Archive results** - Maintain audit trail

---

## Common Comparison Scenarios

### Scenario 1: Contract Negotiation

**Context:** Client returned contract with changes

**Process:**
1. Upload original contract
2. Upload client's version
3. Use "Text Comparison" mode
4. Review all red/green highlights
5. Verify each change is acceptable
6. Generate comparison report for records

### Scenario 2: Translation Verification

**Context:** Verify translated document matches original

**Process:**
1. Upload original language version
2. Upload translation
3. Use "Visual Comparison" mode
4. Check layout consistency
5. Verify images and graphics match
6. Ensure no content was lost

### Scenario 3: Revision Tracking

**Context:** Multiple editors worked on document

**Process:**
1. Compare Version 1 → Version 2
2. Compare Version 2 → Version 3
3. Track cumulative changes
4. Document all modifications
5. Create comprehensive change log

---

## Tips & Tricks

### Comparison Accuracy

**For Best Results:**
- Use digital PDFs (not scanned) for text comparison
- Ensure both PDFs are same page size
- Use consistent PDF versions
- Avoid heavily compressed files

**For Scanned Documents:**
- Run [OCR](./OCR.md) on both documents first
- Use visual comparison mode
- Expect some false positives
- Manually verify important changes

### Handling Large Documents

**Performance Tips:**
- Compare section by section if very large
- Use text mode for faster processing
- Close other applications
- Consider using desktop app for big files

### False Positives

**Common causes:**
- Different PDF generators
- Font embedding differences
- Compression variations
- Metadata changes

**Solutions:**
- Use "Normal" sensitivity mode
- Ignore formatting differences
- Focus on content changes
- Manually verify ambiguous changes

---

## Technical Details

### Comparison Algorithm

Stirling-PDF uses advanced comparison algorithms:
- **Text extraction** - Extract text from both PDFs
- **Diff algorithm** - Compute differences
- **Visual rendering** - Highlight changes
- **Alignment** - Match corresponding pages

### Supported PDF Types

**Works Best With:**
- ✅ Digital PDFs (not scanned)
- ✅ Text-based content
- ✅ Standard fonts
- ✅ Similar page layouts

**Challenging Cases:**
- ⚠️ Scanned documents (use OCR first)
- ⚠️ Complex layouts
- ⚠️ Heavy graphics
- ⚠️ Different page sizes

### Performance

**Processing Time:**
- Text comparison: Fast (seconds)
- Visual comparison: Moderate (1-2 min)
- Large documents: May take longer

**File Size Limits:**
- Browser: ~100-500 pages
- Desktop app: No practical limit

---

## Limitations

### What Comparison Can't Do

**Not Detected:**
- Semantic changes (same words, different meaning)
- Subtle formatting that doesn't render differently
- Changes in embedded media
- Metadata-only changes (unless specifically enabled)

**False Positives:**
- Different PDF generators may show differences
- Font rendering variations
- Compression artifacts
- Trivial whitespace changes

### Workarounds

**For Better Comparison:**
- Use same PDF generator when possible
- Standardize fonts across versions
- Use "Normal" sensitivity to reduce noise
- Manually verify critical sections

---

## API Usage

Compare PDFs programmatically via API:

```bash
curl -X POST http://stirling-pdf:8080/api/v1/compare \
  -F "file1=@original.pdf" \
  -F "file2=@modified.pdf" \
  -F "mode=text" \
  -F "sensitivity=normal" \
  -o comparison-report.pdf
```

**Parameters:**
- `file1` - Original/older document
- `file2` - Modified/newer document
- `mode` - `text`, `visual`, or `hybrid`
- `sensitivity` - `strict`, `normal`, or `lenient`
- `outputFormat` - `pdf`, `json`, or `text`

See [API Documentation](../API.md) for complete endpoint reference.

---

## Related Tools

- **[OCR](./OCR.md)** - Make scanned PDFs searchable before comparing
- **[Multi-Tool](./Multi-Tool.md)** - Compare as part of a workflow
- **[Redact](./Page-Operations/redact.md)** - Remove sensitive differences before sharing comparison
- **[Merge](./Page-Operations/Page-Operations.md)** - Combine comparison results with originals

---

## Summary

Stirling-PDF's Compare tool provides:

✅ **Side-by-side comparison** - View both documents simultaneously
✅ **Visual highlighting** - Color-coded difference markers
✅ **Multiple modes** - Text, visual, or hybrid comparison
✅ **Customizable sensitivity** - Control detail level
✅ **Comparison reports** - Export results in multiple formats
✅ **Navigation tools** - Jump between changes efficiently

Perfect for contract review, version control, quality assurance, and compliance workflows!
