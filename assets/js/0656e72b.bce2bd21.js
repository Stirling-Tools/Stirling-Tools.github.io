"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3864],{4334:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"Advanced Configuration/How to add configurations","title":"How to add Configurations","description":"Stirling PDF allows easy customization of the app.","source":"@site/docs/Advanced Configuration/How to add configurations.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/How to add configurations","permalink":"/Advanced Configuration/How to add configurations","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/How to add configurations.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Frequently Asked Questions","permalink":"/FAQ"},"next":{"title":"OCR (Optical Character Recognition)","permalink":"/Advanced Configuration/OCR"}}');var t=o(4848),s=o(8453);const r={sidebar_position:1},l="How to add Configurations",a={},d=[{value:"Extra notes",id:"extra-notes",level:4},{value:"Environment only parameters",id:"environment-only-parameters",level:3},{value:"Local",id:"local",level:3},{value:"Unix",id:"unix",level:4},{value:"Windows (CMD)",id:"windows-cmd",level:4},{value:"Windows (PowerShell)",id:"windows-powershell",level:4},{value:"Docker",id:"docker",level:3},{value:"Docker run",id:"docker-run",level:4},{value:"Docker Compose",id:"docker-compose",level:4}];function c(e){const n={a:"a",code:"code",h1:"h1",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"how-to-add-configurations",children:"How to add Configurations"})}),"\n",(0,t.jsx)(n.p,{children:"Stirling PDF allows easy customization of the app.\nIncludes things like"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Custom application name"}),"\n",(0,t.jsx)(n.li,{children:"Custom slogans, icons, HTML, images CSS etc (via file overrides)"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["There are two options for this, either using the generated settings file ",(0,t.jsx)(n.code,{children:"settings.yml"}),"\nThis file is located in the ",(0,t.jsx)(n.code,{children:"/configs"})," directory and follows standard YAML formatting"]}),"\n",(0,t.jsx)(n.p,{children:"Environment variables are also supported and would override the settings file\nFor example in the settings.yml you have"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"system:\n  enableLogin: 'true'\n"})}),"\n",(0,t.jsxs)(n.p,{children:["To have this via an environment variable you would have ",(0,t.jsx)(n.code,{children:"SYSTEM_ENABLELOGIN"})]}),"\n",(0,t.jsx)(n.p,{children:"The Current list of settings is"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'security:\n  enableLogin: false # set to \'true\' to enable login\n  csrfDisabled: true # Set to \'true\' to disable CSRF protection (not recommended for production)\n  loginAttemptCount: 5 # lock user account after 5 tries\n  loginResetTimeMinutes: 120 # lock account for 2 hours after x attempts\n#  initialLogin:\n#    username: "admin" # Initial username for the first login\n#    password: "stirling" # Initial password for the first login\n#  oauth2:\n#    enabled: false # set to \'true\' to enable login (Note: enableLogin must also be \'true\' for this to work)\n#    issuer: "" # set to any provider that supports OpenID Connect Discovery (/.well-known/openid-configuration) end-point\n#    clientId: "" # Client ID from your provider\n#    clientSecret: "" # Client Secret from your provider\n#    autoCreateUser: false # set to \'true\' to allow auto-creation of non-existing users\n#    useAsUsername: "email" # Default is \'email\'; custom fields can be used as the username\n#    scopes: "openid, profile, email" # Specify the scopes for which the application will request permissions\n#    provider: "google" # Set this to your OAuth provider\'s name, e.g., \'google\' or \'keycloak\'\n#    client:\n#      google:\n#        clientId: "" # Client ID for Google OAuth2\n#        clientSecret: "" # Client Secret for Google OAuth2\n#        scopes: "https://www.googleapis.com/auth/userinfo.email, https://www.googleapis.com/auth/userinfo.profile" # Scopes for Google OAuth2\n#        useAsUsername: "email" # Field to use as the username for Google OAuth2\n#      github:\n#        clientId: "" # Client ID for GitHub OAuth2\n#        clientSecret: "" # Client Secret for GitHub OAuth2\n#        scopes: "read:user" # Scope for GitHub OAuth2\n#        useAsUsername: "login" # Field to use as the username for GitHub OAuth2\n#      keycloak:\n#        issuer: "http://192.168.0.123:8888/realms/stirling-pdf" # URL of the Keycloak realm\'s OpenID Connect Discovery endpoint\n#        clientId: "stirling-pdf" # Client ID for Keycloak OAuth2\n#        clientSecret: "" # Client Secret for Keycloak OAuth2\n#        scopes: "openid, profile, email" # Scopes for Keycloak OAuth2\n#        useAsUsername: "email" # Field to use as the username for Keycloak OAuth2\n\nsystem:\n  defaultLocale: \'en-US\' # Set the default language (e.g. \'de-DE\', \'fr-FR\', etc)\n  googlevisibility: false # \'true\' to allow Google visibility (via robots.txt), \'false\' to disallow\n  enableAlphaFunctionality: false # Set to enable functionality which might need more testing before it fully goes live (This feature might make no changes)\n  showUpdate: true # see when a new update is available\n  showUpdateOnlyAdmin: false # Only admins can see when a new update is available, depending on showUpdate it must be set to \'true\'\n  customHTMLFiles: false # enable to have files placed in /customFiles/templates override the existing template html files\n\nui:\n  appName: null # Application\'s visible name\n  homeDescription: null # Short description or tagline shown on homepage.\n  appNameNavbar: null # Name displayed on the navigation bar\n\nendpoints:\n  toRemove: [] # List endpoints to disable (e.g. [\'img-to-pdf\', \'remove-pages\'])\n  groupsToRemove: [] # List groups to disable (e.g. [\'LibreOffice\'])\n\nmetrics:\n  enabled: true # \'true\' to enable Info APIs (`/api/*`) endpoints, \'false\' to disable\n'})}),"\n",(0,t.jsxs)(n.p,{children:["There is an additional config file ",(0,t.jsx)(n.code,{children:"/configs/custom_settings.yml"})," were users familiar with java and spring application.properties can input their own settings on-top of Stirling-PDFs existing ones"]}),"\n",(0,t.jsx)(n.h4,{id:"extra-notes",children:"Extra notes"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Endpoints. Currently, the endpoints ENDPOINTS_TO_REMOVE and GROUPS_TO_REMOVE can include comma separate lists of endpoints and groups to disable as example ENDPOINTS_TO_REMOVE=img-to-pdf,remove-pages would disable both image-to-pdf and remove pages, GROUPS_TO_REMOVE=LibreOffice Would disable all things that use LibreOffice. You can see a list of all endpoints and groups ",(0,t.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/blob/main/Endpoint-groups.md",children:"here"})]}),"\n",(0,t.jsx)(n.li,{children:"customStaticFilePath. Customise static files such as the app logo by placing files in the /customFiles/static/ directory. An example of customising app logo is placing a /customFiles/static/favicon.svg to override current SVG. This can be used to change any images/icons/css/fonts/js etc in Stirling-PDF"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"environment-only-parameters",children:"Environment only parameters"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"SYSTEM_ROOTURIPATH"})," ie set to ",(0,t.jsx)(n.code,{children:"/pdf-app"})," to Set the application's root URI to ",(0,t.jsx)(n.code,{children:"localhost:8080/pdf-app"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"SYSTEM_CONNECTIONTIMEOUTMINUTES"})," to set custom connection timeout values"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"DOCKER_ENABLE_SECURITY"})," to tell docker to download security jar (required as true for auth login)"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"INSTALL_BOOK_AND_ADVANCED_HTML_OPS"})," to download calibre onto stirling-pdf enabling pdf to/from book and advanced html conversion"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"LANGS"})," to define custom font libraries to install for use for document conversions"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"local",children:"Local"}),"\n",(0,t.jsx)(n.p,{children:"If running Java directly outside of docker, you can set these environment variables before starting the app"}),"\n",(0,t.jsx)(n.h4,{id:"unix",children:"Unix"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'export UI_APP_NAME="Stirling PDF"\n'})}),"\n",(0,t.jsx)(n.h4,{id:"windows-cmd",children:"Windows (CMD)"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"set UI_APP_NAME=Stirling PDF\n"})}),"\n",(0,t.jsx)(n.h4,{id:"windows-powershell",children:"Windows (PowerShell)"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'$env:UI_APP_NAME = "Stirling PDF"\n'})}),"\n",(0,t.jsx)(n.h3,{id:"docker",children:"Docker"}),"\n",(0,t.jsx)(n.p,{children:"If in docker you can do it via docker run or compose whichever you are using are part of installation.\nSimply add these to the end of your script/file"}),"\n",(0,t.jsx)(n.h4,{id:"docker-run",children:"Docker run"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'-e "UI_APP_NAME=Stirling PDF" \\\n-e "UI_HOME_DESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs." \\\n-e "UI_APP_NAVBAR_NAME=Stirling PDF" \\\n'})}),"\n",(0,t.jsx)(n.h4,{id:"docker-compose",children:"Docker Compose"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"environment:\n  UI_APP_NAME: Stirling PDF\n  UI_HOME_DESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.\n  UI_APP_NAVBAR_NAME: Stirling PDF\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>r,x:()=>l});var i=o(6540);const t={},s=i.createContext(t);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);