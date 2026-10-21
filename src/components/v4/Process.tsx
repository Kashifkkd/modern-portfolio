import type { CSSProperties } from "react";
import { callNotes, shipItems, steps, terminal, type Fact, type TermLine } from "./data";
import PlanBoard from "./PlanBoard";
import { Check } from "./icons";

// Steps 02-05: the call, the plan, the build, the launch. Each pairs copy with an "example" artefact.

function Copy({ id, step }: { id: string; step: (typeof steps)[keyof typeof steps] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <span className="eyebrow-hand">{step.n}</span>
      <h2 id={id} className="h2">{step.title}</h2>
      <p className="lede">{step.text}</p>
      {step.facts.length > 0 && <Facts facts={step.facts} />}
    </div>
  );
}

function Facts({ facts }: { facts: Fact[] }) {
  return (
    <div className="facts f-mono" style={{ fontSize: 11 }}>
      {facts.map(f => <div key={f.k} className="fact"><span>{f.k}</span><span>{f.v}</span></div>)}
    </div>
  );
}

const mono10: CSSProperties = { fontFamily: "var(--font-martian), monospace", letterSpacing: ".06em", textTransform: "uppercase", fontSize: 10 };

export function Call() {
  return (
    <section id="process" data-step="0" aria-labelledby="h-call" className="sec">
      <div className="sec-grid">
        <Copy id="h-call" step={steps.call} />
        <div data-reveal="lines" className="paper" style={{ paddingBottom: 20 }}>
          <span aria-hidden className="tape" style={{ top: -13, left: "50%", transform: "translateX(-50%)" }} />
          <span aria-hidden style={{ position: "absolute", left: 50, top: 0, bottom: 0, width: 1, background: "rgba(194,65,43,.45)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "26px 26px 8px 66px" }}>
            <span className="f-hand" style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.2 }}>Call notes</span>
            <span className="stamp">Example</span>
          </div>
          <div className="f-hand" style={{ padding: "0 26px 34px 66px", fontSize: 20, lineHeight: "34px", backgroundImage: "linear-gradient(to bottom, transparent 28px, rgba(70,100,150,.28) 28px, rgba(70,100,150,.28) 29px, transparent 29px)", backgroundSize: "100% 34px" }}>
            {callNotes.map(n => <div key={n} data-line="">{n}</div>)}
            <div data-line="" style={{ color: "#C2412B" }}>Their export-to-PDF idea: <span style={{ border: "1.5px solid #C2412B", borderRadius: "50%", padding: "0 7px", margin: "0 -2px" }}>not worth it yet</span>. Told them why.</div>
            <div data-line="">Next: written plan by Friday ✓</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Plan() {
  return (
    <section id="plan" data-step="1" aria-labelledby="h-plan" className="sec">
      <div className="sec-grid">
        <Copy id="h-plan" step={steps.plan} />
        <PlanBoard />
      </div>
    </section>
  );
}

const toneColor: Record<NonNullable<TermLine["tone"]>, string> = { cmd: "#F1EDE4", ok: "#7BD88F", dim: "#8A857C", err: "#E8743B" };

export function Build() {
  return (
    <section id="build" data-step="2" aria-labelledby="h-build" className="sec">
      <div className="sec-grid">
        <Copy id="h-build" step={steps.build} />
        {/* The terminal stays dark in both themes: it's a terminal. */}
        <div data-reveal="type" style={{ background: "#111111", border: "1px solid #2A2A2A", borderRadius: 3, overflow: "hidden" }}>
          <div className="f-mono" style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 16px", borderBottom: "1px solid #2A2A2A", fontSize: 11, color: "#8A857C" }}><span style={{ textTransform: "none" }}>~/yourapp | zsh</span><span>Example</span></div>
          <div style={{ padding: "clamp(16px,2vw,24px)", fontFamily: "var(--font-martian), monospace", fontSize: "clamp(12px,1vw,14px)", lineHeight: 1.75, color: "#C9C3B8", minHeight: "20em", wordBreak: "break-word" }}>
            {terminal.map((l, i) => <div key={i} data-tline="" style={{ whiteSpace: "pre-wrap", color: l.tone ? toneColor[l.tone] : undefined }}>{l.text}</div>)}
            <div style={{ color: "#F1EDE4" }}>$ <span data-caret="" style={{ display: "inline-block", width: ".6em", height: "1.1em", verticalAlign: "-.2em", background: "#F1EDE4" }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Ship() {
  return (
    <section id="ship" data-step="3" aria-labelledby="h-ship" className="sec">
      <div className="sec-grid">
        <Copy id="h-ship" step={steps.ship} />
        {/* A plain launch checklist: square corners, one outline, rows separated by space, not borders. */}
        <div data-reveal="check" className="ship-card">
          <div className="ship-head">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span className="f-display" style={{ fontWeight: 500, fontSize: "clamp(20px,1.8vw,24px)", lineHeight: 1.1 }}>Launch checklist</span>
              <span style={{ ...mono10, color: "var(--dim)" }}>yourapp.com | v1.0.0</span>
            </div>
            <span style={{ ...mono10, color: "var(--faint)" }}>Example</span>
          </div>
          <ul className="ship-list">
            {shipItems.map(it => (
              <li key={it.t} data-check="">
                <span data-box="" className="ship-box"><Check width={11} height={11} strokeWidth={2.6} /></span>
                <span className="ship-item">
                  <span className="f-body">{it.t}</span>
                  <span style={{ ...mono10, color: "var(--dim)" }}>{it.m}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="f-mono ship-foot">
            <span style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}><span data-sdot="" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ok)" }} /><span data-stext="">In production</span></span>
            <span style={{ color: "var(--dim)", whiteSpace: "nowrap" }}>Handed over</span>
            <span data-sbar="" className="ship-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}
