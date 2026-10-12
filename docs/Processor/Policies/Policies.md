---
sidebar_position: 5
title: Policies
description: >-
  Set up ready-made pipelines for ingestion, security, classification,
  compliance and routing with a simple form.
---

# Policies

Policies are ready-made pipelines with a simple setup form: [Ingestion](./Ingestion.md), [Security](./Security.md), [Classification](./Classification.md), [Compliance](./Compliance.md) and [Routing](./Routing.md).

Every policy you set up is saved as an ordinary [pipeline](../Pipelines.md). It leaves **Templates**, appears under **All pipelines** and runs the same way.

## Set up a policy

1. Open **Processor → Pipelines**.
2. Under **Templates**, select **Set up** on the policy you want.
3. Turn on the actions you need. Expand an action to change its settings.
4. Choose the documents to process, when to run, and where results go.
5. Select **Create pipeline**.

For more control, select **Customise** to open the same pipeline in the full [pipeline builder](../Pipelines.md), keeping everything set so far. Once the pipeline goes beyond what the form supports, it opens in the builder from then on.

When documents come from the editor, [Enforce as policy](../Pipelines.md#enforce-as-policy) is on by default for every policy except Classification, so files that fail are blocked. Turn it off in the setup form to let them through with a warning.
