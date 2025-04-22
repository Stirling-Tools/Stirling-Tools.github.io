---
sidebar_position: 5
title: Prometheus
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Prometheus Monitoring Configuration

Stirling-PDF supports application metrics monitoring using Prometheus. This feature allows you to track application performance, usage patterns, and health metrics.

> #### ⚠️ Enterprise Feature
> _Prometheus monitoring integration is an enterprise-only feature. This feature requires both an enterprise license (`enterpriseEnabled: true`) and must be explicitly enabled in your configuration._

## Prerequisites

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

## Accessing Metrics

Once configured, Prometheus metrics are available at the following endpoint:

```
https://your-stirling-pdf-instance/actuator/prometheus
```

This endpoint provides metrics in a format that can be scraped by a Prometheus server.

## Configuring Prometheus Server

Add the following job configuration to your Prometheus server's configuration file (`prometheus.yml`):

```yaml
scrape_configs:
  - job_name: 'stirling-pdf'
    metrics_path: '/actuator/prometheus'
    scrape_interval: 15s
    static_configs:
      - targets: ['your-stirling-pdf-host:port']
```

## Available Metrics

With Prometheus integration enabled, Stirling-PDF exposes the following types of metrics:

- **JVM metrics**: Memory usage, garbage collection, thread utilization
- **System metrics**: CPU usage, file descriptors
- **Application metrics**: Request rates, processing times
- **PDF processing metrics**: Document operations, conversion statistics