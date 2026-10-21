"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LayoutGroup, motion } from "motion/react";
import { BOARD_TOTAL, BOARD_VISIBLE, boardMoves, boardStart, boardStartDone, boardTickets, docSections, milestones, type BoardCol } from "./data";

const mono10: CSSProperties = { fontFamily: "var(--font-martian), monospace", letterSpacing: ".06em", textTransform: "uppercase", fontSize: 10 };
const cols: { key: BoardCol; label: string }[] = [{ key: "todo", label: "To do" }, { key: "doing", label: "Doing" }, { key: "done", label: "Done" }];
const BEAT = 1100; // ms between ticket moves
const PLAN_HOLD = 5200, BOARD_HOLD = 1800, DOC_BEAT = 750, DOC_HOLD = 2600;

type View = "plan" | "board" | "docs";
const views: { key: View; label: string; title: string }[] = [
  { key: "plan", label: "Plan", title: "Scope & plan, v1" },
  { key: "board", label: "Board", title: "Sprint board, week 3" },
  { key: "docs", label: "Docs", title: "Handover guide" },
];

/**
 * The "plan" artefact, in three views on one sheet of paper: the scope plan, a sticky-note sprint
 * board where tickets glide from To do to Done, and the handover guide writing itself section by
 * section. Autoplays (plan, board, docs, repeat) while on screen; tapping a tab takes over.
 */
export default function PlanBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>("plan");
  const [board, setBoard] = useState(boardStart);
  const [beat, setBeat] = useState(0);
  const [doneCount, setDoneCount] = useState(boardStartDone); // all tickets finished, not just the ones still on the board
  const [written, setWritten] = useState(0); // doc sections written so far
  const [inView, setInView] = useState(false);
  const [manual, setManual] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Plan -> board -> (moves) -> plan ... while visible and not taken over by the visitor.
  useEffect(() => {
    if (!inView || manual || reduced.current) return;
    if (view === "plan") {
      const t = setTimeout(() => { setBoard(boardStart); setBeat(0); setDoneCount(boardStartDone); setView("board"); }, PLAN_HOLD);
      return () => clearTimeout(t);
    }
    if (view === "board") {
      if (beat < boardMoves.length) {
        const t = setTimeout(() => step(), beat === 0 ? 900 : BEAT);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => { setWritten(0); setView("docs"); }, BOARD_HOLD);
      return () => clearTimeout(t);
    }
    if (written < docSections.length + 1) {
      const t = setTimeout(() => setWritten(n => n + 1), written === 0 ? 700 : DOC_BEAT);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setView("plan"), DOC_HOLD);
    return () => clearTimeout(t);
  }, [inView, manual, view, beat, written]);

  // Opening the docs by hand still writes the guide out once.
  useEffect(() => {
    if (!manual || view !== "docs" || !inView || written > docSections.length) return;
    const t = setTimeout(() => setWritten(n => n + 1), written === 0 ? 400 : DOC_BEAT);
    return () => clearTimeout(t);
  }, [manual, view, inView, written]);

  // When the visitor opens the board themselves, still play the sprint through once.
  useEffect(() => {
    if (!manual || view !== "board" || !inView || beat >= boardMoves.length) return;
    const t = setTimeout(() => step(), beat === 0 ? 600 : BEAT);
    return () => clearTimeout(t);
  }, [manual, view, inView, beat]);

  function step() {
    const [id, to] = boardMoves[beat];
    setBoard(b => {
      const next = { todo: b.todo.filter(x => x !== id), doing: b.doing.filter(x => x !== id), done: b.done.filter(x => x !== id) };
      if (to === "done") next.done = [id, ...next.done].slice(0, BOARD_VISIBLE); // oldest note gets filed away
      else next[to] = [...next[to], id];
      return next;
    });
    if (to === "done") setDoneCount(n => n + 1);
    setBeat(n => n + 1);
  }


  const pick = (v: View) => {
    setManual(true);
    if (v === "board" && view !== "board") { setBoard(boardStart); setBeat(0); setDoneCount(boardStartDone); }
    if (v === "docs" && view !== "docs") setWritten(reduced.current ? docSections.length + 1 : 0);
    setView(v);
  };

  const done = doneCount, total = BOARD_TOTAL;

  return (
    <div ref={ref} data-reveal="bars" className="paper plan-card">
      <span aria-hidden className="tape" style={{ top: -13, right: "18%", width: 120 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="f-hand" style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.2 }}>{views.find(v => v.key === view)!.title}</span>
          <span style={{ ...mono10, color: "#5F6168" }}>
            {view === "plan" ? "6 weeks | fixed price" : view === "board" ? `${done} of ${total} done | Friday demo` : "docs/handover.md | yours to keep"}
          </span>
        </div>
        <span className="stamp">Example</span>
      </div>

      <div role="tablist" aria-label="Plan, board or docs" className="plan-tabs">
        {views.map(v => (
          <button key={v.key} role="tab" type="button" aria-selected={view === v.key} onClick={() => pick(v.key)} className="plan-tab">
            {v.label}
            {view === v.key && <motion.span layoutId="plan-tab-ink" className="plan-tab-ink" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
          </button>
        ))}
      </div>

      {/* Both views share one grid cell, so switching never changes the card's height. */}
      <div style={{ display: "grid" }}>
        <div className="plan-view" data-on={view === "plan"} aria-hidden={view !== "plan"}><PlanView /></div>
        <div className="plan-view plan-view--board" data-on={view === "board"} aria-hidden={view !== "board"}>
          <LayoutGroup>
            <div className="kb">
              {cols.map(c => (
                <div key={c.key} className="kb-col">
                  <div className="kb-head" data-col={c.key}>
                    <span className="kb-label"><span className="kb-dot" />{c.label}</span>
                    <span className="kb-count">{c.key === "done" ? done : board[c.key].length}</span>
                  </div>
                  <div className="kb-stack">
                    {board[c.key].map(id => {
                      const tk = boardTickets.find(t => t.id === id)!;
                      return (
                        <motion.div key={id} layoutId={id} layout transition={{ type: "spring", stiffness: 260, damping: 30 }} className="kb-note" data-done={c.key === "done"} style={{ background: tk.c }}>
                          <span style={{ ...mono10, fontSize: 9, color: "#5F6168" }}>{tk.id}</span>
                          <span className="f-hand kb-title">{tk.t}</span>
                          <span className="kb-meta"><span style={{ ...mono10, fontSize: 9 }}>{tk.m}</span><span className="kb-avatar">KD</span></span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </LayoutGroup>
          <div className="kb-foot">
            <span style={{ ...mono10, color: "#5F6168" }}>Week 3 of 6</span>
            <span className="kb-track"><motion.span className="kb-fill" animate={{ scaleX: done / total }} transition={{ type: "spring", stiffness: 160, damping: 26 }} /></span>
            <span className="f-hand" style={{ fontSize: 17, whiteSpace: "nowrap", color: beat >= boardMoves.length ? "#C2412B" : "#2B2D33" }}>{beat >= boardMoves.length ? "demo ready ✓" : "on track"}</span>
          </div>
        </div>
        <div className="plan-view" data-on={view === "docs"} aria-hidden={view !== "docs"}><DocsView written={written} /></div>
      </div>
    </div>
  );
}

/** The handover guide: sections appear (and get ticked) one at a time, then the deploy snippet and walkthrough. */
function DocsView({ written }: { written: number }) {
  const show = (i: number) => written > i;
  return (
    <div className="doc">
      <ol className="doc-list">
        {docSections.map((sec, i) => (
          <li key={sec.t} data-on={show(i)}>
            <span className="doc-n" style={mono10}>{String(i + 1).padStart(2, "0")}</span>
            <span className="doc-text">
              <span className="f-hand doc-title">{sec.t}{show(i) && <span className="doc-tick"> ✓</span>}</span>
              <span className="f-body doc-desc">{sec.d}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="doc-code" data-on={written > docSections.length}>
        <div><span style={{ color: "#8A857C" }}>$</span> git push origin main</div>
        <div style={{ color: "#3f8a4f" }}>✓ CI passed, deployed to production</div>
        <div><span style={{ color: "#8A857C" }}>$</span> npm run rollback <span style={{ color: "#8A857C" }}># one command, if you ever need it</span></div>
      </div>
      <div className="doc-foot" data-on={written > docSections.length}>
        <span className="doc-play" aria-hidden>▶</span>
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span className="f-body" style={{ fontSize: 14, fontWeight: 600 }}>Recorded walkthrough</span>
          <span style={{ ...mono10, color: "#5F6168" }}>Loom | 12 min</span>
        </span>
        <span className="f-hand" style={{ marginLeft: "auto", fontSize: 17, color: "#C2412B" }}>yours to keep ✓</span>
      </div>
    </div>
  );
}

/** The six-week milestone plan with weekly demos and a signed-off price. */
function PlanView() {
  const vline = "1px dashed rgba(43,45,51,.18)", hline = "1px solid rgba(43,45,51,.14)";
  const weeks = [2, 3, 4, 5, 6, 7];
  const guides = (row: number) => weeks.map(c => <span key={`g${row}-${c}`} style={{ gridRow: row, gridColumn: c, borderLeft: vline }} />);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="plan-grid">
        {guides(1)}
        {weeks.map((c, i) => <span key={`w${c}`} style={{ gridRow: 1, gridColumn: c, padding: "0 0 8px 6px", ...mono10, color: "#5F6168" }}>W{i + 1}</span>)}
        {milestones.map((ms, i) => {
          const row = i + 2, ink = ms.hot ? "#C2412B" : "#2B2D33";
          return [
            ...guides(row),
            <div key={`l${ms.id}`} style={{ gridRow: row, gridColumn: 1, padding: "12px 14px 12px 0", display: "flex", flexDirection: "column", gap: 3, borderTop: hline }}>
              <span style={{ ...mono10, color: ink }}>{ms.id}</span>
              <span className="f-body" style={{ fontSize: 14, lineHeight: 1.3 }}>{ms.text}</span>
            </div>,
            <div key={`r${ms.id}`} style={{ gridRow: row, gridColumn: "2 / 8", borderTop: hline }} />,
            <span key={`b${ms.id}`} data-bar2="" style={{ gridRow: row, gridColumn: `${ms.from} / ${ms.to}`, alignSelf: "center", margin: "0 4px", height: 16, background: `repeating-linear-gradient(-45deg, ${ink} 0 2px, transparent 2px 6px)`, border: `1.5px solid ${ink}`, boxSizing: "border-box", borderRadius: 2, transformOrigin: "left center", position: "relative" }}>
              <span style={{ position: "absolute", right: -6, top: "50%", width: 9, height: 9, background: ink, transform: "translateY(-50%) rotate(45deg)" }} />
            </span>,
          ];
        })}
        {guides(5)}
        <div style={{ gridRow: 5, gridColumn: "1 / 8", borderTop: hline }} />
        <div style={{ gridRow: 5, gridColumn: 1, padding: "10px 14px 10px 0", ...mono10, color: "#5F6168" }}>Fri demos</div>
        {weeks.map(c => <span key={`d${c}`} style={{ gridRow: 5, gridColumn: c, alignSelf: "center", justifySelf: "center", width: 8, height: 8, borderRadius: "50%", border: "1.5px solid #2B2D33", boxSizing: "border-box" }} />)}
      </div>
      {/* Price and sign-off: two quiet columns, one line each. */}
      <div className="plan-sign">
        <div>
          <span style={{ ...mono10, color: "#5F6168" }}>Price</span>
          <span className="f-body" style={{ fontSize: 16, fontWeight: 500 }}>Fixed, agreed before work starts</span>
        </div>
        <div className="plan-sign-ok">
          <span style={{ ...mono10, color: "#5F6168" }}>Client sign-off</span>
          <span data-line="" className="f-hand" style={{ fontSize: 20, lineHeight: 1.2, color: "#C2412B" }}>Approved ✓</span>
        </div>
      </div>
    </div>
  );
}
