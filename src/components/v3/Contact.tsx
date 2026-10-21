"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/lib/site";
import Magnetic from "@/components/v2/Magnetic";
import LocalTime from "@/components/v2/LocalTime";

/**
 * Night footer. The paper section above ends in a curve that flattens as the footer scrolls in;
 * the headline drifts, the big round CTA sits on the divider, and the email copies on click.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const curve = useTransform(scrollYProgress, [0, 0.9], [60, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <>
      <motion.div style={{ height: curve }} className="relative z-[2]">
        <div className="absolute left-[-10%] z-[1] h-[1550%] w-[120%] rounded-b-[50%] bg-paper shadow-[0_60px_50px_rgba(0,0,0,0.75)]" />
      </motion.div>

      <motion.section id="contact" ref={ref} style={{ y }} className="relative z-[1] bg-night text-white">
        <div className="mx-auto px-5 pt-[22svh] md:px-[12vw]">
          <div className="relative border-b border-white/20 pb-24">
            <span className="flex items-center gap-4 md:gap-6">
              <span aria-hidden className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-brand text-[22px] font-medium tracking-[-0.03em] md:h-[100px] md:w-[100px] md:text-[30px]">KD</span>
              <h2 className="m-0 text-[clamp(44px,5.4vw,96px)] font-normal leading-none tracking-[-0.035em]">Let&apos;s work</h2>
            </span>
            <h2 className="m-0 text-[clamp(44px,5.4vw,96px)] font-normal leading-none tracking-[-0.035em]">together</h2>

            <motion.div style={{ x }} className="absolute right-[6%] top-[calc(100%-75px)] md:right-[12%] md:top-[calc(100%-90px)]">
              <Magnetic strength={0.3}>
                <a href={profile.calUrl} target="_blank" rel="noreferrer"
                   className="v3-fill grid h-[150px] w-[150px] place-items-center rounded-full bg-brand text-center text-[16px] [--fill:#ff8a3d] md:h-[180px] md:w-[180px]">
                  Book a<br />call
                </a>
              </Magnetic>
            </motion.div>
            <motion.svg style={{ rotate, scale: 2 }} width="9" height="9" viewBox="0 0 9 9" fill="none"
                        className="absolute left-full top-[30%] hidden md:block" aria-hidden>
              <path d="M8 8.5c.3 0 .5-.2.5-.5V3.5a.5.5 0 0 0-1 0v4h-4a.5.5 0 0 0 0 1H8ZM.6 1.4l7 7 .8-.8-7-7-.8.8Z" fill="white" />
            </motion.svg>
          </div>

          <div className="mt-24 flex flex-col gap-4 md:mt-28 md:flex-row">
            <Magnetic>
              <button onClick={copy}
                      className="v3-fill flex items-center justify-center gap-3 rounded-full border border-white/25 px-10 py-6 text-[16px] [--fill:var(--brand)] max-md:w-full">
                <span>{copied ? "Copied to clipboard ✓" : profile.email}</span>
              </button>
            </Magnetic>
            <Magnetic>
              <a href={profile.phoneHref}
                 className="v3-fill flex items-center justify-center rounded-full border border-white/25 px-10 py-6 text-[16px] [--fill:var(--brand)] max-md:w-full">
                {profile.phone}
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-[14svh] flex flex-col justify-between gap-8 px-5 pb-6 text-[14px] md:flex-row md:items-end md:px-9">
          <div className="flex gap-10">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-white/45">Version</p>
              <p>{new Date().getFullYear()} © Edition</p>
            </div>
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-white/45">Local time</p>
              <LocalTime className="!font-sans" />
            </div>
          </div>
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-white/45">Socials</p>
            <ul className="flex gap-6">
              {profile.socials.filter((s) => s.href.startsWith("http")).map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="v3-dot">{s.label}</a></li>
              ))}
              <li><a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="v3-dot">Resume</a></li>
            </ul>
          </div>
        </div>
      </motion.section>
    </>
  );
}
