---
title: Server FAQ
sidebar_label: FAQ
sidebar_position: 90
description: Answers to common questions and problems when running a self-hosted Stirling PDF server.
---

# Server FAQ

## `docker pull` from docker.stirlingpdf.com fails. What now?

Pull the same image from Docker Hub or GitHub instead:

```bash
docker pull stirlingtools/stirling-pdf:latest
docker pull ghcr.io/stirling-tools/stirling-pdf:latest
```

## How do I turn login on or off?

Login is on by default. To turn it off, set this and restart:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SECURITY_ENABLELOGIN=false
    ```
  </TabItem>
</Tabs>

With login off, anyone who can reach the server can use it, and there are no users or single sign-on. See [Sign-in and security](./Security/Sign-in-and-Security.md).

## Why does uploading a large file download an .htm file or fail?

Your reverse proxy is rejecting the upload: nginx allows 1 MB by default. Raise its body size limit and timeouts as in the [nginx example](./Production.md#example-nginx).

## Why does Stirling PDF use so much memory when idle?

- The Docker image sizes the Java heap from the container's memory limit, or from the host's RAM if there is no limit. Set a limit with `mem_limit` or `--memory`.
- `latest-ultra-lite` uses the least memory.

See [Performance](./Operations/Performance.md).

## Why does my server make requests to js.stripe.com?

Only when an admin opens the checkout to buy a plan. No documents are sent to Stripe.

## Getting help

Run [Diagnostics](./Operations/Diagnostics.md) to collect logs and settings into one archive, then see the [FAQ](../Tools/FAQ.md) for where to report the problem.
