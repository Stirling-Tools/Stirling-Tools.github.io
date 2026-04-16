---
sidebar_position: 24
id: Performance-Optimization
title: Performance Optimization & Sizing
description: Resource sizing, JVM tuning, memory model, and scaling guidance for Stirling PDF
tags:
  - Performance
  - Sizing
  - Memory
  - Scaling
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Performance Optimization & Sizing

Understanding how Stirling PDF uses resources is essential for sizing your deployment correctly. PDF processing is memory-intensive - a single large PDF can expand to many times its file size in memory during processing.

---

## How Stirling PDF Uses Memory

Stirling PDF loads PDFs into memory using a tiered strategy based on file size:

| File Size | Strategy | Memory Impact |
|---|---|---|
| Up to 10 MB | Loaded entirely into JVM heap as byte array | Fast, but consumes heap proportional to file size |
| 10 MB to 50 MB | Mixed mode - 10 MB budget in heap, remainder file-backed | Moderate heap usage with disk spillover |
| Over 50 MB | Fully file-backed (scratch space on disk) | Minimal heap, but requires adequate temp disk space |

The application also monitors heap pressure. If free heap drops below **30% of total heap** or below **256 MB absolute**, all operations are forced into file-backed mode regardless of file size.

The maximum number of simultaneous PDF operations is bounded by a semaphore based on your CPU count: `max(4, available CPU cores)`. Each concurrent operation may hold a document in memory, so peak memory usage scales with both file sizes and concurrency.

:::caution Memory-Intensive Operations
A 50 MB PDF with complex vector graphics, embedded fonts, and many pages can expand to 200-500 MB in memory during processing. Operations that render pages (such as PDF-to-image conversion) and OCR are particularly memory-intensive. Plan for several times the maximum expected file size in available heap per concurrent operation.
:::

---

## Resource Recommendations

<Tabs groupId="server-size">
<TabItem value="small-team" label="Small Team (1-10 users)" default>

**Recommended specifications:**
- **CPU:** 2 cores (4+ recommended)
- **RAM:** 4 GB total, 2 GB JVM heap
- **Disk:** 10 GB free temp space
- **Expected files:** Under 20 MB

**Docker Compose:**
```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    environment:
      JAVA_TOOL_OPTIONS: "-Xms512m -Xmx2g"
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
- **RAM:** 8-16 GB total, 4-8 GB JVM heap
- **Disk:** 50 GB temp space (SSD recommended)
- **Expected files:** Up to 100 MB

**Docker Compose:**
```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    environment:
      JAVA_TOOL_OPTIONS: "-Xms1g -Xmx4g"
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
<TabItem value="large-org" label="Large Organization (50+ users)">

**Recommended specifications:**
- **CPU:** 8+ cores
- **RAM:** 16-32 GB total, 8-16 GB JVM heap
- **Disk:** 100+ GB temp space, SSD strongly recommended
- **Expected files:** Up to 500 MB, OCR and conversion workloads

**Docker Compose:**
```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    environment:
      JAVA_TOOL_OPTIONS: "-Xms2g -Xmx8g"
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

## JVM Tuning

The application runs on Java 21+ with virtual threads enabled. The JVM does not ship with fixed heap settings - it uses the JVM's automatic ergonomics, which typically sets max heap to 25% of available container memory. For production, always explicitly set the heap:

```bash
JAVA_TOOL_OPTIONS="-Xms512m -Xmx4g"
```

| Setting | Meaning | Recommendation |
|---|---|---|
| `-Xms` | Initial heap size | Set to 25-50% of `-Xmx` to reduce GC churn at startup |
| `-Xmx` | Maximum heap size | Set based on your workload (see sizing table above) |

:::caution Container Memory Limits
If running in Docker or Kubernetes with memory limits, set the container limit to **at least 1.5x the JVM max heap** to account for JVM metaspace, LibreOffice processes (~50 MB each), Tesseract, Python processes, and OS overhead. For example, if you set `-Xmx4g`, set your container memory limit to at least 6 GB.
:::

---

## Storage & Temp File Management

Stirling PDF stores temporary processing files in a configurable temp directory (default: the system temp directory under `stirling-pdf/`). Automatic cleanup runs every **30 minutes** and removes files older than **24 hours**.

For high-throughput deployments, ensure your temp directory is on fast storage (SSD) with sufficient space. Monitor disk usage - if cleanup cannot keep pace with file processing, the temp directory can grow large.

**Monitor disk usage:**
```bash
# Check Docker disk usage
docker system df

# Check Stirling-PDF data usage
du -sh ./stirling-data/*
```

---

## Job Queue Behavior

Under high load, Stirling PDF queues incoming requests with these defaults:

| Parameter | Default | Notes |
|---|---|---|
| Base queue capacity | 10 | Maximum queued jobs before rejection |
| Minimum queue capacity | 2 | Floor during resource pressure |
| Queue check interval | 1 second | How often queued jobs are re-evaluated |
| Maximum wait time | 10 minutes | After which queued jobs are rejected |

When CPU or memory exceeds critical thresholds (CPU 90%, heap 90%), the queue capacity is dynamically reduced toward the minimum to shed load. If users are experiencing rejected requests during peak usage, consider scaling horizontally with multiple instances.

---

## Resource-Intensive Operations

Some operations require significantly more resources than others:

| Operation | CPU Impact | Memory Impact | Notes |
|---|---|---|---|
| Merge / Split | Low | Proportional to total file sizes | Lightweight file operations |
| OCR (Tesseract) | Very High | High | CPU-bound image analysis |
| File Conversion (LibreOffice) | High | High | Single-threaded per instance |
| PDF-to-Image | Moderate | Very High | Page rendering expands memory significantly |
| PDF/A Conversion | Moderate | High | Font embedding and color profiles |
| Compression | Moderate | High | Rewriting internal PDF structures |

For configuration of per-tool concurrency limits and timeouts, see [Process Limits](./Process-Limits.md).

---

## Related

- [Process Limits](./Process-Limits.md) - Configure session limits and timeouts for all external tools
- [LibreOffice Parallel Processing](./LibreOffice-Parallel-Processing.md) - Scale document conversions with multiple instances
- [Production Deployment Guide](../Server-Admin-Onboarding.md) - Full production setup walkthrough
- [Diagnostics](./Diagnostics.md) - Collect system and application diagnostics for troubleshooting
