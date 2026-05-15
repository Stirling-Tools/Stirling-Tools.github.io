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

## Remote unoservers

For larger deployments, or when you want to isolate LibreOffice from the main application, run UNO servers as separate containers and configure Stirling PDF to connect to them remotely. This is a two-step setup: start the unoserver containers, then point Stirling PDF at them.

### Starting unoserver Containers

Each container is a single worker that listens internally on port `2003`. Expose it on a different host port per instance if you want to reach them from outside Docker or from another host.

<Tabs groupId="config-methods">
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      unoserver1:
        image: ghcr.io/stirling-tools/stirling-unoserver:latest
        ports:
          - "2003:2003"

      unoserver2:
        image: ghcr.io/stirling-tools/stirling-unoserver:latest
        ports:
          - "2004:2003"
    ```
    Add these alongside your `stirling-pdf` service. Host-port mappings are only required if Stirling PDF runs outside Docker, on a different host, or on a separate Docker network.
  </TabItem>
  <TabItem value="docker-run" label="docker run">
    ```bash
    docker run -d --name unoserver1 -p 2003:2003 \
      ghcr.io/stirling-tools/stirling-unoserver:latest

    docker run -d --name unoserver2 -p 2004:2003 \
      ghcr.io/stirling-tools/stirling-unoserver:latest
    ```
  </TabItem>
</Tabs>

For tunable options (timeouts, periodic recycling, CJK fonts), see [The `stirling-unoserver` Image](#the-stirling-unoserver-image) below.

### Connecting Stirling PDF to Remote Endpoints

Once your unoserver containers are running, set `autoUnoServer` to `false` and point Stirling PDF at them:

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
        ports:
          - "8080:8080"
        environment:
          PROCESS_EXECUTOR_AUTO_UNO_SERVER: "false"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST: "unoserver1"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_PORT: "2003"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST_LOCATION: "remote"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST: "unoserver2"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_PORT: "2003"
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST_LOCATION: "remote"
    ```
  </TabItem>
</Tabs>

To add more endpoints, add additional entries to the `unoServerEndpoints` list in settings.yml, or for environment variables, increment the index number (e.g. `_0_` for the first, `_1_` for the second, `_2_` for the third, and so on).

:::tip
Set `libreOfficeSessionLimit` to match your endpoint count so the pool uses all of them concurrently. With 3 endpoints and a session limit of 1, you'll only ever use one at a time.
:::

#### Endpoint Configuration

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

:::caution Alpha release
The `stirling-unoserver` image is currently in **alpha**. Only the `:alpha` tag is published today; `:latest` and versioned tags (`:1.0.0`, `:1.0.1`, …) will follow once we cut the first stable release. The compose examples on this page reference `:latest` for forward-compatibility — for now, substitute `:alpha` until the stable release is announced. Configuration variables and behaviour are not expected to change between alpha and 1.0.
:::

| Tag | Status | Use |
|---|---|---|
| `:alpha` | **Available now** | All deployments while the image is in alpha |
| `:latest` | Coming soon | Production once 1.0 ships |
| `:1.0.0`, `:1.0.1`, … | Coming soon | Pinned version once 1.0 ships |

The image will be versioned independently from Stirling PDF — pin a version and update it on its own cadence. Compatibility breaks are called out in release notes.

### Configuration

| Variable | Default | Purpose |
|---|---|---|
| `UNOSERVER_PORT` | `2003` | Listen port. |
| `UNOSERVER_INTERFACE` | `0.0.0.0` | Listen address; use `127.0.0.1` to restrict to the same host. |
| `UNOSERVER_CONVERSION_TIMEOUT` | `1800` (s) | Max time per conversion. Set ≥ `libreOfficeTimeoutMinutes`. |
| `UNOSERVER_RECYCLE_INTERVAL_SECONDS` | `0` (off) | Periodic restart to bound LibreOffice memory growth. Minimum 60 s; e.g. `3600` for hourly. |

### CPU allocation and pinning

You do **not** need to pin unoserver containers to specific CPU cores. The Linux scheduler distributes processes across cores automatically, and an idle unoserver consumes effectively no CPU — so running four containers on a four-core host doesn't mean four hot processes competing for cores, it means one hot process per concurrent conversion with the rest idle. The "one worker per two cores" sizing rule already builds in the scheduling headroom LibreOffice needs for its helper threads (font cache, image decode, etc.), which is why pinning isn't part of the default setup.

That said, if you observe uneven core utilisation, share the host with another CPU-heavy workload, or want a hard upper bound per worker, you have two options:

**Soft cap (recommended).** Limit each container to a CPU budget without choosing which cores it uses. The kernel still picks the best core at any moment, but the worker can never burst beyond the budget you set. Use this when you want predictable resource accounting without sacrificing scheduling elasticity.

```yaml
services:
  unoserver1:
    image: ghcr.io/stirling-tools/stirling-unoserver:alpha
    deploy:
      resources:
        limits:
          cpus: "2.0"      # may use up to 2 cores worth of CPU time
          memory: 1g
```

For `docker run`: `--cpus="2.0"`.

**Hard pinning.** Bind each container to specific cores. Use this only when you need NUMA locality (multi-socket hosts), strict isolation from noisy neighbours, or you've benchmarked unpinned and found a real problem. The cost is lost elasticity — pinned cores sit idle when their worker isn't busy, even if another worker could use them.

```yaml
services:
  unoserver1:
    image: ghcr.io/stirling-tools/stirling-unoserver:alpha
    cpuset: "0,1"          # bound to cores 0 and 1 only

  unoserver2:
    image: ghcr.io/stirling-tools/stirling-unoserver:alpha
    cpuset: "2,3"          # bound to cores 2 and 3 only
```

For `docker run`: `--cpuset-cpus="0,1"`. Inspect core numbering with `lscpu --extended` first — on hyperthreaded hosts you usually want to pair sibling threads (e.g. `0,4` on an 8-thread / 4-core box) rather than two siblings on the same physical core.

For systemd-managed unoservers outside Docker, the equivalent is `CPUAffinity=0 1` in the service unit.

:::tip
Start without pinning. Add a soft `cpus:` limit only if you need resource accounting. Reach for `cpuset:` only after benchmarking shows the kernel scheduler is the bottleneck — for most single-host deployments that never happens.
:::

### CJK fonts

The default image covers European languages with hyphenation for EN/FR/DE/ES/IT/PT/NL/PL/RU. For Chinese/Japanese/Korean, rebuild with `--build-arg INSTALL_CJK_FONTS=true` (~120 MB extra).

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
- **CPU** - each active conversion saturates roughly one CPU core (LibreOffice is single-threaded per document). Start with one worker per two cores; the kernel handles core distribution automatically — see [CPU allocation and pinning](#cpu-allocation-and-pinning) if you want to bound or pin workers explicitly.

---

## Related

- [Process Limits](./Process-Limits.md) - Configure session limits and timeouts for all external tools
- [Production Deployment Guide](../Server-Admin-Onboarding.md) - Sizing recommendations for different workloads
- [Diagnostics](./Diagnostics.md) - Collect system and application diagnostics for troubleshooting
