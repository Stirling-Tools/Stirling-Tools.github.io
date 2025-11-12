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

V1 served us well, but as Stirling-PDF grew in popularity and feature set, we identified key areas for improvement:
- **Performance bottlenecks** with large PDFs and complex workflows
- **Limited interactivity** due to server-side rendering
- **Scalability challenges** with the monolithic architecture
- **User experience gaps** - no file history, no undo functionality, files had to be re-uploaded for each tool

V2.0 addresses all of these limitations with a complete frontend rewrite.

### What's New in V2.0

#### 🎨 Modern Interface
New responsive interface that's faster and more intuitive to use.

#### 🚀 Better Performance
- Large performance increases for PDF processing
- Faster page loads and smoother interactions
- Improved memory management
- Better handling of large files

#### 📁 Stateful Document Processing
**This is a game-changer:** Upload your PDFs once, then chain multiple tools without reloading!
- Split a PDF → View the results → Merge some pages → Compress → Download
- Files persist between tool switches
- No more re-uploading the same file for each operation

#### ⏮️ History & Version Control
- **Undo/Redo functionality** - Made a mistake? Just undo it!
- **File versioning** - Track, revert, and download any previous version of your documents
- **All stored locally** - Your file history stays private on your device
- **Preview before committing** - See the results before replacing your original file

#### 💾 Browser File Storage
- Files stored locally in your browser with thumbnails
- Files persist across page refreshes
- Privacy-first: Files stay on your device until you explicitly process them

#### 🔀 Flexible Deployment Architecture
- **Unified Mode (default):** Single container with both frontend and backend
- **Split Mode:** Deploy frontend and backend separately for better scalability
- **Backend-Only Mode:** Use Stirling-PDF as an API-only service
- Load balance frontend and backend independently

#### 🖥️ Enhanced Desktop Experience
- **Lightning-fast startup** - Launches in as little as 0.3 seconds
- **"Open with Stirling-PDF"** - Right-click PDFs to open directly in the app
- **Set as default PDF viewer** - Make Stirling-PDF your system's default PDF application
- **Native performance** - Powered by Tauri for true native OS integration

#### ⚙️ In-App Settings Management
- **Configure everything in the UI** - Admin users can change all settings through the Settings menu
- **No config file editing** - Update configurations without touching `settings.yml` or restarting
- **Visual interface** - See all options with descriptions and validation
- **Immediate changes** - Settings apply right away

### What Stays the Same

- **All existing features** - Every PDF tool from V1 is available in V2.0
- **Backend API compatibility** - Existing integrations and scripts continue to work
- **Configuration** - Same environment variables and settings.yml structure
- **Docker deployment** - Same Docker images, same volume mounts (except customFiles)
- **Security features** - SSO, user management, and permissions unchanged
- **Pipeline automation** - Now called "Automate" in the frontend with improved UX (backend unchanged)
- **Privacy commitment** - Your data stays yours, with full control over analytics and telemetry (see [Analytics and Telemetry](./analytics-telemetry))

### Migration from V1

For most users, upgrading to V2.0 is seamless:
1. Pull the latest Docker image
2. Restart your container
3. That's it!

**Note:** The V1 `customFiles/` template override system has been replaced with a new customization approach due to the UI framework change. See [UI Customisation](/Advanced%20Configuration/UI%20Customisation) for V2.0 customization options.

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
