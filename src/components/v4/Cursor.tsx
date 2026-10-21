"use client";
import { useEffect, useRef } from "react";

/**
 * Custom cursor for mouse users: an ink dot that sits exactly on the pointer and a soft ring that
 * trails behind it. Over links and buttons the ring opens up (with ↗ for external links); pressing
 * squeezes it. Touch devices and reduced-motion users keep the system cursor.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const d = dot.current!, r = ring.current!, l = label.current!;
    document.documentElement.classList.add("has-cursor");

    let x = -100, y = -100, rx = -100, ry = -100, scale = 1, target = 1, shown = false, raf = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; rx = x; ry = y; d.style.opacity = r.style.opacity = "1"; }
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element).closest?.("a, button, [role=tab], [data-cursor], label, summary");
      const field = (e.target as Element).closest?.("input, textarea, [contenteditable=true]");
      r.dataset.state = field ? "text" : el ? "link" : "";
      d.dataset.state = r.dataset.state;
      const ext = el instanceof HTMLAnchorElement && el.target === "_blank";
      l.textContent = el?.getAttribute("data-cursor") || (ext ? "↗" : "");
      target = field ? 0.4 : el ? 1.9 : 1;
    };
    const down = () => { target *= 0.78; };
    const up = () => { target /= 0.78; };
    const leave = () => { shown = false; d.style.opacity = r.style.opacity = "0"; };

    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      scale += (target - scale) * 0.2;
      d.style.transform = `translate(${x}px, ${y}px)`;
      r.style.transform = `translate(${rx.toFixed(1)}px, ${ry.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerover", over, { passive: true });
    addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
      removeEventListener("pointerdown", down);
      removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="cur-ring"><span ref={label} className="cur-label f-mono" /></div>
      <div ref={dot} aria-hidden className="cur-dot" />
    </>
  );
}
