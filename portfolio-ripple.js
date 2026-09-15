/* Bounded, idle-free pointer ripples; native cursor and all hit targets preserved. */
(() => {
  'use strict';
  if (document.getElementById('portfolio-ripples')) return;
  const media = matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)');
  const layer = document.createElement('div');
  layer.id = 'portfolio-ripples';
  layer.setAttribute('aria-hidden', 'true');
  document.body.append(layer);
  let last = 0, x = -1000, y = -1000;
  function ring(px, py, click) {
    if (media.matches || document.hidden) return;
    while (layer.childElementCount >= 10) layer.firstElementChild.remove();
    const el = document.createElement('i');
    el.className = 'portfolio-ripple';
    layer.append(el);
    const move = `translate3d(${px}px,${py}px,0)`;
    const animation = el.animate([
      { transform: `${move} scale(.08)`, opacity: click ? .7 : .36 },
      { transform: `${move} scale(${click ? 1.7 : 1})`, opacity: 0 }
    ], { duration: click ? 1350 : 1050, easing: 'cubic-bezier(.16, .6, .3, 1)' });
    animation.onfinish = () => el.remove();
  }
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || media.matches) return;
    const now = performance.now();
    if (now - last < 95 || Math.hypot(e.clientX-x, e.clientY-y) < 22) return;
    last = now; x = e.clientX; y = e.clientY;
    ring(x, y, false);
  }, { passive: true });
  addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') ring(e.clientX, e.clientY, true);
  }, { passive: true });
  const clear = () => layer.replaceChildren();
  document.addEventListener('visibilitychange', clear);
  media.addEventListener('change', clear);
})();
