"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6033],{3307:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>f,frontMatter:()=>s,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"Advanced Configuration/fail2ban","title":"Fail2Ban Integration","description":"This document provides instructions on how to set up Fail2Ban with Stirling-PDF to protect against unauthorized login attempts. (Note Stirling-PDF blocks IPs after a set retry count regardless of Fail2Ban, This configuration is only useful for users specifically wanting Fail2Ban configuration)","source":"@site/docs/Advanced Configuration/Fail2Ban.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/fail2ban","permalink":"/Advanced Configuration/fail2ban","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/Fail2Ban.md","tags":[],"version":"current","sidebarPosition":8,"frontMatter":{"sidebar_position":8,"id":"fail2ban","title":"Fail2Ban Integration"},"sidebar":"tutorialSidebar","previous":{"title":"OCR (Optical Character Recognition)","permalink":"/Advanced Configuration/OCR"},"next":{"title":"External Database","permalink":"/Advanced Configuration/External Database"}}');var a=t(4848),r=t(8453),l=t(1470),o=t(9365);const s={sidebar_position:8,id:"fail2ban",title:"Fail2Ban Integration"},c="Fail2Ban Setup for Stirling-PDF",u={},d=[{value:"How does Fail2Ban Work with Stirling-PDF",id:"how-does-fail2ban-work-with-stirling-pdf",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Important Configuration Notes",id:"important-configuration-notes",level:3},{value:"Configuration",id:"configuration",level:2},{value:"Log File Location",id:"log-file-location",level:3},{value:"Example Fail2Ban Filter",id:"example-fail2ban-filter",level:3},{value:"Example Jail Configuration",id:"example-jail-configuration",level:3},{value:"Ensure access to Logs path",id:"ensure-access-to-logs-path",level:3}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"fail2ban-setup-for-stirling-pdf",children:"Fail2Ban Setup for Stirling-PDF"})}),"\n",(0,a.jsx)(n.p,{children:"This document provides instructions on how to set up Fail2Ban with Stirling-PDF to protect against unauthorized login attempts. (Note Stirling-PDF blocks IPs after a set retry count regardless of Fail2Ban, This configuration is only useful for users specifically wanting Fail2Ban configuration)"}),"\n",(0,a.jsx)(n.h2,{id:"how-does-fail2ban-work-with-stirling-pdf",children:"How does Fail2Ban Work with Stirling-PDF"}),"\n",(0,a.jsx)(n.p,{children:"Stirling-PDF logs failed authentication attempts to a log file which Fail2Ban monitors. When it detects multiple failed login attempts from the same IP address, Fail2Ban automatically blocks that IP address for a configured period of time."}),"\n",(0,a.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Fail2Ban installed on your system"}),"\n",(0,a.jsx)(n.li,{children:"Access to Stirling-PDF log directory"}),"\n",(0,a.jsxs)(n.li,{children:["Security settings configured in ",(0,a.jsx)(n.code,{children:"/configs/settings.yml"}),":","\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"security:\n  enableLogin: true    # Login must be enabled for Fail2Ban integration\n  loginAttemptCount: -1 # Set to -1 when using Fail2Ban recommended but not required\n"})}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"important-configuration-notes",children:"Important Configuration Notes"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["The ",(0,a.jsx)(n.code,{children:"enableLogin"})," setting must be set to ",(0,a.jsx)(n.code,{children:"true"})," as Fail2Ban integration requires authentication to be active"]}),"\n",(0,a.jsxs)(n.li,{children:["When using Fail2Ban, set ",(0,a.jsx)(n.code,{children:"loginAttemptCount"})," to ",(0,a.jsx)(n.code,{children:"-1"})," to disable the built-in account locking mechanism and let Fail2Ban handle login attempt management"]}),"\n",(0,a.jsxs)(n.li,{children:["For more details on security configuration options, refer to the ",(0,a.jsx)(n.a,{href:"/Advanced%20Configuration/System%20and%20Security",children:"System and Security"})," documentation"]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,a.jsx)(n.h3,{id:"log-file-location",children:"Log File Location"}),"\n",(0,a.jsx)(n.p,{children:"The log file location containing the failed authentication messages depends on your installation type:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"Default/Docker Installation"}),": ",(0,a.jsx)(n.code,{children:"./logs/invalid-auths.log"})]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"Windows Desktop"}),": ",(0,a.jsx)(n.code,{children:"%APPDATA%\\Stirling-PDF\\logs\\invalid-auths.log"})]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"MacOS Desktop"}),": ",(0,a.jsx)(n.code,{children:"~/Library/Application Support/Stirling-PDF/logs/invalid-auths.log"})]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"Linux Desktop"}),": ",(0,a.jsx)(n.code,{children:"~/.config/Stirling-PDF/logs/invalid-auths.log"})]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"example-fail2ban-filter",children:"Example Fail2Ban Filter"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.code,{children:"/etc/fail2ban/filter.d/stirling-pdf.conf"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ini",children:"[Definition]\nfailregex = Failed login attempt from IP: <HOST>\n"})}),"\n",(0,a.jsx)(n.h3,{id:"example-jail-configuration",children:"Example Jail Configuration"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.code,{children:"/etc/fail2ban/jail.local"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ini",children:"[stirling-pdf]\nenabled = true\nfilter = stirling-pdf\nlogpath = /logs/invalid-auths.log\nmaxretry = 5\nfindtime = 300\nbantime = 3600\n"})}),"\n",(0,a.jsx)(n.p,{children:"Configuration parameters:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"maxretry"}),": Number of failed attempts before ban (default: 5)"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"findtime"}),": Time window for failed attempts in seconds (default: 300 seconds / 5 minutes)"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"bantime"}),": Duration of the ban in seconds (default: 3600 seconds / 1 hour)"]}),"\n"]}),"\n",(0,a.jsx)(n.h3,{id:"ensure-access-to-logs-path",children:"Ensure access to Logs path"}),"\n",(0,a.jsxs)(l.A,{groupId:"docker-config",children:[(0,a.jsxs)(o.A,{value:"docker-compose",label:"Docker Compose",children:[(0,a.jsxs)(n.p,{children:["Modify your ",(0,a.jsx)(n.code,{children:"docker-compose.yml"})," to expose the log directory:"]}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"services:\n  stirling-pdf:\n    volumes:\n      - ./logs:/logs\n"})})]}),(0,a.jsxs)(o.A,{value:"docker-run",label:"Docker Run",children:[(0,a.jsx)(n.p,{children:"Add the volume mount to your Docker run command:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"-v ./logs:/logs\n"})})]})]})]})}function f(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>l});t(6540);var i=t(4164);const a={tabItem:"tabItem_Ymn6"};var r=t(4848);function l(e){let{children:n,hidden:t,className:l}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,i.A)(a.tabItem,l),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>w});var i=t(6540),a=t(4164),r=t(3104),l=t(6347),o=t(205),s=t(7485),c=t(1682),u=t(679);function d(e){return i.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,i.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,i.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:i,default:a}}=e;return{value:n,label:t,attributes:i,default:a}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function f(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const a=(0,l.W6)(),r=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,s.aZ)(r),(0,i.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(a.location.search);n.set(r,e),a.replace({...a.location,search:n.toString()})}),[r,a])]}function p(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,r=h(e),[l,s]=(0,i.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!f({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const i=t.find((e=>e.default))??t[0];if(!i)throw new Error("Unexpected error: 0 tabValues");return i.value}({defaultValue:n,tabValues:r}))),[c,d]=g({queryString:t,groupId:a}),[p,m]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,r]=(0,u.Dv)(t);return[a,(0,i.useCallback)((e=>{t&&r.set(e)}),[t,r])]}({groupId:a}),b=(()=>{const e=c??p;return f({value:e,tabValues:r})?e:null})();(0,o.A)((()=>{b&&s(b)}),[b]);return{selectedValue:l,selectValue:(0,i.useCallback)((e=>{if(!f({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);s(e),d(e),m(e)}),[d,m,r]),tabValues:r}}var m=t(2303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=t(4848);function v(e){let{className:n,block:t,selectedValue:i,selectValue:l,tabValues:o}=e;const s=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.a_)(),u=e=>{const n=e.currentTarget,t=s.indexOf(n),a=o[t].value;a!==i&&(c(n),l(a))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=s.indexOf(e.currentTarget)+1;n=s[t]??s[0];break}case"ArrowLeft":{const t=s.indexOf(e.currentTarget)-1;n=s[t]??s[s.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":t},n),children:o.map((e=>{let{value:n,label:t,attributes:r}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:i===n?0:-1,"aria-selected":i===n,ref:e=>s.push(e),onKeyDown:d,onClick:u,...r,className:(0,a.A)("tabs__item",b.tabItem,r?.className,{"tabs__item--active":i===n}),children:t??n},n)}))})}function j(e){let{lazy:n,children:t,selectedValue:r}=e;const l=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===r));return e?(0,i.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,i.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function y(e){const n=p(e);return(0,x.jsxs)("div",{className:(0,a.A)("tabs-container",b.tabList),children:[(0,x.jsx)(v,{...n,...e}),(0,x.jsx)(j,{...n,...e})]})}function w(e){const n=(0,m.A)();return(0,x.jsx)(y,{...e,children:d(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>o});var i=t(6540);const a={},r=i.createContext(a);function l(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);