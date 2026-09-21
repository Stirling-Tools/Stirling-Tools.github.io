---
sidebar_position: 10
title: Integrations
description: Save external storage and service connections for sources and pipeline steps.
id: Integrations
---

# Integrations

Open **Processor → Integrations** to save connections to external storage and services. Sources and pipeline steps use these connections to access the service.

![Storage integrations with connected and available services](/img/processor/integrations.png)

## Connect a service

1. Find the service and select **Connect**.
2. Give the connection a name and enter its address and credentials.
3. Save, then select the connection in a source or pipeline step.

The **Works with** column shows where each connection can be used.

## Storage connections

| Connection | Required settings | Used by |
|---|---|---|
| **Amazon S3** | Bucket, region, access key ID, secret key; optional compatible endpoint | S3 inputs and destinations |
| **SFTP** | Host, port, username, password or private key; optional passphrase and host-key fingerprint | SFTP input |
| **FTP / FTPS** | Host, port, username, password, and TLS mode | FTP input |
| **SMB / network drive** | Host, share, credentials, and any required domain | Network-drive input |

Inputs need read permission, destinations need write permission, and **Delete the file** mode also needs delete permission.

For S3 Object Lock, use a bucket configured to support it and set both `objectLockMode` (`GOVERNANCE` or `COMPLIANCE`) and `retentionDays` in the connection options.

## RAG databases

Save the database connection, then create a RAG database destination with its collection and provider-specific options. Select that destination in [Ingestion](./Ingestion.md). The database generates embeddings for the chunks it receives.

## External APIs

Choose a vendor preset for its predefined request settings, or create a **Custom API** connection with a base URL and authentication. The pipeline step supplies the request path and body.

Custom connections support bearer tokens, Basic authentication, a named header, token login, or no authentication. Creating and editing them requires administrator access and `policies.allowCustomApiIntegrations: true` (the default).

A step can keep the original document or replace it with the response. Test against the service's test environment before enabling the workflow: test runs also send requests to external services.

## Microsoft Purview

Enter a tenant ID to apply and read PDF sensitivity labels. To populate the label picker from your tenant, also supply both **Client ID** and **Client secret**. Applying label metadata does not encrypt the PDF.

## Administrator settings

Connection secrets are encrypted at rest. Back up the encryption key with your deployment. Set `STIRLING_CREDENTIAL_ENCRYPTION_KEY` to use a shared key across nodes; a single-node installation can use its generated `credential-encryption.key` file.

For services on private networks, configure the relevant setting:

| Setting | Service |
|---|---|
| `policies.allowPrivateS3Endpoints` | Private S3-compatible endpoints |
| `policies.allowedPrivateNetworkHosts` | Allowed internal SFTP, FTP, and SMB hosts |
| `policies.allowPrivateNetworkSources` | Broader internal SFTP, FTP, and SMB access |
| `policies.allowPrivateApiEndpoints` | Private API endpoints |

The boolean settings default to `false`. See [Sources](./Sources.md) for source setup and [Clustering](../Configuration/Operations/Clustering.md) for shared deployment configuration.
