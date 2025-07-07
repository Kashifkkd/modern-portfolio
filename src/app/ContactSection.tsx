"use client"

import React, { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section id="contact" className="relative max-w-2xl mx-auto mt-20 md:mt-32 px-4 md:px-8 lg:px-10 flex flex-col items-center">
      {/* Subtle animated background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-pink-100/30 dark:from-zinc-900/60 dark:via-zinc-800/40 dark:to-zinc-900/60 blur-2xl" />
      </div>
      <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6 text-center">Contact</h2>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full bg-white/70 dark:bg-zinc-900/70 rounded-2xl shadow-2xl border border-blue-100 dark:border-zinc-800 p-8 md:p-10 flex flex-col gap-6 backdrop-blur-xl"
        style={{ maxWidth: 500 }}
      >
        <div className="relative">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="peer w-full bg-transparent border-b-2 border-blue-200 dark:border-zinc-700 py-3 px-2 text-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder-transparent"
            placeholder="Name"
            autoComplete="off"
          />
          <label className="absolute left-2 top-3 text-gray-500 dark:text-gray-400 text-base pointer-events-none transition-all duration-200 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 -top-5 text-xs text-blue-500">
            Name
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="peer w-full bg-transparent border-b-2 border-blue-200 dark:border-zinc-700 py-3 px-2 text-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder-transparent"
            placeholder="Email"
            autoComplete="off"
          />
          <label className="absolute left-2 top-3 text-gray-500 dark:text-gray-400 text-base pointer-events-none transition-all duration-200 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 -top-5 text-xs text-blue-500">
            Email
          </label>
        </div>
        <div className="relative">
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="peer w-full bg-transparent border-b-2 border-blue-200 dark:border-zinc-700 py-3 px-2 text-lg text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder-transparent resize-none"
            placeholder="Message"
          />
          <label className="absolute left-2 top-3 text-gray-500 dark:text-gray-400 text-base pointer-events-none transition-all duration-200 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-blue-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 -top-5 text-xs text-blue-500">
            Message
          </label>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all text-lg tracking-wide hover:from-blue-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send Message
        </motion.button>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 dark:text-green-400 text-center font-semibold mt-2"
          >
            Thank you! Your message has been sent.
          </motion.div>
        )}
      </motion.form>
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