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

  const handleNav = (target: "home" | "intelligence" | "dashboard") => {
    if (target === "home") {
      go({ name: "home" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "intelligence") {
      go({ name: "home" });
      setTimeout(() => {
        document.getElementById("decoded-feed")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } else if (target === "dashboard") {
      go({ name: "dashboard" });
    }
  };

  const navLinks = [
    { id: "home", label: "Home", active: view.name === "home", action: () => handleNav("home") },
    { id: "intelligence", label: "Intelligence", active: false, action: () => handleNav("intelligence") },
    { id: "dashboard", label: "Library", active: view.name === "dashboard", action: () => handleNav("dashboard") },
  ];

  return (
    <header className="sticky top-4 inset-x-0 z-50 mx-auto max-w-7xl px-4 sm:px-6">
      <div className="rounded-full bg-card/90 dark:bg-card/80 backdrop-blur-xl border border-border/80 shadow-lg px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left Nav Pills */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                item.active
                  ? "bg-[#E04E15]/10 text-[#E04E15] font-bold ring-1 ring-[#E04E15]/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-full hover:bg-secondary text-foreground"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Center Yupp Brand Logo */}
        <button onClick={() => handleNav("home")} className="outline-none">
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
              onClick={() => handleNav("dashboard")}
              className="h-8 w-8 rounded-full bg-[#E04E15] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-orange-900/20 ring-2 ring-[#E04E15]/20"
              title="View your intelligence library"
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
        <div className="md:hidden mt-2 p-4 rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-xl space-y-2">
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
                className="px-3 py-1 rounded-full bg-secondary text-[11px] font-medium text-foreground hover:bg-[#E04E15]/10 hover:text-[#E04E15] transition-colors"
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
