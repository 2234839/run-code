export function __vite_legacy_guard(){import("data:text/javascript,")}import{d as e,r as t,o as r,w as s,c as a,a as n,t as o,b as i,n as l,P as u,e as c,u as d,f as p,g as v,h as m,i as f,F as g,j as y,k as b,l as S,L as h,m as U,p as N,q as j,s as k,v as O}from"./vendor.e24328d9.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var L=e({props:{source:{type:String,default:""}},setup(e){const c=e,d=t(null);return r((()=>{s((()=>(l((()=>{u.highlightElement(d.value)})),c.source)))})),(e,t)=>(i(),a("pre",null,[n("code",{ref:(e,t)=>{t.code=e,d.value=e},class:"language-javascript"},o(c.source),513)]))}});function w(e,t){const r={};for(const s in e)r[s]=c({get:()=>e[s],set(e){t(`update:${s}`,e)}});return r}const q=["data-gutter"];var B=e({props:{inside:{type:String,default:"inside",required:!0},source:{type:String,default:""},title:{type:String,default:""},preamble:{type:String,default:""},version:{type:String,default:"16.6.0"}},emits:["update:inside","update:source","update:title","update:preamble","update:version","update:loading"],setup(e,{emit:o}){const l=e,{inside:u,source:p,title:v,preamble:m,version:f}=w(l,o),g=t(null),y=c({get:()=>f.value.trim().split(".").map(((e,t)=>0===t?e:"x")).join("."),set(e){f.value=e}});return o("update:loading",!0),r((async()=>{const e=window.RunKit.createNotebook({element:g.value,preamble:m.value,title:v.value,gutterStyle:u.value,source:p.value,nodeVersion:y.value});e.onLoad=async t=>{o("update:loading",!1),e.evaluate()},e.onSave=async()=>{e.getSource().then((e=>p.value=e)),e.getNodeVersion().then((e=>y.value=e))},s((()=>e.setSource(p.value))),s((()=>e.setTitle(v.value))),s((()=>e.setPreamble(m.value))),s((()=>e.setNodeVersion(y.value)))})),(e,t)=>(i(),a("pre",{class:"embed","data-gutter":d(u)},[n("div",{ref:(e,t)=>{t.element=e,g.value=e}},null,512)],8,q))}}),E=e({props:{inside:{type:String,default:"inside",required:!0},source:{type:String,default:""},title:{type:String,default:""},preamble:{type:String,default:""},version:{type:String,default:"16.6.0"}},emits:["update:inside","update:source","update:title","update:preamble","update:version"],setup(e,{emit:r}){const s=e,{inside:n,source:o,title:l,preamble:u,version:c}=w(s,r),y=t(!0);return(e,t)=>(i(),a(g,null,[y.value?(i(),p(L,{key:0,source:d(o)},null,8,["source"])):v("",!0),m(B,{source:d(o),"onUpdate:source":t[0]||(t[0]=e=>f(o)?o.value=e:null),inside:d(n),"onUpdate:inside":t[1]||(t[1]=e=>f(n)?n.value=e:null),title:d(l),"onUpdate:title":t[2]||(t[2]=e=>f(l)?l.value=e:null),preamble:d(u),"onUpdate:preamble":t[3]||(t[3]=e=>f(u)?u.value=e:null),version:d(c),"onUpdate:version":t[4]||(t[4]=e=>f(c)?c.value=e:null),"onUpdate:loading":t[5]||(t[5]=e=>y.value=e)},null,8,["source","inside","title","preamble","version"])],64))}});const J=O(e({setup(e){k.apiCache=!0;const t=y({source:"",inside:"inside",title:"",preamble:"",version:"16.6.0"});return b((async()=>{const e=S(),[r,a]=function(e=document.location.toString(),t){const r=new URL(e),s=r.searchParams,a=y(t);s.forEach(((e,t)=>{try{a[t]=atob(e)}catch(r){a[t]=e}}));const n=c((()=>(Object.keys(a).forEach((e=>{const t=btoa(a[e]||"");s.set(e,t)})),r.href)));return[a,n]}(void 0,{code:"{}"});s((()=>history.replaceState("","",a.value))),Object.assign(t,JSON.parse(h.decompressFromBase64(r.code)||"{}")),s((()=>{r.code=h.compressToBase64(JSON.stringify(t))})),e?(U.getBlockAttr(e,"custom-config").then((e=>{if(e){const r=N(e.value);r?Object.assign(t,JSON.parse(r)):console.error("decode 失败, code:",e.value)}})).catch((e=>{console.error("查询config失败",e)})),j()===j.env.siYuan&&s((()=>{U.setBlockAttrs({id:S(),attrs:{"custom-config":JSON.stringify(t)}}).then((e=>{}))}))):console.error("获取当前挂件快id失败，不再尝试调用思源 api 保存代码")})),(e,r)=>(i(),p(E,{source:d(t).source,"onUpdate:source":r[0]||(r[0]=e=>d(t).source=e),inside:d(t).inside,"onUpdate:inside":r[1]||(r[1]=e=>d(t).inside=e),title:d(t).title,"onUpdate:title":r[2]||(r[2]=e=>d(t).title=e),preamble:d(t).preamble,"onUpdate:preamble":r[3]||(r[3]=e=>d(t).preamble=e),version:d(t).version,"onUpdate:version":r[4]||(r[4]=e=>d(t).version=e)},null,8,["source","inside","title","preamble","version"]))}}));J.mount("#app"),J.config;
//# sourceMappingURL=index.efc02640.js.map