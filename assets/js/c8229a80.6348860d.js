"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7512],{4058:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>d});const a=JSON.parse('{"id":"API","title":"API","description":"Overview of API offering in S-PDF","source":"@site/docs/API.md","sourceDirName":".","slug":"/API","permalink":"/API","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/API.md","tags":[{"inline":true,"label":"API","permalink":"/tags/api"}],"version":"current","sidebarPosition":7,"frontMatter":{"sidebar_position":7,"id":"API","title":"API","description":"Overview of API offering in S-PDF","tags":["API"]},"sidebar":"tutorialSidebar","previous":{"title":"Application Path Structure","permalink":"/Installation/Application Path Structure"},"next":{"title":"Enterprise Edition","permalink":"/Enterprise Edition"}}');var i=t(4848),r=t(8453),s=t(1470),l=t(9365);const o={sidebar_position:7,id:"API",title:"API",description:"Overview of API offering in S-PDF",tags:["API"]},c="Stirling PDF API",u={},d=[{value:"Accessing API Documentation",id:"accessing-api-documentation",level:2},{value:"Local Swagger UI",id:"local-swagger-ui",level:3},{value:"Settings Menu Access",id:"settings-menu-access",level:3},{value:"API Authentication",id:"api-authentication",level:2},{value:"User-Specific API Keys",id:"user-specific-api-keys",level:3},{value:"Global API Key",id:"global-api-key",level:3},{value:"API Limitations",id:"api-limitations",level:2},{value:"Example CURL Commands",id:"example-curl-commands",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"stirling-pdf-api",children:"Stirling PDF API"})}),"\n",(0,i.jsx)(n.p,{children:"Stirling PDF exposes a simple API for easy integration with external scripts. You can access the API documentation in two ways:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Local Swagger UI at ",(0,i.jsx)(n.code,{children:"/swagger-ui/index.html"})," on your Stirling-PDF instance"]}),"\n",(0,i.jsxs)(n.li,{children:["Online ",(0,i.jsx)(n.a,{href:"https://app.swaggerhub.com/apis-docs/Frooodle/Stirling-PDF/",children:"Swagger Documentation"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"You can also access the documentation through the settings menu (gear icon in the top-right corner)."}),"\n",(0,i.jsx)(n.h2,{id:"accessing-api-documentation",children:"Accessing API Documentation"}),"\n",(0,i.jsx)(n.h3,{id:"local-swagger-ui",children:"Local Swagger UI"}),"\n",(0,i.jsx)(n.p,{children:"Your Stirling-PDF instance includes built-in API documentation:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Navigate to ",(0,i.jsx)(n.code,{children:"http://your-instance:port/swagger-ui/index.html"})]}),"\n",(0,i.jsxs)(n.li,{children:["Or append ",(0,i.jsx)(n.code,{children:"/swagger-ui/index.html"})," to your Stirling-PDF URL"]}),"\n",(0,i.jsxs)(n.li,{children:["This provides an interactive documentation interface where you can:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"View all available endpoints"}),"\n",(0,i.jsx)(n.li,{children:"Test API calls directly"}),"\n",(0,i.jsx)(n.li,{children:"See request/response schemas"}),"\n",(0,i.jsx)(n.li,{children:"View authentication requirements"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"settings-menu-access",children:"Settings Menu Access"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Click the gear icon (\u2699\ufe0f) in the top-right corner"}),"\n",(0,i.jsx)(n.li,{children:'Look for the "API Documentation" or "API" link'}),"\n",(0,i.jsx)(n.li,{children:"This will take you to the local Swagger UI"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"api-authentication",children:"API Authentication"}),"\n",(0,i.jsx)(n.p,{children:"When security is enabled, all API requests require authentication. There are two ways to handle API authentication:"}),"\n",(0,i.jsx)(n.h3,{id:"user-specific-api-keys",children:"User-Specific API Keys"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Obtain your API key:","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Log into Stirling-PDF"}),"\n",(0,i.jsx)(n.li,{children:"Go to Account Settings (via the gear icon)"}),"\n",(0,i.jsx)(n.li,{children:"Find your API key in the account details"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"global-api-key",children:"Global API Key"}),"\n",(0,i.jsx)(n.p,{children:"You can set a custom global API key using the environment variable:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"SECURITY_CUSTOMGLOBALAPIKEY=your-custom-api-key\n"})}),"\n",(0,i.jsx)(n.p,{children:"This allows you to set a single API key that works regardless of user authentication."}),"\n",(0,i.jsxs)(n.ol,{start:"2",children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Include the API key in all requests:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-http",children:"X-API-KEY: your-api-key-here\n"})}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Example authenticated request:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'curl -X POST "http://localhost:8080/add-watermark" \\\n     -H "X-API-KEY: your-api-key-here" \\\n     -H "Content-Type: multipart/form-data" \\\n     ...\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"api-limitations",children:"API Limitations"}),"\n",(0,i.jsx)(n.p,{children:'Stirling-PDF\'s feature set is not entirely confined to the backend, hence not all functionalities are accessible via the API. Certain operations, such as the "view-pdf" or "visually sign", are executed exclusively on the front-end, and as such, they are only available through the Web-UI. If you encounter a situation where some API endpoints appear to be absent, it is likely attributable to these front-end exclusive features.'}),"\n",(0,i.jsx)(n.p,{children:"Stirling-PDF also has statistic and health endpoints to integrate with monitoring/dashboard applications."}),"\n",(0,i.jsx)(n.h2,{id:"example-curl-commands",children:"Example CURL Commands"}),"\n",(0,i.jsxs)(s.A,{groupId:"operating-systems",children:[(0,i.jsx)(l.A,{value:"unix",label:"Unix/Linux/MacOS",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'curl -X POST "http://localhost:8080/add-watermark" \\\n     -H "Content-Type: multipart/form-data" \\\n     -F "fileInput=@/Users/username/Downloads/sample-1_cropped.pdf" \\\n     -F "watermarkType=text" \\\n     -F "watermarkText=YOUR_WATERMARK_TEXT" \\\n     -F "alphabet=roman" \\\n     -F "fontSize=30" \\\n     -F "rotation=0" \\\n     -F "opacity=0.5" \\\n     -F "widthSpacer=50" \\\n     -F "heightSpacer=50" \\\n     > "/Users/username/Downloads/output.pdf"\n'})})}),(0,i.jsx)(l.A,{value:"windows",label:"Windows CMD",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'curl -X POST "http://localhost:8080/add-watermark" ^\n     -H "Content-Type: multipart/form-data" ^\n     -F "fileInput=@C:\\Users\\systo\\Downloads\\sample-1_cropped.pdf" ^\n     -F "watermarkType=text" ^\n     -F "watermarkText=YOUR_WATERMARK_TEXT" ^\n     -F "alphabet=roman" ^\n     -F "fontSize=30" ^\n     -F "rotation=0" ^\n     -F "opacity=0.5" ^\n     -F "widthSpacer=50" ^\n     -F "heightSpacer=50" ^\n     > "C:\\Users\\systo\\Downloads\\output.pdf"\n'})})})]})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>s});t(6540);var a=t(4164);const i={tabItem:"tabItem_Ymn6"};var r=t(4848);function s(e){let{children:n,hidden:t,className:s}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,a.A)(i.tabItem,s),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>y});var a=t(6540),i=t(4164),r=t(3104),s=t(6347),l=t(205),o=t(7485),c=t(1682),u=t(679);function d(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,a.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:i}}=e;return{value:n,label:t,attributes:a,default:i}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const i=(0,s.W6)(),r=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,o.aZ)(r),(0,a.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(i.location.search);n.set(r,e),i.replace({...i.location,search:n.toString()})}),[r,i])]}function g(e){const{defaultValue:n,queryString:t=!1,groupId:i}=e,r=h(e),[s,o]=(0,a.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:r}))),[c,d]=m({queryString:t,groupId:i}),[g,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,r]=(0,u.Dv)(t);return[i,(0,a.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:i}),x=(()=>{const e=c??g;return p({value:e,tabValues:r})?e:null})();(0,l.A)((()=>{x&&o(x)}),[x]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),f(e)}),[d,f,r]),tabValues:r}}var f=t(2303);const x={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=t(4848);function v(e){let{className:n,block:t,selectedValue:a,selectValue:s,tabValues:l}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.a_)(),u=e=>{const n=e.currentTarget,t=o.indexOf(n),i=l[t].value;i!==a&&(c(n),s(i))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;n=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;n=o[t]??o[o.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":t},n),children:l.map((e=>{let{value:n,label:t,attributes:r}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:a===n?0:-1,"aria-selected":a===n,ref:e=>o.push(e),onKeyDown:d,onClick:u,...r,className:(0,i.A)("tabs__item",x.tabItem,r?.className,{"tabs__item--active":a===n}),children:t??n},n)}))})}function A(e){let{lazy:n,children:t,selectedValue:r}=e;const s=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function I(e){const n=g(e);return(0,b.jsxs)("div",{className:(0,i.A)("tabs-container",x.tabList),children:[(0,b.jsx)(v,{...n,...e}),(0,b.jsx)(A,{...n,...e})]})}function y(e){const n=(0,f.A)();return(0,b.jsx)(I,{...e,children:d(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>l});var a=t(6540);const i={},r=a.createContext(i);function s(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);