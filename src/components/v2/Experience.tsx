import { experience, profile } from "@/lib/site";
import SectionHeader from "./SectionHeader";

/** Scannable career list: oversized period, role, two lines, stack. Server component. */
export default function Experience() {
  return (
    <section id="experience" className="px-5 py-24 md:px-10 md:py-40">
      <SectionHeader
        index="04"
        label="Experience"
        title={<>Where I&apos;ve<br />worked<span className="text-accent">.</span></>}
        lede={
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-fg">
            Download résumé <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </a>
        }
      />

      <ol>
        {experience.map((e) => (
          <li key={e.period} className="rule group grid gap-4 py-10 md:grid-cols-12 md:gap-6 md:py-14">
            <span className="display text-3xl text-fg-faint transition-colors duration-500 group-hover:text-fg md:col-span-4 md:text-5xl">{e.period}</span>
            <div className="md:col-span-8">
              <h3 className="display text-2xl md:text-4xl">{e.role}</h3>
              <p className="mt-2 text-fg-muted">
                {e.href ? <a href={e.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-fg">{e.company}</a> : e.company}
                <span className="text-fg-faint"> · {e.location}</span>
              </p>
              <p className="mt-5 max-w-2xl leading-relaxed text-fg-muted">{e.summary}</p>
              {e.stack.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-1.5">
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
