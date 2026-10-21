"use client";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLenis } from "@/components/v2/SmoothScroll";
import { links, railNav } from "./data";
import { ArrowUpRight } from "./icons";
import ThemeToggle from "./ThemeToggle";

const ease = [0.76, 0, 0.24, 1] as const;

const MenuCtx = createContext<{ open: boolean; setOpen: (o: boolean) => void }>({ open: false, setOpen: () => {} });

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <MenuCtx.Provider value={{ open, setOpen }}>{children}<Drawer /></MenuCtx.Provider>;
}

/** Two-line hamburger that crosses into an X while the drawer is open. */
export function Burger({ variant = "built", tabIndex }: { variant?: "built" | "sketch"; tabIndex?: number }) {
  const { open, setOpen } = useContext(MenuCtx);
  return (
    <button type="button" tabIndex={tabIndex} aria-expanded={open} aria-controls="v4-menu" aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => setOpen(!open)} className={`icon-btn icon-btn--${variant} burger`} data-open={open}>
      <span /><span />
    </button>
  );
}

function go(href: string) {
  const el = document.getElementById(href.slice(1));
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { duration: 1.4, offset: href === "#top" ? 0 : -64 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/**
 * Full-height sketch-paper drawer (the v3 menu): its left edge bows out as it slides in and
 * straightens as it settles, links glide in one after another. Full width on phones.
 */
function Drawer() {
  const { open, setOpen } = useContext(MenuCtx);
  const [h, setH] = useState(800);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setH(window.innerHeight);
    const onR = () => setH(window.innerHeight);
    addEventListener("resize", onR);
    return () => removeEventListener("resize", onR);
  }, []);

  useEffect(() => {
    if (open) { getLenis()?.stop(); document.documentElement.style.overflow = "hidden"; closeRef.current?.focus(); }
    else { getLenis()?.start(); document.documentElement.style.overflow = ""; }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open, setOpen]);

  const bowed = `M100 0 L100 ${h} Q-100 ${h / 2} 100 0`;
  const straight = `M100 0 L100 ${h} Q100 ${h / 2} 100 0`;
  const pick = (href: string) => { setOpen(false); setTimeout(() => go(href), 380); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 52, background: "rgba(0,0,0,.35)" }} />
          <motion.aside key="drawer" id="v4-menu" role="dialog" aria-modal aria-label="Menu" className="v4-drawer"
            initial={{ x: "calc(100% + 100px)" }} animate={{ x: 0 }} exit={{ x: "calc(100% + 100px)" }} transition={{ duration: 0.8, ease }}>
            <svg aria-hidden className="v4-drawer-edge"><motion.path initial={{ d: bowed }} animate={{ d: straight, transition: { duration: 1, ease } }} exit={{ d: bowed, transition: { duration: 0.8, ease } }} /></svg>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span className="f-sig" style={{ fontSize: 30, lineHeight: 1 }}>Kashif Deshmukh</span>
              <div style={{ display: "flex", gap: 8 }}>
                <ThemeToggle variant="sketch" />
                <button ref={closeRef} type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="icon-btn icon-btn--sketch burger" data-open="true"><span /><span /></button>
              </div>
            </div>

            <nav aria-label="Menu" style={{ marginTop: "clamp(28px,7svh,72px)" }}>
              <p className="f-mono" style={{ margin: "0 0 18px", paddingBottom: 14, borderBottom: "1px dashed var(--pencil-rule)", fontSize: 11, color: "var(--pencil-muted)" }}>Navigation</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {[{ href: "#top", label: "Home" }, ...railNav].map((l, i) => (
                  <motion.li key={l.href} initial={{ x: 80 }} animate={{ x: 0 }} exit={{ x: 80 }} transition={{ duration: 0.8, ease, delay: 0.05 * i }}>
                    <a href={l.href} onClick={e => { e.preventDefault(); pick(l.href); }} className="v4-drawer-link">
                      <span className="v4-drawer-dot" />
                      <span className="v4-drawer-label">{l.label}</span>
                      <span className="f-mono v4-drawer-n">{String(i).padStart(2, "0")}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 18 }}>
              <a href={links.cal} target="_blank" rel="noopener" className="btn-accent f-mono" style={{ alignSelf: "flex-start", padding: "14px 18px", fontSize: 12 }}>Book a 30-min call<ArrowUpRight /></a>
              <div>
                <p className="f-mono" style={{ margin: "0 0 10px", fontSize: 11, color: "var(--pencil-muted)" }}>Socials</p>
                <ul className="f-body" style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: "8px 22px", fontSize: 15 }}>
                  {[["GitHub", links.github], ["LinkedIn", links.linkedin], ["Resume", links.resume], ["Email", `mailto:${links.email}`]].map(([label, href]) => (
                    <li key={label}><a href={href} target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined} rel="noopener" className="link-plain">{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
