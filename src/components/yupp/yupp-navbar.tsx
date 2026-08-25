"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, LogIn, Menu, X } from "lucide-react";
import { YuppLogo } from "./yupp-logo";
import { useAppStore } from "@/store/use-app-store";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { useAuth } from "@/components/auth/auth-provider";
import { CATEGORIES } from "@/lib/news";
import { cn } from "@/lib/utils";

interface YuppNavbarProps {
  onSearchOpen: () => void;
  onAuthOpen: () => void;
}

export function YuppNavbar({ onSearchOpen, onAuthOpen }: YuppNavbarProps) {
  const { view, go } = useAppStore();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home", action: () => go({ name: "home" }) },
    { id: "leaderboard", label: "Leaderboard", action: () => { go({ name: "home" }); document.getElementById("yupp-leaderboard")?.scrollIntoView({ behavior: "smooth" }); } },
    { id: "feed", label: "Intelligence", action: () => { go({ name: "home" }); document.getElementById("yupp-feed")?.scrollIntoView({ behavior: "smooth" }); } },
    { id: "dashboard", label: "Library", action: () => go({ name: "dashboard" }) },
  ];

  return (
    <header className="sticky top-4 inset-x-0 z-50 mx-auto max-w-7xl px-4 sm:px-6">
      <div className="rounded-full glass border border-white/80 dark:border-white/10 shadow-lg px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left Nav Pills */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = view.name === item.id || (item.id === "home" && view.name === "home");

            return (
              <button
                key={item.id}
                onClick={item.action}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                  isActive
                    ? "bg-card text-[#E04E15] shadow-sm font-bold ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full hover:bg-secondary text-foreground"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Center Yupp Brand Logo */}
        <button onClick={() => go({ name: "home" })} className="outline-none">
          <YuppLogo size={28} showText={true} />
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onSearchOpen}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
          >
            <Search size={13} />
            <span>Search</span>
            <kbd className="text-[9px] bg-card px-1 py-0.2 rounded border border-border font-mono">⌘K</kbd>
          </button>

          <ThemeSwitcher compact />

          {user ? (
            <button
              onClick={() => go({ name: "dashboard" })}
              className="h-8 w-8 rounded-full bg-[#E04E15] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-orange-900/10"
            >
              {user.email?.[0]?.toUpperCase() || "U"}
            </button>
          ) : (
            <button
              onClick={onAuthOpen}
              className="btn-yupp-primary text-xs py-1.5 px-4 shadow-sm"
            >
              <LogIn size={13} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-3xl glass border border-border shadow-xl space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => { item.action(); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2.5 rounded-2xl text-xs font-semibold hover:bg-secondary text-foreground"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-border flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => { go({ name: "category", slug: c.slug }); setMobileMenuOpen(false); }}
                className="px-3 py-1 rounded-full bg-secondary text-[11px] font-medium"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
