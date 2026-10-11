---
sidebar_position: 4
title: Contributing
sidebar_label: Contributing
description: Set up a Stirling PDF development environment, run it locally and submit changes, translations and docs.
---

# Contributing

Stirling PDF is open-core and lives on [GitHub](https://github.com/Stirling-Tools/Stirling-PDF). Read the repository's [CONTRIBUTING.md](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/CONTRIBUTING.md) first. In particular, comment on (or open) an issue and wait to be assigned before you start work.

## Prerequisites

- Git and Docker
- Java JDK 25 (Gradle is included in the repository)
- Node.js 22 or later, with npm
- [Task](https://taskfile.dev/installation/), the project's command runner
- [uv](https://docs.astral.sh/uv/), for the Python AI engine
- Rust and Cargo, only for the desktop app

## Set up and run

```bash
git clone https://github.com/Stirling-Tools/Stirling-PDF.git
cd Stirling-PDF
task install
task dev
```

`task install` installs the frontend and AI engine dependencies. Gradle fetches the backend's own. `task dev` starts the backend and frontend together on free ports, 8080 and 5173 when they are available, and opens the browser. The frontend dev server sends API calls to the backend. To start the AI engine as well, run `task dev:all`.

To run parts on their own, use separate terminals:

| Command | Starts |
|---|---|
| `task backend:dev` | Backend on `http://localhost:8080` |
| `task frontend:dev` | Frontend on `http://localhost:5173` |
| `task engine:dev` | AI engine on `http://localhost:5001` |
| `task desktop:dev` | Desktop app |

With the backend running, the API reference is at `http://localhost:8080/swagger-ui/index.html`. Run `task --list` for every command.

The LibreOffice, Tesseract, qpdf and WeasyPrint features need those programs installed locally. Without them, the matching tools are turned off.

If you run the frontend dev server behind a reverse proxy or a custom hostname, list the allowed hostnames in `FRONTEND_ALLOWED_HOSTS`, for example `FRONTEND_ALLOWED_HOSTS=dev.example.com,localhost`.

## Before you open a pull request

```bash
task fix
task check
```

`task fix` formats and auto-fixes the backend, frontend and engine. `task check` runs format checks, linting, type checks and tests, and must pass. Keep one change per pull request and use the PR template.

## Build

| Command | Builds |
|---|---|
| `task build` | Backend and frontend |
| `./gradlew clean build -PbuildWithFrontend=true` | One JAR with the frontend bundled in |
| `task docker:build` | The standard Docker image (`docker:build:fat` and `docker:build:ultra-lite` for the others) |
| `task desktop:build` | Desktop app installers |

## Adding a tool

1. Add the backend endpoint ([Adding a new feature to the backend](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/DeveloperGuide.md#adding-a-new-feature-to-the-backend-api) in the Developer Guide).
2. Add the frontend tool ([ADDING_TOOLS.md](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/ADDING_TOOLS.md)).
3. Add the tool's text to the `en-US` `translation.toml` only. Other languages are handled separately.

The [Developer Guide](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/DeveloperGuide.md) covers the architecture, and the [devGuide folder](https://github.com/Stirling-Tools/Stirling-PDF/tree/main/devGuide) has guides on error handling, comments and more.

## Translations

Each language has one file at `frontend/editor/public/locales/<language>/translation.toml`. `en-US` is the source: add new text there first. For counts, use i18next plural suffixes on the key, such as `_one` and `_other`. To add or translate a language, see [How to add new languages](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/devGuide/HowToAddNewLanguage.md).

## Documentation

These docs live in the [Stirling-Tools.github.io](https://github.com/Stirling-Tools/Stirling-Tools.github.io) repository. Open a pull request there with your change.
