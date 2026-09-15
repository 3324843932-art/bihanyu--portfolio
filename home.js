'use strict';
const v = document.getElementById('mv');
const b = document.getElementById('cb');
const home = document.getElementById('home');
const overlay = document.getElementById('ov');
const closeButton = document.querySelector('.cl');
const playToggle = document.getElementById('playToggle');
const panels = ['dr','jp','about'].map(id => document.getElementById(id));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
// Play the cover film at its original speed.
v.defaultPlaybackRate = 1;
v.playbackRate = 1;
let userPaused = reduceMotion.matches, focusHeld = false;
let activePanel = null, returnFocus = null, frameId;
// Coordinates in the 960 × 540 source frame, calibrated from the supplied film.
// The anchor follows the character's torso, not the original guessed diagonal.
const paths = [
  [[1,95,-18],[3,346,135],[6,717,366],[7.5,905,482]],
  [[10.7,65,550],[13,423,272],[15.3,782,-6]]
];
function pointAt(t) {
  for (const points of paths) {
    if (t < points[0][0] || t > points[points.length-1][0]) continue;
    for (let i=1;i<points.length;i++) {
      if (t<=points[i][0]) {
        const a=points[i-1],c=points[i],f=(t-a[0])/(c[0]-a[0]);
        return {x:a[1]+(c[1]-a[1])*f,y:a[2]+(c[2]-a[2])*f};
      }
    }
  }
  return null;
}
let geometry;
let lastTargetPoint = {x:346,y:135};
function measure(){
  const rect=home.getBoundingClientRect(),dock=document.querySelector('.home-dock').getBoundingClientRect();
  const scale=Math.max(rect.width/960,rect.height/540);
  geometry={width:rect.width,height:rect.height,scale,ox:(rect.width-960*scale)/2,oy:(rect.height-540*scale)/2,dockTop:dock.top};
  updateTarget();
}
function updateTarget(){
  const point=pointAt(v.currentTime);
  if(point)lastTargetPoint=point;
  if(!geometry || activePanel){b.classList.remove('visible');return;}
  const g=geometry,x=lastTargetPoint.x*g.scale+g.ox,y=lastTargetPoint.y*g.scale+g.oy;
  b.classList.add('visible');
  // Keep the whole label within the space between navigation and the dock.
  // Hold the last position between passes instead of hiding the label.
  const maxLeft=Math.max(14,g.width-b.offsetWidth-18);
  const maxTop=Math.max(105,g.dockTop-b.offsetHeight-12);
  const left=Math.max(14,Math.min(maxLeft,x-b.offsetWidth/2));
  const top=Math.max(105,Math.min(maxTop,y-b.offsetHeight/2));
  b.style.transform=`translate3d(${left}px,${top}px,0)`;
}

function syncPlayback(){
  const shouldPause=userPaused||focusHeld||!!activePanel||document.hidden;
  if(shouldPause)v.pause();else v.play().catch(()=>{userPaused=true;updatePlayButton();});
  updatePlayButton();
}
function updatePlayButton(){
  playToggle.textContent=userPaused?'播放画面':'暂停画面';
  playToggle.setAttribute('aria-label',userPaused?'播放封面视频':'暂停封面视频');
  playToggle.setAttribute('aria-pressed',String(userPaused));
}
playToggle.onclick=()=>{userPaused=!userPaused;syncPlayback();};
b.addEventListener('focus',()=>{focusHeld=true;syncPlayback();});
b.addEventListener('blur',()=>{focusHeld=false;syncPlayback();});
b.onclick=()=>showProject();
function openPanel(id){
  if(!activePanel)returnFocus=document.activeElement;
  activePanel=document.getElementById(id);
  panels.forEach(panel=>{const active=panel===activePanel;panel.classList.toggle('a',active);panel.inert=!active;});
  overlay.classList.toggle('a',id!=='about');
  home.inert=true;focusHeld=false;
  closeButton.tabIndex=id==='about'?-1:0;
  updateTarget();syncPlayback();
  const first=activePanel.querySelector('button,a[href]:not([aria-disabled])');
  (first||closeButton).focus({preventScroll:true});
}
function showProject(){openPanel('jp');}
function showMenuOnly(){openPanel('dr');}
function showAbout(){openPanel('about');}
function ca(){
  panels.forEach(panel=>{panel.classList.remove('a');panel.inert=true;});
  overlay.classList.remove('a');activePanel=null;home.inert=false;
  closeButton.tabIndex=-1;focusHeld=false;
  updateTarget();
  if(returnFocus&&returnFocus.isConnected&&returnFocus.getClientRects().length)returnFocus.focus({preventScroll:true});
  syncPlayback();
}
function closeAbout(){ca();}
overlay.onclick=ca;closeButton.tabIndex=-1;
document.addEventListener('keydown',event=>{
  if(!activePanel)return;
  if(event.key==='Escape'){event.preventDefault();ca();return;}
  if(event.key==='Tab'){
    const items=[...activePanel.querySelectorAll('button,a[href]:not([aria-disabled])')];
    if(activePanel.id!=='about')items.push(closeButton);
    const first=items[0],last=items[items.length-1];
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
});
// Existing sixth project has no destination; expose that honestly instead of a dead link.
const pending=document.querySelector('#dr a[href="#"]');
if(pending){pending.removeAttribute('href');pending.setAttribute('aria-disabled','true');pending.insertAdjacentHTML('beforeend','<span class="ni-sub">整理中</span>');}
v.addEventListener('loadedmetadata',()=>{
  // Begin with the character already in view; subsequent loops retain the complete film.
  if(v.currentTime<.1)v.currentTime=3;
  measure();syncPlayback();
},{once:true});
v.addEventListener('loadeddata',updateTarget);
v.addEventListener('seeked',updateTarget);
v.addEventListener('error',()=>{document.getElementById('videoStatus').hidden=false;updateTarget();userPaused=true;updatePlayButton();});
v.querySelector('source').addEventListener('error',()=>{document.getElementById('videoStatus').hidden=false;});
document.addEventListener('visibilitychange',syncPlayback);
reduceMotion.addEventListener('change',e=>{userPaused=e.matches;syncPlayback();});
window.addEventListener('resize',measure);
function nextFrame(){updateTarget();frameId=v.requestVideoFrameCallback?v.requestVideoFrameCallback(nextFrame):requestAnimationFrame(nextFrame);}
window.addEventListener('pagehide',()=>{if(v.cancelVideoFrameCallback)v.cancelVideoFrameCallback(frameId);else cancelAnimationFrame(frameId);v.pause();});
window.addEventListener('pageshow',e=>{if(e.persisted){measure();syncPlayback();nextFrame();}});
measure();nextFrame();syncPlayback();
if(v.readyState>=1){if(v.currentTime<.1)v.currentTime=3;measure();}
