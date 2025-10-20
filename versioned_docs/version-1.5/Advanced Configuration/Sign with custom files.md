---
sidebar_position: 12
---

# Visual Sign with Custom File Storage

Stirling PDF provides functionality to store and reuse files across sessions, particularly useful for features like signatures and commonly used assets. This guide explains how to set up and use custom file storage.

## Overview

The custom file storage system allows you to:
- Store files persistently across sessions
- Share files between all users or restrict them to specific users
- Access stored files through the web UI
- Organize files in a structured way

## Storage Location

All custom files should be stored in the `/customFiles/` directory. For features like signatures, the specific path is:

```
/customFiles/signatures/
```

## Access Levels

The system supports two types of access levels for stored files:

### 1. All Users Access
Files that should be accessible to all users should be placed in:
```
/customFiles/signatures/ALL_USERS/
```
This is useful for:
- Organization-wide templates
- Shared assets
- Default signatures or watermarks
- Environments where authentication isn't used

### 2. User-Specific Access
Files that should only be accessible to specific users should be placed in user-specific directories:
```
/customFiles/signatures/{username}/
```
For example:
```
/customFiles/signatures/john_doe/
```
These files will only be accessible to the specified user when logged in.

## Usage in Docker

When using Docker, make sure to mount the customFiles directory as a volume to persist the files:

```yaml
volumes:
  - ./customFiles:/customFiles/
```

## Best Practices

1. File Organization:
   - Keep files organized in appropriate subdirectories
   - Use clear, descriptive filenames
   - Consider using date-based or category-based organization for large numbers of files

2. Security:
   - Only place files in ALL_USERS if they truly need to be accessible to everyone
   - Regularly review and clean up unused files
   - Monitor storage usage to prevent excessive accumulation of files

3. Supported File Types:
   - For signatures: common image formats (PNG, JPG, SVG)
   - Ensure files are of appropriate size and format for their intended use

## Example Structure

Here's an example of how your custom files directory might look:

```
/customFiles/
├── signatures/
│   ├── ALL_USERS/
│   │   ├── company-logo.png
│   │   └── default-signature.png
│   ├── john_doe/
│   │   ├── personal-signature.png
│   │   └── department-stamp.png
│   └── jane_smith/
│       └── signature-2024.png
```

## Accessing Files

Files stored in these locations will automatically be available in the relevant features of the Stirling PDF web interface. For example, saved signatures will appear in the signature selection interface when using the Sign feature.