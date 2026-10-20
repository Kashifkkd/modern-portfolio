"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/lib/site";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

/** Three offers, written for the person paying the bill. */
export default function Services() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.fromTo(gsap.utils.toArray("[data-row]"), { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12,
      scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
    });
  }, { scope: root });

  return (
    <section ref={root} id="services" className="rule px-5 py-28 md:px-10 md:py-40">
      <div className="mb-14 grid gap-6 md:grid-cols-12">
        <TextReveal as="h2" className="display text-5xl md:col-span-7 md:text-7xl">What I can<br />do for you<span className="text-accent">.</span></TextReveal>
        <p className="max-w-md self-end text-fg-muted md:col-span-5 md:justify-self-end">
          Fixed-scope builds or embedded in your team. Every engagement starts with a 30-minute call and a written plan, so you know what you&apos;re getting before you pay for it.
        </p>
      </div>

      <ol className="rule">
        {services.map((s) => (
          <li key={s.index} data-row className="rule group grid gap-6 py-10 opacity-0 first:border-t-0 md:grid-cols-12 md:py-14">
            <span className="font-mono text-xs text-fg-faint md:col-span-1">{s.index}</span>
            <h3 className="display text-3xl md:col-span-4 md:text-5xl">{s.title}</h3>
            <div className="md:col-span-7">
              <p className="max-w-xl leading-relaxed text-fg-muted">{s.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.bullets.map((b) => (
                  <li key={b} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-muted transition-colors duration-300 group-hover:border-fg-faint">{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
