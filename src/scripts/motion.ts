/** Progressive motion: native scrolling, no pinned content or animation library. */
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let cleanup = () => {};
let userPaused = false;
try { userPaused = localStorage.getItem('dixberf-motion') === 'paused'; } catch { /* Use the current visit preference. */ }
const motionToggle = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
function setupMotion() {
 cleanup();
 const controller = new AbortController();
 const { signal } = controller;
 const hero = document.querySelector<HTMLElement>('[data-motion-hero]');
 const stage = document.querySelector<HTMLElement>('.hero-machine-stage');
 const machine = document.querySelector<HTMLElement>('[data-hero-machine]');
 const progress = document.querySelector<HTMLElement>('[data-reading-progress]');
 const ribbon = document.querySelector<HTMLElement>('[data-scroll-ribbon]');
 const process = document.querySelector<HTMLElement>('.process-section');
 const processBar = document.querySelector<HTMLElement>('[data-process-progress]');
 const reveals = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
 let frame = 0;
 let pointerX = 0;
 let pointerY = 0;
 const activePhotos = new Set<HTMLElement>();
 const photos = [...document.querySelectorAll<HTMLElement>('[data-parallax-photo]')];
 const clamp = (value:number) => Math.min(1, Math.max(0,value));
 const reduced = preference.matches || userPaused;
 document.documentElement.classList.toggle('motion-paused',reduced);
 if(motionToggle){motionToggle.hidden=false;motionToggle.disabled=preference.matches;motionToggle.setAttribute('aria-pressed',String(reduced));const label=motionToggle.querySelector('[data-motion-label]');if(label)label.textContent=preference.matches?'Movimiento reducido':userPaused?'Activar efectos':'Pausar efectos';}
 const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add('revealed');
    revealObserver.unobserve(entry.target);
   }
  });
 }, {threshold:0.08, rootMargin:'0px 0px -24px 0px'});
 const photoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting ? activePhotos.add(entry.target as HTMLElement) : activePhotos.delete(entry.target as HTMLElement));
  queue();
 });
 if (!reduced) {
  hero?.classList.add('motion-ready');
  document.querySelectorAll('.service-grid,.project-grid,.process-grid,.equipment-grid,.portfolio-grid,[data-stagger]').forEach(group => {
   [...group.children].forEach((child,index) => (child as HTMLElement).style.setProperty('--reveal-delay',`${Math.min(index,3)*65}ms`));
  });
  reveals.forEach(el => {el.classList.add('will-reveal');revealObserver.observe(el);});
  photos.forEach(el => photoObserver.observe(el));
 }
 function render() {
  frame=0;
  const height=innerHeight;
  const desktop=innerWidth>850;
  const total=document.documentElement.scrollHeight-height;
  const heroRect=hero?.getBoundingClientRect();
  const ribbonRect=ribbon?.parentElement?.getBoundingClientRect();
  const processRect=process?.getBoundingClientRect();
  const photoReads=[...activePhotos].map(el=>({el,rect:el.getBoundingClientRect()}));
  if(progress)progress.style.transform=`scaleX(${total>0?clamp(scrollY/total):0})`;
  if(!reduced){
   if(machine&&heroRect&&heroRect.bottom>0){const travelled=clamp(-heroRect.top/heroRect.height);machine.style.transform=`translate3d(${desktop?pointerX:0}px,${travelled*(desktop?65:18)+(desktop?pointerY:0)}px,0) rotate(${desktop?pointerX*.035:0}deg)`;}
   if(ribbon&&ribbonRect&&ribbonRect.bottom>0&&ribbonRect.top<height)ribbon.style.transform=`translate3d(${-clamp((height-ribbonRect.top)/(height+ribbonRect.height))*(desktop?180:70)}px,0,0)`;
   photoReads.forEach(({el,rect})=>{const image=el.querySelector('img');if(image)image.style.transform=`translate3d(0,${(clamp((height-rect.top)/(height+rect.height))-.5)*(desktop?32:12)}px,0) scale(1.075)`;});
  }
  if(processBar&&processRect)processBar.style.transform=`scaleX(${reduced?1:clamp((height-processRect.top)/(height*.75+processRect.height*.3))})`;
 }
 function queue(){if(!frame)frame=requestAnimationFrame(render);}
 window.addEventListener('scroll',queue,{passive:true,signal});
 window.addEventListener('resize',queue,{passive:true,signal});
 document.addEventListener('focusin',event=>{const target=event.target as HTMLElement;target.closest('[data-reveal]')?.classList.add('revealed');},{signal});
 if(!reduced&&matchMedia('(hover: hover) and (pointer: fine)').matches){
  stage?.addEventListener('pointermove',event=>{const bounds=stage.getBoundingClientRect();pointerX=((event.clientX-bounds.left)/bounds.width-.5)*14;pointerY=((event.clientY-bounds.top)/bounds.height-.5)*10;queue();},{passive:true,signal});
  stage?.addEventListener('pointerleave',()=>{pointerX=0;pointerY=0;queue();},{signal});
 }
 queue();
 cleanup=()=>{controller.abort();cancelAnimationFrame(frame);revealObserver.disconnect();photoObserver.disconnect();hero?.classList.remove('motion-ready');reveals.forEach(el=>{el.classList.remove('will-reveal','revealed');el.style.removeProperty('--reveal-delay');});photos.forEach(el=>el.querySelector('img')?.style.removeProperty('transform'));machine?.style.removeProperty('transform');ribbon?.style.removeProperty('transform');};
}
motionToggle?.addEventListener('click',()=>{userPaused=!userPaused;try{localStorage.setItem('dixberf-motion',userPaused?'paused':'active');}catch{/* Keep in-memory preference. */}setupMotion();});
setupMotion();
preference.addEventListener('change',setupMotion);
window.addEventListener('pagehide',()=>cleanup());
window.addEventListener('pageshow',event=>{if(event.persisted)setupMotion();});
export {};
