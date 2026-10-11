---
sidebar_position: 7
title: Diagnostics
sidebar_label: Diagnostics
description: Collect logs, configuration and system details from a Stirling PDF Docker container into one archive for troubleshooting or a bug report.
---

# Diagnostics

The Docker images include a diagnostics tool that gathers logs, configuration, system information and app metrics into one archive. Attach it when you report a problem; see the [FAQ](../../Tools/FAQ.md) for where to get help.

## Run the tool

```bash
docker exec -it <container_name> diag
```

The tool needs an interactive terminal, so keep the `-it` flags.

Choose a mode when prompted:

- **1) Auto** collects the last day of logs, `/configs`, system information, and the app's status, health and metrics endpoints. It does not redact anything.
- **2) Custom** asks what to include and whether to redact.

PDFs, images and archives are never collected.

### Custom mode options

| Prompt | Default | Collects |
|---|---|---|
| Output directory | `/configs` | Where to save the archive. |
| Days of logs to include | `1` | Log files from this many days. |
| Include /configs? | Yes | Configuration files, such as `settings.yml`. |
| Include /customFiles (excluding PDFs)? | No | Your custom files. |
| Include /pipeline (excluding PDFs)? | No | Pipeline working files. |
| Include /tmp/stirling-pdf? | No | Temporary processing files. |
| Include system information? | Yes | OS, CPU, memory, disk, Java and Python versions. |
| Include environment variables? | No | Every environment variable. |
| Fetch app status/health/metrics endpoints? | Yes | Status, health and load data. |
| Include /api/v1/ui-data endpoints? | No | Data the app's sign, pipeline and OCR screens use. |
| Redact sensitive information from diagnostics? | Yes | Then asks separately about secrets, tokens and passwords (default yes), URL hosts, email addresses, and host, domain and server fields (default no). |

:::caution
Configuration files and environment variables can contain passwords and keys. Before sharing a bundle publicly, for example in a GitHub issue, run Custom mode with redaction on and check the archive yourself: redaction can miss values.
:::

## Get the archive

The tool prints the archive path when it finishes, in a `Created tar.gz` line. Copy it out of the container:

```bash
docker cp <container_name>:/configs/stirling-diagnostics-20260917-120000.tar.gz ./
```

The archive holds `summary.txt` (what was collected, and the version) and a `bundle/` folder with logs, configs, system information, metrics and directory listings, including the installed OCR languages.

## AOT diagnostics

If you run with ahead-of-time compilation on (`STIRLING_AOT_ENABLE=true`), `aot-diag` (or `aot-diagnostics`) checks why the AOT cache fails to build, which mostly happens on ARM64. It checks cache integrity and JVM compatibility and can run smoke tests:

```bash
docker exec -it <container_name> aot-diag
```
