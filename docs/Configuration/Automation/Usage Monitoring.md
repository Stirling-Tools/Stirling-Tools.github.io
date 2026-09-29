---
sidebar_position: 4
title: Usage Monitoring
tags: [enterprise, management, feature, advanced feature]
---

# Usage Monitoring
> **Tier**: Free usage API; Team/Enterprise Prometheus integration

Stirling PDF provides request counters and application status endpoints to aid in monitoring and integration with other monitoring platforms.

## Non-Persistent Usage Monitoring API

The following API endpoints are available to all users to monitor usage statistics. These endpoints provide non-persistent usage data that can be queried on demand.

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/info/status` | Application status and version information |
| `GET /api/v1/info/requests` | Total count of POST requests for a specific endpoint (optional query parameter: `endpoint`) |
| `GET /api/v1/info/requests/unique` | Count of unique sessions for POST requests for a specific endpoint |
| `GET /api/v1/info/requests/all` | POST requests count for all endpoints |
| `GET /api/v1/info/requests/all/unique` | Unique sessions count for POST requests for all endpoints |
| `GET /api/v1/info/load` | Total count of GET requests for a specific endpoint (optional query parameter: `endpoint`) |
| `GET /api/v1/info/load/unique` | Count of unique sessions for GET requests for a specific endpoint |
| `GET /api/v1/info/load/all` | GET requests count for all endpoints |
| `GET /api/v1/info/load/all/unique` | Unique sessions count for GET requests for all endpoints |

All endpoints return a JSON response with the requested statistics.

## Prometheus Monitoring Configuration

Stirling PDF supports application usage monitoring using Prometheus. This feature allows you to track requests to application endpoints.

### Prerequisites

1. A valid Stirling PDF Team or Enterprise licence
2. Premium features enabled in your configuration (`premium.enabled: true`)
3. A build with additional features included (`DISABLE_ADDITIONAL_FEATURES=false` at build time)

### Configuration

Configure Prometheus monitoring using your preferred method:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    Configure in your `/configs/custom_settings.yml` file:

    ```yaml
    management:
      endpoints:
        web:
          exposure:
            include: prometheus,health,info
      endpoint:
        health:
          show-details: always
      prometheus:
        metrics:
          export:
            enabled: true
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    Set the `JAVA_CUSTOM_OPTS` environment variable:

    ```bash
    JAVA_CUSTOM_OPTS="-Dmanagement.endpoints.web.exposure.include=prometheus,health,info -Dmanagement.endpoint.health.show-details=always -Dmanagement.prometheus.metrics.export.enabled=true"
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    docker run -d \
      -p 8080:8080 \
      -e JAVA_CUSTOM_OPTS="-Dmanagement.endpoints.web.exposure.include=prometheus,health,info -Dmanagement.endpoint.health.show-details=always -Dmanagement.prometheus.metrics.export.enabled=true" \
      docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
        environment:
          JAVA_CUSTOM_OPTS: "-Dmanagement.endpoints.web.exposure.include=prometheus,health,info -Dmanagement.endpoint.health.show-details=always -Dmanagement.prometheus.metrics.export.enabled=true"
    ```
  </TabItem>
</Tabs>

**What this configures:**
- Prometheus metrics endpoint exposure
- Health and info endpoints for basic monitoring
- Detailed health information
- Prometheus metrics export

### Accessing Metrics

Once configured, Prometheus metrics are available at the following endpoint:

```
https://your-stirling-pdf-instance/actuator/prometheus
```

This endpoint provides metrics in a format that can be scraped by a Prometheus server.

### Configuring Prometheus Server

Add the following job configuration to your Prometheus server's configuration file (`prometheus.yml`):

```yaml
scrape_configs:
  - job_name: 'stirling-pdf'
    metrics_path: '/actuator/prometheus'
    scrape_interval: 15s
    static_configs:
      - targets: ['your-stirling-pdf-host:port']
```

### Available Metrics

Prometheus exposes HTTP request counts, grouped by endpoint, request method and session.
