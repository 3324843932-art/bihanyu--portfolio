'use strict';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const cast = [
 ['adam','Adam / 亚当','没有面孔的职场新人。在借用别人的身份之前，他必须先回答：我是谁？'],
 ['lina','Lina / 向日葵','亚当遇到的第一位同事。温暖、明亮，热情得近乎不真实。视觉源自梵高《向日葵》。'],
 ['scream','Scream / 尖叫','当日常故障变成情绪爆发，蒙克《呐喊》走进了打印间。'],
 ['starry','Starry / 星空','浪漫而不切实际的同事。梵高《星月夜》的旋涡，成为一颗游离于现实的脑袋。'],
 ['clock','Clock / 时钟','步步紧逼的倒计时，让焦虑有了形状。视觉借用达利《记忆的永恒》中的软钟。'],
 ['bird','Bird / 孤禽','八大山人《孤禽图》中的鸟，穿着长衫，加入这间荒诞的办公室。'],
 ['griet','Griet / 珍珠','维米尔画中的珍珠从配饰变成了面孔。熟悉的艺术符号，获得了陌生的身体。'],
 ['ox','OX / 牛头','毕加索《格尔尼卡》中的牛头，成为办公室里的同事。现实压力与画中的张力彼此呼应。'],
 ['square','Square / 方块','冷峻而高效的前辈。蒙德里安的红、黄、蓝与几何秩序，化作一种现成的人格模板。']
];
const rail=document.querySelector('#badge-rail');
let selected=0;
function selectCharacter(i){selected=i;document.querySelector('#character-index').textContent=String(i+1).padStart(2,'0')+' / 09';document.querySelector('#character-name').textContent=cast[i][1];document.querySelector('#character-description').textContent=cast[i][2];rail.querySelectorAll('.badge').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));}
cast.forEach((person,i)=>{
 const slot=document.createElement('div');slot.className='badge-slot';
 const b=document.createElement('button');b.className='badge';b.setAttribute('aria-label',person[1]+'，拖动工牌或点击查看角色');b.setAttribute('aria-pressed',String(i===0));
 const img=document.createElement('img');img.src='film-assets/'+person[0]+'.webp';img.alt=person[1]+'角色工牌';img.draggable=false;img.loading='lazy';b.append(img);slot.append(b);rail.append(slot);
 let angle=0,velocity=0,frame=0,last=0,dragging=false,anchorX=0,anchorY=0,offset=0,moved=false,startX=0,startY=0,prevTime=0,prevAngle=0;
 const paint=()=>{b.style.transform=`rotate(${angle}rad)`;};
 function tick(t){const dt=Math.min((t-last)/1000||1/60,.033);last=t;if(!dragging){velocity+=(-22*Math.sin(angle)-3.3*velocity)*dt;angle+=velocity*dt;}paint();if(dragging||Math.abs(angle)>.001||Math.abs(velocity)>.001){frame=requestAnimationFrame(tick);}else{angle=0;paint();frame=0;}}
 function wake(){if(!frame){last=performance.now();frame=requestAnimationFrame(tick);}}
 b.addEventListener('pointerdown',e=>{if(e.button!==0)return;const r=slot.getBoundingClientRect();anchorX=r.left+r.width*.62;anchorY=r.top;offset=Math.atan2(-(e.clientX-anchorX),Math.max(20,e.clientY-anchorY))-angle;dragging=true;moved=false;startX=e.clientX;startY=e.clientY;prevTime=performance.now();prevAngle=angle;velocity=0;b.setPointerCapture(e.pointerId);selectCharacter(i);});
 b.addEventListener('pointermove',e=>{if(!dragging)return;moved ||= Math.hypot(e.clientX-startX,e.clientY-startY)>5;const next=Math.max(-.72,Math.min(.72,Math.atan2(-(e.clientX-anchorX),Math.max(20,e.clientY-anchorY))-offset));const now=performance.now();velocity=Math.max(-3,Math.min(3,(next-prevAngle)/Math.max(.016,(now-prevTime)/1000)));prevAngle=next;prevTime=now;angle=next;paint();});
 function release(e){if(!dragging)return;dragging=false;if(b.hasPointerCapture(e.pointerId))b.releasePointerCapture(e.pointerId);if(performance.now()-prevTime>90)velocity=0;if(reduced.matches){angle=0;velocity=0;paint();}else wake();}
 b.addEventListener('pointerup',release);b.addEventListener('pointercancel',release);b.addEventListener('lostpointercapture',release);
 b.addEventListener('click',()=>{selectCharacter(i);if(!moved&&!reduced.matches){velocity+=.8;wake();}});
 b.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&!dragging&&!reduced.matches){velocity+=i%2?.25:-.25;wake();}});
 b.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:-1)+cast.length)%cast.length;rail.children[next].querySelector('button').focus();selectCharacter(next);}});
});
const windowRail=document.querySelector('.badge-window');
document.querySelector('#cast-prev').addEventListener('click',()=>windowRail.scrollBy({left:-windowRail.clientWidth*.75,behavior:reduced.matches?'instant':'smooth'}));
document.querySelector('#cast-next').addEventListener('click',()=>windowRail.scrollBy({left:windowRail.clientWidth*.75,behavior:reduced.matches?'instant':'smooth'}));
const notes=[
 {image:'office',alt:'经典名画化身办公室同事',number:'NOTE 01 — VISUAL LANGUAGE',title:'一间办公室，\n一座人格画廊。',text:'我把经典名画从画框里请出来，放到最日常的职场中。向日葵是过度热情的同事，星空浪漫而不切实际，方块冷峻高效。熟悉的工作场景与不可能的面孔并置，让幽默和异化同时发生。',object:'printer'},
 {image:'bar',alt:'暖黄灯光下的酒吧与酒杯',number:'NOTE 02 — THE TURNING POINT',title:'离开办公室，\n才开始接近自己。',text:'办公室的冷灰绿，与酒吧的暖黄构成情绪的转折。亚当在这里遇到路易十六：一个失去过头颅、却获得从容的人。他像一面镜子，提醒亚当，身份并不是从别人那里领取的，而是自己创造的。',object:'folder'},
 {image:'apple-office',alt:'阳光穿过百叶窗，办公室桌上摆着电脑、绿植与苹果',number:'NOTE 03 — THE SECOND MASK · 含结局',title:'找到自己之后，\n为什么仍要遮住脸？',text:'亚当终于长出了人类的面孔，却又用苹果将它遮住。这既是向马格利特《人类之子》的致意，也是我留下的疑问：我们每天戴上的“普通”，是保护色，还是另一种迷失？做自己，也需要接纳平凡的勇气。',object:'apple'}
];
const tabs=[...document.querySelectorAll('[data-note]')];
function showNote(i){const n=notes[i];tabs.forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1;});document.querySelector('#note-panel').setAttribute('aria-labelledby','tab-'+i);const im=document.querySelector('#note-image');im.src='film-assets/'+n.image+'.webp';im.alt=n.alt;document.querySelector('#note-number').textContent=n.number;document.querySelector('#note-title').replaceChildren(...n.title.split('\n').flatMap((s,j)=>j?[document.createElement('br'),document.createTextNode(s)]:[document.createTextNode(s)]));document.querySelector('#note-text').textContent=n.text;document.querySelector('#note-object').src='film-assets/'+n.object+'.webp';}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>showNote(i));b.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:2))%3;showNote(j);tabs[j].focus();}});});
const film=document.querySelector('#film'),screening=document.querySelector('#screening');
document.querySelectorAll('[data-watch]').forEach(b=>b.addEventListener('click',()=>{screening.showModal();film.play().catch(()=>{});}));
screening.addEventListener('close',()=>film.pause());
document.querySelector('[data-poster]').addEventListener('click',()=>document.querySelector('#poster-dialog').showModal());
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.close).close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
