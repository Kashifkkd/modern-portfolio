"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const testimonials = [
  {
    quote:
      "Kashif rebuilt our marketing site in two sprints, trimmed page weight by 40%, and patiently walked the team through every decision. We finally have a process we can maintain.",
    name: "Sarah Malik",
    title: "Product Manager · WeaveLabs",
  },
  {
    quote:
      "He joined mid-project, untangled a messy Next.js codebase, and delivered the features a week early. The release went live without a single regression.",
    name: "Miguel Santos",
    title: "Founder · LumenAI",
  },
  {
    quote:
      "Our internal dashboard looked dated and slow. Kashif shipped a fresh UI, automated the build, and stayed on call through launch weekend to make sure everything stuck.",
    name: "Priya Desai",
    title: "Operations Lead · Northwind Logistics",
  },
  {
    quote:
      "Kashif led the rebuild of our Next.js storefront at The Celiac Store, wiring the Node.js API into MongoDB and polishing the UX so customers can actually find what they need. He left us with docs and CI that make future drops painless.",
    name: "Madhav",
    title: "Co-founder · The Celiac Store",
  },
  {
    quote:
      "From kickoff to handover, communication was crisp and proactive. The design system he set up saved our studio hours on every new page.",
    name: "Jenna Clarke",
    title: "Senior Designer · Freelance Collective",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-[96px] w-full mt-20 md:mt-32 px-0">
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-blue-600 dark:text-blue-400">Testimonials</h2>
      </div>
      <div className="w-full overflow-x-clip">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="normal"
          pauseOnHover={true}
        />
      </div>
    </section>
  );
} 