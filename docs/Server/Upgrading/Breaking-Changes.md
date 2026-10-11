---
sidebar_position: 1
title: Breaking changes
description: Changes since V1 that can break a self-hosted setup, and what to do about each one.
sidebar_label: Breaking changes
---

# Breaking changes

Most servers only need the backup and upgrade steps in [Upgrading from V1](./Upgrading.md).

## New web interface

V1 built its pages on the server from templates in `customFiles/templates/`. V2 is a separate web app, so those templates are ignored.

- For the app name and logo, use the branding settings in [UI and branding](../Customisation/Branding.md).
- Files in `customFiles/static/` still replace built-in files at the same path, but the paths are those of the new app, for example `customFiles/static/index.html`.
- For deeper changes you would need to build your own frontend. See [Contributing](../../Developers/Contributing.md).

## Removed and renamed settings

Some settings were removed or renamed, including `ui.appName` and the `pdf-organizer` tool ID. Check [Settings changes](./Settings-Changes.md#removed-and-renamed-settings), especially if you disabled tools with `endpoints.toRemove`.

## Login and Docker images

- The `latest` and `latest-fat` images always include login and admin features. `DOCKER_ENABLE_SECURITY` and `DISABLE_ADDITIONAL_FEATURES` no longer change this; use `security.enableLogin` (`SECURITY_ENABLELOGIN`) to turn login on or off.
- `latest-ultra-lite` has no login, users or admin settings.
- New settings files have login on by default. An upgraded server keeps the `enableLogin` value from its existing `settings.yml`.
- Images named `s-pdf` still get the same builds, but `stirlingtools/stirling-pdf` is the main name.

## Plans and user limits

- The Free plan allows 5 users. An upgraded server keeps its current number of users as its limit if that is higher, but can't add users beyond it without Team or Enterprise.
- SAML sign-in needs Enterprise. Existing single sign-on users keep it.
- Some admin features need Team or Enterprise. See [Plans and licences](../Licensing/Plans-and-Licences.md).
- Old `enterpriseEdition` settings in `settings.yml` move to `premium` automatically.

## Java 25 for the JAR

The JAR now needs Java 25 instead of Java 17. Docker images include the right Java.

## Database

The built-in and external databases are upgraded in place on first start, so rolling back needs your backup. See [Roll back](./Upgrading.md#roll-back).

## API

API paths still start with `/api/v1`, and users' API keys carry over. If you generate clients from the OpenAPI spec, regenerate them from `/v1/api-docs` and test your integrations before switching. See [REST API](../../Developers/API.md).
