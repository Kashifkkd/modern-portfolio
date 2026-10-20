"use client";
import { useCallback, useState } from "react";
import Preloader from "@/components/v2/Preloader";
import Hero from "@/components/v2/Hero";
import Work from "@/components/v2/Work";
import Proof from "@/components/v2/Proof";
import Services from "@/components/v2/Services";
import Experience from "@/components/v2/Experience";
import About from "@/components/v2/About";
import Contact from "@/components/v2/Contact";

export default function Home() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onDone={onDone} />
      <main id="main" className="mx-auto max-w-[1600px]">
        <Hero ready={ready} />
        <Work />
        <Proof />
        <Services />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}
