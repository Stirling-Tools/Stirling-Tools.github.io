---
sidebar_position: 24
id: Performance-Optimization
title: Performance Optimization & Sizing
description: Resource sizing and scaling guidance for Stirling PDF deployments
tags:
  - Performance
  - Sizing
  - Scaling
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Performance Optimization & Sizing

PDF processing is memory-intensive - a single large PDF can expand to many times its file size in memory during processing. This guide helps you size your deployment correctly.

---

## How Stirling PDF Uses Memory

Stirling PDF loads PDFs into memory using a tiered strategy based on file size:

| File Size | Strategy | Memory Impact |
|---|---|---|
| Up to 10 MB | Loaded entirely into memory | Fast, but consumes memory proportional to file size |
| 10 MB to 50 MB | Partially in memory, remainder stored on disk | Moderate memory usage with disk spillover |
| Over 50 MB | Fully stored on disk during processing | Minimal memory usage, but requires adequate disk space |

The application also monitors memory pressure. If available memory drops too low, all operations are forced into disk-backed mode regardless of file size.

:::caution Memory-Intensive Operations
A 50 MB PDF with complex vector graphics, embedded fonts, and many pages can expand to 200-500 MB in memory during processing. Operations that render pages (such as PDF-to-image conversion) and OCR are particularly memory-intensive. Plan for several times the maximum expected file size per concurrent operation.
:::

---

## Resource Recommendations

<Tabs groupId="server-size">
<TabItem value="small-team" label="Small Team (1-10 users)" default>

**Recommended specifications:**
- **CPU:** 2 cores (4+ recommended)
- **RAM:** 4 GB
- **Disk:** 10 GB free space

**Docker Compose:**
```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '2.0'
```

</TabItem>
<TabItem value="medium-team" label="Medium Team (10-50 users)">

**Recommended specifications:**
- **CPU:** 4-8 cores
- **RAM:** 8-16 GB
- **Disk:** 50 GB (SSD recommended)

**Docker Compose:**
```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    environment:
      PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT: 2
    deploy:
      resources:
        limits:
          memory: 8G
          cpus: '4.0'
```

**Consider:**
- Increase LibreOffice session limit for faster document conversions - see [LibreOffice Parallel Processing](./LibreOffice-Parallel-Processing.md)
- External PostgreSQL database for reliability

</TabItem>
<TabItem value="large-org" label="Large Organization (100+ users)">

**Recommended specifications:**
- **CPU:** 8+ cores
- **RAM:** 16-32 GB
- **Disk:** 100+ GB, SSD strongly recommended

**Docker Compose:**
```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    environment:
      PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT: 4
      PROCESS_EXECUTOR_SESSION_LIMIT_TESSERACT_SESSION_LIMIT: 2
    deploy:
      resources:
        limits:
          memory: 16G
          cpus: '8.0'
```

**Architecture considerations:**
- Multiple instances behind a load balancer with session affinity
- Remote UNO servers for LibreOffice scaling - see [LibreOffice Parallel Processing](./LibreOffice-Parallel-Processing.md)
- External PostgreSQL database (enterprise feature)
- Shared `/configs` volume across instances for consistent settings

:::tip Server/Enterprise Recommended
For large organizations, **Server or Enterprise plans** provide SSO, external database support, advanced monitoring, and dedicated support.

[Learn more](../Server-Admin-Onboarding.md#step-10-paid-plans-serverenterprise)
:::

</TabItem>
</Tabs>

---

## Fine Tuning

For most deployments, Stirling PDF's defaults work well and no manual tuning is needed. If you are experiencing performance issues with large files or high concurrency, you can adjust the memory allocated to the application using the `JAVA_TOOL_OPTIONS` environment variable:

```yaml
services:
  stirling-pdf:
    environment:
      JAVA_TOOL_OPTIONS: "-Xms512m -Xmx4g"
```

`-Xms` sets the initial memory allocation and `-Xmx` sets the maximum. If running in Docker or Kubernetes with memory limits, set the container limit to **at least 1.5x the `-Xmx` value** to leave room for background processes like LibreOffice and Tesseract.

---

## Resource-Intensive Operations

Some operations require significantly more resources than others. If your organization primarily uses specific tools, you should size your deployment based on the most resource-heavy operations your users will perform.

| Operation | CPU Impact | Memory Impact | Notes |
|---|---|---|---|
| Merge / Split | Low | Proportional to total file sizes | Lightweight file operations |
| OCR (Tesseract) | Very High | High | CPU-bound image analysis |
| File Conversion (LibreOffice) | High | High | Single-threaded per instance |
| PDF-to-Image | Moderate | Very High | Page rendering expands memory significantly |
| PDF/A Conversion | Moderate | High | Font embedding and color profiles |
| Compression | Moderate | High | Rewriting internal PDF structures |

For example, if your team primarily uses OCR and document conversion, you will need significantly more resources than a team that mainly merges and splits PDFs. Adjust your [Process Limits](./Process-Limits.md) and resource allocation accordingly.

---

## Related

- [Process Limits](./Process-Limits.md) - Configure session limits and timeouts for all external tools
- [LibreOffice Parallel Processing](./LibreOffice-Parallel-Processing.md) - Scale document conversions with multiple instances
- [Production Deployment Guide](../Server-Admin-Onboarding.md) - Full production setup walkthrough
- [Diagnostics](./Diagnostics.md) - Collect system and application diagnostics for troubleshooting
