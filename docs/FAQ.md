---
sidebar_position: 8
title: FAQ
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Frequently Asked Questions

### Q1: Why are .htm files being downloaded when I use the application?
This is often caused by your NGINX configuration. NGINX's default file upload size is 1MB, and any file larger than this will cause an .htm file to be downloaded instead. To fix this issue, you should modify your NGINX configuration to increase the maximum file upload size.

### Q2: Can I customize the appearance and language of the Stirling PDF application?
Yes, Stirling PDF provides several environment variables to allow customization of the application, custom HTML, CSS and other settings such as the visibility to search engines. Please refer to the [UI Customisation](./Configuration/UI%20Customisation.md) section for more details.

### Q3: I want to add a new feature to Stirling PDF. How can I contribute?
We welcome contributions from the community! Please open an issue on our GitHub page to discuss any large features before making any changes. Any small changes are fully welcome without discussion! After the feature has been discussed and approved, you can make the changes and submit a pull request.

### Q4: I have a cool idea can you add it?
All feedback and suggestions are appreciated. It is best to submit these via a Github issue ticket with [Feature Request] in the title.
You can also reach out in discord but without a ticket to track it the request can often get lost!

### Q5: I found a bug in Stirling PDF. Where can I report it?
Please report any bugs or issues you encounter through our GitHub Issues page. Be sure to include as much detail as possible so we can diagnose and resolve the issue quickly.

### Q6: My Stirling-PDF Using high RAM at idle, How can I optimize memory usage?
Stirling-PDF's memory usage can be optimized in several ways:

Disable additional features: Set DISABLE_ADDITIONAL_FEATURES=true to reduce RAM consumption. This can significantly lower memory usage, especially during idle periods.

Use the Ultra Lite version: Pull the latest-ultra-lite tag from Docker Hub or GitHub, which is specifically designed for lower-end hardware.

### Q7: I'm experiencing connection errors when pulling from docker.stirling.com

If you experience connection issues, use these alternative endpoints:

- Docker Hub: `docker pull stirlingtools/stirling-pdf:latest`
- GitHub: `docker pull ghcr.io/stirling-tools/stirling-pdf:latest`

All endpoints provide the same functionality.

### Q8: Does Stirling-PDF track my data?

No, we track no data without your explicit consent. You can see how, when, and why at our [Analytics and Telemetry](./analytics-telemetry) page.

### Q9: When I upload a file, where is it processed?

Uploads go to the server or desktop instance you're using, not to Stirling servers. The macOS/Windows desktop apps process files locally—even when you pick the Stirling Cloud sign-in today—so your PDFs stay on your device unless you point the app to a remote self-hosted server. Planned SaaS-assisted features (for desktop app) will be opt-in when they arrive.

### Q10: What is the difference between Stirling-PDF.jar and Stirling-PDF-server.jar?

**Stirling-PDF.jar** (Full Package):
- Bundles the frontend user interface inside the JAR along with the backend server
- Complete standalone application - download and run
- Use this for standard deployments

**Stirling-PDF-server.jar** (Backend Only - **Advanced**):
- Contains only the backend server (no bundled frontend UI)
- Use this for API access, desktop app integration, or when hosting the frontend separately

Both JAR files include the same backend functionality. The main difference is whether the frontend is bundled with the backend or needs to be hosted separately.

### Q11: How do I disable login/authentication?

Authentication is enabled by default in Stirling-PDF. To disable it:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: false
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    docker run -d \
      -p 8080:8080 \
      -e SECURITY_ENABLELOGIN=false \
      stirlingtools/stirling-pdf:latest
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      SECURITY_ENABLELOGIN: false
    ```
  </TabItem>
  <TabItem value="jar-property" label="JAR (Java Property)">
    ```bash
    java -jar Stirling-PDF.jar -DSECURITY_ENABLELOGIN=false
    ```
  </TabItem>
  <TabItem value="jar-env" label="JAR (Environment Variable)">
    ```bash
    export SECURITY_ENABLELOGIN=false
    java -jar Stirling-PDF.jar
    ```
  </TabItem>
</Tabs>

For more details, see the [System and Security Configuration](./Configuration/System%20and%20Security.md#disabling-login) documentation.

