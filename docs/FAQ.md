---
sidebar_position: 8
title: FAQ
---
# Frequently Asked Questions

### Q1: Why are .htm files being downloaded when I use the application?
This is often caused by your NGINX configuration. NGINX's default file upload size is 1MB, and any file larger than this will cause an .htm file to be downloaded instead. To fix this issue, you should modify your NGINX configuration to increase the maximum file upload size.

### Q2: Can I customize the appearance and language of the Stirling PDF application?
Yes, Stirling PDF provides several environment variables to allow customization of the application, custom HTML, CSS and other settings such as the visibility to search engines. Please refer to the [UI Customisation](/Advanced%20Configuration/UI%20Customisation) section for more details.

### Q3: I want to add a new feature to Stirling PDF. How can I contribute?
We welcome contributions from the community! Please open an issue on our GitHub page to discuss any large features before making any changes. Any small changes are fully welcome without discussion! After the feature has been discussed and approved, you can make the changes and submit a pull request.

### Q4: I have a cool idea can you add it?
All feedback and suggestions are appreciated. It is best to submit these via a Github issue ticket with [Feature Request] in the title.
You can also reach out in discord but without a ticket to track it the request can often get lost!

### Q5: I found a bug in Stirling PDF. Where can I report it?
Please report any bugs or issues you encounter through our GitHub Issues page. Be sure to include as much detail as possible so we can diagnose and resolve the issue quickly.

### Q6: My Stirling-PDF Using high RAM at idle, How can I optimize memory usage?
Stirling-PDF's memory usage can be optimized in several ways:

Disable security features: Set DOCKER_ENABLE_SECURITY=false to reduce RAM consumption. This can significantly lower memory usage, especially during idle periods.

Use the Ultra Lite version: Pull the latest-ultra-lite tag from Docker Hub or GitHub, which is specifically designed for lower-end hardware.

### Q7: I'm experiencing connection errors when pulling from docker.stirlingpdf.com

If you experience connection issues, use these alternative endpoints:

- Docker Hub: `docker pull stirlingtools/stirling-pdf:latest`
- GitHub: `docker pull ghcr.io/stirling-tools/stirling-pdf:latest`

All endpoints provide the same functionality.

### Q8: What's different in V2.0?

V2.0 is a major frontend rewrite with significant improvements:
- **Modern React Frontend**: Complete rewrite using React + TypeScript replacing Thymeleaf
- **Stateful Processing**: Upload PDFs once and chain multiple tools without reloading
- **History & Undo**: Full undo/redo functionality and file versioning
- **Better Performance**: Handles large PDFs (up to 100GB+) with improved memory management
- **Client-Side Storage**: Files persist between tool switches using IndexedDB
- **Native Desktop Apps**: Powered by Tauri for improved native experience
- **Flexible Deployment**: Can deploy frontend and backend separately for better scalability

The backend and API remain largely unchanged, so existing integrations continue to work.

For a comprehensive overview of all changes and the reasoning behind V2.0, see [Getting Started - Welcome to V2.0](/).

### Q9: Can I customize the UI in V2.0 like I did in V1.5?

No, the V1.5 `customFiles/` folder override system no longer works in V2.0 due to the React-based frontend.

You can still customize:
- Application name and branding via environment variables
- Theme preferences via application settings
- Language settings

For extensive UI customization:
1. Clone the repository and modify React components in `frontend/src/`
2. Build the frontend: `npm install && npm run build`
3. Volume mount `frontend/dist` into your Docker container to replace the built-in frontend

See [UI Customisation](/Advanced%20Configuration/UI%20Customisation) for detailed instructions.

### Q10: How do I develop for the V2.0 React frontend?

See our updated [Contribute](/Contribute) guide for detailed instructions. Quick start:
1. Clone the repository
2. Run backend: `./gradlew bootRun` (localhost:8080)
3. Run frontend: `cd frontend && npm install && npm run dev` (localhost:5173)

The frontend dev server automatically proxies API calls to the backend.