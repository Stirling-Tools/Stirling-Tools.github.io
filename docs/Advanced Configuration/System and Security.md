---
sidebar_position: 1
---
# System and Security

Stirling PDF allows custommization of system and security settings
For security please note this section is only enabled if you are using the security jar, for docker that means setting ``DOCKER_ENABLE_SECURITY`` to ``true``  via a environment variable
- ``enableLogin`` This enables or disables the login functionality with
- ``csrfDisabled`` Set to 'true' to disable CSRF protection (not recommended for production)
and
- ``defaultLocale`` Set the default language (e.g. 'de-DE', 'fr-FR', etc)
- ``googlevisibility`` 'true' to allow Google visibility (via robots.txt), 'false' to disallow


## Settings file
```
security:
  enableLogin: false # set to 'true' to enable login
  csrfDisabled: true

system:
  defaultLocale: 'en-US' # Set the default language (e.g. 'de-DE', 'fr-FR', etc)
  googlevisibility: false # 'true' to allow Google visibility (via robots.txt), 'false' to disallow
```

## Local

```
export DOCKER_ENABLE_SECURITY=true
export SECURITY_ENABLELOGIN=true
export SECURITY_CSRFDISABLED=false
export SECURITY_DEFAULTLOCALE=en-US
export SECURITY_GOOGLEVISIBILITY=false
```

## Docker

### Docker run
```
-e  DOCKER_ENABLE_SECURITY=true \
-e  SECURITY_ENABLELOGIN=true \
-e  SECURITY_CSRFDISABLED=false \
-e  SECURITY_DEFAULTLOCALE=en-US \
-e  SECURITY_GOOGLEVISIBILITY=false
```

### Docker Compose
```
environment:
  ...
  DOCKER_ENABLE_SECURITY: true
  SECURITY_ENABLELOGIN: true
  SECURITY_CSRFDISABLED: false
  SECURITY_DEFAULTLOCALE: en-US
  SECURITY_GOOGLEVISIBILITY: false
```