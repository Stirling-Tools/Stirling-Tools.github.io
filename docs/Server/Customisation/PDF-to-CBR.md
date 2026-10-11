---
sidebar_position: 5
title: PDF to CBR conversion
sidebar_label: PDF to CBR
description: Install the rar program so a self-hosted Stirling PDF server can convert PDFs to CBR comic book files.
---

# PDF to CBR conversion

Converting PDFs to CBR needs the `rar` command-line program, which Stirling PDF does not ship. At startup, Stirling PDF turns the `pdf-to-cbr` tool on only if it finds `rar` on the `PATH`. PDF to CBZ needs nothing extra.

RAR is shareware that needs a licence after its trial period; see the [RAR licence](https://www.win-rar.com/winrarlicense.html?L=0).

## Install rar

<Tabs groupId="os">
  <TabItem value="linux" label="Linux">
    Debian and Ubuntu have `rar` in the `non-free` repository:

    ```bash
    sudo apt install rar      # Debian / Ubuntu
    ```

    Or download "RAR for Linux x64" from [rarlab.com](https://www.rarlab.com/download.htm) and copy the `rar` binary to `/usr/local/bin/`.
  </TabItem>
  <TabItem value="windows" label="Windows">
    Download the RAR command line tools from [rarlab.com](https://www.rarlab.com/download.htm) and copy `rar.exe` to a folder on your system `PATH`.
  </TabItem>
</Tabs>

Check that the account running Stirling PDF can find it (`which rar` on Linux, `where rar` on Windows), then restart Stirling PDF.

## Docker

The container needs a Linux `rar` binary that matches its architecture. Mount one from the host, or build it into your own image:

```yaml
services:
  stirling-pdf:
    volumes:
      - /usr/local/bin/rar:/usr/local/bin/rar:ro
```

Check it with `docker exec -it <container_name> rar`, then restart the container.
