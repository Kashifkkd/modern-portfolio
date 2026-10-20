"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { proof, testimonials } from "@/lib/site";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

/** Numbers count up once in view; testimonials sit right beside them so proof is next to the claim. */
export default function Proof() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const nums = gsap.utils.toArray<HTMLElement>("[data-count]");
    nums.forEach((el) => {
      const end = Number(el.dataset.count);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => { el.textContent = Math.round(obj.v).toString(); },
      });
    });
  }, { scope: root });

  return (
    <section ref={root} aria-labelledby="proof-heading" className="rule px-5 py-24 md:px-10 md:py-32">
      <h2 id="proof-heading" className="sr-only">Results and testimonials</h2>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {proof.map((p) => (
          <div key={p.label}>
            <dd className="display text-6xl md:text-8xl">
              <span data-count={p.value}>0</span>{p.suffix}
            </dd>
            <dt className="mt-3 max-w-[16ch] text-sm text-fg-muted">{p.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-24 grid gap-10 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={t.name} className="flex flex-col justify-between gap-6">
            <TextReveal as="blockquote" className="text-lg leading-snug md:text-xl" delay={i * 0.08}>
              <span className="serif-accent text-fg-faint">“</span>{t.quote}<span className="serif-accent text-fg-faint">”</span>
            </TextReveal>
            <figcaption className="font-mono text-xs text-fg-muted">
              {t.name} <span className="text-fg-faint">— {t.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
