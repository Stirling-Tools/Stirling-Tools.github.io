---
sidebar_position: 5
id: Integrations
title: Integrations
description: Connect Stirling PDF to S3 buckets, file servers, external APIs and Microsoft Purview, and reuse those connections across your sources, policies and pipelines
tags:
  - Processor
  - Integrations
  - Connections
  - S3
  - SFTP
  - Purview
---

# Integrations

A saved connection: a name, an address and the credentials to reach an external service. Manage them at `/processor/integrations`; sources, policies and steps reference one by `connectionId`.

## Connection types

| Type | Required config | Used by |
|---|---|---|
| **S3** | `bucket`, `accessKeyId`, `secretAccessKey`; optional `region` (default `us-east-1`) and `endpoint` | Policy sources, policy and pipeline output destinations |
| **Network file server** | `protocol` (`sftp`, `ftp`, `smb`), `host`, `username`, plus `password` or `privateKey`, plus `share` for SMB | Policy sources and output destinations |
| **External API** | `baseUrl`, `authType` (`NONE`, `BEARER`, `BASIC`, `HEADER`, `TOKEN_LOGIN`) | The `external-api-call` step and the vendor presets |
| **Purview** | `tenantId` | The apply-label and read-label steps |

:::warning ConsignO Cloud is not usable
The **Available** band also carries a ConsignO Cloud tile. There is no working step behind it, and the External API step refuses a ConsignO connection.
:::

## Secret handling

- Configuration is encrypted before storage, and every sensitive value reads back as `********`. On edit, a masked or blank secret keeps the stored value; a secret nested in a list must be re-typed or the mask overwrites it.
- Set `stirling.security.credentialEncryptionKey`, or a `credential-encryption.key` file is generated on first boot. Lose it and every stored secret is unrecoverable; `cluster.enabled: true` refuses the generated file, so give every node the same key.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    stirling:
      security:
        credentialEncryptionKey: <BASE64_AES_256_KEY>
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    STIRLING_CREDENTIAL_ENCRYPTION_KEY=<BASE64_AES_256_KEY>
    ```
  </TabItem>
</Tabs>

## S3
```json
{"integrationType": "S3", "name": "Finance archive", "scope": "TEAM", "config": {"bucket": "acme-finance-archive", "region": "eu-west-1", "accessKeyId": "AKIA2EXAMPLE", "secretAccessKey": "wJalrXUtnFEMI", "objectLockMode": "COMPLIANCE", "retentionDays": 2555}}
```
Object Lock has no form field: `objectLockMode` (`GOVERNANCE` or `COMPLIANCE`) and `retentionDays` (1 to 36525) must be set together, on the connection. A private endpoint needs `policies.allowPrivateS3Endpoints: true`.

## Network file server
```json
{"integrationType": "NETWORK", "name": "Scanner drop box", "scope": "TEAM", "config": {"protocol": "sftp", "host": "sftp.records.acme.example.com", "port": 22, "username": "stirling-processor", "privateKey": "-----BEGIN OPENSSH PRIVATE KEY-----\n...", "hostKeyFingerprint": "SHA256:1s7Q0mE0rW"}}
```
Default ports: 22 SFTP, 21 FTP, 445 SMB, 990 for FTP with `security: IMPLICIT`. A private host needs `policies.allowPrivateNetworkSources: true` or the exact hostname in `policies.allowedPrivateNetworkHosts`.

## External API
```json
{"integrationType": "API", "name": "Document classifier", "scope": "TEAM", "config": {"baseUrl": "https://classify.acme.example.com/v2", "authType": "BEARER", "token": "eyJhbGciOiJIUzI1NiJ9.example", "timeoutSeconds": 120}}
```
`timeoutSeconds` defaults to `60`, between 1 and 600. Creating or editing one, preset included, needs an admin and `policies.allowCustomApiIntegrations: true` (default `true`); a private base URL needs `policies.allowPrivateApiEndpoints: true`.

## Purview
```json
{"integrationType": "PURVIEW", "name": "Acme M365 tenant", "scope": "TEAM", "config": {"tenantId": "8f4c1f0a-3d2b-4a77-9c1e-5b0e2a6d9f31"}}
```
The tenant GUID is the whole configuration. Leave the optional Client ID and Client secret fields empty; nothing reads them.

## Related Documentation
- **[Processor](./Processor.md)** - the sources, policies and pipelines these connections plug into
- **[Sources](./Sources.md)** - the S3 and file server sources that use a connection
- **[Policies](./Policies.md)** - triggers, outputs and the steps that use a connection
- **[API Keys and Audit](./API-Keys-and-Audit.md)** - keys for `/api/v1/integrations` and the audit trail
