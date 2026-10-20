"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { faq } from "@/lib/site";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

/** The questions a buyer asks before they book a call, answered before they have to ask. */
export default function FAQ() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel, i) => {
      gsap.to(panel, { height: i === open ? "auto" : 0, duration: 0.6, ease: "power4.inOut", onComplete: () => ScrollTrigger.refresh() });
    });
  }, { scope: root, dependencies: [open] });

  return (
    <section ref={root} id="faq" className="px-5 py-24 md:px-10 md:py-40">
      <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <span>( 06 )</span><span>Before you ask</span>
      </div>
      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <TextReveal as="h2" className="display text-[13vw] leading-[0.9] md:sticky md:top-32 md:text-6xl lg:text-7xl">Good<br />questions<span className="text-accent">.</span></TextReveal>
        </div>
        <ul className="rule md:col-span-8">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="rule">
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7">
                  <span className={`text-lg transition-colors duration-300 md:text-2xl ${isOpen ? "text-fg" : "text-fg-muted group-hover:text-fg"}`}>{f.q}</span>
                  <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-500 ${isOpen ? "rotate-45 bg-fg text-bg" : "group-hover:border-fg"}`} aria-hidden>+</span>
                </button>
                <div id={`faq-${i}`} data-panel className="h-0 overflow-hidden">
                  <p className="max-w-2xl pb-7 leading-relaxed text-fg-muted">{f.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
