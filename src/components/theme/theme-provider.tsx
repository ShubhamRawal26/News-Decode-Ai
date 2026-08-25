"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ThemeMode = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "theme-mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");
  const [mounted, setMounted] = useState(false);

  // Determine system preference
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  // Apply theme classes to document element
  const applyTheme = useCallback((mode: ThemeMode) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const isDark = mode === "dark" || (mode === "system" && getSystemTheme() === "dark");
    const activeResolved: ResolvedTheme = isDark ? "dark" : "light";

    root.classList.remove("light", "dark");
    root.classList.add(activeResolved);
    root.style.colorScheme = activeResolved;

    setResolvedTheme(activeResolved);
  }, [getSystemTheme]);

  // Initial load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    const initialMode: ThemeMode = saved === "dark" || saved === "light" || saved === "system" ? saved : "system";
    setThemeModeState(initialMode);
    applyTheme(initialMode);
    setMounted(true);
  }, [applyTheme]);

  // Listen to system theme changes when in 'system' mode
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (themeMode === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode, applyTheme]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
    applyTheme(mode);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ themeMode, resolvedTheme: mounted ? resolvedTheme : "dark", setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
