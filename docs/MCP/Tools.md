---
title: MCP tools reference
sidebar_label: Tools reference
sidebar_position: 2
description: The tools the Stirling PDF MCP server exposes, how to call them and what they return.
---

# MCP tools reference

## Tools

| Tool | What it does |
|---|---|
| `stirling_describe_operation` | Returns the parameters and JSON schema for one operation. |
| `stirling_pages` | Page operations: merge, split, rotate, rearrange, crop, delete, overlay, add blank pages. |
| `stirling_convert` | Conversions to and from PDF (Word, images, HTML and more). |
| `stirling_misc` | Compress, OCR, stamp, watermark, metadata, flatten, repair and similar. |
| `stirling_security` | Passwords, redaction, sanitising, certificate signing and signature validation. |
| `stirling_upload` | Stores a file on the server and returns a `fileId`, so several operations can reuse it. |
| `stirling_download` | Returns a stored file by `fileId`, as base64, up to the inline limit. |
| `stirling_ai` | Runs AI capabilities. Needs AI to be set up. |

Operation IDs are the short endpoint names, such as `compress-pdf`. Each tool lists the operations it has, and an admin can hide some. Filters and the [Pipeline API](../Developers/Pipeline-API.md) aren't available over MCP.

## Calling a tool

Call `stirling_describe_operation` with an `operation` first to get its parameters. Then call the category tool:

| Argument | Required | Value |
|---|---|---|
| `operation` | Yes | The operation ID, for example `compress-pdf`. |
| `parameters` | No | An object of the operation's parameters. |
| `file` | No | The input document as base64. The usual way to send a file. |
| `fileName` | No | The original file name with its extension. |
| `fileId` | No | A file stored with `stirling_upload`, or an earlier result, instead of `file`. |

```json
{"name": "stirling_misc", "arguments": {"operation": "compress-pdf", "fileName": "report.pdf", "file": "<base64>", "parameters": {"optimizeLevel": 5}}}
```

Results:

- A JSON result comes back as text.
- A file result comes back inline as base64 (`stirling://file/{fileId}`) with its `fileId`, up to the server's inline limit (10 MB by default on self-hosted servers).
- A larger result returns only a `fileId`, which you can pass to the next operation. `stirling_download` has the same limit, so it can't return that file either. On a self-hosted server an admin can raise the limit ([MCP server settings](../Server/Automation/MCP-Server.md)).

## AI capabilities

`stirling_ai` takes an `operation` (a capability ID), a `parameters` object and, for capabilities that read a document, a `fileId`. The capabilities are `pdf-question-answer`, `pdf-edit-plan`, `pdf-comment-generate`, `agent-draft`, `agent-revise`, `agent-next-action`, `math-audit-examine` and `math-audit-deliberate`. Use `stirling_describe_operation` to get each one's schema.

AI is on for Stirling Cloud. On a self-hosted server an admin must set it up ([AI on your server](../Server/AI/AI.md)).
