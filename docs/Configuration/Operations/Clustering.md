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

- A Server or Enterprise license and an identical `stirling.security.credentialEncryptionKey` on every node. A node with `cluster.enabled: true` refuses to start without either; generate the key once with `openssl rand -base64 32`.
- Shared by every node: one [external database](../Storage/External%20Database.md), one Valkey (or Redis) endpoint, an S3-compatible object store for both transient job results and persistent uploads, and a load balancer with session affinity in front. Local disk for either store fails to start, and nothing checks that the database is really shared.
- A bucket lifecycle expiry rule on `cluster.s3.keyPrefix` (default `transient/`), set above `stirling.jobResultExpiryMinutes` (default `30`). Transient job results are never deleted for you.

## Settings

| Key | Env | Default | Purpose |
|---|---|---|---|
| `cluster.enabled` | `CLUSTER_ENABLED` | `false` | Master switch. |
| `cluster.backplane` | `CLUSTER_BACKPLANE` | `inprocess` | `valkey` for multi-node. Any other value stops the node starting. |
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
- `stirling_cluster_sticky_miss_total` counts cross-node 410s; a rising count means session affinity is not being honoured. Scraping it needs a Server or Enterprise license, as `/actuator/` paths otherwise return 404.

## Limits

- Job results stay on the node that produced them. Cross-node requests are refused with HTTP 410 and nothing retries them for you.
- Valkey must be a single endpoint - Sentinel and Redis Cluster are not supported - and an unreachable Valkey surfaces as HTTP 503 on job and file requests, not as a failed health check.
- Rate limits are per node. Node roles are advertised only, not enforced.
- Restarting a node marks every in-progress Processor document interrupted across the whole cluster. Plan restarts around Processor activity.

## Related Documentation

- **[External Database](../Storage/External%20Database.md)** - the shared database every node points at
- **[File Sharing and Storage](../Storage/File%20Sharing%20and%20Storage.md)** - the `storage.s3.*` settings cluster storage reuses
