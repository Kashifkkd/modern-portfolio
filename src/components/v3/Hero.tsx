"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { profile } from "@/lib/site";
import Magnetic from "@/components/v2/Magnetic";
import LocalTime from "@/components/v2/LocalTime";
import { navLinks } from "./data";
import { scrollToId } from "./scroll";
import ParticleWords from "./ParticleWords";
import Scramble from "./Scramble";

gsap.registerPlugin(ScrollTrigger);

const words = ["FULL-STACK", "AI / LLM", "MOBILE", "REAL-TIME"];

/**
 * Dark stage: a WebGL particle word that morphs through what Kashif builds, a technical
 * overlay around it, and the name running as an endless marquee that follows scroll direction.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLParagraphElement>(null);
  const b = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    let x = 0;
    let dir = -1;
    let speed = 0.06;

    ScrollTrigger.create({
      trigger: root.current,
      start: "top top",
      end: "bottom top",
      onUpdate: (st) => {
        dir = st.direction === 1 ? -1 : 1;
        speed = 0.06 + Math.min(Math.abs(st.getVelocity()) / 9000, 0.4);
      },
    });
    gsap.to(slider.current, { x: -400, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.3 } });
    gsap.to(".v3-hud", { opacity: 0, y: -40, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "40% top", scrub: true } });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tick = () => {
      if (x < -100) x = 0;
      else if (x > 0) x = -100;
      gsap.set([a.current, b.current], { xPercent: x });
      x += speed * dir;
      speed += (0.06 - speed) * 0.04; // ease velocity boost back to cruise
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, { scope: root });

  const name = `${profile.name} -`;

  return (
    <section ref={root} className="relative h-svh min-h-[640px] overflow-hidden bg-[#0b0b0c] text-white">
      {/* Backdrop: dot grid fading out from the centre, warm glow underneath */}
      <div aria-hidden className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)]" />
      <div aria-hidden className="absolute left-1/2 top-[58%] h-[60vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,91,46,0.16),transparent)] blur-2xl" />

      <ParticleWords words={words} className="absolute inset-x-0 top-[14%] h-[66%]" />

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-6 text-[15px] md:px-9 md:py-8">
        <a href="#work" onClick={(e) => { e.preventDefault(); scrollToId("work"); }} className="group flex cursor-pointer">
          <span className="transition-transform duration-500 ease-[var(--ease)] group-hover:rotate-[360deg]">©</span>
          <span className="relative ml-1.5 flex w-[104px] overflow-hidden whitespace-nowrap">
            <span className="transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-x-[65px]">Code by</span>
            <span className="pl-1.5 transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-x-[65px]">Kashif</span>
            <span className="pl-1.5 transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-x-[65px]">Deshmukh</span>
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center md:flex">
          {navLinks.filter((l) => l.id !== "services").map((l) => (
            <Magnetic key={l.id} strength={0.4}>
              <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToId(l.id); }} className="v3-dot block p-4">{l.label}</a>
            </Magnetic>
          ))}
        </nav>
      </header>

      {/* Overlay above the word */}
      <div className="v3-hud pointer-events-none absolute inset-x-5 top-[17%] z-10 flex items-start justify-between md:inset-x-9 md:top-[19%]">
        <div>
          <svg width="18" height="18" viewBox="0 0 9 9" fill="none" aria-hidden className="mb-5">
            <path d="M8 8.5c.3 0 .5-.2.5-.5V3.5a.5.5 0 0 0-1 0v4h-4a.5.5 0 0 0 0 1H8ZM.6 1.4l7 7 .8-.8-7-7-.8.8Z" fill="currentColor" />
          </svg>
          <p className="text-[clamp(20px,2vw,32px)] leading-[1.15] tracking-[-0.01em]">
            <Scramble text="Freelance" delay={2300} /><br />
            <Scramble text="Full-stack & AI Engineer" delay={2500} />
          </p>
        </div>
        <p className="pointer-events-auto hidden items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] backdrop-blur md:flex">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand" /></span>
          {profile.availability.label}
        </p>
      </div>

      {/* Overlay below the word */}
      <div className="v3-hud pointer-events-none absolute inset-x-5 top-[66%] z-10 flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 md:inset-x-9 md:top-[64%]">
        <div className="space-y-1">
          <p>19.0760° N · 72.8777° E</p>
          <p>Mumbai · <LocalTime className="!font-mono" /></p>
        </div>
        <p className="hidden md:block">( Move your cursor )</p>
        <p className="text-right">Next.js · React Native<br />Node · Python · LLMs</p>
      </div>

      {/* Name marquee */}
      <div className="absolute bottom-[4%] z-10 w-full select-none md:bottom-[2%]">
        <div ref={slider} className="relative w-max whitespace-nowrap">
          <p ref={a} className="relative m-0 inline-block pr-[0.25em] text-[22vw] font-medium leading-none tracking-[-0.04em] md:text-[12.5vw]">{name}</p>
          <p ref={b} aria-hidden className="absolute left-full top-0 m-0 inline-block pr-[0.25em] text-[22vw] font-medium leading-none tracking-[-0.04em] md:text-[12.5vw]">{name}</p>
        </div>
      </div>
    </section>
  );
}
