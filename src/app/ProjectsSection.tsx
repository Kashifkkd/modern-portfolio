"use client";
import React from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const projects = [
  {
    title: "Portfolio Website",
    description: "A modern, animated portfolio website showcasing my work with interactive hero section, live project previews, and smooth animations. Features dark/light mode support and responsive design.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    tag: "Personal",
    link: "https://kashif-portfolio.vercel.app/",
    source: "https://github.com/Kashifkkd/my-mentor-gpt",
    iframeUrl: "https://kashif-portfolio.vercel.app/",
  },
  {
    title: "My Mentor GPT",
    description:
      "An AI mentor platform where users chat with tailored assistants (teacher, therapist, career coach) backed by MongoDB session storage and streaming responses.",
    tech: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
    tag: "Personal",
    link: "https://my-mentor-gpt.vercel.app/",
    source: "https://github.com/Kashifkkd/my-mentor-gpt",
    iframeUrl: "https://my-mentor-gpt.vercel.app/",
  },
  {
    title: "TeamSync",
    description:
      "A modern project management application designed for multi-company environments with workspace isolation, Gantt charts, time tracking, real-time updates, and comprehensive analytics.",
    tech: ["Next.js", "Express.js", "PostgreSQL", "Firebase"],
    tag: "Personal",
    link: "https://team-sync-lemon.vercel.app/",
    source: "https://github.com/Kashifkkd/TeamSync",
    iframeUrl: "https://team-sync-lemon.vercel.app/",
  },
  {
    title: "Global Tours & Travels",
    description:
      "Responsive travel services platform with live destination previews, booking workflows, and service catalog built on Next.js and Tailwind CSS.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    tag: "Freelance",
    link: "https://globaltoursandtravels.vercel.app/",
    source: "https://github.com/Kashifkkd/tours-and-travels",
    iframeUrl: "https://globaltoursandtravels.vercel.app/",
  },
  {
    title: "The Celiac Store",
    description:
      "Rebuilt the gluten-free marketplace on Next.js with a Node.js API layer, MongoDB product catalog, and polished shopping flows tuned for accessibility.",
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    tag: "Freelance",
    link: "https://theceliacstore-fe.vercel.app/",
    source: "https://github.com/farish-jamal/theceliacstore-FE",
    iframeUrl: "https://theceliacstore-fe.vercel.app/",
  },
  {
    title: "AKG Construction Website",
    description:
      "A modern, high-performance website for AKG Sons Infra, a leading civil construction and infrastructure company. Features beautiful responsive UI with premium typography, high-resolution visuals, and smooth animations powered by Framer Motion.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "Framer Motion"],
    tag: "Freelance",
    link: "https://akg-construction-website.vercel.app/",
    source: "https://github.com/Kashifkkd/akg-construction-website",
    iframeUrl: "https://akg-construction-website.vercel.app/",
  },
  {
    title: "Cove Social App",
    description: "A modern chat application built with React Native, featuring real-time messaging, media sharing, friend requests, and WhatsApp-like experience.",
    tech: ["React Native", "React Paper", "JavaScript"],
    tag: "Freelance",
    source: "https://github.com/ragOP/Cove",
    image: "/cove-app.png",
  },
  {
    title: "Open Source UI Kit",
    description: "A beautiful, accessible UI kit for React, published on GitHub.",
    tech: ["React", "TypeScript", "Storybook"],
    tag: "Open Source",
    link: "#",
    image: "https://raw.githubusercontent.com/github/explore/main/topics/open-source/open-source.png",
  },
];

const TABS = ["Personal", "Freelance"];

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-[96px] mt-20 md:mt-32 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white tracking-tight">Projects</h2>
      <p className="text-neutral-600 dark:text-neutral-300 text-center text-sm md:text-base mb-8 max-w-xl mx-auto">
        A selection of personal, freelance, and open source projects showcasing my work and expertise.
      </p>
      <Tabs defaultValue="Personal" className="w-full">
        <TabsList className="flex justify-center mb-8 gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700 rounded-lg mx-auto max-w-md w-full">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="flex-1 px-5 py-2 rounded-md font-semibold text-sm md:text-base transition-all duration-200 focus:outline-none"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((tab) => {
          const filteredProjects = projects.filter((p) => p.tag === tab);
          return (
            <TabsContent key={tab} value={tab} className="w-full">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full text-center text-neutral-500 py-12">No projects in this category yet.</div>
              ) : (
                <BentoGrid className="max-w-5xl mx-auto">
                  {filteredProjects.map((project, idx) => (
                    <BentoGridItem
                      key={idx}
                      title={project.title}
                      description={project.description}
                      header={
                        project.iframeUrl ? (
                          <div className="relative w-full h-full overflow-hidden bg-white">
                            <iframe
                              src={project.iframeUrl}
                              className="absolute top-0 left-0 w-[200%] h-[200%] border-0 pointer-events-none"
                              title={project.title}
                              loading="lazy"
                              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                              style={{ 
                                transform: "scale(0.5)", 
                                transformOrigin: "top left"
                              }}
                            />
                          </div>
                        ) : (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover object-top w-full h-full transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={idx === 0}
                          />
                        )
                      }
                      className=""
                    >
                      <div className="flex flex-wrap gap-2 mb-2 mt-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {(project.link || project.source) && (
                        <div className="mt-auto flex flex-wrap gap-3">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-sm font-semibold underline underline-offset-4"
                            >
                              Live Preview
                            </a>
                          )}
                          {project.source && (
                            <a
                              href={project.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-sm font-semibold underline underline-offset-4"
                            >
                              View Source
                            </a>
                          )}
                        </div>
                      )}
                      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide z-10 ${
                        project.tag === "Personal"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                          : project.tag === "Freelance"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                      }`}>
                        {project.tag}
                      </span>
                    </BentoGridItem>
                  ))}
                </BentoGrid>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
} 