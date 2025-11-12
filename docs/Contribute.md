---
sidebar_position: 8
id: Contribute
---

# Contribution guidelines
Thanks for taking a look at how to contribute to Stirling PDFs open-source codebase!

## Development Setup

### Prerequisites
- Java 17 or 21 (21 recommended)
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

### V2.0 Translations (JSON)
Translation files are located in `frontend/public/locales/`
- **CRITICAL**: Always update translations in `en-GB` only, never `en-US`
- Files are organized by feature (e.g., `common.json`, `tools.json`)
- Use standard JSON format

### Legacy Translations (Properties)
For V1.5 and backend translations:
- See [How To Add New Language guidelines](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/devGuide/HowToAddNewLanguage.md)

## Development Resources
- **API Documentation**: Access at `/swagger-ui/index.html` on your local instance
- **Developer Guide**: See `DeveloperGuide.md` in the repository
- **Claude Code Guide**: See `CLAUDE.md` for detailed architecture and patterns
