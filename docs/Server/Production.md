---
sidebar_position: 2
title: Production checklist
sidebar_label: Production checklist
description: What to set up before a Stirling PDF server goes live for a team - HTTPS, admin and users, backups, monitoring and sizing.
---

# Production checklist

Work through this list before you open a Stirling PDF server to your team.

## 1. Install a login build and pin the version

- Use the `latest` or `latest-fat` image, the Helm chart, or `Stirling-PDF-with-login.jar`. See [Install with Docker](./Install/Docker.md), [Install on Kubernetes](./Install/Kubernetes.md) or [Install with Java (JAR)](./Install/JAR.md).
- Pin a version tag instead of `latest` so upgrades happen when you choose.
- Mount at least `/configs` and `/storage`, and `/customFiles` if you use branding or signature files.
- Give it 4 CPUs and 4 GB of memory (6 GB for `latest-fat`), 16 GB or more for larger teams, and more if you turn on the AI engine in `latest-fat`. See [Performance](./Operations/Performance.md#sizing).

## 2. Secure the admin account

- Replace the default `admin` password at first sign-in, or create your own first admin before the first start. See [First login](./Server.md#first-login).
- Keep `SECURITY_ENABLELOGIN` at its default of `true`.

## 3. Serve it over HTTPS

**Behind a reverse proxy or load balancer** (most setups):

- Forward requests to port `8080` with the `X-Forwarded-Proto`, `X-Forwarded-Host` and `X-Forwarded-Port` headers.
- Accept uploads as large as `system.fileUploadLimit` (2000 MB by default).
- Turn off response buffering and allow 30-minute read timeouts for long AI and Processor runs.
- To serve under a sub-path such as `/pdf`, set `SYSTEM_ROOTURIPATH=/pdf` and forward the prefix unchanged.

**HTTPS in Stirling PDF itself:** put your keystore in `configs/` and set `server.ssl` in `custom_settings.yml`. See [Extra settings](./Customisation/Extra-Settings.md).

Then set the public addresses the server hands out in links:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      backendUrl: https://pdf.example.com    # required for single sign-on callbacks
      frontendUrl: https://pdf.example.com   # used in invite emails, share links and mobile QR codes
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_BACKENDURL=https://pdf.example.com
    SYSTEM_FRONTENDURL=https://pdf.example.com
    ```
  </TabItem>
</Tabs>

### Example: nginx

```nginx
server {
    listen 80;
    server_name pdf.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name pdf.example.com;

    ssl_certificate     /etc/ssl/certs/pdf.example.com.crt;
    ssl_certificate_key /etc/ssl/private/pdf.example.com.key;

    client_max_body_size 2000M;    # nginx allows 1 MB by default

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_buffering off;
        proxy_read_timeout 1800s;
        proxy_send_timeout 1800s;
    }
}
```

## 4. Set up sign-in and users

- Add people in **Settings → Workspace → Users → Invite people**. **Invite by email** needs [email configuration](./Security/Sign-in-and-Security.md#email-configuration); otherwise use **Create account directly**.
- Connect your identity provider: [OAuth2 / OIDC single sign-on](./Security/OAuth-SSO.md) works on every plan, [SAML single sign-on](./Security/SAML-SSO.md) needs Enterprise.
- Failed sign-ins lock an account after 5 attempts for 120 minutes (`security.loginAttemptCount`, `security.loginResetTimeMinutes`). For IP bans, add [Fail2Ban](./Security/Fail2Ban.md).

## 5. Decide what users can do

- Hide tools you don't want offered: see [Turn features on or off](./Customisation/Features-and-Endpoints.md).
- Add your own legal links and login agreement in **Settings → Server → Legal & privacy**.
- Choose whether anonymous usage data is sent: see [Analytics and telemetry](./Analytics-and-Telemetry.md).

## 6. Back up

- Back up the whole `configs/` folder. It holds your settings, generated keys and the built-in database.
- The built-in database also writes a backup every night to `configs/backup/db/`. Copy those off the server too.
- Back up `storage/`. It holds the files users save on the server.
- Back up `customFiles/` if you use it.
- On Team or Enterprise you can use PostgreSQL instead: see [Database](./Storage/Database.md).

## 7. Monitor

- Point uptime and load balancer health checks at `/api/v1/info/status` (after your root path, if you set one). It needs no sign-in.
- Logs are in `logs/`, or `docker logs stirling-pdf`.
- Team and Enterprise add Prometheus metrics: see [Usage monitoring](./Operations/Usage-Monitoring.md). Enterprise adds **Usage Analytics** and **Audit log** under **Settings → Monitoring**.
- When something breaks, [Diagnostics](./Operations/Diagnostics.md) collects logs and settings into one archive.

## 8. Plan for load and updates

- Tune how many OCR and Office jobs run at once in [Process limits](./Operations/Process-Limits.md) and [LibreOffice parallel processing](./Operations/LibreOffice.md). For several nodes, see [Clustering](./Operations/Clustering.md) (Team and Enterprise).
- Back up `configs/` before each update. Coming from V1? Read [Upgrading from V1](./Upgrading/Upgrading.md) first.

## Optional extras

- [AI on your server](./AI/AI.md)
- [Processor server settings](./Automation/Processor-Settings.md)
- [Connect to Stirling Cloud](./Licensing/Connect-to-Stirling-Cloud.md)
