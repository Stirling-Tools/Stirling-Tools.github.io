---
sidebar_position: 5
id: Production-Deployment-Guide
title: Production Deployment Guide
description: Complete production deployment guide for server administrators deploying Stirling-PDF
---

# Production Deployment Guide

Welcome! This guide will walk you through deploying Stirling-PDF for your organization, from initial installation to advanced configuration and scaling.

:::tip For Organizations & Teams
This guide is designed for server administrators deploying Stirling-PDF for teams, departments, or entire organizations. If you're interested in **paid plan features** (external database, Google Drive, SSO, advanced user management, priority support), we'll highlight upgrade paths throughout this guide.
:::

---

## Overview: What You'll Accomplish

By the end of this guide, you'll have:

1. ✅ **Stirling-PDF running** on your infrastructure
2. ✅ **User authentication configured** with admin access
3. ✅ **Settings customized** for your organization
4. ✅ **Security hardened** with HTTPS and proper access controls
5. ✅ **Monitoring setup** to track usage and performance
6. ✅ **Understanding of paid plan** upgrade paths (Team/Enterprise)

**Time estimate:** 30-60 minutes for basic setup, 2-3 hours for full enterprise configuration

---

## Step 1: Choose Your Deployment Path

<Tabs groupId="deployment-type">
<TabItem value="docker-compose" label="Docker Compose (Recommended)" default>

**Best for:** Most organizations, production deployments, easy management

**Why Docker Compose?**
- ✅ Simple one-command deployment
- ✅ Easy updates and rollbacks
- ✅ Persistent data management
- ✅ Production-ready configuration
- ✅ Easy to scale and customize

**Requirements:**
- Docker Engine 20.10+
- Docker Compose 1.29+
- 2GB RAM minimum (4GB+ recommended)
- 10GB disk space

**Jump to:** [Docker Compose Setup](#docker-compose-setup)

</TabItem>
<TabItem value="docker-run" label="Docker Run">

**Best for:** Quick testing, single-container deployments, learning

**Why Docker Run?**
- ✅ Fastest way to get started
- ✅ Single command deployment
- ✅ Good for testing before production
- ⚠️ More manual management needed

**Requirements:**
- Docker Engine 20.10+
- 2GB RAM minimum
- 5GB disk space

**Jump to:** [Docker Run Setup](#docker-run-setup)

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

**Best for:** Enterprise scale, high availability, cloud-native deployments

**Why Kubernetes?**
- ✅ Auto-scaling capabilities
- ✅ High availability and fault tolerance
- ✅ Load balancing built-in
- ✅ Cloud provider integration
- ⚠️ More complex to set up

**Requirements:**
- Kubernetes cluster 1.19+
- kubectl configured
- Persistent volume support
- Load balancer support

**Jump to:** [Kubernetes Guide](./Installation/Kubernetes.md)

</TabItem>
<TabItem value="bare-metal" label="Bare Metal / JAR">

**Best for:** Environments without Docker, specific OS requirements

**Why Bare Metal?**
- ✅ Maximum control
- ✅ No container overhead
- ✅ Custom Java configurations
- ⚠️ More maintenance required

**Requirements:**
- Java 25+
- Linux/Unix system
- 2GB RAM minimum
- LibreOffice, Tesseract (for features)

**Jump to:** [Unix Installation Guide](./Installation/Unix.md)

</TabItem>
</Tabs>

---

## Step 2: Installation

Follow the installation instructions for your chosen deployment method from Step 1.

<Tabs groupId="deployment-type">
<TabItem value="docker-compose" label="Docker Compose (Recommended)" default>

### Docker Compose Setup

This is the recommended approach for production deployments.

#### 2.1: Create docker-compose.yml

Create a directory for your Stirling-PDF deployment:

```bash
mkdir -p ~/stirling-pdf
cd ~/stirling-pdf
```

Create `docker-compose.yml` with this production-ready configuration:

```yaml

services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    container_name: stirling-pdf
    ports:
      - '8080:8080'
    volumes:
      # Persistent data storage
      - ./stirling-data/tessdata:/usr/share/tessdata    # OCR language files
      - ./stirling-data/configs:/configs                 # Settings & database
      - ./stirling-data/logs:/logs                       # Application logs
      - ./stirling-data/customFiles:/customFiles:rw      # Custom branding files
      - ./stirling-data/pipeline:/pipeline               # Automation configs
    environment:
      # Core Settings
      - SECURITY_ENABLELOGIN=true            # Enable user authentication

      # Language & Localization
      - SYSTEM_DEFAULTLOCALE=en-US           # Default UI locale for new users

      # System Configuration
      - SYSTEM_GOOGLEVISIBILITY=false        # Hide from search engines
      - SYSTEM_ROOTURIPATH=/                 # Base URL path
      - SYSTEMFILEUPLOADLIMIT=2GB            # Max upload size. Numeric part must be 0-999

    restart: unless-stopped

    # Optional: Resource limits
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '2.0'
        reservations:
          memory: 2G
          cpus: '1.0'
```

#### 2.2: Start Stirling-PDF

```bash
# Start the container
docker-compose up -d

# Check if it's running
docker-compose ps

# View logs
docker-compose logs -f
```

#### 2.3: Verify Installation

Open your browser and navigate to:
```
http://your-server-ip:8080
```

You should see the Stirling-PDF homepage!

:::tip Success!
If you see the Stirling-PDF interface, your installation is successful. Continue to Step 3 to set up authentication.
:::

**Troubleshooting:**
- **Can't connect?** Check firewall rules: `sudo ufw allow 8080`
- **Container won't start?** Check logs: `docker-compose logs`
- **Permission errors?** Check the user and group permissions, and ensure write access is enabled for the mounted directories.

</TabItem>
<TabItem value="docker-run" label="Docker Run">

### Docker Run Setup

For quick testing or simpler deployments.

#### 2.1: Create Data Directory and Run Container

```bash
# Create data directory
mkdir -p ~/stirling-data

# Run Stirling-PDF
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
# Check if running
docker ps | grep stirling-pdf

# View logs
docker logs -f stirling-pdf
```

Open your browser and navigate to:
```
http://your-server-ip:8080
```

You should see the Stirling-PDF homepage!

:::tip Success!
If you see the Stirling-PDF interface, your installation is successful. Continue to Step 3 to set up authentication.
:::

**Troubleshooting:**
- **Can't connect?** Check firewall rules: `sudo ufw allow 8080`
- **Container won't start?** Check logs: `docker logs stirling-pdf`
- **Permission errors?** Check the user and group permissions, and ensure write access is enabled for the mounted directories.

</TabItem>
<TabItem value="kubernetes" label="Kubernetes">

### Kubernetes Setup

For enterprise-scale deployments with high availability.

Kubernetes deployment requires:
- Persistent Volume Claims (PVCs)
- Deployments and Services
- Ingress/LoadBalancer configuration
- Resource limits and autoscaling

**See full guide:** [Kubernetes Installation Guide](./Installation/Kubernetes.md)

This includes complete YAML configurations, namespace setup, SSL/TLS, and horizontal pod autoscaling.

</TabItem>
<TabItem value="bare-metal" label="Bare Metal / JAR">

### Bare Metal Setup

For environments without Docker or specific OS requirements.

Bare metal installation requires:
- Java 25+
- LibreOffice (for conversions)
- Tesseract OCR (for OCR features)
- Systemd service setup

**See full guide:** [Unix Installation Guide](./Installation/Unix.md)

This includes complete dependency installation, JAR setup, systemd configuration, and troubleshooting.

</TabItem>
</Tabs>

---

## Step 3: Initial Login & Admin Setup

Now that Stirling-PDF is running with authentication enabled, you need to create your admin account.

### 3.1: First-Time Login

1. **Navigate to your Stirling-PDF instance:**
   ```
   http://your-server-ip:8080
   ```

2. **Log in with default credentials:**
   ```
   Username: admin
   Password: stirling
   ```

3. **Change the default password immediately:**
   - After first login, go to Settings → Account
   - Change to a strong password (12+ characters, mixed case, numbers, symbols)

:::tip Customizing Default Credentials
You can set custom default credentials **before first startup** using environment variables:

```yaml
environment:
  - SECURITY_INITIALLOGIN_USERNAME=youradmin
  - SECURITY_INITIALLOGIN_PASSWORD=YourSecurePassword123!
```

**Important:** These only work on first startup. If you change them after the database is created, the old credentials remain active. Always change the password through the UI after first login.
:::

:::tip User Registration
After first login, you can control how additional users are created through Settings → Security (covered in Step 4).
:::

### 3.2: Verify Admin Access

1. **Log in with your admin account**

2. **Click the Settings gear icon** ⚙️ in the top navigation bar

3. **Verify you have admin access** by checking for admin-only sections:
   - **General Settings** - System configuration
   - **Security Settings** - User management, login settings
   - **UI Customization** - Branding and appearance
   - **User Management** - Create/manage users
   - **Endpoint Configuration** - Enable/disable tools

   **Note:** Regular users can also access Settings but only see their personal preferences (language, theme). Only admins see the sections listed above.

4. **If you don't see admin sections:**
   - Check logs: `docker logs stirling-pdf`
   - Verify you're the first user created
   - Confirm `SECURITY_ENABLELOGIN=true` is set

:::warning Secure Your Admin Account
- **Change the default password immediately** after first login
- Use a strong password (12+ characters, mixed case, numbers, symbols)
- Consider using SSO (OAuth2/SAML2) to avoid password management entirely
:::

---

## Step 4: Configure Essential Settings

Now that you're logged in as admin, let's configure Stirling-PDF for your organization.

### 4.1: General Settings

Navigate to **Settings → General**

<Tabs groupId="settings-priority">
<TabItem value="must-configure" label="Must Configure" default>

**These settings should be configured immediately:**

#### System Locale & Language
```yaml
system:
  defaultLocale: en-US  # or en-GB, de-DE, fr-FR, etc.

ui:
  languages: []  # Empty = all languages enabled. Or specify: ["en_GB", "de_DE", "fr_FR"]
```

**Why:** Ensures UI appears in the correct language for your users

#### Search Engine Visibility
```yaml
system:
  googlevisibility: false  # Prevents search engines from indexing your site
```

**Why:** Keeps your internal PDF tool private

#### File Upload Limits
```yaml
system:
  fileUploadLimit: 2GB  # numeric part must be 0-999, followed by KB, MB or GB
```

**Why:** Prevents users from uploading files that crash the system

The numeric part is limited to 0-999, so `2000MB` is rejected and leaves the limit unset. Use `2GB` instead. An empty value means no limit.

</TabItem>
<TabItem value="should-configure" label="Should Configure">

**Configure these for better user experience:**

#### Legal & Compliance
```yaml
legal:
  termsAndConditions: https://yourcompany.com/tos  # or empty string to disable
  privacyPolicy: https://yourcompany.com/privacy  # or empty string to disable
  accessibilityStatement: ''  # optional
  cookiePolicy: ''  # optional
  impressum: ''  # optional (required in some countries like Germany)
```

**Why:** Legal compliance, especially in GDPR/regulated industries

#### Update Notifications (Optional)
`showUpdate` and `showUpdateOnlyAdmin` both default to `true`, so update notifications are on and admins only see them. To suppress update notifications entirely:

```yaml
system:
  showUpdate: false  # No update notifications for anyone
```

To show update notifications to every user rather than admins only, keep `showUpdate: true` and set `showUpdateOnlyAdmin: false`.

**Why:** Control update notifications in production environments

#### Process Limits
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

**Why:** Prevents resource exhaustion based on your server capacity

</TabItem>
</Tabs>

### 4.2: Security Settings

Navigate to **Settings → Security**

:::warning Critical for Production
These settings directly impact your organization's security. Review carefully!
:::

#### User Registration Control

<Tabs groupId="user-registration">
<TabItem value="invite-only" label="Invite-Only (Recommended)" default>

**Best for:** Controlled environments, enterprises, security-conscious orgs

**How it works:**
1. Admin creates user accounts manually in Settings → User Management
2. Admin shares credentials with users securely
3. Users log in with provided credentials

**Email Invitations (Optional):**
If you configure email, admins can send invitation links instead.

<Tabs groupId="config-type">
<TabItem value="settings-yml" label="settings.yml" default>

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
<TabItem value="env-vars" label="Environment Variables">

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

</TabItem>
<TabItem value="sso" label="SSO (OAuth2/SAML2)">

**Best for:** Large enterprises, existing SSO infrastructure

**Single Sign-On (SSO) options:**
- **OAuth2:** Team tier - Supports Google, GitHub, Keycloak, any OpenID Connect provider
- **SAML2:** Enterprise tier - Supports Okta, Azure AD, etc.

**Key settings:**
```yaml
security:
  enableLogin: true
  loginMethod: oauth2  # or 'saml2' or 'all'
  oauth2:
    enabled: true
    autoCreateUser: true  # Auto-create users on first login
    blockRegistration: false  # Set true to require admin pre-registration
```

**Benefits:**
- ✅ No password management
- ✅ Centralized access control
- ✅ Automatic user provisioning
- ✅ Corporate policy compliance

**See full guide:** [SSO Configuration Guide](./Configuration/Security/Single%20Sign-On%20Configuration.md)

Complete configuration examples for Google, GitHub, Keycloak, Okta, Azure AD, and generic OIDC/SAML2 providers.

</TabItem>
</Tabs>

#### Login Security Settings

```yaml
security:
  loginAttemptCount: 5  # Lock account after 5 failed attempts
  loginResetTimeMinutes: 120  # Unlock after 2 hours
```

**Notes:**
- JWT lifetimes are configurable with `security.jwt.tokenExpiryMinutes` and `security.jwt.desktopTokenExpiryMinutes`, both in minutes
- Password policies (length, complexity) are not currently configurable
- Use SSO/OAuth2 for enterprise password policies

### 4.3: Feature Control

Navigate to **Settings → Endpoints**

Control which PDF tools are available to users.

<Tabs groupId="feature-control">
<TabItem value="recommended" label="Recommended Features" default>

**All PDF tools controlled by `endpoints` are enabled by default.** AI features are governed separately by `aiEngine` and ship off - see Step 11. You can disable specific tools if needed:

```yaml
endpoints:
  toRemove: []  # Add tool IDs to disable, e.g. ['sign', 'add-password']
  groupsToRemove: []  # Disable entire groups, e.g. ['LibreOffice']
```

Disable tools that your deployment does not need, according to your organisation's policy.

</TabItem>
<TabItem value="disable-tools" label="Disabling Specific Tools">

**Example: Disable security-sensitive tools:**

```yaml
endpoints:
  toRemove:
    - 'add-password'  # Disable password protection tool
    - 'remove-password'  # Disable password removal tool
    - 'change-permissions'  # Disable permissions modification
```

**Example: Disable entire groups:**

```yaml
endpoints:
  groupsToRemove:
    - 'LibreOffice'  # Disables all LibreOffice-based conversions
```

**How to disable in UI:**
1. Log in as admin
2. Go to Settings → Endpoints
3. In "Disabled Endpoints", select the tools you want to disable (or use "Disabled Endpoint Groups" for whole groups)
4. Save changes

**See all tool IDs:** [Endpoint Customisation](./Configuration/Customisation/Endpoint%20or%20Feature%20Customisation.md)

</TabItem>
</Tabs>

### 4.4: Save and Apply Settings

After configuring all settings:

1. **Click "Save" button** at the bottom of each settings page
2. **Verify settings saved** - You should see a success message
3. **Some settings require restart** - Check if restart notification appears
4. **Test changes** - Log out and log in as a regular user to verify

**If restart is needed:**
```bash
# Docker Compose
docker-compose restart

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

Now that your system is secure and accessible, let's set up users.

### 6.1: Understanding User Roles

<Tabs groupId="user-roles">
<TabItem value="standard-roles" label="Standard Roles" default>

**Out-of-the-box roles:**

| Role | Permissions | Use Case |
|------|-------------|----------|
| **Admin** | Full access to all features, settings, user management | System administrators, IT staff |
| **User** | Access PDF tools and personal preferences | Regular employees, end users |

**Admin capabilities:**
- ✅ Access all PDF tools
- ✅ Manage users (create, delete, reset passwords)
- ✅ Configure all settings
- ✅ View usage statistics
- ✅ Enable/disable features
- ✅ View logs (if configured)

**User capabilities:**
- ✅ Access enabled PDF tools only
- ✅ Upload and process files
- ✅ Download results
- ✅ Personal settings; no access to administrator-only settings
- ❌ No user management
- ❌ No system configuration

</TabItem>
</Tabs>

### 6.2: Adding Users

<Tabs groupId="user-creation">
<TabItem value="manual-creation" label="Manual Creation" default>

**As admin, manually create user accounts:**

1. **Navigate to Settings → User Management**

2. **Click "Add User" button**

3. **Fill in user details:**
   ```
   Username: john.doe
   Email: john.doe@yourcompany.com (optional but recommended)
   Password: Auto-generate or set manually
   Role: User (or Admin for additional admins)
   Enabled: Yes
   ```

4. **Click "Create User"**

5. **Share credentials with user** (via secure channel)

**Bulk user creation:**
You can paste a list of email addresses (one per line) to create multiple users at once.

**Best practices:**
- Use email as username for easier identification
- Auto-generate strong passwords
- Keep records of who has access

</TabItem>
<TabItem value="email-invitation" label="Email Invitation (Recommended)">

**Send email invitations** (requires email configuration):

1. **Navigate to Settings → User Management**

2. **Click "Invite User" button**

3. **Fill in details:**
   ```
   Email: jane.smith@yourcompany.com
   Role: User
   Message: Optional welcome message
   ```

4. **Click "Send Invitation"**

5. **User receives email** with magic link to register

6. **User clicks link, creates password, and is automatically logged in**

**Bulk invitations:**
You can paste a list of email addresses (one per line) to send multiple invitations at once.

**Benefits:**
- ✅ More secure (user sets own password)
- ✅ Professional onboarding experience
- ✅ Magic link authentication
- ✅ No need to share passwords

**Email configuration required:**
```yaml
Email Settings:
  SMTP Host: smtp.gmail.com
  SMTP Port: 587
  SMTP Username: noreply@yourcompany.com
  SMTP Password: your-app-password
  From Address: noreply@yourcompany.com
```

</TabItem>
</Tabs>

### 6.3: User Management Tasks

**Common admin tasks:**

#### View All Users
- Navigate to **Settings → User Management**
- See list of all users with status, role, last login

#### Reset User Password
1. Find user in user list
2. Click "Reset Password" button
3. New password generated or set manually
4. Share new password securely

#### Disable/Enable User
1. Find user in user list
2. Toggle "Enabled" switch
3. Disabled users cannot log in

#### Delete User
1. Find user in user list
2. Click "Delete" button
3. Confirm deletion
4. ⚠️ **Warning:** This is permanent

#### Change User Role
1. Find user in user list
2. Change role dropdown (User/Admin)
3. Save changes

---

## Step 7: Monitoring & Usage Tracking

Understanding how your users are using Stirling-PDF helps with capacity planning and identifying issues.

### 7.1: Basic Monitoring

<Tabs groupId="monitoring-level">
<TabItem value="logs" label="Docker Logs" default>

**View application logs:**

```bash
# Docker Compose
docker-compose logs -f stirling-pdf

# Docker Run
docker logs -f stirling-pdf

# Last 100 lines
docker logs --tail 100 stirling-pdf

# Filter for errors
docker logs stirling-pdf 2>&1 | grep ERROR
```

**What to look for:**
- ✅ Successful operations
- ⚠️ Warnings (disk space, memory)
- ❌ Errors (failed operations, crashes)
- 🔒 Security events (failed logins, unauthorized access)

**Common log entries:**
```
INFO: User john.doe uploaded file document.pdf
INFO: Operation MERGE completed successfully
WARN: Disk space low: 85% used
ERROR: OCR operation failed: Tesseract not found
```

</TabItem>
<TabItem value="external-monitoring" label="External Monitoring">

#### Basic API Monitoring

**Usage Statistics API** (available to all users):
```bash
# Application status
curl http://localhost:8080/api/v1/info/status

# Request counts
curl http://localhost:8080/api/v1/info/requests/all

# Unique sessions
curl http://localhost:8080/api/v1/info/requests/all/unique
```

**Health Check Endpoint:**
```bash
curl http://localhost:8080/api/v1/info/status

# Response:
{"status":"UP","version":"<version>"}
```

Use `/api/v1/info/status` for health and uptime checks - it is always reachable without authentication.

**Use for:**
- Load balancer health checks
- Uptime monitoring (Uptime Robot, Pingdom)
- Custom monitoring scripts

#### Prometheus Integration (Server / Enterprise)

Stirling-PDF Server and Enterprise plans support Prometheus metrics for advanced monitoring.

**Learn more:** [Usage Monitoring - Prometheus Setup](./Configuration/Automation/Usage%20Monitoring.md#prometheus-monitoring-configuration)

Prometheus exposes HTTP request counts, grouped by endpoint, request method and session. See [Usage Monitoring](./Configuration/Automation/Usage%20Monitoring.md) for licensing requirements and configuration.

#### Log Storage and Forwarding

Choose local rotation or a forwarding driver according to your logging setup:

**Option 1: Local JSON log rotation** (this does not forward logs):
```yaml
services:
  stirling-pdf:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

**Option 2: Syslog**
```yaml
services:
  stirling-pdf:
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://your-syslog-server:514"
```

**Popular log aggregation tools:**
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Splunk
- Graylog
- Datadog

</TabItem>
</Tabs>

### 7.2: Set Up Monitoring

**Basic monitoring approach:**

1. **Monitor Docker logs regularly:**
   ```bash
   docker logs stirling-pdf --tail 100 -f
   ```

2. **Check Docker container health:**
   ```bash
   docker ps
   docker stats stirling-pdf
   ```

3. **Monitor disk space:**
   ```bash
   df -h
   du -sh ./stirling-data/*
   ```

4. **Use external uptime monitoring:**
   - Uptime Robot (free)
   - Pingdom
   - StatusCake
   - Monitor the status endpoint: `http://localhost:8080/api/v1/info/status`

---

## Step 8: Backup & Disaster Recovery

Protect your users' data and configuration with proper backups.

### 8.1: What to Backup

**Critical data to backup:**

| Data | Location | Frequency | Importance |
|------|----------|-----------|------------|
| **User Database (if local)** | `./stirling-data/configs/stirling-pdf-DB-<schema-version>.mv.db` | Daily | Critical* |
| **Settings File** | `./stirling-data/configs/settings.yml` | After changes | Critical |
| **Custom Files** | `./stirling-data/customFiles/` | After changes | High |
| **OCR Languages** | `./stirling-data/tessdata/` | Weekly | Medium |
| **Logs** | `./stirling-data/logs/` | Optional | Low |

**\*Note on User Database:**
- **Free edition:** Uses a local H2 database file named `stirling-pdf-DB-<schema-version>.mv.db` (the schema version is embedded in the filename, e.g. `stirling-pdf-DB-2.3.232.mv.db`) - must be backed up. The simplest approach is to back up the whole `configs/` directory.
- **Team/Enterprise:** Should use external PostgreSQL database (backed up separately)

:::tip Team/Enterprise Recommendation
Team and Enterprise plan users should configure an external PostgreSQL database instead of using the local H2 database. This provides better reliability, scalability, and backup capabilities.

**Learn more:** [External Database Configuration](./Configuration/Storage/External%20Database.md)
:::

---

## Step 9: Performance Optimization

For resource sizing recommendations, scaling guidance, and fine tuning, see the dedicated [Performance Optimization & Sizing](./Configuration/Operations/Performance-Optimization.md) guide.

---

## Step 10: Paid Plans (Team/Enterprise)

Stirling-PDF offers **Team and Enterprise paid plans** with additional features for organizations.

### Key Paid Plan Features

**Authentication & Security:**
- **OAuth2 SSO:** Team tier (Google, GitHub, Keycloak, OIDC)
- **SAML2 SSO:** Enterprise tier (Okta, Azure AD, etc.)
- Enhanced security features

**Database & Infrastructure:**
- **External PostgreSQL Database:** Available for Team/Enterprise deployments
- Better reliability and scalability than local H2 database
- Professional backup and replication strategies

**Monitoring & Analytics:**
- **Prometheus Integration:** Advanced metrics and monitoring
- **Usage Monitoring UI:** Graphical usage statistics in the admin interface
- Enhanced monitoring APIs

**For pricing and enterprise inquiries:**
- **Email:** support@stirlingpdf.com
- **Website:** https://stirling.com/pricing
- **Documentation:** [Paid Offerings](./Paid-Offerings.md)
- **External Database Setup:** [External Database Guide](./Configuration/Storage/External%20Database.md)
- **Monitoring Setup:** [Usage Monitoring](./Configuration/Automation/Usage%20Monitoring.md)

---

## Step 11: Optional - Document Automation & AI

### 11.1: Stirling Processor

Enable login, sign in through a web browser, and open **Processor** from the app switcher. Processor is not currently accessible from the desktop app. Administrators and team leaders have access by default. Configure allowed server folders before creating a workflow.

Follow [Setup and access](./Processor/Setup-and-Access.md), then [Create your first pipeline](./Processor/Getting-Started.md).

### 11.2: AI Features

AI is disabled by default. Run the AI engine on an internal network, configure your model providers, and enable AI in Stirling PDF. Set the same shared secret on both services and keep the engine's port private.

Follow [Self-Hosting the AI Engine](./AI/Self-Hosting-the-AI-Engine.md) for a complete setup, or [AI Overview](./AI/AI-Overview.md) for available features.

---

## Recommended Steps

1. **Learn Stirling PDF**
   - Read the [Getting Started Guide](./Getting%20Started.md)
   - Explore the [Tool Reference](./Functionality/Functionality.md)

2. **Advanced configuration**
   - [OCR Configuration](./Configuration/Operations/OCR.md) - Add more languages
   - [Pipeline Automation](./Configuration/Automation/Pipeline.md) - Automate workflows
   - [API Integration](./API.md) - Integrate with other systems
   - [LibreOffice Parallel Processing](./Configuration/Operations/LibreOffice-Parallel-Processing.md) - Scale document conversions

3. **Harden security**
   - [Fail2Ban Setup](./Configuration/Security/Fail2Ban.md) - Prevent brute force
   - [External Database](./Configuration/Storage/External%20Database.md) - Use PostgreSQL
   - Review [System and Security](./Configuration/Security/System%20and%20Security.md) settings

4. **Monitor and optimize**
   - Set up regular backup verification
   - Review logs weekly
   - Monitor disk space and performance
   - Plan for growth

## Resources

### Support & Community

- **Documentation:** https://docs.stirlingpdf.com
- **GitHub:** https://github.com/Stirling-Tools/Stirling-PDF
- **Discord:** https://discord.gg/HYmhKj45pU
- **Issue Tracker:** https://github.com/Stirling-Tools/Stirling-PDF/issues

### Stay Updated

- **Release Notes:** https://github.com/Stirling-Tools/Stirling-PDF/releases
- **Blog:** https://stirlingtools.com/blog
- **Newsletter:** Subscribe at https://stirlingtools.com

---

## Troubleshooting Common Issues

### Authentication Issues

**Problem:** Can't log in as admin

**Solutions:**
1. Check logs: `docker logs stirling-pdf | grep ERROR`
2. Verify `SECURITY_ENABLELOGIN=true` is set
3. If another administrator can sign in, use User Management to reset the affected account's password.

### Performance Issues

**Problem:** Slow processing, timeouts

**Solutions:**
1. Check resource limits: `docker stats stirling-pdf`
2. Increase JVM heap - see [Performance Optimization](./Configuration/Operations/Performance-Optimization.md)
3. Increase LibreOffice instances if document conversions are slow - see [LibreOffice Parallel Processing](./Configuration/Operations/LibreOffice-Parallel-Processing.md)
4. Check disk I/O: Use SSD for temp file storage
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
2. Increase Stirling-PDF limit: `system.fileUploadLimit: 2000MB` (env `SYSTEMFILEUPLOADLIMIT=2000MB`)
3. Check disk space: `df -h`
4. Check whether the proxy closes the request before processing finishes.

### Need More Help?

Run the built-in [diagnostics tool](./Configuration/Operations/Diagnostics.md) inside your Docker container to collect logs, configuration, and system information into a shareable archive.

**For Community Support:**
- Join Discord: https://discord.gg/HYmhKj45pU
- Search GitHub Issues: https://github.com/Stirling-Tools/Stirling-PDF/issues

**For Priority Support:**
- Upgrade to Team or Enterprise plan
- Email: support@stirlingpdf.com
- Get dedicated support team
