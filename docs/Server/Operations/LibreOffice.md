---
sidebar_position: 3
title: LibreOffice parallel processing
sidebar_label: LibreOffice
description: Run several LibreOffice workers, locally or in separate containers, so a self-hosted server converts office documents in parallel.
---

# LibreOffice parallel processing

Office conversions (Word, Excel, PowerPoint and similar, to and from PDF) run through LibreOffice, and each conversion uses one CPU core. By default only one runs at a time. To convert several documents at once, run more LibreOffice workers.

## Local workers

Stirling PDF starts its own pool of workers. Set the pool size with `libreOfficeSessionLimit`:

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
    PROCESSEXECUTOR_AUTOUNOSERVER=true
    PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESESSIONLIMIT=4
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          PROCESSEXECUTOR_AUTOUNOSERVER: "true"
          PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESESSIONLIMIT: 4
    ```
  </TabItem>
</Tabs>

Start with one worker per two CPU cores. Each extra worker adds about 50 MB of memory while idle, and more while converting.

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
    PROCESSEXECUTOR_AUTOUNOSERVER=false
    PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESESSIONLIMIT=2
    PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_HOST=unoserver1
    PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_PORT=2003
    PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_HOSTLOCATION=remote
    PROCESSEXECUTOR_UNOSERVERENDPOINTS_1_HOST=unoserver2
    PROCESSEXECUTOR_UNOSERVERENDPOINTS_1_PORT=2003
    PROCESSEXECUTOR_UNOSERVERENDPOINTS_1_HOSTLOCATION=remote
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          PROCESSEXECUTOR_AUTOUNOSERVER: "false"
          PROCESSEXECUTOR_SESSIONLIMIT_LIBREOFFICESESSIONLIMIT: 2
          PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_HOST: unoserver1
          PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_PORT: 2003
          PROCESSEXECUTOR_UNOSERVERENDPOINTS_0_HOSTLOCATION: remote
          PROCESSEXECUTOR_UNOSERVERENDPOINTS_1_HOST: unoserver2
          PROCESSEXECUTOR_UNOSERVERENDPOINTS_1_PORT: 2003
          PROCESSEXECUTOR_UNOSERVERENDPOINTS_1_HOSTLOCATION: remote
    ```
  </TabItem>
</Tabs>

Set `libreOfficeSessionLimit` to the number of workers, or some will sit idle.

### Worker settings

| Field | Default | Purpose |
|---|---|---|
| `host` | `127.0.0.1` | Docker service name, hostname or IP address. |
| `port` | `2003` | Worker port. |
| `hostLocation` | `auto` | `remote` sends files over the network; `local` passes file paths and only works when the worker shares the filesystem. Use `remote` for separate containers, even on the same machine. |
| `protocol` | `http` | `http` or `https`. |

### The stirling-unoserver image

Use `latest`, or pin a version such as `1.0.1`.

| Variable | Default | Purpose |
|---|---|---|
| `UNOSERVER_PORT` | `2003` | Listen port. |
| `UNOSERVER_INTERFACE` | `0.0.0.0` | Listen address. `127.0.0.1` restricts it to the same host. |
| `UNOSERVER_CONVERSION_TIMEOUT` | `1800` | Longest conversion, in seconds. Keep it in line with `libreOfficetimeoutMinutes` (30 minutes by default). |
| `UNOSERVER_RECYCLE_INTERVAL_SECONDS` | `0` (off) | Restart LibreOffice on a schedule to limit memory growth, for example `3600` for hourly. Minimum 60. |
| `UNOSERVER_UNO_PORT` | `2002` | Internal LibreOffice port. |
| `UNOSERVER_IDLE_TIMEOUT_SECONDS` | `0` (off) | Stop the worker after this many idle seconds. Keep it at `0` for remote workers, because nothing can start them again. |

The image includes hyphenation for common European languages. For Chinese, Japanese and Korean documents, build it with `--build-arg INSTALL_CJK_FONTS=true` (about 120 MB larger).

To cap a worker's CPU and memory, use normal Docker limits such as `cpus: "2.0"` and `memory: 1g`.

## Workers without Docker

On a bare-metal server, start extra workers with the `unoserver` Python package, giving each its own ports:

```bash
pip install unoserver
unoserver --port 2003 --uno-port 2103 &
unoserver --port 2004 --uno-port 2104 &
```

Then list them as endpoints on `127.0.0.1` with `hostLocation: local`.

Conversion timeouts are set with the other [process limits](./Process-Limits.md).
