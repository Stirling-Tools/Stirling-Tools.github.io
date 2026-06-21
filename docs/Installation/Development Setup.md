---
sidebar_position: 6
id: Development Setup
title: Development Setup Guide
---

# Development Setup for Stirling PDF

This guide covers setting up a local development environment for Stirling PDF, including both backend and frontend (V2.0+) development.

## Prerequisites

Before getting started, ensure you have the following installed:

- **Java**: JDK 25
- **Node.js**: Version 22+ for frontend development
- **npm**: Comes with Node.js
- **Docker**: For testing and containerization
- **Gradle**: Included in the repository (use `./gradlew`)
- **Git**: For version control
- **Task** (optional but recommended): [Task](https://taskfile.dev/) is the project's unified command runner. With it installed you can run `task dev`, `task check`, etc. from the repo root. Run `task --list` to see all commands.

### IDE Setup

Recommended IDEs:
- **IntelliJ IDEA** (recommended for Java development)
- **Visual Studio Code** (good for both frontend and backend)
- **Eclipse**

**Important**: Install the Lombok plugin for your IDE. Visit [projectlombok.org/setup](https://projectlombok.org/setup/) for IDE-specific instructions.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Stirling-Tools/Stirling-PDF.git
cd Stirling-PDF
```

### 2. Backend Development

#### Running the Backend

```bash
# Build and run the Spring Boot application
./gradlew bootRun
```

The backend will start on `http://localhost:8080`

#### Code Formatting

Stirling PDF uses Spotless for code formatting:

```bash
# Apply formatting (run before committing)
./gradlew spotlessApply
```

#### Enable Security Features (Optional)

For local testing with full security features:

```bash
# Set environment variable
export SECURITY_ENABLELOGIN=true

# Or add to your IDE's run configuration
-DSECURITY_ENABLELOGIN=true
```

### 3. Frontend Development (V2.0+)

#### Initial Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

#### Running the Development Server

The project uses [Task](https://taskfile.dev/) as its command runner. From the repository root:

```bash
# Start the Vite dev server (runs `npx vite editor` under the hood)
task frontend:dev
```

The frontend will start on `http://localhost:5173`

**Important**: The Vite dev server automatically proxies API requests to the backend at `localhost:8080`. Make sure the backend is running before starting the frontend dev server.

#### Frontend Technology Stack

- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **UI Library**: Mantine UI
- **Styling**: TailwindCSS
- **PDF Rendering**: PDF.js
- **PDF Manipulation**: PDF-LIB
- **Storage**: IndexedDB for client-side file storage
- **i18n**: i18next for internationalization

### 4. Desktop Application Development

Stirling PDF V2.0 uses Tauri for native desktop applications. Desktop builds also require **Rust** and **Cargo** installed. From the repository root:

```bash
# Run desktop app in development mode (runs `npx tauri dev`)
task desktop:dev

# Build desktop application (runs `npx tauri build`)
task desktop:build
```

## Development Workflow

### Full Development Setup

The quickest way is the unified Task runner, which starts the backend and frontend together:

```bash
# From the repository root - starts backend + frontend concurrently
task dev
```

Or run them in separate terminals:

1. **Terminal 1** - Backend:
   ```bash
   ./gradlew bootRun
   ```

2. **Terminal 2** - Frontend:
   ```bash
   task frontend:dev
   ```

3. **Access the application**:
   - Frontend (React): http://localhost:5173
   - Backend API: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger-ui/index.html

### Building the Project

```bash
# Backend only (default - the frontend is not bundled unless asked for)
./gradlew clean build

# Full build with the frontend bundled into the backend JAR
./gradlew clean build -PbuildWithFrontend=true
```

## Architecture Overview

### Backend Architecture

- **Framework**: Spring Boot
- **PDF Processing**: Apache PDFBox
- **Document Conversion**: LibreOffice (optional dependency)
- **PDF Optimization**: qpdf (optional dependency)
- **Security**: Spring Security (optional, controlled by `SECURITY_ENABLELOGIN`)

### Frontend Architecture (V2.0)

- **State Management**: React Context (FileContext for file operations)
- **File Storage**: IndexedDB for client-side persistence
- **Tool Architecture**: Hook-based pattern using `useToolOperation`
- **Memory Management**: Manual cleanup for PDF.js documents and blob URLs
- **Performance Target**: Improved handling of large PDFs with better memory management

### Key Frontend Concepts

#### FileContext
Central state management for all file operations:
- Active files and their variants
- Tool navigation state
- Memory management (PDF.js documents, blob URLs, Web Workers)
- IndexedDB persistence

#### Tool Development
Tools use a modular hook-based architecture:
- **useToolOperation**: Main orchestrator hook
- **useToolState**: UI state management
- **useToolApiCalls**: HTTP requests and file processing
- **useToolResources**: Blob URLs, thumbnails, ZIP downloads

See `ADDING_TOOLS.md` in the repository for detailed tool development guide.

## Testing

### Running Tests

```bash
# Run all tests
./gradlew test

# Full Docker test suite (tests all variants)
./testing/test.sh
```

### Testing Different Versions

Stirling PDF offers three Docker variants:
- **Ultra-lite**: Basic PDF operations only
- **Standard** (latest): Full feature set
- **Fat** (latest-fat): Pre-downloaded dependencies for air-gapped environments

## Configuration Files

### Backend Configuration

- `app/core/src/main/resources/application.properties`: Main application configuration
- `settings.yml`: User-configurable settings (generated on first run)

### Frontend Configuration

- `frontend/editor/.env`: Environment variables for development (with `.env.desktop` and `.env.saas` overrides per build mode)
- `frontend/editor/vite.config.ts`: Vite build/dev-server configuration
- `frontend/editor/public/locales/<lang>/translation.toml`: Translation files (TOML format)

:::note FRONTEND_ALLOWED_HOSTS
`FRONTEND_ALLOWED_HOSTS` is a comma-separated allowlist of `Host` header values that the Vite dev server will accept. Set it when running the dev server behind a reverse proxy or under a custom hostname (e.g. `FRONTEND_ALLOWED_HOSTS=dev.example.com,localhost`). This is a dev-server environment variable only - it is not a production `settings.yml` key. When empty or unset, Vite keeps its default host checks.
:::

## Common Development Tasks

### Adding Translations

Translations use TOML files, one per locale:

1. Navigate to `frontend/editor/public/locales/<lang>/translation.toml`
2. **Important**: Only update `en-US/translation.toml`. `en-US` is the source/primary locale and the i18n fallback (`fallbackLng: "en-US"`).
3. Edit `translation.toml`, adding keys under the relevant feature/tool.
4. For counts, use ICU-style plural suffixes on the key (`_one`, `_other`, and `_zero` where needed).
5. Other languages are managed separately by the community.

### Adding a New PDF Tool

See the repository's `ADDING_TOOLS.md` for detailed instructions. Quick overview:

1. Create backend controller endpoint
2. Create frontend tool hook using `useToolOperation`
3. Add UI component
4. Add translations
5. Register tool in routing

## Troubleshooting

### Backend Issues

- **Port already in use**: Override the port with `-Dserver.port=8081` (or set the `SERVER_PORT` environment variable)
- **Lombok errors**: Ensure Lombok plugin is installed in your IDE
- **Build failures**: Run `./gradlew clean` and try again

### Frontend Issues

- **npm install fails**: Delete `node_modules` and `package-lock.json`, then run `npm install` again
- **Proxy errors**: Ensure backend is running on port 8080
- **Memory issues with large PDFs**: This is expected during development; memory management is optimized in production builds

### Docker Issues

- **Build failures**: Ensure Docker has enough memory allocated (at least 4GB recommended)
- **Permission issues**: Use Docker without sudo or add your user to the docker group

## Additional Resources

- **GitHub Repository**: [Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF)
- **CLAUDE.md**: Detailed architecture and development patterns
- **DeveloperGuide.md**: Comprehensive developer documentation
- **ADDING_TOOLS.md**: Guide for creating new PDF tools
- **CONTRIBUTING.md**: Contribution guidelines

## Need Help?

- **GitHub Issues**: [Report bugs and request features](https://github.com/Stirling-Tools/Stirling-PDF/issues)
- **Discord**: [Join our community](https://discord.gg/Cn8pWhQRxZ)
- **Discussions**: [Ask questions on GitHub Discussions](https://github.com/Stirling-Tools/Stirling-PDF/discussions)
