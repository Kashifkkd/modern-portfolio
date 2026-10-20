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
                    Gharda Institute of Technology, Mumbai University <span className="text-xs text-neutral-500 ml-2">Aug 2019 - Jul 2023</span>
                  </div>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Graduated with a CGPA of 8.57, building a strong foundation in data structures, algorithms, DBMS, operating systems and networking.
                  </div>
                </div>
              ),
            },
            {
              title: "Software Engineer, Full-Stack",
              content: (
                <div>
                  <div className="font-semibold text-base md:text-lg text-neutral-800 dark:text-neutral-200">
                    Tanika Tech Jewels (Jwero.ai) <span className="text-xs text-neutral-500 ml-2">Sep 2023 - Aug 2026</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">Mumbai, India</div>
                  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>Built and maintained full-stack apps with React, TypeScript, Node.js and MongoDB, powering real-time chat, CRM and automation platforms for 5+ enterprise clients.</li>
                    <li>Optimised responsive Material UI interfaces, cutting front-end load time by 35% and increasing user engagement by 25%.</li>
                    <li>Developed scalable REST APIs and background jobs, improving data-processing speed by 30% and reducing server costs by 20%.</li>
                    <li>Built a low-code chatbot builder with React Flow, Shadcn UI and Tailwind, reducing manual setup by 40%; shipped AI-powered chatbots that cut support response time by 20%.</li>
                  </ul>
                </div>
              ),
            },
            {
              title: "Senior Software Engineer",
              content: (
                <div>
                  <div className="font-semibold text-base md:text-lg text-neutral-800 dark:text-neutral-200">
                    D&apos;Vinci Group <span className="text-xs text-neutral-500 ml-2">Sep 2026 - Present</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">United Kingdom (Remote)</div>
                  <div className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Firesight / Meridian House: real-time event-intelligence platform
                  </div>
                  <ul className="mt-1 list-disc pl-5 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>Built the core event-formation service processing ~150k news signals/day in near real time, identifying and clustering real-world events as they unfold (Supabase/PostgreSQL, RabbitMQ, Python).</li>
                    <li>Built the IMS (Intelligence Management System), the operator web app for managing analyst inputs and review workflows (Next.js, Supabase).</li>
                  </ul>
                  <div className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    StoryCloud: image, video and audio stories mobile app (iOS, Android)
                  </div>
                  <ul className="mt-1 list-disc pl-5 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                    <li>Took over and enhanced the existing app: Supabase Auth with row-level security, Edge Functions, a paginated story feed and in-app subscriptions.</li>
                    <li>Made high-quality media stories play smoothly with caching, prefetching and lazy loading, cutting load stalls across devices; supported App Store and Play releases.</li>
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
} 