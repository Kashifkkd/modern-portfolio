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

/** Closing section: the one ask, with every way to reach Kashif and when he's awake. */
export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    // gentle parallax lift as the footer arrives
    gsap.fromTo("[data-lift]", { y: 80 }, {
      y: 0, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 40%", scrub: true },
    });
  }, { scope: root });

  const year = new Date().getFullYear();

  return (
    <footer ref={root} id="contact" className="rule relative overflow-hidden px-5 pb-8 pt-28 md:px-10 md:pt-40">
      <div data-lift>
        <TextReveal as="h2" className="display text-[14vw] leading-[0.9] md:text-[9vw]">
          Let&apos;s build<br />something <span className="serif-accent text-accent">real</span>.
        </TextReveal>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.45}>
            <a href={profile.calUrl} target="_blank" rel="noopener noreferrer"
               className="flex h-36 w-36 items-center justify-center rounded-full bg-accent text-center text-sm font-medium leading-tight text-accent-ink transition-transform duration-500 hover:scale-105 md:h-44 md:w-44 md:text-base">
              Book a<br />30-min call
            </a>
          </Magnetic>
          <div className="flex flex-wrap gap-3">
            <Magnetic strength={0.2}>
              <a href={`mailto:${profile.email}`} className="inline-block rounded-full border border-line px-5 py-3 text-sm transition-colors duration-300 hover:border-fg">{profile.email}</a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href={profile.phoneHref} className="inline-block rounded-full border border-line px-5 py-3 text-sm transition-colors duration-300 hover:border-fg">{profile.phone}</a>
            </Magnetic>
          </div>
        </div>

        <p className="mt-8 max-w-lg text-sm text-fg-muted">
          {profile.availability.label}. I reply within one business day. Work inquiries get priority over everything else in my inbox.
        </p>
      </div>

      <div className="rule mt-24 grid gap-8 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint md:grid-cols-4">
        <div><p className="mb-2 text-fg-muted">Version</p><p>{year} © Edition</p></div>
        <div><p className="mb-2 text-fg-muted">Local time</p><LocalTime /></div>
        <div>
          <p className="mb-2 text-fg-muted">Socials</p>
          <ul className="flex gap-4 normal-case tracking-normal">
            {profile.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">{s.label}</a></li>)}
          </ul>
        </div>
        <div><p className="mb-2 text-fg-muted">Built with</p><p>Next.js · GSAP · R3F · Tailwind</p></div>
      </div>
    </footer>
  );
}
