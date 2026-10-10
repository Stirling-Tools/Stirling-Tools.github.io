---
sidebar_position: 0
title: Upgrading from V1
description: Back up, upgrade and check a self-hosted server moving from Stirling PDF V1 to V2 or later, and roll back if you need to.
sidebar_label: Overview
---

# Upgrading from V1

V2 replaced the V1 web interface with a new app. Settings, users, API keys and the database carry over, but the database is upgraded in place, so back up first. These steps take a V1 server straight to the current release.

## Before you upgrade

1. Read [Breaking changes](./Breaking-Changes.md), especially if you customised the UI, disabled tools by ID, use SAML or run the JAR.
2. Write down the exact V1 image tag or JAR version you run now, in case you need to roll back.
3. Stop the server and back up:
   - the `configs` folder, which holds `settings.yml`, `custom_settings.yml`, the built-in database and any licence file
   - `customFiles`, `pipeline` and any extra OCR language files
   - your external database, with its own backup tool

   ```bash
   # Bind mount
   cp -a ./configs ./configs-v1-backup
   # Named volume or no mount
   docker cp stirling-pdf:/configs ./configs-v1-backup
   ```

4. If you can, try the upgrade on a copy of this data first.

## Upgrade

### Docker

Point your compose file at the current image, keeping your volumes and environment variables:

```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
```

```bash
docker compose pull
docker compose up -d
```

Use `latest-fat` or `latest-ultra-lite` if that's the variant you ran, or pin a version tag. See [Install with Docker](../Install/Docker.md).

### JAR

1. Install Java 25. V1 ran on Java 17.
2. Stop the V1 server.
3. Download the new JAR from [GitHub Releases](https://github.com/Stirling-Tools/Stirling-PDF/releases): `Stirling-PDF-with-login.jar` if you use login, otherwise `Stirling-PDF.jar`.
4. Replace the old JAR and start it from the same folder, so it finds `configs/`.

See [Install with Java (JAR)](../Install/JAR.md).

## What happens on first start

- `settings.yml` is rewritten in the current format. Your values are kept, new settings get defaults and removed ones are dropped. See [Settings changes](./Settings-Changes.md).
- The database is upgraded in place.
- The free user limit becomes 5 or your current number of users, whichever is higher. It can't change after that.
- Existing single sign-on users can keep using SAML without an Enterprise licence.
- Everyone has to sign in again once.

## After upgrading

Check that:

- admins and users can sign in, including through SSO
- **Settings → Workspace → Usage & Billing** shows the plan and user limit you expect
- tools you disabled are still disabled (see [Settings changes](./Settings-Changes.md#removed-and-renamed-settings) if one came back)
- your API integrations and any branding still work

Admins can now change most settings in the app under **Settings** instead of editing `settings.yml`. See [Configuration](../Configuration.md).

## Roll back

1. Stop the server.
2. Move the upgraded config aside and restore your backup:

   ```bash
   mv ./configs ./configs-after-upgrade
   cp -a ./configs-v1-backup ./configs
   ```

3. If you use an external database, restore its pre-upgrade backup.
4. Start the V1 image tag or JAR you noted before upgrading.

Don't point V1 at a database that V2 has already upgraded. Always restore the backup.
