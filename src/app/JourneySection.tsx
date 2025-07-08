"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { motion } from "motion/react";

export default function JourneySection() {
  return (
    <section id="journey" className="scroll-mt-[96px] mt-20 md:mt-32 max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        My Journey
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }}
        className="text-neutral-400 dark:text-neutral-300 text-center text-base md:text-lg mb-3 max-w-xl mx-auto"
      >
        A timeline of my education and experience as a developer.
      </motion.p>
      <div className="-mt-6 w-full">
        <Timeline
          data={[
            {
              title: "B.E. in Computer Engineering",
              content: (
                <div>
                  <div className="font-semibold text-base md:text-lg text-neutral-800 dark:text-neutral-200">
                    Gharda Institute of Technology <span className="text-xs text-neutral-500 ml-2">2018 - 2022</span>
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Graduated with a CGPA of 9.3, building a strong foundation in software engineering and problem-solving.
                  </div>
                </div>
              ),
            },
            {
              title: "Internship - Web Developer",
              content: (
                <div>
                  <div className="font-semibold text-base md:text-lg text-neutral-800 dark:text-neutral-200">
                    Tanika Tech <span className="text-xs text-neutral-500 ml-2">2021</span>
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Worked on real-world web projects, learning modern frontend and backend technologies, collaborating with teams, and delivering client solutions.
                  </div>
                </div>
              ),
            },
            {
              title: "Full Stack Developer",
              content: (
                <div>
                  <div className="font-semibold text-base md:text-lg text-neutral-800 dark:text-neutral-200">
                    Tanika Tech <span className="text-xs text-neutral-500 ml-2">2022 - Present</span>
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Developed and maintained scalable web and mobile applications using React, Next.js, Node.js, and more. Led feature development, mentored juniors, and contributed to successful client deliveries.
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
} 