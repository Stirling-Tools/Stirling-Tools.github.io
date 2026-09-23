---
sidebar_position: 10
title: Integrations
description: Connect Stirling PDF to storage, security scanners, audit logs, notifications, and any HTTP API.
id: Integrations
---

# Integrations

Integrations connect Stirling PDF to other services: storage to read from and deliver to, virus and data scanners, audit logs, chat and email notifications, and any HTTP API. Save a connection once under **Processor → Integrations**, then use it in sources and pipelines.

![Storage integrations with connected and available services](/img/processor/integrations.png)

## Connect a service

1. Open **Processor → Integrations**, find the service, and select **Connect**.
2. Give the connection a name and enter its address and credentials.
3. Save. The connection is now ready to use, and the **Works with** column shows where.

## Use an integration in a pipeline

:::tip Add it as a step
In the [pipeline builder](./Pipelines.md), select **Add a tool** and look under **Send to another system**. Pick what you want to happen, such as **Scan for viruses** or **Post a message to Slack**. Then choose your saved connection under **Account** and fill in the step's fields. The step runs at that point in the pipeline, like any other tool.
:::

Storage services work differently: choose them when you [connect a source](./Sources.md), to read documents from them or deliver results to them.

Security steps can stop a run: if a scan finds a problem, the document is held back and appears in [Review](./Review.md). Notification, email, and audit steps leave the document unchanged.

## Available integrations

| Integration | Type | What it does |
|---|---|---|
| **Amazon S3** and S3-compatible storage | Storage | Input and destination for [sources](./Sources.md) |
| **SFTP** | Storage | Input for sources |
| **FTP / FTPS** | Storage | Input for sources |
| **SMB / network share** | Storage | Input for sources |
| **Vector database** (Weaviate, Pinecone) | Storage | Destination for [Ingestion](./Policies/Ingestion.md) chunks |
| **Nextcloud** | Storage | Upload the processed document to a folder |
| **Jira** | Storage | Attach the processed document to an issue |
| **Confluence** | Storage | Attach the processed document to a page |
| **Cloudmersive** | Security | Scan for viruses; the run stops if the file is not clean |
| **Cloudmersive Advanced Scan** | Security | Block documents that contain macros, executables, scripts, or embedded objects |
| **ClamAV** (self-hosted) | Security | Scan for viruses on your own server, so nothing leaves your network |
| **Presidio** (self-hosted) | Security | Detect personal data in the text you give it, on your own server |
| **Splunk** | Audit | Send an audit event for each document |
| **Elasticsearch** | Audit | Index an audit event for each document |
| **Sumo Logic** | Audit | Send an audit event to an HTTP collector |
| **SendGrid** | Notify | Email the processed document as an attachment |
| **Mailgun** | Notify | Email the processed document as an attachment |
| **Slack** | Notify | Post a message to a channel |
| **Microsoft Teams** | Notify | Post a message to a channel |
| **Discord** | Notify | Post a message to a channel |
| **Google Chat** | Notify | Post a message to a space |
| **Zapier & Make** | Notify | Trigger a Zap or Make scenario |
| **n8n** | Notify | Tell a workflow, send it the document, let it process the document, or ask it to approve the run |
| **Webhook** | Notify | Post the document, or just its details, to a URL you choose |
| **Custom API** | Advanced | Call any HTTP API; see [Custom API](#custom-api) |

Coming soon: SharePoint, OneDrive, Google Drive, Dropbox, Box, and email inboxes.

Messages and audit events can include details from the document and the run, such as `{{document.filename}}` and `{{run.policyName}}`. See [Placeholders](#placeholders).

## Custom API

Use **Custom API** to call a service that has no ready-made integration, such as an internal records system or a review queue.

1. Create a **Custom API** connection with the service's **Base URL** and **Authentication**: a bearer token, a username and password, a token in a custom header, logging in for a token, or none.
2. In the pipeline builder, select **Add a tool → Send to another system → Call a custom API**, and choose the connection under **Account**.
3. Enter the **Path** and **Method**. The path is added to the connection's base URL and can never reach another host.
4. Choose **How to send the document**: as a file upload (multipart), inside a JSON payload, or as raw file bytes.
5. Choose **What to do with the reply**: keep the document and record the reply, or replace the document with what comes back.

For example, a JSON body that sends the file with its name:

```json
{
  "name": "{{document.filename}}",
  "content": "{{document.base64}}"
}
```

Only administrators can create and edit **Custom API** connections. Test runs also call the service, so point new pipelines at a test environment first.

### Placeholders

Paths, headers, messages, and JSON bodies can include these values, filled in for each document:

| Placeholder | Value |
|---|---|
| `{{document.filename}}`, `{{document.extension}}` | File name and extension |
| `{{document.sizeBytes}}`, `{{document.pageCount}}` | File size in bytes and page count |
| `{{document.title}}`, `{{document.author}}` | PDF title and author |
| `{{document.sha256}}` | SHA-256 hash of the file |
| `{{document.base64}}` | The file itself, for JSON bodies |
| `{{run.policyName}}`, `{{run.runId}}`, `{{run.timestamp}}` | Pipeline name, run ID, and time of the run |

## Storage connection settings

| Connection | Required settings | Used by |
|---|---|---|
| **Amazon S3** | Bucket, region, access key ID, secret key; optional compatible endpoint | S3 inputs and destinations |
| **SFTP** | Host, port, username, password or private key; optional passphrase and host-key fingerprint | SFTP input |
| **FTP / FTPS** | Host, port, username, password, and TLS mode | FTP input |
| **SMB / network drive** | Host, share, credentials, and any required domain | Network-drive input |

Inputs need read permission, destinations need write permission, and **Delete the file** mode also needs delete permission.

For S3 Object Lock, use a bucket configured to support it and set both `objectLockMode` (`GOVERNANCE` or `COMPLIANCE`) and `retentionDays` in the connection options.

## RAG databases

Save the database connection, then create a RAG database destination with its collection and provider-specific options. Select that destination in [Ingestion](./Policies/Ingestion.md). The database generates embeddings for the chunks it receives.

## Administrator settings

Connection secrets are encrypted at rest. Back up the encryption key with your deployment. Set `STIRLING_CREDENTIAL_ENCRYPTION_KEY` to use a shared key across nodes; a single-node installation can use its generated `credential-encryption.key` file.

| Environment variable | Default | Purpose |
|---|---|---|
| `POLICIES_ALLOWPRIVATES3ENDPOINTS` | `false` | Allow S3-compatible endpoints on internal addresses. |
| `POLICIES_ALLOWEDPRIVATENETWORKHOSTS` | empty | Hostnames of internal SFTP, FTP, and SMB servers to allow, separated by commas. |
| `POLICIES_ALLOWPRIVATENETWORKSOURCES` | `false` | Allow every internal SFTP, FTP, and SMB host. |
| `POLICIES_ALLOWPRIVATEAPIENDPOINTS` | `false` | Allow API and vector database connections to internal addresses. |
| `POLICIES_ALLOWCUSTOMAPIINTEGRATIONS` | `true` | Allow administrators to create **Custom API** connections. Turning it off stops new ones being created or edited; existing ones keep working. |

Restart Stirling PDF after changing them.

For example, to allow an API gateway on your internal network:

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variables">
    ```bash
    POLICIES_ALLOWPRIVATEAPIENDPOINTS=true
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          POLICIES_ALLOWPRIVATEAPIENDPOINTS: "true"
    ```
  </TabItem>
</Tabs>

See [Sources](./Sources.md#administrator-settings) for folder and webhook settings, and [Clustering](../Configuration/Operations/Clustering.md) for shared deployment configuration.
