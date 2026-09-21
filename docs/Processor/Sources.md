---
sidebar_position: 1
id: Sources
title: Sources
description: Connect the folders, buckets, servers and webhooks the Processor reads documents from and writes results back to
tags: [Processor, Sources, Automation, Webhook, S3, Network, Self-host]
---

# Sources

A source is a saved storage location the Processor reads documents from, and can also be the destination a policy writes results to. Manage them at `/processor/sources`: click **Connect source**, pick a type, fill its fields, then **Create source**.

## Source types

| Type | Reads from | Usable as a destination |
|---|---|---|
| **Editor** | Documents processed inside the app. Built in, read-only. | No |
| **Folder** | A directory on the self-hosted Stirling PDF server | Yes |
| **Amazon S3** | A bucket or S3-compatible store | Yes |
| **SFTP** | An SFTP server | No |
| **FTP** | An FTP or FTPS server | No |
| **Network drive (SMB)** | A Windows or Samba share | No |
| **Webhook** | Documents pushed in over HTTP | No |

S3, SFTP, FTP and SMB sources need a stored connection holding the address and credentials, from [Integrations](./Integrations.md). Folder, S3 and network sources take a **Read mode**: **Consume** (default - each file is processed once, then removed after a successful run) or **Snapshot** (re-read every run, nothing deleted); either way a file is not read again unless it changes.

Only folder and S3 sources can be destinations, and a policy with no destination returns its results to the caller. Destinations never overwrite - an existing name becomes `name (1).ext` - and S3 output is written under the source's key prefix.

### Folder

- **Directory path** (required) - absolute, and must sit inside an [allowed folder root](#security-boundaries). **Folder depth** - top level only (default) or include subfolders.
- Hidden files and directories, symlinked directories and files still being written are skipped. A missing directory fails the run rather than reading as empty.

### Amazon S3

- **Connection** (required) - a stored S3 connection, contacted as you save. **Key prefix** (default empty) - lists every key under the prefix, at any depth.

### SFTP, FTP and network drive

- **Connection** (required) - its protocol must match the source type. **Folder** (default empty) - blank means the login home directory, for SMB it is relative to the share root, and `..` segments are rejected. **Folder depth** - top level only (default) or include subfolders.
- SFTP host keys are always verified, against the connection's fingerprint or against the key seen on the first connection. One sweep lists at most 10,000 files, descends at most 64 levels, and uses a 15 second connect and 60 second read timeout.

### Webhook

- No fields: the webhook id and signing secret are generated on save, and the secret is shown in the clear only once - copy it, or recreate the source for a new one. Bind a policy to the source before pointing a live sender at the URL, or accepted deliveries accumulate on disk.
- Deliver with `POST https://<your-stirling-host>/api/v1/webhooks/<webhookId>`, body the raw document bytes. The endpoint is public and the signature is its only authentication.
- `X-Stirling-Signature` (required) is `sha256=<lowercase hex>` HMAC-SHA256 of the raw body keyed with the signing secret, and `X-Stirling-Filename` (optional) defaults to `document.pdf`. `Content-Length` is required: missing is rejected with `411`, a declared length over `policies.webhookMaxBytes` with `413`, and an accepted delivery returns `202`.

## Security boundaries

- **Folder access is denied by default**: `policies.allowedFolderRoots` ships empty, folder sources and folder destinations must sit inside one of its absolute roots, and a change takes effect only after the application restarts. Set the roots in `settings.yml` or at **Admin Settings -> Folder Access**, pointing them at real directories rather than symlinks.
- `..` cannot climb out of an allowed root and `<base>/configs/` is always refused, while the local file-storage base path and the pipeline watched-folder directories are always permitted. Folder access is not available on Stirling Cloud.
- A remote host resolving to a private, loopback, link-local or multicast address is refused on save and on every run, unless `policies.allowPrivateNetworkSources` is `true` or the host is named in `policies.allowedPrivateNetworkHosts`. A private S3 endpoint needs `policies.allowPrivateS3Endpoints`.

## Settings

| Key | Env | Default | Purpose |
|---|---|---|---|
| `policies.allowedFolderRoots` | - | `[]` | Absolute directories folder sources and destinations may use. Requires a restart. |
| `policies.allowPrivateNetworkSources` | `POLICIES_ALLOWPRIVATENETWORKSOURCES` | `false` | Permit hosts resolving to private or local addresses. |
| `policies.allowedPrivateNetworkHosts` | - | `[]` | Individual hostnames exempt from that restriction. |
| `policies.allowPrivateS3Endpoints` | `POLICIES_ALLOWPRIVATES3ENDPOINTS` | `false` | Permit a custom S3 endpoint on a private address. |
| `policies.webhookMaxBytes` | `POLICIES_WEBHOOKMAXBYTES` | `104857600` | Maximum size of one webhook delivery. |

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    policies:
      allowedFolderRoots:
        - /data/stirling/inbox
      webhookMaxBytes: 104857600
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    POLICIES_WEBHOOKMAXBYTES=104857600
    ```
  </TabItem>
</Tabs>

## Related Documentation

- **[Policies](./Policies.md)** - the triggers that decide when a source is read
- **[Integrations](./Integrations.md)** - the stored S3 and network connections sources point at
- **[Pipelines](./Pipelines.md)** - the steps a document is put through
