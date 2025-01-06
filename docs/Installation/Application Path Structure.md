# Application Path Structure

## Server Deployment
When running in server mode, the base path defaults to `./` (current directory)


## Desktop Deployment
When running as a desktop application (non-server deployment), the base path is set according to the operating system:

- **Windows**: `%APPDATA%\Stirling-PDF\`
- **macOS**: `~/Library/Application Support/Stirling-PDF/`
- **Linux/Unix**: `~/.config/Stirling-PDF/`


# Directory Structure

All paths below are relative to the BASE_PATH. The File.separator ensures cross-platform compatibility.

## Root Directories
- `logs/` - Application logs storage
- `configs/` - Configuration files
- `pipeline/` - Pipeline-related operations
- `customFiles/` - Custom assets and templates
- `clientWebUI/` - Web interface assets

## Configuration Files
- `configs/settings.yml` - Main settings file
- `configs/custom_settings.yml` - User-specific settings

## Pipeline Directories
- `pipeline/watchedFolders/` - Monitored directories for automated processing
- `pipeline/finishedFolders/` - Completed processing output location

## Custom Files Structure
- `customFiles/static/` - Static assets
- `customFiles/templates/` - Template files
- `customFiles/signatures/` - Digital signature files

