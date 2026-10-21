/**
 * Decode an element's text left-to-right through random glyphs, then restore it.
 * The original text is cached on data-orig so overlapping runs never lose it.
 */
export function scrambleText(el: HTMLElement, dur: number, delay = 0, glyphs = "ABCDEFGHKMNPRSTXZ0123456789/#_-", underscores = false) {
  return new Promise<void>(res => {
    const orig = el.dataset.orig || (el.dataset.orig = el.textContent || "");
    const keep = underscores ? /[^ ·|]/g : /[^ ·|↗↓]/g;
    const rnd = () => glyphs[Math.floor(Math.random() * glyphs.length)];
    const t0 = performance.now() + delay;
    const tick = (t: number) => {
      const p = (t - t0) / dur;
      if (p < 0) { requestAnimationFrame(tick); return; }
      if (p >= 1) { el.textContent = orig; res(); return; }
      const done = Math.floor(orig.length * p);
      el.textContent = orig.slice(0, done) + orig.slice(done).replace(keep, () => (underscores && Math.random() < 0.5 ? "_" : rnd()));
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
