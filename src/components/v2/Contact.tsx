"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import { credits, footerLinks, profile } from "@/lib/site";
import Magnetic from "./Magnetic";
import LocalTime from "./LocalTime";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

/** "Come say hi" close: labelled link groups in a human voice, click-to-copy email, a credits panel. */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  useGSAP(() => {
    gsap.fromTo("[data-lift]", { y: 60 }, { y: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 30%", scrub: true } });
    gsap.to("[data-badge]", { rotate: 360, duration: 16, ease: "none", repeat: -1 });
  }, { scope: root });

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${profile.email}`; }
  };

  const year = new Date().getFullYear();

  return (
    <footer ref={root} id="contact" className="relative overflow-hidden px-5 pb-6 pt-24 md:px-10 md:pb-8 md:pt-36">
      <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <span>( 07 )</span><span>Come say hi</span>
      </div>

      <div data-lift className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <TextReveal as="h2" className="display text-[14vw] leading-[0.88] md:text-[7.5vw]">
            Have a product<br />in mind? <span className="serif-accent text-accent">Let&apos;s talk</span>.
          </TextReveal>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic strength={0.45}>
              <a href={profile.calUrl} target="_blank" rel="noopener noreferrer"
                 className="relative flex h-36 w-36 items-center justify-center rounded-full bg-accent text-center text-sm font-medium leading-tight text-accent-ink transition-transform duration-500 hover:scale-105 md:h-40 md:w-40">
                <svg data-badge viewBox="0 0 100 100" className="absolute inset-0 h-full w-full fill-accent-ink/60 font-mono text-[7px] uppercase tracking-[0.25em]" aria-hidden>
                  <defs><path id="circ2" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" /></defs>
                  <text><textPath href="#circ2">30 min · no commitment · 30 min · no commitment ·</textPath></text>
                </svg>
                Book a call ↗
              </a>
            </Magnetic>
            <div>
              <p className="eyebrow">For inquiries · click to copy</p>
              <button type="button" onClick={copy} className="group mt-2 block text-left">
                <span className="display block text-[5.4vw] text-fg md:text-[2.6vw]">{profile.email}</span>
                <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={copied ? "c" : "i"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="block">
                      {copied ? "Copied - talk soon" : "Copy email"}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-5 md:grid-cols-1">
          {footerLinks.map((g) => (
            <div key={g.label}>
              <p className="eyebrow mb-3">{g.label}</p>
              <ul className="space-y-1">
                {g.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                       className="group inline-flex items-center gap-2 text-lg text-fg md:text-xl">
                      {it.label}<span className="translate-x-0 text-fg-faint transition-transform duration-300 group-hover:translate-x-1">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="eyebrow mb-3">Availability</p>
            <p className="inline-flex items-center gap-2 text-lg md:text-xl"><span className="h-2 w-2 rounded-full bg-accent" />{profile.availability.label}</p>
            <p className="mt-1 text-sm text-fg-muted">{profile.location} · <LocalTime /></p>
          </div>
        </div>
      </div>

      <div className="rule mt-24 flex flex-wrap items-center justify-between gap-4 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <span>{profile.name} © {year} · Edition 02</span>
        <button type="button" onClick={() => setShowCredits((v) => !v)} aria-expanded={showCredits} className="underline decoration-line underline-offset-4 hover:text-fg">
          {showCredits ? "Close credits" : "Credits"}
        </button>
      </div>

      <AnimatePresence>
        {showCredits && (
          <motion.dl initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                     className="overflow-hidden">
            <div className="grid gap-4 pt-6 text-sm sm:grid-cols-2 md:grid-cols-4">
              {credits.map((c) => (
                <div key={c.k}><dt className="eyebrow mb-2">{c.k}</dt><dd className="text-fg-muted">{c.v}</dd></div>
              ))}
            </div>
          </motion.dl>
        )}
      </AnimatePresence>
    </footer>
  );
}
