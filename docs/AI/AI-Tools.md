---
sidebar_position: 6
id: AI Tools
title: AI Tools
description: What each AI capability does, where to find it, and how to switch individual ones off
tags: [AI, Self-host, Tools, Configuration]
---

# AI Tools

Every capability needs `aiEngine.enabled: true` and a reachable AI engine. All feature switches default to `true` and changes require a restart.

## Capabilities

| Capability | What it does and where | Switch under `aiEngine.features` | Environment variable |
|---|---|---|---|
| Chat assistant | Answers questions about attached PDFs and plans and runs edits and conversions. Floating button, bottom-right of the workbench | `chat` and `documentQuestions` | `AIENGINE_FEATURES_CHAT`, `AIENGINE_FEATURES_DOCUMENTQUESTIONS` |
| Maths and figure auditing | Checks arithmetic, table totals and cross-page figures, then reports discrepancies. Ask the assistant. Tolerance defaults to `0.01` | `mathAuditor` | `AIENGINE_FEATURES_MATHAUDITOR` |
| Review comments | Returns your PDF with sticky-note comments applied. Ask the assistant; the instruction is capped at 4000 characters | `pdfComment` | `AIENGINE_FEATURES_PDFCOMMENT` |
| Document creation | Produces a new PDF from a description, with no input file. Ask the assistant | `createPdf` | `AIENGINE_FEATURES_CREATEPDF` |
| Document classification | Labels uploaded files with up to 5 labels, written to metadata key `StirlingPDFClassification`. Runs automatically on upload; labels appear on the file card | `classify` | `AIENGINE_FEATURES_CLASSIFY` |

- **Clear chat**, in the chat panel header menu, is the only way to cancel a run in progress. There is no Stop button.
- Document creation needs WeasyPrint on the Stirling PDF server; set `system.customPaths.operations.weasyprint` if it is not at `/opt/venv/bin/weasyprint`.
- Conversation stops only when both `chat` and `documentQuestions` are `false`.
- A switched-off capability still appears in the interface and returns HTTP 503 when used. Only `aiEngine.enabled: false` removes the AI interface, and none of these switches apply to MCP clients.
- Do not set `classify: false` while the engine is enabled - it breaks classification entirely. Use `aiEngine.enabled: false` for the non-AI classification path, or disable the **Classification Policy** at [Processor -> Policies](../Processor/Policies.md) to stop classification altogether.

## Turning a capability off

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      features:
        createPdf: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    AIENGINE_FEATURES_CREATEPDF=false
    ```
  </TabItem>
</Tabs>

## Related Documentation

- **[AI Overview](./AI-Overview.md)** - what the AI engine is and how to turn it on
- **[Self-Hosting the AI Engine](./Self-Hosting-the-AI-Engine.md)** - running the engine alongside Stirling PDF
- **[AI Settings Reference](./AI-Settings-Reference.md)** - every `aiEngine` key and its default
