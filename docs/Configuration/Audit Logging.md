---
sidebar_position: 18
title: Audit Logging
tags: [enterprise, management, feature, advanced feature]
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Audit Logging

> **Tier**: Enterprise

Logs every operation, who ran it, what tool, which files, when. All data is stored in the database.
We recommend external database setup when using this feature due to the potential volume.
Please note the data stored is customisable based on you and your organisations needs and legal requirements.


Settings are under `premium.enterpriseFeatures.audit`.

| Setting | Default | Description |
|---|---|---|
| `enabled` | `true` | Turn audit logging on or off |
| `level` | `2` | Verbosity: `0` = off, `1` = basic, `2` = standard, `3` = verbose |
| `retentionDays` | `90` | Days to keep audit records before purging (`0` = infinite retention) |
| `captureFileHash` | `false` | Store a SHA-256 hash of each processed file |
| `capturePdfAuthor` | `false` | Extract and store PDF author metadata |
| `captureOperationResults` | `false` | Store operation return values - high volume, use sparingly |

## Audit levels

| Level | What's recorded |
|---|---|
| `0` - OFF | Nothing |
| `1` - BASIC | File modifications only - PDF operations (compress, split, merge, etc.) and settings changes |
| `2` - STANDARD | BASIC + user actions (login/logout, account changes, general GET requests) |
| `3` - VERBOSE | STANDARD + continuous polling calls and all GET requests |

## Example

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    premium:
      enabled: true
      key: your-enterprise-license-key
      enterpriseFeatures:
        audit:
          enabled: true
          level: 2
          retentionDays: 365
          captureFileHash: true
          capturePdfAuthor: false
          captureOperationResults: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PREMIUM_ENABLED=true
    PREMIUM_KEY=your-enterprise-license-key
    PREMIUM_ENTERPRISEFEATURES_AUDIT_ENABLED=true
    PREMIUM_ENTERPRISEFEATURES_AUDIT_LEVEL=2
    PREMIUM_ENTERPRISEFEATURES_AUDIT_RETENTIONDAYS=365
    PREMIUM_ENTERPRISEFEATURES_AUDIT_CAPTUREFILEHASH=true
    PREMIUM_ENTERPRISEFEATURES_AUDIT_CAPTUREPDFAUTHOR=false
    PREMIUM_ENTERPRISEFEATURES_AUDIT_CAPTUREOPERATIONRESULTS=false
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
        environment:
          PREMIUM_ENABLED: true
          PREMIUM_KEY: your-enterprise-license-key
          PREMIUM_ENTERPRISEFEATURES_AUDIT_ENABLED: true
          PREMIUM_ENTERPRISEFEATURES_AUDIT_LEVEL: 2
          PREMIUM_ENTERPRISEFEATURES_AUDIT_RETENTIONDAYS: 365
          PREMIUM_ENTERPRISEFEATURES_AUDIT_CAPTUREFILEHASH: true
    ```
  </TabItem>
</Tabs>

> **Note on performance:** `captureFileHash` adds a SHA-256 calculation for every file processed - noticeable overhead at high volume. `captureOperationResults` stores full operation output in the database and can grow very large; only enable it when specifically needed.
