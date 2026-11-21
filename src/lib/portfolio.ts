// @ts-nocheck
// Interactive behavior (theme, navigation, research network, filters, citation copy, dialogs, contact form).
export function initPortfolio(DATA){

const $=s=>document.querySelector(s),el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!==undefined)e.textContent=h;return e};
// theme
const root=document.documentElement;
$("#theme").onclick=()=>{const dark=getComputedStyle(root).colorScheme==="dark";root.dataset.theme=dark?"light":"dark";try{localStorage.setItem("theme",root.dataset.theme)}catch(e){}};
// socials, cv, mail
Object.entries(DATA.links).forEach(([k,u])=>{if(!u)return;const a=el("a","",k);a.href=u;a.target="_blank";a.rel="noopener noreferrer";$("#soc").append(a)});
if(DATA.photo){const ph=$("#ph"),im=new Image();im.alt="Md Rayhan Hossain";im.onload=()=>{ph.textContent="";ph.append(im)};im.src=DATA.photo}
if(DATA.cvUrl){$("#cv").href=DATA.cvUrl}else{$("#cv").style.display="none"}
if(DATA.email){$("#mail").href="mailto:"+DATA.email;$("#mailnote").textContent=DATA.email}else{$("#mailnote").textContent=""}
// network
const N={ai:["Artificial intelligence",110,60,"Applying AI methods to business problems such as forecasting and customer value."],
ml:["Machine learning",210,120,"Models that learn from data, including classification and sequence models."],
pa:["Predictive analytics",330,70,"Forecasting outcomes such as churn, demand, and customer value."],
ma:["Marketing analytics",90,200,"Measuring campaign performance, funnels, segmentation, and ROI."],
cb:["Customer behavior",200,250,"How customers buy, return, and respond across channels."],
clv:["Customer lifetime value",340,220,"Estimating the long-run value of a customer relationship."],
bi:["Business intelligence",90,340,"Reporting and KPI tracking that supports decisions."],
dv:["Data visualization",210,360,"Dashboards and visuals that make analysis usable."],
dm:["Decision-making",330,340,"Turning analysis into evidence-based action."],
he:["Higher education analytics",440,130,"Analytics on student engagement and institutional resources."],
se:["Student engagement",440,230,"Understanding how students use programs and resources."],
pm:["Predictive modeling",440,320,"Building models to anticipate student and customer outcomes."]};
const E=[["ai","ml"],["ml","pa"],["ma","cb"],["cb","clv"],["bi","dv"],["dv","dm"],["he","se"],["se","pm"],["pa","clv"],["ml","cb"],["pa","pm"]];
const ns="http://www.w3.org/2000/svg",S=(t,a)=>{const e=document.createElementNS(ns,t);for(const k in a)e.setAttribute(k,a[k]);return e};
E.forEach(([a,b])=>$("#edges").append(S("line",{class:"edge","data-a":a,"data-b":b,x1:N[a][1],y1:N[a][2],x2:N[b][1],y2:N[b][2]})));
function pick(id){document.querySelectorAll(".node").forEach(n=>n.classList.toggle("on",n.dataset.id===id));
document.querySelectorAll(".edge").forEach(e=>e.classList.toggle("on",e.dataset.a===id||e.dataset.b===id));
$("#nt").textContent=N[id][0];$("#nd").textContent=N[id][3]}
Object.entries(N).forEach(([id,[t,x,y]])=>{const g=S("g",{class:"node","data-id":id,tabindex:0,role:"button","aria-label":t});
g.append(S("circle",{cx:x,cy:y,r:9}));const tx=S("text",{x:x,y:y+25,"text-anchor":"middle"});tx.textContent=t;g.append(tx);
g.onclick=()=>pick(id);g.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(id)}};$("#nodes").append(g)});
// projects
const cats=["All",...new Set(DATA.projects.filter(p=>DATA.projectDetails[p[0]]).map(p=>p[1]))];let cur="All";
function drawP(){const tl=$("#tool").value,D=DATA.projectDetails;$("#plist").replaceChildren(...DATA.projects.filter(p=>D[p[0]]&&(cur==="All"||p[1]===cur)&&(!tl||(D[p[0]]&&D[p[0]].tools&&D[p[0]].tools.includes(tl)))).map(p=>{const li=el("li");const b=el("button","pl",p[0]);b.setAttribute("aria-haspopup","dialog");li.onclick=()=>openP(p[0]);li.append(b,el("span","mono",p[1]+(D[p[0]]?"":" · details coming")));return li}))}
cats.forEach(c=>{const b=el("button","chip",c);b.setAttribute("aria-pressed",c===cur);b.onclick=()=>{cur=c;document.querySelectorAll(".chip").forEach(x=>x.setAttribute("aria-pressed",x===b));drawP()};$("#chips").append(b)});drawP();
// skills
Object.entries(DATA.skills).forEach(([k,v])=>{const d=el("details");d.append(el("summary","",k));const u=el("ul");v.forEach(i=>u.append(el("li","",i)));d.append(u);$("#skillgrid").append(d)});
// credentials
DATA.credentials.forEach(c=>{const d=el("div","cred");d.append(el("h3","",c.title),el("p","mono",c.issuer+" · "+c.date),el("p","",c.note));
if(c.url){const a=el("a","","Verify credential");a.href=c.url;a.target="_blank";a.rel="noopener noreferrer";d.append(a)}$("#creds").append(d)});

// publications
const P=DATA.publications;
const ini=a=>a[0].split(" ").map(w=>w[0]+".").join(" ");
const apa=p=>{const a=p.authors.map(x=>x[1]+", "+ini(x)),au=a.length>1?a.slice(0,-1).join(", ")+", & "+a[a.length-1]:a[0];return `${au} (${p.year}). ${p.title}. ${p.journal}, ${p.volume}, ${p.article}. https://doi.org/${p.doi}`};
const bib=p=>`@article{${p.authors[0][1].toLowerCase()}${p.year},
  author = {${p.authors.map(x=>x[1]+", "+x[0]).join(" and ")}},
  title = {${p.title}},
  journal = {${p.journal}},
  year = {${p.year}},
  volume = {${p.volume}},
  pages = {${p.article}},
  doi = {${p.doi}}
}`;
function copy(t,b){const o=b.textContent,done=()=>{b.textContent="Copied";setTimeout(()=>{b.textContent=o},1500)};
 const fb=()=>{const ta=el("textarea");ta.value=t;document.body.append(ta);ta.select();try{document.execCommand("copy");done()}catch(e){}ta.remove()};
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,fb)}else{fb()}}
function link(t,h,c){const a=el("a",c||"btn",t);a.href=h;a.target="_blank";a.rel="noopener noreferrer";return a}
function card(p){const c=el("article","pubcard");
 c.append(el("span","mono",`${p.journal} · ${p.section} · ${p.type} · Vol. ${p.volume} · ${p.date}`),el("h3","",p.title));
 const au=el("p","au");p.authors.forEach((x,i)=>{const n=x[0]+" "+x[1]+(x[2]?"*":"");au.append(x[0]==="Md Rayhan"&&x[1]==="Hossain"?el("b","",n):document.createTextNode(n),i<p.authors.length-1?", ":"")});c.append(au);
 if(p.authors.some(x=>x[2]))c.append(el("p","mono","* corresponding author"));
 const tg=el("div","tags");p.topics.forEach(t=>tg.append(el("span","",t)));c.append(tg);
 const d=el("details");d.append(el("summary","","Abstract summary"),el("p","",p.abstract));c.append(d);
 const ac=el("div","acts");ac.append(link("DOI","https://doi.org/"+p.doi),link("Publisher page",p.url));
 const a1=el("button","btn","Copy APA"),a2=el("button","btn","Copy BibTeX");a1.onclick=()=>copy(apa(p),a1);a2.onclick=()=>copy(bib(p),a2);ac.append(a1,a2);c.append(ac);return c}
const yr=$("#yr"),tp=$("#tp"),q=$("#q");
yr.append(new Option("All years",""));[...new Set(P.map(p=>p.year))].sort().reverse().forEach(y=>yr.append(new Option(y,y)));
tp.append(new Option("All topics",""));[...new Set(P.flatMap(p=>p.topics))].sort().forEach(t=>tp.append(new Option(t,t)));
function drawPubs(){const s=q.value.toLowerCase().trim();
 const L=P.filter(p=>(!yr.value||String(p.year)===yr.value)&&(!tp.value||p.topics.includes(tp.value))&&(!s||(p.title+" "+p.authors.map(a=>a[0]+" "+a[1]).join(" ")+" "+p.topics.join(" ")+" "+p.abstract).toLowerCase().includes(s)));
 $("#pubs").replaceChildren(...(L.length?L.map(card):[el("p","lead","No publications match. Clear the search or choose All.")]))}
[q,yr,tp].forEach(x=>x.addEventListener("input",drawPubs));drawPubs();
const M=[[P.length,"Publications"],[new Set(P.flatMap(p=>p.topics)).size,"Research topics"]];
if(DATA.metrics.citations!=null)M.push([DATA.metrics.citations,"Citations ("+DATA.metrics.source+")"]);
if(DATA.metrics.hIndex!=null)M.push([DATA.metrics.hIndex,"h-index ("+DATA.metrics.source+")"]);
M.forEach(([n,l])=>{const t=el("div","mtile");t.append(el("b","",String(n)),el("span","",l));$("#metrics").append(t)});
const pf=["Google Scholar","ORCID","ResearchGate"].filter(k=>DATA.links[k]);
if(pf.length){pf.forEach((k,i)=>{$("#profs").append(link(k,DATA.links[k],""),i<pf.length-1?" · ":"")})}else{$("#profs").textContent="Add your Google Scholar, ORCID, and ResearchGate links in DATA.links."}
// project details
const dlg=$("#pd"),LBL={overview:"Project overview",problem:"Business problem",question:"Research question",dataset:"Dataset",method:"Methodology",process:"Analytical process"};
function sec(t,node){const s=el("div","pds");s.append(el("h4","",t),node);return s}
function openP(name){const d=DATA.projectDetails[name]||{},b=$("#pdb");$("#pdt").textContent=name;b.replaceChildren();
 if(!Object.keys(d).length)b.append(el("p","lead","Details are not added yet. Add them in DATA.projectDetails using this exact project title."));
 Object.entries(LBL).forEach(([k,t])=>{if(d[k])b.append(sec(t,el("p","",d[k])))});
 if(d.tools&&d.tools.length){const g=el("div","tags");d.tools.forEach(x=>g.append(el("span","",x)));b.append(sec("Tools",g))}
 [["findings","Key findings"],["recommendations","Business recommendations"]].forEach(([k,t])=>{const a=(d[k]||[]).filter(Boolean);if(a.length){const u=el("ul");a.forEach(x=>u.append(el("li","",x)));b.append(sec(t,u))}});
 const im=(d.images||[]).filter(Boolean);if(im.length){const w=el("div");im.forEach(s=>{const i=el("img");i.src=s;i.alt="Dashboard screenshot: "+name;w.append(i)});b.append(sec("Dashboard screenshots",w))}
 const ln=[["github","GitHub repository"],["live","Live dashboard"],["docs","Documentation"]].filter(x=>d[x[0]]);
 if(ln.length){const w=el("div","acts");ln.forEach(([k,t])=>w.append(link(t,d[k])));b.append(w)}
 dlg.showModal()}
$("#pdx").onclick=()=>dlg.close();dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
const tools=[...new Set(Object.values(DATA.projectDetails).flatMap(d=>d.tools||[]))].sort(),ts=$("#tool");
if(tools.length){ts.hidden=false;ts.append(new Option("All tools",""));tools.forEach(t=>ts.append(new Option(t,t)));ts.addEventListener("input",drawP)}
// dashboard lab
DATA.dashboards.forEach(d=>{const c=el("article","labcard");c.append(el("h3","",d.title));const bx=el("div","embed");
 if(d.embedUrl){const f=el("iframe");f.src=d.embedUrl;f.title=d.title;f.loading="lazy";f.setAttribute("allowfullscreen","");bx.append(f)}else if(d.preview){const i=el("img");i.src=d.preview;i.alt=d.title+" preview";bx.append(i)}
 if(bx.firstChild)c.append(bx);
 [["description",""],["source","Data source: "],["method","Method: "]].forEach(([k,t])=>{if(d[k])c.append(el("p","",t+d[k]))});
 const ac=el("div","acts");if(bx.firstChild){const fs=el("button","btn","Full screen");fs.onclick=()=>{if(bx.requestFullscreen)bx.requestFullscreen()};ac.append(fs)}
 if(d.url)ac.append(link("Open on Tableau Public",d.url));c.append(ac);$("#labgrid").append(c)});

// cv center and professional development
const drop=id=>{const s=document.getElementById(id);if(s)s.remove();document.querySelectorAll('a[href="#'+id+'"]').forEach(a=>a.remove())};
DATA.cvFiles.filter(f=>f.url).forEach(f=>{const d=el("div","cred");d.append(el("h3","",f.label),el("p","",f.desc),link("Download PDF",f.url));$("#cvgrid").append(d)});
if(!DATA.cvFiles.some(f=>f.url))drop("cvcenter");
const fc=DATA.cvFiles.find(f=>f.url);if(fc&&!DATA.cvUrl){$("#cv").href=fc.url;$("#cv").style.display=""}
DATA.development.forEach(x=>{const d=el("div","cred");d.append(el("h3","",x.title),el("p","mono",[x.type,x.org,x.date].filter(Boolean).join(" · ")));if(x.url)d.append(link("View",x.url));$("#devgrid").append(d)});
if(!DATA.development.length)drop("development");
// insights and contact inquiries
const AR=DATA.articles,ic=$("#icat"),iq=$("#iq");
ic.append(new Option("All categories",""));[...new Set(AR.map(a=>a.category))].sort().forEach(c=>ic.append(new Option(c,c)));
function note(t,h){const d=el("div","cred empty");d.append(el("h3","",t),el("p","",h));return d}
function drawI(){const s=iq.value.toLowerCase().trim(),c=ic.value;
 if(!AR.length){drop("insights");return}
 const L=AR.filter(a=>(!c||a.category===c)&&(!s||(a.title+" "+a.summary).toLowerCase().includes(s)));
 $("#ilist").replaceChildren(...(L.length?L.map(a=>{const d=el("div","cred");d.append(el("h3","",a.title),el("p","mono",[a.category,a.date,a.minutes?a.minutes+" min read":""].filter(Boolean).join(" · ")),el("p","",a.summary));if(a.url)d.append(link("Read",a.url));return d}):[note("No matches","Clear the search or choose All categories.")]))}
[iq,ic].forEach(x=>x.addEventListener("input",drawI));drawI();
if(DATA.email){["Research collaboration","Academic opportunity","General inquiry"].forEach(t=>{const a=el("a","btn",t);a.href="mailto:"+DATA.email+"?subject="+encodeURIComponent(t);$("#inq").append(a)})}
// navigation
const hd=$("header"),bg=$("#burger"),dds=document.querySelectorAll(".dd");
const closeAll=()=>dds.forEach(x=>{x.classList.remove("open");x.querySelector(".ddb").setAttribute("aria-expanded","false")});
bg.onclick=()=>{const o=hd.classList.toggle("open");bg.setAttribute("aria-expanded",String(o));bg.setAttribute("aria-label",o?"Close menu":"Open menu")};
document.addEventListener("click",e=>{if(!e.target.closest("header")){hd.classList.remove("open");bg.setAttribute("aria-expanded","false");bg.setAttribute("aria-label","Open menu")}});
dds.forEach(d=>{const b=d.querySelector(".ddb");b.onclick=()=>{const o=!d.classList.contains("open");closeAll();if(o){d.classList.add("open");b.setAttribute("aria-expanded","true")}}});
document.addEventListener("click",e=>{if(!e.target.closest(".dd"))closeAll()});
document.querySelectorAll(".menu a").forEach(a=>a.addEventListener("click",()=>{hd.classList.remove("open");bg.setAttribute("aria-expanded","false");closeAll()}));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){hd.classList.remove("open");closeAll()}});

const f=$("#cform");
if(f){f.onsubmit=async e=>{e.preventDefault();const st=$("#cstatus");st.textContent="Sending...";
 try{const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
 const j=await r.json();st.textContent=r.ok?"Thank you. Your message was sent.":(j.error||"Could not send. Please email directly.");if(r.ok)f.reset()}
 catch(err){st.textContent="Could not send. Please email directly."}}}
}
