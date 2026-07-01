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

Stirling PDF keeps data - user accounts, `settings.yml`, the internal database, and other runtime state - under `/configs` (and related data paths). Without persistent storage this data is lost every time the pod restarts or is rescheduled.

Provide a `PersistentVolumeClaim` so `/configs` and other data survive pod restarts. The official Helm chart exposes persistence options in its [`values.yaml`](https://github.com/Stirling-Tools/Stirling-PDF-chart/blob/main/charts/stirling-pdf/values.yaml) - refer to the persistence-related keys there to enable a PVC and choose a storage class and size. Always enable persistence for any deployment where you care about keeping logins, settings, or data.

### Overriding configuration

Configuration is controlled through the same environment variables and `settings.yml` options used in other deployments, set through the chart's `values.yaml`.

Create a `values.yaml` file and add the environment variables you want under the chart's env section, then pass it to Helm with `-f values.yaml`. See the comments in the default [`values.yaml`](https://github.com/Stirling-Tools/Stirling-PDF-chart/blob/main/charts/stirling-pdf/values.yaml) for the exact structure.

For example, to raise the log level for debugging you can set the standard Stirling PDF logging environment variable (such as `LOGGING_LEVEL_STIRLING=DEBUG`) as an env entry in your `values.yaml`, alongside any other environment variables like locale, security, or OAuth/SAML settings.

### Upgrade the helm chart

```bash
helm repo update
helm upgrade stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf --reuse-values
```

### Upgrading V1 to V2

Upgrading a V1 deployment to V2 is largely a matter of changing the image tag, but take these steps to carry your configuration and data across:

1. **Back up `/configs` first.** Snapshot or copy the contents of your persistent volume (users, `settings.yml`, database) before making any changes so you can roll back if needed.
2. **Update the image tag** in your `values.yaml` to the V2 image, then run the upgrade command above.
3. **Keep your existing `PersistentVolumeClaim`s** so your config and data carry over to the new pods rather than starting fresh.
4. **Re-apply your SSO/OAuth env.** The same OAuth/SAML environment variables you use elsewhere still apply in V2 - keep them set in your `values.yaml` so single sign-on continues to work after the upgrade.
