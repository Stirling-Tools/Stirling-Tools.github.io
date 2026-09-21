---
sidebar_position: 8
title: Documents
description: Inspect recent processing activity, export a CSV, and understand the limits of the document feed.
id: Documents
---

# Documents

Open **Processor → Documents** (`/processor/documents`) for the recent processing record. It includes editor, API, and automation work, with a row for each file in a recorded operation.

![Documents table with filters and CSV export](/img/processor/documents.png)

## Read the list

| Column | Meaning |
|---|---|
| **Document** | Recorded filename. |
| **Labels** | Classification or sensitivity labels when supplied; the current audit-derived feed does not infer them. |
| **Product** | Editor, API, or Automation. Use the User column for accountable identity. |
| **Pipeline / Action** | Recorded operation; editor activity may be labelled Editor. |
| **User** | Account that ran the operation. Unattended work can use a backend service identity. |
| **Status** | Outcome supplied by the processing record. |
| **Time** | Relative age of the event. |

The current server feed returns up to **40** file-operation rows from recent audit events. This is an activity window, not a complete file inventory. A file processed by multiple operations can appear more than once.

Search matches the filename and row ID. Filter pills act on the loaded rows; an empty result does not mean the file has never been processed. The current server feed supplies **Processed** and **Error** outcomes. The UI also has Flagged and In review filters, but they should not be interpreted as an approval workflow for these audit-derived rows.

## Inspect or export

Click a row or its actions button to open the detail drawer. **Overview** shows the recorded metadata; **Audit** shows the operation event. The current feed does not provide file bytes, a download, or extracted field values. The **Extractions** tab does not turn this record into a document extraction service.

**Export CSV** downloads `documents.csv` containing every loaded row, including rows hidden by the current search or filter. It is not a full-history export.

There is no paging through older records on this screen and no dedicated periodic polling. Reload or revisit the page to refresh it, allowing for the server's short cache and event persistence delay.

## Access and recording

Documents is available to all users with Processor access, without an Enterprise license. Self-hosted Processor users see the server-wide feed; Cloud users are scoped to their team. Keep that visibility in mind when granting Processor access.

Recording must be enabled at an audit level that includes processing. See [Setup and access](./Setup-and-Access.md#check-the-processing-record). Non-Enterprise audit retention is capped at **30 days**; Enterprise uses its configured retention. The 40-row display limit still applies.

Full audit queries and administration remain separate Enterprise features under [Administration](./API-Keys-and-Audit.md).

## Investigate a failed run

Use [Review](./Review.md) for actionable failure records, error details, and the actions offered by the server. Documents is the recent activity feed; changing a Review issue's status does not rewrite the processing history.
