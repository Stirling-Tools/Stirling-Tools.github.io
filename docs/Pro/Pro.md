---
sidebar_position: 8
id: Pro
title: Pro
description: Enterprise/Pro edition for stirling PDF
tags:
  - Enterprise
  - Pro
  - Premium
  
---
# Stirling PDF Enterprise

Stirling PDF offers an Enterprise edition of its software. This is the same great software but with added features and comforts.

## Whats included

- Prioritised Support tickets via support@stirlingpdf.com to reach the Stirling-PDF team for support and 1:1 meetings where applicable (Provided they come from same email domain registered with us)
- Prioritised Enhancements to Stirling-PDF where applicable 
- [Advanced SSO](/Advanced%20Configuration/Single%20Sign-On%20Configuration), OAuth2 and SAML with automated login handling
- [External Database](/Advanced%20Configuration/External%20Database) support for optimised deployments and load-balancing support
- Custom automated metadata handling
- Usage Monitoring UI
- Prometheus endpoint for advancing Usage monitoring
- Advanced user configurations (Coming soon)
- Plus other exciting features to come.

## Cost

We charge 12$ per seat per month. This means for a company that requires 5 simultaneously logged in users, they would require 5 seats.

## Purchase

To purchase stirling PDF Enterprise please navigate to https://stirlingpdf.com/pricing and select either pro or Enterprise depending on your use-case.
For Pro you will be redirected to Stripe to setup and handle a subscription, after which you will be automatically emailed your license key on the email provided to Stripe.

## Activation

To activate, navigate to the Stirling PDF config folder and open the ``settings.yml``
Scroll down to the enterprise section, it should look like:
```yaml
enterpriseEdition:
  enabled: false # set to 'true' to enable enterprise edition
  key: 00000000-0000-0000-0000-000000000000
```
Enter the key provided in the email and change enabled from false to true, then restart the Stirling-PDF instance.
You should now see logs of your Stirling-PDF instance registering and authenticating the license and enabling the Enterprise features.

<img referrerpolicy="no-referrer-when-downgrade" src="https://static.scarf.sh/a.png?x-pxid=421cf4e2-5028-4383-913e-31afed203780" alt="Analytics Pixel" width="1" height="1" />

