"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Globe2, Activity, Calendar, ShieldCheck } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { useAppStore } from "@/store/use-app-store";
import { formatEditionDate, todayEditionDate } from "@/lib/dates";

interface HeroProps {
  onExplore: () => void;
  breakingCount: number;
  totalStories: number;
  editionDate?: string;
}

export function HeroSection({ onExplore, breakingCount, totalStories, editionDate }: HeroProps) {
  const go = useAppStore((s) => s.go);
  const today = todayEditionDate();
  const isToday = editionDate === today;
  const editionLabel = editionDate ? formatEditionDate(editionDate) : "";

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* macOS Main Application Window Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="macos-window p-6 sm:p-12 relative overflow-hidden"
        >
          {/* macOS Titlebar Traffic Lights */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full traffic-light-red transition-transform hover:scale-110 cursor-pointer" />
              <span className="h-3 w-3 rounded-full traffic-light-yellow transition-transform hover:scale-110 cursor-pointer" />
              <span className="h-3 w-3 rounded-full traffic-light-green transition-transform hover:scale-110 cursor-pointer" />
              <span className="text-[11px] font-medium text-muted-foreground ml-3 hidden sm:inline">
                NewsDecoded.app — Intelligence Workspace
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="glass px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Ingestion
              </span>
              {editionLabel && (
                <button
                  onClick={() => editionDate && go({ name: "date", date: editionDate })}
                  className="glass px-2.5 py-1 rounded-full text-[11px] font-medium hover:border-primary/40 transition-all flex items-center gap-1"
                >
                  <Calendar size={11} className="text-primary" />
                  <span>{isToday ? "Today's Edition" : editionLabel}</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 flex-wrap justify-center mb-6"
            >
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium border border-border">
                <ShieldCheck size={14} className="text-primary" />
                <span className="text-foreground/90 font-medium">Scanning 2,400+ Verified Global News Feeds</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display max-w-4xl text-3xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] text-foreground"
            >
              Understand What
              <br />
              <span className="text-gradient italic font-medium">Actually Matters.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              AI scans thousands of global sources and synthesizes the world&apos;s most
              important stories in minutes — with objective impact scores, contextual foresight, and verified sources.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-medium shadow-lg shadow-primary/25 hover:opacity-90 active:scale-95 transition-all"
              >
                <span>Explore Today&apos;s Intelligence</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => go({ name: "dashboard" })}
                className="glass inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium hover:bg-foreground/5 transition-all text-foreground"
              >
                <Sparkles size={15} className="text-primary" />
                <span>Open Dashboard</span>
              </button>
            </motion.div>

            {/* Stats Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-12 grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-2xl"
            >
              <StatCard
                icon={<Zap size={16} className="text-rose-500" />}
                value={breakingCount}
                label="Breaking Now"
                accent="rose"
              />
              <StatCard
                icon={<Globe2 size={16} className="text-sky-500" />}
                value={totalStories}
                label="Stories Decoded"
                accent="sky"
              />
              <StatCard
                icon={<Activity size={16} className="text-primary" />}
                value="2.4k+"
                label="Sources Monitored"
                accent="primary"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
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
  accent: "rose" | "sky" | "primary";
}) {
  const accentBg = {
    rose: "bg-rose-500/10 text-rose-500",
    sky: "bg-sky-500/10 text-sky-500",
    primary: "bg-primary/10 text-primary",
  }[accent];

  return (
    <div className="glass rounded-2xl p-3 sm:p-4 flex flex-col items-center text-center border border-border">
      <span className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-xl ${accentBg}`}>
        {icon}
      </span>
      <span className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">{value}</span>
      <span className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">{label}</span>
    </div>
  );
}
