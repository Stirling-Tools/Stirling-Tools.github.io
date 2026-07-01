---
sidebar_position: 8
id: Uninstall
title: Uninstall Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Uninstalling Stirling PDF

How to remove Stirling PDF from your system. Choose the tab that matches how you installed it.

<Tabs groupId="uninstall-platform">
<TabItem value="windows" label="Windows" default>

### Desktop application

1. Open **Settings → Apps → Installed apps** (or **Control Panel → Programs → Uninstall a program**).
2. Find **Stirling PDF** in the list.
3. Click **Uninstall** and follow the prompts.

### Installed via winget

```powershell
winget uninstall StirlingTools.StirlingPDF
```

### Leftover config

The uninstaller does not remove your settings. To delete them, remove:

```
%APPDATA%\Stirling-PDF
```

</TabItem>
<TabItem value="macos" label="macOS">

### Desktop application

1. Quit Stirling PDF if it's running.
2. Open **Finder → Applications**.
3. Drag **Stirling PDF** to the Trash, then empty the Trash.

### Installed via Homebrew

```bash
brew uninstall --cask stirling-pdf
```

### Leftover config

Your settings are not removed automatically. To delete them:

```bash
rm -rf ~/Library/Application\ Support/Stirling-PDF
```

</TabItem>
<TabItem value="linux" label="Linux Desktop">

Use the command that matches how you installed the app.

**Debian / Ubuntu (.deb):**

```bash
sudo dpkg -r stirling-pdf
# or
sudo apt remove stirling-pdf
```

**Fedora / RHEL (.rpm):**

```bash
sudo dnf remove stirling-pdf
```

**AppImage:**

Just delete the `.AppImage` file - there's nothing else to uninstall.

**AUR (Arch):**

```bash
paru -R stirling-pdf
# or
yay -R stirling-pdf
```

</TabItem>
<TabItem value="docker" label="Docker">

### Docker Compose

From the directory containing your `docker-compose.yml`:

```bash
docker compose down
```

To also remove the image and named volumes, add flags:

```bash
docker compose down --rmi all -v
```

### docker run

```bash
docker rm -f stirling-pdf
docker rmi stirlingtools/stirling-pdf
```

### Removing your data

If you used a bind mount (e.g. `./stirling-data`), delete that directory to remove your data:

```bash
rm -rf ./stirling-data
```

:::warning
Removing the `/configs` volume (or its bind-mounted directory) deletes your users and settings. Back it up first if you might want it later.
:::

</TabItem>
</Tabs>
