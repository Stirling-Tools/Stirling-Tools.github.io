---
sidebar_position: 1
id: Recommended-Tools
title: Recommended Tools
description: The 7 most commonly used PDF tools in Stirling-PDF V2
---

# Recommended Tools

These are the **7 most frequently used PDF operations** in Stirling-PDF, prominently featured for quick access. Perfect for everyday PDF tasks.

---

## Multi-Tool

**Tool ID:** `multiTool`

A powerful workbench interface that allows you to chain multiple PDF operations together in sequence without re-uploading files between steps.

### What it does
- Upload PDFs once and use them across multiple operations
- Chain operations together (e.g., merge → compress → add watermark)
- See thumbnail previews of your files
- Switch between different tools seamlessly
- All processing happens in a single session

### Perfect for
- Complex multi-step PDF workflows
- Working with the same file across different operations
- Experimenting with different settings
- Batch processing with multiple tools

**📖 [Read the complete Multi-Tool Guide →](./Multi-Tool.md)** for detailed workflows, tips, and advanced features.

---

## Merge PDFs

**Tool ID:** `merge`

Combine multiple PDF documents into a single unified PDF file.

### What it does
- Merge 2 or more PDF files into one document
- Rearrange the order of PDFs before merging
- Preview thumbnails of each PDF
- Maintain quality of original documents
- Preserve bookmarks and metadata (optional)

### Perfect for
- Combining multiple reports into one document
- Merging chapters or sections of a book
- Consolidating scanned documents
- Creating comprehensive document packages

### Options
- **Sort Order:** Drag and drop to reorder PDFs before merging
- **Metadata:** Choose which source document's metadata to keep

---

## Compare

**Tool ID:** `compare`

Compare two PDF documents side-by-side and visually highlight the differences between them. Essential for reviewing document revisions and finding changes.

### What it does
- Display two PDFs side-by-side for easy comparison
- Highlight text differences (added, removed, modified)
- Visual diff view with color coding
- Navigate between changes easily
- Generate comparison reports

### Perfect for
- Reviewing document revisions
- Finding changes between contract versions
- Quality assurance and proofreading
- Legal document comparison

**📖 [Read the complete Compare Guide →](../Compare.md)** for detailed comparison modes, settings, use cases, and best practices.

---

## Compress

**Tool ID:** `compress-pdf`

Reduce PDF file size while maintaining acceptable quality for your needs. Stirling-PDF's compression tool optimizes images, removes unnecessary data, and applies various compression techniques.

### What it does
- Significantly reduce PDF file size (10-90% reduction)
- Multiple compression levels available
- Compress images within PDFs
- Remove unnecessary metadata
- Optimize for web or email sharing

### Perfect for
- Sharing PDFs via email
- Reducing storage requirements
- Faster PDF loading times
- Meeting file size upload limits

**📖 [Read the complete Compress Guide →](../Compress.md)** for detailed compression options, quality settings, tips, and best practices.

---

## Convert

**Tool ID:** `convert`

Convert between PDF and 50+ other file formats including images, Office documents, HTML, and more.

### What it does
- Convert TO PDF from 50+ formats
- Convert FROM PDF to images, Office files, HTML, etc.
- Batch conversion support
- Maintains formatting when possible
- Supports both single and multiple file conversion

### Supported Formats

#### To PDF
- **Images:** JPG, PNG, GIF, TIFF, BMP, WebP
- **Office:** DOCX, XLSX, PPTX, DOC, XLS, PPT
- **Web:** HTML files, URLs (website screenshots)
- **Text:** TXT, RTF, Markdown
- **Email:** EML (email to PDF)
- **Comics:** CBZ, CBR

#### From PDF
- **Images:** JPG, PNG, TIFF, BMP, GIF
- **Office:** DOCX (Word), PPTX (PowerPoint)
- **Web:** HTML, XML
- **Text:** Plain text
- **Archival:** PDF/A
- **Data:** CSV (table extraction)
- **Comics:** CBZ, CBR

### Perfect for
- Converting scanned images to searchable PDFs (combine with OCR)
- Creating PDFs from Office documents
- Extracting text from PDFs
- Archiving emails as PDFs
- Converting PDFs to editable Word documents

**Learn more:** [Complete Conversion Guide](./Convert/Convert.md)

---

## OCR (Optical Character Recognition)

**Tool ID:** `ocr-pdf`

Make scanned PDFs searchable and editable by recognizing text in images. Stirling-PDF's OCR tool uses Tesseract OCR engine to extract text from image-based PDFs.

### What it does
- Recognize text from scanned documents
- Make image-based PDFs searchable
- Extract text from images within PDFs
- Support for 100+ languages
- Preserve original document layout

### Perfect for
- Scanned documents and images
- Making old paper documents searchable
- Extracting text from photos of documents
- Creating accessible PDFs from scans
- Enabling copy/paste from scanned PDFs

**📖 [Read the complete OCR Guide →](../OCR.md)** for detailed instructions, language support, configuration options, and best practices.

---

## Redact

**Tool ID:** `redact`

Permanently remove sensitive information from PDF documents with black boxes or white spaces.

### What it does
- Permanently remove (not just hide) text
- Black out or white out sensitive information
- Automatic redaction based on text patterns
- Manual redaction with draw tool
- Regex pattern support for complex redaction

### Perfect for
- Removing personal information (PII)
- Redacting confidential data
- Preparing documents for public release
- GDPR/privacy compliance
- Legal document redaction

### Redaction Methods

#### Manual Redaction
- Draw boxes over areas to redact
- Preview before applying
- Adjust box size and position
- Choose black or white fill

#### Automatic Redaction
- Search for text patterns to redact
- Use regex for complex patterns
- Redact all instances automatically
- Preview matches before redacting

### Common Use Cases
- Social Security Numbers: `\d{3}-\d{2}-\d{4}`
- Phone Numbers: `\(\d{3}\) \d{3}-\d{4}`
- Email Addresses: `[\w\.-]+@[\w\.-]+\.\w+`
- Credit Card Numbers: `\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}`
- Custom text: Any word or phrase

### Important Notes
- **Redaction is permanent** - original content cannot be recovered
- Always download and verify redacted PDFs
- Test regex patterns before applying to ensure accuracy
- Manual review recommended for sensitive documents

**Learn more:** [Redaction Guide](./Page-Operations/redact.md)

---

## Why These Tools?

These 7 tools represent the most common PDF operations that users perform daily:

1. **Multi-Tool** - Work with multiple operations efficiently
2. **Merge** - Combine documents (one of the most requested features)
3. **Compare** - Review changes and differences
4. **Compress** - Share files easily via email/upload
5. **Convert** - Universal format compatibility
6. **OCR** - Make any document searchable
7. **Redact** - Privacy and security compliance

---

## Quick Access

In Stirling-PDF V2, these recommended tools are:
- ✨ Featured prominently on the home page
- 🔍 Easier to find in search
- ⭐ Marked with special indicators
- 📱 Optimized for quick access

---

## Next Steps

- **Explore more tools:** [Complete Tool Reference](./Functionality.md)
- **Standard tools:** [Security](./Security/Security.md), [Page Operations](./Page-Operations/Page-Operations.md)
- **Advanced features:** [Automation Workflows](./Features%20Pipeline.md)
- **API access:** [API Documentation](../API.md)
