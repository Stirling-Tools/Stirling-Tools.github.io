---
sidebar_position: 4
id: Documents
title: Documents
description: Find and review the files this deployment has processed, who ran them, and whether they succeeded
tags: [Processor, Documents, Audit, Enterprise, Self-host]
---

# Documents

Read-only record of the 40 most recently processed files - editor, API and automation runs alike - at `/processor/documents`, one row per file per operation. Older files are reachable only in the audit log.

## Columns
| Column | Contains |
|---|---|
| **Document** | File name. Sortable. |
| **Product** | `API`, `Editor` or `Automation`. Sortable. Set from a header the calling client sends, so treat **User**, not **Product**, as the accountable identity. |
| **Pipeline / Action** | Operation that ran; `Editor` for editor rows and rows where the action was not recorded. Sortable. |
| **User** | Account that ran it; automation rows show `STIRLING-PDF-BACKEND-API-USER`. Sortable. |
| **Status** | `Processed` or `Error`. Sortable. |
| **Time** | Relative age, for example `3h ago`. Not sortable. |

## Using the page
- Status pills **All** and **Processed** carry live counts. There is no `Error` pill, so sort by **Status** or export the CSV to isolate failures.
- Search matches file name and row id only, case-insensitively. Pills, counts and search cover the 40 loaded rows only, so an empty result does not mean the file was never processed.
- **Export CSV** writes `documents.csv` (`Document`, `Product`, `Pipeline / Action`, `User`, `Status`, `Time`) for every row loaded, not just the ones the active pill and search box leave on screen.
- No pagination and no auto-refresh: reload the page to pick up new rows, and a finished run can take about a minute to appear.
- Clicking a row opens a drawer: **Overview** (the table columns plus **Type**) and **Audit** (**Processed** or **Needs Review**, with the source - `Policy: <name>` or `Policy automation`, `API key · <label>` or `API integration`, `Web upload`, or `System`).
- Metadata only: no preview, download or file content in the table or the drawer.
- Self-hosted shows rows to administrators only; on SaaS administrators see the whole server and a team leader sees their own team. `security.portal.defaultAccess` controls who can open the page.

## Recommended configuration
Requires an Enterprise license and a build that includes the Processor (the standard published Docker image does not - see [Processor](./Processor.md)). Restart to apply; the page is empty with no error if any prerequisite is missing.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true
    premium:
      enterpriseFeatures:
        audit:
          enabled: true
          level: 2
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_ENABLELOGIN=true
    PREMIUM_ENTERPRISEFEATURES_AUDIT_ENABLED=true
    PREMIUM_ENTERPRISEFEATURES_AUDIT_LEVEL=2
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          SECURITY_ENABLELOGIN: "true"
          PREMIUM_ENTERPRISEFEATURES_AUDIT_ENABLED: "true"
          PREMIUM_ENTERPRISEFEATURES_AUDIT_LEVEL: "2"
    ```
  </TabItem>
</Tabs>

## Related Documentation
- **[Audit Logging](../Configuration/Security/Audit%20Logging.md)** - audit levels, retention (`retentionDays`, default `90`) and exact timestamps
- **[Processor](./Processor.md)** - how to get a build with the Processor, and who can reach it
