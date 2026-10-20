"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { marquee } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/** Velocity-reactive marquee: speeds up and flips direction with scroll, settles when idle. */
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const half = el.scrollWidth / 2;
    let x = 0;
    let dir = 1;
    let boost = 0;
    const base = reduce ? 0.2 : 0.6;

    const tick = () => {
      x -= (base + boost) * dir;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      gsap.set(el, { x });
      boost *= 0.92;
    };
    gsap.ticker.add(tick);

    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        dir = self.direction;
        boost = Math.min(Math.abs(self.getVelocity()) / 150, 10);
      },
    });
    return () => { gsap.ticker.remove(tick); st.kill(); };
  }, { scope: root });

  const items = [...marquee, ...marquee];
  return (
    <div ref={root} aria-hidden className="rule overflow-hidden py-5 md:py-7">
      <div ref={track} className="flex w-max whitespace-nowrap will-change-transform">
        {items.map((t, i) => (
          <span key={i} className="display flex items-center text-3xl text-fg md:text-5xl">
            <span className={i % marquee.length === 0 ? "text-accent" : ""}>{t}</span>
            <span className="mx-6 inline-block h-2 w-2 rounded-full bg-fg-faint md:mx-10" />
          </span>
        ))}
      </div>
    </div>
  );
}
