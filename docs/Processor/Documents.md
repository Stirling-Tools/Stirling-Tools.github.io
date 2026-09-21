---
sidebar_position: 8
title: Documents
description: View recent processing activity, inspect operations, and export a CSV.
id: Documents
---

# Documents

Open **Processor → Documents** to view recent editor, API, and automation activity. Each row shows a file, the operation performed, the user, its status, and the time.

![Documents table with filters and CSV export](/img/processor/documents.png)

## Find and inspect activity

Search by filename or ID and use the status filters to narrow the list. Click a row to open its **Overview** and **Audit** details.

The page displays up to **40** recent file-operation records. A file processed several times can appear more than once. Reload the page to refresh the list.

**Export CSV** downloads all loaded rows, including any hidden by the current filters. For failed runs and error details, open [Review](./Review.md).

## Access and recording

All users with Processor access can view Documents. Self-hosted users see server-wide activity; Stirling Cloud users see their team's activity.

Enable processing-event recording as described in [Setup and access](./Setup-and-Access.md#check-the-processing-record). Enterprise is not required for this page. Non-Enterprise event retention is limited to **30 days**; Enterprise uses its configured retention.

For full audit searches and exports, see [Audit Logging](../Configuration/Security/Audit%20Logging.md).
