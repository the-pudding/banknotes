const a="modulepreload",o={},u="/banknotes/_app/",f=function(s,r){return!r||r.length===0?s():Promise.all(r.map(e=>{if(e=`${u}${e}`,e in o)return;o[e]=!0;const n=e.endsWith(".css"),i=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${i}`))return;const t=document.createElement("link");if(t.rel=n?"stylesheet":a,n||(t.as="script",t.crossOrigin=""),t.href=e,document.head.appendChild(t),n)return new Promise((c,l)=>{t.addEventListener("load",c),t.addEventListener("error",l)})})).then(()=>s())};export{f as _};
