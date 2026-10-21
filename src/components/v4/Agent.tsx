"use client";
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { getLenis } from "@/components/v2/SmoothScroll";
import { agentChips, links } from "./data";
import { ArrowUp, Chat, Close, Spinner } from "./icons";

type Msg = { role: "user" | "assistant"; text: string; meta?: string };


/** Phones get a full-width sheet with a backdrop; wider screens dock it to the bottom-right edge. */
function usePhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(max-width: 640px)");
    const on = () => setPhone(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return phone;
}

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * "Jarvis", Kashif's site assistant: launcher, teaser bubble and a chat sheet backed by /api/agent. The sheet rises from
 * the bottom edge with its top bowed up, flattening as it settles: the same motion as the menu drawer.
 */
export default function Agent() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const msgsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const phone = usePhone();
  const dragControls = useDragControls();

  // Launcher bounces in after 6s, then a note asks if they want the short version.
  useEffect(() => {
    const rm = reduced();
    const t: number[] = [];
    t.push(window.setTimeout(() => {
      launcherRef.current?.animate(rm ? [{ opacity: 0 }, { opacity: 1 }] : [
        { offset: 0, opacity: 0, transform: "translateY(140%) rotate(-25deg) scale(.4)" },
        { offset: 0.5, opacity: 1, transform: "translateY(-18px) rotate(10deg) scale(1.1)" },
        { offset: 0.68, transform: "translateY(0) rotate(-6deg) scale(.96)" },
        { offset: 0.82, transform: "translateY(-5px) rotate(3deg) scale(1.02)" },
        { offset: 1, opacity: 1, transform: "translateY(0) rotate(0) scale(1)" },
      ], { duration: rm ? 300 : 1100, easing: "cubic-bezier(.3,.7,.3,1)", fill: "forwards" });
      t.push(window.setTimeout(() => setBubble(true), rm ? 300 : 1000));
      t.push(window.setTimeout(() => setBubble(false), 11000));
    }, 6000));
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (bubble && !reduced()) bubbleRef.current?.animate([{ clipPath: "inset(-20% 100% -20% 0)" }, { clipPath: "inset(-20% 0% -20% 0)" }], { duration: 700, easing: "cubic-bezier(.5,0,.3,1)" });
  }, [bubble]);

  // On phones the sheet covers the page, so freeze scrolling underneath it.
  useEffect(() => {
    if (!(open && phone)) return;
    getLenis()?.stop(); document.documentElement.style.overflow = "hidden";
    return () => { getLenis()?.start(); document.documentElement.style.overflow = ""; };
  }, [open, phone]);

  useLayoutEffect(() => {
    if (!open) return;
    if (!phone) inputRef.current?.focus(); // on phones, don't throw the keyboard up until they tap
  }, [open, phone]);

  // New answer: scroll so the question that prompted it sits at the top.
  useEffect(() => {
    const el = msgsRef.current; if (!el) return;
    const last = msgs[msgs.length - 1];
    if (last && last.role !== "user" && !busy) {
      const qs = el.querySelectorAll<HTMLElement>("[data-umsg]"), q = qs[qs.length - 1];
      el.scrollTo({ top: q ? q.offsetTop - 14 : el.scrollHeight, behavior: reduced() ? "auto" : "smooth" });
    } else el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const ask = async (text: string) => {
    const q = text.trim(); if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: "user", text: q }];
    setMsgs(next); setDraft(""); setBusy(true); setOpen(true); setBubble(false);

    // Suggested questions have written answers: no model call, just a short beat so it reads naturally.
    const canned = agentChips.find(c => c.q === q);
    if (canned) {
      await new Promise(r => setTimeout(r, 700));
      setMsgs(s => [...s, { role: "assistant", text: canned.a }]);
      setBusy(false);
      return;
    }

    const t0 = performance.now();
    let reply: string, meta: string;
    try {
      const res = await fetch("/api/agent", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(m => ({ role: m.role, content: m.text })) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      reply = ((await res.json()) as { text: string }).text;
      meta = "Answered in " + ((performance.now() - t0) / 1000).toFixed(1) + "s";
    } catch {
      reply = `I couldn't reach the model just now. You can still book a 30-minute call with Kashif at ${links.cal.replace("https://", "")}.`;
      meta = "Offline";
    }
    setMsgs(s => [...s, { role: "assistant", text: reply.trim(), meta }]);
    setBusy(false);
  };

  // The panel's bottom-right corner sits on the chat button; these insets cut it down to that 60px circle.
  const [bubble0, bubble1] = (() => {
    if (typeof window === "undefined") return ["inset(0px 0px 0px 0px round 6px 6px 6px 6px)", "inset(0px 0px 0px 0px round 6px 6px 6px 6px)"];
    const vw = innerWidth, vh = innerHeight;
    if (phone) {
      const w = vw, h = Math.round(vh * 0.86); // sheet: full width, 86svh, bottom 0; button: right 12, bottom 20
      return [`inset(${h - 80}px 12px 20px ${w - 72}px round 30px 30px 30px 30px)`, "inset(0px 0px 0px 0px round 12px 12px 0px 0px)"];
    }
    const w = Math.min(420, vw - 24), h = Math.min(640, vh - 48); // panel shares the button's corner
    return [`inset(${h - 60}px 0px 0px ${w - 60}px round 30px 30px 30px 30px)`, "inset(0px 0px 0px 0px round 6px 6px 6px 6px)"];
  })();

  const close = () => { setOpen(false); launcherRef.current?.focus(); };
  const onSubmit = (e: FormEvent) => { e.preventDefault(); ask(draft); };
  const onInputKey = (e: KeyboardEvent<HTMLTextAreaElement>) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(draft); } };
  const mono10 = { fontFamily: "var(--font-martian), monospace", letterSpacing: ".06em", textTransform: "uppercase" as const, fontSize: 10 };

  const body = (
    <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "14px 14px 14px 18px", borderBottom: "1px solid var(--line-3)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span aria-hidden className="jarvis-avatar">J<span /></span>
              <span className="f-display" style={{ fontSize: 22, lineHeight: 1 }}>Jarvis</span>
            </div>
            <button type="button" aria-label="Close agent" onClick={close} className="agent-close"><Close style={{ fontSize: 18 }} /></button>
          </div>
          <div ref={msgsRef} aria-live="polite" className="agent-msgs">
            <div className="f-body" style={{ fontSize: 15, lineHeight: 1.55, color: "var(--fg-2)" }}>Hi, I&apos;m Jarvis. Kashif built me into this site to answer questions about his work, his process and whether he&apos;s a fit for your project. Ask anything, or start here:</div>
            {msgs.length === 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {agentChips.map(c => <button key={c.q} type="button" className="chip" onClick={() => ask(c.q)}>{c.q}</button>)}
              </div>
            )}
            {msgs.map((m, i) => m.role === "user"
              ? <div key={i} data-umsg="" className="f-body" style={{ alignSelf: "flex-end", maxWidth: "85%", background: "var(--invert-bg)", color: "var(--invert-fg)", padding: "10px 14px", borderRadius: "14px 14px 4px 14px", fontSize: 15, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>{m.text}</div>
              : (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: "94%" }}>
                  <div className="f-body" style={{ fontSize: 15, lineHeight: 1.55, color: "var(--fg-2)", whiteSpace: "pre-wrap" }}>{m.text}</div>
                  <span style={{ ...mono10, color: "var(--faint)" }}>{m.meta}</span>
                </div>
              ))}
            {busy && <div style={{ ...mono10, fontSize: 11, display: "flex", alignItems: "center", gap: 8, color: "var(--dim)" }}><Spinner className="spin" style={{ fontSize: 14 }} />Jarvis is thinking…</div>}
          </div>
          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10, padding: "12px 14px 14px", borderTop: "1px solid var(--line-3)" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 12, padding: "6px 6px 6px 14px" }}>
              <textarea ref={inputRef} rows={1} aria-label="Ask the agent" placeholder="Ask about Kashif or your project…" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={onInputKey}
                className="f-body" style={{ flex: 1, resize: "none", border: 0, outline: "none", background: "transparent", color: "var(--fg)", fontSize: 15, lineHeight: 1.4, padding: "8px 0", maxHeight: 96 }} />
              <button type="submit" aria-label="Send" className="agent-send"><ArrowUp style={{ fontSize: 18 }} /></button>
            </div>
          </form>
    </>
  );

  return (
    <>
    <AnimatePresence>
      {open && (
        <>
          {phone && <motion.div key="agent-scrim" className="agent-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />}
          {/* Morphs out of the round chat button: the panel sits over the button and a rounded mask
              opens from the button's exact circle to the full panel (and closes back into it). */}
          <motion.div key="agent-sheet" role="dialog" aria-modal={phone} aria-label="Jarvis, Kashif's AI assistant" className="agent-panel agent-sheet"
            initial={{ clipPath: bubble0 }} animate={{ clipPath: bubble1 }} exit={{ clipPath: bubble0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
            drag={phone ? "y" : false} dragListener={false} dragControls={dragControls} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, i) => { if (i.offset.y > 110 || i.velocity.y > 600) close(); }}
            onKeyDown={e => { if (e.key === "Escape") close(); }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.12, duration: 0.25 } }} exit={{ opacity: 0, transition: { duration: 0.1 } }} style={{ display: "contents" }}>
              {phone && <div className="agent-grab" onPointerDown={e => dragControls.start(e)}><span /></div>}
              {body}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    <div className="agent-dock">
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {bubble && !open && (
          <button ref={bubbleRef} type="button" onClick={() => { setOpen(true); ask(agentChips[0].q); }} className="f-hand"
            style={{ pointerEvents: "auto", cursor: "pointer", border: 0, background: "var(--sketch-bg)", color: "var(--pencil)", fontSize: 17, lineHeight: 1.25, padding: "10px 14px", maxWidth: 210, boxShadow: "0 14px 30px var(--shadow)", transform: "rotate(-2.5deg)", textAlign: "left" }}>
            psst. want the 30-second version of Kashif?
          </button>
        )}
        <button ref={launcherRef} type="button" className="launcher" aria-label={open ? "Close Jarvis, Kashif's AI assistant" : "Open Jarvis, Kashif's AI assistant"} aria-expanded={open} onClick={() => (open ? setOpen(false) : setOpen(true))}>
          {open ? <Close style={{ fontSize: 27 }} /> : <Chat style={{ fontSize: 27 }} />}
          <span aria-hidden style={{ position: "absolute", top: 3, right: 3, width: 12, height: 12, borderRadius: "50%", background: "var(--ok)", border: "2px solid var(--bg)" }} />
        </button>
      </div>
    </div>
    </>
  );
}
