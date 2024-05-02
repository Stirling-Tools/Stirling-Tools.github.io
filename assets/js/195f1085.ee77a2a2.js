"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[812],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>S});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var u=r.createContext({}),c=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},s=function(e){var n=c(e.components);return r.createElement(u.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=c(t),g=i,S=p["".concat(u,".").concat(g)]||p[g]||d[g]||o;return t?r.createElement(S,a(a({ref:n},s),{},{components:t})):r.createElement(S,a({ref:n},s))}));function S(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=g;var l={};for(var u in n)hasOwnProperty.call(n,u)&&(l[u]=n[u]);l.originalType=e,l[p]="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=t[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},5333:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=t(7462),i=(t(7294),t(3905));const o={sidebar_position:1},a="Single Sign-On (SSO) Configuration",l={unversionedId:"Advanced Configuration/Single Sign-On Configuration",id:"Advanced Configuration/Single Sign-On Configuration",title:"Single Sign-On (SSO) Configuration",description:"Stirling PDF allows login via Single Sign-On (SSO) using OAUTH2 OpenID Connect (OIDC)",source:"@site/docs/Advanced Configuration/Single Sign-On Configuration.md",sourceDirName:"Advanced Configuration",slug:"/Advanced Configuration/Single Sign-On Configuration",permalink:"/docs/Advanced Configuration/Single Sign-On Configuration",draft:!1,editUrl:"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/Single Sign-On Configuration.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"OCR (Optical Character Recognition)",permalink:"/docs/Advanced Configuration/OCR"},next:{title:"System and Security",permalink:"/docs/Advanced Configuration/System and Security"}},u={},c=[{value:"Settings file",id:"settings-file",level:2},{value:"Local",id:"local",level:2},{value:"Docker",id:"docker",level:2},{value:"Docker run",id:"docker-run",level:3},{value:"Docker Compose",id:"docker-compose",level:3}],s={toc:c},p="wrapper";function d(e){let{components:n,...t}=e;return(0,i.kt)(p,(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"single-sign-on-sso-configuration"},"Single Sign-On (SSO) Configuration"),(0,i.kt)("p",null,"Stirling PDF allows login via Single Sign-On (SSO) using OAUTH2 OpenID Connect (OIDC)\nThese are"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"oauth2.enabled")," Set this to 'true' to enable login (Note: ",(0,i.kt)("inlineCode",{parentName:"li"},"enableLogin")," must also be 'true' for this to work)"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"oauth2.issuer")," Set this to any provider that supports OpenID Connect Discovery ",(0,i.kt)("inlineCode",{parentName:"li"},"/.well-known/openid-configuration")," end-point"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"oauth2.clientId")," Client ID from your provider"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"oauth2.clientSecret")," Client Secret from your provider"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"oauth2.autoCreateUser")," Set this to 'true' to allow auto-creation of non-existing users")),(0,i.kt)("p",null,"The Callback URL (Redirect URL) for entering in your IdP is:  ",(0,i.kt)("inlineCode",{parentName:"p"},"https://<striling-pdf.yourdomain>/oauth2/authorization/oidc")," "),(0,i.kt)("p",null,"It is highly recommended to use a SSL-enabled reverse-proxy, if the application is going to be exposed to the internet."),(0,i.kt)("p",null,"After the OAUTH2 login is enabled, a new button shows up on the login page as per the screenshot below:"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://github.com/Stirling-Tools/Stirling-PDF/assets/812110/6ec3b233-2eb7-4838-bcc9-f93ca0c21cec",alt:"image"})),(0,i.kt)("h2",{id:"settings-file"},"Settings file"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"security:\n  enableLogin: true # set to 'true' to enable login\n  ...\n  ...\n  oauth2:\n    enabled: false # set to 'true' to enable SSO login (Note: enableLogin must also be 'true' for this to work)\n    issuer: \"\" # set to any provider that supports OpenID Connect Discovery (/.well-known/openid-configuration) end-point\n    clientId: \"\" # Client ID from your provider\n    clientSecret: \"\" # Client Secret from your provider\n    autoCreateUser: false # set to 'true' to allow auto-creation of non-existing users\n")),(0,i.kt)("h2",{id:"local"},"Local"),(0,i.kt)("p",null,"If running Java directly, you can set these via environment variables by running before starting the application"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'export DOCKER_ENABLE_SECURITY=true\nexport SECURITY_ENABLELOGIN=true\nexport SECURITY_OAUTH2_ENABLED=true\nexport SECURITY_OAUTH2_AUTOCREATEUSER=false\nexport SECURITY_OAUTH2_ISSUER="<issuer-url>"\nexport SECURITY_OAUTH2_CLIENTID="<client-id>"\nexport SECURITY_OAUTH2_CLIENTSECRET="<client-secret>"\n')),(0,i.kt)("h2",{id:"docker"},"Docker"),(0,i.kt)("h3",{id:"docker-run"},"Docker run"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'-e  DOCKER_ENABLE_SECURITY=true \\\n-e  SECURITY_ENABLELOGIN=true \\\n-e  SECURITY_OAUTH2_ENABLED=true \\\n-e  SECURITY_OAUTH2_AUTOCREATEUSER=false \\\n-e  SECURITY_OAUTH2_ISSUER="<issuer-url>" \\\n-e  SECURITY_OAUTH2_CLIENTID="<client-id>" \\\n-e  SECURITY_OAUTH2_CLIENTSECRET="<client-secret>" \\\n')),(0,i.kt)("h3",{id:"docker-compose"},"Docker Compose"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'environment:\n  DOCKER_ENABLE_SECURITY: true\n  SECURITY_ENABLELOGIN: true\n  SECURITY_OAUTH2_ENABLED: true\n  SECURITY_OAUTH2_AUTOCREATEUSER: false\n  SECURITY_OAUTH2_ISSUER: "<issuer-url>"\n  SECURITY_OAUTH2_CLIENTID: "<client-id>"\n  SECURITY_OAUTH2_CLIENTSECRET: "<client-secret>"\n')))}d.isMDXComponent=!0}}]);