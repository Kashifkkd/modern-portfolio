import { experience, profile } from "@/lib/site";
import TextReveal from "./TextReveal";

/** Chiang-style list: dates, role, two lines, stack. Scannable in ten seconds. Server component. */
export default function Experience() {
  return (
    <section id="experience" className="rule px-5 py-28 md:px-10 md:py-40">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <TextReveal as="h2" className="display text-5xl md:text-7xl">Experience<span className="text-accent">.</span></TextReveal>
        <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm">
          Full résumé (PDF) <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
        </a>
      </div>

      <ol>
        {experience.map((e) => (
          <li key={e.period} className="rule grid gap-3 py-8 md:grid-cols-12 md:gap-6 md:py-10">
            <span className="font-mono text-xs text-fg-faint md:col-span-3">{e.period}</span>
            <div className="md:col-span-9">
              <h3 className="text-xl md:text-2xl">
                {e.role} <span className="text-fg-muted">·</span>{" "}
                {e.href ? <a href={e.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-fg">{e.company}</a> : e.company}
              </h3>
              <p className="mt-1 font-mono text-xs text-fg-faint">{e.location}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">{e.summary}</p>
              {e.stack.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-fg-muted">{s}</li>)}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
