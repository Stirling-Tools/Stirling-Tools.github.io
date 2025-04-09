"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[852],{859:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"Advanced Configuration/Folder Scanning","title":"Folder Scanning","description":"User Guide for Local Directory Scanning and File Processing","source":"@site/docs/Advanced Configuration/FolderScanning.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/Folder Scanning","permalink":"/Advanced Configuration/Folder Scanning","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/FolderScanning.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"sidebar_position":7,"id":"Folder Scanning","title":"Folder Scanning"},"sidebar":"tutorialSidebar","previous":{"title":"Endpoints Customisation","permalink":"/Advanced Configuration/Endpoint or Feature Customisation"},"next":{"title":"OCR (Optical Character Recognition)","permalink":"/Advanced Configuration/OCR"}}');var t=i(4848),r=i(8453);const o={sidebar_position:7,id:"Folder Scanning",title:"Folder Scanning"},l=void 0,d={},c=[{value:"User Guide for Local Directory Scanning and File Processing",id:"user-guide-for-local-directory-scanning-and-file-processing",level:2},{value:"Setting Up Watched Folders",id:"setting-up-watched-folders",level:3},{value:"Configuring Processing with JSON Files",id:"configuring-processing-with-json-files",level:3},{value:"Automatic Scanning and Processing",id:"automatic-scanning-and-processing",level:3},{value:"Processing Steps",id:"processing-steps",level:3},{value:"Results and Output",id:"results-and-output",level:3},{value:"Completion and Cleanup",id:"completion-and-cleanup",level:3},{value:"Error Handling",id:"error-handling",level:3},{value:"User Interaction",id:"user-interaction",level:3}];function a(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"user-guide-for-local-directory-scanning-and-file-processing",children:"User Guide for Local Directory Scanning and File Processing"}),"\n",(0,t.jsxs)(n.p,{children:["Folder scanning uses settings configured from our pipeline tool, it is advised you first read the ",(0,t.jsx)(n.a,{href:"/Advanced%20Configuration/Pipeline",children:"Pipeline Guide"})]}),"\n",(0,t.jsx)(n.h3,{id:"setting-up-watched-folders",children:"Setting Up Watched Folders"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Create a folder where you want your files to be monitored. This is your 'watched folder'."}),"\n",(0,t.jsxs)(n.li,{children:["The default directory for this is ",(0,t.jsx)(n.code,{children:"./pipeline/watchedFolders/"}),"."]}),"\n",(0,t.jsx)(n.li,{children:"Place any directories you want to be scanned into this folder. This folder should contain multiple folders, each for their own tasks and pipelines."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"configuring-processing-with-json-files",children:"Configuring Processing with JSON Files"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["In each directory you want processed (e.g., ",(0,t.jsx)(n.code,{children:"./pipeline/watchedFolders/officePrinter"}),"), include a JSON configuration file."]}),"\n",(0,t.jsxs)(n.li,{children:["This JSON file should specify how you want the files in the directory to be handled (e.g., what operations to perform on them). This can be made, configured, and downloaded from the Stirling-PDF Pipeline interface. For JSON creation guide please see ",(0,t.jsx)(n.a,{href:"/Advanced%20Configuration/Pipeline",children:"Pipeline setup"})]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"automatic-scanning-and-processing",children:"Automatic Scanning and Processing"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The system automatically checks the watched folder every minute for new directories and files to process."}),"\n",(0,t.jsx)(n.li,{children:"When a directory with a valid JSON configuration file is found, it begins processing the files inside according to the configuration."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"processing-steps",children:"Processing Steps"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Files in each directory are processed according to the instructions in the JSON file."}),"\n",(0,t.jsx)(n.li,{children:"This might involve file conversions, data filtering, renaming files, etc. If the output of a step is a zip, this zip will be automatically unzipped as it passes to the next process."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"results-and-output",children:"Results and Output"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["After processing, the results are saved in a specified output location. This could be a different folder or location as defined in the JSON file or the default location ",(0,t.jsx)(n.code,{children:"./pipeline/finishedFolders/"}),"."]}),"\n",(0,t.jsx)(n.li,{children:"Each processed file is named and organized according to the rules set in the JSON configuration."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"completion-and-cleanup",children:"Completion and Cleanup"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Once processing is complete, the original files in the watched folder's directory are removed."}),"\n",(0,t.jsx)(n.li,{children:"You can find the processed files in the designated output location."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"error-handling",children:"Error Handling"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"If there's an error during processing, the system will not delete the original files, allowing you to check and retry if necessary."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"user-interaction",children:"User Interaction"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"As a user, your main tasks are to set up the watched folders, place directories with files for processing, and create the corresponding JSON configuration files."}),"\n",(0,t.jsx)(n.li,{children:"The system handles the rest, including scanning, processing, and outputting results."}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>l});var s=i(6540);const t={},r=s.createContext(t);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);