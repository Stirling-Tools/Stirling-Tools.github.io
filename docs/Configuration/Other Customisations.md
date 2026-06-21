---
sidebar_position: 13
---
# Other Customisations

Stirling PDF offers various other customisation options, such as:

## Static File Overrides

You can override static files (logos, images, favicons, etc.) by placing custom versions in the `customFiles/static/` directory.

### How It Works

Stirling PDF checks for files in this order:
1. **First:** `customFiles/static/` (your custom files)
2. **Fallback:** Built-in static files embedded in the application

This means you can replace any static resource by placing a file with the matching path in `customFiles/static/`.

### Finding File Paths to Override

Most static files in the application come from the `frontend/editor/public/` folder in the source code. To override a file, place it under `customFiles/static/` matching the same path it is served at. The mapping is direct:

**Frontend source → Your override path:**
- `frontend/editor/public/manifest.json` → `customFiles/static/manifest.json`
- `frontend/editor/public/modern-logo/StirlingPDFLogoBlackText.svg` → `customFiles/static/modern-logo/StirlingPDFLogoBlackText.svg`
- `frontend/editor/public/classic-logo/StirlingPDFLogoBlackText.svg` → `customFiles/static/classic-logo/StirlingPDFLogoBlackText.svg`

**To see what files you can override:**
1. Browse the [frontend/editor/public folder on GitHub](https://github.com/Stirling-Tools/Stirling-PDF/tree/main/frontend/editor/public)
2. Match the directory structure in your `customFiles/static/` folder

Common files you might want to override:

**Favicons & Icons** (override by placing a matching file at the root of `customFiles/static/`):
- `favicon.svg`, `favicon.ico` - Browser favicons
- `apple-touch-icon.png` - iOS home screen icon
- `android-chrome-192x192.png` - Android icon (192x192)
- `android-chrome-512x512.png` - Android icon (512x512)

**Logo Variants (Both classic-logo/ and modern-logo/):**

Both logo directories contain the same file structure - just replace `classic-logo/` or `modern-logo/` with whichever style you're using:

- `{style}/StirlingPDFLogoBlackText.svg` - Logo with black text (light mode)
- `{style}/StirlingPDFLogoWhiteText.svg` - Logo with white text (dark mode)
- `{style}/StirlingPDFLogoGreyText.svg` - Logo with grey text
- `{style}/StirlingPDFLogoNoTextDark.svg` - Logo without text (dark variant)
- `{style}/StirlingPDFLogoNoTextLight.svg` - Logo without text (light variant)
- `{style}/logo-tooltip.svg` - Small logo for tooltips
- `{style}/favicon.ico` - Style-specific favicon
- `{style}/logo192.png`, `{style}/logo512.png` - PNG versions at different sizes
- `{style}/Firstpage.png` - First page preview image

Where `{style}` is either `classic-logo` or `modern-logo` depending on your logo style setting:

**Settings file (configs/settings.yml):**
```yaml
ui:
  logoStyle: classic  # Options: 'classic' or 'modern'
```

**Environment variable (Docker):**
```bash
UI_LOGOSTYLE=classic
```

**In-app configuration:**
Settings → Configuration → System Settings → Logo Style (requires login enabled)

**Other Assets:**
- `robots.txt` - Search engine directives
- `manifest.json`, `manifest-classic.json` - Web app manifests
- Images, fonts, and locales

### Example: Custom Favicon

```bash
# Your directory structure
customFiles/
  └── static/
      ├── favicon.svg
      └── favicon.ico
```

Docker compose:
```yaml
volumes:
  - ./customFiles:/customFiles:rw
```

Restart the container - your custom favicons will be used!

### Example: Custom Logo (Simple)

```bash
customFiles/
  └── static/
      └── classic-logo/
          └── StirlingPDFLogoBlackText.svg
```

This overrides the classic logo with black text (used in light mode).

**Important:** Make sure your logo style is set to `classic` in your configuration:
```yaml
ui:
  logoStyle: classic  # Must match the directory you're overriding!
```

Or via environment variable:
```bash
UI_LOGOSTYLE=classic
```

If you have `logoStyle: modern` set, override files in `modern-logo/` instead!

### Example: Complete Branding Customization

To fully rebrand Stirling PDF with your company logo, override multiple variants:

```bash
customFiles/
  └── static/
      ├── favicon.svg                                    # Main favicon
      ├── favicon.ico                                    # Legacy favicon
      └── classic-logo/                                  # Or modern-logo/ if using modern style
          ├── StirlingPDFLogoBlackText.svg              # Light mode with text
          ├── StirlingPDFLogoWhiteText.svg              # Dark mode with text
          ├── StirlingPDFLogoNoTextLight.svg            # Light mode icon only
          ├── StirlingPDFLogoNoTextDark.svg             # Dark mode icon only
          ├── logo-tooltip.svg                          # Small icon
          ├── favicon.ico                               # Style-specific favicon
          └── Firstpage.png                             # Homepage preview
```

**Important:** Set your logo style to match the directory:
```yaml
ui:
  logoStyle: classic  # Use 'classic' if overriding classic-logo/, 'modern' if overriding modern-logo/
```

Or via environment variable: `UI_LOGOSTYLE=classic`

**Tips:**
- For consistent branding across light/dark modes, provide both:
  - `StirlingPDFLogoBlackText.svg` (shows on light backgrounds)
  - `StirlingPDFLogoWhiteText.svg` (shows on dark backgrounds)
- You can also configure this in-app: Settings → Configuration → System Settings → Logo Style (if you have login enabled)

### Advanced: Overriding Built Files (HTML, JS, CSS)

**⚠️ For developers only!**

Files like `index.html`, JavaScript bundles, and CSS are **generated** by the build process from `frontend/editor/src/`. To override these:

1. Clone the Stirling PDF repository
2. Make your changes to the React source code in `frontend/editor/src/`
3. Build the frontend: `task frontend:build` (from the repository root)
4. The built files appear in `frontend/editor/dist/`
5. Copy the specific files you want to override to `customFiles/static/` matching the path structure

**Example:** To override `index.html`:
```bash
# After building the frontend
cp frontend/editor/dist/index.html customFiles/static/index.html
```

**Warning:** Built files may include hashed filenames (e.g., `assets/index-abc123.js`) that change with each build. Overriding these requires matching the exact filename from your build and is not recommended for most users.

---

## Defaulting Language
Default language selection via the `SYSTEM_DEFAULTLOCALE` environment variable. Accepted values include `de-DE`, `fr-FR`, `ar-AR` and all other languages codes that are within Stirling PDFs current list.

## Google Search Visibility (robots.txt)
Enable or disable search engine visibility (via `robots.txt`) with the `SYSTEM_GOOGLEVISIBILITY` environment variable, or in `configs/settings.yml`:
```yaml
system:
  googlevisibility: true  # 'true' to allow Google visibility, 'false' to disallow
```

## Custom Root path
Host the interface under a sub-path with the `SYSTEM_ROOTURIPATH` environment variable.
This is for changing websites like stirlingtools.com to instead host the interface at stirlingtools.com/demo:
```bash
SYSTEM_ROOTURIPATH=/demo
```
The setting can also be written in `configs/settings.yml` as the raw Spring property:
```yaml
server:
  servlet:
    context-path: /demo
```

## Enable/Disable Analytics
Analytics can be enabled/disabled with ``SYSTEM_ENABLEANALYTICS`` or
```yaml
system:
  enableAnalytics: 'true'
```
In configs/settings.yml
