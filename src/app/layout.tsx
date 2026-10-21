import { Allura, Geist, Geist_Mono, Instrument_Serif, Kalam, Martian_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/v2/SmoothScroll";
import NavGate from "@/components/v2/NavGate";
import { profile } from "@/lib/site";
import RefTracker from "./RefTracker";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

// v4 home page faces (Clash Display + Satoshi are linked from Fontshare below)
const kalam = Kalam({ variable: "--font-kalam", subsets: ["latin"], weight: ["400", "700"] });
const martian = Martian_Mono({ variable: "--font-martian", subsets: ["latin"], weight: ["400", "500"] });
const allura = Allura({ variable: "--font-allura", subsets: ["latin"], weight: "400" });

const title = `${profile.name} - ${profile.role}`;
const description =
  "Senior full-stack engineer building web and mobile products with AI/LLM integrations. Next.js, React Native, Node, Python, Supabase. Available for select projects.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description,
  keywords: [
    "Kashif Deshmukh", "Senior Software Engineer", "Full-Stack Developer", "Next.js",
    "React Native", "AI integration", "LLM", "Freelance developer", "Mumbai",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.siteUrl,
    siteName: profile.name,
    title,
    description,
    images: [{ url: "/kashif-headshot.jpg", width: 1024, height: 1024, alt: profile.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/kashif-headshot.jpg"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    url: profile.siteUrl,
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
    sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/kashif-headshot.jpg" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} ${kalam.variable} ${martian.variable} ${allura.variable}`}>
        {/* data-theme drives the v4 page palette; the `dark` class stays put for the v2 routes */}
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <a href="#main" className="skip-link">Skip to content</a>
          <SmoothScroll>
            <NavGate />
            {children}
          </SmoothScroll>
          <Analytics />
          <RefTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
