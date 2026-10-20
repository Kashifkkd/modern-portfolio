import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/v2/SmoothScroll";
import Nav from "@/components/v2/Nav";
import { profile } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});

const title = `${profile.name} — ${profile.role}`;
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
    images: [{ url: "/kashif_profile_img.jpeg", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/kashif_profile_img.jpeg"] },
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
        <link rel="apple-touch-icon" href="/kashif_profile_img.jpeg" />
        <meta name="theme-color" content="#0a0a0a" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable}`}>
        <a href="#main" className="skip-link">Skip to content</a>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
