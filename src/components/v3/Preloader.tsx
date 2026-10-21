"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { greetings } from "./data";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Greets in a few languages, then lifts away with a curved bottom edge that flattens as it leaves.
 * Mounted inside <AnimatePresence> by the page, which removes it after ~2s.
 */
export default function Preloader() {
  const [i, setI] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => setSize({ w: window.innerWidth, h: window.innerHeight }), []);
  useEffect(() => {
    if (i === greetings.length - 1) return;
    const t = setTimeout(() => setI(i + 1), i === 0 ? 900 : 140);
    return () => clearTimeout(t);
  }, [i]);

  const { w, h } = size;
  const curved = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
  const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

  return (
    <motion.div
      aria-hidden
      exit={{ top: "-100vh", transition: { duration: 0.8, ease, delay: 0.2 } }}
      className="fixed inset-x-0 top-0 z-[70] flex h-screen items-center justify-center bg-night"
    >
      {w > 0 && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85, transition: { duration: 1, delay: 0.2 } }}
            className="absolute z-10 flex items-center text-[42px] text-white md:text-[56px]"
          >
            <span className="mr-3 block h-2.5 w-2.5 rounded-full bg-white" />
            {greetings[i]}
          </motion.p>
          <svg className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full">
            <motion.path
              initial={{ d: curved }}
              exit={{ d: flat, transition: { duration: 0.7, ease, delay: 0.3 } }}
              className="fill-night"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
