"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/lib/site";
import LocalTime from "./LocalTime";
import Magnetic from "./Magnetic";
import { getLenis } from "./SmoothScroll";

const links = [
  { href: "#work", label: "Work", n: "01" },
  { href: "#proof", label: "Proof", n: "02" },
  { href: "#services", label: "Services", n: "03" },
  { href: "#experience", label: "Experience", n: "04" },
  { href: "#about", label: "About", n: "05" },
  { href: "#faq", label: "FAQ", n: "06" },
  { href: "#contact", label: "Contact", n: "07" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) getLenis()?.stop(); else getLenis()?.start();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 text-fg ${open ? "" : "mix-blend-difference"}`}>
        <nav aria-label="Primary"
             className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10 transition-[padding] duration-500 ${scrolled ? "py-4" : "py-6"}`}>
          <Link href="#top" className="font-mono text-xs tracking-[0.14em] uppercase" onClick={() => setOpen(false)}>
            {profile.name}<span className="hidden sm:inline text-fg-faint"> — {profile.location.split(",")[0]}</span>
          </Link>

          <ul className="hidden items-center gap-8 text-sm lg:flex">
            {links.slice(0, 5).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative py-1">
                  {l.label}
                  <span className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 md:gap-5">
            <LocalTime className="hidden text-xs text-fg-muted xl:inline" />
            <Magnetic strength={0.25} className="hidden sm:inline-block">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-current px-4 py-2 text-sm transition-colors duration-300 hover:bg-fg hover:text-bg">
                <span className={`h-1.5 w-1.5 rounded-full ${profile.availability.open ? "bg-accent" : "bg-fg-faint"}`} />
                Let&apos;s talk
              </a>
            </Magnetic>
            <button type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}
                    className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-current lg:hidden">
              <span className="sr-only">Menu</span>
              <span className={`h-px w-4 bg-current transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-current transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="menu" role="dialog" aria-label="Menu"
                      className="fixed inset-0 z-40 flex flex-col justify-between bg-bg-elev px-5 pb-8 pt-28 text-fg"
                      initial={{ clipPath: "inset(0 0 100% 0 round 0 0 40% 40%)" }}
                      animate={{ clipPath: "inset(0 0 0% 0 round 0 0 0% 0%)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                      exit={{ clipPath: "inset(0 0 100% 0 round 0 0 40% 40%)", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}>
            <ul>
              {links.map((l, i) => (
                <motion.li key={l.href} className="rule" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.05 } }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4">
                    <span className="font-mono text-xs text-fg-faint">{l.n}</span>
                    <span className="display text-5xl">{l.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
              <div>
                <p className="mb-2 text-fg-muted">Socials</p>
                <ul className="flex gap-4 normal-case tracking-normal text-sm text-fg">
                  {profile.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
                </ul>
              </div>
              <div className="text-right"><p className="mb-2 text-fg-muted">Local time</p><LocalTime className="text-fg" /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
