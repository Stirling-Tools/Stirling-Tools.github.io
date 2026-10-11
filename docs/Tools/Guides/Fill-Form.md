---
sidebar_position: 15
title: Fill forms
description: Fill in PDF forms, add or edit form fields, export form data, and detect fields automatically.
sidebar_label: Fill forms
---

# Fill forms

Open a PDF and select **Form Editor**, then choose a **Form editor mode**: **Fill**, **Create** or **Modify**. A PDF with no fields opens in **Create**.

## Fill in a form

1. In **Fill**, click each field on the page (or in the field list) and enter a value.
2. Turn on **Flatten after filling** to lock the answers into the page.
3. Click **Save** or press **Ctrl+S** (**Cmd+S** on a Mac) to write the values into the PDF. Required fields must be filled first.

To export the entered values, click **JSON**, **CSV** or **XLSX**. If fields don't show up correctly, click **Re-scan fields**.

## Add fields

1. Switch to **Create**.
2. Pick a field type (**Text**, **Checkbox**, **Dropdown**, **List box**, **Radio**, **Button** or **Signature**), then draw it on the page. Press **Esc** to stop drawing.
3. Click **Add *n* field(s) to PDF**.

A **Signature** field is only a placeholder that marks where a signature belongs. To sign, use [Sign](../Security/Sign.md) or [Certificate signing](../Security/Certificate-Signing.md).

## Edit fields

In **Modify**, select a field to change its properties, drag it to a new position, or delete it. Click **Save *n* change(s)** when you're done.

## Detect fields automatically

**Auto Form Detection** finds text fields, checkboxes and signature areas in a flat PDF and makes them fillable.

1. In **Auto Form Detection**, choose a **Detection sensitivity**: **Strict**, **Balanced** (recommended) or **Thorough**.
2. Click **Detect form fields** and review the result. If nothing is found, undo, switch to **Thorough** and run it again.

If **Auto Form Detection** is greyed out, the server has no detection model or it was turned off. The ultra-lite image and the JAR downloads can't run it at all. See [Tools that are off by default](../../Server/Customisation/Features-and-Endpoints.md#tools-that-are-off-by-default) for the admin steps.

To lock or unlock form fields, use **Flatten** or **Unlock PDF Forms** ([Signing and security tools](../Security/Security.md)).
