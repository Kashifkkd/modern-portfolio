"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { featuredProjects, projects } from "@/lib/site";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected work as an editorial list: index, result-first title, role, year.
 * On pointer devices a floating image follows the cursor and swaps per row (Snellenberg pattern).
 * On touch, each row shows its image inline.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const floater = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(() => {
    if (!root.current) return;
    const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
    gsap.fromTo(rows, { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
    });

    if (window.matchMedia("(pointer: coarse)").matches || !floater.current) return;
    const xTo = gsap.quickTo(floater.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(floater.current, "y", { duration: 0.6, ease: "power3" });
    const move = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, { scope: root });

  useGSAP(() => {
    if (!floater.current) return;
    gsap.to(floater.current, { scale: active === null ? 0 : 1, autoAlpha: active === null ? 0 : 1, duration: 0.5, ease: "power3.out" });
  }, { dependencies: [active] });

  return (
    <section ref={root} id="work" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <TextReveal as="h2" className="display text-5xl md:text-7xl">Selected<br />work<span className="text-accent">.</span></TextReveal>
        <p className="eyebrow">{featuredProjects.length} of {projects.length} projects</p>
      </div>

      <ol className="rule">
        {featuredProjects.map((p, i) => (
          <li key={p.slug} data-row className="rule group opacity-0 first:border-t-0"
              onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
            <a href={p.href ?? "#contact"} target={p.href ? "_blank" : undefined} rel={p.href ? "noopener noreferrer" : undefined}
               className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:py-10 transition-opacity duration-500 group-hover:opacity-100 [ol:hover_&:not(:hover)]:opacity-40">
              <span className="font-mono text-xs text-fg-faint md:col-span-1">0{i + 1}</span>
              <div className="md:col-span-7">
                <h3 className="display text-3xl md:text-5xl transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] md:group-hover:translate-x-3">{p.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted md:text-base">{p.summary}</p>
                <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-lg border border-line md:hidden">
                  <Image src={p.image} alt="" fill sizes="100vw" className="object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm md:col-span-4 md:items-end md:text-right">
                <span className="text-fg">{p.client}</span>
                <span className="text-fg-muted">{p.role}</span>
                <span className="font-mono text-xs text-fg-faint">{p.year}</span>
                {p.result && <span className="mt-2 inline-block rounded-full border border-accent/40 px-3 py-1 font-mono text-[11px] text-accent">{p.result}</span>}
                <span className="mt-2 flex flex-wrap gap-1.5 md:justify-end">
                  {p.stack.map((s) => <span key={s} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-fg-muted">{s}</span>)}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex justify-end">
        <a href="#contact" className="group inline-flex items-center gap-3 text-sm">
          Want the full list, including NDA work? Ask me
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>

      {/* floating image follows the cursor on desktop */}
      <div ref={floater} aria-hidden
           className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[260px] w-[380px] -translate-x-1/2 -translate-y-1/2 scale-0 overflow-hidden rounded-xl border border-line bg-bg-elev opacity-0 shadow-2xl md:block">
        {featuredProjects.map((p, i) => (
          <Image key={p.slug} src={p.image} alt="" fill sizes="380px"
                 className={`object-cover transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
    </section>
  );
}
