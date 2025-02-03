"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7813],{5128:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>d,contentTitle:()=>c,default:()=>g,frontMatter:()=>i,metadata:()=>t,toc:()=>u});const t=JSON.parse('{"id":"Advanced Configuration/OCR","title":"OCR (Optical Character Recognition)","description":"This document provides instructions on how to add additional language packs for the OCR tab in Stirling-PDF, both inside and outside of Docker.","source":"@site/docs/Advanced Configuration/OCR.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/OCR","permalink":"/Advanced Configuration/OCR","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/OCR.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6,"id":"OCR","title":"OCR (Optical Character Recognition)"},"sidebar":"tutorialSidebar","previous":{"title":"Endpoints Customisation","permalink":"/Advanced Configuration/Endpoint or Feature Customisation"},"next":{"title":"Fail2Ban Integration","permalink":"/Advanced Configuration/fail2ban"}}');var s=n(4848),r=n(8453),l=n(1470),o=n(9365);const i={sidebar_position:6,id:"OCR",title:"OCR (Optical Character Recognition)"},c="OCR Language Packs and Setup",d={},u=[{value:"How does the OCR Work",id:"how-does-the-ocr-work",level:2},{value:"Language Packs",id:"language-packs",level:2},{value:"Installing Language Packs manually",id:"installing-language-packs-manually",level:3},{value:"Docker Setup",id:"docker-setup",level:3},{value:"Non-Docker Setup",id:"non-docker-setup",level:3}];function h(e){const a={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a.header,{children:(0,s.jsx)(a.h1,{id:"ocr-language-packs-and-setup",children:"OCR Language Packs and Setup"})}),"\n",(0,s.jsx)(a.p,{children:"This document provides instructions on how to add additional language packs for the OCR tab in Stirling-PDF, both inside and outside of Docker."}),"\n",(0,s.jsx)(a.h2,{id:"how-does-the-ocr-work",children:"How does the OCR Work"}),"\n",(0,s.jsx)(a.p,{children:"Stirling-PDF uses Tesseract for its text recognition. All credit goes to them for this awesome work!"}),"\n",(0,s.jsx)(a.h2,{id:"language-packs",children:"Language Packs"}),"\n",(0,s.jsx)(a.p,{children:"Tesseract OCR supports a variety of languages. You can find additional language packs in the Tesseract GitHub repositories:"}),"\n",(0,s.jsxs)(a.ul,{children:["\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.a,{href:"https://github.com/tesseract-ocr/tessdata_fast",children:"tessdata_fast"}),": These language packs are smaller and faster to load but may provide lower recognition accuracy."]}),"\n",(0,s.jsxs)(a.li,{children:[(0,s.jsx)(a.a,{href:"https://github.com/tesseract-ocr/tessdata",children:"tessdata"}),": These language packs are larger and provide better recognition accuracy, but may take longer to load."]}),"\n"]}),"\n",(0,s.jsxs)(a.p,{children:["Depending on your requirements, you can choose the appropriate language pack for your use case. By default, Stirling-PDF uses ",(0,s.jsx)(a.code,{children:"tessdata_fast"})," for English, but this can be replaced."]}),"\n",(0,s.jsx)(a.h3,{id:"installing-language-packs-manually",children:"Installing Language Packs manually"}),"\n",(0,s.jsxs)(a.ol,{children:["\n",(0,s.jsxs)(a.li,{children:["Download the desired language pack(s) by selecting the ",(0,s.jsx)(a.code,{children:".traineddata"})," file(s) for the language(s) you need."]}),"\n",(0,s.jsxs)(a.li,{children:["Place the ",(0,s.jsx)(a.code,{children:".traineddata"})," files in the Tesseract tessdata directory: ",(0,s.jsx)(a.code,{children:"/usr/share/tessdata"})," (or equivalent)"]}),"\n"]}),"\n",(0,s.jsx)(a.p,{children:(0,s.jsxs)(a.strong,{children:["DO NOT REMOVE EXISTING ",(0,s.jsx)(a.code,{children:"eng.traineddata"}),", IT'S REQUIRED."]})}),"\n",(0,s.jsx)(a.h3,{id:"docker-setup",children:"Docker Setup"}),"\n",(0,s.jsx)(a.p,{children:"If you are using Docker, you need to expose the Tesseract tessdata directory as a volume in order to use the additional language packs."}),"\n",(0,s.jsxs)(l.A,{groupId:"docker-config",children:[(0,s.jsxs)(o.A,{value:"docker-compose",label:"Docker Compose",children:[(0,s.jsxs)(a.p,{children:["Modify your ",(0,s.jsx)(a.code,{children:"docker-compose.yml"})," file to include the following volume configuration:"]}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-yaml",children:"services:\n  your_service_name:\n    image: your_docker_image_name\n    volumes:\n      - /location/of/trainingData:/usr/share/tessdata\n"})})]}),(0,s.jsxs)(o.A,{value:"docker-run",label:"Docker Run",children:[(0,s.jsx)(a.p,{children:"Add the following to your existing Docker run command:"}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-bash",children:"-v /location/of/trainingData:/usr/share/tessdata\n"})})]})]}),"\n",(0,s.jsx)(a.h3,{id:"non-docker-setup",children:"Non-Docker Setup"}),"\n",(0,s.jsxs)(l.A,{groupId:"operating-systems",children:[(0,s.jsxs)(o.A,{value:"debian",label:"Debian-based Systems",children:[(0,s.jsx)(a.p,{children:"For Debian-based systems, use the following commands to manage Tesseract languages:"}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-bash",children:"sudo apt update &&\\\n# All languages\n# sudo apt install -y 'tesseract-ocr-*'\n\n# Find available languages:\napt search tesseract-ocr-\n\n# View installed languages:\ndpkg-query -W tesseract-ocr- | sed 's/tesseract-ocr-//g'\n"})})]}),(0,s.jsxs)(o.A,{value:"fedora",label:"Fedora",children:[(0,s.jsx)(a.p,{children:"For Fedora systems, use the following commands:"}),(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-bash",children:"# All languages\n# sudo dnf install -y tesseract-langpack-*\n\n# Find available languages:\ndnf search -C tesseract-langpack-\n\n# View installed languages:\nrpm -qa | grep tesseract-langpack | sed 's/tesseract-langpack-//g'\n"})})]}),(0,s.jsxs)(o.A,{value:"windows",label:"Windows",children:[(0,s.jsx)(a.p,{children:"Follow these steps to set up Tesseract languages on Windows:"}),(0,s.jsxs)(a.ol,{children:["\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["Download desired ",(0,s.jsx)(a.code,{children:".traineddata"})," files from ",(0,s.jsx)(a.a,{href:"https://github.com/tesseract-ocr/tessdata",children:"tessdata"})," or ",(0,s.jsx)(a.a,{href:"https://github.com/tesseract-ocr/tessdata_fast",children:"tessdata_fast"})]}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Place them in the tessdata folder within your Tesseract installation directory:"}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{children:"C:\\Program Files\\Tesseract-OCR\\tessdata\n"})}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsx)(a.p,{children:"Verify the installation by running:"}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-powershell",children:"tesseract --list-langs\n"})}),"\n"]}),"\n",(0,s.jsxs)(a.li,{children:["\n",(0,s.jsxs)(a.p,{children:["Edit your ",(0,s.jsx)(a.code,{children:"/configs/settings.yml"})," and update the ",(0,s.jsx)(a.code,{children:"system.tessdataDir"}),":"]}),"\n",(0,s.jsx)(a.pre,{children:(0,s.jsx)(a.code,{className:"language-yaml",children:"system:\n  tessdataDir: C:/Program Files/Tesseract-OCR/tessdata # path to Tessdata files\n"})}),"\n"]}),"\n"]})]})]})]})}function g(e={}){const{wrapper:a}={...(0,r.R)(),...e.components};return a?(0,s.jsx)(a,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},9365:(e,a,n)=>{n.d(a,{A:()=>l});n(6540);var t=n(4164);const s={tabItem:"tabItem_Ymn6"};var r=n(4848);function l(e){let{children:a,hidden:n,className:l}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,t.A)(s.tabItem,l),hidden:n,children:a})}},1470:(e,a,n)=>{n.d(a,{A:()=>k});var t=n(6540),s=n(4164),r=n(3104),l=n(6347),o=n(205),i=n(7485),c=n(1682),d=n(679);function u(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:a}=e;return!!a&&"object"==typeof a&&"value"in a}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:a,children:n}=e;return(0,t.useMemo)((()=>{const e=a??function(e){return u(e).map((e=>{let{props:{value:a,label:n,attributes:t,default:s}}=e;return{value:a,label:n,attributes:t,default:s}}))}(n);return function(e){const a=(0,c.XI)(e,((e,a)=>e.value===a.value));if(a.length>0)throw new Error(`Docusaurus error: Duplicate values "${a.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[a,n])}function g(e){let{value:a,tabValues:n}=e;return n.some((e=>e.value===a))}function p(e){let{queryString:a=!1,groupId:n}=e;const s=(0,l.W6)(),r=function(e){let{queryString:a=!1,groupId:n}=e;if("string"==typeof a)return a;if(!1===a)return null;if(!0===a&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:a,groupId:n});return[(0,i.aZ)(r),(0,t.useCallback)((e=>{if(!r)return;const a=new URLSearchParams(s.location.search);a.set(r,e),s.replace({...s.location,search:a.toString()})}),[r,s])]}function f(e){const{defaultValue:a,queryString:n=!1,groupId:s}=e,r=h(e),[l,i]=(0,t.useState)((()=>function(e){let{defaultValue:a,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(a){if(!g({value:a,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${a}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return a}const t=n.find((e=>e.default))??n[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:a,tabValues:r}))),[c,u]=p({queryString:n,groupId:s}),[f,m]=function(e){let{groupId:a}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(a),[s,r]=(0,d.Dv)(n);return[s,(0,t.useCallback)((e=>{n&&r.set(e)}),[n,r])]}({groupId:s}),b=(()=>{const e=c??f;return g({value:e,tabValues:r})?e:null})();(0,o.A)((()=>{b&&i(b)}),[b]);return{selectedValue:l,selectValue:(0,t.useCallback)((e=>{if(!g({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);i(e),u(e),m(e)}),[u,m,r]),tabValues:r}}var m=n(2303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=n(4848);function v(e){let{className:a,block:n,selectedValue:t,selectValue:l,tabValues:o}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.a_)(),d=e=>{const a=e.currentTarget,n=i.indexOf(a),s=o[n].value;s!==t&&(c(a),l(s))},u=e=>{let a=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=i.indexOf(e.currentTarget)+1;a=i[n]??i[0];break}case"ArrowLeft":{const n=i.indexOf(e.currentTarget)-1;a=i[n]??i[i.length-1];break}}a?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":n},a),children:o.map((e=>{let{value:a,label:n,attributes:r}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:t===a?0:-1,"aria-selected":t===a,ref:e=>i.push(e),onKeyDown:u,onClick:d,...r,className:(0,s.A)("tabs__item",b.tabItem,r?.className,{"tabs__item--active":t===a}),children:n??a},a)}))})}function j(e){let{lazy:a,children:n,selectedValue:r}=e;const l=(Array.isArray(n)?n:[n]).filter(Boolean);if(a){const e=l.find((e=>e.props.value===r));return e?(0,t.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:l.map(((e,a)=>(0,t.cloneElement)(e,{key:a,hidden:e.props.value!==r})))})}function y(e){const a=f(e);return(0,x.jsxs)("div",{className:(0,s.A)("tabs-container",b.tabList),children:[(0,x.jsx)(v,{...a,...e}),(0,x.jsx)(j,{...a,...e})]})}function k(e){const a=(0,m.A)();return(0,x.jsx)(y,{...e,children:u(e.children)},String(a))}},8453:(e,a,n)=>{n.d(a,{R:()=>l,x:()=>o});var t=n(6540);const s={},r=t.createContext(s);function l(e){const a=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function o(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),t.createElement(r.Provider,{value:a},e.children)}}}]);