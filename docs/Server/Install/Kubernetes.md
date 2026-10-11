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
  tag: "3.1.0"           # the chart defaults to its own app version

persistence:
  enabled: true

deployment:
  extraVolumeMounts:
    - name: storage-volume   # the volume the chart creates when persistence is enabled
      mountPath: /configs
      subPath: configs
    - name: storage-volume
      mountPath: /storage
      subPath: storage

envs:
  - name: SYSTEM_DEFAULTLOCALE
    value: en-GB
```

- **image.tag:** a version tag pins the release, so you choose when to upgrade. You can set `latest` instead, but see [Upgrade](#upgrade). The standard image has login and admin settings. See [Choose an image](./Docker.md#choose-an-image).
- **Persistence:** Stirling PDF keeps users, `settings.yml` and its built-in database in `/configs`, and files users save on the server in `/storage`. Without a persistent volume they are lost when the pod restarts. Enabling persistence creates the volume, and `extraVolumeMounts` mounts a folder of it at each path.
- **envs:** any setting can be passed as an environment variable. See [Configuration](../Configuration.md) for the naming rule.

The chart also has `ingress`, `resources` and `rootPath` options. Give the pod at least 4 GB of memory (see [Sizing](../Operations/Performance.md#sizing)).

## Upgrade

Change `image.tag` in `values.yaml` to the new version, then run:

```bash
helm repo update
helm upgrade stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf -f values.yaml
```

If you use `latest`, the tag never changes, so `helm upgrade` does not restart the pod or pull the new image. Set `image.pullPolicy: Always` in `values.yaml` and apply it with the command above. After that, restart the pod to upgrade:

```bash
kubectl rollout restart deployment/stirling-pdf-stirling-pdf-chart --namespace stirling-pdf
```

To run several replicas behind one service, see [Clustering](../Operations/Clustering.md).
