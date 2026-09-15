/* IDENTIFIER: original artwork, explicit choices, and three connected chapters. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const colors = {
    emotional: {name:'感性', en:'Emotional', color:'#c3ed49', wash:'#e2e9c5', base:0},
    rational: {name:'理性', en:'Rational', color:'#a7dce3', wash:'#dce7e5', base:6},
    neutral: {name:'中立', en:'Neutral', color:'#dfb7ed', wash:'#e9dfeb', base:3}
  };
  const shapes = {
    yes:{name:'认同',symbol:'□',en:'Identity',offset:1},
    or:{name:'中立',symbol:'○',en:'Neutral',offset:2},
    no:{name:'不认同',symbol:'△',en:'Non-identity',offset:3}
  };
  const artwork = (camp,shape) => `assets/editorial/card-${colors[camp].base + shapes[shape].offset}.webp`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const scrollTo = el => el.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
  const number = value => String(value).padStart(2,'0');

  // 1. Record intensity without inventing a diagnostic colour score.
  let camp = null;
  const emotions = [
    ['童年记忆','CHILDHOOD'],['重要转折','TURNING POINT'],['现在的生活','PRESENT'],['关系与角色','RELATIONSHIP'],['对未来的期待','FUTURE']
  ];
  $('emotionTrace').innerHTML = emotions.map(([cn,en],i) => `<div class="id-emotion-row"><label for="emotion-${i}">${cn}<span>${en}</span></label><div class="id-emotion-dot-area" aria-hidden="true"><i class="id-emotion-dot" id="emotionDot-${i}" style="--dot-size:28px"></i></div><input id="emotion-${i}" type="range" min="1" max="5" step="1" value="3" aria-label="${cn}的情绪强度" aria-valuetext="3，情绪波动中等"><output id="emotionValue-${i}" for="emotion-${i}">3</output></div>`).join('');
  emotions.forEach((_,i) => {
    $(`emotion-${i}`).addEventListener('input',e => {
      const v=Number(e.target.value);
      $(`emotionDot-${i}`).style.setProperty('--dot-size',`${10+v*6}px`);
      $(`emotionValue-${i}`).textContent=v;
      e.target.setAttribute('aria-valuetext',`${v}，${['平缓','轻微','中等','明显','强烈'][v-1]}`);
    });
  });
  document.querySelectorAll('[data-colour]').forEach(button => button.addEventListener('click',() => {
    camp=button.dataset.colour;
    document.querySelectorAll('[data-colour]').forEach(b => b.setAttribute('aria-pressed',String(b===button)));
    $('emotionTrace').style.setProperty('--trace-colour',colors[camp].color);
    $('colourStatus').textContent=`已选择${colors[camp].name}。接下来，用完整的 10 道题记录身份立场。`;
    $('beginQuestions').disabled=false;
  }));

  // Every question in the supplied original contributes to the identity shape.
  const questions=[
    '您的童年生活是否在幸福中度过？',
    '您对您现在的职业感到还算满意？',
    '您认为自己在家庭中扮演着重要角色？',
    '您认为自己在社会中扮演着重要角色？',
    '您经常处于某一事件的中心？',
    '您认为自己的经济状况良好？',
    '您认为自己的心理状态良好？',
    '您在生活中有至少一个至交的好友吗？',
    '您对未来的生活充满期待吗？',
    '您是否已经实现了重要的人生目标？'
  ];
  let current=0, answers=Array(10).fill(null), tieMode=false;
  function setPhase(index) {
    ['emotionPhase','answerPhase','resultPhase'].forEach((id,i) => $(id).classList.toggle('is-current',i===index));
    $('emotionPanel').hidden=index!==0;
    $('answerPanel').hidden=index!==1;
    $('quizResult').hidden=index!==2;
  }
  function tally() {return answers.reduce((tot,a) => {if(a)tot[a]++;return tot;},{yes:0,or:0,no:0});}
  function shapeSvg(type,x,y,color,filled=false) {
    const attrs=`fill="${filled?color:'none'}" stroke="${color}" stroke-width="1.5"`;
    if(type==='yes')return `<rect x="${x-9}" y="${y-9}" width="18" height="18" ${attrs}/>`;
    if(type==='no')return `<path d="M${x} ${y-11}l11 20h-22Z" ${attrs}/>`;
    return `<circle cx="${x}" cy="${y}" r="10" ${attrs}/>`;
  }
  function renderAnswerMap() {
    const c=colors[camp],t=tally();
    $('sheetColour').textContent=`${c.name.toUpperCase()} / ${c.en.toUpperCase()}`;
    let svg='<rect x="35" y="32" width="290" height="320" fill="none" stroke="#9ca58d"/><path d="M180 32L35 352H325Z" fill="none" stroke="#b5bba9"/><circle cx="180" cy="258" r="94" fill="none" stroke="#b5bba9"/><circle cx="180" cy="258" r="6" fill="#20221e"/><text x="180" y="238" text-anchor="middle" font-size="11" fill="#20221e">ME</text>';
    answers.forEach((a,i)=>{
      const angle=(-90+i*36)*Math.PI/180;
      const x=180+128*Math.cos(angle),y=190+128*Math.sin(angle);
      svg+=shapeSvg(a||'or',x,y,a?c.color:'#b2b9a6',!!a);
      svg+=`<text x="${x}" y="${y+24}" text-anchor="middle" font-size="9" fill="#525a47">${number(i+1)}</text>`;
      if(i===current&&!tieMode)svg+=`<circle cx="${x}" cy="${y}" r="16" stroke="#20221e" stroke-width="1" fill="none"/>`;
    });
    $('answerMap').innerHTML=svg;
    $('answerCounts').textContent=`□ 是 ${t.yes}　　○ 中立 ${t.or}　　△ 否 ${t.no}`;
  }
  function renderQuestion(focus=false) {
    tieMode=false;
    $('questionProgress').textContent=`QUESTION ${number(current+1)} / 10`;
    $('questionContent').innerHTML=`<h3 id="activeQuestion" tabindex="-1">${questions[current]}</h3><div class="id-answer-options" role="group" aria-labelledby="activeQuestion">${Object.entries(shapes).map(([key,sh])=>`<button type="button" data-answer="${key}" aria-pressed="${answers[current]===key}"><span aria-hidden="true">${sh.symbol}</span>${key==='yes'?'是 YES':key==='no'?'否 NO':'中立 OR'}</button>`).join('')}</div>`;
    $('questionContent').querySelectorAll('[data-answer]').forEach(btn=>btn.addEventListener('click',()=>{
      answers[current]=btn.dataset.answer;
      $('questionContent').querySelectorAll('[data-answer]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
      $('nextQuestion').disabled=false;
      renderAnswerMap();
    }));
    $('previousQuestion').textContent=current===0?'← 返回颜色选择':'← 上一题';
    $('nextQuestion').hidden=false;
    $('nextQuestion').disabled=!answers[current];
    $('nextQuestion').textContent=current===9?'查看我的卡牌 ↗':'下一题 →';
    renderAnswerMap();
    if(focus)$('activeQuestion').focus({preventScroll:true});
  }
  $('beginQuestions').addEventListener('click',()=>{if(!camp)return;setPhase(1);renderQuestion(true);scrollTo($('answerPhase').parentElement);});
  $('previousQuestion').addEventListener('click',()=>{
    if(tieMode){current=9;renderQuestion(true);return;}
    if(current===0){setPhase(0);$('beginQuestions').focus({preventScroll:true});return;}
    current--;renderQuestion(true);
  });
  $('nextQuestion').addEventListener('click',()=>{
    if(!answers[current]||tieMode)return;
    if(current<9){current++;renderQuestion(true);return;}
    const t=tally(),max=Math.max(...Object.values(t)),leaders=Object.keys(t).filter(key=>t[key]===max);
    if(leaders.length===1){showResult(leaders[0]);return;}
    tieMode=true;
    $('questionProgress').textContent='A SHARED RESULT / 并列的形状';
    $('questionContent').innerHTML=`<h3 id="activeQuestion" tabindex="-1">有两种立场，与你同样接近。</h3><p>最高次数出现并列。回看刚才的回答，在并列形状中选择更贴近此刻的一个。</p><div class="id-answer-options" role="group" aria-labelledby="activeQuestion">${leaders.map(key=>`<button data-tie="${key}"><span>${shapes[key].symbol}</span>${shapes[key].name} · ${t[key]} 次</button>`).join('')}</div>`;
    $('questionContent').querySelectorAll('[data-tie]').forEach(btn=>btn.addEventListener('click',()=>showResult(btn.dataset.tie,true)));
    $('nextQuestion').hidden=true;
    $('previousQuestion').textContent='← 回看回答';
    $('activeQuestion').focus({preventScroll:true});
  });
  function showResult(shape,isTie=false) {
    const c=colors[camp],sh=shapes[shape],t=tally();
    setPhase(2);
    $('quizResult').innerHTML=`<div class="id-result-art"><img src="${artwork(camp,shape)}" alt="${c.name}${sh.name}身份卡牌"></div><div><span class="id-small">YOUR IDENTITY, AT THIS MOMENT</span><div class="id-result-formula">${c.en.toUpperCase()} × ${sh.en.toUpperCase()}</div><h3 tabindex="-1" id="resultHeading">${c.name} · ${sh.name}</h3><div class="id-tally"><span>□ 是 ${t.yes}</span><span>○ 中立 ${t.or}</span><span>△ 否 ${t.no}</span></div><p>你选择了${c.name}的颜色；${isTie?'在并列的答案中，选择了':`在十道身份题中，「${shape==='yes'?'是':shape==='no'?'否':'中立'}」出现最多，对应`}${sh.symbol} ${sh.name}的形状。它们一起，记录这次探索中的自我感受。</p><p class="id-helper">这是此刻的记录。新的经历，也可能带来新的回答。</p><div class="id-result-actions"><a class="id-btn" href="#groupSection">看看我与世界的关系 ↗</a><button class="id-plain" id="restartExploration">重新探索 ↺</button></div></div>`;
    $('restartExploration').addEventListener('click',()=>{
      current=0;answers=Array(10).fill(null);tieMode=false;setPhase(0);
      $('beginQuestions').focus({preventScroll:true});
      scrollTo($('emotionPhase').parentElement);
    });
    $('resultHeading').focus({preventScroll:true});
    scrollTo($('emotionPhase').parentElement);
  }

  // 2. A true nine-card matrix; no duplicated carousel cards or ambiguous arrows.
  const matrix=$('cardMatrix');
  ['emotional','rational','neutral'].forEach(campKey=>{
    ['or','no','yes'].forEach(shape=>{
      const c=colors[campKey],sh=shapes[shape],n=c.base+sh.offset;
      const button=document.createElement('button');
      button.type='button';button.className='id-atlas-card';button.dataset.camp=campKey;
      button.setAttribute('aria-pressed','false');button.setAttribute('aria-label',`${c.name} · ${sh.name}，点击翻看含义`);
      button.innerHTML=`<span class="id-card-frame" style="--card-wash:${c.wash}" data-symbol="${sh.symbol}"><span class="id-atlas-inner"><span class="id-atlas-front"><img src="${artwork(campKey,shape)}" loading="lazy" width="720" height="1250" alt="${c.name}${sh.name}原始卡牌插画"></span><span class="id-atlas-back" aria-hidden="true"><span>${sh.symbol}</span><strong>${c.name} · ${sh.name}</strong><span class="id-card-meaning">${c.name}是你选择的颜色。${sh.symbol} ${sh.name}是身份题记录的立场。</span><small>此刻的你，如何理解这张卡？<br>再次点击返回插画 ↻</small></span></span></span><span class="id-card-caption"><span>${number(n)}</span><strong>${c.name} · ${sh.name}</strong><span>↻</span></span>`;
      button.addEventListener('click',()=>{
        const flipped=button.getAttribute('aria-pressed')!=='true';
        button.setAttribute('aria-pressed',String(flipped));
        button.setAttribute('aria-label',`${c.name} · ${sh.name}，点击${flipped?'返回插画':'翻看含义'}`);
        button.querySelector('.id-atlas-front').setAttribute('aria-hidden',String(flipped));
        button.querySelector('.id-atlas-back').setAttribute('aria-hidden',String(!flipped));
      });
      matrix.append(button);
    });
  });
  document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    matrix.querySelectorAll('[data-camp]').forEach(card=>card.hidden=btn.dataset.filter!=='all'&&card.dataset.camp!==btn.dataset.filter);
  }));

  // 3. Persistent, draggable relationship marks, including touch and keyboard.
  const svgNS='http://www.w3.org/2000/svg';
  const relationNames={family:'家人',friend:'朋友',stranger:'陌生人'};
  const relationPoints={family:null,friend:null,stranger:null};
  let relation='family',relationDrag=false;
  const relMap=$('relationMap');
  function pointIn(svg,e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  function chooseRelation(key){
    relation=key;
    document.querySelectorAll('[data-relation]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.relation===key)));
    $('relationPrompt').textContent=`想起${key==='family'?'一位家人':key==='friend'?'一位朋友':'一位陌生人'}。在图中，标记你感受到的距离。`;
    renderRelations();
  }
  function renderRelations(){
    $('relationMarkers').innerHTML=Object.entries(relationPoints).filter(([,p])=>p).map(([key,p])=>`<g data-person="${key}"><circle cx="${p.x}" cy="${p.y}" r="${key===relation?15:12}" stroke="#b74633" stroke-width="${key===relation?2.5:1.5}" fill="#e9e7e0"/><circle cx="${p.x}" cy="${p.y}" r="3" fill="#b74633"/><text x="${p.x}" y="${p.y-21}" text-anchor="middle" font-size="11" fill="#9e382a">${relationNames[key]}</text></g>`).join('');
  }
  function placeRelation(x,y){
    relationPoints[relation]={x:clamp(x,58,422),y:clamp(y,64,412)};
    renderRelations();
    const count=Object.values(relationPoints).filter(Boolean).length;
    $('relationStatus').textContent=`已记录${relationNames[relation]}的位置 · ${count}/3 种关系。可以继续移动，或切换其他关系。`;
  }
  document.querySelectorAll('[data-relation]').forEach(b=>b.addEventListener('click',()=>chooseRelation(b.dataset.relation)));
  relMap.addEventListener('pointerdown',e=>{
    if(e.button!==0)return;
    const marker=e.target.closest('[data-person]');if(marker)chooseRelation(marker.dataset.person);
    relationDrag=true;relMap.setPointerCapture(e.pointerId);relMap.focus({preventScroll:true});
    const p=pointIn(relMap,e);placeRelation(p.x,p.y);
  });
  relMap.addEventListener('pointermove',e=>{if(relationDrag){const p=pointIn(relMap,e);placeRelation(p.x,p.y);}});
  ['pointerup','pointercancel','lostpointercapture'].forEach(event=>relMap.addEventListener(event,()=>relationDrag=false));
  relMap.addEventListener('keydown',e=>{
    if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;
    e.preventDefault();const p=relationPoints[relation]||{x:240,y:306.4},d=e.shiftKey?20:5;
    placeRelation(p.x+(e.key==='ArrowRight'?d:e.key==='ArrowLeft'?-d:0),p.y+(e.key==='ArrowDown'?d:e.key==='ArrowUp'?-d:0));
  });
  $('resetRelations').addEventListener('click',()=>{
    Object.keys(relationPoints).forEach(k=>relationPoints[k]=null);chooseRelation('family');
    $('relationStatus').textContent='已清空标记。选择关系，再点击图面放置。';
  });

  // 4. Life CD: open composition, not a second personality score.
  const cd=$('cdCanvas'),fragments=$('cdFragments');
  const timeColors={past:'cdLime',present:'cdAqua',future:'cdLilac'};
  const timeNames={past:'过去',present:'现在',future:'未来'};
  const timePrompts={past:'过去：哪些经历，塑造了现在的你？',present:'现在：哪些人和事，与你最紧密地相连？',future:'未来：你希望给自己留下怎样的可能？'};
  const initialPieces=Array.from({length:9},(_,i)=>({x:155+(i%3)*235,y:110+Math.floor(i/3)*155,angle:[-32,90,180,210,-25,140,5,65,250][i],time:['past','present','future'][Math.floor(i/3)],sweep:[280,110,170,140,300,90,100,165,290][i],radius:[63,78,70,73,62,85,81,74,60][i]}));
  let pieces=initialPieces.map(p=>({...p})),selected=0,dragId=null,dragOffset=null;
  function annularPath(radius,sweep){
    const r=radius*.3,end=sweep*Math.PI/180;
    return `M${radius} 0 A${radius} ${radius} 0 ${sweep>180?1:0} 1 ${radius*Math.cos(end)} ${radius*Math.sin(end)} L${r*Math.cos(end)} ${r*Math.sin(end)} A${r} ${r} 0 ${sweep>180?1:0} 0 ${r} 0 Z`;
  }
  function syncPiece(i){
    const p=pieces[i],el=$(`cdPiece-${i}`);
    el.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${p.angle})`);
    el.setAttribute('aria-label',`碎片 ${i+1}，${timeNames[p.time]}；方向键移动，R 键旋转`);
    el.querySelector('path').setAttribute('fill',`url(#${timeColors[p.time]})`);
    el.querySelector('path').setAttribute('stroke',i===selected?'#303a26':'#7d8772');
    el.querySelector('path').setAttribute('stroke-width',i===selected?'2':'0.65');
  }
  function syncControls(){
    $('cdSelectionLabel').textContent=`FRAGMENT ${number(selected+1)} / 09`;
    document.querySelectorAll('[data-time]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.time===pieces[selected].time)));
    $('cdTimePrompt').textContent=timePrompts[pieces[selected].time];
  }
  function choosePiece(i){const prev=selected;selected=i;syncPiece(prev);syncPiece(i);syncControls();}
  function renderPieces(){
    fragments.innerHTML='';
    pieces.forEach((p,i)=>{
      const g=document.createElementNS(svgNS,'g');g.id=`cdPiece-${i}`;g.dataset.piece=i;g.setAttribute('tabindex','0');g.setAttribute('role','button');
      g.innerHTML=`<path d="${annularPath(p.radius,p.sweep)}"/>`;
      g.addEventListener('focus',()=>choosePiece(i));
      fragments.append(g);syncPiece(i);
    });
    syncControls();
  }
  cd.addEventListener('pointerdown',e=>{
    if(e.button!==0)return;
    const piece=e.target.closest('[data-piece]');if(!piece)return;
    e.preventDefault();choosePiece(Number(piece.dataset.piece));piece.focus({preventScroll:true});
    const pos=pointIn(cd,e);dragOffset={x:pos.x-pieces[selected].x,y:pos.y-pieces[selected].y};dragId=e.pointerId;cd.setPointerCapture(e.pointerId);
  });
  cd.addEventListener('pointermove',e=>{
    if(e.pointerId!==dragId)return;
    const pos=pointIn(cd,e),p=pieces[selected];
    p.x=clamp(pos.x-dragOffset.x,90,690);p.y=clamp(pos.y-dragOffset.y,90,440);syncPiece(selected);
  });
  ['pointerup','pointercancel','lostpointercapture'].forEach(event=>cd.addEventListener(event,()=>{dragId=null;dragOffset=null;}));
  cd.addEventListener('keydown',e=>{
    if(!e.target.closest('[data-piece]'))return;
    const p=pieces[selected],step=e.shiftKey?20:5;
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)){
      e.preventDefault();p.x=clamp(p.x+(e.key==='ArrowRight'?step:e.key==='ArrowLeft'?-step:0),90,690);p.y=clamp(p.y+(e.key==='ArrowDown'?step:e.key==='ArrowUp'?-step:0),90,440);syncPiece(selected);
    }else if(e.key.toLowerCase()==='r'||e.key==='Enter'||e.key===' '){e.preventDefault();p.angle=(p.angle+30)%360;syncPiece(selected);}
  });
  $('rotateFragment').addEventListener('click',()=>{pieces[selected].angle=(pieces[selected].angle+30)%360;syncPiece(selected);});
  $('resetComposition').addEventListener('click',()=>{pieces=initialPieces.map(p=>({...p}));selected=0;renderPieces();$('saveStatus').textContent='已恢复初始拼图。';});
  document.querySelectorAll('[data-time]').forEach(b=>b.addEventListener('click',()=>{pieces[selected].time=b.dataset.time;syncPiece(selected);syncControls();}));
  let compositionURL=null;
  $('saveComposition').addEventListener('click',()=>{
    const copy=cd.cloneNode(true);copy.setAttribute('xmlns',svgNS);copy.setAttribute('width','1560');copy.setAttribute('height','1060');copy.setAttribute('aria-label','My lifetime CD — IDENTIFIER');
    copy.querySelectorAll('[data-piece]').forEach(g=>{g.removeAttribute('tabindex');g.removeAttribute('role');g.querySelector('path').setAttribute('stroke-width','.65');});
    if(compositionURL)URL.revokeObjectURL(compositionURL);
    compositionURL=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(copy)],{type:'image/svg+xml;charset=utf-8'}));
    returnFocus=$('saveComposition');
    $('artImage').src=compositionURL;
    $('artImage').alt='我拼合的人生 CD：过去、现在与未来的九块彩色碎片';
    $('artCaption').textContent='我的人生 CD · 已生成 SVG 图片';
    $('artScroll').classList.remove('is-zoomed');$('artZoom').textContent='放大阅读 ＋';
    exportLink.href=compositionURL;exportLink.hidden=false;
    dialog.showModal();$('artScroll').scrollTo(0,0);
    $('saveStatus').textContent='图片已生成，可在预览中下载，也可右键另存图片。';
  });
  renderPieces();

  // Source boards stay readable in a native, keyboard-accessible dialog.
  const dialog=$('artDialog');let returnFocus=null;
  const exportLink=document.createElement('a');
  exportLink.className='id-dialog-download';exportLink.textContent='下载 SVG ↓';
  exportLink.download='IDENTIFIER-my-lifetime-CD.svg';exportLink.hidden=true;
  $('artZoom').before(exportLink);
  document.querySelectorAll('[data-art]').forEach(button=>button.addEventListener('click',()=>{
    returnFocus=button;
    $('artImage').src=`assets/editorial/${button.dataset.art}.webp`;
    $('artImage').alt=button.dataset.caption;
    $('artCaption').textContent=button.dataset.caption;
    exportLink.hidden=true;
    $('artScroll').classList.remove('is-zoomed');$('artZoom').textContent='放大阅读 ＋';
    dialog.showModal();$('artScroll').scrollTo(0,0);
  }));
  $('artClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{if(returnFocus)returnFocus.focus({preventScroll:true});});
  $('artZoom').addEventListener('click',()=>{
    const zoomed=$('artScroll').classList.toggle('is-zoomed');
    $('artZoom').textContent=zoomed?'适应窗口 −':'放大阅读 ＋';
  });
  // Current chapter hint. Scoped to navigation; interview content is untouched.
  const navLinks=[...document.querySelectorAll('.id-nav .nav-links a')];
  const navObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(link=>{
      if(link.hash===`#${entry.target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });});
  },{rootMargin:'-15% 0px -60% 0px',threshold:0});
  navLinks.forEach(a=>{const target=document.querySelector(a.hash);if(target)navObserver.observe(target);});
  navObserver.observe($('hero'));
})();
