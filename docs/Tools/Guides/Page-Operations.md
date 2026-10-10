---
sidebar_position: 18
title: Page operations
description: Merge, split, reorder, rotate, remove, resize and lay out the pages of your PDFs.
sidebar_label: Page operations
---

# Page operations

To edit pages visually with thumbnails, see [Workspace and Page Editor](../Workspace/Page-Editor.md).

## Merge

**Merge** joins two or more PDFs into one, in the order shown. Drag files to reorder them, or use **Sort By** (**File Name** or **Date Modified**, ascending or descending). Options:

- **Generate table of contents in the merged file?** adds clickable bookmarks named after the original files.
- **Remove digital signature in the merged file?** removes signatures.

**Create Portfolio** is the alternative when the files should stay separate: it bundles them into one PDF portfolio, whatever their type.

## Split

**Split** breaks one PDF into several files. Choose a method:

| Method | Splits |
|--------|--------|
| **Page Numbers** | After each page you enter. `3,7` splits after pages 3 and 7; a range such as `3-8` splits before page 3 and after page 8 |
| **Chapters** | At each bookmark, using the document's outline |
| **Sections** | Each page into a grid of horizontal and vertical pieces, for example halves or quarters |
| **File Size** | Into parts under a maximum size, for example `10MB` |
| **Page Count** | Into files with a set number of pages each |
| **Document Count** | Into a set number of files |
| **Page Divider** | At QR code divider sheets placed between documents when scanning a batch |
| **Printable Chunks** | Each oversized page into tiles of a standard paper size (A4, Letter and so on) for printing as a poster |

## Reorder and rotate

- **Reorganize Pages** - rearrange, duplicate or delete pages. Choose an **Organization mode**, for example **Custom Page Order** (enter an order such as `1,3,2,4-6`), **Reverse Order**, **Duplex Sort** (for scans of all fronts then all backs), **Odd-Even Split**, **Odd-Even Merge** or **Duplicate all pages**.
- **Rotate** - turns all pages by 90-degree steps with **Rotate Counterclockwise** and **Rotate Clockwise**.
- **Auto Rotate** - detects each page's orientation and turns it upright, then shows a report of what it changed. **Detection method** is **Auto**, **Text only** or **OCR only**. Tick **Rotate low confidence pages to match** to turn blank or nearly blank pages the same way as the rest.

## Remove and extract pages

- **Extract Pages** - copies the pages you enter into a new PDF, in order.
- **Remove Pages** - deletes the pages you enter.
- **Remove Blank pages** - finds and removes pages with little or no content. Tick **Include detected blank pages** to also get a PDF of the removed pages so you can check them.

In **Extract Pages** and **Remove Pages**, enter single pages and ranges such as `1,3,5-8`, open ranges such as `5-` (page 5 to the end), or expressions such as `2n-1` (odd pages).

## Page size and layout

- **Adjust page size/scale** - choose a **Target Page Size** (A0-A6, Letter, Legal or **Keep Original Size**) and a **Scale Factor** for the content. **Page orientation** (**Portrait** or **Landscape**) sets which way round the chosen size is used. It is unavailable with **Keep Original Size**.
- **Crop PDF** - drag the crop area on the preview, or click **Auto-crop whitespace**, then **Apply Crop**.
- **Multi-Page Layout** - places several pages on each sheet, in a grid of rows and columns, with optional borders.
- **PDF to Single Large Page** - stacks every page into one tall page.
- **Booklet Imposition** - reorders and lays out pages so that, printed double-sided and folded, they read in order.

## Add to pages

- **Add Page Numbers** - choose the position, which pages to number, the starting number and a custom format such as `Page {n}`. **Zero-pad Width (Bates Stamping)** pads numbers to a fixed width, for example `001`.
- **Manage Attachments** - add, extract, rename or delete files embedded in the PDF.
