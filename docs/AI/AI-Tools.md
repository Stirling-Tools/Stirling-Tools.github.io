---
sidebar_position: 6
id: AI Tools
title: AI Tools
description: What each AI capability does, where to find it, and how to switch individual ones off
tags: [AI, Self-host, Tools, Configuration]
---

# AI Tools

AI tools are available once AI is turned on, with [your own engine](./Self-Hosting-the-AI-Engine.md) or [Stirling Cloud AI](./Stirling-Cloud-AI.md).

## Capabilities

| Capability | Where to use it | Setting under `aiEngine.features` |
|---|---|---|
| Chat and document questions | Open the assistant in the workbench to ask about attached PDFs or request edits. | `chat`, `documentQuestions` |
| Maths auditing | Ask the assistant to check calculations and figures. | `mathAuditor` |
| Review comments | Ask the assistant to add comments to a PDF. | `pdfComment` |
| Document creation | Ask the assistant to create a PDF from a description. | `createPdf` |
| Classification | Label uploaded documents or use the Processor's Classification template. | `classify` |

Document creation requires WeasyPrint on the Stirling PDF server. If it is installed somewhere other than `/opt/venv/bin/weasyprint`, set its location:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      customPaths:
        operations:
          weasyprint: /usr/local/bin/weasyprint
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    SYSTEM_CUSTOMPATHS_OPERATIONS_WEASYPRINT=/usr/local/bin/weasyprint
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          SYSTEM_CUSTOMPATHS_OPERATIONS_WEASYPRINT: /usr/local/bin/weasyprint
    ```
  </TabItem>
</Tabs>

## Disable a capability

All feature switches default to `true`. Turn one off under **Capabilities** in **Settings → AI → AI Engine**, or set it to `false` and restart Stirling PDF. For example, to turn off document creation:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      features:
        createPdf: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variables">
    ```bash
    AIENGINE_FEATURES_CREATEPDF=false
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          AIENGINE_FEATURES_CREATEPDF: "false"
    ```
  </TabItem>
</Tabs>

To disable conversation entirely, set both `chat` and `documentQuestions` to `false`.

Server-side classification pipelines require `classify` to remain enabled. Use [property-based routing](../Processor/Policies/Routing.md) for workflows without AI classification.

See [AI Settings Reference](./AI-Settings-Reference.md) for the complete settings list and [MCP Server](../Configuration/Automation/MCP-Server.md#ai-capabilities) to control AI tools exposed over MCP.
