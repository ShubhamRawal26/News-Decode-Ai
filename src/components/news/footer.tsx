"use client";

import { Sparkles, Globe2, Twitter, Github, Linkedin, Rss, ExternalLink } from "lucide-react";
import { CATEGORIES } from "@/lib/news";
import { useAppStore } from "@/store/use-app-store";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { useTheme } from "@/components/theme/theme-provider";
import { YuppLogo } from "@/components/yupp/yupp-logo";

const NEXGEN_LIGHT_LOGO = "https://res.cloudinary.com/sahbncq8/image/upload/v1786081222/NexG1en_alefcv.png";
const NEXGEN_DARK_LOGO = "https://res.cloudinary.com/sahbncq8/image/upload/v1786076819/NexGen_vzsaqb.png";

export function Footer() {
  const go = useAppStore((s) => s.go);
  const { resolvedTheme } = useTheme();

  const logoSrc = resolvedTheme === "dark" ? NEXGEN_DARK_LOGO : NEXGEN_LIGHT_LOGO;

  return (
    <footer className="mt-auto relative pt-12 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="yupp-card-white p-8 sm:p-12 mb-8 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <YuppLogo size={30} showText={true} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Multi-model intelligence platform decoding what actually matters with objective impact scores, comparative reasoning, and foresight.
              </p>
              <div className="flex items-center gap-2 mt-5">
                {[
                  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { Icon: Github, href: "https://github.com", label: "GitHub" },
                  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { Icon: Rss, href: "/rss.xml", label: "RSS Feed" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={label}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Lenses</h4>
              <ul className="space-y-2.5">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <button
                      onClick={() => go({ name: "category", slug: c.slug })}
                      className="text-sm text-foreground/80 hover:text-[#E04E15] font-medium transition-colors"
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Workspaces</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Model Arena", v: { name: "home" } as const },
                  { label: "Intelligence Feed", v: { name: "home" } as const },
                  { label: "Model Leaderboard", v: { name: "home" } as const },
                  { label: "Saved Library", v: { name: "dashboard" } as const },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => go(item.v)}
                      className="text-sm text-foreground/80 hover:text-[#E04E15] font-medium transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mission & Theme Switcher */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Mission</h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  We cut through the noise. Every story is decoded with multi-model consensus, impact scores, and causal foresight.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Globe2 size={13} className="text-[#E04E15]" />
                  <span>Scanning 2,400+ verified sources</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-semibold">Appearance</span>
                <ThemeSwitcher compact />
              </div>
            </div>
          </div>

          {/* Bottom Divider & NexGen Digital Attribution */}
          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
              <a
                href="https://nexgendigital.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 transition-opacity hover:opacity-80 shrink-0"
                aria-label="NexGen Digital"
              >
                <img
                  src={logoSrc}
                  alt="NexGen Digital Logo"
                  className="h-6 w-auto object-contain transition-all"
                  loading="lazy"
                />
              </a>
              <div className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold">© 2026 NexGen Digital. All Rights Reserved.</span>
                <span className="hidden sm:inline"> · </span>
                <span className="block sm:inline">Crafted for simplicity and performance.</span>
                <span className="hidden sm:inline"> · </span>
                <a
                  href="https://nexgendigital.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-[#E04E15] transition-colors"
                >
                  Built by NexGen Digital • nexgendigital.tech <ExternalLink size={11} />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="/rss.xml" className="hover:text-foreground transition-colors">RSS Feed</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
