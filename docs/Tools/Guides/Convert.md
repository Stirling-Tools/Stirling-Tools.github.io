---
sidebar_position: 14
title: Convert
description: Convert Office files, images, web pages, email, eBooks and comics to PDF, and PDFs to other formats.
sidebar_label: Convert
---

# Convert

Convert turns files into PDFs and PDFs into other formats.

## Convert a file

1. Select one or more files and open **Convert**.
2. **Convert from** is filled in from the files you selected. Pick the target format under **Convert to**.
3. Set any options for that conversion, then click **Convert Files**.

If you select files of different types, **Convert from** shows **Any** and they are all converted to PDF.

## Convert to PDF

| Type | Formats |
|------|---------|
| Office | DOCX, DOC, ODT, XLSX, XLS, ODS, PPTX, PPT, ODP, TXT, RTF |
| Images | JPG, JPEG, PNG, GIF, BMP, TIFF, WEBP, SVG |
| Web and text | HTML (or a ZIP with the HTML and its CSS and images), Markdown |
| Email | EML, MSG (Outlook) |
| eBook | EPUB, MOBI, AZW3, FB2 |
| Comics | CBZ, CBR |

Image options: **Color Type** (**Color**, **Grayscale** or **Black & White**), **Fit Option** (**Maintain Aspect Ratio**, **Fit Document to Page** or **Fill Page**), **Auto Rotate**, and **Combine Images** to put all images in one PDF instead of one PDF each.

## Convert from PDF

| Type | Formats |
|------|---------|
| Office | DOCX, ODT, PPTX, ODP, XLSX, CSV |
| Text | TXT, RTF, Markdown |
| Images | PNG, JPG, GIF, TIFF, BMP, WEBP |
| Web | HTML, XML |
| Standards | PDF/A (archiving), PDF/X (print), PDF/UA (accessible) |
| eBook and comics | EPUB, AZW3, CBZ, CBR |

Notes on some targets:

- **Images** - set **Color Type**, **DPI** (72-600, default 300) and **Output**: **Multiple** (default) for one image per page, or **Single** for one image containing all pages.
- **Word, PowerPoint and Excel** - run [OCR](./OCR.md) on scans first.
- **PDF/A** - pick the level (default PDF/A-2b). **Strict Mode** stops with an error if the result does not fully conform. Digital signatures are removed.
- **PDF/UA** - tags the PDF for screen readers. Add a description for each image, or the file comes back tagged but not certified.

A few conversions, such as PDF to PostScript, EPS, PCL or XPS, have no option in Convert. They are available through the [REST API](../../Developers/API.md).

In the desktop app, some conversions need Stirling Cloud or a server ([Where your tools run](../../Desktop/Where-Tools-Run.md)).
