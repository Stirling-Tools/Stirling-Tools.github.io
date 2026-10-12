---
title: Connection modes
sidebar_label: Connection modes
sidebar_position: 2
description: Switch the desktop app between Local Only, Stirling Cloud and Self-Hosted modes, and connect it to your organisation's server.
---

# Connection modes

The connection mode decides where your tools run and which account you use. Change the mode in **Settings → Connection Mode** (select the account row at the bottom of the left sidebar to open Settings).

| Mode | Sign-in | Where tools run |
|---|---|---|
| **Local Only** | None | On your computer. Tools that need a server are blocked. |
| **Stirling Cloud** | Your Stirling account | On your computer when possible, otherwise in Stirling Cloud. |
| **Self-Hosted** | An account on your organisation's server | On that server. |

See [Where your tools run](./Where-Tools-Run.md) for details.

On a [managed installation](./Managed-Deployment.md), your administrator can require sign-in, remove self-hosted connections, or require local document processing in either signed-in mode. These policies override the defaults below. When sign-in is required, signing out returns to the sign-in screen and closes access to the workspace.

## Local Only

You get this mode if you select **Continue without signing in** on first launch, or log out.

## Sign in to Stirling Cloud

1. Go to **Settings → Connection Mode** and select **Sign In**.
2. On **Sign in to Stirling**, choose **Google** or **GitHub** (finish in your browser), or enter your email and password under **Or continue with email** and select **Login**.

Once signed in, Settings also shows **Workspace** and **Team**. See [Account and sign-in](../Cloud/Account.md).

## Connect to a self-hosted server

You need the server's address and an account on it. The server must have login turned on, otherwise the app shows **Login Not Enabled** ([Sign-in and security](../Server/Security/Sign-in-and-Security.md)).

1. Go to **Settings → Connection Mode** and select **Sign In**.
2. Select **or connect to a self-hosted account**.
3. In **Server URL**, enter the full address, including the port if there is one, for example `https://pdf.example.com` or `http://192.168.1.53:8080`.
4. Select **Continue**.
5. On **Sign in to Server**, enter your username and password, or use single sign-on.

On macOS, allow the **Local Network** prompt the first time you connect to a server on your network.

## Switch modes or sign out

Select **Log Out** in **Settings → Connection Mode** to return to Local Only. To move between Stirling Cloud and a server, log out, then sign in with the other option.
