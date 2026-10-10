---
sidebar_position: 1
title: Database
sidebar_label: Database
description: Back up and restore the built-in H2 database, or connect Stirling PDF to your own PostgreSQL database.
---

# Database

Stirling PDF keeps users, teams and activity records in a database. By default it uses a built-in H2 database file in `configs/`. You can switch to your own PostgreSQL server instead. Both are managed in **Settings → Server → Database**.

## Built-in database

The database file is `configs/stirling-pdf-DB-2.3.232.mv.db` (the number is the H2 version). In Docker, mount `/configs` as a volume or it is lost when the container is replaced.

### Backups

The server exports the built-in database as a SQL file every day at midnight, and again after changes to user accounts. Backups are saved as `backup_*.sql` in `configs/backup/db/`. Older ones are deleted automatically, leaving the six most recent.

Change the schedule with a cron expression (seconds, minutes, hours, day, month, weekday):

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      databaseBackup:
        cron: "0 0 0 * * ?"   # daily at midnight
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_DATABASEBACKUP_CRON="0 0 0 * * ?"
    ```
  </TabItem>
</Tabs>

In **Settings → Server → Database → Backups & Restore** you can:

- **Create backup** now
- download or delete a backup from the list
- restore a backup with **Upload & import**, which asks for a confirmation code

:::warning
Importing a backup replaces all current data. Keep copies of the backup folder off the server, and test a restore on a separate instance from time to time.
:::

Backups and restores are only available for the built-in database. With an external database, use your database's own backup tools.

With an Enterprise licence and [email](../Security/Sign-in-and-Security.md#email-configuration) set up, the server can email admins about backups and imports:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    premium:
      enterpriseFeatures:
        databaseNotifications:
          backups:
            successful: false
            failed: false
          imports:
            successful: false
            failed: false
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    PREMIUM_ENTERPRISEFEATURES_DATABASENOTIFICATIONS_BACKUPS_SUCCESSFUL=false
    PREMIUM_ENTERPRISEFEATURES_DATABASENOTIFICATIONS_BACKUPS_FAILED=false
    PREMIUM_ENTERPRISEFEATURES_DATABASENOTIFICATIONS_IMPORTS_SUCCESSFUL=false
    PREMIUM_ENTERPRISEFEATURES_DATABASENOTIFICATIONS_IMPORTS_FAILED=false
    ```
  </TabItem>
</Tabs>

## External database

Use PostgreSQL instead of the built-in database, for example to share one database across [clustered](../Operations/Clustering.md) servers or to use your existing backup tooling. It needs a build with login and a Team or Enterprise licence. Without one, a server using an external database refuses to process files; sign-in, settings and licence activation still work ([Plans and licences](../Licensing/Plans-and-Licences.md)).

The new database starts empty. If the server already has users, read [Switch an existing server](#switch-an-existing-server) first.

Set it in **Settings → Server → Database → Connection**, or in `settings.yml`, then restart:

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    system:
      datasource:
        enableCustomDatabase: true
        customDatabaseUrl: jdbc:postgresql://db.example.com:5432/stirling_pdf
        username: stirling
        password: your-database-password
    ```
  </TabItem>
  <TabItem value="env" label="Environment Variable">
    ```bash
    SYSTEM_DATASOURCE_ENABLECUSTOMDATABASE=true
    SYSTEM_DATASOURCE_CUSTOMDATABASEURL=jdbc:postgresql://db.example.com:5432/stirling_pdf
    SYSTEM_DATASOURCE_USERNAME=stirling
    SYSTEM_DATASOURCE_PASSWORD=your-database-password
    ```
  </TabItem>
</Tabs>

When `customDatabaseUrl` is set, the server ignores the separate connection fields. To build the URL from parts instead, leave it empty and set:

| Setting | Default | What it is |
|---|---|---|
| `type` | `postgresql` | `postgresql` or `h2` |
| `hostName` | `localhost` | Database host, or the database container's service name in Docker |
| `port` | `5432` | Database port |
| `name` | `postgres` | Database name |

### Docker Compose example

```yaml
services:
  stirling-pdf:
    image: docker.stirlingpdf.com/stirlingtools/stirling-pdf:latest
    depends_on:
      - db
    environment:
      SYSTEM_DATASOURCE_ENABLECUSTOMDATABASE: "true"
      SYSTEM_DATASOURCE_CUSTOMDATABASEURL: "jdbc:postgresql://db:5432/stirling_pdf"
      SYSTEM_DATASOURCE_USERNAME: "stirling"
      SYSTEM_DATASOURCE_PASSWORD: "change-me"
    # ports, volumes and other settings as usual

  db:
    image: postgres:17.2-alpine
    environment:
      POSTGRES_DB: "stirling_pdf"
      POSTGRES_USER: "stirling"
      POSTGRES_PASSWORD: "change-me"
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
```

### Switch an existing server

Nothing is copied to the new database. Users, teams, API keys and activity records stay in the H2 file, and there is no built-in way to move them to PostgreSQL. Switch before you add users, or plan to recreate them.

1. Back up the `configs/` folder.
2. Activate your Team or Enterprise licence first. The licence is kept in `configs/`, not in the database, so it survives the switch. A link to Stirling Cloud is stored in the database, so link the server again afterwards.
3. Set the connection details as above and restart.
4. Sign in as `admin` / `stirling`, or with the `SECURITY_INITIALLOGIN_USERNAME` account if you set one ([First admin account](../Security/Sign-in-and-Security.md#first-admin-account)), then recreate your users and API keys.

To go back, set `enableCustomDatabase: false` and restart. The server opens the old H2 file in `configs/` again, with the data it had before the switch.
