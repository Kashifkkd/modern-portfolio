"use client";
import { useEffect, useState } from "react";

const glyphs = "!<>-_\\/[]{}-=+*^?#01";

/** Decodes text left to right through random glyphs, like a terminal resolving output. */
export default function Scramble({ text, delay = 0, speed = 28, className = "" }: { text: string; delay?: number; speed?: number; className?: string }) {
  const [out, setOut] = useState(text.replace(/\S/g, " "));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOut(text); return; }
    let frame = 0;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        frame++;
        const resolved = Math.floor(frame / 2);
        setOut(
          text.split("").map((ch, i) => {
            if (ch === " " || i < resolved) return ch;
            return i < resolved + 6 ? glyphs[(Math.random() * glyphs.length) | 0] : " ";
          }).join(""),
        );
        if (resolved >= text.length) clearInterval(id);
      }, speed);
    }, delay);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [text, delay, speed]);

  return <span aria-label={text} className={className}><span aria-hidden className="whitespace-pre">{out}</span></span>;
}
