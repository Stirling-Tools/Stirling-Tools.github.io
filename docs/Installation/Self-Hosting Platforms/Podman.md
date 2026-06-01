---
sidebar_position: 5
id: Podman Install
title: Podman & Quadlets
description: Run Stirling PDF rootless with Podman, with a systemd Quadlet example
---

# Stirling PDF with Podman

Podman runs the same OCI image as Docker. The differences come up when you go rootless (recommended) or use Quadlets to manage the container via systemd. This page covers both.

## Quick start (rootless Podman)

```bash
podman run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v $HOME/stirling-pdf/configs:/configs:Z \
  -v $HOME/stirling-pdf/logs:/logs:Z \
  -v $HOME/stirling-pdf/customFiles:/customFiles:Z \
  -v $HOME/stirling-pdf/pipeline:/pipeline:Z \
  -v $HOME/stirling-pdf/tessdata:/usr/share/tessdata:Z \
  -e SECURITY_ENABLELOGIN=false \
  --userns=keep-id:uid=1000,gid=1000 \
  docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
```

The `:Z` SELinux label is required on Fedora/RHEL/CentOS Stream so the container can write to the bind-mounted directories. Drop the `:Z` if you're on a distro without SELinux enforcement.

`--userns=keep-id:uid=1000,gid=1000` maps your unprivileged user to the container's UID 1000 - this means the bind-mount permissions just work without setting `PUID`/`PGID`.

:::note `PUID`/`PGID` doesn't work under rootless Podman with `keep-id`
The container's PUID/PGID remap only runs when the container starts as root (which then drops to the runtime user). Rootless Podman with `--userns=keep-id` runs as your user from the start, so the remap is skipped. Use `--userns=keep-id:uid=...,gid=...` to point at the right UID directly, as above.
:::

## Quadlet (systemd-managed)

Quadlets are the modern Podman way to run containers under systemd. The unit file goes in `~/.config/containers/systemd/` (rootless) or `/etc/containers/systemd/` (rootful).

Create `~/.config/containers/systemd/stirling-pdf.container`:

```ini
[Unit]
Description=Stirling PDF
After=network-online.target
Wants=network-online.target

[Container]
ContainerName=stirling-pdf
Image=docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
PublishPort=8080:8080

Volume=%h/stirling-pdf/configs:/configs:Z
Volume=%h/stirling-pdf/logs:/logs:Z
Volume=%h/stirling-pdf/customFiles:/customFiles:Z
Volume=%h/stirling-pdf/pipeline:/pipeline:Z
Volume=%h/stirling-pdf/tessdata:/usr/share/tessdata:Z

Environment=SECURITY_ENABLELOGIN=false
Environment=LANGS=en_GB

UserNS=keep-id:uid=1000,gid=1000
AutoUpdate=registry

HealthCmd=curl -fs http://localhost:8080/api/v1/info/status
HealthInterval=30s
HealthTimeout=15s
HealthStartPeriod=120s
HealthRetries=5

[Service]
Restart=always

[Install]
WantedBy=default.target
```

Notes:
- `%h` expands to `$HOME`.
- `AutoUpdate=registry` enables `podman auto-update` to pull the newest `latest` and restart.
- Drop the `:Z` suffix on non-SELinux distros.

Then reload systemd and start:

```bash
mkdir -p ~/stirling-pdf/{configs,logs,customFiles,pipeline,tessdata}
systemctl --user daemon-reload
systemctl --user start stirling-pdf
systemctl --user enable --now podman-auto-update.timer  # optional auto-updates
```

For rootful Quadlets, drop the `--user` flag and put the file under `/etc/containers/systemd/`.

## Verify

```bash
curl -fs http://localhost:8080/api/v1/info/status
# expected response body contains: UP
```

Open `http://localhost:8080` in a browser.

## Linger (so it stays up after logout)

For rootless Quadlets on a headless server, enable systemd "linger" so user services keep running when you log out:

```bash
sudo loginctl enable-linger $USER
```

## Backups

Back up `~/stirling-pdf/configs` (or wherever you mounted `/configs`). That folder contains settings and the embedded H2 database.

## Auto-updates

```bash
podman auto-update          # one-off check
systemctl --user enable --now podman-auto-update.timer  # automated
```

The Quadlet line `AutoUpdate=registry` is what marks the container as eligible. Without that label, auto-update skips it.

## Uninstalling

```bash
systemctl --user disable --now stirling-pdf
rm ~/.config/containers/systemd/stirling-pdf.container
systemctl --user daemon-reload
podman image rm docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
rm -rf ~/stirling-pdf
```

## Troubleshooting

- **"permission denied" writing to bind mounts on Fedora/RHEL**: you forgot `:Z` on the volume flags. Without it, SELinux blocks the container's reads/writes to the host directory (the default mount label is incompatible with `container_file_t`).
- **Image won't pull on rootless without `sudo`**: registries.conf needs `unqualified-search-registries` set, or use the full `docker.stirlingpdf.com/...` reference.
- **Container starts as wrong UID**: confirm `--userns=keep-id:uid=1000,gid=1000`. Without it, rootless maps your user to a random UID inside the container, which mismatches the baked-in `stirlingpdfuser`.
- **Healthcheck always failing**: the container's `curl` is from a minimal image. If you bake your own variant without curl, replace the `HealthCmd` with a `wget`/`busybox-httpd` equivalent.
- **`podman auto-update` doesn't refresh**: make sure the `AutoUpdate=registry` line is in the Quadlet `[Container]` block, and that the timer is enabled with `systemctl --user enable --now podman-auto-update.timer`.

## Reference: every supported env var

The same env vars work as with Docker. See the [Docker Install Guide](../Docker%20Install.md) for the common set, and [Configuration](../../Configuration/Configuration.md) for the full list.
