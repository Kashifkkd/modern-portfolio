import Image from "next/image";
import { profile, stack } from "@/lib/site";
import TextReveal from "./TextReveal";

export default function About() {
  return (
    <section id="about" className="px-5 py-24 md:px-10 md:py-40">
      <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <span>( 05 )</span><span>About</span>
      </div>
      <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-line">
            <Image src="/kashif_profile_img.jpeg" alt={`${profile.name}, portrait`} fill sizes="(max-width: 768px) 100vw, 33vw"
                   className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0" />
          </div>
          <p className="mt-4 font-mono text-xs text-fg-faint">{profile.location} · works with teams in UK, EU, US</p>
        </div>

        <div className="md:col-span-8">
          <TextReveal as="h2" className="display text-4xl md:text-6xl">
            Engineer first, <span className="serif-accent text-fg-muted">designer enough</span> to care how it feels.
          </TextReveal>
          <div className="mt-8 max-w-2xl space-y-5 leading-relaxed text-fg-muted">
            <p>
              I&apos;m {profile.firstName}, a senior software engineer based in Mumbai. Over the last three years I&apos;ve shipped
              production software for enterprise clients and startups: real-time communication and CRM platforms, visual
              automation tooling, and most recently a real-time event-intelligence system and a consumer mobile app on both stores.
            </p>
            <p>
              I like problems where the data is messy and the stakes are real. I write the backend and the front-end, I ship
              the mobile app, and I&apos;ll tell you when a feature isn&apos;t worth building. Clients keep me around because I
              communicate early, push back when something doesn&apos;t make sense, and leave codebases cleaner than I found them.
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Technologies">
            {stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-muted">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
