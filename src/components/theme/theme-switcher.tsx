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
  { mode: "light", label: "Light theme", icon: Sun },
  { mode: "system", label: "System theme", icon: Monitor },
  { mode: "dark", label: "Dark theme", icon: Moon },
];

export function ThemeSwitcher({ className, compact = false }: ThemeSwitcherProps) {
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme selection"
      className={cn(
        "relative inline-flex items-center rounded-full p-1 border transition-all duration-300",
        "bg-foreground/[0.04] border-foreground/10 backdrop-blur-md",
        compact ? "h-8" : "h-9",
        className
      )}
    >
      {THEME_OPTIONS.map(({ mode, label, icon: Icon }) => {
        const isSelected = themeMode === mode;
        const isLightActive = isSelected && (mode === "light" || (mode === "system" && resolvedTheme === "light"));

        return (
          <button
            key={mode}
            role="radio"
            aria-checked={isSelected}
            aria-label={label}
            title={label}
            onClick={() => setThemeMode(mode)}
            className={cn(
              "relative z-10 flex items-center justify-center rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary",
              compact ? "h-6 w-6 px-1" : "h-7 w-7 sm:w-8 px-1.5",
              isSelected
                ? isLightActive
                  ? "text-[#FF6B00]"
                  : "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isSelected && (
              <motion.span
                layoutId="themeActiveIndicator"
                className={cn(
                  "absolute inset-0 rounded-full shadow-sm",
                  isLightActive
                    ? "bg-white ring-1 ring-[#FF6B00]/30 shadow-orange-500/10"
                    : "bg-background/90 ring-1 ring-foreground/10 shadow-black/10"
                )}
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
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
