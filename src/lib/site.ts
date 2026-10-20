// Single source of truth for portfolio content.
// Items marked PLACEHOLDER should be replaced with real data before launch.
// Client work is described in industry terms only — no internal metrics or architecture details.

export const profile = {
  name: "Kashif Deshmukh",
  firstName: "Kashif",
  role: "Senior Software Engineer",
  tagline: "Full-Stack · AI/LLM Integrations · Mobile",
  positioning:
    "I design and build digital products end to end — real-time platforms, AI-powered tools and mobile apps — for companies that need software to ship on time and hold up in production.",
  location: "Mumbai, India",
  timezone: "Asia/Kolkata",
  tzLabel: "IST",
  email: "kashifdeshmukh786@gmail.com",
  phone: "+91 70585 78937",
  phoneHref: "tel:+917058578937",
  calUrl: "https://cal.com/kashif-deshmukh",
  resumeUrl: "/Kashif-Resume.pdf",
  siteUrl: "https://kashif-portfolio.vercel.app",
  availability: {
    open: true,
    label: "Taking on select projects from Nov 2026",
    short: "Open to new work",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/Kashifkkd" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kashif-deshmukh-23797a173/" },
    { label: "Email", href: "mailto:kashifdeshmukh786@gmail.com" },
  ],
};

export type Project = {
  slug: string;
  client: string;
  title: string;
  category: string;
  role: string;
  year: string;
  summary: string;
  stack: string[];
  image: string;
  href?: string;
  source?: string;
  featured?: boolean; // full-width card
};

export const projects: Project[] = [
  {
    slug: "event-intelligence",
    client: "D'Vinci Group",
    title: "Real-time event intelligence platform",
    category: "Data platform · Operator tooling",
    role: "Backend & Platform Engineering",
    year: "2026",
    summary:
      "A high-throughput ingestion and clustering system that turns a continuous stream of global news into structured, reviewable events, with an internal management console for analysts.",
    stack: ["Python", "PostgreSQL", "Message queues", "Next.js"],
    image: "/work/firesight.svg",
    featured: true,
  },
  {
    slug: "stories-app",
    client: "D'Vinci Group",
    title: "Media stories app for iOS & Android",
    category: "Consumer mobile · Subscriptions",
    role: "Mobile Engineering",
    year: "2026",
    summary:
      "Took over a live React Native product and rebuilt authentication, the feed, in-app subscriptions and the media pipeline, then shipped releases to both stores.",
    stack: ["React Native", "Expo", "Supabase"],
    image: "/work/storycloud.svg",
  },
  {
    slug: "conversational-platform",
    client: "Jwero.ai",
    title: "Conversational commerce & CRM platform",
    category: "B2B SaaS · Real-time",
    role: "Full-Stack Engineering",
    year: "2023 — 2026",
    summary:
      "Real-time chat, CRM and automation suite used by enterprise retail clients. Built the visual chatbot builder, the API and background-job layer, and led front-end performance work.",
    stack: ["React", "TypeScript", "Node.js", "MongoDB"],
    image: "/work/jwero.svg",
  },
  {
    slug: "mentor-gpt",
    client: "Independent",
    title: "AI mentoring platform",
    category: "AI product · Real-time chat",
    role: "Design & Development",
    year: "2025",
    summary:
      "Persistent, personalised LLM mentor with streaming responses, session memory and live typing indicators.",
    stack: ["Next.js", "Express", "Socket.io", "MongoDB"],
    image: "/work/mentor-gpt.svg",
    href: "https://my-mentor-gpt.vercel.app/",
    source: "https://github.com/Kashifkkd/my-mentor-gpt",
  },
  {
    slug: "teamsync",
    client: "Independent",
    title: "Multi-tenant project management",
    category: "SaaS · Analytics",
    role: "Design & Development",
    year: "2025",
    summary: "Workspace-isolated PM tool with Gantt charts, time tracking, real-time updates and analytics.",
    stack: ["Next.js", "Express", "PostgreSQL"],
    image: "/work/teamsync.svg",
    href: "https://team-sync-lemon.vercel.app/",
    source: "https://github.com/Kashifkkd/TeamSync",
  },
];

export const featuredProjects = projects.slice(0, 5);

export const proof = [
  { value: 3, suffix: "+", label: "years in production engineering" },
  { value: 10, suffix: "+", label: "products shipped to real users" },
  { value: 5, suffix: "+", label: "enterprise clients served" },
  { value: 2, suffix: "", label: "apps live on App Store & Play" },
];

export const services = [
  {
    index: "01",
    title: "Product engineering",
    short: "Web products, end to end",
    blurb:
      "Full-stack web products from first commit to production: Next.js front-ends, Node or Python services, Postgres or Supabase, deployed on Vercel with CI, monitoring and documentation your team can keep.",
    bullets: ["Next.js · React · TypeScript", "APIs, auth, billing, background jobs", "Performance & accessibility budgets", "Handover docs and CI"],
  },
  {
    index: "02",
    title: "AI & LLM integration",
    short: "AI features that ship",
    blurb:
      "Practical AI inside real products: structured outputs, retrieval, evaluation loops and self-hosted open-weight models when the economics call for it. Measured, not magic.",
    bullets: ["OpenAI & Claude APIs", "RAG, structured JSON, eval loops", "vLLM / open-weight deployments", "Cost & latency budgets"],
  },
  {
    index: "03",
    title: "Mobile apps",
    short: "iOS & Android from one codebase",
    blurb:
      "React Native and Expo apps that feel native: offline-aware data, media pipelines, subscriptions and store releases handled end to end.",
    bullets: ["React Native · Expo", "Supabase auth & RLS", "In-app purchases", "App Store & Play releases"],
  },
];

export const process = [
  { step: "01", title: "Call", text: "A 30-minute conversation about the problem, constraints and what done looks like." },
  { step: "02", title: "Plan", text: "A written scope with milestones and a fixed price or weekly rate. No surprises." },
  { step: "03", title: "Build", text: "Weekly demos on a live preview URL. You see progress, not status reports." },
  { step: "04", title: "Ship", text: "Launch, monitoring, documentation and a handover your team can own." },
];

export const experience = [
  {
    period: "2026 — Now",
    role: "Senior Software Engineer",
    company: "D'Vinci Group",
    href: undefined as string | undefined,
    location: "United Kingdom · Remote",
    summary:
      "Backend and platform engineering on a real-time event-intelligence product, plus mobile engineering on a consumer media app shipped to both stores.",
    stack: ["Python", "PostgreSQL", "Next.js", "React Native"],
  },
  {
    period: "2023 — 2026",
    role: "Software Engineer, Full-Stack",
    company: "Tanika Tech Jewels (Jwero.ai)",
    href: "https://jwero.ai",
    location: "Mumbai, India",
    summary:
      "Real-time chat, CRM and automation platforms for enterprise retail clients. Visual chatbot builder, API and background-job layer, front-end performance.",
    stack: ["React", "TypeScript", "Node.js", "MongoDB"],
  },
  {
    period: "2019 — 2023",
    role: "B.E. Computer Engineering",
    company: "Gharda Institute of Technology, Mumbai University",
    href: undefined,
    location: "CGPA 8.57",
    summary: "Data structures, algorithms, DBMS, operating systems, networks, system design.",
    stack: [],
  },
];

// PLACEHOLDER — replace with real client quotes before launch.
export const testimonials = [
  {
    quote:
      "Kashif took over our frontend mid-sprint and didn't miss a beat. He picked up the codebase fast, flagged things we'd been ignoring, and shipped on time.",
    name: "Arjun Nair",
    title: "Tech Lead, Buildspace",
  },
  {
    quote:
      "Good communicator, clean code, and he actually pushed back when our requirements didn't make sense — which I appreciated.",
    name: "Rohan Mehta",
    title: "Founder, StackSprint",
  },
  {
    quote:
      "We needed a dashboard fast and not a mess. Kashif did exactly that, and kept us in the loop the whole time.",
    name: "Sneha Kulkarni",
    title: "Product Designer, Nuvio",
  },
  {
    quote:
      "He joined a React Native project that was already behind schedule, got up to speed in days and helped us get back on track.",
    name: "Farhan Shaikh",
    title: "CTO, AppCraft Studios",
  },
];

export const facts = [
  { k: "Response time", v: "< 1 business day" },
  { k: "Time zones", v: "IST · overlaps UK, EU, US-East" },
  { k: "Engagements", v: "Fixed scope or weekly" },
  { k: "Tooling", v: "Linear · GitHub · Slack · Loom" },
  { k: "NDA", v: "Happy to sign before we talk" },
  { k: "Handover", v: "Docs, CI and a recorded walkthrough" },
];

export const faq = [
  { q: "What does a project cost?", a: "Fixed-scope builds typically start around a few thousand USD for a focused product or integration and scale with scope. Embedded work is billed weekly. You get a written number before any work starts, never an hourly surprise." },
  { q: "How fast can you start, and how long do things take?", a: "I usually start within one to two weeks of a signed plan. A focused MVP or integration lands in 3–6 weeks; larger platforms run in milestones with a demo every week." },
  { q: "Do you work with agencies and existing teams?", a: "Yes. A good share of my work is white-label delivery for agencies or joining an in-house team mid-project. I fit into your tooling and ceremonies rather than imposing mine." },
  { q: "Can you handle both the app and the backend?", a: "That's the point. Next.js or React Native on the front, Node or Python with Postgres or Supabase behind it, deployed and monitored. One person accountable for the whole thing." },
  { q: "What about AI features?", a: "I ship them inside real products with evaluation loops and cost budgets, using OpenAI, Claude or self-hosted open-weight models depending on the economics. I'll tell you honestly when a feature doesn't need an LLM." },
  { q: "How do we start?", a: "Book a 30-minute call. If it's a fit, you get a written plan with milestones and a price within a few days." },
];

export const marquee = ["Available for select projects", "Next.js", "React Native", "AI / LLM", "Node & Python", "Supabase", "Based in Mumbai, working worldwide"];

export const stack = [
  "TypeScript", "React", "Next.js", "React Native", "Node.js", "Python",
  "PostgreSQL", "Supabase", "MongoDB", "Tailwind", "GSAP",
  "OpenAI / Claude APIs", "vLLM", "Docker", "Vercel",
];
