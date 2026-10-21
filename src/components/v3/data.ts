import { projects, type Project } from "@/lib/site";

// Short names for the work list and a backdrop colour for each project's hover preview.
const extras: Record<string, { name: string; tint: string }> = {
  "event-intelligence": { name: "Event Intelligence", tint: "#26324a" },
  "stories-app": { name: "Stories App", tint: "#3b3326" },
  "conversational-platform": { name: "Jwero.ai", tint: "#2e2a45" },
  "mentor-gpt": { name: "Mentor GPT", tint: "#1f3a30" },
  teamsync: { name: "TeamSync", tint: "#22344f" },
};

export type WorkItem = Project & { name: string; tint: string };

export const work: WorkItem[] = projects.map((p) => ({
  ...p,
  ...(extras[p.slug] ?? { name: p.client, tint: "#2a2a2e" }),
}));

export const navLinks = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export const greetings = ["Hello", "नमस्ते", "Bonjour", "Hola", "Ciao", "Hallo", "こんにちは", "مرحبا"];
