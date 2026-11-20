---
sidebar_position: 0
title: All tools
description: Every tool in the Stirling PDF tool picker, grouped the way the app shows them, with a link to each guide.
sidebar_label: All tools
---

# All tools

Every tool in the app, grouped as the tool picker shows them. To find one fast, type its name in **Search tools...** at the top of the picker.

Not every tool is available everywhere. In the desktop app, tools with a cloud badge need Stirling Cloud or a server ([Where your tools run](../Desktop/Where-Tools-Run.md)). On a self-hosted server, an admin can turn tools off ([Turn features on or off](../Server/Customisation/Features-and-Endpoints.md)).

## Quick access

The most-used tools sit at the top of the picker. Each one has a keyboard shortcut ([Keyboard shortcuts](./Workspace/Keyboard-Shortcuts.md)).

- **[PDF Text Editor](./Editing/PDF-Text-Editor.md)** - edit the existing text and images in a PDF. Also opens from **Edit Text** in the viewer.
- **[Page Editor](./Workspace/Page-Editor.md)** (**PDF Multi Tool** in the picker) - rotate, reorder, delete, split and insert blank pages.
- **[Merge](./Pages/Merge.md)** - combine several PDFs into one.
- **[Compare](./Guides/Compare.md)** - show the text or visual differences between two PDFs.
- **[Compress](./Guides/Compress.md)** - make a PDF smaller.
- **[Convert](./Guides/Convert.md)** - convert between PDF and other formats.
- **[OCR / Cleanup scans](./Guides/OCR.md)** - make scanned PDFs searchable and clean them up.
- **[Redact](./Guides/Redact.md)** - permanently black out text, areas or whole pages.

## Signing

- **[Sign with Certificate](./Security/Certificate-Signing.md#sign-with-a-certificate)** - add a digital signature that proves who signed and shows later changes.
- **[Timestamp PDF](./Security/Certificate-Signing.md#timestamping-pdfs)** - add an RFC 3161 timestamp that proves when the PDF existed.
- **[Sign](./Security/Sign.md)** - add a drawn, typed or image signature.

## Document security

- **[Add Password](./Security/Add-Password.md)** - require a password to open the PDF and restrict what people can do.
- **[Add Watermark](./Security/Watermark.md)** - put a text or image watermark across the pages.
- **[Add Stamp to PDF](./Editing/Add-Stamp.md)** - add a text, image or QR code stamp at a set position.
- **[Sanitize](./Security/Sanitize.md)** - remove JavaScript, embedded files and other risky content.
- **[Flatten](./Security/Flatten.md)** - turn form fields and other interactive parts into plain page content.
- **[Unlock PDF Forms](./Security/Unlock-Forms.md)** - make read-only form fields editable again.
- **[Change Permissions](./Security/Change-Permissions.md)** - allow or block printing, copying, editing and other actions.

## Verification

- **[Get ALL Info on PDF](./Security/Get-PDF-Info.md)** - show the version, fonts, page sizes, permissions and metadata.
- **[Validate PDF Signature](./Security/Certificate-Signing.md#validating-signatures)** - check who signed a PDF and whether it changed afterwards.
- **[Check PDF accessibility](./Security/Accessibility-Check.md)** - check a PDF against PDF/UA-1 or PDF/UA-2 without changing it.

## Document review

- **[Read](./Workspace/Read-and-Annotate.md)** - open a PDF in the viewer to read, search, comment and mark it up.
- **[Change Metadata](./Editing/Change-Metadata.md)** - edit the title, author, keywords, dates and other details.
- **[Edit Table of Contents](./Editing/Table-of-Contents.md)** - add, nest and reorder bookmarks.

## Page formatting

- **[Crop PDF](./Pages/Crop.md)** - trim pages to the area you want.
- **[Rotate](./Pages/Rotate.md)** - turn pages.
- **[Auto Rotate](./Pages/Rotate.md#auto-rotate)** - detect each page's orientation and turn it upright.
- **[Split](./Pages/Split.md)** - split one PDF into several files.
- **[Reorganize Pages](./Pages/Reorganize-Pages.md)** - rearrange, duplicate or delete pages.
- **[Adjust page size/scale](./Pages/Page-Size-and-Scale.md)** - change the page size and how big the content sits on it.
- **[Add Page Numbers](./Pages/Page-Numbers.md)** - number pages in a set position and format.
- **[Multi-Page Layout](./Pages/Multi-Page-Layout.md)** - put several pages on each sheet.
- **[Booklet Imposition](./Pages/Booklet.md)** - order pages for printing and folding into a booklet.
- **[PDF to Single Large Page](./Pages/Single-Large-Page.md)** - join all pages into one long page.
- **[Manage Attachments](./Pages/Attachments.md)** - add, extract, rename or delete files embedded in the PDF.
- **[Create Portfolio](./Pages/Portfolio.md)** - bundle several files into one PDF portfolio.

## Extraction

- **[Extract Pages](./Pages/Extract-Pages.md)** - save chosen pages as a new PDF.
- **[Extract Images](./Editing/Extract-Images.md)** - save every image in the PDF to a ZIP file.

## Removal

- **[Remove Pages](./Pages/Remove-Pages.md)** - delete the pages you choose.
- **[Remove Blank pages](./Pages/Remove-Blank-Pages.md)** - find and drop pages with little or no content.
- **[Remove Annotations](./Editing/Remove-Annotations.md)** - delete all comments, highlights and markup.
- **[Remove image](./Editing/Remove-Images.md)** - strip every image, for example to shrink the file.
- **[Remove Password](./Security/Remove-Password.md)** - unlock a protected PDF when you know its password.
- **[Remove Certificate Sign](./Security/Remove-Certificate-Sign.md)** - strip digital signatures so you can edit the file.

## Automation

- **[Auto Form Detection](./Guides/Fill-Form.md#detect-fields-automatically)** - find form fields and make a PDF fillable.
- **[Automate](./Guides/Automate.md)** - save a chain of tools and run it on any files.
- **[Auto Rename PDF File](./Advanced/Auto-Rename.md)** - rename a file from the title found in it.

## General

- **[Add Text](./Editing/Add-Text.md)** - type text anywhere on a page.
- **[Add image](./Editing/Add-Image.md)** - place an image anywhere on a page.
- **[Annotate](./Workspace/Read-and-Annotate.md)** - highlight, draw, add notes and shapes in the viewer.
- **[Form Editor](./Guides/Fill-Form.md)** - fill in, add and edit form fields.

## Advanced formatting

- **[Adjust Colors/Contrast](./Advanced/Adjust-Colours.md)** - change contrast, brightness and saturation.
- **[Repair](./Advanced/Repair.md)** - try to fix a damaged PDF.
- **[Detect & Split Scanned Photos](./Advanced/Split-Scanned-Photos.md)** - find the photos on a scanned page and save each photo as a separate image.
- **[Overlay PDFs](./Advanced/Overlay-PDFs.md)** - lay one PDF over another.
- **[Replace & Invert Color](./Advanced/Replace-Colour.md)** - swap or invert colours, for example for high contrast.

## Developer tools

- **[Show Javascript](./Advanced/Show-JavaScript.md)** - list any JavaScript inside a PDF.
- **API**, **Automated Folder Scanning**, **SSO Guide** and **Air-gapped Setup** link to the matching docs.

## AI

The AI assistant isn't in the tool list. Open it with the **Open Stirling AI assistant** button in the workspace ([AI assistant](./Guides/AI-Assistant.md)).
