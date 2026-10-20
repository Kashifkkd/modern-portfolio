"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { facts, profile, stack } from "@/lib/site";
import ScrollWords from "./ScrollWords";

gsap.registerPlugin(ScrollTrigger);

const statement =
  "I'm Kashif, a senior software engineer in Mumbai. For three years I've shipped production software for enterprise clients and startups: real-time communication and CRM platforms, visual automation tooling, a real-time event-intelligence system and a consumer app on both stores. I write the backend and the front-end, I ship the mobile app, and I'll tell you when a feature isn't worth building.";

export default function About() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.fromTo("[data-portrait]", { yPercent: -10 }, {
      yPercent: 10, ease: "none",
      scrollTrigger: { trigger: "[data-portrait-wrap]", start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.fromTo(gsap.utils.toArray("[data-fact]"), { autoAlpha: 0, y: 20 }, {
      autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.07,
      scrollTrigger: { trigger: "[data-facts]", start: "top 80%", once: true },
    });
  }, { scope: root });

  return (
    <section ref={root} id="about" className="px-5 py-24 md:px-10 md:py-40">
      <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <span>( 05 )</span><span>About</span>
      </div>

      <ScrollWords text={statement} className="display mt-12 max-w-[22ch] text-[7.5vw] leading-[1.02] md:mt-20 md:text-6xl lg:text-7xl" />

      <div className="mt-20 grid gap-10 md:mt-32 md:grid-cols-12">
        <div data-portrait-wrap className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line">
            <div data-portrait className="absolute inset-[-12%]">
              <Image src="/kashif_profile_img.jpeg" alt={`${profile.name}, portrait`} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover grayscale" />
            </div>
            <span className="absolute bottom-4 left-4 rounded-full border border-fg/20 bg-bg/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur">{profile.location}</span>
          </div>
        </div>

        <div data-facts className="md:col-span-6 md:col-start-7">
          <p className="eyebrow mb-6">Working with me</p>
          <dl>
            {facts.map((f) => (
              <div key={f.k} data-fact className="rule grid grid-cols-2 gap-4 py-4 text-sm md:text-base">
                <dt className="text-fg-muted">{f.k}</dt>
                <dd className="text-fg">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="eyebrow mb-4 mt-12">Stack</p>
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {stack.map((s) => <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-muted">{s}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
