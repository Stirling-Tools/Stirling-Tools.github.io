---
sidebar_position: 3
title: Sources
description: Connect document inputs and choose how originals are handled after processing.
id: Sources
---

# Sources

A source is a saved location used by a pipeline. Folder and S3 sources can supply input and receive output; RAG database sources are output-only destinations for prepared chunks. Manage them at **Processor → Sources** (`/processor/sources`).

![Sources list with status, document counts, and pipeline references](/img/processor/sources.png)

## Connect a source

Select **Connect source**, choose a type, enter its name and settings, then select **Create source**. Click an existing row to edit it. The built-in **Editor** source is always present and cannot be edited or deleted.

| Type | Input | Destination |
|---|---|---|
| **Editor** | Files uploaded or exported in the editor | Results return to the workspace |
| **Folder** | A server directory; optional subfolders | Yes, on self-hosted deployments |
| **Amazon S3** | Objects under a bucket prefix | Yes |
| **SFTP** | A directory on an SFTP server | No |
| **FTP** | A directory on FTP or FTPS | No |
| **Network drive** | An SMB share | No |
| **Webhook** | Documents delivered by signed HTTP POST | No |
| **RAG database** | No; output-only | Prepared document chunks from an Ingestion workflow |

## Decide what happens to originals

Folder, S3, and network inputs expose **After processing** under **Advanced**.

| Mode | What happens |
|---|---|
| **Delete the file** (`consume`, default) | Removes the original after all linked workflows successfully process and deliver it. Failed files are retained. |
| **Keep it, and only process it again if it changes** (`track`) | Leaves the original in place and processes a version once. Changed files can be picked up again. |
| **Keep it, and process it again every scan** (`snapshot`) | Keeps originals and reads them again on every run. Use when repeated processing is intentional. |

Choose tracked mode to preserve originals. Snapshot mode repeats processing and usage on every run.

To retry a failed tracked file, fix the cause and reset its processing history or submit a changed version.

## Folder

Enter an absolute path visible to the server. Configure [allowed folder roots](./Setup-and-Access.md#allow-server-folders) first. **Folder depth** selects the top level or subfolders. **Change detection** controls how changed versions are recognized.

Hidden entries, symlinked directories, and files still being written are skipped. Put outputs outside the input tree.

## S3

Select a saved **S3 connection** and a **Key prefix**. The prefix can be empty and includes matching keys at any depth. When used as a destination, output is written beneath that prefix. Existing output names are preserved by choosing a non-conflicting name.

An S3-compatible endpoint on a private address needs `policies.allowPrivateS3Endpoints: true` on a self-hosted server.

## SFTP, FTP, and SMB

Select an [integration](./Integrations.md) using the matching protocol, then choose the remote folder and depth. A blank folder uses the account's home directory; SMB paths are relative to the configured share.

SFTP verifies host keys. Configure the expected host-key fingerprint where possible, and verify a changed key before updating the connection. Internal network hosts must be allowed by the administrator.

## Webhooks

A webhook source creates a delivery URL and signing secret. Copy the secret when it is shown; treat it like a password. Bind the source to an enabled pipeline with a **Webhook** trigger before sending production files.

Send a raw file body to `POST /api/v1/webhooks/<webhookId>` with:

| Header | Value |
|---|---|
| `X-Stirling-Signature` | `sha256=` followed by the lowercase HMAC-SHA256 hex digest of the exact body, using the signing secret as the key |
| `X-Stirling-Filename` | Optional filename; defaults to `document.pdf` |
| `Content-Length` | Size of the raw body in bytes; required |

An accepted delivery returns **202**. That acknowledges receipt, not completion of the pipeline. A missing length returns **411**, an oversized declared body **413**, and an invalid signature **401**. Check [Documents](./Documents.md) and [Review](./Review.md) for what happened next.

## RAG database destinations

Select a saved database connection and configure its collection, plus any namespace or text-field options required by that provider. Use this source as the destination for **Connected RAG database** in [Ingestion](./Ingestion.md).

## Status and removal

- **Active:** enabled and referenced by automation.
- **Unused:** enabled but not referenced.
- **Disabled:** switched off.

The table shows document counts and referencing pipelines. A source cannot be deleted while a pipeline references it; change or remove those bindings first. Disabling a source affects the workflows that depend on it.

## Administrator settings

| `settings.yml` key | Default | Purpose |
|---|---|---|
| `policies.allowedFolderRoots` | `[]` | Additional server directories accessible to folder inputs and outputs; restart after changing. |
| `policies.allowedPrivateNetworkHosts` | `[]` | Exact hostnames allowed to resolve to internal addresses. |
| `policies.allowPrivateNetworkSources` | `false` | Allow internal SFTP, FTP, and SMB hosts more broadly. |
| `policies.allowPrivateS3Endpoints` | `false` | Allow private S3-compatible endpoints. |
| `policies.webhookMaxBytes` | `104857600` | Maximum accepted webhook body size, 100 MiB. |
| `policies.watchReconcileSeconds` | `300` | Safety-net reconciliation interval for folder watchers. |

Scalar environment variables include `POLICIES_ALLOWPRIVATENETWORKSOURCES`, `POLICIES_ALLOWPRIVATES3ENDPOINTS`, `POLICIES_WEBHOOKMAXBYTES`, and `POLICIES_WATCHRECONCILESECONDS`. Use `settings.yml` for the root and hostname lists.
