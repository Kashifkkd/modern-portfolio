"use client";
import React from "react";
import { motion } from "framer-motion";

const certifications = [
  {
    name: "Full Stack Developer",
    authority: "Coursera",
    date: "Dec 2023",
    icon: "🎓",
    color: "from-[#00C6FB] to-[#005BEA]",
    glow: "rgba(0,198,251,0.25)",
  },
  {
    name: "MERN Stack Developer",
    authority: "Coursera",
    date: "Feb 2022",
    icon: "🧠",
    color: "from-[#8F00FF] to-[#4B0082]",
    glow: "rgba(143,0,255,0.25)",
  },
  {
    name: "AWS, MicroServices & Serverless",
    authority: "Self Learning",
    date: "Aug 2022",
    icon: "☁️",
    color: "from-[#FF8C00] to-[#FF4500]",
    glow: "rgba(255,140,0,0.25)",
  },
  {
    name: "SEO – Search Engine Optimization",
    authority: "Udemy",
    date: "Aug 2020",
    icon: "🔍",
    color: "from-[#00E396] to-[#007BFF]",
    glow: "rgba(0,227,150,0.25)",
  },
];

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="scroll-mt-[96px] w-full mt-20 md:mt-32 px-4 md:px-8 lg:px-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-center mb-4 text-gray-900 dark:text-white tracking-tight"
        >
          Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 dark:text-gray-400 mb-12 text-sm md:text-base max-w-xl"
        >
          Credentials &amp; learning milestones across full-stack, cloud, and growth.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full justify-items-center">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative w-full max-w-sm group"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{ background: cert.glow }}
              />

              {/* Card */}
              <div className="relative rounded-2xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl shadow-xl overflow-hidden p-6 flex flex-col gap-3 h-full">
                {/* Gradient top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${cert.color}`} />

                {/* Icon badge */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${cert.color} shadow-lg mb-1`}>
                  {cert.icon}
                </div>

                {/* Cert name */}
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-snug">
                  {cert.name}
                </h3>

                {/* Authority + date row */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/5 dark:border-white/10">
                  <span className={`text-sm font-semibold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
                    {cert.authority}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {cert.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}