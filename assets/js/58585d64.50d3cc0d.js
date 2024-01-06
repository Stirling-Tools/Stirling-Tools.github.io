"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[361],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=o,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||i;return n?r.createElement(f,a(a({ref:t},c),{},{components:n})):r.createElement(f,a({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,a[1]=l;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8169:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const i={sidebar_position:1},a="UI Customisation",l={unversionedId:"Advanced Configuration/UI Customisation",id:"Advanced Configuration/UI Customisation",title:"UI Customisation",description:"Stirling PDF allows straightforward customization of the application name to make Stirling-PDF your own",source:"@site/docs/Advanced Configuration/UI Customisation.md",sourceDirName:"Advanced Configuration",slug:"/Advanced Configuration/UI Customisation",permalink:"/docs/Advanced Configuration/UI Customisation",draft:!1,editUrl:"https://github.com/Frooodle/Stirling-PDF/tree/main/docs/Advanced Configuration/UI Customisation.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"How to add Configurations",permalink:"/docs/Advanced Configuration/How to add configurations"},next:{title:"Endpoints Customisation",permalink:"/docs/Advanced Configuration/Endpoint or Feature Customisation"}},s={},p=[{value:"Settings file",id:"settings-file",level:2},{value:"Local",id:"local",level:2},{value:"Docker",id:"docker",level:2},{value:"Docker run",id:"docker-run",level:3},{value:"Docker Compose",id:"docker-compose",level:3}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"ui-customisation"},"UI Customisation"),(0,o.kt)("p",null,"Stirling PDF allows straightforward customization of the application name to make Stirling-PDF your own\nThese are"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"appName")," This defines the visible application name showed in the window name and navbar if navbar is not defined separately "),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"homeDescription")," The description to be displayed on the homepage under the navbar that first greets the user"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"appNameNavbar")," The app name to be shown within to navbar for all pages")),(0,o.kt)("h2",{id:"settings-file"},"Settings file"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"ui:\n  appName: exampleAppName # Application's visible name\n  homeDescription: I am a description # Short description or tagline shown on homepage.\n  appNameNavbar: navbarName # Name displayed on the navigation bar\n")),(0,o.kt)("h2",{id:"local"},"Local"),(0,o.kt)("p",null,"If running Java directly, you can also pass these as properties using ",(0,o.kt)("inlineCode",{parentName:"p"},"-D")," arguments such as:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'java -jar Stirling-PDF.jar -DAPP_HOME_NAME="New Application Name"\n')),(0,o.kt)("p",null,"Alternatively you can set these via environment variables by running before starting the application"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'export UI_APP_NAME="Stirling PDF"\nexport UI_HOME_DESCRIPTION="Your locally hosted one-stop-shop for all your PDF needs."\nexport UI_APP_NAVBAR_NAME="Stirling PDF"\n')),(0,o.kt)("h2",{id:"docker"},"Docker"),(0,o.kt)("h3",{id:"docker-run"},"Docker run"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"-e UI_APP_NAME=Stirling PDF \\\n-e UI_HOME_DESCRIPTION=Your locally hosted one-stop-shop for all your PDF needs. \\\n-e UI_APP_NAVBAR_NAME=Stirling PDF \\\n")),(0,o.kt)("h3",{id:"docker-compose"},"Docker Compose"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"environment:\n  UI_APP_NAME: Stirling PDF\n  UI_HOME_DESCRIPTION: Your locally hosted one-stop-shop for all your PDF needs.\n  UI_APP_NAVBAR_NAME: Stirling PDF\n")))}d.isMDXComponent=!0}}]);