"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3864],{4334:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"Advanced Configuration/How to add configurations","title":"How to add Configurations","description":"Stirling PDF allows easy customization of the app.","source":"@site/docs/Advanced Configuration/How to add configurations.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/How to add configurations","permalink":"/Advanced Configuration/How to add configurations","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/How to add configurations.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Frequently Asked Questions","permalink":"/FAQ"},"next":{"title":"Login, System and Security","permalink":"/Advanced Configuration/System and Security"}}');var i=t(4848),r=t(8453),s=t(1470),a=t(9365);const l={sidebar_position:1},c="How to add Configurations",u={},d=[{value:"Extra notes",id:"extra-notes",level:4},{value:"Environment only parameters",id:"environment-only-parameters",level:3},{value:"Local",id:"local",level:3},{value:"Docker Configuration",id:"docker-configuration",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"how-to-add-configurations",children:"How to add Configurations"})}),"\n",(0,i.jsx)(n.p,{children:"Stirling PDF allows easy customization of the app.\nIncludes things like"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Custom application name"}),"\n",(0,i.jsx)(n.li,{children:"Custom slogans, icons, HTML, images CSS etc (via file overrides)"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["There are two options for this, either using the generated settings file ",(0,i.jsx)(n.code,{children:"settings.yml"}),"\nThis file is located in the ",(0,i.jsx)(n.code,{children:"/configs"})," directory and follows standard YAML formatting"]}),"\n",(0,i.jsx)(n.p,{children:"Environment variables are also supported and would override the settings file\nFor example in the settings.yml you have"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"security:\n  enableLogin: 'true'\n"})}),"\n",(0,i.jsxs)(n.p,{children:["To have this via an environment variable you would have ",(0,i.jsx)(n.code,{children:"SECURITY_ENABLELOGIN"})]}),"\n",(0,i.jsx)(n.p,{children:"The Current list of settings is"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'security:\n  enableLogin: false # set to \'true\' to enable login\n  csrfDisabled: true # Set to \'true\' to disable CSRF protection (not recommended for production)\n  loginAttemptCount: 5 # lock user account after 5 tries\n  loginResetTimeMinutes: 120 # lock account for 2 hours after x attempts\n#  initialLogin:\n#    username: "admin" # Initial username for the first login\n#    password: "stirling" # Initial password for the first login\n#  oauth2:\n#    enabled: false # set to \'true\' to enable login (Note: enableLogin must also be \'true\' for this to work)\n#    issuer: "" # set to any provider that supports OpenID Connect Discovery (/.well-known/openid-configuration) end-point\n#    clientId: "" # Client ID from your provider\n#    clientSecret: "" # Client Secret from your provider\n#    autoCreateUser: false # set to \'true\' to allow auto-creation of non-existing users\n#    useAsUsername: "email" # Default is \'email\'; custom fields can be used as the username\n#    scopes: "openid, profile, email" # Specify the scopes for which the application will request permissions\n#    provider: "google" # Set this to your OAuth provider\'s name, e.g., \'google\' or \'keycloak\'\n#    client:\n#      google:\n#        clientId: "" # Client ID for Google OAuth2\n#        clientSecret: "" # Client Secret for Google OAuth2\n#        scopes: "https://www.googleapis.com/auth/userinfo.email, https://www.googleapis.com/auth/userinfo.profile" # Scopes for Google OAuth2\n#        useAsUsername: "email" # Field to use as the username for Google OAuth2\n#      github:\n#        clientId: "" # Client ID for GitHub OAuth2\n#        clientSecret: "" # Client Secret for GitHub OAuth2\n#        scopes: "read:user" # Scope for GitHub OAuth2\n#        useAsUsername: "login" # Field to use as the username for GitHub OAuth2\n#      keycloak:\n#        issuer: "http://192.168.0.123:8888/realms/stirling-pdf" # URL of the Keycloak realm\'s OpenID Connect Discovery endpoint\n#        clientId: "stirling-pdf" # Client ID for Keycloak OAuth2\n#        clientSecret: "" # Client Secret for Keycloak OAuth2\n#        scopes: "openid, profile, email" # Scopes for Keycloak OAuth2\n#        useAsUsername: "email" # Field to use as the username for Keycloak OAuth2\n\nsystem:\n  defaultLocale: \'en-US\' # Set the default language (e.g. \'de-DE\', \'fr-FR\', etc)\n  googlevisibility: false # \'true\' to allow Google visibility (via robots.txt), \'false\' to disallow\n  enableAlphaFunctionality: false # Set to enable functionality which might need more testing before it fully goes live (This feature might make no changes)\n  showUpdate: true # see when a new update is available\n  showUpdateOnlyAdmin: false # Only admins can see when a new update is available, depending on showUpdate it must be set to \'true\'\n  customHTMLFiles: false # enable to have files placed in /customFiles/templates override the existing template html files\n\nui:\n  appName: null # Application\'s visible name\n  homeDescription: null # Short description or tagline shown on homepage.\n  appNameNavbar: null # Name displayed on the navigation bar\n\nendpoints:\n  toRemove: [] # List endpoints to disable (e.g. [\'img-to-pdf\', \'remove-pages\'])\n  groupsToRemove: [] # List groups to disable (e.g. [\'LibreOffice\'])\n\nmetrics:\n  enabled: true # \'true\' to enable Info APIs (`/api/*`) endpoints, \'false\' to disable\n'})}),"\n",(0,i.jsxs)(n.p,{children:["There is an additional config file ",(0,i.jsx)(n.code,{children:"/configs/custom_settings.yml"})," were users familiar with java and spring application.properties can input their own settings on-top of Stirling-PDFs existing ones"]}),"\n",(0,i.jsx)(n.h4,{id:"extra-notes",children:"Extra notes"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Endpoints. Currently, the endpoints ENDPOINTS_TOREMOVE and ENDPOINTS_GROUPSTOREMOVE can include comma separate lists of endpoints and groups to disable as example ENDPOINTS_TOREMOVE=img-to-pdf,remove-pages would disable both image-to-pdf and remove pages, ENDPOINTS_GROUPSTOREMOVE=LibreOffice Would disable all things that use LibreOffice. You can see a list of all endpoints and groups ",(0,i.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/blob/main/Endpoint-groups.md",children:"here"})]}),"\n",(0,i.jsx)(n.li,{children:"customStaticFilePath. Customise static files such as the app logo by placing files in the /customFiles/static/ directory. An example of customising app logo is placing a /customFiles/static/favicon.svg to override current SVG. This can be used to change any images/icons/css/fonts/js etc in Stirling-PDF"}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"environment-only-parameters",children:"Environment only parameters"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"SYSTEM_ROOTURIPATH"})," ie set to ",(0,i.jsx)(n.code,{children:"/pdf-app"})," to Set the application's root URI to ",(0,i.jsx)(n.code,{children:"localhost:8080/pdf-app"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"SYSTEM_CONNECTIONTIMEOUTMINUTES"})," to set custom connection timeout values"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"DOCKER_ENABLE_SECURITY"})," to tell docker to download security jar (required as true for auth login)"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"LANGS"})," to define custom font libraries to install for use for document conversions"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"local",children:"Local"}),"\n",(0,i.jsx)(n.p,{children:"If running Java directly outside of docker, you can set these environment variables before starting the app:"}),"\n",(0,i.jsxs)(s.A,{groupId:"operating-systems",children:[(0,i.jsx)(a.A,{value:"unix",label:"Unix",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'export UI_APPNAME="Stirling PDF"\n'})})}),(0,i.jsx)(a.A,{value:"cmd",label:"Windows (CMD)",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-batch",children:"set UI_APPNAME=Stirling PDF\n"})})}),(0,i.jsx)(a.A,{value:"powershell",label:"Windows (PowerShell)",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:'$env:UI_APPNAME = "Stirling PDF"\n'})})})]}),"\n",(0,i.jsx)(n.h2,{id:"docker-configuration",children:"Docker Configuration"}),"\n",(0,i.jsx)(n.p,{children:"If using Docker, you can set environment variables via either Docker run or Docker Compose as part of your installation.\nSimply add these to the end of your script/file:"}),"\n",(0,i.jsxs)(s.A,{groupId:"docker-config",children:[(0,i.jsx)(a.A,{value:"docker-run",label:"Docker Run",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'-e "UI_APPNAME=Stirling PDF" \\\n-e "UI_HOMEDESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs." \\\n-e "UI_APPNAVBARNAME=Stirling PDF" \\\n'})})}),(0,i.jsx)(a.A,{value:"docker-compose",label:"Docker Compose",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"environment:\n  UI_APPNAME: Stirling PDF\n  UI_HOMEDESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.\n  UI_APPNAVBARNAME: Stirling PDF\n"})})})]})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>s});t(6540);var o=t(4164);const i={tabItem:"tabItem_Ymn6"};var r=t(4848);function s(e){let{children:n,hidden:t,className:s}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,o.A)(i.tabItem,s),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>w});var o=t(6540),i=t(4164),r=t(3104),s=t(6347),a=t(205),l=t(7485),c=t(1682),u=t(679);function d(e){return o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,o.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:o,default:i}}=e;return{value:n,label:t,attributes:o,default:i}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function f(e){let{queryString:n=!1,groupId:t}=e;const i=(0,s.W6)(),r=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l.aZ)(r),(0,o.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(i.location.search);n.set(r,e),i.replace({...i.location,search:n.toString()})}),[r,i])]}function m(e){const{defaultValue:n,queryString:t=!1,groupId:i}=e,r=h(e),[s,l]=(0,o.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const o=t.find((e=>e.default))??t[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:n,tabValues:r}))),[c,d]=f({queryString:t,groupId:i}),[m,g]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,r]=(0,u.Dv)(t);return[i,(0,o.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:i}),b=(()=>{const e=c??m;return p({value:e,tabValues:r})?e:null})();(0,a.A)((()=>{b&&l(b)}),[b]);return{selectedValue:s,selectValue:(0,o.useCallback)((e=>{if(!p({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),g(e)}),[d,g,r]),tabValues:r}}var g=t(2303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=t(4848);function x(e){let{className:n,block:t,selectedValue:o,selectValue:s,tabValues:a}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.a_)(),u=e=>{const n=e.currentTarget,t=l.indexOf(n),i=a[t].value;i!==o&&(c(n),s(i))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":t},n),children:a.map((e=>{let{value:n,label:t,attributes:r}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:o===n?0:-1,"aria-selected":o===n,ref:e=>l.push(e),onKeyDown:d,onClick:u,...r,className:(0,i.A)("tabs__item",b.tabItem,r?.className,{"tabs__item--active":o===n}),children:t??n},n)}))})}function y(e){let{lazy:n,children:t,selectedValue:r}=e;const s=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===r));return e?(0,o.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,o.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function A(e){const n=m(e);return(0,v.jsxs)("div",{className:(0,i.A)("tabs-container",b.tabList),children:[(0,v.jsx)(x,{...n,...e}),(0,v.jsx)(y,{...n,...e})]})}function w(e){const n=(0,g.A)();return(0,v.jsx)(A,{...e,children:d(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var o=t(6540);const i={},r=o.createContext(i);function s(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);