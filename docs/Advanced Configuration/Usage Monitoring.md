---
sidebar_position: 5
title: Usage Monitoring
tags: [pro, enterprise, management, feature, advanced feature]
---

# Usage Monitoring
> **Tier**: Pro, Enterprise

Stirling-PDF provides robust usage monitoring capabilities through its API, allowing you to track application usage patterns and performance metrics.

## Non-Persistent Usage Monitoring API

The following API endpoints are available to all users to monitor usage statistics. These endpoints provide non-persistent usage data that can be queried on demand.

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/info/status` | Application status and version information |
| `GET /api/v1/info/requests` | Total count of POST requests for a specific endpoint (optional query parameter: `endpoint`) |
| `GET /api/v1/info/requests/unique` | Count of unique users for POST requests for a specific endpoint |
| `GET /api/v1/info/requests/all` | POST requests count for all endpoints |
| `GET /api/v1/info/requests/all/unique` | Unique users count for POST requests for all endpoints |
| `GET /api/v1/info/load` | Total count of GET requests for a specific endpoint (optional query parameter: `endpoint`) |
| `GET /api/v1/info/load/unique` | Count of unique users for GET requests for a specific endpoint |
| `GET /api/v1/info/load/all` | GET requests count for all endpoints |
| `GET /api/v1/info/load/all/unique` | Unique users count for GET requests for all endpoints |

All endpoints return a JSON response with the requested statistics.

## Enterprise Usage Monitoring

> #### ⚠️ Enterprise Feature
> The `/usage` endpoint with graphical displays and the Prometheus integration are enterprise-only features. These features require both an enterprise license (`enterpriseEnabled: true`) and must be explicitly enabled in your configuration.

### Usage Dashboard

Enterprise license holders can access the enhanced usage monitoring dashboard at:

```
/usage
```

This dashboard provides graphical representations and detailed tables of the usage data, similar to the Endpoint Statistics interface shown in the documentation.

## Prometheus Monitoring Configuration

Stirling-PDF supports application metrics monitoring using Prometheus. This feature allows you to track application performance, usage patterns, and health metrics.

### Prerequisites

1. A valid Stirling-PDF enterprise license
2. Enterprise mode enabled in your configuration
3. Running with Security jar / DOCKER_ENABLE_SECURITY flag

### Settings

Stirling-PDF can be configured to use Prometheus monitoring by setting the `JAVA_CUSTOM_OPTS` environment variable. The application uses this variable to add custom Java options at runtime.

Set the following environment variable in your deployment environment:

```bash
JAVA_CUSTOM_OPTS="-Dmanagement.endpoints.web.exposure.include=prometheus,health,info -Dmanagement.endpoint.health.show-details=always -Dmanagement.metrics.export.prometheus.enabled=true -Denterprisemanagement.metrics.enabled=true"
```

This configures:
- Prometheus metrics endpoint exposure
- Health and info endpoints for basic monitoring
- Detailed health information
- Prometheus metrics export
- Enterprise metrics collection

### Configuration in custom_settings.yml

Alternatively, you can configure these settings in your `/configs/custom_settings.yml` file:

```yaml
management:
  endpoints:
    web:
      exposure:
        include: prometheus,health,info
  endpoint:
    health:
      show-details: always
  metrics:
    export:
      prometheus:
        enabled: true
enterprisemanagement:
  metrics:
    enabled: true
```

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

With Prometheus integration enabled, Stirling-PDF exposes the following types of metrics:
- **JVM metrics**: Memory usage, garbage collection, thread utilization
- **System metrics**: CPU usage, file descriptors
- **Application metrics**: Request rates, processing times
- **PDF processing metrics**: Document operations, conversion statistics