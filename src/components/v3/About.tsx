import { experience, profile, proof, stack } from "@/lib/site";

/**
 * Sticky intro on the left, experience on the right. Hovering one role dims the others
 * so the eye lands on a single entry.
 */
export default function About() {
  return (
    <section id="about" className="px-5 py-[14svh] md:px-[12vw]">
      <div className="lg:flex lg:justify-between lg:gap-[6vw]">
        <div className="lg:sticky lg:top-[14svh] lg:h-fit lg:w-[38%]">
          <p className="mb-8 text-[11px] uppercase tracking-[0.12em] text-ink-muted">About</p>
          <h2 className="m-0 text-[clamp(32px,3.4vw,54px)] font-normal leading-[1.08] tracking-[-0.03em]">
            Three years shipping software that real people use every day.
          </h2>
          <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.6] text-ink-muted">
            I&apos;m {profile.firstName}, a {profile.role.toLowerCase()} in {profile.location}. I&apos;ve built real-time platforms,
            AI products and store-ready mobile apps for teams in the UK and India, usually as the person who owns the whole stack.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-ink-faint pt-7">
            {proof.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="m-0 text-[40px] leading-none tracking-[-0.03em]">{s.value}{s.suffix}</dd>
                <p className="mt-2 text-[13px] text-ink-muted">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 lg:mt-[52px] lg:w-[52%]">
          <ol className="group/list">
            {experience.map((e) => (
              <li key={e.company} className="mb-3">
                <div className="relative grid gap-2 rounded-xl p-0 transition-all duration-300 sm:grid-cols-8 sm:gap-6 lg:p-6 lg:group-hover/list:opacity-45 lg:hover:!opacity-100 lg:hover:bg-white lg:hover:shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_40px_-20px_rgba(0,0,0,0.25)]">
                  <p className="m-0 pt-1 text-[12px] uppercase tracking-[0.08em] text-ink-muted sm:col-span-2">{e.period}</p>
                  <div className="sm:col-span-6">
                    <h3 className="m-0 text-[17px] font-medium leading-snug">
                      {e.href ? (
                        <a href={e.href} target="_blank" rel="noreferrer" className="group/link inline-flex items-baseline gap-1 hover:text-brand">
                          {e.role} · {e.company}
                          <span className="inline-block transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">↗</span>
                        </a>
                      ) : <>{e.role} · {e.company}</>}
                    </h3>
                    <p className="mt-1 text-[13px] text-ink-muted">{e.location}</p>
                    <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted">{e.summary}</p>
                    {e.stack.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                        {e.stack.map((s) => (
                          <li key={s} className="rounded-full bg-brand/10 px-3 py-1 text-[12px] font-medium text-[#c2410c]">{s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <a href={profile.resumeUrl} target="_blank" rel="noreferrer"
             className="group mt-8 inline-flex items-center gap-2 text-[16px] font-medium lg:ml-6">
            <span className="border-b border-transparent pb-px transition-colors group-hover:border-brand">View full résumé</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>

          <div className="mt-16 border-t border-ink-faint pt-6 lg:ml-6">
            <p className="mb-4 text-[11px] uppercase tracking-[0.12em] text-ink-muted">Daily tools</p>
            <ul className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <li key={s} className="rounded-full border border-ink-faint px-3.5 py-1.5 text-[13px]">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
