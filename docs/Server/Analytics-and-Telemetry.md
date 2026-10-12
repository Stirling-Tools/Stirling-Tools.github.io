---
sidebar_position: 80
title: Analytics and telemetry
sidebar_label: Analytics & telemetry
description: What anonymous usage data a self-hosted server can send, how the consent banner works, and how to turn analytics off.
---

# Analytics and telemetry

Stirling PDF can send anonymous usage data to help improve the product. Document contents are never sent.

## What is collected

| Source | Sent when | What |
|---|---|---|
| Server, to [PostHog](https://posthog.com) | Analytics are on | Server details (app version, OS, Java version, CPU, memory, disk, time zone and locale, Docker or JAR, container or Kubernetes names), selected settings (such as whether login and SSO are on, legal page URLs and the app name), total user count, counts of API calls and PDF operations, and pipeline operation names with file counts |
| Browser, to PostHog | Analytics are on and the user accepts | Which tools are used and on how many files, page views, clicks, errors, and browser and device type |
| Browser, to the [Scarf](https://scarf.sh) pixel | Analytics are on and the user accepts | The path of each page opened, such as `/split-pdf` |

PostHog data goes to PostHog's EU servers (`eu.i.posthog.com`). Server data is tied to a random ID for your server, not to users. See the [privacy policy](https://www.stirling.com/legal/privacy-policy).

When login is enabled, the server also records which tools each user runs, in its own database, to rank recommended tools. This stays on your server. Set `toolRecommendations.enabled: false` to stop it.

## The consent banner

When analytics are on, each user sees **How we use Cookies** on their first visit:

- **Okay** allows PostHog and the Scarf pixel.
- **No Thanks** keeps only the necessary cookies, so the browser sends nothing.
- **Manage preferences** lets them choose each service, then **Accept all**, **Reject all** or **Save preferences**.

Users can change their choice later in **Settings → About → Cookie Preferences → Manage**. The banner only controls the browser. Server data follows the admin setting.

## Turn analytics on or off

If `system.enableAnalytics` is not set, the first admin to open the app is asked **Do you want to help make Stirling PDF better?** Their answer applies to the whole server. Nothing is sent until someone answers.

To change it later, switch **Enable Analytics** in **Settings → Server → Legal & privacy** and restart when asked. **Enable Metrics** next to it controls the server's own usage endpoints, not data sent to Stirling.

Or set it in `settings.yml` or environment variables:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      enableAnalytics: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_ENABLEANALYTICS=false
    ```
  </TabItem>
</Tabs>

`enableAnalytics: false` turns everything off and hides the banner. With analytics on, set `enablePosthog` or `enableScarf` (`SYSTEM_ENABLEPOSTHOG`, `SYSTEM_ENABLESCARF`) to `false` to turn off just that service.
