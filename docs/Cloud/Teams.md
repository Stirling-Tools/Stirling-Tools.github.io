---
title: Teams
sidebar_label: Teams
sidebar_position: 2
description: How Stirling Cloud teams share a plan and credits, and how owners invite, remove and hand over members or connect servers.
---

# Teams

Every Stirling Cloud account belongs to a team, which shares one plan and credit allowance. When you sign up you get a personal team with just you in it.

## Owners and members

| | Team owner | Member |
|---|---|---|
| Use every tool, AI and the API | Yes | Yes |
| Open the Processor | Yes | No |
| Invite and remove members, rename the team | Yes | No |
| Manage the plan, spend cap and invoices | Yes | No |
| Approve self-hosted servers | Yes | No |
| Leave the team | After handing over ownership | Yes |

Owners manage the team in **Settings → Workspace → Users**. Members see it under **Settings → Account Settings → Users**. In the desktop app it is under **Settings → Team**.

## Invite members

1. Open **Settings → Workspace → Users**.
2. Select **Invite people**, enter the email address and select **Send invite**.

The person signs in or creates an account with the invited address, then selects **Accept** on the banner.

- Invitations expire after 7 days. Withdraw one with **Cancel invitation**.
- You can't invite someone who pays for their own subscription.
- A free team holds up to 5 people. For more, [upgrade to Team](./Plans-and-Billing.md#upgrade-to-team-or-add-users).

## Leave or remove

- **Members:** select **Leave Team** to return to your personal team.
- **Owners:** select **Remove from team** on a member. They keep their account but lose access to the team.

An owner can't leave until they transfer ownership. If a team has no owner, a member can select **Become team owner**.

## Transfer ownership

In **Settings → Workspace → Users**, select **Transfer ownership** on the member and confirm. You become a member. The plan and credits stay with the team.

## Connected self-hosted servers

A self-hosted server can share your team's processing allowance. Its admin starts the link from the server ([Connect to Stirling Cloud](../Server/Licensing/Connect-to-Stirling-Cloud.md)), which opens **Connect this server?** on Stirling Cloud. The team owner approves it:

1. Check that the **Address** is your server.
2. Tick **I recognise this address and want to connect it to my team** and select **Connect server**.

**Settings → Workspace → Connected instances** lists connected servers. **Remove connection** revokes a server's access to your team.
