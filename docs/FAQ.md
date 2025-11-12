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

### Q8: What's different in V2.0? Why should I upgrade?

V2.0 brings major improvements to your PDF workflow:

**For Users:**
- **Upload once, use everywhere**: Your files stay in the browser - no re-uploading between tools
- **Undo mistakes**: Go back to previous versions if something doesn't look right
- **Faster workflows**: Chain multiple operations without waiting for uploads
- **Better performance**: Improved handling of large PDFs and better memory management
- **Desktop apps**: Native Windows, Mac, and Linux applications that work offline
- **Modern interface**: Smoother, more responsive, easier to use

**For Self-Hosters:**
- **Flexible deployment**: Run frontend and backend separately for better scaling
- **Split across servers**: Serve the interface from a CDN while processing happens elsewhere
- **Better resource management**: Scale components independently
- **In-app settings**: Configure everything through the Settings menu (admin only)

**What stayed the same:**
- All PDF operations and features work exactly as before
- API remains unchanged - existing integrations still work
- Backend processing is the same reliable engine

See [Getting Started](/) for full V2.0 overview and [V2 Features Guide](./V2-Features) for detailed feature explanations.

### Q9: Can I customize the UI in V2.0 like I did in V1?

The V1 `customFiles/` template override system has been replaced with a new customization approach due to the UI framework change in V2.0.

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

### Q11: Where are my files stored in V2? Are they safe?

**Browser version**: Your files are temporarily stored in your browser's local storage (not on our servers). They remain private to you and never leave your device unless you explicitly process them with a tool. This storage is cleared when you:
- Click "Clear Files" in the file manager
- Clear your browser data
- Close the application (depending on browser settings)

**Desktop app**: Files are stored on your local computer and never sent anywhere. The desktop app can run completely offline.

**During processing**: Files are sent to the server only when you use a tool. They're processed immediately and deleted - no permanent storage.

For maximum privacy, use the desktop application or self-host Stirling-PDF.

### Q12: How do I clear files from my browser storage?

Look for the **File Manager** or **Clear Files** button in the V2 interface:
1. Click to view all files stored in your browser
2. Remove individual files or clear all at once
3. Confirm the action

You should clear files:
- After finishing your work
- Before closing on a shared computer
- When running low on storage space

### Q13: What's the difference between the web version and desktop app?

**Web Version:**
- Access from any browser
- No installation needed
- Automatic updates
- Limited by browser storage (~50MB to 10GB)
- Requires internet for processing (unless self-hosted)

**Desktop Application:**
- Native Windows, Mac, or Linux app
- One-time installation
- Double-click to open PDFs in Stirling-PDF
- Works completely offline
- Unlimited file storage
- Faster performance
- Better for daily use and large files

**Recommendation**: Use the desktop app for frequent work, web version for occasional access.

See [V2 Features Guide](./V2-Features) for detailed comparison.

### Q14: Can I use undo/redo in V2? How does it work?

Yes! V2 includes full undo/redo functionality:

- **Undo button** - Go back to the previous version of your file
- **Redo button** - Reapply operations you undid
- **Version history** - See all operations and jump to any version

**Important notes:**
- Undo history is stored in your browser session
- Refreshing the page clears undo history
- Download important versions to save them permanently
- Desktop app retains history longer than browser

See [V2 Features Guide](./V2-Features#undo-and-redo) for details.

### Q15: My browser says "Storage quota exceeded". What should I do?

This means your browser's storage is full. To fix it:

1. **Clear old files**: Open File Manager and delete files you no longer need
2. **Download and remove**: Save finished PDFs to your computer, then remove them from browser storage
3. **Use smaller files**: Compress large PDFs before working with them
4. **Switch to desktop app**: No storage limits on the desktop application

Browser storage limits vary:
- Chrome/Edge: ~10GB (varies by available disk space)
- Firefox: ~10GB
- Safari: ~1GB (more restrictive)

### Q16: I uploaded a file but can't find it. Where did it go?

Check these places:

1. **File Manager**: Click the File Manager button to see all stored files
2. **Downloads folder**: You may have already downloaded it
3. **Browser storage cleared**: Check if you or your browser cleared data
4. **Session expired**: Refreshing may clear files depending on settings

**Tips to avoid losing files:**
- Download important files immediately after processing
- Use the desktop app for important work
- Don't rely on browser storage for long-term file keeping
- Enable "persistent storage" in browser settings if available

### Q17: Can I use V2 completely offline?

**Desktop application**: Yes! The desktop app works completely offline once installed. All processing happens on your computer.

**Web browser version**:
- Self-hosted: Yes, if you host Stirling-PDF on your local network
- Online version (stirlingpdf.io): No, requires internet connection

**For complete offline use**: Install the desktop application for Windows, Mac, or Linux.

### Q18: How do I open PDFs directly in the Stirling-PDF desktop app?

After installing the desktop application:

**Windows:**
1. Right-click any PDF file
2. Select "Open with" → "Stirling-PDF"
3. Check "Always use this app" to make it default

**Mac:**
1. Right-click (or Ctrl+click) any PDF file
2. Select "Get Info"
3. Under "Open with", choose Stirling-PDF
4. Click "Change All" to apply to all PDFs

**Linux:**
1. Right-click any PDF file
2. Select "Properties" → "Open With"
3. Choose Stirling-PDF and set as default

The desktop app automatically registers for PDF file association during installation.

### Q19: Does V2 collect analytics or track my usage?

Stirling-PDF respects your privacy with full control:

**What we collect** (only if enabled):
- Basic usage statistics (which features are used)
- Error reports to help us fix bugs
- No personal information or file contents

**Your control:**
- Analytics are **opt-in** via cookie consent banner
- Disable completely in application settings
- Self-hosted instances: You control all analytics
- Desktop app: Fully offline option available

**What we NEVER collect:**
- File contents or names
- Personal information
- Browsing history
- Uploaded documents

See [Analytics and Telemetry](./analytics-telemetry) for complete details.

### Q20: What are the Docker deployment modes in V2?

V2 supports flexible deployment architectures:

**MODE=BOTH (Default)** - Single container
- Frontend and backend together
- Simplest setup for most deployments
- Recommended for single-server hosting

**MODE=FRONTEND** - Frontend only
- Serves React web interface
- Requires VITE_API_BASE_URL to point to backend
- Used for CDN deployment or separate frontend scaling

**MODE=BACKEND** - Backend only
- Runs API server only
- Multiple frontends can connect to one backend
- Used for microservices or independent scaling

**Basic example:**
```bash
docker run -e MODE=BOTH stirlingtools/stirling-pdf:latest
```

**Split deployment example:**
```bash
# Backend
docker run -e MODE=BACKEND -p 8081:8080 stirlingtools/stirling-pdf:latest

# Frontend
docker run -e MODE=FRONTEND -e VITE_API_BASE_URL=http://backend:8081 -p 8080:8080 stirlingtools/stirling-pdf:latest
```

See [Docker Installation](/Installation/Docker%20Install) for complete setup examples.