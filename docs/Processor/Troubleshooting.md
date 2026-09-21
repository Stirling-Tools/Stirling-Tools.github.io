---
sidebar_position: 12
title: Troubleshooting
description: Resolve missing pages, inactive sources, pipeline setup issues, and failed delivery.
---

# Troubleshooting

## Processor is missing

Confirm that your deployed frontend includes Processor, then check the user's access. A build without Processor cannot be fixed by changing a runtime environment variable. See [Setup and access](./Setup-and-Access.md).

If an old link sends you elsewhere, Policies has moved into Pipelines and administration has moved into Settings. The documentation browser is now `/docs`.

## A folder source will not save

Check the path from the server's perspective. For containers, use the mounted path inside the container. Add the intended root under Folder Access, restart, and confirm filesystem permissions. The configuration directory remains protected even if its parent is allowed.

For network or S3 sources, check the selected connection, protocol, credentials, and private-address restrictions. A Folder source does not point at a directory on the browser user's computer.

## The pipeline does not run

1. Confirm the pipeline and source are enabled.
2. Check that the trigger matches the source: folder watch for Folder, webhook for Webhook, or a schedule for a polled source.
3. For Editor input, upload or export a file according to **Runs on**. It does not run as a background server watcher.
4. Check the source's processing history. **Keep it** and **Delete the file** do not continually rerun an unchanged version.
5. Inspect **Review** and server logs for the actual failure.

Schedules are checked periodically, and folder watches have a catch-up sweep. Forcing repeated sweeps before investigating can create duplicate work in Snapshot mode.

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

Confirm recording is enabled at a level that includes processing, then run a supported operation and allow time for persistence and caching. The feed shows up to 40 recent file-operation rows, not everything in storage. On Cloud, confirm the user belongs to the expected team.

Enterprise is not required for the Documents feed. Full audit administration is separate.

## An issue remains after fixing it

Fixing a credential or folder permission does not itself rerun a failed document. Use the recovery action offered in **Review**, or resubmit/rerun through the workflow. Dismissing an issue only closes its record.

See [Review](./Review.md) for visibility, refresh, and diagnostic actions.
