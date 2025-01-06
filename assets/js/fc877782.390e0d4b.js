"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1861],{4133:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>u,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"Advanced Configuration/External DB","title":"External DB","description":"Stirling PDF allows straightforward customization of the application name to make Stirling-PDF your own","source":"@site/docs/Advanced Configuration/External DB.md","sourceDirName":"Advanced Configuration","slug":"/Advanced Configuration/External DB","permalink":"/Advanced Configuration/External DB","draft":false,"unlisted":false,"editUrl":"https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/docs/Advanced Configuration/External DB.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Frequently Asked Questions","permalink":"/FAQ"},"next":{"title":"How to add Configurations","permalink":"/Advanced Configuration/How to add configurations"}}');var a=t(4848),o=t(8453),l=t(1470),i=t(9365);const s={sidebar_position:1},u="External DB",c={},d=[{value:"Configurations Examples",id:"configurations-examples",level:2}];function p(e){const n={code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"external-db",children:"External DB"})}),"\n",(0,a.jsx)(n.p,{children:"Stirling PDF allows straightforward customization of the application name to make Stirling-PDF your own\nThese are"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"appName"})," This defines the visible application name showed in the window name and navbar if navbar is not defined separately"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"homeDescription"})," The description to be displayed on the homepage under the navbar that first greets the user"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"appNameNavbar"})," The app name to be shown within to navbar for all pages"]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"configurations-examples",children:"Configurations Examples"}),"\n",(0,a.jsxs)(l.A,{groupId:"config-methods",children:[(0,a.jsx)(i.A,{value:"settings",label:"Settings File",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"ui:\n  appName: exampleAppName # Application's visible name\n  homeDescription: I am a description # Short description or tagline shown on homepage.\n  appNameNavbar: navbarName # Name displayed on the navigation bar\n"})})}),(0,a.jsxs)(i.A,{value:"local",label:"Local Environment",children:[(0,a.jsx)(n.p,{children:"You can configure the UI elements in two ways when running locally:"}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"Option 1: Using Java Properties"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'java -jar Stirling-PDF.jar -DAPP_HOME_NAME="New Application Name"\n'})}),(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:"Option 2: Using Environment Variables"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'export UI_APP_NAME="Stirling PDF"\nexport UI_HOME_DESCRIPTION="Your locally hosted one-stop-shop for all your PDF needs."\nexport UI_APP_NAVBAR_NAME="Stirling PDF"\n'})})]}),(0,a.jsx)(i.A,{value:"docker-run",label:"Docker Run",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"-e UI_APP_NAME=Stirling PDF \\\n-e UI_HOME_DESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs. \\\n-e UI_APP_NAVBAR_NAME=Stirling PDF \\\n"})})}),(0,a.jsx)(i.A,{value:"docker-compose",label:"Docker Compose",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",children:"environment:\n  UI_APP_NAME: Stirling PDF\n  UI_HOME_DESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.\n  UI_APP_NAVBAR_NAME: Stirling PDF\n"})})})]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>l});t(6540);var r=t(4164);const a={tabItem:"tabItem_Ymn6"};var o=t(4848);function l(e){let{children:n,hidden:t,className:l}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.A)(a.tabItem,l),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>y});var r=t(6540),a=t(4164),o=t(3104),l=t(6347),i=t(205),s=t(7485),u=t(1682),c=t(679);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:a}}=e;return{value:n,label:t,attributes:r,default:a}}))}(t);return function(e){const n=(0,u.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function h(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const a=(0,l.W6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,s.aZ)(o),(0,r.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(a.location.search);n.set(o,e),a.replace({...a.location,search:n.toString()})}),[o,a])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,o=p(e),[l,s]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:o}))),[u,d]=m({queryString:t,groupId:a}),[f,b]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,o]=(0,c.Dv)(t);return[a,(0,r.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:a}),g=(()=>{const e=u??f;return h({value:e,tabValues:o})?e:null})();(0,i.A)((()=>{g&&s(g)}),[g]);return{selectedValue:l,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);s(e),d(e),b(e)}),[d,b,o]),tabValues:o}}var b=t(2303);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=t(4848);function x(e){let{className:n,block:t,selectedValue:r,selectValue:l,tabValues:i}=e;const s=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.a_)(),c=e=>{const n=e.currentTarget,t=s.indexOf(n),a=i[t].value;a!==r&&(u(n),l(a))},d=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=s.indexOf(e.currentTarget)+1;n=s[t]??s[0];break}case"ArrowLeft":{const t=s.indexOf(e.currentTarget)-1;n=s[t]??s[s.length-1];break}}n?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:o}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>s.push(e),onKeyDown:d,onClick:c,...o,className:(0,a.A)("tabs__item",g.tabItem,o?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function A(e){let{lazy:n,children:t,selectedValue:o}=e;const l=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==o})))})}function j(e){const n=f(e);return(0,v.jsxs)("div",{className:(0,a.A)("tabs-container",g.tabList),children:[(0,v.jsx)(x,{...n,...e}),(0,v.jsx)(A,{...n,...e})]})}function y(e){const n=(0,b.A)();return(0,v.jsx)(j,{...e,children:d(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>i});var r=t(6540);const a={},o=r.createContext(a);function l(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);