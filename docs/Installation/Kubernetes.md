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
Then, add `-f values.yaml` to the `helm install` command.

### Upgrade the helm chart

```bash
helm repo update
helm upgrade stirling-pdf stirling-pdf/stirling-pdf-chart --namespace stirling-pdf --reuse-values
```
