"use client";
import { GridBackground } from "@/components/ui/grid-background";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const typewriterWords = [
  { text: "Full Stack Developer", className: "text-blue-600 dark:text-blue-400" },
  { text: "React & Next.js Expert", className: "text-purple-600 dark:text-purple-400" },
  { text: "Mobile App Developer", className: "text-pink-600 dark:text-pink-400" },
  { text: "UI/UX Enthusiast", className: "text-indigo-600 dark:text-indigo-400" },
  { text: "Problem Solver", className: "text-green-600 dark:text-green-400" },
  { text: "Code Craftsman", className: "text-orange-600 dark:text-orange-400" },
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterWords[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentWord.text.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.text.slice(0, displayedText.length + 1));
      }, 100);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.text.slice(0, displayedText.length - 1));
      }, 50);
    } else if (!isDeleting && displayedText.length === currentWord.text.length) {
      // Pause before deleting
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  const currentWord = typewriterWords[currentWordIndex];

  return (
    <BackgroundLines className="absolute inset-0 z-0">
      <GridBackground className="min-h-screen w-full">
        <section className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 pt-16 pb-12 md:pt-20 md:pb-16 overflow-hidden">
          {/* Centered hero content */}
          <div className="relative z-10 flex flex-col items-center gap-6 text-center w-full max-w-5xl mx-auto">
            {/* Main heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 drop-shadow-2xl tracking-tight"
            >
              Kashif Deshmukh
            </motion.h1>

            {/* Typewriter subtitle */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="min-h-[2.5rem] flex items-center justify-center"
            >
              <span className={`text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold ${currentWord.className}`}>
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            {/* Hero description with animated gradient text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl mx-auto"
            >
              <div className="relative group">
                <p className="max-w-4xl text-base xs:text-lg md:text-xl lg:text-2xl text-black/90 dark:text-white/90 leading-relaxed font-medium transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600">
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
              className="flex flex-row gap-6 mt-6 w-full justify-center items-center"
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
                  className="inline-flex items-center gap-3 px-10 py-4 min-w-[180px] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-6 h-6 flex-shrink-0" />
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
                  className="inline-flex items-center gap-3 px-10 py-4 min-w-[180px] text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-6 h-6 flex-shrink-0" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Social links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex gap-6 mt-8"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open('https://github.com/Kashifkkd', '_blank')}
                  className="w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open('https://www.linkedin.com/in/kashif-deshmukh-23797a173/', '_blank')}
                  className="w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </GridBackground>
    </BackgroundLines>
  );
} 