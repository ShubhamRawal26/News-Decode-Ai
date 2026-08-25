"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Search, Wifi, Battery, Command,
  Calendar, LayoutDashboard, Sliders, ChevronDown, Check
} from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { useTheme } from "@/components/theme/theme-provider";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { CATEGORIES } from "@/lib/news";
import { cn } from "@/lib/utils";

export function MacOSMenuBar({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const { go, view } = useAppStore();
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  const [time, setTime] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const closeMenu = () => setActiveMenu(null);

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-7 macos-menubar px-3 sm:px-4 flex items-center justify-between text-xs font-medium text-foreground select-none">
      {/* Left Menu Items */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Apple/Brand Logo */}
        <button
          onClick={() => go({ name: "home" })}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-foreground/10 transition-colors font-semibold"
        >
          <Sparkles size={13} className="text-primary fill-current" />
          <span className="hidden sm:inline">NewsDecoded</span>
        </button>

        {/* Lenses Menu */}
        <div className="relative">
          <button
            onClick={() => setActiveMenu(activeMenu === "lenses" ? null : "lenses")}
            className={cn(
              "px-2 py-0.5 rounded hover:bg-foreground/10 transition-colors flex items-center gap-1",
              activeMenu === "lenses" && "bg-foreground/10"
            )}
          >
            <span>Lenses</span>
            <ChevronDown size={10} className="opacity-60" />
          </button>
          <AnimatePresence>
            {activeMenu === "lenses" && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeMenu} />
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  className="absolute left-0 top-6 z-50 w-52 glass-strong rounded-xl p-1.5 shadow-2xl border border-border"
                >
                  <div className="px-2 py-1 text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                    Category Lenses
                  </div>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => {
                        go({ name: "category", slug: c.slug });
                        closeMenu();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-primary hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span>{c.label}</span>
                      {view.name === "category" && view.slug === c.slug && <Check size={12} />}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* View Menu */}
        <div className="relative">
          <button
            onClick={() => setActiveMenu(activeMenu === "view" ? null : "view")}
            className={cn(
              "px-2 py-0.5 rounded hover:bg-foreground/10 transition-colors flex items-center gap-1",
              activeMenu === "view" && "bg-foreground/10"
            )}
          >
            <span>View</span>
            <ChevronDown size={10} className="opacity-60" />
          </button>
          <AnimatePresence>
            {activeMenu === "view" && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeMenu} />
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  className="absolute left-0 top-6 z-50 w-48 glass-strong rounded-xl p-1.5 shadow-2xl border border-border"
                >
                  <button
                    onClick={() => { go({ name: "home" }); closeMenu(); }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-primary hover:text-white transition-colors"
                  >
                    Today&apos;s Edition
                  </button>
                  <button
                    onClick={() => { go({ name: "dashboard" }); closeMenu(); }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-primary hover:text-white transition-colors"
                  >
                    User Dashboard
                  </button>
                  <div className="my-1 h-px bg-border" />
                  <button
                    onClick={() => {
                      document.getElementById("macos-widgets")?.scrollIntoView({ behavior: "smooth" });
                      closeMenu();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-primary hover:text-white transition-colors"
                  >
                    Widgets Center
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Status Items (macOS Control Center & Clock) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Spotlight search trigger */}
        <button
          onClick={onSearchOpen}
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
          title="Search Spotlight (Cmd+K)"
        >
          <Search size={12} />
          <span className="hidden md:inline text-[10px] opacity-70">Search</span>
        </button>

        {/* Wi-Fi & Battery Status */}
        <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
          <Wifi size={13} className="text-foreground" />
          <div className="flex items-center gap-1">
            <span className="text-[10px]">100%</span>
            <Battery size={13} className="text-foreground" />
          </div>
        </div>

        {/* Control Center Theme Switcher */}
        <div className="inline-flex items-center">
          <ThemeSwitcher compact />
        </div>

        {/* Live Date / Time Clock */}
        <div className="px-1.5 py-0.5 text-[11px] font-medium tracking-tight text-foreground/90 whitespace-nowrap">
          {time || "Loading..."}
        </div>
      </div>
    </div>
  );
}
