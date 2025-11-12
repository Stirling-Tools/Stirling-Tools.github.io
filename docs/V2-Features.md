---
sidebar_position: 2
description: Learn about V2's powerful features for working with PDFs
---

# V2 Features Guide

Stirling-PDF V2 introduces powerful new features that make working with PDFs faster, easier, and more flexible.

## Working with Files in V2

### Your Browser Remembers Your Files

When you upload a file to Stirling-PDF V2, your browser stores it temporarily so you can use it across multiple operations without re-uploading.

**What this means for you:**
- Upload a file once, use it with many different tools
- Switch between operations instantly - no waiting for uploads
- See thumbnail previews of all your files
- Work faster with batch operations

**Example workflow:**
1. Upload `document.pdf`
2. Merge it with another PDF
3. Use the result to add a watermark
4. Then compress the final version
5. All without re-uploading files between steps!

### Clearing Your Browser Storage

Your browser storage is temporary and private to you. Clear it whenever you want:

1. Look for the **"Clear Files"** or **"File Manager"** button in the interface
2. Click to see all files stored in your browser
3. Remove individual files or clear all at once

**When to clear:**
- After finishing your work
- When switching to a new project
- If you're running low on browser storage space
- Before closing Stirling-PDF on a shared computer

:::tip Privacy First
Files stored in your browser never leave your device unless you explicitly process them. They're not uploaded to any server until you use a tool.
:::

## Undo and Redo

Made a mistake? No problem! V2 lets you go back to previous versions of your files.

### How It Works

Every time you process a file, V2 keeps track of the changes locally on your device:

- **Undo** - Go back to the previous version
- **Redo** - Move forward after undoing
- **Version history** - Track, revert, and download any previous version
- **All local** - Your file history stays private on your device

### Using Undo/Redo

Look for the undo/redo buttons in the interface:
- **Undo button** (←) - Revert the last operation
- **Redo button** (→) - Reapply an undone operation
- **History panel** - View and jump to any previous version

**Example:**
1. You compress a PDF too much and lose image quality
2. Click **Undo** to get the original back
3. Try compression again with different settings
4. Compare results and pick the best one

### Version History

Click on the **History** or **Versions** button to:
- See a list of all operations performed on a file
- Preview what each version looks like
- Jump back to any earlier version
- Clear old versions you don't need

:::info How Long Are Versions Kept?
Versions are stored in your browser storage. They remain until you:
- Clear your browser data
- Manually remove them from the file manager
- Close the application (depending on your browser settings)
:::

## File History and Management

V2 keeps track of all the files you've worked with and what you've done to them.

### View Your File History

The **File Manager** shows:
- All files currently in your browser storage
- Thumbnail previews of each file
- When each file was last modified
- How much storage each file uses

### Managing Your Files

From the File Manager, you can:
- **Download** any file to your computer
- **Delete** individual files to free up space
- **Rename** files for better organization
- **View details** about file size and operations performed

### Storage Limits

Your browser has storage limits (typically 50MB to 10GB depending on the browser):
- V2 will warn you when you're running low on space
- Older files can be automatically cleaned up
- You can manually clear files anytime

:::tip Storage Tip
If you're working with large PDF files, consider:
- Clearing old files before starting new work
- Downloading finished files and removing them from storage
- Using the desktop app for offline work with unlimited storage
:::

## Desktop vs Web Version

Stirling-PDF V2 is available in two ways:

### Web Version (Browser)
**Best for:**
- Quick access from any device
- No installation needed
- Automatic updates
- Working on shared/public computers

**Features:**
- All PDF tools available
- Browser-based file storage
- Works on any operating system
- Accessible from anywhere

### Desktop Application
**Best for:**
- Frequent PDF work
- Complete offline operation
- Opening PDFs directly from your computer
- Maximum privacy (no internet needed)

**Features:**
- Everything the web version has, plus:
- **Lightning-fast startup** - Launches in as little as 0.3 seconds
- **"Open with Stirling-PDF"** - Right-click any PDF to open directly
- **Set as default PDF viewer** - Make Stirling-PDF your system default
- **Completely offline** - no internet required
- **Larger file storage** - not limited by browser storage
- **Native performance** - true native application speed

### Which Should You Use?

| Scenario | Recommended |
|----------|-------------|
| Occasional PDF work | Web version |
| Daily PDF processing | Desktop app |
| Shared computer | Web version (remember to clear files!) |
| Privacy-sensitive work | Desktop app (fully offline) |
| Large files (100MB+) | Desktop app |
| Quick access anywhere | Web version |
| Working without internet | Desktop app |

:::tip You Can Use Both!
Install the desktop app for daily work, and use the web version when you're on a different computer. Your settings and preferences are separate.
:::

## In-App Settings Management

V2 makes configuration easier for admin users.

### Configure Through the UI

If you have login enabled and are an admin, you can manage all settings through the Settings menu:

**What you can configure:**
- Security settings
- Feature toggles
- System behavior
- Branding and appearance
- Language defaults
- And much more

**Benefits:**
- **No config file editing** - Change settings through a visual interface
- **Immediate changes** - Updates apply without restarting
- **Validation** - See descriptions and validate inputs
- **User-friendly** - No need to remember environment variable names

**How to access:**
1. Enable login with `SECURITY_ENABLELOGIN=true`
2. Log in as an admin user
3. Navigate to Settings in the application
4. Configure options as needed

:::tip Recommended for Production
In-app settings is the easiest way to manage Stirling-PDF V2.0 in production environments.
:::

## Processing Options

### When Does Processing Happen?

V2 intelligently decides where to process your PDFs:

**Browser-side (instant):**
- PDF previews and thumbnails
- Simple file operations
- UI interactions and navigation

**Server-side (powerful):**
- Complex PDF manipulation
- Format conversions
- OCR and text extraction
- Compression and optimization
- Signing and encryption

You don't need to think about this - V2 automatically uses the right approach for each operation.

### Progress Tracking

For longer operations, V2 shows:
- **Progress bar** - See how much is complete
- **Operation name** - Know what's happening
- **Estimated time** - Plan your work
- **Cancel option** - Stop if needed

## Privacy and Your Data

### What Happens to Your Files?

**Browser storage:**
- Files are stored only in your browser
- Never sent to servers unless you explicitly process them
- Automatically cleared when you close the browser (configurable)
- Only you can access them

**During processing:**
- Files are sent to the server for processing
- Processed immediately and deleted
- Results returned to your browser
- No permanent storage on the server

**Desktop app:**
- Everything runs locally on your computer
- No internet connection required
- No data ever leaves your device
- Complete privacy

### Managing Your Privacy

You control your data:
1. **Clear browser storage** regularly
2. **Use desktop app** for sensitive documents
3. **Self-host** Stirling-PDF on your own server
4. **Disable analytics** in settings if desired
5. **Review the code** - it's open source!

## Tips for Best Experience

### Speed Up Your Workflow
- **Upload files at the start** of your session and reuse them
- **Use keyboard shortcuts** when available
- **Batch operations** for multiple files at once
- **Save frequently used settings** as defaults

### Manage Storage Effectively
- **Clear old files** after downloading results
- **Compress large PDFs** before storing in browser
- **Use desktop app** for working with many large files
- **Monitor storage usage** in the file manager

### Troubleshooting

**Files disappeared?**
- Check if you cleared browser data
- Look in your downloads folder - you may have saved them
- Use the desktop app to avoid this issue

**Running out of storage?**
- Clear unused files from the file manager
- Download and delete large files
- Use smaller file sizes when possible
- Consider using the desktop app

**Undo isn't available?**
- Undo only works for the current session
- Refreshing the page clears undo history
- Save important versions by downloading them

**Can't find a file?**
- Check the file manager for all stored files
- Files may have auto-expired based on browser settings
- Desktop app files are in your local file system

## Next Steps

- [Get Started with V2](./Getting%20Started.md) - Installation and first steps
- [Desktop Installation](./Installation/Windows.md) - Install native apps
- [Docker Deployment](./Installation/Docker%20Install.md) - Self-host V2
- [FAQ](./FAQ.md) - Common questions answered
