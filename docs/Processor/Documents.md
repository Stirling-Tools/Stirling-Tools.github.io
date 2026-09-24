---
sidebar_position: 8
title: Documents
description: Check that processing worked, trace what happened to a file, and export the records as CSV.
id: Documents
---

# Documents

Documents helps you check that processing worked and track down problems. Open **Processor → Documents** to confirm a pipeline ran on a file, see which operation handled it and when, and spot anything that failed. Each row shows a file name, the operation, who ran it, the outcome, and the time.

![Documents table with filters and CSV export](/img/processor/documents.png)

## Find and inspect activity

Search by filename or ID and use the status filters to narrow the list. Click a row to open its **Overview** and **Audit** details.

The page displays up to **40** recent file-operation records. A file processed several times can appear more than once. Reload the page to refresh the list.

**Export CSV** downloads all loaded rows, including any hidden by the current filters. For failed runs and error details, open [Review](./Review.md).

## Access and recording

Documents is part of Processor, so only people with Processor access can open it; by default that is administrators and team leaders. It shows processing records, never the documents themselves: files cannot be opened or downloaded from here.

Processing activity is recorded by default, including on installations without an Enterprise license. No additional audit setup is needed with the default configuration. Non-Enterprise records are retained for **30 days**; Enterprise uses its configured retention.

For full audit searches and exports, see [Audit Logging](../Configuration/Security/Audit%20Logging.md).
