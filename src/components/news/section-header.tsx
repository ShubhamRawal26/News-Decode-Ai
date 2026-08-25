"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
  icon?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, action, icon, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4 mb-6", className)}>
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl glass shrink-0"
          >
            {icon}
          </motion.span>
        )}
        <div className="min-w-0">
          <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-tight leading-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="group hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          {action.label}
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}
