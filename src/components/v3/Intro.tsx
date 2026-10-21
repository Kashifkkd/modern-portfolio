"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Magnetic from "@/components/v2/Magnetic";
import { scrollToId } from "./scroll";

const statement =
  "Helping startups and agencies ship real-time, AI-powered web and mobile products. Built properly, on time, and ready for production on day one.";

/** Word-by-word statement reveal, a supporting line, and the round "About me" button. */
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className="px-5 pt-[18svh] pb-[10svh] md:px-[12vw] md:pb-[24svh]">
      <div ref={ref} className="relative flex flex-col gap-10 md:flex-row md:gap-[6vw]">
        <h2 className="m-0 text-[clamp(26px,3.3vw,52px)] font-normal leading-[1.25] tracking-[-0.02em] md:w-[68%]">
          {statement.split(" ").map((w, i) => (
            <span key={i} className="relative mr-[0.26em] inline-flex overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={inView ? { y: 0 } : undefined}
                transition={{ duration: 0.5, delay: 0.012 * i, ease: [0.33, 1, 0.68, 1] }}
                className="inline-block"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="m-0 max-w-[34ch] text-[17px] leading-[1.5] text-ink-muted md:w-[28%]"
        >
          Product thinking and full-stack engineering in one person: I own a feature from the database schema to the last pixel, and stay accountable once it&apos;s live.
        </motion.p>

        <div className="md:absolute md:right-0 md:top-[95%]">
          <Magnetic strength={0.3}>
            <button onClick={() => scrollToId("about")}
                    className="v3-fill grid h-[150px] w-[150px] place-items-center rounded-full bg-night text-[15px] text-white [--fill:var(--brand)] md:h-[180px] md:w-[180px]">
              About me
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
