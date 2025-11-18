---
sidebar_position: 2
id: Undo-and-Redo
title: Undo, Redo & Version History
description: Powerful version control features for your PDF operations
---

# Undo, Redo & Version History

Stirling-PDF provides **local version control** for your PDFs - experiment freely knowing you can always go back to previous versions.

---

## Quick Overview

Made a mistake? No problem!

- **Undo** - Revert to previous version
- **Redo** - Reapply undone changes
- **Version History** - Jump to any previous version
- **All Local** - Versions stored privately on your device

---

## How Undo/Redo Works

### Automatic Version Tracking

Every operation creates a new version:
```
Original.pdf
  → Compress → Version 1 (compressed)
  → Watermark → Version 2 (compressed + watermark)
  → Rotate → Version 3 (compressed + watermark + rotated)
```

### Using Undo

**Click Undo Button:**
- Located in toolbar
- Goes back one version
- Previous version restored
- Current version saved (can redo)

**Example:**
```
Version 3 (Current)
  → Click Undo
Version 2 (Now Current)
  → Click Undo again
Version 1 (Now Current)
```

### Using Redo

**Click Redo Button:**
- Reapplies undone operation
- Moves forward in history
- Only available after undo

**Example:**
```
Version 1 (After Undo)
  → Click Redo
Version 2 (Restored)
  → Click Redo again
Version 3 (Restored)
```

---

## Version History Panel

### Accessing History

**Open Version History:**
1. Look for "History" or "Versions" button
2. Click to open history panel
3. See list of all versions

### What You'll See

**Version List:**
- **Version Number** - Sequential numbering
- **Operation Name** - What was done
- **Timestamp** - When it happened
- **Thumbnail** - Preview of that version
- **File Size** - Storage used

**Example History:**
```
Version 4: Compressed (2.5MB) - 2 min ago
Version 3: Added Watermark (5.1MB) - 5 min ago
Version 2: Rotated Pages (5.0MB) - 8 min ago
Version 1: Merged PDFs (5.0MB) - 10 min ago
Original: document.pdf (5.2MB) - 15 min ago
```

### Jumping to Any Version

**Restore Previous Version:**
1. Open Version History
2. Click on desired version
3. That version becomes current
4. Continue working from there

**Use Cases:**
- Try different compression levels, pick best
- Experiment with settings risk-free
- Compare before/after results
- Recover from mistakes

---

## Practical Examples

### Example 1: Finding Best Compression

**Workflow:**
```
1. Original PDF (10MB)
2. Compress → Low → Check quality → Too large
3. Undo
4. Compress → Medium → Check quality → Still good
5. Undo
6. Compress → High → Check quality → Lost details
7. Undo twice → Back to Medium → Download
```

**Result:** Found optimal compression without re-uploading

### Example 2: Watermark Positioning

**Workflow:**
```
1. Add Watermark → Top Left → Preview → Too prominent
2. Undo
3. Add Watermark → Bottom Right → Preview → Perfect!
4. Download
```

**Result:** Perfect placement without starting over

### Example 3: Batch Correction

**Workflow:**
```
1. Rotate All Pages → 90° clockwise → Wrong direction!
2. Undo
3. Rotate All Pages → 90° counter-clockwise → Correct
4. Continue with other operations
```

**Result:** Quick correction without re-processing

---

## Version Storage

### Where Versions Are Stored

**Browser Storage:**
- Stored in IndexedDB (local)
- Same storage as uploaded files
- Counts toward storage limit
- Private to you

### How Long Are Versions Kept?

**Retention:**
- ✅ Until you clear storage
- ✅ Until browser data is cleared
- ✅ Until you close browser (some settings)
- ✅ Until you manually delete

**Version Limits:**
- No hard limit on number of versions
- Limited by browser storage capacity
- Older versions can be manually deleted
- Clearing files also clears versions

### Managing Version Storage

**View Storage Usage:**
- Check File Manager
- See total storage used
- Each version counts separately

**Free Up Space:**
1. Delete old version history
2. Keep only current version
3. Download important versions first
4. Clear completed projects

---

## Best Practices

### Do's

**✅ Experiment Freely:**
- Try different settings
- Use undo to compare results
- No fear of losing work

**✅ Download Important Versions:**
- Save key milestones externally
- Don't rely solely on version history
- Browser storage is temporary

**✅ Clean Up Regularly:**
- Delete old version history
- Keep storage manageable
- Prevent slowdowns

### Don'ts

**❌ Don't Rely Long-Term:**
- Version history is session-based
- Refreshing may clear history
- Not a permanent backup system

**❌ Don't Ignore Storage:**
- Versions use significant space
- Can fill up storage quickly
- Monitor and clean regularly

**❌ Don't Skip Downloads:**
- Always download final results
- Version history can be lost
- External backup is critical

---

## Limitations

### What's NOT Saved in History

**Not Versioned:**
- File renames (name changes)
- File deletions
- Storage clearing
- Downloads

**Only Operations:**
- PDF processing operations
- Tool results
- Applied changes

### When History is Cleared

**Automatic Clearing:**
- Page refresh (depending on settings)
- Browser restart (some browsers)
- Browser data clearing
- Incognito mode closure

**Manual Clearing:**
- Clear Files button
- Delete individual file
- Clear version history button

---

## Troubleshooting

### Undo Button Disabled

**Reasons:**
- No previous version exists
- At oldest version already
- History was cleared
- Fresh upload (no operations yet)

### Version History Empty

**Possible Causes:**
- No operations performed yet
- History was manually cleared
- Browser data was cleared
- Using a fresh file

### Can't See Old Versions

**Solutions:**
- Check if history was cleared
- Look in different file
- May have exceeded storage
- Try Desktop App for better retention

---

## Desktop App vs Browser

### Browser Version History

**Pros:**
- ✅ Works everywhere
- ✅ No installation
- ✅ Automatic

**Cons:**
- ❌ Session-based
- ❌ Can be cleared easily
- ❌ Storage limited

### Desktop App Version History

**Pros:**
- ✅ More reliable persistence
- ✅ Larger storage capacity
- ✅ Better performance
- ✅ Files on disk

**Cons:**
- ❌ Device-specific
- ❌ Requires installation

---

## Tips for Power Users

### Version Branching

**Try Multiple Approaches:**
```
Original
  → Path A: High Compression → Test
  → Undo back to Original
  → Path B: Medium Compression → Test
  → Pick best result
```

### Checkpoint Downloads

**Save Major Milestones:**
```
1. Complete Phase 1 → Download "Phase1.pdf"
2. Continue to Phase 2 → Download "Phase2.pdf"
3. Final touches → Download "Final.pdf"
```

### Quick Recovery

**Rapid Experimentation:**
```
Try setting → Undo → Try different setting → Undo
→ Try another → Keep best → Continue
```

---

## Related Documentation

- **[File Storage](./File-Storage.md)** - How files are stored
- **[Multi-Tool](../Functionality/Multi-Tool.md)** - Best tool for version workflows
- **[Desktop vs Web](./Desktop-vs-Web.md)** - Storage persistence comparison

---

## Summary

Undo/Redo and Version History features:

- ⏮️ **Undo/Redo** - Go back and forth through changes
- 📜 **Full History** - See all operations performed
- 🔄 **Jump Anywhere** - Restore any previous version
- 🔒 **Private** - All versions stored locally
- 🎯 **Risk-Free Experimentation** - Try anything, revert easily

**Remember:** Download important results - version history is temporary workspace, not permanent storage!
