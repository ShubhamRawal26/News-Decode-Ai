"use client";

import { Sparkles, Globe2, Twitter, Github, Linkedin, Rss } from "lucide-react";
import { CATEGORIES } from "@/lib/news";
import { useAppStore } from "@/store/use-app-store";

export function Footer() {
  const go = useAppStore((s) => s.go);
  return (
    <footer className="mt-auto relative pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="glass-strong rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6366f1,#a855f7)] shadow-lg shadow-violet-500/30">
                  <Sparkles size={18} className="text-white" />
                </span>
                <span className="font-semibold tracking-tight">
                  NewsDecoded<span className="text-gradient">AI</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                AI-powered news intelligence that explains what actually matters — in minutes.
              </p>
              <div className="flex items-center gap-2 mt-5">
                {[Twitter, Github, Linkedin, Rss].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="social link"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Categories</h4>
              <ul className="space-y-2.5">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <button
                      onClick={() => go({ name: "category", slug: c.slug })}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Product</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Dashboard", v: { name: "dashboard" } as const },
                  { label: "Today's brief", v: { name: "home" } as const },
                  { label: "Breaking news", v: { name: "home" } as const },
                  { label: "AI analysis", v: { name: "home" } as const },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => go(item.v)}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mission */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Mission</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                We cut through the noise. Every story is decoded with context, impact, and foresight — so you understand the world, faster.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Globe2 size={12} />
                <span>Scanning 2,400+ sources</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-foreground/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} NewsDecodedAI. Intelligence, decoded.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="/rss.xml" className="hover:text-foreground transition-colors">RSS</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
