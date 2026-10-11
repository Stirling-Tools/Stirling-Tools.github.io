---
sidebar_position: 2
title: File storage and sharing
sidebar_label: File storage & sharing
description: Let users keep files on your server and share them, choose local, database or S3 storage and set quotas.
---

# File storage and sharing

<Badge>Login required</Badge>

Let signed-in users keep files on the server in **My Files** and share them with each other. How users work with their files is in [My files and sharing](../../Tools/Workspace/Files-and-Sharing.md).

## File storage settings

File storage is on by default. To turn it off, clear **Enable Server File Storage** in **Settings → Server → System → File Storage & Sharing**, or set `storage.enabled: false`:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    storage:
      enabled: true
      provider: local        # local, database or s3
      local:
        basePath: ./storage  # folder for stored files (local provider)
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    STORAGE_ENABLED=true
    STORAGE_PROVIDER=local
    STORAGE_LOCAL_BASEPATH=./storage
    ```
  </TabItem>
</Tabs>

In Docker, mount the storage folder so files survive container updates:

```yaml
volumes:
  - ./stirling-data/storage:/storage
```

## Storage providers

| Provider | Plan | Where files go |
|---|---|---|
| `local` | Any | A folder on disk (`basePath`). Best for most servers and for large files. |
| `database` | Team or Enterprise | The server's [database](./Database.md). Keeps everything in one place, but uses more memory with large files. |
| `s3` | Team or Enterprise | Any S3-compatible object store. Use this for [clustered](../Operations/Clustering.md) servers. |

### S3-compatible storage

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    storage:
      enabled: true
      provider: s3
      s3:
        endpoint: ""                  # blank = AWS regional default; otherwise the full URL incl. https://
        bucket: my-bucket             # required
        region: us-east-1
        accessKey: ""                 # blank = AWS default credentials (env vars, profile or instance role)
        secretKey: ""
        pathStyleAccess: false        # true for MinIO and Supabase
        allowPrivateEndpoints: false  # true only for a trusted in-cluster store such as MinIO
        requestChecksumCalculation: WHEN_SUPPORTED   # WHEN_SUPPORTED, WHEN_REQUIRED or DISABLED
        responseChecksumValidation: WHEN_SUPPORTED   # WHEN_SUPPORTED, WHEN_REQUIRED or DISABLED
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    STORAGE_ENABLED=true
    STORAGE_PROVIDER=s3
    STORAGE_S3_ENDPOINT=""
    STORAGE_S3_BUCKET=my-bucket
    STORAGE_S3_REGION=us-east-1
    STORAGE_S3_ACCESSKEY=""
    STORAGE_S3_SECRETKEY=""
    STORAGE_S3_PATHSTYLEACCESS=false
    STORAGE_S3_ALLOWPRIVATEENDPOINTS=false
    STORAGE_S3_REQUESTCHECKSUMCALCULATION=WHEN_SUPPORTED
    STORAGE_S3_RESPONSECHECKSUMVALIDATION=WHEN_SUPPORTED
    ```
  </TabItem>
</Tabs>

- `allowPrivateEndpoints: false` makes the server refuse to start if `endpoint` resolves to a private, loopback or link-local address.
- Set `requestChecksumCalculation: WHEN_REQUIRED` if uploads fail with an unsupported `x-amz-checksum-*` header. Set `responseChecksumValidation: WHEN_REQUIRED` if downloads report false checksum mismatches.

| Provider | `endpoint` | `region` | `pathStyleAccess` | Notes |
|---|---|---|---|---|
| AWS S3 | blank | your region | `false` | |
| MinIO (in-cluster) | `http://minio:9000` | `us-east-1` | `true` | Also set `allowPrivateEndpoints: true`. |
| Cloudflare R2 | `https://<account>.r2.cloudflarestorage.com` | `auto` | `false` | If uploads fail with a checksum header error, set `requestChecksumCalculation: WHEN_REQUIRED`. |
| Supabase Storage | `https://<project>.supabase.co/storage/v1/s3` | your project region | `true` | |
| Backblaze B2 | `https://s3.<region>.backblazeb2.com` | your region | `false` | On B2 accounts older than July 2025, set `requestChecksumCalculation: WHEN_REQUIRED` if uploads fail. |
| DigitalOcean Spaces | `https://<region>.digitaloceanspaces.com` | your region | `false` | 5 GB limit per object. |

## Turn on sharing

Sharing needs storage. Use the toggles in **File Storage & Sharing**, or:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    storage:
      sharing:
        enabled: true            # Enable Sharing
        linkEnabled: true        # Enable Share Links, needs system.frontendUrl
        emailEnabled: false      # Enable Email Sharing, needs mail and share links
        linkExpirationDays: 3    # days before a share link expires

    system:
      frontendUrl: https://pdf.example.com   # used to build share links
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    STORAGE_SHARING_ENABLED=true
    STORAGE_SHARING_LINKENABLED=true
    STORAGE_SHARING_EMAILENABLED=false
    STORAGE_SHARING_LINKEXPIRATIONDAYS=3
    SYSTEM_FRONTENDURL=https://pdf.example.com
    ```
  </TabItem>
</Tabs>

- Share links still require the recipient to sign in. There is no anonymous access.
- Email sharing needs [email](../Security/Sign-in-and-Security.md#email-configuration) set up and share links turned on. Sharing with an email address that has no account sends that person a share link.
- Expired links and orphaned files are cleaned up once a day.

## Quotas

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    storage:
      quotas:
        maxStorageMbPerUser: -1   # per-user limit in MB
        maxStorageMbTotal: -1     # limit for the whole server in MB
        maxFileMb: -1             # largest single stored file in MB
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    STORAGE_QUOTAS_MAXSTORAGEMBPERUSER=-1
    STORAGE_QUOTAS_MAXSTORAGEMBTOTAL=-1
    STORAGE_QUOTAS_MAXFILEMB=-1
    ```
  </TabItem>
</Tabs>

`-1` means no limit. When a file is replaced, only the change in size counts.

## Troubleshooting

| Message | Fix |
|---|---|
| "Storage is disabled" | Set `storage.enabled: true` and check login is on. |
| "Share links are disabled" | Set `storage.sharing.linkEnabled: true` and `system.frontendUrl`. |
| "Email sharing is disabled" | Set `storage.sharing.emailEnabled: true` and set up email. |
| "Share links must be enabled for email sharing" | Turn on share links as well. |
| Share link returns 404 | The link has expired or was revoked. The owner needs to create a new one. |
| Upload rejected with 413 | A quota was reached. Raise the limit or delete files. |

To manage stored files with scripts, use the `/api/v1/storage` endpoints listed in your server's API reference ([REST API](../../Developers/API.md)).
