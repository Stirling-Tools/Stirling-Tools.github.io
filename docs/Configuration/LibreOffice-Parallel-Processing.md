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

A reasonable starting point is one instance per 2 CPU cores. See [Host resource requirements](#host-resource-requirements) for memory and storage sizing.

:::info
The default `libreOfficeSessionLimit` is `1`, meaning only one conversion runs at a time. If you see conversions queuing up or running slowly, increasing this is the first thing to try.
:::

### Throughput expectations

Per-conversion time varies from sub-second (small DOCX) to tens of seconds (complex PPTX, large spreadsheets). Pool throughput scales roughly linearly with worker count up to host CPU saturation - benchmark a representative document before sizing.

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

`ghcr.io/stirling-tools/stirling-unoserver` is the official standalone worker image.

| Tag | Use |
|---|---|
| `:latest` | Production |
| `:alpha` | Pre-release testing |
| `:1.0.0`, `:1.0.1`, … | Pinned version |

The image is versioned independently from Stirling PDF - pin a version and update it on its own cadence. Compatibility breaks are called out in release notes.

### Configuration

| Variable | Default | Purpose |
|---|---|---|
| `UNOSERVER_PORT` | `2003` | Listen port. |
| `UNOSERVER_INTERFACE` | `0.0.0.0` | Listen address; use `127.0.0.1` to restrict to the same host. |
| `UNOSERVER_CONVERSION_TIMEOUT` | `1800` (s) | Max time per conversion. Set ≥ `libreOfficeTimeoutMinutes`. |
| `UNOSERVER_RECYCLE_INTERVAL_SECONDS` | `0` (off) | Periodic restart to bound LibreOffice memory growth. Minimum 60 s; e.g. `3600` for hourly. |

### CJK fonts

The default image covers European languages with hyphenation for EN/FR/DE/ES/IT/PT/NL/PL/RU. For Chinese/Japanese/Korean, rebuild with `--build-arg INSTALL_CJK_FONTS=true` (~120 MB extra).

### Multiple workers

One container is one worker. To run four, declare four services using the same image and list all four endpoints in Stirling PDF's configuration.

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

- **Memory** - ~70 MB idle, 140–250 MB during conversion, per worker. Add headroom for the OS and Stirling PDF itself.
- **CPU** - one core pinned per active conversion. Start with one worker per two cores.
- **Storage** - `/tmp/stirling-pdf` holds files mid-conversion. Allow roughly `2 × max upload × concurrent uploads`. On small `/tmp` partitions, mount a volume:

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

One Stirling PDF instance, four `stirling-unoserver` containers, pool capped at 4:

```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    ports: ["8080:8080"]
    environment:
      PROCESS_EXECUTOR_AUTO_UNO_SERVER: "false"
      PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT: "4"
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
    depends_on: [unoserver1, unoserver2, unoserver3, unoserver4]

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

Conversions distribute evenly across workers; excess queue. Bottlenecks in order: heavy-document conversion time → host CPU → `/tmp` space → `libreOfficeTimeoutMinutes`.

---

## Related

- [Process Limits](./Process-Limits.md) - Configure session limits and timeouts for all external tools
- [Production Deployment Guide](../Server-Admin-Onboarding.md) - Sizing recommendations for different workloads
- [Diagnostics](./Diagnostics.md) - Collect system and application diagnostics for troubleshooting
