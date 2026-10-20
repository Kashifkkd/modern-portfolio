"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/lib/site";
import LocalTime from "./LocalTime";
import Magnetic from "./Magnetic";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-fg">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10 transition-[padding] duration-500 ${scrolled ? "py-4" : "py-6"}`}
      >
        <Link href="#top" className="font-mono text-xs tracking-[0.14em] uppercase">
          {profile.name}
          <span className="hidden sm:inline text-fg-faint"> — {profile.location.split(",")[0]}</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group relative py-1">
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 md:gap-6">
          <LocalTime className="hidden lg:inline text-xs text-fg-muted" />
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-current px-4 py-2 text-sm transition-colors duration-300 hover:bg-fg hover:text-bg"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${profile.availability.open ? "bg-accent" : "bg-fg-faint"}`} />
              Let&apos;s talk
            </a>
          </Magnetic>
        </div>
      </nav>
    </header>
  );
}
