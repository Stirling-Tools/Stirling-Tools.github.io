---
sidebar_position: 5
title: Rotate and Auto Rotate
description: Turn every page of a file by quarter turns, or let Auto Rotate turn sideways and upside-down pages upright.
sidebar_label: Rotate
---

# Rotate and Auto Rotate

**Rotate** turns every page of a file by quarter turns. **Auto Rotate** finds sideways or upside-down pages and turns just those upright.

## Rotate every page

1. Open **Rotate** and add the files you want to turn.
2. Click **Rotate Counterclockwise** or **Rotate Clockwise** until the preview of the first page reads the right way up.
3. Click **Apply Rotation**. Every page of every selected file turns by the same amount.

To turn only some pages, use the [Page Editor](../Workspace/Page-Editor.md).

## Turn pages upright automatically

1. Open **Auto Rotate** and add your file.
2. Choose a **Detection method**: **Auto** reads each page's text and uses OCR on pages without usable text, **Text only** is quickest for files that were never scanned, and **OCR only** treats every page as an image.
3. **Confidence threshold** sets how sure the check must be before a page is turned. Tick **Rotate low confidence pages to match** to turn blank or nearly blank pages the same way as the rest.
4. Click **Auto Rotate**. The **Detection report** lists each page, the turn it got and how that was decided.

If a scanned page is skipped for low confidence, lower the **Confidence threshold** and run it again.
