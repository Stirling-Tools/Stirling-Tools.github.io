---
sidebar_position: 3
title: Sources
description: Connect document inputs and choose how originals are handled after processing.
id: Sources
---

# Sources

A source is a saved location that pipelines read documents from or deliver them to. Some sources are inputs, some are destinations, and some can be both. Manage them at **Processor → Sources**.

![Sources list with status, document counts, and pipeline references](/img/processor/sources.png)

## Connect a source

Select **Connect source**, choose a type, enter its name and settings, then select **Create source**. Click an existing row to edit it. The built-in **Editor** source is always present and cannot be edited or deleted.

| Type | Input | Destination |
|---|---|---|
| **Editor** | Files uploaded or exported in the editor | The modified document, back in the editor |
| **Folder** | Yes, on self-hosted deployments | Yes, on self-hosted deployments |
| **Amazon S3** | Yes | Yes |
| **SFTP** | Yes | Coming soon |
| **FTP** | Yes | Coming soon |
| **Network drive (SMB)** | Yes | Coming soon |
| **Webhook** | Yes | No |
| **RAG database** | No | Yes, for [Ingestion](./Policies/Ingestion.md) |

## Editor

The **Editor** source runs a pipeline on the files people work on in the Stirling PDF editor. It runs automatically for everyone in the pipeline's team, at one of two moments:

| Trigger | When it runs | What people get |
|---|---|---|
| **Every upload** | As soon as a file is uploaded or opened in the editor | The processed file replaces the original in the editor. |
| **Every export** | Just before a file leaves the editor, when someone downloads or prints it | The download is the processed file. When printing, the file is updated first; review it, then print again. |

While a pipeline runs, the file shows a progress badge. An export pipeline does not run again on a later download unless the file has been edited since, so repeated downloads do not stack watermarks.

A pipeline only runs on files its first step can accept. For most tools that means PDFs; other files pass through unchanged. An editor pipeline can also send its results to a destination, such as a folder or S3 bucket, and leave the editor file as it is.

If an ordinary pipeline fails, people see a warning and the file carries on unprocessed. To stop a file that fails instead, [enforce the pipeline as a policy](./Pipelines.md#enforce-as-policy).

People can see which pipelines run on their files in the **PDF Processor** panel on the right of the editor.

## Decide what happens to originals

Folder, S3, and network inputs have an **After processing** setting under **Advanced**.

| Option | What happens |
|---|---|
| **Delete the file** (default) | Removes the original once every pipeline using it has processed and delivered it. Files that fail are kept. |
| **Keep it, and only process it again if it changes** | Leaves the original in place and processes each version once. |
| **Keep it, and process it again every scan** | Leaves the original in place and processes it again on every run. |

## Folder

Enter a path on your server, such as `/data/processor/inbox`. An administrator must [allow the folder](./Setup-and-Access.md#allow-server-folders) first. **Folder depth** selects the top level or subfolders. **Change detection** controls how changed versions are recognized.

Hidden files, symlinked folders, and files still being written are skipped. Keep destinations outside the input folder.

## S3

Select a saved **S3 connection** and a **Key prefix**. The prefix can be empty and includes matching keys at any depth. When used as a destination, output is written beneath that prefix. An existing file is never overwritten; the new file gets a different name.

To use an S3-compatible endpoint on your internal network, such as a self-hosted MinIO, an administrator must allow it:

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variables">
    ```bash
    POLICIES_ALLOWPRIVATES3ENDPOINTS=true
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          POLICIES_ALLOWPRIVATES3ENDPOINTS: "true"
    ```
  </TabItem>
</Tabs>

## SFTP, FTP, and SMB

Select an [integration](./Integrations.md) using the matching protocol, then choose the remote folder and depth. A blank folder uses the account's home directory; SMB paths are relative to the configured share.

SFTP verifies host keys. Enter the expected host-key fingerprint where possible, and check a changed key before updating the connection.

To connect to a server on your internal network, an administrator must allow its hostname:

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variables">
    ```bash
    POLICIES_ALLOWEDPRIVATENETWORKHOSTS=sftp.internal.example.com
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          POLICIES_ALLOWEDPRIVATENETWORKHOSTS: sftp.internal.example.com
    ```
  </TabItem>
</Tabs>

Separate several hostnames with commas. To allow every internal host instead, set `POLICIES_ALLOWPRIVATENETWORKSOURCES=true`.

## Webhooks

A webhook source creates a delivery URL and signing secret. Copy the secret when it is shown; treat it like a password. Bind the source to an enabled pipeline with a **Webhook** trigger before sending production files.

Send the raw file as the request body to `POST /api/v1/webhooks/<webhookId>` with these headers:

| Header | Value |
|---|---|
| `X-Stirling-Signature` | `sha256=` followed by the HMAC-SHA256 hex digest of the exact body, using the signing secret as the key |
| `X-Stirling-Filename` | Optional filename; defaults to `document.pdf` |
| `Content-Length` | Size of the body in bytes; required |

To test a webhook from a terminal:

```bash
SECRET='your-signing-secret'
SIG=$(openssl dgst -sha256 -hmac "$SECRET" invoice.pdf | awk '{print $NF}')
curl -X POST "https://pdf.example.com/api/v1/webhooks/<webhookId>" \
  -H "Content-Type: application/pdf" \
  -H "X-Stirling-Filename: invoice.pdf" \
  -H "X-Stirling-Signature: sha256=$SIG" \
  --data-binary @invoice.pdf
```

An accepted delivery returns **202**. That confirms receipt, not that the pipeline finished. A missing length returns **411**, an oversized body **413**, and an invalid signature **401**. Check [Documents](./Documents.md) and [Review](./Review.md) for what happened next.

## RAG databases

A RAG database source sends the searchable chunks an [Ingestion](./Policies/Ingestion.md) pipeline prepares to your own vector database. Choose a saved database [integration](./Integrations.md#rag-databases) and its collection, then select this source as the Ingestion destination.

## Delete or disable a source

A source cannot be deleted while a pipeline references it; change or remove those bindings first. Disabling a source affects the workflows that depend on it.

## Administrator settings

| Environment variable | Default | Purpose |
|---|---|---|
| `POLICIES_ALLOWEDFOLDERROOTS` | empty | Server directories that folder inputs and outputs may use, separated by commas. See [Allow server folders](./Setup-and-Access.md#allow-server-folders). |
| `POLICIES_ALLOWEDPRIVATENETWORKHOSTS` | empty | Hostnames of internal SFTP, FTP, and SMB servers to allow, separated by commas. |
| `POLICIES_ALLOWPRIVATENETWORKSOURCES` | `false` | Allow every internal SFTP, FTP, and SMB host. |
| `POLICIES_ALLOWPRIVATES3ENDPOINTS` | `false` | Allow S3-compatible endpoints on internal addresses. |
| `POLICIES_WEBHOOKMAXBYTES` | `104857600` | Largest accepted webhook body, 100 MiB. |
| `POLICIES_WATCHRECONCILESECONDS` | `300` | How often, in seconds, folder watchers check for changes they missed. |

Restart Stirling PDF after changing these settings. Folder roots and the folder watch interval can also be set in `settings.yml`, as `policies.allowedFolderRoots` and `policies.watchReconcileSeconds`.
