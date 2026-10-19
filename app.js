import {programs} from './programs.js';
import {initializePageNavigation} from './page-navigation.js';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const menu=$('#menu-toggle'),nav=$('#main-nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open);});
$$('#main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}});
const header=$('.site-header'),productNav=$('.product-nav');
function measureHeader(){document.documentElement.style.setProperty('--header-height',header.offsetHeight+'px');document.documentElement.style.scrollPaddingTop=(header.offsetHeight+productNav.offsetHeight+20)+'px';}
new ResizeObserver(measureHeader).observe(header);measureHeader();
initializePageNavigation();
const current=$('.product-nav [aria-current="page"]'),rail=$('.product-nav-inner');
if(current&&rail.scrollWidth>rail.clientWidth)rail.scrollLeft=Math.max(0,current.offsetLeft-rail.clientWidth/2+current.clientWidth/2);

const lightbox=$('#image-lightbox'),lightboxImage=$('#lightbox-image'),lightboxTitle=$('#lightbox-title');
let imageTrigger=null;
$$('[data-lightbox]').forEach(trigger=>trigger.addEventListener('click',()=>{imageTrigger=trigger;lightboxImage.src=trigger.dataset.lightbox;lightboxImage.alt=trigger.dataset.title;lightboxTitle.textContent=trigger.dataset.title;$('#lightbox-original').href=trigger.dataset.lightbox;lightbox.showModal();}));
$('#close-lightbox').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',e=>{if(e.target!==lightbox)return;const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close();});
lightbox.addEventListener('close',()=>{imageTrigger?.focus({preventScroll:true});});

function initializeCarousel(){
 const stage=$('#orbit-stage');if(!stage)return;
 const visual=$('.hero-visual'),cards=$$('.orbit-card'),motion=$('#motion-toggle'),reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let angle=0,active=0,paused=reduced.matches,hovered=false,focused=false,dragging=false,inView=true,lastFrame=0,phase=0,transition=null,pointerStart=null,clickSuppressed=false;
 let stageWidth=stage.clientWidth,stageHeight=stage.clientHeight,cardWidth=cards[0].offsetWidth;
 const canvas=$('#globe'),ctx=canvas.getContext('2d');let dpr=1,globeTime=0;
 function updateMotion(){motion.setAttribute('aria-pressed',String(paused));motion.textContent=paused?'▷ Resume motion':'Ⅱ Pause motion';motion.setAttribute('aria-label',paused?'Resume carousel rotation':'Pause carousel rotation');document.body.classList.toggle('motion-paused',paused);}
 function setFeatured(index){if(index===active&&$('#featured-name').textContent===programs[index].short&&cards[index].classList.contains('is-front'))return;active=index;$('#featured-name').textContent=programs[index].short;$$('[data-orbit]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===active)));cards.forEach((c,i)=>{c.classList.toggle('is-front',i===active);c.setAttribute('aria-label',i===active?`Explore ${programs[i].name}`:`Bring ${programs[i].name} forward`);});}
 function drawCards(){let best=0,max=-1;cards.forEach((card,i)=>{const theta=i*Math.PI*2/cards.length+angle,front=(Math.cos(theta)+1)/2,radius=Math.max(55,(stageWidth-cardWidth*.88)/2-12),x=Math.sin(theta)*radius,y=Math.cos(theta)*stageHeight*.205,scale=.51+front*.49,rotate=-Math.sin(theta)*31;card.style.transform=`translate(-50%, -50%) translate(${x}px,${y}px) scale(${scale}) rotateY(${rotate}deg)`;card.style.zIndex=String(Math.round(front*100)+2);card.style.filter=`brightness(${.69+front*.31})`;if(front>max){max=front;best=i;}});setFeatured(best);}
 function rotateTo(index){let target=-index*Math.PI*2/cards.length;while(target-angle>Math.PI)target-=Math.PI*2;while(target-angle< -Math.PI)target+=Math.PI*2;if(reduced.matches||paused){angle=target;transition=null;drawCards();}else transition={from:angle,to:target,elapsed:0};phase=0;}
 function openProgram(index=active){window.location.href=programs[index].page;}
 motion.addEventListener('click',()=>{paused=!paused;updateMotion();});
 reduced.addEventListener('change',e=>{paused=e.matches;transition=null;rotateTo(active);updateMotion();});
 $('#orbit-prev').addEventListener('click',()=>rotateTo((active+cards.length-1)%cards.length));$('#orbit-next').addEventListener('click',()=>rotateTo((active+1)%cards.length));
 $$('[data-orbit]').forEach(b=>b.addEventListener('click',()=>rotateTo(Number(b.dataset.orbit))));
 cards.forEach((c,i)=>c.addEventListener('click',e=>{if(clickSuppressed){e.preventDefault();clickSuppressed=false;return;}if(active===i)openProgram(i);else rotateTo(i);}));
 $('#explore-program').addEventListener('click',()=>openProgram());
 visual.addEventListener('mouseenter',()=>hovered=true);visual.addEventListener('mouseleave',()=>hovered=false);
 visual.addEventListener('focusin',()=>focused=true);visual.addEventListener('focusout',e=>{focused=e.relatedTarget?visual.contains(e.relatedTarget):false;});
 stage.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();rotateTo((active+(e.key==='ArrowRight'?1:cards.length-1))%cards.length);}});
 stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;pointerStart={x:e.clientX,y:e.clientY,angle};dragging=false;clickSuppressed=false;});
 stage.addEventListener('pointermove',e=>{if(!pointerStart)return;const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;if(!dragging&&Math.abs(dx)>12&&Math.abs(dx)>Math.abs(dy)){dragging=true;transition=null;stage.setPointerCapture(e.pointerId);}if(dragging){angle=pointerStart.angle+dx/stageWidth*Math.PI;drawCards();}});
 function endDrag(){if(!pointerStart)return;if(dragging){clickSuppressed=true;rotateTo(active);}dragging=false;pointerStart=null;}
 stage.addEventListener('pointerup',endDrag);stage.addEventListener('pointercancel',endDrag);stage.addEventListener('lostpointercapture',endDrag);window.addEventListener('pointerup',endDrag);
 function sizeCanvas(){dpr=Math.min(devicePixelRatio||1,1.6);canvas.width=stageWidth*dpr;canvas.height=stageHeight*dpr;}
 function drawGlobe(time){if(!ctx)return;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,stageWidth,stageHeight);const cx=stageWidth*.5,cy=stageHeight*.44,r=Math.min(stageWidth*.43,stageHeight*.48);const glow=ctx.createRadialGradient(cx,cy,r*.5,cx,cy,r*1.2);glow.addColorStop(0,'#07487608');glow.addColorStop(.8,'#168dd51c');glow.addColorStop(1,'#00142200');ctx.fillStyle=glow;ctx.fillRect(0,0,stageWidth,stageHeight);ctx.beginPath();ctx.ellipse(cx,cy,r,r*.85,0,0,Math.PI*2);ctx.strokeStyle='#36b5fb3b';ctx.lineWidth=1;ctx.stroke();const turn=time*.000018;for(let lat=-72;lat<=72;lat+=12){const l=lat*Math.PI/180;let previous=null;for(let lon=0;lon<=360;lon+=6){const a=lon*Math.PI/180+turn,x=Math.cos(l)*Math.sin(a),z=Math.cos(l)*Math.cos(a),y=Math.sin(l);const px=cx+x*r,py=cy+y*r*.85+z*r*.08;if(z<-.06){previous=null;continue;}ctx.fillStyle=`rgba(70,182,238,${.08+z*.3})`;ctx.beginPath();ctx.arc(px,py,.6+z*.55,0,Math.PI*2);ctx.fill();if(previous){ctx.strokeStyle=`rgba(32,135,195,${.035+z*.1})`;ctx.beginPath();ctx.moveTo(previous.x,previous.y);ctx.lineTo(px,py);ctx.stroke();}previous={x:px,y:py};}}}
 new ResizeObserver(()=>{stageWidth=stage.clientWidth;stageHeight=stage.clientHeight;cardWidth=cards[0].offsetWidth;sizeCanvas();drawCards();drawGlobe(globeTime);}).observe(stage);
 new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;},{threshold:.05}).observe(stage);
 function frame(time){const dt=lastFrame?Math.min(time-lastFrame,45):0;lastFrame=time;const dialogOpen=lightbox.open;if(inView&&!document.hidden){if(transition&&!dragging){transition.elapsed+=dt;const p=Math.min(transition.elapsed/950,1),ease=1-Math.pow(1-p,3);angle=transition.from+(transition.to-transition.from)*ease;if(p===1)transition=null;drawCards();}else if(!paused&&!hovered&&!focused&&!dragging&&!dialogOpen){phase+=dt;const period=9500,rest=3500;if(phase>=period)phase-=period;if(phase>rest){angle-=Math.PI*2/cards.length*dt/(period-rest);drawCards();}}if(!paused&&!reduced.matches&&!hovered&&!focused&&!dialogOpen)globeTime+=dt;drawGlobe(globeTime);}requestAnimationFrame(frame);}
 sizeCanvas();updateMotion();drawCards();requestAnimationFrame(frame);
}
initializeCarousel();

