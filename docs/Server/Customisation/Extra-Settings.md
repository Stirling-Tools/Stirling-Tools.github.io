---
sidebar_position: 3
title: Extra settings
sidebar_label: Extra settings
description: Use custom_settings.yml for logging, HTTPS, ports, header limits, a sub-path and an outgoing proxy on a self-hosted server.
---

# Extra settings

`custom_settings.yml` holds server settings that `settings.yml` does not cover, such as logging, HTTPS and the port. It sits next to `settings.yml` (`/configs/custom_settings.yml` in Docker), is created empty on first start, and overrides `settings.yml` where both set the same key. It takes standard Spring Boot property names. Restart Stirling PDF after editing it.

## Logging

```yaml
logging:
  level:
    root: INFO
    stirling.software: INFO
```

To troubleshoot, raise one area at a time and set it back afterwards, because debug logging is large and slows the server:

```yaml
logging:
  level:
    stirling.software: DEBUG                        # general problems
    org.springframework.security: DEBUG             # sign-in problems
    stirling.software.proprietary.security: DEBUG   # sign-in problems
    org.springframework.security.oauth2: DEBUG      # OAuth2 / OIDC single sign-on
    org.springframework.security.saml2: TRACE       # SAML single sign-on
    org.opensaml: DEBUG                             # SAML single sign-on
```

## Port and session length

<Tabs groupId="config-methods">
  <TabItem value="settings" label="custom_settings.yml">
    ```yaml
    server:
      port: 8080
      servlet:
        session:
          timeout: 30m
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SERVER_PORT=8080
    SERVER_SERVLET_SESSION_TIMEOUT=30m
    ```
  </TabItem>
</Tabs>

Both values shown are the defaults.

## SSL/TLS configuration

Stirling PDF can serve HTTPS itself from a PKCS12 keystore. In production it is usually simpler to put it behind a reverse proxy that handles HTTPS (see [Production checklist](../Production.md)).

<Tabs groupId="config-methods">
  <TabItem value="settings" label="custom_settings.yml">
    ```yaml
    server:
      port: 8443
      ssl:
        enabled: true
        key-store: file:./configs/keystore.p12
        key-store-password: your-keystore-password
        key-store-type: PKCS12
        key-alias: stirling
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SERVER_PORT=8443
    SERVER_SSL_ENABLED=true
    SERVER_SSL_KEYSTORE=file:./configs/keystore.p12
    SERVER_SSL_KEYSTOREPASSWORD=your-keystore-password
    SERVER_SSL_KEYSTORETYPE=PKCS12
    SERVER_SSL_KEYALIAS=stirling
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          SERVER_PORT: 8443
          SERVER_SSL_ENABLED: "true"
          SERVER_SSL_KEYSTORE: file:./configs/keystore.p12
          SERVER_SSL_KEYSTOREPASSWORD: your-keystore-password
          SERVER_SSL_KEYSTORETYPE: PKCS12
          SERVER_SSL_KEYALIAS: stirling
    ```
  </TabItem>
</Tabs>

To create a self-signed certificate for testing:

```bash
keytool -genkeypair -alias stirling -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore configs/keystore.p12 -validity 365
```

Use a certificate from a trusted certificate authority in production.

## Large request headers (HTTP 431)

If sign-in or single sign-on fails with **HTTP 431 Request Header Fields Too Large**, raise the header limit and restart:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="custom_settings.yml">
    ```yaml
    server:
      max-http-request-header-size: 65536
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SERVER_MAXHTTPREQUESTHEADERSIZE=65536
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          SERVER_MAXHTTPREQUESTHEADERSIZE: 65536
    ```
  </TabItem>
</Tabs>

Try `131072` if the error continues.

## Serve under a sub-path

To serve the app at a path such as `https://example.com/pdf` instead of the domain root, set:

```bash
SYSTEM_ROOTURIPATH=/pdf
```

In Docker, use this variable: the image's health check reads it too. Outside Docker you can instead set `server.servlet.context-path: /pdf` in `custom_settings.yml`.

Also set **Frontend URL** (`system.frontendUrl`) to the full address, for example `https://example.com/pdf`, so links in emails, share links and mobile QR codes include the path.

## Outgoing HTTP(S) proxy

To send the server's outgoing requests, such as licence checks, through a proxy, pass the standard Java proxy options. In Docker, use `JAVA_CUSTOM_OPTS`:

```yaml
services:
  stirling-pdf:
    environment:
      JAVA_CUSTOM_OPTS: "-Dhttp.proxyHost=proxy.example.com -Dhttp.proxyPort=8888 -Dhttps.proxyHost=proxy.example.com -Dhttps.proxyPort=8888 -Dhttp.nonProxyHosts=localhost|127.*|[::1]|10.*|*.svc|*.cluster.local"
```

When running the JAR, put the same `-D` options before `-jar` on the `java` command line.
