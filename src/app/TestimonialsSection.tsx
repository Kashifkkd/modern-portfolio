"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const testimonials = [
  {
    quote:
      "Kashif took over our frontend mid-sprint and didn't miss a beat. He picked up the codebase fast, flagged a few things we'd been ignoring, and shipped on time. Would work with him again.",
    name: "Arjun Nair",
    title: "Tech Lead · Buildspace",
  },
  {
    quote:
      "Honestly wasn't sure what to expect hiring remotely, but Kashif was solid throughout. Good communicator, clean code, and he actually pushed back when our requirements didn't make sense — which I appreciated.",
    name: "Rohan Mehta",
    title: "Founder · StackSprint",
  },
  {
    quote:
      "We needed someone to build a dashboard fast and not make a mess of it. Kashif did exactly that. The code was readable, the UI looked great, and he kept us in the loop the whole time.",
    name: "Sneha Kulkarni",
    title: "Product Designer · Nuvio",
  },
  {
    quote:
      "Kashif joined to help with a React Native project that was already behind schedule. He got up to speed quickly and helped us get back on track. No drama, just results.",
    name: "Farhan Shaikh",
    title: "CTO · AppCraft Studios",
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