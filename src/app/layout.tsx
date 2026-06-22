import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newsdecoded.ai"),
  title: {
    default: "NewsDecodedAI — Understand What Actually Matters",
    template: "%s · NewsDecodedAI",
  },
  description:
    "AI scans thousands of sources and explains the world's most important stories in minutes. Premium AI-powered news intelligence.",
  keywords: [
    "AI news",
    "news intelligence",
    "breaking news",
    "world news",
    "business news",
    "AI technology",
    "politics",
    "markets",
    "impact analysis",
  ],
  authors: [{ name: "NewsDecodedAI" }],
  creator: "NewsDecodedAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newsdecoded.ai",
    siteName: "NewsDecodedAI",
    title: "NewsDecodedAI — Understand What Actually Matters",
    description:
      "AI scans thousands of sources and explains the world's most important stories in minutes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewsDecodedAI — Understand What Actually Matters",
    description:
      "AI scans thousands of sources and explains the world's most important stories in minutes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "NewsDecodedAI",
    description:
      "AI-powered news intelligence platform that explains the world's most important stories.",
    url: "https://newsdecoded.ai",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="bottom-right" />
      </body>
    </html>
  );
}
