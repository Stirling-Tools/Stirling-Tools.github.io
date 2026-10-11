---
title: Files and privacy
sidebar_label: Files & privacy
sidebar_position: 4
description: Where Stirling Cloud processes and stores your files, what AI tools send, and how long data is kept.
---

# Files and privacy

## Where your files are processed

| What you do | Where it happens |
|---|---|
| View, read, rearrange pages, manage files in your workspace | In your browser. The file stays on your device. |
| Server tools such as compress, OCR, convert and watermark | Sent to Stirling's servers, processed and returned. |
| AI tools and the AI assistant | Stirling's servers, plus an AI provider for the text the feature needs. |
| Processor pipelines | Stirling's servers, reading from and writing to the storage you connect. |

Files you open in the editor stay in your browser's storage until you remove them. They are saved to Stirling Cloud only if you are signed in and choose to upload or share them. Share links open only for signed-in users ([My files and sharing](../Tools/Workspace/Files-and-Sharing.md)).

## What AI tools send

AI features use Anthropic (Claude) models and Voyage AI embeddings. They receive prompts and the text or excerpts the feature needs, never whole files. Neither provider uses your data to train models.

## Storage and retention

- Stirling Cloud runs on Amazon Web Services, and stored files are encrypted at rest.
- Files you save to Stirling Cloud stay there until you delete them or your account.
- Card payments go to Stripe. Stirling never stores your card details.

For the full terms, see the [privacy policy](https://stirling.com/legal/privacy-policy) and the [list of subprocessors](https://stirling.com/legal/subprocessors).
