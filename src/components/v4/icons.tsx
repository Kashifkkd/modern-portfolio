import type { SVGProps } from "react";

// Hand-drawn line icons from the design, plus brand marks. All inherit currentColor.

type P = SVGProps<SVGSVGElement>;
const line = { viewBox: "0 0 24 24", width: "1em", height: "1em", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const ArrowUpRight = (p: P) => (
  <svg {...line} {...p}><path d="M6.5 17.8C10 14.2 13.6 10.4 17.4 6.6" /><path d="M9.6 6.3C12.4 6.6 15 6.5 17.6 6.4C17.5 9.1 17.6 11.6 17.9 14.3" /></svg>
);
export const ArrowDown = (p: P) => (
  <svg {...line} {...p}><path d="M12 4.5C11.8 9 12.2 13.6 12 19" /><path d="M6.6 13.8C8.6 15.6 10.3 17.4 12 19.3C13.7 17.3 15.4 15.5 17.5 13.6" /></svg>
);
export const ArrowUp = (p: P) => (
  <svg {...line} {...p}><path d="M12 19.5C12.2 15 11.8 10.4 12 5" /><path d="M6.5 10.2C8.5 8.4 10.2 6.6 12 4.7C13.8 6.7 15.5 8.5 17.5 10.4" /></svg>
);
export const Check = (p: P) => (
  <svg {...line} {...p}><path d="M5 12.8C6.9 14.3 8.4 15.9 9.9 17.8C12.4 13 15.4 9 19.3 5.8" /></svg>
);
export const Close = (p: P) => (
  <svg {...line} {...p}><path d="M6.2 6.4C10 10 14 14.1 17.8 17.7" /><path d="M17.6 6.2C13.9 10.1 10.1 13.9 6.4 17.9" /></svg>
);
export const Copy = (p: P) => (
  <svg {...line} {...p}><path d="M9 8.6C11.8 8.4 15.4 8.5 18.6 8.7C18.8 12 18.7 15.6 18.5 19.2C15.3 19.4 12 19.3 8.9 19.1C8.8 15.6 8.8 12.1 9 8.6Z" /><path d="M5.6 15.4C5.4 12 5.5 8.6 5.7 5.2C8.6 5 11.6 5.1 14.8 5.3" /></svg>
);
export const Chat = (p: P) => (
  <svg {...line} {...p}><path d="M5 6.5C9.5 5.8 14.5 5.8 19 6.6C19.4 9.6 19.3 12.4 18.9 15.2C15.6 15.6 12.4 15.6 9.6 15.4L6.2 18.8L6.6 15.2C5.4 15 5.1 14.8 5 14.6C4.7 11.8 4.7 9.2 5 6.5Z" /><circle cx="9" cy="10.8" r=".6" fill="currentColor" /><circle cx="12" cy="10.8" r=".6" fill="currentColor" /><circle cx="15" cy="10.8" r=".6" fill="currentColor" /></svg>
);
export const Spinner = (p: P) => (
  <svg {...line} {...p}><path d="M12 4.2C16.4 4.1 19.9 7.6 19.8 12C19.7 16.4 16.3 19.9 11.9 19.8C7.6 19.7 4.2 16.2 4.3 11.9" /></svg>
);
// Plain document mark: straight edges on purpose, so the résumé reads as a file, not a doodle.
export const Resume = (p: P) => (
  <svg {...line} strokeWidth={1.6} width={16} height={16} {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></svg>
);
// Sketchy sun / moon in the same hand-drawn stroke as the rest of the set.
export const Sun = (p: P) => (
  <svg {...line} strokeWidth={1.6} width={16} height={16} {...p}><path d="M12 8.2C14.2 8.1 15.9 9.9 15.8 12.1C15.7 14.2 14 15.9 11.9 15.8C9.8 15.7 8.1 14 8.2 11.9C8.3 9.9 9.9 8.3 12 8.2Z" /><path d="M12 2.8V4.9M12 19.1V21.2M2.8 12H4.9M19.1 12H21.2M5.5 5.5L7 7M17 17L18.5 18.5M5.5 18.5L7 17M17 7L18.5 5.5" /></svg>
);
export const Moon = (p: P) => (
  <svg {...line} strokeWidth={1.6} width={16} height={16} {...p}><path d="M19.6 14.6C18.5 15.1 17.3 15.4 16 15.4C11.6 15.3 8.4 11.9 8.6 7.6C8.7 6.3 9 5.2 9.6 4.2C6.3 5.3 4 8.4 4.1 12.1C4.2 16.6 7.9 20.1 12.3 20C15.7 19.9 18.5 17.7 19.6 14.6Z" /></svg>
);
export const GitHub = (p: P) => (
  <svg viewBox="0 0 24 24" width={15} height={15} fill="currentColor" aria-hidden {...p}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
);
export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="currentColor" aria-hidden {...p}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);
