---
sidebar_position: 3
id: Pipelines
title: Pipelines
description: Build the sequence of operations the Processor runs on every document it picks up, with stored supporting files, call-outs to other systems, and a chosen delivery location
tags: [Processor, Pipelines, Automation, Steps, Integrations]
---

# Pipelines

A pipeline is the ordered list of operations run on every document the Processor picks up. The source says where a document comes from, the destination says where the result goes.

## Build a pipeline

1. Go to `/processor/pipelines` and choose **New pipeline**.
2. Pick one input source and a trigger: **Manual only**, **Schedule** (any source), **Folder watch** (folder sources) or **Webhook** (webhook sources).
3. Use **Add tool** to place each step, then fill in its settings. A step marked **Needs setting up** blocks the save.
4. Choose exactly one destination, folder or S3.
5. **Test with a file** runs the canvas as it stands against one uploaded PDF, output kept inline. **Create pipeline** saves it live; **Create paused** saves it switched off.

## What a step is

- **Operation** - an endpoint path under `/api/v1/` in `general`, `misc`, `security`, `convert`, `filter`, `integration` or `ai/tools`. Nothing else is allowed, and parameters use the endpoint's own names.
- **Supporting files** - stored files bound to the operation's own file fields. Empty by default.
- Files flow between steps, values do not. Each step must accept what the one before it produces, and a step that produces a report must be last.
- An operation taking multiple inputs is called once with every file; every other operation once per file. A filter step that returns nothing drops that file from the run.

## Supporting files

- `/api/v1/misc/add-stamp` binds a file to `stampImage`. `/api/v1/security/cert-sign` binds `p12File`, `jksFile`, or `certFile` plus `privateKeyFile`, chosen by the step's `certType`.
- 50 MB per file, empty files refused, visible only to your own team. Uploaded when you save the pipeline.
- A stored file wins over a file supplied with the run under the same field, and a file any pipeline still references cannot be deleted.

## Send the document to another system

| Setting | Default | Purpose |
|---|---|---|
| `connectionId` | required | Stored connection holding the base URL and the credentials. |
| `path` | none | Path appended to that base URL. It, `fields` and `headers` accept `document.*`, `run.*`, `sensitivityLabel.*` and `classification.*` placeholders; an unknown reference is an error. |
| `bodyMode` | `multipart` | `multipart`, `json` or `binary`. |
| `responseMode` | `report` | `report` keeps the document; `replace` makes the response the document. |
| `requireTrue` | none | Dotted path in the JSON response that must be `true`, or the step fails. |

## Where the output goes

- Folder and S3 destinations never overwrite; a collision re-picks `name (n).ext`. With no destination the output is returned inline, as every test run does.
- S3 Object Lock: set `objectLockMode` (`GOVERNANCE` or `COMPLIANCE`) and `retentionDays` (1 to 36525) together on the S3 connection, or neither. The bucket must already have Object Lock enabled or the write is rejected.
- `policies.allowPrivateS3Endpoints` (`POLICIES_ALLOWPRIVATES3ENDPOINTS`, default `false`) is needed for an S3 endpoint on a private address, and `policies.allowPrivateApiEndpoints` (`POLICIES_ALLOWPRIVATEAPIENDPOINTS`, default `false`) for an external API one.

## Compared with the Automate tool

- Automate runs in the editor for the person present and is stored in that one browser. A pipeline runs on the server for the whole team and is started by a trigger.
- A pipeline takes supporting files and repeats an operation as often as you place it. Automate does neither, and does not check step order.

## Related Documentation

- **[Sources](./Sources.md)** - the input and destination records a pipeline binds to
- **[Policies](./Policies.md)** - triggers, team scope, and the `policies` settings block in full
- **[Integrations](./Integrations.md)** - the stored API and S3 connections a pipeline calls through
- **[Pipeline Automation (Automate)](../Configuration/Automation/Pipeline.md)** - the in-editor tool and its operation reference
