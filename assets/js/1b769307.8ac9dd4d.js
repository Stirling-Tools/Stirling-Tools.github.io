"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7074],{1442:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>b,frontMatter:()=>l,metadata:()=>a,toc:()=>u});const a=JSON.parse('{"id":"Advanced Configuration/External Database","title":"External Database","description":"It is possible to use your own external database with Stirling PDF rather than the default H2 database if you wish.","source":"@site/docs/Advanced Configuration/External Database.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/External Database","permalink":"/Advanced Configuration/External Database","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/External Database.md","tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"sidebar_position":8,"id":"External Database","title":"External Database"},"sidebar":"tutorialSidebar","previous":{"title":"Folder Scanning","permalink":"/Advanced Configuration/Folder Scanning"},"next":{"title":"Database Backups","permalink":"/Advanced Configuration/DATABASE"}}');var r=t(4848),s=t(8453),o=t(1470),i=t(9365);const l={sidebar_position:8,id:"External Database",title:"External Database"},c="Using an External Database",d={},u=[{value:"Setting Up External Database Configuration",id:"setting-up-external-database-configuration",level:3},{value:"\u26a0\ufe0f Note",id:"\ufe0f-note",level:4},{value:"Fine-grained Database Configuration",id:"fine-grained-database-configuration",level:4}];function h(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"using-an-external-database",children:"Using an External Database"})}),"\n",(0,r.jsx)(n.p,{children:"It is possible to use your own external database with Stirling PDF rather than the default H2 database if you wish.\nPostgreSQL is currently the only supported variant, others will be added on request."}),"\n",(0,r.jsx)(n.h3,{id:"setting-up-external-database-configuration",children:"Setting Up External Database Configuration"}),"\n",(0,r.jsxs)(n.p,{children:["You can configure the new ",(0,r.jsx)(n.code,{children:"Datasource"})," property in your ",(0,r.jsx)(n.code,{children:"settings.yml"})," to connect to your external database:"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.h4,{id:"\ufe0f-note",children:"\u26a0\ufe0f Note"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsxs)(n.em,{children:["To use the external database feature, you will need to have a valid enterprise license and set the environment variable ",(0,r.jsx)(n.code,{children:"DOCKER_ENABLE_SECURITY"})," to ",(0,r.jsx)(n.code,{children:"true"}),"."]})}),"\n"]}),"\n",(0,r.jsxs)(o.A,{groupId:"external-db-config",children:[(0,r.jsxs)(i.A,{value:"settings",label:"Settings File",children:[(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"  datasource:\n    enableCustomDatabase: false\n    customDatabaseUrl: jdbc:postgresql://localhost:5432/postgres\n    username: postgres\n    password: postgres\n    type: postgresql\n    hostName: localhost\n    port: 5432 \n    name: postgres\n"})}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"enableCustomDatabase"}),": Set this property to ",(0,r.jsx)(n.code,{children:"true"})," to enable use of the custom database ",(0,r.jsx)(n.strong,{children:"Note: An enterprise license to use this feature"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"customDatabaseUrl"}),": Enter the database connection url for the database here. ",(0,r.jsxs)(n.strong,{children:["Note: If you set the ",(0,r.jsx)(n.code,{children:"customDatabaseUrl"})," you do not need to set the type, hostName, port and name, they will all be automatically derived from the url."]})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"username"}),": The username for the database"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"password"}),": The password for the database"]}),"\n"]}),(0,r.jsx)(n.p,{children:"If you would like more fine-grained control of the database connection, you can also use the following properties:"}),(0,r.jsx)(n.h4,{id:"fine-grained-database-configuration",children:"Fine-grained Database Configuration"}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"type"}),": The database type. Available options are ",(0,r.jsx)(n.code,{children:"h2"})," and ",(0,r.jsx)(n.code,{children:"postgresql"})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"hostName"}),": The host name of the database connection url (e.g. 'localhost')"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"port"}),": The port number of the database connection url (e.g. 8080)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"name"}),": The name of the custom database. This should match the name you have set for your database"]}),"\n"]})]}),(0,r.jsxs)(i.A,{value:"docker",label:"Docker Compose",children:[(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'services:\n  db:\n    image: \'postgres:17.2-alpine\'\n    container_name: db\n    ports:\n      - "5432:5432"\n    environment:\n      POSTGRES_DB: "stirling_pdf"\n      POSTGRES_USER: "admin"\n      POSTGRES_PASSWORD: "stirling"\n'})}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"container_name"}),": This is the name of your database container. This should match the name of the container under ",(0,r.jsx)(n.code,{children:"services"})," as this is what Docker will use to refer to your database"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"ports"}),": Specify the port number for your database. The number on the left is the port number the container will access the database internally. The number on the right is the port number the Stirling PDF app will use to connect to the database externally. Ensure this matches the port number in the connection url for your database otherwise the app will not be able to access it."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"POSTGRES_DB"}),": An environment variable for the database container. Specify the name of the custom database here"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"POSTGRES_USER"}),": An environment variable for the database container. Specify the username for the database"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"POSTGRES_PASSWORD"}),": An environment variable for the database container. Specify the password for the database"]}),"\n"]}),(0,r.jsx)(n.p,{children:"You will also need to update the Docker configuration in your app in order to connect to the database:"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'services:\n  stirling-pdf:\n    depends_on:\n      - db\n    environment:\n      DOCKER_ENABLE_SECURITY: "true"\n      SYSTEM_DATASOURCE_ENABLECUSTOMDATABASE: "true"\n      SYSTEM_DATASOURCE_CUSTOMDATABASEURL: "jdbc:postgresql://db:5432/stirling_pdf"\n      SYSTEM_DATASOURCE_USERNAME: "admin"\n      SYSTEM_DATASOURCE_PASSWORD: "stirling"\n    # further configuration\n'})}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"depends_on"}),": This specifies any services that your app will need in order to run. Ensure the name matches the container name for your database"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"DOCKER_ENABLE_SECURITY"}),": Set this to ",(0,r.jsx)(n.code,{children:"true"})," to enable security features"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"SYSTEM_DATASOURCE_ENABLECUSTOMDATABASE"}),": An environment variable to connect to the database container. Set this to ",(0,r.jsx)(n.code,{children:"true"})," to enable use of the external database"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"SYSTEM_DATASOURCE_CUSTOMDATABASEURL"}),": An environment variable to connect to the database container. Set the connection url for the database here. ",(0,r.jsxs)(n.strong,{children:["Note: If you set this url you do not need to set the type, hostName, port and name (namely ",(0,r.jsx)(n.code,{children:"SYSTEM_DATASOURCETYPE"}),", ",(0,r.jsx)(n.code,{children:"SYSTEM_DATASOURCEHOSTNAME"}),", ",(0,r.jsx)(n.code,{children:"SYSTEM_DATASOURCEPORT"}),", ",(0,r.jsx)(n.code,{children:"SYSTEM_DATASOURCENAME"}),"), they will all be automatically derived from the url."]})]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"SYSTEM_DATASOURCE_USERNAME"}),": An environment variable to connect to the database container. Set the username for the database. Ensure this matches the corresponding property in your database container"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"SYSTEM_DATASOURCE_PASSWORD"}),": An environment variable to connect to the database container. Set the password for the database. Ensure this matches the corresponding property in your database container"]}),"\n"]}),(0,r.jsx)(n.p,{children:"Below is an example of what your configuration should look like after configuring the custom database:"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:'services:\n  stirling-pdf:\n    depends_on:\n      - db\n    environment:\n      DOCKER_ENABLE_SECURITY: "true"\n      SYSTEM_DATASOURCE_ENABLECUSTOMDATABASE: "true"\n      SYSTEM_DATASOURCE_CUSTOMDATABASEURL: "jdbc:postgresql://db:5432/stirling_pdf"\n      SYSTEM_DATASOURCE_USERNAME: "admin"\n      SYSTEM_DATASOURCE_PASSWORD: "stirling"\n    # further configuration\n\n  db:\n    image: \'postgres:17.2-alpine\'\n    container_name: db\n    ports:\n      - "5432:5432"\n    environment:\n      POSTGRES_DB: "stirling_pdf"\n      POSTGRES_USER: "admin"\n      POSTGRES_PASSWORD: "stirling"\n'})})]})]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsxs)(n.em,{children:["Example configuration can be found in ",(0,r.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/blob/428b4238e3a7280d71697d994a66174a250387a7/exampleYmlFiles/docker-compose-latest-fat-security-postgres.yml",children:"exampleYmlFiles/docker-compose-latest-fat-security-postgres.yml"})]})})]})}function b(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>o});t(6540);var a=t(4164);const r={tabItem:"tabItem_Ymn6"};var s=t(4848);function o(e){let{children:n,hidden:t,className:o}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,a.A)(r.tabItem,o),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>j});var a=t(6540),r=t(4164),s=t(3104),o=t(6347),i=t(205),l=t(7485),c=t(1682),d=t(679);function u(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,a.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:r}}=e;return{value:n,label:t,attributes:a,default:r}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function b(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:t}=e;const r=(0,o.W6)(),s=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l.aZ)(s),(0,a.useCallback)((e=>{if(!s)return;const n=new URLSearchParams(r.location.search);n.set(s,e),r.replace({...r.location,search:n.toString()})}),[s,r])]}function m(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,s=h(e),[o,l]=(0,a.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!b({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:s}))),[c,u]=p({queryString:t,groupId:r}),[m,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,s]=(0,d.Dv)(t);return[r,(0,a.useCallback)((e=>{t&&s.set(e)}),[t,s])]}({groupId:r}),S=(()=>{const e=c??m;return b({value:e,tabValues:s})?e:null})();(0,i.A)((()=>{S&&l(S)}),[S]);return{selectedValue:o,selectValue:(0,a.useCallback)((e=>{if(!b({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),f(e)}),[u,f,s]),tabValues:s}}var f=t(2303);const S={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=t(4848);function g(e){let{className:n,block:t,selectedValue:a,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,s.a_)(),d=e=>{const n=e.currentTarget,t=l.indexOf(n),r=i[t].value;r!==a&&(c(n),o(r))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:s}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:a===n?0:-1,"aria-selected":a===n,ref:e=>l.push(e),onKeyDown:u,onClick:d,...s,className:(0,r.A)("tabs__item",S.tabItem,s?.className,{"tabs__item--active":a===n}),children:t??n},n)}))})}function E(e){let{lazy:n,children:t,selectedValue:s}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===s));return e?(0,a.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==s})))})}function A(e){const n=m(e);return(0,x.jsxs)("div",{className:(0,r.A)("tabs-container",S.tabList),children:[(0,x.jsx)(g,{...n,...e}),(0,x.jsx)(E,{...n,...e})]})}function j(e){const n=(0,f.A)();return(0,x.jsx)(A,{...e,children:u(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>i});var a=t(6540);const r={},s=a.createContext(r);function o(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);