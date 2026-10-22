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

## Change settings

- Set any setting from `settings.yml` as an environment variable in `envs`. See [Configuration](../Configuration.md) for the naming rule.
- Keep secrets, such as an SSO client secret, in a Kubernetes Secret and read them with `valueFrom`, or load a whole Secret with `envsFrom`.
- Apply changes with `helm upgrade` (see [Upgrade](#upgrade)). The pods restart with the new settings.
- With one pod and `persistence` on, the admin UI also works: it saves `settings.yml` on the volume. With several pods, use `envs` only, because the UI saves to one pod.

For example, Google sign-in (see [OAuth2 / OIDC single sign-on](../Security/OAuth-SSO.md) and [SAML single sign-on](../Security/SAML-SSO.md) for other providers):

```bash
kubectl create secret generic stirling-sso --namespace stirling-pdf --from-literal=client-secret=<client-secret>
```

```yaml
envs:
  - name: SECURITY_OAUTH2_ENABLED
    value: "true"
  - name: SECURITY_OAUTH2_CLIENT_GOOGLE_CLIENTID
    value: <client-id>
  - name: SECURITY_OAUTH2_CLIENT_GOOGLE_CLIENTSECRET
    valueFrom:
      secretKeyRef:
        name: stirling-sso
        key: client-secret
```

## Clustering

To run several replicas, set `replicaCount: 2` or more (or turn on `autoscaling`) and `cluster.enabled: true`. `cluster.enabled` does not add pods by itself. Start from the [multi-node example](https://github.com/Stirling-Tools/Stirling-PDF-chart/blob/main/charts/stirling-pdf/examples/multi-node.yaml). The chart wires the [cluster settings](../Operations/Clustering.md) from the values below and refuses to install if one is missing. It does not install PostgreSQL, Valkey or S3 for you.

### Licence

- A Team or Enterprise licence. Cluster mode does not start without one.
- Set `premium.enabled: true` and `premium.existingSecret` (or `premium.key`).

### PostgreSQL

- Holds users, teams, settings and job records, so every pod sees the same data.
- Set `externalDatabase.host` and `externalDatabase.existingSecret`. Use `externalDatabase.jdbcUrl` instead for options such as `?sslmode=require`.

### Valkey or Redis

- Coordinates the pods: locks, the list of running pods, which pod owns each job, and per-user rate limits.
- It is not a cache. Run it with `maxmemory-policy noeviction`, or evicted keys break locks and pod registration.
- No pod starts while it is down.
- Set `externalValkey.host`, plus `tls`, `username` and `existingSecret` if it needs them.

### S3-compatible bucket

- Holds short-lived job files, such as tool results and files passed between steps, so any pod can serve them. A pod's own disk is not shared and is lost when the pod restarts.
- Also holds files users save on the server.
- Add a lifecycle rule that deletes objects under `transient/` after a day. Scope it to that prefix: saved files live elsewhere in the bucket.
- Set `externalS3.bucket`, `region` and `existingSecret`. On AWS, leave `existingSecret` and the keys empty to use the pod's IAM role (IRSA) instead.
- For MinIO, SeaweedFS or another in-cluster server, also set `endpoint`, `pathStyleAccess: true` and `allowPrivateEndpoints: true`.

### Sticky sessions

- Only the pod that ran an async job can return its result. Other pods answer HTTP 410.
- The chart adds a sticky cookie for Traefik and ingress-nginx. For any other load balancer or Gateway, turn on cookie-based session affinity yourself.

### Shared keys

- Every pod needs the same encryption keys. The chart generates them once and keeps them across upgrades in the `stirling-pdf-stirling-pdf-chart-keys` Secret.
- Back that Secret up. Without it, encrypted data in the database cannot be read.
- For `helm template` or GitOps, create your own and set `sharedKeys.existingSecret`.

### Settings and storage

- Change settings through `envs`, not the admin UI. See [Change settings](#change-settings).
- Leave `persistence` off. The state lives in PostgreSQL and S3, and several pods cannot share a ReadWriteOnce volume.


## Upgrade

Change `image.tag` in `values.yaml` to the new version, then run:

```bash
helm repo update
helm upgrade stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf -f values.yaml
```

<details>
<summary>Upgrading from chart 3.x</summary>

- Always pass your values file with `-f`. `--reuse-values` skips the new chart's defaults, so the upgrade fails; use `--reset-then-reuse-values` if you need it.
- Chart 4 mounts the volume at `/configs` itself. If your `values.yaml` mounts `storage-volume` at `/configs` and `/storage` with `deployment.extraVolumeMounts`, keep those mounts and add this to `envs`, or files users saved on the server no longer show up:

```yaml
envs:
  - name: STORAGE_LOCAL_BASEPATH
    value: /storage
```

</details>

<details>
<summary>Upgrading when you use the latest tag</summary>

The tag never changes, so `helm upgrade` does not restart the pod or pull the new image. Set `image.pullPolicy: Always` in `values.yaml` and apply it with the command above. After that, restart the pod to upgrade:

```bash
kubectl rollout restart deployment/stirling-pdf-stirling-pdf-chart --namespace stirling-pdf
```

</details>
