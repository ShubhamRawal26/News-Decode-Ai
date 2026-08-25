"use client";

import { useState } from "react";
import {
  Search, Zap, Newspaper, Trophy, Sparkles,
  SlidersHorizontal, Menu, X, Command
} from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { cn } from "@/lib/utils";

interface YuppTopbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  quickTakeActive: boolean;
  setQuickTakeActive: (val: boolean) => void;
  onSearchOpen: () => void;
  onMobileMenuToggle: () => void;
}

export function YuppTopbar({
  activeTab,
  setActiveTab,
  quickTakeActive,
  setQuickTakeActive,
  onSearchOpen,
  onMobileMenuToggle,
}: YuppTopbarProps) {
  const go = useAppStore((s) => s.go);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Mobile Menu & Logo */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={onMobileMenuToggle}
          className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-foreground"
        >
          <Menu size={18} />
        </button>
        <button onClick={() => go({ name: "home" })} className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white">
            <Sparkles size={16} />
          </div>
          <span className="font-bold text-sm">Yupp AI</span>
        </button>
      </div>

      {/* Center Segmented View Switcher */}
      <div className="hidden sm:flex items-center p-1 rounded-2xl bg-secondary/80 border border-border shadow-inner">
        <button
          onClick={() => setActiveTab("arena")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all",
            activeTab === "arena"
              ? "bg-card text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Zap size={13} className={activeTab === "arena" ? "text-primary" : ""} />
          <span>Model Arena</span>
        </button>
        <button
          onClick={() => setActiveTab("feed")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all",
            activeTab === "feed"
              ? "bg-card text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Newspaper size={13} className={activeTab === "feed" ? "text-primary" : ""} />
          <span>Feed View</span>
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={cn(
            "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all",
            activeTab === "leaderboard"
              ? "bg-card text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Trophy size={13} className={activeTab === "leaderboard" ? "text-primary" : ""} />
          <span>Leaderboard</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* QuickTake 140 Toggle */}
        <button
          onClick={() => setQuickTakeActive(!quickTakeActive)}
          className={cn(
            "hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all",
            quickTakeActive
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold"
              : "bg-secondary border-border text-muted-foreground hover:text-foreground"
          )}
          title="Toggle QuickTake 140-char summary compression"
        >
          <Zap size={13} className={quickTakeActive ? "fill-current" : ""} />
          <span>QuickTake Mode</span>
        </button>

        {/* Search button */}
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary hover:bg-foreground/10 text-muted-foreground hover:text-foreground text-xs transition-colors border border-border"
        >
          <Search size={14} />
          <span className="hidden lg:inline">Search intelligence...</span>
          <kbd className="hidden sm:inline text-[10px] bg-card px-1.5 py-0.5 rounded border border-border font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Theme Switcher */}
        <ThemeSwitcher compact />
      </div>
    </header>
  );
}
