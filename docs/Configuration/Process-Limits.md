---
sidebar_position: 17
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Process Limits

Stirling PDF sometimes runs external tools to handle tools such as conversions or advanced operations
Tools like LibreOffice, Tesseract, Ghostscript, and others. All these tools are optional to Stirling PDFs general operation.

> Some tools listed here may not be actively used in the current version of Stirling PDF. Their configuration is kept in place for potential re-introduction in future updates.

Two types of limits are customised for every external tool:

- **Session limits** - how many of a given process can run at the same time
- **Timeouts** - how long a single process can run before it's killed

Both sit under `processExecutor` in `settings.yml`. A value of `0` means "use the default."

---

## Session limits

Controls how many concurrent instances of each process are allowed. Extra requests queue up and wait.

| Setting | Default | What it controls |
|---|---|---|
| `sessionLimit.libreOfficeSessionLimit` | `1` | Word/Excel/PowerPoint/HTML → PDF |
| `sessionLimit.tesseractSessionLimit` | `1` | OCR (Tesseract is single-threaded) |
| `sessionLimit.pdfToHtmlSessionLimit` | `1` | PDF → HTML |
| `sessionLimit.ghostscriptSessionLimit` | `8` | PDF compression, repair, manipulation |
| `sessionLimit.pythonOpenCvSessionLimit` | `8` | Image processing |
| `sessionLimit.imageMagickSessionLimit` | `4` | Image conversion |
| `sessionLimit.qpdfSessionLimit` | `2` | Split, merge, encrypt PDFs |
| `sessionLimit.ocrMyPdfSessionLimit` | `2` | Add OCR overlay to existing PDFs |
| `sessionLimit.weasyPrintSessionLimit` | `16` | HTML/CSS → PDF (WeasyPrint) |
| `sessionLimit.calibreSessionLimit` | `1` | E-book conversions |
| `sessionLimit.ffmpegSessionLimit` | `2` | Video/audio processing |
| `sessionLimit.installAppSessionLimit` | `1` | Internal install tasks |

**Increase** limits on a beefy server with concurrent users. **Decrease** them on low-RAM servers - LibreOffice in particular is memory-hungry.

:::info
Be mindful of memory and CPU usage when raising session limits. Each concurrent process consumes resources, and setting limits too high can starve the host or cause out-of-memory issues possibly killing the instance. Start with the defaults and increase gradually while monitoring your server.
:::

---

## Timeouts

How long (in minutes) a process can run before it's forcibly killed and an error is returned.

| Setting | Default |
|---|---|
| `timeoutMinutes.libreOfficeTimeoutMinutes` | `30` |
| `timeoutMinutes.tesseractTimeoutMinutes` | `30` |
| `timeoutMinutes.ghostscriptTimeoutMinutes` | `30` |
| `timeoutMinutes.pythonOpenCvTimeoutMinutes` | `30` |
| `timeoutMinutes.imageMagickTimeoutMinutes` | `30` |
| `timeoutMinutes.qpdfTimeoutMinutes` | `30` |
| `timeoutMinutes.ocrMyPdfTimeoutMinutes` | `30` |
| `timeoutMinutes.weasyPrintTimeoutMinutes` | `30` |
| `timeoutMinutes.calibreTimeoutMinutes` | `30` |
| `timeoutMinutes.ffmpegTimeoutMinutes` | `30` |
| `timeoutMinutes.pdfToHtmlTimeoutMinutes` | `20` |
| `timeoutMinutes.installAppTimeoutMinutes` | `60` |

**Increase** timeouts if users process very large files that legitimately take longer. **Decrease** them if you want faster failure and tighter resource control.

---

## Examples

### Conservative - low-resource server

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
        libreOfficeTimeoutMinutes: 10
        tesseractTimeoutMinutes: 15
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESSESSIONLIMIT=1
    PROCESSEXECUTOR_SESSIONLIMIT_TESSERACTSESSIONLIMIT=1
    PROCESSEXECUTOR_SESSIONLIMIT_GHOSTSCRIPTSESSIONLIMIT=2
    PROCESSEXECUTOR_TIMEOUTMINUTES_LIBREOFFICETIMEOUTMINUTES=10
    PROCESSEXECUTOR_TIMEOUTMINUTES_TESSERACTTIMEOUTMINUTES=15
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
        environment:
          PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESSESSIONLIMIT: 1
          PROCESSEXECUTOR_SESSIONLIMIT_TESSERACTSESSIONLIMIT: 1
          PROCESSEXECUTOR_TIMEOUTMINUTES_LIBREOFFICETIMEOUTMINUTES: 10
    ```
  </TabItem>
</Tabs>

### High-throughput - powerful server

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    processExecutor:
      sessionLimit:
        libreOfficeSessionLimit: 4
        tesseractSessionLimit: 4
        ghostscriptSessionLimit: 16
        imageMagickSessionLimit: 8
        pythonOpenCvSessionLimit: 16
        qpdfSessionLimit: 8
        ocrMyPdfSessionLimit: 4
      timeoutMinutes:
        libreOfficeTimeoutMinutes: 60
        tesseractTimeoutMinutes: 60
        ocrMyPdfTimeoutMinutes: 60
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESSESSIONLIMIT=4
    PROCESSEXECUTOR_SESSIONLIMIT_TESSERACTSESSIONLIMIT=4
    PROCESSEXECUTOR_TIMEOUTMINUTES_LIBREOFFICETIMEOUTMINUTES=60
    ```
  </TabItem>
</Tabs>

