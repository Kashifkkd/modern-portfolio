"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "@/lib/site";
import TextReveal from "./TextReveal";
import Magnetic from "./Magnetic";
import LocalTime from "./LocalTime";

// WebGL only on the client, after hydration; the static gradient underneath is the fallback.
const SignalField = dynamic(() => import("./SignalField"), { ssr: false });

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ready || !root.current) return;
    gsap.fromTo(
      root.current.querySelectorAll("[data-fade]"),
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.9 }
    );
  }, { dependencies: [ready], scope: root });

  return (
    <section ref={root} id="top" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-32 md:px-10 md:pb-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_40%,#161616_0%,var(--bg)_100%)]" />
      {ready && <div className="absolute inset-0 -z-10"><SignalField /></div>}

      <p data-fade className="eyebrow mb-6 opacity-0">
        {profile.role} <span className="text-fg-faint">/</span> {profile.tagline}
      </p>

      <h1 className="display text-[15vw] leading-[0.88] md:text-[11.5vw]">
        {ready && (
          <>
            <TextReveal as="span" className="block" type="lines" immediate delay={0.2}>Kashif</TextReveal>
            <TextReveal as="span" className="block" type="lines" immediate delay={0.32}>
              Deshmukh<span className="serif-accent text-accent">.</span>
            </TextReveal>
          </>
        )}
      </h1>

      <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
        <p data-fade className="max-w-xl text-balance text-base leading-relaxed text-fg-muted opacity-0 md:col-span-6 md:text-lg">
          {profile.positioning}
        </p>

        <div data-fade className="flex flex-wrap items-center gap-3 opacity-0 md:col-span-6 md:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-fg-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.availability.label}
          </span>
          <Magnetic>
            <a href={profile.calUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03]">
              Book a call <span aria-hidden>↗</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors duration-300 hover:border-fg">
              See the work
            </a>
          </Magnetic>
        </div>
      </div>

      <div data-fade className="rule mt-10 flex flex-wrap items-center justify-between gap-3 pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint opacity-0">
        <span>{profile.location} · <LocalTime /></span>
        <span className="hidden sm:inline">Scroll ↓</span>
        <span>Remote · UK / IN / Worldwide</span>
      </div>
    </section>
  );
}
