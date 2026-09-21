---
sidebar_position: 9
title: Review
description: Investigate failed processing, inspect diagnostics, and track resolved issues.
---

# Review

Open **Processor → Review** (`/processor/review`) for recorded failures from pipeline runs and editor tools. A notification can also link directly to the issue.

![Review queue with issue details and available actions](/img/processor/review.png)

## Investigate an issue

1. Start with **Open** issues.
2. Search by issue, user, or error text, or filter by type, source, user, and origin.
3. Check the source and user to identify the affected workflow.
4. Choose **View error** from the row or its menu to inspect the diagnostic. **Copy error** copies it for investigation.
5. Fix the underlying problem, then use the action offered for that issue or rerun the affected workflow as appropriate.

Repeated occurrences can be grouped into one row with an occurrence count. The date reflects the most recent occurrence.

## Actions and closed issues

The server decides which actions are available for each issue and user. Some issues can be dismissed; others offer a specific recovery action. Do not assume every failure has a Retry action.

**Dismiss** closes the issue record. It does not repair the input, rerun a PDF operation, or confirm that an output was delivered. Check the result after recovery.

Switch to **Closed** to see settled issues, their outcome, and who closed them. Removing a document from the editor can also close that user's related incidents, because there is no longer a file to act on.

## Visibility and refresh

Members can see their own failures; team leaders can see their team's failures. This scope differs from the self-hosted Documents feed.

The current view loads up to **50** recent records and refreshes about every **30 seconds** while visible. Search and UI filters apply to that loaded set. A temporary connection failure can delay updates; a permissions or unavailable-feature response needs the corresponding access/build issue resolved.

## Common recovery checks

| Problem | Check |
|---|---|
| Folder unavailable | Container mount, allowed roots, process permissions, and the existence of the input/output directory. |
| Connection refused or credentials rejected | Integration settings, credential validity, private-network policy, and service availability. |
| Tool or conversion failed | Input format, required parameters, dependencies, and whether earlier steps changed the file type. |
| Classification unavailable | AI classification availability and the Classify step. Use property-based routing if AI is unnecessary. |
| Repeated failure on the same file | Repair the cause before clearing history or resubmitting; see source processing modes. |

See [Troubleshooting](./Troubleshooting.md) for workflow-level checks.
