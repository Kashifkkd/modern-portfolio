"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "./icons";

/** Circle button that flips dark ↔ light. `variant` matches the layer it sits on. */
export default function ThemeToggle({ variant = "built", tabIndex }: { variant?: "built" | "sketch"; tabIndex?: number }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = !mounted || resolvedTheme !== "light";

  return (
    <button
      type="button"
      tabIndex={tabIndex}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={`icon-btn icon-btn--${variant}`}
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
