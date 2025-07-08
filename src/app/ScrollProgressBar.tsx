"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateScroll() {
      const main = document.querySelector("main");
      if (!main) return;
      const scrollTop = main.scrollTop;
      const scrollHeight = main.scrollHeight - main.clientHeight;
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    }
    const main = document.querySelector("main");
    if (main) {
      main.addEventListener("scroll", updateScroll);
      updateScroll();
    }
    return () => {
      if (main) main.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.round(progress * 100)}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 30 }}
        className="fixed top-0 left-0 h-1.5 z-[99999] bg-gradient-to-r from-[#00C6FB] via-[#8F00FF] to-[#FF61A6] shadow-lg rounded-b-xl"
        style={{ pointerEvents: "none" }}
      />
    </AnimatePresence>
  );
} 