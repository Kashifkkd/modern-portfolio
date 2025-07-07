"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { ImageModal } from "@/components/ui/image-modal";

// Add shimmer animation styles
const shimmerStyle =
  "before:absolute before:inset-0 before:rounded-3xl before:z-0 before:opacity-60 before:pointer-events-none before:bg-[linear-gradient(120deg,rgba(59,130,246,0.12)_0%,rgba(168,85,247,0.12)_50%,rgba(236,72,153,0.12)_100%)] before:animate-navbar-shimmer";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

// Helper to scroll with offset for sticky navbar
function scrollWithOffset(id: string) {
  const el = document.getElementById(id);
  const navbar = document.getElementById('main-navbar');
  if (el) {
    const yOffset = navbar ? navbar.offsetHeight + 24 : 80; // 24px for top margin
    const y = el.getBoundingClientRect().top + window.pageYOffset - yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <header
        id="main-navbar"
        className={
          `fixed top-4 left-1/2 z-50 -translate-x-1/2 w-4/5 max-w-5xl rounded-3xl shadow-2xl border border-white/30 dark:border-white/10 bg-white/30 dark:bg-black/30 backdrop-blur-2xl backdrop-saturate-150 flex items-center justify-between px-4 py-2 md:py-3 transition-all duration-300 glass-navbar overflow-hidden ${shimmerStyle}`
        }
      >
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
            <motion.button
              key={link.href}
              onClick={() => {
                const id = link.href.replace('#', '');
                scrollWithOffset(id);
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative px-3 py-1.5 rounded-lg font-medium text-sm text-black/80 dark:text-white/80 transition-colors duration-200 hover:bg-black/10 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 bg-transparent border-none cursor-pointer"
              style={{ zIndex: 1 }}
            >
              {link.label}
            </motion.button>
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
                <motion.button
                  key={link.href}
                  onClick={() => {
                    setNavOpen(false);
                    const id = link.href.replace('#', '');
                    scrollWithOffset(id);
                  }}
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-3 py-2 rounded-lg text-base font-medium text-black/90 dark:text-white/90 hover:bg-black/10 dark:hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer"
                >
                  {link.label}
                </motion.button>
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

// Add shimmer keyframes to global styles (globals.css):
// @keyframes navbar-shimmer {
//   0% { background-position: 0% 50%; }
//   100% { background-position: 100% 50%; }
// }
// .before\:animate-navbar-shimmer::before {
//   animation: navbar-shimmer 6s linear infinite;
//   background-size: 200% 200%;
// } 