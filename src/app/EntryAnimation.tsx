"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EntryAnimation({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#00C6FB] via-[#8F00FF] to-[#FF61A6] dark:from-[#14131a] dark:via-[#1a1830] dark:to-[#2a2250]"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1, rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: 1, repeatType: "mirror" }}
            className="absolute w-[420px] h-[420px] bg-gradient-to-tr from-[#00C6FB]/80 via-[#8F00FF]/80 to-[#FF61A6]/80 blur-2xl rounded-full mix-blend-lighten opacity-80"
          />
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "0.25em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg tracking-widest text-center select-none"
          >
            Kashif Deshmukh
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            className="relative z-10 mt-6"
          >
            <span
              className="block text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD600] via-[#00C6FB] to-[#8F00FF] bg-clip-text text-transparent animate-pulse drop-shadow-[0_2px_16px_rgba(0,198,251,0.25)]"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}
            >
              Portfolio Loading...
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 