"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { ImageModal } from "@/components/ui/image-modal";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";

// Add shimmer animation styles
const shimmerStyle =
  "before:absolute before:inset-0 before:rounded-3xl before:z-0 before:opacity-60 before:pointer-events-none before:bg-[linear-gradient(120deg,rgba(59,130,246,0.12)_0%,rgba(168,85,247,0.12)_50%,rgba(236,72,153,0.12)_100%)] before:animate-navbar-shimmer";

const navLinks = [
  { href: "#hero", label: "Home" },
  // { href: "#about", label: "About" },
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
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const scrollTargetRef = useRef<string | null>(null);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <header
        id="main-navbar"
        className={
          `fixed top-4 left-1/2 z-50 -translate-x-1/2 w-4/5 max-w-5xl rounded-3xl shadow-2xl border border-white/30 dark:border-white/10 bg-white/30 dark:bg-black/30 backdrop-blur-2xl backdrop-saturate-150 flex items-center justify-between px-4 py-2 md:py-3 transition-all duration-300 glass-navbar overflow-hidden ${shimmerStyle}`
        }
      >
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 select-none cursor-pointer"
          onClick={e => {
            e.preventDefault();
            scrollWithOffset('hero');
          }}
        >
          <Image
            src="/kashif_profile_img.jpeg"
            alt="Kashif Deshmukh"
            width={40}
            height={40}
            className="rounded-full border-2 border-white/30 dark:border-white/20 shadow-md hover:scale-105 transition-transform duration-200"
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
        {/* Hamburger for mobile with Drawer */}
        <div className="md:hidden ml-2" style={{ zIndex: 2 }}>
          <Drawer
            open={navOpen}
            onOpenChange={(open) => {
              setNavOpen(open);
              if (!open && scrollTargetRef.current) {
                // Wait a tick for Drawer to finish closing
                setTimeout(() => {
                  scrollWithOffset(scrollTargetRef.current!);
                  scrollTargetRef.current = null;
                }, 10);
              }
            }}
          >
            <DrawerTrigger asChild>
              <motion.button
                className="p-2 rounded-full bg-white/40 dark:bg-black/40 shadow border border-white/30 dark:border-white/10 backdrop-blur"
                aria-label="Open navigation menu"
                whileTap={{ scale: 0.85, rotate: 10 }}
              >
                {navOpen ? (
                  <XMarkIcon className="w-6 h-6 text-black dark:text-white" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-black dark:text-white" />
                )}
              </motion.button>
            </DrawerTrigger>
            <DrawerContent className="p-0 bg-white/90 dark:bg-black/90">
              <nav className="flex flex-col gap-2 w-full px-4 py-8">
                {navLinks.map((link) => (
                  <DrawerClose asChild key={link.href}>
                    <motion.button
                      onClick={() => {
                        const id = link.href.replace('#', '');
                        scrollTargetRef.current = id;
                        setNavOpen(false);
                      }}
                      whileHover={{ scale: 1.05, x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-3 py-3 rounded-lg text-lg font-semibold text-black/90 dark:text-white/90 hover:bg-black/10 dark:hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer text-left w-full max-w-xs"
                    >
                      {link.label}
                    </motion.button>
                  </DrawerClose>
                ))}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
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