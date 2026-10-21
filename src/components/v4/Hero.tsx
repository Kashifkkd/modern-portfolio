"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { heroNav, links } from "./data";
import { ArrowDown, ArrowUpRight, GitHub, LinkedIn, Resume } from "./icons";
import ThemeToggle from "./ThemeToggle";
import { Burger } from "./Menu";
import { getLenis } from "@/components/v2/SmoothScroll";
import { scrambleText } from "./scramble";

const LENS = 170;

/**
 * The hero is 240vh of scroll. First press of the cue scrolls to the point where the build is
 * finished (lens fully open, page still pinned); once you're there, the next press moves on to step 02.
 */
function scrollCue() {
  const hero = document.getElementById("top");
  const next = document.getElementById("process");
  if (!hero || !next) return;
  const finished = hero.offsetTop + hero.offsetHeight - innerHeight;
  const lenis = getLenis();
  if (window.scrollY < finished - 8) {
    if (lenis) lenis.scrollTo(finished, { duration: 1.6 });
    else window.scrollTo({ top: finished, behavior: "smooth" });
    return;
  }
  if (lenis) lenis.scrollTo(next, { duration: 1.4, offset: -64 });
  else next.scrollIntoView({ behavior: "smooth" });
}

// The live site's WebGL signal field, at its production settings (density, drift, edge fade); loaded client-side only.
const SignalField = dynamic(() => import("@/components/v2/SignalField"), { ssr: false });

/** Background of the finished layer, tinted to the active theme. */
function Field() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const light = resolvedTheme === "light";
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: -1, pointerEvents: "none" }}>
      {/* dark: production values verbatim (colour, lime glow, additive, edge fade); never compressed by the 240vh scroll */}
      <SignalField color={light ? "#8a857c" : "#f5f5f3"} accent={light ? "#e8743b" : "#c8ff5a"} additive={!light} vignette="var(--built-3)" scrollLinked={false} />
    </div>
  );
}

/**
 * Sticky 240vh hero. Two copies of the same layout are stacked: a pencil "sketch" underneath and the
 * finished build on top, clipped to a jelly lens that follows the cursor and grows to fill the
 * screen as you scroll. Port of the design's DCLogic component.
 */
export default function Hero({ ready = true }: { ready?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const builtRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<(el: Element | null) => void>(() => {});
  const introRef = useRef<(() => void) | null>(null);
  const readyRef = useRef(ready);

  useEffect(() => {
    const stage = stageRef.current, sec = sectionRef.current, built = builtRef.current;
    if (!stage || !sec || !built) return;
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = matchMedia("(hover: none)").matches;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: K, fn: (e: WindowEventMap[K]) => void, o?: AddEventListenerOptions) => {
      addEventListener(t, fn, o); cleanups.push(() => removeEventListener(t, fn));
    };

    const s = { x: 0, y: 0, tx: 0, ty: 0, w: 0, h: 0, base: 0, last: -1e9, moved: false, focus: false };
    const measure = () => { const r = stage.getBoundingClientRect(); s.w = r.width; s.h = r.height; };
    measure();
    const pr = stage.querySelector("[data-portrait]")?.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    s.x = s.tx = pr ? pr.left + pr.width / 2 - sr.left : s.w * 0.7;
    s.y = s.ty = pr ? pr.top + pr.height / 2 - sr.top : s.h * 0.45;

    // Keyboard focus inside the built layer pulls the lens to the focused control.
    focusRef.current = el => {
      if (!el) { s.focus = false; return; }
      const a = el.getBoundingClientRect(), b = stage.getBoundingClientRect();
      s.tx = a.left + a.width / 2 - b.left; s.ty = a.top + a.height / 2 - b.top; s.focus = true; s.moved = true;
    };

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      s.tx = e.clientX - r.left; s.ty = e.clientY - r.top; s.last = performance.now(); s.moved = true;
    };
    on("pointermove", onMove, { passive: true });
    on("pointerdown", onMove, { passive: true });

    /* ---- letters swell near the lens ---- */
    type L = { els: [HTMLElement, HTMLElement]; cx: number; cy: number; size: number; v: number };
    let letters: L[] = [];
    const measureLetters = () => {
      const all = [...stage.querySelectorAll<HTMLElement>("[data-l]")];
      const half = all.length / 2;
      all.forEach(el => { el.style.transform = ""; el.style.color = ""; });
      const r0 = stage.getBoundingClientRect();
      letters = all.slice(half).map((el, i) => {
        const r = el.getBoundingClientRect();
        return { els: [all[i], el], cx: r.left + r.width / 2 - r0.left, cy: r.top + r.height / 2 - r0.top, size: r.height, v: 0 };
      });
    };
    const updateLetters = (x: number, y: number) => {
      for (const l of letters) {
        const R = l.size * 0.75;
        const d = Math.hypot(l.cx - x, (l.cy - y) * 1.4);
        const target = Math.exp(-(d / R) * (d / R));
        const nv = l.v + (target - l.v) * 0.18;
        if (Math.abs(nv - l.v) < 0.002 && Math.abs(target - nv) < 0.002) continue;
        l.v = nv;
        const t = nv < 0.004 ? "" : `translateY(${(-0.07 * nv).toFixed(3)}em) scale(${(1 + 0.04 * nv).toFixed(3)},${(1 + 0.14 * nv).toFixed(3)})`;
        l.els[0].style.transform = t; l.els[1].style.transform = t;
        l.els[1].style.color = nv < 0.004 ? "" : `color-mix(in oklab, var(--built-fg) ${Math.round(100 - 75 * nv)}%, var(--accent))`;
      }
    };
    on("resize", () => { measure(); measureLetters(); });

    /* ---- jelly lens ---- */
    const ring = stage.querySelector<HTMLElement>("[data-ring]");
    const ringSvg = stage.querySelector<SVGElement>("[data-ring-svg]");
    const ringPath = stage.querySelector("[data-ring-path]");
    const orbit = stage.querySelector("[data-ring-orbit]");
    const cross = stage.querySelector("[data-ring-cross]");
    const label = stage.querySelector<HTMLElement>("[data-ring-label]");
    const builds = stage.querySelectorAll<HTMLElement>("[data-build]");
    const buildBars = stage.querySelectorAll<HTMLElement>("[data-buildbar]");
    const clocks = stage.querySelectorAll<HTMLElement>("[data-clock]");
    const N = 96, TAU = Math.PI * 2;
    const sample = (fn: (a: number) => number) => Array.from({ length: N }, (_, i) => fn((i / N) * TAU));
    const pickNext = () => {
      const p1 = Math.random() * TAU, p2 = Math.random() * TAU, k = 2 + Math.floor(Math.random() * 2);
      return sample(a => 0.955 + 0.035 * Math.sin(k * a + p1) + 0.015 * Math.sin((k + 2) * a + p2));
    };
    const m = { from: sample(() => 1), to: sample(() => 1), t0: 0 };
    const jel = { px: s.x, py: s.y, st: 0, dir: 0, pulse: 0 };
    const onDown = () => { jel.pulse = 1; };
    stage.addEventListener("pointerdown", onDown);
    cleanups.push(() => stage.removeEventListener("pointerdown", onDown));
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    let lastPct = -1, lastClock = "", lastLabel = "";

    let raf = 0;
    const loop = (t: number) => {
      if (!rm && !s.focus && t - s.last > (noHover ? 1800 : 3500)) {
        s.tx = s.w * (0.55 + 0.3 * Math.sin(t / 3100));
        s.ty = s.h * (0.5 + 0.28 * Math.sin(t / 2300 + 1.3));
      }
      const k = rm ? 1 : 0.12;
      s.x += (s.tx - s.x) * k; s.y += (s.ty - s.y) * k;
      const target = Math.min(LENS, s.w * 0.32);
      s.base += rm ? target - s.base : (target - s.base) * 0.05;

      const rect = sec.getBoundingClientRect();
      const span = Math.max(1, sec.offsetHeight - innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / span));
      const e = p * p * (3 - 2 * p);
      const far = Math.hypot(Math.max(s.x, s.w - s.x), Math.max(s.y, s.h - s.y)) + 2;
      const r = s.base + (far - s.base) * e;

      if (!rm) updateLetters(s.x, s.y);
      stage.style.setProperty("--x", s.x.toFixed(1) + "px");
      stage.style.setProperty("--y", s.y.toFixed(1) + "px");
      stage.style.setProperty("--r", r.toFixed(1) + "px");
      if (!rm) {
        if (t - m.t0 > 4200) { m.from = m.to; m.to = pickNext(); m.t0 = t; }
        const q = Math.min(1, (t - m.t0) / 4200), kq = 0.5 - 0.5 * Math.cos(Math.PI * q);
        const rot = t * 0.00004;
        const dx = s.x - jel.px, dy = s.y - jel.py; jel.px = s.x; jel.py = s.y;
        const sp = Math.hypot(dx, dy);
        if (sp > 0.3) { let dd = Math.atan2(dy, dx) - jel.dir; dd = Math.atan2(Math.sin(dd), Math.cos(dd)); jel.dir += dd * 0.25; }
        jel.st += (Math.min(0.24, sp * 0.016) - jel.st) * 0.12;
        jel.pulse *= 0.93;
        const bump = 1 + 0.14 * jel.pulse * Math.sin((1 - jel.pulse) * Math.PI * 3) * (1 - e);
        const stc = jel.st * (1 - e);
        let poly = "", d = "", od = "";
        for (let i = 0; i < N; i++) {
          const v = m.from[i] + (m.to[i] - m.from[i]) * kq;
          const ang = (i / N) * TAU + rot;
          const stretch = 1 + stc * Math.cos(2 * (ang - jel.dir)) - stc * 0.25;
          const rr = (v + (1 - v) * e) * r * stretch * bump;
          const orr = rr + 12 + 4 * jel.pulse;
          od += (i ? "L" : "M") + (s.x + Math.cos(ang) * orr).toFixed(1) + " " + (s.y + Math.sin(ang) * orr).toFixed(1);
          const px = (s.x + Math.cos(ang) * rr).toFixed(1), py = (s.y + Math.sin(ang) * rr).toFixed(1);
          poly += (i ? "," : "") + px + "px " + py + "px";
          d += (i ? "L" : "M") + px + " " + py;
        }
        built.style.clipPath = "polygon(" + poly + ")";
        ringPath?.setAttribute("d", d + "Z");
        if (orbit) { orbit.setAttribute("d", od + "Z"); orbit.setAttribute("stroke-dashoffset", String(-(t * 0.012) % 1000)); }
        cross?.setAttribute("transform", `translate(${s.x.toFixed(1)} ${s.y.toFixed(1)}) rotate(${((t * 0.02) % 360).toFixed(1)})`);
      } else if (ringPath) {
        ringPath.setAttribute("d", `M${s.x - r} ${s.y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`);
      }
      if (ring) {
        ring.style.width = ring.style.height = 2 * r + "px";
        ring.style.transform = `translate(${(s.x - r).toFixed(1)}px,${(s.y - r).toFixed(1)}px)`;
        ring.style.opacity = String(1 - Math.min(1, Math.max(0, (p - 0.6) / 0.3)));
        if (ringSvg) ringSvg.style.opacity = ring.style.opacity;
      }
      const txt = s.moved ? "the finished version" : noHover ? "drag me around" : "move your cursor";
      if (label && txt !== lastLabel) { label.textContent = txt; lastLabel = txt; }
      const pct = Math.round(e * 100);
      if (pct !== lastPct) {
        builds.forEach(b => (b.textContent = pct + "%"));
        buildBars.forEach(b => (b.style.transform = `scaleX(${(pct / 100).toFixed(2)})`));
        lastPct = pct;
      }
      const c = fmt.format(new Date());
      if (c !== lastClock) { clocks.forEach(el => (el.textContent = c)); lastClock = c; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    cleanups.push(() => cancelAnimationFrame(raf));

    /* ---- signature: a fountain pen writes the logo, rules the underline, lifts off ---- */
    // The Allura text is uncovered by a soft-edged mask (--ink), so letters bleed in like wet ink;
    // the nib glides along the writing line on one eased curve, smoothed every frame.
    let signRaf = 0;
    const sign = () => {
      cancelAnimationFrame(signRaf);
      if (rm) return;
      const runs = [...stage.querySelectorAll<HTMLElement>("[data-sig]")].map(sig => {
        const logo = sig.querySelector<HTMLElement>("[data-logo]")!, pen = sig.querySelector<HTMLElement>("[data-pen]")!, ul = sig.querySelector<HTMLElement>("[data-underline]")!;
        logo.style.setProperty("--ink", "0%");
        ul.style.transform = "scaleX(0)";
        pen.style.opacity = "0";
        const w = logo.offsetWidth, h = logo.offsetHeight;
        return { logo, pen, ul, w, h, x: 0, y: h * 0.55, tilt: -48 };
      });
      const WRITE = 2300, RULE = 560, LIFT = 420, T0 = performance.now();
      const sine = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);
      const GAP = 0.47; // where "Kashif" ends and "Deshmukh" begins
      const frame = (now: number) => {
        const t = now - T0;
        for (const r of runs) {
          let tx: number, ty: number, tilt: number, opacity = 1;
          if (t < WRITE) {
            const q = sine(t / WRITE);
            r.logo.style.setProperty("--ink", (q * 104).toFixed(2) + "%");
            const lift = Math.exp(-(((q - GAP) / 0.035) ** 2));
            tx = r.w * q;
            // one slow wave across the x-height plus a lift between the words: no per-letter jitter
            ty = r.h * (0.6 - 0.07 * Math.sin(q * Math.PI * 7) - 0.22 * lift);
            tilt = -48 + 4 * Math.sin(q * Math.PI * 5) - 6 * lift;
            opacity = Math.min(1, t / 220);
          } else if (t < WRITE + RULE) {
            r.logo.style.setProperty("--ink", "104%");
            const q = sine((t - WRITE) / RULE);
            r.ul.style.transform = `scaleX(${q.toFixed(3)})`;
            tx = r.w * (0.04 + 0.84 * q); ty = r.h + 1; tilt = -44;
          } else {
            r.ul.style.transform = "scaleX(1)";
            const q = sine(Math.min(1, (t - WRITE - RULE) / LIFT));
            tx = r.w * 0.88 + 26 * q; ty = r.h + 1 - 30 * q; tilt = -44 + 16 * q; opacity = 1 - q;
          }
          r.x += (tx - r.x) * 0.35; r.y += (ty - r.y) * 0.35; r.tilt += (tilt - r.tilt) * 0.2;
          r.pen.style.opacity = opacity.toFixed(2);
          r.pen.style.transform = `translate(${r.x.toFixed(1)}px,${r.y.toFixed(1)}px) rotate(${r.tilt.toFixed(1)}deg)`;
        }
        if (t < WRITE + RULE + LIFT) signRaf = requestAnimationFrame(frame);
        else runs.forEach(r => { r.pen.style.opacity = "0"; });
      };
      signRaf = requestAnimationFrame(frame);
    };
    cleanups.push(() => cancelAnimationFrame(signRaf));

    /* ---- title-block flicker: scramble values, re-run the deploy bar ---- */
    let flickering = false;
    const flicker = () => {
      if (rm || flickering) return;
      flickering = true;
      const jobs: Promise<void>[] = [];
      stage.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el, i) => jobs.push(scrambleText(el, 520, (i % 3) * 90, "0123456789/#_-:.", true)));
      stage.querySelectorAll<HTMLElement>("[data-status]").forEach(el => {
        const orig = el.dataset.orig || (el.dataset.orig = el.textContent || "");
        const wrap = el.parentElement!, dot = wrap.querySelector<HTMLElement>("[data-dot]"), bar = wrap.querySelector<HTMLElement>("[data-bar]");
        const t0 = performance.now();
        if (dot) dot.style.opacity = ".25";
        if (bar) bar.style.transform = "scaleX(0)";
        jobs.push(new Promise(res => {
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 2.2);
            if (bar) bar.style.transform = `scaleX(${e.toFixed(3)})`;
            el.textContent = "Deploying " + Math.round(e * 100) + "%";
            if (p < 1) { requestAnimationFrame(tick); return; }
            el.textContent = orig;
            if (dot) { dot.style.opacity = "1"; dot.animate([{ transform: "scale(2.2)" }, { transform: "scale(1)" }], { duration: 600, easing: "ease-out" }); }
            res();
          };
          requestAnimationFrame(tick);
        }));
      });
      Promise.all(jobs).then(() => { flickering = false; });
    };

    /* ---- intro effects: held until the preloader lifts (see `ready`) ---- */
    let alive = true;
    const timers: number[] = [];
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => { if (alive) measureLetters(); });
    const intro = () => {
    if (!rm) {
      stage.querySelectorAll<HTMLElement>('[data-fx="neon"]').forEach(el => {
        el.animate([
          { offset: 0, opacity: 0 }, { offset: 0.08, opacity: 0.9 }, { offset: 0.12, opacity: 0.05 },
          { offset: 0.2, opacity: 1 }, { offset: 0.27, opacity: 0.25 }, { offset: 0.31, opacity: 1 },
          { offset: 0.48, opacity: 0.55 }, { offset: 0.52, opacity: 1 }, { offset: 1, opacity: 1 },
        ], { duration: 1300, delay: 150 + +el.dataset.i! * 380, easing: "steps(1, end)", fill: "both" });
      });
      stage.querySelectorAll<HTMLElement>('[data-fx="decode"]').forEach(el => {
        const orig = el.dataset.orig || (el.dataset.orig = el.textContent || "");
        el.textContent = orig.replace(/[^ ·|]/g, "_");
        scrambleText(el, 750, 650 + +el.dataset.i! * 160);
      });
      stage.querySelectorAll<HTMLElement>('[data-fx="focus"]').forEach(el => el.animate([
        { opacity: 0, filter: "blur(10px)", transform: "translateY(10px)" },
        { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
      ], { duration: 1000, delay: 1000, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" }));
      stage.querySelectorAll<HTMLElement>('[data-fx="ink"]').forEach(el => el.animate(
        [{ clipPath: "inset(-30% 100% -30% 0)" }, { clipPath: "inset(-30% 0% -30% 0)" }],
        { duration: 750, delay: 1500 + +el.dataset.i! * 420, easing: "cubic-bezier(.5,0,.3,1)", fill: "both" },
      ));
    }
    fontsReady.then(() => {
      if (!alive) return;
      timers.push(window.setTimeout(sign, 350), window.setTimeout(flicker, 900));
    });
    };
    introRef.current = intro;
    if (readyRef.current) intro();
    cleanups.push(() => { alive = false; timers.forEach(clearTimeout); });

    let lastSign = 0;
    const onOver = (e: MouseEvent) => {
      const tgt = e.target as Element, rel = e.relatedTarget as Node | null;
      const h = tgt.closest<HTMLElement>("[data-hover]");
      if (h && !(rel && h.contains(rel)) && !h.dataset.busy && !rm) {
        h.dataset.busy = "1";
        scrambleText(h.querySelector<HTMLElement>("[data-t]") || h, 420).then(() => { delete h.dataset.busy; });
      }
      const tb = tgt.closest("[data-tb]");
      if (tb && !(rel && tb.contains(rel))) flicker();
      const now = performance.now();
      if (now - lastSign > 3200 && tgt.closest("[data-sig]")) { lastSign = now; sign(); }
    };
    stage.addEventListener("mouseover", onOver);
    cleanups.push(() => stage.removeEventListener("mouseover", onOver));

    return () => { introRef.current = null; cleanups.forEach(f => f()); };
  }, []);

  useEffect(() => {
    readyRef.current = ready;
    if (ready) { introRef.current?.(); introRef.current = null; }
  }, [ready]);

  return (
    <section id="top" ref={sectionRef} aria-label="Introduction" style={{ position: "relative", height: "240vh" }}>
      <div
        ref={stageRef}
        style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden", "--x": "-999px", "--y": "-999px", "--r": "0px" } as CSSProperties}
      >
        <SketchLayer />
        <div
          ref={builtRef}
          className="hero-layer"
          onFocus={e => focusRef.current(e.target)}
          onBlur={() => focusRef.current(null)}
          style={{
            ...layerStyle, clipPath: "circle(var(--r) at var(--x) var(--y))", isolation: "isolate",
            background: "radial-gradient(ellipse 80% 70% at 62% 38%, var(--built-1) 0%, var(--built-2) 45%, var(--built-3) 80%)",
            color: "var(--built-fg)",
          }}
        >
          <Field />
          <BuiltLayer />
        </div>

        <svg data-ring-svg="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
          <path data-ring-path="" fill="none" stroke="var(--accent)" strokeWidth={1.3} strokeLinejoin="round" />
          <path data-ring-orbit="" fill="none" stroke="var(--accent)" strokeWidth={1} strokeDasharray="1.5 9" strokeLinecap="round" opacity={0.7} />
        </svg>
        <div data-ring="" aria-hidden style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, borderRadius: "50%", pointerEvents: "none", willChange: "transform,width,height" }}>
          <span data-ring-label="" className="f-hand" style={{ position: "absolute", left: "85%", top: "8%", transform: "translateY(-100%)", whiteSpace: "nowrap", fontSize: 15, lineHeight: 1.2, color: "#E8743B", background: "#13110F", padding: "4px 8px" }}>move your cursor</span>
        </div>
        <a data-cue="" href="#process" className="hero-cue f-mono" onClick={e => { e.preventDefault(); scrollCue(); }}>
          Scroll<ArrowDown className="hero-cue-arrow" />
        </a>
      </div>
    </section>
  );
}

const layerStyle: CSSProperties = {
  position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-start",
  gap: "clamp(14px,2.6vh,32px)", padding: "clamp(16px,2.4vw,36px)", boxSizing: "border-box",
};
const headerStyle: CSSProperties = { minHeight: 52, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px 20px", flexWrap: "wrap", fontSize: 12 };
const nameStyle: CSSProperties = { fontFamily: "var(--font-clash), sans-serif", fontWeight: 600, fontSize: "min(12.5vw, 15svh)", lineHeight: 0.84, whiteSpace: "nowrap", letterSpacing: "-.005em", textTransform: "uppercase", display: "flex", flexDirection: "column", gap: "clamp(6px,1vh,12px)" };
const bottomRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: "clamp(16px,2.6vw,44px)", alignItems: "flex-end", marginTop: "auto" };
// Notes sit inside the no-wrap name block, so they opt back into wrapping.
const noteStyle: CSSProperties = { whiteSpace: "normal", fontFamily: "var(--font-kalam), cursive", fontWeight: 400, fontSize: "clamp(14px,1.2vw,17px)", letterSpacing: 0, textTransform: "none", WebkitTextStroke: 0, color: "var(--redline)" };

const Letters = ({ word }: { word: string }) => (
  <>{[...word].map((c, i) => <span key={i} data-l="" style={{ display: "inline-block", transformOrigin: "50% 100%" }}>{c}</span>)}</>
);

/**
 * An old-style fountain pen drawn along +x with the nib point at the origin, so the parent span's
 * translate/rotate puts the nib exactly where the ink is being laid down.
 */
function Pen() {
  return (
    // A real box (not 0×0) so the drop-shadow filter has something to paint; the viewBox keeps the nib at (0,0).
    <svg width={50} height={8} viewBox="-1 -4 50 8" style={{ position: "absolute", left: -1, top: -4, overflow: "visible", filter: "drop-shadow(2px 4px 2.5px rgba(0,0,0,.4))" }}>
      <defs>
        <linearGradient id="pen-gold" x1="0" y1="-4" x2="0" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f4dc94" /><stop offset=".5" stopColor="#c99a3c" /><stop offset="1" stopColor="#8a6420" />
        </linearGradient>
        <linearGradient id="pen-lacquer" x1="0" y1="-5" x2="0" y2="5" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4a1f1a" /><stop offset=".35" stopColor="#7a2e24" /><stop offset="1" stopColor="#2a0f0c" />
        </linearGradient>
      </defs>
      <g transform="scale(.6)">
        {/* nib: gold, with the slit and breather hole */}
        <path d="M0 0L9.5 -2.8Q12.5 -3.5 15 -3.3V3.3Q12.5 3.5 9.5 2.8Z" fill="url(#pen-gold)" />
        <path d="M0.8 0H10.4" stroke="#5a3f0e" strokeWidth={0.45} />
        <circle cx="10.9" cy="0" r="0.85" fill="#3a2808" />
        {/* section, gold ring, lacquered barrel with cap band and clip */}
        <path d="M15 -3.4L23.5 -4.2V4.2L15 3.4Z" fill="#141416" />
        <rect x={23.5} y={-4.6} width={2.2} height={9.2} rx={0.6} fill="url(#pen-gold)" />
        <path d="M25.7 -4.8H66Q70.5 -4.8 70.5 0Q70.5 4.8 66 4.8H25.7Z" fill="url(#pen-lacquer)" />
        <path d="M27 -3.3H64" stroke="#fff" strokeOpacity={0.28} strokeWidth={0.8} strokeLinecap="round" />
        <rect x={55} y={-4.9} width={2.6} height={9.8} fill="url(#pen-gold)" />
        <path d="M63.5 -4.8V-6.1H46.5Q44.4 -6.1 44.4 -5" stroke="url(#pen-gold)" strokeWidth={1.3} fill="none" strokeLinecap="round" />
        <circle cx="70.6" cy="0" r="1.1" fill="url(#pen-gold)" />
      </g>
    </svg>
  );
}

function Signature() {
  return (
    <span data-sig="" style={{ position: "relative", display: "inline-block" }}>
      <span data-logo="" className="f-sig sig-ink" style={{ whiteSpace: "nowrap", fontSize: 34, lineHeight: 1, display: "inline-block", padding: "4px 10px 6px 2px" }}>Kashif Deshmukh</span>
      <span data-underline="" style={{ position: "absolute", left: "4%", right: "8%", bottom: 3, height: 1.5, background: "var(--accent)", borderRadius: 2, transformOrigin: "left center" }} />
      <span data-pen="" aria-hidden style={{ position: "absolute", left: 0, top: 0, width: 0, height: 0, pointerEvents: "none", opacity: 0, transformOrigin: "0 0", willChange: "transform" }}>
        <Pen />
      </span>
    </span>
  );
}

/**
 * Phones only: a compact version of the title block (status and clock, then what he is taking on) that fills the gap between the name and the
 * role column. Its clock is a [data-clock] node, so the hero loop keeps it ticking.
 */
function MidCard({ sketch }: { sketch?: boolean }) {
  const cell = (k: string, v: ReactNode) => (
    <div className="hero-mid-cell">
      <span className="f-mono hero-mid-k">{k}</span>
      <span className={`${sketch ? "f-hand" : "f-mono"} hero-mid-v`}>{v}</span>
    </div>
  );
  return (
    <div className={`hero-mid${sketch ? " hero-mid--sketch" : ""}`}>
      {cell("Status", sketch ? "Drafting…" : <><span className="hero-mid-dot" />In production</>)}
      {cell("Mumbai", <><span data-clock="">--:--:--</span> IST</>)}
      <div className="hero-mid-cell hero-mid-cell--wide">
        <span className="f-mono hero-mid-k">Taking on</span>
        <span className={`${sketch ? "f-hand" : "f-mono"} hero-mid-v`}>{sketch ? "a few projects, by choice" : "Limited, selective projects"}</span>
      </div>
    </div>
  );
}

/**
 * Title block in the hero's bottom-right. Fixed width and fixed value slots, so the status text
 * changing (Deploying 37% / In production) never nudges the layout. The status cell fills like a
 * progress bar: on the build it replays the deploy; on the sketch it tracks the scroll ("build N%").
 */
function TitleBlock({ sketch }: { sketch?: boolean }) {
  const border = sketch ? "1px solid var(--pencil)" : "1px solid var(--built-line)";
  const key: CSSProperties = { width: 96, padding: "7px 10px", borderRight: border, color: sketch ? "var(--pencil-muted)" : "var(--built-dim)", flex: "none" };
  const val: CSSProperties = {
    flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", fontVariantNumeric: "tabular-nums",
    ...(sketch ? { padding: "3px 10px", fontFamily: "var(--font-kalam), cursive", fontSize: 15, lineHeight: 1.45, textTransform: "none", letterSpacing: 0 } : { padding: "7px 10px" }),
  };
  const row = (k: string, v: ReactNode, first?: boolean) => (
    <div style={{ display: "flex", borderTop: first ? undefined : border }}><span style={key}>{k}</span><span style={val}>{v}</span></div>
  );
  const fill: CSSProperties = { position: "absolute", inset: 0, zIndex: 0, transformOrigin: "left center", pointerEvents: "none" };
  const over: CSSProperties = { position: "relative", zIndex: 1 };
  return (
    <div data-tb="" className="f-mono hero-tb" style={{ border, flex: "0 0 auto", width: 300, boxSizing: "border-box", whiteSpace: "nowrap", fontSize: 11, letterSpacing: ".05em", background: sketch ? "var(--sketch-bg)" : undefined }}>
      {row("Sheet", <span data-scramble="">01 / 08 Arrival</span>, true)}
      {row(sketch ? "Drawn by" : "Built by", <span data-scramble="">K. Deshmukh</span>)}
      {row("Mumbai", <><span data-clock="">--:--:--</span> IST</>)}
      <div style={{ display: "flex", borderTop: border }}>
        <span style={key}>Status</span>
        {sketch ? (
          <span style={{ ...val, position: "relative" }}>
            <span data-buildbar="" style={{ ...fill, transform: "scaleX(0)", background: "color-mix(in srgb, var(--redline) 16%, transparent)" }} />
            <span style={over}><span data-scramble="">Drafting</span> | build <span data-build="">0%</span></span>
          </span>
        ) : (
          <span style={{ ...val, position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
            <span data-bar="" style={{ ...fill, background: "color-mix(in srgb, var(--ok) 22%, transparent)" }} />
            <span data-dot="" style={{ ...over, flex: "none", width: 7, height: 7, borderRadius: "50%", background: "var(--ok)" }} />
            <span data-status="" style={over}>In production | 100%</span>
          </span>
        )}
      </div>
      <div style={{ display: "flex", borderTop: border }}>
        {sketch
          ? <span style={{ ...val, color: "var(--redline)" }}>scroll &amp; I&apos;ll build it ↓</span>
          : <span style={{ padding: "7px 10px", color: "var(--accent-text)", display: "flex", alignItems: "center", gap: 6 }}>Scroll to ship it<ArrowDown style={{ fontSize: 13 }} /></span>}
      </div>
    </div>
  );
}

/** The pencil draft. Decorative copy, so its links stay out of the tab order. */
function SketchLayer() {
  const dashed = "1px dashed var(--pencil)";
  return (
    // isolate: keeps any z-index inside the sketch (e.g. the status fill) from painting over the finished layer
    <div aria-hidden className="hero-layer" style={{
      ...layerStyle, isolation: "isolate", backgroundColor: "var(--sketch-bg)", color: "var(--pencil)",
      backgroundImage: "linear-gradient(var(--sketch-grid) 1px, transparent 1px), linear-gradient(90deg, var(--sketch-grid) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
    }}>
      <header className="f-mono" style={headerStyle}>
        <a href="#top" tabIndex={-1} style={{ flex: "none", textDecoration: "none" }}><Signature /></a>
        <nav className="hero-nav" style={{ display: "flex", gap: "clamp(12px,2.4vw,36px)", flexWrap: "wrap" }}>
          {heroNav.map(l => <a key={l.href} data-hover="" href={l.href} tabIndex={-1} style={{ textDecoration: "none", borderBottom: dashed, paddingBottom: 2 }}>{l.label}</a>)}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="desk-only"><ThemeToggle variant="sketch" tabIndex={-1} /></span>
          <span className="hero-socials"><a href={links.github} target="_blank" rel="noopener" tabIndex={-1} className="icon-btn icon-btn--sketch"><GitHub /></a>
          <a href={links.linkedin} target="_blank" rel="noopener" tabIndex={-1} className="icon-btn icon-btn--sketch"><LinkedIn /></a>
          <a href={links.resume} target="_blank" rel="noopener" tabIndex={-1} className="icon-btn icon-btn--sketch"><Resume /></a></span>
          <a data-hover="" href={links.cal} target="_blank" rel="noopener" tabIndex={-1} className="desk-only" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", border: dashed, padding: "10px 16px" }}><span data-t="">Book a call</span><ArrowUpRight className="ink-arrow" /></a>
          <Burger variant="sketch" tabIndex={-1} />
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px,1.4vh,16px)", marginTop: "clamp(8px,4vh,64px)" }}>
        <div data-fx="ink" data-i="0" className="f-hand hero-hi" style={{ fontSize: "clamp(15px,1.3vw,19px)", lineHeight: 1.25, height: "1.4em", flex: "none", transform: "rotate(-1.2deg)", transformOrigin: "left center" }}>hi. make the name the first thing they read ↓</div>
        <div style={{ ...nameStyle, color: "transparent", WebkitTextStroke: "1.4px var(--pencil-stroke)" }}>
          <span data-fx="neon" data-i="0" style={{ display: "block", borderBottom: "1px dashed var(--pencil-rule)", position: "relative" }}>
            {/* the note hangs off the word itself, so it follows the name at every width */}
            <span style={{ position: "relative", display: "inline-block" }}>
              <Letters word="Kashif" />
              <span data-fx="ink" data-i="1" style={{ ...noteStyle, position: "absolute", left: "calc(100% + 14px)", top: "50%", width: "max-content", maxWidth: "13ch", lineHeight: 1.2, transform: "translateY(-50%) rotate(2deg)" }}>too big? no. keep it big.</span>
            </span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: ".16em" }}>
            <span style={{ position: "relative", flex: "none", width: ".8em", aspectRatio: "1/1", marginTop: "-.04em", border: dashed, boxSizing: "border-box", display: "block" }}>
              {/* pencil study of the same photo; the lens reveals the real one */}
              <img src="/portrait-sketch.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%", display: "block" }} />
              <span data-fx="ink" data-i="2" style={{ ...noteStyle, position: "absolute", left: 0, top: "calc(100% + 12px)", width: "max-content", maxWidth: "min(26ch, 80vw)", lineHeight: 1.3, transform: "rotate(2.5deg)" }}>← based in Mumbai, shipping worldwide.</span>
            </span>
            <span data-fx="neon" data-i="1" style={{ display: "block", borderBottom: "1px dashed var(--pencil-rule)", position: "relative" }}><Letters word="Deshmukh" /></span>
          </span>
        </div>
      </div>

      <div className="hero-bottom" style={bottomRow}>
        <div className="f-body hero-role" style={{ flex: "1 1 170px", display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="f-mono" style={{ fontSize: 11, color: "var(--pencil-muted)" }}>Role</span>
          <span data-fx="decode" data-i="0" style={{ fontSize: "clamp(17px,1.4vw,21px)", fontWeight: 600 }}>Senior Software Engineer</span>
          <span data-fx="decode" data-i="1" style={{ fontSize: 15, color: "var(--pencil-2)" }}>Web | Mobile | AI</span>
          <span data-fx="decode" data-i="2" className="hero-city" style={{ fontSize: 15, color: "var(--pencil-2)" }}>Mumbai, India</span>
        </div>
        <MidCard sketch />
        <div className="hero-copycol" style={{ flex: "3 1 320px", maxWidth: 620, position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
          <span data-fx="ink" data-i="3" className="f-hand" style={{ position: "absolute", top: -24, right: 0, fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1, whiteSpace: "nowrap", color: "var(--redline)", transform: "rotate(-1.5deg)" }}>cut it. nobody believes that line.</span>
          <p data-fx="focus" className="f-body hero-copy" style={{ margin: 0, fontSize: "clamp(17px,1.4vw,21px)", lineHeight: 1.4, textWrap: "pretty" }}>
            I <del style={{ color: "var(--redline)" }}>love to code and</del> design and build web, mobile and AI products end to end. Teams usually call me when something has to ship and can&apos;t break: a launch that&apos;s slipping, or a codebase nobody wants to inherit.
          </p>
          <div className="f-mono" style={{ display: "flex", gap: "12px 20px", flexWrap: "wrap", alignItems: "center", fontSize: 12, letterSpacing: ".02em" }}>
            <a data-hover="" href={links.cal} tabIndex={-1} style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", border: dashed, padding: "13px 18px", whiteSpace: "nowrap" }}><span data-t="">Book a 30-min call</span><ArrowUpRight className="ink-arrow" /></a>
            <a data-hover="" href="#work" tabIndex={-1} style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", borderBottom: dashed, paddingBottom: 2 }}><span data-t="">See the work</span><ArrowDown className="ink-arrow" /></a>
          </div>
        </div>
        <TitleBlock sketch />
      </div>
    </div>
  );
}

/** The finished build: the real, interactive header and copy. */
function BuiltLayer() {
  return (
    <>
      <header className="f-mono" style={headerStyle}>
        <a href="#top" aria-label="Kashif Deshmukh, home" style={{ flex: "none", textDecoration: "none" }}><Signature /></a>
        <nav aria-label="Primary" className="nav-built hero-nav" style={{ display: "flex", gap: "clamp(12px,2.4vw,36px)", flexWrap: "wrap" }}>
          {heroNav.map(l => <a key={l.href} data-hover="" href={l.href}>{l.label}</a>)}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="desk-only"><ThemeToggle /></span>
          <span className="hero-socials"><a href={links.github} target="_blank" rel="noopener" aria-label="GitHub" className="icon-btn icon-btn--built"><GitHub /></a>
          <a href={links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="icon-btn icon-btn--built"><LinkedIn /></a>
          <a href={links.resume} target="_blank" rel="noopener" aria-label="Resume (PDF)" className="icon-btn icon-btn--built"><Resume /></a></span>
          <a data-hover="" href={links.cal} target="_blank" rel="noopener" className="btn-invert desk-only" style={{ padding: "10px 16px" }}><span data-t="">Book a call</span><ArrowUpRight className="ink-arrow" /></a>
          <Burger />
        </div>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px,1.4vh,16px)", marginTop: "clamp(8px,4vh,64px)" }}>
        <div aria-hidden className="hero-hi" style={{ fontSize: "clamp(15px,1.3vw,19px)", lineHeight: 1.25, height: "1.4em", flex: "none", visibility: "hidden" }}>&nbsp;</div>
        <h1 style={{ ...nameStyle, margin: 0, color: "var(--built-fg)" }}>
          <span data-fx="neon" data-i="0" style={{ display: "block", borderBottom: "1px solid transparent" }}><Letters word="Kashif" /></span>
          <span style={{ display: "flex", alignItems: "center", gap: ".16em" }}>
            <span data-portrait="" style={{ position: "relative", flex: "none", width: ".8em", aspectRatio: "1/1", marginTop: "-.04em", overflow: "hidden", background: "#3a3d42", display: "block" }}>
              <img src="/portrait.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%", display: "block" }} />
            </span>
            <span data-fx="neon" data-i="1" style={{ display: "block", borderBottom: "1px solid transparent" }}><Letters word="Deshmukh" /></span>
          </span>
        </h1>
      </div>

      <div className="hero-bottom" style={bottomRow}>
        <div className="f-body hero-role" style={{ flex: "1 1 170px", display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="f-mono" style={{ fontSize: 11, color: "var(--built-dim)" }}>Role</span>
          <span data-fx="decode" data-i="0" style={{ fontSize: "clamp(17px,1.4vw,21px)", fontWeight: 600 }}>Senior Software Engineer</span>
          <span data-fx="decode" data-i="1" style={{ fontSize: 15, color: "var(--built-muted)" }}>Web | Mobile | AI</span>
          <span data-fx="decode" data-i="2" className="hero-city" style={{ fontSize: 15, color: "var(--built-muted)" }}>Mumbai, India</span>
        </div>
        <MidCard />
        <div className="hero-copycol" style={{ flex: "3 1 320px", maxWidth: 620, display: "flex", flexDirection: "column", gap: 18 }}>
          <p data-fx="focus" className="f-body hero-copy" style={{ margin: 0, fontSize: "clamp(17px,1.4vw,21px)", lineHeight: 1.4, textWrap: "pretty" }}>
            I design and build web, mobile and AI products end to end. Teams usually call me when something has to ship and can&apos;t break: a launch that&apos;s slipping, or a codebase nobody wants to inherit.
          </p>
          <div className="f-mono" style={{ display: "flex", gap: "12px 20px", flexWrap: "wrap", alignItems: "center", fontSize: 12, letterSpacing: ".02em" }}>
            <a data-hover="" href={links.cal} target="_blank" rel="noopener" className="btn-accent" style={{ padding: "13px 18px" }}><span data-t="">Book a 30-min call</span><ArrowUpRight className="ink-arrow" /></a>
            <a data-hover="" href="#work" className="link-under"><span data-t="">See the work</span><ArrowDown className="ink-arrow" /></a>
          </div>
        </div>
        <TitleBlock />
      </div>
    </>
  );
}
