---
sidebar_position: 21
id: Diagnostics
title: Diagnostics & Reporting Issues
description: Use the built-in diagnostics tool and learn how to report issues effectively
tags:
  - Diagnostics
  - Troubleshooting
  - Support
---

# Diagnostics & Reporting Issues

Stirling PDF includes a built-in diagnostics tool inside Docker containers that collects logs, configuration, system information, and application metrics into a single archive. This is the fastest way to gather the information needed when troubleshooting or reporting issues.

---

## Running the Diagnostics Tool

Open an interactive shell inside the running container and invoke the tool:

```bash
docker exec -it <container_name> diag
```

The following aliases all work identically: `diag`, `debug`, `diagnostic`, `diagnostics`, `stirling-diagnostics`.

:::caution Interactive Terminal Required
The diagnostics tool requires an interactive terminal (`-it` flag). It will not run in non-interactive or headless sessions.
:::

---

## Collection Modes

When you run the tool, you'll be prompted to choose a collection mode.

### Auto Mode (Recommended)

Select option **1** when prompted. Auto mode collects:

- Application logs from the last 24 hours
- Configuration files from `/configs`
- System information (OS, CPU, memory, disk, Java version)
- Application metrics and health endpoints

This is sufficient for most issue reports.

### Custom Mode

Select option **2** for granular control over what gets collected:

| Prompt | Default | What It Collects |
|---|---|---|
| Output directory | `/configs` | Where to save the archive |
| Days of logs | 1 | How many days of logs to include |
| Include /configs | Yes | Configuration files |
| Include /customFiles | No | Custom files (excluding PDFs and images) |
| Include /pipeline | No | Pipeline working files (excluding PDFs) |
| Include /tmp/stirling-pdf | No | Temporary processing files |
| Include system information | Yes | OS, CPU, RAM, disk, Java/Python versions |
| Include environment variables | No | Full environment dump |
| Fetch metrics endpoints | Yes | Application status, health, and load data |
| Include UI data endpoints | No | Sign, pipeline, and OCR endpoint data |
| Redact sensitive information | Yes | Apply redaction filters (see below) |

### Redaction Options

When redaction is enabled, you can selectively mask:

- **Secrets/tokens/passwords** - Redacts Authorization headers, API keys, passwords, and similar credentials
- **URL hosts/domains** - Masks hostnames in URLs
- **Email addresses** - Replaces email addresses with `[REDACTED_EMAIL]`
- **Host/Domain/Server fields** - Masks values in host-related configuration fields

:::caution
Always enable redaction if you plan to share the diagnostics bundle publicly (for example, in a GitHub issue). However, redaction is not perfect and may miss some sensitive values - always review the output manually before sharing publicly. You can disable redaction for private support channels if full detail is needed.
:::

---

## What Gets Collected

The diagnostics bundle is a `.tar.gz` archive saved to the output directory (default: `/configs`). It contains:

```
stirling-diagnostics-YYYYMMDD-HHMMSS.tar.gz
├── summary.txt                  # Collection metadata and settings
├── bundle/
│   ├── logs/                    # Application log files
│   ├── configs/                 # Configuration files (settings.yml, etc.)
│   ├── system/                  # System information
│   │   ├── uname.txt           # Kernel version
│   │   ├── os-release          # OS distribution info
│   │   ├── meminfo.txt         # Memory details
│   │   ├── cpuinfo.txt         # CPU details
│   │   ├── df.txt              # Disk usage
│   │   ├── free.txt            # Memory summary
│   │   ├── ps.txt              # Running processes
│   │   ├── java-version.txt    # Java runtime version
│   │   └── python-version.txt  # Python version
│   ├── metrics/                 # Application metrics
│   │   ├── api/v1/info/status.json
│   │   ├── api/v1/info/uptime.json
│   │   ├── api/v1/info/health.json
│   │   ├── api/v1/info/requests.json
│   │   ├── api/v1/info/load.json
│   │   ├── actuator/health.json
│   │   └── actuator/prometheus.txt
│   ├── env/                     # Environment variables (if requested)
│   └── tree/                    # Directory listings
│       ├── logs.txt
│       ├── configs.txt
│       ├── customFiles.txt
│       ├── pipeline.txt
│       ├── tessdata.txt         # Installed OCR language packs
│       └── tessdata-mount.txt
```

PDFs, images, and compressed archives are always excluded from collection.

### Retrieving the Bundle

After the tool finishes, copy the archive out of the container:

```bash
docker cp <container_name>:/configs/stirling-diagnostics-*.tar.gz ./
```

---

## AOT Diagnostics

If you are running with AOT (Ahead-of-Time) compilation enabled (`STIRLING_AOT_ENABLE=true`), an additional diagnostics tool is available:

```bash
docker exec -it <container_name> aot-diag
```

This tool diagnoses AOT cache generation failures, particularly on ARM64/aarch64 platforms. It checks cache integrity, JVM compatibility, and can run smoke tests.

Aliases: `aot-diag`, `aot-diagnostics`

---

## How to Report Issues

When you encounter a problem with Stirling PDF, choose the right channel depending on the nature of your issue.

### GitHub Issues - Bug Reports & Feature Requests

For reproducible bugs and feature requests, open an issue at:
**https://github.com/Stirling-Tools/Stirling-PDF/issues**

The repository includes issue templates for bug reports and feature requests that will guide you through providing the right information.

When submitting a bug report, include as much detail as possible: the diagnostics bundle (run `diag` in your container first), steps to reproduce the issue, expected vs. actual behavior, your deployment method (Docker, bare metal, Kubernetes), Stirling PDF version (visible in the UI footer or in `summary.txt` from the diagnostics bundle), and any commands, API requests, or actions you were performing when the issue occurred. The more context you provide, the faster it can be resolved.

### Discord Community - Questions & Discussion

For quick questions, troubleshooting help, and community discussion:
**https://discord.gg/HYmhKj45pU**

Discord is the best place for configuration help, setup questions, sharing workarounds with other users, general discussion about features and usage, and getting faster informal feedback before filing a formal issue. It's also great for following up on GitHub issues and having deeper conversations with the community.

### Email Support

For enterprise customers and licensing inquiries:
**support@stirlingpdf.com**

For security vulnerabilities:
**security@stirlingpdf.com** or use the [GitHub Security Advisory](https://github.com/Stirling-Tools/Stirling-PDF/security) process.

