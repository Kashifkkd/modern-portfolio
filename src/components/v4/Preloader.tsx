"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { greetings } from "./data";

const ease = [0.76, 0, 0.24, 1] as const;
// Timeline (seconds): push the crate in, turn and wave hello, turn back and push it off-screen.
const IN = 1.9, WAVE = 1.15, OUT = 0.95;
export const PRELOADER_MS = (IN + WAVE + OUT) * 1000;

type Phase = "in" | "wave" | "out";

/**
 * A sharply dressed figure pushes a crate in (it cycles through greetings), turns to face you and
 * waves hello, then turns back and pushes the crate off-screen before the sheet lifts away on a curved
 * edge. Turns are a quick flip (one pose squashes to nothing, the other opens up) so they never overlap.
 * Mounted inside <AnimatePresence> by the page.
 */
export default function Preloader() {
  const [i, setI] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [phase, setPhase] = useState<Phase>("in");

  useEffect(() => setSize({ w: window.innerWidth, h: window.innerHeight }), []);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("wave"), IN * 1000);
    const t2 = setTimeout(() => setPhase("out"), (IN + WAVE) * 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  useEffect(() => {
    if (i === greetings.length - 1) return;
    const t = setTimeout(() => setI(i + 1), i === 0 ? 560 : 165);
    return () => clearTimeout(t);
  }, [i]);

  const { w, h } = size;
  const curved = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
  const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;
  const waving = phase === "wave";
  const flip = { duration: 0.14, ease: "easeIn" as const };

  return (
    <motion.div
      aria-hidden
      exit={{ top: "-100vh", transition: { duration: 0.8, ease, delay: 0.1 } }}
      className="v4-pre"
      style={{ position: "fixed", left: 0, right: 0, top: 0, height: "100vh", zIndex: 70, display: "grid", placeItems: "center" }}
    >
      {w > 0 && (
        <>
          <div style={{ position: "relative", zIndex: 1, width: "min(560px, 88vw)" }}>
            <motion.div
              initial={{ x: "-70vw" }}
              animate={phase === "out"
                ? { x: "115vw", transition: { duration: OUT, ease: [0.55, 0, 0.85, 0.35] } }
                : { x: 0, transition: { duration: IN, ease: [0.25, 0.65, 0.35, 1] } }}
              data-walk={!waving}
              className="v4-pre-row"
              style={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}
            >
              <div style={{ position: "relative", flex: "none", width: 92, height: 130, marginRight: -11 }}>
                <motion.div
                  animate={{ scaleX: waving ? 0 : 1 }}
                  transition={{ ...flip, delay: waving ? 0 : 0.14 }}
                  style={{ position: "absolute", inset: 0, transformOrigin: "50% 100%" }}
                >
                  <Pusher />
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: waving ? 1 : 0 }}
                  transition={{ ...flip, delay: waving ? 0.14 : 0 }}
                  style={{ position: "absolute", inset: 0, transformOrigin: "50% 100%" }}
                >
                  <Waver waving={waving} />
                </motion.div>
                <motion.span
                  className="v4-pre-bubble f-hand"
                  initial={{ opacity: 0, scale: 0.6, y: 6 }}
                  animate={waving ? { opacity: 1, scale: 1, y: 0, transition: { delay: 0.3, type: "spring", stiffness: 420, damping: 20 } } : { opacity: 0, scale: 0.6, y: 6, transition: { duration: 0.12 } }}
                >
                  Hello!
                </motion.span>
              </div>
              <div className="v4-pre-crate">
                <motion.span key={i} initial={{ y: "60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.18 }} style={{ display: "block" }}>
                  {greetings[i]}
                </motion.span>
                <span className="v4-pre-tape" aria-hidden />
              </div>
            </motion.div>
            <div className="v4-pre-ground" />
          </div>
          <svg style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "calc(100% + 300px)" }}>
            <motion.path initial={{ d: curved }} exit={{ d: flat, transition: { duration: 0.7, ease, delay: 0.2 } }} style={{ fill: "var(--bg)" }} />
          </svg>
        </>
      )}
    </motion.div>
  );
}

// Wardrobe: navy blazer over a white tee, stone chinos, brown leather shoes, a styled quiff.
// Far-side limbs use deeper shades instead of fading out.
const C = {
  skin: "#d9a273", skinFar: "#b07a50", skinShade: "#c08a5c",
  hair: "#241710", hairHi: "#4a3122",
  blazer: "#23304f", blazerFar: "#161f36", lapel: "#2f3e63",
  tee: "#f4f1ea", square: "#e8743b",
  chino: "#c4ab7e", chinoFar: "#957f58",
  shoe: "#6b3f22", shoeFar: "#4a2b17", sole: "#efe6d8", belt: "#3a2a1e",
};

/**
 * Side view, leaning into the crate. Each leg is a thigh + shin pair rotating at the hip (40,80) and
 * knee (40,108) through a push-walk cycle; dust kicks off the back foot.
 */
function Pusher() {
  const leg = (far?: boolean) => {
    const chino = far ? C.chinoFar : C.chino;
    return (
      <g className={`pre-thigh${far ? " pre-far" : ""}`}>
        <path d="M34.6 80C35.2 89 36 99 36.4 108H43.8C44.8 99 45.6 89 45.6 80Z" fill={chino} />
        <g className="pre-shin">
          <circle cx="40" cy="108" r="3.9" fill={chino} />
          <path d="M36.2 108C36.6 116 37.2 124 37.8 131H42.4C42.8 124 43.4 116 43.8 108Z" fill={chino} />
          <path d="M36.2 131.4C36.4 129.6 42.2 129.2 43.4 131L50.4 133.4C53 134.4 52.6 137 50 137H37C35.4 137 35.4 133.4 36.2 131.4Z" fill={far ? C.shoeFar : C.shoe} />
          <path d="M36.4 137.8H50.6" stroke={C.sole} strokeWidth={1.8} />
        </g>
      </g>
    );
  };
  const arm = (far?: boolean) => {
    const [sh, el, wr] = far ? [[60, 39], [74, 49], [87, 48]] : [[57, 43], [70, 57], [87, 59]];
    return (
      <g className={`pre-arm${far ? " pre-far" : ""}`}>
        <path d={`M${sh[0]} ${sh[1]}Q${(sh[0] + el[0]) / 2 + 1} ${(sh[1] + el[1]) / 2 - 2} ${el[0]} ${el[1]}`} stroke={far ? C.blazerFar : C.blazer} strokeWidth={8} />
        <path d={`M${el[0]} ${el[1]}Q${(el[0] + wr[0]) / 2} ${(el[1] + wr[1]) / 2 + 1.5} ${wr[0]} ${wr[1]}`} stroke={far ? C.blazerFar : C.blazer} strokeWidth={6.6} />
        <path d={`M${wr[0] - 0.6} ${wr[1] - 3}L${wr[0] + 0.4} ${wr[1] + 3}`} stroke={C.tee} strokeWidth={2.2} />
        <ellipse cx={wr[0] + 4.6} cy={wr[1]} rx={4.2} ry={3.3} fill={far ? C.skinFar : C.skin} />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 100 142" width={92} height={130} aria-hidden style={{ overflow: "visible", display: "block" }}
      fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="44" cy="140" rx="30" ry="2.6" fill="currentColor" opacity={0.16} />
      {[0, 1, 2].map(i => <circle key={i} className="pre-dust" cx={14 - i * 5} cy={136 - i * 2} r={2.4 + i * 0.6} fill="currentColor" style={{ animationDelay: `${i * 0.08}s` }} />)}
      <g className="pre-body">
        {leg(true)}
        {arm(true)}
        {/* blazer with a curved back, white tee showing at the chest */}
        <path d="M51 35.5C57 32 65 34 66.5 40.5C64.5 52 55.5 66 50 79C47.5 84.5 35.5 84 33.4 78.6C36 64 42.5 46 51 35.5Z" fill={C.blazer} />
        <path d="M64.6 41.4C63.4 49.6 59.6 58.4 56 66.2L58.4 64.6C61.8 57.6 64.8 50 66.2 42.6Z" fill={C.tee} />
        <path d="M60.5 46.5L58.8 50.8" stroke={C.square} strokeWidth={2.4} />
        <path d="M34.2 77.2C37.4 79.8 45.2 81 49.8 79" stroke={C.belt} strokeWidth={2.6} />
        <path d="M60.6 29.5L62.4 36.5" stroke={C.skin} strokeWidth={5.5} />
        <ellipse cx="66" cy="21" rx="9.6" ry="10.6" transform="rotate(14 66 21)" fill={C.skin} />
        {/* stubble along the jaw, ear, eye, brow */}
        <path d="M74.4 24.6C73.4 28.8 70.2 31.6 66.2 31.4C63.8 31.3 62.6 30.2 62 28.8C64.6 29.6 68.6 29 71.4 27.2C72.8 26.2 73.8 25.4 74.4 24.6Z" fill={C.hair} opacity={0.32} />
        <ellipse cx="62" cy="21.8" rx="1.9" ry="2.6" fill={C.skinShade} />
        <circle cx="72.2" cy="20.4" r="1.05" fill={C.hair} />
        <path d="M70 17.3Q72 16.4 74.2 17.2" stroke={C.hair} strokeWidth={1.1} />
        {/* quiff: swept up and forward */}
        <path d="M56.2 20.6C55.2 11.6 60.6 6.4 67.8 6.8C73.6 7.2 77.8 10 77.6 14.6C75.4 12.8 71.6 12.6 68.4 13.6C64.6 14.8 62.4 17.4 61.4 19.8C59.8 19.6 57.8 19.9 56.2 20.6Z" fill={C.hair} />
        <path d="M61 9.2C64.6 5.6 71.6 5.2 75.6 8.6C71.6 7.8 66.6 8.2 63 10.6Z" fill={C.hairHi} />
        {leg()}
        {arm()}
      </g>
    </svg>
  );
}

/** Front view: facing you, smiling, right hand up and waving from the elbow. */
function Waver({ waving }: { waving: boolean }) {
  return (
    <svg viewBox="0 0 100 142" width={92} height={130} aria-hidden style={{ overflow: "visible", display: "block" }}
      fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="50" cy="140" rx="24" ry="2.6" fill="currentColor" opacity={0.16} />
      {/* chinos and shoes */}
      <path d="M41 82C41 98 41.5 114 42.5 131H48.5C49 114 49.5 98 50 84Z" fill={C.chino} />
      <path d="M50 84C50.5 98 51 114 51.5 131H57.5C58.5 114 59 98 59 82Z" fill={C.chino} />
      <path d="M45.5 90V128M54.5 90V128" stroke={C.chinoFar} strokeWidth={0.6} opacity={0.6} />
      <path d="M40 130.6C40.2 128.8 48.8 128.8 49.4 130.6L49.8 135.6C49.8 137.2 39.2 137.2 38.8 135.8C38.5 134 39.2 131.8 40 130.6Z" fill={C.shoe} />
      <path d="M51.2 130.6C51.8 128.8 60.2 128.8 60.4 130.6C61.2 131.8 61.9 134 61.6 135.8C61.2 137.2 50.6 137.2 50.6 135.6Z" fill={C.shoe} />
      <path d="M39 137.6H49.6M50.8 137.6H61.4" stroke={C.sole} strokeWidth={1.6} />
      {/* tee, belt, blazer panels and lapels */}
      <path d="M43 39.5H57L58.2 82H41.8Z" fill={C.tee} />
      <rect x="41.4" y="79.6" width="17.2" height="3.2" rx="0.8" fill={C.belt} />
      <rect x="48.6" y="79.9" width="2.8" height="2.6" rx="0.5" fill="#c9a24a" />
      <path d="M34 44C35 41 40 39 44 38.5L47 53L45 84H37C36 72 35 58 34 44Z" fill={C.blazer} />
      <path d="M66 44C65 41 60 39 56 38.5L53 53L55 84H63C64 72 65 58 66 44Z" fill={C.blazer} />
      <path d="M44 38.5L47 53L42.4 46.4Z" fill={C.lapel} />
      <path d="M56 38.5L53 53L57.6 46.4Z" fill={C.lapel} />
      <path d="M58.6 54.4L62.2 53.6L61.6 56.6Z" fill={C.square} />
      <circle cx="54.6" cy="70" r="0.9" fill={C.lapel} />
      {/* relaxed arm (his right, your left) */}
      <path d="M36.4 45C35 54 34.2 64 34.8 76" stroke={C.blazer} strokeWidth={7} />
      <path d="M33.4 77.6H36.6" stroke={C.tee} strokeWidth={1.8} />
      <ellipse cx="35.2" cy="81" rx="3.2" ry="3.9" fill={C.skin} />
      {/* raised arm: upper arm fixed, forearm + hand wave from the elbow */}
      <path d="M63.6 45.4C67 41 70.4 37 73 33" stroke={C.blazer} strokeWidth={7} />
      <g className={waving ? "pre-wave" : undefined} style={{ transformBox: "view-box", transformOrigin: "73px 33px" }}>
        <path d="M73 33L75.8 20" stroke={C.blazer} strokeWidth={6} />
        <path d="M74.2 20.4L77.6 21" stroke={C.tee} strokeWidth={1.8} />
        <ellipse cx="76.6" cy="14.4" rx="4" ry="4.8" fill={C.skin} />
        <path d="M74.2 11.4V8.4M76 10.6V7.2M77.8 10.8V7.6M79.4 11.8V9.4" stroke={C.skin} strokeWidth={1.7} />
        <path d="M72.8 15.6L70.6 13.4" stroke={C.skin} strokeWidth={1.8} />
      </g>
      {/* neck and head */}
      <path d="M46.5 31.5H53.5V39.6Q50 41.6 46.5 39.6Z" fill={C.skinShade} />
      <ellipse cx="40.7" cy="22" rx="1.8" ry="3" fill={C.skinShade} />
      <ellipse cx="59.3" cy="22" rx="1.8" ry="3" fill={C.skinShade} />
      <ellipse cx="50" cy="21" rx="9.5" ry="11" fill={C.skin} />
      <path d="M41.4 23C42 30.6 46 33.4 50 33.4C54 33.4 58 30.6 58.6 23C57 27.8 54 30.4 50 30.4C46 30.4 43 27.8 41.4 23Z" fill={C.hair} opacity={0.32} />
      <circle cx="46.2" cy="21" r="1.05" fill={C.hair} />
      <circle cx="53.8" cy="21" r="1.05" fill={C.hair} />
      <path d="M43.8 17.6Q46 16.6 48 17.4M52 17.4Q54 16.6 56.2 17.6" stroke={C.hair} strokeWidth={1.1} />
      <path d="M50 21.6L49.2 25L50.6 25.4" stroke={C.skinFar} strokeWidth={0.8} />
      <path d="M46.6 27.4Q50 30 53.4 27.4" stroke="#8a3b2a" strokeWidth={1.1} />
      {/* quiff: volume on top, short at the sides */}
      <path d="M40.4 20C39.6 11 44 5 51 4.6C57.5 4.2 61.6 8.2 60.2 13.6C59.8 16 59.4 18 59.6 20.4C58.4 16 56.6 13.4 53.6 12.8C49.8 12 45 13.4 42.4 15.6C41.4 16.6 40.8 18.2 40.4 20Z" fill={C.hair} />
      <path d="M44 9C47 3.6 56 2.6 60.6 7.2C57 5.6 51 6 47.4 9.6Z" fill={C.hairHi} />
    </svg>
  );
}
