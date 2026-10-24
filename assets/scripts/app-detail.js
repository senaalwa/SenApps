(() => {
  "use strict";
  const base=new URL("../../",document.currentScript.src),mount=document.getElementById("app-detail"),id=mount.dataset.appId;
  const labels={"in-development":"Dalam Pengembangan",testing:"Dalam Pengujian",released:"Tersedia",maintenance:"Dalam Pemeliharaan"};
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=String(text);return n;};
  function url(value){if(typeof value!=="string"||!value.trim())return null;try{const u=/^https?:\/\//i.test(value)?new URL(value):new URL(value.replace(/^\/+/, ""),base);return["http:","https:"].includes(u.protocol)&&(u.origin!==base.origin||u.pathname.startsWith(base.pathname))?u.href:null;}catch{return null;}}
  function icon(app){const box=el("div","detail-icon"),fallback=el("span","app-icon-fallback",(app.name.trim()[0]||"?").toUpperCase());box.append(fallback);const src=url(app.icon);if(src){const img=el("img","app-icon-image");img.src=src;img.alt="";img.loading="lazy";img.addEventListener("load",()=>fallback.remove());img.addEventListener("error",()=>img.remove());box.append(img);}return box;}
  function section(title,content){const s=el("section","detail-section");s.append(el("h2","",title),content);mount.append(s);}
  function render(app){
    document.title=app.name+" — SenApps";
    const meta=document.querySelector('meta[name="description"]');if(meta&&app.description)meta.content=app.description;
    mount.replaceChildren();
    const crumbs=el("nav","detail-breadcrumbs");crumbs.setAttribute("aria-label","Breadcrumb");
    const home=el("a","","SenApps");home.href=base.href;const catalog=el("a","","Aplikasi");catalog.href=new URL("apps/",base).href;
    crumbs.append(home,el("span","","/"),catalog,el("span","","/"),el("span","",app.name));mount.append(crumbs);
    const hero=el("section","detail-hero"),copy=el("div","detail-hero-content");hero.append(icon(app));
    if(app.category)copy.append(el("span","category-tag",app.category));
    copy.append(el("h1","",app.name));if(app.shortDescription)copy.append(el("p","detail-lead",app.shortDescription));
    copy.append(el("p","detail-status",labels[app.status]||"Status belum dikonfirmasi"));
    const actions=el("div","detail-actions"),play=url(app.playStoreUrl);
    if(play&&new URL(play).hostname==="play.google.com"&&new URL(play).pathname.startsWith("/store/apps/details")){const a=el("a","button primary","Lihat di Google Play");a.href=play;a.target="_blank";a.rel="noopener noreferrer";actions.append(a);}else actions.append(el("span","detail-unavailable","Tautan Google Play belum tersedia."));
    const privacy=url(app.privacyPolicy);if(privacy){const a=el("a","button","Kebijakan privasi");a.href=privacy;actions.append(a);}
    copy.append(actions);hero.append(copy);mount.append(hero);
    if(app.description)section("Tentang aplikasi",el("p","detail-copy",app.description));
    const features=Array.isArray(app.features)?app.features.filter(v=>typeof v==="string"&&v.trim()):[];
    if(features.length){const ul=el("ul","feature-list");features.forEach(v=>ul.append(el("li","",v)));section("Fitur",ul);}
    const shots=Array.isArray(app.screenshots)?app.screenshots.filter(v=>typeof v==="string"&&url(v)):[],gallery=el("div","screenshot-grid");
    shots.forEach((path,i)=>{const figure=el("figure","screenshot-item"),img=el("img");img.src=url(path);img.alt="Tangkapan layar "+app.name+", "+(i+1);img.loading="lazy";figure.append(img);gallery.append(figure);});
    section("Tangkapan layar",shots.length?gallery:el("p","detail-unavailable","Screenshot belum tersedia."));
    const facts=el("dl","detail-facts"),platforms=Array.isArray(app.platforms)?app.platforms.filter(v=>typeof v==="string"&&v.trim()):[];
    facts.append(el("dt","","Status"),el("dd","",labels[app.status]||"Status belum dikonfirmasi"),el("dt","","Platform"),el("dd","",platforms.length?platforms.join(", "):"Belum dikonfirmasi"));section("Informasi aplikasi",facts);
    const email=typeof app.supportEmail==="string"&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(app.supportEmail)?app.supportEmail:"senaalwaa@gmail.com",contact=el("p","detail-copy","Butuh bantuan? Hubungi tim SenApps. "),link=el("a","",email);link.href="mailto:"+email;contact.append(link);section("Dukungan",contact);
    const back=el("a","detail-back","← Kembali ke katalog aplikasi");back.href=new URL("apps/",base).href;mount.append(back);
  }
  async function init(){try{const response=await fetch(new URL("data/apps.json",base),{headers:{Accept:"application/json"}});if(!response.ok)throw new Error("HTTP "+response.status);const data=await response.json();if(!data||!Array.isArray(data.apps))throw new Error("Format data katalog tidak valid.");const app=data.apps.find(v=>v&&v.id===id);if(!app)throw new Error("Aplikasi "+id+" tidak ditemukan.");render(app);}catch(error){console.error("Gagal memuat detail aplikasi:",error);mount.replaceChildren(el("p","catalog-error","Informasi aplikasi belum dapat dimuat. Muat ulang halaman atau hubungi senaalwaa@gmail.com."));}}
  init();
})();