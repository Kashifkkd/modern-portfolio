import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kashif Deshmukh - Full Stack Developer Portfolio",
  description: "Full Stack Developer specializing in React, Next.js, React Native, and Node.js. I create modern, scalable web and mobile applications that solve real-world problems.",
  keywords: [
    "Kashif Deshmukh",
    "Full Stack Developer",
    "React Developer",
    "Next.js Expert",
    "React Native",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Web Developer",
    "Mobile App Developer",
    "UI/UX",
    "Portfolio"
  ],
  authors: [{ name: "Kashif Deshmukh" }],
  creator: "Kashif Deshmukh",
  publisher: "Kashif Deshmukh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kashif-portfolio.vercel.app",
    siteName: "Kashif Deshmukh Portfolio",
    title: "Kashif Deshmukh - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, React Native, and Node.js. I create modern, scalable web and mobile applications.",
    images: [
      {
        url: "/kashif_profile_img.jpeg",
        width: 1200,
        height: 630,
        alt: "Kashif Deshmukh - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashif Deshmukh - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, React Native, and Node.js. Building modern web and mobile applications.",
    images: ["/kashif_profile_img.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/kashif_profile_img.jpeg" />
        <meta name="theme-color" content="#00C6FB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`bg-background h-full w-full text-foreground antialiased transition-colors duration-500 ${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
