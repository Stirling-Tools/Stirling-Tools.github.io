---
sidebar_position: 1
id: Production-Deployment-Guide
title: Production Deployment Guide
description: Complete production deployment guide for server administrators deploying Stirling-PDF
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
6. ✅ **Understanding of paid plan** upgrade paths (Server/Enterprise)

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
- Java 21+
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
version: '3.3'

services:
  stirling-pdf:
    image: stirlingtools/stirling-pdf:latest
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
      - LANGS=en_GB                          # Change to your locale

      # System Configuration
      - SYSTEM_DEFAULTLOCALE=en-GB           # Default locale
      - SYSTEM_GOOGLEVISIBILITY=false        # Hide from search engines
      - SYSTEM_ROOTURIPATH=/                 # Base URL path
      - SYSTEM_CONNECTIONTIMEOUTMINUTES=5    # Connection timeout
      - SYSTEM_MAXFILESIZE=2000              # Max file size in MB

      # Optional: Logging
      - SYSTEM_CUSTOMSTATICFILEPATH=/customFiles/static/  # Custom files path

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
- **Permission errors?** Fix permissions: `sudo chmod -R 755 ./stirling-data`

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
  -e LANGS=en_GB \
  -e SYSTEM_DEFAULTLOCALE=en-GB \
  -e SYSTEM_GOOGLEVISIBILITY=false \
  -e SYSTEM_MAXFILESIZE=2000 \
  --restart unless-stopped \
  stirlingtools/stirling-pdf:latest
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
- **Permission errors?** Fix permissions: `sudo chmod -R 755 ~/stirling-data`

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
- Java 21+
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

:::caution Secure Your Admin Account
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
  fileUploadLimit: 2000MB  # or "2GB" - adjust based on your needs
```

**Why:** Prevents users from uploading files that crash the system

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
```yaml
system:
  showUpdate: false  # Set true to show update notifications
  showUpdateOnlyAdmin: false  # Only admins see updates (requires showUpdate: true)
```

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

:::caution Critical for Production
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
  smtp:
    host: smtp.gmail.com
    port: 587
    username: noreply@yourcompany.com
    password: ${MAIL_PASSWORD}  # Use environment variable
    tls:
      enabled: true
```

</TabItem>
<TabItem value="env-vars" label="Environment Variables">

```bash
MAIL_ENABLED=true
MAIL_ENABLEINVITES=true
MAIL_SMTP_HOST=smtp.gmail.com
MAIL_SMTP_PORT=587
MAIL_SMTP_USERNAME=noreply@yourcompany.com
MAIL_SMTP_PASSWORD=your-app-password
MAIL_SMTP_TLS_ENABLED=true
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="sso" label="SSO (OAuth2/SAML2)">

**Best for:** Large enterprises, existing SSO infrastructure

**Single Sign-On (SSO) options:**
- **OAuth2:** Enterprise only - Supports Google, GitHub, Keycloak, any OpenID Connect provider
- **SAML2:** Enterprise only - Supports Okta, Azure AD, etc.

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

**See full guide:** [SSO Configuration Guide](./Configuration/Single%20Sign-On%20Configuration.md)

Complete configuration examples for Google, GitHub, Keycloak, Okta, Azure AD, and generic OIDC/SAML2 providers.

</TabItem>
</Tabs>

#### Login Security Settings

```yaml
security:
  csrfDisabled: false  # NEVER disable CSRF protection in production
  loginAttemptCount: 5  # Lock account after 5 failed attempts
  loginResetTimeMinutes: 120  # Unlock after 2 hours
```

**Notes:**
- Session timeout is not configurable via settings
- Password policies (length, complexity) are not currently configurable
- Use SSO/OAuth2 for enterprise password policies

### 4.3: Feature Control

Navigate to **Settings → Endpoints**

Control which PDF tools are available to users.

<Tabs groupId="feature-control">
<TabItem value="recommended" label="Recommended Features" default>

**All tools are enabled by default.** You can disable specific tools if needed:

```yaml
endpoints:
  toRemove: []  # Add tool IDs to disable, e.g. ['sign', 'add-password']
  groupsToRemove: []  # Disable entire groups, e.g. ['LibreOffice']
```

**Most organizations don't need to disable anything** - all tools are useful and safe

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
3. Find tool you want to disable
4. Toggle off
5. Save changes

**See all tool IDs:** [Endpoint Customisation](./Configuration/Endpoint%20or%20Feature%20Customisation.md)

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

### 5.1: Choose Your HTTPS Method

<Tabs groupId="https-method">
<TabItem value="builtin-ssl" label="Built-in SSL (Simple)" default>

**Best for:** Simple deployments, no reverse proxy needed

Stirling-PDF can handle HTTPS directly using built-in SSL configuration.

#### Configure SSL in Stirling-PDF

1. **Generate or obtain SSL certificate:**

   **Option A: Self-signed (for testing/internal use):**
   ```bash
   # Generate self-signed certificate
   keytool -genkeypair \
     -alias stirling \
     -keyalg RSA \
     -keysize 2048 \
     -storetype PKCS12 \
     -keystore keystore.p12 \
     -validity 365

   # Move to configs directory
   mv keystore.p12 ./stirling-data/configs/
   ```

   **Option B: Let's Encrypt (for production):**
   ```bash
   # Get certificate with certbot
   sudo certbot certonly --standalone -d pdf.yourcompany.com

   # Convert to PKCS12 format
   sudo openssl pkcs12 -export \
     -in /etc/letsencrypt/live/pdf.yourcompany.com/fullchain.pem \
     -inkey /etc/letsencrypt/live/pdf.yourcompany.com/privkey.pem \
     -out keystore.p12 \
     -name stirling

   # Move to configs
   sudo mv keystore.p12 ./stirling-data/configs/
   sudo chown $USER:$USER ./stirling-data/configs/keystore.p12
   ```

2. **Create custom_settings.yml:**

   Create `./stirling-data/configs/custom_settings.yml`:
   ```yaml
   server:
     port: 8443  # HTTPS port
     ssl:
       enabled: true
       key-store: file:/configs/keystore.p12
       key-store-password: your-keystore-password
       key-store-type: PKCS12
       key-alias: stirling
   ```

3. **Update docker-compose.yml to expose port 8443:**
   ```yaml
   services:
     stirling-pdf:
       ports:
         - '8443:8443'  # Change from 8080:8080
   ```

4. **Restart Stirling-PDF:**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

5. **Access via HTTPS:**
   ```
   https://pdf.yourcompany.com:8443
   ```

**Benefits:**
- ✅ Simple setup, no reverse proxy needed
- ✅ Direct SSL termination in application
- ✅ Good for small deployments

**Limitations:**
- ⚠️ Manual certificate renewal
- ⚠️ No load balancing
- ⚠️ Port 8443 instead of standard 443

**Learn more:** [Custom Settings - SSL Configuration](./Configuration/Extra-Settings#ssltls-configuration)

</TabItem>
<TabItem value="reverse-proxy" label="Reverse Proxy (Production)">

**Best for:** Production deployments, standard ports (443), load balancing

Use a reverse proxy like **Nginx, Apache, or Traefik** to handle HTTPS.

#### Option A: Nginx with Let's Encrypt

**Install Nginx and Certbot:**
```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx
```

**Configure Nginx:**

Create `/etc/nginx/sites-available/stirling-pdf`:
```nginx
server {
    listen 80;
    server_name pdf.yourcompany.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name pdf.yourcompany.com;

    # SSL certificates (will be added by certbot)
    ssl_certificate /etc/letsencrypt/live/pdf.yourcompany.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pdf.yourcompany.com/privkey.pem;

    # Strong SSL settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Large file uploads
    client_max_body_size 2000M;
    client_body_timeout 300s;

    # Proxy to Stirling-PDF
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (if needed)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts for large files
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }
}
```

**Enable site and get certificate:**
```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/stirling-pdf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Get Let's Encrypt certificate
sudo certbot --nginx -d pdf.yourcompany.com

# Auto-renewal (certbot sets this up automatically)
sudo certbot renew --dry-run
```

**Update DNS:**
```
A record: pdf.yourcompany.com → your-server-ip
```

**Access your site:**
```
https://pdf.yourcompany.com
```

</TabItem>
<TabItem value="traefik" label="Traefik (Docker-Native)">

**Best for:** Docker environments, automatic certificate management

Traefik is a Docker-native reverse proxy that automatically:
- Obtains SSL certificates from Let's Encrypt
- Renews certificates automatically
- Routes traffic based on Docker labels

**Key benefits:**
- ✅ Zero-config certificate management
- ✅ Docker label-based routing
- ✅ Automatic service discovery

Add Traefik container to your `docker-compose.yml` and configure Stirling-PDF with Docker labels for routing.

**See Traefik documentation:** https://doc.traefik.io/traefik/user-guides/docker-compose/basic-example/

</TabItem>
<TabItem value="cloudflare" label="Cloudflare Tunnel">

**Best for:** No public IP, behind firewall, home servers

Cloudflare Tunnel provides:
- ✅ No port forwarding needed
- ✅ DDoS protection included
- ✅ Automatic HTTPS
- ✅ Free for most use cases

**Quick setup:**
1. Install `cloudflared`
2. Authenticate with Cloudflare
3. Create tunnel pointing to `http://localhost:8080`
4. Add DNS record
5. Run as system service

**See Cloudflare documentation:** https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/

</TabItem>
</Tabs>

### 5.2: Update Stirling-PDF Configuration

After setting up HTTPS, update Stirling-PDF to use the correct URL:

**In Settings → General:**
```yaml
System Settings:
  Root URI Path: / (or /pdf if using subdirectory)
  Frontend URL: https://pdf.yourcompany.com
  CORS Allowed Origins: https://pdf.yourcompany.com
```

**Environment variable (if using split deployment):**
```yaml
environment:
  - VITE_API_BASE_URL=https://pdf.yourcompany.com
  - SYSTEM_ROOTURIPATH=/
  - SECURITY_CSRFDISABLED=false
```

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
| **User** | Access to enabled PDF tools, no settings access | Regular employees, end users |

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
- ❌ No settings access
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

# Unique users
curl http://localhost:8080/api/v1/info/requests/all/unique
```

**Health Check Endpoint:**
```bash
curl http://localhost:8080/api/v1/health

# Response:
{"status":"UP","components":{"diskSpace":{"status":"UP"}}}
```

**Use for:**
- Load balancer health checks
- Uptime monitoring (Uptime Robot, Pingdom)
- Custom monitoring scripts

#### Prometheus Integration (Enterprise)

Stirling-PDF Enterprise plan supports Prometheus metrics for advanced monitoring.

**Learn more:** [Usage Monitoring - Prometheus Setup](./Configuration/Usage%20Monitoring#prometheus-monitoring-configuration)

**Features:**
- JVM metrics (memory, GC, threads)
- System metrics (CPU, disk)
- Application metrics (request rates, processing times)
- PDF processing metrics

#### Log Aggregation

Forward logs to centralized logging:

**Option 1: Docker log driver**
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
   - Monitor the health endpoint: `http://localhost:8080/api/v1/health`

---

## Step 8: Backup & Disaster Recovery

Protect your users' data and configuration with proper backups.

### 8.1: What to Backup

**Critical data to backup:**

| Data | Location | Frequency | Importance |
|------|----------|-----------|------------|
| **User Database (if local)** | `./stirling-data/configs/stirling-pdf.db` | Daily | Critical* |
| **Settings File** | `./stirling-data/configs/settings.yml` | After changes | Critical |
| **Custom Files** | `./stirling-data/customFiles/` | After changes | High |
| **OCR Languages** | `./stirling-data/tessdata/` | Weekly | Medium |
| **Logs** | `./stirling-data/logs/` | Optional | Low |

**\*Note on User Database:**
- **Free edition:** Uses local H2 database (`stirling-pdf.db`) - must be backed up
- **Server/Enterprise:** Should use external PostgreSQL database (backed up separately)

:::tip Server/Enterprise Recommendation
Server and Enterprise plan users should configure an external PostgreSQL database instead of using the local H2 database. This provides better reliability, scalability, and backup capabilities.

**Learn more:** [External Database Configuration](./Configuration/External%20Database.md)
:::

### 8.2: Backup Strategies

<Tabs groupId="backup-strategy">
<TabItem value="simple-backup" label="Simple Backup Script" default>

**Create automated backup script:**

Create `backup-stirling.sh`:
```bash
#!/bin/bash

# Configuration
BACKUP_DIR="/backups/stirling-pdf"
STIRLING_DATA="/path/to/stirling-data"
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Generate timestamp
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/stirling-backup-$TIMESTAMP.tar.gz"

# Stop container (optional, for consistency)
# docker-compose -f /path/to/docker-compose.yml stop stirling-pdf

# Create backup
tar -czf "$BACKUP_FILE" \
  -C "$STIRLING_DATA" \
  configs/ \
  customFiles/ \
  tessdata/

# Start container (if stopped)
# docker-compose -f /path/to/docker-compose.yml start stirling-pdf

# Delete old backups
find "$BACKUP_DIR" -name "stirling-backup-*.tar.gz" -mtime +$RETENTION_DAYS -delete

# Log result
echo "[$TIMESTAMP] Backup completed: $BACKUP_FILE"
```

**Make executable and schedule:**
```bash
chmod +x backup-stirling.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add: 0 2 * * * /path/to/backup-stirling.sh >> /var/log/stirling-backup.log 2>&1
```

</TabItem>
<TabItem value="docker-volume-backup" label="Docker Volume Backup">

**Backup Docker volumes:**

```bash
# Stop container
docker-compose stop stirling-pdf

# Backup volumes
docker run --rm \
  -v $(pwd)/stirling-data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar -czf /backup/stirling-data-$(date +%Y%m%d).tar.gz /data

# Start container
docker-compose start stirling-pdf
```

**Automated with Cron:**
Create `docker-volume-backup.sh`:
```bash
#!/bin/bash
cd /path/to/stirling-pdf
docker-compose stop stirling-pdf
docker run --rm \
  -v "$(pwd)/stirling-data:/data" \
  -v "$(pwd)/backups:/backup" \
  alpine tar -czf /backup/stirling-data-$(date +%Y%m%d).tar.gz /data
docker-compose start stirling-pdf

# Cleanup old backups (keep 30 days)
find backups/ -name "stirling-data-*.tar.gz" -mtime +30 -delete
```

</TabItem>
</Tabs>

### 8.3: Restore from Backup

**Restore procedure:**

1. **Stop Stirling-PDF:**
   ```bash
   docker-compose stop stirling-pdf
   ```

2. **Extract backup:**
   ```bash
   tar -xzf stirling-backup-YYYYMMDD-HHMMSS.tar.gz -C ./stirling-data/
   ```

3. **Verify files restored:**
   ```bash
   ls -la ./stirling-data/configs/
   # Should see: stirling-pdf.db, settings.yml
   ```

4. **Start Stirling-PDF:**
   ```bash
   docker-compose start stirling-pdf
   ```

5. **Verify functionality:**
   - Access web interface
   - Log in as admin
   - Check users exist
   - Verify settings

---

## Step 9: Performance Optimization

Optimize Stirling-PDF for your workload and server capacity.

### 9.1: Resource Allocation

<Tabs groupId="server-size">
<TabItem value="small-team" label="Small Team (5-20 users)" default>

**Recommended specifications:**
- **CPU:** 2 cores
- **RAM:** 4GB
- **Disk:** 20GB
- **Concurrent operations:** 2-4

**Docker resource limits:**
```yaml
deploy:
  resources:
    limits:
      memory: 4G
      cpus: '2.0'
    reservations:
      memory: 2G
      cpus: '1.0'
```

**Settings:**
```yaml
system:
  maxFileSize: 500  # 500MB max file
  connectionTimeoutMinutes: 5
  maxConcurrentOperations: 2
```

</TabItem>
<TabItem value="medium-team" label="Medium Team (20-100 users)">

**Recommended specifications:**
- **CPU:** 4 cores
- **RAM:** 8GB
- **Disk:** 50GB
- **Concurrent operations:** 4-8

**Docker resource limits:**
```yaml
deploy:
  resources:
    limits:
      memory: 8G
      cpus: '4.0'
    reservations:
      memory: 4G
      cpus: '2.0'
```

**Settings:**
```yaml
system:
  maxFileSize: 1000  # 1GB max file
  connectionTimeoutMinutes: 10
  maxConcurrentOperations: 4
```

**Consider:**
- Split deployment (separate frontend/backend)
- Load balancer for multiple instances
- Database on separate server

</TabItem>
<TabItem value="large-org" label="Large Organization (100+ users)">

**Recommended specifications:**
- **CPU:** 8+ cores
- **RAM:** 16GB+
- **Disk:** 100GB+ (SSD recommended)
- **Concurrent operations:** 8+

**Docker resource limits:**
```yaml
deploy:
  resources:
    limits:
      memory: 16G
      cpus: '8.0'
    reservations:
      memory: 8G
      cpus: '4.0'
```

**Settings:**
```yaml
system:
  maxFileSize: 2000  # 2GB max file
  connectionTimeoutMinutes: 15
  maxConcurrentOperations: 8
```

**Architecture:**
- Split deployment (separate frontend/backend)
- Multiple backend instances for processing
- Load balancer with session affinity
- Dedicated database server
- Redis for session storage
- CDN for frontend assets

:::tip Server/Enterprise Recommended
For large organizations, **Server or Enterprise plans** provide:
- Advanced load balancing
- High availability configuration
- Database clustering
- Performance monitoring
- Dedicated support

[Learn more](#step-10-proenterprise-edition)
:::

</TabItem>
</Tabs>

### 9.2: Storage Management

**Monitor disk usage:**
```bash
# Check Docker disk usage
docker system df

# Check Stirling-PDF data usage
du -sh ./stirling-data/*
```

**Cleanup strategies:**

```yaml
system:
  # Automatic cleanup settings
  tempFileCleanup: true
  tempFileMaxAge: 24  # hours

  # Log rotation
  logRetentionDays: 30
  maxLogSize: 100  # MB
```

**Manual cleanup:**
```bash
# Clean Docker system
docker system prune -a --volumes

# Clean old logs
find ./stirling-data/logs -name "*.log" -mtime +30 -delete

# Clean temporary files (if not auto-cleaned)
find ./stirling-data/temp -type f -mtime +1 -delete
```

---

## Step 10: Paid Plans (Server/Enterprise)

Stirling-PDF offers **Server and Enterprise paid plans** with additional features for organizations.

### Key Paid Plan Features

**Authentication & Security:**
- **SAML2 SSO:** Enterprise-grade single sign-on (OAuth2 is free)
- Enhanced security features

**Database & Infrastructure:**
- **External PostgreSQL Database:** Available for Server/Enterprise deployments
- Better reliability and scalability than local H2 database
- Professional backup and replication strategies

**Monitoring & Analytics:**
- **Prometheus Integration:** Advanced metrics and monitoring
- **Usage Dashboard:** Graphical usage statistics at `/usage`
- Enhanced monitoring APIs

**For pricing and enterprise inquiries:**
- **Email:** support@stirlingtools.com
- **Website:** https://stirlingtools.com/pricing
- **Documentation:** [Paid Offerings](./Paid-Offerings)
- **External Database Setup:** [External Database Guide](./Configuration/External%20Database.md)
- **Monitoring Setup:** [Usage Monitoring](./Configuration/Usage%20Monitoring.md)

---

## Next Steps & Resources

Congratulations! You've successfully deployed and configured Stirling-PDF for your organization.

### Recommended Next Steps

1. **📚 Train your users**
   - Share the [Getting Started Guide](./Getting%20Started.md)
   - Point them to [Tool Reference](./Functionality/Functionality.md)
   - Create internal documentation for your specific workflows

2. **🔧 Advanced configuration**
   - [OCR Configuration](./Configuration/OCR.md) - Add more languages
   - [Pipeline Automation](./Configuration/Pipeline.md) - Automate workflows
   - [API Integration](./API.md) - Integrate with other systems

3. **🔒 Harden security**
   - [Fail2Ban Setup](./Configuration/Fail2Ban.md) - Prevent brute force
   - [External Database](./Configuration/External%20Database.md) - Use PostgreSQL
   - Review [System and Security](./Configuration/System%20and%20Security.md) settings

4. **📊 Monitor and optimize**
   - Set up regular backup verification
   - Review logs weekly
   - Monitor disk space and performance
   - Plan for growth

### Support & Community

- **Documentation:** https://docs.stirlingpdf.com
- **GitHub:** https://github.com/Stirling-Tools/Stirling-PDF
- **Discord:** https://discord.gg/Cn8pWhQRxZ
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
3. Reset admin password via command line:
   ```bash
   docker exec -it stirling-pdf sh
   # Use built-in password reset tool
   ```

### Performance Issues

**Problem:** Slow processing, timeouts

**Solutions:**
1. Check resource limits: `docker stats stirling-pdf`
2. Increase memory: Update `deploy.resources.limits.memory`
3. Reduce concurrent operations: Lower `maxConcurrentOperations`
4. Check disk I/O: Use SSD for better performance

### HTTPS/Certificate Issues

**Problem:** Certificate errors, HTTPS not working

**Solutions:**
1. Check Nginx/Traefik logs
2. Verify DNS points to correct IP
3. Ensure ports 80 and 443 are open
4. Test Let's Encrypt manually: `sudo certbot certificates`

### File Upload Issues

**Problem:** Can't upload large files

**Solutions:**
1. Increase Nginx limit: `client_max_body_size 2000M;`
2. Increase Stirling-PDF limit: `system.maxFileSize: 2000`
3. Check disk space: `df -h`
4. Increase timeouts: `client_body_timeout 300s;`

### Need More Help?

**For Community Support:**
- Join Discord: https://discord.gg/Cn8pWhQRxZ
- Search GitHub Issues: https://github.com/Stirling-Tools/Stirling-PDF/issues

**For Priority Support:**
- Upgrade to Server or Enterprise plan
- Email: support@stirlingtools.com
- Get dedicated support team

---

**You're all set!** 🎉

Your Stirling-PDF deployment is ready for production use. If you have any questions or need assistance, don't hesitate to reach out to our community or consider upgrading to a paid plan (Server or Enterprise) for dedicated support.

Happy PDF processing! 📄✨
