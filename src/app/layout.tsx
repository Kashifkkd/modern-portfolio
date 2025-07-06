import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`min-h-screen bg-background text-foreground antialiased transition-colors duration-500 ${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <main className="pt-20 px-2">
          {children}
        </main>
      </body>
    </html>
  );
}
