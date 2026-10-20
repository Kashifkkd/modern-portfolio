"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experience, profile } from "@/lib/site";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

/** Sticky heading on the left; entries on the right draw their rule in and fade up as they arrive. */
export default function Experience() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((el) => {
      const line = el.querySelector("[data-line]");
      gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      gsap.fromTo(el.querySelectorAll("[data-in]"), { autoAlpha: 0, y: 20 }, {
        autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.06, delay: 0.2,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
  }, { scope: root });

  return (
    <section ref={root} id="experience" className="px-5 py-24 md:px-10 md:py-40">
      <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <span>( 04 )</span><span>Experience</span>
      </div>

      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <TextReveal as="h2" className="display text-[13vw] leading-[0.9] md:text-6xl lg:text-7xl">Where I&apos;ve<br />worked<span className="text-accent">.</span></TextReveal>
            <p className="mt-8 max-w-xs leading-relaxed text-fg-muted">Three years of production engineering across enterprise retail, consumer mobile and data-intensive platforms.</p>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-fg">
              Download résumé <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </div>

        <ol className="md:col-span-8">
          {experience.map((e, i) => (
            <li key={e.period} data-entry className="relative py-10 md:py-14">
              <span data-line className="absolute left-0 top-0 h-px w-full origin-left bg-line" />
              <div className="grid gap-4 md:grid-cols-12">
                <div className="md:col-span-4">
                  <span data-in className="font-mono text-xs text-fg-faint">0{i + 1}</span>
                  <p data-in className="display mt-2 text-3xl md:text-4xl">{e.period}</p>
                </div>
                <div className="md:col-span-8">
                  <h3 data-in className="display text-2xl md:text-4xl">{e.role}</h3>
                  <p data-in className="mt-2 text-fg-muted">
                    {e.href ? <a href={e.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-fg">{e.company}</a> : e.company}
                    <span className="text-fg-faint"> · {e.location}</span>
                  </p>
                  <p data-in className="mt-5 max-w-xl leading-relaxed text-fg-muted">{e.summary}</p>
                  {e.stack.length > 0 && (
                    <ul data-in className="mt-5 flex flex-wrap gap-1.5">
                      {e.stack.map((s) => <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-fg-muted">{s}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
