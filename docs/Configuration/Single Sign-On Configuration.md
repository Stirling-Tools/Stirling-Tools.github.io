---
sidebar_position: 3
tags: [enterprise, management, feature, advanced feature]
---

# Single Sign-On (SSO) Overview

Stirling-PDF supports Single Sign-On (SSO) authentication through two protocols:

## OAuth 2.0 / OpenID Connect (OIDC)
> **Tier**: Server

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

**[→ Configure SAML 2.0 SSO](./SAML%20SSO%20Configuration/SAML%20SSO%20Configuration.md)**

**Key Features:**
- Enterprise identity provider integration
- Advanced security controls
- Single Logout (SLO) support
- Suitable for large organizations

