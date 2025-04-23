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