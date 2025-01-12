const a={BLOG:"blog",ABOUT:"about",RESUME:"resume"},i={[a.BLOG]:"src/data/blog/posts.json",[a.ABOUT]:"src/data/about/content.json",[a.RESUME]:"src/data/resume/content.json"};let s={};const u=async r=>{try{{const e=localStorage.getItem(`content_${r}`);if(e)try{const n=JSON.parse(e);return s[r]=n,n}catch(n){console.error(`Error parsing localStorage content for ${r}:`,n),localStorage.removeItem(`content_${r}`)}const c=await fetch(`/api/content/${r}`);if(c.ok){const n=await c.json();return s[r]=n,n}}const o=await fetch(i[r]);if(!o.ok)throw new Error(`HTTP error! status: ${o.status}`);const t=await o.json();if(r===a.BLOG&&!Array.isArray(t))throw new Error("Invalid blog data structure: expected an array");if(r===a.ABOUT&&(!t.sections||!Array.isArray(t.sections)))throw new Error("Invalid about data structure: expected an object with sections array");return s[r]=t,t}catch(o){console.error(`Error loading ${r} content:`,o);const t=r===a.BLOG?[]:{sections:[]};return s[r]=t,t}},l=async(r,o)=>{try{if(r===a.BLOG&&!Array.isArray(o))throw new Error("Blog content must be an array");if(r===a.ABOUT&&(!o.sections||!Array.isArray(o.sections)))throw new Error("About content must have a sections array");s[r]=o,localStorage.setItem(`content_${r}`,JSON.stringify(o));const t=await fetch("/api/save-content",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:r,content:o,path:i[r]})});if(!t.ok){const c=await t.json().catch(()=>({error:t.statusText}));throw new Error(`Failed to save content: ${c.error||t.statusText}`)}const e=await t.json();return console.log("Content saved successfully:",e),!0}catch(t){throw console.error(`Error saving ${r} content:`,t),t}},w=async r=>s[r]?s[r]:u(r);export{a as C,w as g,l as s};
