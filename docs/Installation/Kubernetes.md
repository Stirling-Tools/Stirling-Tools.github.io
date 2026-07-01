---
sidebar_position: 2
id: Kubernetes Install
title: Kubernetes Guide
---

### Run stirling-pdf helm chart

```bash
helm repo add stirling-pdf https://stirling-tools.github.io/Stirling-PDF-chart
helm repo update
helm install stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf --create-namespace
```

### Override stirling-pdf default values

Create a `values.yaml` file with the values you want to override from the [documentation](https://github.com/Stirling-Tools/Stirling-PDF-chart/tree/main/charts/stirling-pdf).
(For examples, see the comments in the default [values.yml](https://github.com/Stirling-Tools/Stirling-PDF-chart/blob/main/charts/stirling-pdf/values.yaml) file.)
Then, add `-f values.yaml` to the `helm install` command.

### Persistent storage

Stirling PDF keeps runtime data - user accounts, `settings.yml`, the internal database, and other state - under `/configs` (and related data paths). You can run without a persistent volume by supplying configuration through environment variables in your `values.yaml`, and the app works fine that way.

A `PersistentVolumeClaim` is still recommended for reliable operation: it preserves data such as logins and settings across pod restarts and avoids errors from state being lost when a pod is rescheduled. The official Helm chart exposes persistence options in its [`values.yaml`](https://github.com/Stirling-Tools/Stirling-PDF-chart/blob/main/charts/stirling-pdf/values.yaml) - refer to the persistence-related keys there to enable a PVC and choose a storage class and size.

### Overriding configuration

Configuration is controlled through the same environment variables and `settings.yml` options used in other deployments, set through the chart's `values.yaml`.

Create a `values.yaml` file and add the environment variables you want under the chart's env section, then pass it to Helm with `-f values.yaml`. See the comments in the default [`values.yaml`](https://github.com/Stirling-Tools/Stirling-PDF-chart/blob/main/charts/stirling-pdf/values.yaml) for the exact structure.

For example, to raise the log level for debugging you can set the standard Stirling PDF logging environment variable (such as `LOGGING_LEVEL_STIRLING=DEBUG`) as an env entry in your `values.yaml`, alongside any other environment variables like locale, security, or OAuth/SAML settings.

### Upgrade the helm chart

```bash
helm repo update
helm upgrade stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf --reuse-values
```
