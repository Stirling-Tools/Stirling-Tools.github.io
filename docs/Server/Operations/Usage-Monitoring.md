---
sidebar_position: 6
title: Usage monitoring
sidebar_label: Usage monitoring
description: Check the status and request counts of a self-hosted Stirling PDF server through its info API, the in-app dashboard or Prometheus.
---

# Usage monitoring

Watch a self-hosted server's health and usage with the built-in info API (all plans), the **Usage Analytics** dashboard (Enterprise) or Prometheus (Team and Enterprise).

## Info API

These endpoints return JSON. With login on, every endpoint except `/api/v1/info/status` needs authentication; from scripts, send an API key in the `X-API-KEY` header.

| Endpoint | Returns |
|---|---|
| `GET /api/v1/info/status` | Status and version. Use it for health checks. |
| `GET /api/v1/info/health` | The same as `status`. |
| `GET /api/v1/info/uptime` | Time since the server started. |
| `GET /api/v1/info/requests` | POST request count, for one endpoint with `?endpoint=` or for all. |
| `GET /api/v1/info/requests/all` | POST request counts for every endpoint. |
| `GET /api/v1/info/load`, `GET /api/v1/info/load/all` | The same, for GET requests. |
| Any `requests` or `load` endpoint plus `/unique` | Unique sessions instead of requests, for example `/api/v1/info/requests/all/unique`. |
| `GET /api/v1/info/wau` | Weekly active users. Only when login is off. |

Counts reset when the server restarts. To turn off everything except `status` and `health`, set `metrics.enabled: false` (`METRICS_ENABLED=false`); the other endpoints then return HTTP 403.

## Usage Analytics dashboard

With an Enterprise licence and login on, admins can see usage in the app under **Settings → Monitoring → Usage Analytics**.

## Prometheus

With a Team or Enterprise licence, Stirling PDF can publish Prometheus metrics: HTTP request counts by endpoint, method and session. Below Team, `/actuator/*` returns HTTP 404 apart from health checks.

Turn the endpoint on in `custom_settings.yml` (see [Extra settings](../Customisation/Extra-Settings.md)) or `JAVA_CUSTOM_OPTS`, then restart:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="custom_settings.yml">
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
    ```bash
    JAVA_CUSTOM_OPTS="-Dmanagement.endpoints.web.exposure.include=prometheus,health,info -Dmanagement.endpoint.health.show-details=always -Dmanagement.prometheus.metrics.export.enabled=true"
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        environment:
          JAVA_CUSTOM_OPTS: "-Dmanagement.endpoints.web.exposure.include=prometheus,health,info -Dmanagement.endpoint.health.show-details=always -Dmanagement.prometheus.metrics.export.enabled=true"
    ```
  </TabItem>
</Tabs>

Then point Prometheus at `/actuator/prometheus`. With login on, it must send an API key in the `X-API-KEY` header:

```yaml
scrape_configs:
  - job_name: 'stirling-pdf'
    metrics_path: '/actuator/prometheus'
    scrape_interval: 15s
    static_configs:
      - targets: ['your-stirling-pdf-host:8080']
```
