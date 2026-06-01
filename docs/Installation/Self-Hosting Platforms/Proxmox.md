---
sidebar_position: 6
id: Proxmox Install
title: Proxmox LXC
description: Run Stirling PDF inside a Proxmox LXC container with Docker
---

# Stirling PDF on Proxmox

Proxmox VE supports both full VMs and lightweight LXC containers. For Stirling PDF, the most efficient setup is a **Docker host inside an LXC container**: low overhead, fast snapshots, easy backups via Proxmox's built-in tools.

If you want a full VM instead, just create a Linux VM and follow the standard [Docker Install Guide](../Docker%20Install.md) - no Proxmox-specific notes needed.

## Recommended approach: Docker in LXC

Proxmox supports nested containerization. An LXC container running Docker uses far less RAM than a full VM with the same payload.

### Create the LXC

1. In the Proxmox web UI: **Datacenter → your node → Create CT**.
2. **General**:
   - Hostname: `stirling-pdf`
   - Unprivileged container: **Yes** (set "No" only if you specifically need privileged - it's not required for Stirling PDF).
3. **Template**: Debian 12 or Ubuntu 24.04 (any modern systemd-based distro works).
4. **Disks**: 16 GB root disk (more if you'll host lots of pipelines or OCR languages).
5. **CPU**: 2 cores minimum.
6. **Memory**: 2048 MB minimum (1024 MB for `latest-ultra-lite`, 4096 MB for `latest-fat`).
7. **Network**: DHCP or a static IP on your bridge.

### Enable nesting (required for Docker)

LXCs run Docker fine on Proxmox 7.2+ once you enable two features:

1. Stop the CT if it's running.
2. From the Proxmox shell:

```bash
pct set <ctid> -features nesting=1,keyctl=1
```

3. Start the CT.

Without `nesting=1`, Docker errors with `cannot find a writable cgroup` during `systemctl start docker`.

### Install Docker inside the CT

SSH or open the LXC console:

```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable --now docker
```

Adjust the URL if you're on Ubuntu (`https://download.docker.com/linux/ubuntu`).

### Run Stirling PDF

```bash
mkdir -p /opt/stirling-pdf/{configs,logs,customFiles,pipeline,tessdata}
cd /opt/stirling-pdf
cat > docker-compose.yml <<'EOF'
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    container_name: stirling-pdf
    ports:
      - "8080:8080"
    volumes:
      - ./configs:/configs
      - ./logs:/logs
      - ./customFiles:/customFiles
      - ./pipeline:/pipeline
      - ./tessdata:/usr/share/tessdata
    environment:
      SECURITY_ENABLELOGIN: "false"
      LANGS: "en_GB"
    restart: unless-stopped
EOF
docker compose up -d
```

## Verify

From inside the LXC or from another host on the same network:

```bash
curl -fs http://<ct-ip>:8080/api/v1/info/status
# expected response body contains: UP
```

## Backups

Proxmox's built-in **Backup** function handles the entire LXC, including the Docker volumes. From the Proxmox UI: **CT → Backup → Backup now** (or set a schedule under **Datacenter → Backup**).

This is the main advantage of running Docker in LXC on Proxmox: a single backup captures the container, the data, and the OS state in one snapshot.

For more granular backups, you can also archive `/opt/stirling-pdf/configs` separately.

## Resource limits

Set the LXC's RAM/CPU limits via Proxmox rather than via Docker. Stirling PDF's JVM auto-detects cgroups memory and sizes its heap accordingly, so giving the LXC 2 GB and setting no further limits works well.

## Reverse proxy

If you have a reverse proxy elsewhere on the network (Traefik, Caddy, Nginx Proxy Manager, pfSense HAProxy), point it at `http://<ct-ip>:8080`. Set `SYSTEM_ROOTURIPATH=/your-subpath` if serving from a sub-path.

## Alternative: full VM

If your Proxmox host lacks nesting support or you'd rather avoid LXC, create a VM (Debian 12 / Ubuntu 24.04 / etc.) and follow the [Docker Install Guide](../Docker%20Install.md). Trade-off: ~512 MB more RAM overhead per instance.

## Uninstalling

1. From inside the LXC: `cd /opt/stirling-pdf && docker compose down -v`.
2. To remove the LXC entirely: **Proxmox UI → CT → Stop → Destroy** (also removes the storage).
3. Or keep the LXC and just remove `/opt/stirling-pdf/` if you want to reuse it.

## Troubleshooting

- **Docker fails to start in LXC**: re-run `pct set <ctid> -features nesting=1,keyctl=1` and restart the CT. `nesting=1` is the critical flag.
- **OOM kills inside the LXC**: raise the LXC's memory limit, or switch to `:latest-ultra-lite` for a smaller footprint.
- **High disk I/O on container restart**: the JVM precompiles an AOT cache to `/configs/cache/`. Subsequent boots are faster - the first boot can be slow.
- **Outbound network blocked**: Stirling PDF doesn't need outbound network for normal operation, but it does need it to pull updates. Confirm the LXC has working DNS and outbound HTTP/HTTPS.
