"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5774],{3651:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>a});const o=JSON.parse('{"id":"Advanced Configuration/Single Sign-On Configuration","title":"Single Sign-On (SSO) Configuration","description":"Stirling PDF allows login via Single Sign-On (SSO) using OAUTH2 OpenID Connect (OIDC)","source":"@site/docs/Advanced Configuration/Single Sign-On Configuration.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/Single Sign-On Configuration","permalink":"/Advanced Configuration/Single Sign-On Configuration","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/Single Sign-On Configuration.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"OCR (Optical Character Recognition)","permalink":"/Advanced Configuration/OCR"},"next":{"title":"Login, System and Security","permalink":"/Advanced Configuration/System and Security"}}');var t=i(4848),r=i(8453);const l={sidebar_position:1},s="Single Sign-On (SSO) Configuration",c={},a=[{value:"Settings file",id:"settings-file",level:2},{value:"Local",id:"local",level:2},{value:"Docker",id:"docker",level:2},{value:"Docker run",id:"docker-run",level:3},{value:"Docker Compose",id:"docker-compose",level:3},{value:"Settings file",id:"settings-file-1",level:2},{value:"Docker",id:"docker-1",level:2},{value:"Docker run",id:"docker-run-1",level:3},{value:"Docker Compose",id:"docker-compose-1",level:3}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"single-sign-on-sso-configuration",children:"Single Sign-On (SSO) Configuration"})}),"\n",(0,t.jsx)(n.p,{children:"Stirling PDF allows login via Single Sign-On (SSO) using OAUTH2 OpenID Connect (OIDC)\nThese are"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"oauth2.enabled"})," Set this to 'true' to enable login (Note: ",(0,t.jsx)(n.code,{children:"enableLogin"})," must also be 'true' for this to work)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"oauth2.issuer"})," Set this to any provider that supports OpenID Connect Discovery ",(0,t.jsx)(n.code,{children:"/.well-known/openid-configuration"})," end-point"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"oauth2.clientId"})," Client ID from your provider"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"oauth2.clientSecret"})," Client Secret from your provider"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"oauth2.autoCreateUser"})," Set this to 'true' to allow auto-creation of non-existing users"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["The Callback URL (Redirect URL) for entering in your IdP is:  ",(0,t.jsx)(n.code,{children:"https://<striling-pdf.yourdomain>/login/oauth2/code/<oidc-provider>"})," eg ",(0,t.jsx)(n.code,{children:"https://<striling-pdf.yourdomain>/login/oauth2/code/keycloak"})]}),"\n",(0,t.jsx)(n.p,{children:"It is highly recommended to use a SSL-enabled reverse-proxy, if the application is going to be exposed to the internet."}),"\n",(0,t.jsx)(n.p,{children:"After the OAUTH2 login is enabled, a new button shows up on the login page as per the screenshot below:"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{src:"https://github.com/Stirling-Tools/Stirling-PDF/assets/812110/6ec3b233-2eb7-4838-bcc9-f93ca0c21cec",alt:"image"})}),"\n",(0,t.jsx)(n.h2,{id:"settings-file",children:"Settings file"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"security:\n  enableLogin: true # set to 'true' to enable login\n  ...\n  ...\n  oauth2:\n    enabled: false # set to 'true' to enable SSO login (Note: enableLogin must also be 'true' for this to work)\n    issuer: \"\" # set to any provider that supports OpenID Connect Discovery (/.well-known/openid-configuration) end-point\n    clientId: \"\" # Client ID from your provider\n    clientSecret: \"\" # Client Secret from your provider\n    autoCreateUser: false # set to 'true' to allow auto-creation of non-existing users\n"})}),"\n",(0,t.jsx)(n.h2,{id:"local",children:"Local"}),"\n",(0,t.jsx)(n.p,{children:"If running Java directly, you can set these via environment variables by running before starting the application"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'export DOCKER_ENABLE_SECURITY=true\nexport SECURITY_ENABLELOGIN=true\nexport SECURITY_OAUTH2_ENABLED=true\nexport SECURITY_OAUTH2_AUTOCREATEUSER=false\nexport SECURITY_OAUTH2_ISSUER="<issuer-url>"\nexport SECURITY_OAUTH2_CLIENTID="<client-id>"\nexport SECURITY_OAUTH2_CLIENTSECRET="<client-secret>"\n'})}),"\n",(0,t.jsx)(n.h2,{id:"docker",children:"Docker"}),"\n",(0,t.jsx)(n.h3,{id:"docker-run",children:"Docker run"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'-e  DOCKER_ENABLE_SECURITY=true \\\n-e  SECURITY_ENABLELOGIN=true \\\n-e  SECURITY_OAUTH2_ENABLED=true \\\n-e  SECURITY_OAUTH2_AUTOCREATEUSER=false \\\n-e  SECURITY_OAUTH2_ISSUER="<issuer-url>" \\\n-e  SECURITY_OAUTH2_CLIENTID="<client-id>" \\\n-e  SECURITY_OAUTH2_CLIENTSECRET="<client-secret>" \\\n'})}),"\n",(0,t.jsx)(n.h3,{id:"docker-compose",children:"Docker Compose"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'environment:\n  DOCKER_ENABLE_SECURITY: true\n  SECURITY_ENABLELOGIN: true\n  SECURITY_OAUTH2_ENABLED: true\n  SECURITY_OAUTH2_AUTOCREATEUSER: false\n  SECURITY_OAUTH2_ISSUER: "<issuer-url>"\n  SECURITY_OAUTH2_CLIENTID: "<client-id>"\n  SECURITY_OAUTH2_CLIENTSECRET: "<client-secret>"\n'})}),"\n",(0,t.jsx)(n.h1,{id:"disable-form-login",children:"Disable Form Login"}),"\n",(0,t.jsxs)(n.p,{children:["Once you successfully enabled Single Sign-on (with OAuth2 or SAML), you might want to disable the form login.\nThis can be done by changing the ",(0,t.jsx)(n.code,{children:"loginMethod"})," setting accordingly to your needs, like so:"]}),"\n",(0,t.jsx)(n.h2,{id:"settings-file-1",children:"Settings file"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"security:\n  ...\n  loginMethod: oauth2 # Accepts values like 'all' and 'normal'(only Login with Username/Password), 'oauth2'(only Login with OAuth2) or 'saml2'(only Login with SAML2)\n"})}),"\n",(0,t.jsx)(n.h2,{id:"docker-1",children:"Docker"}),"\n",(0,t.jsx)(n.h3,{id:"docker-run-1",children:"Docker run"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'-e  SECURITY_LOGINMETHOD="oauth2" # to enable oauth2 only\n'})}),"\n",(0,t.jsx)(n.h3,{id:"docker-compose-1",children:"Docker Compose"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'environment:\n  ...\n  SECURITY_LOGINMETHOD: "oauth2" # to enable oauth2 only\n'})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>s});var o=i(6540);const t={},r=o.createContext(t);function l(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);