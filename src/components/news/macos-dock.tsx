"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, Globe2, Briefcase, Cpu, Landmark,
  TrendingUp, LayoutDashboard, Calendar, Search,
  Sun, Moon, Monitor
} from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

interface DockItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  active?: boolean;
}

export function MacOSDock({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const { view, go } = useAppStore();
  const { themeMode, setThemeMode, resolvedTheme } = useTheme();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleTheme = () => {
    if (themeMode === "light") setThemeMode("dark");
    else if (themeMode === "dark") setThemeMode("system");
    else setThemeMode("light");
  };

  const dockItems: DockItem[] = [
    {
      id: "home",
      label: "Today's Edition",
      icon: Compass,
      action: () => go({ name: "home" }),
      active: view.name === "home",
    },
    {
      id: "world",
      label: "World News",
      icon: Globe2,
      action: () => go({ name: "category", slug: "world" }),
      active: view.name === "category" && view.slug === "world",
    },
    {
      id: "business",
      label: "Business",
      icon: Briefcase,
      action: () => go({ name: "category", slug: "business" }),
      active: view.name === "category" && view.slug === "business",
    },
    {
      id: "ai-tech",
      label: "AI & Tech",
      icon: Cpu,
      action: () => go({ name: "category", slug: "ai-tech" }),
      active: view.name === "category" && view.slug === "ai-tech",
    },
    {
      id: "politics",
      label: "Politics",
      icon: Landmark,
      action: () => go({ name: "category", slug: "politics" }),
      active: view.name === "category" && view.slug === "politics",
    },
    {
      id: "markets",
      label: "Markets",
      icon: TrendingUp,
      action: () => go({ name: "category", slug: "markets" }),
      active: view.name === "category" && view.slug === "markets",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      action: () => go({ name: "dashboard" }),
      active: view.name === "dashboard",
    },
    {
      id: "search",
      label: "Search Spotlight",
      icon: Search,
      action: () => onSearchOpen?.(),
    },
  ];

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <div className="pointer-events-auto p-1.5 sm:p-2 rounded-2xl glass-strong border border-border/80 shadow-2xl flex items-end gap-1 sm:gap-2">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isHovered = hoveredId === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute -top-7 px-2.5 py-0.5 rounded-lg glass-strong text-[11px] font-medium text-foreground whitespace-nowrap shadow-lg border border-border pointer-events-none z-50"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dock Icon Button */}
              <motion.button
                whileHover={{ scale: 1.22, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                onClick={item.action}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={item.label}
                className={cn(
                  "relative h-9 w-9 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center transition-all duration-200",
                  item.active
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "bg-foreground/[0.04] hover:bg-foreground/[0.08] text-foreground/80 hover:text-foreground"
                )}
              >
                <Icon size={18} />
                {item.active && (
                  <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-primary" />
                )}
              </motion.button>
            </div>
          );
        })}

        {/* Separator */}
        <div className="h-7 w-px bg-border/80 self-center mx-0.5" />

        {/* Theme switcher dock item */}
        <div className="relative flex flex-col items-center">
          <AnimatePresence>
            {hoveredId === "theme" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute -top-7 px-2.5 py-0.5 rounded-lg glass-strong text-[11px] font-medium text-foreground whitespace-nowrap shadow-lg border border-border pointer-events-none z-50"
              >
                Theme: {themeMode.toUpperCase()}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.22, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            onClick={toggleTheme}
            onMouseEnter={() => setHoveredId("theme")}
            onMouseLeave={() => setHoveredId(null)}
            aria-label="Toggle OS Theme"
            className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center bg-foreground/[0.04] hover:bg-foreground/[0.08] text-foreground/80 hover:text-foreground transition-all"
          >
            {resolvedTheme === "dark" ? (
              <Moon size={18} className="text-indigo-400" />
            ) : (
              <Sun size={18} className="text-[#FF9500]" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
