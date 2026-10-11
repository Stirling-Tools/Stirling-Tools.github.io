---
title: Processor server settings
sidebar_label: Processor settings
sidebar_position: 2
description: Every server-side Processor setting on a self-hosted server - access, allowed folders, private network targets, webhooks and the credential key.
---

# Processor server settings

<Badge>Login required</Badge>

Server settings that control [Processor](../../Processor/Processor.md) on a self-hosted server. Only admins can change them.

Settings marked * aren't in `settings.yml`; set them as environment variables or in `custom_settings.yml` ([Extra settings](../Customisation/Extra-Settings.md)). Restart after any change.

## Who can open Processor

Admins always have access. Who else gets it depends on `security.portal.defaultAccess`* (env `SECURITY_PORTAL_DEFAULTACCESS`):

| Value | Who else can open Processor |
|---|---|
| `ADMINS_AND_TEAM_LEADS` (default) | Team leaders |
| `ORG_ALL` | Every signed-in user |
| `EXPLICIT_ONLY` | Only people and teams you grant access |

To grant access on top of the default, open **Settings → Workspace → Users** and select **+ Processor** on a person, or **Grant Processor to team** on a team.

## Allow server folders

Folder sources and folder outputs can only use directories under the allowed folder roots. The list is empty by default, which turns them off. Stirling PDF's own file storage and pipeline watched folders are always allowed, and its config directory never is. [Processing folders](../../Tools/Workspace/Processing-Folders.md) set up in the app use server file storage instead ([File storage and sharing](../Storage/File-Storage.md)).

1. Mount or create separate input and output directories.
2. Give the Stirling PDF process read access to the input and write access to the output, plus delete access on the input if the source deletes originals (the default).
3. Add the parent directory under **Settings → Server → System → Folder Access → Allowed folder roots**, or set `policies.allowedFolderRoots`.
4. Restart Stirling PDF.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    policies:
      allowedFolderRoots:
        - /data/processor
        - /mnt/scans
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    POLICIES_ALLOWEDFOLDERROOTS=/data/processor,/mnt/scans
    ```
  </TabItem>
</Tabs>

The environment variable replaces the list in `settings.yml`.

In Docker, mount a host directory at the allowed root, then enter paths such as `/data/processor/inbox` and `/data/processor/processed` in Processor:

```yaml
services:
  stirling-pdf:
    volumes:
      - ./processor:/data/processor
    environment:
      POLICIES_ALLOWEDFOLDERROOTS: /data/processor
```

:::warning
Every signed-in user can attach folder processing to directories under these roots through the API, which lists their contents and replaces files in place. Only allow directories all your users may touch.
:::

### Watch a network share

- **Mount it.** Mount the SMB or NFS share on the host, or as a Docker volume, under an allowed root such as `/data/processor/inbox`. Then use a [Folder source](../../Processor/Sources.md#folder) with the **Folder watch** trigger. New files on network mounts can wait up to `policies.watchReconcileSeconds` before they run.
- **Connect over SMB.** Use an **SMB / Network share** connection with a **Network drive** source ([SFTP, FTP and SMB](../../Processor/Sources.md#sftp-ftp-and-smb)). Nothing is mounted, but the source only runs on the **Manual only** or **Scheduled** trigger ([Inputs and triggers](../../Processor/Pipelines.md#inputs-and-triggers)). For a file server on your internal network, add its hostname to `POLICIES_ALLOWEDPRIVATENETWORKHOSTS` ([Private network targets](#private-network-targets)).

To mount an SMB share as a Docker volume, owned by the container user (UID and GID `1000` by default):

```yaml
services:
  stirling-pdf:
    volumes:
      - scans:/data/processor/inbox
volumes:
  scans:
    driver_opts:
      type: cifs
      device: //fileserver.example.com/scans
      o: username=scanner,password=change-me,uid=1000,gid=1000
```

## Private network targets

S3, SFTP, FTP, SMB, API and vector database connections cannot point at loopback, link-local or private addresses unless you allow it.

| Setting | Env | Default | Allows |
|---|---|---|---|
| `policies.allowPrivateS3Endpoints`* | `POLICIES_ALLOWPRIVATES3ENDPOINTS` | `false` | S3-compatible endpoints on internal addresses, such as a self-hosted MinIO. |
| `policies.allowedPrivateNetworkHosts`* | `POLICIES_ALLOWEDPRIVATENETWORKHOSTS` | empty | Named internal SFTP, FTP and SMB servers. Exact hostnames, separated by commas. |
| `policies.allowPrivateNetworkSources`* | `POLICIES_ALLOWPRIVATENETWORKSOURCES` | `false` | Every internal SFTP, FTP and SMB host. Prefer the named list above. |
| `policies.allowPrivateApiEndpoints`* | `POLICIES_ALLOWPRIVATEAPIENDPOINTS` | `false` | API and vector database connections on internal addresses. |
| `policies.allowCustomApiIntegrations`* | `POLICIES_ALLOWCUSTOMAPIINTEGRATIONS` | `true` | Admins creating **Custom API** connections. Turning it off stops new ones being created or edited; existing ones keep running until you disable them. |

For example, to allow one internal SFTP server:

```bash
POLICIES_ALLOWEDPRIVATENETWORKHOSTS=sftp.internal.example.com
```

## Webhooks and scheduling

| Setting | Env | Default | Purpose |
|---|---|---|---|
| `policies.webhookMaxBytes`* | `POLICIES_WEBHOOKMAXBYTES` | `104857600` (100 MiB) | Largest webhook body accepted. Larger deliveries get HTTP 413. |
| `policies.sweepConcurrency`* | `POLICIES_SWEEPCONCURRENCY` | `6` | How many runs from one sweep execute at once; the rest wait as pending. `0` means no limit. |
| `policies.scheduleSweepSeconds` | `POLICIES_SCHEDULESWEEPSECONDS` | `60` | How often scheduled pipelines are checked for being due. |
| `policies.watchReconcileSeconds` | `POLICIES_WATCHRECONCILESECONDS` | `300` | How often folder watches re-check for missed files, for example on network mounts. |

## Credential encryption key

Integration secrets and pipeline supporting files are encrypted at rest. On first start, a single server generates its key at `/configs/credential-encryption.key`. Back this file up with your deployment: losing it makes every stored secret unrecoverable.

To supply the key yourself, set `STIRLING_CREDENTIAL_ENCRYPTION_KEY` to a base64-encoded 256-bit key:

```bash
openssl rand -base64 32
```

To move an existing server to the variable, use the contents of `credential-encryption.key` as its value, or stored secrets will no longer decrypt.

On a [cluster](../Operations/Clustering.md), every node must have the same `STIRLING_CREDENTIAL_ENCRYPTION_KEY`. A node with `cluster.enabled: true` refuses to start without it.

## AI features

Ingestion and Classification need AI set up on the server ([AI on your server](../AI/AI.md)). Ingestion also needs DocParse (`docparse.enabled`, on by default). See [Ingestion](../../Processor/Policies/Ingestion.md) and [Classification](../../Processor/Policies/Classification.md) for what each one needs.

## Usage allowance

Without an Enterprise licence, Processor runs count against the server's monthly usage allowance. See [Connect to Stirling Cloud](../Licensing/Connect-to-Stirling-Cloud.md) for allowances and linking.
