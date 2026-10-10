---
sidebar_position: 2
title: Process limits
sidebar_label: Process limits
description: Set how many copies of each external program run at once and how long each may run on a self-hosted Stirling PDF server.
---

# Process limits

Some tools run external programs such as LibreOffice, Tesseract or Ghostscript. For each program you can set:

- **Session limit**: how many copies run at once. Extra jobs wait in a queue.
- **Timeout**: how many minutes one run may take before it is stopped and returns an error.

Change them under **Settings → Server → Advanced → Process Executor Limits**, or under `processExecutor` in `settings.yml`. A value of `0` or less uses the default. Restart Stirling PDF after editing the file.

## Session limits

| Setting | Default | Used for |
|---|---|---|
| `libreOfficeSessionLimit` | `1` | Office documents to and from PDF |
| `tesseractSessionLimit` | `1` | OCR with Tesseract |
| `ocrMyPdfSessionLimit` | `2` | OCR with OCRmyPDF |
| `pdfToHtmlSessionLimit` | `1` | PDF to HTML and Markdown |
| `ghostscriptSessionLimit` | `8` | Compression, repair and other Ghostscript tools |
| `qpdfSessionLimit` | `4` in `settings.yml`, `2` if unset | Repair and compression |
| `imageMagickSessionLimit` | `4` | Line-art conversion in Compress |
| `pythonOpenCvSessionLimit` | `8` | Image processing, such as scan extraction |
| `weasyPrintSessionLimit` | `16` | HTML to PDF |
| `calibreSessionLimit` | `1` | E-book conversion |
| `installAppSessionLimit` | `1` | Internal install tasks |
| `ffmpegSessionLimit` | `2` | Video output (not in `settings.yml` by default) |

Raise limits on a large server with many users. Lower them on a small one: each copy uses its own memory and CPU, and LibreOffice is especially memory-hungry. Change one limit at a time and watch the server. For more LibreOffice capacity, see [LibreOffice parallel processing](./LibreOffice.md).

## Timeouts

All timeouts are in minutes and default to `30`, except `pdfToHtmltimeoutMinutes` (`20`) and `installApptimeoutMinutes` (`60`). The keys in `settings.yml` are:

`libreOfficetimeoutMinutes`, `pdfToHtmltimeoutMinutes`, `pythonOpenCvtimeoutMinutes`, `weasyPrinttimeoutMinutes`, `installApptimeoutMinutes`, `calibretimeoutMinutes`, `imageMagickTimeoutMinutes`, `tesseractTimeoutMinutes`, `qpdfTimeoutMinutes`, `ghostscriptTimeoutMinutes`, `ocrMyPdfTimeoutMinutes`, and `ffmpegTimeoutMinutes` (not in `settings.yml` by default).

Frequent timeouts usually mean the server is short of CPU or memory.

## Example

A small, low-memory server:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    processExecutor:
      sessionLimit:
        libreOfficeSessionLimit: 1
        tesseractSessionLimit: 1
        ghostscriptSessionLimit: 2
        imageMagickSessionLimit: 2
        pythonOpenCvSessionLimit: 2
        weasyPrintSessionLimit: 4
        qpdfSessionLimit: 1
        ocrMyPdfSessionLimit: 1
      timeoutMinutes:
        libreOfficetimeoutMinutes: 10
        tesseractTimeoutMinutes: 15
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESESSIONLIMIT=1
    PROCESSEXECUTOR_SESSIONLIMIT_TESSERACTSESSIONLIMIT=1
    PROCESSEXECUTOR_SESSIONLIMIT_GHOSTSCRIPTSESSIONLIMIT=2
    PROCESSEXECUTOR_SESSIONLIMIT_IMAGEMAGICKSESSIONLIMIT=2
    PROCESSEXECUTOR_SESSIONLIMIT_PYTHONOPENCVSESSIONLIMIT=2
    PROCESSEXECUTOR_SESSIONLIMIT_WEASYPRINTSESSIONLIMIT=4
    PROCESSEXECUTOR_SESSIONLIMIT_QPDFSESSIONLIMIT=1
    PROCESSEXECUTOR_SESSIONLIMIT_OCRMYPDFSESSIONLIMIT=1
    PROCESSEXECUTOR_TIMEOUTMINUTES_LIBREOFFICETIMEOUTMINUTES=10
    PROCESSEXECUTOR_TIMEOUTMINUTES_TESSERACTTIMEOUTMINUTES=15
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESESSIONLIMIT: 1
          PROCESSEXECUTOR_SESSIONLIMIT_TESSERACTSESSIONLIMIT: 1
          PROCESSEXECUTOR_SESSIONLIMIT_GHOSTSCRIPTSESSIONLIMIT: 2
          PROCESSEXECUTOR_SESSIONLIMIT_IMAGEMAGICKSESSIONLIMIT: 2
          PROCESSEXECUTOR_SESSIONLIMIT_PYTHONOPENCVSESSIONLIMIT: 2
          PROCESSEXECUTOR_SESSIONLIMIT_WEASYPRINTSESSIONLIMIT: 4
          PROCESSEXECUTOR_SESSIONLIMIT_QPDFSESSIONLIMIT: 1
          PROCESSEXECUTOR_SESSIONLIMIT_OCRMYPDFSESSIONLIMIT: 1
          PROCESSEXECUTOR_TIMEOUTMINUTES_LIBREOFFICETIMEOUTMINUTES: 10
          PROCESSEXECUTOR_TIMEOUTMINUTES_TESSERACTTIMEOUTMINUTES: 15
    ```
  </TabItem>
</Tabs>
