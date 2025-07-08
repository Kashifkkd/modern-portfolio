"use client"

import Hero from "./Hero";
import JourneySection from "./JourneySection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import TestimonialsSection from "./TestimonialsSection";
import CertificationsSection from "./CertificationsSection";
import ContactSection from "./ContactSection";
import EntryAnimation from "./EntryAnimation";
import { useState, useEffect } from "react";

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (showAnimation) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showAnimation]);

  return (
    <main>
      {showAnimation && <EntryAnimation onFinish={() => setShowAnimation(false)} />}
      {!showAnimation && (
        <>
          <section><Hero /></section>
          <section><JourneySection /></section>
          <section><SkillsSection /></section>
          <section><ProjectsSection /></section>
          <section><TestimonialsSection /></section>
          <section><CertificationsSection /></section>
          <section><ContactSection /></section>
        </>
      )}
    </main>
  );
}
