---
sidebar_position: 6
id: Clustering
title: Clustering
description: Run several Stirling PDF nodes behind a load balancer so the service keeps working when a node is lost
tags: [Clustering, Scaling, Valkey, High Availability]
---

# Clustering

Run more than one Stirling PDF node behind a load balancer. Single-node deployments leave `cluster.enabled` at `false`.

## Prerequisites

- A Team or Enterprise license and an identical `stirling.security.credentialEncryptionKey` on every node. Generate the key once with `openssl rand -base64 32`.
- Shared by every node: one [external database](../Storage/External%20Database.md), one Valkey (or Redis) endpoint, an S3-compatible store for job results, shared persistent storage, and a load balancer with session affinity. Use S3 or database storage for persistent uploads.
- A bucket lifecycle expiry rule on `cluster.s3.keyPrefix` (default `transient/`), set above `stirling.jobResultExpiryMinutes` (default `30`). The lifecycle rule removes expired job results.

## Settings

| Key | Env | Default | Purpose |
|---|---|---|---|
| `cluster.enabled` | `CLUSTER_ENABLED` | `false` | Master switch. |
| `cluster.backplane` | `CLUSTER_BACKPLANE` | `inprocess` | Set to `valkey` for multi-node deployments. |
| `cluster.artifactStore` | `CLUSTER_ARTIFACTSTORE` | `local` | Must be `s3` for multi-node. Reuses the `storage.s3.*` credentials and bucket. |
| `cluster.valkey.url` | `CLUSTER_VALKEY_URL` | empty | `redis://[user:password@]host[:port]`, or `rediss://` for TLS. Port defaults to `6379`; percent-encode `@ : / # ?` in the password. |
| `cluster.valkey.tls.skipCertVerification` | `CLUSTER_VALKEY_TLS_SKIPCERTVERIFICATION` | `false` | Skips Valkey TLS chain and hostname checks. Development only. |
| `cluster.node.internalAddress` | `CLUSTER_NODE_INTERNALADDRESS` | empty | `host:port` this node advertises. Falls back to `POD_IP`, then the hostname address, otherwise the node stops. |
| `stirling.security.credentialEncryptionKey`, `stirling.security.fileEncryptionKey` | `STIRLING_CREDENTIAL_ENCRYPTION_KEY`, `STIRLING_FILE_ENCRYPTION_KEY` | empty | Base64 AES-256 keys, identical on every node. The credential key is mandatory; the file key is mandatory when storage encryption at rest is in use. |
| `storage.provider`, `storage.s3.allowPrivateEndpoints` | `STORAGE_PROVIDER`, `STORAGE_S3_ALLOWPRIVATEENDPOINTS` | `local`, `false` | Provider must be `s3` or `database`. Set `allowPrivateEndpoints` to `true` for MinIO or another in-network endpoint. |

## Recommended configuration

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

## Health checks

- `GET /api/v1/info/status` - unauthenticated, returns `{"status": "UP"}`. Use it for container healthchecks and load balancer probes.
- `stirling_cluster_sticky_miss_total` counts cross-node 410s; a rising count means session affinity is not being honoured. Metrics require a Team or Enterprise license.

## Limits

- Use session affinity to send result requests to the node that ran the job. Requests to another node return HTTP 410.
- Use a single Valkey endpoint; Sentinel and Redis Cluster are unsupported. Monitor Valkey separately: connection failures return HTTP 503 on job and file requests while the application health check can remain healthy.
- Rate limits apply per node.
- Pause Processor work before restarting any node. A node restart interrupts in-progress Processor documents across the cluster.

## Related Documentation

- **[External Database](../Storage/External%20Database.md)** - the shared database every node points at
- **[File Sharing and Storage](../Storage/File%20Sharing%20and%20Storage.md)** - the `storage.s3.*` settings cluster storage reuses
