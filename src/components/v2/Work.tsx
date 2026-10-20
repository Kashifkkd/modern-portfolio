"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { featuredProjects, projects } from "@/lib/site";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial project grid. The first project runs full width; the rest sit in a two-column
 * grid with offset rhythm. Each image parallaxes inside its frame as you scroll and the
 * frame reveals with a clip-path wipe. Hover: image scales, meta slides in.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
      const frame = card.querySelector<HTMLElement>("[data-frame]");
      const img = card.querySelector<HTMLElement>("[data-img]");
      const meta = card.querySelectorAll("[data-meta]");
      if (!frame || !img) return;

      gsap.fromTo(frame, { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)", duration: reduce ? 0.01 : 1.2, ease: "power4.inOut",
        scrollTrigger: { trigger: card, start: "top 80%", once: true },
      });
      gsap.fromTo(meta, { autoAlpha: 0, y: 14 }, {
        autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.06, delay: 0.4,
        scrollTrigger: { trigger: card, start: "top 80%", once: true },
      });
      if (!reduce) {
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    });
  }, { scope: root });

  return (
    <section ref={root} id="work" className="px-5 py-24 md:px-10 md:py-40">
      <SectionHeader
        index="01"
        label={`Selected work · ${featuredProjects.length} of ${projects.length}`}
        title={<>Work that<br />shipped<span className="text-accent">.</span></>}
        lede="A mix of client platforms and independent products. Client work is described in general terms; ask me for the detailed walkthrough on a call."
      />

      <ul className="grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-28">
        {featuredProjects.map((p, i) => {
          const Tag = p.href ? "a" : "div";
          const linkProps = p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {};
          return (
            <li key={p.slug} data-card className={`group ${p.featured ? "md:col-span-2" : ""} ${!p.featured && i % 2 === 0 ? "md:mt-24" : ""}`}>
              <Tag {...linkProps} className="block">
                <div data-frame className={`relative overflow-hidden rounded-xl border border-line bg-bg-elev ${p.featured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <div data-img className="absolute inset-[-10%]">
                    <Image src={p.image} alt={`${p.title} — preview`} fill sizes={p.featured ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                           className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-[1.04]" priority={i === 0} />
                  </div>
                  <span className="absolute left-4 top-4 rounded-full border border-fg/20 bg-bg/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg backdrop-blur">
                    {p.category}
                  </span>
                  {p.href && (
                    <span className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-fg text-bg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden>↗</span>
                  )}
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-12">
                  <div className="md:col-span-8">
                    <h3 data-meta className={`display ${p.featured ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"}`}>{p.title}</h3>
                    <p data-meta className="mt-3 max-w-xl leading-relaxed text-fg-muted">{p.summary}</p>
                  </div>
                  <dl data-meta className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-faint md:col-span-4 md:text-right">
                    <div className="rule flex justify-between gap-4 py-2 md:justify-end"><dt className="md:hidden">Client</dt><dd className="text-fg">{p.client}</dd></div>
                    <div className="rule flex justify-between gap-4 py-2 md:justify-end"><dt className="md:hidden">Role</dt><dd>{p.role}</dd></div>
                    <div className="rule flex justify-between gap-4 py-2 md:justify-end"><dt className="md:hidden">Year</dt><dd>{p.year}</dd></div>
                    <div className="rule flex flex-wrap gap-1.5 py-2 md:justify-end">
                      {p.stack.map((s) => <dd key={s} className="rounded-full border border-line px-2 py-0.5 normal-case tracking-normal text-fg-muted">{s}</dd>)}
                    </div>
                  </dl>
                </div>
              </Tag>
            </li>
          );
        })}
      </ul>

      <div className="rule mt-20 flex flex-wrap items-center justify-between gap-4 pt-6">
        <p className="text-fg-muted">More work under NDA, including enterprise retail and fintech.</p>
        <a href="#contact" className="group inline-flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-fg">
          Ask for a walkthrough <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
