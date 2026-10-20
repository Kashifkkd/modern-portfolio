"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/** A paragraph whose words brighten one by one as it scrolls through the viewport. */
export default function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    const words = ref.current?.querySelectorAll("span[data-w]");
    if (!words?.length) return;
    gsap.fromTo(words, { opacity: 0.18 }, {
      opacity: 1, ease: "none", stagger: 0.05,
      scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: 0.4 },
    });
  }, { scope: ref });

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w className="inline-block will-change-[opacity]">{w}&nbsp;</span>
      ))}
    </p>
  );
}
