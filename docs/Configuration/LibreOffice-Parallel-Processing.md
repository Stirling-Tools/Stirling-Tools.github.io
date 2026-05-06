---
sidebar_position: 22
id: LibreOffice-Parallel-Processing
title: LibreOffice Parallel Processing
description: Configure multiple LibreOffice instances for parallel document conversion
tags:
  - LibreOffice
  - Performance
  - Scaling
  - UNO Server
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# LibreOffice Parallel Processing

Stirling PDF uses LibreOffice for converting office documents (DOCX, XLSX, PPTX, etc.) to PDF and other formats. LibreOffice processes each conversion in a single thread, meaning one conversion uses one CPU core at 100% regardless of how many cores are available. To process multiple conversions at the same time, you need to run multiple LibreOffice instances.

---

## Local UNO Server Pool

By default, Stirling PDF manages a local pool of UNO (Universal Network Objects) server instances. The number of instances is controlled by the `libreOfficeSessionLimit` setting.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    processExecutor:
      autoUnoServer: true
      sessionLimit:
        libreOfficeSessionLimit: 4  # Run 4 LibreOffice instances
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT=4
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
        environment:
          PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT: 4
    ```
  </TabItem>
</Tabs>

A reasonable starting point is one instance per 2 CPU cores; see [Host resource requirements](#host-resource-requirements) below for memory and storage sizing.

If an instance becomes unresponsive it is automatically restarted in the background, so your conversions keep working without manual intervention.

:::info
The default `libreOfficeSessionLimit` is `1`, meaning only one conversion runs at a time. If you see conversions queuing up or running slowly, increasing this is the first thing to try.
:::

### Throughput expectations

Per-worker throughput varies enormously with document content and host hardware. Tiny plain DOCX inputs on a fast SSD-backed host can finish in well under a second, while large PPTX with embedded media or complex spreadsheets on a constrained host can take tens of seconds each. There's no single number worth quoting. What is reliable is that the pool's total throughput scales roughly linearly with instance count up to the host's available CPU; doubling workers on an under-saturated host roughly doubles concurrency.

Measure your own baseline: run a representative document through a single worker, time the conversion, then size the pool around your expected concurrent users and acceptable queue wait. Plan for the worst-case documents your users actually upload, not the average.

---

## Remote UNO Server Endpoints

For larger deployments or when you want to isolate LibreOffice from the main application, you can run UNO servers as separate containers and configure Stirling PDF to connect to them remotely.

Set `autoUnoServer` to `false` and define your remote endpoints:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    processExecutor:
      autoUnoServer: false
      unoServerEndpoints:
        - host: "unoserver1"
          port: 2003
          hostLocation: "remote"
          protocol: "http"
        - host: "unoserver2"
          port: 2003
          hostLocation: "remote"
          protocol: "http"
        - host: "unoserver3"
          port: 2003
          hostLocation: "remote"
          protocol: "http"
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PROCESS_EXECUTOR_AUTO_UNO_SERVER=false
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST=unoserver1
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_PORT=2003
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST_LOCATION=remote
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_PROTOCOL=http
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST=unoserver2
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_PORT=2003
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST_LOCATION=remote
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_PROTOCOL=http
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
        environment:
          PROCESS_EXECUTOR_AUTO_UNO_SERVER: "false"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST: "unoserver1"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_PORT: "2003"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST_LOCATION: "remote"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST: "unoserver2"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_PORT: "2003"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST_LOCATION: "remote"
        ports:
          - "8080:8080"

      unoserver1:
        image: ghcr.io/stirling-tools/stirling-unoserver:latest
        ports:
          - "2003:2003"

      unoserver2:
        image: ghcr.io/stirling-tools/stirling-unoserver:latest
        ports:
          - "2004:2003"
    ```
  </TabItem>
</Tabs>

To add more endpoints, add additional entries to the `unoServerEndpoints` list in settings.yml, or for environment variables, increment the index number (e.g. `_0_` for the first, `_1_` for the second, `_2_` for the third, and so on).

### Endpoint Configuration

The `host` field accepts a Docker service name (e.g. `unoserver1`), a DNS hostname (e.g. `uno.internal.example.com`), or an IP address (e.g. `192.168.1.50`). The default is `127.0.0.1`.

The `hostLocation` setting controls how files are transferred between Stirling PDF and the UNO server:

| Value | When to Use | How It Works |
|---|---|---|
| `auto` | Default, detects automatically | Checks if the host is local or remote |
| `local` | UNO server is on the same machine | Files are passed via filesystem paths (fastest) |
| `remote` | UNO server is a separate container or machine | Files are transferred over HTTP |

:::caution
Use `remote` when running UNO servers in separate Docker containers, even if the containers are on the same host machine. The containers don't share a filesystem, so `local` will not work.
:::

---

## The `stirling-unoserver` Image

`ghcr.io/stirling-tools/stirling-unoserver` is the official image for the remote pool pattern, ready to run as a standalone conversion worker.

Available tags:

| Tag | Use it for |
|---|---|
| `:latest` | Production deployments |
| `:alpha` | Pre-release testing |
| `:1.0.0`, `:1.0.1`, etc. | Pin to a specific version |

The image is versioned independently from Stirling PDF and only republished when the image itself changes, so under normal circumstances you can pin a specific image version and leave it alone while Stirling PDF itself updates. In the rare case Stirling PDF requires a newer compatible image, that will be called out in the release notes and migration docs. Full version independence is the goal but not a guarantee.

### Configuration options

| Variable | Default | Purpose |
|---|---|---|
| `UNOSERVER_PORT` | `2003` | Port the client connects to. Change if it conflicts with another service on the host. |
| `UNOSERVER_INTERFACE` | `0.0.0.0` | Listen address. Use `127.0.0.1` to make the container reachable only from the same host. |
| `UNOSERVER_CONVERSION_TIMEOUT` | `1800` (seconds) | Maximum time a single conversion is allowed to run. If exceeded, the container restarts itself automatically. Set this to be at least as long as Stirling PDF's `libreOfficeTimeoutMinutes`. |
| `UNOSERVER_RECYCLE_INTERVAL_SECONDS` | `0` (disabled) | Periodically restart the container to keep memory usage steady over long uptimes. Set to e.g. `3600` for hourly recycling. Minimum value is 60 seconds. |

### Periodic recycling

LibreOffice can slowly grow its memory footprint over many conversions. Setting `UNOSERVER_RECYCLE_INTERVAL_SECONDS` makes each container restart itself on a schedule, keeping memory usage steady.

The restart takes a few seconds. During that window any request routed to that container is automatically retried by Stirling PDF, so user-facing requests still complete normally. If you run several containers, their startups will drift apart naturally so they don't all recycle at the same moment.

For steady production traffic, an hourly or once-a-day recycle is usually plenty. For lighter workloads or short-lived deployments you can leave it disabled.

:::info Run multiple instances
A single container is one worker. To run four workers, declare four services in your compose file (`unoserver1` through `unoserver4`) using the same image, and list all four endpoints in the Stirling PDF configuration.
:::

### Asian-language fonts

The default image includes broad European-language coverage including hyphenation for English, French, German, Spanish, Italian, Portuguese, Dutch, Polish, and Russian. If you need Chinese, Japanese, or Korean conversion support you'll need a custom variant of the image with CJK fonts added. Contact us or open a GitHub issue and we can publish one.

---

## Running UNO Servers Without Docker

If you are running Stirling PDF without Docker (bare metal or systemd), you can start additional UNO server instances manually using the `unoserver` Python package:

```bash
# Install unoserver (included in Docker images)
pip install unoserver

# Start instances on different ports
unoserver --port 2003 &
unoserver --port 2004 &
unoserver --port 2005 &
```

Then configure Stirling PDF to connect to these instances at `127.0.0.1` on the respective ports with `hostLocation: "local"`.

---

## Timeout Configuration

LibreOffice conversion has a default timeout of **30 minutes**. For very large or complex documents, you may need to increase this:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    processExecutor:
      timeoutMinutes:
        libreOfficetimeoutMinutes: 60
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PROCESS_EXECUTOR_TIMEOUT_MINUTES_LIBRE_OFFICETIMEOUT_MINUTES=60
    ```
  </TabItem>
</Tabs>

If conversions are consistently timing out, this usually indicates the system is under-resourced rather than needing a longer timeout. Check CPU and memory usage first.

---

## Host resource requirements

When sizing a host for office conversion, plan for the following:

**Memory.** Each LibreOffice worker uses around 70 MB of RAM when idle, climbing to 140 to 250 MB during active conversion depending on the document. Multiply by your worker count and add headroom for the operating system, the Stirling PDF application itself, and any other services on the host. If memory runs out, the OS will start killing processes and conversions will fail.

**CPU.** Each conversion uses one CPU core at 100% for its duration, regardless of how many cores the host has. A reasonable starting point is one worker per two CPU cores; increase from there if you see queues building up.

**Storage.** Uploaded files are written to temporary disk space at `/tmp/stirling-pdf` while they're being converted. Allow free space of roughly `2 × your maximum upload size × number of concurrent uploads`. On hosts with a small `/tmp` partition (some VPS providers default to 1 or 2 GB) mount a larger volume:

```yaml
services:
  stirling-pdf:
    volumes:
      - stirling-tmp:/tmp/stirling-pdf
volumes:
  stirling-tmp: {}
```

---

## Worked example: 4 remote workers

A reasonable starting point for a small team or trial deployment is one Stirling PDF instance plus four `stirling-unoserver` containers on the same host, with the conversion pool capped at 4. This caps memory predictably and lets all four conversions run truly in parallel:

```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    ports:
      - "8080:8080"
    environment:
      PROCESS_EXECUTOR_AUTO_UNO_SERVER: "false"
      PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT: "4"
      PROCESS_EXECUTOR_TIMEOUT_MINUTES_LIBRE_OFFICETIMEOUT_MINUTES: "5"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST: "unoserver1"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_PORT: "2003"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST_LOCATION: "remote"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST: "unoserver2"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_PORT: "2003"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST_LOCATION: "remote"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_2_HOST: "unoserver3"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_2_PORT: "2003"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_2_HOST_LOCATION: "remote"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_3_HOST: "unoserver4"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_3_PORT: "2003"
      PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_3_HOST_LOCATION: "remote"
    depends_on:
      unoserver1: { condition: service_started }
      unoserver2: { condition: service_started }
      unoserver3: { condition: service_started }
      unoserver4: { condition: service_started }

  unoserver1: &uno
    image: ghcr.io/stirling-tools/stirling-unoserver:latest
    environment:
      UNOSERVER_RECYCLE_INTERVAL_SECONDS: "3600"
    deploy:
      resources:
        limits: { cpus: "1.0", memory: 1g }
    restart: on-failure:5
  unoserver2: { <<: *uno }
  unoserver3: { <<: *uno }
  unoserver4: { <<: *uno }
```

Stirling PDF distributes incoming conversions evenly across all configured workers. Extra requests above the worker count simply queue and wait for a free slot. The system stays stable under high concurrency. The practical limits you'll hit, in order, are:

1. Per-conversion time on heavy documents (a complex PPTX or large spreadsheet can take tens of seconds, which lowers your effective throughput regardless of worker count)
2. Host CPU saturation
3. Free `/tmp` disk space if many large uploads queue at once
4. Stirling PDF's `libreOfficeTimeoutMinutes` for any single request that waits too long

If your workload is mostly heavy documents, run more workers with smaller per-worker memory limits rather than fewer larger ones. That gives you better parallelism per dollar of RAM.

---

## Related

- [Process Limits](./Process-Limits.md) — Configure session limits and timeouts for all external tools
- [Production Deployment Guide](../Server-Admin-Onboarding.md) — Sizing recommendations for different workloads
- [Diagnostics](./Diagnostics.md) — Collect system and application diagnostics for troubleshooting
