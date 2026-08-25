"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Zap, Newspaper, Trophy, Bookmark, Calendar,
  Globe2, Briefcase, Cpu, Landmark, TrendingUp,
  ChevronLeft, ChevronRight, Coins, Settings, User, LogIn
} from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { useAuth } from "@/components/auth/auth-provider";
import { CATEGORIES } from "@/lib/news";
import { cn } from "@/lib/utils";

interface YuppSidebarProps {
  onAuthRequired?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function YuppSidebar({ onAuthRequired, activeTab = "arena", setActiveTab }: YuppSidebarProps) {
  const { view, go } = useAppStore();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const mainNav = [
    {
      id: "arena",
      label: "Model Arena",
      icon: Zap,
      badge: "PRO",
      action: () => {
        setActiveTab?.("arena");
        go({ name: "home" });
      },
    },
    {
      id: "feed",
      label: "Intelligence Feed",
      icon: Newspaper,
      action: () => {
        setActiveTab?.("feed");
        go({ name: "home" });
      },
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: Trophy,
      badge: "LIVE",
      action: () => {
        setActiveTab?.("leaderboard");
        go({ name: "home" });
      },
    },
    {
      id: "saved",
      label: "Saved Library",
      icon: Bookmark,
      action: () => go({ name: "dashboard" }),
    },
  ];

  const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    world: Globe2,
    business: Briefcase,
    "ai-tech": Cpu,
    politics: Landmark,
    markets: TrendingUp,
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 z-40 sticky top-0 h-screen",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-border">
        <button
          onClick={() => {
            setActiveTab?.("arena");
            go({ name: "home" });
          }}
          className="flex items-center gap-2.5 outline-none"
        >
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles size={18} />
          </div>
          {!collapsed && (
            <div className="text-left">
              <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight text-foreground">
                <span>Yupp</span>
                <span className="text-primary">News</span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground block -mt-0.5">Multi-Model Arena</span>
            </div>
          )}
        </button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-7 w-7 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
              Workspaces
            </div>
          )}
          <div className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id && view.name === "home";

              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon size={16} />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-[9px] font-bold px-1.5 py-0.2 rounded",
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-primary/10 text-primary"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lenses / Categories */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-2 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
              Intelligence Lenses
            </div>
          )}
          <div className="space-y-1">
            {CATEGORIES.map((cat) => {
              const Icon = categoryIcons[cat.slug] || Globe2;
              const isActive = view.name === "category" && view.slug === cat.slug;

              return (
                <button
                  key={cat.slug}
                  onClick={() => go({ name: "category", slug: cat.slug })}
                  title={collapsed ? cat.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-secondary text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon size={16} />
                  {!collapsed && <span>{cat.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer / Credits & User */}
      <div className="p-3 border-t border-border space-y-2">
        {!collapsed && (
          <div className="p-2.5 rounded-xl bg-secondary/80 border border-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Coins size={15} className="text-amber-500" />
              <div>
                <span className="font-semibold block text-foreground">2,500 Credits</span>
                <span className="text-[10px] text-muted-foreground">Pro Tier Active</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              FREE
            </span>
          </div>
        )}

        {user ? (
          <button
            onClick={() => go({ name: "dashboard" })}
            className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-secondary transition-colors text-left"
          >
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
              {user.email?.[0]?.toUpperCase() || "U"}
            </div>
            {!collapsed && (
              <div className="flex-1 truncate">
                <span className="text-xs font-semibold block text-foreground truncate">
                  {user.email?.split("@")[0]}
                </span>
                <span className="text-[10px] text-muted-foreground truncate">{user.email}</span>
              </div>
            )}
          </button>
        ) : (
          <button
            onClick={() => onAuthRequired?.()}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-primary text-white text-xs font-medium shadow-md shadow-primary/20 hover:opacity-90 transition-opacity"
          >
            <LogIn size={14} />
            {!collapsed && <span>Sign In / Join</span>}
          </button>
        )}
      </div>
    </aside>
  );
}
