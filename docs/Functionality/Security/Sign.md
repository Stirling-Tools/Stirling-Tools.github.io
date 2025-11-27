---
sidebar_position: 3
id: Sign
title: Sign PDF (Handwritten Signatures)
description: Add handwritten, text, or image signatures to PDFs
---

# Sign PDF (Handwritten Signatures)

**Tool ID:** `sign`

Add handwritten signatures, text signatures, or image-based signatures to PDF documents. This tool is for visual/handwritten signatures - for certificate-based digital signatures, see [Certificate Signing](./Certificate-Signing).

---

## What is PDF Signing?

There are two types of PDF signatures:

### Handwritten/Visual Signatures (This Tool)
- Draw your signature with mouse/touchscreen
- Add signature as text (typed name)
- Upload signature image (PNG, JPG)
- Visual appearance only
- Non-cryptographic

**Use For:** Signing forms, contracts, letters where a visual signature is needed.

### Digital/Certificate Signatures (Different Tool)
- Cryptographic signatures using certificates
- Proves identity and document integrity
- Cannot be forged
- Legally binding in many jurisdictions

**Use For:** Legal documents, contracts requiring authentication, compliance requirements.

**Learn More:** [Certificate Signing Guide](./Certificate-Signing)

---

## How to Sign PDFs

### Method 1: Draw Your Signature

1. **Upload PDF** - Select document to sign
2. **Navigate to Page** - Find where you need to sign
3. **Click "Draw Signature"** - Opens signature pad
4. **Draw** - Use mouse or touchscreen to draw signature
5. **Position** - Drag signature to correct location
6. **Resize** - Adjust signature size
7. **Apply** - Add signature to PDF
8. **Download** - Save signed document

**Tips:**
- Use a touchscreen or stylus for best results
- Draw slowly for smoother lines
- Click "Clear" to redraw if needed
- Make signature large enough to be legible

### Method 2: Type Your Signature

1. **Upload PDF**
2. **Click "Text Signature"**
3. **Type Your Name** - Enter text for signature
4. **Choose Font** - Select cursive/script font
5. **Position and Size** - Adjust placement
6. **Apply** - Add to PDF

**Best For:** Quick signing when handwriting isn't practical.

### Method 3: Upload Signature Image

1. **Upload PDF**
2. **Click "Upload Signature"**
3. **Select Image** - Choose PNG/JPG of your signature
4. **Position and Resize** - Place on document
5. **Apply** - Add to PDF

**Best For:** Consistent signature appearance across documents.

---

## Using Pre-stored Signatures

You can configure Stirling-PDF to load pre-stored signature files for quick access. This is useful for:
- Consistent signature appearance
- Quick signing of multiple documents
- Team/organization signature standards

**Configuration:** [Sign with Custom Files](../../Configuration/Sign%20with%20custom%20files)

---

## Signature Options

### Appearance

**Transparency:**
- Make signature background transparent
- Blend naturally with document

**Color:**
- Traditional blue ink
- Black ink
- Custom colors

**Size:**
- Adjust to fit signature line
- Maintain aspect ratio
- Scale up/down as needed

### Position

**Placement:**
- Drag and drop to any location
- Align to signature lines
- Position relative to form fields

**Rotation:**
- Rotate if needed
- Adjust angle

**Pages:**
- Sign on single page
- Add to multiple pages
- Different signatures per page

---

## Best Practices

### Creating Good Signatures

**For Drawn Signatures:**
1. Use a stylus or touchscreen if possible
2. Draw slightly larger than needed (easier to scale down)
3. Use consistent speed for smooth lines
4. Practice in signature pad before applying
5. Keep signature simple (complex signatures may not look good)

**For Image Signatures:**
1. Scan or photograph on white paper
2. High contrast (dark ink, white background)
3. Crop tightly around signature
4. Save as PNG with transparent background
5. High resolution (300 DPI minimum)

### Document Signing

**Before Signing:**
1. Read the entire document
2. Verify all details are correct
3. Ensure you have authority to sign
4. Check signature placement locations

**While Signing:**
1. Place signature within designated areas
2. Don't cover important text
3. Size appropriately for signature line
4. Add date if required
5. Add initials if multiple pages

**After Signing:**
1. Save original unsigned copy (optional)
2. Download signed PDF
3. Verify signature appears correctly
4. Distribute or submit as needed

---

## Signature Types Comparison

### Visual vs. Digital Signatures

| Feature | Visual Signature (This Tool) | Digital Signature ([Certificate](./Certificate-Signing)) |
|---------|------------------------------|-------------------------------------------------------------|
| **Appearance** | Handwritten/image | May include visual + certificate info |
| **Security** | Visual only, can be copied | Cryptographically secure |
| **Authentication** | No verification | Proves signer identity |
| **Tamper Detection** | None | Detects any changes after signing |
| **Legal Validity** | Varies by jurisdiction | Legally binding in many countries |
| **Use Case** | Forms, casual documents | Contracts, legal documents |
| **Setup** | None required | Requires certificate |

### When to Use Each

**Use Visual Signing (This Tool) When:**
- ✅ Signing forms and applications
- ✅ Internal documents
- ✅ Casual agreements
- ✅ Documents that just need a visual signature
- ✅ No cryptographic verification needed

**Use Digital Signing ([Certificate](./Certificate-Signing)) When:**
- ✅ Legal contracts requiring authentication
- ✅ Compliance and regulatory documents
- ✅ Documents that must prove integrity
- ✅ Multi-party agreements needing verification
- ✅ Legally binding signatures required

---

## Multiple Signatures

### Signing as Multiple People

**Option 1: Sequential Signing**
1. First person signs and saves
2. Second person opens signed PDF
3. Second person adds their signature
4. Continue for additional signers

**Option 2: Signature Coordination**
1. Each person creates their signature image
2. One person uploads all signatures
3. Places each signature in correct location

### Team Signatures

For organizations needing standardized signatures:
1. Store signature images on server
2. Configure pre-loaded signatures
3. Users select from available signatures
4. Consistent appearance across documents

**Setup:** [Sign with Custom Files](../../Configuration/Sign%20with%20custom%20files)

---

## Common Issues

### "Signature looks pixelated"

**Causes:**
- Drew too small and scaled up
- Low resolution image
- Compressed too much

**Solutions:**
- Draw signature larger
- Use higher resolution image (300+ DPI)
- Save as PNG, not JPG

### "Signature doesn't match signature line"

**Causes:**
- Signature too large or small
- Wrong aspect ratio
- Position slightly off

**Solutions:**
- Resize to fit signature line
- Adjust aspect ratio if needed
- Zoom in for precise positioning

### "Can't draw smooth signature"

**Causes:**
- Using mouse (not ideal for drawing)
- Drawing too fast
- No stylus/touchscreen

**Solutions:**
- Use touchscreen or stylus if available
- Draw more slowly
- Consider uploading signature image instead
- Use text signature as alternative

---

## Security Considerations

### What Visual Signatures DON'T Provide

**⚠️ No Authentication:**
- Anyone can draw/add any signature
- No way to verify who actually signed
- Can be copied from other documents

**⚠️ No Tamper Protection:**
- Document can be edited after signing
- No way to detect changes
- Signature can be moved/removed

**⚠️ Limited Legal Standing:**
- May not be legally binding
- Jurisdiction-dependent
- Check local laws and requirements

### When Visual Signatures Are Sufficient

**✅ Appropriate For:**
- Internal company forms
- Consent forms (non-legal)
- Acknowledgment of receipt
- Casual agreements
- Personal documents

**❌ NOT Appropriate For:**
- Legal contracts (use [digital signatures](./Certificate-Signing))
- Financial documents requiring verification
- Government/regulatory submissions
- Documents requiring proof of identity
- Multi-party agreements needing authentication

---

## Legal Considerations

### Electronic Signature Laws

Different jurisdictions have different requirements:

**US (ESIGN Act):**
- Visual signatures generally accepted
- Intent to sign is key
- Record retention required

**EU (eIDAS Regulation):**
- Three signature levels: Simple, Advanced, Qualified
- Visual signatures = Simple Electronic Signatures
- Limited legal weight compared to qualified signatures

**Always:**
- Check local laws and requirements
- Consult legal counsel for important documents
- Use digital signatures for legally binding documents

---

## API Usage

Add signatures programmatically via API:

```bash
# This tool is primarily interactive
# For programmatic signing, use certificate signing:
curl -X POST http://stirling-pdf:8080/api/v1/sign/cert \
  -F "fileInput=@document.pdf" \
  -F "certFile=@certificate.p12" \
  -F "password=certpass" \
  -o signed.pdf
```

See [API Documentation](../../API.md) for complete endpoint reference.

---

## Related Tools

- **[Certificate Signing](./Certificate-Signing)** - Digital signatures with certificates
- **[Add Image](../Advanced-Tools#add-image)** - Add logos or other images
- **[Add Stamp](../Content-Editing#stamps--annotations)** - Add official stamps
- **[Flatten](../Security#permissions--access-control)** - Make signatures non-editable
- **[Add Password](../Security#password-protection)** - Protect signed documents

---

## Summary

Stirling-PDF's Sign tool provides:

✅ **Three signature methods** - Draw, type, or upload
✅ **Easy positioning** - Drag and drop placement
✅ **Customizable appearance** - Size, color, transparency
✅ **Multiple signatures** - Sign as multiple parties
✅ **Pre-stored signatures** - Quick access to saved signatures
✅ **No setup required** - Start signing immediately

Perfect for forms, applications, and documents needing visual signatures!

**Need authentication and legal validity?** Use [Certificate Signing](./Certificate-Signing) instead.
