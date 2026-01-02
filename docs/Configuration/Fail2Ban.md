---
sidebar_position: 8
id: fail2ban
title: Fail2Ban Integration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fail2Ban Setup for Stirling-PDF
This document provides instructions on how to set up Fail2Ban with Stirling-PDF to protect against unauthorized login attempts. (Note Stirling-PDF blocks IPs after a set retry count regardless of Fail2Ban, This configuration is only useful for users specifically wanting Fail2Ban configuration)

## How does Fail2Ban Work with Stirling-PDF
Stirling-PDF logs failed authentication attempts to a log file which Fail2Ban monitors. When it detects multiple failed login attempts from the same IP address, Fail2Ban automatically blocks that IP address for a configured period of time.


## Prerequisites
- Fail2Ban installed on your system
- Access to Stirling-PDF log directory
- Security settings configured:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: true    # Login must be enabled for Fail2Ban integration
      loginAttemptCount: -1 # Set to -1 when using Fail2Ban recommended but not required
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_ENABLELOGIN=true
    SECURITY_LOGINATTEMPTCOUNT=-1
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          SECURITY_ENABLELOGIN: true
          SECURITY_LOGINATTEMPTCOUNT: -1
    ```
  </TabItem>
</Tabs>

### Important Configuration Notes
- The `enableLogin` setting must be set to `true` as Fail2Ban integration requires authentication to be active
- When using Fail2Ban, set `loginAttemptCount` to `-1` to disable the built-in account locking mechanism and let Fail2Ban handle login attempt management
- For more details on security configuration options, refer to the [System and Security](./System%20and%20Security.md) documentation

## Configuration

### Log File Location
The log file location containing the failed authentication messages depends on your installation type:

- **Default/Docker Installation**: ``./logs/invalid-auths.log``
- **Windows Desktop**: ``%APPDATA%\Stirling-PDF\logs\invalid-auths.log``
- **MacOS Desktop**: ``~/Library/Application Support/Stirling-PDF/logs/invalid-auths.log``
- **Linux Desktop**: ``~/.config/Stirling-PDF/logs/invalid-auths.log``

###  Example Fail2Ban Filter
`/etc/fail2ban/filter.d/stirling-pdf.conf`
```ini
[Definition]
failregex = Failed login attempt from IP: <HOST>
```

### Example Jail Configuration
`/etc/fail2ban/jail.local`
```ini
[stirling-pdf]
enabled = true
filter = stirling-pdf
logpath = /logs/invalid-auths.log
maxretry = 5
findtime = 300
bantime = 3600
```

Configuration parameters:
- `maxretry`: Number of failed attempts before ban (default: 5)
- `findtime`: Time window for failed attempts in seconds (default: 300 seconds / 5 minutes)
- `bantime`: Duration of the ban in seconds (default: 3600 seconds / 1 hour)


### Ensure access to Logs path
<Tabs groupId="docker-config">
  <TabItem value="docker-compose" label="Docker Compose">
    Modify your `docker-compose.yml` to expose the log directory:
    ```yaml
    services:
      stirling-pdf:
        volumes:
          - ./logs:/logs
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    Add the volume mount to your Docker run command:
    ```bash
    -v ./logs:/logs
    ```
  </TabItem>
</Tabs>
