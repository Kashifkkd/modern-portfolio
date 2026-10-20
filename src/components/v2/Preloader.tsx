"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getLenis } from "./SmoothScroll";

const words = ["Hello", "नमस्ते", "Bonjour", "Hola", "こんにちは", "Ciao", "Salaam", "Hello"];

/**
 * Short greeting sequence (~1.8s) with a curved curtain exit. Shown once per session,
 * skipped entirely for reduced-motion users. Signals `onDone` so the hero can start its reveal.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState<boolean | null>(null);
  const [index, setIndex] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("preloaded") === "1";
    if (reduce || seen) { setShow(false); onDone(); return; }
    setDims({ w: window.innerWidth, h: window.innerHeight });
    setShow(true);
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
  }, [onDone]);

  useEffect(() => {
    if (!show) return;
    if (index === words.length - 1) {
      const t = setTimeout(() => {
        sessionStorage.setItem("preloaded", "1");
        setShow(false);
      }, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 700 : 160);
    return () => clearTimeout(t);
  }, [index, show]);

  const finish = () => {
    document.documentElement.style.overflow = "";
    getLenis()?.start();
    window.scrollTo(0, 0);
    onDone();
  };

  const { w, h } = dims;
  const initialPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
  const targetPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

  return (
    <AnimatePresence mode="wait" onExitComplete={finish}>
      {show && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[90] flex items-center justify-center bg-fg text-bg"
          initial={{ top: 0 }}
          exit={{ top: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
        >
          <motion.p
            className="display text-5xl md:text-7xl flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.15 } }}
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-bg" />
            {words[index]}
          </motion.p>
          {w > 0 && (
            <svg className="absolute left-0 top-full h-[300px] w-full fill-fg" aria-hidden>
              <motion.path
                initial={{ d: initialPath }}
                exit={{ d: targetPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } }}
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
