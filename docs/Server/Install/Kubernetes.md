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

- **image.tag:** pins the Stirling PDF version. Left empty, the chart's own version is used. For the fat or ultra-lite image, see [Choose an image](./Docker.md#choose-an-image).
- **persistence:** Stirling PDF keeps users, `settings.yml` and its built-in database in `/configs`. Enabling persistence mounts a volume there, and the chart keeps files users save on the server in `/configs/storage` on the same volume. Without it they are lost when the pod restarts.
- **resources:** always set a memory limit. Give the pod at least 4 GB (see [Sizing](../Operations/Performance.md#sizing)).
- **envs:** any setting can be passed as an environment variable. See [Configuration](../Configuration.md) for the naming rule.

For a sub-path, set the chart's `rootPath` option. The chart can also create an `ingress` or a Gateway API `httpRoute`.

## Change settings

- Set any setting from `settings.yml` as an environment variable in `envs`. See [Configuration](../Configuration.md) for the naming rule.
- Keep secrets, such as an SSO client secret, in a Kubernetes Secret and read them with `valueFrom`, or load a whole Secret with `envsFrom`.
- Apply changes with `helm upgrade` (see [Upgrade](#upgrade)). The pods restart with the new settings.
- With one pod and `persistence` on, the admin UI also works. With several pods, use `envs` only.

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

Run several pods behind one service. The chart does not install PostgreSQL, Valkey or S3: bring your own.

### 1. Create the Secrets

Each `existingSecret` value below names a Kubernetes Secret holding a password or key:

```bash
kubectl create namespace stirling-pdf
kubectl create secret generic stirling-licence --namespace stirling-pdf --from-literal=premium-key=<licence-key>
kubectl create secret generic stirling-db --namespace stirling-pdf --from-literal=password=<database-password>
kubectl create secret generic stirling-valkey --namespace stirling-pdf --from-literal=password=<valkey-password>
kubectl create secret generic stirling-s3 --namespace stirling-pdf --from-literal=access-key=<access-key> --from-literal=secret-key=<secret-key>
```

If Valkey has no password, skip `stirling-valkey` and its `existingSecret` line below.

### 2. values.yaml

```yaml
replicaCount: 2

cluster:
  enabled: true

premium:
  enabled: true
  existingSecret: stirling-licence

externalDatabase:
  host: postgres.example.internal
  existingSecret: stirling-db

externalValkey:
  host: valkey.example.internal
  existingSecret: stirling-valkey

externalS3:
  bucket: stirling-pdf
  region: us-east-1
  existingSecret: stirling-s3

resources:
  requests:
    cpu: "1"
    memory: 4Gi
  limits:
    memory: 4Gi
```

Install it with the `helm install` command at the top of this page.

- **Autoscaling:** replace `replicaCount` with `autoscaling.enabled: true`.
- **PostgreSQL:** the database and user default to `stirling`. For options such as `?sslmode=require`, set `externalDatabase.jdbcUrl` instead of `host`.
- **Valkey TLS:** set `externalValkey.tls: true`.
- **S3 on AWS:** remove `existingSecret` to use the pod's IAM role (IRSA).
- **MinIO, SeaweedFS or another in-cluster S3:** also set `endpoint`, `pathStyleAccess: true` and `allowPrivateEndpoints: true`.

### What each part is for

- **Licence:** Team or Enterprise, required for cluster mode.
- **PostgreSQL:** users, teams, settings and job records shared by every pod.
- **Valkey or Redis:** coordinates the pods: locks, the list of running pods, which pod owns each job, and rate limits. Run it with `maxmemory-policy noeviction`.
- **S3:** short-lived job files any pod can serve, and files users save on the server.
- **Shared keys:** the encryption keys every pod shares. The chart generates them once and keeps them in the `stirling-pdf-stirling-pdf-chart-keys` Secret.

### Before going live

- Add an S3 lifecycle rule that deletes objects under `transient/` only, after a day.
- The chart turns on sticky sessions for Traefik and ingress-nginx. For any other load balancer or Gateway, turn on cookie-based session affinity yourself.
- Back up the `stirling-pdf-stirling-pdf-chart-keys` Secret. For `helm template` or GitOps, create your own with the keys `credential-encryption-key` (`openssl rand -base64 32`), `automatically-generated-key` and `automatically-generated-uuid` (any UUIDs), and set `sharedKeys.existingSecret`.
- Change settings through `envs`. See [Change settings](#change-settings).
- Leave `persistence` off.

## Upgrade

Change `image.tag` in `values.yaml` to the new version, then run:

```bash
helm repo update
helm upgrade stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf -f values.yaml
```

<details>
<summary>Upgrading from chart 3.x</summary>

- Pass your values file with `-f`, or use `--reset-then-reuse-values`. `--reuse-values` fails.
- Chart 4 mounts the volume at `/configs` itself. If your `values.yaml` mounts `storage-volume` at `/configs` and `/storage` with `deployment.extraVolumeMounts`, keep those mounts and add this to `envs`:

```yaml
envs:
  - name: STORAGE_LOCAL_BASEPATH
    value: /storage
```

</details>

<details>
<summary>Upgrading when you use the latest tag</summary>

Set `image.pullPolicy: Always` in `values.yaml`, apply it with the command above, then restart the pod to upgrade:

```bash
kubectl rollout restart deployment/stirling-pdf-stirling-pdf-chart --namespace stirling-pdf
```

</details>
