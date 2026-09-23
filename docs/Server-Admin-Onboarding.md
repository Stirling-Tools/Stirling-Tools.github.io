---
sidebar_position: 5
id: Production-Deployment-Guide
title: Production Deployment Guide
description: Deploy Stirling PDF on your own server for a team or organization, from installation to monitoring
---

# Production Deployment Guide

This guide takes you from installation to a secured, monitored Stirling PDF server for your team or organization. Features that need a paid plan are marked where they appear.

---

## Step 1: Choose Your Deployment Path

| Method | Use it when | Instructions |
|---|---|---|
| **Docker Compose** (recommended) | You are setting up a production server | [Docker Compose setup](#docker-compose-setup) |
| **Docker Run** | You want a quick trial or a single container | [Docker Run setup](#docker-run-setup) |
| **Kubernetes** | You already run Kubernetes and need scaling or high availability | [Kubernetes Guide](./Installation/Kubernetes.md) |
| **Bare metal / JAR** | Docker is not available | [Unix Installation Guide](./Installation/Unix.md) |

Allow at least 2 GB of RAM (4 GB recommended) and 10 GB of disk space. A JAR installation also needs Java 25 or later, plus LibreOffice and Tesseract for conversions and OCR.

---

## Step 2: Installation

<Tabs groupId="deployment-type">
<TabItem value="docker-compose" label="Docker Compose (Recommended)" default>

### Docker Compose Setup

#### 2.1: Create docker-compose.yml

Create a directory for the deployment:

```bash
mkdir -p ~/stirling-pdf
cd ~/stirling-pdf
```

Create `docker-compose.yml`:

```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    container_name: stirling-pdf
    ports:
      - '8080:8080'
    volumes:
      - ./stirling-data/tessdata:/usr/share/tessdata    # OCR language files
      - ./stirling-data/configs:/configs                 # Settings and database
      - ./stirling-data/logs:/logs                       # Application logs
      - ./stirling-data/customFiles:/customFiles:rw      # Custom branding files
      - ./stirling-data/pipeline:/pipeline               # Automation configs
    environment:
      - SECURITY_ENABLELOGIN=true            # Require sign-in
      - SYSTEM_DEFAULTLOCALE=en-US           # Default UI language for new users
      - SYSTEM_GOOGLEVISIBILITY=false        # Hide from search engines
      - SYSTEM_ROOTURIPATH=/                 # Base URL path
      - SYSTEMFILEUPLOADLIMIT=2GB            # Max upload size; numeric part must be 0-999
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '2.0'
        reservations:
          memory: 2G
          cpus: '1.0'
```

The `deploy` block is optional. Adjust the limits to your server.

#### 2.2: Start Stirling PDF

```bash
docker compose up -d
docker compose ps
docker compose logs -f
```

#### 2.3: Verify Installation

Open `http://your-server-ip:8080` in a browser. The Stirling PDF sign-in page confirms the server is running; continue to Step 3.

If it does not load:
- Check the firewall allows port 8080, for example `sudo ufw allow 8080`.
- Check the logs with `docker compose logs`.
- Check that the container can write to the mounted `stirling-data` directories.

</TabItem>
<TabItem value="docker-run" label="Docker Run">

### Docker Run Setup

#### 2.1: Create Data Directory and Run Container

```bash
mkdir -p ~/stirling-data

docker run -d \
  --name stirling-pdf \
  -p 8080:8080 \
  -v ~/stirling-data/tessdata:/usr/share/tessdata \
  -v ~/stirling-data/configs:/configs \
  -v ~/stirling-data/logs:/logs \
  -v ~/stirling-data/customFiles:/customFiles:rw \
  -e SECURITY_ENABLELOGIN=true \
  -e SYSTEM_DEFAULTLOCALE=en-US \
  -e SYSTEM_GOOGLEVISIBILITY=false \
  -e SYSTEMFILEUPLOADLIMIT=2GB \
  --restart unless-stopped \
  docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
```

#### 2.2: Verify Installation

```bash
docker ps | grep stirling-pdf
docker logs -f stirling-pdf
```

Open `http://your-server-ip:8080` in a browser. The Stirling PDF sign-in page confirms the server is running; continue to Step 3.

If it does not load:
- Check the firewall allows port 8080, for example `sudo ufw allow 8080`.
- Check the logs with `docker logs stirling-pdf`.
- Check that the container can write to the mounted `stirling-data` directories.

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

### Kubernetes Setup

A Kubernetes deployment needs persistent volume claims, a Deployment and Service, ingress or a load balancer, and resource limits.

Follow the [Kubernetes Installation Guide](./Installation/Kubernetes.md) for complete manifests, namespace setup, TLS, and autoscaling.

</TabItem>
<TabItem value="bare-metal" label="Bare Metal / JAR">

### Bare Metal Setup

A bare metal installation needs Java 25 or later, LibreOffice for conversions, Tesseract for OCR, and a service manager such as systemd.

Follow the [Unix Installation Guide](./Installation/Unix.md) for dependency installation, JAR setup, and systemd configuration.

</TabItem>
</Tabs>

---

## Step 3: Initial Login & Admin Setup

### 3.1: First-Time Login

Open your Stirling PDF address and sign in with the default administrator account:

```
Username: admin
Password: stirling
```

You are asked to set a new password on first sign-in. Use a strong password of 12 or more characters.

:::tip Customizing Default Credentials
Set your own initial administrator **before first startup**:

```yaml
environment:
  - SECURITY_INITIALLOGIN_USERNAME=youradmin
  - SECURITY_INITIALLOGIN_PASSWORD=YourSecurePassword123!
```

These values only apply when the database is first created. Change the password in the app afterwards.
:::

### 3.2: Verify Admin Access

Open **Settings** from your account at the bottom of the quick access bar on the left. Administrators see server sections such as **Workspace**, **Configuration**, and **Security & sign-in**. Other users see only their own preferences.

If the server sections are missing:
- Check the logs with `docker logs stirling-pdf`.
- Confirm `SECURITY_ENABLELOGIN=true` is set.
- Confirm you signed in with the initial administrator account.

Consider [single sign-on](./Configuration/Security/Single%20Sign-On%20Configuration.md) so your identity provider manages passwords.

---

## Step 4: Configure Essential Settings

Change these settings in `settings.yml`, or as an administrator in **Settings**.

### 4.1: General Settings

#### System Locale & Language

```yaml
system:
  defaultLocale: en-US  # or en-GB, de-DE, fr-FR, etc.

ui:
  languages: []  # Empty = all languages enabled. Or specify: ["en_GB", "de_DE", "fr_FR"]
```

The default locale applies to new users. `ui.languages` limits which languages users can choose.

#### Search Engine Visibility

```yaml
system:
  googlevisibility: false  # Prevents search engines from indexing your site
```

#### File Upload Limits

```yaml
system:
  fileUploadLimit: 2GB  # numeric part must be 0-999, followed by KB, MB or GB
```

The numeric part is limited to 0-999, so `2000MB` is rejected and leaves the limit unset. Use `2GB` instead. An empty value means no limit.

#### Legal & Compliance

Link your own policies from the app footer, or leave a value empty to hide the link:

```yaml
legal:
  termsAndConditions: https://yourcompany.com/tos
  privacyPolicy: https://yourcompany.com/privacy
  accessibilityStatement: ''
  cookiePolicy: ''
  impressum: ''  # required in some countries, such as Germany
```

#### Update Notifications

`showUpdate` and `showUpdateOnlyAdmin` both default to `true`, so only administrators see update notifications. To turn them off for everyone:

```yaml
system:
  showUpdate: false
```

To show update notifications to every user, keep `showUpdate: true` and set `showUpdateOnlyAdmin: false`.

#### Process Limits

Limit how many conversions and OCR jobs run at once so they fit your server's capacity:

```yaml
processExecutor:
  sessionLimit:
    libreOfficeSessionLimit: 1
    tesseractSessionLimit: 1
    pythonOpenCvSessionLimit: 8
  timeoutMinutes:
    libreOfficetimeoutMinutes: 30
    tesseractTimeoutMinutes: 30
```

### 4.2: Security Settings

Open **Settings → Security & sign-in**.

#### User Registration Control

By default, only administrators add users (see [Step 6](#step-6-user-management)). To send email invitations, configure mail:

<Tabs groupId="config-methods">
<TabItem value="settings" label="Settings File" default>

```yaml
mail:
  enabled: true
  enableInvites: true
  host: smtp.gmail.com
  port: 587
  username: noreply@yourcompany.com
  password: ${MAIL_PASSWORD}  # Use environment variable
  from: noreply@yourcompany.com
  startTlsEnable: true  # STARTTLS upgrade after connecting (port 587)
```

</TabItem>
<TabItem value="env" label="Environment Variables">

```bash
MAIL_ENABLED=true
MAIL_ENABLEINVITES=true
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=noreply@yourcompany.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=noreply@yourcompany.com
MAIL_STARTTLSENABLE=true
```

</TabItem>
</Tabs>

#### Single Sign-On

Stirling PDF supports OAuth2 / OpenID Connect providers such as Google, GitHub, and Keycloak, and SAML 2.0 providers such as Okta and Azure AD. SAML 2.0 requires an Enterprise license.

```yaml
security:
  enableLogin: true
  loginMethod: oauth2  # or 'saml2' or 'all'
  oauth2:
    enabled: true
    autoCreateUser: true  # Create users on first sign-in
    blockRegistration: false  # Set true to require admin pre-registration
```

See the [SSO Configuration Guide](./Configuration/Security/Single%20Sign-On%20Configuration.md) for provider examples.

#### Login Security Settings

```yaml
security:
  loginAttemptCount: 5  # Lock account after 5 failed attempts
  loginResetTimeMinutes: 120  # Unlock after 2 hours
```

- JWT lifetimes are configurable with `security.jwt.tokenExpiryMinutes` and `security.jwt.desktopTokenExpiryMinutes`, both in minutes.
- Password length and complexity rules are not configurable. Use SSO to apply your organization's password policy.

### 4.3: Feature Control

Open **Settings → Configuration → Endpoints** to choose which PDF tools users can see. All PDF tools are enabled by default. AI features are controlled separately by `aiEngine` and are off by default; see [Step 11](#step-11-optional-document-automation-ai).

```yaml
endpoints:
  toRemove:
    - 'add-password'
    - 'remove-password'
    - 'change-permissions'
  groupsToRemove:
    - 'LibreOffice'  # Disables all LibreOffice-based conversions
```

In the admin page, pick the tools under **Disabled Endpoints**, or whole groups under **Disabled Endpoint Groups**, then save. See [Endpoint Customisation](./Configuration/Customisation/Endpoint%20or%20Feature%20Customisation.md) for every tool ID.

### 4.4: Save and Apply Settings

Select **Save** on each settings page. Some settings need a restart, and Stirling PDF tells you when. To restart:

```bash
# Docker Compose
docker compose restart

# Docker Run
docker restart stirling-pdf
```

---

## Step 5: HTTPS & Domain Setup

:::danger Production Requirement
**Never run in production without HTTPS.** User credentials and PDF files will be transmitted in plain text over the network.
:::

Use HTTPS for access to Stirling PDF. You can terminate HTTPS at your existing reverse proxy or load balancer, or configure it directly in Stirling PDF.

### Reverse proxy integration

- Route requests to Stirling PDF's HTTP port (`8080` by default), using an address reachable from your proxy.
- Preserve the public hostname and pass the original HTTPS scheme in `X-Forwarded-Proto`. If the upstream `Host` differs from the public hostname, also pass `X-Forwarded-Host`. These values are used when constructing login redirects.
- Match the proxy's upload limit to the uploads you allow in Stirling PDF, and allow enough time for document processing.
- For a subdirectory such as `/pdf`, set `SYSTEM_ROOTURIPATH=/pdf` and forward requests with that prefix intact.

Use your proxy or hosting provider's documentation for certificate issuance, renewal and DNS setup.

### HTTPS directly in Stirling PDF

Place your certificate keystore in the mounted `configs/` directory and configure `server.ssl` in `configs/custom_settings.yml`. Set `server.port` to the HTTPS port and publish that port in your container configuration.

See [SSL/TLS Configuration](./Configuration/Customisation/Extra-Settings.md#ssltls-configuration) for the Stirling PDF settings and examples.

---

## Step 6: User Management

### 6.1: User Roles

| Role | Can do |
|---|---|
| **Admin** | Use every enabled tool, manage users, change server settings, and view usage. |
| **User** | Use the enabled tools and change their own preferences. |

### 6.2: Adding Users

Open **Settings → Workspace → People** and select **Invite people**. You can add several people at once.

- **Invite by email** sends each person a link to join and set their own password. This needs [mail configured](#user-registration-control).
- **Create account directly** sets a username and password for them. Share the password securely and turn on **Require a password change on first login**.

Choose each person's role and team before sending.

### 6.3: Managing Users

From **Settings → Workspace → People** you can reset a password, change a role, disable an account, or remove a member. Disabled users cannot sign in. Removing a member cannot be undone.

---

## Step 7: Monitoring & Usage Tracking

### 7.1: Logs

```bash
# Docker Compose
docker compose logs -f stirling-pdf

# Docker Run
docker logs -f stirling-pdf

# Last 100 lines
docker logs --tail 100 stirling-pdf

# Errors only
docker logs stirling-pdf 2>&1 | grep ERROR
```

Look for errors, repeated warnings about disk space or memory, and failed sign-in attempts.

To limit log size, or forward logs to a collector such as the ELK Stack, Splunk, Graylog, or Datadog, configure a Docker logging driver:

```yaml
services:
  stirling-pdf:
    logging:
      driver: "json-file"   # local rotation; does not forward
      options:
        max-size: "10m"
        max-file: "3"
```

```yaml
services:
  stirling-pdf:
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://your-syslog-server:514"
```

### 7.2: Health Checks

`/api/v1/info/status` is always reachable without signing in. Use it for load balancer health checks and uptime monitors such as Uptime Robot or Pingdom:

```bash
curl http://localhost:8080/api/v1/info/status
```

Request counts are available at `/api/v1/info/requests/all` and `/api/v1/info/requests/all/unique`. They need a signed-in user or an API key, and `metrics.enabled: true` (the default).

Also watch disk space for the data directories:

```bash
df -h
du -sh ./stirling-data/*
docker stats stirling-pdf
```

### 7.3: Prometheus (Team / Enterprise)

Team and Enterprise licenses include a Prometheus endpoint with HTTP request counts, grouped by endpoint, request method, and session. See [Usage Monitoring](./Configuration/Automation/Usage%20Monitoring.md#prometheus-monitoring-configuration) for setup.

---

## Step 8: Backup & Disaster Recovery

### 8.1: What to Backup

| Data | Location | Frequency | Importance |
|------|----------|-----------|------------|
| **User database (if local)** | `./stirling-data/configs/stirling-pdf-DB-<schema-version>.mv.db` | Daily | Critical |
| **Settings file** | `./stirling-data/configs/settings.yml` | After changes | Critical |
| **Custom files** | `./stirling-data/customFiles/` | After changes | High |
| **OCR languages** | `./stirling-data/tessdata/` | Weekly | Medium |
| **Logs** | `./stirling-data/logs/` | Optional | Low |

Without an external database, Stirling PDF stores users in a local H2 file named `stirling-pdf-DB-<schema-version>.mv.db`, for example `stirling-pdf-DB-2.3.232.mv.db`. The simplest backup is the whole `configs/` directory.

:::tip Team/Enterprise Recommendation
Team and Enterprise deployments should use an [external PostgreSQL database](./Configuration/Storage/External%20Database.md) instead of the local H2 file, and back it up with your usual database tooling.
:::

---

## Step 9: Performance Optimization

For resource sizing recommendations, scaling guidance, and fine tuning, see the dedicated [Performance Optimization & Sizing](./Configuration/Operations/Performance-Optimization.md) guide.

---

## Step 10: Paid Plans (Team/Enterprise)

Team and Enterprise plans add features for organizations, including:

- **SAML 2.0 single sign-on** (Enterprise), with providers such as Okta and Azure AD.
- **External PostgreSQL database** for reliability and scale.
- **Prometheus metrics** and the **Usage Monitoring** page in the admin settings.

See [Paid Offerings](./Paid-Offerings.md) for the full comparison, [pricing](https://stirling.com/pricing), or email support@stirlingpdf.com.

---

## Step 11: Optional - Document Automation & AI

### 11.1: Stirling Processor

Sign in through a web browser and select **Processor** in the quick access bar on the left. It is not currently accessible from the desktop app, although we will be adding it for desktop apps connected to supported environments. Administrators and team leaders have access by default. Default users or environments without login will not be able to access Processor. Allow server folders before creating a folder workflow.

Follow [Setup and access](./Processor/Setup-and-Access.md), then [Create your first pipeline](./Processor/Getting-Started.md).

### 11.2: AI Features

AI is off by default. Choose where it runs under **Settings → AI → AI Engine**:

- **Run your own engine:** host the AI engine on an internal network with your own model providers. Follow [Self-Hosting the AI Engine](./AI/Self-Hosting-the-AI-Engine.md).
- **Use Stirling Cloud AI:** no engine or provider keys; the work runs on Stirling Cloud and is billed to the linked account. Follow [Stirling Cloud AI](./AI/Stirling-Cloud-AI.md).

See [AI Overview](./AI/AI-Overview.md) for the available features.

---

## Recommended Steps

- **Learn Stirling PDF:** the [Getting Started Guide](./Getting%20Started.md) and the [Tool Reference](./Functionality/Functionality.md).
- **Configure further:** [OCR languages](./Configuration/Operations/OCR.md), [Pipeline Automation](./Configuration/Automation/Pipeline.md), the [API](./API.md), and [LibreOffice Parallel Processing](./Configuration/Operations/LibreOffice-Parallel-Processing.md).
- **Harden security:** [Fail2Ban](./Configuration/Security/Fail2Ban.md), an [External Database](./Configuration/Storage/External%20Database.md), and [System and Security](./Configuration/Security/System%20and%20Security.md) settings.
- **Keep it running:** test restoring your backups, and watch logs, disk space, and performance.

## Resources

- **Documentation:** https://docs.stirlingpdf.com
- **GitHub:** https://github.com/Stirling-Tools/Stirling-PDF
- **Issue Tracker:** https://github.com/Stirling-Tools/Stirling-PDF/issues
- **Release Notes:** https://github.com/Stirling-Tools/Stirling-PDF/releases
- **Discord:** https://discord.gg/HYmhKj45pU

---

## Troubleshooting Common Issues

### Authentication Issues

**Problem:** Can't log in as admin

**Solutions:**
1. Check logs: `docker logs stirling-pdf | grep ERROR`
2. Verify `SECURITY_ENABLELOGIN=true` is set
3. If another administrator can sign in, use **Settings → Workspace → People** to reset the affected account's password.

### Performance Issues

**Problem:** Slow processing, timeouts

**Solutions:**
1. Check resource limits: `docker stats stirling-pdf`
2. Increase JVM heap - see [Performance Optimization](./Configuration/Operations/Performance-Optimization.md)
3. Increase LibreOffice instances if document conversions are slow - see [LibreOffice Parallel Processing](./Configuration/Operations/LibreOffice-Parallel-Processing.md)
4. Use SSD storage for temporary files
5. Run the built-in [diagnostics tool](./Configuration/Operations/Diagnostics.md) and check application logs

### HTTPS/Certificate Issues

**Problem:** Certificate errors, HTTPS not working

**Solutions:**
1. For direct HTTPS, check the Stirling PDF logs and verify the keystore path, password and certificate alias.
2. Behind a proxy, verify the upstream address and forwarded hostname and scheme. See [HTTPS & Domain Setup](#step-5-https-domain-setup).

### File Upload Issues

**Problem:** Can't upload large files

**Solutions:**
1. Check that the proxy's upload limit allows the file size configured in Stirling PDF.
2. Raise the Stirling PDF limit: `system.fileUploadLimit: 2GB` (env `SYSTEMFILEUPLOADLIMIT=2GB`)
3. Check disk space: `df -h`
4. Check whether the proxy closes the request before processing finishes.

### Need More Help?

Run the built-in [diagnostics tool](./Configuration/Operations/Diagnostics.md) inside your Docker container to collect logs, configuration, and system information into a shareable archive.

- **Community support:** [Discord](https://discord.gg/HYmhKj45pU) and [GitHub Issues](https://github.com/Stirling-Tools/Stirling-PDF/issues)
- **Priority support:** included with Team and Enterprise plans, via support@stirlingpdf.com
