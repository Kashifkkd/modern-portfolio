"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "UI Library",
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        description: "Full Stack Framework",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
        description: "Utility-first CSS",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        description: "Typed JavaScript",
      },
      {
        name: "ShadCN UI",
        logo: "/window.svg",
        description: "Beautiful UI Components",
      },
      {
        name: "MUI",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
        description: "Material UI",
      },
      {
        name: "Framer Motion",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg",
        description: "Animation Library",
      },
      {
        name: "React Native",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "Mobile Apps",
      },
      {
        name: "TanStack",
        logo: "https://tanstack.com/logo.svg",
        description: "React Query/Table/Router",
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        description: "Backend Runtime",
      },
      {
        name: "SQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        description: "Relational Database",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        description: "NoSQL Database",
      },
    ],
  },
  {
    category: "Engineering",
    skills: [
      {
        name: "System Design",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/architecture/architecture-original.svg",
        description: "Designing Scalable Systems",
      },
      {
        name: "Software Development",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        description: "Engineering Best Practices",
      },
    ],
  },
  {
    category: "Tools",
    skills: [
      {
        name: "Zod",
        logo: "https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg",
        description: "Schema Validation",
      },
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        description: "Version Control",
      },
      {
        name: "VS Code",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        description: "Code Editor",
      },
      {
        name: "Jira",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
        description: "Project Management",
      },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-[96px] relative mt-20 md:mt-32 max-w-6xl mx-auto px-4 md:px-8 lg:px-10 z-10">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <BackgroundBeams />
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-gray-900 dark:text-white tracking-tight text-center">Skills</h2>
      <div className="flex flex-col gap-12 w-full">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-12 w-full"
          >
            {/* Category name on the left (vertical for desktop) */}
            <div className="md:w-[18%] w-full flex items-center justify-center md:justify-center text-center md:text-center">
              <span className="block text-xl md:text-2xl font-extrabold text-blue-600 dark:text-blue-400 leading-tight md:rotate-[-90deg] md:origin-center md:whitespace-nowrap">
                {group.category}
              </span>
            </div>
            {/* Skills as bubbles on the right (increased size) */}
            <div className="md:w-[82%] w-full flex flex-wrap gap-8 md:gap-12 justify-center md:justify-start">
              {group.skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.7, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className="flex flex-col items-center justify-center z-10"
                  style={{ minWidth: 100, minHeight: 100 }}
                >
                  <span className="flex items-center justify-center rounded-full border-4 border-gradient-to-br from-blue-400 via-purple-400 to-pink-400 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 bg-white/60 dark:bg-zinc-900/60 shadow-xl backdrop-blur-lg transition-all duration-300 w-20 h-20 md:w-24 md:h-24">
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </span>
                  <span className="mt-2 text-center font-medium text-xs md:text-sm text-gray-900 dark:text-white">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 