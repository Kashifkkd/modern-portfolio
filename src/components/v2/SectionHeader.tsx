import type { ReactNode } from "react";
import TextReveal from "./TextReveal";

/** Consistent section opener: mono index label on a hairline, oversized heading, optional lede. */
export default function SectionHeader({ index, label, title, lede }: { index: string; label: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <div className="mb-12 md:mb-20">
      <div className="rule flex items-center justify-between pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <span>( {index} )</span>
        <span>{label}</span>
      </div>
      <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:items-end">
        <TextReveal as="h2" className="display text-[13vw] leading-[0.9] md:col-span-8 md:text-7xl lg:text-8xl">{title}</TextReveal>
        {lede && <p className="max-w-md text-base leading-relaxed text-fg-muted md:col-span-4 md:justify-self-end">{lede}</p>}
      </div>
    </div>
  );
}
