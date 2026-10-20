"use client";
import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "lines" slides masked lines up; "chars" blurs characters in. */
  type?: "lines" | "chars";
  delay?: number;
  /** Play immediately (hero) instead of on scroll into view. */
  immediate?: boolean;
  stagger?: number;
};

/**
 * One reveal component for the whole site so motion stays consistent.
 * Reduced-motion users get a plain fade. Cleans up will-change after it runs.
 */
export default function TextReveal({ as: Tag = "div", children, className = "", type = "lines", delay = 0, immediate = false, stagger }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const trigger = immediate ? undefined : { trigger: el, start: "top 88%", once: true };

    if (reduce) {
      gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, delay, scrollTrigger: trigger });
      return;
    }

    const split = SplitText.create(el, {
      type: type === "lines" ? "lines" : "chars,words",
      linesClass: "split-line",
      autoSplit: true,
      onSplit(self) {
        const targets = type === "lines" ? self.lines : self.chars;
        gsap.set(targets, { willChange: "transform, opacity, filter" });
        if (type === "lines") {
          // mask each line and slide its content up
          self.lines.forEach((line) => {
            const inner = document.createElement("span");
            inner.style.display = "block";
            while (line.firstChild) inner.appendChild(line.firstChild);
            line.appendChild(inner);
          });
          const inners = self.lines.map((l) => l.firstElementChild as HTMLElement);
          return gsap.fromTo(inners,
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: stagger ?? 0.08, delay, scrollTrigger: trigger,
              onComplete: () => gsap.set(targets, { clearProps: "willChange" }) });
        }
        return gsap.fromTo(self.chars,
          { autoAlpha: 0, filter: "blur(12px)", yPercent: 20 },
          { autoAlpha: 1, filter: "blur(0px)", yPercent: 0, duration: 0.9, ease: "power2.out",
            stagger: { each: stagger ?? 0.03, from: "random" }, delay, scrollTrigger: trigger,
            onComplete: () => gsap.set(targets, { clearProps: "willChange,filter" }) });
      },
    });
    return () => split.revert();
  }, { scope: ref, dependencies: [type, delay, immediate] });

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
