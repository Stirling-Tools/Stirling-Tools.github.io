"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5200],{8310:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>t,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"Installation/Windows Installation","title":"Windows Guide","description":"Stirling PDF provides Windows compatibility through a downloadable .exe files depending on your usecase!","source":"@site/docs/Installation/Windows.md","sourceDirName":"Installation","slug":"/Installation/Windows Installation","permalink":"/Installation/Windows Installation","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Installation/Windows.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2,"id":"Windows Installation","title":"Windows Guide"},"sidebar":"tutorialSidebar","previous":{"title":"Unix installation Guide","permalink":"/Installation/Unix Installation"},"next":{"title":"Path Structure","permalink":"/Installation/Path Structure"}}');var l=i(4848),r=i(8453);const t={sidebar_position:2,id:"Windows Installation",title:"Windows Guide"},o="Windows Installation Guide for Stirling PDF",a={},d=[{value:"Optional Dependencies",id:"optional-dependencies",level:3},{value:"Python and Related Tools",id:"python-and-related-tools",level:4},{value:"QPDF",id:"qpdf",level:4},{value:"LibreOffice",id:"libreoffice",level:4},{value:"Tesseract OCR",id:"tesseract-ocr",level:4},{value:"Weasyprint",id:"weasyprint",level:4},{value:"PDFtoHTML",id:"pdftohtml",level:4},{value:"Adding Directories to System PATH",id:"adding-directories-to-system-path",level:2},{value:"Server Installation Steps",id:"server-installation-steps",level:2},{value:"Notes",id:"notes",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"windows-installation-guide-for-stirling-pdf",children:"Windows Installation Guide for Stirling PDF"})}),"\n",(0,l.jsxs)(n.p,{children:["Stirling PDF provides Windows compatibility through a downloadable .exe files depending on your usecase!\nFor personal user we recommend the latest\n",(0,l.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/Stirling-PDF-win-installer.exe",children:"Stirling-PDF-installer"})]}),"\n",(0,l.jsxs)(n.p,{children:["For Server use (wanting to host Stirling-PDF as a server to share with multiple users)\nWe recommend downloading the ",(0,l.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/win-Stirling-PDF-portable-Server.exe",children:"Stirling-PDF-server.exe"})," or ",(0,l.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/releases/latest/download/win-Stirling-PDF-portable-Server-with-login.exe",children:"Stirling-PDF-server-with-login.exe"}),"\nThis version also requires you to install the latest ",(0,l.jsx)(n.a,{href:"https://www.oracle.com/uk/java/technologies/downloads/#jdk21-windows",children:"java jdk21"})," you can get the installer ",(0,l.jsx)(n.a,{href:"https://download.oracle.com/java/21/latest/jdk-21_windows-x64_bin.exe",children:"here"})]}),"\n",(0,l.jsx)(n.h3,{id:"optional-dependencies",children:"Optional Dependencies"}),"\n",(0,l.jsx)(n.p,{children:"These dependencies enable additional features in Stirling PDF. Install only the ones you need:"}),"\n",(0,l.jsx)(n.h4,{id:"python-and-related-tools",children:"Python and Related Tools"}),"\n",(0,l.jsx)(n.p,{children:"Python and its related tools enable various features in Stirling PDF:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"OpenCV: Enables image scan extraction features"}),"\n",(0,l.jsx)(n.li,{children:"Unoconv: Enables file to PDF conversion features"}),"\n",(0,l.jsx)(n.li,{children:"Python: Required base for OpenCV and other Python-based features"}),"\n"]}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Python Installation:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Download Python from ",(0,l.jsx)(n.a,{href:"https://www.python.org/downloads/",children:"Python's official site"})]}),"\n",(0,l.jsxs)(n.li,{children:["During installation, ",(0,l.jsx)(n.strong,{children:"IMPORTANT"}),': Check "Add Python to PATH"']}),"\n",(0,l.jsxs)(n.li,{children:["Verify installation by opening Command Prompt and running:","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"python --version\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"OpenCV Installation:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"After Python is installed, open Command Prompt as administrator"}),"\n",(0,l.jsxs)(n.li,{children:["Install OpenCV by running:","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"pip install opencv-python\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Verify installation:","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'python -c "import cv2"\n'})}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"Enables Extract Image Scans operation"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Unoconv Installation:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"First install LibreOffice (see LibreOffice section below)"}),"\n",(0,l.jsx)(n.li,{children:"Open Command Prompt as administrator"}),"\n",(0,l.jsxs)(n.li,{children:["Install unoconv:","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"pip install unoconv\n"})}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Verify installation:","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"unoconv --version\n"})}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"Enables File To PDF operation\nNote: Unoconv requires both Python and LibreOffice to function properly"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"qpdf",children:"QPDF"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Download from ",(0,l.jsx)(n.a,{href:"https://qpdf.sourceforge.io/",children:"QPDF's official site"})]}),"\n",(0,l.jsx)(n.li,{children:"Enables PDF compression and other operations"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"libreoffice",children:"LibreOffice"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Download and install from ",(0,l.jsx)(n.a,{href:"https://www.libreoffice.org/download/download-libreoffice/",children:"LibreOffice's official site"})]}),"\n",(0,l.jsx)(n.li,{children:"Enables PDF to DOCX conversion and other document format conversions"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"tesseract-ocr",children:"Tesseract OCR"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Download the installer from ",(0,l.jsx)(n.a,{href:"https://github.com/UB-Mannheim/tesseract/wiki",children:"UB Mannheim's GitHub"})]}),"\n",(0,l.jsx)(n.li,{children:"During installation, check additional languages you need"}),"\n",(0,l.jsxs)(n.li,{children:["Add to settings.yml in your Stirling PDF installation directory:","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"system:\n  tessdataDir: C:\\\\Program Files\\\\Tesseract-OCR\\\\tessdata\n"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Enables OCR functionality for PDFs"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"weasyprint",children:"Weasyprint"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Download from ",(0,l.jsx)(n.a,{href:"https://github.com/Kozea/WeasyPrint/releases",children:"Weasyprint's releases"})]}),"\n",(0,l.jsxs)(n.li,{children:["Create a directory (e.g., ",(0,l.jsx)(n.code,{children:"c:\\weasyprint\\"}),") and place weasyprint.exe there"]}),"\n"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Enables URL to PDF conversion"}),"\n",(0,l.jsx)(n.li,{children:"Note: Some antivirus software may flag weasyprint.exe - you may need to whitelist it"}),"\n"]}),"\n",(0,l.jsx)(n.h4,{id:"pdftohtml",children:"PDFtoHTML"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Download from ",(0,l.jsx)(n.a,{href:"https://sourceforge.net/projects/pdftohtml/",children:"SourceForge"})]}),"\n",(0,l.jsxs)(n.li,{children:["Create a directory (e.g., ",(0,l.jsx)(n.code,{children:"c:\\pdftohtml\\"}),") and place pdftohtml.exe there"]}),"\n"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Enables PDF to HTML conversion"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"adding-directories-to-system-path",children:"Adding Directories to System PATH"}),"\n",(0,l.jsx)(n.p,{children:"After installing dependencies, you'll need to add their directories to your system's PATH. Here's how:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsx)(n.li,{children:"Open Windows Search (Windows key + S)"}),"\n",(0,l.jsx)(n.li,{children:'Type "Environment Variables" and click "Edit the system environment variables"'}),"\n",(0,l.jsx)(n.li,{children:'Click "Environment Variables" button at the bottom'}),"\n",(0,l.jsx)(n.li,{children:'Under "System variables", find and select "Path"'}),"\n",(0,l.jsx)(n.li,{children:'Click "Edit"'}),"\n",(0,l.jsxs)(n.li,{children:['Click "New" to add each required path:',"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:'For Python: Should be added automatically during installation if "Add Python to PATH" was checked'}),"\n",(0,l.jsxs)(n.li,{children:["For LibreOffice: ",(0,l.jsx)(n.code,{children:"C:\\Program Files\\LibreOffice\\program"})]}),"\n",(0,l.jsxs)(n.li,{children:["For Tesseract: ",(0,l.jsx)(n.code,{children:"C:\\Program Files\\Tesseract-OCR"})]}),"\n",(0,l.jsxs)(n.li,{children:["For Weasyprint: ",(0,l.jsx)(n.code,{children:"C:\\weasyprint"})," (or your chosen directory)"]}),"\n",(0,l.jsxs)(n.li,{children:["For PDFtoHTML: ",(0,l.jsx)(n.code,{children:"C:\\pdftohtml"})," (or your chosen directory)"]}),"\n",(0,l.jsxs)(n.li,{children:["For QPDF: The installation directory (usually ",(0,l.jsx)(n.code,{children:"C:\\Program Files\\qpdf\\bin"}),")"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:'Click "OK" on all windows to save changes'}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"server-installation-steps",children:"Server Installation Steps"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Download the latest Stirling PDF-server.exe or jar from the ",(0,l.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/releases/latest",children:"releases page"})]}),"\n",(0,l.jsx)(n.li,{children:"Install any desired optional dependencies following the instructions above"}),"\n",(0,l.jsx)(n.li,{children:"Launch the Stirling PDF executable"}),"\n",(0,l.jsxs)(n.li,{children:["Access the web interface through your browser (the application will provide the URL) in the console logs normally ",(0,l.jsx)(n.a,{href:"http://localhost:8080",children:"http://localhost:8080"})]}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"notes",children:"Notes"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"The application hosts a web server that is accessible to anyone on your network"}),"\n",(0,l.jsx)(n.li,{children:"If you install multiple Python-based dependencies, ensure they're using the same Python installation to avoid conflicts"}),"\n",(0,l.jsx)(n.li,{children:"Make sure to restart Stirling PDF after installing new dependencies or modifying PATH variables"}),"\n",(0,l.jsx)(n.li,{children:"Some features will be unavailable until their required dependencies are installed"}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Verifying PATH Settings:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Open Command Prompt (cmd)"}),"\n",(0,l.jsxs)(n.li,{children:["Type ",(0,l.jsx)(n.code,{children:"echo %PATH%"})," to see all directories in your PATH"]}),"\n",(0,l.jsxs)(n.li,{children:["For each dependency, try running its command to verify it's accessible:","\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'python --version\nunoconv --version\npython -c "import cv2"\ntesseract --version\n'})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\n",(0,l.jsx)(n.p,{children:"Common Issues:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["If changes to PATH don't take effect, try:","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Logging out and back in"}),"\n",(0,l.jsx)(n.li,{children:"Restarting your computer"}),"\n",(0,l.jsx)(n.li,{children:"Opening a new Command Prompt window"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"If a dependency isn't found, double-check the exact path in File Explorer"}),"\n",(0,l.jsx)(n.li,{children:"For Tesseract issues, verify the tessdata directory contains language files"}),"\n",(0,l.jsx)(n.li,{children:"For LibreOffice conversions, ensure no LibreOffice windows are open when converting"}),"\n",(0,l.jsxs)(n.li,{children:["For Python/OpenCV issues:","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["Make sure pip is up to date: ",(0,l.jsx)(n.code,{children:"python -m pip install --upgrade pip"})]}),"\n",(0,l.jsx)(n.li,{children:"Try installing with administrator privileges"}),"\n",(0,l.jsx)(n.li,{children:"Check if Python is properly added to PATH"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["For unoconv issues:","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Verify both Python and LibreOffice are properly installed"}),"\n",(0,l.jsx)(n.li,{children:"Make sure LibreOffice is in PATH"}),"\n",(0,l.jsx)(n.li,{children:"Try running LibreOffice once before using unoconv"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.p,{children:["Need help? Visit the ",(0,l.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/issues",children:"Stirling PDF GitHub Issues"})," page."]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>t,x:()=>o});var s=i(6540);const l={},r=s.createContext(l);function t(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);