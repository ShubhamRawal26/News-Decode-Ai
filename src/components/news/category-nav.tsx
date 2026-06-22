"use client";

import { motion } from "framer-motion";
import { Globe2, Briefcase, Cpu, Landmark, TrendingUp, ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/news";
import { useAppStore } from "@/store/use-app-store";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe2,
  Briefcase,
  Cpu,
  Landmark,
  TrendingUp,
};

export function CategoryNav({ counts }: { counts?: Record<string, number> }) {
  const go = useAppStore((s) => s.go);
  const active = useAppStore((s) => (s.view.name === "category" ? s.view.slug : ""));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {CATEGORIES.map((c, i) => {
        const Icon = ICONS[c.icon] || Globe2;
        return (
          <motion.button
            key={c.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => go({ name: "category", slug: c.slug })}
            className={cn(
              "group relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-500 glass card-glow hover:shadow-xl",
              active === c.slug && "ring-2 ring-primary/40",
            )}
          >
            <div className={cn("absolute -top-12 -right-12 h-32 w-32 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-br", c.gradient)} />
            <div className="relative">
              <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg", c.gradient)}>
                <Icon size={20} />
              </span>
              <h3 className="mt-3 font-semibold text-[15px] tracking-tight">{c.label}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{c.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">
                  {counts?.[c.slug] ? `${counts[c.slug]} stories` : "Explore"}
                </span>
                <ArrowUpRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
