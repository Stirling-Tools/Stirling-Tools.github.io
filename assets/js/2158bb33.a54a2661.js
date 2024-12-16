"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2405],{4055:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var r=n(4848),i=n(5680);const o={sidebar_position:2,id:"Docker Install",title:"Installation Guide"},s="Docker Images for Stirling-PDF",a={id:"Getting started/Installation/Docker/Docker Install",title:"Installation Guide",description:"The docker image for Stirling-PDF is available on Docker Hub at frooodle/s-pdf or on Github at s-pdf.",source:"@site/docs/Getting started/Installation/Docker/Docker Install.md",sourceDirName:"Getting started/Installation/Docker",slug:"/Getting started/Installation/Docker/Docker Install",permalink:"/Getting started/Installation/Docker/Docker Install",draft:!1,unlisted:!1,editUrl:"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Getting started/Installation/Docker/Docker Install.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,id:"Docker Install",title:"Installation Guide"},sidebar:"tutorialSidebar",previous:{title:"Docker Versions",permalink:"/Getting started/Installation/Docker/Docker Versions"},next:{title:"Unix installation Guide",permalink:"/Getting started/Installation/Local/Unix Installation"}},l={},c=[{value:"Run docker container with <code>docker run</code>",id:"run-docker-container-with-docker-run",level:3},{value:"Run docker container with <code>docker compose</code>",id:"run-docker-container-with-docker-compose",level:3},{value:"Extras",id:"extras",level:3}];function d(e){const t={a:"a",code:"code",h1:"h1",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.RP)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"docker-images-for-stirling-pdf",children:"Docker Images for Stirling-PDF"}),"\n",(0,r.jsxs)(t.p,{children:["The docker image for Stirling-PDF is available on Docker Hub at ",(0,r.jsx)(t.a,{href:"https://hub.docker.com/r/frooodle/s-pdf",children:"frooodle/s-pdf"})," or on Github at ",(0,r.jsx)(t.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/pkgs/container/s-pdf",children:"s-pdf"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Please note that Stirling PDF offers three distinct versions tailored for various hardware configurations. Users seeking optimal performance on lower-end hardware can choose from the specific versions provided. For those who prefer the most recent features and updates, it is recommended to continue using the latest tag."}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Version"}),(0,r.jsx)(t.th,{children:"Latest Tag"})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"Fat"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"latest-fat"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"Standard"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"latest"})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"Ultra Lite"}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"latest-ultra-lite"})})]})]})]}),"\n",(0,r.jsxs)(t.h3,{id:"run-docker-container-with-docker-run",children:["Run docker container with ",(0,r.jsx)(t.code,{children:"docker run"})]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:'docker run -d \\\n  --name stirling-pdf \\\n  -p 8080:8080 \\\n  -v "./StirlingPDF/trainingData:/usr/share/tessdata" \\\n  -v "./StirlingPDF/extraConfigs:/configs" \\\n  -v "./StirlingPDF/customFiles:/customFiles/" \\\n  -v "./StirlingPDF/logs:/logs/" \\\n  -v "./StirlingPDF/pipeline:/pipeline/" \\\n  -e DOCKER_ENABLE_SECURITY=false \\\n  -e INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false \\\n  -e LANGS=en_GB \\\n  frooodle/s-pdf:latest\n'})}),"\n",(0,r.jsxs)(t.h3,{id:"run-docker-container-with-docker-compose",children:["Run docker container with ",(0,r.jsx)(t.code,{children:"docker compose"})]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:"docker-compose.yml"})}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"version: '3.3'\nservices:\n  stirling-pdf:\n    image: frooodle/s-pdf:latest\n    ports:\n      - '8080:8080'\n    volumes:\n      - ./StirlingPDF/trainingData:/usr/share/tessdata # Required for extra OCR languages\n      - ./StirlingPDF/extraConfigs:/configs\n      - ./StirlingPDF/customFiles:/customFiles/\n      - ./StirlingPDF/logs:/logs/\n      - ./StirlingPDF/pipeline:/pipeline/\n    environment:\n      - DOCKER_ENABLE_SECURITY=false\n      - INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false\n      - LANGS=en_GB\n"})}),"\n",(0,r.jsx)(t.h3,{id:"extras",children:"Extras"}),"\n",(0,r.jsxs)(t.p,{children:["For extra parameters and customization please check the ",(0,r.jsx)(t.a,{href:"https://docs.stirlingpdf.com/Advanced%20Configuration/How%20to%20add%20configurations",children:"advanced configuration"})," page!"]})]})}function h(e={}){const{wrapper:t}={...(0,i.RP)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},5680:(e,t,n)=>{n.d(t,{RP:()=>c});var r=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,h=a(e,["components","mdxType","originalType","parentName"]),u=c(n),p=i,f=u["".concat(l,".").concat(p)]||u[p]||d[p]||o;return n?r.createElement(f,s(s({ref:t},h),{},{components:n})):r.createElement(f,s({ref:t},h))}));h.displayName="MDXCreateElement"}}]);