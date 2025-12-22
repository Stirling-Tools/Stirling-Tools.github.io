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
- `favicon.svg`, `favicon.ico` - Browser favicons
- `classic-logo/logo.svg` - Classic logo
- `modern-logo/logo.svg` - Modern logo
- `apple-touch-icon.png` - iOS icon
- Images, fonts, and other assets

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

### Example: Custom Logo

```bash
customFiles/
  └── static/
      └── classic-logo/
          └── logo.svg
```

This overrides the classic Stirling-PDF logo.

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
