"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { profile } from "@/lib/site";
import Magnetic from "./Magnetic";
import LocalTime from "./LocalTime";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

/** Full-viewport close: the one ask, the email as display type, every channel, and when he's awake. */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.fromTo("[data-lift]", { y: 60 }, { y: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 30%", scrub: true } });
    gsap.to("[data-badge]", { rotate: 360, duration: 16, ease: "none", repeat: -1 });
  }, { scope: root });

  const year = new Date().getFullYear();

  return (
    <footer ref={root} id="contact" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-6 pt-24 md:px-10 md:pb-8 md:pt-36">
      <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <span>( 07 )</span><span>Contact</span>
      </div>

      <div data-lift className="my-12 md:my-16">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <TextReveal as="h2" className="display text-[15vw] leading-[0.88] md:col-span-9 md:text-[9.5vw]">
            Have a product<br />in mind? <span className="serif-accent text-accent">Let&apos;s talk</span>.
          </TextReveal>
          <div className="md:col-span-3 md:justify-self-end">
            <Magnetic strength={0.45}>
              <a href={profile.calUrl} target="_blank" rel="noopener noreferrer"
                 className="relative flex h-36 w-36 items-center justify-center rounded-full bg-accent text-center text-sm font-medium leading-tight text-accent-ink transition-transform duration-500 hover:scale-105 md:h-44 md:w-44 md:text-base">
                <svg data-badge viewBox="0 0 100 100" className="absolute inset-0 h-full w-full fill-accent-ink/60 font-mono text-[7px] uppercase tracking-[0.25em]" aria-hidden>
                  <defs><path id="circ2" d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" /></defs>
                  <text><textPath href="#circ2">30 min · no commitment · 30 min · no commitment ·</textPath></text>
                </svg>
                Book a call ↗
              </a>
            </Magnetic>
          </div>
        </div>

        <a href={`mailto:${profile.email}`} className="group mt-16 block w-fit md:mt-24">
          <span className="eyebrow block">Or email</span>
          <span className="display mt-3 block text-[5.4vw] text-fg md:text-[4vw]">
            {profile.email}
          </span>
          <span className="mt-2 block h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-100" />
        </a>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-fg-muted">
          <a href={profile.phoneHref} className="hover:text-fg">{profile.phone}</a>
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{profile.availability.label}</span>
          <span>Replies within one business day</span>
        </div>
      </div>

      <div className="rule grid gap-8 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint md:grid-cols-4">
        <div><p className="mb-2 text-fg-muted">Version</p><p>{year} © Edition</p></div>
        <div><p className="mb-2 text-fg-muted">Local time</p><LocalTime /></div>
        <div>
          <p className="mb-2 text-fg-muted">Socials</p>
          <ul className="flex gap-4 normal-case tracking-normal">
            {profile.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">{s.label}</a></li>)}
          </ul>
        </div>
        <div className="md:text-right"><p className="mb-2 text-fg-muted">Built with</p><p>Next.js · GSAP · R3F · Tailwind</p></div>
      </div>
    </footer>
  );
}
