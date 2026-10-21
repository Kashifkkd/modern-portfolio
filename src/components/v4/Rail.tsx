"use client";
import { useEffect, useState } from "react";
import { links, railNav } from "./data";
import { ArrowUpRight, GitHub, LinkedIn, Resume } from "./icons";
import ThemeToggle from "./ThemeToggle";
import { Burger } from "./Menu";

/** Fixed header that slides in once the hero is gone and tracks which step is on screen. */
export default function Rail() {
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const hero = document.getElementById("top");
    const steps = [...document.querySelectorAll("[data-step]")];
    const update = () => {
      setOn(!!hero && hero.getBoundingClientRect().bottom < innerHeight * 0.6);
      let act = -1;
      steps.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.5) act = i; });
      setActive(act);
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
    return () => { removeEventListener("scroll", update); removeEventListener("resize", update); };
  }, []);

  return (
    <header className="rail" data-on={on} inert={!on}>
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 clamp(16px,2.4vw,36px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "10px 0 4px" }}>
          <a href="#top" aria-label="Kashif Deshmukh, back to top" className="f-sig" style={{ flex: "0 1 auto", minWidth: 0, overflow: "hidden", fontSize: "clamp(24px,5vw,30px)", lineHeight: 1, textDecoration: "none", whiteSpace: "nowrap", paddingRight: 6 }}>Kashif Deshmukh</a>
          <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div className="rail-icons">
              <a href={links.github} target="_blank" rel="noopener" aria-label="GitHub" className="icon-btn icon-btn--built"><GitHub /></a>
              <a href={links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="icon-btn icon-btn--built"><LinkedIn /></a>
              <a href={links.resume} target="_blank" rel="noopener" aria-label="Resume (PDF)" className="icon-btn icon-btn--built"><Resume /></a>
            </div>
            <span className="desk-only"><ThemeToggle /></span>
            <a href={links.cal} target="_blank" rel="noopener" className="btn-accent f-mono desk-only" style={{ padding: "9px 14px", fontSize: 11, letterSpacing: ".04em", fontWeight: 400 }}>Book a call<ArrowUpRight /></a>
            <Burger />
          </div>
        </div>
        <nav aria-label="Journey" className="rail-steps f-mono">
          {railNav.map((l, i) => <a key={l.href} href={l.href} aria-current={i === active ? "step" : undefined}>{l.label}</a>)}
        </nav>
      </div>
    </header>
  );
}
