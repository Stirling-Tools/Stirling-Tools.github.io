"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6306],{5095:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>n,toc:()=>d});const n=JSON.parse('{"id":"Installation/Application Path Structure","title":"Application Path Structure","description":"Server Deployment","source":"@site/docs/Installation/Application Path Structure.md","sourceDirName":"Installation","slug":"/Installation/Application Path Structure","permalink":"/Installation/Application Path Structure","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Installation/Application Path Structure.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Windows Guide","permalink":"/Installation/Windows Installation"},"next":{"title":"API","permalink":"/API"}}');var s=t(4848),r=t(8453);const l={},o="Application Path Structure",c={},d=[{value:"Server Deployment",id:"server-deployment",level:2},{value:"Desktop Deployment",id:"desktop-deployment",level:2},{value:"Root Directories",id:"root-directories",level:2},{value:"Configuration Files",id:"configuration-files",level:2},{value:"Pipeline Directories",id:"pipeline-directories",level:2},{value:"Custom Files Structure",id:"custom-files-structure",level:2}];function a(e){const i={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(i.header,{children:(0,s.jsx)(i.h1,{id:"application-path-structure",children:"Application Path Structure"})}),"\n",(0,s.jsx)(i.h2,{id:"server-deployment",children:"Server Deployment"}),"\n",(0,s.jsxs)(i.p,{children:["When running in server mode, the base path defaults to ",(0,s.jsx)(i.code,{children:"./"})," (current directory)"]}),"\n",(0,s.jsx)(i.h2,{id:"desktop-deployment",children:"Desktop Deployment"}),"\n",(0,s.jsx)(i.p,{children:"When running as a desktop application (non-server deployment), the base path is set according to the operating system:"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Windows"}),": ",(0,s.jsx)(i.code,{children:"%APPDATA%\\Stirling-PDF\\"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"macOS"}),": ",(0,s.jsx)(i.code,{children:"~/Library/Application Support/Stirling-PDF/"})]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.strong,{children:"Linux/Unix"}),": ",(0,s.jsx)(i.code,{children:"~/.config/Stirling-PDF/"})]}),"\n"]}),"\n",(0,s.jsx)(i.h1,{id:"directory-structure",children:"Directory Structure"}),"\n",(0,s.jsx)(i.p,{children:"All paths below are relative to the BASE_PATH. The File.separator ensures cross-platform compatibility."}),"\n",(0,s.jsx)(i.h2,{id:"root-directories",children:"Root Directories"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"logs/"})," - Application logs storage"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"configs/"})," - Configuration files"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"pipeline/"})," - Pipeline-related operations"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"customFiles/"})," - Custom assets and templates"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"clientWebUI/"})," - Web interface assets"]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"configuration-files",children:"Configuration Files"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"configs/settings.yml"})," - Main settings file"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"configs/custom_settings.yml"})," - User-specific settings"]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"pipeline-directories",children:"Pipeline Directories"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"pipeline/watchedFolders/"})," - Monitored directories for automated processing"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"pipeline/finishedFolders/"})," - Completed processing output location"]}),"\n"]}),"\n",(0,s.jsx)(i.h2,{id:"custom-files-structure",children:"Custom Files Structure"}),"\n",(0,s.jsxs)(i.ul,{children:["\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"customFiles/static/"})," - Static assets"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"customFiles/templates/"})," - Template files"]}),"\n",(0,s.jsxs)(i.li,{children:[(0,s.jsx)(i.code,{children:"customFiles/signatures/"})," - Digital signature files"]}),"\n"]})]})}function u(e={}){const{wrapper:i}={...(0,r.R)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},8453:(e,i,t)=>{t.d(i,{R:()=>l,x:()=>o});var n=t(6540);const s={},r=n.createContext(s);function l(e){const i=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function o(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),n.createElement(r.Provider,{value:i},e.children)}}}]);