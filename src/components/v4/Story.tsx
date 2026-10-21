"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { experience, links, quotes, topProjects } from "./data";
import { ArrowUpRight, Check, Copy } from "./icons";

// Steps 06-08: career, top projects + quotes, contact/footer.

const mono11: CSSProperties = { fontSize: 11 };

/**
 * Career as a scroll-driven timeline (after the v1 journey section): the date and company stay pinned
 * on the left while each entry scrolls past, and an orange beam fills the rail, lighting each dot.
 */
export function Career() {
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 70%", "end 55%"] });
  const beam = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [lit, setLit] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", v => {
    const rows = railRef.current?.querySelectorAll<HTMLElement>("[data-row]");
    if (!rows?.length || !railRef.current) return;
    const h = railRef.current.offsetHeight;
    let n = -1;
    rows.forEach((r, i) => { if (v * h >= r.offsetTop + 30) n = i; });
    setLit(n);
  });

  return (
    <section id="experience" data-step="4" aria-labelledby="h-exp" className="sec">
      <div className="sec-stack">
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span className="eyebrow-hand">06. experience</span>
          <h2 id="h-exp" className="h2" style={{ maxWidth: "16ch" }}>A track record built one release at a time.</h2>
        </div>
        <ol ref={railRef} className="tl">
          <span aria-hidden className="tl-track" />
          <motion.span aria-hidden className="tl-beam" style={{ scaleY: beam }} />
          {experience.map((x, i) => (
            <li key={x.company} data-row="" className="tl-row" data-lit={i <= lit}>
              <span aria-hidden className="tl-dot" />
              <div className="tl-pin">
                <span className="f-mono tl-years">{x.years}</span>
                <h3 className="f-display tl-company">{x.company}</h3>
                <span className="f-mono tl-role">{x.role}</span>
              </div>
              <div data-reveal="fade" className="tl-body">
                {x.text.map(t => <p key={t} className="f-body">{t}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" data-step="5" aria-labelledby="h-work" className="sec">
      <div className="sec-stack">
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span className="eyebrow-hand">07. top projects</span>
          <h2 id="h-work" className="h2" style={{ maxWidth: "18ch" }}>Some of the best projects I&apos;ve worked on.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--line)" }}>
          {topProjects.map(p => (
            <article key={p.n} data-reveal="fade" className="work-row" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "16px clamp(24px,3vw,48px)", padding: "clamp(24px,3.4vh,36px) var(--row-pad)", margin: "0 calc(var(--row-pad) * -1)", borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <h3 className="f-display work-title" style={{ margin: 0, fontWeight: 500, fontSize: "clamp(26px,2.4vw,36px)", lineHeight: 1.1, letterSpacing: "-.015em" }}>{p.title}</h3>
                <span className="f-mono" style={{ ...mono11, color: "var(--dim)" }}>{p.tag}</span>
              </div>
              <p className="f-hand" style={{ margin: 0, fontSize: "clamp(17px,1.4vw,20px)", lineHeight: 1.4, color: "var(--fg-2)" }}>&ldquo;{p.note}&rdquo;</p>
              <ul className="f-body" style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "var(--muted)" }}>
                {p.outcome.map(o => <li key={o} style={{ display: "flex", gap: 10 }}><Check style={{ flex: "none", color: "var(--ok-text)", marginTop: 3 }} /><span>{o}</span></li>)}
              </ul>
              <div className="f-body" style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "var(--muted)" }}>
                <span style={{ color: "var(--fg)" }}>{p.team} | {p.role}</span>
                <span>{p.stack}</span>
                {p.live && (
                  <div className="f-mono" style={{ display: "flex", gap: 16, marginTop: 6, ...mono11 }}>
                    <a href={p.live} target="_blank" rel="noopener" className="link-under">Live<ArrowUpRight className="ink-arrow" /></a>
                    {p.source && <a href={p.source} target="_blank" rel="noopener" className="link-under">Source<ArrowUpRight className="ink-arrow" /></a>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span className="eyebrow-hand">what clients say</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "clamp(16px,2vw,28px)" }}>
            {quotes.map(q => (
              <figure key={q.name} data-reveal="fade" style={{ margin: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20, padding: 24, border: "1px solid var(--line)" }}>
                <blockquote className="f-display" style={{ margin: 0, fontSize: 19, lineHeight: 1.45, color: "var(--fg-2)", textWrap: "pretty" }}>“{q.text}”</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
                  <span aria-hidden className="f-display" style={{ flex: "none", width: 40, height: 40, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 600, letterSpacing: ".02em", color: "var(--accent-text)", background: "color-mix(in srgb, var(--accent) 14%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)" }}>
                    {q.name.split(" ").map(w => w[0]).join("")}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                    <span className="f-body" style={{ fontSize: 16, fontWeight: 600, color: "var(--fg)", lineHeight: 1.2 }}>{q.name}</span>
                    <span className="f-body" style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.3 }}>{q.role}, <span style={{ color: "var(--muted)" }}>{q.company}</span></span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = () => {
    const done = () => { setCopied(true); clearTimeout(timer.current); timer.current = window.setTimeout(() => setCopied(false), 2500); };
    // Older browsers / insecure contexts: copy through a hidden textarea, and only open mail if that fails too.
    const legacy = () => {
      const ta = document.createElement("textarea");
      ta.value = links.email; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      if (ok) done(); else location.href = `mailto:${links.email}`;
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(links.email).then(done, legacy); else legacy();
  };

  return (
    <section id="contact" data-step="6" aria-labelledby="h-contact" className="sec" style={{ paddingBottom: "clamp(40px,6vh,64px)" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(28px,4vh,44px)" }}>
        <span className="eyebrow-hand">08. yours</span>
        <h2 id="h-contact" className="f-display" style={{ margin: 0, fontWeight: 500, fontSize: "clamp(56px,9vw,160px)", lineHeight: 0.96, letterSpacing: "-.035em", maxWidth: "11ch", textWrap: "balance" }}>Your project is the next sheet.</h2>
        <p className="lede">Book a 30-minute call. If it&apos;s a fit, you get a written plan with milestones and a price within a few days.</p>
        <div className="f-mono" style={{ display: "flex", flexWrap: "wrap", gap: "14px 20px", alignItems: "center", fontSize: 13 }}>
          <a data-hover="" href={links.cal} target="_blank" rel="noopener" className="btn-accent" style={{ padding: "20px 28px" }}>Book a 30-min call<ArrowUpRight className="ink-arrow" /></a>
          <button type="button" onClick={copy} className="email-btn f-mono" aria-label={copied ? "Email copied" : `Copy ${links.email}`}>
            <span className="email-text">{links.email}</span>
            <span className="email-icon" data-copied={copied}>{copied ? <Check /> : <Copy />}</span>
            <span aria-live="polite" className="sr-only">{copied ? "Copied" : ""}</span>
          </button>
        </div>
        <div className="foot" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginTop: "clamp(48px,10vh,120px)", paddingTop: 24, borderTop: "1px solid var(--line)" }}>
          <span data-reveal="sig" className="f-sig" style={{ fontSize: "clamp(44px,5vw,72px)", lineHeight: 1, padding: "0 12px 6px 0", whiteSpace: "nowrap" }}>Kashif Deshmukh</span>
          <nav aria-label="Elsewhere" className="f-mono" style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: 12 }}>
            <a href={links.github} target="_blank" rel="noopener" className="link-plain">GitHub<ArrowUpRight className="ink-arrow" /></a>
            <a href={links.linkedin} target="_blank" rel="noopener" className="link-plain">LinkedIn<ArrowUpRight className="ink-arrow" /></a>
            <a href={links.resume} target="_blank" rel="noopener" className="link-plain">Resume<ArrowUpRight className="ink-arrow" /></a>
          </nav>
          <span className="f-mono foot-legal" style={{ ...mono11, color: "var(--dim)" }}><span>© 2026 Kashif Deshmukh</span><span>Mumbai, India</span></span>
        </div>
      </div>
    </section>
  );
}
