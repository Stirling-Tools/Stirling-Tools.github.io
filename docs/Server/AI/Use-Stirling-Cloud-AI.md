---
sidebar_position: 2
title: Use Stirling Cloud AI from your server
description: 'Link your self-hosted server to Stirling Cloud so its AI features run there, with no engine to host and no provider keys.'
sidebar_label: Use Stirling Cloud AI
---

# Use Stirling Cloud AI from your server

:::note
Using Stirling Cloud in the browser or the desktop app? AI is already included there, with nothing to set up. See [AI assistant](../../Tools/Guides/AI-Assistant.md).
:::

## Before you start

- Link this server to a Stirling account; see [Connect to Stirling Cloud](../Licensing/Connect-to-Stirling-Cloud.md). Only the organization owner can link a server. Until it is linked, the option shows **Link an account first**.
- Make sure the server can reach Stirling Cloud over the internet.
- Enable login and sign in as an administrator.

## Turn it on

1. Open **Settings → Server → AI Engine**.
2. Under **Connection**, select **Use Stirling Cloud AI**.
3. Choose whether to turn on **Let Stirling Cloud keep indexed documents**; see [Document questions](#document-questions).
4. Select **Save Changes**, then **Restart Now**.

**Status** then shows **Running on Stirling Cloud**.

To set it in configuration instead:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    aiEngine:
      enabled: true
      mode: CLOUD
      cloudDocumentIndexing: true
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    AIENGINE_ENABLED=true
    AIENGINE_MODE=CLOUD
    AIENGINE_CLOUDDOCUMENTINDEXING=true
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          AIENGINE_ENABLED: "true"
          AIENGINE_MODE: CLOUD
          AIENGINE_CLOUDDOCUMENTINDEXING: "true"
    ```
  </TabItem>
</Tabs>

## Document questions

Your PDF files stay on your server. Each AI tool sends Stirling Cloud only the page text it needs.

**Let Stirling Cloud keep indexed documents** (off by default) lets Stirling Cloud also store that text, indexed, so later questions can search across a document. Stored text is deleted when the user signs out, or after the web sign-in lifetime (`security.jwt.tokenExpiryMinutes`, 24 hours by default). With it off, no text is stored and document questions are unavailable.

## What changes in this mode

- **Models & Providers** and **Documents & RAG** show **Managed by Stirling Cloud**. Your model, document and limit settings are not used.
- **Capabilities** still apply; see [Turn capabilities on or off](./AI.md#turn-capabilities-on-or-off).
- Processor [Ingestion](../../Processor/Policies/Ingestion.md) can't prepare searchable chunks through Stirling Cloud. That step needs [your own engine](./Run-the-AI-Engine.md).
- AI usage counts against the linked account's processing allowance; see [Connect to Stirling Cloud](../Licensing/Connect-to-Stirling-Cloud.md).
- For what Stirling Cloud receives, see [Where document content goes](./AI-Security.md#where-document-content-goes).

If **Status** shows **Stirling Cloud unreachable**, check the account link and that the server can reach the internet. **Stirling Cloud is refusing this server** means the account link may have been revoked; reconnect the server.

To stop using Stirling Cloud AI, choose **Off** or **Run your own engine**, then save and restart.
