"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { ImageModal } from "@/components/ui/image-modal";
import Image from "next/image";


const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-4/5 max-w-5xl rounded-3xl shadow-2xl border border-white/30 dark:border-white/10 bg-white/30 dark:bg-black/30 backdrop-blur-2xl backdrop-saturate-150 flex items-center justify-between px-4 py-2 md:py-3 transition-all duration-300 glass-navbar">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 select-none">
          <Image
            src="/kashif_profile_img.jpeg"
            alt="Kashif Deshmukh"
            width={40}
            height={40}
            className="rounded-full border-2 border-white/30 dark:border-white/20 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={(e) => {
              e.preventDefault();
              setImageModalOpen(true);
            }}
          />
          <span className="font-extrabold text-lg tracking-tight text-black dark:text-white">Kashif</span>
        </a>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-2 items-center">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-3 py-1.5 rounded-lg font-medium text-sm text-black/80 dark:text-white/80 transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              style={{ zIndex: 1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
        {/* ShadCN Theme Toggle */}
        <div className="ml-2" style={{ zIndex: 2 }}>
          <ThemeToggle />
        </div>
        {/* Hamburger for mobile */}
        <motion.button
          className="md:hidden p-2 rounded-full bg-white/40 dark:bg-black/40 shadow border border-white/30 dark:border-white/10 ml-2 backdrop-blur"
          onClick={() => setNavOpen((v) => !v)}
          aria-label="Open navigation menu"
          whileTap={{ scale: 0.85, rotate: 10 }}
          style={{ zIndex: 2 }}
        >
          {navOpen ? (
            <XMarkIcon className="w-6 h-6 text-black dark:text-white" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-black dark:text-white" />
          )}
        </motion.button>
        {/* Mobile nav menu */}
        <AnimatePresence>
          {navOpen && (
            <motion.nav
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-[110%] left-0 w-full bg-white/80 dark:bg-black/90 rounded-2xl shadow-xl border border-white/30 dark:border-white/10 flex flex-col gap-2 px-4 py-4 md:hidden backdrop-blur-xl"
              style={{ zIndex: 10 }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-3 py-2 rounded-lg text-base font-medium text-black/90 dark:text-white/90 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  onClick={() => setNavOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Image Preview Modal */}
        <ImageModal
          isOpen={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
          imageSrc="/kashif_profile_img.jpeg"
          alt="Kashif Deshmukh - Full Preview"
        />
      </header>
    </ThemeProvider>
  );
} 