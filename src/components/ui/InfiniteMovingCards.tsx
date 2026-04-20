"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-5 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[340px] md:w-[420px] shrink-0 flex flex-col"
            style={{ minHeight: 220 }}
          >
            {/* Card */}
            <div className="relative flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 dark:border-white/5 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl group transition-transform duration-300 hover:-translate-y-1">
              {/* Top accent gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#00C6FB] via-[#8F00FF] to-[#FF61A6]" />

              {/* Quote body */}
              <div className="flex-1 px-6 pt-5 pb-4">
                {/* Large decorative quote mark */}
                <span className="block text-5xl font-serif leading-none text-[#00C6FB]/20 dark:text-[#00C6FB]/20 select-none mb-1">
                  "
                </span>
                <p className="text-sm md:text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-200 font-normal">
                  {item.quote}
                </p>
              </div>

              {/* Footer — always at bottom */}
              <div className="px-6 py-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-3 bg-black/[0.02] dark:bg-white/[0.02]">
                {/* Avatar initial + info */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00C6FB] to-[#8F00FF] flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-md">
                    {item.name.charAt(0)}
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {item.title}
                    </span>
                  </div>
                </div>


              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};