"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Activity } from "lucide-react";

interface ImpactBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

function tier(score: number) {
  if (score >= 85) return { label: "Critical", color: "text-rose-600", bg: "bg-rose-500/10", ring: "ring-rose-500/30", icon: Zap, gradient: "from-rose-500 to-orange-500" };
  if (score >= 70) return { label: "High", color: "text-amber-600", bg: "bg-amber-500/10", ring: "ring-amber-500/30", icon: TrendingUp, gradient: "from-amber-500 to-yellow-500" };
  if (score >= 50) return { label: "Moderate", color: "text-sky-600", bg: "bg-sky-500/10", ring: "ring-sky-500/30", icon: Activity, gradient: "from-sky-500 to-blue-500" };
  return { label: "Low", color: "text-slate-500", bg: "bg-slate-500/10", ring: "ring-slate-500/30", icon: Activity, gradient: "from-slate-400 to-slate-500" };
}

export function ImpactBadge({ score, size = "md", showLabel = true, className }: ImpactBadgeProps) {
  const t = tier(score);
  const Icon = t.icon;
  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3 py-1.5 gap-1.5",
  };
  const iconSizes = { sm: 11, md: 12, lg: 14 };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold ring-1",
        t.bg,
        t.color,
        t.ring,
        sizes[size],
        className,
      )}
    >
      <Icon size={iconSizes[size]} className="shrink-0" />
      <span>{score}</span>
      {showLabel && <span className="opacity-70">· {t.label}</span>}
    </span>
  );
}

export function ImpactRing({ score, className }: { score: number; className?: string }) {
  const t = tier(score);
  const circumference = 2 * Math.PI * 28;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-200" />
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="url(#impactGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="impactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-lg font-bold", t.color)}>{score}</span>
      </div>
    </div>
  );
}
