---
sidebar_position: 2
id: External Database
title: External Database
tags: [server, database]
---

# Using an External Database
> **Tier**: Team

It is possible to use your own external database with Stirling PDF rather than the default H2 database if you wish.
PostgreSQL is currently the only supported variant, others will be added on request.

### Setting Up External Database Configuration
You can configure the new `Datasource` property in your `settings.yml` to connect to your external database:

:::warning Note
External databases require a Team or Enterprise licence. Use the with-login JAR or a standard/fat Docker image.
:::

<Tabs groupId="external-db-config">
  <TabItem value="settings" label="Settings File">

```yaml
system:
  datasource:
    enableCustomDatabase: true
    customDatabaseUrl: jdbc:postgresql://localhost:5432/postgres
    username: postgres
    password: replace-with-your-database-password
```

- `enableCustomDatabase`: Set to `true` to use the custom database. A Team or Enterprise licence is required.
- `customDatabaseUrl`: Enter the database connection url for the database here. **Note: If you set the `customDatabaseUrl` you do not need to set the type, hostName, port and name, they will all be automatically derived from the url.**
- `username`: The username for the database
- `password`: The password for the database

If you would like more fine-grained control of the database connection, you can also use the following properties:

#### Fine-grained Database Configuration
- `type`: The database type. Available options are `h2` and `postgresql`
- `hostName`: The host name of the database connection url (e.g. 'localhost')
- `port`: The port number of the database connection url (e.g. 8080)
- `name`: The name of the custom database. This should match the name you have set for your database

</TabItem>
  <TabItem value="docker" label="Docker Compose">

```yaml
services:
  db:
    image: 'postgres:17.2-alpine'
    container_name: db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: "stirling_pdf"
      POSTGRES_USER: "admin"
      POSTGRES_PASSWORD: "stirling"
```

- `container_name`: Optional explicit container name; it does not have to match the service key. Services on the same Compose network can reach this database using the service name `db`.
- `ports`: Uses `HOST:CONTAINER` order. Other Compose services connect to `db:5432`, the container port; a client outside the network connects to the published host port.
- `POSTGRES_DB`: An environment variable for the database container. Specify the name of the custom database here
- `POSTGRES_USER`: An environment variable for the database container. Specify the username for the database
- `POSTGRES_PASSWORD`: An environment variable for the database container. Specify the password for the database

You will also need to update the Docker configuration in your app in order to connect to the database:

```yaml
services:
  stirling-pdf:
    depends_on:
      - db
    environment:
      DISABLE_ADDITIONAL_FEATURES: "false"
      SYSTEM_DATASOURCE_ENABLECUSTOMDATABASE: "true"
      SYSTEM_DATASOURCE_CUSTOMDATABASEURL: "jdbc:postgresql://db:5432/stirling_pdf"
      SYSTEM_DATASOURCE_USERNAME: "admin"
      SYSTEM_DATASOURCE_PASSWORD: "stirling"
    # further configuration
```

- `depends_on`: References the Compose service key (`db`), not an arbitrary container name.
- Use a standard or fat Docker image for external database support.
- `SYSTEM_DATASOURCE_ENABLECUSTOMDATABASE`: An environment variable to connect to the database container. Set this to `true` to enable use of the external database
- `SYSTEM_DATASOURCE_CUSTOMDATABASEURL`: An environment variable to connect to the database container. Set the connection url for the database here. **Note: If you set this url you do not need to set the type, hostName, port and name (namely `SYSTEM_DATASOURCE_TYPE`, `SYSTEM_DATASOURCE_HOSTNAME`, `SYSTEM_DATASOURCE_PORT`, `SYSTEM_DATASOURCE_NAME`), they will all be automatically derived from the url.**
- `SYSTEM_DATASOURCE_USERNAME`: An environment variable to connect to the database container. Set the username for the database. Ensure this matches the corresponding property in your database container
- `SYSTEM_DATASOURCE_PASSWORD`: An environment variable to connect to the database container. Set the password for the database. Ensure this matches the corresponding property in your database container

Below is an example of what your configuration should look like after configuring the custom database:

```yaml
services:
  stirling-pdf:
    depends_on:
      - db
    environment:
      DISABLE_ADDITIONAL_FEATURES: "false"
      SYSTEM_DATASOURCE_ENABLECUSTOMDATABASE: "true"
      SYSTEM_DATASOURCE_CUSTOMDATABASEURL: "jdbc:postgresql://db:5432/stirling_pdf"
      SYSTEM_DATASOURCE_USERNAME: "admin"
      SYSTEM_DATASOURCE_PASSWORD: "stirling"
    # further configuration

  db:
    image: 'postgres:17.2-alpine'
    container_name: db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: "stirling_pdf"
      POSTGRES_USER: "admin"
      POSTGRES_PASSWORD: "stirling"
```

  </TabItem>
</Tabs>

*Example configuration can be found in [exampleYmlFiles/docker-compose-latest-fat-security-postgres.yml](https://github.com/Stirling-Tools/Stirling-PDF/blob/428b4238e3a7280d71697d994a66174a250387a7/exampleYmlFiles/docker-compose-latest-fat-security-postgres.yml)*
