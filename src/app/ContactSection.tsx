"use client"

import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {

  return (
    <section id="contact" className="scroll-mt-[96px] pb-24 relative max-w-2xl mx-auto mt-20 md:mt-32 px-4 md:px-8 lg:px-10 flex flex-col items-center">
      {/* Subtle animated background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-pink-100/30 dark:from-zinc-900/60 dark:via-zinc-800/40 dark:to-zinc-900/60 blur-2xl" />
      </div>
      <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">Contact</h2>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full bg-white/70 dark:bg-zinc-900/70 rounded-2xl shadow-2xl border border-blue-100 dark:border-zinc-800 p-8 md:p-12 flex flex-col items-center gap-6 backdrop-blur-xl text-center"
        style={{ maxWidth: 500 }}
      >
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
          Let&apos;s build something amazing together.
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Skip the back-and-forth emails. Pick a time that works for you and let&apos;s hop on a call to discuss your project.
        </p>
        <motion.a
          href="https://cal.com/kashif-deshmukh"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 bg-black dark:bg-white text-white dark:text-black font-bold py-4 px-8 rounded-full shadow-xl transition-all text-lg tracking-wide hover:opacity-90 flex items-center gap-3"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
          </svg>
          Book a call on Cal.com
        </motion.a>
      </motion.div>
      <div className="flex gap-6 justify-center mt-8">
        <a href="https://github.com/Kashifkkd" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
          <Github className="w-7 h-7" />
        </a>
        <a href="https://www.linkedin.com/in/kashif-deshmukh-23797a173/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
          <Linkedin className="w-7 h-7" />
        </a>
      </div>
    </section>
  );
} 