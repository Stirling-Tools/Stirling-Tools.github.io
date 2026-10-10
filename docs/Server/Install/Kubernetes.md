---
sidebar_position: 2
title: Install on Kubernetes
sidebar_label: Kubernetes
description: Install Stirling PDF on Kubernetes with the official Helm chart, keep its data on a persistent volume and upgrade it.
---

# Install on Kubernetes

Install Stirling PDF with the official Helm chart:

```bash
helm repo add stirling-pdf https://stirling-tools.github.io/Stirling-PDF-chart
helm repo update
helm install stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf --create-namespace -f values.yaml
```

## values.yaml

Put your overrides in `values.yaml`. The chart's [default values.yaml](https://github.com/Stirling-Tools/Stirling-PDF-chart/blob/main/charts/stirling-pdf/values.yaml) lists every option with comments.

```yaml
image:
  tag: "latest"          # the chart defaults to its own app version

persistence:
  enabled: true
  size: 8Gi

deployment:
  extraVolumeMounts:
    - name: storage-volume   # the volume the chart creates when persistence is enabled
      mountPath: /configs

envs:
  - name: SYSTEM_DEFAULTLOCALE
    value: en-GB
```

- **image.tag:** set `latest`, or a version tag to pin a release. The standard image has login and admin settings. See [Choose an image](./Docker.md#choose-an-image).
- **Persistence:** Stirling PDF keeps users, `settings.yml` and its built-in database in `/configs`. Without a persistent volume they are lost when the pod restarts. Enabling persistence creates the volume, and `extraVolumeMounts` mounts it at `/configs`.
- **envs:** any setting can be passed as an environment variable. See [Configuration](../Configuration.md) for the naming rule.

The chart also has `ingress`, `resources` and `rootPath` options. Give the pod at least 4 GB of memory, 8 GB recommended (see [Sizing](../Operations/Performance.md#sizing)).

## Upgrade

```bash
helm repo update
helm upgrade stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf --reuse-values
```

If you pinned `image.tag`, change it in `values.yaml` and pass `-f values.yaml` instead of `--reuse-values`.

To run several replicas behind one service, see [Clustering](../Operations/Clustering.md).
