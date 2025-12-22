---
sidebar_position: 13
---
# Other Customisations

Stirling PDF offers various other customisation options, such as:

## Static File Overrides

You can override static files (logos, images, favicons, etc.) by placing custom versions in the `customFiles/static/` directory.

### How It Works

Stirling-PDF checks for files in this order:
1. **First:** `customFiles/static/` (your custom files)
2. **Fallback:** Built-in static files embedded in the application

This means you can replace any static resource by placing a file with the matching path in `customFiles/static/`.

### Finding File Paths to Override

Static files in the application come from the `frontend/public/` folder in the source code. The mapping is direct:

**Frontend source → Your override path:**
- `frontend/public/favicon.svg` → `customFiles/static/favicon.svg`
- `frontend/public/modern-logo/logo.svg` → `customFiles/static/modern-logo/logo.svg`
- `frontend/public/classic-logo/logo.svg` → `customFiles/static/classic-logo/logo.svg`

**To see what files you can override:**
1. Browse the [frontend/public folder on GitHub](https://github.com/Stirling-Tools/Stirling-PDF/tree/main/frontend/public)
2. Match the directory structure in your `customFiles/static/` folder

Common files you might want to override:

**Favicons & Icons:**
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
Settings → UI → Logo Style (requires login enabled)

**Other Assets:**
- `moon.svg` - Dark mode toggle icon
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

To fully rebrand Stirling-PDF with your company logo, override multiple variants:

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
- You can also configure this in-app: Settings → UI → Logo Style (if you have login enabled)

### Advanced: Overriding Built Files (HTML, JS, CSS)

**⚠️ For developers only!**

Files like `index.html`, JavaScript bundles, and CSS are **generated** by the build process from `frontend/src/`. To override these:

1. Clone the Stirling-PDF repository
2. Make your changes to the React source code in `frontend/src/`
3. Build the frontend: `npm run build` (from the `frontend/` directory)
4. The built files appear in `frontend/dist/`
5. Copy the specific files you want to override to `customFiles/static/` matching the path structure

**Example:** To override `index.html`:
```bash
# After building the frontend
cp frontend/dist/index.html customFiles/static/index.html
```

**Warning:** Built files may include hashed filenames (e.g., `assets/index-abc123.js`) that change with each build. Overriding these requires matching the exact filename from your build and is not recommended for most users.

---

## Defaulting Language
Default language selection via the `SYSTEM_DEFAULTLOCALE` environment variable. Accepted values include `de-DE`, `fr-FR`, `ar-AR` and all other languages codes that are within Stirling-PDFs current list.

## Google Search Visibility (robots.txt)
Enable or disable search engine visibility with the `ALLOW_GOOGLE_VISIBILITY` variable.

## Custom Root path
Redirect the root path of the application using `APP_ROOT_PATH`.
This is for changing websites like stirlingtools.com to instead host the interface at stirlingtools.com/`APP_ROOT_PATH` like stirlingtools.com/demo

## Enable/Disable Analytics
Analytics can be enabled/disabled with ``SYSTEM_ENABLEANALYTICS`` or
```yaml
system:
  enableAnalytics: 'true'
```
In configs/Settings.yml
