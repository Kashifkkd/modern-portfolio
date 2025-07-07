"use client";
import React from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const projects = [
  {
    title: "Portfolio Website",
    description: "A modern, animated portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    tag: "Personal",
    link: "#",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "E-commerce Dashboard",
    description: "A client dashboard for managing products, orders, and analytics.",
    tech: ["React", "Node.js", "MongoDB"],
    tag: "Client",
    link: "#",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Mobile App",
    description: "A cross-platform mobile app for task management.",
    tech: ["React Native", "Expo"],
    tag: "Personal",
    link: "#",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
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

const TABS = ["Personal", "Client", "Open Source"];

export default function ProjectsSection() {
  return (
    <section id="projects" className="mt-20 md:mt-32 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white tracking-tight">Projects</h2>
      <p className="text-neutral-600 dark:text-neutral-300 text-center text-sm md:text-base mb-8 max-w-xl mx-auto">
        A selection of personal, client, and open source projects showcasing my work and expertise.
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
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover object-top w-full h-full transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={idx === 0}
                        />
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
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-auto text-primary font-semibold hover:underline"
                        >
                          View Project
                        </a>
                      )}
                      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide z-10 ${
                        project.tag === "Personal"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                          : project.tag === "Client"
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