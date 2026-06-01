---
sidebar_position: 15
id: Telegram Bot
title: Telegram Bot Integration
description: Process PDFs through a Telegram bot powered by Stirling PDF pipelines
---

# Telegram Bot Integration

Stirling PDF can run a Telegram bot that accepts PDF files from chats and returns processed results using your saved [Automate / Pipeline](./Pipeline.md) configurations. Send a PDF to the bot, get a processed PDF back.

Available since version 2.2.x. Free on all license tiers (Free, Server, and Enterprise).

---

## How it works

1. A user (or channel/group) sends a PDF file to your Telegram bot.
2. The bot saves the file into a watched pipeline inbox folder.
3. The standard pipeline directory scanner (runs every 60 seconds) processes the file using the JSON pipeline you placed in that folder.
4. The output is dropped into `/pipeline/finishedFolders/`.
5. The bot polls that folder, matches results to the original upload, and sends them back to the chat.

The bot uses **long-polling** to talk to Telegram's API. You do not need to open any inbound port or set up a webhook - only outbound HTTPS to `api.telegram.org`.

---

## Setup overview

1. Create the bot in Telegram and get a bot token.
2. Add the Telegram config block to Stirling PDF.
3. Drop a pipeline JSON into the inbox folder.
4. Send a PDF to the bot and confirm it comes back processed.

Each step is covered below.

---

## 1. Create the bot in Telegram

1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send `/newbot`.
3. Pick a display name (e.g. "My Stirling PDF Bot") and a username ending in `bot` (e.g. `mycompany_stirling_bot`).
4. Copy the token BotFather returns - it looks like `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`.

**If you plan to add the bot to groups:** also send `/setprivacy`, select your bot, choose **Disable**. With privacy mode enabled (the default), the bot only sees commands and direct mentions in groups - it would miss most file uploads.

---

## 2. Configure Stirling PDF

Add the `telegram:` block to your `settings.yml` (or set the equivalent environment variables) and restart.

### Minimal config

```yaml
telegram:
  enabled: true
  botToken: "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
  botUsername: "mycompany_stirling_bot"
```

### Recommended config

```yaml
telegram:
  enabled: true
  botToken: "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
  botUsername: "mycompany_stirling_bot"
  pipelineInboxFolder: telegram      # subfolder under /pipeline/watchedFolders/
  customFolderSuffix: true           # one inbox per chatId (recommended)

  # Restrict who can use the bot
  enableAllowUserIDs: true
  allowUserIDs: [123456789]
  enableAllowChannelIDs: false
  allowChannelIDs: []

  # Timing
  processingTimeoutSeconds: 180      # wait at most 3 minutes per upload
  pollingIntervalMillis: 2000        # check finishedFolders every 2 seconds

  feedback:
    user:
      noValidDocument: true
      errorMessage: true
      errorProcessing: true
      processing: true
    channel:
      noValidDocument: false
      errorMessage: false
      errorProcessing: false
      processing: false
```

Confirm the bot started by checking the logs for the line:

```
Telegram pipeline bot registered as <yourBotUsername>
```

If you see `Telegram bot disabled because botToken or botUsername is not configured`, the token or username is missing or empty.

If you see `Failed to register Telegram bot`, the token is wrong or the network can't reach `api.telegram.org`.

### Admin UI

If you have login enabled, you can also configure the bot from **Admin Settings → Connections → Telegram Bot**. Changes saved through the UI hot-apply.

---

## 3. Drop a pipeline JSON into the inbox

The bot will refuse to process uploads until at least one `.json` pipeline file exists in the inbox folder for that chat.

Default inbox path: `/pipeline/watchedFolders/telegram/` (inside the container, or relative to the installation root if you're running the JAR directly - typically `/opt/Stirling-PDF/pipeline/watchedFolders/telegram/` on bare metal).

With `customFolderSuffix: true` (recommended), each chat gets its own subfolder named after the Telegram chat ID:

```
/pipeline/watchedFolders/telegram/123456789/      # private chat with user 123456789
/pipeline/watchedFolders/telegram/-1001234567890/ # channel
```

### How to get a chat ID

The folder is created automatically the first time a chat sends a message to the bot. The easiest bootstrap is:

1. Send any message from the chat to the bot.
2. Check the logs for a line like `Saved Telegram file ... to /pipeline/watchedFolders/telegram/<chatId>/...`.
3. That `<chatId>` is what you use.

Alternative: chat with [@userinfobot](https://t.me/userinfobot) which echoes your user ID.

### Build the pipeline JSON

Open the **Automate** tool in Stirling PDF, build the workflow you want (e.g. OCR + compress + watermark), then click **Export for Folder Scanning** to download the JSON.

Drop the file into the chat's inbox folder. The filename does not matter - any `.json` file is picked up.

See [Pipeline Automation](./Pipeline.md) for the full pipeline JSON reference.

---

## 4. Use the bot

In Telegram, send the bot:

- `/start` (private chat only - the welcome reply fires only for direct text messages, not in channels or groups) - bot replies with a welcome message.
- A PDF file - bot acknowledges with "processing..." (if enabled), processes via the pipeline, and sends the result back. Typical end-to-end time is 1-3 minutes (pipeline scanner runs every 60 seconds plus your pipeline's runtime).

Only files with MIME type `application/pdf` are accepted. Any other attachment type triggers a "no valid file found" reply.

Each saved upload gets a UUID suffix appended to its base name to prevent collisions between concurrent uploads. The bot matches output files by this unique base name when looking in `/pipeline/finishedFolders/`.

---

## Configuration reference

All options live under the top-level `telegram:` block. Environment variables follow Spring Boot's relaxed-binding convention: dots become underscores, camelCase joins stay glued.

:::note Java defaults vs bundled `settings.yml.template`
Three flags (`customFolderSuffix`, `enableAllowUserIDs`, `enableAllowChannelIDs`) default to `false` in the Java code but ship as `true` in the bundled `settings.yml.template`. Fresh installs use the template values (more restrictive). If you migrate `settings.yml` from a different source or rely purely on env vars, you'll see the Java defaults instead.
:::

| YAML key | Env var | Type | Default | Purpose |
|---|---|---|---|---|
| `telegram.enabled` | `TELEGRAM_ENABLED` | boolean | `false` | Master toggle. Bot is only loaded when `true`. |
| `telegram.botToken` | `TELEGRAM_BOTTOKEN` | string | `""` | BotFather token. Excluded from logs. |
| `telegram.botUsername` | `TELEGRAM_BOTUSERNAME` | string | `""` | Bot username from BotFather, without the `@`. |
| `telegram.pipelineInboxFolder` | `TELEGRAM_PIPELINEINBOXFOLDER` | string | `"telegram"` | Subfolder name under `/pipeline/watchedFolders/`. |
| `telegram.customFolderSuffix` | `TELEGRAM_CUSTOMFOLDERSUFFIX` | boolean | `false` (Java) / `true` (template) | When true, appends the Telegram chat ID as a subdirectory so each chat has its own inbox. |
| `telegram.enableAllowUserIDs` | `TELEGRAM_ENABLEALLOWUSERIDS` | boolean | `false` (Java) / `true` (template) | Turn on user ID allowlist (for private chats). |
| `telegram.allowUserIDs` | `TELEGRAM_ALLOWUSERIDS` | list of long | `[]` | Allowed user IDs. Empty list + toggle on = allow all (logs a warning). |
| `telegram.enableAllowChannelIDs` | `TELEGRAM_ENABLEALLOWCHANNELIDS` | boolean | `false` (Java) / `true` (template) | Turn on channel ID allowlist. |
| `telegram.allowChannelIDs` | `TELEGRAM_ALLOWCHANNELIDS` | list of long | `[]` | Allowed channel IDs (typically negative, e.g. `-1001234567890`). |
| `telegram.processingTimeoutSeconds` | `TELEGRAM_PROCESSINGTIMEOUTSECONDS` | long | `180` | Max wait time for pipeline output before giving up. |
| `telegram.pollingIntervalMillis` | `TELEGRAM_POLLINGINTERVALMILLIS` | long | `2000` | How often the bot checks `finishedFolders/` for results. |
| `telegram.feedback.user.noValidDocument` | `TELEGRAM_FEEDBACK_USER_NOVALIDDOCUMENT` | boolean | `true` | Reply when a private-chat message has no valid PDF. |
| `telegram.feedback.user.errorMessage` | `TELEGRAM_FEEDBACK_USER_ERRORMESSAGE` | boolean | `true` | Reply on generic / auth errors in private chats. |
| `telegram.feedback.user.errorProcessing` | `TELEGRAM_FEEDBACK_USER_ERRORPROCESSING` | boolean | `true` | Reply on pipeline errors in private chats. |
| `telegram.feedback.user.processing` | `TELEGRAM_FEEDBACK_USER_PROCESSING` | boolean | `true` | Show "processing..." in private chats. |
| `telegram.feedback.channel.noValidDocument` | `TELEGRAM_FEEDBACK_CHANNEL_NOVALIDDOCUMENT` | boolean | `true` | Same as above but for channels. |
| `telegram.feedback.channel.errorMessage` | `TELEGRAM_FEEDBACK_CHANNEL_ERRORMESSAGE` | boolean | `true` | Same for channels. |
| `telegram.feedback.channel.errorProcessing` | `TELEGRAM_FEEDBACK_CHANNEL_ERRORPROCESSING` | boolean | `true` | Same for channels. |
| `telegram.feedback.channel.processing` | `TELEGRAM_FEEDBACK_CHANNEL_PROCESSING` | boolean | `true` | Same for channels. |

---

## Access control

Stirling PDF treats different chat types differently:

- **Private chats** (1-on-1 with a user): controlled by `enableAllowUserIDs` + `allowUserIDs`. If the toggle is on but the list is empty, all users are allowed (with a warning in logs).
- **Channels**: controlled by `enableAllowChannelIDs` + `allowChannelIDs`. Same empty-list-with-toggle behaviour.
- **Groups and supergroups**: **always allowed**. The allowlist does not apply to groups. To restrict group access, either don't add the bot to groups, or use BotFather's `/setjoingroups → Disable` so it can't be invited.

If both `enableAllowUserIDs` and `enableAllowChannelIDs` are `false` (the defaults), the bot accepts files from anyone in any chat type. Always enable at least one restriction for production deployments.

---

## Limitations

- **Telegram upload limit**: 20 MB per file via the bot API. Larger PDFs cannot be sent to the bot.
- **One JSON per chat**: with `customFolderSuffix: true`, you need a pipeline JSON in each chat's subfolder. The chat's folder is created lazily on first message - bootstrap by sending one message, then drop the JSON.
- **Output messaging is per-file**: if your pipeline emits N files, the user gets N separate Telegram messages. No automatic zipping.
- **Single-threaded polling**: the underlying Telegram library processes updates sequentially per long-poll batch.
- **Pipeline scanner is global**: outputs from all chats land in the same `/pipeline/finishedFolders/`. The bot matches outputs back to the original upload using the upload's UUID-suffixed base name, so cross-chat collisions are extremely unlikely - but if you have other folder-scanning workflows writing into `finishedFolders` simultaneously, use `customFolderSuffix: true` and unique pipeline names per chat for safer isolation.
- **`processingTimeoutSeconds` is wall-clock**: because the pipeline scanner ticks every 60 seconds, keep the timeout at 90 seconds or more so there's at least one scan + processing cycle in the window.

---

## Debugging

Increase log verbosity for the bot's package:

```yaml
logging:
  level:
    stirling.software.SPDF.service.telegram: DEBUG
```

Common log lines:

- `Telegram pipeline bot registered as <username>` - bot started successfully.
- `Telegram bot disabled because botToken or botUsername is not configured` - config is incomplete.
- `Failed to register Telegram bot` - token is wrong or network can't reach Telegram.
- `Saved Telegram file <name> to <path>` - upload was accepted; this line reveals the chat ID.
- `Rejecting user <id> in private chat <chatId>` / `Rejecting channel ...` - allowlist blocked the request.
- `No results were found in the pipeline output folder. Check configuration.` - pipeline didn't produce matching output within `processingTimeoutSeconds`. Likely causes: no JSON file in the inbox, JSON has an error, or the pipeline took longer than the timeout.
- `No JSON configuration file found in the pipeline inbox folder. Please contact the administrator.` - the user-facing reply when there's no `.json` in the chat's inbox folder. Drop a pipeline JSON there to fix.

---

## Recommended deployment patterns

### One user, one machine

Use private-chat allowlist with a single user ID. Single pipeline JSON in `/pipeline/watchedFolders/telegram/<yourChatId>/`.

### Team-shared inbox

Create a Telegram group, add the bot, disable bot privacy mode in BotFather. Drop a pipeline JSON in `/pipeline/watchedFolders/telegram/<groupChatId>/`. Optionally set `customFolderSuffix: false` and use a single shared inbox at `/pipeline/watchedFolders/telegram/`.

### Per-user pipelines

Enable `customFolderSuffix: true`. Provision each user's chat ID with its own pipeline JSON. Each user gets a workflow tailored to them.

### Public channel announcements

Add the bot to a channel as an admin with "Post Messages" permission. Set `enableAllowChannelIDs: true` and add the channel ID. Useful for "drop a PDF into #archive, get a sanitized archival copy posted back".

---

## Related Documentation

- **[Pipeline Automation](./Pipeline.md)** - Build the pipeline JSONs the bot uses
- **[Folder Scanning](./FolderScanning.md)** - The underlying processing engine the bot relies on
- **[API Documentation](../API.md)** - Trigger pipelines directly without Telegram
