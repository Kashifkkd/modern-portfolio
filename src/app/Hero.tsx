"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { GridBackground } from "@/components/ui/grid-background";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const typewriterWords = [
  { text: "Full Stack Developer", className: "text-[#00C6FB] dark:text-[#00C6FB]" },
  { text: "React & Next.js Expert", className: "text-[#8F00FF] dark:text-[#8F00FF]" },
  { text: "Mobile App Developer", className: "text-[#FF61A6] dark:text-[#FF61A6]" },
  { text: "UI/UX Enthusiast", className: "text-[#FFD600] dark:text-[#FFD600]" },
  { text: "Problem Solver", className: "text-[#00E396] dark:text-[#00E396]" },
  { text: "Code Craftsman", className: "text-[#FF8C00] dark:text-[#FF8C00]" },
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterWords[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentWord.text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.text.slice(0, displayedText.length + 1));
      }, 100);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.text.slice(0, displayedText.length - 1));
      }, 50);
    } else if (!isDeleting && displayedText.length === currentWord.text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  const currentWord = typewriterWords[currentWordIndex];

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BackgroundLines className="absolute inset-0 z-0" />
        <GridBackground className="absolute inset-0 z-0" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center w-full max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-[#00C6FB] via-[#005BEA] via-[#8F00FF] to-[#FF61A6] drop-shadow-[0_2px_16px_rgba(0,198,251,0.25)] tracking-tight leading-tight"
        >
          Kashif Deshmukh
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center px-2"
        >
          <span className={`text-lg xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold ${currentWord.className} leading-tight`}>
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Hero description with animated gradient text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-4xl mx-auto px-2 sm:px-4"
        >
          <div className="relative group">
            <p className="max-w-4xl text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-black/90 dark:text-white/90 leading-relaxed font-medium transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600">
              I build modern, scalable web and mobile applications that solve real-world problems.
              Specializing in React, Next.js, React Native, and Node.js, I create seamless user experiences
              with clean, maintainable code. Let&apos;s turn your ideas into reality.
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </div>
        </motion.div>

        {/* Call to action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6 w-full justify-center items-center px-2"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 w-full sm:w-auto min-w-[160px] sm:min-w-[180px] text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span>View Resume</span>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 w-full sm:w-auto min-w-[160px] sm:min-w-[180px] text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex gap-4 sm:gap-6 mt-6 sm:mt-8"
        >
          <AnimatedTooltip
            items={[
              {
                id: 1,
                name: "GitHub",
                designation: "@Kashifkkd",
                image: "/github-mark.png",
                icon: <Github className="w-5 h-5 sm:w-6 sm:h-6" />,
                onClick: () => window.open('https://github.com/Kashifkkd', '_blank'),
              },
              {
                id: 2,
                name: "LinkedIn",
                designation: "Kashif Deshmukh",
                image: "/linkedin-icon.png",
                icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
                onClick: () => window.open('https://www.linkedin.com/in/kashif-deshmukh-23797a173/', '_blank'),
              },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
} 