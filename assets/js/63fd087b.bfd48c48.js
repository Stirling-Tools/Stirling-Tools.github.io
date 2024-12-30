"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8187],{5723:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"Advanced Configuration/DATABASE","title":"Database Backups","description":"Functionality Overview","source":"@site/docs/Advanced Configuration/DATABASE.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/DATABASE","permalink":"/Advanced Configuration/DATABASE","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/DATABASE.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"Visual Sign with Custom File Storage","permalink":"/Advanced Configuration/Sign with custom files"},"next":{"title":"Code","permalink":"/Contribute/Code"}}');var t=a(4848),s=a(8453);const r={},o="Database Backups",l={},c=[{value:"Functionality Overview",id:"functionality-overview",level:2},{value:"User Interface",id:"user-interface",level:2},{value:"Web Interface",id:"web-interface",level:3},{value:"API Endpoints",id:"api-endpoints",level:3}];function d(e){const n={h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"database-backups",children:"Database Backups"})}),"\n",(0,t.jsx)(n.h2,{id:"functionality-overview",children:"Functionality Overview"}),"\n",(0,t.jsx)(n.p,{children:"The newly introduced feature enhances the application with robust database backup and import capabilities. This feature is designed to ensure data integrity and provide a straightforward way to manage database backups. Here's how it works:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["Automatic Backup Creation","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The system automatically creates a database backup every day at midnight. This ensures that there is always a recent backup available, minimizing the risk of data loss."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Manual Backup Export","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Admin actions that modify the user database trigger a manual export of the database. This keeps the backup up-to-date with the latest changes and provides an extra layer of data security."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Importing Database Backups","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Admin users can import a database backup either via the web interface or API endpoints. This allows for easy restoration of the database to a previous state in case of data corruption or other issues."}),"\n",(0,t.jsx)(n.li,{children:"The import process ensures that the database structure and data are correctly restored, maintaining the integrity of the application."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Managing Backup Files","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Admins can view a list of all existing backup files, along with their creation dates and sizes. This helps in managing storage and identifying the most recent or relevant backups."}),"\n",(0,t.jsx)(n.li,{children:"Backup files can be downloaded for offline storage or transferred to other environments, providing flexibility in database management."}),"\n",(0,t.jsx)(n.li,{children:"Unnecessary backup files can be deleted through the interface to free up storage space and maintain an organized backup directory."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"user-interface",children:"User Interface"}),"\n",(0,t.jsx)(n.h3,{id:"web-interface",children:"Web Interface"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Upload SQL files to import database backups."}),"\n",(0,t.jsx)(n.li,{children:"View details of existing backups, such as file names, creation dates, and sizes."}),"\n",(0,t.jsx)(n.li,{children:"Download backup files for offline storage."}),"\n",(0,t.jsx)(n.li,{children:"Delete outdated or unnecessary backup files."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"api-endpoints",children:"API Endpoints"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Import database backups by uploading SQL files."}),"\n",(0,t.jsx)(n.li,{children:"Download backup files."}),"\n",(0,t.jsx)(n.li,{children:"Delete backup files."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"This new functionality streamlines database management, ensuring that backups are always available and easy to manage, thus improving the reliability and resilience of the application."})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>r,x:()=>o});var i=a(6540);const t={},s=i.createContext(t);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);