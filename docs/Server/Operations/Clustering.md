---
sidebar_position: 5
title: Clustering
sidebar_label: Clustering
description: Run several Stirling PDF nodes behind a load balancer so the service keeps working when a node is lost.
---

# Clustering

Run more than one Stirling PDF node behind a load balancer.

## Prerequisites

- A Team or Enterprise licence.
- Shared by every node: one [external database](../Storage/Database.md), one Valkey (or Redis) server, an S3-compatible bucket for job results, and a load balancer with session affinity. Persistent uploads must use S3 or database [file storage](../Storage/File-Storage.md).
- Valkey running with `maxmemory-policy noeviction`. Any eviction policy can drop live locks and node registrations.
- The same secrets on every node:
  - `STIRLING_CREDENTIAL_ENCRYPTION_KEY`, a base64 256-bit key made once with `openssl rand -base64 32`. A clustered node refuses to start without it. See [Processor server settings](../Automation/Processor-Settings.md#credential-encryption-key).
  - `AUTOMATICALLYGENERATED_KEY` and `AUTOMATICALLYGENERATED_UUID`, copied from `AutomaticallyGenerated` in the first node's `settings.yml`. Otherwise nodes cannot read each other's data or agree on licence seat counts.
- A bucket lifecycle rule that expires objects under `cluster.s3.keyPrefix` (default `transient/`) after longer than `stirling.jobResultExpiryMinutes` (default `30`).

## Settings

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    cluster:
      enabled: true
      backplane: valkey
      artifactStore: s3
      valkey:
        url: "redis://valkey:6379"
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    CLUSTER_ENABLED=true
    CLUSTER_BACKPLANE=valkey
    CLUSTER_ARTIFACTSTORE=s3
    CLUSTER_VALKEY_URL=redis://valkey:6379
    ```
  </TabItem>
</Tabs>

| Setting | Env | Default | Purpose |
|---|---|---|---|
| `cluster.enabled` | `CLUSTER_ENABLED` | `false` | Turn clustering on. |
| `cluster.backplane` | `CLUSTER_BACKPLANE` | `inprocess` | Set to `valkey` for more than one node. |
| `cluster.artifactStore` | `CLUSTER_ARTIFACTSTORE` | `local` | Must be `s3` for more than one node. Uses the `storage.s3.*` bucket and credentials. |
| `cluster.valkey.mode` | `CLUSTER_VALKEY_MODE` | empty | `standalone`, `sentinel` or `cluster`. Empty works it out from which settings you filled in. |
| `cluster.valkey.url` | `CLUSTER_VALKEY_URL` | empty | Standalone only: `redis://[user:password@]host[:port]`, or `rediss://` for TLS. Percent-encode `@ : / # ?` in the password. |
| `cluster.valkey.sentinel.master`, `cluster.valkey.sentinel.nodes` | `CLUSTER_VALKEY_SENTINEL_MASTER`, `CLUSTER_VALKEY_SENTINEL_NODES` | empty | Sentinel mode: the monitored primary's name and the sentinels, such as `sentinel-1:26379`. |
| `cluster.valkey.nodes` | `CLUSTER_VALKEY_NODES` | empty | Valkey cluster mode: the cluster nodes, such as `valkey-1:6379`. |
| `cluster.valkey.tls.enabled` | `CLUSTER_VALKEY_TLS_ENABLED` | `false` | TLS for sentinel and cluster modes. |
| `cluster.valkey.tls.skipCertVerification` | `CLUSTER_VALKEY_TLS_SKIPCERTVERIFICATION` | `false` | Skip certificate checks. Development only. |
| `cluster.node.internalAddress` | `CLUSTER_NODE_INTERNALADDRESS` | empty | `host:port` other nodes use to reach this one. Falls back to `POD_IP`, then the hostname's address; the node stops if none works. |

A standalone Valkey is a single point of failure: no node starts while it is down. Use sentinel or cluster mode for high availability.

## Health checks

- `GET /actuator/health` needs no sign-in. It returns HTTP 503 with `"status": "DOWN"` when the node cannot reach Valkey, so use it for load balancer checks. It also reports `DOWN` if another dependency, such as the database, fails.
- `GET /api/v1/info/status` needs no sign-in and always returns `{"status": "UP"}` while the app is running. Use it as a simple liveness check.
- If Valkey is unreachable, job and file requests return HTTP 503.

## Limits

- Job results live on the node that ran the job. A request for them on another node returns HTTP 410, which is why session affinity is required.
- Per-user rate limits are counted once across the whole cluster, through Valkey.
- Pause Processor work before restarting a node. A restart interrupts documents that Processor is handling across the cluster.
