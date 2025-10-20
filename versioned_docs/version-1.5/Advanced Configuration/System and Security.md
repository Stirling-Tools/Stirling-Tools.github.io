---
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Login, System and Security

Stirling PDF allows customization of system and security settings. For security features to be enabled, you must use the security jar. For Docker users, this means setting `DISABLE_ADDITIONAL_FEATURES` to `false` via an environment variable.

## Basic Security Settings

- `enableLogin`: Enables or disables the login functionality
- `csrfDisabled`: Set to 'true' to disable CSRF protection (not recommended for production)
- `defaultLocale`: Set the default language (e.g. 'de-DE', 'fr-FR', etc)
- `googlevisibility`: 'true' to allow Google visibility (via robots.txt), 'false' to disallow

## Authentication Setup

### Prerequisites
1. Ensure the `/configs` directory is mounted as a volume in Docker for persistence across updates
2. For Docker users: Set `DISABLE_ADDITIONAL_FEATURES=false` in environment variables
3. Enable login either via `settings.yml` or set `SECURITY_ENABLELOGIN=true`

### Initial Login Credentials
- Default Username: `admin`
- Default Password: `stirling`
- Note: Users will be forced to change their password on first login
- Custom initial credentials can be set using:
  - `SECURITY_INITIALLOGIN_USERNAME`
  - `SECURITY_INITIALLOGIN_PASSWORD`

### Database Location
Upon successful setup, a new `stirling-pdf-DB-2.3.232.mv.db` file will be created in your configured storage location. This file contains user data and should be backed up regularly.

### Account Management
1. Access Account Settings:
   - Click the settings cog menu in the top right navbar
   - Select "Account Settings"
   - Here you can manage your profile and find your API key

2. Adding New Users:
   - Navigate to Account Settings
   - Scroll to bottom and click 'Admin Settings'
   - Use the user management interface to add new users

### Role-Based Access Control
Currently, roles are primarily used for rate limiting purposes. The role system is under active development and will be expanded with additional features in future updates.

### API Authentication
When using the API:
- Each user has a unique API key found in their Account Settings
- Include the API key in requests using the `X-API-KEY` header
- Example:
  ```
  X-API-KEY: your-api-key-here
  ```


# Configurations Examples

<Tabs groupId="config-methods">
  <TabItem value="settings" label="Settings File">
    ```yaml
    security:
      enableLogin: false # set to 'true' to enable login
      csrfDisabled: true

    system:
      defaultLocale: 'en-US' # Set the default language (e.g. 'de-DE', 'fr-FR', etc)
      googlevisibility: false # 'true' to allow Google visibility (via robots.txt), 'false' to disallow
    ```
  </TabItem>
  <TabItem value="local" label="Local Configuration">
    You can configure these settings in two ways when running locally:

    **Option 1: Using Java Properties**
    ```bash
    java -jar Stirling-PDF.jar -DDISABLE_ADDITIONAL_FEATURES=false -DSECURITY_ENABLELOGIN=true
    ```

    **Option 2: Using Environment Variables**
    ```bash
    export DISABLE_ADDITIONAL_FEATURES=false
    export SECURITY_ENABLELOGIN=true
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    -e DISABLE_ADDITIONAL_FEATURES=false \
    -e SECURITY_ENABLELOGIN=true \
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    environment:
      DISABLE_ADDITIONAL_FEATURES: false true
      SECURITY_ENABLELOGIN: true
    ```
  </TabItem>
</Tabs>
