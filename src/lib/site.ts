// Single source of truth for portfolio content.
// Items marked PLACEHOLDER should be replaced with real data before launch.

export const profile = {
  name: "Kashif Deshmukh",
  firstName: "Kashif",
  role: "Senior Software Engineer",
  tagline: "Full-Stack · AI/LLM Integrations · Mobile",
  positioning:
    "I design and build products that turn messy real-world data into things people can actually use — from a platform that clusters 150k news signals a day into live events, to mobile apps shipped on both stores.",
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
  title: string; // result-first
  role: string;
  year: string;
  summary: string;
  stack: string[];
  image: string;
  href?: string;
  source?: string;
  result?: string; // one measurable line
};

export const projects: Project[] = [
  {
    slug: "firesight",
    client: "D'Vinci Group · Firesight",
    title: "Clustering 150k news signals a day into live, reviewable events",
    role: "Backend & Platform Engineering",
    year: "2026",
    summary:
      "Core event-formation service that ingests ~150k news signals daily and forms real-world events in near real time, plus the Intelligence Management System operators use to review and enrich them.",
    stack: ["Python", "RabbitMQ", "Supabase", "PostgreSQL", "Next.js"],
    image: "/work/firesight.svg",
    result: "~150k signals/day, near real-time",
  },
  {
    slug: "storycloud",
    client: "D'Vinci Group · StoryCloud",
    title: "Smooth media stories on iOS and Android, with subscriptions that work",
    role: "Mobile Engineering",
    year: "2026",
    summary:
      "Took over an existing React Native app and rebuilt auth with Supabase row-level security, a paginated feed, in-app subscriptions and a media pipeline with caching, prefetching and lazy loading.",
    stack: ["React Native", "Expo", "Supabase", "Edge Functions"],
    image: "/work/storycloud.svg",
    result: "Shipped to App Store & Play",
  },
  {
    slug: "jwero",
    client: "Jwero.ai",
    title: "A low-code chatbot builder that cut client setup time by 40%",
    role: "Full-Stack Engineering",
    year: "2023 — 2026",
    summary:
      "Real-time chat, CRM and automation platform used by 5+ enterprise clients. Built the React Flow chatbot builder, optimised the Material UI front-end (35% faster loads) and the API/background-job layer (30% faster processing, 20% lower server cost).",
    stack: ["React", "TypeScript", "Node.js", "MongoDB", "React Flow"],
    image: "/work/jwero.svg",
    result: "−40% setup time · −35% load time",
  },
  {
    slug: "mentor-gpt",
    client: "Personal",
    title: "An AI mentor you can talk to in real time",
    role: "Design & Development",
    year: "2025",
    summary:
      "GPT-backed mentoring platform with persistent context, streaming responses, typing indicators and session management over Socket.io and MongoDB.",
    stack: ["Next.js", "Express", "Socket.io", "MongoDB"],
    image: "/work/mentor-gpt.svg",
    href: "https://my-mentor-gpt.vercel.app/",
    source: "https://github.com/Kashifkkd/my-mentor-gpt",
  },
  {
    slug: "teamsync",
    client: "Personal",
    title: "Multi-company project management with Gantt, time tracking and live updates",
    role: "Design & Development",
    year: "2025",
    summary:
      "Workspace-isolated PM tool with Gantt charts, time tracking, real-time updates and analytics.",
    stack: ["Next.js", "Express", "PostgreSQL", "Firebase"],
    image: "/work/teamsync.svg",
    href: "https://team-sync-lemon.vercel.app/",
    source: "https://github.com/Kashifkkd/TeamSync",
  },
  {
    slug: "akg",
    client: "AKG Sons Infra",
    title: "A fast, premium web presence for a civil construction firm",
    role: "Design & Development",
    year: "2025",
    summary: "Marketing site with high-resolution visuals, premium typography and motion.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Motion"],
    image: "/work/teamsync.svg",
    href: "https://akg-construction-website.vercel.app/",
    source: "https://github.com/Kashifkkd/akg-construction-website",
  },
  {
    slug: "celiac",
    client: "The Celiac Store",
    title: "Rebuilding a gluten-free marketplace for speed and accessibility",
    role: "Full-Stack Development",
    year: "2024",
    summary: "Next.js storefront over a Node.js API and MongoDB catalog, tuned for accessibility.",
    stack: ["Next.js", "Node.js", "MongoDB"],
    image: "/celiac_website.png",
    href: "https://theceliacstore-fe.vercel.app/",
  },
];

export const featuredProjects = projects.slice(0, 4);

export const proof = [
  { value: 150, suffix: "k", label: "news signals processed per day" },
  { value: 35, suffix: "%", label: "faster front-end load times" },
  { value: 5, suffix: "+", label: "enterprise clients served" },
  { value: 3, suffix: "", label: "years shipping production software" },
];

export const services = [
  {
    index: "01",
    title: "Product engineering",
    blurb:
      "Full-stack web products from first commit to production. Next.js, Node, Postgres or Supabase, deployed on Vercel with CI, monitoring and documentation your team can keep.",
    bullets: ["Next.js / React / TypeScript", "APIs, auth, billing, background jobs", "Performance and accessibility budgets"],
  },
  {
    index: "02",
    title: "AI & LLM integration",
    blurb:
      "Practical AI features inside real products: structured outputs, retrieval, evaluation loops and self-hosted open-weight models when the economics call for it.",
    bullets: ["OpenAI & Claude APIs", "RAG, structured JSON, eval loops", "vLLM / open-weight deployments"],
  },
  {
    index: "03",
    title: "Mobile apps",
    blurb:
      "React Native and Expo apps that feel native, with offline-aware data, media pipelines, subscriptions and store releases handled end to end.",
    bullets: ["React Native / Expo", "Supabase auth & RLS", "App Store & Play releases"],
  },
];

export const experience = [
  {
    period: "Sep 2026 — Present",
    role: "Senior Software Engineer",
    company: "D'Vinci Group",
    href: undefined as string | undefined,
    location: "United Kingdom · Remote",
    summary:
      "Event-intelligence platform (Firesight / Meridian House) and the StoryCloud mobile app. Core event-formation service, operator IMS, mobile auth and media pipeline.",
    stack: ["Python", "RabbitMQ", "Supabase", "Next.js", "React Native"],
  },
  {
    period: "Sep 2023 — Aug 2026",
    role: "Software Engineer, Full-Stack",
    company: "Tanika Tech Jewels (Jwero.ai)",
    href: "https://jwero.ai",
    location: "Mumbai, India",
    summary:
      "Real-time chat, CRM and automation platforms for 5+ enterprise clients. Low-code chatbot builder, REST APIs and background jobs, Material UI front-end performance.",
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
];

export const stack = [
  "TypeScript", "React", "Next.js", "React Native", "Node.js", "Python",
  "PostgreSQL", "Supabase", "MongoDB", "RabbitMQ", "Tailwind", "GSAP",
  "OpenAI / Claude APIs", "vLLM", "Docker", "Vercel",
];
