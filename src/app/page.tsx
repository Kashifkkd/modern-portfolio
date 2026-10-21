"use client";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import "@/components/v4/v4.css";
import Preloader, { PRELOADER_MS } from "@/components/v4/Preloader";
import Hero from "@/components/v4/Hero";
import { Build, Call, Plan, Ship } from "@/components/v4/Process";
import { Career, Contact, Work } from "@/components/v4/Story";
import Rail from "@/components/v4/Rail";
import Agent from "@/components/v4/Agent";
import { MenuProvider } from "@/components/v4/Menu";
import useReveals from "@/components/v4/useReveals";
import Cursor from "@/components/v4/Cursor";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useReveals();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLoading(false); return; }
    window.scrollTo(0, 0);
    const t = setTimeout(() => setLoading(false), PRELOADER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="v4" style={{ overflowX: "clip" }}>
      <MenuProvider>
        <AnimatePresence mode="wait">{loading && <Preloader key="pre" />}</AnimatePresence>
        <main id="main">
          <Hero ready={!loading} />
          <Call />
          <Plan />
          <Build />
          <Ship />
          <Career />
          <Work />
          <Contact />
        </main>
        <Rail />
        <Agent />
        <Cursor />
      </MenuProvider>
    </div>
  );
}
