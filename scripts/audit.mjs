import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {writeFile,mkdir} from 'node:fs/promises';
const base=process.env.AUDIT_URL||'http://localhost:4321';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(String(e)));
await mkdir('.work/screenshots',{recursive:true});
await page.goto(base);await page.waitForLoadState('networkidle');
await page.getByRole('button',{name:'Sólo necesarias',exact:true}).click();
await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));document.activeElement?.blur();scrollTo(0,0);});
await page.screenshot({path:'.work/screenshots/home-desktop.png',fullPage:true});
await page.screenshot({path:'.work/screenshots/home-desktop-fold.png'});
const routes=await page.locator('a[href^="/"]').evaluateAll(nodes=>[...new Set(nodes.map(n=>n.getAttribute('href').split('#')[0]).filter(Boolean))]);
const results=[];
for(const route of [...routes,'/404/']){
 const response=await page.goto(base+route);await page.waitForLoadState('networkidle');
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 const links=await page.locator('a[href^="/"]').evaluateAll(nodes=>[...new Set(nodes.map(n=>n.getAttribute('href')))]);
 const broken=[];for(const href of links){const [path,hash]=href.split('#');const res=await context.request.get(base+path);if(res.status()>=400)broken.push(href);else if(hash&&(!path||path===route)&&!(await page.locator(`[id="${hash}"]`).count()))broken.push(href);}
 const imgs=await page.locator('img').evaluateAll(nodes=>nodes.filter(n=>!n.alt||!n.width||!n.height).map(n=>n.src));
 results.push({route,status:response.status(),h1:await page.locator('h1').count(),broken,imagesMissingAltOrDimensions:imgs,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
}
const viewports=[{width:320,height:568},{width:375,height:667},{width:390,height:600},{width:768,height:500},{width:844,height:390}];
const responsive=[];
for(const size of viewports){await page.setViewportSize(size);for(const route of ['/','/contacto/','/grua-hiab/','/equipos/']){await page.goto(base+route);await page.waitForLoadState('networkidle');const overflow=await page.evaluate(()=>({viewport:innerWidth,body:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('main *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1||el.getBoundingClientRect().left< -1).filter(el=>!el.closest('.honeypot')).slice(0,10).map(el=>el.tagName+'.'+el.className)}));responsive.push({size,route,...overflow});if(size.width===390)await page.screenshot({path:`.work/screenshots/${route==='/'?'home':route.split('/')[1]}-mobile.png`,fullPage:true});}}
await page.setViewportSize({width:390,height:600});await page.goto(base);await page.locator('.menu-toggle').click();const menuOpen=await page.locator('#navigation').isVisible();await page.keyboard.press('Escape');const menuClosed=await page.locator('#navigation').isHidden();
const report={results,responsive,menuOpen,menuClosed,errors};await writeFile('.work/audit.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();
if(results.some(r=>r.broken.length||r.imagesMissingAltOrDimensions.length||r.violations.length||r.h1!==1)||responsive.some(r=>r.body>r.size.width)||errors.length||!menuOpen||!menuClosed)process.exitCode=1;
