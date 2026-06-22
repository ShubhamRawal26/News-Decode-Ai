"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strong?: boolean;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  strong = false,
  hover = false,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-2xl",
        hover && "transition-all duration-500 hover:shadow-xl",
        glow && "card-glow",
        className,
      )}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
