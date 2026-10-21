import { process, services } from "@/lib/site";

/** Three service columns, then how an engagement runs from first call to handover. */
export default function Services() {
  return (
    <section id="services" className="px-5 py-[14svh] md:px-[12vw]">
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-8 text-[11px] uppercase tracking-[0.12em] text-ink-muted">Services</p>
          <h2 className="m-0 max-w-[16ch] text-[clamp(32px,3.4vw,54px)] font-normal leading-[1.08] tracking-[-0.03em]">
            One engineer, accountable for the whole thing.
          </h2>
        </div>
        <p className="max-w-[36ch] text-[16px] leading-[1.6] text-ink-muted">
          Fixed-scope builds or weekly engagements. Remote, with working hours that overlap the UK, EU and US East Coast.
        </p>
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl bg-ink-faint md:grid-cols-3">
        {services.map((s) => (
          <article key={s.index} className="group flex flex-col bg-paper p-7 transition-colors duration-500 hover:bg-night hover:text-white md:p-9">
            <span className="text-[13px] text-ink-muted group-hover:text-white/50">{s.index}</span>
            <h3 className="mt-14 text-[26px] font-normal leading-tight tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted group-hover:text-white/60">{s.blurb}</p>
            <ul className="mt-6 space-y-1.5 border-t border-ink-faint pt-5 text-[14px] group-hover:border-white/15">
              {s.bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-brand">→</span>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>

      <ol className="mt-20 grid gap-10 md:grid-cols-4 md:gap-8">
        {process.map((p) => (
          <li key={p.step} className="relative border-t border-ink pt-5">
            <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-brand" />
            <p className="text-[13px] text-ink-muted">{p.step}</p>
            <h3 className="mt-3 text-[22px] font-normal tracking-[-0.02em]">{p.title}</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
