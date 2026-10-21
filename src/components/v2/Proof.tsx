"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { proof, testimonials } from "@/lib/site";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

/**
 * Numbers count up, then a pinned horizontal rail of testimonials scrubs with scroll on desktop
 * (scroll becomes the narrative). On touch / small screens it is a simple snap-scroll row.
 */
export default function Proof() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
      });
    });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const r = rail.current, p = pin.current;
      if (!r || !p) return;
      const distance = r.scrollWidth - window.innerWidth + 80;
      gsap.to(r, {
        x: -distance, ease: "none",
        scrollTrigger: { trigger: p, start: "top top", end: () => `+=${distance}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} id="proof" className="px-5 py-24 md:px-10 md:py-40">
      <SectionHeader index="02" label="Results & kind words" title={<>Proof, not<br />promises<span className="text-accent">.</span></>} />

      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {proof.map((p) => (
          <div key={p.label} className="rule pt-5">
            <dd className="display text-6xl md:text-8xl"><span data-count={p.value}>0</span>{p.suffix}</dd>
            <dt className="mt-3 max-w-[16ch] text-sm text-fg-muted">{p.label}</dt>
          </div>
        ))}
      </dl>

      <div ref={pin} className="mt-24 lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <p className="eyebrow mb-6">What clients say</p>
        <div ref={rail} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:w-max lg:snap-none lg:overflow-visible lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t, i) => (
            <figure key={t.name} className="flex w-[85vw] shrink-0 snap-start flex-col justify-between rounded-2xl border border-line bg-bg-elev p-7 md:w-[480px] md:p-10 lg:h-[420px]">
              <blockquote className="text-xl leading-snug md:text-2xl">
                <span className="serif-accent text-accent">“</span>{t.quote}<span className="serif-accent text-accent">”</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between font-mono text-xs text-fg-muted">
                <span>{t.name}<span className="text-fg-faint"> - {t.title}</span></span>
                <span className="text-fg-faint">0{i + 1}</span>
              </figcaption>
            </figure>
          ))}
          <figure className="flex w-[85vw] shrink-0 snap-start flex-col justify-center rounded-2xl border border-accent/40 p-7 md:w-[480px] md:p-10 lg:h-[420px]">
            <p className="display text-3xl md:text-5xl">Your project could be next<span className="text-accent">.</span></p>
            <a href="#contact" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg">Start a conversation →</a>
          </figure>
        </div>
      </div>
    </section>
  );
}
