(() => {
  'use strict';
  const A = 'fealand-assets/v2/', B = 'fealand-assets/v3/';
  const products = {
    headphones: {name:'头戴式耳机壳',english:'Headphone case',line:'把羽翼，戴在耳边。',image:'product1.webp',photos:['product1.webp','headphones.webp','hero.webp'],labels:['正面轮廓','完整设计','佩戴场景'],photoFill:[false,false,true],description:'从壮锦凤凰纹的羽翼中提取轮廓，将流动的翼形与柔和的粉色结合。耳机成为造型的一部分，也成为你的随身守护。',palette:'羽境粉 / 珠光白',origin:'壮锦凤凰纹 · 羽翼轮廓',expression:'立体羽翼 / 编织纹样',scene:'听音乐 · 城市出行',title:'羽翼的形，编织的温度。',intro:'让来自壮锦的灵感，在轮廓与细节中被看见。',detail:'headphones.webp',notes:[['把羽翼留在轮廓里。','将凤凰纹中的翅膀延展为耳罩两侧的立体线条，让传统符号有了可辨识的当代形态。'],['让经纬成为细节。','头梁上的几何织纹与耳罩的柔和光泽相互呼应，连接壮锦的秩序感与日常穿搭。']],archives:[1,2,3]},
    airpods: {name:'AirPods 耳机壳',english:'AirPods case',line:'小小一方，藏着守护。',image:'product2.webp',photos:['product2.webp','airpods.webp'],labels:['正面轮廓','手持细节'],photoFill:[false,true],description:'将凤凰轮廓、圆角像素与通透的壳体组合，让收纳耳机这件小事，也拥有自己的纹样与色彩。',palette:'羽境粉 / 透明底色',origin:'凤凰轮廓 · 几何符号',expression:'立体纹饰 / 通透叠层',scene:'随身收纳 · 通勤出行',title:'把守护，收进一方天地。',intro:'让羽翼与像素，在小小的壳体上相遇。',detail:'airpods.webp',notes:[['小体量，也有完整表达。','以凤凰轮廓构成壳体上的主体纹饰，几何符号点缀其间，延续绽放系列的识别。'],['让纹样轻轻浮现。','通透底色与粉白纹饰形成层次，让图形在手持、开合与悬挂时呈现不同的细节。']],archives:[4,5,6]},
    phone: {name:'手机壳与支架',english:'Phone case & stand',line:'把喜欢的纹样，握在手里。',image:'product3.webp',photos:['product3.webp','phone.webp'],labels:['组合设计','纹理细节'],photoFill:[false,true],description:'把壮锦的几何秩序转译到每天握在手里的配饰上。手机壳与支架通过相同的纹样语言，构成一组日常搭配。',palette:'羽境粉 / 织纹白',origin:'壮锦几何纹样 · 重复结构',expression:'几何织纹 / 壳与支架组合',scene:'掌心携带 · 桌面使用',title:'经纬之间，长出新的秩序。',intro:'从重复的几何单元，到掌心里的纹理与触感。',detail:'phone.webp',notes:[['让符号成为结构。','将圆角几何单元延展为连续纹样，以疏密与重复形成可辨识的视觉节奏。'],['把两件单品连在一起。','通过一致的颜色与纹样，让手机壳和支架相互呼应，把日常使用纳入完整的品牌表达。']],archives:[7,8,9,10]},
    bobo: {name:'BOBO 包挂',english:'Bag charm',line:'你的守护鸟，有了模样。',image:'product4.webp',photos:['product4.webp'],labels:['完整造型'],photoFill:[false],description:'将「守护鸟」化作有表情、有性格的陪伴。BOBO 用柔软的形态与额间的几何符号，把羽境的品牌故事带入每一次出行。',palette:'柔粉 / 浅紫 / 奶白',origin:'守护鸟概念 · 几何符号',expression:'角色化设计 / 织绣细节',scene:'包袋搭配 · 随身陪伴',title:'从一个符号，到一位伙伴。',intro:'守护不止是一种寓意，也可以是一张熟悉的面孔。',detail:'bobo.webp',notes:[['让守护拥有性格。','从眼神、羽翼到身体比例，构成 BOBO 的角色特征，让抽象的品牌概念成为亲近的陪伴。'],['把品牌藏进细节。','额间与服饰上的几何纹样回应羽境的基础符号，让角色形象与配饰系列保持同一种语言。']],archives:[11,12]},
    watch: {name:'编织表带',english:'Watch band',line:'让时间，织进日常。',image:'product5.webp',photos:['product5.webp','watch.webp'],labels:['整体造型','编织细节'],photoFill:[false,false],description:'让壮锦纹样沿腕间延续。几何秩序与编织的肌理相互交织，把文化的记忆带进每天抬腕的瞬间。',palette:'织锦粉 / 米白',origin:'壮锦织纹 · 连续几何',expression:'编织纹理 / 连续纹样',scene:'腕间佩戴 · 日常搭配',title:'一段经纬，围绕每一天。',intro:'将织纹的节奏，延续到腕间的方寸之间。',detail:'watch.webp',notes:[['让图案自然延续。','连续排列的几何单元沿表带展开，在环绕手腕时保持清晰的纹样节奏。'],['让细节值得近看。','粉白织纹通过交错的线条呈现层次，与简洁的表身形成对照，让日常配饰保留文化的温度。']],archives:[13,14,15]}
  };

  // Curated from the user's PNG boards; no PDF content is used.
  const curated = {
    headphones:[['headphones-closeup.jpg','羽翼耳机壳 · 材质与局部细节']],
    airpods:[['airpods-styled','AirPods 耳机壳 · 腰间搭配'],['airpods-campaign','AirPods 耳机壳 · 手持场景']],
    phone:[['phone-carried','手机壳与凤凰支架 · 随身搭配'],['phone-design','手机壳与支架 · 纹样构成']],
    bobo:[['bobo-carried','BOBO 包挂 · 织绣与角色细节'],['bobo-bag','BOBO 包挂 · 包袋搭配']],
    watch:[['watch-woven','壮锦织纹表带 · 手持细节'],['watch-pixel','几何像素表带 · 手持比例'],['watch-materials','表带 · 织纹、几何与链节设计']]
  };
  const curatedFile = file => file.includes('.') ? file : file+'.webp';
  Object.entries(curated).forEach(([key,photos]) => {
    const p = products[key];
    if(key === 'bobo') { p.photos=['product4.webp']; p.labels=['产品造型']; p.photoFill=[false]; }
    photos.forEach(([file,label]) => { p.photos.push('../v4/'+curatedFile(file)); p.labels.push(label); p.photoFill.push(false); });
    p.detail = '../v4/'+curatedFile(photos[0][0]);
  });
  products.headphones.detail='../v4/headphones-lifestyle.png';
  products.watch.name='表带';
  products.watch.description='从壮锦织纹到几何像素，再到链节轮廓，表带探索同一纹样的不同表达，让守护沿着腕间延续。';
  products.watch.expression='壮锦织纹 / 像素图案 / 链节探索';
  products.watch.image='../v4/watch-woven.webp';
  products.bobo.image='../v4/bobo-carried.webp';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let saved = [], persistent = true, toastTimer;
  try { const parsed = JSON.parse(localStorage.getItem('fealand-wishlist') || '[]'); saved = Array.isArray(parsed) ? [...new Set(parsed.filter(x => Object.hasOwn(products, x)))] : []; } catch { persistent = false; }
  function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2400); }
  function renderSaved() {
    $$('[data-save-count]').forEach(el => el.textContent = saved.length);
    $$('[data-save]').forEach(button => {
      const key = button.dataset.save, selected = saved.includes(key);
      button.setAttribute('aria-pressed', String(selected));
      button.setAttribute('aria-label', `${selected ? '取消收藏' : '收藏'}${products[key].name}`);
      button.innerHTML = button.classList.contains('save-product') ? `${selected ? '已加入心愿单' : '加入心愿单'} <span aria-hidden="true">${selected ? '✓' : '＋'}</span>` : selected ? '✓' : '＋';
    });
    $('#saved-list').innerHTML = saved.length ? saved.map(key => { const p = products[key]; return `<article class="saved-item"><a href="headphone-detail.html?product=${key}"><img src="${A+p.image}" alt="${p.name}"></a><a href="headphone-detail.html?product=${key}"><h3>${p.name}</h3><p>${p.english}</p></a><button data-remove="${key}" aria-label="移除${p.name}">移除</button></article>`; }).join('') : '<p class="empty-saved">还没有收藏的设计。<br>在喜欢的单品旁点「＋」，留给下一次相遇。</p>';
  }
  function toggleSaved(key) {
    if (!Object.hasOwn(products,key)) return;
    const adding = !saved.includes(key);
    saved = adding ? [...saved,key] : saved.filter(x => x !== key);
    try { localStorage.setItem('fealand-wishlist', JSON.stringify(saved)); } catch { persistent = false; }
    renderSaved(); toast(`${adding ? '已加入' : '已移出'}心愿单${persistent ? '' : ' · 仅本次浏览有效'}`);
  }

  const quick = document.createElement('dialog');
  quick.className='quick-view'; quick.id='quick-view'; quick.setAttribute('aria-labelledby','quick-title');
  quick.innerHTML='<button class="quick-close" data-close-dialog aria-label="关闭商品预览">关闭 ×</button><div id="quick-content"></div>';
  document.body.append(quick);
  let previewKey='', previewIndex=0;
  function previewPhoto(index) {
    const p=products[previewKey]; previewIndex=index;
    $('#quick-photo').src=A+p.photos[index]; $('#quick-photo').alt=p.name+' · '+p.labels[index];
    $$('[data-quick-photo]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    if(!reduced.matches) $('#quick-photo').animate([{opacity:.3},{opacity:1}],{duration:240});
  }
  document.addEventListener('click', e => {
    const link=e.target.closest('[data-preview]');
    if(link && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button===0) {
      e.preventDefault(); previewKey=link.dataset.preview; const p=products[previewKey];
      $('#quick-content').innerHTML=`<div class="quick-layout"><div class="quick-gallery"><img class="quick-photo" id="quick-photo" alt=""><div class="quick-tabs" aria-label="选择商品视图">${p.photos.map((photo,i)=>`<button data-quick-photo="${i}" aria-label="${p.labels[i]}" aria-pressed="false"><img src="${A+photo}" alt=""></button>`).join('')}</div></div><div class="quick-copy"><p>${p.english}</p><h2 id="quick-title">${p.name}</h2><h3>${p.line}</h3><p>${p.description}</p><button class="button save-product" data-save="${previewKey}" aria-pressed="false">加入心愿单</button><a class="text-link" href="headphone-detail.html?product=${previewKey}">完整设计故事 ↗</a></div></div>`;
      previewPhoto(p.photos.length-curated[previewKey].length); renderSaved(); openDialog(quick);
    }
    const choice=e.target.closest('[data-quick-photo]'); if(choice) previewPhoto(Number(choice.dataset.quickPhoto));
  });
  quick.addEventListener('keydown',e=>{
    if(!e.target.closest('.quick-tabs') || !['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
    e.preventDefault(); const count=products[previewKey].photos.length;
    previewPhoto(e.key==='Home'?0:e.key==='End'?count-1:(previewIndex+(e.key==='ArrowRight'?1:count-1))%count);
    $$('[data-quick-photo]')[previewIndex].focus();
  });
  document.addEventListener('click', e => {
    const save = e.target.closest('[data-save]'), remove = e.target.closest('[data-remove]'), zoom = e.target.closest('[data-zoom]');
    if (save) toggleSaved(save.dataset.save);
    if (remove) { const pos = saved.indexOf(remove.dataset.remove); toggleSaved(remove.dataset.remove); const next = $$('[data-remove]') [Math.min(pos,saved.length-1)]; (next || $('[data-close-dialog]', $('#wishlist'))).focus(); }
    if (zoom) openImage(zoom.dataset.zoom, zoom.dataset.caption || '羽境设计资料');
    if (e.target.closest('[data-open-wishlist]')) openDialog($('#wishlist'));
    if (e.target.closest('[data-close-dialog]')) e.target.closest('dialog').close();
  });
  const dialogTriggers = new WeakMap();
  function openDialog(dialog) { dialogTriggers.set(dialog,document.activeElement); dialog.showModal(); document.body.style.overflow = 'hidden'; }
  $$('dialog').forEach(dialog => {
    dialog.addEventListener('click', e => { if(e.target !== dialog) return; const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; dialogTriggers.get(dialog)?.focus(); });
  });
  function openImage(src, caption) { const img = $('#lightbox-image'); img.src = src; img.alt = caption; $('#lightbox-caption').textContent = caption; openDialog($('#lightbox')); }
  if (document.body.dataset.page === 'detail') {
    const keyParam = new URLSearchParams(location.search).get('product');
    const key = Object.hasOwn(products,keyParam) ? keyParam : 'headphones', p = products[key];
    document.title = `${p.name}｜FEALAND 羽境绽放系列`;
    $('meta[name="description"]').content = p.description;
    $('meta[property="og:title"]').content = document.title;
    $('meta[property="og:description"]').content = p.description;
    const fields = {'product-name':p.name,'breadcrumb-product':p.name,'product-english':p.english,'product-line':p.line,'product-description':p.description,'product-palette':p.palette,'product-origin':p.origin,'product-expression':p.expression,'product-scene':p.scene,'detail-title':p.title,'detail-intro':p.intro};
    Object.entries(fields).forEach(([id,value]) => $('#'+id).textContent = value);
    $('.save-product').dataset.save = key;
    $(`[data-product-link="${key}"]`).setAttribute('aria-current','page');
    $$('.related .product-card').forEach(card => { if ($('[data-save]',card).dataset.save === key) card.classList.add('is-current'); });
    $('#detail-image').src = A + p.detail; $('#detail-image').alt = `${p.name}设计细节`;
    p.notes.forEach(([title,copy],i) => { $('#note-title-'+(i+1)).textContent = title; $('#note-copy-'+(i+1)).textContent = copy; });
    let index = 0;
    $('#gallery-thumbnails').innerHTML = p.photos.map((photo,i) => `<button data-photo="${i}" aria-label="查看${p.labels[i]}" aria-pressed="${i===0}"><img src="${A+photo}" alt="${p.labels[i]}"></button>`).join('');
    function setImage(next) {
      index = (next+p.photos.length)%p.photos.length;
      const img = $('#product-image'); img.src = A+p.photos[index]; img.alt = `${p.name} · ${p.labels[index]}`;
      $('.main-product-image').dataset.photo = String(p.photoFill[index]);
      $('#gallery-count').textContent = `${String(index+1).padStart(2,'0')} / ${String(p.photos.length).padStart(2,'0')}`;
      $('#product-zoom').setAttribute('aria-label',`放大${p.labels[index]}`);
      $$('[data-photo]', $('#gallery-thumbnails')).forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.photo) === index)));
      if (!reduced.matches) img.animate([{opacity:.3,transform:'scale(.98)'},{opacity:1,transform:'scale(1)'}], {duration:260,easing:'ease-out'});
    }
    $('#gallery-thumbnails').addEventListener('click', e => { const target = e.target.closest('button'); if(target) setImage(Number(target.dataset.photo)); });
    $('#gallery-thumbnails').addEventListener('keydown', e => { if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return; e.preventDefault(); setImage(e.key==='Home'?0:e.key==='End'?p.photos.length-1:index+(e.key==='ArrowRight'?1:-1)); $$('button',$('#gallery-thumbnails'))[index].focus(); });
    $('#gallery-next').addEventListener('click', () => setImage(index+1));
    $('#product-zoom').addEventListener('click', () => openImage(A+p.photos[index],`${p.name} · ${p.labels[index]}`));
    $('#archive-grid').innerHTML = curated[key].map(([file,label]) => { const asset=curatedFile(file); return `<button data-zoom="fealand-assets/v4/${asset}" data-caption="${label}"><img src="fealand-assets/v4/${asset}" alt="${label}" loading="lazy"><span>${label}</span></button>`; }).join('');
    setImage(0);
  }
  if ($('#motif-image')) {
    const steps = [
      {image:'symbol-source.png',label:'独立符号',title:'留下最有识别度的结构。',copy:'从传统纹样的对称关系与几何秩序出发，提取轮廓，以圆角像素建立清晰、亲近的基础符号。'},
      {image:'quartet-source.png',label:'四重奏',title:'让独立符号彼此呼应。',copy:'通过旋转与组合，让基础单元形成「四重奏」。对称的结构被重新组织，保留秩序，也带来轻盈的变化。'},
      {image:'pattern-source.png',label:'连续纹样',title:'从一枚符号，生长为一个系列。',copy:'以重复与连接形成连续纹样，再根据配饰的体量与用途调整疏密，让品牌识别延续到手机壳、表带与角色细节。'}
    ];
    function setStep(index,focus=false) { const step = steps[index]; $('#motif-image').src = B+step.image; $('#motif-image').alt = step.label; $('#motif-stage').dataset.step = index; $('#motif-label').textContent = step.label; $('#step-number').textContent = `0${index+1} / 03`; $('#step-title').textContent = step.title; $('#step-copy').textContent = step.copy; $('#translation-panel').setAttribute('aria-labelledby',`step-${index}`); $$('[data-step]').filter(el=>el.tagName==='BUTTON').forEach((el,i)=>{el.setAttribute('aria-selected',String(i===index));el.tabIndex=i===index?0:-1;}); if(focus) $(`#step-${index}`).focus(); if(!reduced.matches) $('#motif-image').animate([{opacity:.2,transform:'scale(.93)'},{opacity:1,transform:'scale(1)'}],{duration:320,easing:'ease-out'}); }
    $('.translation-tabs').addEventListener('click',e=>{const button=e.target.closest('button');if(button)setStep(Number(button.dataset.step));});
    $('.translation-tabs').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const current=Number(e.target.dataset.step);setStep(e.key==='Home'?0:e.key==='End'?2:(current+(e.key==='ArrowRight'?1:2))%3,true);});
  }
  function addPortfolioDirectory() {
    // The project page already includes the complete static directory.
    if (document.querySelector('.portfolio-project-directory')) return;
    if (!document.querySelector('link[href="portfolio-directory.css"]')) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = 'portfolio-directory.css';
      document.head.append(stylesheet);
    }
    const section = document.createElement('section');
    section.className = 'portfolio-project-directory portfolio-project-directory--dark';
    section.setAttribute('aria-labelledby', 'project-directory-title-3');
    section.innerHTML = '<div class="portfolio-project-directory__inner"><div class="portfolio-project-directory__heading"><h2 id="project-directory-title-3">作品目录</h2><span>SELECT ANOTHER PROJECT</span></div><nav class="portfolio-project-directory__grid" aria-label="其他作品"><a class="portfolio-project-directory__item" href="project1.html"><span class="portfolio-project-directory__number">01</span><strong class="portfolio-project-directory__name">人类之子·AIGC短片</strong><span class="portfolio-project-directory__arrow">↗</span></a><a class="portfolio-project-directory__item" href="project2.html"><span class="portfolio-project-directory__number">02</span><strong class="portfolio-project-directory__name">秒斋果酒品牌</strong><span class="portfolio-project-directory__arrow">↗</span></a><a class="portfolio-project-directory__item" href="project3.html" aria-current="page"><span class="portfolio-project-directory__number">03</span><strong class="portfolio-project-directory__name">羽境 FEALAND</strong><span class="portfolio-project-directory__arrow">↗</span></a><a class="portfolio-project-directory__item" href="project4new/index.html"><span class="portfolio-project-directory__number">04</span><strong class="portfolio-project-directory__name">IDENTIFIER 卡牌游戏</strong><span class="portfolio-project-directory__arrow">↗</span></a><span class="portfolio-project-directory__item portfolio-project-directory__item--unavailable" aria-disabled="true"><span class="portfolio-project-directory__number">05</span><strong class="portfolio-project-directory__name">LUMINOVA 疗愈IP设计</strong><span class="portfolio-project-directory__arrow">整理中</span></span><span class="portfolio-project-directory__item portfolio-project-directory__item--unavailable" aria-disabled="true"><span class="portfolio-project-directory__number">06</span><strong class="portfolio-project-directory__name">骨乐器交互产品</strong><span class="portfolio-project-directory__arrow">整理中</span></span></nav></div>';
    $('main')?.append(section);
  }
  addPortfolioDirectory();
  renderSaved();
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
    $$('.section-heading,.origin-copy,.detail-notes article,.editorial,.collection-piece').forEach(el => {el.classList.add('reveal','ready');observer.observe(el);});
  }
  if (document.body.dataset.page==='home' && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){$$('.main-nav a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-10% 0px -65% 0px',threshold:0});
    ['collection','story','language','companions'].forEach(id=>navObserver.observe($('#'+id)));
  }
})();
