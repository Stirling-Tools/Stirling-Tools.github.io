---
sidebar_position: 10
title: Integrations
description: Save external storage and service connections for sources and pipeline steps.
id: Integrations
---

# Integrations

Open **Processor → Integrations** (`/processor/integrations`) to manage saved connections. A connection stores the address and credentials for an external system. A source or pipeline step selects that connection and defines what to do with it.

![Storage integrations with connected and available services](/img/processor/integrations.png)

## Connect and reuse a service

1. Find the service in the catalogue and open its setup form.
2. Name the connection so its purpose is clear.
3. Enter the required fields, then save.
4. Select the saved connection when creating an S3/network source or adding the matching integration step.

The catalogue separates connected services, available connection types, and connectors that are not yet available. The **Works with** information helps distinguish a source connection from an outgoing operation. A saved credential record alone does not start a workflow.

For a connected RAG database, configure the database connection, then create a RAG database destination with its collection and provider-specific options. Select that destination in [Ingestion](./Ingestion.md). The database generates embeddings for the delivered chunks; this is separate from the embedding provider used by Stirling's built-in knowledge base.

## Storage connections

| Connection | Configure | Used by |
|---|---|---|
| **Amazon S3** | Bucket, region, access key ID, secret key; optional compatible endpoint | S3 inputs and destinations |
| **SFTP** | Host, port, username, password or private key; optional passphrase and host-key fingerprint | SFTP input |
| **FTP / FTPS** | Host, port, username, password, TLS mode, and connection options | FTP input |
| **SMB / network drive** | Host, share, account credentials, and any required domain | Network-drive input |

Give credentials only the permissions required by the workflow. **Delete the file** source mode needs delete permission as well as read access. Output destinations need write access.

S3 Object Lock requires a bucket configured to support it. If using the connection's advanced/API options, set `objectLockMode` (`GOVERNANCE` or `COMPLIANCE`) and `retentionDays` together.

## External API and vendor operations

For a supported vendor, prefer its operation preset: it supplies the expected method, body shape, and required operation fields. A custom API connection instead defines the base URL and authentication; the pipeline step supplies the path and request.

Supported custom authentication includes none, bearer token, Basic, a named header, and token-login configuration. Creating or editing custom API connections requires administrator permission and `policies.allowCustomApiIntegrations` (default `true`). Turning that setting off does not disable existing connections.

An external API step can keep the original document and record a response, or replace the document with the response. A configured boolean response condition can fail the step when the remote service rejects the file. Verify the response contract before putting another PDF tool after it.

Test calls can send documents to the configured service. Use a test endpoint while checking the integration.

## Microsoft Purview

A Purview connection requires a tenant ID. Applying and reading supported PDF label metadata do not require a Graph call. To populate the label picker from the tenant's label taxonomy, configure both the optional **Client ID** and **Client secret**; supplying only one is rejected.

Label metadata is not document encryption or a complete Microsoft Information Protection enforcement system. Choose the integration operation that matches the behavior you need.

## Unfinished connectors

Do not treat every visible catalogue tile as a working document operation. In particular, the current code contains a ConsignO connection type but does not implement its referenced submit/fetch controllers. Confirm a supported executable step before depending on it. Source connectors marked **Coming soon** cannot be used to ingest documents.

## Protect connection credentials

Secrets are encrypted at rest and masked when connections are read back. Retain masked values when editing a connection to keep its stored credentials.

Back up the credential-encryption key with the deployment. You can provide it explicitly with `STIRLING_CREDENTIAL_ENCRYPTION_KEY`; otherwise a single-node deployment can generate `credential-encryption.key`. Losing the key makes stored secrets unreadable. Cluster nodes require the same configured key.

Private endpoint access is controlled separately:

| Setting | Applies to |
|---|---|
| `policies.allowPrivateS3Endpoints` | Private S3-compatible endpoints |
| `policies.allowedPrivateNetworkHosts` / `policies.allowPrivateNetworkSources` | Internal SFTP, FTP, and SMB hosts |
| `policies.allowPrivateApiEndpoints` | Private API and related integration endpoints |

These broad allow switches default to `false`. See [Sources](./Sources.md) for setup and [Clustering](../Configuration/Operations/Clustering.md) for shared deployment requirements.
