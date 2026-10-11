---
sidebar_position: 2
title: Turn features on or off
sidebar_label: Features & endpoints
description: Remove individual tools or whole groups of tools from the app and API on a self-hosted Stirling PDF server, with every tool and group ID.
---

# Turn features on or off

Remove tools you don't want people to use, or that your server can't run. A removed tool is greyed out in the app (or hidden, see below) and its API endpoint is switched off for everyone on the server.

## Remove tools

In **Settings → Server → System → Endpoint Management**, pick tools under **Disabled Endpoints** or whole groups under **Disabled Endpoint Groups**, then select **Save Changes** and **Restart Now**.

Or set them in configuration. As environment variables, separate values with commas:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    endpoints:
      toRemove:
        - sign
        - add-watermark
      groupsToRemove:
        - LibreOffice
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    ENDPOINTS_TOREMOVE=sign,add-watermark
    ENDPOINTS_GROUPSTOREMOVE=LibreOffice
    ```
  </TabItem>
</Tabs>

IDs and group names are case-sensitive. The same IDs control which tools the [MCP server](../Automation/MCP-Server.md) exposes, and a tool removed here is never available over MCP.

## Hide or grey out removed tools

By default, removed tools stay visible but greyed out. To hide them instead, turn on **Hide unavailable tools by default** and **Hide unavailable conversions by default** under **Settings → Server → System → User Preference Defaults** (`ui.defaultHideUnavailableTools` and `ui.defaultHideUnavailableConversions`). People can change this in their own settings.

## Tool groups

Removing one of these groups removes every tool in it.

| Group | Tool IDs |
|---|---|
| `PageOps` | `add-page-numbers`, `auto-rotate-pdf`, `auto-split-pdf`, `booklet-imposition`, `crop`, `extract-pages`, `merge-pdfs`, `multi-page-layout`, `overlay-pdf`, `pdf-to-single-page`, `rearrange-pages`, `remove-pages`, `rotate-pdf`, `scale-pages`, `split-by-size-or-count`, `split-pages`, `split-pdf-by-chapters`, `split-pdf-by-sections` |
| `Convert` | `cbz-to-pdf`, `eml-to-pdf`, `file-to-pdf`, `html-to-pdf`, `img-to-pdf`, `json-to-pdf`, `markdown-to-pdf`, `pdf-to-cbz`, `pdf-to-csv`, `pdf-to-epub`, `pdf-to-html`, `pdf-to-img`, `pdf-to-json`, `pdf-to-markdown`, `pdf-to-pdfa`, `pdf-to-presentation`, `pdf-to-rtf`, `pdf-to-text`, `pdf-to-ua`, `pdf-to-vector`, `pdf-to-video`, `pdf-to-word`, `pdf-to-xml`, `url-to-pdf`, `vector-to-pdf` |
| `Security` | `accessibility-report`, `add-password`, `add-stamp`, `add-watermark`, `auto-redact`, `cert-sign`, `change-permissions`, `redact`, `remove-cert-sign`, `remove-password`, `sanitize-pdf`, `sign`, `timestamp-pdf`, `unlock-pdf-forms`, `validate-compliance`, `validate-signature`, `verify-pdf` |
| `Other` | `add-attachments`, `add-image`, `batch-process-attachments`, `compare`, `delete-fields`, `edit-table-of-contents`, `extract-images`, `extract-single-attachment`, `fields`, `fill`, `flatten`, `get-info-on-pdf`, `list-attachments`, `modify-fields`, `multi-tool`, `ocr-pdf`, `remove-annotations`, `remove-blanks`, `replace-invert-pdf`, `text-editor-pdf`, `update-metadata`, `view-pdf` |
| `Advance` | `adjust-contrast`, `auto-rename`, `compress-pdf`, `extract-image-scans`, `overlay-pdf`, `repair`, `scanner-effect` |
| `Automation` | `automate`, `handleData`, `pipeline` |
| `DocParse` | `ingest` |
| `DeveloperTools` | `show-javascript` |
| `DeveloperDocs` | `dev-api-docs`, `dev-airgapped-docs`, `dev-folder-scanning-docs`, `dev-sso-guide-docs` (links to developer guides in the app) |

Tools outside these groups, such as `pdf-to-cbr` or `remove-image-pdf`, can still be removed by ID. A tool's ID is the last part of its API path, and conversions use `<from>-to-<to>`, so `/api/v1/convert/pdf/img` is `pdf-to-img`. The [API docs](../../Developers/API.md#base-url-keys-and-reference) at `/swagger-ui/index.html` on your server list every path.

## Dependency groups

These groups are named after what a tool needs to run. When a program is missing, Stirling PDF removes its group at startup. Tools with another way to run, such as `compress-pdf`, stay available.

| Group | Tools that use it |
|---|---|
| `LibreOffice` | `file-to-pdf`, `pdf-to-html`, `pdf-to-pdfa`, `pdf-to-presentation`, `pdf-to-rtf`, `pdf-to-word`, `pdf-to-xml` |
| `Unoconvert` | `file-to-pdf` |
| `Python` | `extract-image-scans`, `file-to-pdf`, `html-to-pdf`, `url-to-pdf` |
| `OpenCV` | `extract-image-scans` |
| `Weasyprint` | `eml-to-pdf`, `html-to-pdf`, `markdown-to-pdf`, `url-to-pdf` |
| `Calibre` | `pdf-to-epub` |
| `qpdf` | `compress-pdf`, `repair` |
| `Ghostscript` | `compress-pdf`, `crop`, `pdf-to-vector`, `repair`, `replace-invert-pdf`, `scanner-effect`, `vector-to-pdf` |
| `ImageMagick` | `compress-pdf` |
| `OCRmyPDF` | `ocr-pdf` (runs with either `OCRmyPDF` or `tesseract`) |
| `tesseract` | `auto-rotate-pdf`, `ocr-pdf` |
| `Pdftohtml` | `pdf-to-html`, `pdf-to-markdown` |
| `veraPDF` | `accessibility-report`, `pdf-to-ua`, `validate-compliance`, `verify-pdf` |
| `Java` | Built-in tools that need no extra program, such as `merge-pdfs`, `split-pages`, `compress-pdf` and `pdf-to-img`. Removing this group turns off most of the app. |
| `Javascript` | `adjust-contrast`, `compare`, `rearrange-pages`, `sign`, `text-editor-pdf` |
| `rar` | `pdf-to-cbr` (see [PDF to CBR conversion](./PDF-to-CBR.md)) |
| `CLI` | `compress-pdf`, `extract-image-scans`, `file-to-pdf`, `html-to-pdf`, `ocr-pdf`, `pdf-to-html`, `pdf-to-pdfa`, `pdf-to-presentation`, `pdf-to-rtf`, `pdf-to-word`, `pdf-to-xml`, `repair`, `url-to-pdf`. The ultra-lite image removes this group. |

## Tools that are off by default

`url-to-pdf` stays off unless you turn on **Enable URL to PDF** under **Settings → Server → Advanced → Feature Flags** (`system.enableUrlToPDF`). It fetches web pages from your server, so only enable it for trusted internal use.

**Auto Form Detection** (`form-detection`) only runs on the standard and fat Docker images, which ship with a detection model. To install it, open **Settings → Server → System → AI Form Detection** and select **Install** next to the model. For a server without internet access, follow the steps under **Offline / air-gapped install** on the same card. To turn the tool off, switch off **Enable feature** there (`formDetection.enabled`).
