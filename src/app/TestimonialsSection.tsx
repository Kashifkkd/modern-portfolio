"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

const testimonials = [
  {
    quote: "Wonderful service and even better customer service. This was a great experience!",
    name: "Lauren",
    title: "Fiverr Client",
  },
  {
    quote: "Great work, flexible on making changes, helped me understand choices made where there was ambiguity in the request. Will hire again!",
    name: "Christopher Peters",
    title: "Upwork Client",
  },
  {
    quote: "This developer is amazing, my current developer can't fix it, but he can.",
    name: "Tony Yim",
    title: "Fiverr Client",
  },
  {
    quote: "Amazing Service once again. Thank You! Outstanding Experience as always.",
    name: "Gerald Harris",
    title: "Fiverr Client",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full mt-20 md:mt-32 px-0">
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