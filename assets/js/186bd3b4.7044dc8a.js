"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[149],{8691:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>l,frontMatter:()=>i,metadata:()=>a,toc:()=>u});var r=t(4848),o=t(5680);const i={sidebar_position:2},s="Endpoints Customisation",a={id:"Advanced Configuration/Endpoint or Feature Customisation",title:"Endpoints Customisation",description:"You can selectively disable and remove endpoints and functionalities from Stirling PDF as per your requirements.",source:"@site/docs/Advanced Configuration/Endpoint or Feature Customisation.md",sourceDirName:"Advanced Configuration",slug:"/Advanced Configuration/Endpoint or Feature Customisation",permalink:"/Advanced Configuration/Endpoint or Feature Customisation",draft:!1,unlisted:!1,editUrl:"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/Endpoint or Feature Customisation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"UI Customisation",permalink:"/Advanced Configuration/UI Customisation"},next:{title:"Other Customisations",permalink:"/Advanced Configuration/Other Customisations"}},c={},u=[];function d(e){const n={a:"a",code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...(0,o.RP)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"endpoints-customisation",children:"Endpoints Customisation"}),"\n",(0,r.jsx)(n.p,{children:"You can selectively disable and remove endpoints and functionalities from Stirling PDF as per your requirements.\nThere are many use-cases for this such as"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Avoid confusion for users for functionality you/your business don't use."}),"\n",(0,r.jsx)(n.li,{children:"Running a reduced version of Stirling-PDF that doesn't have the necessary server power to support the more advanced features."}),"\n",(0,r.jsx)(n.li,{children:"Cleanup interface for features you don't use"}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["To do this ",(0,r.jsx)(n.code,{children:"ENDPOINTS_TO_REMOVE"})," and ",(0,r.jsx)(n.code,{children:"GROUPS_TO_REMOVE"})," have been setup.\nThey can include comma-separated lists of endpoints and groups to disable. For example, ",(0,r.jsx)(n.code,{children:"ENDPOINTS_TO_REMOVE=img-to-pdf,remove-pages"}),' would disable both the "image to PDF" and "remove pages" functionalities.\n',(0,r.jsx)(n.code,{children:"GROUPS_TO_REMOVE=Libre"})," Would disable a group of endpoints, in this case all endpoints which use Libre in the backend."]}),"\n",(0,r.jsxs)(n.p,{children:["A complete list of all endpoints and groups is available ",(0,r.jsx)(n.a,{href:"https://github.com/Stirling-Tools/Stirling-PDF/blob/main/Endpoint-groups.md",children:"here"}),".\nTODO?"]})]})}function l(e={}){const{wrapper:n}={...(0,o.RP)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},5680:(e,n,t)=>{t.d(n,{RP:()=>u});var r=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),u=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},l=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),p=u(t),f=o,m=p["".concat(c,".").concat(f)]||p[f]||d[f]||i;return t?r.createElement(m,s(s({ref:n},l),{},{components:t})):r.createElement(m,s({ref:n},l))}));l.displayName="MDXCreateElement"}}]);