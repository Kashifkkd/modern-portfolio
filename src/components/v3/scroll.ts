import { getLenis } from "@/components/v2/SmoothScroll";

/** Smooth-scroll to a section id, through Lenis when it's running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}
