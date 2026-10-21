import { profile } from "@/lib/site";

// Content for the "Engineering Blueprint" home page (design: docs/design/Portfolio.dc.html).

export const links = {
  cal: profile.calUrl,
  email: profile.email,
  github: "https://github.com/Kashifkkd",
  linkedin: "https://www.linkedin.com/in/kashif-deshmukh-23797a173/",
  resume: profile.resumeUrl,
};

export const heroNav = [
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export const railNav = [
  { href: "#process", label: "Call" },
  { href: "#plan", label: "Plan" },
  { href: "#build", label: "Build" },
  { href: "#ship", label: "Ship" },
  { href: "#experience", label: "Career" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export type Fact = { k: string; v: string };

export const steps: Record<"call" | "plan" | "build" | "ship", { n: string; title: string; text: string; facts: Fact[] }> = {
  call: {
    n: "02. the call",
    title: "It starts with a 30-minute call.",
    text: "We talk about what's broken, what can't move, and what done looks like. No pitch deck. If a feature isn't worth building, or I'm not the right person for it, you'll hear that on the call.",
    facts: [
      { k: "Reply time", v: "Under 1 business day" },
      { k: "NDA", v: "Happy to sign before we talk" },
    ],
  },
  plan: {
    n: "03. the plan",
    title: "Then a written plan, with a number on it.",
    text: "Scope, milestones and a fixed price or a weekly rate, in writing, within a few days of the call. You know what you're getting before you pay for it, and nothing gets billed as a surprise.",
    facts: [
      { k: "Engagement", v: "Fixed scope or weekly" },
      { k: "Start", v: "1-2 weeks after sign-off" },
    ],
  },
  build: {
    n: "04. the build",
    title: "Every Friday, something you can click.",
    text: "Weekly demos on a live preview URL. You see the product, not a status report. When something breaks, you hear it from me first, along with the fix.",
    facts: [
      { k: "Tooling", v: "Linear | GitHub | Slack | Loom" },
      { k: "Stack", v: "Next.js | React Native | Node | Python" },
    ],
  },
  ship: {
    n: "05. the launch",
    title: "Then it goes live, and it stays up.",
    text: "Launch, monitoring and a handover your team can actually own: docs, CI and a recorded walkthrough. You shouldn't need me to keep it running. Most clients keep me around anyway.",
    facts: [],
  },
};

export const callNotes = [
  "Tue, 11:00 IST. First call.",
  "What's broken: the app is late and half the team left.",
  "What can't move: launch date, six weeks out.",
  "Done looks like: live on both stores, subscriptions working.",
];

export const milestones = [
  { id: "M1", text: "Auth, data model, first preview URL", from: 2, to: 4 },
  { id: "M2", text: "Core flows, payments, analytics", from: 4, to: 6 },
  { id: "M3", text: "Store release, monitoring, handover", from: 6, to: 8, hot: true },
];

export type TermLine = { text: string; tone?: "cmd" | "ok" | "dim" | "err" };

export const terminal: TermLine[] = [
  { text: "$ git push origin week-1", tone: "cmd" },
  { text: "  ✓ checks passed | 58s", tone: "ok" },
  { text: "  ✓ preview → week-1.yourapp.com" },
  { text: "  → Friday demo: sign-in, onboarding", tone: "dim" },
  { text: "$ git push origin week-2", tone: "cmd" },
  { text: "  ✓ checks passed | 1m 04s", tone: "ok" },
  { text: "  ✓ preview → week-2.yourapp.com" },
  { text: "  → Friday demo: feed, payments in test mode", tone: "dim" },
  { text: "$ git push origin week-3", tone: "cmd" },
  { text: "  ✗ e2e: checkout flow failed", tone: "err" },
  { text: "  ✓ fixed, re-run passed | 1m 11s", tone: "ok" },
  { text: "  → Friday demo: checkout, on schedule", tone: "dim" },
];

export const shipItems = [
  { t: "Production deploy, with a rollback plan", m: "1-click rollback" },
  { t: "Monitoring and alerts", m: "Errors → Slack" },
  { t: "App Store and Play release", m: "Both stores" },
  { t: "CI your team can run", m: "GitHub Actions" },
  { t: "Handover docs", m: "Setup to deploy" },
  { t: "Recorded walkthrough", m: "Loom" },
];

export const experience = [
  {
    years: "2026 - Present",
    company: "D'Vinci Group",
    role: "Senior Software Engineer | UK, remote",
    text: [
      "Building a real-time data platform and the internal tool the team runs it from. Took over StoryCloud, a media stories app for iOS and Android, stabilised it and shipped it to both stores.",
      "Day to day I work across Python, Supabase, RabbitMQ, Next.js and React Native.",
    ],
  },
  {
    years: "2023 - 2026",
    company: "Tanika Tech Jewels (Jwero.ai)",
    role: "Software Engineer, Full-Stack | Mumbai",
    text: [
      "Built real-time chat, CRM and automation platforms used by 5+ enterprise clients, including a low-code chatbot builder in React Flow that cut manual setup by 40%.",
      "Along the way I cut front-end load time by 35%, made data processing 30% faster and brought server costs down by 20%.",
    ],
  },
  {
    years: "2019 - 2023",
    company: "Gharda Institute of Technology",
    role: "B.E. Computer Engineering | University of Mumbai",
    text: [
      "Studied the foundations behind production software: data structures and algorithms, databases, operating systems, computer networks and system design. Graduated with a CGPA of 8.57.",
    ],
  },
];

export const topProjects = [
  {
    n: "01", year: "2026", title: "Real-time data platform", tag: "Data platform | Internal tooling",
    note: "Huge volumes of live data, processed around the clock by an intelligent system the team relies on every day.",
    outcome: ["Processes live data around the clock", "Internal tool used daily by the team"],
    team: "D'Vinci Group", role: "Senior Software Engineer", stack: "Python, PostgreSQL, Next.js",
    live: "", source: "",
  },
  {
    n: "02", year: "2026", title: "StoryCloud", tag: "Media stories app | iOS & Android",
    note: "Picked up mid-build, made rock solid, then shipped to the App Store and Google Play. A handover most teams would rather avoid.",
    outcome: ["Auth, row-level security, feed and subscriptions rebuilt", "Smooth image, video and audio with caching and prefetch", "Live on App Store & Google Play"],
    team: "D'Vinci Group", role: "Mobile Engineering", stack: "React Native, Expo, Supabase",
    live: "", source: "",
  },
  {
    n: "03", year: "2023 - 2026", title: "Jwero.ai", tag: "Conversational commerce | CRM",
    note: "Three years on one product, used by enterprise retail clients. Where I learned what production actually means.",
    outcome: ["Real-time chat, CRM and automation for 5+ enterprise clients", "Low-code chatbot builder in React Flow cut manual setup by 40%", "Front-end load time down 35%"],
    team: "Tanika Tech Jewels", role: "Software Engineer, Full-Stack", stack: "React, TypeScript, Node.js, MongoDB, React Flow",
    live: "", source: "",
  },
  {
    n: "04", year: "AI SaaS", title: "Business OS", tag: "AI-powered ERP | Next.js, TypeScript",
    note: "An ERP that runs a business from one system: operations, workflows and data, with AI only where it saves someone time.",
    outcome: ["Modular dashboards for CRM, tasks and analytics", "AI insights, automation and contextual help"],
    team: "Independent", role: "Design & Development", stack: "Next.js, TypeScript, Tailwind, AI integrations",
    live: "", source: "",
  },
];

export const quotes = [
  { text: "Kashif took over our frontend mid-sprint and didn't miss a beat. He picked up the codebase fast, flagged things we'd been ignoring, and shipped on time.", name: "Arjun Nair", role: "Tech Lead", company: "Buildspace" },
  { text: "He joined a React Native project that was already behind schedule, got up to speed in days and helped us get back on track.", name: "Farhan Shaikh", role: "CTO", company: "AppCraft Studios" },
];

// Suggested questions in Jarvis. Each has a written answer, shown instantly with no model call;
// anything typed freely goes to /api/agent.
export const agentChips = [
  {
    q: "Summarise Kashif in 30 seconds",
    a: "Kashif is a senior software engineer in Mumbai who designs and builds web, mobile and AI products end to end, across Next.js, React Native, Node and Python.\n\nRight now he builds a real-time data platform for D'Vinci Group (UK, remote) and took over their StoryCloud app, shipping it to both app stores. Before that he spent three years on Jwero.ai's chat and CRM platform for 5+ enterprise clients.\n\nYou get a written plan with a fixed price before any work starts, then a demo every Friday. Best next step: a 30-minute call at cal.com/kashif-deshmukh.",
  },
  {
    q: "Is he a fit for a React Native app?",
    a: "Yes. He took over StoryCloud, an image, video and audio stories app for iOS and Android, rebuilt auth with Supabase and row-level security, added a paginated feed, in-app subscriptions and media caching, and shipped it to the App Store and Google Play.\n\nHe works with React Native and Expo and handles the store releases himself. If your app is mid-build or behind schedule, that's exactly the kind of handover he's done before. Talk it through on a call: cal.com/kashif-deshmukh.",
  },
  {
    q: "Scope a 6-week MVP for my idea",
    a: "Here's how a 6-week MVP usually runs with Kashif:\n- Weeks 1-2: auth, data model and a first preview URL\n- Weeks 3-4: core flows, payments and analytics\n- Weeks 5-6: launch or store release, monitoring and handover\n\nYou see a demo every Friday on a live link, and the price is fixed in writing before work starts. To scope your idea properly he needs 30 minutes with you: cal.com/kashif-deshmukh.",
  },
  {
    q: "Why him over an agency?",
    a: "You work directly with the engineer who builds it, with no account managers in between. Kashif writes the backend and front-end and ships the mobile app himself, gives you a fixed price in writing, and demos progress every Friday. He'll also tell you when a feature isn't worth building.\n\nIf you want one senior person who owns the outcome end to end, he's a strong fit (he also works white-label with agencies). Start with a call: cal.com/kashif-deshmukh.",
  },
];

export const greetings = ["Hello", "Bonjour", "नमस्ते", "Hola", "Ciao", "Hallo", "こんにちは", "مرحبا", "Hello"];

// Sprint board shown after the plan (Plan step). Each column shows three notes: a finished ticket
// pushes the oldest Done note off the board, and the backlog refills To do, so columns stay balanced.
export type BoardCol = "todo" | "doing" | "done";
export const boardTickets = [
  { id: "YA-08", t: "Project setup and CI", m: "M1", c: "#d8f3d2" },
  { id: "YA-10", t: "Database schema", m: "M1", c: "#d6ebff" },
  { id: "YA-12", t: "Sign in with Apple", m: "M1", c: "#fff0a3" },
  { id: "YA-15", t: "Onboarding screens", m: "M1", c: "#ffd9e2" },
  { id: "YA-17", t: "Profile and settings", m: "M1", c: "#d6ebff" },
  { id: "YA-18", t: "Feed with pagination", m: "M2", c: "#fff0a3" },
  { id: "YA-21", t: "Stripe checkout", m: "M2", c: "#d8f3d2" },
  { id: "YA-23", t: "Analytics events", m: "M2", c: "#ffd9e2" },
  { id: "YA-24", t: "Push notifications", m: "M2", c: "#d6ebff" },
  { id: "YA-26", t: "Media caching", m: "M2", c: "#fff0a3" },
  { id: "YA-27", t: "Store listing assets", m: "M3", c: "#d8f3d2" },
  { id: "YA-29", t: "Crash reporting", m: "M3", c: "#ffd9e2" },
];
export const BOARD_VISIBLE = 3;
export const BOARD_TOTAL = boardTickets.length;
export const boardStart: Record<BoardCol, string[]> = {
  todo: ["YA-21", "YA-23", "YA-24"],
  doing: ["YA-15", "YA-17", "YA-18"],
  done: ["YA-12", "YA-10", "YA-08"],
};
export const boardStartDone = 3;
// One move per beat. "todo" brings a ticket in from the backlog.
export const boardMoves: [string, BoardCol][] = [
  ["YA-15", "done"], ["YA-21", "doing"], ["YA-26", "todo"],
  ["YA-17", "done"], ["YA-23", "doing"], ["YA-27", "todo"],
  ["YA-18", "done"], ["YA-24", "doing"], ["YA-29", "todo"],
];

// Handover guide shown as the third view of the plan card. Sections are "written" one after another.
export const docSections = [
  { t: "Local setup", d: "Clone, add the .env, one command to run. Up in 10 minutes." },
  { t: "Architecture", d: "How the app, API and database fit together, with a diagram." },
  { t: "Deploy & rollback", d: "Every merge ships through CI. One click rolls back." },
  { t: "Monitoring", d: "Errors and uptime alerts go straight to your Slack." },
  { t: "Runbook", d: "What to do when something breaks, step by step." },
];
