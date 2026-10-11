---
sidebar_position: 6
title: Fail2Ban
sidebar_label: Fail2Ban
description: Block IP addresses that repeatedly fail to sign in, using Fail2Ban and the server's log files.
---

# Fail2Ban

<Badge>Login required</Badge>

Stirling PDF logs failed sign-ins with the client's IP address, so Fail2Ban can ban IPs that fail too often. Behind a reverse proxy, the proxy must set `X-Forwarded-For` to the client's address, replacing any value the client sent (in nginx, `proxy_set_header X-Forwarded-For $remote_addr;`). Otherwise failures are logged with the proxy's IP, or with an IP the client made up.

This is separate from the built-in lockout, which locks the user account rather than the IP address ([Sign-in and security](./Sign-in-and-Security.md)).

## Prerequisites

- Fail2Ban installed on the host.
- Optional: turn off the built-in account lockout so Fail2Ban alone handles failed attempts:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      loginAttemptCount: -1
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_LOGINATTEMPTCOUNT=-1
    ```
  </TabItem>
</Tabs>

## 1. Make the log files reachable

Failed sign-ins are logged in the `logs` folder: `/logs` in Docker, or `logs/` next to a JAR.

- `info.log` records wrong passwords from the web and desktop apps as `Invalid password for user: <name> from IP: <ip>`, and wrong two-factor codes as `Invalid MFA code for user: <name> from IP: <ip>`.
- `invalid-auths.log` records failures on the older form-based sign-in as `Failed login attempt from IP: <ip>`.

Sign-ins with a username that doesn't exist are logged without an IP address, so Fail2Ban can't count them.

In Docker, mount the folder so the host can read it:

```yaml
services:
  stirling-pdf:
    volumes:
      - ./logs:/logs
```

## 2. Add a filter

Create `/etc/fail2ban/filter.d/stirling-pdf.conf`:

```ini
[Definition]
failregex = Invalid password for user: .+ from IP: <HOST>$
            Invalid MFA code for user: .+ from IP: <HOST>$
            Failed login attempt from IP: <HOST>$
```

## 3. Add a jail

Add to `/etc/fail2ban/jail.local`, with `logpath` pointing at the log files on the host:

```ini
[stirling-pdf]
enabled = true
filter = stirling-pdf
logpath = /path/to/logs/info.log
          /path/to/logs/invalid-auths.log
maxretry = 5
findtime = 300
bantime = 3600
```

This bans an IP for 1 hour (`bantime`, in seconds) after 5 failures (`maxretry`) within 5 minutes (`findtime`). Restart Fail2Ban to apply it.
