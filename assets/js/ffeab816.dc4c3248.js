"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8782],{4552:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"Installation/Mac Installation","title":"Mac installation Guide","description":"Stirling PDF can be run on macOS via the dedicated app found","source":"@site/docs/Installation/Mac.md","sourceDirName":"Installation","slug":"/Installation/Mac Installation","permalink":"/Installation/Mac Installation","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Installation/Mac.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"id":"Mac Installation","title":"Mac installation Guide"},"sidebar":"tutorialSidebar","previous":{"title":"Docker Guide","permalink":"/Installation/Docker Install"},"next":{"title":"Unix installation Guide","permalink":"/Installation/Unix Installation"}}');var l=i(4848),t=i(8453);const a={sidebar_position:2,id:"Mac Installation",title:"Mac installation Guide"},r="MacOS Installation Guide for Stirling PDF",o={},c=[{value:"Prerequisites:",id:"prerequisites",level:2},{value:"Running Stirling PDF",id:"running-stirling-pdf",level:2},{value:"Optional Dependencies",id:"optional-dependencies",level:3},{value:"Quick Troubleshooting",id:"quick-troubleshooting",level:2}];function d(n){const e={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"macos-installation-guide-for-stirling-pdf",children:"MacOS Installation Guide for Stirling PDF"})}),"\n",(0,l.jsxs)(e.p,{children:["Stirling PDF can be run on macOS via the dedicated app found\n",(0,l.jsx)(e.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/releases/download/v0.42.0/Stirling-PDF-mac-installer.dmg",children:"here"}),",\nor the JAR file which can be found ",(0,l.jsx)(e.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/Stirling-PDF.jar",children:"here"}),"."]}),"\n",(0,l.jsx)(e.h2,{id:"prerequisites",children:"Prerequisites:"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Java 17 or 21 (",(0,l.jsx)(e.em,{children:"21 preferred"}),")","\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Install via Homebrew: ",(0,l.jsx)(e.code,{children:"brew install openjdk@21"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"running-stirling-pdf",children:"Running Stirling PDF"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsx)(e.li,{children:"Open Terminal"}),"\n",(0,l.jsxs)(e.li,{children:["Navigate to the folder containing the JAR:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"cd /path/to/folder/containing/jar\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Run the JAR file:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"java -jar Stirling-PDF.jar\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"For convenience, you can create a simple script:"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["Create a file named run-stirling.sh and add the following contents:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"#!/bin/bash    \ncd /path/to/folder/containing/jar\njava -jar Stirling-PDF.jar\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Make it executable:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"chmod +x run-stirling.sh\n"})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Run it with:","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"./run-stirling.sh\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"optional-dependencies",children:"Optional Dependencies"}),"\n",(0,l.jsxs)(e.p,{children:["Install these via ",(0,l.jsx)(e.a,{href:"https://brew.sh/",children:"Homebrew"})," to enable additional features like advanced document conversion or PDF compression:"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'# Install Homebrew if needed\n/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n\n# Install dependencies as needed\nbrew install openjdk@21          # Required\nbrew install qpdf                # PDF compression\nbrew install --cask libreoffice  # Document conversion\nbrew install tesseract           # OCR functionality\nbrew install tesseract-lang      # Additional OCR languages\nbrew install poppler             # PDF to HTML conversion\npip3 install weasyprint          # URL to PDF conversion\n'})}),"\n",(0,l.jsxs)(e.p,{children:["For Tesseract OCR, add to ",(0,l.jsx)(e.code,{children:"config/settings.yml"})," (generated once you first run the jar):"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-yaml",children:"system:\n  tessdataDir: /usr/local/share/tessdata\n"})}),"\n",(0,l.jsx)(e.h2,{id:"quick-troubleshooting",children:"Quick Troubleshooting"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Java not found? Add to ",(0,l.jsx)(e.code,{children:"~/.zshrc"}),":","\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'export PATH="/usr/local/opt/openjdk@21/bin:$PATH"\n'})}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Verify installations with: ",(0,l.jsx)(e.code,{children:"[command] --version"})," (e.g., ",(0,l.jsx)(e.code,{children:"java --version"}),")"]}),"\n",(0,l.jsx)(e.li,{children:"LibreOffice issues? Ensure no LibreOffice processes are running"}),"\n",(0,l.jsxs)(e.li,{children:["Need help? Visit ",(0,l.jsx)(e.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/issues",children:"GitHub Issues"})]}),"\n"]})]})}function h(n={}){const{wrapper:e}={...(0,t.R)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(d,{...n})}):d(n)}},8453:(n,e,i)=>{i.d(e,{R:()=>a,x:()=>r});var s=i(6540);const l={},t=s.createContext(l);function a(n){const e=s.useContext(t);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:a(n.components),s.createElement(t.Provider,{value:e},n.children)}}}]);