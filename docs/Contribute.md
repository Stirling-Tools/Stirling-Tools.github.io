---
sidebar_position: 8
id: Contribute
---

# Contribution guidelines
Thanks for taking a look at how to contribute to Stirling PDFs open-source codebase!

## Development Setup

### Prerequisites
- Java 21 or later
- Node.js 18+
- Docker (for testing)
- Gradle (included in repository)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Stirling-Tools/Stirling-PDF.git
   cd Stirling-PDF
   ```

2. **Backend Development**
   ```bash
   # Build and run the Spring Boot backend
   ./gradlew bootRun
   # Backend runs on localhost:8080
   ```

3. **Frontend Development (V2.0+)**
   ```bash
   # Navigate to frontend directory
   cd frontend

   # Install dependencies
   npm install

   # Run development server
   npm run dev
   # Frontend runs on localhost:5173, proxies API calls to backend (localhost:8080)
   ```

## Contributing to Code

### Backend Contributions
- See our [CONTRIBUTING guidelines](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/CONTRIBUTING.md)
- Backend uses Spring Boot + Java
- Code formatting: Run `./gradlew spotlessApply` before committing

### Frontend Contributions (V2.0+)
- Frontend is a React + TypeScript application
- Uses Vite for build tooling
- UI components: Mantine UI + TailwindCSS
- Adding new tools: See [ADDING_TOOLS.md](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/ADDING_TOOLS.md)
- Tool architecture: Uses `useToolOperation` hook pattern

## Translation Contributions

### Translations (TOML)
Translation files are located at `frontend/editor/public/locales/<lang>/translation.toml`
- **CRITICAL**: Only edit `en-US/translation.toml`. `en-US` is the source/primary locale and the i18n fallback (`fallbackLng: "en-US"`); other languages are managed separately.
- Each locale is a single TOML file (`translation.toml`), keyed by feature/tool.
- For counts, use ICU-style plural suffixes on the key (`_one`, `_other`, and `_zero` where needed), for example `opCount_one`/`opCount_other`.

## Development Resources
- **API Documentation**: Access at `/swagger-ui/index.html` on your local instance
- **Developer Guide**: See `DeveloperGuide.md` in the repository
- **Claude Code Guide**: See `CLAUDE.md` for detailed architecture and patterns
