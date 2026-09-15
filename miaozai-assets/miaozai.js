(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const flavors = {
    blueberry: {name:'蓝莓', fruit:'一颗蓝莓的', color:'#4b85ef', disc:'#f4f62c', mood:'不必每一刻都热闹。留一点空白，也很妙。', rabbit:'蓝妙兔 / 通透', feedback:'蓝莓已开罐。给今天留一点轻盈。', image:'halftone-blue.png'},
    strawberry: {name:'草莓', fruit:'一颗草莓的', color:'#fa368f', disc:'#ffc8df', mood:'把喜欢说出来，把今天过得鲜活一点。', rabbit:'红妙兔 / 鲜活', feedback:'草莓已开罐。今天，尽兴一点。', image:'halftone-strawberry.png'},
    lemon: {name:'柠檬', fruit:'一颗柠檬的', color:'#f4f62c', disc:'#d0e2ff', mood:'慢一点也没关系。按自己的节奏，刚刚好。', rabbit:'黄妙兔 / 自在', feedback:'柠檬已开罐。把时间慢下来。', image:'halftone-lemon.png'}
  };
  function burst(target, flavor) {
    if (reduced.matches) return;
    const box = target.getBoundingClientRect();
    const root = $('#bubbles');
    while (root.children.length > 60) root.firstElementChild.remove();
    for(let i=0;i<14;i++){
      const b = document.createElement('i');
      b.className='bubble';
      const size=8+Math.random()*24;
      b.style.cssText=`width:${size}px;height:${size}px;left:${box.left+box.width/2}px;top:${box.top+box.height*.35}px;--bubble:${flavors[flavor].color};--dx:${(Math.random()-.5)*360}px;--dy:${-100-Math.random()*220}px;animation-delay:${Math.random()*.14}s`;
      root.append(b); b.addEventListener('animationend',()=>b.remove(),{once:true});
    }
  }
  function bounce(img){if(reduced.matches)return;img.classList.remove('bounce');void img.offsetWidth;img.classList.add('bounce');}
  function selectMood(key){
    const f=flavors[key];
    $$('[data-rabbit]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.rabbit===key)));
    $('#mood-copy').textContent=f.mood;$('#mood-name').textContent=f.rabbit;
  }
  function selectLab(key){
    const f=flavors[key];
    $$('[data-lab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lab===key)));
    $('#halftone-image').src=`miaozai-assets/${f.image}`;
    $('#halftone-image').alt=`${f.name}彩色网点图案`;
    $('.lab-controls h3').innerHTML=`${f.fruit}<br>另一种样子。`;
  }
  function openCan(el,key){
    document.body.dataset.flavor=key;
    document.documentElement.style.setProperty('--flavor',flavors[key].color);
    $('.flavor-disc').style.background=flavors[key].disc;
    $$('.can-item').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.flavor===key)));
    $('#flavor-feedback').textContent=flavors[key].feedback;
    bounce(el.querySelector('img'));burst(el,key);selectLab(key);selectMood(key);
  }
  window.openCan=openCan;
  $$('.can-item').forEach(el=>el.addEventListener('click',()=>openCan(el,el.dataset.flavor)));
  $$('[data-lab]').forEach(el=>el.addEventListener('click',()=>selectLab(el.dataset.lab)));
  $$('[data-rabbit]').forEach(el=>el.addEventListener('click',()=>{selectMood(el.dataset.rabbit);burst(el,el.dataset.rabbit);}));
  $('#dot-zoom').addEventListener('input',e=>{
    $('.halftone-view').style.setProperty('--zoom',e.target.value);
    $('#zoom-value').value=Number(e.target.value).toFixed(1)+'×';
  });
  // Pointer work is event-driven; no background animation loop.
  let cursorFrame=0;
  document.addEventListener('pointermove',e=>{
    if(!fine.matches||reduced.matches)return;
    document.body.classList.add('cursor-ready');
    if(cursorFrame)cancelAnimationFrame(cursorFrame);
    cursorFrame=requestAnimationFrame(()=>{
      $('#cursor').style.transform=`translate(${e.clientX-6}px,${e.clientY-6}px)`;
      $('#crosshair').style.transform=`translate(${e.clientX-16}px,${e.clientY-16}px)`;
      cursorFrame=0;
    });
  },{passive:true});
  document.documentElement.addEventListener('pointerleave',()=>document.body.classList.remove('cursor-ready'));
  document.addEventListener('pointerover',e=>$('#cursor').classList.toggle('active',Boolean(e.target.closest('button,a,input'))));
  $$('.can-item,.bottle-tilt').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      if(!fine.matches||reduced.matches)return;
      const r=el.getBoundingClientRect();
      el.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*22}deg`);
      el.style.setProperty('--rx',`${-((e.clientY-r.top)/r.height-.5)*12}deg`);
    },{passive:true});
    el.addEventListener('pointerleave',()=>{el.style.setProperty('--ry','0deg');el.style.setProperty('--rx','0deg');});
  });
  const bottle=$('.bottle-tilt');
  bottle.addEventListener('click',()=>{bounce(bottle.querySelector('img'));burst(bottle,document.body.dataset.flavor);});
  bottle.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();bottle.click();}});
  const sidebar=$('#sidebar'),toggle=$('.menu-toggle'),shade=$('.menu-shade');
  function menu(open){toggle.setAttribute('aria-expanded',String(open));sidebar.classList.toggle('show',open);sidebar.inert=!open;shade.hidden=!open;}
  toggle.addEventListener('click',()=>menu(toggle.getAttribute('aria-expanded')!=='true'));
  shade.addEventListener('click',()=>menu(false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){menu(false);toggle.focus();}});
  sidebar.addEventListener('keydown',e=>{if(e.key==='Tab'&&!e.shiftKey&&document.activeElement===sidebar.querySelector('a:last-of-type')){e.preventDefault();toggle.focus();}});
  const navLinks=$$('.chapter-nav a');
  const chapterObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);active?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current');});});
  },{rootMargin:'-12% 0px -60% 0px',threshold:0});
  navLinks.forEach(a=>chapterObserver.observe($(a.hash)));
  if(!reduced.matches){
    document.body.classList.add('js-motion');
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.06});
    $$('.reveal').forEach(el=>observer.observe(el));
  }
  reduced.addEventListener('change',()=>{if(reduced.matches){document.body.classList.remove('cursor-ready','js-motion');$('#bubbles').replaceChildren();}});
  const motionToggle=$('.motion-toggle');
  motionToggle.addEventListener('click',()=>{
    const paused=$('.brand-strip').classList.toggle('paused');
    motionToggle.setAttribute('aria-pressed',String(paused));motionToggle.textContent=paused?'继续图形流动':'暂停图形流动';
  });
  const dialog=$('.lightbox');let returnFocus;
  $$('.image-open').forEach(button=>button.addEventListener('click',()=>{
    const img=button.querySelector('img');returnFocus=button;
    $('#lightbox-image').src=img.src;$('#lightbox-image').alt=img.alt;$('#lightbox-caption').textContent=img.alt;
    dialog.showModal();document.body.classList.add('modal-open');
  }));
  $('.lightbox-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');returnFocus?.focus({preventScroll:true});});
})();
