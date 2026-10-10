---
title: Plans, credits and billing
sidebar_label: Plans & billing
sidebar_position: 3
description: What uses credits on Stirling Cloud, what happens at the limit, and how team owners turn on paid processing and manage billing.
---

# Plans, credits and billing

Manual PDF tools on Stirling Cloud are free. Automation, AI and API calls use credits from your team's monthly allowance, and after that the team owner can turn on pay-as-you-go. Prices are on [stirling.com/pricing](https://stirling.com/pricing).

## What uses credits

| Work | Credits |
|---|---|
| Tools you run yourself in the editor and reader | Free |
| **[Automate](../Tools/Guides/Automate.md)** runs, Processor pipelines and policies, [processing folders](../Tools/Workspace/Processing-Folders.md) | Yes |
| AI tools and the AI assistant | Yes |
| API calls and MCP actions | Yes |

- Each file processed uses one credit. Very long or very large files can use more.
- A file run through several steps of one automation counts once.
- If a job fails on its first step, the credit is returned.
- The free allowance belongs to the team and resets each month. **Free credits** in the sidebar shows what is left.

## When the team hits its limit

Manual tools keep working. Automations, pipelines and AI tools pause, and API calls return HTTP `402` with `PAYG_LIMIT_REACHED`.

## Where to manage billing

Only the team owner can change the plan, in **Settings → Workspace → Usage & Billing**. Members see a read-only view in **Settings → Billing → Plan**. In the desktop app, select **Open Usage & Billing in browser**.

## Turn on the Processor plan

The Processor plan is pay-as-you-go for everything that uses credits, up to a monthly spend limit you choose.

1. In **Usage & Billing**, on the **Processor** row, select **Switch on the Processor**.
2. Choose **Pay as you go**, set your monthly spend limit and select **Continue to payment**.

To change the limit, select **Raise limit** on the **Processor** row and **Save limit**.

Or choose **Prepay a year** to buy 12 months of credits at a discount, by card or bank transfer. Prepaid credits are used first and expire after 12 months.

## Upgrade to Team or add users

A free team holds up to 5 people. The Team plan adds users in blocks of 100.

1. In **Usage & Billing**, select **Compare plans → Upgrade to Team**, or **Add capacity** on the **Users** row.
2. Choose **Monthly** or **Yearly** and the number of users, then select **Continue to payment**.

For data residency or SCIM, select **Get an enterprise quote**. Single sign-on through your own identity provider needs a self-hosted server ([OAuth2 / OIDC single sign-on](../Server/Security/OAuth-SSO.md)).

## Payment, invoices and cancelling

- **Payment method → Update** opens the Stripe billing portal.
- **Invoices** lists every invoice.
- On a paid plan, **Manage subscription** opens the Stripe portal, where you can also cancel.
