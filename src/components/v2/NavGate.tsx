"use client";
import { usePathname } from "next/navigation";
import Nav from "./Nav";

/** The home page draws its own fixed chrome (v3), so the v2 nav only renders on other routes. */
export default function NavGate() {
  return usePathname() === "/" ? null : <Nav />;
}
