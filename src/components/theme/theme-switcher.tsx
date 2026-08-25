"use client";

import { motion } from "framer-motion";
import { Sun, Monitor, Moon } from "lucide-react";
import { useTheme, type ThemeMode } from "./theme-provider";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  className?: string;
  compact?: boolean;
}

interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const THEME_OPTIONS: ThemeOption[] = [
  { mode: "light", label: "Light Theme", icon: Sun },
  { mode: "system", label: "System Theme (Auto)", icon: Monitor },
  { mode: "dark", label: "Dark Theme", icon: Moon },
];

export function ThemeSwitcher({ className, compact = false }: ThemeSwitcherProps) {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="OS Color Theme Selection"
      className={cn(
        "relative inline-flex items-center rounded-full p-0.5 sm:p-1 border transition-all duration-300",
        "bg-foreground/[0.04] dark:bg-foreground/[0.06] border-border/70 backdrop-blur-xl shadow-inner",
        compact ? "h-8" : "h-9",
        className
      )}
    >
      {THEME_OPTIONS.map(({ mode, label, icon: Icon }) => {
        const isSelected = themeMode === mode;

        let activeColor = "text-foreground";
        if (isSelected) {
          if (mode === "light" || (mode === "system" && resolvedTheme === "light")) {
            activeColor = "text-[#FF6B00]";
          } else if (mode === "dark" || (mode === "system" && resolvedTheme === "dark")) {
            activeColor = "text-indigo-400 dark:text-indigo-300";
          }
        }

        return (
          <button
            key={mode}
            role="radio"
            aria-checked={isSelected}
            aria-label={label}
            title={label}
            onClick={() => setThemeMode(mode)}
            className={cn(
              "relative z-10 flex items-center justify-center rounded-full transition-all duration-200 outline-none",
              "focus-visible:ring-2 focus-visible:ring-primary/60",
              compact ? "h-6 w-7 px-1" : "h-7 w-8 px-1.5",
              isSelected
                ? activeColor
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isSelected && (
              <motion.span
                layoutId="osThemeActivePill"
                className={cn(
                  "absolute inset-0 rounded-full shadow-sm",
                  resolvedTheme === "light"
                    ? "bg-white ring-1 ring-black/5 shadow-md shadow-slate-200/50"
                    : "bg-[#1E2230] ring-1 ring-white/10 shadow-md shadow-black/40"
                )}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center">
              <Icon size={compact ? 13 : 15} className="transition-transform duration-200" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
