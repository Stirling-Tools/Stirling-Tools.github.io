"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[512],{882:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(4848),i=n(5680);const o={sidebar_position:7,id:"API",title:"API",description:"Overview of API offering in S-PDF",tags:["API"]},a="Stirling PDF API",s={id:"API",title:"API",description:"Overview of API offering in S-PDF",source:"@site/docs/API.md",sourceDirName:".",slug:"/API",permalink:"/API",draft:!1,unlisted:!1,editUrl:"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/API.md",tags:[{label:"API",permalink:"/tags/api"}],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,id:"API",title:"API",description:"Overview of API offering in S-PDF",tags:["API"]},sidebar:"tutorialSidebar",previous:{title:"Windows Guide",permalink:"/Installation/Windows Installation"},next:{title:"Enterprise Edition",permalink:"/Enterprise Edition"}},l={},c=[{value:"Unix",id:"unix",level:2},{value:"Windows CMD (Not powershell)",id:"windows-cmd-not-powershell",level:2}];function p(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,i.RP)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"stirling-pdf-api",children:"Stirling PDF API"}),"\n",(0,r.jsxs)(t.p,{children:["Stirling PDF exposes a simple API for easy integration with external scripts. For an exhaustive list of all available API endpoints and their functions, please refer to the ",(0,r.jsx)(t.a,{href:"https://app.swaggerhub.com/apis-docs/Frooodle/Stirling-PDF/",children:"Swagger Documentation"}),"."]}),"\n",(0,r.jsx)(t.p,{children:'Stirling-PDF\'s feature set is not entirely confined to the backend, hence not all functionalities are accessible via the API. Certain operations, such as the "view-pdf" or "visually sign", are executed exclusively on the front-end, and as such, they are only available through the Web-UI. If you encounter a situation where some API endpoints appear to be absent, it is likely attributable to these front-end exclusive features.'}),"\n",(0,r.jsxs)(t.p,{children:["Stirling-PDF also has statistic and health endpoints to integrate with monitoring/dashboard applications\n",(0,r.jsx)(t.a,{href:"https://app.swaggerhub.com/apis-docs/Frooodle/Stirling-PDF/0.24.6#/Info",children:"Stats API docs"})]}),"\n",(0,r.jsx)(t.h1,{id:"example-curl-commands",children:"Example CURL Commands"}),"\n",(0,r.jsx)(t.h2,{id:"unix",children:"Unix"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:'curl -X POST "http://localhost:8080/add-watermark" \\\n     -H "Content-Type: multipart/form-data" \\\n     -F "fileInput=@/Users/username/Downloads/sample-1_cropped.pdf" \\\n     -F "watermarkType=text" \\\n     -F "watermarkText=YOUR_WATERMARK_TEXT" \\\n     -F "alphabet=roman" \\\n     -F "fontSize=30" \\\n     -F "rotation=0" \\\n     -F "opacity=0.5" \\\n     -F "widthSpacer=50" \\\n     -F "heightSpacer=50" \\\n     > "/Users/username/Downloads/output.pdf"\n'})}),"\n",(0,r.jsx)(t.h2,{id:"windows-cmd-not-powershell",children:"Windows CMD (Not powershell)"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:'curl -X POST "http://localhost:8080/add-watermark" ^\n     -H "Content-Type: multipart/form-data" ^\n     -F "fileInput=@C:\\Users\\systo\\Downloads\\sample-1_cropped.pdf" ^\n     -F "watermarkType=text" ^\n     -F "watermarkText=YOUR_WATERMARK_TEXT" ^\n     -F "alphabet=roman" ^\n     -F "fontSize=30" ^\n     -F "rotation=0" ^\n     -F "opacity=0.5" ^\n     -F "widthSpacer=50" ^\n     -F "heightSpacer=50" ^\n     > "C:\\Users\\systo\\Downloads\\output.pdf"\n'})})]})}function d(e={}){const{wrapper:t}={...(0,i.RP)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},5680:(e,t,n)=>{n.d(t,{RP:()=>c});var r=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=c(n),h=i,f=u["".concat(l,".").concat(h)]||u[h]||p[h]||o;return n?r.createElement(f,a(a({ref:t},d),{},{components:n})):r.createElement(f,a({ref:t},d))}));d.displayName="MDXCreateElement"}}]);