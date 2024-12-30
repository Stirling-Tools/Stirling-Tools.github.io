"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7813],{5128:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"Advanced Configuration/OCR","title":"OCR (Optical Character Recognition)","description":"This document provides instructions on how to add additional language packs for the OCR tab in Stirling-PDF, both inside and outside of Docker.","source":"@site/docs/Advanced Configuration/OCR.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/OCR","permalink":"/Advanced Configuration/OCR","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/OCR.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"id":"OCR","title":"OCR (Optical Character Recognition)"},"sidebar":"tutorialSidebar","previous":{"title":"How to add Configurations","permalink":"/Advanced Configuration/How to add configurations"},"next":{"title":"Single Sign-On (SSO) Configuration","permalink":"/Advanced Configuration/Single Sign-On Configuration"}}');var t=s(4848),o=s(8453);const i={sidebar_position:1,id:"OCR",title:"OCR (Optical Character Recognition)"},r="OCR Language Packs and Setup",d={},c=[{value:"My OCR used to work and now doesn&#39;t!",id:"my-ocr-used-to-work-and-now-doesnt",level:2},{value:"How does the OCR Work",id:"how-does-the-ocr-work",level:2},{value:"Language Packs",id:"language-packs",level:2},{value:"Installing Language Packs",id:"installing-language-packs",level:3},{value:"Docker Setup",id:"docker-setup",level:3},{value:"Docker Compose",id:"docker-compose",level:4},{value:"Docker Run",id:"docker-run",level:4},{value:"Non-Docker Setup",id:"non-docker-setup",level:3},{value:"Windows Setup",id:"windows-setup",level:3}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"ocr-language-packs-and-setup",children:"OCR Language Packs and Setup"})}),"\n",(0,t.jsx)(n.p,{children:"This document provides instructions on how to add additional language packs for the OCR tab in Stirling-PDF, both inside and outside of Docker."}),"\n",(0,t.jsx)(n.h2,{id:"my-ocr-used-to-work-and-now-doesnt",children:"My OCR used to work and now doesn't!"}),"\n",(0,t.jsxs)(n.p,{children:["The paths have changed for the tessdata locations on new Docker images. Please use ",(0,t.jsx)(n.code,{children:"/usr/share/tessdata"})," (Others should still work for backward compatibility but might not)."]}),"\n",(0,t.jsx)(n.h2,{id:"how-does-the-ocr-work",children:"How does the OCR Work"}),"\n",(0,t.jsx)(n.p,{children:"Stirling-PDF uses Tesseract for its text recognition. All credit goes to them for this awesome work!"}),"\n",(0,t.jsx)(n.h2,{id:"language-packs",children:"Language Packs"}),"\n",(0,t.jsx)(n.p,{children:"Tesseract OCR supports a variety of languages. You can find additional language packs in the Tesseract GitHub repositories:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/tesseract-ocr/tessdata_fast",children:"tessdata_fast"}),": These language packs are smaller and faster to load but may provide lower recognition accuracy."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/tesseract-ocr/tessdata",children:"tessdata"}),": These language packs are larger and provide better recognition accuracy, but may take longer to load."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Depending on your requirements, you can choose the appropriate language pack for your use case. By default, Stirling-PDF uses ",(0,t.jsx)(n.code,{children:"tessdata_fast"})," for English, but this can be replaced."]}),"\n",(0,t.jsx)(n.h3,{id:"installing-language-packs",children:"Installing Language Packs"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Download the desired language pack(s) by selecting the ",(0,t.jsx)(n.code,{children:".traineddata"})," file(s) for the language(s) you need."]}),"\n",(0,t.jsxs)(n.li,{children:["Place the ",(0,t.jsx)(n.code,{children:".traineddata"})," files in the Tesseract tessdata directory: ",(0,t.jsx)(n.code,{children:"/usr/share/tessdata"})]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsxs)(n.strong,{children:["DO NOT REMOVE EXISTING ",(0,t.jsx)(n.code,{children:"eng.traineddata"}),", IT'S REQUIRED."]})}),"\n",(0,t.jsx)(n.h3,{id:"docker-setup",children:"Docker Setup"}),"\n",(0,t.jsx)(n.p,{children:"If you are using Docker, you need to expose the Tesseract tessdata directory as a volume in order to use the additional language packs."}),"\n",(0,t.jsx)(n.h4,{id:"docker-compose",children:"Docker Compose"}),"\n",(0,t.jsxs)(n.p,{children:["Modify your ",(0,t.jsx)(n.code,{children:"docker-compose.yml"})," file to include the following volume configuration:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"services:\n  your_service_name:\n    image: your_docker_image_name\n    volumes:\n      - /location/of/trainingData:/usr/share/tessdata\n"})}),"\n",(0,t.jsx)(n.h4,{id:"docker-run",children:"Docker Run"}),"\n",(0,t.jsx)(n.p,{children:"Add the following to your existing Docker run command:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"-v /location/of/trainingData:/usr/share/tessdata\n"})}),"\n",(0,t.jsx)(n.h3,{id:"non-docker-setup",children:"Non-Docker Setup"}),"\n",(0,t.jsx)(n.p,{children:"For Debian-based systems, install languages with this command:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"sudo apt update &&\\\n# All languages\n# sudo apt install -y 'tesseract-ocr-*'\n# Find languages:\napt search tesseract-ocr-\n# View installed languages:\ndpkg-query -W tesseract-ocr- | sed 's/tesseract-ocr-//g'\n"})}),"\n",(0,t.jsx)(n.p,{children:"For Fedora:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# All languages\n# sudo dnf install -y tesseract-langpack-*\n# Find languages:\ndnf search -C tesseract-langpack-\n# View installed languages:\nrpm -qa | grep tesseract-langpack | sed 's/tesseract-langpack-//g'\n"})}),"\n",(0,t.jsx)(n.h3,{id:"windows-setup",children:"Windows Setup"}),"\n",(0,t.jsx)(n.p,{children:"You must ensure Tesseract is installed on your system. Additional languages must be downloaded manually:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Download desired ",(0,t.jsx)(n.code,{children:".traineddata"})," files from ",(0,t.jsx)(n.a,{href:"https://github.com/tesseract-ocr/tessdata",children:"tessdata"})," or ",(0,t.jsx)(n.a,{href:"https://github.com/tesseract-ocr/tessdata_fast",children:"tessdata_fast"})]}),"\n",(0,t.jsxs)(n.li,{children:["Place them in the tessdata folder within your Tesseract installation directory (e.g., ",(0,t.jsx)(n.code,{children:"C:\\Program Files\\Tesseract-OCR\\tessdata"}),")"]}),"\n",(0,t.jsxs)(n.li,{children:["Verify installation by running:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"tesseract --list-langs\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Edit your ",(0,t.jsx)(n.code,{children:"/configs/settings.yml"})," and change the ",(0,t.jsx)(n.code,{children:"system.tessdataDir"})," to match the directory containing language files:"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"system:\n  tessdataDir: C:/Program Files/Tesseract-OCR/tessdata # path to the directory containing the Tessdata files. This setting is relevant for Windows systems. For Windows users, this path should be adjusted to point to the appropriate directory where the Tessdata files are stored.\n"})})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>r});var a=s(6540);const t={},o=a.createContext(t);function i(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);