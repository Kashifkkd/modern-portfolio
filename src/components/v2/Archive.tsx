"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { profile, projects } from "@/lib/site";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * The archive (huyml.co pattern): every project as one dense block —
 * name, date, outcomes instead of awards, team / role, industry, one honest sentence.
 * Facts a client can check, in a format that scans in seconds.
 */
export default function Archive() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>("[data-block]").forEach((el) => {
      gsap.fromTo(el.querySelector("[data-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      gsap.fromTo(el.querySelectorAll("[data-in]"), { autoAlpha: 0, y: 18 }, {
        autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.05, delay: 0.15,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
  }, { scope: root });

  return (
    <section ref={root} id="archive" className="px-5 py-24 md:px-10 md:py-40">
      <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <span>( 04 )</span><span>Archive · {projects.length} projects · 2023 — 2026</span>
      </div>

      <div className="mt-12 flex flex-wrap items-end justify-between gap-6 md:mt-16">
        <TextReveal as="h2" className="display text-[13vw] leading-[0.9] md:text-7xl lg:text-8xl">Everything<br />on record<span className="text-accent">.</span></TextReveal>
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-fg">
          Résumé (PDF) <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
        </a>
      </div>

      <ol className="mt-16 md:mt-24">
        {projects.map((p, i) => (
          <li key={p.slug} data-block className="relative py-10 md:py-16">
            <span data-line className="absolute left-0 top-0 h-px w-full origin-left bg-line" />
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-5">
                <p data-in className="font-mono text-xs text-fg-faint">{String(i + 1).padStart(2, "0")} — {p.year}</p>
                <h3 data-in className="display mt-3 text-3xl md:text-5xl">{p.title}</h3>
                <p data-in className="mt-4 max-w-md leading-relaxed text-fg-muted">{p.story}</p>
                {(p.href || p.source) && (
                  <p data-in className="mt-5 flex gap-4 text-sm">
                    {p.href && <a href={p.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-fg">Live ↗</a>}
                    {p.source && <a href={p.source} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-fg">Source ↗</a>}
                  </p>
                )}
              </div>

              <dl data-in className="grid gap-6 text-sm md:col-span-7 md:grid-cols-3">
                <div>
                  <dt className="eyebrow mb-3">Outcome</dt>
                  {p.outcome.map((o) => <dd key={o} className="rule py-2 text-fg">{o}</dd>)}
                </div>
                <div>
                  <dt className="eyebrow mb-3">Team · Role</dt>
                  <dd className="rule py-2 text-fg">{p.team}</dd>
                  <dd className="rule py-2 text-fg-muted">{p.role}</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-3">Industry · Stack</dt>
                  <dd className="rule py-2 text-fg">{p.industry}</dd>
                  <dd className="rule py-2 text-fg-muted">{p.stack.join(", ")}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>
      <span className="block h-px w-full bg-line" />
    </section>
  );
}
