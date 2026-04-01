---
sidebar_position: 13
id: File-Sharing-Storage
title: File Sharing and Storage
description: Configure server-side file storage, sharing, and storage quotas
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# File Sharing and Storage

:::warning[Alpha Feature]
File Sharing and Storage is currently in **alpha**. Functionality may change, and some features are incomplete. Use in production at your own risk.
:::

Stirling PDF can store files on the server and let users share them with each other. Files can be shared directly with specific users or via shareable links. Admins can set storage quotas to control disk usage.

This is a **Pro/Enterprise** feature that requires authentication to be enabled.

---

## What You Can Do

- **Store files server-side** -- upload PDFs and other files that persist across sessions
- **Share with specific users** -- grant other registered users access to your files with configurable permissions
- **Share via link** -- generate a shareable link that any logged-in user with the link can access
- **Control access levels** -- assign Editor, Commenter, or Viewer roles to shared users
- **Set storage quotas** -- limit storage per user, per file, or system-wide
- **Audit access** -- see who accessed your shared links and when
- **Automatic cleanup** -- expired share links and orphaned files are cleaned up daily

---

## Prerequisites

- **Authentication must be enabled** (`security.enableLogin: true`)
- For share links: `system.frontendUrl` must be set to your instance URL
- For email notifications when sharing: `mail.enabled: true` with valid SMTP configuration

---

## Enabling File Storage

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    storage:
      enabled: true
      provider: local          # 'local' or 'database'
      local:
        basePath: './storage'  # Filesystem path (local provider only)
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    STORAGE_ENABLED=true
    STORAGE_PROVIDER=local
    STORAGE_LOCAL_BASEPATH=./storage
    ```
  </TabItem>
</Tabs>

### Storage Providers

| Provider | Config Value | Description | Best For |
|----------|-------------|-------------|----------|
| **Local Filesystem** | `local` | Files stored on disk under `basePath` | Most deployments, large files |
| **Database** | `database` | Files stored as BLOBs in the database | Simple setups where you want everything in one place |

:::tip
The **local** provider is recommended for most deployments. It handles large files well and keeps database size manageable. The **database** provider is convenient but uses more memory with large files.
:::

### Docker Volume Mount

When using the local provider with Docker, mount the storage directory so files persist across container restarts:

```yaml
volumes:
  - ./stirling-storage:/storage
```

---

## Enabling File Sharing

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    storage:
      enabled: true
      sharing:
        enabled: true            # Master switch for all sharing
        linkEnabled: true        # Enable shareable links
        emailEnabled: true       # Send email notifications when sharing
        linkExpirationDays: 3    # Days until share links expire
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    STORAGE_SHARING_ENABLED=true
    STORAGE_SHARING_LINKENABLED=true
    STORAGE_SHARING_EMAILENABLED=true
    STORAGE_SHARING_LINKEXPIRATIONDAYS=3
    ```
  </TabItem>
</Tabs>

### Feature Dependencies

| Feature | What It Needs |
|---------|---------------|
| File Storage | `security.enableLogin: true` |
| File Sharing | Storage enabled |
| Shareable Links | Sharing enabled + `system.frontendUrl` set |
| Email Notifications | Sharing enabled + `mail.enabled: true` |
| Shared Signing | Storage enabled + `storage.signing.enabled: true` |

---

## Storage Quotas

Control how much storage space is available.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    storage:
      quotas:
        maxStorageMbPerUser: -1   # Per-user cap in MB (-1 = unlimited)
        maxStorageMbTotal: -1     # Total system cap in MB (-1 = unlimited)
        maxFileMb: -1             # Max size per upload in MB (-1 = unlimited)
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    STORAGE_QUOTAS_MAXSTORAGEMBPERUSER=500
    STORAGE_QUOTAS_MAXSTORAGEMBTOTAL=10000
    STORAGE_QUOTAS_MAXFILEMB=100
    ```
  </TabItem>
</Tabs>

Quotas are checked before a file is stored. When replacing an existing file, only the size difference counts against the quota.

---

## Access Roles

When sharing a file, you choose what level of access to grant:

| Role | Can View/Download | Can Replace File | In Signing Workflows |
|------|-------------------|-----------------|---------------------|
| **Editor** | Yes | Yes | Can sign |
| **Commenter** | Yes | No | Can sign |
| **Viewer** | Yes | No | Read-only |

The file **owner** always has full access. The default role is **Editor**.

The difference between Commenter and Viewer only matters in [Shared Signing](../Functionality/Security/Shared-Signing.md) workflows -- both are read-only for regular file sharing.

---

## Sharing Files

### Share with a Specific User

From the file manager, select a file and share it with another user by their username or email address. You can choose the access role when sharing.

If you enter an email address for someone who doesn't have an account, the system will create a share link and email it to them (if email notifications are enabled).

### Share via Link

Generate a shareable link for any file you own. Anyone who is logged in and has the link can access the file. Links expire automatically based on your `linkExpirationDays` setting (default: 3 days).

You can revoke a share link at any time, which immediately removes access and deletes all access records for that link.

The share link URL follows the format:
```
https://your-stirling-instance.com/share/{token}
```

:::info
Share links require the recipient to be logged in. There is no anonymous or public access -- the link is an additional credential on top of authentication.
:::

### Access History

For any share link you've created, you can view who accessed it, whether they viewed or downloaded the file, and when.

---

## Security

- **All endpoints require authentication** -- there is no anonymous file access
- **Owner-only controls** -- only the file owner can update, delete, or manage sharing
- **Random tokens** -- share link tokens are cryptographically random UUIDs
- **Automatic expiration** -- expired links return an error and are cleaned up daily
- **Revocation** -- owners can revoke any share link immediately
- **Access auditing** -- every share link access is recorded with user, action type, and timestamp

---

## Known Limitations

- Share links require `system.frontendUrl` to be configured
- Share links require the user to be logged in -- there is no public/anonymous access
- The database storage provider uses more memory with large files (use the local provider for large deployments)

---

## Troubleshooting

### "Storage is disabled"
- Verify `storage.enabled: true` in your settings
- Verify `security.enableLogin: true`

### "Share links are disabled"
- Verify `storage.sharing.linkEnabled: true`
- Verify `system.frontendUrl` is set to your instance URL

### "Email sharing is disabled"
- Verify `storage.sharing.emailEnabled: true`
- Verify `mail.enabled: true` with valid SMTP settings

### Share link returns 410 Gone
- The link has expired. The file owner needs to create a new one.

### Quota exceeded (HTTP 403)
- Increase `maxStorageMbPerUser` or `maxStorageMbTotal`, or delete unused files to free up space

---

## API Reference

For users who want to integrate programmatically, the full API endpoints are listed below. See [API Documentation](../API.md) for details.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/storage/files` | Upload file |
| PUT | `/api/v1/storage/files/{id}` | Update file (owner only) |
| GET | `/api/v1/storage/files` | List accessible files |
| GET | `/api/v1/storage/files/{id}` | Get file metadata |
| GET | `/api/v1/storage/files/{id}/download` | Download file |
| DELETE | `/api/v1/storage/files/{id}` | Delete file (owner only) |
| POST | `/api/v1/storage/files/{id}/shares/users` | Share with user |
| DELETE | `/api/v1/storage/files/{id}/shares/users/{username}` | Revoke user share |
| DELETE | `/api/v1/storage/files/{id}/shares/self` | Leave shared file |
| POST | `/api/v1/storage/files/{id}/shares/links` | Create share link |
| DELETE | `/api/v1/storage/files/{id}/shares/links/{token}` | Revoke share link |
| GET | `/api/v1/storage/share-links/{token}` | Access via share link |
| GET | `/api/v1/storage/share-links/{token}/metadata` | Get share link info |
| GET | `/api/v1/storage/share-links/accessed` | List your accessed links |
| GET | `/api/v1/storage/files/{id}/shares/links/{token}/accesses` | Access history (owner only) |

---

## Related

- [Shared Signing](../Functionality/Security/Shared-Signing.md) -- Collaborative multi-participant document signing
- [Certificate Signing](../Functionality/Security/Certificate-Signing.md) -- Individual certificate signing
- [System and Security Settings](./System%20and%20Security.md) -- JWT, sessions, server certificates
