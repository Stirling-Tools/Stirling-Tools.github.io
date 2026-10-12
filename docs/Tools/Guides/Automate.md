---
title: Automate
sidebar_label: Automate
sidebar_position: 20
description: Save a chain of tools as an automation and run it on any files, then export or import it as JSON.
---

# Automate

**Automate** saves a sequence of tools with their settings, so you can run the same steps on any files in one go. Open it from **Automate** in the left rail, or from the tool picker under **Automation**.

## Create an automation

1. Open **Automate** and click **Create New Automation**.
2. Enter an **Automation Name**. You can also add a description and choose an **Icon**.
3. Click **Add Tool** and choose a tool in **Select a tool...**. Click its **Configure tool** button, set the options and click **Save Configuration**.
4. Repeat for each step. Tools run in the order you add them, and you can use the same tool more than once. A tool you haven't set up shows **! Not Configured**.
5. Click **Save Automation**. It stays disabled until the automation has a name and every tool is configured.

Your automation now appears under **Saved**. **Suggested** has ready-made automations, such as **Email Preparation** and **Pre-publish Sanitization**. Run one as it is, or choose **Copy to Saved** from its menu to change it.

Interactive tools, such as PDF Text Editor, Sign, Annotate and Compare, can't be added to an automation.

## Run an automation

Before you start: in the desktop app, sign in to Stirling Cloud or a self-hosted server. On Stirling Cloud, each run uses your team's credits ([Plans, credits and billing](../../Cloud/Plans-and-Billing.md)).

1. Add the files to your workspace.
2. In **Automate**, click the automation.
3. Click **Run Automation**. Each step shows its progress.
4. Review the files under **Automation Results**, then click **Finish**.

## Edit, export or import

Open the menu on a saved automation to **Edit**, **Delete** or export it:

- **Export** downloads `<name>.automate.json`, which you can import into Stirling PDF elsewhere.
- **Export for Folder Scanning** downloads `<name>.folder-scan.json` for folder scanning on a self-hosted server ([Folder scanning](../../Server/Storage/Folder-Scanning.md)) and for the [Pipeline API](../../Developers/Pipeline-API.md).

Saved automations are kept in this browser. Export them to move them to another browser or computer.

To import, open the menu on **Create New Automation** and choose **Import**. Drop a JSON file or paste its contents, then click **Import**. Both export formats work. If an operation in the file can't be matched to a tool, it's listed as **Unmapped**.
