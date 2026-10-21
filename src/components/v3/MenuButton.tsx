"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/lib/site";
import Magnetic from "@/components/v2/Magnetic";
import { getLenis } from "@/components/v2/SmoothScroll";
import { navLinks } from "./data";
import { scrollToId } from "./scroll";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Round menu button that scales in once the hero has scrolled away, opening a night drawer
 * whose left edge bows out as it slides in and straightens as it settles.
 */
export default function MenuButton() {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [h, setH] = useState(800);

  useEffect(() => {
    setH(window.innerHeight);
    const on = () => setShown(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (open) getLenis()?.stop(); else getLenis()?.start();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const visible = shown || open;
  const bowed = `M100 0 L100 ${h} Q-100 ${h / 2} 100 0`;
  const straight = `M100 0 L100 ${h} Q100 ${h / 2} 100 0`;

  return (
    <>
      <div className={`fixed right-5 top-5 z-[55] transition-transform duration-500 ease-[var(--ease)] md:right-8 md:top-8 ${visible ? "scale-100" : "scale-0"}`}>
        <Magnetic strength={0.3}>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}
                  className={`v3-fill grid h-[64px] w-[64px] place-items-center rounded-full ring-1 ring-white/15 [--fill:var(--brand)] md:h-[76px] md:w-[76px] ${open ? "bg-brand" : "bg-night"}`}>
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 h-px w-full bg-white transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-full bg-white transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </Magnetic>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)} className="fixed inset-0 z-[52] bg-black/30" />
            <motion.aside key="drawer" initial={{ x: "calc(100% + 100px)" }} animate={{ x: 0 }} exit={{ x: "calc(100% + 100px)" }}
                          transition={{ duration: 0.8, ease }}
                          className="fixed right-0 top-0 z-[53] flex h-svh w-full flex-col justify-between bg-night px-8 pb-10 pt-[16svh] text-white md:w-[480px] md:px-[90px]">
              <svg className="pointer-events-none absolute -left-[99px] top-0 hidden h-full w-[100px] fill-night md:block" aria-hidden>
                <motion.path initial={{ d: bowed }} animate={{ d: straight, transition: { duration: 1, ease } }} exit={{ d: bowed, transition: { duration: 0.8, ease } }} />
              </svg>

              <nav aria-label="Menu">
                <p className="mb-10 border-b border-white/20 pb-6 text-[11px] uppercase tracking-[0.12em] text-white/45">Navigation</p>
                <ul className="space-y-1">
                  {navLinks.map((l, i) => (
                    <motion.li key={l.id} initial={{ x: 80 }} animate={{ x: 0 }} exit={{ x: 80 }} transition={{ duration: 0.8, ease, delay: 0.05 * i }}>
                      <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToId(l.id), 350); }}
                         className="group flex items-center gap-5 text-[52px] font-light leading-[1.15] tracking-[-0.03em]">
                        <span className="h-2.5 w-2.5 scale-0 rounded-full bg-white transition-transform duration-300 group-hover:scale-100" />
                        <span className="-ml-[30px] transition-[margin] duration-300 group-hover:ml-0">{l.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="text-[14px]">
                <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-white/45">Socials</p>
                <ul className="flex flex-wrap gap-6">
                  {profile.socials.map((s) => (
                    <li key={s.label}><a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="v3-dot">{s.label}</a></li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
