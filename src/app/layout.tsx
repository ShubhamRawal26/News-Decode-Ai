import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth/auth-provider";
import { UserSync } from "@/components/auth/user-sync";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
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
        className={`${jakarta.variable} ${serif.variable} font-sans antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <UserSync />
          {children}
        </AuthProvider>
        <Toaster />
        <SonnerToaster position="bottom-right" />
      </body>
    </html>
  );
}
