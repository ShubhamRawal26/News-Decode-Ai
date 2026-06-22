"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Globe2, Activity } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { useAppStore } from "@/store/use-app-store";

interface HeroProps {
  onExplore: () => void;
  breakingCount: number;
  totalStories: number;
}

export function HeroSection({ onExplore, breakingCount, totalStories }: HeroProps) {
  const go = useAppStore((s) => s.go);

  return (
    <section className="relative pt-28 sm:pt-36 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium mb-6"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-600" />
            </span>
            <span className="text-foreground/80">AI scanning thousands of sources in real time</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="max-w-4xl text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl font-semibold tracking-tight"
          >
            Understand What
            <br />
            <span className="text-gradient">Actually Matters.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            AI scans thousands of sources and explains the world&apos;s most
            important stories in minutes — with impact scores, context, and
            predictions you can trust.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton variant="gradient" onClick={onExplore}>
              Explore today&apos;s intelligence
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => go({ name: "dashboard" })}>
              <Sparkles size={15} />
              Open dashboard
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mt-14 grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-2xl"
          >
            <StatCard
              icon={<Zap size={16} className="text-rose-600" />}
              value={breakingCount}
              label="Breaking now"
              accent="rose"
            />
            <StatCard
              icon={<Globe2 size={16} className="text-sky-600" />}
              value={totalStories}
              label="Stories decoded"
              accent="sky"
            />
            <StatCard
              icon={<Activity size={16} className="text-violet-600" />}
              value="2.4k+"
              label="Sources scanned"
              accent="violet"
            />
          </motion.div>
        </div>
      </div>

      {/* floating orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[30%] hidden xl:block"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass rounded-2xl p-3 w-44 shadow-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500 breaking-pulse" />
            <span className="text-[10px] font-semibold text-rose-600 uppercase tracking-wide">Breaking</span>
          </div>
          <div className="h-2 w-full rounded-full bg-foreground/10" />
          <div className="h-2 w-2/3 rounded-full bg-foreground/10 mt-1.5" />
        </div>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[42%] hidden xl:block"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass rounded-2xl p-3 w-40 shadow-xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold text-violet-600 uppercase tracking-wide">Impact</span>
            <span className="text-sm font-bold text-violet-600">92</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
            <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StatCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  accent: "rose" | "sky" | "violet";
}) {
  const accentBg = {
    rose: "bg-rose-500/10",
    sky: "bg-sky-500/10",
    violet: "bg-violet-500/10",
  }[accent];
  return (
    <div className="glass rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center">
      <span className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full ${accentBg}`}>
        {icon}
      </span>
      <span className="text-xl sm:text-2xl font-semibold tracking-tight">{value}</span>
      <span className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">{label}</span>
    </div>
  );
}
