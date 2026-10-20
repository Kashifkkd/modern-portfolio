"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { process, services } from "@/lib/site";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

/** Accordion of offers (one open at a time) followed by a four-step process grid. */
export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useGSAP(() => {
    gsap.fromTo(gsap.utils.toArray("[data-row]"), { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
    });
    gsap.fromTo(gsap.utils.toArray("[data-step]"), { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: "[data-process]", start: "top 80%", once: true },
    });
  }, { scope: root });

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel, i) => {
      gsap.to(panel, { height: i === open ? "auto" : 0, duration: 0.7, ease: "power4.inOut", onComplete: () => ScrollTrigger.refresh() });
    });
  }, { scope: root, dependencies: [open] });

  return (
    <section ref={root} id="services" className="px-5 py-24 md:px-10 md:py-40">
      <SectionHeader
        index="03"
        label="Services"
        title={<>What I can<br />do for you<span className="text-accent">.</span></>}
        lede="Fixed-scope builds or embedded in your team. Every engagement starts with a call and a written plan, so you know what you're getting before you pay for it."
      />

      <ul className="rule">
        {services.map((s, i) => {
          const isOpen = i === open;
          return (
            <li key={s.index} data-row className="rule">
              <button type="button" aria-expanded={isOpen} aria-controls={`svc-${i}`} onClick={() => setOpen(i)}
                      className="group grid w-full items-center gap-4 py-7 text-left md:grid-cols-12 md:py-9">
                <span className="font-mono text-xs text-fg-faint md:col-span-1">{s.index}</span>
                <span className={`display text-3xl transition-colors duration-300 md:col-span-6 md:text-5xl ${isOpen ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}>{s.title}</span>
                <span className="hidden text-sm text-fg-muted md:col-span-4 md:block">{s.short}</span>
                <span className="justify-self-end md:col-span-1">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg transition-transform duration-500 ${isOpen ? "rotate-45 bg-fg text-bg" : "group-hover:border-fg"}`} aria-hidden>+</span>
                </span>
              </button>
              <div id={`svc-${i}`} data-panel className="h-0 overflow-hidden">
                <div className="grid gap-6 pb-10 md:grid-cols-12">
                  <p className="max-w-xl leading-relaxed text-fg-muted md:col-span-7 md:col-start-2">{s.blurb}</p>
                  <ul className="space-y-2 md:col-span-4">
                    {s.bullets.map((b) => (
                      <li key={b} className="rule flex items-center gap-3 py-2 text-sm"><span className="h-1 w-1 rounded-full bg-accent" />{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div data-process className="mt-28 md:mt-40">
        <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
          <span>( 03.1 )</span><span>How I work</span>
        </div>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {process.map((p) => (
            <li key={p.step} data-step className="bg-bg p-7 md:p-8">
              <span className="display block text-5xl text-fg-faint md:text-6xl">{p.step}</span>
              <h3 className="mt-10 text-xl md:mt-16">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
