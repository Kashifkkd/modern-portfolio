"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { profile } from "@/lib/site";
import Magnetic from "@/components/v2/Magnetic";
import { work } from "./data";

const pop = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  open: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const } },
  closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as const } },
};

/**
 * Hover list of projects. On desktop a preview card follows the cursor and slides between covers,
 * with a small round label on top; on touch it falls back to stacked cards.
 */
export default function Work() {
  const [hover, setHover] = useState<{ on: boolean; i: number }>({ on: false, i: 0 });
  const modal = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (refs: (HTMLDivElement | null)[], d: number) =>
      refs.map((el) => el && ({ x: gsap.quickTo(el, "left", { duration: d, ease: "power3" }), y: gsap.quickTo(el, "top", { duration: d, ease: "power3" }) }));
    const [m, c, l] = [...move([modal.current], 0.8), ...move([cursor.current, label.current], 0.45)];
    const onMove = (e: MouseEvent) => {
      [m, c, l].forEach((q) => { if (q) { q.x(e.clientX); q.y(e.clientY); } });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const current = work[hover.i];
  const cue = current.href ? "View" : current.source ? "Code" : "Private";

  return (
    <section id="work" className="px-5 pb-[14svh] pt-[10svh] md:px-[12vw]">
      <p className="mb-10 text-[11px] uppercase tracking-[0.12em] text-ink-muted md:pl-[7vw]">Recent work</p>

      {/* Desktop list */}
      <ul className="hidden border-b border-ink-faint md:block" onMouseLeave={() => setHover((h) => ({ ...h, on: false }))}>
        {work.map((p, i) => {
          const href = p.href ?? p.source;
          const Row = href ? "a" : "div";
          return (
            <li key={p.slug} onMouseEnter={() => setHover({ on: true, i })}>
              <Row {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
                   className="group flex w-full cursor-pointer items-center justify-between border-t border-ink-faint px-[7vw] py-[50px] transition-opacity duration-200 hover:opacity-40">
                <h3 className="m-0 text-[clamp(36px,4.6vw,76px)] font-normal leading-none tracking-[-0.03em] transition-transform duration-400 group-hover:-translate-x-2.5">{p.name}</h3>
                <p className="m-0 text-right text-[15px] transition-transform duration-400 group-hover:translate-x-2.5">
                  {p.category.split(" · ")[0]}<br /><span className="text-ink-muted">{p.year}</span>
                </p>
              </Row>
            </li>
          );
        })}
      </ul>

      {/* Mobile cards */}
      <ul className="grid gap-12 md:hidden">
        {work.map((p) => (
          <li key={p.slug}>
            <a href={p.href ?? p.source ?? undefined} target="_blank" rel="noreferrer" className="block">
              <div className="relative grid aspect-[4/3] place-items-center overflow-hidden" style={{ background: p.tint }}>
                <div className="relative h-[70%] w-[80%]"><Image src={p.image} alt="" fill unoptimized sizes="80vw" className="object-cover" /></div>
              </div>
              <h3 className="mt-4 text-[30px] font-normal leading-none tracking-[-0.03em]">{p.name}</h3>
              <div className="mt-3 flex justify-between border-t border-ink-faint pt-3 text-[14px]">
                <span>{p.category.split(" · ")[0]}</span><span className="text-ink-muted">{p.year}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-[10svh] flex justify-center">
        <Magnetic>
          <a href={profile.socials[0].href} target="_blank" rel="noreferrer"
             className="v3-fill inline-flex items-center gap-3 rounded-full border border-ink-faint px-12 py-6 text-[15px] [--fill:var(--night)] hover:text-white">
            More work on GitHub <sup>↗</sup>
          </a>
        </Magnetic>
      </div>

      {/* Floating preview (desktop pointer only) */}
      <div className="pointer-events-none hidden md:block">
        <motion.div ref={modal} variants={pop} initial="initial" animate={hover.on ? "open" : "closed"}
                    className="fixed z-30 flex h-[350px] w-[400px] items-center justify-center overflow-hidden">
          <div className="absolute h-full w-full transition-[top] duration-500 ease-[var(--ease)]" style={{ top: `${hover.i * -100}%` }}>
            {work.map((p) => (
              <div key={p.slug} className="flex h-full w-full items-center justify-center" style={{ background: p.tint }}>
                <div className="relative h-[66%] w-[80%] shadow-2xl"><Image src={p.image} alt="" fill unoptimized sizes="320px" className="object-cover" /></div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div ref={cursor} variants={pop} initial="initial" animate={hover.on ? "open" : "closed"}
                    className="fixed z-30 h-20 w-20 rounded-full bg-brand" />
        <motion.div ref={label} variants={pop} initial="initial" animate={hover.on ? "open" : "closed"}
                    className="fixed z-30 grid h-20 w-20 place-items-center text-[14px] text-white">{cue}</motion.div>
      </div>
    </section>
  );
}
