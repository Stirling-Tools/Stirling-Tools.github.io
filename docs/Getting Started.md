---
sidebar_position: 0
slug: /
---

## Benefits of Stirling-PDF
- **Extensive PDF Functionality:** Access 50+ tools, including signing, converting, merging, and more.
- **Advanced Customization:** Deep customization, themes, and environment variables.
- **Enterprise Features:** SSO, user management, and permission controls.
- **Data Security:** Local file processing with automatic deletion post-task.
- **Scalability & Automation:** Batch processing with Docker and Kubernetes support.
- **API Integration:** Use APIs for automation and external integrations.
- **Open-Source:** Community-driven with frequent updates and GitHub support.
- **Multi-Language Support:** Available in 38+ languages with active translations.

## Welcome to Stirling-PDF V2.0

We're excited to introduce Stirling-PDF V2.0 - a complete frontend rewrite that brings significant improvements to performance, user experience, and architecture.

### Why V2.0?

V1.5 served us well, but as Stirling-PDF grew in popularity and feature set, we identified key areas for improvement:
- **Performance bottlenecks** with large PDFs and complex workflows
- **Limited interactivity** due to server-side rendering (Thymeleaf)
- **Scalability challenges** with the monolithic frontend/backend coupling
- **User experience gaps** - no file history, no undo functionality, files had to be re-uploaded for each tool

V2.0 addresses all of these limitations with a ground-up rewrite of the frontend.

### What's New in V2.0

#### 🎨 Modern React Frontend
Complete rewrite using React + TypeScript with Mantine UI components for a more responsive and intuitive user experience.

#### 🚀 Significantly Improved Performance
- Handles extremely large PDFs (up to 100GB+) with optimized memory management
- Client-side processing for faster operations
- Background Web Workers for thumbnail generation
- Smooth UI even with hundreds of files loaded

#### 📁 Stateful Document Processing
**This is a game-changer:** Upload your PDFs once, then chain multiple tools without reloading!
- Split a PDF → View the results → Merge some pages → Compress → Download
- Files persist between tool switches
- No more re-uploading the same file for each operation

#### ⏮️ History & Version Control
- **Undo/Redo functionality** - Made a mistake? Just undo it!
- **File versioning** - Keep track of changes as you process documents
- **Preview before committing** - See the results before replacing your original file

#### 💾 Client-Side File Storage
- Files stored locally in your browser using IndexedDB
- Automatic thumbnail caching for faster previews
- Files persist across page refreshes
- Privacy-first: Files stay on your device until you explicitly upload them to the server

#### 🔀 Flexible Deployment Architecture
- **Unified Mode (default):** Single container with both frontend and backend
- **Split Mode:** Deploy frontend and backend separately for better scalability
- **Backend-Only Mode:** Use Stirling-PDF as an API-only service
- Load balance frontend and backend independently

#### 🖥️ Enhanced Desktop Experience
Native desktop applications powered by Tauri (replacing jcefmaven) for better performance and native OS integration.

### What Stays the Same

- **All existing features** - Every PDF tool from V1.5 is available in V2.0
- **Backend API compatibility** - Existing integrations and scripts continue to work
- **Configuration** - Same environment variables and settings.yml structure
- **Docker deployment** - Same Docker images, same volume mounts (except customFiles)
- **Security features** - SSO, user management, and permissions unchanged

### Migration from V1.5

For most users, upgrading to V2.0 is seamless:
1. Pull the latest Docker image
2. Restart your container
3. That's it!

**Note:** The V1.5 `customFiles/` template override system no longer works. See [UI Customisation](/Advanced%20Configuration/UI%20Customisation) for V2.0 customization options.

Please feel free to request new features or report bugs through our [GitHub](https://github.com/Stirling-Tools/Stirling-PDF/issues) or [Discord](https://discord.gg/Cn8pWhQRxZ).


## Introduction

This guide will help you choose the right installation method based on your needs.
We prioritise and focus on our Server deployment options however we also offer a [Ultra-Lite model](/Installation/Versions) for desktop users

## Choose Your Installation Type

### For Desktop Users
If you want to run Stirling PDF on your personal computer:

1. **Windows Users**
   - Download our installer ([Stirling-PDF-win-installer.exe](https://files.stirlingpdf.com/win-installer.exe)) for a simple, standalone experience
   - Refer to our [Windows Installation Guide](/Installation/Windows%20Installation) for detailed setup instructions

2. **Linux/Unix Users**
   - Dedicated Linux installer to be released soon, Currently you must run Stirling-PDF as a java jar
   - Follow our comprehensive [Unix Installation Guide](/Installation/Unix%20Installation) for a native installation

2. **Mac Users**
   - Download our installer ([Apple Silicon](https://files.stirlingpdf.com/mac-installer.dmg)/[Intel](https://files.stirlingpdf.com/mac-x86_64-installer.dmg)) for a simple, standalone experience
   - Follow our comprehensive [Mac Installation Guide](/Installation/Mac%20Installation) for a native installation
   
### For Server Deployments
If you're looking to host Stirling PDF as a service:

1. **Docker Users**
   - We recommend using our Docker images for the easiest deployment
   - Check our [Docker Installation Guide](/Installation/Docker%20Install) for setup instructions
   - Choose from three versions:
     - Fat (latest-fat): Includes additional fonts and security features
     - Standard (latest): Balanced features and size
     - Ultra-Lite (latest-ultra-lite): Minimal size with core features

2. **Manual Server Setup**
   - For bare metal server installations
   - Use Stirling-PDF.jar package
   - Follow our [Unix Installation Guide](/Installation/Unix%20Installation) for setup steps

## Quick Reference Table

| Installation Type | Best For | Documentation Link |
|------------------|----------|-------------------|
| Stirling-PDF-installer.exe | Windows desktop users | [Windows Guide](/Installation/Windows%20Installation) |
| Stirling-PDF.jar | Server deployments without Docker | [Unix Guide](/Installation/Unix%20Installation) |
| Docker Images | Server deployments with Docker | [Docker Guide](/Installation/Docker%20Install) |

Choose the installation method that best suits your needs and environment. Each guide provides detailed instructions for getting Stirling PDF up and running on your system.
