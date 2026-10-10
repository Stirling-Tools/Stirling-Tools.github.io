---
sidebar_position: 3
title: Telegram bot
sidebar_label: Telegram bot
description: Let people send PDFs to a Telegram bot that runs them through a saved pipeline on your server and sends the result back.
---

# Telegram bot

Run a Telegram bot that takes PDFs from chats, processes them with a pipeline JSON on your server, and sends the result back. It works on every licence tier.

:::warning Community feature
Community-built beta, not covered by Team or Enterprise support; settings may change.
:::

The bot saves each file into a [watched folder](../Storage/Folder-Scanning.md), where the pipeline JSON in that folder processes it. It only makes outbound HTTPS calls to `api.telegram.org`, so you don't need to open a port or set up a webhook.

## 1. Create the bot

1. In Telegram, open [@BotFather](https://t.me/BotFather) and send `/newbot`.
2. Pick a display name and a username ending in `bot`.
3. Copy the token BotFather returns.

To use the bot in groups, also send `/setprivacy` to BotFather, select your bot and choose **Disable**. Otherwise the bot only sees commands and mentions in groups.

## 2. Configure Stirling PDF

Open **Settings → Server → Integrations → Telegram Bot**, or edit the `telegram` block that is already in `settings.yml`:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    telegram:
      enabled: true
      botToken: "your-token-from-botfather"
      botUsername: "your_bot_username"
      customFolderSuffix: true       # one inbox folder per chat
      allowUserIDs: [123456789]      # only these users may use the bot
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    TELEGRAM_ENABLED=true
    TELEGRAM_BOTTOKEN=your-token-from-botfather
    TELEGRAM_BOTUSERNAME=your_bot_username
    TELEGRAM_CUSTOMFOLDERSUFFIX=true
    TELEGRAM_ALLOWUSERIDS=123456789
    ```
  </TabItem>
</Tabs>

Restart Stirling PDF after changing these settings.

## 3. Add a pipeline JSON

The bot does nothing until the chat's inbox folder contains at least one `.json` pipeline file.

- The inbox is `/pipeline/watchedFolders/telegram/`. With `customFolderSuffix: true`, each chat gets its own subfolder named after its chat ID.
- The subfolder is created the first time a chat sends the bot a PDF. Send one (the bot replies that no JSON configuration file was found), then look for the new folder. [@userinfobot](https://t.me/userinfobot) also tells you your user ID.
- Build the workflow in the [Automate](../../Tools/Guides/Automate.md) tool, select **Export for Folder Scanning**, and put the downloaded file in the folder. Any `.json` filename works.

## 4. Send a PDF

Send the bot a PDF. It acknowledges the file, runs the pipeline and replies with the result. `/start` returns a welcome message.

- Only `application/pdf` files are accepted, up to 20 MB (a Telegram bot limit).
- If the pipeline produces several files, each arrives as a separate message.

## Access control

| Chat type | Who is allowed |
|---|---|
| Private chats | Users listed in `allowUserIDs`. An empty list allows everyone. |
| Channels | Channels listed in `allowChannelIDs`. An empty list allows every channel. |
| Groups and supergroups | Always allowed. To keep the bot out of groups, send BotFather `/setjoingroups` and choose **Disable**. |

`enableAllowUserIDs` and `enableAllowChannelIDs` are on by default but only take effect once their list has at least one ID. On a shared server, always fill in at least one list.

To post in a channel, add the bot as a channel admin with permission to post messages.

## Settings reference

All keys sit under `telegram`.

| Key | Default | Purpose |
|---|---|---|
| `enabled` | `false` | Turn the bot on. |
| `botToken` | empty | Token from BotFather. |
| `botUsername` | empty | Bot username, without `@`. |
| `pipelineInboxFolder` | `telegram` | Inbox subfolder under `/pipeline/watchedFolders/`. |
| `customFolderSuffix` | `true` | Give each chat its own subfolder, named after its chat ID. |
| `enableAllowUserIDs` | `true` | Apply `allowUserIDs` to private chats. |
| `allowUserIDs` | `[]` | Allowed Telegram user IDs. |
| `enableAllowChannelIDs` | `true` | Apply `allowChannelIDs` to channels. |
| `allowChannelIDs` | `[]` | Allowed channel IDs, usually negative, such as `-1001234567890`. |
| `processingTimeoutSeconds` | `180` | How long to wait for a pipeline result. |
| `pollingIntervalMillis` | `2000` | How often to check for a result. |
| `feedback.user.*`, `feedback.channel.*` | all `true` | Status replies in private chats and channels: `noValidDocument`, `errorProcessing`, `errorMessage`, `processing`. Set to `false` to cut noise. |
