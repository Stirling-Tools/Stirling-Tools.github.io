---
title: Updates, data and uninstall
sidebar_label: Updates & data
sidebar_position: 5
description: How the desktop app updates itself, where it keeps its data and logs on each system, and how to remove it completely.
---

# Updates, data and uninstall

## Updates

Shortly after it starts, the app checks for a new version. If there is one, **Update Available** appears:

- **Install Now** installs it. Then select **Restart Now**.
- **Later** hides the prompt for a day.
- **Download Latest** opens the download if the app can't install the update itself.

On Windows (x64) the app is installed for all users, so the prompt usually shows **Administrator permissions required**. Select **Download Latest** and run the installer, or run `winget upgrade StirlingTools.StirlingPDF` from an administrator terminal.

To change how updates work, go to **Settings → Preferences → Software Updates → Update behavior**:

- **Ask me before installing updates** (default)
- **Install updates automatically**
- **Don't check for updates**

If **Software Updates** shows **Managed by administrator**, or isn't there, your IT team controls updates ([Managed deployment](./Managed-Deployment.md)).

If you installed with a package manager, you can also update with it:

```bash
winget upgrade StirlingTools.StirlingPDF   # Windows
brew upgrade --cask stirling-tools/stirling-pdf/stirling-pdf   # macOS
paru -Syu                                  # Arch Linux (AUR)
```

## Data and log locations

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

| Folder | What's in it |
|---|---|
| `%APPDATA%\Stirling-PDF` | Engine data and logs (`logs\`) |
| `%APPDATA%\stirling.pdf.dev` | Connection mode, server address and update setting |
| `%LOCALAPPDATA%\stirling.pdf.dev` | Workspace files and app logs (`logs\`) |

Sign-in tokens are kept in Windows Credential Manager.

</TabItem>
<TabItem value="macos" label="macOS">

| Folder | What's in it |
|---|---|
| `~/Library/Application Support/Stirling-PDF` | Engine data and logs (`logs/`) |
| `~/Library/Application Support/stirling.pdf.dev` | Connection mode, server address and update setting |
| `~/Library/WebKit/stirling.pdf.dev` | Workspace files |
| `~/Library/Logs/Stirling-PDF` and `~/Library/Logs/stirling.pdf.dev` | App logs |

Sign-in tokens are kept in Keychain.

</TabItem>
<TabItem value="linux" label="Linux">

| Folder | What's in it |
|---|---|
| `~/.config/Stirling-PDF` | Engine data and logs (`logs/`) |
| `~/.local/share/stirling.pdf.dev` | Connection mode, server address, update setting, workspace files and app logs (`logs/`) |

</TabItem>
</Tabs>

To report a problem, zip the log folders and attach them to a GitHub issue ([How do I report a bug or ask for a feature?](../Tools/FAQ.md#how-do-i-report-a-bug-or-ask-for-a-feature)), with the **Desktop Version** from **Settings → Preferences → Software Updates**.

## Uninstall

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

Open Windows **Settings → Apps → Installed apps**, find **Stirling PDF** and select **Uninstall**. Or run `winget uninstall StirlingTools.StirlingPDF`.

</TabItem>
<TabItem value="macos" label="macOS">

Quit the app and drag **Stirling PDF** from **Applications** to the **Trash**. With Homebrew, run `brew uninstall --cask stirling-tools/stirling-pdf/stirling-pdf`.

</TabItem>
<TabItem value="linux" label="Linux">

- **.deb or .rpm:** remove the package with your package manager.
- **AppImage:** delete the file.
- **AUR:** `paru -R stirling-pdf-desktop`

</TabItem>
</Tabs>

Uninstalling keeps your data. To remove it, quit the app and delete the folders in [Data and log locations](#data-and-log-locations), and the `stirling-pdf` entries in Credential Manager or Keychain Access.
