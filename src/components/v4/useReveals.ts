"use client";
import { useEffect } from "react";

const wipe = (el: Element, duration: number, delay: number) =>
  el.animate([{ clipPath: "inset(-20% 100% -20% 0)" }, { clipPath: "inset(-20% 0% -20% 0)" }], { duration, delay, easing: "cubic-bezier(.5,0,.3,1)", fill: "both" });

type Hidden = HTMLElement & { dataset: DOMStringMap };

/** Prepares every [data-reveal] block in the page, then plays its entrance once it is 30% on screen. */
export default function useReveals() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const blocks = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const prep = (el: Hidden) => {
      const t = el.dataset.reveal;
      const lines = el.querySelectorAll<HTMLElement>("[data-line]");
      if (t === "lines" || t === "bars") lines.forEach(l => (l.style.clipPath = "inset(-20% 100% -20% 0)"));
      if (t === "bars") el.querySelectorAll<HTMLElement>("[data-bar2]").forEach(b => (b.style.transform = "scaleX(0)"));
      // Each line keeps its full text, the untyped rest just invisible, so the terminal is already
      // its final height (wrapping included) before a single character appears.
      if (t === "type") el.querySelectorAll<HTMLElement>("[data-tline]").forEach(l => {
        const full = l.textContent || "";
        l.dataset.full = full;
        l.replaceChildren(document.createElement("span"), Object.assign(document.createElement("span"), { textContent: full, style: "visibility:hidden" }));
      });
      if (t === "check") {
        el.querySelectorAll<HTMLElement>("[data-check]").forEach(c => (c.style.opacity = ".25"));
        el.querySelectorAll<HTMLElement>("[data-box]").forEach(b => { b.style.background = "transparent"; b.style.color = "transparent"; });
        const sb = el.querySelector<HTMLElement>("[data-sbar]"); if (sb) sb.style.transform = "scaleX(0)";
      }
      if (t === "fade") { el.style.opacity = "0"; el.style.transform = "translateY(24px)"; }
      if (t === "sig") el.style.clipPath = "inset(-20% 100% -20% 0)";
      if (t === "line") el.style.transform = "scaleY(0)";
    };

    const play = (el: Hidden) => {
      const t = el.dataset.reveal;
      if (t === "lines") el.querySelectorAll<HTMLElement>("[data-line]").forEach((l, i) => wipe(l, 650, i * 420).finished.then(() => (l.style.clipPath = "")));
      if (t === "bars") {
        el.querySelectorAll<HTMLElement>("[data-bar2]").forEach((b, i) =>
          b.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 700, delay: 200 + i * 350, easing: "cubic-bezier(.6,0,.2,1)", fill: "forwards" }).finished.then(() => (b.style.transform = "")));
        el.querySelectorAll<HTMLElement>("[data-line]").forEach(l => wipe(l, 700, 1500).finished.then(() => (l.style.clipPath = "")));
      }
      if (t === "type") {
        const lines = [...el.querySelectorAll<HTMLElement>("[data-tline]")];
        let li = 0;
        const next = () => {
          if (li >= lines.length) return;
          const l = lines[li++], full = l.dataset.full || "", isCmd = full.startsWith("$");
          let c = 0;
          const [typed, rest] = l.children as unknown as [HTMLElement, HTMLElement];
          const step = () => {
            c += isCmd ? 1 : 4;
            typed.textContent = full.slice(0, c); rest.textContent = full.slice(c);
            if (c < full.length) later(step, isCmd ? 34 : 12); else later(next, isCmd ? 260 : 120);
          };
          step();
        };
        next();
      }
      if (t === "check") {
        const rows = [...el.querySelectorAll<HTMLElement>("[data-check]")];
        rows.forEach((r, i) => later(() => {
          r.style.transition = "opacity .3s"; r.style.opacity = "1";
          const b = r.querySelector<HTMLElement>("[data-box]")!;
          b.style.transition = "background .2s, color .2s"; b.style.background = "var(--ok)"; b.style.color = "var(--bg)";
          b.animate([{ transform: "scale(1.5)" }, { transform: "scale(1)" }], { duration: 300, easing: "ease-out" });
        }, 250 + i * 320));
        const sb = el.querySelector<HTMLElement>("[data-sbar]")!, st = el.querySelector<HTMLElement>("[data-stext]")!, sd = el.querySelector<HTMLElement>("[data-sdot]")!;
        const t0 = performance.now() + 250 + rows.length * 320, orig = st.textContent;
        const tick = (now: number) => {
          const p = Math.max(0, Math.min(1, (now - t0) / 1300)), e = 1 - Math.pow(1 - p, 2.2);
          sb.style.transform = `scaleX(${e.toFixed(3)})`;
          st.textContent = p < 1 ? "Deploying " + Math.round(e * 100) + "%" : orig;
          if (p < 1) requestAnimationFrame(tick); else sd.animate([{ transform: "scale(2.2)" }, { transform: "scale(1)" }], { duration: 600, easing: "ease-out" });
        };
        requestAnimationFrame(tick);
      }
      if (t === "fade") el.animate([{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 800, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" }).finished.then(() => { el.style.opacity = ""; el.style.transform = ""; });
      if (t === "sig") wipe(el, 2000, 0).finished.then(() => (el.style.clipPath = ""));
      if (t === "line") el.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 1600, easing: "cubic-bezier(.6,0,.2,1)", fill: "forwards" }).finished.then(() => (el.style.transform = ""));
    };

    blocks.forEach(prep);
    // A block hidden with clip-path has no visible area, so IntersectionObserver never reports it;
    // watch its parent instead and map the entry back to the block.
    const watched = new Map<Element, HTMLElement>(blocks.map(b => [b.dataset.reveal === "sig" ? b.parentElement! : b, b]));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      play(watched.get(e.target) as Hidden);
    }), { threshold: 0.3 });
    watched.forEach((_, target) => io.observe(target));
    const caret = document.querySelector("[data-caret]");
    const blink = caret?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1000, iterations: Infinity, easing: "steps(2, jump-none)" });

    return () => { io.disconnect(); timers.forEach(clearTimeout); blink?.cancel(); };
  }, []);
}
