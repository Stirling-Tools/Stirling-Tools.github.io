---
sidebar_position: 9
title: Review
description: Find out why processing failed, fix the cause, and retry.
---

# Review

Review is where you fix processing problems. Open **Processor → Review** to see why a pipeline run or editor operation failed, correct the cause, and try again.

![Review queue with issue details and available actions](/img/processor/review.png)

## Investigate an issue

1. Start with **Open** issues.
2. Search by issue, user, or error, or filter by type, source, user, and origin.
3. Choose **View error** from the row menu. Use **Copy error** to copy the diagnostic.
4. Fix the cause, then use the recovery action offered or rerun the workflow.

Repeated issues can be grouped with an occurrence count. The date shows the latest occurrence.

**Dismiss** closes an issue without rerunning it. Switch to **Closed** to see resolved issues and their outcomes.

## Whose issues you see

You see issues from your own runs, so you can fix what went wrong. Administrators on self-hosted deployments, and team leaders on Stirling Cloud, look after the team's pipelines, so they also see issues from the team's runs. That includes scheduled and folder-watch runs, which have no user to tell.

The page loads up to **50** recent records and refreshes every **30 seconds** while visible. Search and filters apply to those records.
