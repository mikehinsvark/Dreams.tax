import {readFile,stat,readdir} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.join(import.meta.dirname,'dist');
const pages=['index.html','tax-prep.html','technology.html','bank-breezy.html','tariff-recovery.html'];
let assets=0,anchors=0;
for(const file of pages){
 const html=await readFile(path.join(root,file),'utf8');
 assert(html.includes('<title>Dreams - Tax Prep Advocates</title>'),`${file}: requested browser tab title`);
 assert(html.includes('id="page-scroll-nav"')&&html.includes('aria-label="Scroll to previous section"')&&html.includes('aria-label="Scroll to next section"'),`${file}: shared page navigation`);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${file}: one main heading`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`${file}: unique IDs`);
 const nav=html.match(/<nav class="product-nav"[\s\S]*?<\/nav>/)[0];
 assert.equal((nav.match(/aria-current="page"/g)||[]).length,1,`${file}: one active solution`);
 for(const page of pages)assert(nav.includes(`href="${page}"`),`${file}: navigation to ${page}`);
 for(const attr of ['src','href','poster','data-lightbox'])for(const match of html.matchAll(new RegExp(`\\b${attr}="([^"]+)"`,'g'))){
  const url=match[1];if(/^(https?:|mailto:|tel:|data:)/.test(url))continue;
  const [raw,hash]=url.split('#');const target=raw||file;
  const full=path.resolve(root,target);
  assert(full.startsWith(root),`${file}: resource stays in dist`);
  assert((await stat(full)).isFile(),`${file}: ${url} exists`);assets++;
  if(hash){const targetHtml=target===file?html:await readFile(full,'utf8');assert(targetHtml.includes(`id="${hash}"`),`${file}: #${hash} exists`);anchors++;}
 }
 assert.equal((html.match(/class="brand-trio"[\s\S]*?<\/div>/)[0].match(/<img /g)||[]).length,3,`${file}: three header logos`);
 assert.equal((html.match(/class="eco-brands sister-footer-brands"[\s\S]*?<\/div>/)[0].match(/<img /g)||[]).length,3,`${file}: three footer logos`);
 const featured=html.match(/<nav class="eco-featured"[\s\S]*?<\/nav>/)[0];
 assert(featured.includes('<strong>Trumark.Health</strong>'),`${file}: Trumark footer destination`);
 assert(!featured.includes('Dreams & Vantage'),`${file}: old fifth box removed`);
 assert(!html.includes('trumark-favicon'),`${file}: independent branding`);
 assert(html.includes(`https://dreams.tax/${file==='index.html'?'':file}`),`${file}: canonical domain`);
 for(const external of html.matchAll(/<a\b[^>]*href="https:[^"]+"[^>]*>/g))assert(external[0].includes('noopener'),`${file}: safe external link`);
}
const home=await readFile(path.join(root,'index.html'),'utf8');
assert.equal((home.match(/class="orbit-card"/g)||[]).length,5,'five circular hero cards');
assert(home.indexOf('id="business"')<home.indexOf('id="destinations"'),'partner infographic first');
const all=(await Promise.all(pages.map(f=>readFile(path.join(root,f),'utf8')))).join('\n');
for(const url of ['https://renewalsforlife.info/','https://showmethemoney.pro/dreams/','https://trumark.health/','https://dreams.ceo/','https://dreamsfaststart.com/portfolio.html','https://taxprepadvocates.com/','https://research.taxprepadvocates.com/dbr/?refid=AA0233','https://fica.taxprepadvocates.com/?refid=AA0233','https://technology.dreamsresources.com/?refid=AA0233','https://dreams-aio.com/?refid=AA0233','https://davidallencapital.com/business-capital/','https://bankbreezy.com/?refid=AA0233','https://tariffpartners.dreamsscore.biz/?refid=AA0233','https://tariffrefunds.vip/','https://tariffrefunds.vip/partner/','https://tariffrefunds.vip/client/','https://tariffhub-qm2oslnz.manus.space/'])assert(all.includes(`href="${url}"`),`requested destination: ${url}`);
assert(all.includes('rd-tax-credits-2026.pdf')&&all.includes('rd-tax-credits-2026.pptx'),'browser deck and original PowerPoint');
assert(all.includes('<video controls playsinline preload="metadata"'),'controlled Sandler video');
const tax=await readFile(path.join(root,'tax-prep.html'),'utf8');
assert(tax.includes('href="https://umustsee.net/DAA8PJ"'),'iDecide overview destination');
assert(tax.indexOf('id="resources"')<tax.indexOf('id="interactive-overview"')&&tax.indexOf('id="interactive-overview"')<tax.indexOf('id="fica"'),'iDecide panel between R&D resources and FICA');
assert((await readFile(path.join(root,'app.js'),'utf8')).includes('initializePageNavigation'),'page navigation initialized');
assert((await stat(path.join(root,'page-navigation.js'))).isFile(),'page navigation module published');
assert.equal((await readFile(path.join(root,'CNAME'),'utf8')).trim(),'dreams.tax');
assert((await stat(path.join(root,'media/sandler-introduction.mp4'))).size>1e6,'Sandler video present');
async function sizes(dir){for(const f of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,f.name);if(f.isDirectory())await sizes(full);else assert((await stat(full)).size<100*1024*1024,`GitHub file size: ${full}`);}}
await sizes(root);
console.log(`PASS: 5 pages, 18 requested destinations, ${assets} local references, ${anchors} anchors, shared browser title and scroll navigation, iDecide placement, 3 logos in each header/footer, 5 hero cards, all resources, video, and Dreams.tax metadata.`);
