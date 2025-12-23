"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { ImageModal } from "@/components/ui/image-modal";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { useSearchParams, useRouter } from "next/navigation";

// Add shimmer animation styles
const shimmerStyle =
  "before:absolute before:inset-0 before:rounded-3xl before:z-0 before:opacity-60 before:pointer-events-none before:bg-[linear-gradient(120deg,rgba(59,130,246,0.12)_0%,rgba(168,85,247,0.12)_50%,rgba(236,72,153,0.12)_100%)] before:animate-navbar-shimmer";

const navLinks = [
  { href: "#hero", label: "Home", id: "hero", urlParam: "home" },
  { href: "#journey", label: "Journey", id: "journey", urlParam: "journey" },
  { href: "#skills", label: "Skills", id: "skills", urlParam: "skills" },
  { href: "#projects", label: "Projects", id: "projects", urlParam: "projects" },
  { href: "#testimonials", label: "Testimonials", id: "testimonials", urlParam: "testimonials" },
  { href: "#certifications", label: "Certifications", id: "certifications", urlParam: "certifications" },
  { href: "#contact", label: "Contact", id: "contact", urlParam: "contact" },
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
  const [activeSection, setActiveSection] = useState<string>("hero");
  const scrollTargetRef = useRef<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isScrollingRef = useRef(false);
  const lastActiveSectionRef = useRef<string>("hero");

  // Simple function to get active section from scroll position
  const getActiveSectionFromScroll = () => {
    // If at the very top, always return hero
    if (window.scrollY < 100) {
      return "hero";
    }
    
    const scrollPos = window.scrollY + 200;
    
    for (let i = navLinks.length - 1; i >= 0; i--) {
      const section = document.getElementById(navLinks[i].id);
      if (section && section.offsetTop <= scrollPos) {
        return navLinks[i].id;
      }
    }
    return "hero";
  };

  // Update URL without triggering scroll
  const updateUrlParam = (sectionId: string) => {
    const urlParam = navLinks.find(link => link.id === sectionId)?.urlParam || sectionId;
    const currentTab = searchParams.get('tab');
    if (currentTab !== urlParam) {
      router.replace(`?tab=${urlParam}`, { scroll: false });
    }
  };

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return; // Skip during programmatic scroll
      
      const newActiveSection = getActiveSectionFromScroll();
      
      if (newActiveSection !== lastActiveSectionRef.current) {
        lastActiveSectionRef.current = newActiveSection;
        setActiveSection(newActiveSection);
        updateUrlParam(newActiveSection);
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [router, searchParams]);

  // Handle initial URL parameter and set default to home
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      const link = navLinks.find(l => l.urlParam === tab);
      if (link && link.id !== activeSection) {
        isScrollingRef.current = true;
        setTimeout(() => {
          scrollWithOffset(link.id);
          setActiveSection(link.id);
          lastActiveSectionRef.current = link.id;
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 1000);
        }, 100);
      }
    } else {
      // No tab parameter, default to home
      const urlParam = navLinks.find(link => link.id === "hero")?.urlParam || "home";
      router.replace(`?tab=${urlParam}`, { scroll: false });
      setActiveSection("hero");
      lastActiveSectionRef.current = "hero";
    }
  }, []); // Only run on mount

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
            isScrollingRef.current = true;
            scrollWithOffset('hero');
            setActiveSection('hero');
            updateUrlParam('hero');
            setTimeout(() => {
              isScrollingRef.current = false;
            }, 1000);
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
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.button
                key={link.href}
                onClick={() => {
                  isScrollingRef.current = true;
                  scrollWithOffset(link.id);
                  setActiveSection(link.id);
                  lastActiveSectionRef.current = link.id;
                  updateUrlParam(link.id);
                  setTimeout(() => {
                    isScrollingRef.current = false;
                  }, 1000);
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-3 py-1.5 rounded-lg font-medium text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 bg-transparent border-none cursor-pointer ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold"
                    : "text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10"
                }`}
                style={{ zIndex: 1 }}
              >
                {link.label}
              </motion.button>
            );
          })}
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
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <DrawerClose asChild key={link.href}>
                      <motion.button
                        onClick={() => {
                          scrollTargetRef.current = link.id;
                          isScrollingRef.current = true;
                          setActiveSection(link.id);
                          lastActiveSectionRef.current = link.id;
                          updateUrlParam(link.id);
                          setNavOpen(false);
                          setTimeout(() => {
                            isScrollingRef.current = false;
                          }, 1000);
                        }}
                        whileHover={{ scale: 1.05, x: 4 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-3 py-3 rounded-lg text-lg font-semibold transition-colors bg-transparent border-none cursor-pointer text-left w-full max-w-xs ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                            : "text-black/90 dark:text-white/90 hover:bg-black/10 dark:hover:bg-white/10"
                        }`}
                      >
                        {link.label}
                      </motion.button>
                    </DrawerClose>
                  );
                })}
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