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

Put your overrides in `values.yaml`. The chart's [default values.yaml](https://github.com/Stirling-Tools/Stirling-PDF-chart/blob/main/charts/stirling-pdf/values.yaml) lists every option with comments, and its [examples](https://github.com/Stirling-Tools/Stirling-PDF-chart/tree/main/charts/stirling-pdf/examples) cover a single node and a cluster.

```yaml
image:
  tag: "3.2.0"

persistence:
  enabled: true

resources:
  limits:
    memory: 4Gi

envs:
  - name: SYSTEM_DEFAULTLOCALE
    value: en-GB
```

- **image.tag:** left empty, the chart runs the Stirling PDF version it was released with, so upgrading the chart also upgrades the app. A version tag pins the release, so you choose when to upgrade. For the fat or ultra-lite image, see [Choose an image](./Docker.md#choose-an-image).
- **persistence:** Stirling PDF keeps users, `settings.yml` and its built-in database in `/configs`. Enabling persistence mounts a volume there, and the chart keeps files users save on the server in `/configs/storage` on the same volume. Without it they are lost when the pod restarts.
- **resources:** the image sizes the Java heap from the memory limit, so always set one. Give the pod at least 4 GB (see [Sizing](../Operations/Performance.md#sizing)).
- **envs:** any setting can be passed as an environment variable. See [Configuration](../Configuration.md) for the naming rule.

For a sub-path, set the chart's `rootPath` option rather than `SYSTEM_ROOTURIPATH`, so the health checks use it too. The chart can also create an `ingress` or a Gateway API `httpRoute`.

## Upgrade

Change `image.tag` in `values.yaml` to the new version, then run:

```bash
helm repo update
helm upgrade stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf -f values.yaml
```

Always pass your values file with `-f`. `--reuse-values` skips the new chart's defaults, so an upgrade to chart 4 with it fails; use `--reset-then-reuse-values` instead if you need it.

If you use `latest`, the tag never changes, so `helm upgrade` does not restart the pod or pull the new image. Set `image.pullPolicy: Always` in `values.yaml` and apply it with the command above. After that, restart the pod to upgrade:

```bash
kubectl rollout restart deployment/stirling-pdf-stirling-pdf-chart --namespace stirling-pdf
```

### From chart 3.x

Chart 4 mounts the volume at `/configs` itself. If your `values.yaml` mounts `storage-volume` at `/configs` and `/storage` with `deployment.extraVolumeMounts`, keep those mounts and add this to `envs`, or files users saved on the server no longer show up:

```yaml
envs:
  - name: STORAGE_LOCAL_BASEPATH
    value: /storage
```

## Clustering

To run several replicas, set `replicaCount: 2` or more (or turn on `autoscaling`) and `cluster.enabled: true`, with a licence and your own PostgreSQL, Valkey (or Redis) and S3 bucket. `cluster.enabled` does not add pods by itself. The chart wires the [cluster settings](../Operations/Clustering.md) from its `premium`, `externalDatabase`, `externalValkey` and `externalS3` values and generates the keys every pod shares. Start from the [multi-node example](https://github.com/Stirling-Tools/Stirling-PDF-chart/blob/main/charts/stirling-pdf/examples/multi-node.yaml).

Back up the `stirling-pdf-stirling-pdf-chart-keys` Secret the chart creates, or set `sharedKeys.existingSecret` to your own. Without it, encrypted data in the database cannot be read.
