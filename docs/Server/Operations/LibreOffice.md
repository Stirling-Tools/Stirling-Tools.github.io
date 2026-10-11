---
sidebar_position: 3
title: LibreOffice parallel processing
sidebar_label: LibreOffice
description: Run several LibreOffice workers, locally or in separate containers, so a self-hosted server converts office documents in parallel.
---

# LibreOffice parallel processing

Office conversions (Word, Excel, PowerPoint and similar, to and from PDF) run through LibreOffice, and each conversion uses one CPU core. By default only one runs at a time. To convert several documents at once, run more LibreOffice workers.

## Local workers

In the Docker images, Stirling PDF starts its own workers on the first office conversion and stops them after 2 minutes idle. Change the idle time with `UNO_IDLE_TIMEOUT_SECONDS`, or set `UNO_DEMAND_ENABLED=false` to keep them running. Without Docker, start the workers yourself as shown in [Workers without Docker](#workers-without-docker).

Set the pool size with `libreOfficeSessionLimit`:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    processExecutor:
      autoUnoServer: true
      sessionLimit:
        libreOfficeSessionLimit: 4
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PROCESS_EXECUTOR_AUTO_UNO_SERVER=true
    PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT=4
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          PROCESS_EXECUTOR_AUTO_UNO_SERVER: "true"
          PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT: 4
    ```
  </TabItem>
</Tabs>

Start with one worker per two CPU cores. With `UNO_DEMAND_ENABLED=false`, each extra worker adds about 50 MB of memory while idle, and more while converting.

## Remote workers

To scale further, or to keep LibreOffice out of the main container, run workers as separate containers from `ghcr.io/stirling-tools/stirling-unoserver`. Each container is one worker listening on port `2003`.

Add the workers next to your `stirling-pdf` service:

```yaml
services:
  unoserver1:
    image: ghcr.io/stirling-tools/stirling-unoserver:latest
  unoserver2:
    image: ghcr.io/stirling-tools/stirling-unoserver:latest
```

Publish a port (for example `"2004:2003"`) only if Stirling PDF runs outside Docker, on another host or on another Docker network.

Then turn off the local pool, list the workers and restart Stirling PDF. As environment variables, number each worker from `0`:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    processExecutor:
      autoUnoServer: false
      sessionLimit:
        libreOfficeSessionLimit: 2
      unoServerEndpoints:
        - host: unoserver1
          port: 2003
          hostLocation: remote
        - host: unoserver2
          port: 2003
          hostLocation: remote
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PROCESS_EXECUTOR_AUTO_UNO_SERVER=false
    PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT=2
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST=unoserver1
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_PORT=2003
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST_LOCATION=remote
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST=unoserver2
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_PORT=2003
    PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST_LOCATION=remote
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          PROCESS_EXECUTOR_AUTO_UNO_SERVER: "false"
          PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT: 2
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST: unoserver1
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_PORT: 2003
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_0_HOST_LOCATION: remote
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST: unoserver2
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_PORT: 2003
          PROCESS_EXECUTOR_UNO_SERVER_ENDPOINTS_1_HOST_LOCATION: remote
    ```
  </TabItem>
</Tabs>

Every listed worker is used. Set `libreOfficeSessionLimit` to the number of workers to avoid a startup warning. It also caps conversions that fall back to running LibreOffice directly.

### Worker settings

| Field | Default | Purpose |
|---|---|---|
| `host` | `127.0.0.1` | Docker service name, hostname or IP address. |
| `port` | `2003` | Worker port. |
| `hostLocation` | `auto` | `remote` sends files over the network; `local` passes file paths and only works when the worker shares the filesystem. Use `remote` for separate containers, even on the same machine. |
| `protocol` | `http` | `http` or `https`. |

### The stirling-unoserver image

| Variable | Default | Purpose |
|---|---|---|
| `UNOSERVER_PORT` | `2003` | Listen port. |
| `UNOSERVER_INTERFACE` | `0.0.0.0` | Listen address. `127.0.0.1` restricts it to the same host. |
| `UNOSERVER_CONVERSION_TIMEOUT` | `1800` | Longest conversion, in seconds. Keep it in line with [`libreOfficetimeoutMinutes`](./Process-Limits.md#timeouts) (30 minutes by default). |
| `UNOSERVER_RECYCLE_INTERVAL_SECONDS` | `0` (off) | Restart LibreOffice on a schedule to limit memory growth, for example `3600` for hourly. Minimum 60. |
| `UNOSERVER_IDLE_TIMEOUT_SECONDS` | `0` (off) | Stop the worker after this many idle seconds. Keep it at `0` for remote workers, because nothing can start them again. |

For Chinese, Japanese and Korean documents, build the image with `--build-arg INSTALL_CJK_FONTS=true` (about 120 MB larger).

## Workers without Docker

On a bare-metal server, start extra workers with the `unoserver` Python package, giving each its own ports:

```bash
pip install unoserver
unoserver --port 2003 --uno-port 2103 &
unoserver --port 2004 --uno-port 2104 &
```

Then list them as endpoints on `127.0.0.1` with `hostLocation: local`.
