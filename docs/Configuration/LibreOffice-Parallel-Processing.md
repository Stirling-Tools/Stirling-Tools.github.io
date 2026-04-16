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

Each additional instance consumes approximately **50 MB of RAM when idle** and significantly more during active conversion. A reasonable starting point is one instance per 2 CPU cores, adjusted based on available RAM and expected workload.

:::info
The default `libreOfficeSessionLimit` is `1`, meaning only one conversion runs at a time. If you see conversions queuing up or running slowly, increasing this is the first thing to try.
:::

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
        image: docker.stirlingpdf.com/stirlingtools/stirling-pdf-unoserver:latest
        ports:
          - "2003:2003"

      unoserver2:
        image: docker.stirlingpdf.com/stirlingtools/stirling-pdf-unoserver:latest
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

## Related

- [Process Limits](./Process-Limits.md) — Configure session limits and timeouts for all external tools
- [Production Deployment Guide](../Server-Admin-Onboarding.md) — Sizing recommendations for different workloads
- [Diagnostics](./Diagnostics.md) — Collect system and application diagnostics for troubleshooting
