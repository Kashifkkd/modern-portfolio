"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { heroMeta, profile } from "@/lib/site";
import TextReveal from "./TextReveal";
import Magnetic from "./Magnetic";
import LocalTime from "./LocalTime";

// WebGL only on the client, after hydration; the static gradient underneath is the fallback.
const SignalField = dynamic(() => import("./SignalField"), { ssr: false });

/**
 * Editorial statement hero: a three-line headline,
 * a rotating scroll badge, and a three-column bottom bar (who / what next / where).
 */
export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ready || !root.current) return;
    gsap.fromTo(root.current.querySelectorAll("[data-fade]"),
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08, delay: 1 });
    gsap.to("[data-badge]", { rotate: 360, duration: 14, ease: "none", repeat: -1 });
  }, { dependencies: [ready], scope: root });

  return (
    <section ref={root} id="top" className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-28 md:px-10 md:pb-10 md:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_40%,#161616_0%,var(--bg)_100%)]" />
      {ready && <div className="absolute inset-0 -z-10"><SignalField /></div>}

      <div data-fade className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted opacity-0">
        <span>{profile.role}</span>
        <span className="hidden sm:inline">{profile.tagline}</span>
      </div>

      <h1 className="display my-10 text-[13.5vw] leading-[0.9] md:my-0 md:text-[9vw]">
        {ready && (
          <>
            <TextReveal as="span" className="block" immediate delay={0.2}>Software that</TextReveal>
            <TextReveal as="span" className="block" immediate delay={0.3}>ships and</TextReveal>
            <TextReveal as="span" className="block" immediate delay={0.5}>
              <span className="serif-accent text-accent">holds up</span> in <span className="whitespace-nowrap">production<span className="text-accent">.</span></span>
            </TextReveal>
          </>
        )}
      </h1>

      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div data-fade className="opacity-0 md:col-span-5">
          <p className="eyebrow mb-3">( Who )</p>
          <p className="max-w-md text-balance leading-relaxed text-fg-muted">
            <span className="text-fg">{profile.name}</span> - {profile.positioning}
          </p>
        </div>

        <div data-fade className="opacity-0 md:col-span-4">
          <p className="eyebrow mb-3">( Next )</p>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href={profile.calUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03]">
                Book a call <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors duration-300 hover:border-fg">See the work</a>
            </Magnetic>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-fg-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.availability.label}
          </p>
        </div>

        <div data-fade className="flex items-end justify-between opacity-0 md:col-span-3 md:justify-end">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint md:hidden">
            {profile.location}<br /><LocalTime />
          </div>
          <a href="#work" aria-label="Scroll to work" className="relative flex h-24 w-24 items-center justify-center md:h-28 md:w-28">
            <svg data-badge viewBox="0 0 100 100" className="absolute inset-0 h-full w-full fill-fg-muted font-mono text-[9.5px] uppercase tracking-[0.2em]">
              <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <text><textPath href="#circ">Scroll · Available for work · Scroll · Available for work ·</textPath></text>
            </svg>
            <span className="text-xl" aria-hidden>↓</span>
          </a>
        </div>
      </div>

      <dl data-fade className="rule mt-8 hidden grid-cols-4 gap-6 pt-4 font-mono text-[11px] uppercase tracking-[0.14em] opacity-0 md:grid">
        {heroMeta.map((m) => (
          <div key={m.k}><dt className="text-fg-faint">{m.k}</dt><dd className="mt-1 text-fg-muted">{m.v}</dd></div>
        ))}
      </dl>
    </section>
  );
}
