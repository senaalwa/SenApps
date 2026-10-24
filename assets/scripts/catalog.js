(() => {
  "use strict";
  const base = new URL("../../", document.currentScript.src);
  const grid = document.getElementById("app-grid");
  const status = document.getElementById("catalog-status");
  const search = document.getElementById("app-search");
  const filter = document.getElementById("category-filter");
  const labels = {"in-development":"Dalam Pengembangan",testing:"Dalam Pengujian",released:"Tersedia",maintenance:"Dalam Pemeliharaan"};
  let apps = [];
  const el = (tag, cls, text) => { const n=document.createElement(tag); if(cls)n.className=cls; if(text!=null)n.textContent=String(text); return n; };
  function url(value) {
    if(typeof value!=="string"||!value.trim())return null;
    try { const u=/^https?:\/\//i.test(value)?new URL(value):new URL(value.replace(/^\/+/, ""),base); return ["http:","https:"].includes(u.protocol)&&(u.origin!==base.origin||u.pathname.startsWith(base.pathname))?u.href:null; } catch { return null; }
  }
  function icon(app) {
    const box=el("div","app-icon"), fallback=el("span","app-icon-fallback",(app.name.trim()[0]||"?").toUpperCase());
    box.append(fallback); const src=url(app.icon);
    if(src){const img=el("img","app-icon-image");img.src=src;img.alt="";img.loading="lazy";img.addEventListener("load",()=>fallback.remove());img.addEventListener("error",()=>img.remove());box.append(img);}
    return box;
  }
  function addLink(parent,path,label,cls) { const href=url(path);if(!href)return false;const a=el("a",cls,label);a.href=href;parent.append(a);return true; }
  function card(app) {
    const root=el("article","app-card"), body=el("div","app-card-content"), meta=el("div","app-card-meta");
    root.append(icon(app)); if(app.category)meta.append(el("span","category-tag",app.category));
    meta.append(el("span","status-tag",labels[app.status]||"Status belum dikonfirmasi"));
    body.append(meta,el("h2","app-card-title",app.name));
    if(app.shortDescription)body.append(el("p","app-card-description",app.shortDescription));
    const platforms=Array.isArray(app.platforms)?app.platforms.filter(Boolean):[];
    if(platforms.length)body.append(el("p","app-platforms",platforms.join(" · ")));
    const actions=el("div","app-card-actions");
    addLink(actions,app.detailPage,"Lihat detail","button primary small");
    addLink(actions,app.privacyPolicy,"Kebijakan privasi","text-link");
    const play=url(app.playStoreUrl);
    if(play&&new URL(play).hostname==="play.google.com"&&new URL(play).pathname.startsWith("/store/apps/details")){const a=el("a","button small","Google Play");a.href=play;a.target="_blank";a.rel="noopener noreferrer";actions.append(a);}
    if(actions.childElementCount)body.append(actions);
    root.append(body);return root;
  }
  function render() {
    const query=search.value.trim().toLocaleLowerCase("id"),category=filter.value;
    const found=apps.filter(a=>!category||a.category===category).filter(a=>!query||[a.name,a.category,a.shortDescription,a.description].some(v=>typeof v==="string"&&v.toLocaleLowerCase("id").includes(query))).sort((a,b)=>Number(Boolean(b.featured))-Number(Boolean(a.featured))||a.name.localeCompare(b.name,"id"));
    grid.replaceChildren(...found.map(card));
    status.textContent=found.length?found.length+" aplikasi ditemukan.":"Tidak ada aplikasi yang cocok. Coba kata kunci atau kategori lain.";
  }
  async function init() {
    try {
      const response=await fetch(new URL("data/apps.json",base),{headers:{Accept:"application/json"}});
      if(!response.ok)throw new Error("HTTP "+response.status);
      const data=await response.json();if(!data||!Array.isArray(data.apps))throw new Error("Format data katalog tidak valid.");
      const ids=new Set();
      apps=data.apps.filter(a=>{if(!a||typeof a.id!=="string"||!a.id.trim()||typeof a.name!=="string"||!a.name.trim())return false;if(ids.has(a.id)){console.warn("ID aplikasi duplikat diabaikan:",a.id);return false;}ids.add(a.id);return true;});
      [...new Set(apps.map(a=>a.category).filter(v=>typeof v==="string"&&v.trim()))].sort((a,b)=>a.localeCompare(b,"id")).forEach(v=>{const o=el("option","",v);o.value=v;filter.append(o);});
      search.addEventListener("input",render);filter.addEventListener("change",render);render();
    } catch(error) {
      console.error("Gagal memuat katalog SenApps:",error);grid.replaceChildren();status.textContent="Katalog belum dapat dimuat. Muat ulang halaman atau hubungi senaalwaa@gmail.com.";status.classList.add("catalog-error");
    }
  }
  init();
})();