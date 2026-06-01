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

### Upgrade the helm chart

```bash
helm repo update
helm upgrade stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf --reuse-values
```

### Uninstall the helm chart

```bash
helm uninstall stirling-pdf -n stirling-pdf
```

:::warning Helm does not delete PVCs
`helm uninstall` removes the Deployment, Service, ServiceAccount, Ingress, and ServiceMonitor - but **PersistentVolumeClaims are intentionally preserved** by Helm so you don't accidentally lose data. If you had `persistence.enabled: true` in your `values.yaml`, you need to delete the PVCs separately:

```bash
kubectl delete pvc -n stirling-pdf -l app.kubernetes.io/instance=stirling-pdf
```
:::

To remove the namespace as well (also clears any leftover PVCs):

```bash
kubectl delete namespace stirling-pdf
```

If you no longer need the chart at all:

```bash
helm repo remove stirling-pdf
```

### Data to back up first

If you enabled persistence, the user settings and embedded H2 database live on the PVC mounted at the path you configured in `values.yaml` under `persistence.path`. The chart default is `/tmp`, but we recommend setting `persistence.path: /configs` so the layout matches the Docker convention.

Copy the data out before deletion. Replace `MOUNT_PATH` with the value of `persistence.path` in your `values.yaml` (default `/tmp`):

```bash
POD=$(kubectl get pods -n stirling-pdf -l app.kubernetes.io/instance=stirling-pdf -o jsonpath='{.items[0].metadata.name}')
MOUNT_PATH=/configs    # or whatever you set persistence.path to (default: /tmp)
kubectl cp "stirling-pdf/$POD:$MOUNT_PATH" ./stirling-pdf-backup
```
