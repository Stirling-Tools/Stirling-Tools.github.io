---
sidebar_position: 1
id: File-Storage
title: Browser File Storage
description: How Stirling-PDF stores and manages your PDF files in the browser
---

# Browser File Storage

Stirling-PDF's **browser-based file storage** allows you to upload your PDFs once and reuse them across multiple operations without constant re-uploading.

---

## How It Works

### Browser Storage Technology

Stirling-PDF uses your browser's **IndexedDB** to store PDF files locally:

- **Local Storage** - Files stored only on your device
- **Private** - Only you can access your files
- **Temporary** - Files remain until you clear them
- **No Server Upload** - Files don't touch the server until you process them

### What This Means for You

**Traditional PDF Tools:**
1. Upload PDF to Tool A → Download result
2. Upload result to Tool B → Download result
3. Upload result to Tool C → Download final
4. Repeat for every operation 😫

**Stirling-PDF:**
1. Upload PDF once
2. Use Tool A, B, C, D... seamlessly
3. Download final result
4. All operations in one session! 🎉

---

## Using File Storage

### Uploading Files

**How to Add Files:**
1. **Drag and Drop** - Easiest method, drag PDFs into any tool
2. **Click to Browse** - Use upload button to select files
3. **Multi-Tool Workspace** - Upload once, access from all tools

**Supported Formats:**
- PDF files (primary format)
- Images (auto-converted when needed)
- Office documents (converted via tools)

### Viewing Stored Files

**File Manager:**
- Click **"File Manager"** or **"My Files"** button
- See all files currently in storage
- View thumbnails and file info
- Check storage usage

**What You'll See:**
- **Thumbnail** - First page preview
- **File Name** - Original or renamed
- **File Size** - Storage space used
- **Last Modified** - When last processed
- **Actions** - Download, delete, rename

### Managing Your Files

**Rename Files:**
- Click file name in File Manager
- Type new name
- Press Enter to save
- Helps organize your work

**Download Files:**
- Click download icon/button
- Saves to your Downloads folder
- Original file preserved in storage
- Can download multiple versions

**Delete Files:**
- Click delete/trash icon
- Confirms before removing
- Frees up storage space
- Cannot be undone

**Clear All Files:**
- **"Clear Files"** or **"Clear All"** button
- Removes everything from storage
- Confirms before clearing
- Use before leaving shared computers

---

## Storage Limits

### Browser Storage Capacity

Different browsers have different limits:

| Browser | Typical Limit | Notes |
|---------|--------------|-------|
| **Chrome/Edge** | ~10GB | 60% of available disk space |
| **Firefox** | ~10GB | Configurable in settings |
| **Safari** | ~1GB | More restrictive |
| **Mobile Browsers** | ~500MB-1GB | More limited |

### What Uses Storage?

- **PDF Files** - Your uploaded documents
- **Version History** - Previous versions (if enabled)
- **Processing Results** - Output from operations
- **Thumbnails** - Preview images

### Storage Warnings

Stirling-PDF will warn you when:
- ⚠️ **75% Full** - "Running low on storage"
- ⚠️ **90% Full** - "Storage almost full"
- ❌ **100% Full** - "Cannot upload, storage full"

---

## Best Practices

### Keep Storage Clean

**1. Download Then Delete:**
```
Process PDF → Download result → Delete from storage
```
Don't let finished files accumulate

**2. Clear Between Projects:**
```
Finish Project A → Clear all files → Start Project B
```
Fresh start for each project

**3. Monitor Usage:**
- Check File Manager regularly
- Review what's using space
- Delete unused files promptly

### Optimize Storage Usage

**Use Compression:**
- Compress large PDFs before storing
- Reduces storage footprint
- Faster uploads/downloads

**Work in Batches:**
- Upload related files together
- Process as a group
- Clear when done

**Prioritize Important Files:**
- Download critical results immediately
- Don't rely on storage long-term
- Keep backups elsewhere

---

## Privacy and Security

### What's Stored Where?

**In Your Browser (Local):**
- ✅ All uploaded PDF files
- ✅ Version history
- ✅ Processing results before download
- ✅ Thumbnails and previews

**Never Stored Locally:**
- ❌ Your login credentials (server-side only)
- ❌ Server processing operations
- ❌ Other users' files

### Privacy Features

**Isolation:**
- Files are domain-specific
- Other websites cannot access
- Private to your browser profile

**No Server Storage:**
- Files don't upload until you process
- Server immediately deletes after processing
- No permanent server storage

**Manual Control:**
- You decide when to clear
- You control what's stored
- You manage retention

### Security Considerations

**✅ Safe For:**
- General PDFs
- Work documents
- Personal files on personal devices
- Temporary storage during work

**⚠️ Use Caution For:**
- Highly sensitive documents
- Shared/public computers
- Long-term storage
- Regulated/compliance data

**🔒 Maximum Security:**
- Use Desktop App (fully offline)
- Self-host Stirling-PDF
- Clear storage after every use
- Incognito/Private browsing mode

---

## Troubleshooting

### Files Disappeared

**Possible Causes:**
1. Browser cleared data automatically
2. You clicked "Clear Files"
3. Browser settings cleared on close
4. Switched to incognito mode
5. Different browser/device

**Solutions:**
- Check Downloads folder (may have saved)
- Use Desktop App for persistence
- Enable "persistent storage" in browser settings
- Don't rely on storage long-term

---

### "Storage Quota Exceeded" Error

**Symptoms:** Can't upload new files

**Solutions:**
1. **Clear Old Files:**
   - Open File Manager
   - Delete unused files
   - Try upload again

2. **Download and Remove:**
   - Download important files first
   - Delete them from storage
   - Free up space

3. **Use Smaller Files:**
   - Compress PDFs before uploading
   - Split large files
   - Work with fewer files at once

4. **Switch to Desktop App:**
   - No storage limits
   - Unlimited file sizes
   - Better for large projects

---

### Can't Find a File

**Check These Places:**
1. **File Manager** - List all stored files
2. **Downloads Folder** - May have already downloaded
3. **Different Browser** - Files are browser-specific
4. **Incognito Mode** - Separate storage

**Prevention:**
- Name files descriptively
- Download important results immediately
- Don't rely on storage for backups

---

### Slow Performance

**Symptoms:** Lag, freezing, slow operations

**Causes:**
- Too many files in storage
- Storage nearly full
- Large files (100MB+)
- Browser memory issues

**Solutions:**
1. Clear unused files
2. Close other tabs
3. Restart browser
4. Use Desktop App
5. Process fewer files at once

---

## Browser Storage vs. Desktop App

### Browser Storage

**Pros:**
- ✅ No installation needed
- ✅ Access from any device
- ✅ Automatic updates
- ✅ Works on any OS

**Cons:**
- ❌ Storage limits (~1-10GB)
- ❌ Files may be cleared
- ❌ Browser-dependent
- ❌ Can't work fully offline

**Best For:**
- Occasional PDF work
- Quick tasks
- Shared computers (remember to clear!)
- Web-based workflows

### Desktop App Storage

**Pros:**
- ✅ **Unlimited storage**
- ✅ Files in your file system
- ✅ True persistent storage
- ✅ Fully offline capable
- ✅ Native performance

**Cons:**
- ❌ Requires installation
- ❌ Device-specific
- ❌ Manual updates

**Best For:**
- Daily PDF work
- Large files
- Offline work
- Sensitive documents
- Professional use

**Recommendation:** Desktop app for serious work, browser for quick tasks.

---

## Clearing Storage

### When to Clear

**Always Clear:**
- ✅ After finishing work on shared computers
- ✅ Before closing on public computers
- ✅ When switching projects
- ✅ When storage is full

**Consider Clearing:**
- After major batch operations
- When performance slows
- Before browser maintenance
- Periodically for privacy

### How to Clear

**Option 1: File Manager**
```
1. Open File Manager
2. Select files to delete
3. Click Delete
4. Or click "Clear All"
```

**Option 2: Browser Settings**
```
Chrome/Edge: Settings → Privacy → Clear browsing data → Cookies and site data
Firefox: Settings → Privacy → Clear Data → Site data
Safari: Settings → Privacy → Manage Website Data → Remove
```

**Option 3: Incognito Mode**
```
Storage automatically cleared when window closes
```

---

## Advanced: Persistent Storage

Some browsers allow requesting "persistent storage" to prevent automatic clearing.

**Enable in Chrome/Edge:**
1. Click padlock in address bar
2. Site Settings
3. Storage → Allow
4. Prevents automatic clearing

**Note:** Still recommended to manually clear sensitive files.

---

## Related Documentation

- **[Multi-Tool](../Functionality/Multi-Tool.md)** - Best tool for using file storage
- **[Undo and Redo](./Undo-and-Redo.md)** - Version history features
- **[Desktop vs Web](./Desktop-vs-Web.md)** - Choose the right deployment

---

## Summary

Browser file storage is a game-changer:

- 📁 **Upload once, use everywhere** - No more re-uploading
- 🔒 **Private and local** - Files stay on your device
- 🚀 **Faster workflows** - Seamless operation chaining
- 💾 **Temporary storage** - Clear when done
- 🖥️ **Desktop alternative** - Unlimited storage available

**Remember:** Browser storage is temporary workspace, not permanent backup. Download important results and clear storage regularly!
