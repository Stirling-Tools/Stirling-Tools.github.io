"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[769],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=c(n),m=r,f=p["".concat(l,".").concat(m)]||p[m]||d[m]||i;return n?o.createElement(f,a(a({ref:t},u),{},{components:n})):o.createElement(f,a({ref:t},u))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:r,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4755:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var o=n(7462),r=(n(7294),n(3905));const i={sidebar_position:3},a="Other Customisations",s={unversionedId:"Advanced Configuration/Other Customisations",id:"Advanced Configuration/Other Customisations",title:"Other Customisations",description:"Stirling PDF offers various other customisation options, such as:",source:"@site/docs/Advanced Configuration/Other Customisations.md",sourceDirName:"Advanced Configuration",slug:"/Advanced Configuration/Other Customisations",permalink:"/docs/Advanced Configuration/Other Customisations",draft:!1,editUrl:"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/Other Customisations.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Endpoints Customisation",permalink:"/docs/Advanced Configuration/Endpoint or Feature Customisation"},next:{title:"OCR (Optical Character Recognition)",permalink:"/docs/Advanced Configuration/OCR"}},l={},c=[{value:"Defaulting Language",id:"defaulting-language",level:3},{value:"Google Search Visability (robots.txt)",id:"google-search-visability-robotstxt",level:3},{value:"Custom Root path",id:"custom-root-path",level:3}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"other-customisations"},"Other Customisations"),(0,r.kt)("p",null,"Stirling PDF offers various other customisation options, such as:"),(0,r.kt)("h3",{id:"defaulting-language"},"Defaulting Language"),(0,r.kt)("p",null,"Default language selection via the ",(0,r.kt)("inlineCode",{parentName:"p"},"APP_LOCALE")," environment variable. Accepted values include ",(0,r.kt)("inlineCode",{parentName:"p"},"de-DE"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"fr-FR"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ar-AR")," and all other languages codes that are within Stirling-PDFs current list."),(0,r.kt)("h3",{id:"google-search-visability-robotstxt"},"Google Search Visability (robots.txt)"),(0,r.kt)("p",null,"Enable or disable search engine visibility with the ",(0,r.kt)("inlineCode",{parentName:"p"},"ALLOW_GOOGLE_VISIBILITY")," variable."),(0,r.kt)("h3",{id:"custom-root-path"},"Custom Root path"),(0,r.kt)("p",null,"Redirect the root path of the application using ",(0,r.kt)("inlineCode",{parentName:"p"},"APP_ROOT_PATH"),".\nThis is for changing websites like stirlingtools.com to instead host the interface at stirlingtools.com/{APP_ROOT_PATH} like stirlingtools.com/demo"))}d.isMDXComponent=!0}}]);