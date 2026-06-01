---
sidebar_position: 15
id: Telegram Bot
title: Telegram Bot Integration
description: Process PDFs through a Telegram bot powered by Stirling PDF pipelines
---

# Telegram Bot Integration

Stirling PDF can run a Telegram bot that accepts PDF files from chats and returns processed results using your saved [Automate / Pipeline](./Pipeline.md) configurations. Send a PDF to the bot, get a processed PDF back.

Free on all license tiers.

:::warning Community feature - not recommended for Enterprise use
The Telegram bot integration is a **community-built feature** in **beta**. It is not built, tested, or supported by Stirling Tools and is not covered by the Server / Enterprise support SLA. **We do not recommend it for Enterprise or production-critical deployments.** Raise issues on GitHub or in the community Discord. Behaviour and config keys may change in future releases.
:::

---

## How it works

1. A user, channel, or group sends a PDF file to your Telegram bot.
2. The bot saves the file into a watched pipeline inbox folder.
3. Stirling PDF processes the file using the pipeline JSON in that folder (see [Folder Scanning](./FolderScanning.md)).
4. The bot sends the result back to the chat.

The bot talks to Telegram outbound only - no inbound port or webhook setup required, just outbound HTTPS to `api.telegram.org`.

---

## Setup overview

1. Create the bot in Telegram and get a bot token.
2. Set your token and username in Stirling PDF.
3. Drop a pipeline JSON into the inbox folder.
4. Send a PDF to the bot.

---

## 1. Create the bot in Telegram

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send `/newbot`.
3. Pick a display name and a username ending in `bot`.
4. Copy the token BotFather returns.

**If you plan to add the bot to groups:** also send `/setprivacy`, select your bot, choose **Disable**. With privacy mode on (the default), the bot only sees commands and direct mentions in groups.

---

## 2. Configure Stirling PDF

The `telegram:` block is already present in the shipped `settings.yml` - find it and update the values (set `enabled: true`, fill in `botToken` and `botUsername`), or set the equivalent environment variables. Restart Stirling PDF after saving via file edits; the Admin UI hot-applies.

### Minimal config

```yaml
telegram:
  enabled: true
  botToken: "your-token-from-botfather"
  botUsername: "your_bot_username"
```

### Recommended config

```yaml
telegram:
  enabled: true
  botToken: "your-token-from-botfather"
  botUsername: "your_bot_username"
  customFolderSuffix: true       # one inbox per chat
  enableAllowUserIDs: true       # restrict to known users
  allowUserIDs: [123456789]
  processingTimeoutSeconds: 180  # max time to wait for a result
```

### Admin UI

If you have login enabled, configure the bot from **Admin Settings → Connections → Telegram Bot**. Changes saved through the UI apply without a restart.

---

## 3. Drop a pipeline JSON into the inbox

The bot will not process uploads until at least one `.json` pipeline file exists in the chat's inbox folder.

Default inbox path: `/pipeline/watchedFolders/telegram/`. With `customFolderSuffix: true` (recommended), each chat gets its own subfolder named after its Telegram chat ID.

### How to get a chat ID

The folder is created the first time a chat messages the bot. Easiest bootstrap:

1. Send any message from the chat to the bot.
2. Look at the new subfolder name under `/pipeline/watchedFolders/telegram/`.
3. That subfolder name is the chat ID.

Or chat with [@userinfobot](https://t.me/userinfobot) which echoes your user ID.

### Build the pipeline JSON

Open the **Automate** tool, build the workflow you want, then click **Export for Folder Scanning** to download the JSON. Drop the file into the chat's inbox folder. The filename does not matter - any `.json` is picked up.

See [Pipeline Automation](./Pipeline.md) for details.

---

## 4. Use the bot

In Telegram, send the bot a PDF. The bot acknowledges, processes it via the pipeline, and sends the result back. Typical end-to-end time is 1-3 minutes (depending on what the pipeline does).

Only files with MIME type `application/pdf` are accepted.

`/start` in a private chat returns a welcome message.

---

## Configuration reference

All options live under the top-level `telegram:` block. Environment variables use the `TELEGRAM_*` form (Spring Boot relaxed binding: dots become underscores, camelCase joins stay glued).

| YAML key | Default | Purpose |
|---|---|---|
| `enabled` | `false` | Master toggle. |
| `botToken` | empty | BotFather token. |
| `botUsername` | empty | Bot username, without the `@`. |
| `pipelineInboxFolder` | `"telegram"` | Subfolder name under `/pipeline/watchedFolders/`. |
| `customFolderSuffix` | `true` | Appends the chat ID as a subdirectory so each chat has its own inbox. |
| `enableAllowUserIDs` | `true` | Turn on user ID allowlist (for private chats). |
| `allowUserIDs` | `[]` | Allowed user IDs. |
| `enableAllowChannelIDs` | `true` | Turn on channel ID allowlist. |
| `allowChannelIDs` | `[]` | Allowed channel IDs (typically negative, e.g. `-1001234567890`). |
| `processingTimeoutSeconds` | `180` | Max wait for a pipeline result. Keep ≥ 90s. |
| `pollingIntervalMillis` | `2000` | How often to check for results. |
| `feedback.user.*` | all `true` | Per-message-type replies in private chats (`noValidDocument`, `errorMessage`, `errorProcessing`, `processing`). |
| `feedback.channel.*` | all `true` | Same for channels. |

---

## Access control

- **Private chats**: controlled by `enableAllowUserIDs` + `allowUserIDs`.
- **Channels**: controlled by `enableAllowChannelIDs` + `allowChannelIDs`.
- **Groups and supergroups**: **always allowed** - the allowlist does not apply. To restrict group access, either don't add the bot to groups, or use BotFather's `/setjoingroups → Disable` so it can't be invited.

For production deployments, always enable the user or channel allowlist.

---

## Limitations

- **20 MB upload limit** (a Telegram bot API constraint, not Stirling).
- **One JSON per chat folder** when `customFolderSuffix: true`. Create the folder by messaging the bot first, then drop the JSON in.
- **Output is sent file-by-file** - if your pipeline emits N files, the user gets N Telegram messages, no zipping.

---

## Recommended deployment patterns

- **Personal use**: private-chat allowlist with your own user ID. Single pipeline JSON in your chat's subfolder.
- **Team-shared inbox**: a Telegram group, with the bot's privacy mode disabled in BotFather. One pipeline JSON for the group.
- **Per-user pipelines**: `customFolderSuffix: true` plus a tailored pipeline JSON per chat ID.
- **Channel posting**: add the bot as a channel admin with "Post Messages" permission, restrict via `allowChannelIDs`.

---

## Related Documentation

- **[Pipeline Automation](./Pipeline.md)** - Build the pipeline JSONs the bot uses
- **[Folder Scanning](./FolderScanning.md)** - The processing engine the bot relies on
- **[API Documentation](../API.md)** - Trigger pipelines without Telegram
