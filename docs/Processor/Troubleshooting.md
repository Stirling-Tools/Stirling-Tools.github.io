---
sidebar_position: 12
title: Troubleshooting
description: Resolve missing pages, inactive sources, pipeline setup issues, and failed delivery.
---

# Troubleshooting

## Processor is missing

Ask your administrator to check the installation and your account permissions. See [Setup and access](./Setup-and-Access.md).

## A folder source will not save

Check the path from the server's perspective. For containers, use the mounted path inside the container. Add the intended root under Folder Access, restart, and confirm filesystem permissions. The configuration directory remains protected even if its parent is allowed.

For network or S3 sources, check the selected connection, protocol, credentials, and private-address restrictions. A Folder source does not point at a directory on the browser user's computer.

## The pipeline does not run

1. Confirm the pipeline and source are enabled.
2. Check that the trigger matches the source: folder watch for Folder, webhook for Webhook, or a schedule for a polled source.
3. For Editor input, upload or export a file according to **Runs on**.
4. Check the source's processing history. **Keep it** and **Delete the file** do not continually rerun an unchanged version.
5. Inspect **Review** and server logs for the actual failure.

Schedules are checked periodically, and folder watches have a catch-up sweep. Snapshot mode processes unchanged files on each run.

## Save or Create is disabled

Read the builder's setup messages. Common missing items are the pipeline name, input, destination for a storage input, valid schedule interval, or a required tool parameter. Every routing rule needs matching values and a destination.

Classification routing needs a Classify step. That step also requires AI classification to be available. Use property-based routing when you do not need classification.

## Originals disappear or outputs repeat

Check **Sources → Advanced → After processing**. **Delete the file** removes originals after successful delivery. **Keep it** preserves originals and processes changed versions. **Snapshot** deliberately processes the files again on each run.

Keep output directories and S3 prefixes separate from watched inputs. Otherwise the workflow may pick up its own results. Before clearing processed history, consider how many existing files will be eligible again.

## A test works but output does not reach storage

**Test with a file** returns output inline. It does not test writing to the saved storage destination. Run a controlled live input and inspect the actual destination, credentials, permissions, and routing fallback.

For S3 Object Lock, check both the bucket configuration and connection retention settings. Existing files are not overwritten; look for a filename with a numeric suffix.

## Documents is empty

Enable [processing-event recording](./Setup-and-Access.md#check-the-processing-record), run an operation, then reload the page. On Cloud, confirm the user belongs to the expected team.

## An issue remains after fixing it

Fixing a credential or folder permission does not itself rerun a failed document. Use the recovery action offered in **Review**, or resubmit/rerun through the workflow. Dismissing an issue only closes its record.

See [Review](./Review.md) for visibility, refresh, and diagnostic actions.
