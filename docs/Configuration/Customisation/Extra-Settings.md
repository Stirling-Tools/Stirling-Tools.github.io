---
sidebar_position: 3
title: Custom Settings Configuration
---

# Custom Settings Configuration

Stirling PDF provides a `/configs/custom_settings.yml` file where users can configure additional settings beyond the standard configuration. This file follows standard YAML format and supports Spring Boot application properties, allowing you to customize the application without modifying core files.

## Logging Configuration

Control the verbosity of logs by adjusting log levels for different components:

```yaml
logging:
  level:
    root: INFO
    org.springframework: WARN
    org.hibernate: WARN
    org.eclipse.jetty: WARN
    stirling.software.SPDF: INFO
    # Enable debug logging for specific components when troubleshooting
    # org.springframework.security.saml2: TRACE
    # org.springframework.security: DEBUG
    # org.opensaml: DEBUG
```

## Server Configuration

Configure server behavior including port, address binding, and session timeout:

```yaml
server:
  port: 8080  # Default port
  address: 0.0.0.0  # Bind to all interfaces
  servlet:
    context-path: /  # Application context path
    session:
      timeout: 30m  # Session timeout
  jetty:
    threads:
      max: 200  # Maximum number of request processing threads
      min: 10   # Minimum number of threads always kept running
    connection-idle-timeout: 30000  # Connection idle timeout in milliseconds
  max-http-request-header-size: 65536  # Maximum request header size in bytes
```

### HTTP 431 "Request Header Fields Too Large" during SSO/OAuth login

If requests fail with **HTTP 431 Request Header Fields Too Large**, raise the HTTP request-header limit with `server.max-http-request-header-size`.

<Tabs groupId="config-methods">
  <TabItem value="settings" label="custom_settings.yml">
    ```yaml
    server:
      max-http-request-header-size: 65536  # bytes
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      SERVER_MAXHTTPREQUESTHEADERSIZE: "65536"
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    docker run -d \
      -p 8080:8080 \
      -e SERVER_MAXHTTPREQUESTHEADERSIZE=65536 \
      docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    ```
  </TabItem>
</Tabs>

Raise the value further (for example `131072`) if the error persists, then restart Stirling PDF.

## SSL/TLS Configuration

Configure HTTPS for secure connections:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    server:
      port: 8443  # Standard HTTPS port
      ssl:
        enabled: true
        key-store: file:./configs/keystore.p12  # Path to keystore file
        key-store-password: your-keystore-password
        key-store-type: PKCS12  # Type of keystore
        key-alias: tomcat  # Alias of the certificate
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SERVER_PORT=8443
    SERVER_SSL_ENABLED=true
    SERVER_SSL_KEYSTORE=file:./configs/keystore.p12
    SERVER_SSL_KEYSTOREPASSWORD=your-keystore-password
    SERVER_SSL_KEYSTORETYPE=PKCS12
    SERVER_SSL_KEYALIAS=tomcat
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
        environment:
          SERVER_PORT: 8443
          SERVER_SSL_ENABLED: "true"
          SERVER_SSL_KEYSTORE: file:./configs/keystore.p12
          SERVER_SSL_KEYSTOREPASSWORD: your-keystore-password
          SERVER_SSL_KEYSTORETYPE: PKCS12
          SERVER_SSL_KEYALIAS: tomcat
        volumes:
          - ./stirling-data/configs:/configs
    ```
  </TabItem>
</Tabs>

### Creating a Self-Signed Certificate

To generate a self-signed certificate for development or testing:

```shell
mkdir -p configs
keytool -genkeypair -alias tomcat -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore configs/keystore.p12 -validity 365
```

:::warning Note
For production use, it's recommended to use a certificate from a trusted Certificate Authority.
:::

## Configuration Examples

### Basic Configuration

A simple configuration that changes the port and adjusts logging levels:

```yaml
# custom_settings.yml
server:
  port: 9000

logging:
  level:
    root: INFO
    org.springframework: WARN
    org.hibernate: WARN
    stirling.software.SPDF: INFO
```

### HTTPS Configuration

Enable HTTPS with a custom certificate:

```yaml
# custom_settings.yml
server:
  port: 8443
  ssl:
    enabled: true
    key-store: file:./configs/keystore.p12
    key-store-password: your-keystore-password
    key-store-type: PKCS12
    key-alias: tomcat

logging:
  level:
    root: INFO
    org.springframework: WARN
```

## Troubleshooting Common Issues

### Authentication Issues

Increase security logging to diagnose authentication problems:

```yaml
logging:
  level:
    org.springframework.security: DEBUG
    stirling.software.SPDF.config.security: DEBUG
```

### SAML/OAuth Issues

Increase SAML-related logging for SSO troubleshooting:

```yaml
logging:
  level:
    org.springframework.security.saml2: TRACE
    org.springframework.security.oauth2: DEBUG
    org.opensaml: DEBUG
```

### General Application Issues

For general application issues:

```yaml
logging:
  level:
    stirling.software.SPDF: DEBUG
```

:::warning Note
Debug-level logging can significantly increase log volume and may impact performance in production environments. Return logging to normal levels after troubleshooting.
:::
