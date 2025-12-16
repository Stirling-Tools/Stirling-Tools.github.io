---
sidebar_position: 3
tags: [enterprise, management, feature, advanced feature]
---

# Single Sign-On (SSO) Overview

Stirling-PDF supports Single Sign-On (SSO) authentication through two protocols:

## OAuth 2.0 / OpenID Connect (OIDC)
> **Tier**: Professional

OAuth 2.0 SSO allows login via popular identity providers like:
- Google
- GitHub
- Keycloak
- Authentik
- Any OIDC-compliant provider

**[→ Configure OAuth 2.0 SSO](./OAuth%20SSO%20Configuration.md)**

**Key Features:**
- Easy setup with major providers
- Auto-discovery via `.well-known/openid-configuration`
- Social login support
- Suitable for small to medium organizations

---

## SAML 2.0
> **Tier**: Enterprise

SAML 2.0 SSO provides enterprise-grade authentication with:
- Okta
- Azure AD (Entra ID)
- Google Workspace
- OneLogin
- Any SAML 2.0-compliant IdP

**[→ Configure SAML 2.0 SSO](./SAML%20SSO%20Configuration.md)**

**Key Features:**
- Enterprise identity provider integration
- Advanced security controls
- Single Logout (SLO) support
- Suitable for large organizations

---

## Comparison

| Feature | OAuth 2.0 | SAML 2.0 |
|---------|-----------|----------|
| **License Tier** | Professional | Enterprise |
| **Complexity** | Simple | Moderate |
| **Setup Time** | 5-10 minutes | 15-30 minutes |
| **Certificate Management** | Not required | Required |
| **Social Providers** | ✅ Yes | ❌ No |
| **Enterprise IdPs** | ⚠️ Limited | ✅ Full support |
| **Single Logout** | ❌ No | ✅ Yes |
| **Auto-Discovery** | ✅ Yes | ❌ Manual config |

## Choosing the Right Protocol

### Choose OAuth 2.0 if you:
- Use Google, GitHub, or other social providers
- Want quick and easy setup
- Have Professional tier license
- Don't need advanced enterprise features

### Choose SAML 2.0 if you:
- Use enterprise IdPs (Okta, Azure AD)
- Need Single Logout functionality
- Have Enterprise tier license
- Require strict security controls

## Common Configuration

Both protocols share these basic settings:

```yaml
security:
  enableLogin: true
  loginMethod: all  # Options: all, normal, oauth2, saml2
```

### Login Method Options

- **`all`**: Enable all methods (username/password + SSO)
- **`normal`**: Username/password only
- **`oauth2`**: OAuth 2.0 SSO only
- **`saml2`**: SAML 2.0 SSO only

## Auto-Login (Enterprise)

Automatically redirect users to SSO login page:

```yaml
premium:
  proFeatures:
    SSOAutoLogin: true
```

Available for both OAuth and SAML with Enterprise license.

## Next Steps

1. Choose your protocol: [OAuth 2.0](./OAuth%20SSO%20Configuration.md) or [SAML 2.0](./SAML%20SSO%20Configuration.md)
2. Follow the detailed setup guide
3. Configure your reverse proxy for HTTPS
4. Test the integration
5. Enable auto-login if desired

## See Also

- [System and Security](./System%20and%20Security.md) - Additional security settings
- [External Database](./External%20Database.md) - User storage configuration
