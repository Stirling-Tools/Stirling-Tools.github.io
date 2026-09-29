---
sidebar_position: 1
id: DATABASE
title: Database Backups
tags: [server, database, management]
---

# Database Backups
> **Tier**: Team

## Functionality Overview

The database tools provide scheduled SQL backups and manual import/export for the embedded H2 database.

1. Automatic Backup Creation
   - The default schedule runs daily at midnight and can be changed through `system.databaseBackup.cron`. Check that the scheduled job completed and produced a usable backup.
2. Backup Export
   - User-database changes can trigger an export. Keep backups outside the running instance as well.
3. Importing Database Backups
   - Admin users can import a SQL backup through the web interface or API. Import can fail; check the result and validate the restored data.
4. Managing Backup Files
   - Admins can view a list of all existing backup files, along with their creation dates and sizes. This helps in managing storage and identifying the most recent or relevant backups.
   - Backup files can be downloaded for offline storage or transferred to other environments, providing flexibility in database management.
   - Unnecessary backup files can be deleted through the interface to free up storage space and maintain an organized backup directory.

## User Interface

### Web Interface

1. Upload SQL files to import database backups.
2. View details of existing backups, such as file names, creation dates, and sizes.
3. Download backup files for offline storage.
4. Delete outdated or unnecessary backup files.

### API Endpoints

1. Import database backups by uploading SQL files.
2. Download backup files.
3. Delete backup files.

Backups are useful only if they can be restored. Check backup results and periodically test restoration in a separate instance.
