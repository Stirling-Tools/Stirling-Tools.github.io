---
sidebar_position: 8
title: Remove Blank pages
description: Find and remove empty pages, such as the blank backs of scanned sheets.
sidebar_label: Remove Blank pages
---

# Remove Blank pages

**Remove Blank pages** finds empty pages, like the blank backs of scanned sheets, and takes them out.

<Video id="uwIVlywZ13g" title="Remove blank pages" />

1. Open **Remove Blank pages** and add your PDF.
2. Adjust the thresholds if needed (below).
3. Tick **Include detected blank pages** to also get a PDF of the removed pages, so you can check them.
4. Click **Remove blank pages**.

## Thresholds

A page with any text is always kept. Pages without text, like scans, are checked pixel by pixel.

- **Pixel Whiteness Threshold** - how far from pure white a pixel can be and still count as white. Scanned paper is usually slightly grey, so raise it, for example to 40.
- **White Percentage Threshold** - how much of the page must be white for it to count as blank. Lower it a little, for example to 99, so specks of dust or a shadowed edge don't keep a page.

If too many or too few pages were removed, adjust the thresholds and run it again.
