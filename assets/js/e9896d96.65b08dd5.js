"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[207],{5154:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"Installation/Docker Install","title":"Docker Guide","description":"The docker image for Stirling-PDF is available on Docker Hub at stirlingtools/stirling-pdf or on Github at stirling-pdf.","source":"@site/docs/Installation/Docker Install.md","sourceDirName":"Installation","slug":"/Installation/Docker Install","permalink":"/Installation/Docker Install","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Installation/Docker Install.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"id":"Docker Install","title":"Docker Guide"},"sidebar":"tutorialSidebar","previous":{"title":"Versions","permalink":"/Installation/Versions"},"next":{"title":"Mac installation Guide","permalink":"/Installation/Mac Installation"}}');var r=t(4848),s=t(8453);const o={sidebar_position:2,id:"Docker Install",title:"Docker Guide"},l="Docker Images for Stirling-PDF",a={},c=[{value:"Run docker container with <code>docker run</code>",id:"run-docker-container-with-docker-run",level:3},{value:"Run docker container with <code>docker compose</code>",id:"run-docker-container-with-docker-compose",level:3},{value:"Extras",id:"extras",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"docker-images-for-stirling-pdf",children:"Docker Images for Stirling-PDF"})}),"\n",(0,r.jsxs)(n.p,{children:["The docker image for Stirling-PDF is available on Docker Hub at ",(0,r.jsx)(n.a,{href:"https://hub.docker.com/r/stirlingtools/stirling-pdf",children:"stirlingtools/stirling-pdf"})," or on Github at ",(0,r.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/pkgs/container/stirling-pdf",children:"stirling-pdf"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Please note that Stirling PDF offers three distinct versions tailored for various hardware configurations. Users seeking optimal performance on lower-end hardware can choose from the specific versions provided. For those who prefer the most recent features and updates, it is recommended to continue using the latest tag."}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Version"}),(0,r.jsx)(n.th,{children:"Latest Tag"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Fat"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"latest-fat"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Standard"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"latest"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"Ultra Lite"}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"latest-ultra-lite"})})]})]})]}),"\n",(0,r.jsxs)(n.h3,{id:"run-docker-container-with-docker-run",children:["Run docker container with ",(0,r.jsx)(n.code,{children:"docker run"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'docker run -d \\\n  --name stirling-pdf \\\n  -p 8080:8080 \\\n  -v "./StirlingPDF/trainingData:/usr/share/tessdata" \\\n  -v "./StirlingPDF/extraConfigs:/configs" \\\n  -v "./StirlingPDF/customFiles:/customFiles/" \\\n  -v "./StirlingPDF/logs:/logs/" \\\n  -v "./StirlingPDF/pipeline:/pipeline/" \\\n  -e DOCKER_ENABLE_SECURITY=false \\\n  -e INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false \\\n  -e LANGS=en_GB \\\n  stirlingtools/stirling-pdf:latest\n'})}),"\n",(0,r.jsxs)(n.h3,{id:"run-docker-container-with-docker-compose",children:["Run docker container with ",(0,r.jsx)(n.code,{children:"docker compose"})]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"docker-compose.yml"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"version: '3.3'\nservices:\n  stirling-pdf:\n    image: stirlingtools/stirling-pdf:latest\n    ports:\n      - '8080:8080'\n    volumes:\n      - ./StirlingPDF/trainingData:/usr/share/tessdata # Required for extra OCR languages\n      - ./StirlingPDF/extraConfigs:/configs\n      - ./StirlingPDF/customFiles:/customFiles/\n      - ./StirlingPDF/logs:/logs/\n      - ./StirlingPDF/pipeline:/pipeline/\n    environment:\n      - DOCKER_ENABLE_SECURITY=false\n      - INSTALL_BOOK_AND_ADVANCED_HTML_OPS=false\n      - LANGS=en_GB\n"})}),"\n",(0,r.jsx)(n.h3,{id:"extras",children:"Extras"}),"\n",(0,r.jsxs)(n.p,{children:["For extra parameters and customization please check the ",(0,r.jsx)(n.a,{href:"https://docs.stirlingpdf.com/Advanced%20Configuration/How%20to%20add%20configurations",children:"advanced configuration"})," page!"]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>l});var i=t(6540);const r={},s=i.createContext(r);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);